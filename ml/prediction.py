# pyrefly: ignore [missing-import]

import pandas as pd
# pyrefly: ignore [missing-import]
import joblib

from ml.career_profiles import CAREER_PROFILES


# ===========================================
# Load Model and Required Files
# ===========================================

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "model"

model = joblib.load(MODEL_DIR / "career_prediction_model.pkl")
scaler = joblib.load(MODEL_DIR / "scaler.pkl")
encoders = joblib.load(MODEL_DIR / "label_encoders.pkl")

career_encoder = encoders["Career"]


# ===========================================
# Load Feature Names
# ===========================================

df = pd.read_csv(BASE_DIR / "dataset" / "preprocessed_dataset.csv")
feature_names = df.drop("Career", axis=1).columns


# ===========================================
# Prediction Function
# ===========================================

def predict_career(student_data):

    # Convert dictionary to DataFrame
    input_df = pd.DataFrame([student_data])

    # Encode categorical columns
    for column, encoder in encoders.items():

        if column == "Career":
            continue

        if column in input_df.columns:
            input_df[column] = encoder.transform(input_df[column])

    # Arrange columns in training order
    input_df = input_df[feature_names]

    # Scale features
    scaled = scaler.transform(input_df)

    # Convert scaled data back to DataFrame
    scaled_df = pd.DataFrame(
        scaled,
        columns=feature_names
    )

    # Predict Career
    prediction = model.predict(scaled_df)[0]

    # Prediction Confidence
    confidence = model.predict_proba(scaled_df).max() * 100

    # Decode Career Name
    career = career_encoder.inverse_transform([prediction])[0]

    return career, confidence


# ===========================================
# Sample Student
# ===========================================

student = {

    "Age": 21,
    "Gender": "Female",
    "Degree": "B.Tech",
    "Branch": "Data Science",
    "Semester": 6,
    "CGPA": 8.6,

    "Python": 5,
    "SQL": 5,
    "Java": 3,
    "C++": 2,
    "JavaScript": 2,
    "HTML_CSS": 2,

    "Data_Structures": 4,
    "OOP": 4,
    "Statistics": 5,
    "Mathematics": 4,
    "Machine_Learning": 5,
    "Deep_Learning": 4,
    "Data_Visualization": 5,
    "Pandas": 5,
    "NumPy": 5,
    "Power_BI": 3,

    "Communication": 4,
    "Leadership": 3,
    "Problem_Solving": 5,
    "Critical_Thinking": 5,
    "Creativity": 4,
    "Teamwork": 5,
    "Presentation": 4,
    "Time_Management": 4,

    "AI_Interest": 5,
    "Programming_Interest": 5,
    "Research_Interest": 5,
    "Business_Interest": 2,
    "Cloud_Interest": 2,
    "Cybersecurity_Interest": 1,
    "Finance_Interest": 1,
    "Design_Interest": 1,

    "Analytical_Thinking": 5,
    "Logical_Reasoning": 5,
    "Attention_to_Detail": 4,
    "Decision_Making": 4,
    "Confidence": 4,
    "Adaptability": 4,
    "Curiosity": 5,

    "Projects": 5,
    "Internships": 2,
    "Hackathons": 3,
    "Certifications": 4,
    "GitHub_Activity": 4,
    "Open_Source": 2
}


# ===========================================
# Predict Career
# ===========================================

if __name__ == "__main__":
    career, confidence = predict_career(student)

    print("\n===================================")
    print("CAREER RECOMMENDATION")
    print("===================================")

    print(f"\nRecommended Career : {career}")
    print(f"Confidence         : {confidence:.2f}%")

    profile = CAREER_PROFILES[career]

    print("\nDescription:")
    print(profile["description"])


    print("\nTechnical Skills:")

    for skill, level in profile["technical_skills"].items():
        print(f"- {skill} (Level {level[0]}-{level[1]})")


    print("\nRecommended Courses:")

    for course in profile["career_information"]["recommended_courses"]:
        print(f"- {course}")


    print("\nSalary Range:")
    try:
        print(profile["career_information"]["salary_range"])
    except UnicodeEncodeError:
        print(profile["career_information"]["salary_range"].encode('utf-8', 'replace').decode('utf-8', 'ignore'))


    print("\nFuture Scope:")
    print(profile["career_information"]["future_scope"])