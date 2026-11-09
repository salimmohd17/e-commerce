/* ════════════════════════════════════════════════════════════
   CoastCart — app.js   (BMS TECHS)
   Main orchestrator — wires up all modules after components load
   ════════════════════════════════════════════════════════════ */

document.addEventListener("components-loaded", function () {
  var products = window.coastcartProducts || [];

  /* ── Hero Slider ─────────────────────────────────────── */
  window.CoastCartHero?.initHeroSlider();

  /* ── Hero "Create Free Account" button ───────────────── */
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "hero-join-btn") {
      e.preventDefault();
      window.CoastCartAuth?.openAuth();
    }
  });

  /* ── Marquee Sections + Flash Countdown ──────────────── */
  window.CoastCartMarquee?.initMarquees(products);

  /* ── Product Grid, Filters, Search, Sort & Modal ─────── */
  window.CoastCartShop?.initShop(products);

  /* ── Cart Panel ──────────────────────────────────────── */
  window.CoastCartCart?.initCart();

  /* ── Checkout / Payment Panel ────────────────────────── */
  window.CoastCartCheckout?.initCheckout();

  /* ── Auth Modal ──────────────────────────────────────── */
  window.CoastCartAuth?.initAuth();

  /* ── Side Menu ───────────────────────────────────────── */
  window.CoastCartMenu?.initMenu(function (cat) {
    window.CoastCartShop?.setCategory(cat, products);
  });

  /* ── Nav: Account & Wishlist buttons ─────────────────── */
  document.getElementById("account-toggle")?.addEventListener("click", function () {
    window.CoastCartAuth?.openAuth();
  });
  document.getElementById("menu-login-btn")?.addEventListener("click", function () {
    window.CoastCartMenu?.closeMenu();
    window.CoastCartAuth?.openAuth();
  });
  document.getElementById("menu-account-link")?.addEventListener("click", function (e) {
    e.preventDefault();
    window.CoastCartMenu?.closeMenu();
    window.CoastCartAuth?.openAuth();
  });
  document.getElementById("footer-login-link")?.addEventListener("click", function (e) {
    e.preventDefault();
    window.CoastCartAuth?.openAuth();
  });
  document.getElementById("wishlist-nav-btn")?.addEventListener("click", function () {
    window.CoastCartHelpers?.showToast("Wishlist — coming soon! Sign in to save items ❤️");
  });

  /* ── Newsletter ──────────────────────────────────────── */
  document.getElementById("newsletter-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email-input")?.value.trim();
    var msg   = document.getElementById("newsletter-message");
    if (msg) msg.textContent = "✅ Thanks! " + email + " has been subscribed.";
    event.target.reset();
  });

  /* ── Global Escape key ───────────────────────────────── */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      window.CoastCartCart?.closeCart();
      window.CoastCartShop?.closeProductModal();
      window.CoastCartAuth?.closeAuth();
      window.CoastCartCheckout?.closePayment();
    }
  });

  /* ── Footer year ─────────────────────────────────────── */
  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
