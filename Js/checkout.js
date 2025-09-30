document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
    setupFormValidation();
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
    summaryItems.innerHTML = '<p class="empty-cart-message">Your cart is empty. Please add items to your cart before checkout.</p>';
    
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
    summaryItems.innerHTML = '';

    cart.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('summary-item');
        
        item.innerHTML = `
            <img src="${product.thumbnail || product.images?.[0] || ''}" alt="${product.title}">
            <div class="summary-item-info">
                <div class="summary-item-title">${product.title}</div>
                <div class="summary-item-details">Qty: ${product.quantity || 1}</div>
            </div>
            <div class="summary-item-price">$${(product.price * (product.quantity || 1)).toFixed(2)}</div>
        `;
        
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
    alert('Your order has been placed successfully!');});