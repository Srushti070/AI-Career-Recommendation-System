"""
===========================================
AI Career Recommendation System
Dataset Generator
===========================================
"""

import random
import pandas as pd

from pathlib import Path

# pyrefly: ignore [missing-import]
from dataset_schema import FEATURES
from career_profiles import CAREER_PROFILES

def generate_student(career_name):

    profile = CAREER_PROFILES[career_name]

    student = {}

    student["Student_ID"] = random.randint(10000, 99999)

    student["Age"] = random.randint(18, 28)

    student["Gender"] = random.choice(["Male", "Female"])

    student["Degree"] = random.choice([
        "B.Tech",
        "B.Sc",
        "BCA",
        "M.Tech",
        "MCA"
    ])

    student["Branch"] = random.choice([
        "Computer Science",
        "Data Science",
        "Artificial Intelligence",
        "Information Technology"
    ])

    student["Semester"] = random.randint(1, 8)

    student["CGPA"] = round(random.uniform(6.5, 9.9), 2)

    # Generate Technical Skills
    technical_skills = profile["technical_skills"]

    for skill, skill_range in technical_skills.items():

        student[skill] = random.randint(
            skill_range[0],
            skill_range[1])

    # Generate Soft Skills
    soft_skills = profile["soft_skills"]
    for skill, skill_range in soft_skills.items():
        student[skill] = random.randint(
        skill_range[0],
        skill_range[1]
    )

    #Generate Interests
    interests=profile["interests"]

    for interest, interest_range in interests.items():

        student[interest] = random.randint(
            interest_range[0],
            interest_range[1]
        )

    
    # Generate Personality
    personality = profile["personality"]
    for trait, trait_range in personality.items():
        student[trait] = random.randint(
        trait_range[0],
        trait_range[1]
    )

    # Generate Experience
    experience = profile["experience"]
    for item, item_range in experience.items():
        student[item] = random.randint(
        item_range[0],
        item_range[1]
    )

    student["Career"] = career_name

    return student

    
def generate_dataset(number_of_students):

    dataset = []

    careers = list(CAREER_PROFILES.keys())

    for i in range(number_of_students):

        career = random.choice(careers)

        student = generate_student(career)

        dataset.append(student)

    return dataset

print(CAREER_PROFILES.keys())
print(len(CAREER_PROFILES))
dataset = generate_dataset(10000)

df = pd.DataFrame(dataset)

print(df.head())

df.to_csv(
    "dataset/career_dataset.csv",
    index=False
)

print()
print("Dataset Saved Successfully!")
print("Total Students:", len(df))