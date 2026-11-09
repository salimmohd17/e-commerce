/* ════════════════════════════════════════════════════════════
   CoastCart — modules/auth.js  (BMS TECHS)
   Login / Register modal
   ════════════════════════════════════════════════════════════ */

function showAuthSection(section) {
  document.getElementById("auth-login")?.classList.toggle("hidden", section !== "login");
  document.getElementById("auth-register")?.classList.toggle("hidden", section !== "register");
}

function openAuth() {
  const overlay = document.getElementById("auth-overlay");
  const modal   = document.getElementById("auth-modal");
  if (overlay) overlay.hidden = false;
  if (modal)   modal.hidden   = false;
  showAuthSection("login");
  document.body.style.overflow = "hidden";
}

function closeAuth() {
  const overlay = document.getElementById("auth-overlay");
  const modal   = document.getElementById("auth-modal");
  if (overlay) overlay.hidden = true;
  if (modal)   modal.hidden   = true;
  document.body.style.overflow = "";
}

function initAuth() {
  if (!document.getElementById("auth-modal")) return;

  document.getElementById("auth-overlay")?.addEventListener("click", closeAuth);
  document.getElementById("auth-close")?.addEventListener("click", closeAuth);
  document.getElementById("go-register")?.addEventListener("click", () => showAuthSection("register"));
  document.getElementById("go-login")?.addEventListener("click",    () => showAuthSection("login"));

  document.getElementById("login-form")?.addEventListener("submit", e => {
    e.preventDefault();
    window.CoastCartHelpers.showToast("Signing in... (PHP backend coming soon)");
    setTimeout(closeAuth, 1000);
  });

  document.getElementById("register-form")?.addEventListener("submit", e => {
    e.preventDefault();
    window.CoastCartHelpers.showToast("Account created! (PHP backend coming soon)");
    setTimeout(() => {
      closeAuth();
      window.CoastCartHelpers.showToast("Welcome to CoastCart! 🌊");
    }, 900);
  });

  // Social auth buttons
  document.querySelectorAll(".social-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      window.CoastCartHelpers.showToast(`${btn.textContent.trim()} login — coming soon!`);
    });
  });

  // Password visibility toggles
  document.querySelectorAll(".pass-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".pass-wrap")?.querySelector("input");
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      const icon = btn.querySelector("i");
      if (icon) icon.className = isPassword ? "bx bx-hide" : "bx bx-show";
    });
  });
}

window.CoastCartAuth = { initAuth, openAuth, closeAuth };
