from typing import Optional
from pydantic import BaseModel

# creacion del modelo de conexion con la base de datos


class User(BaseModel):  # User hereda de BaseModel
    _id: Optional[str]  # el id es opcional
    name: str
    email: str
    password: str
