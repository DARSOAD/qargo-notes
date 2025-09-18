# ☕ Qargo-Notes – Technical Test

## 📘 Description
This is a simple end-to-end, full-stack, responsive project where users can register, sign in, and manage notes (create, list, delete). Authentication is mock (simulated token), and notes are persisted in SQLite via FastAPI. The UI prioritizes functionality over styling. A README with installation and usage steps is included.  

Includes:
- **Backend:** FastAPI + SQLModel + SQLite
- **Frontend:** React + Vite + TS + Zustand

### How to run with Docker
In the project root, run
```bash
docker compose --profile prod up --build
```

## Technical Decisions

* **MonoRepo** 
    This project is being developed by a single developer, so a MonoRepo is sufficient and helps reduce local friction with Docker, README, and other files.

📦qargo-notes
 ┣ 📂backend
 ┣ 📂frontend
 ┣ 📜docker-compose.yml
 ┗ 📜README.md

* ## **Backend:** #######

* **FastAPI structure:** 
    For the FastAPI I chose a lightweight layered architecture (routers, schemas, services). It keeps the code simple and testable, while allowing an easy transition to full Clean Architecture if the project scales.

📦backend
 ┣ 📂app
 ┃ ┣ 📂routers
 ┃ ┣ 📂schemas
 ┃ ┣ 📂models
 ┃ ┣ 📂db
 ┃ ┣ 📂services
 ┃ ┣ 📂dependencies
 ┃ ┣ 📂tests
 ┃ ┣ 📜errors.py
 ┃ ┣ 📜requirements.txt
 ┃ ┗ 📜main.py
 ┗ 📜Dockerfile

 * **FastAPI auth:** 
    In this authentication mock, the backend returns a fixed access_token and the associated user_id. The frontend uses user_id to link notes to the corresponding user.

    A simple get_user_id dependency is created, which only retrieves the ID from the header to handle multiple users.

