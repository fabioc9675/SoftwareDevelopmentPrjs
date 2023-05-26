def userEntity(item) -> dict:
    # creacion de los esquemas para almacenar en mongo
    return {
        "id": item["id"],
        "name": item["name"],
        "email": item["email"],
        "password": item["password"]
    }
