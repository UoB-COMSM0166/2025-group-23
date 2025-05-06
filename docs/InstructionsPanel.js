class InstructionsPanel {
  constructor() {
    this.panel = createDiv();
    this.panel.id('instructions');
    //this.panel.style('width', '80%');  
    //this.panel.style('height', '80%');  
    ////this.panel.position(width/2, height/2, 'absolute');
//this.panel.style('top', '50%');
//this.panel.style('left', '50%');
//this.panel.position(width / 2, height / 2);
this.panel.style('left', '50%');
this.panel.style('top', '50%');

this.panel.style('transform', 'translate(-50%, -50%)');
    //this.panel.style('position', 'fixed'); 

    this.panel.style('position', 'absolute');


    //this.panel.style('background-color', 'white');
    //this.panel.style('border', '1px solid black');
    //this.panel.style('padding', '120px');
    this.panel.style('z-index', '50');
    this.panel.style('display', 'none');

    //this.panel.style('margin', '20px');
    //this.panel.style('padding', '20px');
//this.panel.style('border', '2px solid #ccc');


 

    const img = createImg('assets/mainMenu/instruction3.png', () => {




      const maxWidth = width * 0.8;
      const maxHeight = height * 0.8;

      const scaleW = maxWidth / img.elt.naturalWidth;
      const scaleH = maxHeight / img.elt.naturalHeight;
      const scale = Math.min(scaleW, scaleH, 1);  // 同時限制寬 & 高
      
      const finalW = img.elt.naturalWidth * scale;
      const finalH = img.elt.naturalHeight * scale;

this.panel.style('width', finalW + 'px');
this.panel.style('height', finalH + 'px');
  
img.style('width', finalW + 'px');
img.style('height', finalH + 'px');

      // 將 panel 中心放在 canvas 中心
      const canvasRect = document.querySelector('canvas').getBoundingClientRect();
      const centerX = canvasRect.left + canvasRect.width / 2;
      const centerY = canvasRect.top + canvasRect.height / 2;
  
      this.panel.style('position', 'absolute');
this.panel.style('left', centerX + 'px');
this.panel.style('top', centerY + 'px');
this.panel.style('transform', 'translate(-50%, -50%)');
    });
    
img.parent(this.panel);
img.style('display', 'block');
//img.style('width', '100%');
//img.style('height', 'auto');
img.style('border-radius', '20px'); 

//this.panel.child(img); 


    this.closeButton = createButton('X');
    this.closeButton.id('closeIns-btn');
    this.closeButton.parent(this.panel);
    this.closeButton.style('cursor', 'pointer');
    this.closeButton.style('position', 'absolute');
    this.closeButton.style('top', '10px');
    this.closeButton.style('right', '10px');
    this.closeButton.style('width', '50px');
    this.closeButton.style('height', '50px');
    this.closeButton.style('font-size', '20px');
    this.closeButton.style('display', 'flex');
    this.closeButton.style('justify-content', 'center');
    this.closeButton.style('align-items', 'center');


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
    if (typeof settingsPanel !== 'undefined') {
      settingsPanel.hide();  
    }
     this.panel.style('display', 'block');
   }
 
   hide() {
     this.panel.style('display', 'none');
   }
 }