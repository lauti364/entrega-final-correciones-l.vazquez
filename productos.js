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

document.addEventListener('DOMContentLoaded', function () {
    const productosContainer = document.getElementById('productos-container');
    const ordenSelect = document.getElementById('orden');
    const ofertaCheckbox = document.getElementById('oferta');
  
   // Cargar productos desde el archivo JSON
function cargarProductos() {
    fetch('./productos.json')
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
      productosContainer.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos productos
  
      // Ordenar productos según la opción seleccionada
      const orden = ordenSelect.value;
      productos.sort((a, b) => (orden === 'ascendente') ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo));
  
      // Filtrar productos según la opción seleccionada
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
  
        productoDiv.appendChild(imagen);
        productoDiv.appendChild(titulo);
        productoDiv.appendChild(precio);
  
        productosContainer.appendChild(productoDiv);
      });
    }
  
    // Evento de cambio en la selección de orden
    ordenSelect.addEventListener('change', cargarProductos);
  
    // Evento de cambio en la opción de mostrar solo ofertas
    ofertaCheckbox.addEventListener('change', cargarProductos);
  
    // Cargar productos al cargar la página
    cargarProductos,
    cargarProductos();
  });
  