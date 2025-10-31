from mysql.connector import Error

from src.config.connection.connection import DatabaseConnection
from src.schemas.autuado import AutuadoCreate

class AutuadoRepository:
    def buscar_todos(self):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM autuado"
                cnx.execute_query(query)
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)
            
    def buscar_por_id(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM autuado WHERE id = %s"
                cnx.execute_query(query, [id])
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)

    def criar(self, autuado:AutuadoCreate):
        with DatabaseConnection() as cnx:
            try:
                params = [autuado.autor, autuado.cpf_cnpj, autuado.fiscal_id]
                query = "INSERT INTO autuado (autor, cpf_cnpj, fiscal_id) VALUES (%s, %s, %s)"
                cnx.execute_query(query, params)
                cnx.connection.commit()
                return cnx.cursor.lastrowid
            except Error as e:
                raise(e)
            
    def deletar(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "DELETE FROM autuado WHERE id = %s"
                cnx.execute_query(query, [id])
                cnx.connection.commit()
                return cnx.cursor.rowcount
            except Error as e:
                raise(e)