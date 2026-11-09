/* ════════════════════════════════════════════════════════════
   CoastCart — modules/menu.js  (BMS TECHS)
   Mobile side-menu open / close + category links
   ════════════════════════════════════════════════════════════ */

function openMenu() {
  const sideMenu = document.getElementById("side-menu");
  const overlay  = document.getElementById("side-menu-overlay");
  if (sideMenu) { sideMenu.classList.add("open"); sideMenu.setAttribute("aria-hidden", "false"); }
  if (overlay)  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  const sideMenu = document.getElementById("side-menu");
  const overlay  = document.getElementById("side-menu-overlay");
  if (sideMenu) { sideMenu.classList.remove("open"); sideMenu.setAttribute("aria-hidden", "true"); }
  if (overlay)  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function initMenu(onCategorySelect) {
  document.getElementById("menu-toggle")?.addEventListener("click", openMenu);
  document.getElementById("menu-close")?.addEventListener("click", closeMenu);
  document.getElementById("side-menu-overlay")?.addEventListener("click", closeMenu);

  // Category links in side menu
  document.querySelectorAll("[data-menu-category]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const cat = link.dataset.menuCategory;
      if (onCategorySelect) onCategorySelect(cat);
      closeMenu();
      document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

window.CoastCartMenu = { initMenu, openMenu, closeMenu };
