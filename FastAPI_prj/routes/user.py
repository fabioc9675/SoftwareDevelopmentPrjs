from fastapi import APIRouter  # Definir todas las rutas

user = APIRouter()


@user.get('/users')
def find_all_user():
    # cuando se acceda a la ruta users se retornara todos los usuarios
    return "hello world"


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
