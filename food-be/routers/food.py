from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.food import Food
from schemas.food import FoodCreate, FoodUpdate, FoodResponse

router = APIRouter()


@router.get("/", response_model=List[FoodResponse])
def get_all_foods(db: Session = Depends(get_db)):
    """Get all foods"""
    foods = db.query(Food).all()
    return foods


@router.get("/{food_id}", response_model=FoodResponse)
def get_food(food_id: int, db: Session = Depends(get_db)):
    """Get a specific food by ID"""
    food = db.query(Food).filter(Food.id == food_id).first()
    if not food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Food with id {food_id} not found"
        )
    return food


@router.post("/", response_model=FoodResponse, status_code=status.HTTP_201_CREATED)
def create_food(food: FoodCreate, db: Session = Depends(get_db)):
    """Create a new food"""
    db_food = Food(**food.model_dump())
    db.add(db_food)
    db.commit()
    db.refresh(db_food)
    return db_food


@router.put("/{food_id}", response_model=FoodResponse)
def update_food(food_id: int, food_update: FoodUpdate, db: Session = Depends(get_db)):
    """Update an existing food"""
    db_food = db.query(Food).filter(Food.id == food_id).first()
    if not db_food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Food with id {food_id} not found"
        )
    
    update_data = food_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_food, key, value)
    
    db.commit()
    db.refresh(db_food)
    return db_food


@router.delete("/{food_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_food(food_id: int, db: Session = Depends(get_db)):
    """Delete a food"""
    db_food = db.query(Food).filter(Food.id == food_id).first()
    if not db_food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Food with id {food_id} not found"
        )
    
    db.delete(db_food)
    db.commit()
    return None
