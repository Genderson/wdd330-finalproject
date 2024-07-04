import { loadCarts, displayTotalCartItems }  from "./cart.mjs"; 

const productsInCart = document.querySelector("#productsInCart-container");
if (productsInCart){
    loadCarts(productsInCart);
    displayTotalCartItems();
}