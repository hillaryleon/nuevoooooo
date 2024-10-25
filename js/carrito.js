document.addEventListener('DOMContentLoaded', () => {
    const productosCarritoDiv = document.getElementById('productos-carrito');
    const totalSpan = document.getElementById('total');
    const mainContent = document.querySelector('main'); // Selecciona el elemento main
    let total = 0;

    // Obtener el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        // Ocultar el contenido del main
        productosCarritoDiv.style.display = 'none';
        totalSpan.style.display = 'none'; // También ocultar el total

        // Mostrar mensaje de carrito vacío en el main
        const mensajeVacío = document.createElement('div');
        mensajeVacío.classList.add('mensaje-vacio');
        mensajeVacío.innerHTML = `
            <h3>Tu carrito está vacío</h3>
            <a href="catalogo.html" class="boton-seguir-comprando">Seguir Comprando</a>
        `;
        // Añadir el mensaje al main
        mainContent.innerHTML = ''; // Limpiar contenido previo
        mainContent.appendChild(mensajeVacío);
    } else {
        // Mostrar los productos en el carrito
        carrito.forEach(producto => {
            // Crear un contenedor para el producto
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');

            // Agregar la imagen
            const img = document.createElement('img');
            img.src = producto.foto;
            img.alt = producto.nombre;
            productoDiv.appendChild(img);

            // Agregar la información del producto
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('producto-info');
            infoDiv.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Talla: ${producto.talla}</p>
                <p>precio: ${producto.precio}</p>
            `;
            productoDiv.appendChild(infoDiv);

            // Agregar la cantidad (sin input)
            const cantidadDiv = document.createElement('div');
            cantidadDiv.classList.add('cantidad');
            cantidadDiv.innerHTML = `Cantidad: ${producto.cantidad}`; // Mostrar solo la cantidad
            productoDiv.appendChild(cantidadDiv);

            // Agregar el precio
            const precioDiv = document.createElement('div');
            precioDiv.classList.add('precio');
            precioDiv.innerHTML = `S/${(producto.precio * producto.cantidad).toFixed(2)} PEN`; // Mostrar el precio total por producto
            productoDiv.appendChild(precioDiv);

            // Agregar botón de eliminar
            const eliminarButton = document.createElement('button');
            eliminarButton.classList.add('boton-eliminar');
            eliminarButton.innerHTML = '<i class="bi bi-trash3"></i>';
            eliminarButton.addEventListener('click', () => {
                // Eliminar el producto del carrito y actualizar la vista
                const index = carrito.indexOf(producto);
                if (index > -1) {
                    carrito.splice(index, 1); // Elimina el producto del carrito
                    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualiza localStorage
                    location.reload(); // Recarga la página para mostrar los cambios
                }
            });
            productoDiv.appendChild(eliminarButton);

            // Agregar el producto a la lista
            productosCarritoDiv.appendChild(productoDiv);

            // Calcular el total
            total += producto.precio * producto.cantidad;
        });

        // Mostrar el total
        totalSpan.textContent = total.toFixed(2);
    }
});
