# pyrefly: ignore [missing-import]
import streamlit as st
import pandas as pd

st.set_page_config(
    page_title="Career Insights",
    page_icon="📊",
    layout="wide"
)

st.title("📊 Career Insights Dashboard")

st.markdown("---")

# ==========================
# Load Data
# ==========================

df = pd.read_csv("dataset/career_dataset.csv")

feature_importance = pd.read_csv("reports/feature_importance.csv")

# ==========================
# Dataset Overview
# ==========================

st.header("Dataset Overview")

col1, col2, col3 = st.columns(3)

with col1:
    st.metric("Total Students", len(df))

with col2:
    st.metric("Total Features", len(df.columns)-1)

with col3:
    st.metric("Career Categories", df["Career"].nunique())

st.markdown("---")

# ==========================
# Career Distribution
# ==========================

st.header("Career Distribution")

career_counts = df["Career"].value_counts()

st.bar_chart(career_counts)

st.dataframe(career_counts)

st.markdown("---")

# ==========================
# Feature Importance
# ==========================

st.header("Top Important Features")

st.dataframe(feature_importance.head(20))

st.bar_chart(
    feature_importance.set_index("Feature").head(15)
)

st.markdown("---")

# ==========================
# Confusion Matrix
# ==========================

st.header("Confusion Matrix")

st.image(
    "reports/confusion_matrix.png",
    use_container_width=True
)

st.markdown("---")

# ==========================
# Dataset Preview
# ==========================

st.header("Dataset Preview")

st.dataframe(df.head(20))