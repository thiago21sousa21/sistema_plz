import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv(".env")

class DatabaseConnection:
    def __init__(self):
        self.connection = None
        self.cursor = None

    def __enter__(self):
        try:
            self.connection = mysql.connector.connect(
                host=os.getenv("DB_HOST",),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                database=os.getenv("DB_NAME"),
                port=int(os.getenv("DB_PORT", 3306))
            )
            if self.connection.is_connected():
                self.cursor = self.connection.cursor(dictionary=True)
                return self
        except Error as e:
            print(f"Error connecting to database: {e}")
            raise

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connection  and self.connection.is_connected():
            self.cursor.close()
            self.connection.close()
            print("Database connection closed.")

    def execute_query(self, query, params=None):
        try:
            self.cursor.execute(query, params or ())
        except Error as e:
            print(f"Error executing query: {e}")
            raise


