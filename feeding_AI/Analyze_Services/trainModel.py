import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

df = pd.read_excel("data/baby_feeding_data_2000.xlsx")

label_encoder = LabelEncoder()
df["FoodTypeEncoded"] = label_encoder.fit_transform(df["FoodType"])

X = df[[
    "BabyAgeMonths", "FoodTypeEncoded", "FoodQuantityML",
    "FoodTempCelsius", "RoomTempCelsius", "TimeSinceLastFeedingMin"
]]


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, pred))
print(classification_report(y_test, pred))

os.makedirs("model", exist_ok=True)
joblib.dump(model, "model/feeding_model.pkl")
joblib.dump(label_encoder, "model/food_type_encoder.pkl")
print("Model and encoder saved in model/ folder.")