def userEntity(item) -> dict:
    # creacion de los esquemas para almacenar en mongo
    return {
        "id": item["id"],
        "name": item["name"],
        "email": item["email"],
        "password": item["password"]
    }


def usersEntity(entity) -> list:
    # esquema de retorno de todos los usuarios
    [userEntity(item) for item in entity]
