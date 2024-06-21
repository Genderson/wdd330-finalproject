import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export async function loadCategories(selector){
    const categories = await getData("categories");
    renderListWithTemplate(buildCategoryTemplate, selector, categories);
}


function buildCategoryTemplate(category) {
    
    return `<div class="card">
                <a href="">
                <img src="${category.image}" alt="">
                <h2>${category.name}</h2>
                </a>
            </div>`;
  }