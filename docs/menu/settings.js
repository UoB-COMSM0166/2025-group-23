class SettingsPanel {
   constructor(isGamePage = false, instructionsPanel) {
     this.panel = createDiv(`
       <p>Settings</p>
       <button id="closeSet-btn" type="button" style="cursor: pointer;">X</button>
       <button id="instruction-btn" type="button" style="cursor: pointer;">Instruction</button>
       ${isGamePage ? '<button id="replay-btn" type="button" style="cursor: pointer;">Replay</button>' : ''}
       <button id="muteMusic-btn" type="button" style="cursor: pointer;">Mute Music</button>
       <button id="muteSound-btn" type="button" style="cursor: pointer;">Mute Sound</button>
     `);
     this.panel.id('settings');
     this.panel.position(120, 160, 'absolute');
     this.panel.style('display', 'none');
     this.panel.style('background-color', 'white');
     this.panel.style('border', '1px solid black');
     this.panel.style('padding', '120px');
     this.panel.style('z-index', '20');
     this.panel.style('position', 'absolute');
 
     this.instructionsPanel = instructionsPanel;
     this.setupButtons(isGamePage);
   }
 
   setupButtons(isGamePage) {
     select('#closeSet-btn').mousePressed(() => this.hide());
     select('#instruction-btn').mousePressed(() => this.instructionsPanel.show());
     if (isGamePage) {
      select('#replay-btn').mousePressed(() => this.replay());
     }
     select('#muteMusic-btn').mousePressed(() => this.muteMusic());
     select('#muteSound-btn').mousePressed(() => this.muteSound());
   }
 
   show() {
     this.panel.style('display', 'block');
   }
 
   hide() {
     this.panel.style('display', 'none');
   }
 
   play() {
     gameStarted = true;
     console.log('Game Started');
     this.hide();
     hideAllButtons();
   }
   replay() {}
   muteMusic() {
     if (music) {
       if (musicMuted) {
         music.setVolume(1);
       } else {
         music.setVolume(0);
       }
       musicMuted = !musicMuted;
     }
   }
   muteSound() {}
 }
 