let map;
let players = [];
let weapons = [];
let bullets = [];
let movingWalls = [];
let gameStarted = false;

function setup() {
    createCanvas(1215, 760);
    map = new Map();

    players[0] = new Player(150, 200, 'red', 65, 68, 87, 32);  // Player 1 (WASD + Space)
    players[1] = new Player(1075, 200, 'blue', LEFT_ARROW, RIGHT_ARROW, UP_ARROW, ENTER);  // Player 2 (Arrow Keys + Enter)

    movingWalls.push(new MovingWall(100, 150, 50, 10, 2, 1, 30)); // Moves within a range of 30 pixels
    movingWalls.push(new MovingWall(300, 220, 80, 10, 1.5, -1, 40)); // Moves within a range of 40 pixels

}

function draw() {
    background(100);
    map.display();

    for (let wall of movingWalls) {
        wall.update();
        wall.display();

        for (let player of players) {
            if (player.landsOn(wall)) {
                player.landOnPlatform(wall);
            }
        }
    }

    if (!gameStarted && frameCount > 60 * 3) {
        let weaponNum = random();
        dropWeaponLeft(weaponNum);
        dropWeaponRight(weaponNum);
        gameStarted = true;

        setInterval(() => {
            let newWeaponNum = random();
            dropWeaponLeft(newWeaponNum);
            dropWeaponRight(newWeaponNum);
        }, 10000);
    }


    for (let weapon of weapons) {
        weapon.display();
        weapon.update();
        for (let player of players) {
            if (player.collidesWith(weapon)) {
                player.pickupWeapon(weapon);
                weapons.splice(weapons.indexOf(weapon), 1);
            }
        }
    }

    for (let bullet of bullets) {
        bullet.update();
        bullet.display();

        for (let player of players) {
            if (bullet.shoots(player) && player !== bullet.shooter) {  // Only damage opponents
                player.takeDamage(10);
                bullets.splice(bullets.indexOf(bullet), 1);
            }
        }
    }

    for (let player of players) {
        player.update();
        player.display();
    }
    
    checkGameOver();
}

function keyPressed() {
    for (let player of players) {
        if (keyCode === player.jumpKey) {
            player.jump();
        }
        if (keyCode === player.shootKey) {
            player.shoot();
        }
    }
}

function dropWeaponLeft(weaponNum) {
    let x = random(100, width / 2 - 100);
    let y = random(50, height - 50);
    let weapon1 = new Weapon(x, y, "red");
    let weapon2 = new Weapon(x, y, "green");

    weapon1.weaponType = "pistol";
    weapon2.weaponType = "shotgun";

    if (weaponNum < 0.5) {
        weapons.push(weapon1);
    } else {
        weapons.push(weapon2);
    }
}

function dropWeaponRight(weaponNum) {
    let x = random(100 + width / 2, width - 100);
    let y = random(50, height - 50);
    let weapon1 = new Weapon(x, y, "red");
    let weapon2 = new Weapon(x, y, "green");

    weapon1.weaponType = "pistol";
    weapon2.weaponType = "shotgun";

    if (weaponNum < 0.5) {
        weapons.push(weapon1);
    } else {
        weapons.push(weapon2);
    }
    
}

function checkGameOver() {
    let alivePlayers = players.filter(p => p.health > 0);
    if (alivePlayers.length === 1) {
        noLoop();
        textSize(32);
        fill(255);
        textAlign(CENTER);
        text('Player Wins!', width / 2, height / 2);
    }
}

function checkCollision(player, tile) {
    return (
        player.x < tile.x + tile.width &&
        player.x + player.width > tile.x &&
        player.y < tile.y + tile.height &&
        player.y + player.height > tile.y
    );
}

class MovingWall {
    constructor(x, y, width, height, speed, direction, range) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction;
        this.range = range;
    }

    update() {
        this.x += this.speed * this.direction;

        if (abs(this.x - this.startX) > this.range) {
            this.direction *= -1;
        }
    }

    display() {
        fill(0, 0, 255);
        rect(this.x, this.y, this.width, this.height);
    }
}

class Weapon {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = 15;
        this.width = 10;
        this.height = 20;
        this.weaponType = "pistol";
        this.bulletLimit = 20;
        this.bulletsFired = 0;
    }


    update() {
        this.y += this.speed;

        let tileSize = map.tileSize;

        for (let row = 0; row < map.grid.length; row++) {
            for (let col = 0; col < map.grid[row].length; col++) {
                if (map.grid[row][col] === 1) {
                    let tile = {x: col * tileSize, y: row * tileSize, width: tileSize, height: tileSize};

                    if (checkCollision(this, tile)) {
                        //handle floor collsion (landing on top)
                        this.speed = 0;
                        this.y = tile.y - this.height;
                    }
                }
            }
        }


    }

    display() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}

class Bullet {
    constructor(x, y, vx, vy, shooter) {
        if (isNaN(x) || isNaN(y)) {
            console.error("Invalid bullet parameters", { x, y, direction, shooter });
            return;
        }
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        this.vx = vx;
        this.vy = vy;
        this.shooter = shooter;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        let tileSize = map.tileSize;

        for (let row = 0; row < map.grid.length; row++) {
            for (let col = 0; col < map.grid[row].length; col++) {
                if (map.grid[row][col] === 1) {
                    let tile = {x: col * tileSize, y: row * tileSize, width: tileSize, height: tileSize};

                    if (checkCollision(this, tile)) {
                        //handle floor collsion (landing on top)
                        bullets.splice(bullets.indexOf(this), 1);
                        return;
                    }
                }
            }
        }
    }

    shoots(player) {
        return player.collidesWith(this);
    }

    display() {
        if (isNaN(this.x) || isNaN(this.y)) {
            console.error("Bullet position is NaN", this);
            return;
        }
        fill(255, 255, 0);
        rect(this.x, this.y, this.width, this.height);
    }
}




class Map {
    constructor() {
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        ];
        this.rows = this.grid.length;
        this.cols = this.grid[0].length;
        this.tileSize = 45;
    }

    display() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let tileType = this.grid[i][j];
                if (tileType === 1) {
                    fill(200);
                    rect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                } else if (tileType === 2) {
                    fill(0, 255, 0);
                    rect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }

}
