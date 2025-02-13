class Button {
  constructor(label, x, y, onClick) {
    this.button = createButton(label);
    this.button.position(x, y);
    this.button.mousePressed(onClick);
  }
  hide() {
    this.button.hide();
  }
}

class SettingsPanel {
  constructor() {
    this.panel = createDiv(`
      <p>Settings</p>
      <button id="closeSet-btn" type="button" style="cursor: pointer;">X</button>
      <button id="play-btn" type="button" style="cursor: pointer;">Play</button>
      <button id="replay-btn" type="button" style="cursor: pointer;">Replay</button>
      <button id="muteMusic-btn" type="button" style="cursor: pointer;">Mute Music</button>
      <button id="muteSound-btn" type="button" style="cursor: pointer;">Mute Sound</button>
    `);
    this.panel.id('settings');
    this.panel.position(120, 160, 'absolute');
    this.panel.style('display', 'none');
    this.panel.style('background-color', 'white');
    this.panel.style('border', '1px solid black');
    this.panel.style('padding', '120px');
    this.panel.style('z-index', '10');
    this.panel.style('position', 'absolute');

    this.setupButtons();
  }

  setupButtons() {
    select('#closeSet-btn').mousePressed(() => this.hide());
    select('#play-btn').mousePressed(() => this.play());
    select('#replay-btn').mousePressed(() => this.replay());
    select('#muteMusic-btn').mousePressed(() => this.muteMusic());
    select('#muteSound-btn').mousePressed(() => this.muteSound());
  }

  show() {
    this.panel.style('display', 'block');
  }

  hide() {
    this.panel.style('display', 'none');
  }

  play() {
    gameStarted = true;
    console.log('Game Started');
    this.hide();
    hideAllButtons();
  }
  replay() {}
  muteMusic() {
    if (music) {
      if (musicMuted) {
        music.setVolume(1);
      } else {
        music.setVolume(0);
      }
      musicMuted = !musicMuted;
    }
  }
  muteSound() {}
}

class InstructionsPanel {
  constructor() {
    this.panel = createDiv(`
      <p>Instructions</p>
      <button id="closeIns-btn" type="button" style="cursor: pointer;">X</button>
      <button id="left-btn">←</button>
      <button id="up-btn">↑</button>
      <button id="right-btn">→</button>
      <p>Movement</p>
      <button id="space-btn">Space</button>
      <p>Shoot</p>
    `);
    this.panel.id('instructions');
    this.panel.position(160, 160, 'absolute');
    this.panel.style('display', 'none');
    this.panel.style('background-color', 'white');
    this.panel.style('border', '1px solid black');
    this.panel.style('padding', '120px');
    this.panel.style('z-index', '10');
    this.panel.style('position', 'absolute');

    this.setupButtons();
  }

  setupButtons() {
    select('#closeIns-btn').mousePressed(() => this.hide());
  }

  show() {
    this.panel.style('display', 'block');
  }

  hide() {
    this.panel.style('display', 'none');
  }
}

class MapPanel {
  constructor() {
    this.panel = createDiv(`
      <p>MAP SELECT</p>
      <button id="closeMap-btn" type="button" style="cursor: pointer;">X</button>
      <button id="map1-btn" style="cursor: pointer;">Sky</button>
      <button id="map2-btn" style="cursor: pointer;">Ground</button>
      <button id="map3-btn" style="cursor: pointer;">Ocean</button>
    `);
    this.panel.id('maps');
    this.panel.position(240, 200, 'absolute');
    this.panel.style('display', 'none');
    this.panel.style('background-color', 'white');
    this.panel.style('border', '1px solid black');
    this.panel.style('padding', '20px');
    this.panel.style('z-index', '10');
    this.panel.style('position', 'absolute');

    this.setupButtons();
  }

  setupButtons() {
    select('#closeMap-btn').mousePressed(() => this.hide());
    select('#map1-btn').mousePressed(() => this.selectMap('Sky'));
    select('#map2-btn').mousePressed(() => this.selectMap('Ground'));
    select('#map3-btn').mousePressed(() => this.selectMap('Ocean'));
  }

  show() {
    this.panel.style('display', 'block');
  }

  hide() {
    this.panel.style('display', 'none');
  }

