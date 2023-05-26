from fastapi import FastAPI
from routes.user import user  # esta es la ruta creada en el archivo user de rutas
from docs import tags_metadata

app = FastAPI(
    title="REST API with FastAPI and MongoDB",
    description="This is a simple REST API using FastAPI and MongoDB",
    version="0.0.1",
    openapi_tags=tags_metadata
)

# carga de la ruta
app.include_router(user)
