import { loadWishlistProducts }  from "./wishlist.mjs"; 

const wishlist = document.querySelector("#wishlist-container");
if (wishlist){
    loadWishlistProducts(wishlist);
}