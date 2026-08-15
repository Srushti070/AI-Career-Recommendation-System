# pyrefly: ignore [missing-import]
import streamlit as st


st.set_page_config(
    page_title="AI Career Recommendation System",
    page_icon="🎯",
    layout="wide",
    initial_sidebar_state="expanded"
)


# ==========================
# Load CSS
# ==========================

def load_css():

    with open("assets/style.css") as f:

        st.markdown(
            f"<style>{f.read()}</style>",
            unsafe_allow_html=True
        )


load_css()


# ==========================
# Sidebar
# ==========================

st.sidebar.title("🎯 AI Career Recommendation")

st.sidebar.markdown("---")

st.sidebar.success(
    "Machine Learning Based Career Recommendation"
)

st.sidebar.markdown("---")

st.sidebar.info("""
Version 1.0

Random Forest

Accuracy 99.95%
""")


# ==========================
# Home Page
# ==========================

st.title("🎯 AI Career Recommendation System")

st.subheader(
    "Find the most suitable career using Artificial Intelligence"
)

st.markdown("---")


# ==========================
# Project Statistics
# ==========================

col1, col2, col3 = st.columns(3)


with col1:

    st.metric(
        "Career Categories",
        "10"
    )


with col2:

    st.metric(
        "Students",
        "10,000"
    )


with col3:

    st.metric(
        "Model Accuracy",
        "99.95%"
    )


st.markdown("---")


# ==========================
# Welcome
# ==========================

st.header("Welcome!")

st.write("""
This AI Career Recommendation System uses Machine Learning
to recommend the most suitable career for a student based on:

- Academic Performance
- Technical Skills
- Soft Skills
- Interests
- Personality Traits
- Experience
""")

st.info(
    "Use the navigation menu on the left to explore the application."
)