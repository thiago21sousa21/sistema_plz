from pydantic import BaseModel

class Camera(BaseModel):
    id: int
    bairro: str
    zona: str
    local: str