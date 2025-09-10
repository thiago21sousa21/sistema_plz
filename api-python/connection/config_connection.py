from dotenv import load_dotenv
import os

current_directory = os.path.dirname(os.path.abspath(__file__))
local_path = os.path.join(current_directory, '..', '.env')
load_dotenv(local_path)

class Config:
    DB_HOST = os.getenv('DB_HOST')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_NAME = os.getenv('DB_NAME')
    DB_PORT = os.getenv('DB_PORT')
