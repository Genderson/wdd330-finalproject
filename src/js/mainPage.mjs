import { loadCategories } from "./categories.mjs";


let categories = document.querySelector("#categories-container");

if (categories){
    await loadCategories(categories);
}
