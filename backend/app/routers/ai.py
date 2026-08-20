from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import os

router = APIRouter(prefix="/ai", tags=["AI"])

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "qwen/qwen3.6-27b"

class TripRequest(BaseModel):
    budget: str
    hours: str
    location: str
    vibe: str = ""

class ChatRequest(BaseModel):
    message: str

@router.post("/plan")
async def plan_trip(req: TripRequest):
    prompt = f"""Do not include a thinking block. Do not use markdown, asterisks, slashes, or special characters. Reply directly in plain text only.
You are SPOT's AI trip planner for Hyderabad.
Plan a trip: Budget {req.budget}, Hours {req.hours}, Location {req.location}, Vibe {req.vibe}.
Give 3-4 spots with brief practical notes. Max 150 words."""
    
    response = requests.post(
        GROQ_URL,
        headers={"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"},
        json={"model": MODEL, "messages": [{"role": "user", "content": prompt}], "temperature": 0.7, "max_tokens": 500}
    )
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="AI service error")
    return {"plan": response.json()["choices"][0]["message"]["content"]}

@router.post("/chat")
async def chat(req: ChatRequest):
    prompt = f"""Do not include a thinking block. Do not use markdown, asterisks, slashes, or special characters. Reply directly in plain text only.
You are SPOT's friendly assistant for discovering hidden spots in Hyderabad.
User asks: {req.message}
Be direct, friendly and helpful. Max 80 words."""
    
    response = requests.post(
        GROQ_URL,
        headers={"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"},
        json={"model": MODEL, "messages": [{"role": "user", "content": prompt}], "temperature": 0.7, "max_tokens": 300}
    )
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="AI service error")
    return {"reply": response.json()["choices"][0]["message"]["content"]}