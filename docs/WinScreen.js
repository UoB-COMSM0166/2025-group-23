class WinScreen{

  static starsIcon = [];
  static boxScore;
  static ribon1;
  static ribon2;

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

        const css = `
        @font-face {
          font-family: pixel;
          src: url("assets/fonts/pixel.ttf");
        }
        #win-screen {
          font-family: pixel;
          font-size: 32px;
          margin-bottom: 20px;
          text-align: center;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 20px
        }
        #win-screen button {
          font-family: pixel;
          margin: 10px;
        }
        `;
        createElement('style', css);

        this.panel = createDiv(`
          <div id="win-screen">
            <button id="rematch-btn" type="button" style="cursor: pointer; margin: 10px;">Rematch</button>
            <button id="return-home-btn" type="button" style="cursor: pointer; margin: 10px;">Home</button>
          </div>
          `);
        this.panel.id('win-screen');
        this.panel.position(width/2, height * 0.85, 'absolute');
        this.panel.style('transform', 'translate(-50%, -50%)');
        this.panel.style('display', 'none');
        this.panel.style('padding', '120px');
        this.panel.style('z-index', '10');
        this.panel.style('position', 'absolute');
        this.setupButtons();
      }

      static preloadWinIcons() {
        this.boxScore = loadImage(`assets/winscreen/boxStat.png`);
        this.ribon1 = loadImage(`assets/winscreen/RibonTitle1.png`);
        this.ribon2 = loadImage(`assets/winscreen/RibonTitle2.png`);

        for (let i = 0; i <= 3; i++) {
          this.starsIcon.push(loadImage(`assets/winscreen/${i}star.png`));
        }
    
      }

      setupButtons() {
        select('#rematch-btn').mouseReleased(() => {
          soundManager.playSound('buttonClick');
          if (winSoundPlayed) {
            soundManager.stopSound('gameWin');
          }
          this.initRematch();
          this.hide();

        });
        select('#return-home-btn').mouseReleased(() => {
          soundManager.playSound('buttonClick');
          if (winSoundPlayed) {
            soundManager.stopSound('gameWin');
          }
          this.initReturnHome();
          this.hide();
          soundManager.playMusic('gameMusic');
          
        });
      }

      show() {
        this.panel.style('display', 'block');
        soundManager.stopMusic('gameMusic');
      }

      hide() {
        this.panel.style('display', 'none');
      }

      initRematch() {
        if (!gameOver){
          return;
        }
        
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
      }

      initReturnHome() {
        homePage.show();
        roundNum = 0;
        map = maps[roundNum];
        player1Score = 0;
        player2Score = 0;
        players = [];
        weapons = [];
        bullets = [];
        gamePaused = false;
        gameStarted = false;
        gameOver = false;
        gameInitalised = false;
        countdownActive = false;
        noLoop();
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

        let boxScoreImg = WinScreen.boxScore;
        if (boxScoreImg) {
          let posX = width/2 - boxScoreImg.width/2;
          let posY = height/2 - boxScoreImg.height/2;
          image(boxScoreImg, posX, posY);
        }

        let winnerName, loserName;
        let winnerStar, loserStar;
        if (player1Score >= player2Score) {
          winnerName = players[0].name;
          winnerStar = WinScreen.starsIcon[player1Score];
          loserName = players[1].name;
          loserStar = WinScreen.starsIcon[player2Score];
        } else {
          winnerName = players[1].name;
          winnerStar = WinScreen.starsIcon[player2Score];
          loserName = players[0].name;
          loserStar = WinScreen.starsIcon[player1Score];
        }

        let player1ribon = WinScreen.ribon1;
        if (player1ribon) {
          let posX = width/2 - player1ribon.width/2;
          let posY = 300 - player1ribon.height/2;
          image(player1ribon, posX, posY);

          let starPosX = width / 2 - winnerStar.width / 2;
          let starPosY = posY - winnerStar.height - 5; // 10px offset above the ribbon
          image(winnerStar, starPosX, starPosY);
          
          textFont(pixelFont);
          textSize(45);
          fill('white');
          textAlign(CENTER, CENTER);
          let namePosY = posY + player1ribon.height / 2;
          text(winnerName, width / 2, namePosY - 10);
        }

        let player2ribon = WinScreen.ribon2;
        if (player2ribon) {
          let posX = width/2 - player2ribon.width/2;
          let posY = 600 - player2ribon.height/2;
          image(player2ribon, posX, posY);

          let starPosX = width / 2 - loserStar.width / 2;
          let starPosY = posY - loserStar.height - 5;
          image(loserStar, starPosX, starPosY);

          textFont(pixelFont);
          textSize(45);
          fill('white');
          textAlign(CENTER, CENTER);
          let namePosY = posY + player2ribon.height / 2;
          text(loserName, width / 2, namePosY - 10);
        }

      push();
        textSize(80);
        fill('white');
        textAlign(CENTER, CENTER);
        text(" WINNER!", width/2, 110);
      pop();

      push();
        textSize(40);
        fill('white');
        textAlign(CENTER, CENTER);
        text("vs", width/2, height * 0.46);
      pop();
      }
    }
