from fastapi import APIRouter, status
from src.repositorios.camera_repository import CameraRepository
from src.schemas.camera import CreateCamera, Camera
camera_router = APIRouter()

camera_repository = CameraRepository()

@camera_router.get("/")
def listar_cameras():
    return camera_repository.buscar_varios()

@camera_router.get("/{id}")
def buscar_uma(id:int):
    return camera_repository.buscar_por_id(id)

@camera_router.post("/", status_code=status.HTTP_201_CREATED)
def inserir_camera(dados: CreateCamera):
    camera:Camera = Camera(**dados.model_dump())
    return camera_repository.criar(camera)