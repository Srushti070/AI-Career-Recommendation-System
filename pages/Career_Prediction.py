# pyrefly: ignore [missing-import]

# pyrefly: ignore [missing-import]
import streamlit as st
import pandas as pd
# pyrefly: ignore [missing-import]
import joblib

from ml.career_profiles import CAREER_PROFILES


# ============================================================
# PAGE CONFIGURATION
# ============================================================

st.set_page_config(
    page_title="Career Prediction",
    page_icon="🎯",
    layout="wide"
)


# ============================================================
# LOAD MODEL AND PREPROCESSING FILES
# ============================================================

@st.cache_resource
def load_model_files():

    model = joblib.load(
        "model/career_prediction_model.pkl"
    )

    scaler = joblib.load(
        "model/scaler.pkl"
    )

    encoders = joblib.load(
        "model/label_encoders.pkl"
    )

    return model, scaler, encoders


model, scaler, encoders = load_model_files()

career_encoder = encoders["Career"]


# ============================================================
# FEATURE NAMES
# ============================================================

df = pd.read_csv(
    "dataset/preprocessed_dataset.csv"
)

feature_names = (
    df.drop("Career", axis=1)
    .columns
)


# ============================================================
# PAGE TITLE
# ============================================================

st.title("🎯 AI Career Prediction")

st.markdown(
    "### Find the most suitable career using Artificial Intelligence"
)

st.markdown("---")


# ============================================================
# STUDENT INFORMATION
# ============================================================

st.header("👨‍🎓 Student Information")

col1, col2 = st.columns(2)


with col1:

    age = st.number_input(
        "Age",
        min_value=18,
        max_value=30,
        value=21
    )

    gender = st.selectbox(
        "Gender",
        [
            "Male",
            "Female"
        ]
    )

    degree = st.selectbox(
        "Degree",
        [
            "B.Tech",
            "B.Sc",
            "BCA",
            "M.Tech",
            "MCA"
        ]
    )


with col2:

    branch = st.selectbox(
        "Branch",
        [
            "Computer Science",
            "Data Science",
            "Artificial Intelligence",
            "Information Technology"
        ]
    )

    semester = st.slider(
        "Semester",
        min_value=1,
        max_value=8,
        value=6
    )

    cgpa = st.slider(
        "CGPA",
        min_value=5.0,
        max_value=10.0,
        value=8.0,
        step=0.1
    )


st.markdown("---")


# ============================================================
# TECHNICAL SKILLS
# ============================================================

st.header("💻 Technical Skills")

col1, col2, col3 = st.columns(3)


with col1:

    python = st.slider(
        "Python",
        1,
        5,
        3
    )

    sql = st.slider(
        "SQL",
        1,
        5,
        3
    )

    java = st.slider(
        "Java",
        1,
        5,
        3
    )

    cpp = st.slider(
        "C++",
        1,
        5,
        3
    )

    javascript = st.slider(
        "JavaScript",
        1,
        5,
        2
    )

    html = st.slider(
        "HTML/CSS",
        1,
        5,
        2
    )


with col2:

    data_structures = st.slider(
        "Data Structures",
        1,
        5,
        3
    )

    oop = st.slider(
        "OOP",
        1,
        5,
        3
    )

    statistics = st.slider(
        "Statistics",
        1,
        5,
        3
    )

    mathematics = st.slider(
        "Mathematics",
        1,
        5,
        3
    )

    machine_learning = st.slider(
        "Machine Learning",
        1,
        5,
        3
    )

    deep_learning = st.slider(
        "Deep Learning",
        1,
        5,
        2
    )


with col3:

    data_visualization = st.slider(
        "Data Visualization",
        1,
        5,
        3
    )

    pandas = st.slider(
        "Pandas",
        1,
        5,
        3
    )

    numpy = st.slider(
        "NumPy",
        1,
        5,
        3
    )

    power_bi = st.slider(
        "Power BI",
        1,
        5,
        2
    )


# ============================================================
# SOFT SKILLS
# ============================================================

st.header("🤝 Soft Skills")

