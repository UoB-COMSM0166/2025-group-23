class InstructionsPanel {
   constructor() {
     this.panel = createDiv(`
       <p>Instructions</p>
       <button 
         id="closeIns-btn" 
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
            align-items: center;">
         X
      </button>
       <button id="left-btn">←</button>
       <button id="up-btn">↑</button>
       <button id="right-btn">→</button>
       <p>Movement</p>
       <button id="space-btn">Space</button>
       <p>Shoot</p>
     `);
     this.panel.id('instructions');
     this.panel.style('width', '100vw');  
     this.panel.style('height', '100vh'); 
     this.panel.style('position', 'fixed'); 
     this.panel.style('top', '0'); 
     this.panel.style('left', '0');
     this.panel.style('background-color', 'white');
     this.panel.style('border', '1px solid black');
     this.panel.style('padding', '120px');
     this.panel.style('z-index', '50');
     this.panel.style('display', 'none');
 
     this.setupButtons();
   }
 
   setupButtons() {
     select('#closeIns-btn').mousePressed(() => {
      soundManager.playSound('buttonClick');
      if (gameStarted) {
        loop();
        gamePaused = false;
      }
      this.hide()
     });
   }
 
   show() {
     this.panel.style('display', 'block');
   }
 
   hide() {
     this.panel.style('display', 'none');
   }
 }