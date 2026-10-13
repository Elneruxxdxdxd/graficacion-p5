// =====================================================
// DIENTES DE CONEJO — Cara de conejo
// Interacción: el tamaño de los dientes depende de la
// posición vertical del ratón (uso de variables, map()
// y constrain()). La nariz se mueve y el conejo parpadea.
// =====================================================

let largoDientes = 30; // variable que controla los dientes

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvas-container");
}

function draw() {
  // Los dientes crecen al bajar el ratón
  largoDientes = constrain(map(mouseY, 0, height, 12, 70), 12, 70);

  // 1. Fondo: cielo y pasto
  background(255, 225, 235);
  noStroke();
  fill(130, 200, 110);
  rect(0, 330, 400, 70);
  fill(110, 180, 95);
  ellipse(80, 340, 220, 50);
  ellipse(320, 345, 240, 50);

  // 2. Orejas (exterior blanco, interior rosa)
  stroke(200);
  strokeWeight(2);
  fill(245);
  ellipse(145, 95, 62, 175);
  ellipse(255, 95, 62, 175);
  noStroke();
  fill(250, 175, 195);
  ellipse(145, 100, 30, 125);
  ellipse(255, 100, 30, 125);

  // 3. Cabeza
  stroke(200);
  strokeWeight(2);
  fill(245);
  ellipse(200, 220, 235, 210);

  // 4. Ojos (con parpadeo cada 3 segundos aprox.)
  let parpadea = frameCount % 180 < 8;
  if (parpadea) {
    stroke(40);
    strokeWeight(4);
    line(138, 190, 162, 190);
    line(238, 190, 262, 190);
  } else {
    noStroke();
    fill(40);
    ellipse(150, 190, 26, 32);
    ellipse(250, 190, 26, 32);
    fill(255);
    ellipse(145, 183, 8, 9);
    ellipse(245, 183, 8, 9);
  }

  // 5. Mejillas
  noStroke();
  fill(255, 170, 190, 170);
  ellipse(125, 240, 40, 24);
  ellipse(275, 240, 40, 24);

  // 6. Nariz que se mueve (oscilación con sin)
  let movNariz = sin(frameCount * 0.3) * 2;
  fill(240, 120, 150);
  stroke(200, 90, 120);
  strokeWeight(1);
  triangle(188, 225 + movNariz, 212, 225 + movNariz, 200, 240 + movNariz);

  // 7. Boca
  noFill();
  stroke(90);
  strokeWeight(3);
  line(200, 240, 200, 255);
  arc(185, 255, 30, 20, 0, PI);
  arc(215, 255, 30, 20, 0, PI);

  // 8. Dientes (dependen de la variable largoDientes)
  fill(255);
  stroke(170);
  strokeWeight(2);
  rect(185, 262, 15, largoDientes, 0, 0, 4, 4);
  rect(200, 262, 15, largoDientes, 0, 0, 4, 4);

  // 9. Bigotes
  stroke(120);
  strokeWeight(2);
  line(165, 240, 100, 228);
  line(165, 248, 98, 252);
  line(165, 256, 105, 275);
  line(235, 240, 300, 228);
  line(235, 248, 302, 252);
  line(235, 256, 295, 275);
}
