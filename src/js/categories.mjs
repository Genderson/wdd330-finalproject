import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { loadProducts } from "./products.mjs";

export async function loadCategories(selector){
    const categories = await getData("categories");
    renderListWithTemplate(buildCategoryTemplate, selector, categories);

    const categoriesDivs = document.querySelectorAll('.category-card');

    categoriesDivs.forEach(link => {
        link.addEventListener('click', async () => {
            const categoryId = link.getAttribute('data-category-id');
            const products = document.querySelector("#products-container");
            await loadProducts(products, [Number(categoryId)], true);
        });
    });
}

export async function loadCategoriesFilter(selector){
    const categories = await getData("categories");
    renderListWithTemplate(buildCategoryFilterTemplate, selector, categories);

    const categoriesLi = document.querySelectorAll('.category-filter');

    categoriesLi.forEach(link => {
        link.addEventListener('change', async() => {

            const checkboxes = document.querySelectorAll('input[name="category-filter"]:checked');
            const products = document.querySelector("#products-container");
            let categoryIds = [];

            if(checkboxes.length > 0) {
                checkboxes.forEach(async checkbox => {
                    const categoryId = checkbox.getAttribute('data-category-id');                    
                    categoryIds.push(Number(categoryId));
                });
                await loadProducts(products, categoryIds, true);
            }
            else{
                await loadProducts(products, [6], true);
            }
        });
    });
}

function buildCategoryFilterTemplate(category) {
    
    return `<li>
                <input class="checkbox_animated category-filter" name="category-filter" type="checkbox" id="category-filter-${category.categoryId}" data-category-id="${category.categoryId}">
                <label class="form-check-label" for="category-filter-${category.categoryId}">${category.name}</label>
            </li>`;
}


function buildCategoryTemplate(category) {
    
    return `<div id="category-${category.categoryId}" class="category-card" data-category-id="${category.categoryId}">
                <img src="${category.image}" alt="">
                <h2>${category.name}</h2>
            </div>`;
}
