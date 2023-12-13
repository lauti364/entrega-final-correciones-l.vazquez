let temporizadorNotificacion;

// Recuperar datos del carrito desde el almacenamiento local al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    renderizarCarrito(carritoGuardado);
});

function renderizarCarrito(carrito) {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = '';

    carrito.forEach(producto => {
        const elementoCarrito = document.createElement('li');
        elementoCarrito.className = 'producto-carrito';

        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        elementoCarrito.appendChild(imagenProducto);

        const nombreProducto = document.createElement('span');
        nombreProducto.textContent = producto.nombre;
        elementoCarrito.appendChild(nombreProducto);

        const precioProducto = document.createElement('span');
        precioProducto.textContent = `$${producto.precio}`;
        elementoCarrito.appendChild(precioProducto);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            eliminarDelCarrito(elementoCarrito, producto);
        });
        elementoCarrito.appendChild(botonEliminar);

        listaCarrito.appendChild(elementoCarrito);
    });
}

function vaciarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = '';

    // Vaciar el carrito en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify([]));
}

function eliminarDelCarrito(elementoCarrito, producto) {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.removeChild(elementoCarrito);

    // Obtener el carrito actual del almacenamiento local
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    // Filtrar el producto eliminado
    const nuevoCarrito = carritoActual.filter(item => item.nombre !== producto.nombre);

    // Guardar el nuevo carrito en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
}

function completarCompra() {
    const listaCarrito = document.getElementById('listaCarrito');
    const notificacion = document.getElementById('notificacion');
    
    if (listaCarrito.children.length > 0) {
        // Mostrar notificación solo si hay elementos en el carrito
        notificacion.style.display = 'block';

        // Ocultar la notificación después de 3 segundos
        temporizadorNotificacion = setTimeout(() => {
            notificacion.style.display = 'none';
        }, 3000);

        // Vaciar el carrito después de completar la compra
        vaciarCarrito();
    } else {
        // Mostrar mensaje de advertencia si el carrito está vacío
        alert('El carrito está vacío. Añade productos antes de completar la compra.');
    }
}

function realizarCompra() {
    // Aquí podrías implementar lógica adicional para una compra real
    const notificacion = document.getElementById('notificacion');
    notificacion.textContent = 'Compra realizada correctamente. ¡Gracias por tu compra!';

    // Mostrar notificación de compra realizada
    notificacion.style.display = 'block';

    // Ocultar la notificación después de 3 segundos
    temporizadorNotificacion = setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000);

    // Vaciar el carrito después de completar la compra
    vaciarCarrito();
}





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