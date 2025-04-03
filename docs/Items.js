class Items {
  constructor() {}

  static healthIcon = [];
  static currentFrame = 0;
  static lastFrameTime = 20;
  static frameDuraction = 180;

  static gameBar;
  static weaponIcon = [];
  static ammoImage;
  static ammoIcon = [];
  static currentAmmoFrame = 0;
  static lastAmmoFrameTime = 20;

  static player1stars = [];
  static player2stars = [];

  static preloadHealthIcon() {
    for (let i = 1; i <= 4; i++) {
      this.healthIcon.push(loadImage(`assets/items/health-icon/${i}.png`));
    }
  }

  static preloadGameBarImages() {
    this.gameBar = loadImage('assets/mainMenu/PopupBox.png');
  }

  static preloadWeaponIcon() {
    this.weaponIcon[0] = loadImage('assets/items/weapontype-icon/rifle-icon.png');
    this.weaponIcon[1] = loadImage('assets/items/weapontype-icon/shotgun-icon.png');
  }

  static preloadAmmoImage() {
    this.ammoImage = loadImage('assets/items/weapontype-icon/ammo-icon.png');
  }

  static preloadAmmoIcon() {
    for (let i = 1; i <= 4; i++) {
      this.ammoIcon.push(loadImage(`assets/items/weapontype-icon/${i}.png`));
    }
  }

  static preloadPlayerStars() {
    for (let i = 0; i <= 3; i++) {
      this.player1stars.push(loadImage(`assets/items/player1star/${i}star.png`));
    }

    for (let i = 0; i <= 3; i++) {
      this.player2stars.push(loadImage(`assets/items/player2star/${i}star.png`));
    }
  }

  static update () {
    if (millis() - this.lastFrameTime > this.frameDuraction) {
      this.currentFrame = (this.currentFrame + 1) % this.healthIcon.length;
      this.lastFrameTime = millis();
    }

    if (millis() - this.lastAmmoFrameTime > this.frameDuraction) {
      this.currentAmmoFrame = (this.currentAmmoFrame + 1) % this.ammoIcon.length;
      this.lastAmmoFrameTime = millis();
    }
  }

  static displayPlayer1Stars(x, y) {
    let img = this.player1stars[player1Score];
    image(img, x - img.width/2, y - img.height/2);
  }

  static displayPlayer2Stars(x, y) {
    let img = this.player2stars[player2Score];
    image(img, x - img.width/2, y - img.height/2);
  }

  static displayHealthIcon(x , y) {
    let img = this.healthIcon[this.currentFrame];
    image(img, x - img.width/2, y - img.height/2);
  }

  static displayGameBarImages() {
    image(this.gameBar, 0, height - this.gameBar.height);
  }

  static displayWeaponIcon(weaponType, x, y) {
    if (weaponType === "pistol") {
      image(this.weaponIcon[0], x, y);
    } else if (weaponType === "shotgun") {
      image(this.weaponIcon[1], x, y);
    }
  }

  static displayAmmoImage(player, x, y) {
    if (!player.weapon) return;
    let ammoLeft = player.weapon.bulletLimit - player.weapon.bulletsFired;
    for (let i = 0; i < ammoLeft; i++) {
      image(this.ammoImage, x + i * (this.ammoImage.width + 2.5), y);
    }
  }

  static displayAmmoIcon(x , y) {
    let img = this.ammoIcon[this.currentAmmoFrame];
    image(img, x - img.width/2, y - img.height/2);
  }
}