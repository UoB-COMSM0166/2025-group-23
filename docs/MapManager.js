class Map {
  static tileBlockImages = {};
  static backgroundImages = {};
  static backgroundObjects = {};

  constructor(grid, tileMapping, backgroundImageKey, backgroundObjects = [], scrollDirection = "horizontal") {
      this.grid = grid;
      this.tileMapping = tileMapping;
      this.rows = this.grid.length;
      this.cols = this.grid[0].length;
      this.tileSize = 45;
      this.backgroundImageKey = backgroundImageKey;
      this.scrollDirection = scrollDirection;

      this.backgroundObjects = backgroundObjects.map(obj => ({
          key: obj.key,
          speed: obj.speed || 0, // Default 0 if no speed is set
          direction: obj.direction || 0, // Default moves left (-1)
          x: obj.startX || 0, // Starting X position
          y: obj.startY || 0, // Starting Y position
          ySpeed: obj.ySpeed || 0, // Vertical speed
          yDirection: obj.yDirection || 0, // Up (-1) or Down (1)
          yRange: obj.yRange || 0, // Max movement range in Y
          yStart: obj.startY || 0, // Keep track of original Y for oscillation
      }));

      this.animationFrame = 0;
      this.frameDelay = 10;
  }

  static preLoadTiles() {
      this.tileBlockImages["desert_tile_float1"] = loadImage('assets/maps/desert_map/desert_platforms/desert_tile_float1.png');
      this.tileBlockImages["desert_tile_1"] = loadImage('assets/maps/desert_map/desert_platforms/desert_tile.png');

      this.tileBlockImages["desert_tile_water"] = [
          loadImage('assets/maps/desert_map/desert_platforms/water_tile1.png'),
          loadImage('assets/maps/desert_map/desert_platforms/water_tile2.png'),
          loadImage('assets/maps/desert_map/desert_platforms/water_tile3.png'),
      ];

      this.tileBlockImages["underground_platform1"] = loadImage('assets/maps/underground_map/underground_platforms/underground_platform1.png');
      this.tileBlockImages["underground_platform2"] = loadImage('assets/maps/underground_map/underground_platforms/underground_platform2.png');
      this.tileBlockImages["underground_wall1"] = loadImage('assets/maps/underground_map/underground_platforms/underground_wall1.png');

      this.tileBlockImages["sky_platform1"] = loadImage('assets/maps/sky_map/sky_platforms/cloud_platform1.png');
      this.tileBlockImages["sky_platform2"] = loadImage('assets/maps/sky_map/sky_platforms/cloud_platform2.png');

      this.tileBlockImages["ocean_platform1"] = loadImage('assets/maps/ocean_map/ocean_platforms/ocean_platform1.png');
  }

  static preLoadBackgroundImages() {
      this.backgroundImages["desert"] = loadImage('assets/maps/desert_map/desert_background.png');
      this.backgroundImages["underground"] = loadImage('assets/maps/underground_map/underground_background.png');
      this.backgroundImages["sky"] = loadImage('assets/maps/sky_map/sky_background.png');
      this.backgroundImages["ocean"] = loadImage('assets/maps/ocean_map/ocean_background.png');
      
  }

  static preLoadBackgroundObjects() {
      this.backgroundObjects["cloud1"] = loadImage('assets/maps/desert_map/cloud_1.png');
      this.backgroundObjects["cloud2"] = loadImage('assets/maps/desert_map/cloud_2.png');
      this.backgroundObjects["cloud3"] = loadImage('assets/maps/desert_map/cloud_3.png');
      this.backgroundObjects["desert_mountain_peak"] = loadImage('assets/maps/desert_map/desert_mountain_peak.png');
      this.backgroundObjects["desert_sand_layer"] = loadImage('assets/maps/desert_map/desert_sand_layer.png');
      this.backgroundObjects["desert_sand_layer1"] = loadImage('assets/maps/desert_map/desert_sand_layer1.png');
      this.backgroundObjects["desert_sand_layer2"] = loadImage('assets/maps/desert_map/desert_sand_layer2.png');

      this.backgroundObjects["underground_layer1"] = loadImage('assets/maps/underground_map/underground_layer1.png');
      this.backgroundObjects["underground_layer2"] = loadImage('assets/maps/underground_map/underground_layer2.png');
      this.backgroundObjects["underground_layer3"] = loadImage('assets/maps/underground_map/underground_layer3.png');

      this.backgroundObjects["sky_layer1"] = loadImage('assets/maps/sky_map/sky_layer1.png');
      this.backgroundObjects["sky_layer2"] = loadImage('assets/maps/sky_map/sky_layer2.png');
      this.backgroundObjects["sky_layer3"] = loadImage('assets/maps/sky_map/sky_layer3.png');
      this.backgroundObjects["sky_layer4"] = loadImage('assets/maps/sky_map/sky_layer4.png');

      this.backgroundObjects["ocean_layer1"] = loadImage('assets/maps/ocean_map/ocean_layer1.png');
      this.backgroundObjects["ocean_layer2"] = loadImage('assets/maps/ocean_map/ocean_layer2.png');
      this.backgroundObjects["ocean_layer3"] = loadImage('assets/maps/ocean_map/ocean_layer3.png');
      this.backgroundObjects["ocean_layer4"] = loadImage('assets/maps/ocean_map/ocean_layer4.png');
  }

  updateAnimation() {
      if (frameCount % this.frameDelay === 0) {
          this.animationFrame = (this.animationFrame + 1) % 3; // Cycle through 0, 1, 2
      }
  }

  updateBackgroundObjects() {
      for (let obj of this.backgroundObjects) {
          let img = Map.backgroundObjects[obj.key]; 
          if (!img) continue; 
  
          // For horizontal scrolling maps:
          if (this.scrollDirection === "horizontal") {
              if (obj.speed !== 0) {
                  obj.x += obj.speed * obj.direction;
                  // When the object completely moves off the left or right, loop it:
                  if (obj.direction === -1 && obj.x <= -img.width) {
                      obj.x += img.width * 2;
                  } else if (obj.direction === 1 && obj.x >= width) {
                      obj.x = -img.width;
                  }
              }
          }
          // For vertical scrolling maps:
          else if (this.scrollDirection === "vertical") {
              if (obj.ySpeed !== 0) {
                  obj.y += obj.ySpeed * obj.yDirection;
                  // Instead of using canvas height, use the image's natural height for looping.
                  if (obj.yDirection === -1 && obj.y <= -img.height) {
                      obj.y += img.height;
                  } else if (obj.yDirection === 1 && obj.y >= img.height) {
                      obj.y = -img.height;
                  }
              }
          }
      }
  }

  display() {
      if (Map.backgroundImages[this.backgroundImageKey]) {
          image(Map.backgroundImages[this.backgroundImageKey], 0, 0, width, height);
      } else {
          background(100); // Default fallback
      }

      for (let obj of this.backgroundObjects) {
          let img = Map.backgroundObjects[obj.key];
          if (img && img.width > 0) {
            image(img, obj.x, obj.y, img.width, img.height);
            if (this.scrollDirection === "horizontal") {
              image(img, obj.x + img.width, obj.y, img.width, img.height);
              image(img, obj.x - img.width, obj.y, img.width, img.height);
            } else if (this.scrollDirection === "vertical") {
              image(img, obj.x, obj.y - img.height, img.width, img.height);
              image(img, obj.x, obj.y + img.height, img.width, img.height);
            }
          }
        }

      for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
              let tileType = this.grid[i][j];
              let tileName = this.tileMapping[tileType]; // Convert number to tile name
              
              if (tileName === "desert_tile_water" && Map.tileBlockImages["desert_tile_water"]) {
                  let frame = Map.tileBlockImages["desert_tile_water"][this.animationFrame]; // Get current frame
                  image(frame, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
              } else if (Map.tileBlockImages[tileName]) {
                  image(Map.tileBlockImages[tileName], j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
              }
          }
      }
  }

}
