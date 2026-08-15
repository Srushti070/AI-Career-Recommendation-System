from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from backend.schemas.auth import UserCreate, UserLogin, UserResponse, Token
from backend.services.auth_service import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from backend.database import create_user, get_user_by_email

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse)
def register(user_in: UserCreate):
    existing_user = get_user_by_email(user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(user_in.password)
    user_id = create_user(user_in.name, user_in.email, hashed_password)
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user"
        )
    
    return UserResponse(id=user_id, name=user_in.name, email=user_in.email)

@router.post("/login", response_model=Token)
def login(user_in: UserLogin):
    user = get_user_by_email(user_in.email)
    if not user or not verify_password(user_in.password, user['password_hash']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user['id'])}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def get_me(current_user: dict = Depends(get_current_user)):
    return UserResponse(id=current_user['id'], name=current_user['name'], email=current_user['email'])
