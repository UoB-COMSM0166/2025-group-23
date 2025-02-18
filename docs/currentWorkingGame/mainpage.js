let player1Panel, player2Panel;
let player1Button, player2Button;
let selectedSprites = [null, null];
let spriteManager = new SpriteManager();

let map = null;
let maps = [];
let players = [];
let weapons = [];
let bullets = [];
let movingWalls = [];
let gameStarted = false;
let player1Score = 0, player2Score = 0;
let roundNum = 0;
let roundOver = false;
let finalScore = 3;
let gameOver = false;
let main;
let mainMenu = [];

function preload() {
  spriteManager.preloadSprites();
  Map.preLoadTiles();
  Map.preLoadBackgroundImages();
  Map.preLoadBackgroundObjects();
  MainPage.preLoadMainPageObjects();
}

function setup() {
  createCanvas(1215, 760);
  background(150);
  initMaps();

  // Create selection panels for both players
  player1Panel = new CharacterPanel(0, (index) => {
      selectedSprites[0] = index;
      checkStartGame();
  });

  player2Panel = new CharacterPanel(1, (index) => {
      selectedSprites[1] = index;
      checkStartGame();
  });

  mainMenu = [
    new MainPage
    (
      { key: "title_logo", x: width / 2, y: height / 2},
      { key: "title_logo2", x: width/4, y: height/4}
    )
  ];

  // Create buttons to open the selection panels
  player1Button = createButton("Player 1");
  player1Button.position((width / 2) - 60, height / 2 - 50);
  player1Button.mousePressed(() => player1Panel.show());

  player2Button = createButton("Player 2");
  player2Button.position((width / 2) - 60, height / 2);
  player2Button.mousePressed(() => player2Panel.show());
}

function checkStartGame() {
  if (selectedSprites[0] !== null && selectedSprites[1] !== null) {
    console.log("Both players selected! Starting game...");
    player1Button.hide();
    player2Button.hide();
    startGame();
  }
}

function draw() {
  background(100);

  if(!gameStarted) {

    for (let obj of mainMenu) {
      obj.display();
    }
    textAlign(CENTER);
    textSize(32);
    fill(255);
    text("Select Your Character", width / 2, height / 2 - 100);
    return; // Stop execution here until game starts
  }

  map = maps[roundNum]; // 🎯 Guaranteed to be initialized now!
  map.updateBackgroundObjects();
  map.updateAnimation();
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
    if (frameCount % 400 === 0) {
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

class MainPage {
  static mainPageObjects = {};

  // Preload your main menu assets.
  static preLoadMainPageObjects() {
    // Load your logo (or any main menu image) and store it by key.
    MainPage.mainPageObjects["title_logo"] = loadImage('assets/mainMenu/Logo.png');
    MainPage.mainPageObjects["title_logo2"] = loadImage('assets/mainMenu/Logo2.png');

  }

  // The constructor takes an object with properties such as key, x, y, and optionally width and height.
  constructor(obj) {
    this.key = obj.key;     // For example, "title_logo"
    this.x = obj.x;         // x-coordinate where you want the image to appear
    this.y = obj.y;         // y-coordinate
    // Optional: specify a width and height (if you want to scale)
    // If not provided, the image is drawn at its natural dimensions.
    this.width = obj.width;
    this.height = obj.height;
  }

  // The display() method draws the image.
  display() {
      let img = MainPage.mainPageObjects[this.key];
      if (img) {
        imageMode(CENTER);
        if (this.width && this.height) {
          image(img, this.x, this.y, this.width, this.height);
        } else {
          image(img, this.x, this.y);
        }
      }
  }
}

class CharacterPanel {
  constructor(playerIndex, onSelect) {
    this.playerIndex = playerIndex; // 0 for Player 1, 1 for Player 2
    this.onSelect = onSelect;

    // Create panel UI
    this.panel = createDiv(`
        <p>PLAYER ${playerIndex + 1} SELECT</p>
        <button id="closeChar-btn${playerIndex}" type="button" style="cursor: pointer;">X</button>
        <button id="charChicken-btn${playerIndex}" style="cursor: pointer;">Chicken</button>
        <button id="charCrab-btn${playerIndex}" style="cursor: pointer;">Crab</button>
        <button id="charDog-btn${playerIndex}" style="cursor: pointer;">Dog</button>
    `);

    this.panel.id(`characters${playerIndex}`);
    this.panel.position(250, 250);
    this.panel.style('display', 'none');
    this.panel.style('background-color', 'white');
    this.panel.style('border', '2px solid black');
    this.panel.style('padding', '20px');
    this.panel.style('z-index', '10');

    this.setupButtons();
  }

  setupButtons() {
    select(`#closeChar-btn${this.playerIndex}`).mousePressed(() => this.hide());
    select(`#charChicken-btn${this.playerIndex}`).mousePressed(() => this.selectCharacter(0, 'Chicken'));
    select(`#charCrab-btn${this.playerIndex}`).mousePressed(() => this.selectCharacter(1, 'Crab'));
    select(`#charDog-btn${this.playerIndex}`).mousePressed(() => this.selectCharacter(2, 'Dog'));
  }

  show() {
    this.panel.style('display', 'block');
    }

  hide() {
    this.panel.style('display', 'none');
  }

  selectCharacter(index, spriteName) {
    localStorage.setItem(`selectedCharacter${this.playerIndex}`, spriteName);
    localStorage.setItem(`selectedCharacterIndex${this.playerIndex}`, index);
    console.log(`Player ${this.playerIndex + 1} selected: ${spriteName}`);

    this.hide();
    this.onSelect(index);
  }
}

