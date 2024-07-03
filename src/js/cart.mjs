import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateQuantity } from "./utils.mjs";

export async function loadCarts(selector, clear) {
    let productsInCart = getLocalStorage("products-in-cart");

    renderListWithTemplate(buildCartTemplate, selector, productsInCart, clear);

    const plusButtons = document.querySelectorAll(".qty-right-plus");
    const minusButtons = document.querySelectorAll(".qty-left-minus");

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute("data-product-id");
            updateQuantity(productId, 1);
            calculateSubTotal(productId);
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute("data-product-id");
            updateQuantity(productId, -1);
            calculateSubTotal(productId);
        });
    });

    const removeCartButtons = document.querySelectorAll(".remove-cart-btn");
    removeCartButtons.forEach(button => {
        button.addEventListener('click', async() => {
            const productId = button.getAttribute("data-product-id");
            removeProduct(productId);
        });
    });
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
                    <span class="text-brand" id="subtotal-${product.productId}" data-product-price="${product.price}" >$${product.price * product.quantity}</span>
                </td>
                <td class="action text-center" data-title="Remove">
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

function calculateSubTotal(productId){
    const spanSubtotal = document.getElementById(`subtotal-${productId}`);
    const price = spanSubtotal.getAttribute("data-product-price");

    const input = document.getElementById(`input-quantity-${productId}`);
    const quantity = parseInt(input.value, 10);
    const subtotal = quantity * price;
    spanSubtotal.innerHTML = `$${subtotal}`;
}

function calculateSummary(){
    const spanSubtotal = document.getElementById(`subtotal-${productId}`);
}