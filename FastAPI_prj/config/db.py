from pymongo import MongoClient  # conexion a una base de datos
from pymongo.server_api import ServerApi

uri = "mongodb+srv://fabian:fabian@instrumentation.uqtyxfa.mongodb.net/?retryWrites=true&w=majority"

conn = MongoClient(uri)  # , server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    conn.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
