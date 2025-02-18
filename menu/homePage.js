class HomePage {
   constructor() {
      this.currentSelection = 0; 
      this.buttons = ["setting-btn", "oneplayer-btn", "twoplayer-btn"]; 

     this.page = createDiv(`
       <h1>TAKE AIM</h1>
       <button id="setting-btn" type="button" style="cursor: pointer;">Setting</button>
       <button id="oneplayer-btn" type="button" style="cursor: pointer;">1 Player</button>
       <button id="twoplayer-btn" type="button" style="cursor: pointer;">2 Player</button>
     `);
     this.page.id('home');
     this.page.position(150, 150, 'absolute');
     this.page.style('display', 'block');
     this.page.style('background-color', 'white');
     this.page.style('border', '1px solid black');
     this.page.style('padding', '50px');
     this.page.style('z-index', '10');
     this.page.style('position', 'absolute');
     this.setupButtons();
     this.highlightButton(this.currentSelection);
   }

   setupButtons() {
    select('#setting-btn').mousePressed(() => this.showSettings());
    select('#oneplayer-btn').mousePressed(() => this.startGame(1));
    select('#twoplayer-btn').mousePressed(() => this.startGame(2));
}


   highlightButton(index) {
      this.buttons.forEach(buttonId => select(`#${buttonId}`).style('border', '1px solid black'));
      select(`#${this.buttons[index]}`).style('border', '2px solid red');
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

   keyPressed() {
      if (keyCode === ENTER) {
        if (this.currentSelection === 0) {
          this.showSettings();
        } else if (this.currentSelection === 1) {
          this.startGame(1);
        } else if (this.currentSelection === 2) {
          this.startGame(2);
        }
      } else if (keyCode === UP_ARROW || keyCode === 87) { // UP_ARROW or 'W'
        this.currentSelection = (this.currentSelection - 1 + this.buttons.length) % this.buttons.length;
        this.highlightButton(this.currentSelection);
      } else if (keyCode === DOWN_ARROW || keyCode === 83) { // DOWN_ARROW or 'S'
        this.currentSelection = (this.currentSelection + 1) % this.buttons.length;
        this.highlightButton(this.currentSelection);
      }
    }
 
   show() {
     this.page.style('display', 'block');
   }
 
   hide() {
     this.page.style('display', 'none');
   }
 }
 