let cart = [];
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartItemsContainer = document.getElementById('cart-items');

// Add to cart function
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productItem = button.closest('.product-item');
        const productName = productItem.querySelector('h3').innerText;
        const productPrice = parseFloat(productItem.getAttribute('data-price'));

        // Add product to cart
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        updateCart();
    });
});

// Update cart function
function updateCart() {
    // Update cart count
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Update cart total
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotal.innerText = total.toFixed(2);

    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <p>${item.name} x ${item.quantity}: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `).join('');
    }
}

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for your message!');
    event.target.reset();
});

// Checkout form submission
document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Normally you would send form data to a server here.
    alert('Order has been placed! Thank you for your purchase.');
});
