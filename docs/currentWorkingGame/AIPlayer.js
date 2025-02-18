class AIPlayer extends Player {
    constructor(index, x, y, spriteIndex) {
        super(index, x, y, null, null, null, null, spriteIndex);
        this.shootCooldown = 60; // Frames between shots
        this.framesSinceLastShot = 0;
        this.safeDistance = 300; // Safe distance from the player
    }

    update() {
        // Call the original update method
        super.update();

        // AI logic for movement
        this.aiMove();

        // AI logic for jumping
        this.aiJump();

        // AI logic for shooting
        this.aiShoot();

        // Increment the frame counter for shooting
        this.framesSinceLastShot++;
    }

    aiMove() {
        let target = this.findTarget();
        if (target) {
            let distance = dist(this.x, this.y, target.x, target.y);
            let dx = 0;

            if (target instanceof Player) {
                // Maintain a safe distance from the player
                if (distance < this.safeDistance) {
                    if (target.x < this.x) {
                        dx = this.speed;
                    } else if (target.x > this.x) {
                        dx = -this.speed;
                    }
                } else {
                    if (target.x < this.x) {
                        dx = -this.speed;
                    } else if (target.x > this.x) {
                        dx = this.speed;
                    }
                }

                // Ensure a clear line of sight to the player
                if (!this.hasClearShot(target)) {
                    if (target.x < this.x) {
                        dx = -this.speed;
                    } else if (target.x > this.x) {
                        dx = this.speed;
                    }
                }
            } else {
                // Move towards the weapon
                if (target.x < this.x) {
                    dx = -this.speed;
                } else if (target.x > this.x) {
                    dx = this.speed;
                }
            }

            // Attempt horizontal movement
            this.x += dx;

            //AI update animation for sprite
            if (dx < 0) {
                this.direction = 'left';
                if (frameCount % 5 === 0) {
                    this.frameIndex++;
                }
            } else if (dx > 0) {
                this.direction = 'right';
                if (frameCount % 5 === 0) {
                    this.frameIndex++;
                }
            } else {
                this.direction = 'front';
                this.frameIndex = 0; // Reset animation when idle
            }

            this.frameIndex = this.frameIndex % 3;

            // Check horizontal collisions with each solid tile
            for (let row = 0; row < map.grid.length; row++) {
                for (let col = 0; col < map.grid[row].length; col++) {
                    if (map.grid[row][col] > 0) { // solid tile
                        let tile = {
                            x: col * map.tileSize,
                            y: row * map.tileSize,
                            width: map.tileSize,
                            height: map.tileSize
                        };
                        if (checkCollision(this, tile)) {
                            // If moving right, align the player's right edge with the tile's left edge
                            if (dx > 0) {
                                this.x = tile.x - this.width;
                            }
                            // If moving left, align the player's left edge with the tile's right edge
                            else if (dx < 0) {
                                this.x = tile.x + tile.width;
                            }
                        }
                    }
                }
            }
        }
    }

    aiJump() {
        let target = this.findTarget();
        if (target && target.y < this.y && !this.isJumping) {
            this.jump();
        }
    }

    aiShoot() {
        if (this.framesSinceLastShot >= this.shootCooldown) {
            let target = players[0];
            let distance = dist(this.x, this.y, target.x, target.y);
            if (distance < 300 && this.hasClearShot(target)) { // Adjust the range as needed
                this.shoot();
                this.framesSinceLastShot = 0; // Reset the cooldown
            }
        }
    }

    findTarget() {
        if (this.weapon && this.weapon.bulletsFired < this.weapon.bulletLimit) {
            return players[0]; // Target the player if AI has a weapon with ammo
        } else {
            // Find the nearest weapon
            let nearestWeapon = null;
            let minDistance = Infinity;
            for (let weapon of weapons) {
                let distance = dist(this.x, this.y, weapon.x, weapon.y);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestWeapon = weapon;
                }
            }
            return nearestWeapon;
        }
    }

    hasClearShot(target) {
        // Check for obstacles between the AI player and the target player
        let clearShot = true;
        let steps = 10; // Number of steps to check along the line
        let dx = (target.x - this.x) / steps;
        let dy = (target.y - this.y) / steps;
        for (let i = 1; i <= steps; i++) {
            let checkX = this.x + dx * i;
            let checkY = this.y + dy * i;
            for (let row = 0; row < map.grid.length; row++) {
                for (let col = 0; col < map.grid[row].length; col++) {
                    if (map.grid[row][col] > 0) { // solid tile
                        let tile = {
                            x: col * map.tileSize,
                            y: row * map.tileSize,
                            width: map.tileSize,
                            height: map.tileSize
                        };
                        if (checkCollision({ x: checkX, y: checkY, width: 1, height: 1 }, tile)) {
                            clearShot = false;
                            break;
                        }
                    }
                }
                if (!clearShot) break;
            }
            if (!clearShot) break;
        }
        return clearShot;
    }

    pickupWeapon(weapon) {
        super.pickupWeapon(weapon);
        this.framesSinceLastShot = 0; // Reset the cooldown when picking up a new weapon
    }

    display() {
        //new feature
        let sprite = spriteManager.getSprite(this.spriteIndex, this.direction, this.frameIndex);
        if (sprite) {
            image(sprite, this.x, this.y, this.width, this.height);
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(12);
            text(this.health + "%", this.x + this.width/2, this.y - 10);
        }
        else {
            fill(this.index === 0 ? 'red' : 'blue');
            rect(this.x, this.y, this.width, this.health);
        }
    }
}