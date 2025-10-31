from mysql.connector import Error

from src.config.connection.connection import DatabaseConnection
from src.schemas.veiculo import VeiculoCreate

class VeiculoRepository:
    def buscar_todos(self):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM veiculo"
                cnx.execute_query(query)
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)
            
    def buscar_por_id(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM veiculo WHERE id = %s"
                cnx.execute_query(query, [id])
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)

    def criar(self, veiculo:VeiculoCreate):
        with DatabaseConnection() as cnx:
            try:
                params = [veiculo.autuado_id, veiculo.cor, veiculo.marca_modelo, veiculo.placa]
                query = "INSERT INTO veiculo (autuado_id, cor, marca_modelo, placa) VALUES (%s, %s, %s, %s)"
                cnx.execute_query(query, params)
                cnx.connection.commit()
                return cnx.cursor.lastrowid
            except Error as e:
                raise(e)
            
    def deletar(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "DELETE FROM veiculo WHERE id = %s"
                cnx.execute_query(query, [id])
                cnx.connection.commit()
                return cnx.cursor.rowcount
            except Error as e:
                raise(e)