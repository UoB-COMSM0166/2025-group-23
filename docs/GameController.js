function checkStartGame() {
  if (!gameInitalised && localStorage.getItem("selectedCharacterIndex0") !== null && localStorage.getItem("selectedCharacterIndex1") !== null) {
    console.log("Both players selected! Starting game...");
    gameInitalised = true;
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

  players[0] = new Player(0, 150, 200, 65, 68, 87, 32, player1Sprite);  

  if (characterPage.playerCount === 1) {
      players[1] = new AIPlayer(1, 1075, 200, player2Sprite);
  } 
  else if (characterPage.playerCount === 2) {
      players[1] = new Player(1, 1075, 200, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, ENTER, player2Sprite);  // Player 2 (Arrow Keys + Enter)
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

function drawScore(playerScore, alignment, x , y) {
  textSize(32);
  fill(255);
  textAlign(alignment);
  text(playerScore, x, y);
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
      player.health = 100;
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
      //noLoop();
      let winner = alivePlayers[0];
      if (winner.index === undefined) {
          console.error("Error: playerIndex is undefined for winner:", winner);
          return null;
      }

     /*  // Retrieve the sprite name from localStorage
      let storedIndex = localStorage.getItem(`selectedCharacterIndex${winner.index}`);
      let winnerName = characterNames[storedIndex];

      // If the sprite is not found, use a fallback name
      if (!winnerName) {
          winnerName = `Player ${winner.playerIndex + 1}`;
      }*/

      let playerNum = winner.index + 1;
      push();
      textSize(32);
      fill(255);
      textAlign(CENTER);

      // Display winner's sprite name
      text(`Player ${playerNum} Wins Round ${roundNum}!`, width / 2, height / 2);
      
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

      this.tileBlockImages["ocean_platform1"] = loadImage('assets/maps/ocean_map/ocean_platforms/ocean_platform1.png');
  }

  static preLoadBackgroundImages() {
      this.backgroundImages["desert"] = loadImage('assets/maps/desert_map/desert_background.png');
      this.backgroundImages["underground"] = loadImage('assets/maps/underground_map/underground_background.png');
      this.backgroundImages["sky"] = loadImage('assets/maps/sky_map/sky_background.png');
      this.backgroundImages["ocean"] = loadImage('assets/maps/ocean_map/ocean_background.png');
      
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
      this.backgroundObjects["sky_layer2"] = loadImage('assets/maps/sky_map/sky_layer2.png');
      this.backgroundObjects["sky_layer3"] = loadImage('assets/maps/sky_map/sky_layer3.png');
      this.backgroundObjects["sky_layer4"] = loadImage('assets/maps/sky_map/sky_layer4.png');

      this.backgroundObjects["ocean_layer1"] = loadImage('assets/maps/ocean_map/ocean_layer1.png');
      this.backgroundObjects["ocean_layer2"] = loadImage('assets/maps/ocean_map/ocean_layer2.png');
      this.backgroundObjects["ocean_layer3"] = loadImage('assets/maps/ocean_map/ocean_layer3.png');
      this.backgroundObjects["ocean_layer4"] = loadImage('assets/maps/ocean_map/ocean_layer4.png');
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
