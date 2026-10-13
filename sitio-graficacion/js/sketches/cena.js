// =====================================================
// ¿QUÉ HAY DE CENA? — Pizza
// Pizza de pepperoni con champiñones, aceitunas y
// albahaca sobre una tabla de madera.
// Escena estática: se dibuja una sola vez con noLoop().
// =====================================================

function setup() {
  // Lienzo de 400x400 dentro del contenedor main
  let cnv = createCanvas(400, 400);
  cnv.parent("canvas-container");
  noLoop(); // Escena estática: se dibuja una sola vez
}

function draw() {
  // 1. Mesa de madera (tablones)
  background(160, 110, 60);
  stroke(125, 80, 40);
  strokeWeight(3);
  for (let y = 50; y < height; y += 50) {
    line(0, y, width, y);
  }

  // 2. Tabla para pizza (con mango)
  fill(205, 160, 105);
  stroke(150, 105, 60);
  strokeWeight(2);
  rect(180, 0, 40, 30, 6);
  ellipse(200, 205, 380, 380);

  // 3. Orilla de la pizza (masa)
  fill(225, 165, 80);
  stroke(170, 110, 45);
  ellipse(200, 205, 330, 330);

  // Partes tostadas de la orilla
  noStroke();
  fill(195, 125, 55);
  for (let a = 0; a < TWO_PI; a += PI / 9) {
    ellipse(200 + cos(a) * 152, 205 + sin(a) * 152, 14, 8);
  }

  // 4. Salsa de tomate
  fill(195, 50, 35);
  ellipse(200, 205, 285, 285);

  // 5. Queso derretido (forma irregular con varias elipses)
  fill(250, 210, 100);
  ellipse(200, 205, 262, 262);
  ellipse(105, 160, 70, 60);
  ellipse(300, 250, 70, 60);
  ellipse(250, 105, 60, 50);
  ellipse(140, 300, 60, 50);

  // Burbujas de queso más claras
  fill(255, 235, 150);
  ellipse(160, 150, 30, 20);
  ellipse(250, 200, 35, 22);
  ellipse(190, 270, 28, 18);
  ellipse(300, 160, 22, 15);
  ellipse(110, 230, 25, 16);

  // 6. Pepperoni
  let pepperonis = [
    [150, 120], [235, 125], [300, 195], [270, 280],
    [190, 315], [115, 260], [100, 185], [200, 200],
    [160, 220], [245, 245]
  ];
  for (let p of pepperonis) {
    fill(175, 40, 35);
    stroke(130, 25, 20);
    strokeWeight(2);
    ellipse(p[0], p[1], 36, 36);
    // Grasa / puntos oscuros del pepperoni
    noStroke();
    fill(135, 25, 20);
    ellipse(p[0] - 7, p[1] - 5, 5, 5);
    ellipse(p[0] + 6, p[1] + 4, 4, 4);
    ellipse(p[0] + 3, p[1] - 9, 3, 3);
  }

  // 7. Champiñones (sombrero con arc + tallo con rect)
  let champinones = [[195, 150], [320, 235], [135, 310], [90, 220]];
  for (let c of champinones) {
    fill(235, 220, 195);
    stroke(160, 135, 100);
    strokeWeight(1);
    rect(c[0] - 4, c[1], 8, 10, 2);
    arc(c[0], c[1] + 2, 26, 22, PI, TWO_PI, CHORD);
  }

  // 8. Aceitunas negras (anillos)
  let aceitunas = [[180, 95], [275, 160], [230, 300], [125, 145], [325, 270], [210, 245]];
  for (let o of aceitunas) {
    noStroke();
    fill(35, 30, 30);
    ellipse(o[0], o[1], 15, 15);
    fill(250, 210, 100);
    ellipse(o[0], o[1], 6, 6);
  }

  // 9. Hojas de albahaca (elipses rotadas con push/pop)
  let hojas = [[215, 175, 0.6], [130, 200, -0.8], [270, 225, 2.2], [165, 270, 1.2], [260, 90, -0.3]];
  for (let h of hojas) {
    push();
    translate(h[0], h[1]);
    rotate(h[2]);
    fill(55, 140, 55);
    stroke(30, 95, 30);
    strokeWeight(1);
    ellipse(0, 0, 26, 12);
    line(-12, 0, 12, 0); // nervadura
    pop();
  }

  // 10. Cortes de la pizza (8 rebanadas)
  stroke(170, 110, 45, 170);
  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    let a = i * QUARTER_PI + PI / 8;
    line(200, 205, 200 + cos(a) * 163, 205 + sin(a) * 163);
  }
}
