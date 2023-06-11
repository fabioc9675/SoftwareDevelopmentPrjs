from pymongo import MongoClient  # conexion a una base de datos
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("MONGO_URI")

conn = MongoClient(uri)  # , server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    conn.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
