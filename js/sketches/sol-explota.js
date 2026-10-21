// =====================================================
// EL SOL QUE EXPLOTA — Reto de Khan Academy
// Animación: el sol crece cada fotograma hasta cubrir el cielo.
// Interacción: haz clic para reiniciar la animación.
// =====================================================

// el tamaño inicial del sol
let sunSize = 30;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvas-container");
  noStroke();
}

function draw() {
  sunSize = sunSize + 1;
  // el hermoso cielo azul
  background(82, 222, 240);

  // El sol, un pequeño círculo en el horizonte
  fill(255, 204, 0);
  ellipse(200, 298, sunSize, sunSize);

  // La tierra, tapando la mitad del sol
  fill(76, 168, 67);
  rect(0, 300, 400, 100);
}

function mousePressed() {
  sunSize = 30;
}
