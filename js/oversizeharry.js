const agregarCarritoButton = document.getElementById('agregar-carrito');
const alertCarrito = document.getElementById('alert-carrito');
const seguirComprandoButton = document.getElementById('seguir-comprando');
const comprarAhoraLink = document.getElementById('comprar-ahora');
const cerrarAlertXBtn = document.getElementById('cerrar-alert-x');

// Datos del producto (asegúrate de que estos valores se obtengan correctamente de tu HTML)
const producto = {
    id: 8, // Asigna un ID único al producto
    nombre: 'OVERSIZE DISEÑO DE HARRY - LILA',
    talla: document.querySelector('.info-talla').textContent, // Puedes obtener la talla desde el HTML
    cantidad: parseInt(document.getElementById('cantidad').value), // Inicialmente, obtén la cantidad
    precio: 50.00, // Asegúrate de que este precio sea el correcto
    foto: 'imagenes/oversizeharry.png' // Ruta de la imagen del producto
};

// Función para agregar el producto al carrito
function agregarProductoAlCarrito(producto) {
    // Obtener el carrito actual desde localStorage (o crear uno si no existe)
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    let productoExistente = carrito.find(p => p.id === producto.id);
    if (productoExistente) {
        // Si el producto ya existe, solo actualizar la cantidad
        productoExistente.cantidad += producto.cantidad;
    } else {
        // Si no existe, agregar el nuevo producto
        carrito.push(producto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar un mensaje de éxito
    alertCarrito.classList.remove('hidden'); // Mostrar alerta
}

// Evento para el botón "Agregar al carrito"
agregarCarritoButton.addEventListener('click', () => {
    // Actualizar la cantidad seleccionada antes de agregar
    producto.cantidad = parseInt(document.getElementById('cantidad').value);
    
    // Llamar a la función para agregar el producto al carrito
    agregarProductoAlCarrito(producto);
});

// Evento para el botón "Seguir Comprando"
seguirComprandoButton.addEventListener('click', () => {
    alertCarrito.classList.add('hidden');
});

comprarAhoraLink.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el enlace redirija a la misma página
    window.open('pagarpedido.html', '_self'); // Abre la página de compra en la misma pestaña
});


// Evento para el botón de cerrar alerta
cerrarAlertXBtn.addEventListener('click', () => {
    alertCarrito.classList.add('hidden');
});
