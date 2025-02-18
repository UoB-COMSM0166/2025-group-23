let map;
let maps = [];
let players = [];
let weapons = [];
let bullets = [];
let movingWalls = [];
let gameStarted = false;
let player1Score = 0, player2Score = 0;
let roundNum = 1;
let roundOver = false;
let finalScore = 3;
let gameOver = false;
let playerSprites = [];

function setup() {
    createCanvas(1215, 760);
    

    // initialise maps 1, 2, 3
    maps[0] = new Map([
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
    ]);

    maps[1] = new Map([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);

    maps[2] = new Map([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    ]);

    //initialise player 1 and player 2
   let totalSprites = 3;
   let availableSprites = Array.from({ length: totalSprites }, (_, i) => i);

   shuffleArray(availableSprites);

   let firstPlayerSprite = availableSprites.pop();
   let secondPlayerSprite = availableSprites.pop();

    playerSprites = [firstPlayerSprite, secondPlayerSprite];
    players[0] = new Player(0, 150, 200, 65, 68, 87, 32, playerSprites[0]);  // Player 1 (WASD + Space)
    players[1] = new AIPlayer(1, 1075, 200, playerSprites[1]);  // Player 2 (Arrow Keys + Enter)

     
    //players[1] = new Player(1, 1075, 200, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, ENTER, playerSprites[1]);  // Player 2 (Arrow Keys + Enter)
    

    /* movingWalls.push(new MovingWall(100, 150, 50, 10, 2, 1, 30)); // Moves within a range of 30 pixels
    movingWalls.push(new MovingWall(300, 220, 80, 10, 1.5, -1, 40)); // Moves within a range of 40 pixels */
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function draw() {
    background(100);

    //load new map for each round 
    map = maps[roundNum - 1];
    map.display();

    // check if round is over, start next round after 5 seconds
    let winner = checkRoundOver();
    if (winner !== null && !roundOver) {
        setWinner(winner);
        roundOver = true;
        if (player1Score < finalScore && player2Score < finalScore) {
            setTimeout(resetRound, 5000);
        }
    }

    for (let wall of movingWalls) {
        wall.update();
        wall.display();

        for (let player of players) {
            if (player.landsOn(wall)) {
                player.landOnPlatform(wall);
            }
        }
    }

    let paddingWeapon = 100;
    if (!gameStarted && frameCount > 60 * 3) {
        let weaponNum = random();
        dropWeapon(weaponNum, paddingWeapon, width / 2 - paddingWeapon);
        dropWeapon(weaponNum, paddingWeapon + width / 2, width - paddingWeapon);
        gameStarted = true;

        //drop weapons left and right side
        setInterval(() => {
            let newWeaponNum = random();
            dropWeapon(newWeaponNum, paddingWeapon, width / 2 - paddingWeapon);
            dropWeapon(newWeaponNum, paddingWeapon + width / 2, width - paddingWeapon);
        }, 9000);
    }

    for (let i = weapons.length - 1; i >= 0; i--) {
        let weapon = weapons[i];
        //if a weapon falls below the map, discount this one from the array. 
        if (weapon.y > height) {
            weapons.splice(i, 1);
            continue;
        }
        weapon.display();
        weapon.update();
        for (let player of players) {
            if (player.collidesWith(weapon)) {
                player.pickupWeapon(weapon);
                weapons.splice(i, 1);
                break;
            }
        }
    }

    for (let bullet of bullets) {
        bullet.update();
        bullet.display();

        for (let player of players) {
            if (bullet.shoots(player) && player !== bullet.shooter) {  // Only damage opponents
                if(!roundOver) {
                    player.takeDamage(10);
                }
                bullets.splice(bullets.indexOf(bullet), 1);
            }
        }
    }

    for (let player of players) {
        player.update();
        player.display();
    }
    
    // draw score board for player 1 and player 2
    push();
    drawScore(player1Score, LEFT, map.tileSize, map.tileSize);
    drawScore(player2Score, RIGHT, width - map.tileSize, map.tileSize);
    pop();

    checkGameOver();
}

function drawScore(playerScore, alignment, x , y) {
    textSize(32);
    fill(255);
    textAlign(alignment);
    text(playerScore, x, y);
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

function dropWeapon(weaponNum, min, max) {
    //create no more than 4 weapons at all times. 
    if (weapons.length < 4) {
        let x = random(min, max);
        let y = 0;
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
}

// retur the winner when reach final score
function getWinner() {
    if (player1Score >= finalScore) {
        return players[0];
    } 
    else if (player2Score >= finalScore) {
        return players[1];
    }
}

function setWinner(winner) {
    if (players[0] === winner) {
        player1Score++;
    } else if (players[1] === winner) {
        player2Score++;
    }
}

function resetRound() {
    //reset all players to max health and original position, increment score. start loop again. 
    for (let player of players) {
        player.health = 100;
        player.weapon = null;
    }
    players[0].x = 150;
    players[0].y = 200;
    players[1].x = 1075;
    players[1].y = 200;
    bullets = [];
    weapons = [];
    roundOver = false;
    roundNum++;
    loop();
}

function checkRoundOver() {
    //check if health is 0 then set round as over. 
    let alivePlayers = players.filter(p => p.health > 0);
    if (alivePlayers.length === 1) {
        //noLoop();
        let winner = alivePlayers[0];
        push();
        textSize(32);
        fill(255);
        textAlign(CENTER);
        text(winner.color + ' player wins round ' + roundNum, width / 2, height / 2);
        pop();
        return winner;
    }
    return null;
}

function checkGameOver() {
    // when player reach final score, show end game screen. 
    let winner = getWinner();
    let rectW = 700;
    let rectH = 400;
    let rectX = width/2 - (rectW/2);
    let rectY = height/2 - (rectH/2);
    
    if (player1Score >= finalScore || player2Score >= finalScore) {
        gameOver = true;
        push()
        translate(rectX, rectY);
        stroke('white');
        strokeWeight(1);
        fill('black');
        rect(0, 0, rectW, rectH);
        textSize(32);
        fill('white');
        textAlign(CENTER, CENTER);
        let winningPlayer = (player1Score === finalScore) ? "PLAYER 1" : "PLAYER 2";
        text(winningPlayer + " WINS!", rectW / 2, rectH / 2);
        pop();
        noLoop();
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
    constructor(grid) {
        this.grid = grid;
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
