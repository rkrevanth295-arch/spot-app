from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime


# ---------- USER SCHEMAS ----------

class UserCreate(BaseModel):
    """Data needed to create a new user (signup form)"""
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    """Data needed to log in"""
    username: str
    password: str


class UserResponse(BaseModel):
    """Data returned when asking about a user (no password!)"""
    id: UUID
    username: str
    email: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- TOKEN SCHEMA ----------

class Token(BaseModel):
    """The JWT token returned after login"""
    access_token: str
    token_type: str = "bearer"


# ---------- SPOT SCHEMAS ----------

class SpotCreate(BaseModel):
    name: str
    place: Optional[str] = None
    category: str
    description: Optional[str] = None
    latitude: float
    longitude: float
    image_url: Optional[str] = None
    verification_status: Optional[str] = "verified"


class SpotResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    place: Optional[str] = None
    category: str
    description: Optional[str]
    latitude: float
    longitude: float
    image_url: Optional[str]
    status: str
    verification_status: Optional[str] = None
    verification_status: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class SavedSpotResponse(BaseModel):
    id: UUID
    user_id: UUID
    spot_id: UUID
    created_at: datetime
    spot: Optional[SpotResponse] = None

    class Config:
        from_attributes = True