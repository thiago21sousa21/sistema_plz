from src.persistence.endereco_repository import EnderecoRepository
from src.persistence.autuado_repository import AutuadoRepository
from src.schemas.endereco import EnderecoCreate


class EnderecoService:

    def criar(self, endereco:EnderecoCreate):
        autuado = AutuadoRepository().buscar_por_id(endereco.autuado_id)
        if not autuado:
            return "Esse autuado não existe"
        return EnderecoRepository().criar(endereco)
   