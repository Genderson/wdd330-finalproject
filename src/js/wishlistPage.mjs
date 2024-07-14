import { loadWishlistProducts, displayTotalWishlistItems }  from "./wishlist.mjs";
import { displayTotalCartItems }  from "./cart.mjs"; 

const wishlist = document.querySelector("#wishlist-container");
if (wishlist){
    loadWishlistProducts(wishlist);
    displayTotalCartItems();
    displayTotalWishlistItems();
}