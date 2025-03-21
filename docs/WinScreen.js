class WinScreen{
    constructor() {
        this.rectW = 700;
        this.rectH = 400;
        this.rectX = width/2 - (this.rectW/2);
        this.rectY = height/2 - (this.rectH/2);
        this.trophyAngle = 0;
        this.confettiParticles = [];
        this.confettiColors = ['#FF5252', '#FFEB3B', '#2196F3', '#4CAF50', '#9C27B0'];
        for (let i = 0; i < 80; i++) {
          this.createConfettiParticle();
        }
        //click listener for rematch 
        this.setupClickListener();
      }
      setupClickListener() {
        canvas.addEventListener('click', (e) => {
          // Make sure the game is still over (prevent multiple clicks)
          if (!gameOver){
            return;
          }
          
          let buttonX = this.rectX + (this.rectW/2) - 100;
          let buttonY = this.rectY + this.rectH - 70;
          let buttonWidth = 200;
          let buttonHeight = 50;
          
          if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
              mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
            
            // Reset game state for a rematch
            gameOver = false;
            player1Score = 0;
            player2Score = 0;
            roundNum = 1;
            
            for (let player of players) {
              player.health = 100;
              player.weapon = null;
              player.exitStage = 0;
            }
            players[0].x = 150;
            players[0].y = 200;
            players[1].x = 1075;
            players[1].y = 200;
            
            bullets = [];
            weapons = [];
            roundOver = false;
            
            soundManager.playSound('gamestart');
            
            
            loop();
            
            canvas.removeEventListener('click', this.clickHandler);
          }
        });
      }
      
      createConfettiParticle() {
        const fromLeft = random() > 0.5;
        
        this.confettiParticles.push({
          x: fromLeft ? -20 : width + 20, 
          y: random(height * 0.1, height * 0.9), 
          width: 8 + random(6), 
          height: 8 + random(6), 
          color: random(this.confettiColors),
          speed: 3 + random(5), 
          direction: fromLeft ? 1 : -1,
          angle: random(TWO_PI), 
          spin: random(-0.05, 0.05), 
          yVelocity: random(-1, 1), 
          createdAt: millis(),
          lifetime: 1500 + random(500) 
        });
      }
      
      updateConfetti() {
        const currentTime = millis();
        
        // Update and draw confetti
        for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
          let p = this.confettiParticles[i];
          
          // Update position
          p.x += p.speed * p.direction;
          p.y += p.yVelocity;
          p.angle += p.spin;
          
          // Draw the confetti
          push();
          translate(p.x, p.y);
          rotate(p.angle);
          fill(p.color);
          noStroke();
          rect(-p.width/2, -p.height/2, p.width, p.height);
          pop();
          
          // Remove old confetti or off-screen particles
          if (currentTime - p.createdAt > p.lifetime || 
              p.x < -50 || p.x > width + 50) {
            this.confettiParticles.splice(i, 1);
            this.createConfettiParticle(); // Replace with a new one
          }
        }
      }
      
      drawCrowns(x, y, score, maxScore, color) {
        let crownSize = 40;
        let spacing = 15;
        
        for (let i = 0; i < maxScore; i++) {
          let crownX = x + (i * (crownSize + spacing));
          push();
          translate(crownX, y);
        
          if (i < score) {
            fill(color);
            stroke('white');
          } else {
            noFill();
            stroke(color);
          }
          strokeWeight(2);
          
         
          beginShape();
          vertex(-crownSize/2, -crownSize/3);
          vertex(-crownSize/4, -crownSize/2);
          vertex(0, -crownSize/3);
          vertex(crownSize/4, -crownSize/2);
          vertex(crownSize/2, -crownSize/3);
          vertex(crownSize/2, crownSize/3);
          vertex(-crownSize/2, crownSize/3);
          endShape(CLOSE);
          
          pop();
        }
      }
      
      drawTrophy(x, y) {
        push();
        translate(x, y);
        rotate(this.trophyAngle); // Rotate the trophy
        
        // Trophy cup
        fill('#FFD700'); // Gold color
        stroke('#DAA520');
        strokeWeight(2);
        ellipse(0, -30, 60, 20);
        beginShape();
        vertex(-30, -30);
        vertex(-20, 0);
        vertex(-10, 20);
        vertex(10, 20);
        vertex(20, 0);
        vertex(30, -30);
        endShape();
        fill('#FFD700');
        rect(-15, 20, 30, 10);
        rect(-25, 30, 50, 5);
        
        pop();
        
        // Update trophy angle for next frame
        this.trophyAngle += 0.005;
      }
      
      display() {
        this.updateConfetti();
        
        
        push();
        fill(0, 0, 0, 180);
        rect(0, 0, width, height);
        
        // Draw game over window
        translate(this.rectX, this.rectY);
        stroke('white');
        strokeWeight(3);
        fill(0, 100, 200);  
        rect(0, 0, this.rectW, this.rectH, 20);  
        
        
        fill(30, 70, 150);  
        rect(0, 0, this.rectW, 70, 20, 20, 0, 0);
        
        textSize(40);
        fill('white');
        textAlign(CENTER, CENTER);
        let winningPlayer = (player1Score >= finalScore) ? "PLAYER 1" : "PLAYER 2";
        text(winningPlayer + " WINS!", this.rectW / 2, 35);
        
        let player1Color = (player1Score >= finalScore) ? '#4CAF50' : '#FF5252'; // Green if winner, red if loser
        let player2Color = (player2Score >= finalScore) ? '#4CAF50' : '#FF5252'; // Green if winner, red if loser
        
        // Player 1 label
        textSize(28);
        fill(player1Color);
        textAlign(LEFT, CENTER);
        text("PLAYER 1:", 50, 120);
        
        // Player 1 crowns - moved more to the right
        this.drawCrowns(250, 120, player1Score, finalScore, player1Color);
        
        // Player 2 label
        fill(player2Color);
        text("PLAYER 2:", 50, 170);
        
        // Player 2 crowns - moved more to the right
        this.drawCrowns(250, 170, player2Score, finalScore, player2Color);
        
        // Draw rotating trophy
        this.drawTrophy(this.rectW / 2, 260);
        
        // Rematch button
        fill('#2196F3');
        rect(this.rectW/2 - 100, this.rectH - 85, 200, 50, 10);
        fill('white');
        textAlign(CENTER, CENTER);
        textSize(24);
        text("REMATCH", this.rectW/2, this.rectH - 60);
        
        textSize(16);
        text("Click anywhere to play again", this.rectW/2, this.rectH - 15);
        
        pop();
      }
    }
