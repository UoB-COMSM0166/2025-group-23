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
          font: pixel;">
        X
      </button>
      <button id="instruction-btn" type="button" style="cursor: pointer; margin: 50px; back">Instruction</button>
      <button id="muteMusic-btn" type="button" style="cursor: pointer; margin: 50px; background-color: rgb(150, 150, 150);">Mute Music</button>
      <button id="muteSound-btn" type="button" style="cursor: pointer; margin: 50px; background-color: rgb(150, 150, 150);">Mute Sound</button>
      <button id="mainMenu-btn" type="button" style="cursor: pointer; margin: 50px;">Main Menu</button>
      `);
    this.panel.id('settings');
    this.panel.position(width/2, height/2, 'absolute');
    this.panel.style('transform', 'translate(-50%, -50%)');
    this.panel.style('display', 'none');
    this.panel.style('background-color', 'rgba(255, 255, 255, 0.9)');
    this.panel.style('border-radius', '25px')
    this.panel.style('padding', '120px');
    this.panel.style('z-index', '40');
    this.panel.style('position', 'absolute');
 
    this.setupButtons();
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
      instructionsPanel.show()
    });
    select('#muteMusic-btn').mouseReleased(() => {
      soundManager.initMuteMusic();
      soundManager.playSound('buttonClick');
    });
    select('#muteSound-btn').mouseReleased(() => {
      soundManager.initMuteSound();
      soundManager.playSound('buttonClick');
      
    });
    select('#mainMenu-btn').mouseReleased(() => {
      soundManager.playSound('buttonClick');
      winScreen.initReturnHome();
      this.hide();
    });
  }
 
  show() {
    this.panel.style('display', 'block');
    homePage.hideDifficultyPanel();
    console.log(`windowWidth: ${windowWidth}, windowHeight: ${windowHeight}`);
    console.log(`Panel position: ${this.panel.style('left')}, ${this.panel.style('top')}`);

    if (gameStarted) {
      select('#mainMenu-btn').style('display', 'block');
    } else {
      select('#mainMenu-btn').style('display', 'none');
    }
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
}
 