// script.js

// Load cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(productName, price) {
    const existing = cart.find(item => item.name === productName);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    saveCart();
    alert(`${productName} added to cart!`);
}

// Remove item from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    updateCartDisplay();
}

// Change item quantity
function changeQuantity(productName, amount) {
    const item = cart.find(item => item.name === productName);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
        removeFromCart(productName);
    } else {
        saveCart();
        updateCartDisplay();
    }
}

// Update the cart display (for cart.html)
function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price} × ${item.quantity}
            = $${item.price * item.quantity}
            <button onclick="changeQuantity('${item.name}', 1)">+</button>
            <button onclick="changeQuantity('${item.name}', -1)">-</button>
            <button onclick="removeFromCart('${item.name}')">🗑 Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalElement.textContent = total.toFixed(2);
}

// Handle payment form submission
function submitPayment(e) {
    e.preventDefault();
    localStorage.removeItem("cart");
    cart = [];
    const message = document.getElementById("confirmation");
    if (message) {
        message.textContent = "Payment successful! Thank you for your purchase.";
    }
}
