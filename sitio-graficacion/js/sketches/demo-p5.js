// Demostración de p5.js: setup(), draw(), variables del sistema
// e interacción con el ratón.
let particulas = [];

function setup() {
  let cnv = createCanvas(400, 260);
  cnv.parent("canvas-container");
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(222, 45, 18, 25); // fondo semitransparente = estela

  // Cada fotograma se agrega una partícula en la posición del ratón
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    particulas.push({ x: mouseX, y: mouseY, r: mouseIsPressed ? 40 : 18, h: frameCount % 360 });
  }

  noStroke();
  for (let i = particulas.length - 1; i >= 0; i--) {
    let p = particulas[i];
    fill(p.h, 70, 100, 70);
    circle(p.x, p.y, p.r);
    p.r *= 0.95;          // se encogen
    if (p.r < 1) particulas.splice(i, 1);
  }

  // Texto informativo
  fill(0, 0, 100);
  textSize(13);
  text("mouseX: " + round(mouseX) + "   mouseY: " + round(mouseY) + "   frameCount: " + frameCount, 12, 22);
}
