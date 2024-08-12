// Initialize an empty cart array
let cart = [];

// Get references to cart elements
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartItemsContainer = document.getElementById('cart-items');

// Add to cart function
function addToCart(productName, productPrice) {
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.name === productName);
    
    if (existingItemIndex !== -1) {
        // If the item exists, increase the quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If the item does not exist, add it to the cart
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    // Update the cart display
    updateCart();
}

// Update cart function
function updateCart() {
    // Update cart count
    cartCount.innerText = cart.length;

    // Calculate the total price
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
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

// Event listener for add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productItem = button.closest('.product-item');
        const productName = productItem.querySelector('h3').innerText;
        const productPrice = parseFloat(productItem.getAttribute('data-price'));

        addToCart(productName, productPrice);
    });
});
