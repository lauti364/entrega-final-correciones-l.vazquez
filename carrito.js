function mostrarCarrito() {
    // aca se guarda el carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoContainer = document.querySelector('.carrito-container');
    
    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        let total = 0;
        carritoContainer.innerHTML = '<h2>Productos en el Carrito</h2>';
        carrito.forEach((producto, index) => {
            total += producto.precio;
            carritoContainer.innerHTML += `<p>${index + 1}. ${producto.nombre} - $${producto.precio.toFixed(2)}</p>`;
        });
        carritoContainer.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    }
}

// mostrar cuando se cargu la pagina
mostrarCarrito();







document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.getElementById('darkModeButton');

    // Verificar el estado actual del modo oscuro en localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Aplicar el modo oscuro si es necesario
    if (isDarkMode) {
        enableDarkMode();
    }

    // Agregar un event listener al botón
    darkModeButton.addEventListener('click', toggleDarkMode);
});

function toggleDarkMode() {
    const body = document.body;

    // Alternar entre modo oscuro y claro
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    const body = document.body;
    
    // Activar modo oscuro
    body.classList.add('dark-mode');

    // Guardar el estado en localStorage
    localStorage.setItem('darkMode', 'true');
}

function disableDarkMode() {
    const body = document.body;
    
    // Desactivar modo oscuro
    body.classList.remove('dark-mode');

    // Guardar el estado en localStorage
    localStorage.setItem('darkMode', 'false');
}