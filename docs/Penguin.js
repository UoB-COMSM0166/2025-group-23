const penguinSketch = (p) => {
  let angleY = 0;
  
  p.setup = function() {
    // Create a fixed-size canvas and attach it to the penguin preview container
    p.createCanvas(200, 300, p.WEBGL);
    p.noStroke();
  };

  p.draw = function() {
    set2DBackground();
    p.push();
      p.scale(3);            // Scale up the penguin drawing
      p.rotateY(angleY);
      drawPenguin(0, 0, 0);
    p.pop();
    angleY += 0.03;
  };

  function set2DBackground() {
    p.resetMatrix();
    p.ortho();
    p.background(0, 0, 0, 0);
  }

  function drawPenguin(x, y, z) {
    p.push();
      p.translate(x, y, z);
      // Body
      p.fill(30, 30, 30);
      p.box(40, 50, 30);
      
      // Tail
      p.push();
        p.translate(0, 10, -10);
        p.fill(30, 30, 30);
        p.box(30, 30, 30);
      p.pop();
      
      // Belly
      p.push();
        p.translate(0, -5, 5);
        p.fill(255, 255, 255);
        p.box(20, 45, 25);
      p.pop();
      
      // Head
      p.push();
        p.translate(0, -35, 0);
        p.fill(30, 30, 30);
        p.box(30, 30, 30);
      p.pop();
      
      // Mouth
      p.push();
        p.translate(0, -40, 15);
        p.fill(255, 200, 100);
        p.box(10, 5, 15);
      p.pop();
      
      // Eyes (white)
      p.push();
        p.translate(15, -40, 8);
        p.fill(255);
        p.box(8, 8, 8);
      p.pop();
      
      p.push();
        p.translate(-15, -40, 8);
        p.fill(255);
        p.box(8, 8, 8);
      p.pop();
      
      // Eyes (black)
      p.push();
        p.translate(18, -40, 8);
        p.fill(0);
        p.sphere(2);
      p.pop();
      
      p.push();
        p.translate(-18, -40, 8);
        p.fill(0);
        p.sphere(2);
      p.pop();
      
      // Wings
      p.push();
        p.translate(-18, -3, 0);
        p.fill(30, 30, 30);
        p.box(5, 32, 15);
      p.pop();
      
      p.push();
        p.translate(-22, 8, 0);
        p.fill(30, 30, 30);
        p.box(5, 10, 15);
      p.pop();
      
      p.push();
        p.translate(18, -3, 0);
        p.fill(30, 30, 30);
        p.box(5, 32, 15);
      p.pop();
      
      p.push();
        p.translate(22, 8, 0);
        p.fill(30, 30, 30);
        p.box(5, 10, 15);
      p.pop();
      
      // Feet
      p.push();
        p.translate(-7, 30, 0);
        p.fill(255, 200, 100);
        p.box(8, 10, 15);
      p.pop();
      
      p.push();
        p.translate(7, 30, 0);
        p.fill(255, 200, 100);
        p.box(8, 10, 15);
      p.pop();
      
    p.pop();
  }
};