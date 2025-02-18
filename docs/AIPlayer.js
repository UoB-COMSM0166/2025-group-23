class AIPlayer extends Player {
    constructor(index, x, y, spriteIndex) {
        super(index, x, y, null, null, null, null, spriteIndex);
        this.shootCooldown = 60; // Frames between shots
        this.framesSinceLastShot = 0;
        this.safeDistance = 400; // Safe distance from the player
        this.targetWeapon = null;
        this.previousY = this.y;
        this.speed = 5; // Ensure speed is defined
    }

    update() {
        // Call the original update method
        super.update();

        // Calculate the target once per update cycle
        const target = this.findTarget();

        // Use the same target for movement, jumping and shooting
        if (target) {
            this.aiMove(target);
            this.aiJump(target);
            if (target instanceof Player) {
                this.aiShoot(target);
            }
        }

        // Increment the frame counter for shooting
        this.framesSinceLastShot++;
    }

    aiMove(target) {
        if (target instanceof Player) {
            this.moveToPlayer(target);
        } else {
            this.moveToWeapon(target);
        }
    }

    moveToPlayer(target) {
        let distance = dist(this.x, this.y, target.x, target.y);
        let dx = 0;

        // Maintain a safe distance from the player
        if (distance < this.safeDistance) {
            dx = (target.x < this.x) ? this.speed : -this.speed;
        } else {
            dx = (target.x < this.x) ? -this.speed : this.speed;
        }

        // Adjust if obstacles block clear shot
        if (!this.hasClearShot(target)) {
            dx = (target.x < this.x) ? -this.speed : this.speed;
        }

        this.x += dx;
        this.updateSprite(dx);

        // Horizontal collisions with solid tiles
        this.collideHorizontally(dx);
    }

    moveToWeapon(target) {
        // Calculate differences on each axis
        let diffX = target.x - this.x;
        let diffY = target.y - this.y;

        // Compute dx, dy proportionally (avoid overshooting)
        let dx = Math.abs(diffX) > this.speed ? this.speed * Math.sign(diffX) : diffX;
        let dy = Math.abs(diffY) > this.speed ? this.speed * Math.sign(diffY) : diffY;

        // Apply horizontal movement and collisions
        this.x += dx;
        this.updateSprite(dx);
        this.collideHorizontally(dx);

        // Apply vertical movement and collisions
        this.y += dy;
        this.collideVertically(dy);

        // If the target is above and AI is not jumping, try to jump
        if (target.y < this.y && !this.isJumping) {
            this.jump();
        }

        // Platform fallback: if vertical progress is minimal (using a small threshold)
        const deltaY = Math.abs(this.y - this.previousY);
        if (deltaY < 1) {
            let platform = this.findNearbyPlatform();
            if (platform) {
                this.moveToPlatform(platform);
            }
        }
        this.previousY = this.y;
    }

    updateSprite(dx) {
        if (dx < 0) {
            this.direction = 'left';
            if (frameCount % 5 === 0) this.frameIndex++;
        } else if (dx > 0) {
            this.direction = 'right';
            if (frameCount % 5 === 0) this.frameIndex++;
        } else {
            this.direction = 'front';
            this.frameIndex = 0; // Reset animation when idle
        }
        this.frameIndex = this.frameIndex % 3;
    }

    collideHorizontally(dx) {
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
                        if (dx > 0) this.x = tile.x - this.width;
                        else if (dx < 0) this.x = tile.x + tile.width;
                    }
                }
            }
        }
    }

    collideVertically(dy) {
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
                        if (dy > 0) this.y = tile.y - this.height;
                        else if (dy < 0) this.y = tile.y + tile.height;
                    }
                }
            }
        }
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
        let diffX = platform.x - this.x;
        let diffY = platform.y - this.y;
        let dx = Math.abs(diffX) > this.speed ? this.speed * Math.sign(diffX) : diffX;
        let dy = Math.abs(diffY) > this.speed ? this.speed * Math.sign(diffY) : diffY;

        this.x += dx;
        this.updateSprite(dx);
        this.collideHorizontally(dx);
        this.y += dy;
        this.collideVertically(dy);

        if (platform.y < this.y && !this.isJumping) {
            this.jump();
        }
    }

    aiJump(target) {
        // If the target is above and AI is not already jumping, then jump.
        if (target && target.y < this.y && !this.isJumping) {
            this.jump();
        }
    }

    aiShoot(target) {
        if (this.framesSinceLastShot >= this.shootCooldown) {
            let distance = dist(this.x, this.y, target.x, target.y);
            if (distance < 500 && this.hasClearShot(target)) {
                this.shoot();
                this.framesSinceLastShot = 0;
            }
        }
    }

    findTarget() {
        // If armed and with ammo, target the player; otherwise target the nearest weapon.
        if (this.weapon && this.weapon.bulletsFired < this.weapon.bulletLimit) {
            return players[0];
        } else {
            let nearestWeapon = null;
            let minDistance = Infinity;
            for (let weapon of weapons) {
                let d = dist(this.x, this.y, weapon.x, weapon.y);
                if (d < minDistance) {
                    minDistance = d;
                    nearestWeapon = weapon;
                }
            }
            return nearestWeapon;
        }
    }

    hasClearShot(target) {
        let steps = 10;
        let dx = (target.x - this.x) / steps;
        let dy = (target.y - this.y) / steps;
        for (let i = 1; i <= steps; i++) {
            let checkX = this.x + dx * i;
            let checkY = this.y + dy * i;
            for (let row = 0; row < map.grid.length; row++) {
                for (let col = 0; col < map.grid[row].length; col++) {
                    if (map.grid[row][col] === 1) {
                        let tile = {
                            x: col * map.tileSize,
                            y: row * map.tileSize,
                            width: map.tileSize,
                            height: map.tileSize
                        };
                        if (checkCollision({ x: checkX, y: checkY, width: 1, height: 1 }, tile)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    pickupWeapon(weapon) {
        super.pickupWeapon(weapon);
        this.framesSinceLastShot = 0;
    }

    display() {
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