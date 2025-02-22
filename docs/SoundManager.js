class SoundManager {
  constructor () {
    this.sounds = {};
    //this.music = false;
    //this.sfxMuted = false;
  }

  preloadSounds() {
    this.sounds.buttonClick = loadSound('assets/sounds/click-sound.mp3');
    this.sounds.blackhole = loadSound('assets/sounds/blackhole2-sound.wav');
    this.sounds.jump = loadSound('assets/sounds/jump-sound.wav');
    this.sounds.hit = loadSound('assets/sounds/hit-sound.ogg');
    this.sounds.footsteps = loadSound('assets/sounds/footsteps2-sound.wav');
    this.sounds.gunPickup = loadSound('assets/sounds/gun-pickup-sound.wav');
    this.sounds.emptyMag = loadSound('assets/sounds/empty-mag-sound.wav');
    this.sounds.pistolshot = loadSound('assets/sounds/lazershot3-sound.flac');
    this.sounds.shotgunshot = loadSound('assets/sounds/lazershot-sound.wav');
    this.sounds.characterSelect = loadSound('assets/sounds/characterselect-sound.mp3');
    this.sounds.gamestart = loadSound('assets/sounds/gamestart-sound.ogg');
    this.sounds.countdown = loadSound('assets/sounds/countdown-sound.wav');
    this.sounds.weaponDrop = loadSound('assets/sounds/weapondrop-sound.wav');
    this.sounds.roundWin = loadSound('assets/sounds/roundwin-sound.wav');
    
  }

  playSound(name) {
    if (this.sounds[name]) {
      if (name === 'footsteps') {
        if (!this.sounds[name].isLooping()) {
          this.sounds[name].loop();
        }
      }
      else {
        this.sounds[name].play();
      }
    }
  }

  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].stop();
    }
  }

}