import { loadCarts }  from "./cart.mjs"; 

const productsInCart = document.querySelector("#productsInCart-container");
if (productsInCart){
    loadCarts(productsInCart);
}