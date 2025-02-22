class CharacterPage {

  constructor() {
   this.playerCount = 0;
   this.player1Selection = null;
   this.player2Selection = null;
   this.currentSelection = 0;
   this.characters = ['Chicken', 'Crab', 'Dog', 'Lion', 'Parrot', 'Penguin'];

   const css = `
     @font-face {
       font-family: pixel;
       src: url("assets/fonts/pixel.ttf");
     }
     #left-side, #right-side {
       font-family: pixel;
       font-size: 32px;
       margin-bottom: 20px;
       text-align: center;
     }
     #playerCharacter-info {
       display:flex; 
       justify-content: center;
       align-items: center;
       gap: 80px;
       flex-wrap: nowrap;
     }
     #playerCharacter-info span {
       margin: 0 100px 0 0;
       white-space: nowrap;
     }
     #settings button {
       font-family: pixel;
       margin: 10px;
     }
   `;
   createElement('style', css);
   
   this.page = createDiv(`
     <div id="left-side">
       <h1>Character Select</h1>
       <div id="playerCharacter-info">
         <p>Player 1:</p> <span id="player1-selection">None</span>
         <p>Player 2:</p> <span id="player2-selection">None</span>
       </div>
     </div>
     <div id="right-side">
       <div id="char-selection">Character: ${this.characters[this.currentSelection]}</div>
       <div id="character-list">
         ${this.characters.map((char, index) => `<div class="char-option" id="char-${char}" data-index="${index}">${char}</div>`).join('')}
       </div>
     </div>
   `);
   this.page.id('characters');
   this.page.position(0, 0);
   this.page.style('display', 'none');
   this.page.style('width', windowWidth + 'px');
   this.page.style('height', windowHeight + 'px');
   this.page.style('background-color', 'white');

   this.setupButtons();
   this.highlightSelection();
 }
  
  //If use keyboard then no need
 setupButtons() {
   this.characters.forEach((char, index) => {
     let option = select(`#char-${char}`)
     option.mouseReleased(() => {
       soundManager.playSound('buttonClick');
       this.selectCharacter(index);
     });
     option.mouseOver(() => {
       this.currentSelection = index;
       this.highlightSelection();
     })
   });
   this.exitButton = createButton("X");
   this.exitButton.id("exit-button");
   this.exitButton.style('cursor', 'pointer');
   this.exitButton.style('position', 'absolute');
   this.exitButton.position(windowWidth - 120, 20);
   this.exitButton.style('transform', 'translateX(-50%)');
   this.exitButton.mouseReleased(() => {
     soundManager.playSound('buttonClick');
     this.hide();
     this.setPlayerCount(0);
     homePage.show();
     console.log("Player Count Returned To " + this.playerCount);
     console.log("Check If Game Is Initiliased: " + gameInitalised);
   });
 }

 setPlayerCount(count) {
   this.playerCount = count;
 }

 selectCharacter(index) {
   
   if (this.playerCount === 1) {
     if (!this.player1Selection) {
       // Player 1 selects a character
       this.player1Selection = this.characters[index];
       select('#player1-selection').html(`${this.player1Selection}`);
       localStorage.setItem("selectedCharacterIndex0", index);
     }
     this.player2Selection = this.characters[Math.floor(Math.random() * 3)];
     select('#player2-selection').html(`${this.player2Selection}`);
     localStorage.setItem("selectedCharacterIndex1", this.characters.indexOf(this.player2Selection));
     
   } 
   else if (this.playerCount === 2) {
     if (!this.player1Selection) {
       this.player1Selection = this.characters[index];
       select('#player1-selection').html(`${this.player1Selection}`);
       localStorage.setItem("selectedCharacterIndex0", index);
     } else if (!this.player2Selection) {
       this.player2Selection = this.characters[index];
       select('#player2-selection').html(`${this.player2Selection}`);
       localStorage.setItem("selectedCharacterIndex1", index);
     }
   }

    // Once both players have selected characters, check if the game can start
   if (this.player1Selection && this.player2Selection) {
     startGameTimeout = setTimeout(() => {
       checkStartGame();  // Call checkStartGame once both players have selected their characters
     }, 3000);
   }

   soundManager.stopSound('buttonClick');
   soundManager.playSound('characterSelect');
   this.highlightSelection();
 }
 
 highlightSelection() {
   select('#char-selection').html(`Character: ${this.characters[this.currentSelection]}`);
   selectAll('.char-option').forEach(el => {
     el.style('border', 'none');
   });
   select(`#char-${this.characters[this.currentSelection]}`).style('border', '2px solid red');
 }


 show() {
   this.player1Selection = null;
   this.player2Selection = null;
   select('#player1-selection').html('-');
   select('#player2-selection').html('-');
   select('#char-selection').html(`Character: ${this.characters[this.currentSelection]}`);
   this.currentSelection = 0; 
   this.highlightSelection();

   if (startGameTimeout) {
     clearTimeout(startGameTimeout);
     startGameTimeout = null;
   }
   this.page.style('display', 'block');
   this.exitButton.show();
 }

 hide() {
   this.page.style('display', 'none');
   this.exitButton.hide();

   if (startGameTimeout) {
     clearTimeout(startGameTimeout);
     startGameTimeout = null;
   } 
 }
}