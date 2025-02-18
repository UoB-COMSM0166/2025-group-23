class CharacterPage {
   constructor() {
    this.playerCount = 1;
    this.player1Selection = null;
    this.player2Selection = null;
    this.currentSelection = 0;
    this.characters = ['1', '2', '3', '4', '5', '6'];
    this.page = createDiv(`
       <div id="left-side">
        <p>Player 1: <span id="player1-selection">None</span></p>
        <p>Player 2: <span id="player2-selection">None</span></p>
      </div>
      <div id="right-side">
        <p>Character Select</p>
        <div id="char-selection">Character: ${this.characters[this.currentSelection]}</div>
        <div id="character-list">
          ${this.characters.map((char, index) => `<div class="char-option" id="char-${char}" data-index="${index}">${char}</div>`).join('')}
        </div>
      </div>
     `);
     this.page.id('characters');
     this.page.position(250, 250, 'absolute');
     this.page.style('display', 'none');
     this.page.style('background-color', 'white');
     this.page.style('border', '1px solid black');
     this.page.style('padding', '80px');
     this.page.style('z-index', '40');
     this.page.style('position', 'absolute');
 
     this.setupButtons();
   }
   
   //If use keyboard then no need
   setupButtons() {
    /*
     select('#char1-btn').mousePressed(() => this.selectCharacter('1'));
     select('#char2-btn').mousePressed(() => this.selectCharacter('2'));
     select('#char3-btn').mousePressed(() => this.selectCharacter('3'));
     select('#char4-btn').mousePressed(() => this.selectCharacter('4'));
     select('#char5-btn').mousePressed(() => this.selectCharacter('5'));
     select('#char6-btn').mousePressed(() => this.selectCharacter('6'));
     */
     this.characters.forEach((char, index) => {
      select(`#char-${char}`).mousePressed(() => this.selectCharacter(index));
    });
   }
 
   setPlayerCount(count) {
    this.playerCount = count;
    if (count === 1) {
      select('#player2-selection').hide();
    } else {
      select('#player2-selection').show();
    }
  }
 
  selectCharacter(index) {
    if (this.playerCount === 1) {
      // In 1 player mode, Player 1 selects a character
      if (!this.player1Selection) {
        this.player1Selection = this.characters[index];
        select('#player1-selection').html(`Player 1: ${this.player1Selection}`);
        // After Player 1 selects, automatically select for Player 2
        setTimeout(() => {
          this.player2Selection = this.characters[Math.floor(Math.random() * this.characters.length)];
          select('#player2-selection').html(`Player 2: ${this.player2Selection}`);
          setTimeout(() => {
            this.transitionToMapPage();
          }, 3000); // Wait for 3 seconds before going to map selection
        }, 500); // Short delay to show Player 1's selection
      }
    } else if (this.playerCount === 2) {
      // In 2 player mode, both players select characters
      if (!this.player1Selection) {
        this.player1Selection = this.characters[index];
        select('#player1-selection').html(`Player 1: ${this.player1Selection}`);
      } else if (!this.player2Selection) {
        this.player2Selection = this.characters[index];
        select('#player2-selection').html(`Player 2: ${this.player2Selection}`);
      }
      // Once both players have selected, transition to map selection
      if (this.player1Selection && this.player2Selection) {
        setTimeout(() => {
          this.transitionToMapPage();
        }, 3000); // Wait for 3 seconds before going to map selection
      }
    }
  
    // Highlight selected character in the list
    this.highlightSelection();
  }
  
  highlightSelection() {
    // Remove the highlight from all characters first
    selectAll('.char-option').forEach(el => {
      el.removeClass('highlighted');
    });
  
    // Add the highlight to the current selected character
    select(`#char-${this.characters[this.currentSelection]}`).addClass('highlighted');
  }
  

  transitionToMapPage() {
    mapPage.show(); // Show map selection page
    this.hide(); // Hide the character selection page
  }

  keyPressed() {
    if (keyCode === ENTER) {
      // Check if Player 1 has not selected a character yet
      if (this.playerCount === 1 && !this.player1Selection) {
        this.player1Selection = this.characters[this.currentSelection];
        select('#player1-selection').html(`Player 1: ${this.player1Selection}`);
        
        // Automatically choose for Player 2 in 1 player mode
        setTimeout(() => {
          this.player2Selection = this.characters[Math.floor(Math.random() * this.characters.length)];
          select('#player2-selection').html(`Player 2: ${this.player2Selection}`);
          setTimeout(() => {
            this.transitionToMapPage();  // Transition to the map selection after 3 seconds
          }, 3000);
        }, 500);  // Short delay to show Player 1's selection
      } 
      
      // If in 2-player mode
      else if (this.playerCount === 2) {
        // If Player 1 hasn't selected yet, update Player 1's character
        if (!this.player1Selection) {
          this.player1Selection = this.characters[this.currentSelection];
          select('#player1-selection').html(`Player 1: ${this.player1Selection}`);
        }
        
        // If Player 1 has selected, but Player 2 hasn't, update Player 2's character
        else if (!this.player2Selection) {
          this.player2Selection = this.characters[this.currentSelection];
          select('#player2-selection').html(`Player 2: ${this.player2Selection}`);
        }

        // Once both players have selected, wait 3 seconds before transitioning
        if (this.player1Selection && this.player2Selection) {
          setTimeout(() => {
            this.transitionToMapPage();
          }, 3000); // Transition after 3 seconds
        }
      }
    }
    // Arrow keys for navigation
    else if (keyCode === UP_ARROW || keyCode === 87) {
      this.currentSelection = (this.currentSelection - 1 + this.characters.length) % this.characters.length;
      select('#char-selection').html(`Character: ${this.characters[this.currentSelection]}`);
      this.highlightSelection(); // Update the highlight when arrow key is pressed
    } 
    else if (keyCode === DOWN_ARROW || keyCode === 83) {
      this.currentSelection = (this.currentSelection + 1) % this.characters.length;
      select('#char-selection').html(`Character: ${this.characters[this.currentSelection]}`);
      this.highlightSelection(); // Update the highlight when arrow key is pressed
    }
}


  


  show() {
    this.page.style('display', 'block');
    this.player1Selection = null;
    this.player2Selection = null;
    select('#player1-selection').html('Player 1: None');
    select('#player2-selection').html('Player 2: None');
    select('#char-selection').html(`Character: ${this.characters[this.currentSelection]}`);
  }

  hide() {
    this.page.style('display', 'none');
  }
}