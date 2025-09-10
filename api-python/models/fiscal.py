class Fiscal:
    def __init__(
            self, 
            nome: str, 
            matricula: str,
            codigo: str = None,
        ):
        self.nome = nome
        self.matricula = matricula
        self.codigo = codigo

    @property
    def nome(self):
        return self.nome

    @property
    def matricula(self):
        return self.matricula
    
    @property
    def codigo(self):
        return self.codigo
    
