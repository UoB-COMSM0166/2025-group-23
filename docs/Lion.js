const lionSketch = (p) => {
  let angleY = 0;
  
  p.setup = function() {
    // Create a fixed-size canvas and attach it to the lion preview container.
    p.createCanvas(350, 300, p.WEBGL);
    p.noStroke();
  };

  p.draw = function() {
    set2DBackground();
    p.push();
      // Rotate the lion about its Y-axis.
      p.scale(3);
      p.translate(-10, 0, 0);
      p.rotateY(angleY);
      drawLion(0, 0, 0);
    p.pop();
    angleY += 0.03;
  };

  // Clear the canvas and set an orthographic projection.
  function set2DBackground() {
    p.resetMatrix();
    p.ortho();
    p.background(0, 0, 0, 0);
  }

  // Draw the lion using 3D primitives.
  function drawLion(x, y, z) {
    p.push();
      p.translate(x, y, z);
      
      // Body
      p.fill(255, 165, 0);
      p.box(50, 30, 30);
      
      // Head
      p.push();
        p.translate(27, -10, 0);
        p.box(30, 30, 30);
      p.pop();
      
      // Hair (main): place boxes around the head's perimeter
      p.fill(180, 30, 30);
      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          if (Math.abs(i) === 2 || Math.abs(j) === 2) {
            p.push();
              p.translate(25 + i * 5, -15, j * 10);
              p.box(10, 45, 10);
            p.pop();
          }
        }
      }
      
      // Hair (up)
      p.fill(180, 30, 30);
      p.push();
        p.translate(26, -40, -1);
        p.box(24, 4, 40);
      p.pop();
      
      // Hair (down)
      p.fill(180, 30, 30);
      p.push();
        p.translate(26, 0, -1);
        p.box(24, 4, 40);
      p.pop();
      
      // Hair (left)
      p.fill(180, 30, 30);
      p.push();
        p.translate(40, -13, 25);
        p.box(0, 35, 4);
      p.pop();
      
      // Hair (right)
      p.fill(180, 30, 30);
      p.push();
        p.translate(40, -13, -25);
        p.box(0, 35, 4);
      p.pop();
      
      // Eyes (yellow cubes)
      p.fill(255, 255, 150);
      p.push();
        p.translate(40, -15, 8);
        p.box(8, 8, 8);
      p.pop();
      p.push();
        p.translate(40, -15, -8);
        p.box(8, 8, 8);
      p.pop();
      
      // Eyes (black cubes)
      p.fill(0);
      p.push();
        p.translate(43, -15, 8);
        p.box(4, 4, 4);
      p.pop();
      p.push();
        p.translate(43, -15, -8);
        p.box(4, 4, 4);
      p.pop();
      
      // Nose
      p.fill(255, 100, 100);
      p.push();
        p.translate(44, -5, 0);
        p.box(6, 6, 6);
      p.pop();
      
      // Mouth
      p.fill(240, 200, 150);
      p.push();
        p.translate(40, 0, 0);
        p.box(10, 10, 10);
      p.pop();
      
      // Mouth (line)
      p.fill(0);
      p.push();
        p.translate(45, 0, 0);
        p.box(1, 1, 7);
      p.pop();
      
      // Ears (brown)
      p.fill(139, 69, 19);
      p.push();
        p.translate(40, -18, 17);
        p.box(6, 6, 6);
      p.pop();
      p.push();
        p.translate(40, -18, -17);
        p.box(6, 6, 6);
      p.pop();
      
      // Ears (beige)
      p.fill(255, 165, 0);
      p.push();
        p.translate(38, -18, 17);
        p.box(9, 9, 9);
      p.pop();
      p.push();
        p.translate(38, -18, -17);
        p.box(9, 9, 9);
      p.pop();
      
      // Tail 1
      p.push();
        p.translate(-30, 0, 0);
        p.fill(235, 150, 80);
        p.box(10, 5, 4);
      p.pop();
      
      // Tail 2
      p.push();
        p.translate(-35, 0, 0);
        p.fill(180, 30, 30);
        p.box(5, 5, 5);
      p.pop();
      
      // Legs (4 legs with paws)
      p.fill(255, 165, 0);
      for (let i = -1; i <= 1; i += 2) {
        for (let j = -1; j <= 1; j += 2) {
          p.push();
            p.translate(i * 15, 15, j * 10);
            p.box(8, 30, 8);
          p.pop();
          
          // Paws
          p.fill(240, 200, 150);
          p.push();
            p.translate(i * 15, 30, j * 10);
            p.box(8, 5, 8);
          p.pop();
          
          p.fill(255, 165, 0);
        }
      }
      
    p.pop();
  }
};