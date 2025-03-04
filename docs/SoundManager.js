class SoundManager {
  constructor () {
    this.sounds = {};
    this.music = {};
    this.muteMusic = false;
    this.muteSound = false;
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
    this.sounds.healthRegen = loadSound('assets/sounds/healthregen2-sound.flac');
    this.sounds.shieldPowerUp = loadSound('assets/sounds/shieldpowerup-sound.mp3');
    this.sounds.playerDeath = loadSound('assets/sounds/playerdeath-sound.wav');

    
  }

  preloadMusic() {
    this.music.gameMusic = loadSound('assets/sounds/game2-music.wav');
  }

  playSound(name) {
    if (!this.muteSound) {
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
  }

  playMusic(name) {
    if (!this.muteMusic) {
      if (this.music[name]) {
        if (!this.music[name].isLooping()) {
          this.music[name].loop();
        }
      }
    }
  }

  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].stop();
    }
  }

  stopMusic(name) {
    if (this.music[name]) {
      this.music[name].stop();
    }
  }

  initMuteSound() {
    if (!this.muteSound) {
      this.muteSound = true;
    } else if (this.muteSound){
      this.muteSound = false;
    }
  }

  initMuteMusic() {
    this.muteMusic = !this.muteMusic;
    if (this.muteMusic) {
      for (let music in this.music) {
        if (this.music[music].isPlaying()) {
          this.music[music].stop();
        }
      }
    } else {
      this.playMusic('gameMusic');
    }
  }

}