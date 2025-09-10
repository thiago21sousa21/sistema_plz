from .config_connection import Config
import mysql.connector
from mysql.connector import Error

class Connection:
    def __init__(self, config: Config):
        self.DB_HOST = config.DB_HOST
        self.DB_USER = config.DB_USER
        self.DB_PASSWORD = config.DB_PASSWORD
        self.DB_NAME = config.DB_NAME
        self.DB_PORT = config.DB_PORT
        self.connection = None
        self.cursor = None
    
    def __enter__(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.DB_HOST,
                user=self.DB_USER,
                password=self.DB_PASSWORD,
                database=self.DB_NAME,
                port=self.DB_PORT
            )
            self.cursor = self.connection.cursor(dictionary=True)
            return self
        except Error as e:
            print(f"Error connecting to MySQL Platform: {e}")
            raise

  
    def execute_query(self, query: str, params: tuple = None):
        try:
            self.cursor.execute(query, params)
            self.connection.commit()
            return self.cursor.rowcount
        except Error as e:
            print(f"Error executing query: {e}")
            self.connection.rollback()
            raise

    def select_query(self, query: str, params: tuple = None):
        try:
            self.cursor.execute(query, params)
            return self.cursor.fetchall()
        except Error as e:
            print(f"Error executing select query: {e}")
            raise

    def __exit__(self, exc_type, exc_value, traceback):
        try:
            if self.cursor:
                self.cursor.close()
        except Error as e:
            print(f"Error closing cursor: {e}")
        try:
            if self.connection:
                self.connection.close()
        except Error as e:
            print(f"Error closing connection: {e}")