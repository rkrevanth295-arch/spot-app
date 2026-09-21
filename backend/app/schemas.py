from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID
from datetime import datetime


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: UUID
    username: str
    email: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class SpotCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    place: Optional[str] = Field(default=None, max_length=100)
    category: str = Field(min_length=2, max_length=30)
    description: Optional[str] = Field(default=None, max_length=1000)
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
    image_url: Optional[str] = Field(default=None, max_length=500)
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
