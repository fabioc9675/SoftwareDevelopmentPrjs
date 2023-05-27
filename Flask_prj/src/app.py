from flask import Flask, request, Response, jsonify
from flask_cors import CORS
# librerias para seguridad en el password
# from werkzeug.security import generate_password_hash, check_password_hash

import config.db as dbase
from schema.product import Product

# Acceder a la base de datos
db = dbase.dbConnection()


app = Flask(__name__)
CORS(app)


# Creacion de rutas
@app.route('/products', methods=['POST'])
def create_products():
    products = db['products']
    name = request.json['name']
    price = request.json['price']
    quantity = request.json['quantity']

    if name and price and quantity:
        product = Product(name, price, quantity)
        products.insert_one(product.toDBCollection())
        response = jsonify({
            "name": name,
            "price": price,
            "quantity": quantity
        })

        return response
    else:
        return {'message': "Error guardando"}


@app.route('/products', methods=['GET'])
def load_products():
    products = db['products']
    productsReceived = products.find()
    return [userEntity(item) for item in productsReceived]


def userEntity(item) -> dict:
    # creacion de los esquemas para almacenar en mongo
    return {
        "_id": str(item["_id"]),
        "name": item["name"],
        "price": item["price"],
        "quantity": item["quantity"]
    }


if __name__ == "__main__":
    app.run(debug=True)
