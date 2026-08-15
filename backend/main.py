import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Add the project root to python path so ml imports work correctly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.routes import auth, assessment, careers, progress
from backend.database import init_db

# Initialize database
init_db()

app = FastAPI(title="AI Career Recommendation API")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"], # Allows all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(assessment.router)
app.include_router(careers.router)
app.include_router(progress.router)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
