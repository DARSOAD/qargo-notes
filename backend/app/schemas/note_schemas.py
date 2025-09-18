from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from pydantic import field_validator, ConfigDict

class TitleMixin(SQLModel):
    title: str = Field(min_length=1, max_length=120)

    @field_validator("title", mode="before")
    @classmethod
    def normalize_title(cls, v: str) -> str:
        v = v.strip().title()
        if not v:
            raise ValueError("The title cannot be empty.")
        return v    
    
class ContentMixin(SQLModel):
    content: str = Field(min_length=1)

    @field_validator("content", mode="before")
    @classmethod
    def normalize_content(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("The content cannot be empty.")
        return v    
    
# ---------- Create / Update ----------
class NoteBase(TitleMixin, ContentMixin, SQLModel):
    pass

# ---------- Read ----------
class NoteRead(NoteBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime

class NoteReadList(SQLModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    title: str
    created_at: datetime
    updated_at: datetime