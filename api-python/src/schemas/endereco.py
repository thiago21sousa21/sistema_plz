from models.autuado import Autuado
class Endereco:
    def __init__(*,
            self, 
            logradouro =None, 
            cidade, 
            estado, 
            cep,
            bairro=None,
            autuado:Autuado,
            numero=None, 
            complemento=None,
            zona=None
        ):
        self.logradouro = logradouro
        self.numero = numero
        self.cidade = cidade
        self.estado = estado
        self.cep = cep
        self.complemento = complemento
        self.bairro = bairro
        self.zona = zona


    @property
    def rua(self):
        return self.logradouro
    
    @property
    def numero(self):
        return self.numero
    
    @property
    def cidade(self):
        return self.cidade
    
    @property
    def estado(self):
        return self.estado
    
    @property
    def cep(self):
        return self.cep
    
    @property
    def complemento(self):
        return self.complemento
    
    @property
    def bairro(self):
        return self.bairro
    
    @property
    def zona(self):
        return self.zona
    
    @property
    def autuado(self):
        return self.autuado
    
    def __str__(self):
        return f"\nLogradouro: {self.logradouro}\nNúmero: {self.numero}\nBairro: {self.bairro}\nCidade: {self.cidade}\nEstado: {self.estado}\nCEP: {self.cep}\nComplemento: {self.complemento}\nZona: {self.zona}\nAutuado: {self.autuado}"