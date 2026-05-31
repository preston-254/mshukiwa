/**
 * Onboarding carousel — swipe, dots, next/back, progress bar.
 */
(function () {
  var root = document.querySelector(".onboarding");
  if (!root) return;

  var track = root.querySelector(".onboarding__track");
  var slides = Array.prototype.slice.call(root.querySelectorAll(".onboarding__slide"));
  var dots = Array.prototype.slice.call(root.querySelectorAll(".onboarding__dot"));
  var btnBack = root.querySelector(".onboarding__btn--back");
  var btnNext = root.querySelector(".onboarding__btn--next");
  var progress = root.querySelector(".onboarding__progress-fill");
  var counter = root.querySelector(".onboarding__counter");
  var total = slides.length;
  var index = 0;
  var touchStartX = 0;

  function goTo(i) {
    index = Math.max(0, Math.min(total - 1, i));
    track.style.transform = "translateX(-" + index * 100 + "%)";

    slides.forEach(function (s, n) {
      s.classList.toggle("onboarding__slide--active", n === index);
      s.setAttribute("aria-hidden", n === index ? "false" : "true");
    });

    dots.forEach(function (d, n) {
      d.classList.toggle("onboarding__dot--active", n === index);
      d.setAttribute("aria-selected", n === index ? "true" : "false");
    });

    if (progress) {
      progress.style.width = ((index + 1) / total) * 100 + "%";
      progress.parentElement.setAttribute("aria-valuenow", String(index + 1));
    }
    if (counter) {
      counter.textContent = String(index + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    }
    if (btnBack) btnBack.disabled = index === 0;
    if (btnNext) {
      btnNext.textContent = index === total - 1 ? "Get the app" : "Next";
      btnNext.dataset.last = index === total - 1 ? "true" : "false";
    }
  }

  if (btnBack) {
    btnBack.addEventListener("click", function () {
      goTo(index - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", function () {
      if (index === total - 1) {
        var cta = document.querySelector(".cta");
        if (cta) cta.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      goTo(index + 1);
    });
  }

  dots.forEach(function (dot, n) {
    dot.addEventListener("click", function () {
      goTo(n);
    });
  });

  root.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  root.addEventListener(
    "touchend",
    function (e) {
      var dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) < 40) return;
      goTo(dx < 0 ? index + 1 : index - 1);
    },
    { passive: true }
  );

  document.addEventListener("keydown", function (e) {
    if (!root.matches(":hover") && document.activeElement && !root.contains(document.activeElement)) return;
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  });

  goTo(0);
})();
