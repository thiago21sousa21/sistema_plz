from fastapi import FastAPI, HTTPException, status

from src.repositorios.camera_repository import CameraRepository
from src.schemas.camera import Camera
from src.presentation.camera_controller import camera_router

app = FastAPI()


app.include_router(camera_router, prefix='/cameras')