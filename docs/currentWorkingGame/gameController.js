function startGame() {
    noLoop();
    console.log("starting game");

    roundNum = 1;

    let player1Sprite = parseInt(localStorage.getItem("selectedCharacterIndex0"));
    let player2Sprite = parseInt(localStorage.getItem("selectedCharacterIndex1"));

    players[0] = new Player(0, 150, 200, 65, 68, 87, 32, player1Sprite);  
    players[1] = new Player(1, 1075, 200, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, ENTER, player2Sprite);  // Player 2 (Arrow Keys + Enter)
    //players[1] = new AIPlayer(1, 1075, 200, player2Sprite);
    gameStarted = true;
    loop();
}

/* function setup() {
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
    //players[1] = new Player(1, 1075, 200, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, ENTER, playerSprites[1]);  // Player 2 (Arrow Keys + Enter)
    players[1] = new AIPlayer(1, 1075, 200, playerSprites[1]);  // Player 2 (Arrow Keys + Enter)

    //movingWalls.push(new MovingWall(100, 150, 50, 10, 2, 1, 30)); // Moves within a range of 30 pixels
    //movingWalls.push(new MovingWall(300, 220, 80, 10, 1.5, -1, 40)); // Moves within a range of 40 pixels 
} */

/* function draw() {
    background(100);

    if (!map) {
        console.error("Map is not defined before calling draw!");
        return;
    }

    //load new map for each round 
    //map = maps[roundNum - 1];
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
} */

/* function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
} */

