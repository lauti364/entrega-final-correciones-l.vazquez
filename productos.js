
let productos = []; // Almacenar productos globales

// Función para cargar productos desde el archivo JSON
function cargarProductos() {
  fetch('../paginas/productos.json')
    .then(response => response.json())
    .then(data => {
      productos = data;
      mostrarProductos(productos);
    })
    .catch(error => console.error('Error al cargar los productos', error));
}

// Función para mostrar productos en el contenedor
function mostrarProductos(productos) {
  const productosContainer = document.getElementById('productos-container');
  productosContainer.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos productos

  productos.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.titulo;

    const titulo = document.createElement('h3');
    titulo.textContent = producto.titulo;

    const precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio}`;

    const oferta = document.createElement('p');
    oferta.textContent = producto.oferta ? 'Oferta' : '';

    const agregarAlCarritoBtn = document.createElement('button');
    agregarAlCarritoBtn.textContent = 'Agregar al carrito';
    agregarAlCarritoBtn.addEventListener('click', () => agregarAlCarrito(producto));

    productoDiv.appendChild(imagen);
    productoDiv.appendChild(titulo);
    productoDiv.appendChild(precio);
    productoDiv.appendChild(oferta);
    productoDiv.appendChild(agregarAlCarritoBtn);

    productosContainer.appendChild(productoDiv);
  });
}

// Función para ordenar productos y actualizar la visualización
function ordenarProductos(orden) {
  productos.sort((a, b) => {
    const factor = (orden === 'ascendente') ? 1 : -1;
    return factor * a.titulo.localeCompare(b.titulo);
  });

  mostrarProductos(productos);
}

// Función para filtrar productos por oferta y actualizar la visualización
function filtrarPorOferta() {
  const mostrarSoloOfertas = document.getElementById('oferta').checked;
  const productosFiltrados = mostrarSoloOfertas ? productos.filter(p => p.oferta) : productos;
  mostrarProductos(productosFiltrados);
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
  const carrito = document.getElementById('carrito');
  const itemCarrito = document.createElement('div');
  itemCarrito.textContent = `Producto: ${producto.titulo}, Precio: $${producto.precio}`;
  carrito.appendChild(itemCarrito);
}

// Cargar productos al cargar la página
cargarProductos();

// Configurar eventos para la ordenación y filtrado
document.getElementById('orden').addEventListener('change', (event) => {
  ordenarProductos(event.target.value);
});

document.getElementById('oferta').addEventListener('change', filtrarPorOferta);

 