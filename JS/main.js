let products = [];

fetch("JS/productos.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        cargarProductos(products);
    })


const containerProducts = document.querySelector("#container-products");
const buttonCategory = document.querySelectorAll(".button-category");
const mainTittle = document.querySelector("#main-tittle");
let buttonAdd = document.querySelectorAll(".add-product");
const numerito = document.querySelector("#numerito");


buttonCategory.forEach(button => button.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function loadProducts(chosenProduct) {

    containerProducts.innerHTML = "";

    chosenProduct.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="product-imagen" src="${product.imagen}" alt="${product.title}">
            <div class="product-details">
                <h3 class="tittle-product">${product.tittle}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="product-add" id="${product.id}">Agregar</button>
            </div>
        `;

        containerProducts.append(div);
    })

    updateButtonsAdd();
}


buttonCategory.forEach(button => {
    button.addEventListener("click", (e) => {

        buttonCategory.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "all") {
            const productCategory = products.find(product => product.category.id === e.currentTarget.id);
            mainTittle.innerText = productCategory.category.nombre;
            const  buttonProduct = products.filter(product => product.category.id === e.currentTarget.id);
            loadProducts(buttonProduct);
        } else {
            mainTittle.innerText = "Todos los productos";
            loadProducts(products);
        }

    })
});

function updateButtonsAdd() {
    buttonsAdd = document.querySelectorAll(".add-product");

    buttonsAdd.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

let productsInCart;

let productsInCartLS = localStorage.getItem("products-in-cart");

if (productsInCartLS) {
    productsInCart = JSON.parse(productsInCartLS);
    updateNumber();
} else {
    productsInCart = [];
}

function addToCart(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem'
          },
        onClick: function(){} // Callback after click
      }).showToast();
    const idButton = e.currentTarget.id;
    const addedProduct = products.find(product => product.id === idButton);

    if(productsInCart.some(product => product.id === idButton)) {
        const index = productsInCart.findIndex(product => product.id === idButton);
        productsInCart[index].cantidad++;
    } else {
        addedProduct.cantidad = 1;
        productsInCart.push(addedProduct);
    }

    updateNumber();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productsInCart));
}

function updateNumber() {
    let newNumber = productsInCart.reduce((acc, product) => acc + product.cantidad, 0);
    numerito.innerText = newNumber;
}