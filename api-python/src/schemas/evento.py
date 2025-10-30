from pydantic import BaseModel
from datetime import datetime
# CREATE TABLE IF NOT EXISTS evento (
#   id INT NOT NULL AUTO_INCREMENT,
#   momento DATETIME NOT NULL,
#   proveniencia VARCHAR(45) NOT NULL,
#   placa CHAR(7) NULL DEFAULT NULL,
#   referencia_local VARCHAR(100) NULL DEFAULT NULL,
#   coordenada POINT NULL DEFAULT NULL,
#   e_infracao TINYINT NULL DEFAULT '0',
#   consultado TINYINT NULL DEFAULT '0',
#   descricao_veiculo VARCHAR(100) NULL DEFAULT NULL,
#   descricao_evento  VARCHAR(255) NULL DEFAULT NULL,
#   fiscal_id INT NOT NULL,
#   camera_id INT NULL DEFAULT NULL,
#   PRIMARY KEY (id)
# );

class EventoBase(BaseModel):
    momento: datetime
    proveniencia: str
    placa: str | None = None
    referencia_local: str| None = None
    e_infracao:bool|None = False
    consultado:bool|None = False
    descricao_veiculo:str| None = None
    descricao_evento:str| None = None
    fiscal_id:int
    camera_id:int|None = None


class Evento(EventoBase):
    id: int

class EventoCreate(EventoBase):
    pass
