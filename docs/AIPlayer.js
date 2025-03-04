class AIPlayer extends Player {
  constructor(index, x, y, spriteIndex) {
    super(index, x, y, null, null, null, null, spriteIndex);
    this.safeDistance = 400;
    this.aiDx = undefined;
    this.targetWeapon = null;
    this.targetPU = null;
    this.maxJumpHeight = 50;
    this.hitTimestamps = [];
    this.lastShotTime = 0;
    this.shootInterval = 150;
  }

  update() {
    if (roundOver && this !== roundWinner) {
        super.update();
        return;
    }

    this.updateDefensiveState();
    this.aiDodge();

    if (!this.weapon) {
        this.pathFindToWeapon();
        if (dist(this.x, this.y, players[0].x, players[0].y) < 400) {
            this.aiHide();
        }
    }
    else if (dist(this.x, this.y, players[0].x, players[0].y) < 400) {
        this.aiHide();
    }

    if (this.weapon && this.hasClearShot(players[0])) {
        if (millis() - this.lastShotTime >= this.shootInterval) {
            this.shoot();
            this.lastShotTime = millis();
        }
    }

    if(players[1].health < 100) {
      this.pathFindToPowerUps();
      if (dist(this.x, this.y, players[0].x, players[0].y) < 400) {
        this.aiHide();
      }
    } else if (dist(this.x, this.y, players[0].x, players[0].y) < 400) {
      this.aiHide();
    }
    
    super.update();
  }

  hasClearShot(target) {
    const aiCenterX = this.x + this.width / 2;
    const aiCenterY = this.y + this.height / 2;
    const targetCenterX = target.x + target.width / 2;
    const targetCenterY = target.y + target.height + 2;

    let dx = targetCenterX - aiCenterX;
    let dy = targetCenterY - aiCenterY;
    let steps = Math.max(abs(dx), abs(dy));

    for (let i = 0; i <= steps; i++) {

        let t = i / steps;
        let sampleX = lerp(aiCenterX, targetCenterX, t);
        let sampleY = lerp(aiCenterY, targetCenterY, t);

        let sampleRect = { x: sampleX, y: sampleY, width: 1, height: 1};

        for (let row = 0; row < map.grid.length; row++) {
            for (let col = 0; col < map.grid[row].length; col++) {
                let tileNum = map.grid[row][col];
                if (tileNum > 0 &&
                    map.tileMapping[tileNum] !== "desert_tile_water" &&
                    map.tileMapping[tileNum] !== "underground_wall1") { // solid tile
                    let tile = {
                        x: col * map.tileSize,
                        y: row * map.tileSize,
                        width: map.tileSize,
                        height: map.tileSize
                    };
                    if (checkCollision(sampleRect, tile)) {
                       return false;
                    }
                }
            }
        }
    }
    return true;
  }

  takeDamage(amount) {
    super.takeDamage(amount);
    this.hitTimestamps.push(millis());
  }

  updateDefensiveState() {
    const currentTime = millis();
    this.hitTimestamps = this.hitTimestamps.filter(time => (currentTime - time) <= 1000);
    if (this.hitTimestamps.length > 0) {
        let otherPlayer = players[0];
        this.aiDx = (otherPlayer.x < this.x) ? this.speed : -this.speed;
        this.updateAnimation(this.aiDx);
    }
  }

  pathFindToWeapon() {
    let target = this.findClosestWeapon();
    if (target) {
        this.targetWeapon = target;

        let dx = 0;
        if (target.x < this.x) {
            dx = -this.speed;
        } else if (target.x > this.x) {
            dx = this.speed;
        }
        this.aiDx = dx;
        this.updateAnimation(dx);

        if (abs(target.y - this.y) > 50) {
           
            if (target.y < this.y) {
                if ((this.y - target.y) > this.maxJumpHeight) {
                    let otherPlayer = players[0];
                    this.aiDx = (otherPlayer.x < this.x) ? this.speed : -this.speed;
                }
                else if (this.isBlockedAbove()) {
                    let clearY = this.findClearPathAbove();
                    if (clearY !== null && (this.y - clearY) <= this.maxJumpHeight) {
                        if (!this.isJumping) {
                            this.jump();
                        }
                    } else {
                        let otherPlayer = players[0];
                        this.aiDx = (otherPlayer.x < this.x) ? this.speed : -this.speed;
                    }
                }
                else if (!this.isJumping) { 
                    this.jump();
                }
            }
        }
    }
  }

  pathFindToPowerUps() {
    let target = this.findPowerUps();
    if (target) {
        this.targetPU = target;

        let dx = 0;
        if (target.x < this.x) {
            dx = -this.speed;
        } else if (target.x > this.x) {
            dx = this.speed;
        }
        this.aiDx = dx;
        this.updateAnimation(dx);

        if (abs(target.y - this.y) > 50) {
           
            if (target.y < this.y) {
                if ((this.y - target.y) > this.maxJumpHeight) {
                    let otherPlayer = players[0];
                    this.aiDx = (otherPlayer.x < this.x) ? this.speed : -this.speed;
                }
                else if (this.isBlockedAbove()) {
                    let clearY = this.findClearPathAbove();
                    if (clearY !== null && (this.y - clearY) <= this.maxJumpHeight) {
                        if (!this.isJumping) {
                            this.jump();
                        }
                    } else {
                        let otherPlayer = players[0];
                        this.aiDx = (otherPlayer.x < this.x) ? this.speed : -this.speed;
                    }
                }
                else if (!this.isJumping) { 
                    this.jump();
                }
            }
        }
    }
  }

  findClearPathAbove() {
    for (let offset = 5; offset <= this.maxJumpHeight; offset += 5) {
        let checkRect = {
            x: this.x - 2,
            y: this.y - offset, 
            width: this.width + 4,
            height: 20,
        };
        let blocked = false;
        for (let row = 0; row < map.grid.length; row++) {
            for (let col = 0; col < map.grid[row].length; col++) {
                let tileNum = map.grid[row][col];
                if (tileNum > 0 && map.tileMapping[tileNum] !== "desert_tile_water" && map.tileMapping[tileNum] !== "underground_wall1") { // solid tile
                    let tile = {
                        x: col * map.tileSize,
                        y: row * map.tileSize,
                        width: map.tileSize,
                        height: map.tileSize
                    };
                    if (checkCollision(checkRect, tile)) {
                        blocked = true;
                        break;
                    }
                }
            }
            if (blocked) {
                break;
            }
        }
        if (!blocked) {
            return this.y - offset;
        }
    }
    return null;
  }

  isBlockedAbove() {
    let checkRect = {
        x: this.x,
        y: this.y - 5, 
        width: this.width,
        height: 5,
    };
    
    for (let row = 0; row < map.grid.length; row++) {
        for (let col = 0; col < map.grid[row].length; col++) {
            let tileNum = map.grid[row][col];
            if (tileNum > 0 && map.tileMapping[tileNum] !== "desert_tile_water" && map.tileMapping[tileNum] !== "underground_wall1") { // solid tile
                let tile = {
                    x: col * map.tileSize,
                    y: row * map.tileSize,
                    width: map.tileSize,
                    height: map.tileSize
                };
                if (checkCollision(checkRect, tile)) {
                    return true;
                }
            }
        }
    }
    return false;
  }

  findClosestWeapon() {
    let closest = null;
    let minDistance = Infinity;

    for (let weapon of weapons) {
        if (!weapon.pickedUp) {
            let distance = dist(this.x, this.y, weapon.x, weapon.y);
            if (distance < minDistance) {
                minDistance = distance;
                closest = weapon;
            }
        }
    }
    return closest;
  }

  findPowerUps() {
    let closest = null;
    let minDistance = Infinity;

    for (let powerup of PowerUps.activeHealthRegen) {
          let distance = dist(this.x, this.y, powerup.x, powerup.y);
          if (distance < minDistance) {
              minDistance = distance;
              closest = powerup;
          }
    }
    return closest;
  }

  aiHide() {
    let player = players[0];
    let dx = 0;

    if (player.x < this.x) {
        dx = this.speed;
    } else {
        dx = -this.speed;
    }

    this.aiDx = dx;
    this.updateAnimation(dx);

    let playerDistance = dist(this.x, this.y, players[0].x, players[0].y);
    if (playerDistance < 240) {
        if (!this.isJumping) {
          this.jump();
          soundManager.playSound('jump');
        }
    }
  }

  aiDodge() {
    this.dodgeHorizontalBullets();
    this.dodgeVerticalBullets();
  }

  dodgeHorizontalBullets() {
    for (let bullet of bullets) {
      if (bullets.shooter !== this) {
        let bulletDistance = dist(this.x, this.y, bullet.x, bullet.y);
        if (bulletDistance < 150 && abs(bullet.vx) > abs(bullet.vy)) {
          if (!this.isJumping) {
            if (!this.isBlockedAbove()) {
                this.jump();
                soundManager.playSound('jump');
                break;
            }
            else {
                let otherPlayer = players[0];
                this.aiDx = (otherPlayer.x < this.x) ? this.speed : -this.speed;
                this.updateAnimation(this.aiDx);
            }
          }
        }
      }
    }
  }

  dodgeVerticalBullets() {
    for (let bullet of bullets) {
      if (bullets.shooter !== this) {
        let bulletDistance = dist(this.x, this.y, bullet.x, bullet.y);
        if (bulletDistance < 200 && abs(bullet.vx) < abs(bullet.vy)) {
            let dx = 0;
            if (bullet.x < this.x) {
                dx = this.speed;
            } else {
                dx = -this.speed;
            }
            this.aiDx = dx;
        }
        else if (bulletDistance < 150 && abs(bullet.vx) > abs(bullet.vy)) {
          if (!this.isJumping) {
            this.jump();
            soundManager.playSound('jump');
            break;
          }
        }
      }
    }
  }

  updateAnimation(dx) {
    if (dx < 0) {
      this.direction = "left";
      if (frameCount % 5 === 0) {
        this.frameIndex++;
      } 
    } 
    else if (dx > 0) {
      this.direction = "right";
      if (frameCount % 5 === 0) {
        this.frameIndex++;
      }
    }
    else {
      this.direction = "front";
      this.frameIndex = 0;
    }
    this.frameIndex = this.frameIndex % 3;
  }

  display() {
    super.display();
  }

}