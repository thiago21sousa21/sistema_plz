from datetime import date
from models.fiscal import Fiscal
class Autuado:
    def __init__(
            self, 
            autor: str, 
            cpf_cnpj: str,
            data: date = date.today(),
            fiscal:Fiscal=None,
        ):
        self.autor = autor
        self.cpf_cnpj = cpf_cnpj
        self.fiscal = fiscal

    def __str__(self):
        return f'\nAutor: {self.autor}\nCPF/CNPJ: {self.cpf_cnpj}\nData: {self.data}\nFiscal: {self.fiscal}'