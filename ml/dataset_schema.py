"""
===========================================
AI Career Recommendation System
Dataset Schema
===========================================
"""

# ===============================
# Student Information
# ===============================

student_information = [

    "Student_ID",
    "Age",
    "Gender",
    "Degree",
    "Branch",
    "Semester",
    "CGPA"

]

# ===============================
# Programming Skills
# ===============================

programming_skills = [

    "Python",
    "SQL",
    "Java",
    "C++",
    "JavaScript",
    "HTML_CSS",
    "Data_Structures",
    "OOP"

]

# ===============================
# Data Science Skills
# ===============================

data_science_skills = [

    "Statistics",
    "Mathematics",
    "Machine_Learning",
    "Deep_Learning",
    "Data_Visualization",
    "Pandas",
    "NumPy",
    "Power_BI"

]

# ===============================
# Soft Skills
# ===============================

soft_skills = [

    "Communication",
    "Leadership",
    "Problem_Solving",
    "Critical_Thinking",
    "Creativity",
    "Teamwork",
    "Presentation",
    "Time_Management"

]

# ===============================
# Interests
# ===============================

interests = [

    "AI_Interest",
    "Programming_Interest",
    "Research_Interest",
    "Business_Interest",
    "Cloud_Interest",
    "Cybersecurity_Interest",
    "Finance_Interest",
    "Design_Interest"

]

# ===============================
# Personality
# ===============================

personality = [

    "Analytical_Thinking",
    "Logical_Reasoning",
    "Attention_to_Detail",
    "Decision_Making",
    "Confidence",
    "Adaptability",
    "Curiosity"

]

# ===============================
# Experience
# ===============================

experience = [

    "Projects",
    "Internships",
    "Hackathons",
    "Certifications",
    "GitHub_Activity",
    "Open_Source"

]

# ===============================
# Target
# ===============================

target = [

    "Career"

]


# Combine all features

FEATURES = (

    student_information

    + programming_skills

    + data_science_skills

    + soft_skills

    + interests

    + personality

    + experience

    + target

)

