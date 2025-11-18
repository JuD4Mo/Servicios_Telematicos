// static/products.js

function getProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Obtener el tbody de la tabla de productos
            var productListBody = document.querySelector('#product-list tbody');
            if (!productListBody) {
                console.error('No se encontró la tabla con id "product-list"');
                return;
            }
            productListBody.innerHTML = ''; // Limpiar datos previos

            // Poblar filas
            data.forEach(product => {
                var row = document.createElement('tr');

                // Nombre
                var nameCell = document.createElement('td');
                nameCell.textContent = product.productName;
                row.appendChild(nameCell);

                // Descripción
                var descCell = document.createElement('td');
                descCell.textContent = product.description || '';
                row.appendChild(descCell);

                // Precio
                var priceCell = document.createElement('td');
                // Mostrar tal cual, igual que en users/script.js (sin formateo especial)
                priceCell.textContent = product.price;
                row.appendChild(priceCell);

                // Acciones
                var actionsCell = document.createElement('td');

                // Editar
                var editLink = document.createElement('a');
                editLink.href = `/products/edit/${product.id}`;
                editLink.textContent = 'Edit';
                editLink.className = 'btn btn-primary mr-2';
                actionsCell.appendChild(editLink);

                // Eliminar
                var deleteLink = document.createElement('a');
                deleteLink.href = '#';
                deleteLink.textContent = 'Delete';
                deleteLink.className = 'btn btn-danger';
                deleteLink.addEventListener('click', function() {
                    deleteProduct(product.id);
                });
                actionsCell.appendChild(deleteLink);

                row.appendChild(actionsCell);
                productListBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function createProduct() {
    var data = {
        productName: document.getElementById('productName').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value
    };

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Opcional: limpiar form
        // document.getElementById('productName').value = '';
        // document.getElementById('description').value = '';
        // document.getElementById('price').value = '';
        // Recargar lista
        if (typeof getProducts === 'function') getProducts();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loadProduct(productId) {
    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('product-id').value = data.id;
            document.getElementById('productName').value = data.productName;
            document.getElementById('description').value = data.description || '';
            document.getElementById('price').value = data.price;
        })
        .catch(error => console.error('Error:', error));
}

function updateProduct() {
    var productId = document.getElementById('product-id').value;
    var data = {
        productName: document.getElementById('productName').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value
    };

    fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Redirigir o mostrar mensaje de éxito
        // Igual que en users/script.js, puedes quedarte o navegar:
        // window.location.href = '/products';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteProduct(productId) {
    console.log('Deleting product with ID:', productId);
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`/api/products/${productId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Product deleted successfully:', data);
            if (typeof getProducts === 'function') getProducts();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

