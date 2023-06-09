from fastapi import APIRouter, Response, status  # Definir todas las rutas
from config.db import conn  # importar el objeto de conexion
from schemas.monitor import monitorEntity, monitorsEntity
from models.monitor import Monitor  # tipo de la entidad
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
import datetime

monitor = APIRouter()


# definicion de las rutas


@monitor.get('/monitor', response_model=list[Monitor], tags=["Monitors"])
def find_all_monitor():
    # cuando se acceda a la ruta monitor se retornara todos los monitors
    # de la connexion a mondo busque en la coleccion monitor todos
    return monitorsEntity(conn.monitor.monitor.find())


@monitor.post('/monitor', response_model=Monitor, tags=["Monitors"])
def save_monitor(monitor: Monitor):
    # Crear nuevo dato de monitoreo
    new_monitor = dict(monitor)
    new_monitor["createdAt"] = datetime.datetime.utcnow()
    new_monitor["updatedAt"] = datetime.datetime.utcnow()
    id = conn.monitor.monitor.insert_one(new_monitor).inserted_id
    # consulta en la base de datos el ultimo dato creado
    monitor_load = conn.monitor.monitor.find_one({"_id": id})
    return monitorEntity(monitor_load)
