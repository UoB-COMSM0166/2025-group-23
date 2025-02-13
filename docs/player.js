class Player {
    constructor(index, x, y, leftKey, rightKey, jumpKey, shootKey, spriteIndex) {
        this.index = index; //new feature 
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.health = 100;
        this.vy = 0;
        this.gravity = 0.8;
        this.isJumping = true;
        this.weapon = null;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.jumpKey = jumpKey;
        this.shootKey = shootKey;
        this.direction = 'front'; //new feature
        this.spriteIndex = spriteIndex; //new feature
        this.frameIndex = 0;

        //new feature
        let sprite = spriteManager.getSprite(this.spriteIndex, this.direction, this.frameIndex);
        if (sprite) {
            this.width = sprite.width;
            this.height = sprite.height;
        } else {
            this.width = 50;
            this.height = 80;
        }
    
    }

    update() {
            // HORIZONTAL MOVEMENT & COLLISION
        let dx = 0;
        if (keyIsDown(this.leftKey)) {
            dx = -this.speed;
            this.direction = 'left';
        } 
        else if (keyIsDown(this.rightKey)) {
            dx = this.speed;
            this.direction = 'right';
        }
        else {
            this.direction = 'front';
        }
        
        // Attempt horizontal movement
        this.x += dx;

        if (dx !== 0) {
            if (frameCount % 5 === 0) { // Slow down animation (change frame every 5 frames)
                this.frameIndex++;
            }
        } else {
            this.frameIndex = 0; // Reset to first frame when idle
        }

        
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
        
        // VERTICAL MOVEMENT & COLLISION
        // Apply gravity
        this.vy += this.gravity;
        this.y += this.vy;
        
        // Assume not on ground until proven otherwise
        let onGround = false;
        
        // Check vertical collisions with each solid tile
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
                        // Falling: Land on top of a platform
                        if (this.vy > 0) {
                            // Only correct if coming from above
                            if (this.y + this.height - this.vy <= tile.y) {
                                this.y = tile.y - this.height;
                                this.vy = 0;
                                onGround = true;
                            }
                        }
                        // Jumping: Hit your head on a ceiling
                        else if (this.vy < 0) {
                            this.y = tile.y + tile.height;
                            this.vy = 0;
                        }
                    }
                }
            }
        }
        
        // Update jumping status based on whether the player is on the ground
        this.isJumping = !onGround;
        
        // Prevent falling below the bottom of the canvas
        if (this.y > height) {
            this.x = random(0, width);
            this.y = 0;
            this.vy = 0;
            this.isJumping = false;
        }
    }

    jump() {
        if (!this.isJumping) {
            this.vy = -20;
            this.isJumping = true;
        }
    }

    shoot() {
        if (!this.weapon) {
            return;
        }

        // Determine the target player: if this is players[0], target is players[1], and vice versa.
        let target = (players[0] === this) ? players[1] : players[0];
        
        // Compute the center positions for more accurate aiming
        let shooterCenterX = this.x + this.width / 2;
        let shooterCenterY = this.y + this.height / 2;
        let targetCenterX = target.x + target.width / 2;
        let targetCenterY = target.y + target.height / 2;
        
        // Compute the difference in position and distance
        let dx = targetCenterX - shooterCenterX;
        let dy = targetCenterY - shooterCenterY;
        let distance = sqrt(dx * dx + dy * dy);
        if (distance === 0) {
            distance = 1;
        }
        
        // Define the desired bullet speed (adjust as needed)
        let bulletSpeed = 10
        let bulletsToFire = [];
        
        if (this.weapon.weaponType === "pistol") {
            // Normalize the vector and multiply by bulletSpeed to get velocity components
            let vx = (dx / distance) * bulletSpeed;
            let vy = (dy / distance) * bulletSpeed;
            
            // Create a bullet with the computed velocities, starting at the shooter's center
            bulletsToFire.push(new Bullet(shooterCenterX, shooterCenterY, vx, vy, this));
        } 
        else if (this.weapon.weaponType === "shotgun") {
            let vx = (dx / distance) * bulletSpeed;
            let vy = (dy / distance) * bulletSpeed;
            
            // Create a bullet with the computed velocities, starting at the shooter's center
            bulletsToFire.push(new Bullet(shooterCenterX, shooterCenterY, vx, vy, this));
            bulletsToFire.push(new Bullet(shooterCenterX, shooterCenterY, vx, vy + 1, this));
            bulletsToFire.push(new Bullet(shooterCenterX, shooterCenterY, vx, vy - 1, this));
        }

        for (let bullet of bulletsToFire) {
            bullets.push(bullet);
        }

        this.weapon.bulletsFired += bulletsToFire.length;

        //if bullets reach limit, discard weapon, stop firing. 
        if (this.weapon.bulletsFired >= this.weapon.bulletLimit) {
            this.weapon = null;
        }
    }

    pickupWeapon(weapon) {
        this.weapon = weapon;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
    }

    landsOn(platform) {
        return (
        this.y + this.height >= platform.y &&
        this.y + this.height <= platform.y + 5 &&
        this.x + this.width > platform.x &&
        this.x < platform.x + platform.width
        );
    }

    landOnPlatform(platform) {
        this.y = platform.y - this.height;
        this.vy = 0;
        this.isJumping = false;
    }

    collidesWith(other) {
        return this.x < other.x + other.width &&
        this.x + this.width > other.x &&
        this.y < other.y + other.height &&
        this.y + this.height > other.y;
    }

    display() {
        /* fill(this.color);
        rect(this.x, this.y, this.width, this.height); */

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