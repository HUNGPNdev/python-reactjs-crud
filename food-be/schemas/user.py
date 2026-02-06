from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(min_length=6, max_length=72)

class UserLogin(BaseModel):
    username: str  # Can use email as well if you prefer
    password: str

class UserRead(UserBase):
    id: int
    class Config:
        orm_mode = True
