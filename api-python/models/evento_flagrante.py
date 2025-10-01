from models.evento import Evento
from datetime import datetime
class EventoFlagrante(Evento):
    def __init__(
            self, *,
            proveniencia:str,
            local:str,
            fiscal,
            coord:str=None, 
            e_infracao:bool=None,
            feito:bool=False,
            id=None,
            momento: datetime = datetime.now()
        ):
        self.momento = momento
        super().__init__(
            proveniencia=proveniencia,
            local=local,
            fiscal=fiscal,
            coord=coord,
            e_infracao=e_infracao,
            feito=feito,
            id=id
        )

    def __str__(self):
        return super().__str__() + f"\nmomento={self.momento}"