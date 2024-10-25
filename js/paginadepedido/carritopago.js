document.addEventListener('DOMContentLoaded', () => {
    const productosCarritoDiv = document.getElementById('productos-carrito');
    const totalSpan = document.getElementById('total');
    const mainContent = document.querySelector('main');
    const subtotalSpan = document.getElementById('subtotal');
    const cantidadTotalSpan = document.getElementById('cantidad-total');
    const totalGeneralSpan = document.getElementById('total-general');

    let subtotal = 0;
    let cantidadTotal = 0;
    let precioEnvio = 0; // Variable para almacenar el precio de envío

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
            img.style.width = '50px'; // Imagen más pequeña
            img.style.height = '50px';
            productoDiv.appendChild(img);

            // Agregar la información del producto
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('producto-info');
            infoDiv.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Talla: ${producto.talla}</p>
                <p>Precio: S/ ${producto.precio.toFixed(2)} PEN</p>
            `;
            productoDiv.appendChild(infoDiv);

            // Agregar la cantidad
            const cantidadDiv = document.createElement('div');
            cantidadDiv.classList.add('cantidad');
            cantidadDiv.innerHTML = `Cantidad: <span class="cantidad-producto">${producto.cantidad}</span>`;
            productoDiv.appendChild(cantidadDiv);

            // Calcular el precio total
            const precioTotal = (producto.precio * producto.cantidad).toFixed(2); // Precio total basado en cantidad

            // Agregar el precio
            const precioDiv = document.createElement('div');
            precioDiv.classList.add('precio');
            precioDiv.innerHTML = `S/ ${precioTotal} PEN`;
            productoDiv.appendChild(precioDiv);

            // Agregar el producto a la lista
            productosCarritoDiv.appendChild(productoDiv);

            // Calcular subtotal y cantidad total
            subtotal += producto.precio * producto.cantidad;
            cantidadTotal += producto.cantidad;
        });

        // Mostrar el subtotal y cantidad total
        subtotalSpan.textContent = `S/ ${subtotal.toFixed(2)}`;
        cantidadTotalSpan.textContent = `Subtotal: ${cantidadTotal} ${cantidadTotal === 1 ? 'Artículo' : 'Artículos'}`;

        // Calcular y mostrar el total general
        const totalGeneral = subtotal + precioEnvio; // Total general considerando el precio de envío
        totalGeneralSpan.textContent = ` PEN S/ ${totalGeneral.toFixed(2)}`;
    }

    // Cargar provincias desde el archivo JSON
    fetch('prueba.json') // Asegúrate de que el archivo JSON está en la misma carpeta
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            const provinceSelect = document.getElementById('region');

            data.provincias.forEach(function(province) {
                // Añadir opción al select de región
                const option = document.createElement('option');
                option.value = province.nombre; // Usar el nombre como valor
                option.dataset.precio = province.precio; // Almacenar el precio
                option.text = province.nombre;
                provinceSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    // Mostrar el nombre, precio de la provincia seleccionada y método de envío
    document.getElementById('region').addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const infoDiv = document.getElementById('info-seleccion1');

        if (selectedOption.value) {
            precioEnvio = parseFloat(selectedOption.dataset.precio); // Obtener el precio de envío
            document.getElementById('precio1-seleccionado').textContent = `S/. ${precioEnvio.toFixed(2)}`;

            // Calcular el total general nuevamente
            const totalGeneral = subtotal + precioEnvio; // Total general considerando el precio de envío
            totalGeneralSpan.textContent = ` PEN S/ ${totalGeneral.toFixed(2)}`;

            infoDiv.style.display = 'block'; // Mostrar la caja de información
        } else {
            infoDiv.style.display = 'none'; // Ocultar si no hay selección
        }
    });
});



document.getElementById('infoIcon').addEventListener('click', function() {
    var message = document.getElementById('infoMessage');
    message.style.display = message.style.display === 'none' ? 'block' : 'none';
});


