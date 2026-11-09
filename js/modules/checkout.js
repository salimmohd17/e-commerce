/* ════════════════════════════════════════════════════════════
   CoastCart — modules/checkout.js  (BMS TECHS)
   Checkout / Payment panel — multi-step flow
   ════════════════════════════════════════════════════════════ */

function buildOrderSummary() {
  const { money } = window.CoastCartHelpers;
  const products   = window.coastcartProducts || [];
  const cart       = window.CoastCartCart?.cart || [];
  const lines      = document.getElementById("order-lines");
  const total      = document.getElementById("order-total");
  if (!lines || !total) return;

  let sum = 0;
  lines.innerHTML = cart.map(item => {
    const p = products.find(e => e.id === item.id);
    if (!p) return "";
    const lineTotal = p.price * item.quantity;
    sum += lineTotal;
    return `<div class="order-line"><span>${p.name} ×${item.quantity}</span><span>${money(lineTotal)}</span></div>`;
  }).join("");
  total.textContent = money(sum);
}

function goPayStep(step) {
  [1, 2, 3].forEach(n => {
    const content = document.getElementById(`pay-step-${n}`);
    if (content) content.classList.toggle("hidden", n !== step);
    const stepEl = document.querySelector(`.pay-step[data-step="${n}"]`);
    if (stepEl) {
      stepEl.classList.toggle("active", n === step);
      if (n < step) stepEl.classList.add("done");
    }
  });
}

function openPayment() {
  const cart = window.CoastCartCart?.cart || [];
  if (cart.length === 0) { window.CoastCartHelpers.showToast("Your cart is empty!"); return; }
  window.CoastCartCart?.closeCart();
  buildOrderSummary();
  goPayStep(1);
  const overlay = document.getElementById("payment-overlay");
  const panel   = document.getElementById("payment-panel");
  if (overlay) overlay.hidden = false;
  if (panel)   { panel.hidden = false; panel.classList.add("open"); }
  document.body.style.overflow = "hidden";
}

function closePayment() {
  const overlay = document.getElementById("payment-overlay");
  const panel   = document.getElementById("payment-panel");
  if (overlay) overlay.hidden = true;
  if (panel)   { panel.hidden = true; panel.classList.remove("open"); }
  document.body.style.overflow = "";
}

function initCheckout() {
  if (!document.getElementById("payment-panel")) return;

  document.getElementById("payment-overlay")?.addEventListener("click", closePayment);
  document.getElementById("payment-close")?.addEventListener("click", closePayment);
  document.getElementById("checkout-button")?.addEventListener("click", openPayment);

  document.getElementById("pay-next-1")?.addEventListener("click", () => {
    const name  = document.getElementById("pay-name")?.value.trim();
    const phone = document.getElementById("pay-phone")?.value.trim();
    if (!name || !phone) { window.CoastCartHelpers.showToast("Please fill in your name and phone"); return; }
    goPayStep(2);
  });

  document.getElementById("pay-back-2")?.addEventListener("click", () => goPayStep(1));

  // Payment method toggle
  document.querySelectorAll("input[name='pay-method']").forEach(radio => {
    radio.addEventListener("change", () => {
      document.getElementById("mpesa-fields")?.classList.toggle("hidden", radio.value !== "mpesa");
      document.getElementById("card-fields")?.classList.toggle("hidden", radio.value !== "card");
    });
  });

  document.getElementById("pay-next-2")?.addEventListener("click", () => {
    const method = document.querySelector("input[name='pay-method']:checked")?.value;
    if (method === "mpesa" && !document.getElementById("mpesa-number")?.value.trim()) {
      window.CoastCartHelpers.showToast("Enter your M-Pesa number"); return;
    }
    const ref   = "CC-" + Date.now().toString(36).toUpperCase();
    const refEl = document.getElementById("pay-order-ref");
    if (refEl) refEl.textContent = ref;
    goPayStep(3);
  });

  document.getElementById("pay-done")?.addEventListener("click", () => {
    // Clear cart
    window.CoastCartCart.cart.splice(0);
    window.CoastCartCart.saveCart();
    closePayment();
    window.CoastCartHelpers.showToast("Thank you! Your order was placed 🎉");
  });
}

window.CoastCartCheckout = { initCheckout, openPayment, closePayment };
