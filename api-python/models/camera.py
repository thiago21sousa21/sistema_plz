class Camera:
    def __init__(self, id, bairro, zona, local):
        self.__id = id
        self.__bairro = bairro
        self.__zona = zona
        self.__local = local
    
    @property
    def id(self):
        return self.__id
    
    @property
    def bairro(self):
        return self.__bairro    
    
    @property
    def zona(self):
        return self.__zona
    
    @property
    def local(self):
        return self.__local
    
    def __str__(self):
        return f"\nid={self.id} \nbairro={self.bairro} \nzona={self.zona} \nlocal={self.local} "