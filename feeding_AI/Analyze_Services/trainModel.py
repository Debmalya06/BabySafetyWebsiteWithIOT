import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
import numpy as np
from datetime import datetime

class BabyFeedingPredictor:
    def __init__(self):
        self.feeding_model = None
        self.cry_model = None
        self.food_encoder = LabelEncoder()
        self.scaler = StandardScaler()
        self.model_trained = False
        
    def prepare_data(self, df):
        """Prepare and encode the data"""
        # Encode categorical variables
        df["FoodTypeEncoded"] = self.food_encoder.fit_transform(df["FoodType"])
        
        # Create BMI-like metric for babies (weight/height ratio)
        df["WeightHeightRatio"] = df["BabyWeightKg"] / (df["BabyHeightCm"] / 100)
        
        # Calculate feeding frequency (feeds per day based on time since last feeding)
        df["FeedingFrequency"] = 24 * 60 / df["TimeSinceLastFeedingMin"]
        
        return df
    
    def train_models(self, excel_file_path):
        """Train both feeding suitability and cry prediction models"""
        # Load data
        df = pd.read_excel(excel_file_path)
        print("Columns in your data:", df.columns.tolist())
        
        # Prepare data
        df = self.prepare_data(df)
        
        # Features for feeding prediction
        feeding_features = [
            "BabyAgeMonths", "BabyWeightKg", "BabyHeightCm", 
            "FoodTypeEncoded", "FoodQuantityML", "FoodTempCelsius", 
            "RoomTempCelsius", "TimeSinceLastFeedingMin",
            "WeightHeightRatio", "FeedingFrequency"
        ]
        
        # Train feeding suitability model
        X_feeding = df[feeding_features]
        y_feeding = df["SuitableFood"]
        
        X_train_f, X_test_f, y_train_f, y_test_f = train_test_split(
            X_feeding, y_feeding, test_size=0.2, random_state=42
        )
        
        self.feeding_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.feeding_model.fit(X_train_f, y_train_f)
        
        # Evaluate feeding model
        pred_feeding = self.feeding_model.predict(X_test_f)
        print("\\n=== FEEDING SUITABILITY MODEL ===")
        print("Accuracy:", accuracy_score(y_test_f, pred_feeding))
        print(classification_report(y_test_f, pred_feeding))
        
        # Train cry prediction model (if BabyCrying column exists)
        if "BabyCrying" in df.columns:
            cry_features = feeding_features + ["SuitableFood"]
            X_cry = df[cry_features]
            y_cry = df["BabyCrying"]
            
            X_train_c, X_test_c, y_train_c, y_test_c = train_test_split(
                X_cry, y_cry, test_size=0.2, random_state=42
            )
            
            self.cry_model = RandomForestClassifier(n_estimators=100, random_state=42)
            self.cry_model.fit(X_train_c, y_train_c)
            
            pred_cry = self.cry_model.predict(X_test_c)
            print("\\n=== BABY CRYING PREDICTION MODEL ===")
            print("Accuracy:", accuracy_score(y_test_c, pred_cry))
            print(classification_report(y_test_c, pred_cry))
        
        self.model_trained = True
        
        # Save models
        self.save_models()
        
        # Show feature importance
        self.show_feature_importance(feeding_features)
    
    def show_feature_importance(self, feature_names):
        """Display feature importance for feeding model"""
        if self.feeding_model:
            importance = self.feeding_model.feature_importances_
            feature_importance = pd.DataFrame({
                'feature': feature_names,
                'importance': importance
            }).sort_values('importance', ascending=False)
            
            print("\\n=== FEATURE IMPORTANCE (FEEDING MODEL) ===")
            for _, row in feature_importance.iterrows():
                print(f"{row['feature']}: {row['importance']:.4f}")
    
    def predict_feeding_scenario(self, baby_age_months, baby_weight_kg, baby_height_cm, 
                               food_type, food_quantity_ml, food_temp_celsius, 
                               room_temp_celsius, time_since_last_feeding_min, 
                               baby_crying=None):
        """
        Predict feeding suitability and analyze crying if applicable
        """
        if not self.model_trained:
            return "Models not trained yet. Please train the models first."
        
        # Prepare input data
        try:
            food_type_encoded = self.food_encoder.transform([food_type])[0]
        except ValueError:
            return f"Unknown food type: {food_type}. Please use one of the trained food types."
        
        # Calculate derived features
        weight_height_ratio = baby_weight_kg / (baby_height_cm / 100)
        feeding_frequency = 24 * 60 / time_since_last_feeding_min
        
        # Create input array for feeding prediction
        feeding_input = np.array([[
            baby_age_months, baby_weight_kg, baby_height_cm,
            food_type_encoded, food_quantity_ml, food_temp_celsius,
            room_temp_celsius, time_since_last_feeding_min,
            weight_height_ratio, feeding_frequency
        ]])
        
        # Predict feeding suitability
        feeding_prediction = self.feeding_model.predict(feeding_input)[0]
        feeding_probability = self.feeding_model.predict_proba(feeding_input)[0]
        
        # Prepare results
        results = {
            "feeding_suitable": feeding_prediction,
            "feeding_confidence": max(feeding_probability),
            "baby_crying": baby_crying,
            "cry_reasons": []
        }
        
        # Analyze crying if baby is crying
        if baby_crying:
            cry_reasons = self.analyze_cry_reasons(
                baby_age_months, baby_weight_kg, baby_height_cm,
                food_type, food_quantity_ml, food_temp_celsius,
                room_temp_celsius, time_since_last_feeding_min,
                feeding_prediction
            )
            results["cry_reasons"] = cry_reasons
        
        return results
    
    def analyze_cry_reasons(self, baby_age_months, baby_weight_kg, baby_height_cm,
                          food_type, food_quantity_ml, food_temp_celsius,
                          room_temp_celsius, time_since_last_feeding_min,
                          feeding_suitable):
        """
        Analyze possible reasons for baby crying based on feeding parameters
        """
        reasons = []
        
        # Age-based analysis
        if baby_age_months < 3:
            if time_since_last_feeding_min > 180:  # 3 hours
                reasons.append("Newborn may be hungry (should feed every 2-3 hours)")
        elif baby_age_months < 6:
            if time_since_last_feeding_min > 240:  # 4 hours
                reasons.append("Infant may be hungry (should feed every 3-4 hours)")
        else:
            if time_since_last_feeding_min > 300:  # 5 hours
                reasons.append("Baby may be hungry (longer intervals between feeds)")
        
        # Food temperature analysis
        if food_temp_celsius < 35:
            reasons.append("Food may be too cold (ideal: 37°C body temperature)")
        elif food_temp_celsius > 40:
            reasons.append("Food may be too hot (could cause discomfort)")
        
        # Room temperature analysis
        if room_temp_celsius < 18:
            reasons.append("Room may be too cold (ideal: 20-22°C)")
        elif room_temp_celsius > 26:
            reasons.append("Room may be too warm (could cause overheating)")
        
        # Quantity analysis based on age and weight
        expected_quantity = self.calculate_expected_quantity(baby_age_months, baby_weight_kg)
        if food_quantity_ml < expected_quantity * 0.7:
            reasons.append(f"Food quantity may be insufficient (expected ~{expected_quantity:.0f}ml)")
        elif food_quantity_ml > expected_quantity * 1.3:
            reasons.append(f"Food quantity may be too much (expected ~{expected_quantity:.0f}ml)")
        
        # Feeding suitability
        if not feeding_suitable:
            reasons.append("Current feeding conditions predicted as unsuitable")
        
        # Weight and height analysis
        bmi_percentile = self.estimate_baby_bmi_category(baby_age_months, baby_weight_kg, baby_height_cm)
        if bmi_percentile:
            reasons.append(f"Baby's growth category: {bmi_percentile}")
        
        # General reasons if no specific feeding issues found
        if not reasons:
            reasons.extend([
                "Possible diaper change needed",
                "May need burping",
                "Could be tired or overstimulated",
                "May want comfort/cuddles",
                "Check for signs of illness"
            ])
        
        return reasons
    
    def calculate_expected_quantity(self, age_months, weight_kg):
        """Calculate expected feeding quantity based on age and weight"""
        if age_months < 1:
            return weight_kg * 150  # 150ml per kg for newborns
        elif age_months < 3:
            return weight_kg * 120  # 120ml per kg for young infants
        elif age_months < 6:
            return weight_kg * 100  # 100ml per kg for older infants
        else:
            return 200  # Solid foods becoming primary, less formula/milk needed
    
    def estimate_baby_bmi_category(self, age_months, weight_kg, height_cm):
        """Rough estimation of baby's growth category"""
        # This is a simplified estimation - real medical assessment needed
        if age_months < 12:
            weight_height_ratio = weight_kg / (height_cm / 100)
            if weight_height_ratio < 8:
                return "May be underweight (consult pediatrician)"
            elif weight_height_ratio > 12:
                return "May be above average weight"
            else:
                return "Normal weight range"
        return None
    
    def save_models(self):
        """Save trained models and encoders"""
        os.makedirs("model", exist_ok=True)
        joblib.dump(self.feeding_model, "model/feeding_model.pkl")
        joblib.dump(self.food_encoder, "model/food_type_encoder.pkl")
        if self.cry_model:
            joblib.dump(self.cry_model, "model/cry_model.pkl")
        print("Models saved in model/ folder.")
    
    def load_models(self):
        """Load pre-trained models"""
        try:
            self.feeding_model = joblib.load("model/feeding_model.pkl")
            self.food_encoder = joblib.load("model/food_type_encoder.pkl")
            if os.path.exists("model/cry_model.pkl"):
                self.cry_model = joblib.load("model/cry_model.pkl")
            self.model_trained = True
            print("Models loaded successfully.")
        except FileNotFoundError:
            print("No pre-trained models found. Please train the models first.")

# Example usage
def main():
    # Initialize the predictor
    predictor = BabyFeedingPredictor()
    
    # Train models (uncomment when you have the data file)
    # predictor.train_models("data/baby_feeding_data_2000.xlsx")
    
    # Or load pre-trained models
    # predictor.load_models()
    
    # Example prediction
    # result = predictor.predict_feeding_scenario(
    #     baby_age_months=4,
    #     baby_weight_kg=6.5,
    #     baby_height_cm=62,
    #     food_type="Formula",
    #     food_quantity_ml=180,
    #     food_temp_celsius=37,
    #     room_temp_celsius=22,
    #     time_since_last_feeding_min=200,
    #     baby_crying=True
    # )
    # 
    # print("\\n=== FEEDING PREDICTION RESULT ===")
    # print(f"Feeding Suitable: {result['feeding_suitable']}")
    # print(f"Confidence: {result['feeding_confidence']:.2%}")
    # print(f"Baby Crying: {result['baby_crying']}")
    # 
    # if result['cry_reasons']:
    #     print("\\nPossible reasons for crying:")
    #     for i, reason in enumerate(result['cry_reasons'], 1):
    #         print(f"{i}. {reason}")

if __name__ == "__main__":
    main()