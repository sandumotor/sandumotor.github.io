// SANDU MOTOR — scripts de interfaz (menú móvil y filtro de catálogo)

document.addEventListener("DOMContentLoaded", function () {
  // Menú móvil
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var expanded = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  // Galería de fotos en ficha de vehículo (clic en miniatura para cambiar foto principal)
  var mainPhoto = document.querySelector(".gallery-main img");
  var thumbs = document.querySelectorAll(".gallery-thumbs img");
  if (mainPhoto && thumbs.length) {
    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        mainPhoto.src = thumb.src;
        thumbs.forEach(function (t) { t.classList.remove("active"); });
        thumb.classList.add("active");
      });
    });
  }

  // Filtro de catálogo por marca
  var filterButtons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".vehicle-card");
  if (filterButtons.length && cards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var brand = btn.getAttribute("data-filter");
        cards.forEach(function (card) {
          var match = brand === "todos" || card.getAttribute("data-brand") === brand;
          card.style.display = match ? "" : "none";
        });
      });
    });
  }

  // Animación al hacer scroll: los bloques aparecen al entrar en pantalla
  var revealTargets = document.querySelectorAll(
    ".section-head, .feature-card, .vehicle-card, .faq-item, .about-grid > div, .contact-grid > div, .vehicle-detail > div, .cta-band"
  );
  if (revealTargets.length) {
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealTargets.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealTargets.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }
});
