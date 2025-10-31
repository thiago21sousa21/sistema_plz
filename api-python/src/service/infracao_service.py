from src.repositorio.infracao_repository import InfracaoRepository
from src.repositorio.fiscal_repository import FiscalRepository
from src.repositorio.evento_repository import EventoRepository
from src.repositorio.autuado_repository import AutuadoRepository
from src.schemas.infracao import InfracaoCreate


class InfracaoService:

    def criar(self, infracao:InfracaoCreate):
        fiscal = FiscalRepository().buscar_por_id(infracao.fiscal_id)
        if not fiscal:
            return "Esse fiscal não existe"
        evento = EventoRepository().buscar_por_id(infracao.evento_id)
        if not evento:
            return "Esse evento não existe"
        autuado = AutuadoRepository().buscar_por_id(infracao.autuado_id)
        if not autuado:
            return "Esse autuado não existe"
        return InfracaoRepository().criar(infracao)
   