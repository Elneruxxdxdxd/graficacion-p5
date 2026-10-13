// =====================================================
// RANA — Rana sobre un nenúfar en un estanque
// Interacción: los ojos siguen al ratón; al hacer clic
// la rana saca la lengua hacia la mosca (el cursor).
// =====================================================

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvas-container");
}

function draw() {
  // 1. Agua del estanque
  background(70, 140, 190);

  // Ondas en el agua (se mueven lentamente)
  noFill();
  stroke(120, 180, 220);
  strokeWeight(2);
  let onda = sin(frameCount * 0.05) * 4;
  ellipse(70, 70, 90 + onda, 22 + onda / 2);
  ellipse(330, 110, 70 - onda, 18);
  ellipse(60, 350, 80 + onda, 20);
  ellipse(340, 370, 60, 15 + onda / 2);

  // 2. Nenúfar (hoja con un corte en forma de cuña)
  fill(60, 150, 60);
  stroke(30, 100, 30);
  strokeWeight(2);
  arc(200, 305, 330, 130, -HALF_PI + 0.25, TWO_PI - HALF_PI - 0.25, PIE);

  // Flor rosa sobre el agua
  noStroke();
  fill(240, 140, 180);
  ellipse(330, 300, 30, 18);
  ellipse(345, 290, 18, 30);
  ellipse(315, 290, 18, 30);
  fill(255, 220, 90);
  ellipse(330, 292, 10, 10);

  // 3. Patas traseras
  fill(70, 165, 60);
  stroke(35, 100, 30);
  strokeWeight(2);
  ellipse(110, 280, 70, 110);
  ellipse(290, 280, 70, 110);
  // Dedos traseros
  ellipse(85, 330, 30, 14);
  ellipse(315, 330, 30, 14);

  // 4. Cuerpo y panza
  fill(85, 185, 70);
  ellipse(200, 255, 200, 150);
  noStroke();
  fill(195, 230, 145);
  ellipse(200, 275, 130, 90);

  // 5. Patas delanteras
  fill(85, 185, 70);
  stroke(35, 100, 30);
  strokeWeight(2);
  ellipse(150, 318, 36, 22);
  ellipse(250, 318, 36, 22);

  // 6. Cabeza
  ellipse(200, 180, 190, 115);

  // Ojos saltones (bases verdes)
  ellipse(150, 130, 62, 62);
  ellipse(250, 130, 62, 62);

  // Blancos de los ojos
  fill(255);
  ellipse(150, 130, 44, 44);
  ellipse(250, 130, 44, 44);

  // Pupilas que siguen al ratón
  dibujarPupila(150, 130);
  dibujarPupila(250, 130);

  // Mejillas
  noStroke();
  fill(240, 130, 140, 160);
  ellipse(130, 195, 30, 16);
  ellipse(270, 195, 30, 16);

  // Fosas nasales
  fill(35, 100, 30);
  ellipse(190, 168, 5, 4);
  ellipse(210, 168, 5, 4);

  // 7. Boca / lengua
  if (mouseIsPressed) {
    // Lengua estirada hacia el ratón
    stroke(220, 70, 90);
    strokeWeight(9);
    line(200, 205, mouseX, mouseY);
    noStroke();
    fill(220, 70, 90);
    ellipse(mouseX, mouseY, 18, 18);
    // Boca abierta
    fill(120, 30, 40);
    ellipse(200, 205, 40, 18);
  } else {
    // Sonrisa
    noFill();
    stroke(35, 100, 30);
    strokeWeight(3);
    arc(200, 192, 110, 40, 0.15, PI - 0.15);
  }

  // 8. Mosca en la posición del ratón (si no la está atrapando)
  if (!mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    dibujarMosca(mouseX, mouseY);
  }
}

// Pupila que se desplaza en dirección al ratón sin salirse del ojo
function dibujarPupila(x, y) {
  let angulo = atan2(mouseY - y, mouseX - x);
  let distancia = min(9, dist(x, y, mouseX, mouseY) / 15);
  let px = x + cos(angulo) * distancia;
  let py = y + sin(angulo) * distancia;
  noStroke();
  fill(20);
  ellipse(px, py, 20, 20);
  fill(255);
  ellipse(px - 4, py - 4, 6, 6);
}

// Mosca: cuerpo negro con alas que aletean
function dibujarMosca(x, y) {
  let aleteo = sin(frameCount * 0.8) * 4;
  noStroke();
  fill(220, 235, 255, 200);
  ellipse(x - 6, y - 6 - aleteo, 12, 8);
  ellipse(x + 6, y - 6 - aleteo, 12, 8);
  fill(30);
  ellipse(x, y, 12, 9);
  fill(200, 30, 30);
  ellipse(x + 5, y - 1, 4, 4);
}
