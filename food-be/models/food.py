from sqlalchemy import Column, Integer, String, Float, Text
from database import Base


class Food(Base):
    __tablename__ = "foods"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(50), nullable=True)
    price = Column(Float, nullable=False)
    calories = Column(Integer, nullable=True)
