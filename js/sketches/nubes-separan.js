// =====================================================
// NUBES QUE SE SEPARAN — Reto de Khan Academy
// Animación: las nubes se alejan hacia los lados
// mientras el sol crece en el centro.
// Interacción: haz clic para reiniciar la animación.
// =====================================================

let leftX = 140;
let rightX = 280;
let sunRadius = 100;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvas-container");
  noStroke();
}

function draw() {
  leftX -= 1;
  rightX += 1;
  sunRadius += 2;
  background(184, 236, 255);

  fill(255, 170, 0);
  ellipse(200, 100, sunRadius, sunRadius);

  // nubes
  fill(255, 255, 255);
  // nube izquierda
  ellipse(leftX, 150, 126, 97);
  ellipse(leftX + 62, 150, 70, 60);
  ellipse(leftX - 62, 150, 70, 60);

  // nube derecha
  ellipse(rightX, 100, 126, 97);
  ellipse(rightX + 62, 100, 70, 60);
  ellipse(rightX - 62, 100, 70, 60);
}

function mousePressed() {
  leftX = 140;
  rightX = 280;
  sunRadius = 100;
}
