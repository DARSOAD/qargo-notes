from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from db.sql_model import get_session
from models.users_model import User
from schemas.users_schemas import UserCreate, UserRead, UserLogin

router = APIRouter()

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, session: Session = Depends(get_session)):
    email = payload.email
    exists = session.exec(select(User).where(User.email == email)).first()

    # checking if email already is in the DB
    if exists:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(email=email, password=payload.password, name=payload.name)  # plain text (mock)
    session.add(user)
    session.commit()
    session.refresh(user)
    return {
        "access_token": "mock-token-123",
        "token_type": "bearer",
        "user_id": user.id, # for CRUD control, avoid this in productions enviroments
        "email": user.email
    }

@router.post("/login")
def login(payload: UserLogin, session: Session = Depends(get_session)):
    email = payload.email
    user = session.exec(select(User).where(User.email == email)).first()
    if not user or user.password != payload.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "access_token": "mock-token-123",
        "token_type": "bearer",
        "user_id": user.id # for CRUD control, avoid this in productions enviroments
    } 

@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserRead(id=user.id, email=user.email)