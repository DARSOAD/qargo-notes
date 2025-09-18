from fastapi import APIRouter, Depends,  status
from sqlmodel import Session
from app.db.sql_model import get_session
from app.schemas.users_schemas import UserCreate, UserRead, UserLogin
from app.services.users_services import create_user_service, login_service, get_user_service

router = APIRouter()

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, session: Session = Depends(get_session)):
    return create_user_service(payload,session)

@router.post("/login")
def login(payload: UserLogin, session: Session = Depends(get_session)):
    return login_service(payload,session)

@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, session: Session = Depends(get_session)):
    return get_user_service(user_id, session)