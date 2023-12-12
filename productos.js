
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
ocument.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('productContainer');

    fetch('productos.json')
        .then(response => response.json())
        .then(products => {
            renderProducts(products);
        })
        .catch(error => console.error('Error al obtener los datos:', error));

    function renderProducts(products) {
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const productImage = document.createElement('img');
            productImage.src = product.imagen;
            productCard.appendChild(productImage);

            const productName = document.createElement('h2');
            productName.textContent = product.nombre;
            productCard.appendChild(productName);

            const productPrice = document.createElement('p');
            productPrice.textContent = `Precio: $${product.precio}`;
            productCard.appendChild(productPrice);

            productContainer.appendChild(productCard);
        });
    }
});

    



//ofertas y eso
const nodosHtml = (array) => {
    const nodos = array.reduce((acc, elemento) => {
        return acc + `
                    <div class="card">
                        <div class="container-img">
                            <img src=${elemento.image} alt=${elemento.name}>
                        </div>
                        <h3>
                            ${elemento.name}
                        </h3>
                    </div>
                `
    }, "")

    document.querySelector(".zapas").innerHTML = nodos
}
const productList = document.getElementById("productos-lista");
const sortAscendingButton = document.getElementById("ascendente");
const sortDescendingButton = document.getElementById("descendente");
const filterOfferCheckbox = document.getElementById("ofertas");
const cart = document.getElementById("carrito");

let productsData = [];



//productos en el DOM
function displayProducts(products) {
    productList.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Oferta: ${product.offer ? "Sí" : "No"}</p>
            <button class="add-to-cart">Agregar al carrito</button>
        `;
        productList.appendChild(productCard);

        // botton de añadir al carrito
        const addToCartButton = productCard.querySelector("añadir al carrito");
        addToCartButton.addEventListener("click", () => {
            // Lógica para agregar el producto al carrito
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
                <p>${product.name} - $${product.price}</p>
            `;
            cart.appendChild(cartItem);
        });
    });
}

// (A-Z)
sortAscendingButton.addEventListener("click", () => {
    productsData.sort((a, b) => a.name.localeCompare(b.name));
    displayProducts(productsData);
});

//(Z-A)
sortDescendingButton.addEventListener("click", () => {
    productsData.sort((a, b) => b.name.localeCompare(a.name));
    displayProducts(productsData);
});

// productos en off
filterOfferCheckbox.addEventListener("change"), () => {
    const filteredProducts = filterOfferCheckbox.checked
        ? productsData.filter(product => product.offer)
        : productsData;
    displayProducts(filteredProducts);
}


