from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm

from auth import create_access_token, register_user, authenticate_user, get_current_user
from database import get_db
from schemas.auth import Token, RegisterRequest
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    OAuth2 password flow login endpoint.

    Expects form-encoded body with fields:
      - username
      - password

    Returns a JWT access token on success.
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token_data = {"sub": user.username}
    access_token = create_access_token(token_data)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register")
async def register(
    data: RegisterRequest = Body(...),
    db: Session = Depends(get_db),
):
    """
    User registration endpoint.
    """
    user = register_user(db, data.username, data.email, data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists",
        )

    return {"message": "Register successful"}


@router.get("/me")
async def read_me(current_user=Depends(get_current_user)):
    """
    Protected endpoint to verify token and inspect payload.
    """
    return current_user
