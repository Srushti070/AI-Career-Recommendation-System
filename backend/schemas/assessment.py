from pydantic import BaseModel
from typing import List, Optional

class AssessmentRequest(BaseModel):
    Age: int
    Gender: str
    Degree: str
    Branch: str
    Semester: int
    CGPA: float

    Python: int
    SQL: int
    Java: int
    C_plus_plus: int
    JavaScript: int
    HTML_CSS: int

    Data_Structures: int
    OOP: int
    Statistics: int
    Mathematics: int
    Machine_Learning: int
    Deep_Learning: int
    Data_Visualization: int
    Pandas: int
    NumPy: int
    Power_BI: int

    Communication: int
    Leadership: int
    Problem_Solving: int
    Critical_Thinking: int
    Creativity: int
    Teamwork: int
    Presentation: int
    Time_Management: int

    AI_Interest: int
    Programming_Interest: int
    Research_Interest: int
    Business_Interest: int
    Cloud_Interest: int
    Cybersecurity_Interest: int
    Finance_Interest: int
    Design_Interest: int

    Analytical_Thinking: int
    Logical_Reasoning: int
    Attention_to_Detail: int
    Decision_Making: int
    Confidence: int
    Adaptability: int
    Curiosity: int

    Projects: int
    Internships: int
    Hackathons: int
    Certifications: int
    GitHub_Activity: int
    Open_Source: int

class AssessmentResponse(BaseModel):
    career: str
    match_score: float
    description: str
    salary_range: str
    future_scope: str
    recommended_courses: List[str]
    strengths: List[str]
    skill_gaps: List[str]