  selectMap(mapName) {
    localStorage.setItem('selectedMap', mapName);
    selectedMap = mapName;
    console.log(`Map selected: ${mapName}`);
    this.hide();
  }
}

class CharacterPanel {
  constructor() {
    this.panel = createDiv(`
      <p>PLAYER SELECT</p>
      <button id="closeChar-btn" type="button" style="cursor: pointer;">X</button>
      <button id="char1-btn" style="cursor: pointer;">1</button>
      <button id="char2-btn" style="cursor: pointer;">2</button>
      <button id="char3-btn" style="cursor: pointer;">3</button>
      <button id="char4-btn" style="cursor: pointer;">4</button>
      <button id="char5-btn" style="cursor: pointer;">5</button>
      <button id="char6-btn" style="cursor: pointer;">6</button>
    `);
    this.panel.id('characters');
    this.panel.position(250, 250, 'absolute');
    this.panel.style('display', 'none');
    this.panel.style('background-color', 'white');
    this.panel.style('border', '1px solid black');
    this.panel.style('padding', '20px');
    this.panel.style('z-index', '10');
    this.panel.style('position', 'absolute');

    this.setupButtons();
  }

  setupButtons() {
    select('#closeChar-btn').mousePressed(() => this.hide());
    select('#char1-btn').mousePressed(() => this.selectCharacter('1'));
    select('#char2-btn').mousePressed(() => this.selectCharacter('2'));
    select('#char3-btn').mousePressed(() => this.selectCharacter('3'));
    select('#char4-btn').mousePressed(() => this.selectCharacter('4'));
    select('#char5-btn').mousePressed(() => this.selectCharacter('5'));
    select('#char6-btn').mousePressed(() => this.selectCharacter('6'));
  }

  show() {
    this.panel.style('display', 'block');
  }

  hide() {
    this.panel.style('display', 'none');
  }

  selectCharacter(character1Name) {
    localStorage.setItem('selectCharacter', character1Name);
    console.log(`Character1 selected: ${character1Name}`);
    this.hide();
  }

  selectCharacter(character2Name) {
    localStorage.setItem('selectCharacter', character2Name);
    console.log(`Character2 selected: ${character2Name}`);
    this.hide();
  }
}

let controlButton, mapButton, player1Button, player2Button;
let settingsPanel, instructionsPanel, mapPanel, characterPanel, music;
let musicMuted = false; 
let gameStarted = false;
let selectedMap = ''; 
let skyMap, groundMap, oceanMap;

function preload() {
  music = loadSound('assets/intense-trailer-dynamics-cinematic-orchestral-suspense-288595.mp3');
  music.setVolume(1);
  skyMap = loadImage('assets/sky-map.png'); 
  //groundMap = loadImage('ground-map.png'); 
  //oceanMap = loadImage('ocean-map.png'); 
}


function setup() {
  createCanvas(600, 600);

  settingsPanel = new SettingsPanel();
  instructionsPanel = new InstructionsPanel();
  mapPanel = new MapPanel();
  characterPanel = new CharacterPanel();
/*
  new Button('Setting', 470, 19, () => settingsPanel.show());
  new Button('Control', 250, 520, () => instructionsPanel.show());
  new Button('Map', 250, 280, () => mapPanel.show());
  new Button('Player1', 250, 320, () => characterPanel.show());
  new Button('Player2', 250, 350, () => characterPanel.show());
*/
  controlButton = new Button('Control', 250, 520, () => instructionsPanel.show());
  mapButton = new Button('Map', 250, 280, () => mapPanel.show());
  player1Button = new Button('Player1', 250, 320, () => characterPanel.show());
  player2Button = new Button('Player2', 250, 350, () => characterPanel.show());

  new Button('Setting', 470, 19, () => settingsPanel.show());
  new Button('Play Music', 10, 10, () => {
    music.play();    
  });

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
  } 

  let selectedMapDisplay = localStorage.getItem('selectedMap');
}

function hideAllButtons() {
  controlButton.hide();
  mapButton.hide();
  player1Button.hide();
  player2Button.hide();
  settingsPanel.hide();
  instructionsPanel.hide();
  mapPanel.hide();
  characterPanel.hide();
}
