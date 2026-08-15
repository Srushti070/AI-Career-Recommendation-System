from fastapi import APIRouter, Depends
from backend.schemas.assessment import AssessmentRequest, AssessmentResponse
from backend.services.recommendation_service import process_assessment
from backend.services.auth_service import get_current_user
from backend.database import save_assessment_and_result, get_latest_result

router = APIRouter(prefix="/api/assessment", tags=["Assessment"])

@router.post("/submit", response_model=AssessmentResponse)
def submit_assessment(request: AssessmentRequest, current_user: dict = Depends(get_current_user)):
    response = process_assessment(request)
    # Save the request payload and result mapping
    save_assessment_and_result(current_user['id'], request.model_dump(), response.model_dump())
    return response

@router.get("/latest", response_model=AssessmentResponse)
def get_latest_assessment(current_user: dict = Depends(get_current_user)):
    result = get_latest_result(current_user['id'])
    if not result:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="No assessment found")
    return AssessmentResponse(**result)
