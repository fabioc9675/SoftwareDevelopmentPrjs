from flask import Flask, request
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

load_dotenv()
uri = os.getenv("MONGO_URI")

app = Flask(__name__)
app.config['MONGO_URI'] = uri  # configuracion de conexion con la base de datos
mongo = PyMongo(app)  # se realiza la conexion con la base de datos


# Creacion de rutas
@app.route('/users', methods=['POST'])
def create_user():
    # Receiving data

    return {'message': 'received'}


if __name__ == "__main__":
    app.run(debug=True)
