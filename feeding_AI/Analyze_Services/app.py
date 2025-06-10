# main.py - FastAPI Backend
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
import joblib
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

# Initialize FastAPI app
app = FastAPI(
    title="Baby Feeding Suitability API",
    description="AI-powered baby feeding analysis and recommendations",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class FeedingRequest(BaseModel):
    baby_age_months: int = Field(..., ge=0, le=24, description="Baby age in months")
    baby_weight_kg: Optional[float] = Field(None, ge=1.0, le=20.0, description="Baby weight in kg")
    baby_height_cm: Optional[float] = Field(None, ge=30.0, le=100.0, description="Baby height in cm")
    food_type: str = Field(..., description="Type of food (e.g., Formula, Breast Milk, Solid)")
    food_quantity_ml: int = Field(..., ge=0, le=500, description="Food quantity in ml")
    food_temp_celsius: float = Field(..., ge=0.0, le=60.0, description="Food temperature in Celsius")
    room_temp_celsius: float = Field(..., ge=10.0, le=45.0, description="Room temperature in Celsius")
    time_since_last_feeding_min: int = Field(..., ge=0, le=1440, description="Minutes since last feeding")
    baby_crying: Optional[bool] = Field(False, description="Is baby currently crying?")

class FeedingResponse(BaseModel):
    status: str
    feeding_suitable: bool
    confidence: float
    baby_crying: bool
    cry_reasons: List[str]
    recommendations: List[str]
    feeding_analysis: dict

class BabyFeedingPredictor:
    def __init__(self):
        self.feeding_model = None
        self.food_encoder = None
        self.model_loaded = False
        
    def load_models(self):
        """Load pre-trained models"""
        try:
            if os.path.exists("model/feeding_model.pkl"):
                self.feeding_model = joblib.load("model/feeding_model.pkl")
            if os.path.exists("model/food_type_encoder.pkl"):
                self.food_encoder = joblib.load("model/food_type_encoder.pkl")
            
            self.model_loaded = True
            print("Models loaded successfully.")
            return True
        except Exception as e:
            print(f"Error loading models: {e}")
            return False
    
    def estimate_baby_metrics(self, age_months):
        """Estimate baby weight and height based on age if not provided"""
        # WHO growth standards approximation
        if age_months <= 12:
            weight = 3.5 + (age_months * 0.6)  # Rough estimate
            height = 50 + (age_months * 2.5)   # Rough estimate
        else:
            weight = 3.5 + (12 * 0.6) + ((age_months - 12) * 0.3)
            height = 50 + (12 * 2.5) + ((age_months - 12) * 1.2)
        
        return weight, height
    
    def predict_feeding(self, request: FeedingRequest):
        """Main prediction function"""
        if not self.model_loaded:
            if not self.load_models():
                raise HTTPException(status_code=500, detail="Models not available")
        
        # Estimate missing metrics
        if request.baby_weight_kg is None or request.baby_height_cm is None:
            est_weight, est_height = self.estimate_baby_metrics(request.baby_age_months)
            weight = request.baby_weight_kg or est_weight
            height = request.baby_height_cm or est_height
        else:
            weight = request.baby_weight_kg
            height = request.baby_height_cm
        
        # Prepare features for prediction
        try:
            if self.food_encoder:
                food_type_encoded = self.food_encoder.transform([request.food_type])[0]
            else:
                # Fallback encoding
                food_types = {"Formula": 0, "Breast Milk": 1, "Solid": 2, "Liquid": 0, "Semi": 1}
                food_type_encoded = food_types.get(request.food_type, 0)
        except:
            food_types = {"Formula": 0, "Breast Milk": 1, "Solid": 2, "Liquid": 0, "Semi": 1}
            food_type_encoded = food_types.get(request.food_type, 0)
        
        # Calculate derived features
        weight_height_ratio = weight / (height / 100)
        feeding_frequency = 24 * 60 / max(request.time_since_last_feeding_min, 1)
        
        # Create prediction input
        features = np.array([[
            request.baby_age_months,
            weight,
            height,
            food_type_encoded,
            request.food_quantity_ml,
            request.food_temp_celsius,
            request.room_temp_celsius,
            request.time_since_last_feeding_min,
            weight_height_ratio,
            feeding_frequency
        ]])
        
        # Make prediction
        if self.feeding_model:
            prediction = self.feeding_model.predict(features)[0]
            confidence = float(max(self.feeding_model.predict_proba(features)[0]))
        else:
            # Fallback rule-based prediction
            prediction, confidence = self.rule_based_prediction(request)
        
        # Analyze crying reasons
        cry_reasons = []
        recommendations = []
        
        if request.baby_crying:
            cry_reasons = self.analyze_cry_reasons(request, weight, height)
            recommendations = self.generate_recommendations(request, prediction, cry_reasons)
        
        # Feeding analysis
        feeding_analysis = self.analyze_feeding_conditions(request, weight, height)
        
        return FeedingResponse(
            status="success",
            feeding_suitable=bool(prediction),
            confidence=confidence,
            baby_crying=request.baby_crying,
            cry_reasons=cry_reasons,
            recommendations=recommendations,
            feeding_analysis=feeding_analysis
        )
    
    def rule_based_prediction(self, request: FeedingRequest):
        """Fallback rule-based prediction if model unavailable"""
        score = 0
        
        # Temperature check
        if 35 <= request.food_temp_celsius <= 40:
            score += 2
        elif 30 <= request.food_temp_celsius <= 45:
            score += 1
        
        # Room temperature check
        if 20 <= request.room_temp_celsius <= 25:
            score += 2
        elif 18 <= request.room_temp_celsius <= 28:
            score += 1
        
        # Feeding interval check
        expected_interval = 180 if request.baby_age_months < 6 else 240
        if request.time_since_last_feeding_min >= expected_interval * 0.8:
            score += 2
        
        # Quantity check
        expected_quantity = self.calculate_expected_quantity(request.baby_age_months, 
                                                           request.baby_weight_kg or 6)
        if 0.7 * expected_quantity <= request.food_quantity_ml <= 1.3 * expected_quantity:
            score += 2
        
        prediction = score >= 4
        confidence = min(score / 8.0, 1.0)
        
        return prediction, confidence
    
    def calculate_expected_quantity(self, age_months, weight_kg):
        """Calculate expected feeding quantity"""
        if age_months < 1:
            return weight_kg * 150
        elif age_months < 3:
            return weight_kg * 120
        elif age_months < 6:
            return weight_kg * 100
        else:
            return 200
    
    def analyze_cry_reasons(self, request: FeedingRequest, weight: float, height: float):
        """Analyze possible crying reasons"""
        reasons = []
        
        # Hunger analysis
        expected_interval = 120 if request.baby_age_months < 3 else 180 if request.baby_age_months < 6 else 240
        if request.time_since_last_feeding_min > expected_interval:
            reasons.append(f"Baby may be hungry (last fed {request.time_since_last_feeding_min} minutes ago)")
        
        # Temperature issues
        if request.food_temp_celsius < 35:
            reasons.append("Food may be too cold for comfort")
        elif request.food_temp_celsius > 40:
            reasons.append("Food may be too hot - check temperature")
        
        if request.room_temp_celsius < 20:
            reasons.append("Room may be too cold")
        elif request.room_temp_celsius > 26:
            reasons.append("Room may be too warm")
        
        # Quantity issues
        expected_qty = self.calculate_expected_quantity(request.baby_age_months, weight)
        if request.food_quantity_ml < expected_qty * 0.7:
            reasons.append(f"Food quantity may be insufficient (expected ~{expected_qty:.0f}ml)")
        
        # General reasons
        if not reasons:
            reasons.extend([
                "May need diaper change",
                "Could need burping",
                "Might be tired or overstimulated",
                "May want comfort or attention"
            ])
        
        return reasons
    
    def generate_recommendations(self, request: FeedingRequest, prediction: bool, cry_reasons: List[str]):
        """Generate feeding recommendations"""
        recommendations = []
        
        if not prediction:
            recommendations.append("Consider adjusting feeding conditions before proceeding")
        
        if request.food_temp_celsius < 35:
            recommendations.append("Warm food to 37°C (body temperature)")
        elif request.food_temp_celsius > 40:
            recommendations.append("Cool food to safe temperature (37-40°C)")
        
        if request.room_temp_celsius < 20:
            recommendations.append("Increase room temperature to 20-25°C")
        elif request.room_temp_celsius > 26:
            recommendations.append("Cool room temperature to 20-25°C")
        
        if request.baby_crying:
            recommendations.append("Try comforting baby before feeding")
            recommendations.append("Check diaper and burp if needed")
        
        if not recommendations:
            recommendations.append("Feeding conditions look good - proceed with confidence")
        
        return recommendations
    
    def analyze_feeding_conditions(self, request: FeedingRequest, weight: float, height: float):
        """Detailed analysis of feeding conditions"""
        expected_qty = self.calculate_expected_quantity(request.baby_age_months, weight)
        expected_interval = 120 if request.baby_age_months < 3 else 180 if request.baby_age_months < 6 else 240
        
        return {
            "expected_quantity_ml": round(expected_qty),
            "actual_quantity_ml": request.food_quantity_ml,
            "quantity_status": "appropriate" if 0.7 * expected_qty <= request.food_quantity_ml <= 1.3 * expected_qty else "needs_adjustment",
            "expected_feeding_interval_min": expected_interval,
            "actual_interval_min": request.time_since_last_feeding_min,
            "interval_status": "appropriate" if request.time_since_last_feeding_min >= expected_interval * 0.8 else "too_soon",
            "food_temp_status": "ideal" if 35 <= request.food_temp_celsius <= 40 else "needs_adjustment",
            "room_temp_status": "comfortable" if 20 <= request.room_temp_celsius <= 25 else "needs_adjustment",
            "estimated_weight_kg": round(weight, 1),
            "estimated_height_cm": round(height, 1)
        }

# Initialize predictor
predictor = BabyFeedingPredictor()

@app.on_event("startup")
async def startup_event():
    """Load models on startup"""
    predictor.load_models()

@app.get("/")
async def root():
    return {"message": "Baby Feeding Suitability API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "models_loaded": predictor.model_loaded}

@app.post("/analyze", response_model=FeedingResponse)
async def analyze_feeding(request: FeedingRequest):
    """Analyze feeding suitability and provide recommendations"""
    try:
        result = predictor.predict_feeding(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/food-types")
async def get_food_types():
    """Get available food types"""
    return {"food_types": ["Formula", "Breast Milk", "Solid", "Liquid", "Semi"]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)