const characterPreviews = {
  "Parrot": { baseId: "parrot", sketch: parrotSketch },
  "Penguin": { baseId: "penguin", sketch: penguinSketch },
  "Crab": { baseId: "crab", sketch: crabSketch },
  "Chicken": { baseId: "chicken", sketch: chickenSketch },
  "Dog": { baseId: "dog", sketch: dogSketch },
  "Lion": { baseId: "lion", sketch: lionSketch },
}

class CharacterPage {

  constructor() {
   this.playerCount = 0;
   this.player1Selection = null;
   this.player2Selection = null;
   this.currentSelection = 0;
   this.characters = ['Chicken', 'Crab', 'Dog', 'Lion', 'Parrot', 'Penguin'];
   this.previewInstances = { 1: {}, 2: {} };
   this.previewMap = characterPreviews;
   this.player1SelectionLocked = false;

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
       flex-wrap: nowrap;
     }
     #playerCharacter-info input {
       margin: 0 100px 0 50px;
       white-space: nowrap;
       font-family: pixel;
       font-size: 32px;
       text-align: center;
       width: 200px;
       text-transform: uppercase;
     }
     #settings button {
       font-family: pixel;
       margin: 10px;
     }
     #player1-preview, #player2-preview {
       position: absolute;
       top: 280px;   /* adjust this value as needed */
       width: 200px;
       height: 300px;
       pointer-events: none;
      }

     #player1-preview { left: 130px; }
     #player2-preview { left: calc(100% - 330px); }

      #char-selection {
        margin-top: 300px; /* increase this value to push it further down */
      }
   `;
   createElement('style', css);
   
   this.page = createDiv(`
     <div id="left-side">
       <h1>Character Select</h1>
       <div id="playerCharacter-info">
         <p>Player 1:</p> <input type="text" id="player1-name" placeholder="Enter Name" maxLength="8"/>
         <p>Player 2:</p> <input type="text" id="player2-name" placeholder="Enter Name" maxLength="8"/>
       </div>
       <div id="player1-preview">
          <div id="player1-parrot-preview" style="display: none;"></div>
          <div id="player1-penguin-preview" style="display: none;"></div>
          <div id="player1-crab-preview" style="display: none;"></div>
          <div id="player1-chicken-preview" style="display: none;"></div>
          <div id="player1-dog-preview" style="display: none;"></div>
          <div id="player1-lion-preview" style="display: none;"></div>
        </div>
        <div id="player2-preview">
          <div id="player2-parrot-preview" style="display: none;"></div>
          <div id="player2-penguin-preview" style="display: none;"></div>
          <div id="player2-crab-preview" style="display: none;"></div>
          <div id="player2-chicken-preview" style="display: none;"></div>
          <div id="player2-dog-preview" style="display: none;"></div>
          <div id="player2-lion-preview" style="display: none;"></div>
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
   this.page.style('width', width + 'px');
   this.page.style('height', height + 'px');
   this.page.style('background-color', 'grey');

   this.setupButtons();
   this.highlightSelection();
 }

 getContainerId(player, char) {
  const previewInfo = this.previewMap[char];
  return `player${player}-${previewInfo.baseId}-preview`;
 }

 showPreviewForPlayer(player, char) {
  this.hideAllPreviews(player);
  if (this.previewMap[char]) {
    const containerId = this.getContainerId(player, char);
    console.log("Showing preview for", char, "in container", containerId);
    const container = select('#' + containerId);
    if (container) container.style('display', 'block');
    if (!this.previewInstances[player][char]) {
      this.previewInstances[player][char] = new p5(this.previewMap[char].sketch, containerId);
    }
  }
 }

 hideAllPreviews(player) {
  for (let key in this.previewMap) {
    const containerId = this.getContainerId(player, key);
    let container =  select('#' + containerId);
    if (container) container.style('display', 'none');
  }
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
      if (!this.player1SelectionLocked) {
        this.currentSelection = index;
        this.highlightSelection();
        if (this.previewMap[char]) {
          this.showPreviewForPlayer(1, char);
        } else {
          this.hideAllPreviews(1);
        }
      }
      else if (this.player1SelectionLocked && !this.player2Selection) {
        this.currentSelection = index;
        this.highlightSelection();
        if (this.previewMap[char]) {
          this.showPreviewForPlayer(2, char);
        } else {
          this.hideAllPreviews(2);
        }
      }
     });
     option.mouseOut(() => {
      if (!this.player1SelectionLocked && this.previewMap[char]) {
        this.hideAllPreviews(1);
      } else if (this.player1SelectionLocked && !this.player2Selection) {
        if (this.previewMap[char]) {
          this.hideAllPreviews(2);
        }
      }
     });
   });
    // Capitalize player 1's input
    select('#player1-name').elt.addEventListener('input', function() {
      this.value = this.value.toUpperCase();
    });

    // Capitalize player 2's input
    select('#player2-name').elt.addEventListener('input', function() {
      this.value = this.value.toUpperCase();
    });
   this.exitButton = createButton("X");
   this.exitButton.id("exit-button");
   this.exitButton.style('cursor', 'pointer');
   this.exitButton.style('position', 'absolute');
   this.exitButton.position(width - 120, 20);
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
       localStorage.setItem("selectedCharacterIndex0", index);
       this.player1SelectionLocked = true;
     }
     let availableCharacaters = this.characters.filter(char => char !== this.player1Selection);
     let aiCharacter = random(availableCharacaters);
     this.player2Selection = aiCharacter;
     let aiIndex = this.characters.indexOf(aiCharacter);
     localStorage.setItem("selectedCharacterIndex1",aiIndex);
     this.showPreviewForPlayer(2, aiCharacter);
   } 
   else if (this.playerCount === 2) {
     if (!this.player1Selection) {
       this.player1Selection = this.characters[index];
       localStorage.setItem("selectedCharacterIndex0", index);
       this.player1SelectionLocked = true;
     } else if (!this.player2Selection) {
       this.player2Selection = this.characters[index];
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
   select('#player1-name').html('-');
   select('#player2-name').html('-');
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
   
   this.player1Selection = null;
   this.player2Selection = null;
   this.player1SelectionLocked = false;
   this.hideAllPreviews(1);
   this.hideAllPreviews(2);

   if (startGameTimeout) {
     clearTimeout(startGameTimeout);
     startGameTimeout = null;
   } 
 }
}