let mapButton, player1Button, player2Button;
let homePage, settingsPanel, instructionsPanel, mapPage, characterPage;
let music, logo, chicken_right2, dog_left2;
let musicMuted = false; 
let gameStarted = false;
let selectedMap = ''; 
let skyMap, groundMap, oceanMap;
//let controlButton;

function preload() {
  music = loadSound('assets/intense-trailer-dynamics-cinematic-orchestral-suspense-288595.mp3');
  music.setVolume(1);
  skyMap = loadImage('assets/sky-map.png'); 
  //groundMap = loadImage('assets/ground-map.png'); 
  //oceanMap = loadImage('assets/ocean-map.png'); 
  logo = loadImage('assets/take_aim.png');
  chicken_right2 = loadImage('assets/chicken_right2.png');
  dog_left2 = loadImage('assets/dog_left2.png');
}

function setup() {
  createCanvas(1215, 760);
  instructionsPanel = new InstructionsPanel();
  homeSettingsPanel = new SettingsPanel(false, instructionsPanel);
  gameSettingsPanel = new SettingsPanel(true, instructionsPanel);
  mapPage = new MapPage();
  characterPage = new CharacterPage();
  homePage = new HomePage();

  //controlButton = new Button('Control', 250, 520, () => instructionsPanel.show());
  //mapButton = new Button('Map', 250, 280, () => mapPage.show());
  //player1Button = new Button('Player1', 250, 320, () => characterPage.show());
  //player2Button = new Button('Player2', 250, 350, () => characterPage.show());

  //new Button('Setting', 470, 19, () => settingsPanel.show());
  //new Button('Play Music', 10, 10, () => {
    //music.play();    
  //});

  selectedMap = localStorage.getItem('selectedMap') || '';
}

function draw() {
  background(255);

  if (gameStarted) {
    text('Game is running...', 200, 300);
    gameSettingsPanel.show();
    homeSettingsPanel.hide();

    if (selectedMap === 'Sky') {
      image(skyMap, 0, 0, width, height);
    } else if (selectedMap === 'Ground') {
      image(groundMap, 0, 0, width, height);
    } else if (selectedMap === 'Ocean') {
      image(oceanMap, 0, 0, width, height);
    }
    homePage.hide(); 
    } else {
      homePage.show(); 
    }
  } 

  function keyPressed() {
    if (characterPage.page.style('display') === 'block') {
      characterPage.keyPressed(); // Call the keyPressed function in CharacterPage if it's visible
    } else if (homePage) {
      homePage.keyPressed(); // Handle key press for the homepage if the character page isn't shown
    }
  }
  
function hideAllButtons() {
  //controlButton.hide();
  mapButton.hide();
  player1Button.hide();
  player2Button.hide();
  settingsPanel.hide();
  instructionsPanel.hide();
  mapPage.hide();
  characterPage.hide();
  homePage.hide();
}

function checkStartGame() {
  if (localStorage.getItem("selectedCharacterIndex0") !== null && localStorage.getItem("selectedCharacterIndex1") !== null) {
    console.log("Both players selected! Starting game...");
    player1Button.hide();
    player2Button.hide();
    startGame();
  }
}

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
