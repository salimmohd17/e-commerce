/* ════════════════════════════════════════════════════════════
   CoastCart — loader.js   (BMS TECHS)
   Fetches HTML component files and injects them into the page.
   Runs synchronously (no defer) so components are ready before
   the deferred module scripts execute.
   ════════════════════════════════════════════════════════════ */

(function () {
  /* Map: component file → placeholder element id */
  var components = [
    { url: "components/header.html",         target: "app-header"        },
    { url: "components/hero-slider.html",    target: "app-hero"          },
    { url: "components/main-content.html",   target: "app-content"       },
    { url: "components/footer.html",         target: "app-footer"        },
    { url: "components/cart-panel.html",     target: "app-cart"          },
    { url: "components/product-modal.html",  target: "app-product-modal" },
    { url: "components/checkout-modal.html", target: "app-checkout"      },
    { url: "components/auth-modal.html",     target: "app-auth"          },
    { url: "components/toast.html",          target: "app-toast"         }
  ];

  var loaded = 0;

  function onAllLoaded() {
    /* Tell app.js all components are in the DOM */
    document.dispatchEvent(new CustomEvent("components-loaded"));
  }

  components.forEach(function (comp) {
    fetch(comp.url)
      .then(function (res) {
        if (!res.ok) throw new Error("Could not load " + comp.url + " (" + res.status + ")");
        return res.text();
      })
      .then(function (html) {
        var el = document.getElementById(comp.target);
        if (el) {
          /* Replace the placeholder div with the actual component HTML */
          var tmp = document.createElement("div");
          tmp.innerHTML = html;
          el.replaceWith.apply(el, Array.from(tmp.childNodes));
        }
      })
      .catch(function (err) {
        console.error("[CoastCart Loader]", err);
      })
      .finally(function () {
        loaded++;
        if (loaded === components.length) onAllLoaded();
      });
  });
})();
