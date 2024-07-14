import { getData } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateQuantity } from "./utils.mjs";
import { addTocart }  from "./products.mjs";

export async function loadWishlistProducts(selector, clear) {
    let productsInWishlist = getLocalStorage("products-in-wishlist");

    renderListWithTemplate(buildWishlistProductTemplate, selector, productsInWishlist, clear);
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

    const removeWishlistButtons = document.querySelectorAll(".remove-wishlist");
    removeWishlistButtons.forEach(button => {
        button.addEventListener('click', async() => {
            const productId = button.getAttribute("data-product-id");
            removeWishlist(productId);
            displayTotalWishlistItems();
        });
    });
}


export async function addToWishlist(productId) {

    let productsInWishlist = getLocalStorage("products-in-wishlist") || [];
    let productAlreadyAdded = productsInWishlist.find(p => p.productId == productId);

    if (productAlreadyAdded == null){
        let products = await getData("products");
        let product = products.find(p => p.productId == productId);
        productsInWishlist.push(product);
        setLocalStorage("products-in-wishlist", productsInWishlist);
    }
}

export function displayTotalWishlistItems() {
    const cartItems = getLocalStorage("products-in-wishlist");
    let totalItems = 0;
  
    if (cartItems) {
      totalItems = cartItems.length;
    }
  
    const cartIcon = document.querySelector("#wishlist-items");
    if(cartIcon){
      cartIcon.textContent = totalItems.toString();
    }  
}


function buildWishlistProductTemplate(product) {
    
    return `<div id="${product.productId}" class="product-card">
                <button type="button" class="remove-wishlist" data-product-id="${product.productId}">
                    X
                </button>
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
            </div>`;
}


function removeWishlist(productId){
    let productsInWishlist = getLocalStorage("products-in-wishlist") || [];

    if(productsInWishlist){
        const newWishlist = productsInWishlist.filter(p => p.productId !== Number(productId));
        setLocalStorage("products-in-wishlist", newWishlist);
    }

    const div = document.getElementById(productId);
    div.remove();
}