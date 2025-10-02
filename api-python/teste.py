from models.evento_camera import EventoCamera

from models.camera import Camera
import os
from  connection.connection import DatabaseConnection

os.system('cls' if os.name == 'nt' else 'clear')
cam = Camera(id=1, bairro="Centro", zona="Norte", local="Av. Brasil")


evento = EventoCamera(
    local="Av. Brasil, 1000",
    fiscal="João da Silva",
    coord="-23.55052,-46.633308",
    e_infracao=True,
    feito=False,
    camera=cam,
    placa="ABC1234",
    consultado=False,
    tipo_veiculo="Carro",
    momento=None
)

def inserir_camera():
    with DatabaseConnection(
        "lixozerodb_teste"
    ) as db:
        sql = """
        INSERT INTO camera (id, bairro, zona, local)
        VALUES (%s, %s, %s, %s)
        """
        values = (cam.id, cam.bairro, cam.zona, cam.local)
        db.execute_query(sql, values)
        print("Camera inserida com sucesso!")

inserir_camera()