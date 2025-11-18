from flask import Blueprint, request, jsonify
from products.models.product_model import Product
from database.db import db

product_controller = Blueprint('product_controller', __name__)

@product_controller.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    result = [{
        'id': p.id,
        'productName': p.productName,
        'description': p.description,
        'price': float(p.price)
    } for p in products]
    return jsonify(result)

@product_controller.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    p = Product.query.get_or_404(product_id)
    return jsonify({
        'id': p.id,
        'productName': p.productName,
        'description': p.description,
        'price': float(p.price)
    })

@product_controller.route('/api/products', methods=['POST'])
def create_product():
    data = request.get_json()
    p = Product(
        productName=data['productName'],
        description=data.get('description', ''),
        price=data['price']
    )
    db.session.add(p)
    db.session.commit()
    return jsonify({'message': 'Product created successfully', 'id': p.id}), 201

@product_controller.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    p = Product.query.get_or_404(product_id)
    data = request.get_json()
    p.productName = data['productName']
    p.description = data.get('description', '')
    p.price = data['price']
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})

@product_controller.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    p = Product.query.get_or_404(product_id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})

