class PowerUps {
  constructor () {}

  static frameDuration = 200;
  static spawnHealthRegenInterval = 25000;
  static spawnShieldInterval = 35000;


  static healthRegenOutLayer;
  static healthRegenInLayer;
  static currentHealthRegenFrame = 0;
  static lastHealthRegenFrameTime = 20;
  static activeHealthRegen = [];
  static activeHealthRegenEffects = [];
  static lastHealthRegenSpawnTime = 0;

  static shieldOutLayer;
  static shieldInLayer;
  static currentShieldFrame = 0;
  static lastShieldFrameTime = 20;
  static activeShield = [];
  static activeShieldEffects = [];
  static lastShieldSpawnTime = 0;

  static shieldBubbleImages = [];
  static lastShieldBubbleFrameTime = 20;
  static currentShieldBubbleFrame = 0; 

  static preloadHealthRegenPU() {
    this.healthRegenOutLayer = loadImage('assets/powerups/health-powerup1.png');
    this.healthRegenInLayer = loadImage('assets/powerups/health-powerup2.png');
  }

  static preloadShieldPU() {
    this.shieldOutLayer = loadImage('assets/powerups/shield-powerup1.png');
    this.shieldInLayer = loadImage('assets/powerups/shield-powerup2.png');

    for (let i = 1; i <= 6; i++) {
      this.shieldBubbleImages.push(loadImage(`assets/powerups/${i}.png`));
    }
  }

  static update() {
    if (!roundOver && gameStarted) {
      this.updateHealthRegenPU();
      this.updateShieldPU();
      this.processHealthRegenEffects();
      this.processShieldEffects();
    } else if (roundOver || gameOver) {
      this.activeHealthRegen = [];
      this.activeShield = [];
      this.activeHealthRegenEffects = [];
    }
  }

  static updateHealthRegenPU() {
    if (millis() - this.lastHealthRegenSpawnTime > this.spawnHealthRegenInterval) {
      let x = random(50, width - 50);
      let y = -50; 
      let fallingSpeed = 2;
      this.activeHealthRegen.push({
        x: x,
        y: y,
        vy: fallingSpeed,
        consumed: false,
        consumedAt: 0
      });
      this.lastHealthRegenSpawnTime = millis();
    }

    for (let i = this.activeHealthRegen.length - 1; i >= 0; i--) {
      let healthPU = this.activeHealthRegen[i];
      healthPU.y += healthPU.vy;

      let healthPURect = {
        x: healthPU.x,
        y: healthPU.y,
        width: this.healthRegenInLayer.width / 2,
        height: this.healthRegenInLayer.height / 2
      };

      for (let row = 0; row < map.grid.length; row++) {
        for (let col = 0; col < map.grid[row].length; col++) {
            let tileNum = map.grid[row][col];
            if (tileNum > 0 && map.tileMapping[tileNum] !== "underground_wall1") {
                let tile = {x: col * map.tileSize, y: row * map.tileSize, width: map.tileSize, height: map.tileSize};

                if (checkCollision(healthPURect, tile)) {
                    healthPU.vy = 0;
                    break;
                }
            }
        }
      }
      if (healthPU.y - this.healthRegenOutLayer.height > height) {
        this.activeHealthRegen.splice(i, 1);
      }
    }
  }

