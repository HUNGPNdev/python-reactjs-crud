from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import food
from routers import auth
import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Food API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(food.router, prefix="/api/foods", tags=["foods"])
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Food API"}
