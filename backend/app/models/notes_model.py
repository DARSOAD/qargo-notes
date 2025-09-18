from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Text, UniqueConstraint, DateTime, func


class Note(SQLModel, table=True):
    __tablename__ = "notes"
    __table_args__ = (
        UniqueConstraint("user_id", "title", name="uq_user_title"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="users.id", index=True)

    title: str = Field(index=True, min_length=1, max_length=120)

    content: str = Field(sa_column=Column(Text, nullable=False))

    # Timestamps
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    )
    updated_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    )
