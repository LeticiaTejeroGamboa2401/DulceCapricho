let products = [];

fetch("JS/productos.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        loadProducts(products);
    })


const containerProducts = document.querySelector("#container-products");
const buttonCategory = document.querySelectorAll(".button-category");
const mainTitle = document.querySelector("#main-title");
let buttonAdd = document.querySelectorAll(".add-product");
const numerito = document.querySelector("#numerito");


buttonCategory.forEach(button => button.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function loadProducts(chosenProduct) {

    containerProducts.innerHTML = "";

    chosenProduct.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-imagen" src="${product.imagen}" alt="${product.title}">
            <div class="product-details">
                <h3 class="title-product">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="add-product" id="${product.id}">Agregar</button>
            </div>
        `;

        containerProducts.append(div);
    })

    updateButtonAdd();
}


buttonCategory.forEach(button => {
    button.addEventListener("click", (e) => {

        buttonCategory.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "all") {
            const productCategory = products.find(product => product.category.id === e.currentTarget.id);
            mainTitle.innerText = productCategory.category.nombre;
            const  buttonProduct = products.filter(product => product.category.id === e.currentTarget.id);
            loadProducts(buttonProduct);
        } else {
            mainTitle.innerText = "Todos los productos";
            loadProducts(products);
        }

    })
});

function updateButtonAdd() {
    buttonAdd = document.querySelectorAll(".add-product");

    buttonAdd.forEach(button => {
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
        productsInCart[index].quantity++;
    } else {
        addedProduct.quantity = 1;
        productsInCart.push(addedProduct);
    }

    updateNumber();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

function updateNumber() {
    let newNumber = productsInCart.reduce((acc, product) => acc + product.quantity, 0);
    numerito.innerText = newNumber;
}

const encargoButton = document.querySelector("#encargo");

encargoButton.addEventListener("click", () => {
    const encargoForm = document.querySelector("#encargo-form");
    if (encargoForm.style.display === "none" || encargoForm.style.display === "") {
        encargoForm.style.display = "block";
    } else {
        encargoForm.style.display = "none";
    }
});

function getMinDeliveryDate() {
    const today = new Date();
    today.setDate(today.getDate() + 3); // Suma 3 días a la fecha actual
    const minDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    return minDate;
}