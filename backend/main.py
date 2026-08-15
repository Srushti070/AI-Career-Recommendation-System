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

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:8443")

origins = [
    "http://localhost:8443",
    "http://127.0.0.1:8443",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]
if frontend_url not in origins:
    origins.append(frontend_url)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(assessment.router)
app.include_router(careers.router)
app.include_router(progress.router)

@app.get("/api/health")
def api_health_check():
    return {"status": "ok"}

@app.get("/health")
def root_health_check():
    return {"status": "ok"}
