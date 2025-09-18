from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from app.db.sql_model import get_session
from app.schemas.note_schemas import NoteBase
from app.services.notes_services import create_note_service, list_note_service, delete_note_service
from app.dedpendencies.auth import get_current_user_id

router = APIRouter()

@router.post("/create", status_code=status.HTTP_201_CREATED)
def create(payload: NoteBase, session: Session = Depends(get_session), user_id: int = Depends(get_current_user_id)):
    return create_note_service(payload, user_id ,session)

@router.get("/")
def list(user_id: int = Depends(get_current_user_id), session: Session = Depends(get_session)):
    return list_note_service(user_id, session)

@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(note_id:int, user_id: int = Depends(get_current_user_id), session: Session = Depends(get_session)):
    return delete_note_service(note_id, user_id, session)