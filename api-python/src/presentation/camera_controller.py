from fastapi import APIRouter
from src.repositorios.camera_repository import CameraRepository
from src.schemas.camera import Camera
camera_router = APIRouter()

camera_repository = CameraRepository()

@camera_router.get("/")
def listar_cameras():
    return camera_repository.buscar_varios()

@camera_router.post("/")
def inserir_camera():
    camera_repository.criar(Camera(id=1, bairro="GURUPI", zona="SUDESTE", referencia_local="PERTO DA UPA"))