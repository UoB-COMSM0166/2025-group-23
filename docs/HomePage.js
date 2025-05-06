class HomePage {
  constructor() {
    this.currentSelection = 0; 

    this.page = createDiv('');
    this.page.id('homepage-container');
    this.page.position(0, 0);
    this.page.style('width', width + 'px');
    this.page.style('height', height + 'px');
    this.page.style('background-image', 'url(assets/mainMenu/main-background3.png');
    this.page.style('background-size', 'cover');
    this.page.style('background-position', 'center');
    this.page.style('z-index', '10');

    this.titleImage = createImg('assets/mainMenu/Logo2.png');
    this.titleImage.id('title-image');
    this.titleImage.parent(this.page);
    this.titleImage.style('display', 'block');
    this.titleImage.style('margin', '20px auto 0 auto');

    this.difficultyPanelElement = createDiv('');
    this.difficultyPanelElement.id('difficulty-panel');
    this.difficultyPanelElement.position(width / 2 - 130, height / 2); 
    this.difficultyPanelElement.style('width', '220px');
    this.difficultyPanelElement.style('height', '150px');
    this.difficultyPanelElement.style('background-color', 'rgba(255, 255, 255, 0.9)');
    this.difficultyPanelElement.style('border-radius', '25px')
    //this.difficultyPanelElement.style('background', '#fff');
    //this.difficultyPanelElement.style('border', '2px solid #000');
    this.difficultyPanelElement.style('display', 'none');
    this.difficultyPanelElement.style('padding', '20px');
    this.difficultyPanelElement.style('z-index', '100');

    this.setupButtons();
    this.setupDifficultyButtons();
  }

  setupButtons() {
    const css = 
      `@font-face {
        font-family: pixel;
        src: url("assets/fonts/pixel.ttf");
        }
      button {
        border: none;
        border-radius: 2px;
        background: #333;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: block;
        font-size: 18px;
        font-family: pixel;
        width: 200px;
        height: 50px;
        margin: 0 auto;
        cursor: pointer;
        box-shadow: 0 4px 0 #000, 0 4px 4px rgba(0,0,0,0.5);  
        transition: all 0.1s ease-in-out;
      }
      
      button:active {
        box-shadow: 0 2px 0 #000, 0 2px 2px rgba(0, 0, 0, 0.5);
        transform: translateY(2px);
      }`
    ;
    createElement('style', css);

    this.settingsButton = createButton("Settings");
    this.settingsButton.id("setting-button");
    this.settingsButton.style('cursor', 'pointer');
    this.settingsButton.style('position', 'absolute');
    this.settingsButton.position(width / 2, height / 2 + 310);
    this.settingsButton.style('transform', 'translateX(-50%)');
    this.settingsButton.mouseReleased(() => {
      soundManager.playSound('buttonClick');
      this.hideDifficultyPanel();
      this.showSettings();
    });

    this.player1button = createButton("One Player");
    this.player1button.id("player1-button");
    this.player1button.style('cursor', 'pointer');
    this.player1button.style('position', 'absolute');
    this.player1button.position(width / 2, height / 2 + 130);
    this.player1button.style('transform', 'translateX(-50%)');
    this.player1button.mouseReleased(() => {
      //this.startGame(1);
      if (this.difficultyPanelElement.elt.style.display === 'none' ||
        this.difficultyPanelElement.elt.style.display === '') {
        this.showDifficultyPanel();
      } else {
        this.hideDifficultyPanel();
      }
      soundManager.playSound('buttonClick');
  });

    this.player2button = createButton("Two Player");
    this.player2button.id("player2-button");
    this.player2button.style('cursor', 'pointer');
    this.player2button.style('position', 'absolute');
    this.player2button.position(width / 2, height / 2 + 220);
    this.player2button.style('transform', 'translateX(-50%)');
    this.player2button.mouseReleased(() => {
      this.startGame(2);
      this.hideDifficultyPanel();
      soundManager.playSound('buttonClick');
  });

    this.settingsButton.parent(this.page);
    this.player1button.parent(this.page);
    this.player2button.parent(this.page);
  }

  showDifficultyPanel() {
    this.difficultyPanelElement.style('display', 'block');
  }
  
  hideDifficultyPanel() {
    this.difficultyPanelElement.style('display', 'none');
  }

  setupDifficultyButtons() {
    this.difficultyText = createP("Select Difficulty");
    this.difficultyText.id("difficulty-text");
    this.difficultyText.parent(this.difficultyPanelElement);
    this.difficultyText.style('text-align', 'center');
    this.difficultyText.style('font-family', 'pixel');
    this.difficultyText.style('font-size', '18px');
    this.difficultyText.style('margin', '0 0 20px 0');
    this.difficultyText.style('color', '#000');

    this.easyButton = createButton("Easy");
    this.easyButton.id("difficulty-easy-button");
    this.easyButton.style('cursor', 'pointer');
    // Center the button inside the difficulty panel.
    this.easyButton.style('display', 'block');
    this.easyButton.style('margin', '10px auto');
    this.easyButton.mouseReleased(() => {
      soundManager.playSound('buttonClick');
      console.log('Easy difficulty selected');
      // Set a global (or accessible) difficulty flag:
      window.selectedDifficulty = 'easy';
      this.hideDifficultyPanel();
      // Start game in 1-player mode (the passed parameter indicates player count).
      this.startGame(1);
    });

    this.hardButton = createButton("Hard");
    this.hardButton.id("difficulty-hard-button");
    this.hardButton.style('cursor', 'pointer');
    this.hardButton.style('display', 'block');
    this.hardButton.style('margin', '10px auto');
    this.hardButton.mouseReleased(() => {
      soundManager.playSound('buttonClick');
      console.log('Hard difficulty selected');
      // Set the difficulty flag to 'hard'
      window.selectedDifficulty = 'hard';
      this.hideDifficultyPanel();
      this.startGame(1);
    });

    this.easyButton.parent(this.difficultyPanelElement);
    this.hardButton.parent(this.difficultyPanelElement);
  }
 
  showSettings() {
    settingsPanel.show();
  }

  startGame(playerCount) {
    if (playerCount === 1) {
      console.log('1 Player mode selected');
      characterPage.setPlayerCount(1);
      characterPage.show();
    } else if (playerCount === 2) {
      console.log('2 Player mode selected');
      characterPage.setPlayerCount(2);
      characterPage.show();
    }
    this.hide();
  }

  show() {
    this.page.style('display', 'block');
  }
 
  hide() {
    this.page.style('display', 'none');
  }
}