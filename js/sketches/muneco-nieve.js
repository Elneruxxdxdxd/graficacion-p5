// =====================================================
// MUÑECO DE NIEVE — Noche invernal
// Animación: el muñeco agita los brazos y nieva.
// Interacción: mantén presionado el ratón para que salude
// más rápido y se le levante el sombrero.
// =====================================================

let nieve = [];
let estrellas = [];

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvas-container");

  for (let i = 0; i < 80; i++) {
    nieve.push({ x: random(width), y: random(height), tam: random(2, 5), vel: random(0.5, 1.5) });
  }
  for (let i = 0; i < 40; i++) {
    estrellas.push({ x: random(width), y: random(220), tam: random(1, 3) });
  }
}

function draw() {
  // 1. Cielo nocturno
  background(30, 45, 90);

  // Estrellas que titilan
  noStroke();
  for (let e of estrellas) {
    fill(255, 255, 220, 150 + sin(frameCount * 0.05 + e.x) * 100);
    ellipse(e.x, e.y, e.tam, e.tam);
  }

  // 2. Luna
  fill(250, 245, 210);
  ellipse(70, 70, 60, 60);
  fill(30, 45, 90);
  ellipse(85, 62, 50, 50);

  // 3. Suelo nevado
  fill(235, 240, 250);
  rect(0, 320, 400, 80);
  ellipse(200, 325, 500, 60);

  // 4. Brazos (ramas) que se mueven
  let velocidad = mouseIsPressed ? 0.25 : 0.05;
  let angulo = sin(frameCount * velocidad) * 0.35;
  stroke(110, 70, 35);
  strokeWeight(5);
  // Brazo izquierdo
  push();
  translate(150, 210);
  rotate(-angulo);
  line(0, 0, -70, -35);
  line(-50, -25, -60, -50);
  pop();
  // Brazo derecho
  push();
  translate(250, 210);
  rotate(angulo);
  line(0, 0, 70, -35);
  line(50, -25, 62, -48);
  pop();

  // 5. Cuerpo (tres círculos)
  stroke(200, 210, 230);
  strokeWeight(2);
  fill(255);
  ellipse(200, 300, 160, 150); // base
  ellipse(200, 210, 115, 105); // torso
  ellipse(200, 135, 85, 80);   // cabeza

  // 6. Bufanda
  noStroke();
  fill(210, 40, 50);
  rect(160, 162, 80, 16, 8);
  rect(215, 168, 18, 45, 6);
  fill(240, 220, 60);
  rect(215, 195, 18, 5);

  // 7. Botones
  fill(40);
  ellipse(200, 195, 10, 10);
  ellipse(200, 220, 10, 10);
  ellipse(200, 245, 10, 10);
  ellipse(200, 285, 12, 12);

  // 8. Cara: ojos, nariz de zanahoria y sonrisa de carbón
  ellipse(185, 125, 9, 10);
  ellipse(215, 125, 9, 10);
  fill(245, 130, 30);
  triangle(198, 135, 198, 145, 235, 142);
  fill(40);
  ellipse(182, 150, 5, 5);
  ellipse(191, 155, 5, 5);
  ellipse(200, 157, 5, 5);
  ellipse(209, 155, 5, 5);
  ellipse(218, 150, 5, 5);

  // 9. Sombrero (se levanta si se presiona el ratón)
  let alzar = mouseIsPressed ? -15 : 0;
  fill(25);
  rect(160, 95 + alzar, 80, 10, 3);
  rect(173, 50 + alzar, 54, 48, 3);
  fill(210, 40, 50);
  rect(173, 85 + alzar, 54, 8);

  // 10. Nieve que cae
  fill(255);
  for (let c of nieve) {
    ellipse(c.x, c.y, c.tam, c.tam);
    c.y += c.vel;
    c.x += sin(frameCount * 0.02 + c.y * 0.05) * 0.5;
    if (c.y > height) {
      c.y = -5;
      c.x = random(width);
    }
  }
}
