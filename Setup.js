let spriteManager = new SpriteManager();
let characterNames = ["Chicken", "Crab", "Dog"];

let homePage, settingsPanel, instructionsPanel, characterPage;
let pixelFont;
let soundManager;
let selectedMap = ''; 
let mainBackground;

let map = null;
let maps = [];
let players = [];
let weapons = [];
let bullets = [];
let movingWalls = [];
let gameStarted = false;
let gameInitalised = false;
let player1Score = 0, player2Score = 0;
let roundNum = 0;
let roundOver = false;
let roundWinner;
let finalScore = 3;
let gameOver = false;
let gamePaused = false;
let countdownActive = false;
let countdownStartTime = 0;
let startGameTimeout;

function preload() {
  spriteManager.preloadSprites();
  Map.preLoadTiles();
  Map.preLoadBackgroundImages();
  Map.preLoadBackgroundObjects();
  Weapon.preloadWeapons();

  mainBackground = loadImage('assets/mainMenu/main-background.jpg');
  pixelFont = loadFont('assets/fonts/pixel.ttf');

  soundManager = new SoundManager();
  soundManager.preloadSounds();
}

function setup() {
  createCanvas(1215, 760);
  background(150);
  initMaps();

  homePage = new HomePage();
  characterPage = new CharacterPage();
  settingsPanel = new SettingsPanel();
 
}

function draw() {
  background(100);

  map = maps[roundNum];
  map.updateBackgroundObjects();
  map.updateAnimation();
  map.display();

  if(countdownActive) {
    let elapsed = millis() - countdownStartTime;
    let countdownText = "";

    if (elapsed < 1000) {
      countdownText = "3";
    } else if (elapsed < 2000) {
      countdownText = "2";
    } else if (elapsed < 3000) {
      countdownText = "1";
    } else if (elapsed < 4000) {
      countdownText = "FIGHT";
    } else {
      countdownActive = false; 
      gameStarted = true;
      loop();
    }

    textFont(pixelFont);
    textSize(100);
    fill(255);
    textAlign(CENTER, CENTER);
    text(countdownText, width/2, height/2);
    return;
  }

  // check if round is over, start next round after 5 seconds
  let winner = checkRoundOver();
  if (winner !== null && !roundOver) {
      setWinner(winner);
      roundOver = true;
      roundWinner = winner;
      soundManager.playSound('roundWin');
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
  if (gameStarted && !roundOver && frameCount % 400 === 0) {
      console.log("dropping weapons");
      let weaponNum = random();
      dropWeapon(weaponNum, paddingWeapon, width / 2 - paddingWeapon);
      dropWeapon(weaponNum, paddingWeapon + width / 2, width - paddingWeapon);
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
      if (player.collidesWith(weapon) && !roundOver) {
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
          soundManager.playSound('hit');
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

function hideAllButtons() {
  //controlButton.hide();
  //mapButton.hide();
  //player1Button.hide();
  //player2Button.hide();
  settingsPanel.hide();
  //instructionsPanel.hide();
  //mapPage.hide();
  characterPage.hide();
  homePage.hide();
}

