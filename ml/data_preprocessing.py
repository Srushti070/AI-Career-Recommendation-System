import pandas as pd
# pyrefly: ignore [missing-import]
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler


# ===========================
# Load Dataset
# ===========================

df = pd.read_csv("dataset/career_dataset.csv")

print("Dataset Loaded Successfully")
print(df.head())


# ===========================
# Remove Student ID
# ===========================

if "Student_ID" in df.columns:
    df.drop("Student_ID", axis=1, inplace=True)


# ===========================
# Fill Missing Values
# ===========================

df = df.ffill()


# ===========================
# Encode Categorical Columns
# ===========================

label_encoders = {}

categorical_columns = df.select_dtypes(include=["object", "string"]).columns

for column in categorical_columns:

    if column != "Career":

        encoder = LabelEncoder()

        df[column] = encoder.fit_transform(df[column])

        label_encoders[column] = encoder


# ===========================
# Encode Target Column
# ===========================

career_encoder = LabelEncoder()

df["Career"] = career_encoder.fit_transform(df["Career"])

print("\nEncoded Career Distribution:")
print(df["Career"].value_counts())

print("\nCareer Mapping:")
for i, career in enumerate(career_encoder.classes_):
    print(i, ":", career)

label_encoders["Career"] = career_encoder


# ===========================
# Split Features & Target
# ===========================

X = df.drop("Career", axis=1)

y = df["Career"]

X = df.drop("Career", axis=1)
y = df["Career"]


# ===========================
# Scale Features
# ===========================

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)


# ===========================
# Save Files
# ===========================

processed_data = pd.DataFrame(X_scaled, columns=X.columns)

processed_data["Career"] = y

processed_data.to_csv(
    "dataset/preprocessed_dataset.csv",
    index=False
)

joblib.dump(
    scaler,
    "model/scaler.pkl"
)

joblib.dump(
    label_encoders,
    "model/label_encoders.pkl"
)

print("\nPreprocessing Completed Successfully!")

print("\nDataset Shape :", processed_data.shape)

print("\nCareer Classes :")

for index, career in enumerate(career_encoder.classes_):

    print(index, ":", career)