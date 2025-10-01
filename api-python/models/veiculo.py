from models.autuado import Autuado

class Veiculo:
    def __init__(
            self,
            placa,
            modelo,
            cor,
            autuado:Autuado,
            ano=None,
        ):
        self.placa = placa
        self.modelo = modelo
        self.cor = cor
        self.ano = ano
        self.autuado = autuado

    @property
    def placa(self):
        return self.placa
    
    @property
    def modelo(self):
        return self.modelo
    
    @property
    def cor(self):
        return self.cor
    
    @property
    def ano(self):
        return self.ano
    
    @property
    def autuado(self):
        return self.autuado
    
    def __str__(self):
        return f"\nplaca: {self.placa}\nmodelo: {self.modelo}\ncor: {self.cor}\nano: {self.ano}\nautuado: {self.autuado}"
    
    