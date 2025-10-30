 
from src.repositorio.veiculo_repository import VeiculoRepository
from src.repositorio.autuado_repository import AutuadoRepository
from src.schemas.veiculo import VeiculoCreate


class VeiculoService:

    def criar(self, veiculo:VeiculoCreate):
        autuado = AutuadoRepository().buscar_por_id(veiculo.autuado_id)
        if not autuado:
            return "Esse autuado não existe"
        return VeiculoRepository().criar(veiculo)
        