import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export async function loadProducts(selector, categoryIds, clear) {
    let products = await getData("products");

    //products = products.filter(p => categoryIds.includes(p.categoryId));

    if(categoryIds && !categoryIds.includes(6)){
        //products = products.filter(p => p.categoryId == categoryId);
        products = products.filter(p => categoryIds.includes(p.categoryId));
        //console.log(productss);
    }

    renderListWithTemplate(buildProductTemplate, selector, products, clear);

    const plusButtons = document.querySelectorAll('.qty-right-plus');
    const minusButtons = document.querySelectorAll('.qty-left-minus');

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            updateValue(productId, 1);
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            updateValue(productId, -1);
        });
    });
}


export function updateValue(productId, change) {
    const input = document.getElementById(`input-quantity-${productId}`);
    const currentValue = parseInt(input.value, 10);

    let newValue = currentValue + change;
    if(newValue >= 0){
        input.value = currentValue + change;
    }    
}

function buildProductTemplate(product) {
    
    return `<div id="'${product.productId}'" class="product-card">
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <p>${product.price}</p>
                <div>
                    <button type="button" class="qty-left-minus" data-product-id="${product.productId}">
                        <i class="fa fa-minus"></i>
                    </button>
                    <input class="form-control qty-input" id="input-quantity-${product.productId}" type="number" name="quantity" min="0" max="100" value="0">

                    <button type="button" class="qty-right-plus" data-product-id="${product.productId}">
                        <i class="fa fa-plus"></i>
                    </button>
                    <button type="button" class="">Add</button>
                </div>
                <ul class="product-option">
                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                        <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#view">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </a>
                    </li>

                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                        <a href="compare.html">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                        </a>
                    </li>

                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                        <a href="wishlist.html" class="notifi-wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </a>
                    </li>
                </ul>
            </div>`;
  }