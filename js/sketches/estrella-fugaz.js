// =====================================================
// ESTRELLA FUGAZ — Reto de Khan Academy
// Animación: dos estrellas cruzan el cielo nocturno,
// crecen y cambian de color mientras se desvanecen.
// Interacción: haz clic para lanzar las estrellas otra vez.
// =====================================================

let xPos = 2;
let yPos = 400;
let sizeStar1 = 10;
let xPos2 = 400;
let yPos2 = 400;
let sizeStar2 = 10;
let colorf1 = 255;
let colorS1r = 255;
let colorS2r = 10;
let colorS1g = 255;
let colorS2g = 200;
let colorS1b = 255;
let colorS2b = 255;
let reduc = 3;
let colore = 255;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvas-container");
  noStroke();
}

function draw() {
  xPos *= 1.1;
  yPos -= 7;
  xPos -= 0.02;
  sizeStar1 += 0.5;
  xPos2 /= 1.1;
  yPos2 -= 5;
  sizeStar2 += 0.5;
  colorS1r -= reduc;
  colorS1g -= reduc;
  colorS2g -= reduc;
  colorS2b -= reduc;
  colore -= reduc;

  // cielo nocturno con un rastro que se desvanece
  background(0, 0, 0, 40);

  // estrella 1
  fill(colorS1r, colorS1g, colorS1b, colore);
  ellipse(xPos, yPos, sizeStar1, sizeStar1);

  // estrella 2
  fill(colorS2r, colorS2g, colorS2b, colore);
  ellipse(xPos2, yPos2, sizeStar2, sizeStar2);
}

function mousePressed() {
  xPos = 2;
  yPos = 400;
  sizeStar1 = 10;
  xPos2 = 400;
  yPos2 = 400;
  sizeStar2 = 10;
  colorS1r = 255;
  colorS1g = 255;
  colorS2g = 200;
  colorS2b = 255;
  colore = 255;
}
