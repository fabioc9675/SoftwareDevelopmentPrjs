from fastapi import APIRouter, Response, status  # Definir todas las rutas
from config.db import conn  # importar el objeto de conexion
from schemas.monitor import monitorEntity, monitorsEntity
from models.monitor import Monitor  # tipo de la entidad
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
import datetime

monitor = APIRouter()


# definicion de las rutas


@monitor.get('/monitor', tags=["Monitors"])
def find_all_monitor():
    # cuando se acceda a la ruta monitor se retornara todos los monitors
    # de la connexion a mondo busque en la coleccion monitor todos
    return monitorsEntity(conn.monitor.monitor.find())


@monitor.get('/monitor/last', tags=["Monitors"])
def find_last_monitor():
    # busqueda del ultimo dato de monitores
    return monitorEntity(conn.monitor.monitor.find_one({}, sort=[('$natural', -1)]))


@monitor.get('/monitor/place/{place}', tags=["Monitors"])
def find_place_monitor(place: str):
    # busqueda del ultimo dato de monitores
    return monitorsEntity(conn.monitor.monitor.find({'place': place}, sort=[('$natural', -1)]))


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


@monitor.put('/monitor/{id}', response_model=Monitor, tags=["Monitors"])
def update_monitor(id: str, monitor: Monitor):
    # actualizar monitor
    monitor = dict(monitor)
    monitor["updatedAt"] = datetime.datetime.utcnow()
    conn.monitor.monitor.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": monitor}
    )
    return monitorEntity(conn.monitor.monitor.find_one({"_id": ObjectId(id)}))


@monitor.delete('/monitor/{id}', status_code=status.HTTP_204_NO_CONTENT, tags=["Monitors"])
def delete_monitor(id: str):
    # eliminar usuario
    monitorEntity(conn.monitor.monitor.find_one_and_delete(
        {"_id": ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)
