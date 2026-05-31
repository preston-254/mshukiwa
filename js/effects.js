/**
 * Anti-gravity parallax + floating particles.
 * Respects prefers-reduced-motion.
 */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  var orbs = document.querySelectorAll("[data-parallax]");
  var heroIcon = document.querySelector(".hero__icon-wrap");
  var canvas = document.getElementById("particle-canvas");
  var mouse = { x: 0.5, y: 0.5 };
  var target = { x: 0.5, y: 0.5 };

  document.addEventListener("mousemove", function (e) {
    target.x = e.clientX / window.innerWidth;
    target.y = e.clientY / window.innerHeight;
  });

  document.addEventListener(
    "touchmove",
    function (e) {
      if (!e.touches[0]) return;
      target.x = e.touches[0].clientX / window.innerWidth;
      target.y = e.touches[0].clientY / window.innerHeight;
    },
    { passive: true }
  );

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function tickParallax() {
    mouse.x = lerp(mouse.x, target.x, 0.06);
    mouse.y = lerp(mouse.y, target.y, 0.06);

    orbs.forEach(function (el) {
      var depth = parseFloat(el.getAttribute("data-parallax") || "0.03");
      var dx = (mouse.x - 0.5) * depth * 120;
      var dy = (mouse.y - 0.5) * depth * 120;
      el.style.transform =
        "translate3d(" + dx + "px," + dy + "px,0) " + (el.dataset.baseTransform || "");
    });

    if (heroIcon) {
      var tiltX = (mouse.y - 0.5) * -8;
      var tiltY = (mouse.x - 0.5) * 8;
      heroIcon.style.transform =
        "perspective(800px) rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg)";
    }

    requestAnimationFrame(tickParallax);
  }

  tickParallax();

  /* Floating particles — drift upward like zero gravity */
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var particles = [];
  var count = Math.min(48, Math.floor(window.innerWidth / 22));

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  for (var i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.6,
      speed: Math.random() * 0.35 + 0.12,
      drift: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.45 + 0.15,
      hue: Math.random() > 0.33 ? 290 + Math.random() * 40 : 175 + Math.random() * 25,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (p) {
      p.y -= p.speed;
      p.x += p.drift + (mouse.x - 0.5) * 0.15;

      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(" + p.hue + ", 80%, 72%, " + p.alpha + ")";
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
})();
