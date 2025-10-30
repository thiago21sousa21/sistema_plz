from mysql.connector import Error

from src.config.connection.connection import DatabaseConnection
from src.schemas.evento import EventoCreate

class EventoRepository:
    def buscar_todos(self):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM evento"
                cnx.execute_query(query)
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)
            
    def buscar_por_id(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM evento WHERE id = %s"
                cnx.execute_query(query, [id])
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)

    def criar(self, evento:EventoCreate):
        with DatabaseConnection() as cnx:
            try:
                params = [
                    evento.momento,
                    evento.proveniencia,
                    evento.placa,
                    evento.referencia_local,
                    evento.e_infracao,
                    evento.consultado,
                    evento.descricao_veiculo,
                    evento.descricao_evento,
                    evento.fiscal_id,
                    evento.camera_id
                ]
                query = """INSERT INTO evento 
                            (
                                momento,
                                proveniencia,
                                placa,
                                referencia_local,
                                e_infracao,
                                consultado,
                                descricao_veiculo,
                                descricao_evento,
                                fiscal_id,
                                camera_id
                            ) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
                cnx.execute_query(query, params)
                cnx.connection.commit()
                return cnx.cursor.lastrowid
            except Error as e:
                raise(e)
            
    def deletar(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "DELETE FROM evento WHERE id = %s"
                cnx.execute_query(query, [id])
                cnx.connection.commit()
                return cnx.cursor.rowcount
            except Error as e:
                raise(e)