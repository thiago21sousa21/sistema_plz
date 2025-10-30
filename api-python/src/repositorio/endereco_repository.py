from mysql.connector import Error

from src.config.connection.connection import DatabaseConnection
from src.schemas.endereco import EnderecoCreate

class EnderecoRepository:
    def buscar_todos(self):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM endereco"
                cnx.execute_query(query)
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)
            
    def buscar_por_id(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "SELECT * FROM endereco WHERE id = %s"
                cnx.execute_query(query, [id])
                return cnx.cursor.fetchall()
            except Error as e:
                raise(e)

    def criar(self, endereco:EnderecoCreate):
        with DatabaseConnection() as cnx:
            try:
                params = [
                    endereco.autuado_id,
                    endereco.estado,
                    endereco.cidade,
                    endereco.cep,
                    endereco.bairro,
                    endereco.logradouro,
                    endereco.complemento,
                    endereco.numero
                ]
                query = """INSERT INTO endereco (
                            autuado_id, estado, cidade, cep, bairro, logradouro, complemento, numero) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""
                cnx.execute_query(query, params)
                cnx.connection.commit()
                return cnx.cursor.lastrowid
            except Error as e:
                raise(e)
            
    def deletar(self, id:int):
        with DatabaseConnection() as cnx:
            try:
                query = "DELETE FROM endereco WHERE id = %s"
                cnx.execute_query(query, [id])
                cnx.connection.commit()
                return cnx.cursor.rowcount
            except Error as e:
                raise(e)