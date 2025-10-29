from datetime import date 
from models.fiscal import Fiscal

class Evento:
    def __init__(
            self, 
            proveniencia:str,
            local:str,
            fiscal:Fiscal,
            id=None,
            coord:str=None, 
            e_infracao:bool=None,
            feito:bool=False,
            #placa:str,
            #momento:date=date.now(), 
            #consultado:bool=False,
            #tipo_veiculo:str=None,
            #camera:Camera=None,
        ):
        self.proveniencia = proveniencia
        self.local = local
        self.coord = coord
        self.e_infracao = e_infracao
        self.feito = feito
        self.fiscal = fiscal
        self.id = id

    def __str__(self):
        return f"\nproveniencia: {self.proveniencia}\nplaca: {self.placa}\nlocal: {self.local}\ncoord: {self.coord}\nmomento: {self.momento}\ne_infracao: {self.e_infracao}\nconsultado: {self.consultado}\nfeito: {self.feito}\ntipo_veiculo: {self.tipo_veiculo}\nfiscal: {self.fiscal}\ncamera: {self.camera}\nid: {self.id}"
