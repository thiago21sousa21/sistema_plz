from pydantic import BaseModel

# CREATE TABLE IF NOT EXISTS infracao (
#   id INT NOT NULL AUTO_INCREMENT,
#   fiscal_id INT NOT NULL,
#   evento_id INT NOT NULL,
#   autuado_id INT NOT NULL,
#   PRIMARY KEY (id)
# );

class InfracaoBase(BaseModel):
    fiscal_id: int
    evento_id: int
    autuado_id: int

class Infracao(InfracaoBase):
    id: int

class InfracaoCreate(InfracaoBase):
    pass