col1, col2 = st.columns(2)


with col1:

    communication = st.slider(
        "Communication",
        1,
        5,
        3
    )

    leadership = st.slider(
        "Leadership",
        1,
        5,
        3
    )

    problem_solving = st.slider(
        "Problem Solving",
        1,
        5,
        3
    )

    critical_thinking = st.slider(
        "Critical Thinking",
        1,
        5,
        3
    )


with col2:

    creativity = st.slider(
        "Creativity",
        1,
        5,
        3
    )

    teamwork = st.slider(
        "Teamwork",
        1,
        5,
        3
    )

    presentation = st.slider(
        "Presentation",
        1,
        5,
        3
    )

    time_management = st.slider(
        "Time Management",
        1,
        5,
        3
    )


# ============================================================
# INTERESTS
# ============================================================

st.header("❤️ Interests")

col1, col2 = st.columns(2)


with col1:

    ai_interest = st.slider(
        "AI Interest",
        1,
        5,
        3
    )

    programming_interest = st.slider(
        "Programming Interest",
        1,
        5,
        3
    )

    research_interest = st.slider(
        "Research Interest",
        1,
        5,
        3
    )

    business_interest = st.slider(
        "Business Interest",
        1,
        5,
        3
    )


with col2:

    cloud_interest = st.slider(
        "Cloud Interest",
        1,
        5,
        3
    )

    cyber_interest = st.slider(
        "Cybersecurity Interest",
        1,
        5,
        3
    )

    finance_interest = st.slider(
        "Finance Interest",
        1,
        5,
        3
    )

    design_interest = st.slider(
        "Design Interest",
        1,
        5,
        3
    )


# ============================================================
# PERSONALITY
# ============================================================

st.header("🧠 Personality Traits")

col1, col2, col3 = st.columns(3)


with col1:

    analytical = st.slider(
        "Analytical Thinking",
        1,
        5,
        3
    )

    logical = st.slider(
        "Logical Reasoning",
        1,
        5,
        3
    )

    attention = st.slider(
        "Attention to Detail",
        1,
        5,
        3
    )


with col2:

    decision = st.slider(
        "Decision Making",
        1,
        5,
        3
    )

    confidence = st.slider(
        "Confidence",
        1,
        5,
        3
    )


with col3:

    adaptability = st.slider(
        "Adaptability",
        1,
        5,
        3
    )

    curiosity = st.slider(
        "Curiosity",
        1,
        5,
        3
    )


# ============================================================
# EXPERIENCE
# ============================================================

st.header("🏆 Experience")

col1, col2, col3 = st.columns(3)


with col1:

    projects = st.slider(
        "Projects",
        0,
        10,
        2
    )

    internships = st.slider(
        "Internships",
        0,
        5,
        1
    )


with col2:

    hackathons = st.slider(
        "Hackathons",
        0,
        10,
        1
    )

    certifications = st.slider(
        "Certifications",
        0,
        10,
        2
    )


with col3:

    github = st.slider(
        "GitHub Activity",
        0,
        5,
        2
    )

    opensource = st.slider(
        "Open Source",
        0,
        5,
        1
    )


# ============================================================
# PREDICTION BUTTON
# ============================================================

st.markdown("---")

predict_button = st.button(
    "🎯 Predict Career",
    use_container_width=True
)


# ============================================================
# PREDICTION
# ============================================================

