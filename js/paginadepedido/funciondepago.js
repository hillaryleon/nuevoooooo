document.getElementById('submitButton1').addEventListener('click', function(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del botón

    // Capturamos los datos del formulario de entrega
    const formData = {
        contacto: document.getElementById('contacto').value,
        novedades: document.getElementById('novedades').checked,
        pais: document.getElementById('pais').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        dni: document.getElementById('dni').value,
        direccion: document.getElementById('direccion').value,
        apartamento: document.getElementById('apartamento').value,
        ciudad: document.getElementById('ciudad').value,
        region: document.getElementById('region').value,
        codigoPostal: document.getElementById('codigo-postal').value,
        telefono: document.getElementById('telefono').value,
        shipping: document.querySelector('input[name="shipping"]:checked').value,
        facturacion: document.querySelector('input[name="facturacion"]:checked').id,
        facturacionMisma: document.getElementById('misma-direccion').checked
    };

    // Si se usa una dirección de facturación diferente, también la capturamos
    if (!formData.facturacionMisma) {
        formData.nombreFacturacion = document.getElementById('nombre-facturacion').value;
        formData.apellidoFacturacion = document.getElementById('apellido-facturacion').value;
        formData.direccionFacturacion = document.getElementById('direccion-facturacion').value;
        formData.apartamentoFacturacion = document.getElementById('apartamento-facturacion').value;
        formData.ciudadFacturacion = document.getElementById('ciudad-facturacion').value;
        formData.regionFacturacion = document.getElementById('region2').value;
        formData.codigoPostalFacturacion = document.getElementById('codigo-postal-facturacion').value;
        formData.telefonoFacturacion = document.getElementById('telefono-facturacion').value;
    }

    // Enviar los datos a Google Apps Script con no-cors
    fetch('https://script.google.com/macros/s/AKfycbypap4JFvfFJzfrL0Kf2cU2V4FKdO9bdUvF2OMeCPZT0712rdJxH_QxrnIPxICXDgjR/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors'  // Modo no-cors
    })
    .then(() => {
        // Redirigir a la página de QR después de enviar los datos
        window.location.href = 'metododepago.html';  // Cambia 'paginaQR.html' por la ruta a tu página de QR
    })
    .catch(error => console.error('Error en la solicitud:', error));
});


