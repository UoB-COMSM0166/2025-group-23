function checkStartGame() {
  if (!gameInitalised && localStorage.getItem("selectedCharacterIndex0") !== null && localStorage.getItem("selectedCharacterIndex1") !== null) {
    console.log("Both players selected! Starting game...");
    gameInitalised = true;
    soundManager.stopMusic('gameMusic');
    hideAllButtons();
    startGame();
  }
}

function startGame() {
  roundNum = 1;
  map = maps[roundNum];
  player1Score = 0;
  player2Score = 0;
  weapons = [];

  let player1Sprite = parseInt(localStorage.getItem("selectedCharacterIndex0"));
  let player2Sprite = parseInt(localStorage.getItem("selectedCharacterIndex1"));

  players[0] = new Player(0, 200, 200, 65, 68, 87, 32, player1Sprite);  

  if (characterPage.playerCount === 1) {
      players[1] = new AIPlayer(1, width - 210, 200, player2Sprite);
  } 
  else if (characterPage.playerCount === 2) {
      players[1] = new Player(1, width - 210, 200, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, ENTER, player2Sprite);  // Player 2 (Arrow Keys + Enter)
  }
  
  soundManager.playSound('gamestart');
  soundManager.playSound('countdown');
  countdownActive = true;
  countdownStartTime = millis();

  hideAllButtons();
  console.log("Starting Game. Player Count: " + characterPage.playerCount);
}

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
          { key: "desert_mountain_peak", speed: 0.2, direction: -1, startX: 0, startY: height - 500},
          { key: "desert_sand_layer", speed: 0.7, direction: -1, startX: 0, startY: 130},
          { key: "desert_sand_layer1", speed: 1.1, direction: -1, startX: 0, startY: 150},
          { key: "desert_sand_layer2", speed: 1.4, direction: -1, startX: 0, startY: 170},
      ]
      ),
      new Map([
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
          [1, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 1],
          [3, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 3],
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 0, 0, 0, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 0, 0, 0, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
          [1, 1, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 0, 0, 0, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 1, 1],
          [3, 2, 2, 2, 2, 2, 2, 1, 3, 2, 3, 3, 0, 0, 0, 3, 3, 2, 3, 1, 2, 2, 2, 2, 2, 2, 3],
          [2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 3, 3, 0, 0, 0, 3, 3, 2, 2, 3, 1, 2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 3, 3, 0, 0, 0, 3, 3, 2, 2, 2, 3, 1, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 2, 2],
          [2, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2],
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
          [0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      { 0: null, 1: "sky_platform1", 2: "sky_platform2", 3: "desert_cactus"},
      "sky", [
      { key: "sky_layer1", speed: 0.5, direction: -1, startX: 0, startY: 155},
      { key: "sky_layer2", speed: 0.8, direction: -1, startX: 0, startY: 155},
      { key: "sky_layer3", speed: 1, direction: -1, startX: 0, startY: 155},
      { key: "sky_layer4", speed: 1.2, direction: -1, startX: 0, startY: 155},
      ],
    ),
      new Map([
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      { 0: null, 1: "ocean_platform1",},
      "ocean", [
      { key: "ocean_layer1", speed: 0.5, direction: -1, startX: 0, startY: -60},
      { key: "ocean_layer2", speed: 0.9, direction: -1, startX: 0, startY: -500},
      { key: "ocean_layer3", speed: 1.8, direction: -1, startX: 0, startY: 0},
      { key: "ocean_layer4", speed: 1.2, direction: -1, startX: 0, startY: -100},
      ],
  )];
  console.log("Maps Successfully loaded");
}

function drawHealthBar1(player, x, y, barWidth, barHeight) {
    push();
    fill(50);
    rect(x, y, barWidth, barHeight);

    let healthRed = 0;
    let healthGreen = 200;
    let healthWidth = (player.health / 300) * barWidth;

    if (healthWidth < 90) {
        healthRed = 255;
        healthGreen = 0;
    }

    fill(healthRed, healthGreen, 0);
    rect(x, y, healthWidth, barHeight);

    noFill();
    stroke(255);
    rect(x, y, barWidth, barHeight);
    pop();

    textSize(30);
    fill(255);
    text("PLAYER 1", x + 50, y - 30)
    textSize(20);
    text(players[0].health, x + 40, y + 9);

}

function drawHealthBar2(player, x, y, barWidth, barHeight) {
    push();
    fill(50);
    rect(x, y, barWidth, barHeight);

    let healthRed = 0;
    let healthGreen = 200;
    let healthWidth = (player.health / 300) * barWidth;

    if (healthWidth < 90) {
        healthRed = 255;
        healthGreen = 0;
    }

    fill(healthRed, healthGreen, 0);
    rect(x + (barWidth - healthWidth), y, healthWidth, barHeight);

    noFill();
    stroke(255);
    rect(x, y, barWidth, barHeight);
    pop();

    textSize(30);
    fill(255);
    text("PLAYER 2", x + 250, y - 30)
    textSize(20);
    text(players[1].health, x + 260, y + 9);
}

function drawScore(playerScore, alignment, x , y) {
  textSize(32);
  fill(255);
  textAlign(alignment);
  text(playerScore, x, y);
}

function drawScore1(playerScore, x, y) {
    for (let i = 0; i < playerScore; i++) {
        fill('green')
        rect((map.tileSize * 5.5) + x * i, y, 20, 20);
    }

}

function drawScore2(playerScore, x, y) {
    for (let i = 0; i < playerScore; i++) {
        fill('green')
        rect(x/i + width, y, 20, 20);
    }

}

function keyPressed() {
  if (keyCode === ESCAPE) {
      if (!gamePaused) {
          pauseGame();
      } else {
          unpauseGame();
      }
      return;
  }

  if (!gamePaused) {
      for (let player of players) {
          if (keyCode === player.jumpKey) {
              player.jump();
          }
          if (keyCode === player.shootKey) {
              player.shoot();
          }
      }
  }
}

function pauseGame() {
  if (!countdownActive) {
      noLoop();
      settingsPanel.show();
      gamePaused = true;
  }
}

function unpauseGame() {
  if (!countdownActive) {
      loop();
      settingsPanel.hide();
      gamePaused = false;
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
      soundManager.playSound('weaponDrop');
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
      player.health = 300;
      player.weapon = null;
      player.exitStage = 0;
  }
  players[0].x = 150;
  players[0].y = 200;
  players[1].x = 1075;
  players[1].y = 200;
  bullets = [];
  weapons = [];
  roundOver = false;
  roundNum++;
  soundManager.playSound('gamestart');
  loop();
}

function checkRoundOver() {
  //check if health is 0 then set round as over. 
  let alivePlayers = players.filter(p => p.health > 0);
  if (alivePlayers.length === 1) {
      let winner = alivePlayers[0];
      if (winner.index === undefined) {
          console.error("Error: playerIndex is undefined for winner:", winner);
          return null;
      }
      let playerNum = winner.index + 1;
      push();
        textSize(32);
        fill(255);
        textAlign(CENTER);
        text(`Player ${playerNum} Wins Round ${roundNum}!`, width / 2, height / 2); // Display winner's sprite name
      pop();
      return winner;
  }
  return null;
}

function checkGameOver() {
  // when player reach final score, show end game screen. 
  let rectW = 700;
  let rectH = 400;
  let rectX = width/2 - (rectW/2);
  let rectY = height/2 - (rectH/2);
  
  if (player1Score >= finalScore || player2Score >= finalScore) {
      if(!gameOver){
        gamveOver=true;
        winScreen = new WinScreen();
        loop();
      }
      winScreen.display();
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

function pointInRect(px, py, rect) {
    return (
        px >= rect.x && 
        px <= rect.x + rect.width &&
        py >= rect.y &&
        py <= rect.y + rect.height
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
      this.direction = 'right';
      this.angle = 0;
  }

  static weaponImages = {
      pistol: { right: null, left: null},
      shotgun: { right: null, left: null}
  };

  static loadWeaponFrames(weaponType, direction, img) {
      if (!this.weaponImages[weaponType]) {
          this.weaponImages[weaponType] = { right: null, left: null };
      }
      this.weaponImages[weaponType][direction] = img;
  }

  static preloadWeapons() {
    Weapon.loadWeaponFrames("shotgun", "right", loadImage('assets/weapons/pistol_right1.png'));
    Weapon.loadWeaponFrames("shotgun", "left", loadImage('assets/weapons/pistol_left1.png'));

    Weapon.loadWeaponFrames("pistol", "right", loadImage('assets/weapons/rifle_right1.png'));
    Weapon.loadWeaponFrames("pistol", "left", loadImage('assets/weapons/rifle_left1.png'));
  }


  update() {
      let img = Weapon.weaponImages[this.weaponType][this.direction];
      if (img) {
          this.height = img.height;
          this.width = img.width;
      }
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
      let img = Weapon.weaponImages[this.weaponType][this.direction];
      if (img) {
          image(img, this.x, this.y, img.width, img.height);
      } else {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
      }
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
      this.width = 60;
      this.height = 10;
      this.vx = vx;
      this.vy = vy;
      this.shooter = shooter;
      this.bulletType = shooter.weapon ? shooter.weapon.weaponType : "pistol;"

      this.exploding = false;
      this.explosionFrame = 0;
      this.explosionFrameDuration = 20;
      this.explosionLastFrameTime = 0;
      this.explosionFinished = false;
      this.hitPlayer = false;
      this.damageApplied = false;
    }

    static collisionWallFX = [];
    static collisionPlayerFX = [];

    static preloadWallCollisionFX() {
        for (let i = 1; i <= 7; i++) {
            this.collisionWallFX.push(loadImage(`assets/collisionFX/collisionFX_wall/${i}.png`));
        }
    }

    static preloadPlayerCollisionFX() {
        for (let i = 1; i <= 7; i++) {
            this.collisionPlayerFX.push(loadImage(`assets/collisionFX/collisionFX_player/${i}.png`));
        }
    }

    static preloadCollisionFX() {
        this.preloadPlayerCollisionFX();
        this.preloadWallCollisionFX();
    }

    static bulletShotgun;
    static bulletRifle;

    static preloadBulletImages() {
        this.bulletShotgun = loadImage('assets/weapons/bullets/shotgun-bullet.png');
        this.bulletRifle = loadImage('assets/weapons/bullets/rifle-bullet.png');
    }

  update() {
    if (!this.exploding) {
      this.x += this.vx;
      this.y += this.vy;

      for (let player of players) {
        if (player !== this.shooter) {
            if (PowerUps.isShieldActiveFor(player)) {
                if (PowerUps.shieldCollisionCheck(this, player)) {
                    this.exploding = true;
                    this.explosionFrame = 0;
                    this.explosionLastFrameTime = millis();
                    break;
                }
            } else if (pointInRect(this.x, this.y, {
                x: player.x,
                y: player.y,
                width: player.width,
                height: player.height
            })) {
                if (!this.damageApplied) {
                    if (!roundOver) {
                        soundManager.playSound('hit');
                        player.takeDamage(10);
                    }
                    this.damageApplied = true;
                }
                this.hitPlayer = true;
                this.explosionFrame = 0;
                this.explosionLastFrameTime = millis();
                break;
            }
        }
    }

    if (!this.hitPlayer) {
        for (let row = 0; row < map.grid.length; row++) {
            for (let col = 0; col < map.grid[row].length; col++) {
                let tileNum = map.grid[row][col];
                if (tileNum > 0 && map.tileMapping[tileNum] !== "underground_wall1") {
                    let tile = {x: col * map.tileSize, y: row * map.tileSize, width: map.tileSize, height: map.tileSize};

                    if (pointInRect(this.x, this.y, tile)) {
                        this.exploding = true;
                        this.explosionFrame = 0;
                        this.explosionLastFrameTime = millis();
                        break;
                    }
                }
            }
            if (this.exploding) {
                break;
                }
            }
        }
    }  
    if (this.hitPlayer) {
        if (millis() - this.explosionLastFrameTime > this.explosionFrameDuration) {
            this.explosionFrame++;
            this.explosionLastFrameTime = millis();
            if (this.explosionFrame >= Bullet.collisionPlayerFX.length) {
                this.explosionFinished = true;
            }
        }
    }

    if (this.exploding) {
        if (millis() - this.explosionLastFrameTime > this.explosionFrameDuration) {
            this.explosionFrame++;
            this.explosionLastFrameTime = millis();
            if (this.explosionFrame >= Bullet.collisionWallFX.length) {
                this.explosionFinished = true;
            }
        }
    }
    
  }

  shoots(player) {
      return checkCollision(this, player);
  }

  display() {
    if (!this.exploding && !this.hitPlayer) {
        let bulletImg;
        if (this.bulletType === "shotgun") {
            bulletImg = Bullet.bulletShotgun;
        }
        else {
            bulletImg = Bullet.bulletRifle;
        }
        if (bulletImg) {
            push(); 
            translate(this.x, this.y);
            rotate(atan2(this.vy, this.vx));
            image(bulletImg, - bulletImg.width /2, - bulletImg.height/2);
            pop();
        } else {
            fill(255, 255, 0);
            rect(this.x, this.y, this.width, this.height);
        }
    } else {
        let fxArray = this.hitPlayer ? Bullet.collisionPlayerFX : Bullet.collisionWallFX;
        if (this.explosionFrame < fxArray.length) {
            let img = fxArray[this.explosionFrame];
            image(img, this.x - img.width / 2, this.y - img.height / 2);
        }
    }
  }
}
