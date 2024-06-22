import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { loadProducts } from "./products.mjs";

export async function loadCategories(selector){
    const categories = await getData("categories");
    renderListWithTemplate(buildCategoryTemplate, selector, categories);

    const categoriesLink = document.querySelectorAll('.category-card');

    categoriesLink.forEach(link => {
        link.addEventListener('click', () => {
            const categoryId = link.getAttribute('data-category-id');
            const products = document.querySelector("#products-container");
            loadProducts(products, categoryId);
        });
    });
}


function buildCategoryTemplate(category) {
    
    return `<div id="$category-${category.categoryId}" class="category-card" data-category-id="${category.categoryId}">
                <img src="${category.image}" alt="">
                <h2>${category.name}</h2>
            </div>`;
}
