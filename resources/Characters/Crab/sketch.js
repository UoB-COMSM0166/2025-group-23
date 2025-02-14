let crabZ = 0; 
let moveSpeed = 50;
let angleY = 0;

function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
}

function draw() {
  set2DBackground();

  // 3D part (crab)
  rotateX(PI / 30);
  rotateY(angleY);
  
  jump = sin(frameCount * 0.1) * 5;
  drawCrab(0, crabZ + jump);
}

// Set the 2D background (blue sky + clouds)
function set2DBackground() {
  resetMatrix();
  ortho();
  background(135, 206, 250);

  // Add lighting to give depth to the objects
  ambientLight(150);
  directionalLight(255, 255, 255, 0, -1, -1);
  
  // Draw clouds
  fill(255);
  noStroke();
  ellipse(150, 80, 50, 30);
  ellipse(180, 90, 60, 35);
  ellipse(300, 50, 50, 30);
  ellipse(320, 60, 60, 35);
}

// Draw the crab
function drawCrab(x, y, z) {
  push();
  translate(x, y, z);
  
  // Body (red)
  fill(220, 50, 50);
  box(50, 20, 30);
  
  // Head (smaller cube)
  push();
  translate(0, -15, 0);
  box(30, 10, 20);
  pop();
  
  // Eye pillars
  fill(255, 255, 255);
  push();
  translate(-10, -25, 8);
  box(5, 15, 5);
  pop();
  
  push();
  translate(10, -25, 8);
  box(5, 15, 5);
  pop();
  
  // Eyes (white cubes)
  push();
  translate(-10, -35, 8);
  box(10, 10, 10);
  pop();
  
  push();
  translate(10, -35, 8);
  box(10, 10, 10);
  pop();
  
  // Pupils (black)
  fill(0);
  push();
  translate(-10, -35, 12);
  box(5, 5, 5);
  pop();
  
  push();
  translate(10, -35, 12);
  box(5, 5, 5);
  pop();
  
  // Left and right claws (raised)
  fill(220, 50, 50);
  push();
  translate(-30, -10, 10);
  rotateZ(-PI / 6);
  box(15, 30, 15);
  pop();
  
  push();
  translate(30, -10, 10);
  rotateZ(PI / 6);
  box(15, 30, 15);
  pop();
  
  // Add pincers (on both sides)
  fill(220, 50, 50);
  push();
  translate(-32, -25, 15); // Left pincer
  rotateZ(-PI / 6);
  box(8, 15, 8);
  pop();
  
  fill(220, 50, 50);
  push();
  translate(-42, -20, 15); // Left pincer
  rotateZ(-PI / 6);
  box(8, 15, 8);
  pop();
  
  push();
  translate(32, -25, 15); // Right pincer
  rotateZ(PI / 6);
  box(8, 15, 8);
  pop();
  
  push();
  translate(43, -23, 15); // Right pincer
  rotateZ(PI / 6);
  box(8, 15, 8);
  pop();
  
  // Legs (8 total)
  fill(255, 100, 50);
  for (let i = -3; i <= 3; i += 2) {
    push();
    translate(i * 8, 10, 15);
    box(5, 15, 5);
    pop();
  }
  
  pop();
}

// Keyboard controls for crab movement
function keyPressed() {
  if (keyCode === UP_ARROW) {
    crabZ -= moveSpeed;
  } else if (keyCode === DOWN_ARROW) {
    crabZ += moveSpeed;
  } else if (keyCode === LEFT_ARROW) {
    angleY -= PI / 10;
  } else if (keyCode === RIGHT_ARROW) {
    angleY += PI / 10;
  }
}