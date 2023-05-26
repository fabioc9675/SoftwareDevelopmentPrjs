from fastapi import FastAPI
from routes.user import user  # esta es la ruta creada en el archivo user de rutas


app = FastAPI()

# carga de la ruta
app.include_router(user)
