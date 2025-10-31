from fastapi import APIRouter

from src.schemas.endereco import EnderecoCreate
from src.persistence.endereco_repository import  EnderecoRepository
from src.service.endereco_service import EnderecoService

endereco_router = APIRouter()

@endereco_router.get("/")
def buscar_todos():
    return EnderecoRepository().buscar_todos()

@endereco_router.get("/{id}")
def buscar_por_id(id:int):
    return EnderecoRepository().buscar_por_id(id)

@endereco_router.post("/")
def criar(endereco: EnderecoCreate):
    return EnderecoService().criar(endereco)

@endereco_router.delete("/{id}")
def deletar(id: int):
    return EnderecoRepository().deletar(id)