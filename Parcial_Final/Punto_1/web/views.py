# web/views.py

from flask import Flask, render_template
from config import Config
from database.db import db

from users.controllers.user_controller import user_controller
from products.controllers.product_controller import product_controller

app = Flask(__name__,
    template_folder='templates',
    static_folder='static'
)

app.config.from_object(Config)

db.init_app(app)

# Crear tablas automáticamente
with app.app_context():
    db.create_all()

# Registrar blueprints
app.register_blueprint(user_controller)
app.register_blueprint(product_controller)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/edit/<int:id>')
def edit_user(id):
    return render_template('edit.html', id=id)

@app.route('/products')
def products_page():
    return render_template('products.html')

@app.route('/products/edit/<int:id>')
def edit_product_page(id):
    return render_template('edit_product.html', id=id)

