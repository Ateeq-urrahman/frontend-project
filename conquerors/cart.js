document.addEventListener('DOMContentLoaded', function () {
    renderCart();
});

function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.getElementById('cartTableBody');
    let total = 0;

    cartTableBody.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        const productTotal = item.price * item.quantity;
        total += productTotal;

        const formattedPrice = (typeof item.price === 'number') ? `₹${item.price.toFixed(2)}` : '';
        const formattedProductTotal = (typeof productTotal === 'number') ? `₹${productTotal.toFixed(2)}` : '';

        row.innerHTML = `
            <td>${item.name}</td>
            <td><img src="${item.image}" alt="${item.name}" /></td>
            <td>${formattedPrice}</td>
            <td>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </td>
            <td>${formattedProductTotal}</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        `;

        cartTableBody.appendChild(row);
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function updateQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && quantity > 0) {
        cartItem.quantity = parseInt(quantity, 10);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}
