import { loadCategories } from "./categories.mjs";
import { loadProducts } from "./products.mjs";

const categories = document.querySelector("#categories-container");
if (categories){
    await loadCategories(categories);
}

const products = document.querySelector("#products-container");
if (products){
    await loadProducts(products);
}


