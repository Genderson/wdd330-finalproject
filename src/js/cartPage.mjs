import { loadCarts, displayTotalCartItems }  from "./cart.mjs";
import { displayTotalWishlistItems }  from "./wishlist.mjs";

const productsInCart = document.querySelector("#productsInCart-container");
if (productsInCart){
    loadCarts(productsInCart);
    displayTotalCartItems();
    displayTotalWishlistItems();
}