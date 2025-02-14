let parrotZ = 0;
let moveSpeed = 50;
let angleY = 0; // Controls rotation angle

function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke(); // Remove black outlines
}

function draw() {
  set2DBackground(); // 2D background (blue sky + clouds)

  // 3D parrot
  rotateX(PI / 30);
  rotateY(angleY);

  jump = sin(frameCount * 0.1) * 5;
  drawParrot(0, parrotZ + jump);
}

// 🌄 Set 2D background (blue sky + clouds)
function set2DBackground() {
  resetMatrix();
  ortho();
  background(135, 206, 250); // Sky blue

  
  // Lighting for depth effect
  ambientLight(150);
  directionalLight(255, 255, 255, 0, -1, -1);

  fill(255);
  noStroke();
  ellipse(150, 80, 50, 30);
  ellipse(180, 90, 60, 35);
  ellipse(300, 50, 50, 30);
  ellipse(320, 60, 60, 35);
}

// Draw the parrot (low-poly style)
function drawParrot(x, y, z) {
  push();
  translate(x, y, z);

  // Body (white)
  fill(200, 215, 0);
  box(50, 30, 30);

  // Head (white)
  push();
  translate(-25, -15, 0);
  box(20, 40, 20);
  pop();

  // Crest (yellow)
  fill(255, 215, 0);
  push();
  translate(-30, -35, 0);
  box(8, 15, 8);
  pop();

  push();
  translate(-30, -40, -5);
  box(8, 15, 8);
  pop();

  push();
  translate(-30, -45, 5);
  box(8, 15, 8);
  pop();

  // Beak (black)
  fill(30, 30, 30);
  push();
  translate(-40, -20, 0);
  box(10, 13, 10);
  pop();

  // Lower beak (black)
  push();
  translate(-42, -15, 0);
  box(6, 10, 10);
  pop();

  // Eyes (black pupils)
  fill(0);
  push();
  translate(-30, -23, 12);
  sphere(2);
  pop();
  
  push();
  translate(-30, -23, -12);
  sphere(2);
  pop();
  
  // Wings (light blue)
  fill(180, 220, 255);
  push();
  translate(10, -5, 15);
  box(30, 15, 7);
  pop();

  push();
  translate(10, -5, -15);
  box(30, 15, 7);
  pop();

  // Tail (white)
  fill(255, 255, 255);
  push();
  translate(25, 0, 0);
  box(20, 10, 30);
  pop();

  // Legs (black)
  fill(30, 30, 30);
  push();
  translate(-10, 15, 6);
  box(6, 20, 5);
  pop();

  fill(30, 30, 30);
  push();
  translate(-10, 15, -6);
  box(6, 20, 5);
  pop();
  
    // Feet (three toes)
    drawParrotFeet(-8, 25, -6);
    drawParrotFeet(-8, 25, 6);

  pop();
}

// Draw feet (three toes)
function drawParrotFeet(x, y, z) {
  push();
  translate(x, y, z);

  fill(30, 30, 30);

  // Center toe
  push();
  translate(-5, 0, 0);
  box(10, 3, 5);
  pop();
  
  // Left toe
  push();
  translate(-5, 0, 5);
  rotateX(PI / 6);
  box(10, 3, 5);
  pop();
  
  // Right toe
  push();
  translate(-5, 0, -5);
  rotateX(-PI / 6);
  box(10, 3, 5);
  pop();

  pop();
}

// 🔄 Keyboard controls for parrot movement
function keyPressed() {
  if (keyCode === UP_ARROW) {
    parrotZ -= moveSpeed;
  } else if (keyCode === DOWN_ARROW) {
    parrotZ += moveSpeed;
  } else if (keyCode === LEFT_ARROW) {
    angleY -= PI / 10;
  } else if (keyCode === RIGHT_ARROW) {
    angleY += PI / 10;
  }
}
