from pydantic import BaseModel
from datetime import datetime

# CREATE TABLE IF NOT EXISTS veiculo (
#   id INT NOT NULL AUTO_INCREMENT,
#   autuado_id INT NOT NULL,
#   placa VARCHAR(45) NOT NULL,
#   marca_modelo VARCHAR(100) NULL DEFAULT NULL,
#   cor VARCHAR(100) NOT NULL,

#   PRIMARY KEY (id)
# );

class VeiculoBase(BaseModel):
    placa:str
    marca_modelo:str
    cor:str | None = None
    autuado_id: int 

class Veiculo(VeiculoBase):
    id: int

class VeiculoCreate(VeiculoBase):
    pass
