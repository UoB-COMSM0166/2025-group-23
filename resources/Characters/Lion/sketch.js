let lionZ = 0;
let moveSpeed = 50;
let angleY = 0;

function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
}

function draw() {
  set2DBackground();

  rotateX(PI / 30);
  rotateY(angleY);

  jump = sin(frameCount * 0.1) * 5;
  drawLion(0, lionZ + jump);
}

// Set the 2D background (blue sky + clouds)
function set2DBackground() {
  resetMatrix();
  ortho();
  background(135, 206, 250);

  // Add lighting to give depth to the objects
  ambientLight(150);
  directionalLight(255, 255, 255, 0, -1, -1);

  fill(255);
  noStroke();
  ellipse(150, 80, 50, 30);
  ellipse(180, 90, 60, 35);
  ellipse(300, 50, 50, 30);
  ellipse(320, 60, 60, 35);
}

// Draw lion
function drawLion(x, y, z) {
  push();
  translate(x, y, z);

  // body
  fill(255, 165, 0);
  box(50, 30, 30);

  // head
  push();
  translate(27, -10, 0);
  box(30, 30, 30);
  pop();

  // hair (main)
  fill(180, 30, 30);
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      if (Math.abs(i) === 2 || Math.abs(j) === 2) { // 只放在外圍
        push();
        translate(25 + i * 5, -15, j * 10);
        box(10, 45, 10);
        pop();
      }
    }
  }
  
  // hair (up)
  fill(180, 30, 30);
  push();
  translate(26, -40, -1);
  box(24, 4, 40);
  pop();
  
    // hair (down)
  fill(180, 30, 30);
  push();
  translate(26, 0, -1);
  box(24, 4, 40);
  pop();

  // hair (left)
  fill(180, 30, 30);
  push();
  translate(40, -13, 25);
  box(0, 35, 4);
  pop();
  
  // hair (right)
  fill(180, 30, 30);
  push();
  translate(40, -13, -25);
  box(0, 35, 4);
  pop();
  
  // eye (yellow)
  fill(255, 255, 150);
  push();
  translate(40, -15, 8);
  box(8, 8, 8);
  pop();

  push();
  translate(40, -15, -8);
  box(8, 8, 8);
  pop();

  // eye (black)
  fill(0);
  push();
  translate(43, -15, 8);
  box(4, 4, 4);
  pop();

  push();
  translate(43, -15, -8);
  box(4, 4, 4);
  pop();

  // nose
  fill(255, 100, 100);
  push();
  translate(44, -5, 0);
  box(6, 6, 6);
  pop();

  // mouth
  fill(240, 200, 150);
  push();
  translate(40, 0, 0);
  box(10, 10, 10);
  pop();
  
  // mouth (line)
  fill(0);
  push();
  translate(45, 0, 0);
  box(1, 1, 7);
  pop();

  // ear (brown)
  fill(139, 69, 19);
  push();
  translate(40, -18, 17);
  box(6, 6, 6);
  pop();

  push();
  translate(40, -18, -17);
  box(6, 6, 6);
  pop();
  
  // ear (beige)
  fill(255, 165, 0);
  push();
  translate(38, -18, 17);
  box(9, 9, 9);
  pop();

  push();
  translate(38, -18, -17);
  box(9, 9, 9);
  pop();
  
  // Tail 1
  push();
  translate(-30, 0, 0);
  fill(235, 150, 80);
  box(10, 5, 5);
  pop();
  
  // Tail 2
  push();
  translate(-35, 0, 0);
  fill(180, 30, 30);
  box(5, 5, 5);
  pop();

  // legs *4
  fill(255, 165, 0);
  for (let i = -1; i <= 1; i += 2) {
    for (let j = -1; j <= 1; j += 2) {
      push();
      translate(i * 15, 15, j * 10);
      box(8, 30, 8);
      pop();

      // Paws
      fill(240, 200, 150);
      push();
      translate(i * 15, 30, j * 10);
      box(8, 5, 8);
      pop();

      fill(255, 165, 0);
    }
  }

  pop();
}

// Keyboard control
function keyPressed() {
  if (keyCode === UP_ARROW) {
    lionZ -= moveSpeed;
  } else if (keyCode === DOWN_ARROW) {
    lionZ += moveSpeed;
  } else if (keyCode === LEFT_ARROW) {
    angleY -= PI / 10;
  } else if (keyCode === RIGHT_ARROW) {
    angleY += PI / 10;
  }
}
