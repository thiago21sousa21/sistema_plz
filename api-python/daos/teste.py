from connection.connection import Connection

def test_connection():
    with Connection() as db:
        db.execute_query("CREATE SCHEMA test;")

test_connection()