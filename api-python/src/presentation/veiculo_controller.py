from fastapi import APIRouter

from src.schemas.veiculo import VeiculoCreate
from src.persistence.veiculo_repository import VeiculoRepository
from src.service.veiculo_service import VeiculoService

veiculo_router = APIRouter()

@veiculo_router.get("/")
def buscar_todos():
    return VeiculoRepository().buscar_todos()

@veiculo_router.get("/{id}")
def buscar_por_id(id:int):
    return VeiculoRepository().buscar_por_id(id)

@veiculo_router.post("/")
def criar(veiculo: VeiculoCreate):
    return VeiculoService().criar(veiculo)

@veiculo_router.delete("/{id}")
def deletar(id: int):
    return VeiculoRepository().deletar(id)