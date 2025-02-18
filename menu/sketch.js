let controlButton, mapButton, player1Button, player2Button;
let homePage, settingsPanel, instructionsPanel, mapPage, characterPage, music;
let musicMuted = false; 
let gameStarted = false;
let selectedMap = ''; 
let skyMap, groundMap, oceanMap;

function preload() {
  music = loadSound('assets/intense-trailer-dynamics-cinematic-orchestral-suspense-288595.mp3');
  music.setVolume(1);
  skyMap = loadImage('assets/sky-map.png'); 
  //groundMap = loadImage('assets/ground-map.png'); 
  //oceanMap = loadImage('assets/ocean-map.png'); 
}


function setup() {
  createCanvas(1215, 760);

  settingsPanel = new SettingsPanel();
  instructionsPanel = new InstructionsPanel();
  mapPage = new MapPage();
  characterPage = new CharacterPage();
  homePage = new HomePage();

  controlButton = new Button('Control', 250, 520, () => instructionsPanel.show());
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
  controlButton.hide();
  mapButton.hide();
  player1Button.hide();
  player2Button.hide();
  settingsPanel.hide();
  instructionsPanel.hide();
  mapPage.hide();
  characterPage.hide();
  homePage.hide();
}

