from fastapi import APIRouter, HTTPException
from typing import List, Dict
from ml.career_profiles import CAREER_PROFILES
from backend.schemas.career import CareerProfileResponse

router = APIRouter(prefix="/api/careers", tags=["Careers"])

@router.get("", response_model=List[str])
def get_all_careers():
    return list(CAREER_PROFILES.keys())

@router.get("/{career_name}", response_model=CareerProfileResponse)
def get_career_details(career_name: str):
    profile = CAREER_PROFILES.get(career_name)
    if not profile:
        raise HTTPException(status_code=404, detail="Career not found")
    
    return CareerProfileResponse(
        career_name=career_name,
        description=profile.get("description", ""),
        technical_skills=profile.get("technical_skills", {}),
        soft_skills=profile.get("soft_skills", {}),
        interests=profile.get("interests", {}),
        personality=profile.get("personality", {}),
        experience=profile.get("experience", {}),
        career_information=profile.get("career_information", {})
    )
