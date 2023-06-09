from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# esta es la ruta creada en el archivo user de rutas
from routes.monitor import monitor
from docs import tags_metadata

app = FastAPI(
    title="REST API with FastAPI and MongoDB",
    description="This is a simple REST API using FastAPI and MongoDB",
    version="0.0.1",
    openapi_tags=tags_metadata
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# carga de la ruta
app.include_router(monitor)
