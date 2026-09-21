from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
import requests
import os

from .. import models, auth

router = APIRouter(prefix="/ai", tags=["AI"])

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "openai/gpt-oss-120b"


class TripRequest(BaseModel):
    budget: str = Field(max_length=40)
    hours: str = Field(max_length=20)
    location: str = Field(max_length=120)
    vibe: str = Field(default="", max_length=120)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=400)


def groq_complete(prompt: str, max_tokens: int):
    if not GROQ_API_KEY:
        raise HTTPException(status_code=503, detail="AI is not configured")
    response = requests.post(
        GROQ_URL,
        headers={"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"},
        json={"model": MODEL, "messages": [{"role": "user", "content": prompt}], "temperature": 0.7, "max_tokens": max_tokens},
        timeout=20,
    )
    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="AI service error")
    return response.json()["choices"][0]["message"]["content"]


@router.post("/plan")
async def plan_trip(req: TripRequest, current_user: models.User = Depends(auth.get_current_user)):
    prompt = (
        "Reply in plain text only. You are SPOT's trip planner for Hyderabad. "
        f"Plan a trip: Budget {req.budget}, Hours {req.hours}, Location {req.location}, Vibe {req.vibe}. "
        "Give 3-4 spots with brief practical notes. Max 150 words."
    )
    return {"plan": groq_complete(prompt, 500)}


@router.post("/chat")
async def chat(req: ChatRequest, current_user: models.User = Depends(auth.get_current_user)):
    prompt = (
        "Reply in plain text only. You are SPOT's assistant for hidden spots in Hyderabad. "
        f"User asks: {req.message} Be direct and helpful. Max 80 words."
    )
    return {"reply": groq_complete(prompt, 300)}
