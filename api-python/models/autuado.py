class Autuado:
    def __init__(
            self, 
            autor: str, 
            cpf_cnpj: str,
            data: Date = Date.today(),
            fiscal:Fiscal=None,
        ):
        self.autor = autor
        self.cpf_cnpj = cpf_cnpj
        self.fiscal = fiscal

    @property
    def autor(self):
        return self.autor
    
    @property
    def cpf_cnpj(self):
        return self.cpf_cnpj
    
    @property
    def fiscal(self):
        return self.fiscal
    
