from src.config.connection.connection import DatabaseConnection
from src.schemas.fiscal import CreateFiscal
from mysql.connector import Error

class FiscalRepository:

    def criar(self, fiscal:CreateFiscal):
        with DatabaseConnection() as cnx:
            try:
                params = [fiscal.nome, fiscal.matricula, fiscal.codigo]
                query = "INSERT INTO fiscal (nome, matricula, codigo) VALUES (%s, %s, %s)"
                cnx.execute_query(query, params)
                cnx.connection.commit()
                return cnx.cursor.lastrowid
            except Error as e:
                raise e
    
    def buscar_todos(self):
        with DatabaseConnection() as cnx:
            try:
                cnx.execute_query("SELECT * FROM fiscal")
                return cnx.cursor.fetchall()
            except Error as e:
                raise e
    
    def buscar_por_id(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                cnx.execute_query("SELECT * FROM fiscal WHERE id=%s",[id])
                return cnx.cursor.fetchall()
            except Error as e:
                raise e
    
    def delete_por_id(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                cnx.execute_query("DELETE FROM fiscal WHERE id=%s",[id])
                cnx.connection.commit()
                return cnx.cursor.rowcount
            except Error as e:
                raise e    