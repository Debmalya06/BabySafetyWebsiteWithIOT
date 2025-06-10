import streamlit as st
import requests
import json
from datetime import datetime

st.set_page_config(
    page_title="Baby Feeding AI Assistant",
    page_icon="🍼",
    layout="wide"
)

st.title("🍼 Baby Feeding AI Assistant")
st.markdown("*AI-powered feeding suitability analysis with personalized recommendations*")

# API Configuration
API_BASE_URL = "http://localhost:8000"

# Sidebar for baby information
with st.sidebar:
    st.header("👶 Baby Information")
    baby_age = st.number_input("Baby Age (Months)", min_value=0, max_value=24, value=6)
    
    with st.expander("📏 Physical Measurements (Optional)"):
        baby_weight = st.number_input("Weight (kg)", min_value=1.0, max_value=20.0, value=6.5, step=0.1)
        baby_height = st.number_input("Height (cm)", min_value=30.0, max_value=100.0, value=65.0, step=0.5)
        use_measurements = st.checkbox("Use these measurements", value=False)

# Main form
col1, col2 = st.columns(2)

with col1:
    st.subheader("🥛 Feeding Details")
    
    # Get available food types
    try:
        response = requests.get(f"{API_BASE_URL}/food-types")
        if response.status_code == 200:
            food_types = response.json()["food_types"]
        else:
            food_types = ["Formula", "Breast Milk", "Solid", "Liquid", "Semi"]
    except:
        food_types = ["Formula", "Breast Milk", "Solid", "Liquid", "Semi"]
    
    food_type = st.selectbox("Food Type", food_types)
    food_quantity = st.number_input("Food Quantity (ml)", min_value=0, max_value=500, value=120)
    food_temp = st.number_input("Food Temperature (°C)", min_value=0.0, max_value=60.0, value=37.0, step=0.1)
    
with col2:
    st.subheader("🌡️ Environment & Timing")
    room_temp = st.number_input("Room Temperature (°C)", min_value=10.0, max_value=45.0, value=22.0, step=0.1)
    last_feeding = st.number_input("Time Since Last Feeding (minutes)", min_value=0, max_value=600, value=180)
    baby_crying = st.checkbox("👶 Baby is currently crying", value=False)

# Analysis button
if st.button("🔍 Analyze Feeding Situation", type="primary"):
    # Prepare request payload
    payload = {
        "baby_age_months": baby_age,
        "food_type": food_type,
        "food_quantity_ml": food_quantity,
        "food_temp_celsius": food_temp,
        "room_temp_celsius": room_temp,
        "time_since_last_feeding_min": last_feeding,
        "baby_crying": baby_crying
    }
    
    # Add measurements if provided
    if use_measurements:
        payload["baby_weight_kg"] = baby_weight
        payload["baby_height_cm"] = baby_height
    
    try:
        with st.spinner("Analyzing feeding conditions..."):
            response = requests.post(f"{API_BASE_URL}/analyze", json=payload)
        
        if response.status_code == 200:
            result = response.json()
            
            # Main result
            if result["feeding_suitable"]:
                st.success(f"✅ Feeding conditions are suitable! (Confidence: {result['confidence']:.1%})")
            else:
                st.warning(f"⚠️ Feeding conditions need adjustment (Confidence: {result['confidence']:.1%})")
            
            # Create columns for detailed results
            col1, col2, col3 = st.columns(3)
            
            with col1:
                st.subheader("📊 Feeding Analysis")
                analysis = result["feeding_analysis"]
                
                st.metric("Expected Quantity", f"{analysis['expected_quantity_ml']} ml", 
                         f"{food_quantity - analysis['expected_quantity_ml']:+d} ml")
                st.metric("Expected Interval", f"{analysis['expected_feeding_interval_min']} min",
                         f"{last_feeding - analysis['expected_feeding_interval_min']:+d} min")
                
                # Status indicators
                temp_color = "🟢" if analysis["food_temp_status"] == "ideal" else "🟡"
                st.write(f"{temp_color} Food Temperature: {analysis['food_temp_status']}")
                
                room_color = "🟢" if analysis["room_temp_status"] == "comfortable" else "🟡"
                st.write(f"{room_color} Room Temperature: {analysis['room_temp_status']}")
            
            with col2:
                if result["baby_crying"] and result["cry_reasons"]:
                    st.subheader("😢 Possible Crying Reasons")
                    for i, reason in enumerate(result["cry_reasons"], 1):
                        st.write(f"{i}. {reason}")
                else:
                    st.subheader("😊 Baby Status")
                    if not result["baby_crying"]:
                        st.write("✅ Baby is not crying")
                        st.write("🍼 Ready for feeding")
                    else:
                        st.write("👶 No specific feeding-related concerns identified")
            
            with col3:
                if result["recommendations"]:
                    st.subheader("💡 Recommendations")
                    for i, rec in enumerate(result["recommendations"], 1):
                        st.write(f"{i}. {rec}")
            
            # Detailed analysis in expander
            with st.expander("🔍 Detailed Analysis"):
                st.json(result["feeding_analysis"])
                
                if use_measurements:
                    st.write(f"**Using provided measurements:** {baby_weight}kg, {baby_height}cm")
                else:
                    st.write(f"**Using estimated measurements:** {analysis['estimated_weight_kg']}kg, {analysis['estimated_height_cm']}cm")
        
        else:
            st.error(f"API Error: {response.status_code}")
            st.write("Response:", response.text)
    
    except requests.exceptions.ConnectionError:
        st.error("❌ Cannot connect to API. Make sure FastAPI server is running on port 8000")
        st.code("uvicorn main:app --reload --port 8000")
    except Exception as e:
        st.error(f"❌ Error: {str(e)}")

# Footer
st.markdown("---")
st.markdown("*💡 This is an AI assistant for guidance only. Always consult healthcare professionals for medical advice.*")

# Instructions for running
st.sidebar.markdown("---")
st.sidebar.markdown("### 🚀 To run the API:")
st.sidebar.code("uvicorn main:app --reload --port 8000")
st.sidebar.markdown("### 📱 To run this app:")
st.sidebar.code("streamlit run streamlit_app.py")