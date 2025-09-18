from fastapi import FastAPI
from app.routers import users_router, notes_router
from app.db.sql_model import init_db

app = FastAPI(title="Qargo Notes - Backend")

@app.get("/")
def healt():
    return {"message": "The swagger documentation is here /docs"}

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(users_router.router, prefix="/users", tags=["Users"])

app.include_router(notes_router.router, prefix="/notes", tags=["Notes"])