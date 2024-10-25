const banner = document.getElementById("banner");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

// Array con las rutas de las imágenes en la carpeta "imagenes"
const imagenes = ["imagenes/banner.png", "imagenes/bannercanva.png", "imagenes/bannercamisero.png"];

// Variable para controlar la imagen actual
let imagenActual = 0;
let intervalo; // Variable para el intervalo de movimiento automático

// Función para actualizar la imagen del banner
function actualizarImagen() {
  banner.innerHTML = `<img src="${imagenes[imagenActual]}" alt="Imagen del banner">`;
}

// Función para mover el banner automáticamente
function moverBannerAutomaticamente() {
  imagenActual++;
  if (imagenActual >= imagenes.length) {
    imagenActual = 0;
  }
  actualizarImagen();
}

// Función para iniciar el movimiento automático
function iniciarMovimientoAutomatico() {
  intervalo = setInterval(moverBannerAutomaticamente, 3000);
}

// Función para detener el movimiento automático
function detenerMovimientoAutomatico() {
  clearInterval(intervalo);
}

// Evento click para el botón anterior
anterior.addEventListener("click", () => {
  detenerMovimientoAutomatico(); // Detener movimiento automático
  imagenActual--;
  if (imagenActual < 0) {
    imagenActual = imagenes.length - 1;
  }
  actualizarImagen();
});

// Evento click para el botón siguiente
siguiente.addEventListener("click", () => {
  detenerMovimientoAutomatico(); // Detener movimiento automático
  imagenActual++;
  if (imagenActual >= imagenes.length) {
    imagenActual = 0;
  }
  actualizarImagen();
});

// Inicializar la imagen del banner
actualizarImagen();
iniciarMovimientoAutomatico(); // Iniciar el movimiento automático







document.getElementById('whatsappBtn').addEventListener('click', () => {
  const telefono = '51977441409'; // Número de teléfono en formato internacional
  const mensaje = 'Hola, estoy interesado en su producto.'; // Mensaje predeterminado
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, '_self'); // Abre WhatsApp en una nueva pestaña
});
