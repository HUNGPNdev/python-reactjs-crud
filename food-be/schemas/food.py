from pydantic import BaseModel, Field
from typing import Optional


class FoodBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    category: Optional[str] = Field(None, max_length=50)
    price: float = Field(..., gt=0)
    calories: Optional[int] = Field(None, ge=0)


class FoodCreate(FoodBase):
    pass


class FoodUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    category: Optional[str] = Field(None, max_length=50)
    price: Optional[float] = Field(None, gt=0)
    calories: Optional[int] = Field(None, ge=0)


class FoodResponse(FoodBase):
    id: int
    
    class Config:
        from_attributes = True
