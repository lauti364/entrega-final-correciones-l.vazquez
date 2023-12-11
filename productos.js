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


//lista de productos con precios
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Obtener productos desde JSON
    fetch ("../productos.json")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = createProductElement(product);
                productList.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error al obtener la lista de productos:', error));
});

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product';

    const productName = document.createElement('h3');
    productName.textContent = product.nombre;

    const productPrice = document.createElement('p');
    productPrice.textContent = `Precio: ${product.precio} $`;

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'btn-add-to-cart';
    addToCartButton.textContent = 'Agregar al carrito';
    addToCartButton.addEventListener('click', () => addToCart(product));

    productElement.appendChild(productName);
    productElement.appendChild(productPrice);
    productElement.appendChild(addToCartButton);

    return productElement;
}

function addToCart(product) {
    console.log('Producto agregado al carrito:', product);
}










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


