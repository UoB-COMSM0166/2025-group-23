const parrotSketch = (p) => {
  let angleY = 0;
  
  p.setup = function() {
    // Create the canvas and attach it to the preview container
    p.createCanvas(200, 300, p.WEBGL);
    p.noStroke();
  };

  p.draw = function() {
    set2DBackground();
    p.push();
    p.scale(3.5);
    p.rotateY(angleY);
    drawParrot(0, 0, 0);
    p.pop();
    angleY += 0.03;
  };

  function set2DBackground() {
    p.resetMatrix();
    p.ortho();
    p.background(0, 0, 0, 0);
  }

  function drawParrot(x, y, z) {
    p.push();
    p.translate(x, y, z);
    // Body (green box)
    p.fill(144, 238, 144);
    p.box(30, 30, 20);
    
    // Head (white)
    p.push();
    p.translate(-10, -15, 0);
    p.box(20, 40, 20);
    p.pop();

    // Crest (yellow)
    p.fill(255, 215, 0);
    p.push();
    p.translate(-15, -35, 0);
    p.box(8, 15, 8);
    p.pop();
    p.push();
    p.translate(-15, -40, -5);
    p.box(8, 15, 8);
    p.pop();
    p.push();
    p.translate(-15, -45, 5);
    p.box(8, 15, 8);
    p.pop();

    // Beak (black)
    p.fill(30, 30, 30);
    p.push();
    p.translate(-25, -20, 0);
    p.box(10, 13, 10);
    p.pop();
    p.push();
    p.translate(-27, -15, 0);
    p.box(6, 10, 10);
    p.pop();

    // Eyes (black spheres)
    p.fill(0);
    p.push();
    p.translate(-15, -23, 12);
    p.sphere(2);
    p.pop();
    p.push();
    p.translate(-15, -23, -12);
    p.sphere(2);
    p.pop();

    // Wings (red boxes)
    p.fill('red');
    p.push();
    p.translate(5, -5, 15);
    p.box(30, 10, 5);
    p.pop();
    p.push();
    p.translate(5, -5, -15);
    p.box(30, 10, 5);
    p.pop();

    // Tail (violet)
    p.fill('violet');
    p.push();
    p.translate(10, 0, 0);
    p.box(20, 10, 25);
    p.pop();

    // Legs (black)
    p.fill(30, 30, 30);
    p.push();
    p.translate(-10, 15, 6);
    p.box(6, 20, 5);
    p.pop();
    p.push();
    p.translate(-10, 15, -6);
    p.box(6, 20, 5);
    p.pop();

    // Feet (three toes)
    drawParrotFeet(-8, 25, -6);
    drawParrotFeet(-8, 25, 6);

    p.pop();
  }

  function drawParrotFeet(x, y, z) {
    p.push();
    p.translate(x, y, z);
    p.fill(30, 30, 30);
    // Center toe
    p.push();
    p.translate(-5, 0, 0);
    p.box(10, 3, 5);
    p.pop();
    // Left toe
    p.push();
    p.translate(-5, 0, 5);
    p.rotateX(p.PI / 6);
    p.box(10, 3, 5);
    p.pop();
    // Right toe
    p.push();
    p.translate(-5, 0, -5);
    p.rotateX(-p.PI / 6);
    p.box(10, 3, 5);
    p.pop();
    p.pop();
  }
};