  static healthRegenConsume(player) {
    for (let i = this.activeHealthRegen.length - 1; i >= 0; i--) {
      let healthPU = this.activeHealthRegen[i];

      let healthPURect = {
        x: healthPU.x,
        y: healthPU.y,
        width: this.healthRegenInLayer.width / 2,
        height: this.healthRegenInLayer.height / 2
      };

      let playerRect = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height
      };
      if (checkCollision(healthPURect, playerRect)) {
        let consumedPU = this.activeHealthRegen.splice(i, 1)[0];
        soundManager.playSound('healthRegen');
        this.activeHealthRegenEffects.push({
          player: player,
          startTime: millis()
        });
      }
    }
  }

  static processHealthRegenEffects() {
    for (let i = this.activeHealthRegenEffects.length - 1; i >= 0; i--) {
      let effect = this.activeHealthRegenEffects[i];
      if (effect.player.health < 100) {
        effect.player.health += 0.6;
        if (effect.player.health > 100) effect.player.health = 100;
      }
      if (millis() - effect.startTime > 1500) {
        this.activeHealthRegenEffects.splice(i, 1);
      }
    }
  }

  static updateShieldPU() {
    if (millis() - this.lastShieldSpawnTime > this.spawnShieldInterval) {
      let x = random(50, width - 50);
      let y = -50; 
      let fallingSpeed = 2;
      this.activeShield.push({
        x: x,
        y: y,
        vy: fallingSpeed,
        consumed: false,
        consumedAt: 0
      });
      this.lastShieldSpawnTime = millis();
    }

    for (let i = this.activeShield.length - 1; i >= 0; i--) {
      let shieldPU = this.activeShield[i];
      shieldPU.y += shieldPU.vy;

      let shieldPURect = {
        x: shieldPU.x,
        y: shieldPU.y,
        width: this.shieldInLayer.width / 2,
        height: this.shieldInLayer.height / 2
      };

      for (let row = 0; row < map.grid.length; row++) {
        for (let col = 0; col < map.grid[row].length; col++) {
            let tileNum = map.grid[row][col];
            if (tileNum > 0 && map.tileMapping[tileNum] !== "underground_wall1") {
                let tile = {x: col * map.tileSize, y: row * map.tileSize, width: map.tileSize, height: map.tileSize};

                if (checkCollision(shieldPURect, tile)) {
                    shieldPU.vy = 0;
                    break;
                }
            }
        }
      }
      if (shieldPU.y - this.shieldOutLayer.height > height) {
        this.activeShield.splice(i, 1);
      }
    }
  }

  static shieldConsume(player) {
    for (let i = this.activeShield.length - 1; i >= 0; i--) {
      let shieldPU = this.activeShield[i];

      let shieldPURect = {
        x: shieldPU.x,
        y: shieldPU.y,
        width: this.shieldInLayer.width / 2,
        height: this.shieldInLayer.height / 2
      };

      let playerRect = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height
      };
      if (checkCollision(shieldPURect, playerRect)) {
        this.activeShield.splice(i, 1);
        soundManager.playSound('shieldPowerUp');
        this.activeShieldEffects.push({
          player: player,
          startTime: millis()
        });
      }
    }
  }

  static updateShieldBubbleImages() {
    if (millis() - this.lastShieldBubbleFrameTime > this.frameDuration) {
      this.currentShieldBubbleFrame = (this.currentShieldBubbleFrame + 1) % this.shieldBubbleImages.length;
      this.lastShieldBubbleFrameTime = millis();
    }
  }

  static processShieldEffects() {
    this.updateShieldBubbleImages();
    for (let i = this.activeShieldEffects.length - 1; i >= 0; i--) {
      let effect = this.activeShieldEffects[i];
      this.displayShieldBubbleImages(effect.player);

      if (millis() - effect.startTime > 4500) {
        this.activeShieldEffects.splice(i, 1);
      }
    }
  }

  static isShieldActiveFor(player) {
    for (let effect of this.activeShieldEffects) {
      if (effect.player === player) {
        return true;
      }
      return false;
    }
  }

  static shieldCollisionCheck(bullet, player) {
    const shieldCenterX = player.x + player.width / 2;
    const shieldCenterY = player.y + player.height / 2;
    const shieldRadius = player.height * 0.80;

    const distance = dist(bullet.x, bullet.y, shieldCenterX, shieldCenterY);
    return distance <= shieldRadius;
  }

  static displayPowerUps() {
    if (!gameStarted || gameOver) {
      return;
    }
    
    let angle = radians((millis() / 10) % 360);
    for (let healthPU of this.activeHealthRegen) {
      push();
        translate(healthPU.x, healthPU.y);
        rotate(angle);
        image(this.healthRegenOutLayer, -this.healthRegenOutLayer.width / 2, -this.healthRegenOutLayer.height / 2);
        image(this.healthRegenInLayer, -this.healthRegenInLayer.width / 2, -this.healthRegenInLayer.height / 2);
      pop();
    }

    for (let shieldPU of this.activeShield) {
      push();
        translate(shieldPU.x, shieldPU.y);
        rotate(angle);
        image(this.shieldOutLayer, -this.shieldOutLayer.width / 2, -this.shieldOutLayer.height / 2);
        image(this.shieldInLayer, -this.shieldInLayer.width / 2, -this.shieldInLayer.height / 2);
      pop();
    }
  }

  static displayShieldBubbleImages(player) {
    let img = this.shieldBubbleImages[this.currentShieldBubbleFrame];
    let x = player.x + player.width / 2;
    let y = player.y + player.height/ 2;
    image(img, x - img.width/2, y - img.height/2);
  }

}