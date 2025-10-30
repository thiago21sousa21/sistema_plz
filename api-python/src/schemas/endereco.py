from pydantic import BaseModel

# CREATE TABLE IF NOT EXISTS endereco(
#   id INT PRIMARY KEY AUTO_INCREMENT,
#   autuado_id INT NOT NULL,
#   estado VARCHAR(45) NOT NULL,
#   cidade VARCHAR(45) NOT NULL,
#   cep VARCHAR(45) NOT NULL,
#   bairro VARCHAR(45) NULL DEFAULT NULL,
#   logradouro VARCHAR(45) NULL DEFAULT NULL,
#   numero VARCHAR(45) NULL DEFAULT NULL,
#   complemento VARCHAR(100) NULL DEFAULT NULL
# );

class EnderecoBase(BaseModel):
    autuado_id: int
    estado:str
    cidade: str
    cep: str
    bairro:str | None = None
    logradouro:str | None = None
    complemento:str | None = None
    numero:str | None = None


class Endereco(EnderecoBase):
    id: int

class EnderecoCreate(EnderecoBase):
    pass
