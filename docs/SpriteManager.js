class SpriteManager {
  constructor() {
    this.sprites = {};
  }

  loadSpriteFrames(playerIndex, direction, framePaths) {
    this.sprites[playerIndex] = this.sprites[playerIndex] || {};
    this.sprites[playerIndex][direction] = [];

    framePaths.forEach((path, index) => {
      loadImage(path, img => {
        this.sprites[playerIndex][direction][index] = img;
        this.sprites[playerIndex].width = img.width;
        this.sprites[playerIndex].height = img.height;
      });
    });
  }

  preloadSprites() {

    this.loadSpriteFrames(0, 'front', ['assets/characters/chicken/chicken_front.png']);
    this.loadSpriteFrames(0, 'left', [
      'assets/characters/chicken/chicken_left1.png',
      'assets/characters/chicken/chicken_left2.png',
      'assets/characters/chicken/chicken_left3.png'
    ]);
    this.loadSpriteFrames(0, 'right', [
      'assets/characters/chicken/chicken_right1.png',
      'assets/characters/chicken/chicken_right2.png',
      'assets/characters/chicken/chicken_right3.png'
    ]);

    this.loadSpriteFrames(1, 'front', ['assets/characters/crab/crab_front.png']);
    this.loadSpriteFrames(1, 'left', [
      'assets/characters/crab/crab_left1.png',
      'assets/characters/crab/crab_left2.png',
      'assets/characters/crab/crab_left3.png'
    ]);
    this.loadSpriteFrames(1, 'right', [
      'assets/characters/crab/crab_right1.png',
      'assets/characters/crab/crab_right2.png',
      'assets/characters/crab/crab_right3.png'
    ]);

    this.loadSpriteFrames(2, 'front', ['assets/characters/dog/dog_front.png']);
    this.loadSpriteFrames(2, 'left', [
      'assets/characters/dog/dog_left1.png',
      'assets/characters/dog/dog_left2.png',
      'assets/characters/dog/dog_left3.png'
    ]);
    this.loadSpriteFrames(2, 'right', [
      'assets/characters/dog/dog_right1.png',
      'assets/characters/dog/dog_right2.png',
      'assets/characters/dog/dog_right3.png'
    ]);

    this.loadSpriteFrames(3, 'front', ['assets/characters/lion/lion_front.png']);
    this.loadSpriteFrames(3, 'left', [
      'assets/characters/lion/lion_left1.png',
      'assets/characters/lion/lion_left2.png',
      'assets/characters/lion/lion_left3.png'
    ]);
    this.loadSpriteFrames(3, 'right', [
      'assets/characters/lion/lion_right1.png',
      'assets/characters/lion/lion_right2.png',
      'assets/characters/lion/lion_right3.png'
    ]);

    this.loadSpriteFrames(4, 'front', ['assets/characters/parrot/parrot_front.png']);
    this.loadSpriteFrames(4, 'left', [
      'assets/characters/parrot/parrot_left1.png',
      'assets/characters/parrot/parrot_left2.png',
      'assets/characters/parrot/parrot_left3.png'
    ]);
    this.loadSpriteFrames(4, 'right', [
      'assets/characters/parrot/parrot_right1.png',
      'assets/characters/parrot/parrot_right2.png',
      'assets/characters/parrot/parrot_right3.png'
    ]);

    this.loadSpriteFrames(5, 'front', ['assets/characters/penguin/penguin_front.png']);
    this.loadSpriteFrames(5, 'left', [
      'assets/characters/penguin/penguin_left1.png',
      'assets/characters/penguin/penguin_left2.png',
      'assets/characters/penguin/penguin_left3.png'
    ]);
    this.loadSpriteFrames(5, 'right', [
      'assets/characters/penguin/penguin_right1.png',
      'assets/characters/penguin/penguin_right2.png',
      'assets/characters/penguin/penguin_right3.png'
    ]);

  }

  getSprite(playerIndex, direction, frameIndex = 0) {
    let frames = this.sprites[playerIndex]?.[direction] || [];
    return frames.length > 0 ? frames[frameIndex % frames.length] : null;
  }

}

