from pydantic import BaseModel
from typing import List, Dict, Optional, Tuple

class CareerProfileResponse(BaseModel):
    career_name: str
    description: str
    technical_skills: Dict[str, List[int]]
    soft_skills: Dict[str, List[int]]
    interests: Dict[str, List[int]]
    personality: Dict[str, List[int]]
    experience: Dict[str, List[int]]
    career_information: Dict[str, str | List[str]]
