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

document.addEventListener('DOMContentLoaded', function () {
  const productosContainer = document.getElementById('productos-container');
  const ordenSelect = document.getElementById('orden');
  const ofertaCheckbox = document.getElementById('oferta');
  const carritoContainer = document.getElementById('carrito-container');

  // Cargar productos desde el archivo JSON
  function cargarProductos() {
    fetch('../productos.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos de productos:', data);
        mostrarProductos(data);
      })
      .catch(error => console.error('Error al cargar los productos', error));
  }

  // Mostrar productos en el contenedor
  function mostrarProductos(productos) {
    productosContainer.innerHTML = '';

    // Ordenar productos
    const orden = ordenSelect.value;
    productos.sort((a, b) => (orden === 'ascendente') ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo));

    // Filtrar productos
    const soloOfertas = ofertaCheckbox.checked;
    const productosFiltrados = soloOfertas ? productos.filter(p => p.oferta) : productos;

    productosFiltrados.forEach(producto => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');

      const imagen = document.createElement('img');
      imagen.src = producto.imagen;
      imagen.alt = producto.titulo;

      const titulo = document.createElement('h3');
      titulo.textContent = producto.titulo;

      const precio = document.createElement('p');
      precio.textContent = `Precio: $${producto.precio}`;

      const botonAgregar = document.createElement('button');
      botonAgregar.textContent = 'Agregar al Carrito';
      botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));

      productoDiv.appendChild(imagen);
      productoDiv.appendChild(titulo);
      productoDiv.appendChild(precio);
      productoDiv.appendChild(botonAgregar);

      productosContainer.appendChild(productoDiv);
    });
  }

  // agregar a carrito
  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }

  function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoContainer.innerHTML = '';

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

  // Cambio en la selección de orden
  ordenSelect.addEventListener('change', cargarProductos);

  // Cambio en la opción de mostrar solo ofertas
  ofertaCheckbox.addEventListener('change', cargarProductos);

  // Cargar productos al cargar la página
  cargarProductos();
});
