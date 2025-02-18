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
     this.highlightSelection();
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
      if (!this.player1Selection) {
        // Player 1 selects a character
        this.player1Selection = this.characters[index];
        select('#player1-selection').html(`${this.player1Selection}`);
        localStorage.setItem("selectedCharacterIndex0", index);
  
        // Automatically select a character for Player 2 after Player 1 selects
        setTimeout(() => {
          this.player2Selection = this.characters[Math.floor(Math.random() * this.characters.length)];
          select('#player2-selection').html(`${this.player2Selection}`);
          localStorage.setItem("selectedCharacterIndex1", this.characters.indexOf(this.player2Selection));
  
          // Once both players have selections, check and start the game
          checkStartGame();
        }, 500);  // Delay to show Player 1's selection
      }
    } else if (this.playerCount === 2) {
      if (!this.player1Selection) {
        this.player1Selection = this.characters[index];
        select('#player1-selection').html(`Player 1: ${this.player1Selection}`);
        localStorage.setItem("selectedCharacterIndex0", index);
      } else if (!this.player2Selection) {
        this.player2Selection = this.characters[index];
        select('#player2-selection').html(`Player 2: ${this.player2Selection}`);
        localStorage.setItem("selectedCharacterIndex1", index);
      }
  
      // Once both players have selected characters, check if the game can start
      if (this.player1Selection && this.player2Selection) {
        setTimeout(() => {
          checkStartGame();  // Call checkStartGame once both players have selected their characters
        }, 3000);
      }
    }
  
    this.highlightSelection();
  }
  
  keyPressed() {
    if (keyCode === ENTER) {
      if (this.playerCount === 1 && !this.player1Selection) {
        this.player1Selection = this.characters[this.currentSelection];
        select('#player1-selection').html(`${this.player1Selection}`);
        localStorage.setItem("selectedCharacterIndex0", this.currentSelection);
  
        setTimeout(() => {
          this.player2Selection = this.characters[Math.floor(Math.random() * this.characters.length)];
          select('#player2-selection').html(`${this.player2Selection}`);
          localStorage.setItem("selectedCharacterIndex1", this.characters.indexOf(this.player2Selection));
  
          // Once both players have selections, check and start the game
          checkStartGame();
        }, 500); // Short delay to show Player 1's selection
      } else if (this.playerCount === 2) {
        if (!this.player1Selection) {
          this.player1Selection = this.characters[this.currentSelection];
          select('#player1-selection').html(`Player 1: ${this.player1Selection}`);
          localStorage.setItem("selectedCharacterIndex0", this.currentSelection);
        } else if (!this.player2Selection) {
          this.player2Selection = this.characters[this.currentSelection];
          select('#player2-selection').html(`Player 2: ${this.player2Selection}`);
          localStorage.setItem("selectedCharacterIndex1", this.currentSelection);
        }
  
        // Once both players have selected characters, check if the game can start
        if (this.player1Selection && this.player2Selection) {
          setTimeout(() => {
            checkStartGame();  // Call checkStartGame once both players have selected their characters
          }, 3000);
        }
      }
    }
  
    // Arrow keys for navigation
    else if (keyCode === UP_ARROW || keyCode === 87) {
      this.currentSelection = (this.currentSelection - 1 + this.characters.length) % this.characters.length;
      this.highlightSelection();
    } else if (keyCode === DOWN_ARROW || keyCode === 83) {
      this.currentSelection = (this.currentSelection + 1) % this.characters.length;
      this.highlightSelection();
    }
  }
  

  
  highlightSelection() {
    select('#char-selection').html(`Character: ${this.characters[this.currentSelection]}`);

    selectAll('.char-option').forEach(el => {
      el.style('border', 'none');
    });
    select(`#char-${this.characters[this.currentSelection]}`).style('border', '2px solid red');
}


  show() {
    this.page.style('display', 'block');
    this.player1Selection = null;
    this.player2Selection = null;
    select('#player1-selection').html('None');
    select('#player2-selection').html('None');
    select('#char-selection').html(`Character: ${this.characters[this.currentSelection]}`);
    this.currentSelection = 0; // 確保當頁面顯示時，選擇從第一個字符開始
    this.highlightSelection();
  }

  hide() {
    this.page.style('display', 'none');
  }
}