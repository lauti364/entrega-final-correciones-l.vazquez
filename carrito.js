document.addEventListener('DOMContentLoaded', () => {
    const vaciarCarritoBtn = document.getElementById('vaciarCarritoBtn');
    const realizarCompraBtn = document.getElementById('realizarCompraBtn');
    const carritoContainer = document.querySelector('.carrito-container');

    vaciarCarritoBtn.addEventListener('click', function () {
        // Vaciar carrito
        localStorage.removeItem('carrito');
        mostrarCarrito();
    });

    realizarCompraBtn.addEventListener('click', function () {
        // Vaciar carrito al realizar la compra
        localStorage.removeItem('carrito');
        mostrarCarrito();
        alert('¡Compra realizada con éxito!');
    });

    function mostrarCarrito() {
        // Obtener el carrito desde localStorage
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            let total = 0;
            carritoContainer.innerHTML = '<h2>Productos en el Carrito</h2>';
            carrito.forEach((producto, index) => {
                total += producto.precio;
                carritoContainer.innerHTML += `<p>${index + 1}. ${producto.titulo} - $${producto.precio.toFixed(2)}</p>`;
            });
            carritoContainer.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
        }
    }

    // Mostrar el carrito al cargar la página
    mostrarCarrito();
});

document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.getElementById('darkModeButton');

    // Verificar el estado actual del modo oscuro en localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Aplicar el modo oscuro si es necesario
    if (isDarkMode) {
        enableDarkMode();
    }


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