if predict_button:

    student = {

        "Age": age,
        "Gender": gender,
        "Degree": degree,
        "Branch": branch,
        "Semester": semester,
        "CGPA": cgpa,

        "Python": python,
        "SQL": sql,
        "Java": java,
        "C++": cpp,
        "JavaScript": javascript,
        "HTML_CSS": html,

        "Data_Structures": data_structures,
        "OOP": oop,
        "Statistics": statistics,
        "Mathematics": mathematics,
        "Machine_Learning": machine_learning,
        "Deep_Learning": deep_learning,
        "Data_Visualization": data_visualization,
        "Pandas": pandas,
        "NumPy": numpy,
        "Power_BI": power_bi,

        "Communication": communication,
        "Leadership": leadership,
        "Problem_Solving": problem_solving,
        "Critical_Thinking": critical_thinking,
        "Creativity": creativity,
        "Teamwork": teamwork,
        "Presentation": presentation,
        "Time_Management": time_management,

        "AI_Interest": ai_interest,
        "Programming_Interest": programming_interest,
        "Research_Interest": research_interest,
        "Business_Interest": business_interest,
        "Cloud_Interest": cloud_interest,
        "Cybersecurity_Interest": cyber_interest,
        "Finance_Interest": finance_interest,
        "Design_Interest": design_interest,

        "Analytical_Thinking": analytical,
        "Logical_Reasoning": logical,
        "Attention_to_Detail": attention,
        "Decision_Making": decision,
        "Confidence": confidence,
        "Adaptability": adaptability,
        "Curiosity": curiosity,

        "Projects": projects,
        "Internships": internships,
        "Hackathons": hackathons,
        "Certifications": certifications,
        "GitHub_Activity": github,
        "Open_Source": opensource
    }


    # ========================================================
    # CREATE INPUT DATAFRAME
    # ========================================================

    input_df = pd.DataFrame(
        [student]
    )


    # ========================================================
    # ENCODE CATEGORICAL FEATURES
    # ========================================================

    for column, encoder in encoders.items():

        if column == "Career":
            continue

        if column in input_df.columns:

            input_df[column] = encoder.transform(
                input_df[column]
            )


    # ========================================================
    # ENSURE CORRECT FEATURE ORDER
    # ========================================================

    input_df = input_df[
        feature_names
    ]


    # ========================================================
    # SCALE FEATURES
    # ========================================================

    scaled = scaler.transform(
        input_df
    )


    scaled_df = pd.DataFrame(
        scaled,
        columns=feature_names
    )


    # ========================================================
    # PREDICT
    # ========================================================

    prediction = model.predict(
        scaled_df
    )[0]


    probability = (
        model.predict_proba(
            scaled_df
        ).max() * 100
    )


    career = career_encoder.inverse_transform(
        [prediction]
    )[0]


    # ========================================================
    # CAREER PROFILE
    # ========================================================

    profile = CAREER_PROFILES[
        career
    ]


    # ========================================================
    # DISPLAY RESULT
    # ========================================================

    st.markdown("---")

    st.success(
        "Prediction Completed Successfully! 🎉"
    )

    st.header(
        f"🎯 Recommended Career: {career}"
    )


    col1, col2 = st.columns(2)


    with col1:

        st.metric(
            "Confidence",
            f"{probability:.2f}%"
        )


    with col2:

        st.metric(
            "Model",
            "Random Forest"
        )


    # ========================================================
    # DESCRIPTION
    # ========================================================

    st.subheader(
        "📋 Career Description"
    )

    st.write(
        profile["description"]
    )


    # ========================================================
    # SALARY & FUTURE SCOPE
    # ========================================================

    col1, col2 = st.columns(2)


    with col1:

        st.info(
            f"""
            💰 **Salary Range**

            {profile["career_information"]["salary_range"]}
            """
        )


    with col2:

        st.info(
            f"""
            📈 **Future Scope**

            {profile["career_information"]["future_scope"]}
            """
        )


    # ========================================================
    # RECOMMENDED COURSES
    # ========================================================

    st.subheader(
        "📚 Recommended Courses"
    )


    for course in profile[
        "career_information"
    ]["recommended_courses"]:

        st.write(
            "✅",
            course
        )


    # ========================================================
    # TECHNICAL SKILLS
    # ========================================================

    st.subheader(
        "💻 Technical Skills"
    )


    skills = pd.DataFrame({

        "Skill":
        list(
            profile[
                "technical_skills"
            ].keys()
        ),

        "Required Level":
        [
            f"{value[0]} - {value[1]}"
            for value in
            profile[
                "technical_skills"
            ].values()
        ]

    })


    st.dataframe(
        skills,
        use_container_width=True,
        hide_index=True
    )