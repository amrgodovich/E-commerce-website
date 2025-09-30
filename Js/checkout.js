document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
});

function loadOrderSummary() {
    const cartTxt = localStorage.getItem('cart');

    if (!cartTxt) {
        displayEmptyCart();
        return;
    }

    const cart = JSON.parse(cartTxt);

    if (cart.length === 0) {
        displayEmptyCart();
        return;
    }

    displayOrderSummary(cart);
    calculateTotals(cart);
}

function displayEmptyCart() {
    const summaryItems = document.getElementById('summary-items');
    summaryItems.innerHTML = ""; // safe reset

    const msg = document.createElement('p');
    msg.className = "empty-cart-message";
    msg.textContent = "Your cart is empty. Please add items to your cart before checkout.";
    summaryItems.appendChild(msg);

    document.getElementById('subtotal').textContent = '$0.00';
    document.getElementById('final-total').textContent = '$5.00';

    const form = document.getElementById('checkout-form');
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = '#ccc';
    submitBtn.style.cursor = 'not-allowed';
}

function displayOrderSummary(cart) {
    const summaryItems = document.getElementById('summary-items');
    summaryItems.innerHTML = ""; // clear old items

    cart.forEach(product => {
        const item = document.createElement('div');
        item.className = "summary-item";

        // product image
        const img = document.createElement('img');
        img.src = product.thumbnail || (product.images?.[0] || "");
        img.alt = product.title;

        // info container
        const info = document.createElement('div');
        info.className = "summary-item-info";

        const title = document.createElement('div');
        title.className = "summary-item-title";
        title.textContent = product.title;

        const details = document.createElement('div');
        details.className = "summary-item-details";
        details.textContent = `Qty: ${product.quantity || 1}`;

        info.appendChild(title);
        info.appendChild(details);

        // price
        const price = document.createElement('div');
        price.className = "summary-item-price";
        price.textContent = `$${(product.price * (product.quantity || 1)).toFixed(2)}`;

        // assemble
        item.appendChild(img);
        item.appendChild(info);
        item.appendChild(price);

        summaryItems.appendChild(item);
    });
}

function calculateTotals(cart) {
    const subtotal = cart.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('final-total').textContent = `$${total.toFixed(2)}`;
}

document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();
    localStorage.removeItem('cart');
    window.location.reload();
    this.reset();
    alert('Your order has been placed successfully!');
});
