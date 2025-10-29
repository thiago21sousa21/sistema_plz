from models.evento_flagrante import EventoFlagrante
from models.camera import Camera
from datetime import datetime

class EventoCamera(EventoFlagrante):
    def __init__(
            self, *,
            proveniencia:str= "FLAGRANTE",
            local:str=None,
            fiscal,
            coord:str=None, 
            e_infracao:bool=False,
            feito:bool=False,
            id=None,
            momento: datetime = datetime.now(),
            camera:Camera,
            placa:str=None,
            consultado:bool=False,
            tipo_veiculo:str=None,
        ):
        super().__init__(
            proveniencia=proveniencia,
            local=local,
            fiscal=fiscal,
            coord=coord,
            e_infracao=e_infracao,
            feito=feito,
            id=id,
            momento=momento
        )
        self.camera = camera
        self.placa = placa
        self.consultado = consultado
        self.tipo_veiculo = tipo_veiculo


    def __str__(self):
        return super().__str__() + f"\ncamera: {self.camera}\nplaca: {self.placa}\nconsultado: {self.consultado}\ntipo_veiculo: {self.tipo_veiculo}"