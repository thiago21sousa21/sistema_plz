from datetime import date 

class Evento:
    def __init__(
            self, 
            proveniencia:str,
            placa:str,
            local:str,
            fiscal:Fiscal,
            momento:date=date.now(), 
            coord:str=None, 
            e_infracao:bool=True,
            consultado:bool=False,
            feito:bool=False,
            tipo_veiculo:str=None,
            camera:Camera=None,
            id=None
        ):
