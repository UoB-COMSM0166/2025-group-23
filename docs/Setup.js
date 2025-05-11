let homePage, settingsPanel, instructionsPanel, characterPage, winScreen;
let pixelFont, mainBackground;;
let soundManager, spriteManager;
let selectedMap = '';
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
let startGameTimeout, loadingScreenTimeout;
let gameOverTime;
let winSoundPlayed = false;

function preload() {
  spriteManager = new SpriteManager();
  spriteManager.preloadSprites();

  soundManager = new SoundManager();
  soundManager.preloadSounds();
  soundManager.preloadMusic();

  GameMap.preLoadTiles();
  GameMap.preLoadBackgroundImages();
  GameMap.preLoadBackgroundObjects();

  Weapon.preloadWeapons();
  Bullet.preloadCollisionFX();
  Bullet.preloadBulletImages();
  Items.preloadHealthIcon();
  Items.preloadGameBarImages();
  Items.preloadWeaponIcon();
  Items.preloadAmmoImage();
  Items.preloadAmmoIcon();
  Items.preloadPlayerStars();
  PowerUps.preloadHealthRegenPU();
  PowerUps.preloadShieldPU();

  WinScreen.preloadWinIcons();

  mainBackground = loadImage('assets/mainMenu/main-background2.png');
  pixelFont = loadFont('assets/fonts/pixel.ttf');
}

function setup() {
  
  createCanvas(1215, 860);
  background(150);
  initMaps();

  homePage = new HomePage();
  if (!soundManager.muteMusic) {
    soundManager.playMusic('gameMusic');
  }
  characterPage = new CharacterPage();
  settingsPanel = new SettingsPanel();
  winScreen = new WinScreen();
  instructionsPanel = new InstructionsPanel();
}

function draw() {
  background(100);

  map = maps[roundNum];
  map.updateBackgroundObjects();
  map.updateAnimation();
  map.display();
  Items.displayGameBarImages();

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

  Items.update(); 
  soundManager.playMusic('gameMusic');

  // check if round is over, start next round after 5 seconds
  let winner = checkRoundOver();
  if (winner !== null && !roundOver) {
      setWinner(winner);
      roundOver = true;
      roundWinner = winner;
      soundManager.playSound('roundWin');
      //soundManager.playSound('playerDeath');
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

  PowerUps.update();
  PowerUps.displayPowerUps();
  
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

  for (let i = bullets.length - 1; i >= 0; i--) {
    let b = bullets[i];
    b.update();
    b.display();
    if ((b.exploding || b.hitplayer) && b.explodingFinished) {
      bullets.splice(i, 1);
    }
  }

  for (let player of players) {
    player.update();
    player.display();
    PowerUps.healthRegenConsume(player);
    PowerUps.shieldConsume(player);
  }

  Items.displayGameBarImages();

  let healthBarPaddingY = Items.gameBar.height - 55;
  let healthBarPaddingX = 70;
  let playerStarPaddingX = 52;

  if (players[0]) {
    drawHealthBar1(players[0], healthBarPaddingX, height - healthBarPaddingY, 300, 20);
    Items.displayPlayer1Stars(width/2 - 125, height - playerStarPaddingX);
    Items.displayHealthIcon(healthBarPaddingX, height - healthBarPaddingY +8);
    if (players[0].weapon) {
      Items.displayWeaponIcon(players[0].weapon.weaponType, map.tileSize / 2, map.tileSize / 2);
      Items.displayAmmoImage(players[0], healthBarPaddingX + 170, height - healthBarPaddingY - 40);
    }
    Items.displayAmmoIcon(healthBarPaddingX + 152, height - healthBarPaddingY - 28);
  }

  if (players[1]) {
    drawHealthBar2(players[1], width - healthBarPaddingX - 300, height - healthBarPaddingY, 300, 20);
    Items.displayPlayer2Stars(width/2 + 125, height - playerStarPaddingX);
    Items.displayHealthIcon(width - healthBarPaddingX, height - healthBarPaddingY +8);
    if (players[1].weapon) {
      Items.displayWeaponIcon(players[1].weapon.weaponType, (width - map.tileSize) - (50/ 2), map.tileSize / 2);
      Items.displayAmmoImage(players[1], width - healthBarPaddingX - 300, height - healthBarPaddingY - 40);
    }
    Items.displayAmmoIcon(width - healthBarPaddingX - 155, height - healthBarPaddingY - 28);
  }

  checkGameOver();
}

function hideAllButtons() {
  settingsPanel.hide();
  instructionsPanel.hide();
  characterPage.hide();
  homePage.hide();
}

