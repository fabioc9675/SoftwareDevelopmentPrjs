def monitorEntity(item) -> dict:
    # creacion de los esquemas para almacenar en mongo
    return {
        "_id": str(item["_id"]),
        "place": item["place"],
        "author": item["author"],
        "temperature": item["temperature"],
        "humidity": item["humidity"],
        "createdAt": item["createdAt"],
        "updatedAt": item["updatedAt"]
    }


def monitorsEntity(entity) -> list:
    # esquema de retorno de todos los datos
    return [monitorEntity(item) for item in entity]
