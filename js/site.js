/**
 * Store links from site-config.js + App Store coming-soon toggle.
 */
(function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  var cfg = window.MSHUKIWA_SITE;
  if (!cfg) return;

  if (cfg.playStoreUrl) {
    document.querySelectorAll("[data-play-store]").forEach(function (el) {
      el.href = cfg.playStoreUrl;
    });
  }

  var appleWrap = document.getElementById("app-store-wrap");
  if (appleWrap && cfg.appStoreUrl) {
    appleWrap.classList.remove("store-badge--disabled");
    var link = appleWrap.querySelector("a");
    if (link) {
      link.href = cfg.appStoreUrl;
      link.removeAttribute("tabindex");
      link.removeAttribute("aria-disabled");
    }
    var badge = appleWrap.querySelector(".badge-soon");
    if (badge) badge.remove();
  }
})();
