// Script común del sitio: menú responsivo y visor de código
document.addEventListener("DOMContentLoaded", () => {
  // Botón de menú en pantallas pequeñas
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const abierto = links.classList.toggle("show");
      toggle.setAttribute("aria-expanded", abierto);
    });
  }

  // Submenú "Dibujos" con clic (además de hover)
  document.querySelectorAll(".dropdown-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const li = btn.parentElement;
      const abierto = li.classList.toggle("open");
      btn.setAttribute("aria-expanded", abierto);
    });
  });
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
  });

  // Visor de código: carga el archivo del sketch y lo muestra
  document.querySelectorAll("[data-code-src]").forEach((bloque) => {
    const src = bloque.getAttribute("data-code-src");
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then((texto) => { bloque.textContent = texto; })
      .catch(() => {
        bloque.textContent =
          "No se pudo cargar el código desde este entorno.\nÁbrelo directamente: " + src;
      });
  });
});
