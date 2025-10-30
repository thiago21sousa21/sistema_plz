from pydantic import BaseModel
from datetime import datetime
# CREATE TABLE IF NOT EXISTS autuado (
#   id INT NOT NULL AUTO_INCREMENT,
#   fiscal_id INT NULL DEFAULT NULL,
#   momento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
#   cpf_cnpj VARCHAR(14) NOT NULL UNIQUE,
#   autor VARCHAR(100) NOT NULL,


class AutuadoBase(BaseModel):
    cpf_cnpj:str
    autor:str
    fiscal_id:int | None = None

class Autado(AutuadoBase):
    id: int
    momento:datetime

class AutuadoCreate(AutuadoBase):
    pass
