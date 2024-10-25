document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma normal

    const formData = new FormData(this);

    fetch(this.action, {
        method: this.method,
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Mostrar mensaje de éxito
        document.getElementById('successMessage').classList.remove('hidden');
        // Opcional: Resetear el formulario
        this.reset();
    })
    .catch(error => console.error('Error:', error));
});