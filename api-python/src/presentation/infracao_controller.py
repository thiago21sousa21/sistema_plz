from fastapi import APIRouter

from src.schemas.infracao import InfracaoCreate
from src.persistence.infracao_repository import  InfracaoRepository
from src.service.infracao_service import InfracaoService

infracao_router = APIRouter()

@infracao_router.get("/")
def buscar_todos():
    return InfracaoRepository().buscar_todos()

@infracao_router.get("/{id}")
def buscar_por_id(id:int):
    return InfracaoRepository().buscar_por_id(id)

@infracao_router.post("/")
def criar(infracao: InfracaoCreate):
    return InfracaoService().criar(infracao)

@infracao_router.delete("/{id}")
def deletar(id: int):
    return InfracaoRepository().deletar(id)