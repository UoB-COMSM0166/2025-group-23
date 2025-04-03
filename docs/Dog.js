const dogSketch = (p) => {
  let angleY = 0;
  
  p.setup = function() {
    // Create a fixed-size canvas and attach it to the dog preview container.
    p.createCanvas(200, 310, p.WEBGL);
    p.noStroke();
  };

  p.draw = function() {
    set2DBackground();
    p.push();
      p.scale(2.8);
      p.rotateY(angleY);
      drawDog(0, 0, 0);
    p.pop();
    angleY += 0.03;
  };

  // A simplified background for preview.
  function set2DBackground() {
    p.resetMatrix();
    p.ortho();
    p.background(0, 0, 0, 0);
  }

  function drawDog(x, y, z) {
    p.push();
      p.translate(x, y, z);
      
      // Body
      p.fill(235, 150, 80);
      p.box(30, 50, 30);
      
      // Tail
      p.push();
        p.translate(0, 10, -20);
        p.fill(235, 150, 80);
        p.box(10, 5, 20);
      p.pop();
      
      // Head
      p.push();
        p.translate(0, -35, 0);
        p.fill(235, 150, 80);
        p.box(30, 30, 30);
      p.pop();
      
      // Nose (two layers for effect)
      p.push();
        p.translate(0, -30, 15);
        p.fill(255, 220, 200);
        p.box(20, 15, 15);
      p.pop();
      
      p.push();
        p.translate(0, -30, 15);
        p.fill(40, 40, 40);
        p.box(10, 5, 20);
      p.pop();
      
      // Ears
      p.push();
        p.translate(-8, -50, 0);
        p.fill(235, 150, 80);
        p.box(10, 15, 8);
      p.pop();
      
      p.push();
        p.translate(8, -50, 0);
        p.fill(235, 150, 80);
        p.box(10, 15, 8);
      p.pop();
      
      // Eyes
      p.push();
        p.translate(15, -40, 8);
        p.fill(0);
        p.sphere(2);
      p.pop();
      
      p.push();
        p.translate(-15, -40, 8);
        p.fill(0);
        p.sphere(2);
      p.pop();
      
      // Hands
      p.push();
        p.translate(-10, -3, 10);
        p.fill(235, 180, 80);
        p.box(5, 20, 15);
      p.pop();
      
      p.push();
        p.translate(10, -3, 10);
        p.fill(235, 180, 80);
        p.box(5, 20, 15);
      p.pop();
      
      // Legs
      p.push();
        p.translate(-10, 30, 0);
        p.fill(235, 180, 80);
        p.box(8, 20, 15);
      p.pop();
      
      p.push();
        p.translate(10, 30, 0);
        p.fill(235, 180, 80);
        p.box(8, 20, 15);
      p.pop();
    p.pop();
  }
};