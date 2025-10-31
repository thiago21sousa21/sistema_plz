from mysql.connector import Error

from src.config.connection.connection import DatabaseConnection
from src.schemas.infracao import InfracaoCreate

class InfracaoRepository:
    def buscar_todos(self):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM infracao"
                cnx.execute_query(query)
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)
            
    def buscar_por_id(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM infracao WHERE id = %s"
                cnx.execute_query(query, [id])
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)

    def criar(self, infracao:InfracaoCreate):
        with DatabaseConnection() as cnx:
            try:
                params = [infracao.fiscal_id, infracao.autuado_id, infracao.evento_id]
                query = """INSERT INTO infracao 
                            (fiscal_id, autuado_id, evento_id) 
                            VALUES (%s, %s, %s)"""
                cnx.execute_query(query, params)
                cnx.connection.commit()
                return cnx.cursor.lastrowid
            except Error as e:
                raise(e)
            
    def deletar(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "DELETE FROM infracao WHERE id = %s"
                cnx.execute_query(query, [id])
                cnx.connection.commit()
                return cnx.cursor.rowcount
            except Error as e:
                raise(e)