from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """Create a new user account"""
    
    # Check if username or email already exists
    existing_user = db.query(models.User).filter(
        (models.User.username == user_data.username) | 
        (models.User.email == user_data.email)
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered"
        )
    
    # Create new user with hashed password
    new_user = models.User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=auth.hash_password(user_data.password)
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user


@router.post("/login", response_model=schemas.Token)
def login(user_data: schemas.UserLogin, db: Session = Depends(get_db)):
    """Login and receive a JWT token"""
    
    # Find user by username
    user = db.query(models.User).filter(
        models.User.username == user_data.username
    ).first()
    
    # Check if user exists and password is correct
    if not user or not auth.verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # Create JWT token
    access_token = auth.create_access_token(data={"sub": str(user.id)})
    
    return {"access_token": access_token, "token_type": "bearer"}