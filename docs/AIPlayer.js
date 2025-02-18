class AIPlayer extends Player {
    constructor(index, x, y, spriteIndex) {
        super(index, x, y, null, null, null, null, spriteIndex);
        this.shootCooldown = 60; // Frames between shots
        this.framesSinceLastShot = 0;
        this.safeDistance = 400; // Safe distance from the player
        this.targetWeapon = null;
        this.previousY = this.y;
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
            if (target instanceof Player) {
                this.moveToPlayer(target);
            } else {
                this.moveToWeapon(target);
            }
        }
    }

    moveToPlayer(target) {
        let distance = dist(this.x, this.y, target.x, target.y);
        let dx = 0;

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

        // Attempt horizontal movement
        this.x += dx;

        // AI update animation for sprite
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

    moveToWeapon(target) {
        let dx = 0;
        let dy = 0;

        // Move horizontally towards the weapon
        if (target.x < this.x) {
            dx = -this.speed;
        } else if (target.x > this.x) {
            dx = this.speed;
        }

        // Move vertically towards the weapon
        if (target.y < this.y) {
            dy = -this.speed;
        } else if (target.y > this.y) {
            dy = this.speed;
        }

        // Attempt horizontal movement
        this.x += dx;

        // AI update animation for sprite
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
                if (map.grid[row][col] === 1) { // solid tile
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

        // Attempt vertical movement
        this.y += dy;

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
                        // If moving down, align the player's bottom edge with the tile's top edge
                        if (dy > 0) {
                            this.y = tile.y - this.height;
                        }
                        // If moving up, align the player's top edge with the tile's bottom edge
                        else if (dy < 0) {
                            this.y = tile.y + tile.height;
                        }
                    }
                }
            }
        }

        // Check if the AI needs to jump to reach the weapon
        if (target.y < this.y && !this.isJumping) {
            this.jump();
        }

        // If the AI can't reach the weapon directly, find a nearby platform to jump to
        if (this.y === this.previousY) {
            let platform = this.findNearbyPlatform();
            if (platform) {
                this.moveToPlatform(platform);
            }
        }

        this.previousY = this.y;
    }

    findNearbyPlatform() {
        for (let row = 0; row < map.grid.length; row++) {
            for (let col = 0; col < map.grid[row].length; col++) {
                if (map.grid[row][col] === 1) { // solid tile
                    let tile = {
                        x: col * map.tileSize,
                        y: row * map.tileSize,
                        width: map.tileSize,
                        height: map.tileSize
                    };
                    if (dist(this.x, this.y, tile.x, tile.y) < this.safeDistance) {
                        return tile;
                    }
                }
            }
        }
        return null;
    }

    moveToPlatform(platform) {
        let dx = 0;
        let dy = 0;

        // Move horizontally towards the platform
        if (platform.x < this.x) {
            dx = -this.speed;
        } else if (platform.x > this.x) {
            dx = this.speed;
        }

        // Move vertically towards the platform
        if (platform.y < this.y) {
            dy = -this.speed;
        } else if (platform.y > this.y) {
            dy = this.speed;
        }

        // Attempt horizontal movement
        this.x += dx;

        // AI update animation for sprite
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
                if (map.grid[row][col] === 1) { // solid tile
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

        // Attempt vertical movement
        this.y += dy;

        // Check vertical collisions with each solid tile
        for (let row = 0; row < map.grid.length; row++) {
            for (let col = 0; col < map.grid[row].length; col++) {
                if (map.grid[row][col] === 1) { // solid tile
                    let tile = {
                        x: col * map.tileSize,
                        y: row * map.tileSize,
                        width: map.tileSize,
                        height: map.tileSize
                    };
                    if (checkCollision(this, tile)) {
                        // If moving down, align the player's bottom edge with the tile's top edge
                        if (dy > 0) {
                            this.y = tile.y - this.height;
                        }
                        // If moving up, align the player's top edge with the tile's bottom edge
                        else if (dy < 0) {
                            this.y = tile.y + tile.height;
                        }
                    }
                }
            }
        }

        // Check if the AI needs to jump to reach the platform
        if (platform.y < this.y && !this.isJumping) {
            this.jump();
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
            if (distance < 500 && this.hasClearShot(target)) {
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
                    if (map.grid[row][col] === 1) { // solid tile
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
        // new feature
        let sprite = spriteManager.getSprite(this.spriteIndex, this.direction, this.frameIndex);
        if (sprite) {
            image(sprite, this.x, this.y, this.width, this.height);
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(12);
            text(this.health + "%", this.x + this.width / 2, this.y - 10);
        } else {
            fill(this.index === 0 ? 'red' : 'blue');
            rect(this.x, this.y, this.width, this.health);
        }
    }
}