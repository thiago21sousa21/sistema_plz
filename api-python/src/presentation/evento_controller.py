from fastapi import APIRouter

from src.schemas.evento import EventoCreate
from src.persistence.evento_repository import  EventoRepository
from src.service.evento_service import EventoService

evento_router = APIRouter()

@evento_router.get("/")
def buscar_todos():
    return EventoRepository().buscar_todos()

@evento_router.get("/{id}")
def buscar_por_id(id:int):
    return EventoRepository().buscar_por_id(id)

@evento_router.post("/")
def criar(evento: EventoCreate):
    return EventoService().criar(evento)

@evento_router.delete("/{id}")
def deletar(id: int):
    return EventoRepository().deletar(id)