# pyrefly: ignore [missing-import]
import pandas as pd
# pyrefly: ignore [missing-import]
import joblib

from sklearn.model_selection import train_test_split

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier

from sklearn.metrics import accuracy_score


# ===========================
# Load Dataset
# ===========================

df = pd.read_csv("dataset/preprocessed_dataset.csv")

print("Dataset Loaded Successfully!\n")


# ===========================
# Features and Target
# ===========================

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
# Models
# ===========================

models = {

    "Decision Tree": DecisionTreeClassifier(random_state=42),

    "Random Forest": RandomForestClassifier(

        n_estimators=200,
        random_state=42

    ),

    "Logistic Regression": LogisticRegression(

        max_iter=1000

    ),

    "KNN": KNeighborsClassifier(

        n_neighbors=5

    )

}


# ===========================
# Training
# ===========================

best_model = None
best_accuracy = 0
best_model_name = ""


print("=" * 50)
print("Training Models")
print("=" * 50)

for name, model in models.items():

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(

        y_test,
        predictions

    )

    print(f"{name} Accuracy : {accuracy:.4f}")

    if accuracy > best_accuracy:

        best_accuracy = accuracy
        best_model = model
        best_model_name = name


# ===========================
# Save Best Model
# ===========================

joblib.dump(

    best_model,
    "model/career_prediction_model.pkl"

)


print("\n" + "=" * 50)
print("Best Model :", best_model_name)
print("Accuracy   :", round(best_accuracy * 100, 2), "%")
print("=" * 50)

print("\nModel Saved Successfully!")