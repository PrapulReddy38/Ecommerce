// script.js
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let totalElement = document.getElementById("total");
    
    cartItems.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`; // Corrected template literal syntax
        cartItems.appendChild(li);
        total += item.price;
    });
    
    totalElement.textContent = `Total: $${total}`; // Ensuring total is displayed properly
}
