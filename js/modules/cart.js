/* ════════════════════════════════════════════════════════════
   CoastCart — modules/cart.js  (BMS TECHS)
   Cart state, rendering & panel open/close
   ════════════════════════════════════════════════════════════ */

let cart = JSON.parse(localStorage.getItem("coastcart-cart") || "[]");

function saveCart() {
  localStorage.setItem("coastcart-cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id, notify = true) {
  const item = cart.find(e => e.id === id);
  if (item) item.quantity += 1;
  else cart.push({ id, quantity: 1 });
  saveCart();
  if (notify) {
    const products = window.coastcartProducts || [];
    const product  = products.find(e => e.id === id);
    if (product) window.CoastCartHelpers.showToast(`${product.name} added to your cart 🛒`);
  }
}

function changeQuantity(id, amount) {
  const item = cart.find(e => e.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) cart = cart.filter(e => e.id !== id);
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function renderCart() {
  const { money } = window.CoastCartHelpers;
  const products     = window.coastcartProducts || [];
  const cartCount    = document.getElementById("cart-count");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartItems    = document.getElementById("cart-items");

  const qty = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => {
    const p = products.find(e => e.id === i.id);
    return s + (p ? p.price * i.quantity : 0);
  }, 0);

  if (cartCount)    cartCount.textContent    = qty;
  if (cartSubtotal) cartSubtotal.textContent = money(subtotal);
  if (!cartItems)   return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div style="font-size:3rem;margin-bottom:10px">🛒</div>
        <p>Your cart is empty.<br>Add something you like!</p>
      </div>`;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const p = products.find(e => e.id === item.id);
    if (!p) return "";
    return `<article class="cart-item">
      <div class="cart-item-visual" style="background:${p.bg}">${p.emoji}</div>
      <div>
        <h3>${p.name}</h3>
        <p>${money(p.price)} each</p>
        <div class="quantity-controls">
          <button type="button" data-quantity="-1" data-id="${item.id}" aria-label="Decrease">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-quantity="1" data-id="${item.id}" aria-label="Increase">+</button>
        </div>
        <button class="remove-item" type="button" data-remove="${item.id}">Remove</button>
      </div>
      <strong>${money(p.price * item.quantity)}</strong>
    </article>`;
  }).join("");
}

function openCart() {
  const cartPanel = document.getElementById("cart-panel");
  const overlay   = document.getElementById("overlay");
  if (cartPanel) { cartPanel.classList.add("open"); cartPanel.setAttribute("aria-hidden", "false"); }
  if (overlay)   overlay.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("cart-close")?.focus();
}

function closeCart() {
  const cartPanel = document.getElementById("cart-panel");
  const overlay   = document.getElementById("overlay");
  if (cartPanel) { cartPanel.classList.remove("open"); cartPanel.setAttribute("aria-hidden", "true"); }
  if (overlay)   overlay.hidden = true;
  document.body.style.overflow = "";
}

function initCart() {
  renderCart();

  document.getElementById("cart-toggle")?.addEventListener("click", openCart);
  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("overlay")?.addEventListener("click", closeCart);

  document.getElementById("cart-items")?.addEventListener("click", event => {
    const qBtn = event.target.closest("[data-quantity]");
    const rBtn = event.target.closest("[data-remove]");
    if (qBtn) changeQuantity(Number(qBtn.dataset.id), Number(qBtn.dataset.quantity));
    if (rBtn) removeFromCart(Number(rBtn.dataset.remove));
  });

  document.getElementById("clear-cart")?.addEventListener("click", () => {
    cart = [];
    saveCart();
    window.CoastCartHelpers.showToast("Cart cleared");
  });
}

window.CoastCartCart = { cart, addToCart, changeQuantity, removeFromCart, saveCart, renderCart, openCart, closeCart, initCart };
