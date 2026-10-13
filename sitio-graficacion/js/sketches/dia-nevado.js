// =====================================================
// DÍA NEVADO SOLEADO — Paisaje invernal con sol
// Animación: el sol gira, las nubes avanzan y la nieve
// cae continuamente (uso de arreglos y objetos).
// =====================================================

let copos = [];     // arreglo de copos de nieve
let nubeX = 0;      // desplazamiento de las nubes

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvas-container");

  // Creamos 120 copos con posición, tamaño y velocidad aleatorios
  for (let i = 0; i < 120; i++) {
    copos.push({
      x: random(width),
      y: random(height),
      tam: random(2, 6),
      vel: random(0.6, 2),
      fase: random(TWO_PI)
    });
  }
}

function draw() {
  // 1. Cielo
  background(150, 205, 245);

  // 2. Sol con rayos que giran
  push();
  translate(320, 80);
  rotate(frameCount * 0.01);
  stroke(255, 200, 40);
  strokeWeight(4);
  for (let i = 0; i < 12; i++) {
    rotate(TWO_PI / 12);
    line(45, 0, 62, 0);
  }
  pop();
  noStroke();
  fill(255, 225, 60);
  ellipse(320, 80, 75, 75);

  // 3. Nubes en movimiento
  nubeX = (nubeX + 0.4) % (width + 200);
  dibujarNube(nubeX - 100, 70);
  dibujarNube(nubeX - 350, 120);
  dibujarNube(nubeX + 120 - (width + 200), 50);

  // 4. Montañas nevadas al fondo
  fill(140, 160, 190);
  triangle(-40, 300, 90, 150, 220, 300);
  triangle(150, 300, 280, 170, 430, 300);
  fill(250);
  triangle(68, 175, 90, 150, 112, 175);
  triangle(256, 195, 280, 170, 304, 195);

  // 5. Suelo nevado
  fill(250);
  rect(0, 290, 400, 110);
  ellipse(100, 295, 320, 60);
  ellipse(320, 300, 300, 50);

  // 6. Casa con techo nevado
  fill(190, 90, 70);
  rect(220, 250, 110, 80);
  fill(120, 70, 50);
  triangle(205, 252, 275, 195, 345, 252);
  fill(255);
  triangle(225, 236, 275, 195, 325, 236);
  rect(205, 247, 140, 7, 4);
  fill(255, 230, 120);
  rect(240, 270, 28, 25);
  fill(90, 50, 35);
  rect(290, 285, 25, 45);

  // Humo de la chimenea
  fill(120, 70, 50);
  rect(300, 205, 16, 30);
  fill(230, 230, 235, 180);
  let humo = sin(frameCount * 0.04) * 5;
  ellipse(310 + humo, 192, 20, 16);
  ellipse(318 - humo, 175, 26, 20);
  ellipse(326 + humo, 155, 32, 24);

  // 7. Pino nevado
  fill(110, 70, 40);
  rect(85, 300, 18, 35);
  fill(40, 120, 70);
  triangle(45, 310, 94, 230, 143, 310);
  triangle(55, 270, 94, 200, 133, 270);
  triangle(65, 235, 94, 170, 123, 235);
  fill(255);
  triangle(80, 192, 94, 170, 108, 192);
  ellipse(80, 268, 30, 7);
  ellipse(110, 306, 36, 8);

  // 8. Nieve que cae
  fill(255);
  noStroke();
  for (let c of copos) {
    ellipse(c.x + sin(frameCount * 0.03 + c.fase) * 10, c.y, c.tam, c.tam);
    c.y += c.vel;
    if (c.y > height) {
      c.y = -10;
      c.x = random(width);
    }
  }
}

function dibujarNube(x, y) {
  fill(255, 255, 255, 230);
  ellipse(x, y, 70, 40);
  ellipse(x + 35, y - 12, 60, 45);
  ellipse(x + 65, y, 70, 38);
}
