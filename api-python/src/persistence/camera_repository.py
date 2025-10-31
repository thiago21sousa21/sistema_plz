from src.schemas.camera import Camera
from src.config.connection.connection import DatabaseConnection

from mysql.connector import Error

class CameraRepository:
    def criar(self, camera: Camera):
        with DatabaseConnection() as cnx:
            try:
                query = "INSERT INTO camera (id, bairro, zona, referencia_local) VALUES (%s, %s, %s, %s)"
                params = [camera.id, camera.bairro, camera.zona, camera.referencia_local]

                cnx.execute_query(query, params)
                cnx.connection.commit()
            except Error as e:
                print(e)
                raise
    
    def buscar_varios(self):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM camera"
                cnx.execute_query(query)
                result = cnx.cursor.fetchall()
                return result
            except Error as e:
                print(e)
                raise
    
    def buscar_por_id(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM camera WHERE id = %s"
                cnx.execute_query(query, [id])
                result = cnx.cursor.fetchall()
                return result
            except Error as e:
                print(e)
                raise


