import { getData } from "./productData.mjs";
import { getLocalStorage, renderListWithTemplate, renderWithTemplate, setLocalStorage, updateQuantity } from "./utils.mjs";
import { displayTotalCartItems } from "./cart.mjs";
import { addToWishlist, displayTotalWishlistItems } from "./wishlist.mjs";

export async function loadProducts(selector, categoryIds, clear) {
    let products = await getData("products");

    if(categoryIds && !categoryIds.includes(6)){
        products = products.filter(p => categoryIds.includes(p.categoryId));
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

    const addWishlistButtons = document.querySelectorAll(".add-wishlist-btn");
    addWishlistButtons.forEach(button => {
        button.addEventListener('click', async() => {
            const productId = button.getAttribute("data-product-id");
            await addToWishlist(productId);
            displayTotalWishlistItems();
        });
    });


    
}

export async function loadViewProduct(selector, productId){
    const products = await getData("products");
    const product = products.find(p => p.productId == productId);

    renderWithTemplate(buildViewProductTemplate, selector, product);
}

export async function addTocart(productId) {
    const inputQuantity = document.getElementById(`input-quantity-${productId}`);
    const quantity = Number(inputQuantity.value);

    if(quantity > 0){
        let productsInCart = getLocalStorage("products-in-cart") || [];
        let productAlreadyAdded = productsInCart.find(p => p.productId == productId);
    
        if (productAlreadyAdded){
            productAlreadyAdded.quantity = productAlreadyAdded.quantity + quantity;
        }
        else{
            let products = await getData("products");
            let newProduct = products.find(p => p.productId == productId);
            newProduct.quantity = quantity;
            productsInCart.push(newProduct);
        }

        setLocalStorage("products-in-cart", productsInCart);
        showProductAddedMessage(productId, quantity);
        displayTotalCartItems();
    }
}

function buildProductTemplate(product) {
    
    return `<div id="${product.productId}" class="product-card">
                <img src="${product.image}" alt="image">
                <h2>${product.name}</h2>
                <p><strong>Prince: </strong>$${product.price}</p>
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
                <div style="display: none;" class="add-to-cart-message" id="add-to-cart-message-${product.productId}">
                </div>

                <ul class="product-option">
                    <li>
                        <a href="javascript:void(0)">
                            <i class="fa-regular fa-eye openModalBtn user-options-icons" data-product-id="${product.productId}"></i>                            
                        </a>
                    </li>

                    <li>
                        <a href="javascript:void(0)" class="add-wishlist-btn" data-product-id="${product.productId}">
                            <i class="fa-regular fa-heart user-options-icons"></i>
                        </a>
                    </li>
                </ul>
            </div>`;
}

function buildViewProductTemplate(product) {
    
    return `<div id="${product.productId}">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p><strong>Code:</strong> ${product.code}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <p class="description">${product.description}</p>
            </div>`;
}

function showProductAddedMessage(productId, quantity) {
    let divMessage = document.getElementById(`add-to-cart-message-${productId}`);
    divMessage.style.display = "block";
    divMessage.textContent = `Added to cart ${quantity} items`;

    setTimeout(() => {
        divMessage.style.display = "none";
    }, 2000);
}