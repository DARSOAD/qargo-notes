from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, String, UniqueConstraint, DateTime, func


class User(SQLModel, table=True):
    __tablename__ = "users"
    __table_args__ = (
        UniqueConstraint("email", name="uq_users_email"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)

    email: str = Field(
        sa_column=Column(String(255), nullable=False, unique=True, index=True)
    )

    name: str = Field(
        sa_column=Column(String(120), nullable=False)
    )

    password: str = Field(
        sa_column=Column(String(255), nullable=False)
    )

    # Timestamps
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    )
