import { getData } from "./productData.mjs";
import { getLocalStorage, renderListWithTemplate, renderWithTemplate, setLocalStorage } from "./utils.mjs";

export async function loadProducts(selector, categoryIds, clear) {
    let products = await getData("products");

    //products = products.filter(p => categoryIds.includes(p.categoryId));

    if(categoryIds && !categoryIds.includes(6)){
        //products = products.filter(p => p.categoryId == categoryId);
        products = products.filter(p => categoryIds.includes(p.categoryId));
        //console.log(productss);
    }

    renderListWithTemplate(buildProductTemplate, selector, products, clear);

    const plusButtons = document.querySelectorAll(".qty-right-plus");
    const minusButtons = document.querySelectorAll(".qty-left-minus");

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute("data-product-id");
            updateQuantity(productId, 1);
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute("data-product-id");
            updateQuantity(productId, -1);
        });
    });


    const addCartButtons = document.querySelectorAll(".add-cart-btn");
    addCartButtons.forEach(button => {
        button.addEventListener('click', async() => {
            const productId = button.getAttribute("data-product-id");
            await addTocart(productId);
        });
    });
}

export async function loadViewProduct(selector, productId){
    const products = await getData("products");
    const product = products.find(p => p.productId == productId);

    renderWithTemplate(buildViewProductTemplate, selector, product);
}


function updateQuantity(productId, change) {
    const input = document.getElementById(`input-quantity-${productId}`);
    const currentValue = parseInt(input.value, 10);

    let newValue = currentValue + change;
    if(newValue >= 1){
        input.value = currentValue + change;
    }    
}

async function addTocart(productId) {
    const inputQuantity = document.getElementById(`input-quantity-${productId}`);
    const quantity = Number(inputQuantity.value);

    if(quantity > 0){
        let productsInCart = getLocalStorage("products-in-cart") || [];
        let productAlreadyAdded = productsInCart.find(p => p.productId == productId);
    
        if (productAlreadyAdded){
            productAlreadyAdded.quantity = productAlreadyAdded.Quantity + quantity;
        }
        else{
            let products = await getData("products");
            let newProduct = products.find(p => p.productId == productId);
            newProduct.quantity = quantity;
            productsInCart.push(newProduct);
        }

        setLocalStorage("products-in-cart", productsInCart);
        showProductAddedMessage(productId, quantity);
    }
}

function buildProductTemplate(product) {
    
    return `<div id="${product.productId}" class="product-card">
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <p>${product.price}</p>
                <div>
                    <button type="button" class="qty-left-minus" data-product-id="${product.productId}">
                        <i class="fa fa-minus"></i>
                    </button>
                    <input class="qty-input" id="input-quantity-${product.productId}" type="number" name="quantity" min="1" max="100" value="1">

                    <button type="button" class="qty-right-plus" data-product-id="${product.productId}">
                        <i class="fa fa-plus"></i>
                    </button>
                    <button type="button" data-product-id="${product.productId}" class="add-cart-btn">Add</button>
                </div>
                <div id="add-to-cart-message-${product.productId}">
                </div>

                <ul class="product-option">
                    <li>
                        <a href="javascript:void(0)">
                            <i class="fa-regular fa-eye openModalBtn" data-product-id="${product.productId}"></i>                            
                        </a>
                    </li>

                    <li>
                        <i class="fa-regular fa-heart user-options-icons"></i>
                    </li>
                </ul>
            </div>`;
}

function buildViewProductTemplate(product) {
    
    return `<div id="${product.productId}">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.price}</p>
            </div>`;
}

function showProductAddedMessage(productId, quantity) {
    let divMessage = document.getElementById(`add-to-cart-message-${productId}`);
    //const myDiv = document.getElementById('add-to-cart-message');
    divMessage.style.display = "block";
    divMessage.textContent = `Add to Cart text ${quantity}`;

    setTimeout(() => {
        divMessage.style.display = "none";
    }, 2000);
}