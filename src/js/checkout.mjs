import { getLocalStorage, setLocalStorage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.forms[0];
    if (form != null) {

    form.addEventListener("submit", (e) => {
            e.preventDefault();

            let cartItems = [];
            setLocalStorage("products-in-cart", cartItems);
            window.location.href = `/checkout/success.html`;
        });
    }
});





export function calculateValues(){
    let cartsItems = getLocalStorage("products-in-cart") || [];
    const shippingValue = 10;
    let subTotal = 0;

    for (let index = 0; index < cartsItems.length; index++) {
        const cart = cartsItems[index];
        subTotal += cart.quantity * cart.price;        
    }

    let tax = Math.round(subTotal * 0.06);
    let total = tax + subTotal + shippingValue;

    const shipping = document.getElementById(`shipping`);
    const finalSubTotal = document.getElementById(`subtotal`);
    const finalTax = document.getElementById(`tax`);
    const finalTotal = document.getElementById(`total`);

    shipping.innerHTML = shippingValue;
    finalSubTotal.innerHTML = subTotal;
    finalTax.innerHTML = tax;
    finalTotal.innerHTML = total;
}