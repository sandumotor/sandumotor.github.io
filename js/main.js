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

  // Widget de Instagram: se escala para ocupar el ancho disponible sin deformar el contenido
  var igCard = document.querySelector(".instagram-widget-card");
  var igFrame = igCard && igCard.querySelector("iframe.snapwidget-widget");
  if (igCard && igFrame) {
    var sizeIgWidget = function () {
      var scale = Math.min(1, igCard.clientWidth / 765);
      igFrame.style.transform = "scale(" + scale + ")";
      igCard.style.height = Math.round(510 * scale) + "px";
    };
    sizeIgWidget();
    window.addEventListener("resize", sizeIgWidget);
  }

  // Mapa de OpenStreetMap: se carga solo cuando el usuario lo pide (servicio externo)
  var loadMapBtn = document.getElementById("loadMapBtn");
  if (loadMapBtn) {
    loadMapBtn.addEventListener("click", function () {
      var wrap = document.getElementById("mapWrap");
      var src = wrap.getAttribute("data-map-src");
      var title = wrap.getAttribute("data-map-title");
      var iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = title;
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      wrap.innerHTML = "";
      wrap.appendChild(iframe);
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

  // Formulario de búsqueda personalizada: arma un mensaje de WhatsApp con lo seleccionado
  var requestForm = document.getElementById("vehicleRequestForm");
  if (requestForm) {
    requestForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      var nombre = val("reqNombre");
      var telefono = val("reqTelefono");
      var marca = val("reqMarca");
      var modelo = val("reqModelo");
      var km = val("reqKm");
      var precio = val("reqPrecio");
      var color = val("reqColor");
      var equipamiento = val("reqEquipamiento");
      var comentarios = val("reqComentarios");

      var lines = ["Hola, busco un vehículo con estas características:", ""];
      lines.push("Nombre: " + (nombre || "-"));
      if (telefono) lines.push("Teléfono: " + telefono);
      lines.push("Marca: " + (marca || "Sin preferencia"));
      if (modelo) lines.push("Modelo: " + modelo);
      lines.push("Kilometraje: " + (km || "Sin preferencia"));
      lines.push("Presupuesto: " + (precio || "Sin preferencia"));
      if (color) lines.push("Color: " + color);
      if (equipamiento) lines.push("Equipamiento deseado: " + equipamiento);
      if (comentarios) lines.push("Comentarios: " + comentarios);

      var text = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/34614063623?text=" + text, "_blank", "noopener");
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
    ".section-head, .feature-card, .vehicle-card, .faq-item, .about-grid > div, .contact-grid > div, .vehicle-detail > div, .cta-band, .request-form-card"
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
