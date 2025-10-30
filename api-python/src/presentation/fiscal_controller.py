from fastapi import APIRouter, status

from src.repositorio.fiscal_repository import FiscalRepository
from src.schemas.fiscal import CreateFiscal

fiscal_router = APIRouter()
fiscal_repository = FiscalRepository()

@fiscal_router.get("/")
def buscar_todos():
    return fiscal_repository.buscar_todos()

@fiscal_router.get("/{id}")
def buscar_por_id(id: int):
    return fiscal_repository.buscar_por_id(id)

@fiscal_router.post("/")
def criar(dados: CreateFiscal):
    return fiscal_repository.criar(dados)

@fiscal_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar(id: int):
    return fiscal_repository.delete_por_id(id)