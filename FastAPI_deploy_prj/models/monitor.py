from typing import Optional
from pydantic import BaseModel
import datetime

# creacion del modelo de conexion con la base de datos


class Monitor(BaseModel):  # Monitor hereda de BaseModel
    _id: Optional[str]  # el id s opcional
    place: str
    author: str
    temperature: float
    humidity: float
    createdAt: datetime.datetime
    updatedAt: datetime.datetime
