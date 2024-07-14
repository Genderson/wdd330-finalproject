import { displayTotalCartItems } from "./cart.mjs";
import { loadCategories, loadCategoriesFilter } from "./categories.mjs";
import { loadProducts } from "./products.mjs";
import { displayTotalWishlistItems }  from "./wishlist.mjs";

const categories = document.querySelector("#categories-container");
if (categories){
    loadCategories(categories);
}

const products = document.querySelector("#products-container");
if (products){
    loadProducts(products);
}

const categoriesFilter = document.querySelector("#categories-filter");
if (categoriesFilter){
    loadCategoriesFilter(categoriesFilter);
}

displayTotalCartItems();
displayTotalWishlistItems();