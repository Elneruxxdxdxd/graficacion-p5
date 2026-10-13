// Demostración del API nativo de Canvas 2D (sin librerías)
(function () {
  const canvas = document.getElementById("demo-canvas");
  if (!canvas) return;

  // Ajuste para pantallas de alta densidad (Retina)
  const dpr = window.devicePixelRatio || 1;
  const ancho = 400, alto = 260;
  canvas.width = ancho * dpr;
  canvas.height = alto * dpr;
  canvas.style.width = ancho + "px";
  canvas.style.height = alto + "px";

  const ctx = canvas.getContext("2d"); // contexto de renderizado 2D
  ctx.scale(dpr, dpr);

  let angulo = 0;

  function dibujar() {
    // 1. Limpiar el lienzo
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, ancho, alto);

    // 2. Rectángulo con relleno y contorno
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(30, 40, 90, 60);
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 40, 90, 60);

    // 3. Trazado (path) — un triángulo
    ctx.beginPath();
    ctx.moveTo(160, 100);
    ctx.lineTo(210, 30);
    ctx.lineTo(260, 100);
    ctx.closePath();
    ctx.fillStyle = "#f59e0b";
    ctx.fill();

    // 4. Círculo con arc()
    ctx.beginPath();
    ctx.arc(330, 70, 35, 0, Math.PI * 2);
    ctx.fillStyle = "#22c55e";
    ctx.fill();

    // 5. Transformaciones: cuadrado que gira (save/translate/rotate/restore)
    ctx.save();
    ctx.translate(200, 185);
    ctx.rotate(angulo);
    ctx.fillStyle = "#f43f5e";
    ctx.fillRect(-30, -30, 60, 60);
    ctx.restore();

    // 6. Texto
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("fillRect · path · arc · rotate · fillText", 85, 248);

    angulo += 0.02;
    requestAnimationFrame(dibujar); // bucle de animación
  }

  dibujar();
})();
