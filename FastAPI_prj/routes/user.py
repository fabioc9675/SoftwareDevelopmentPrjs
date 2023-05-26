from fastapi import APIRouter  # Definir todas las rutas
from config.db import conn  # importar el objeto de conexion
from schemas.user import userEntity, usersEntity
from models.user import User  # tipo de la entidad
from passlib.hash import sha256_crypt
from bson import ObjectId

user = APIRouter()


@user.get('/users')
def find_all_user():
    # cuando se acceda a la ruta users se retornara todos los usuarios
    # de la connexion a mondo busque en la coleccion user todos
    return usersEntity(conn.remote.user.find())


@user.post('/users')
def find_all_user(user: User):
    # crear nuevo usuario
    new_user = dict(user)
    new_user["password"] = sha256_crypt.encrypt(new_user['password'])
    del new_user['_id']
    id = conn.remote.user.insert_one(new_user).inserted_id
    # consulta en la base de datos el ultimo dato creado
    user = conn.remote.user.find_one({"_id": id})
    return userEntity(user)


@user.get('/users/{id}')
def find_user(id: str):
    # buscar un unico usuario
    return userEntity(conn.remote.user.find_one({"_id": ObjectId(id)}))


@user.put('/users/{id}')
def update_user():
    # actualizar usuario
    return "hello world"


@user.delete('/users/{id}')
def delete_user():
    # eliminar usuario
    return "hello world"
