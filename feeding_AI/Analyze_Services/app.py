from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("model/feeding_model.pkl")
encoder = joblib.load("model/food_type_encoder.pkl")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    try:
        baby_age = int(data["baby_age"])
        food_type = data["food_type"]
        food_quantity = float(data["food_quantity_ml"])
        food_temp = float(data["food_temp_celsius"])
        room_temp = float(data["room_temp_celsius"])
        time_since_last_feed = int(data["time_since_last_feeding_min"])

        # Encode food type
        food_type_encoded = encoder.transform([food_type])[0]

        # Predict
        input_data = np.array([[baby_age, food_type_encoded, food_quantity, food_temp, room_temp, time_since_last_feed]])
        prediction = model.predict(input_data)[0]

        return jsonify({
            "suitable_feeding": bool(prediction),
            "status": "success"
        })

    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"})

if __name__ == "__main__":
    app.run(debug=True)