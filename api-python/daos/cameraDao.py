# daos/cameraDao.py
import logging
from connection.connection import DatabaseConnection
from models.camera import Camera

logging.basicConfig(level=logging.INFO)

class CameraDAO:
    def insert_camera(self, camera_data: Camera) -> Camera:
        try:
            with DatabaseConnection("lixozerodb_teste") as db:
                sql = """
                INSERT INTO camera (bairro, zona, local)
                VALUES (%s, %s, %s, %s)
                RETURNING id, bairro, zona, local; 
                """ 
                values = (camera_data.id, camera_data.bairro, camera_data.zona, camera_data.local)
                
                result = db.execute_query(sql, values, fetch='one') 
                
                if result:
                    created_camera = Camera(id=result[0], bairro=result[1], zona=result[2], local=result[3])
                    logging.info(f"Camera inserida com sucesso: {created_camera.id}")
                    return created_camera
                else:
                    raise Exception("Não foi possível inserir a câmera.")

        except Exception as e:
            logging.error(f"Erro ao inserir câmera no banco de dados: {e}")
            raise e
        
    def get_all_cameras(self) -> list[Camera]:
        try:
            with DatabaseConnection("lixozerodb_teste") as db:
                sql = "SELECT id, bairro, zona, local FROM camera"
                results = db.fetch_all(sql)
                print(results)
                cameras = [Camera(**row) for row in results]
                logging.info(f"{len(cameras)} câmeras recuperadas com sucesso.")
                return cameras
        except Exception as e:
            logging.error(f"Erro ao recuperar câmeras do banco de dados: {e}")
            raise e
        

print(CameraDAO().get_all_cameras())