const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");
const form = document.querySelector("encargo-form")

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
    nav.classList.add("visible");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
    nav.classList.remove("visible");
})

form.addEventListener("click", () => {
    aside.classList.remove("aside-visible")
})