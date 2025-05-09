const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.onclick = () => addToCart(product);

    li.appendChild(button);
    productList.appendChild(li);
  });
}

function addToCart(product) {
    let cart = getCart();

    // Prevent duplication in cart
    const existing = cart.find(p => p.id === product.id);
    if (!existing) {
        cart.push(product);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
function getCart() {
  try {
    const data = sessionStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);

// Restore cart state before render
window.addEventListener("load", () => {
  renderProducts();
  renderCart();
});