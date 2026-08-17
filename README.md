### 🚀 AI Career Recommendation System

An AI-powered career guidance platform that helps students discover suitable career paths through personalized assessments, machine-learning-based recommendations, and structured learning roadmaps.

**🌐 Live Demo**

👉 Visit the AI Career Recommendation System
       --->      https://ai-career-recommendation-system-teal.vercel.app/
       
------------------------------------------------------------------------
## 📌 Overview


Choosing the right career path can be difficult when students have different skills, interests, strengths, and learning goals.

The AI Career Recommendation System provides a personalized career discovery experience. Users can create an account, complete a career assessment, receive a recommended career path, review their strengths and skills, and explore next steps toward becoming career-ready.

The platform combines a modern React frontend, FastAPI backend, PostgreSQL persistence, authentication, assessment processing, and a machine-learning recommendation pipeline.

-----------------------------------------------------------------------------------
## ✨ Key Features

### 🎯 Personalized Career Assessment
Users complete a structured assessment based on their interests,
skills, strengths, and preferences.

### 🤖 AI-Based Career Recommendations
The system analyzes assessment information and generates suitable
career recommendations based on the available career dataset and
machine-learning pipeline.

### 📊 Career Match & Insights
Users receive a career match with supporting information about the
recommended career path.

### 🧩 Skill Gap Analysis
The platform identifies relevant skills and highlights areas that
users can improve for their selected career direction.

### 🗺️ Learning Roadmaps
Users can explore structured learning paths and recommended next
steps toward becoming career-ready.

### 📈 Progress Tracking
Users can track their career-development progress through the
platform.

### 🔐 Authentication
The application provides user registration and login functionality
with JWT-based authentication.

### 📱 Responsive User Interface
The frontend is designed as a responsive web application for
different screen sizes.

----------------------------------------------------------------------------
## 🛠️ Tech Stack
----------------------------------------------------------   ------------------------------------------------------
| **Technology** | **Purpose**                           |   | **Technology** | **Purpose**                       |
|------------------|-------------------------------------|   |----------------|-----------------------------------|
| **React 19**     | User interface                      |   |  **Python**    | Backend and ML development        |
| **TypeScript**   | Type-safe development               |   |  **FastAPI**   | REST API                          |
| **Vite**         | Frontend build tooling              |   | **Uvicorn**    | ASGI server                       |
| **Tailwind CSS** | Stylin                              |   |**SQLAlchemy**  | ORM/database interaction          |
| **React Router** | Client-side routing                 |   |**PostgreSQL**  | Relational database               |
| **Axios**        | API communication                   |   | **psycopg2**   | PostgreSQL connectivity           |
| **TanStack React Query** |Server-state/data management |   |**Pydantic / Email Validator** | Request validation |
----------------------------------------------------------   | **python-jose** | JWT authentication               |
                                                             | **bcrypt**      | Password hashing                 |
                                                             ------------------------------------------------------
### Machine Learning
-----------------------------------------           ----------------------------------------
| **Technology** | **Purpose**          |          | **Technology**  | **Purpose**         |
|----------------|--------------------- |          |-----------------|---------------------|
| **Python**     | ML development       |          |**NumPy**        | Numerical computing |
| **Pandas**     | Data processing      |          |**scikit-learn** | Machine learning    |
| **SciPy**      | Scientific computing |          |**Joblib**       | Model persistence   |
-----------------------------------------           ---------------------------------------

-------------------------------------------------------------------------------------------------------------
## 🏗️ System Architecture
```text
                         ┌──────────────────┐
                         │      User        │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │     React Frontend       │
                    │ TypeScript + Vite        │
                    │ Tailwind CSS             │
                    └────────────┬─────────────┘
                                 │
                         REST API / Axios
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      FastAPI Backend     │
                    │          Python          │
                    └────────────┬─────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
      ┌─────────────┐     ┌─────────────┐     ┌──────────────┐
      │    Auth     │     │ Assessment  │     │ ML Pipeline  │
      │ JWT + bcrypt│     │ Processing  │     │ scikit-learn │
      └─────────────┘     └─────────────┘     └──────┬───────┘
             │                   │                    │
             └───────────────────┼────────────────────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │   PostgreSQL     │
                       │   SQLAlchemy     │
                       └──────────────────┘

```

---------------------------------------------------------------------------------------
## 🧠 Example Career Recommendation:

The system can generate a career match such as:

Data Scientist

with supporting information including:

Strengths

Skills

Next steps

Match percentage

Salary range

Career scope

---------------------------------------------------------------------------------------
## 🚀 Deployment

### Frontend

The React + TypeScript frontend is deployed on Vercel.

### Production Website:

https://ai-career-recommendation-system-teal.vercel.app/

### Backend

The FastAPI backend is deployed separately on Render.

### Backend API:

https://ai-career-backend-g27m.onrender.com/

The frontend communicates with the backend through REST API endpoints.

--------------------------------------------------------------------------------

## 🎯 Project Goals

The project aims to:

Help students understand suitable career options

Connect skills and interests with career paths

Provide personalized career recommendations

Turn recommendations into actionable learning paths

Demonstrate a complete full-stack AI/ML application

---------------------------------------------------------------------
## 👩‍💻 Author

Srushti Titarmare

B.Tech — Data Science
Project Repository

https://github.com/Srushti070/AI-Career-Recommendation-System

Live Application

https://ai-career-recommendation-system-teal.vercel.app/

⭐ Support
-

If you find this project interesting, consider giving the repository a ⭐ on GitHub.
