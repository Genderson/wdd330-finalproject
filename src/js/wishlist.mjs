
export async function loadWishlistProducts(selector, clear) {
    let productsInWishlist = getLocalStorage("products-in-wishlist");

    renderListWithTemplate(buildWishlistProductTemplate, selector, productsInWishlist, clear); 
}


export async function addToWishlist(productId) {

    let productsInWishlist = getLocalStorage("products-in-wishlist") || [];
    let productAlreadyAdded = productsInWishlist.find(p => p.productId == productId);

    if (!productAlreadyAdded){
        let products = await getData("products");
        let product = products.find(p => p.productId == productId);
        productsInWishlist.push(product);
        setLocalStorage("products-in-wishlist", productsInWishlist);
    }
}

function buildWishlistProductTemplate(product) {
    
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