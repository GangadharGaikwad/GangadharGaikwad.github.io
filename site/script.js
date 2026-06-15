/* ============================================================
   Gangadhar Gaikwad — Liquid Portfolio
   Vanilla interactions. No framework, no build step.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---- 1. Seamless marquees: triple the chips ----------------- */
  document.querySelectorAll("[data-marquee]").forEach(function (track) {
    var html = track.innerHTML;
    track.innerHTML = html + html + html; // -33.333% keyframe == one set
  });

  /* ---- 2. Custom cursor (desktop, pointer fine) --------------- */
  var cursor = document.getElementById("cursor");
  if (cursor && !isTouch && !reduceMotion) {
    var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    var tx = cx, ty = cy;
    document.addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
    document.addEventListener("mouseover", function (e) {
      var t = e.target;
      if (t.closest("[data-cursor='melt']")) cursor.className = "cursor melt";
      else if (t.closest("a, button, .work-card")) cursor.className = "cursor big";
      else cursor.className = "cursor";
    }, { passive: true });
    (function loop() {
      cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
      cursor.style.left = cx + "px"; cursor.style.top = cy + "px";
      requestAnimationFrame(loop);
    })();
  } else if (cursor) {
    cursor.style.display = "none";
  }

  /* ---- 3. Hero parallax blobs --------------------------------- */
  var liquid = document.getElementById("hero-liquid");
  if (liquid && !isTouch && !reduceMotion) {
    var blobs = liquid.querySelectorAll(".hero-blob");
    document.addEventListener("mousemove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 2;
      var y = (e.clientY / window.innerHeight - 0.5) * 2;
      blobs.forEach(function (b, i) {
        var depth = 8 + i * 6;
        b.style.transform = "translate(" + (x * depth) + "px," + (y * depth) + "px)";
      });
    }, { passive: true });
  }

  /* ---- 4. Hero portrait melt (SVG displacement) --------------- */
  var wrap = document.getElementById("portrait-wrap");
  var map = document.getElementById("hd-map");
  if (wrap && map && !isTouch && !reduceMotion) {
    var scale = 0, target = 0;
    wrap.addEventListener("mouseenter", function () { target = 10; });
    wrap.addEventListener("mouseleave", function () { target = 0; });
    wrap.addEventListener("mousemove", function (e) {
      var r = wrap.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      var d = Math.min(1, Math.hypot(dx, dy));
      target = 5 + (1 - d) * 12; // 5..17, gentle melt
    }, { passive: true });
    (function loop() {
      var k = target > scale ? 0.10 : 0.06;
      scale += (target - scale) * k;
      map.setAttribute("scale", scale.toFixed(2));
      requestAnimationFrame(loop);
    })();
  } else if (map) {
    map.setAttribute("scale", "0");
  }

  /* ---- 5. Work-card cursor glow ------------------------------- */
  if (!isTouch) {
    document.querySelectorAll(".work-card").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      }, { passive: true });
    });
  }

  /* ---- 6. Scroll progress + active nav + rail counter --------- */
  var sections = ["top", "about", "work", "stack", "wins", "contact"];
  var navLinks = document.querySelectorAll(".nav a[data-nav]");
  var fill = document.getElementById("scroll-fill");
  var railNum = document.getElementById("rail-num");

  function onScroll() {
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    var p = Math.min(1, Math.max(0, doc.scrollTop / max));
    if (fill) fill.style.height = (p * 100) + "%";

    var mark = window.scrollY + window.innerHeight * 0.4;
    var current = "top", idx = 0;
    for (var i = 0; i < sections.length; i++) {
      var el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= mark) { current = sections[i]; idx = i; }
    }
    if (railNum) railNum.textContent = String(idx + 1).padStart(2, "0");
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === current);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ---- 7. IST clock for the right rail ------------------------ */
  var clock = document.getElementById("rail-clock");
  if (clock) {
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata"
      });
    } catch (e) { fmt = null; }
    function tick() {
      if (fmt) clock.textContent = fmt.format(new Date());
    }
    tick();
    setInterval(tick, 30000);
  }
})();
