from pydantic import BaseModel

class CameraBase(BaseModel):
    id: int
    bairro: str
    zona: str
    referencia_local: str

class Camera(CameraBase):
    pass

class CreateCamera(CameraBase):
    pass
