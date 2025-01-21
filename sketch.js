var cPressed = false;

function setup(){
  createCanvas(400, 300);
  background(200);
  textSize(15);
  fill(100);
  text("User instruction:\n- Default: Airbrush in Purple color\n- Press 'c': Change brush type & color to Rainbow Flower\n\n Press 's' to save the canvas", 10, 30)
}

function keyPressed(){
  if (key === 'c'){
    cPressed = !cPressed;
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
      
  if (key === 's'){
    save('myCanvas.jpg');
    describe('An example for saving a canvas as an image.');
  }
}

function draw(){
  if (mouseIsPressed){
    if (cPressed){
      strokeWeight(20);
      stroke(random (100,255), random (100, 255), random (100, 255))
    } else {
      noStroke();
      fill (100, 100, 200);
    }
      
    for (n=0; n<5; n++){
      ellipse (
        mouseX + random(-10, 10),
        mouseY + random(-10, 10),
        1 + random(5),
        1 + random(5)
      );
    }
  }
}
