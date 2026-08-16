# 🎯 AI Career Recommendation System

An AI-powered career guidance platform designed to help students
discover suitable career paths through personalized assessments,
career recommendations, skill-gap analysis, and learning roadmaps.

The platform combines a modern React frontend with a Python/FastAPI
backend and machine-learning components to provide a personalized
career discovery experience.

## 🚀 Live Demo

**Frontend:**  
https://ai-career-recommendation-system-teal.vercel.app/

**Backend API:**  
https://ai-career-backend-g27m.onrender.com/

---

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

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │ TypeScript + Vite   │
                    │    Tailwind CSS     │
                    └──────────┬──────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │    FastAPI Backend  │
                    │       Python        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       Authentication      Assessment       ML Pipeline
        JWT + bcrypt       Processing      scikit-learn
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Database       │
                    │    PostgreSQL       │
                    │     SQLAlchemy      │
                    └─────────────────────┘
