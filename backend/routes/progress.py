from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from backend.database import get_completed_tasks, save_completed_tasks
from backend.services.auth_service import get_current_user

router = APIRouter(prefix="/api/progress", tags=["Progress"])

class ProgressData(BaseModel):
    completed_tasks: List[str]

class ProgressResponse(BaseModel):
    completed_tasks: List[str]

@router.get("", response_model=ProgressResponse)
def get_progress(current_user: dict = Depends(get_current_user)):
    tasks = get_completed_tasks(current_user['id'])
    return ProgressResponse(completed_tasks=tasks)

@router.post("")
def save_progress(data: ProgressData, current_user: dict = Depends(get_current_user)):
    save_completed_tasks(current_user['id'], data.completed_tasks)
    return {"status": "success"}

