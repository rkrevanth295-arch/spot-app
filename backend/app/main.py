from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text
from .database import engine, Base
from . import models
from .routers import auth, spots, upload
from .schemas import UserResponse
from .auth import get_current_user

Base.metadata.create_all(bind=engine)

inspector = inspect(engine)
if 'spots' in inspector.get_table_names():
    existing_columns = [col['name'] for col in inspector.get_columns('spots')]
    if 'place' not in existing_columns:
        with engine.connect() as conn:
            conn.execute(text('ALTER TABLE spots ADD COLUMN place VARCHAR(100)'))
            conn.commit()

app = FastAPI(title="SPOT", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8000", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(spots.router)
app.include_router(upload.router)

@app.get("/")
def hello():
    return {"message": "SPOT is alive! Database connected."}

@app.get("/users/me", response_model=UserResponse)
def read_current_user(current_user=Depends(get_current_user)):
    return current_user