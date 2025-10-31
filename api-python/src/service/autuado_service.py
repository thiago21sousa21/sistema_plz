from src.persistence.autuado_repository import AutuadoRepository
from src.persistence.fiscal_repository import FiscalRepository
from src.schemas.autuado import AutuadoCreate


class AutuadoService:

    def criar(self, autuado:AutuadoCreate):
        if autuado.fiscal_id:
            fiscal = FiscalRepository().buscar_por_id(autuado.fiscal_id)
            if not fiscal:
                return "Esse fiscal não existe"
        
        return AutuadoRepository().criar(autuado)
        