import os
from dotenv import load_dotenv
import mysql.connector

load_dotenv(".env")

config = {
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "password"),
    "host": os.getenv("DB_HOST", "localhost")
}

connexao = mysql.connector.connect(**config)

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))  
    sql_path = os.path.join(base_dir, "database", "test", "creations", "001_create_tables_without_relation.sql")

    with open(sql_path, "r") as file:
        sql_script = file.read()

    cursor = connexao.cursor()

    for query in sql_script.split(";"):
        if query.strip():  
            cursor.execute(query)
            print(f"Executed query: {query.strip()}")
    connexao.commit()
    cursor.close()
    connexao.close()
