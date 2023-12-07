let productsInCart = localStorage.getItem("products-in-cart");
productsInCart = JSON.parse(productsInCart);

const containerEmptyCart = document.querySelector("#empty-cart");
const containerProductCart = document.querySelector("#products-cart");
const containerActionsCart = document.querySelector("#action-cart");
const containerPurchasedCart = document.querySelector("#purchased-cart");
let buttonsDelete = document.querySelectorAll(".delete-product-cart");
const emptyButton = document.querySelector("#empty-actions-cart");
const totalContainer = document.querySelector("#total");
const buyButton = document.querySelector("#buy-action-cart");


function loadProductCart() {
    if (productsInCart && productsInCart.length > 0) {

        containerEmptyCart.classList.add("disabled");
        containerProductCart.classList.remove("disabled");
        containerActionsCart.classList.remove("disabled");
        containerPurchasedCart.classList.add("disabled");
    
        containerProductCart.innerHTML = "";
    
        productsInCart.forEach(product => {
    
            const div = document.createElement("div");
            div.classList.add("product-cart");
            div.innerHTML = `
                <img class="product-imagen-cart" src="${product.imagen}" alt="${product.title}">
                <div class="title-product-cart">
                    <small>Título</small>
                    <h3>${product.title}</h3>
                </div>
                <div class="quantity-product-cart">
                    <small>Cantidad</small>
                    <p>${product.quantity}</p>
                </div>
                <div class="price-product-cart">
                    <small>Precio</small>
                    <p>$${product.price}</p>
                </div>
                <div class="subtotal-product-cart">
                    <small>Subtotal</small>
                    <p>$${product.price * product.quantity}</p>
                </div>
                <button class="delete-product-cart" id="${product.id}" style="background-color: transparent; border:none;">
                    <i class="bi bi-trash-fill" style="font-size: 1.5rem; color: #ff0000;"></i>
                </button>
            `;
    
            containerProductCart.append(div);
        })
    
    updateButtonsDelete();
    updateAll();
	
    } else {
        containerEmptyCart.classList.remove("disabled");
        containerProductCart.classList.add("disabled");
        containerActionsCart.classList.add("disabled");
        containerPurchasedCart.classList.add("disabled");
    }

}

loadProductCart();

function updateButtonsDelete() {
    buttonsDelete = document.querySelectorAll(".delete-product-cart");

    buttonsDelete.forEach(button => {
        button.addEventListener("click", removeFromCart);
    });
}

function removeFromCart(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #926739, #b38d64)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem' 
          },
        onClick: function(){}
    }).showToast();

    const idButton = e.currentTarget.id;
    const index = productsInCart.findIndex(product => product.id === idButton);
    
    productsInCart.splice(index, 1);
    loadProductCart();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));

}

emptyButton.addEventListener("click", emptyCart);
function emptyCart() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productsInCart.reduce((acc, product) => acc + product.quantity, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productsInCart.length = 0;
            localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
            loadProductCart();
        }
    })
}


function updateAll() {
    const calculatedTotal = productsInCart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    totalContainer.innerText = `$${calculatedTotal.toFixed(2)}`;
}

buyButton.addEventListener("click", buyCart);
function buyCart() {

    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    
    containerEmptyCart.classList.add("disabled");
    containerProductCart.classList.add("disabled");
    containerActionsCart.classList.add("disabled");
    containerPurchasedCart.classList.remove("disabled");

}