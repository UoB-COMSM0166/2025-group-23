class MapPage {
   constructor() {
     this.page = createDiv(`
       <p>MAP SELECT</p>
       <button id="map1-btn" style="cursor: pointer;">Sky</button>
       <button id="map2-btn" style="cursor: pointer;">Ground</button>
       <button id="map3-btn" style="cursor: pointer;">Ocean</button>
      <button id="start-btn" style="cursor: pointer;">START</button>
     `);
     this.page.id('maps');
     this.page.position(240, 200, 'absolute');
     this.page.style('display', 'none');
     this.page.style('background-color', 'white');
     this.page.style('border', '1px solid black');
     this.page.style('padding', '20px');
     this.page.style('z-index', '100');
     this.page.style('position', 'absolute');
 
     this.setupButtons();
   }
 
   setupButtons() {
     select('#map1-btn').mousePressed(() => this.selectMap('Sky'));
     select('#map2-btn').mousePressed(() => this.selectMap('Ground'));
     select('#map3-btn').mousePressed(() => this.selectMap('Ocean'));
     select('#start-btn').mousePressed(() => this.startGame());
   }
 
   show() {
     this.page.style('display', 'block');
   }
 
   hide() {
     this.page.style('display', 'none');
   }
 
   selectMap(mapName) {
     localStorage.setItem('selectedMap', mapName);
     selectedMap = mapName;
     console.log(`Map selected: ${mapName}`);
   }

   startGame() {
      gameStarted = true;
      console.log("Game started!");
      this.hide();
    }
 }