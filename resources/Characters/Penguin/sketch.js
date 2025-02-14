let penguinZ = 0;
let moveSpeed = 50;
let angleY = 0; 
let clouds = [];
let sunX = 500;

function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
  
  // Generate random clouds
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
  drawPenguin(0, penguinZ + jump);
}

// set 2D background
function set2DBackground() {
  resetMatrix(); 
  ortho();
  background(135, 206, 250);
  
  drawSun();
  drawClouds();
  drawMountains();
}

// Draw 2D sun
function drawSun() {
  fill(255, 204, 0);
  noStroke();
  ellipse(sunX, 80, 60, 60);
  
  sunX -= 0.2;
  if (sunX < -50) sunX = 650;
}

// Draw 2D clouds
function drawClouds() {
  fill(255);
  noStroke();
  
  for (let cloud of clouds) {
    ellipse(cloud.x, cloud.y, 50, 30);
    ellipse(cloud.x - 20, cloud.y + 5, 40, 25);
    ellipse(cloud.x + 20, cloud.y + 5, 40, 25);
    
    cloud.x += cloud.speed;
    if (cloud.x > 650) cloud.x = -50;
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

// Draw penguin
function drawPenguin(x, y, z) {
  push();
  translate(x, y, z);
  
  // body
  fill(30, 30, 30);
  box(30, 50, 30);
  
  // tail
  push();
  translate(0, 10, -10);
  fill(30, 30, 30);
  box(30, 30, 30);
  pop();

  // belly
  push();
  translate(0, -5, 5);
  fill(255, 255, 255);
  box(30, 45, 25);
  pop();
  
  // head
  push();
  translate(0, -35, 0);
  fill(30, 30, 30);
  box(30, 30, 30);
  pop();
  
  // mouth
  push();
  translate(0, -40, 15);
  fill(255, 200, 100);
  box(10, 5, 15);
  pop();
  
  // eyes (white)
  push();
  translate(15, -40, 8);
  fill(255);
  box(8, 8, 8);
  pop();
  
  push();
  translate(-15, -40, 8);
  fill(255);
  box(8, 8, 8);
  pop();
  
  // eyes (black)
  push();
  translate(18, -40, 8);
  fill(0);
  sphere(2);
  pop();
  
  push();
  translate(-18, -40, 8);
  fill(0);
  sphere(2);
  pop();
  
  
  // wings
  push();
  translate(-18, -3, 0);
  fill(30, 30, 30);
  box(5, 32, 15);
  pop();
  
  push();
  translate(-22, 8, 0);
  fill(30, 30, 30);
  box(5, 10, 15);
  pop();
  
  push();
  translate(18, -3, 0);
  fill(30, 30, 30);
  box(5, 32, 15);
  pop();
  
  push();
  translate(22, 8, 0);
  fill(30, 30, 30);
  box(5, 10, 15);
  pop();
  
  // feet
  push();
  translate(-7, 30, 0);
  fill(255, 200, 100);
  box(8, 5, 15);
  pop();
  
  push();
  translate(7, 30, 0);
  fill(255, 200, 100);
  box(8, 5, 15);
  pop();
  
  pop();
}

// keyboard control
function keyPressed() {
  if (keyCode === UP_ARROW) {
    penguinZ -= moveSpeed;
  } else if (keyCode === DOWN_ARROW) {
    penguinZ += moveSpeed;
  } else if (keyCode === LEFT_ARROW) {
    angleY -= PI / 10;
  } else if (keyCode === RIGHT_ARROW) {
    angleY += PI / 10;
  }
}
