let chickenZ = 0; 
let moveSpeed = 50;
let angleY = 0;

function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
}

function draw() {
  background(135, 206, 250);
  
  // Add lighting to give depth to the objects
  ambientLight(150);
  directionalLight(255, 255, 255, 0, -1, -1);
  
  rotateX(PI / 30);
  rotateY(angleY);
  
  jump = sin(frameCount * 0.1) * 5;
  drawChicken(0, chickenZ + jump);
}

function drawChicken(x, y, z) {
  push();
  translate(x, y, z);
  
  // Body
  fill(255, 255, 255);
  box(30, 30, 30);
  
  // Head
  push();
  translate(0, -25, 5);
  fill(255, 255, 255);
  box(20, 20, 20);
  pop();
  
  // Beak
  push();
  translate(0, -25, 20);
  fill(255, 150, 0);
  box(10, 7, 10);
  pop();
  
  // Comb
  push();
  translate(0, -40, 5);
  fill(200, 50, 50);
  box(10, 10, 10);
  pop();
  
  // Wings
  push();
  translate(-18, 0, 0);
  fill(255, 220, 200);
  box(5, 15, 20);
  pop();
  
  push();
  translate(18, 0, 0);
  fill(255, 220, 200);
  box(5, 15, 20);
  pop();
  
  // Eyes
  push();
  translate(10, -28, 7);
  fill(0);
  sphere(2);
  pop();
  
  push();
  translate(-10, -28, 7);
  fill(0);
  sphere(2);
  pop();
  
  // Legs
  push();
  translate(-7, 25, 0);
  fill(255, 150, 0);
  box(5, 15, 5);
  pop();
  
  push();
  translate(7, 25, 0);
  fill(255, 150, 0);
  box(5, 15, 5);
  pop();
  
  // Chicken feet (toes)
  drawChickenFeet(-7, 32, -5); // Left foot claw
  drawChickenFeet(7, 32, -5);  // Right foot claw
  
  pop();
}

// Draw chicken feet
function drawChickenFeet(x, y, z) {
  push();
  translate(x, y, z);

  fill(255, 150, 0);
  
  // Three toes
  push();
  translate(0, 0, 8);
  box(3, 3, 15); // Middle toe
  pop();
  
  push();
  translate(-4, 0, 8);
  rotateY(PI / 6);
  box(3, 5, 15); // Left side toe
  pop();
  
  push();
  translate(4, 0, 8);
  rotateY(-PI / 6);
  box(3, 3, 15); // Right side toe
  pop();
  
  pop();
}

// Keyboard control
function keyPressed() {
  if (keyCode === UP_ARROW) {
    chickenZ -= moveSpeed;
  } else if (keyCode === DOWN_ARROW) {
    chickenZ += moveSpeed;
  } else if (keyCode === LEFT_ARROW) {
    angleY -= PI / 10;
  } else if (keyCode === RIGHT_ARROW) {
    angleY += PI / 10;
  }
}
