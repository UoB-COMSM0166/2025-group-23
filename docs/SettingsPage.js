class SettingsPanel {
  constructor() {
    const css = `
      @font-face {
        font-family: pixel;
        src: url("assets/fonts/pixel.ttf");
      }
      #settings-title {
        font-family: pixel;
        font-size: 32px;
        margin-bottom: 20px;
        text-align: center;
      }
      #settings button {
        font-family: pixel;
        margin: 10px;
      }
    `;
    createElement('style', css);

    this.panel = createDiv(`
      <p id="settings-title">SETTINGS</p>
      <button 
        id="closeSet-btn" 
        type="button" 
        style="
          cursor: pointer; 
          position: fixed; 
          top: 10px; 
          right: 10px; 
          width: 50px; 
          height: 50px; 
          font-size: 20px; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          padding: 0; 
          border: 1px solid black; 
          font-family: Arial, sans-serif;">
        X
      </button>
      <button id="instruction-btn" type="button" style="cursor: pointer; margin: 10px auto;">Instruction</button>
      <button id="muteMusic-btn" type="button" style="cursor: pointer; margin: 10px auto;">Mute Music</button>
      <button id="muteSound-btn" type="button" style="cursor: pointer; margin: 10px auto;">Mute Sound</button>
      <button id="returnHome-btn" type="button" style="cursor: pointer; margin: 10px auto;">Return Home</button>
      `);
    this.panel.id('settings');
    this.panel.style('display', 'flex'); 
    this.panel.style('flex-direction', 'column'); 
    this.panel.style('justify-content', 'center'); 
    this.panel.style('align-items', 'center'); 
    this.panel.style('background-color', 'white');
    this.panel.style('border', '1px solid black');
    this.panel.style('z-index', '40');
    this.panel.style('width', '100vw');  
    this.panel.style('height', '100vh'); 
    this.panel.style('top', '0'); 
    this.panel.style('left', '0'); 
    this.panel.style('position', 'fixed');
    this.panel.style('overflow', 'auto'); 
 
    this.setupButtons();
    this.instructionsPanel = new InstructionsPanel();
  }
 
  setupButtons() {
    select('#closeSet-btn').mouseReleased(() => {
      soundManager.playSound('buttonClick');
      if (gameStarted) {
        loop();
        gamePaused = false;
      }
      this.hide()
    });
    select('#instruction-btn').mouseReleased(() => {
      soundManager.playSound('buttonClick');
      this.instructionsPanel.show()
    });
    select('#muteMusic-btn').mouseReleased(() => {
      soundManager.initMuteMusic();
      soundManager.playSound('buttonClick');
    });
    select('#muteSound-btn').mouseReleased(() => {
      soundManager.initMuteSound();
      soundManager.playSound('buttonClick');
    });
    select('#returnHome-btn').mouseReleased(() => {
      soundManager.initMuteSound();
      soundManager.playSound('buttonClick');
      inGame = false;
      homePage.show();
      settingsPanel.hide();
    });
  }

  returnHomeButton() {
    const returnHome = select('#returnHome-btn');
    if (inGame) {
      returnHome.style('display', 'block'); 
    } else {
      returnHome.style('display', 'none'); 
    }
  }
 
  show() { 
    this.panel.style('display', 'block'); 
    this.returnHomeButton(); 
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
  
}
 