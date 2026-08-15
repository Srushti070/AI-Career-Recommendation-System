# pyrefly: ignore [missing-import]
import streamlit as st

st.set_page_config(
    page_title="About",
    page_icon="ℹ️",
    layout="wide"
)

st.title("ℹ️ About Project")

st.markdown("---")

st.header("Project Overview")

st.write("""
The AI Career Recommendation System is a Machine Learning application that
recommends the most suitable career path for students based on their
academic performance, technical skills, soft skills, interests,
personality traits, and experience.
""")

st.markdown("---")

st.header("Technologies Used")

st.write("""
- Python
- Pandas
- NumPy
- Scikit-learn
- Streamlit
- Joblib
""")

st.markdown("---")

st.header("Machine Learning")

st.write("""
Algorithms Tested:

- Decision Tree
- Random Forest ⭐
- Logistic Regression
- K-Nearest Neighbors

Best Model:

Random Forest

Accuracy:

99.95%
""")

st.markdown("---")

st.header("Supported Careers")

careers = [
    "Data Scientist",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Analyst",
    "Software Engineer",
    "Cybersecurity Analyst",
    "Cloud Engineer",
    "UI/UX Designer",
    "Business Analyst",
    "Database Administrator"
]

for career in careers:
    st.success(career)

st.markdown("---")

st.header("Developer")

st.info("""
Developed by:

**Srushti Titarmare**

B.Tech Data Science

G.H. Raisoni College of Engineering, Nagpur
""")