document.addEventListener('DOMContentLoaded', () => {
    const productosLista = document.getElementById('productos-lista');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Obtenemos los productos desde localStorage o JSON

    // Mostrar/Ocultar dirección de facturación diferente
    const otraDireccionRadio = document.getElementById('otra-direccion');
    const direccionFacturacionDiferente = document.getElementById('direccion-facturacion-diferente');

    otraDireccionRadio.addEventListener('change', (event) => {
        if (event.target.checked) {
            direccionFacturacionDiferente.style.display = 'block';
        }
    });

    const mismaDireccionRadio = document.getElementById('misma-direccion');
    mismaDireccionRadio.addEventListener('change', (event) => {
        if (event.target.checked) {
            direccionFacturacionDiferente.style.display = 'none';
        }
    });
});

// Opciones de envío
const displayShippingMethod = document.getElementById('displayShippingMethod');
const selectedTitle = document.getElementById('selectedTitle');
const freeShippingOptions = document.getElementById('freeShippingOptions');
const showFreeShipping = document.getElementById('showFreeShipping');

// Horarios para cada opción
const horarios = {
    'Jirón Gregorio VII 344-366, San Martín de Porres 15102.': 'Entrega de 10:00 a 18:00.',
    'Todas las Estaciones del Metropolitano.': 'Entrega de 8:00 a 12:00.',
    'Plaza Norte, Megaplaza, Plazavea de Acho, Centro Cívico.': 'Entrega de 9:00 a 13:00.',
    'Todas las Estaciones del Tren.': 'Entrega de 10:00 a 14:00.',
};

// Función para actualizar la opción seleccionada
function updateSelectedOption() {
    const selectedOption = document.querySelector('input[name="shipping"]:checked');
    const infoCaja = document.getElementById('info-seleccion');

    if (selectedOption) {
        const shippingMethod = selectedOption.value;
        infoCaja.innerHTML = ''; // Limpiar la caja de información

        if (shippingMethod === 'store_pickup') {
            infoCaja.innerHTML = '<p>Dirección de recojo en tienda: Jirón Gregorio VII 344-366, San Martín de Porres 15102.</p>';
        } else if (shippingMethod === 'free_shipping') {
            infoCaja.innerHTML = `
                <p>Selecciona un punto de entrega:</p>
                <ul>
                    <li><input type="radio" name="delivery_point" value="estacion1"> Todas las Estaciones del Metropolitano.</li>
                    <li><input type="radio" name="delivery_point" value="estacion2"> Plaza Norte, Megaplaza, Plazavea de Acho, Centro Cívico.</li>
                    <li><input type="radio" name="delivery_point" value="estacion3"> Todas las Estaciones del Tren.</li>
                </ul>
            `;
        }

        displayShippingMethod.textContent = shippingMethod.replace(/_/g, ' '); // Actualizar el método de envío
        displayShippingMethod.textContent += ` - ${horarios[shippingMethod] || ''}`; // Mostrar el horario correspondiente
    }
}

// Mostrar las opciones de envío gratis al hacer clic
showFreeShipping.addEventListener('click', function() {
    freeShippingOptions.style.display = 'block'; // Mostrar opciones
});

// Añadir event listener a los radios para actualizar la opción seleccionada
const shippingOptions = document.querySelectorAll('input[name="shipping"]');
shippingOptions.forEach(option => {
    option.addEventListener('change', updateSelectedOption);
});

// Función para manejar la dirección de facturación
document.querySelectorAll('input[name="facturacion"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const direccionFacturacionDiferente = document.getElementById('direccion-facturacion-diferente');
        
        if (this.id === 'otra-direccion') {
            direccionFacturacionDiferente.style.display = 'block';
        } else {
            direccionFacturacionDiferente.style.display = 'none';
        }
    });
});





 // Cargar provincias desde el archivo JSON
 fetch('prueba.json') // Asegúrate de que el archivo JSON está en la misma carpeta
 .then(response => {
     if (!response.ok) {
         throw new Error('Error al cargar el archivo JSON');
     }
     return response.json();
 })
 .then(data => {
     const provinceSelect1 = document.getElementById('region');
     const provinceSelect2 = document.getElementById('region2');

     data.provincias.forEach(function(province) {
         // Añadir opción al primer select
         const option1 = document.createElement('option');
         option1.value = province.nombre; // Usar el nombre como valor
         option1.dataset.precio = province.precio; // Almacenar el precio
         option1.text = province.nombre;
         provinceSelect1.appendChild(option1);

         // Añadir opción al segundo select
         const option2 = document.createElement('option');
         option2.value = province.nombre; // Usar el nombre como valor
         option2.dataset.precio = province.precio; // Almacenar el precio
         option2.text = province.nombre;
         provinceSelect2.appendChild(option2);
     });
 })
 .catch(error => console.error('Error al cargar el archivo JSON:', error));

// Mostrar el nombre y precio de la provincia seleccionada en el primer selector
document.getElementById('region').addEventListener('change', function() {
 const selectedOption = this.options[this.selectedIndex];
 const infoDiv = document.getElementById('info-seleccion1');

 if (selectedOption.value) {
     const precio = selectedOption.dataset.precio;

     // Personalizar el texto según la selección
     if (selectedOption.value === "Lima Metropolitana") {
         document.getElementById('region-seleccionada').textContent = `Lima Metropolitana`;
         document.getElementById('precio-seleccionado').textContent = `S/. ${precio}`;
     } else if (selectedOption.value === "Punto de Entrega") {
         document.getElementById('region-seleccionada').textContent = `Elige una opción de punto de entrega`;
         document.getElementById('precio-seleccionado').textContent = `Precio: S/. ${precio}`;
     } else {
         document.getElementById('region-seleccionada').textContent = `Provincia`;
         document.getElementById('precio-seleccionado').textContent = `S/. ${precio}`;
     }

     infoDiv.style.display = 'block'; // Mostrar la caja de información
 } else {
     infoDiv.style.display = 'none'; // Ocultar si no hay selección
 }
});

