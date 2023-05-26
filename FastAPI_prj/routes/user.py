from fastapi import APIRouter  # Definir todas las rutas

user = APIRouter()


@user.get('/users')
def helloworld():
    # cuando se acceda a la ruta users se retornara el hello world
    return "hello world"
