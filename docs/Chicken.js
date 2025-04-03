const chickenSketch = (p) => {
  let angleY = 0;
  
  p.setup = function() {
    // Create a fixed-size canvas and attach it to the chicken preview container.
    p.createCanvas(200, 300, p.WEBGL);
    
    p.noStroke();
  };

  p.draw = function() {
    set2DBackground();
    p.push();
      // Rotate the chicken slightly around the X and Y axes.
      p.scale(3.4);
      p.rotateY(angleY);
      drawChicken(0, 0, 0);
    p.pop();
    angleY += 0.03;
  };

  function set2DBackground() {
    p.resetMatrix();
    p.ortho();
    p.background(0, 0, 0, 0);  // You can change this color if desired.
  }

  function drawChicken(x, y, z) {
    p.push();
      p.translate(x, y, z);
      
      // Body
      p.fill(235, 255, 255);
      p.box(30, 30, 30);
      
      // Head
      p.push();
        p.translate(0, -25, 5);
        p.fill(255, 255, 255);
        p.box(20, 20, 20);
      p.pop();
      
      // Beak
      p.push();
        p.translate(0, -25, 20);
        p.fill(255, 150, 0);
        p.box(10, 7, 10);
      p.pop();
      
      // Comb
      p.push();
        p.translate(0, -40, 5);
        p.fill(200, 50, 50);
        p.box(10, 10, 10);
      p.pop();
      
      // Wings
      p.push();
        p.translate(-18, 0, 0);
        p.fill(255, 220, 200);
        p.box(5, 15, 20);
      p.pop();
      
      p.push();
        p.translate(18, 0, 0);
        p.fill(255, 220, 200);
        p.box(5, 15, 20);
      p.pop();
      
      // Eyes
      p.push();
        p.translate(10, -28, 7);
        p.fill(0);
        p.sphere(2);
      p.pop();
      
      p.push();
        p.translate(-10, -28, 7);
        p.fill(0);
        p.sphere(2);
      p.pop();
      
      // Legs
      p.push();
        p.translate(-7, 25, 0);
        p.fill(255, 150, 0);
        p.box(5, 20, 5);
      p.pop();
      
      p.push();
        p.translate(7, 25, 0);
        p.fill(255, 150, 0);
        p.box(5, 20, 5);
      p.pop();
      
      // Chicken feet (toes)
      drawChickenFeet(-7, 32, -5); // Left foot
      drawChickenFeet(7, 32, -5);  // Right foot
      
    p.pop();
  }
  
  function drawChickenFeet(x, y, z) {
    p.push();
      p.translate(x, y, z);
      p.fill(255, 150, 0);
      
      // Middle toe
      p.push();
        p.translate(0, 0, 8);
        p.box(3, 3, 15);
      p.pop();
      
      // Left side toe
      p.push();
        p.translate(-4, 0, 8);
        p.rotateY(p.PI / 6);
        p.box(3, 5, 15);
      p.pop();
      
      // Right side toe
      p.push();
        p.translate(4, 0, 8);
        p.rotateY(-p.PI / 6);
        p.box(3, 3, 15);
      p.pop();
    p.pop();
  }
};