# products/models/product_model.py
from database.db import db  # reutilizamos tu db

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    productName = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(600))
    price = db.Column(db.Numeric(10, 2), nullable=False)

    def __init__(self, productName, description, price):
        self.productName = productName
        self.description = description
        self.price = price

