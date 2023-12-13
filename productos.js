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







document.addEventListener('DOMContentLoaded', () => {
  const productosContainer = document.getElementById('productos-container');
  let productos = [];

  // Cargar productos desde el archivo JSON
  fetch('../productos.json')
    .then(response => response.json())
    .then(data => {
      productos = data;
      mostrarProductos(productos);
    });

  function mostrarProductos(productos) {
    productosContainer.innerHTML = '';

    // Mostrar cada producto
    productos.forEach(producto => {
      const productoNode = crearProductoNode(producto);
      productosContainer.appendChild(productoNode);
    });
  }

  function crearProductoNode(producto) {
    const productoNode = document.createElement('div');
    productoNode.className = 'producto';

    // Crea los elementos HTML para el producto
    productoNode.innerHTML = `
      <h3>${producto.titulo}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <p>${producto.oferta ? '¡Oferta!' : ''}</p>
      <button onclick="agregarAlCarrito('${producto.titulo}', ${producto.precio})">Agregar al carrito</button>
    `;

    return productoNode;
  }

  // Función para agregar al carrito
  window.agregarAlCarrito = function (tituloProducto, precioProducto) {
    // Lógica para agregar el producto al carrito (puedes guardar en local storage, etc.)
    const carritoItem = { titulo: tituloProducto, precio: precioProducto };
    agregarAlCarritoHTML(carritoItem);
  };

  function agregarAlCarritoHTML(item) {
    // Lógica para agregar el item al HTML del carrito (puedes usar local storage o enviar a una página de carrito, etc.)
    const carritoContainer = document.getElementById('carrito-container');

    const carritoItemNode = document.createElement('div');
    carritoItemNode.innerHTML = `<p>${item.titulo} - Precio: $${item.precio.toFixed(2)}</p>`;
    carritoContainer.appendChild(carritoItemNode);
  }
});