class HomePage {
  constructor() {
    this.currentSelection = 0; 

    this.page = createDiv('');
    this.page.id('homepage-container');
    this.page.position(0, 0);
    this.page.style('width', windowWidth + 'px');
    this.page.style('height', windowHeight + 'px');
    this.page.style('background-image', 'url(assets/mainMenu/main-background.jpg');
    this.page.style('background-size', 'cover');
    this.page.style('background-position', 'center');
    this.page.style('z-index', '10');

    this.titleImage = createImg('assets/mainMenu/Logo2.png');
    this.titleImage.id('title-image');
    this.titleImage.parent(this.page);
    this.titleImage.style('display', 'block');
    this.titleImage.style('margin', '20px auto 0 auto');

    this.setupButtons();
  }

  setupButtons() {
    const css = 
      `@font-face {
        font-family: pixel;
        src: url("https://dl.dropboxusercontent.com/s/hsdwvz761xqphhb/pixel.ttf");
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
    this.settingsButton.position(windowWidth - 120, 20);
    this.settingsButton.style('transform', 'translateX(-50%)');
    this.settingsButton.mouseReleased(() => {
      soundManager.playSound('buttonClick');
      this.showSettings();
    });

    this.player1button = createButton("One Player");
    this.player1button.id("player1-button");
    this.player1button.style('cursor', 'pointer');
    this.player1button.style('position', 'absolute');
    this.player1button.position(windowWidth / 2, windowHeight / 2 + 130);
    this.player1button.style('transform', 'translateX(-50%)');
    this.player1button.mouseReleased(() => {
      this.startGame(1);
      soundManager.playSound('buttonClick');
  });

    this.player2button = createButton("Two Player");
    this.player2button.id("player2-button");
    this.player2button.style('cursor', 'pointer');
    this.player2button.style('position', 'absolute');
    this.player2button.position(windowWidth / 2, windowHeight / 2 + 220);
    this.player2button.style('transform', 'translateX(-50%)');
    this.player2button.mouseReleased(() => {
      this.startGame(2);
      soundManager.playSound('buttonClick');
  });

    this.settingsButton.parent(this.page);
    this.player1button.parent(this.page);
    this.player2button.parent(this.page);
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