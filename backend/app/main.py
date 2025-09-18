from fastapi import FastAPI
from app.routers import users_router, notes_router
from app.db.sql_model import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Qargo Notes - Backend")

origins = [
    "http://localhost:5173",   
    "http://127.0.0.1:5173",   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],   # GET, POST, DELETE, etc.
    allow_headers=["*"],   # Authorization, Content-Type, etc.
)

@app.get("/")
def healt():
    return {"message": "The swagger documentation is here /docs"}

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(users_router.router, prefix="/users", tags=["Users"])

app.include_router(notes_router.router, prefix="/notes", tags=["Notes"])