function initMaps() {
    maps = [
        new Map([
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ], 
        { 0: null, 1: null, 2: null, 3: null}, 
        null
        ),
        new Map([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        ],
        { 0: null, 1: "desert_tile_1", 2: "desert_tile_float1", 3: "desert_tile_water"}, 
        "desert", 
        [
            { key: "cloud1", speed: 0.9, direction: -1, startX: width, startY: 100},
            { key: "cloud2", speed: 0.05, direction: -1, startX: 0, startY: 410},
            { key: "cloud3", speed: 0.8, direction: -1, startX: 0, startY: 150},
            { key: "desert_mountain_peak", speed: 0.2, direction: -1, startX: 0, startY: height - 400},
            { key: "desert_sand_layer", speed: 0.7, direction: -1, startX: 0, startY: 130},
            { key: "desert_sand_layer1", speed: 0.9, direction: -1, startX: 0, startY: 150},
            { key: "desert_sand_layer2", speed: 1.1, direction: -1, startX: 0, startY: 170},
        ]
        ),
        new Map([
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
            [1, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 1],
            [3, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 3],
            [3, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 3],
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 0, 0, 0, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 0, 0, 0, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3],
            [3, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 0, 0, 0, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 3],
            [3, 2, 2, 2, 2, 2, 2, 1, 3, 2, 3, 3, 0, 0, 0, 3, 3, 2, 3, 1, 2, 2, 2, 2, 2, 2, 3],
            [3, 2, 2, 2, 2, 2, 1, 3, 2, 2, 3, 3, 0, 0, 0, 3, 3, 2, 2, 3, 1, 2, 2, 2, 2, 2, 3],
            [3, 2, 2, 2, 2, 1, 3, 2, 2, 2, 3, 3, 0, 0, 0, 3, 3, 2, 2, 2, 3, 1, 2, 2, 2, 2, 3],
            [3, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 2, 3],
            [3, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3],
        ],
        { 0: null, 1: "underground_platform1", 2: "underground_wall1", 3: "underground_platform2"}, 
        "underground",
        [
            { key: "underground_layer1", ySpeed: 0.5, yDirection: -1, startX: -30, startY: 0},
            { key: "underground_layer2", ySpeed: 0.7, yDirection: -1, startX: 140, startY: 0},
            { key: "underground_layer3", ySpeed: 0.9, yDirection: -1, startX: width/2-345, startY: 0},
        ], 
        "vertical"
        ),
        new Map([
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
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        ],
        { 0: null, 1: "sky_platform1", 2: "sky_platform2", 3: "desert_cactus"},
        "sky", [
        { key: "sky_layer1", speed: 0.5, direction: -1, startX: 0, startY: -100},
        ],
      )
    ];
    console.log("Maps Successfully loaded");
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
        if (winner.index === undefined) {
            console.error("Error: playerIndex is undefined for winner:", winner);
            return null;
        }

        // Retrieve the sprite name from localStorage
        let winnerSprite = localStorage.getItem(`selectedCharacter${winner.index}`);

        // If the sprite is not found, use a fallback name
        if (!winnerSprite) {
            winnerSprite = `Player ${winner.playerIndex + 1}`;
        }

        push();
        textSize(32);
        fill(255);
        textAlign(CENTER);

        // Display winner's sprite name
        text(`${winnerSprite} wins round ${roundNum}`, width / 2, height / 2);
        
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
                let tileNum = map.grid[row][col];
                if (tileNum > 0 && map.tileMapping[tileNum] !== "underground_wall1") {
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
                let tileNum = map.grid[row][col];
                if (tileNum > 0 && map.tileMapping[tileNum] !== "underground_wall1") {
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
    static tileBlockImages = {};
    static backgroundImages = {};
    static backgroundObjects = {};

    constructor(grid, tileMapping, backgroundImageKey, backgroundObjects = [], scrollDirection = "horizontal") {
        this.grid = grid;
        this.tileMapping = tileMapping;
        this.rows = this.grid.length;
        this.cols = this.grid[0].length;
        this.tileSize = 45;
        this.backgroundImageKey = backgroundImageKey;
        this.scrollDirection = scrollDirection;

        this.backgroundObjects = backgroundObjects.map(obj => ({
            key: obj.key,
            speed: obj.speed || 0, // Default 0 if no speed is set
            direction: obj.direction || 0, // Default moves left (-1)
            x: obj.startX || 0, // Starting X position
            y: obj.startY || 0, // Starting Y position
            ySpeed: obj.ySpeed || 0, // Vertical speed
            yDirection: obj.yDirection || 0, // Up (-1) or Down (1)
            yRange: obj.yRange || 0, // Max movement range in Y
            yStart: obj.startY || 0, // Keep track of original Y for oscillation
        }));

        this.animationFrame = 0;
        this.frameDelay = 10;
    }

    static preLoadTiles() {
        this.tileBlockImages["desert_tile_float1"] = loadImage('assets/maps/desert_map/desert_platforms/desert_tile_float1.png');
        this.tileBlockImages["desert_tile_1"] = loadImage('assets/maps/desert_map/desert_platforms/desert_tile.png');

        this.tileBlockImages["desert_tile_water"] = [
            loadImage('assets/maps/desert_map/desert_platforms/water_tile1.png'),
            loadImage('assets/maps/desert_map/desert_platforms/water_tile2.png'),
            loadImage('assets/maps/desert_map/desert_platforms/water_tile3.png'),
        ];

        this.tileBlockImages["underground_platform1"] = loadImage('assets/maps/underground_map/underground_platforms/underground_platform1.png');
        this.tileBlockImages["underground_platform2"] = loadImage('assets/maps/underground_map/underground_platforms/underground_platform2.png');
        this.tileBlockImages["underground_wall1"] = loadImage('assets/maps/underground_map/underground_platforms/underground_wall1.png');

        this.tileBlockImages["sky_platform1"] = loadImage('assets/maps/sky_map/sky_platforms/cloud_platform1.png');
        this.tileBlockImages["sky_platform2"] = loadImage('assets/maps/sky_map/sky_platforms/cloud_platform2.png');
    }

    static preLoadBackgroundImages() {
        this.backgroundImages["desert"] = loadImage('assets/maps/desert_map/desert_background.png');
        this.backgroundImages["underground"] = loadImage('assets/maps/underground_map/underground_background.png');
        this.backgroundImages["sky"] = loadImage('assets/maps/sky_map/sky_background.png');
        
    }

    static preLoadBackgroundObjects() {
        this.backgroundObjects["cloud1"] = loadImage('assets/maps/desert_map/cloud_1.png');
        this.backgroundObjects["cloud2"] = loadImage('assets/maps/desert_map/cloud_2.png');
        this.backgroundObjects["cloud3"] = loadImage('assets/maps/desert_map/cloud_3.png');
        this.backgroundObjects["desert_mountain_peak"] = loadImage('assets/maps/desert_map/desert_mountain_peak.png');
        this.backgroundObjects["desert_sand_layer"] = loadImage('assets/maps/desert_map/desert_sand_layer.png');
        this.backgroundObjects["desert_sand_layer1"] = loadImage('assets/maps/desert_map/desert_sand_layer1.png');
        this.backgroundObjects["desert_sand_layer2"] = loadImage('assets/maps/desert_map/desert_sand_layer2.png');

        this.backgroundObjects["underground_layer1"] = loadImage('assets/maps/underground_map/underground_layer1.png');
        this.backgroundObjects["underground_layer2"] = loadImage('assets/maps/underground_map/underground_layer2.png');
        this.backgroundObjects["underground_layer3"] = loadImage('assets/maps/underground_map/underground_layer3.png');

        this.backgroundObjects["sky_layer1"] = loadImage('assets/maps/sky_map/sky_layer1.png');
        console.log("All background objects images preloaded.");
    }

    updateAnimation() {
        if (frameCount % this.frameDelay === 0) {
            this.animationFrame = (this.animationFrame + 1) % 3; // Cycle through 0, 1, 2
        }
    }

    updateBackgroundObjects() {
        for (let obj of this.backgroundObjects) {
            let img = Map.backgroundObjects[obj.key]; 
            if (!img) continue; 
    
            // For horizontal scrolling maps:
            if (this.scrollDirection === "horizontal") {
                if (obj.speed !== 0) {
                    obj.x += obj.speed * obj.direction;
                    // When the object completely moves off the left or right, loop it:
                    if (obj.direction === -1 && obj.x <= -img.width) {
                        obj.x += img.width * 2;
                    } else if (obj.direction === 1 && obj.x >= width) {
                        obj.x = -img.width;
                    }
                }
            }
            // For vertical scrolling maps:
            else if (this.scrollDirection === "vertical") {
                if (obj.ySpeed !== 0) {
                    obj.y += obj.ySpeed * obj.yDirection;
                    // Instead of using canvas height, use the image's natural height for looping.
                    if (obj.yDirection === -1 && obj.y <= -img.height) {
                        obj.y += img.height;
                    } else if (obj.yDirection === 1 && obj.y >= img.height) {
                        obj.y = -img.height;
                    }
                }
            }
        }
        console.log("All background objects images updated.");
    }

    display() {
        if (Map.backgroundImages[this.backgroundImageKey]) {
            image(Map.backgroundImages[this.backgroundImageKey], 0, 0, width, height);
        } else {
            background(100); // Default fallback
        }

        for (let obj of this.backgroundObjects) {
            let img = Map.backgroundObjects[obj.key];
            if (img && img.width > 0) {
              image(img, obj.x, obj.y, img.width, img.height);
              if (this.scrollDirection === "horizontal") {
                image(img, obj.x + img.width, obj.y, img.width, img.height);
                image(img, obj.x - img.width, obj.y, img.width, img.height);
              } else if (this.scrollDirection === "vertical") {
                image(img, obj.x, obj.y - img.height, img.width, img.height);
                image(img, obj.x, obj.y + img.height, img.width, img.height);
              }
            }
          }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let tileType = this.grid[i][j];
                let tileName = this.tileMapping[tileType]; // Convert number to tile name
                
                if (tileName === "desert_tile_water" && Map.tileBlockImages["desert_tile_water"]) {
                    let frame = Map.tileBlockImages["desert_tile_water"][this.animationFrame]; // Get current frame
                    image(frame, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                } else if (Map.tileBlockImages[tileName]) {
                    image(Map.tileBlockImages[tileName], j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }

}
