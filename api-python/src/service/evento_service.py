from src.persistence.evento_repository import EventoRepository
from src.persistence.fiscal_repository import FiscalRepository
from src.persistence.camera_repository import CameraRepository
from src.schemas.evento import EventoCreate


class EventoService:

    def criar(self, evento:EventoCreate):
        fiscal = FiscalRepository().buscar_por_id(evento.fiscal_id)
        if not fiscal:
            return "Esse fiscal não existe"
        camera = CameraRepository().buscar_por_id(evento.camera_id)
        if not camera:
            return "Essa camera não existe"
        return EventoRepository().criar(evento)
   