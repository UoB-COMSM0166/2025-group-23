let dogZ = 0;
let moveSpeed = 50;
let angleY = 0;
let clouds = [];
let sunX = 500;

function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();

  // Draw clouds
  for (let i = 0; i < 5; i++) {
    clouds.push({
      x: random(-300, 300),
      y: random(-100, -30),
      speed: random(0.2, 0.5)
    });
  }
}

function draw() {
  set2DBackground();

  rotateX(PI / 30);
  rotateY(angleY);
  
  jump = sin(frameCount * 0.1) * 5;
  drawDog(0, dogZ + jump);
  
}

// Set the 2D background (blue sky + clouds)
function set2DBackground() {
  resetMatrix();
  ortho();
  background(135, 206, 250);

  // Add lighting to give depth to the objects
  ambientLight(150);
  directionalLight(255, 255, 255, 0, -1, -1);
  
  drawSun();
  drawClouds();
  drawMountains();
}

// Draw 2D sun
function drawSun() {
  fill(255, 204, 0);
  noStroke();
  ellipse(sunX, 80, 60, 60);
  
  // Sun movement from right to left
  sunX -= 0.2;
  if (sunX < -50) sunX = 650; // consistantly moving
}

// Draw 2D clouds
function drawClouds() {
  fill(255);
  noStroke();
  
  for (let cloud of clouds) {
    ellipse(cloud.x, cloud.y, 50, 30);
    ellipse(cloud.x - 20, cloud.y + 5, 40, 25);
    ellipse(cloud.x + 20, cloud.y + 5, 40, 25);
    
    // Moving cloud
    cloud.x += cloud.speed;
    if (cloud.x > 650) cloud.x = -50; // consistantly moving
  }
}

// Draw 2D mountains
function drawMountains() {
  fill(100, 180, 100);
  noStroke();
  
  // 3 mountains
  triangle(100, 250, 300, 50, 500, 250);
  triangle(-100, 300, 150, 120, 400, 300);
  triangle(300, 300, 500, 120, 700, 300);
}

// Draw Dog
function drawDog(x, y, z) {
  push();
  translate(x, y, z);
  
  // Body
  fill(235, 150, 80);
  box(30, 50, 30);
  
  // Tail
  push();
  translate(0, 10, -20);
  fill(235, 150, 80);
  box(10, 5, 20);
  pop();

  // Head
  push();
  translate(0, -35, 0);
  fill(235, 150, 80);
  box(30, 30, 30);
  pop();
  
  // nose
  push();
  translate(0, -30, 15);
  fill(255, 220, 200);
  box(20, 15, 15);
  pop();
  
  push();
  translate(0, -30, 15);
  fill(40, 40, 40);
  box(10, 5, 20);
  pop();
  
  // ear
  push();
  translate(-8, -50, 0);
  fill(235, 150, 80);
  box(10, 15, 8);
  pop();
  
  push();
  translate(8, -50, 0);
  fill(235, 150, 80);
  box(10, 15, 8);
  pop();
  
  // eye
  push();
  translate(15, -40, 8);
  fill(0);
  sphere(2);
  pop();
  
  push();
  translate(-15, -40, 8);
  fill(0);
  sphere(2);
  pop();
  
  
  // hands
  push();
  translate(-10, -3, 10);
  fill(235, 180, 80);
  box(5, 20, 15);
  pop();
  
  
  push();
  translate(10, -3, 10);
  fill(235, 180, 80);
  box(5, 20, 15);
  pop();
  
  
  // legs
  push();
  translate(-10, 30, 0);
  fill(235, 180, 80);
  box(8, 20, 15);
  pop()
  
  push();
  translate(10, 30, 0);
  fill(235, 180, 80);
  box(8, 20, 15);
  pop();
  
  pop();
}

// Keyboard control
function keyPressed() {
  if (keyCode === UP_ARROW) {
    dogZ -= moveSpeed;
  } else if (keyCode === DOWN_ARROW) {
    dogZ += moveSpeed;
  } else if (keyCode === LEFT_ARROW) {
    angleY -= PI / 10;
  } else if (keyCode === RIGHT_ARROW) {
    angleY += PI / 10;
  }
}
