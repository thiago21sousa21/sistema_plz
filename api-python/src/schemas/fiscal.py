from pydantic import BaseModel

class FiscalBase(BaseModel):
    nome:str
    matricula:str
    codigo:str

class Fiscal(FiscalBase):
    id:int