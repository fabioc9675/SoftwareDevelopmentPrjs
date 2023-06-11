def userEntity(item) -> dict:
    # creacion de los esquemas para almacenar en mongo
    return {
        "_id": str(item["_id"]),
        "name": item["name"],
        "email": item["email"],
        "password": item["password"]
    }


def usersEntity(entity) -> list:
    # esquema de retorno de todos los usuarios
    return [userEntity(item) for item in entity]
