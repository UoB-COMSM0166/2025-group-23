class InstructionsPanel {
   constructor() {
     this.panel = createDiv(`
       <p>Instructions</p>
       <button id="closeIns-btn" type="button" style="cursor: pointer;">X</button>
       <button id="left-btn">←</button>
       <button id="up-btn">↑</button>
       <button id="right-btn">→</button>
       <p>Movement</p>
       <button id="space-btn">Space</button>
       <p>Shoot</p>
     `);
     this.panel.id('instructions');
     this.panel.position(160, 160, 'absolute');
     this.panel.style('display', 'none');
     this.panel.style('background-color', 'white');
     this.panel.style('border', '1px solid black');
     this.panel.style('padding', '120px');
     this.panel.style('z-index', '10');
     this.panel.style('position', 'absolute');
 
     this.setupButtons();
   }
 
   setupButtons() {
     select('#closeIns-btn').mousePressed(() => this.hide());
   }
 
   show() {
     this.panel.style('display', 'block');
   }
 
   hide() {
     this.panel.style('display', 'none');
   }
 }