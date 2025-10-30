from fastapi import APIRouter

from src.schemas.autuado import AutuadoCreate
from src.repositorio.autuado_repository import AutuadoRepository
from src.service.autuado_service import AutuadoService

autuado_router = APIRouter()

@autuado_router.get("/")
def buscar_todos():
    return AutuadoRepository().buscar_todos()

@autuado_router.get("/{id}")
def buscar_por_id(id:int):
    return AutuadoRepository().buscar_por_id(id)

@autuado_router.post("/")
def criar(autuado: AutuadoCreate):
    return AutuadoService().criar(autuado)

@autuado_router.delete("/{id}")
def deletar(id: int):
    return AutuadoRepository().deletar(id)