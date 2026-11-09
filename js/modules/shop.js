/* ════════════════════════════════════════════════════════════
   CoastCart — modules/shop.js  (BMS TECHS)
   Product grid, filters, search, sort & product modal
   ════════════════════════════════════════════════════════════ */

let activeCategory = "All";

// ── Helpers ───────────────────────────────────────────────
function getVisibleProducts(products) {
  const term = (document.getElementById("search-input")?.value || "").trim().toLowerCase();
  const sort = document.getElementById("sort-select")?.value || "featured";

  let visible = products.filter(p => {
    const matchesCat  = activeCategory === "All" || p.category === activeCategory;
    const matchesTerm = `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term);
    return matchesCat && matchesTerm;
  });

  switch (sort) {
    case "low-high": visible.sort((a, b) => a.price - b.price); break;
    case "high-low": visible.sort((a, b) => b.price - a.price); break;
    case "name":     visible.sort((a, b) => a.name.localeCompare(b.name)); break;
  }
  return visible;
}

// ── Product Grid ──────────────────────────────────────────
function renderProducts(products) {
  const { money } = window.CoastCartHelpers;
  const productGrid = document.getElementById("product-grid");
  const resultCount = document.getElementById("result-count");
  const emptyState  = document.getElementById("empty-state");
  const visible = getVisibleProducts(products);

  if (resultCount) resultCount.textContent = `${visible.length} product${visible.length === 1 ? "" : "s"}`;
  if (emptyState)  emptyState.hidden = visible.length !== 0;

  if (!productGrid) return;
  productGrid.innerHTML = visible.map(product => `
    <article class="product-card" data-product-id="${product.id}" role="button" tabindex="0" aria-label="View ${product.name}">
      <div class="product-visual" style="background:${product.bg}">
        <span class="product-tag">${product.tag}</span>
        <span class="product-emoji" role="img" aria-label="${product.name}">${product.emoji}</span>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <div class="product-title-row">
          <h3 class="product-title">${product.name}</h3>
          <span class="product-price">${money(product.price)}</span>
        </div>
        <p class="product-description">${product.description}</p>
        <button class="add-button" type="button" data-add="${product.id}">Add to cart +</button>
      </div>
    </article>`).join("");
}

// ── Product Modal ──────────────────────────────────────────
let modalProduct = null;
let modalQty = 1;

function openProductModal(id, products) {
  const { money } = window.CoastCartHelpers;
  const p = products.find(x => x.id === id);
  if (!p) return;
  modalProduct = p;
  modalQty = 1;

  const visual = document.getElementById("modal-visual");
  if (visual) {
    visual.style.cssText = `background:${p.bg};font-size:7rem;display:grid;place-items:center;`;
    visual.innerHTML = `<span>${p.emoji}</span>`;
  }

  const set = (elId, val) => { const el = document.getElementById(elId); if (el) el.textContent = val; };
  set("modal-category", p.category);
  set("modal-title",    p.name);
  set("modal-reviews",  `${p.rating} (${p.reviews} reviews)`);
  set("modal-description", p.description);
  set("modal-price",    money(p.price));
  set("modal-tag",      p.tag);
  set("modal-store",    p.store);
  set("modal-stock",    `${p.stock} in stock`);
  set("modal-qty-value", 1);

  const colorsWrap      = document.getElementById("modal-colors-wrap");
  const colorsContainer = document.getElementById("modal-colors");
  if (p.colors && p.colors.length) {
    if (colorsWrap) colorsWrap.hidden = false;
    if (colorsContainer) {
      colorsContainer.innerHTML = p.colors.map((c, i) =>
        `<button class="color-swatch${i === 0 ? " selected" : ""}" style="background:${c}" data-color="${c}" aria-label="Color ${c}" type="button"></button>`
      ).join("");
    }
  } else {
    if (colorsWrap) colorsWrap.hidden = true;
  }

  const overlay = document.getElementById("product-modal-overlay");
  const modal   = document.getElementById("product-modal");
  if (overlay) overlay.hidden = false;
  if (modal)   modal.hidden   = false;
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const overlay = document.getElementById("product-modal-overlay");
  const modal   = document.getElementById("product-modal");
  if (overlay) overlay.hidden = true;
  if (modal)   modal.hidden   = true;
  document.body.style.overflow = "";
  modalProduct = null;
}

// ── Init ──────────────────────────────────────────────────
function initShop(products) {
  renderProducts(products);

  // Product grid clicks
  const productGrid = document.getElementById("product-grid");
  if (productGrid) {
    productGrid.addEventListener("click", event => {
      const addBtn = event.target.closest("[data-add]");
      if (addBtn) {
        event.stopPropagation();
        window.CoastCartCart?.addToCart(Number(addBtn.dataset.add));
        return;
      }
      const card = event.target.closest("[data-product-id]");
      if (card) openProductModal(Number(card.dataset.productId), products);
    });
    productGrid.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        const card = event.target.closest("[data-product-id]");
        if (card) openProductModal(Number(card.dataset.productId), products);
      }
    });
  }

  // Category filters
  document.getElementById("category-filters")?.addEventListener("click", event => {
    const btn = event.target.closest("[data-category]");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    document.querySelectorAll(".filter").forEach(f => f.classList.toggle("active", f === btn));
    renderProducts(products);
  });

  // Search
  document.getElementById("search-input")?.addEventListener("input", () => renderProducts(products));
  document.getElementById("search-form")?.addEventListener("submit", event => {
    event.preventDefault();
    renderProducts(products);
    document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
  });

  // Sort
  document.getElementById("sort-select")?.addEventListener("change", () => renderProducts(products));

  // Clear filters
  document.getElementById("clear-search")?.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input");
    const sortSelect  = document.getElementById("sort-select");
    if (searchInput) searchInput.value = "";
    if (sortSelect)  sortSelect.value  = "featured";
    activeCategory = "All";
    document.querySelectorAll(".filter").forEach(f =>
      f.classList.toggle("active", f.dataset.category === "All")
    );
    renderProducts(products);
  });

  // Product modal events
  document.getElementById("product-modal-overlay")?.addEventListener("click", closeProductModal);
  document.getElementById("modal-close")?.addEventListener("click", closeProductModal);

  document.getElementById("modal-colors")?.addEventListener("click", e => {
    const sw = e.target.closest(".color-swatch");
    if (!sw) return;
    document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("selected"));
    sw.classList.add("selected");
  });

  document.getElementById("modal-qty-minus")?.addEventListener("click", () => {
    if (modalQty > 1) {
      modalQty--;
      const el = document.getElementById("modal-qty-value");
      if (el) el.textContent = modalQty;
    }
  });
  document.getElementById("modal-qty-plus")?.addEventListener("click", () => {
    if (modalQty < (modalProduct?.stock || 99)) {
      modalQty++;
      const el = document.getElementById("modal-qty-value");
      if (el) el.textContent = modalQty;
    }
  });

  document.getElementById("modal-add-to-cart")?.addEventListener("click", () => {
    if (!modalProduct) return;
    for (let i = 0; i < modalQty; i++) window.CoastCartCart?.addToCart(modalProduct.id, false);
    window.CoastCartCart?.saveCart();
    window.CoastCartHelpers.showToast(`${modalProduct.name} ×${modalQty} added to cart`);
    closeProductModal();
  });

  document.getElementById("modal-wishlist-btn")?.addEventListener("click", () => {
    const btn = document.getElementById("modal-wishlist-btn");
    btn.classList.toggle("active");
    window.CoastCartHelpers.showToast(
      btn.classList.contains("active")
        ? `${modalProduct?.name} added to wishlist ❤️`
        : `${modalProduct?.name} removed from wishlist`
    );
  });
}

function setCategory(cat, products) {
  activeCategory = cat;
  document.querySelectorAll(".filter").forEach(f =>
    f.classList.toggle("active", f.dataset.category === cat)
  );
  renderProducts(products);
}

window.CoastCartShop = { initShop, openProductModal, closeProductModal, setCategory };
