from pydantic import field_validator, EmailStr
from sqlmodel import SQLModel, Field


class EmailMixin(SQLModel):
    email: EmailStr

    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not v:
            raise ValueError("The email cannot be empty.")
        return v    

class UserCreate(EmailMixin, SQLModel):
    name: str = Field(..., min_length=1)
    password: str = Field(min_length=4)

    @field_validator("name")
    @classmethod
    def norm_name(cls, v: str) -> str:
        v = v.strip().title()
        if not v:
            raise ValueError("The name cannot be empty.")
        return v
    
class UserLogin(EmailMixin, SQLModel):
    password: str

class UserRead(EmailMixin, SQLModel):
    id: int