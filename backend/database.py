import os
import json
from typing import Dict, List, Optional, Any
from pathlib import Path

from sqlalchemy import create_engine, Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.sql import func
from sqlalchemy.exc import IntegrityError

BASE_DIR = Path(__file__).resolve().parent.parent

# Database URL from environment
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///database/app.db")

# Fix for SQLAlchemy requiring postgresql:// instead of postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

if DATABASE_URL.startswith("sqlite:///"):
    DB_PATH = DATABASE_URL.replace("sqlite:///", "")
    # Make relative paths absolute to BASE_DIR
    if not os.path.isabs(DB_PATH):
        DB_PATH = str(BASE_DIR / DB_PATH)
        DATABASE_URL = f"sqlite:///{DB_PATH}"

# For SQLite, we need connect_args to allow multithreading
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Progress(Base):
    __tablename__ = "progress"
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    completed_tasks = Column(Text)

class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    payload = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CareerResult(Base):
    __tablename__ = "career_results"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    career = Column(String, nullable=False)
    match_score = Column(Float, nullable=False)
    data = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

def init_db():
    if DATABASE_URL.startswith("sqlite:///"):
        os.makedirs(os.path.dirname(DB_PATH) or ".", exist_ok=True)
    Base.metadata.create_all(bind=engine)

def get_db():
    # Helper for yielding sessions if needed by FastAPI Depends
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Keep existing synchronous functions but use SQLAlchemy sessions internally

def create_user(name: str, email: str, password_hash: str) -> Optional[int]:
    db = SessionLocal()
    try:
        user = User(name=name, email=email, password_hash=password_hash)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user.id
    except IntegrityError:
        db.rollback()
        return None
    finally:
        db.close()

def _user_to_dict(user: User) -> dict:
    if not user:
        return None
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "password_hash": user.password_hash,
        "created_at": user.created_at
    }

def get_user_by_email(email: str) -> Optional[dict]:
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        return _user_to_dict(user)
    finally:
        db.close()

def get_user_by_id(user_id: int) -> Optional[dict]:
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        return _user_to_dict(user)
    finally:
        db.close()

def save_assessment_and_result(user_id: int, payload: dict, result: dict):
    db = SessionLocal()
    try:
        assessment = Assessment(user_id=user_id, payload=json.dumps(payload))
        db.add(assessment)
        
        career_result = CareerResult(
            user_id=user_id,
            career=result.get("career", ""),
            match_score=result.get("match_score", 0.0),
            data=json.dumps(result)
        )
        db.add(career_result)
        db.commit()
    finally:
        db.close()

def get_latest_result(user_id: int) -> Optional[dict]:
    db = SessionLocal()
    try:
        result = db.query(CareerResult).filter(CareerResult.user_id == user_id).order_by(CareerResult.created_at.desc()).first()
        if result and result.data:
            return json.loads(result.data)
        return None
    finally:
        db.close()

def get_completed_tasks(user_id: int) -> List[str]:
    db = SessionLocal()
    try:
        progress = db.query(Progress).filter(Progress.user_id == user_id).first()
        if progress and progress.completed_tasks:
            return progress.completed_tasks.split(',')
        return []
    finally:
        db.close()

def save_completed_tasks(user_id: int, tasks: List[str]):
    db = SessionLocal()
    try:
        progress = db.query(Progress).filter(Progress.user_id == user_id).first()
        tasks_str = ','.join(tasks)
        if progress:
            progress.completed_tasks = tasks_str
        else:
            progress = Progress(user_id=user_id, completed_tasks=tasks_str)
            db.add(progress)
        db.commit()
    finally:
        db.close()
