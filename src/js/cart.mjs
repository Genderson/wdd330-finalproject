import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateQuantity } from "./utils.mjs";

export async function loadCarts(selector, clear) {
    let productsInCart = getLocalStorage("products-in-cart");

    renderListWithTemplate(buildCartTemplate, selector, productsInCart, clear);
    calculateSummary();

    const plusButtons = document.querySelectorAll(".qty-right-plus");
    const minusButtons = document.querySelectorAll(".qty-left-minus");

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute("data-product-id");
            updateQuantity(productId, 1);
            updateQuantityStorage(productId);
            calculateSubTotal(productId);
            calculateSummary();
            displayTotalCartItems();
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute("data-product-id");
            updateQuantity(productId, -1);
            updateQuantityStorage(productId);
            calculateSubTotal(productId);
            calculateSummary();
            displayTotalCartItems();
        });
    });

    const removeCartButtons = document.querySelectorAll(".remove-cart-btn");
    removeCartButtons.forEach(button => {
        button.addEventListener('click', async() => {
            const productId = button.getAttribute("data-product-id");
            removeProduct(productId);
            calculateSummary();
            displayTotalCartItems();
        });
    });
}

export function displayTotalCartItems() {
    const cartItems = getLocalStorage("products-in-cart");
    let totalItems = 0;
  
    if (cartItems) {
      totalItems = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );
    }
  
    const cartIcon = document.querySelector("#cart-items");
    if(cartIcon){
      cartIcon.textContent = totalItems.toString();
    }  
}

function buildCartTemplate(product) {

    return `<tr id="row-${product.productId}">
                <td>
                    <img src="${product.image}" alt="${product.name}">
                </td>
                <td>
                    <p>${product.name}</p>
                </td>
                <td class="price" data-title="Price">
                    <span class="text-body">$${product.price}</span>
                </td>
                <td class="text-center detail-info" data-title="Stock">
                    <div>
                        <button type="button" class="qty-left-minus" data-product-id="${product.productId}">
                            <i class="fa fa-minus"></i>
                        </button>
                        <input class="qty-input" id="input-quantity-${product.productId}" type="number" name="quantity" min="1" max="100" value="${product.quantity}">       
                        <button type="button" class="qty-right-plus" data-product-id="${product.productId}">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </td>
                <td class="price" data-title="Price">
                    <span class="subtotal-value" id="subtotal-${product.productId}" data-product-price="${product.price}" >$${product.price * product.quantity}</span>
                </td>
                <td class="remove" data-title="Remove">
                    <i class="fa-solid fa-trash-can remove-cart-btn" data-product-id="${product.productId}"></i>
                </td>
            </tr>`;
}

function removeProduct(productId){
    // Get Cart items from local storage
    let cart = getLocalStorage("products-in-cart") || [];

    //Find the item in the index
    const itemIndex = cart.findIndex((item) => item.productId == Number(productId));

    // Remove from array
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        // update localStorage
        setLocalStorage("products-in-cart", cart);
        //localStorage.setItem("products-in-cart", JSON.stringify(cart));
        const row = document.getElementById(`row-${productId}`);
        row.remove();
    }
}

function updateQuantityStorage(productId){
    // Get Cart items from local storage
    let productsInCart = getLocalStorage("products-in-cart") || [];

    const input = document.getElementById(`input-quantity-${productId}`);
    const currentValue = parseInt(input.value, 10);

    let productAlreadyAdded = productsInCart.find(p => p.productId == productId);
    productAlreadyAdded.quantity = currentValue;

    setLocalStorage("products-in-cart", productsInCart);
}

function calculateSubTotal(productId){
    const spanSubtotal = document.getElementById(`subtotal-${productId}`);
    const price = spanSubtotal.getAttribute("data-product-price");

    const input = document.getElementById(`input-quantity-${productId}`);
    const quantity = parseInt(input.value, 10);
    const subtotal = quantity * price;
    spanSubtotal.innerHTML = `$${subtotal}`;
}

function calculateSummary(){
    const subtotalValues = document.querySelectorAll(".subtotal-value");
    let subtotal = 0; 

    for (let index = 0; index < subtotalValues.length; index++) {
        const element = subtotalValues[index];
        let value = element.textContent.slice(1);
        subtotal += Number(value);     
    }
    
    const finalSubTotal = document.getElementById(`subtotal`);
    finalSubTotal.innerHTML = subtotal;

    const shipping = document.getElementById(`shipping`);
    const finalTax = document.getElementById(`tax`);
    const finalTotal = document.getElementById(`total`);
    if(subtotal > 0){
        const tax = Math.round(subtotal * 0.06);
        shipping.innerHTML = 10;
        finalTax.innerHTML = tax;
        finalTotal.innerHTML = tax + subtotal + 10;
    }
    else{
        shipping.innerHTML = 0;
        finalTax.innerHTML = 0;
        finalTotal.innerHTML = 0;
    }
}

