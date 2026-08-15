"""
============================================================
AI Career Recommendation System
Data Analysis
============================================================
"""

import pandas as pd

# Load Dataset
df = pd.read_csv("dataset/career_dataset.csv")

print("=" * 60)
print("AI Career Recommendation System")
print("Dataset Analysis")
print("=" * 60)

# Shape
print("\nDataset Shape")
print(df.shape)

# Columns
print("\nColumns")
print(df.columns.tolist())

# Data Types
print("\nData Types")
print(df.dtypes)

# Missing Values
print("\nMissing Values")
print(df.isnull().sum())

# Duplicate Rows
print("\nDuplicate Rows")
print(df.duplicated().sum())

# Statistics
print("\nStatistics")
print(df.describe())

# Career Distribution
print("\nCareer Distribution")
print(df["Career"].value_counts())