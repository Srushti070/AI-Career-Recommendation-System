from ml.prediction import predict_career
from ml.career_profiles import CAREER_PROFILES
from backend.schemas.assessment import AssessmentRequest, AssessmentResponse

def process_assessment(request: AssessmentRequest) -> AssessmentResponse:
    # Convert Pydantic model to dictionary
    student_data = request.model_dump()
    
    # Fix the C_plus_plus key to match the model's expected "C++"
    if "C_plus_plus" in student_data:
        student_data["C++"] = student_data.pop("C_plus_plus")
        
    # Get prediction using existing ML logic
    career, confidence = predict_career(student_data)
    
    profile = CAREER_PROFILES.get(career, {})
    career_info = profile.get("career_information", {})
    
    # Calculate skill gaps based on the user's skills vs required skills
    skill_gaps = []
    strengths = []
    tech_skills = profile.get("technical_skills", {})
    for skill, level_range in tech_skills.items():
        # Match python variable name convention (e.g. HTML_CSS)
        user_level = student_data.get(skill, 0)
        if user_level < level_range[0]:
            skill_gaps.append(skill)
        elif user_level >= level_range[1]:
            strengths.append(skill)
            
    # If no strengths/gaps found from strict comparison, add some defaults from the top required
    if not strengths:
        strengths = list(tech_skills.keys())[:3]
    if not skill_gaps:
        skill_gaps = list(tech_skills.keys())[-3:]
    
    return AssessmentResponse(
        career=career,
        match_score=float(confidence),
        description=profile.get("description", ""),
        salary_range=career_info.get("salary_range", ""),
        future_scope=career_info.get("future_scope", ""),
        recommended_courses=career_info.get("recommended_courses", []),
        strengths=strengths,
        skill_gaps=skill_gaps
    )
