const crabSketch = (p) => {
  let angleY = 0;
  
  p.setup = function() {
    // Create a fixed-size canvas and attach it to the crab preview container.
    p.createCanvas(300, 270, p.WEBGL);
    p.noStroke();
  };

  p.draw = function() {
    set2DBackground();
    translate(-20, 0 ,0);
    p.push();
      // Scale up the crab drawing so it appears large in the fixed canvas.
      p.scale(3.2);
      p.translate(-10, 10, 0);
      p.rotateY(angleY);
      drawCrab(0, 0, 0);
    p.pop();
    angleY += 0.03;
  };

  // Use a white background (or change as desired)
  function set2DBackground() {
    p.resetMatrix();
    p.ortho();
    p.background(0, 0, 0, 0);
  }

  // Draw the crab using the original shapes and translations.
  function drawCrab(x, y, z) {
    p.push();
      p.translate(x, y, z);
      
      // Body (red)
      p.fill(220, 50, 50);
      p.box(70, 20, 30);
      
      // Head (smaller cube)
      p.push();
        p.translate(0, -15, 0);
        p.box(30, 10, 20);
      p.pop();
      
      // Eye pillars
      p.fill(225, 255, 205);
      p.push();
        p.translate(-10, -25, 8);
        p.box(5, 15, 5);
      p.pop();
      
      p.push();
        p.translate(10, -25, 8);
        p.box(5, 15, 5);
      p.pop();
      
      // Eyes (white cubes)
      p.push();
        p.translate(-10, -35, 8);
        p.box(10, 10, 10);
      p.pop();
      
      p.push();
        p.translate(10, -35, 8);
        p.box(10, 10, 10);
      p.pop();
      
      // Pupils (black)
      p.fill(0);
      p.push();
        p.translate(-10, -35, 12);
        p.box(5, 5, 5);
      p.pop();
      
      p.push();
        p.translate(10, -35, 12);
        p.box(5, 5, 5);
      p.pop();
      
      // Left and right claws (raised)
      p.fill(220, 50, 50);
      p.push();
        p.translate(-30, -15, 10);
        p.rotateZ(0);
        p.box(15, 30, 15);
      p.pop();
      
      p.push();
        p.translate(30, -15, 10);
        p.rotateZ(0);
        p.box(15, 30, 15);
      p.pop();
      
      // Legs (8 total)
      p.fill(255, 100, 50);
      for (let i = -4; i <= 4; i += 2) {
        p.push();
          p.translate(i * 8, 10, 15);
          p.box(5, 15, 5);
        p.pop();
      }
      
    p.pop();
  }
};