# pyrefly: ignore [missing-import]

import pandas as pd
# pyrefly: ignore [missing-import]
import joblib
# pyrefly: ignore [missing-import]
import matplotlib.pyplot as plt
from sklearn.metrics import ConfusionMatrixDisplay

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# ===========================
# Load Dataset
# ===========================

df = pd.read_csv("dataset/preprocessed_dataset.csv")

X = df.drop("Career", axis=1)
y = df["Career"]

# ===========================
# Train Test Split
# ===========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ===========================
# Load Trained Model
# ===========================

model = joblib.load("model/career_prediction_model.pkl")

encoders = joblib.load("model/label_encoders.pkl")
career_names = encoders["Career"].classes_

# ===========================
# Prediction
# ===========================

y_pred = model.predict(X_test)

# ===========================
# Accuracy
# ===========================

accuracy = accuracy_score(y_test, y_pred)

print("=" * 60)
print("MODEL EVALUATION")
print("=" * 60)

print(f"\nAccuracy : {accuracy:.4f}")

# ===========================
# Classification Report
# ===========================

print("\nClassification Report\n")

print(classification_report(y_test, y_pred))

# ===========================
# Confusion Matrix
# ===========================

print("\nConfusion Matrix\n")

cm = confusion_matrix(y_test, y_pred)

print(cm)

disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=career_names
)

fig, ax = plt.subplots(figsize=(12, 10))

disp.plot(
    cmap="Blues",
    ax=ax,
    xticks_rotation=45
)

plt.title("Career Prediction Confusion Matrix")
plt.savefig(
    "reports/confusion_matrix.png",
    dpi=300,
    bbox_inches="tight"
)


plt.show()

print("\n" + "=" * 60)
print("TOP IMPORTANT FEATURES")
print("=" * 60)

importance = pd.DataFrame({

    "Feature": X.columns,
    "Importance": model.feature_importances_

})

importance.reset_index(drop=True, inplace=True)

importance = importance.sort_values(
    by="Importance",
    ascending=False
)

print(importance.head(20))

importance.to_csv(
    "reports/feature_importance.csv",
    index=False
)

print("\nFeature Importance Saved Successfully!")