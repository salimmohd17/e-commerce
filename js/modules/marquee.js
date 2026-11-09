/* ════════════════════════════════════════════════════════════
   CoastCart — modules/marquee.js  (BMS TECHS)
   Marquee sections (Top Selling & Flash Sales) + countdown
   ════════════════════════════════════════════════════════════ */

function buildMarqueeCard(product, isFlash) {
  const money = window.CoastCartHelpers.money;
  const discount = isFlash && product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return `
    <div class="mq-card" data-product-id="${product.id}">
      <div class="mq-visual" style="background:${product.bg}">
        <span class="mq-tag">${product.tag}</span>
        ${isFlash && discount ? `<span class="mq-flash-badge">-${discount}%</span>` : ""}
        <span style="font-size:3.4rem">${product.emoji}</span>
      </div>
      <div class="mq-info">
        <div class="mq-name">${product.name}</div>
        <div>
          <span class="mq-price">${money(product.price)}</span>
          ${isFlash && product.originalPrice ? `<span class="mq-original">${money(product.originalPrice)}</span>` : ""}
        </div>
        <div class="mq-rating">${"★".repeat(Math.round(product.rating))} <span style="color:#888;font-size:.7rem">(${product.reviews})</span></div>
      </div>
    </div>`;
}

function populateMarquee(trackId, filteredProducts, isFlash) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const cards = filteredProducts.map(p => buildMarqueeCard(p, isFlash)).join("");
  track.innerHTML = cards + cards; // two copies = seamless loop
}

function startFlashCountdown() {
  const el = document.getElementById("flash-countdown");
  if (!el) return;
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  setInterval(() => {
    const diff = end - new Date();
    if (diff <= 0) { el.textContent = "00:00:00"; return; }
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    el.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

function initMarquees(products) {
  populateMarquee("top-selling-track", products.filter(p => p.topSelling), false);
  populateMarquee("flash-sales-track", products.filter(p => p.flashSale), true);

  // Click on marquee card → open product modal
  document.querySelectorAll(".marquee-track").forEach(track => {
    track.addEventListener("click", e => {
      const card = e.target.closest("[data-product-id]");
      if (card && window.CoastCartShop) {
        window.CoastCartShop.openProductModal(Number(card.dataset.productId), products);
      }
    });
  });

  startFlashCountdown();
}

window.CoastCartMarquee = { initMarquees };
