import { loadViewProduct } from "./products.mjs";

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("openModalBtn")) {
        const viewProduct = document.querySelector("#product-detail");
        const productId = event.target.getAttribute('data-product-id');
        loadViewProduct(viewProduct, productId);
        openModal("viewProductModal");
        //alert("open modal");
    } else if (event.target.classList.contains("close")) {
      closeModal("viewProductModal");
      //clearViewProductDetails();
      //alert("close modal");
    } else {

      const modal = document.getElementById("viewProductModal");
      if (modal && event.target === modal) {
        //closeModal("viewProductModal");
        //clearViewProductDetails();
        alert("close modal three");
      }
    }
  });
});

export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}
