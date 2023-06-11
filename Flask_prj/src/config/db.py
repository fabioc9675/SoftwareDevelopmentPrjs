from pymongo import MongoClient
import certifi

from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
ca = certifi.where()


def dbConnection():
    try:
        client = MongoClient(MONGO_URI, tlsCAFile=ca)
        db = client["prueba"]
    except ConnectionError:
        print('Error de conexion con la base de datos')
    return db
