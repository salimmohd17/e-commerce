const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const money = amount => new Intl.NumberFormat("en-KE", {
  style: "currency", currency: "KES", maximumFractionDigits: 0
}).format(amount);

let toastTimer;
function showToast(msg) {
  const t = $("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

window.CoastCartHelpers = { $, $$, money, showToast };
