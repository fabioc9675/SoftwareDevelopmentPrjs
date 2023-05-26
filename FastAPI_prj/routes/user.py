from fastapi import APIRouter  # Definir todas las rutas
from config.db import conn  # importar el objeto de conexion
from schemas.user import userEntity, usersEntity

user = APIRouter()


@user.get('/users')
def find_all_user():
    # cuando se acceda a la ruta users se retornara todos los usuarios
    # de la connexion a mondo busque en la coleccion user todos
    return usersEntity(conn.remote.user.find())


@user.post('/users')
def find_all_user():
    # crear nuevo usuario
    return "hello world"


@user.get('/users/{id}')
def find_user():
    # buscar un unico usuario
    return "hello world"


@user.put('/users/{id}')
def update_user():
    # actualizar usuario
    return "hello world"


@user.delete('/users/{id}')
def delete_user():
    # eliminar usuario
    return "hello world"
