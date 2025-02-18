class Button {
   constructor(label, x, y, onClick) {
     this.button = createButton(label);
     this.button.position(x, y);
     this.button.mousePressed(onClick);
   }
   hide() {
     this.button.hide();
   }
 }