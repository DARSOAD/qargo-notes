from fastapi import Depends, HTTPException, status
from app.schemas.note_schemas import NoteBase, NoteRead
from sqlmodel import Session, select
from app.db.sql_model import get_session
from app.models.notes_model import Note

def create_note_service(payload: NoteBase, user_id: int, session: Session = Depends(get_session)):
    
    exists = session.exec(
        select(Note).where(Note.user_id == user_id, Note.title == payload.title)
    ).first()

    # checking if the title already is in the DB
    if exists:
        raise HTTPException(status_code=409, detail="Note with this title already exists for this user.")

    note = Note(title=payload.title, user_id=user_id, content=payload.content) 
    session.add(note)
    session.commit()
    session.refresh(note)
    return {
        "message": "Note created",
        "note_id": note.id
    }

def list_note_service(user_id:int, session: Session = Depends(get_session)):
    notes = session.exec(
        select(Note).where(Note.user_id == user_id) 
    ).all()

    return [NoteRead.model_validate(n) for n in notes]

def delete_note_service(note_id:int, user_id: int, session: Session = Depends(get_session)):
    note = session.exec(
        select(Note).where(Note.id == note_id, Note.user_id == user_id)
    ).first()

    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found.")

    session.delete(note)
    session.commit()

    return {"message": "Note deleted successfully", "note_id": note_id}