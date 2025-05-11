class AIPlayerHard extends Player {
  constructor(index, x, y, spriteIndex) {
    super(index, x, y, null, null, null, null, spriteIndex);
    this.graph = () => mapGraph;
    this.path = [];
    this.state = "seekingWeapon";
    this.currentNode = null;
    this.targetWeapon = null;
    this.blockedFrames = 0;
    this.replanAttempts = 0;
    this.lastWeaponCheck = 0;
    this.shootInterval = 150;
    this.lastAIShoot = 0;
    this.targetPowerUp = null;
    this.lastPUCheck = 0;
    this.dodgeCooldown = 0;
    this.isDodging = false;
    this.avoidWeapons       = [];  // weapons to skip when stuck
    this.avoidPowerUps      = [];  // power-ups to skip when stuck
  }

  update() {
    const footX = this.x + this.width / 2;
    const footY = this.y + this.height;
    this.row = Math.floor(footY / map.tileSize);
    this.col = Math.floor(footX / map.tileSize);
    this.aiDx = 0;

    const target = (players[0] === this) ? players[1] : players[0];

    this.maybeSeekPowerUp();

    if (this.canDodgeBullet()) {
      this.performDodge();
      this.isDodging = true;
    } else if (this.isDodging && this.path.length === 0) {
      this.isDodging = false;
      this.path = [];
    }

    switch (this.state) {

      case "seekingPowerUp":
      // If we somehow acquired the target power-up or it disappeared, reset state
      if (!this.targetPowerUp) {
        this.state = this.weapon ? "shooting" : "seekingWeapon";
        break;
      }
      // Attack the opponent if a clear shot is available, even while moving to the power-up
      const aiCenter = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
      if (this.weapon && this.hasClearShot(aiCenter, target)) {
        this.tryShoot();  // fire at opponent without stopping movement
      }
      // Continue moving along the path towards the power-up
      if (this.path.length > 0) {
        this.followPath();
      }
      // If we have reached the end of the path (close to the power-up), switch state appropriately
      if (this.path.length === 0) {
        // Power-up presumably collected or reached
        this.targetPowerUp = null;
        this.state = this.weapon ? "shooting" : "seekingWeapon";
        console.log("Power-up path complete, switching to " + this.state);
      }
      break;

      case "seekingWeapon":
        if (this.weapon) {
          this.state = "shooting";
          this.path = [];
          break;
        }

        this.chooseBestWeapon();

        if (this.targetWeapon && this.path.length === 0) {
          const n = this.targetWeapon.getClosestPlatformNode();
          this.path = n ? this.findPath(n.x, n.y) : [];
        }

        if (this.path.length) this.followPath();
        break;

      case "shooting":
        if (!this.weapon) {
          this.state = "seekingWeapon";
          this.path = [];
          this.targetWeapon = null;
          break;
        }

        const aiCenterShooting = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
        if (this.hasClearShot(aiCenterShooting, target)) {
          this.tryShoot();
        }

        if (this.path.length === 0) {
          const shootNode = this.findShootingPosition();
          this.path = shootNode ? this.findPath(shootNode.x, shootNode.y) : [];
        }

        if (this.path.length > 0) this.followPath();
        break;

      default:
        this.state = "seekingWeapon";
    }

    const prevX = this.x;
    super.update();

    if (Math.abs(this.x - prevX) < 1 && this.aiDx !== 0) {
      this.blockedFrames++;
    } else {
      this.blockedFrames = 0;
    }

    if (this.weapon && this.state === "seekingWeapon") {
      this.state = "shooting";
      this.path = [];
      this.targetWeapon = null;
    }

    this.maybeReplanPath();

    if (this.dodgeCooldown > 0) {
      this.dodgeCooldown--;
    }
  }

  canDodgeBullet() {
    if (this.dodgeCooldown > 0 || this.isJumping) return false;

    const dangerBullets = bullets.filter(b => b.shooter !== this && dist(b.x, b.y, this.x, this.y) < 150);
    return dangerBullets.length > 0;
  }

  performDodge() {
    // 1) find the single most dangerous bullet
    let closest = null, minD = Infinity;
    for (const b of bullets) {
      if (b.shooter === this) continue;
      const d = dist(b.x, b.y, this.x, this.y);
      if (d < 150 && d < minD) { minD = d; closest = b; }
    }
    if (!closest) return;
  
    // 2) compute a dodge direction opposite the bullet
    let dx = this.x - closest.x, dy = this.y - closest.y;
    let dirX = Math.sign(dx), dirY = Math.sign(dy);
  
    // 3) don’t dodge toward the opponent
    const enemy = (players[0] === this) ? players[1] : players[0];
    if ((dirX > 0 && enemy.x > this.x) || (dirX < 0 && enemy.x < this.x)) {
      dirX = 0;
    }
  
    // 4) prefer a purely horizontal sidestep if possible
    let dodgeX = dirX, dodgeY = 0;
    if (dodgeX === 0) {
      // if side-step is unsafe or points toward enemy, dodge vertically
      dodgeY = dirY;
    }
  
    // 5) build the dodge target & path
    const D = 100;
    const node = this.getNearestNode(this.x + dodgeX * D, this.y + dodgeY * D);
    if (node) {
      this.path = this.findPath(node.x, node.y);
      this.dodgeCooldown = 60;
      console.log(
        `Dodging ${dodgeX>0?"right":dodgeX<0?"left":dodgeY>0?"down":"up"} ` +
        `from bullet at (${closest.x.toFixed(1)},${closest.y.toFixed(1)})`
      );
    }
  }
  

  maybeReplanPath() {
    if (this.blockedFrames < 30) return;
    this.targetWeapon = null;
    this.path = [];
    this.blockedFrames = 0;
    this.replanAttempts = 0;
    this.state = this.weapon ? "shooting" : "seekingWeapon";
  }

  chooseBestWeapon() {
    if (millis() - this.lastWeaponCheck < 200) return;
    this.lastWeaponCheck = millis();

    let bestWeapon = null, bestPath = null, bestCost = Infinity;

    for (const w of weapons) {
      if (!w.landed || w.owner) continue;
      const n = w.getClosestPlatformNode();
      if (!n) continue;
      const path = this.findPath(n.x, n.y);
      if (path.length && path.length < bestCost) {
        bestCost = path.length;
        bestWeapon = w;
        bestPath = path;
      }
    }

    if (bestWeapon && (bestWeapon !== this.targetWeapon || bestPath.length < this.path.length)) {
      this.targetWeapon = bestWeapon;
      this.path = bestPath;
    }
  }

  tryShoot() {
    if (millis() - this.lastAIShoot >= this.shootInterval) {
      this.shoot();
      this.lastAIShoot = millis();
    }
  }

  findClosestPU(list) {
    let best = null, bestLen = Infinity;
    for (const pu of list) {
      if (pu.vy !== 0) continue;                 // still falling
      const node = this.getNearestNode(pu.x, pu.y);
      if (!node) continue;
      const path = this.findPath(node.x, node.y);
      if (path.length && path.length < bestLen) {
        best     = { obj: pu, node, path };
        bestLen  = path.length;
      }
    }
    return best;
  }
  
  // decide if a PU should be pursued and, if so, switch state
  maybeSeekPowerUp() {
    if (millis() - this.lastPUCheck < 1000) return;  // 1s throttle
    this.lastPUCheck = millis();
    
    const wantsHealth = this.health < 35;                    // below 25% health triggers health-seeking
    const wantsShield = !PowerUps.isShieldActiveFor(this);   // need shield if none active
    
    let candidate = null;
    if (wantsHealth) {
      candidate = this.findClosestPU(PowerUps.activeHealthRegen.filter(pu => !this.avoidPowerUps.includes(pu)));
    }
    if (!candidate && wantsShield) {
      candidate = this.findClosestPU(PowerUps.activeShield.filter(pu => !this.avoidPowerUps.includes(pu)));
    }
    if (candidate) {
      this.targetPowerUp = candidate.obj;
      this.path = candidate.path;
      this.expectedPathLength = this.path.length;
      this.pathFollowFrames = 0;
      this.state = "seekingPowerUp";
      this.currentNode = null;
      console.log(`Switching to seekingPowerUp – path of ${this.path.length} nodes toward (${candidate.obj.x}, ${candidate.obj.y})`);
    }
  }  

  // Follow the computed path.
  followPath() {
    if (this.path.length === 0) return;
  
    let nextStep = this.path[0];
    const aiCenterX = this.x + this.width / 2;
    const footY = this.y + this.height/2;
  
    // If starting a new node, reset the jump flag
    if (!this.currentNode) {
      this.currentNode = this.getNearestNode(aiCenterX, footY);
      this.currentNodeJumped = false;
    }
  
    let verticalDiff = nextStep.y - footY;      // If negative => nextStep is above
    let horizontalDiff = nextStep.x - aiCenterX;
    let horizontalDistance = Math.abs(horizontalDiff);
  
    console.log(
      `Following path: Next step at (${nextStep.x}, ${nextStep.y}), ` +
      `verticalDiff=${verticalDiff}, horizontalDistance=${horizontalDistance}`
    );
  
    // --- CASE 1: Next node is above foot => jump needed ---
    if (verticalDiff < -15) {
      // Decide on horizontal movement while jumping
      // We'll wait until the apex (vy >= 0) before moving horizontally
      let dx = Math.sign(horizontalDiff) * this.speed;
  
      // Initiate the jump once, if not already jumping
      if (!this.isJumping && !this.currentNodeJumped) {
        console.log("Initiating jump.");
        this.jump();
        this.currentNodeJumped = true;
      }
  
      // While ascending (vy < 0), do not move horizontally
      // Once vy >= 0 (apex or descending), move horizontally
      if (this.isJumping && this.vy < 0) {
        this.aiDx = 0;
        console.log("Ascending: waiting to reach apex before horizontal movement.");
      } else {
        this.aiDx = dx;
        console.log("Descending or at apex: moving horizontally.");
      }
  
    // --- CASE 2: Next node is at or below foot => no jump ---
    } else {
      // Move horizontally only
      let dx = Math.sign(horizontalDiff) * this.speed;
      this.aiDx = dx;
      console.log("Next node is same-level or below. Moving horizontally, no jump needed.");
    }
  
    // When close enough horizontally to the node, treat it as reached
    if (horizontalDistance < 10) {
      console.log("Reached target node horizontally; removing from path.");
      this.currentNode = nextStep;
      this.currentNodeJumped = false;  // reset jump flag for the new node
      this.path.shift();
    }
  }
  
  // --- Pathfinding Methods ---

  findPath(targetX, targetY) {
    let startNode = this.getStartingNode();
    let targetNode = this.getNearestNode(targetX, targetY);
    if (!startNode || !targetNode) {
      console.log("Pathfinding failed: missing start or target node.");
      return [];
    }
    let path = this.aStarSearch(startNode, targetNode);
    console.log(`Path found with ${path.length} steps.`);
    return path;
  }

  getNearestNode(targetX = this.x + this.width / 2, targetY = this.y + this.height / 2) {
    let nearest = null;
    let minDist = Infinity;
    for (const node of mapGraph.nodes) {
      let dx = node.x - targetX;
      let dy = node.y - targetY;
      let d = dx * dx + dy * dy;
      if (d < minDist) {
        minDist = d;
        nearest = node;
      }
    }
    return nearest;
  }

  getStartingNode() {
    const footX = this.x + this.width / 2;
    const footY = this.y + this.height;
    return this.getNearestNode(footX, footY);
  }

  // --- Modified A* Search with Vertical Chain Constraint ---

  /**
   * The modified A* search tracks a vertical chain count.
   * A composite state is stored as { node, chain } where:
   * - chain is the number of consecutive vertical moves (neighbors with the same column) taken to reach this node.
   * If a neighbor is not in the same column, chain resets to 0.
   * We skip any neighbor that would result in chain > 5.
   */
  aStarSearch(start, goal) {
    if (!mapGraph || !mapGraph.nodeGrid) return [];

    // Helper to generate a composite key for state {node, chain}
    const stateKey = (state) => `${state.node.row}-${state.node.col}-${state.chain}`;

    let openSet = [{ node: start, chain: 0 }];
    let cameFrom = new Map();
    let gScore = new Map();
    let fScore = new Map();

    const startState = { node: start, chain: 0 };
    gScore.set(stateKey(startState), 0);
    fScore.set(stateKey(startState), this.heuristic(start, goal));

    while (openSet.length > 0) {
      // Pick the state in openSet with smallest fScore.
      let currentState = openSet.reduce((a, b) =>
        fScore.get(stateKey(a)) < fScore.get(stateKey(b)) ? a : b
      );
      let currentKey = stateKey(currentState);

      // Check if we've reached the goal (ignore chain count on goal)
      if (currentState.node === goal) {
        return this.reconstructPath(cameFrom, currentKey);
      }

      // Remove currentState from openSet.
      openSet = openSet.filter(state => stateKey(state) !== currentKey);

      // Consider all neighbors of currentState.node.
      let neighbors = [currentState.node.left, currentState.node.right, currentState.node.up, currentState.node.down].filter(n => n != null);
      for (let neighbor of neighbors) {
        // Determine new vertical chain:
        let newChain = (Math.abs(neighbor.x - currentState.node.x) < 1) ? currentState.chain + 1 : 0;
        // If newChain exceeds 5, skip this neighbor.
        if (newChain > 5) continue;

        let neighborState = { node: neighbor, chain: newChain };
        let neighborKey = stateKey(neighborState);

        let tentativeG = gScore.get(currentKey) + 1; // cost for one step

        if (!gScore.has(neighborKey) || tentativeG < gScore.get(neighborKey)) {
          cameFrom.set(neighborKey, currentKey);
          gScore.set(neighborKey, tentativeG);
          fScore.set(neighborKey, tentativeG + this.heuristic(neighbor, goal));

          // If neighborState is not already in openSet, add it.
          if (!openSet.find(state => stateKey(state) === neighborKey)) {
            openSet.push(neighborState);
          }
        }
      }
    }

    console.log("A* search did not find a path.");
    return [];
  }

  /**
   * Reconstructs a path from the composite state keys.
   * Returns an array of nodes.
   */
  reconstructPath(cameFrom, currentKey) {
    let totalKeys = [currentKey];
    while (cameFrom.has(currentKey)) {
      currentKey = cameFrom.get(currentKey);
      totalKeys.unshift(currentKey);
    }
    // Convert composite keys to actual nodes.
    let path = totalKeys.map(keyStr => {
      // Key format: "row-col-chain"
      let parts = keyStr.split("-");
      let row = parseInt(parts[0]);
      let col = parseInt(parts[1]);
      // Find the node in mapGraph.nodes with matching row and col.
      return mapGraph.nodes.find(n => n.row === row && n.col === col);
    });
    // Filter out any undefined (if any) and return.
    return path.filter(n => n != null);
  }

  heuristic(node, goal) {
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
  }

  // --- Weapon and Shooting Methods ---

  findWeapon() {
    let newWeapon = this.findClosestWeapon();
    if (!newWeapon) {
      console.log("No weapon found on the map.");
      this.targetWeapon = null;
      return;
    }
    let currentDistance = this.targetWeapon ? dist(this.x, this.y, this.targetWeapon.x, this.targetWeapon.y) : Infinity;
    let newDistance = dist(this.x, this.y, newWeapon.x, newWeapon.y);
    if (!this.targetWeapon || newDistance < currentDistance) {
      this.targetWeapon = newWeapon;
      console.log(`Targeting closest weapon at (${newWeapon.x}, ${newWeapon.y}).`);
      let snapped = newWeapon.getClosestPlatformNode();
      if (snapped) {
        this.path = this.findPath(snapped.x, snapped.y);
        console.log(`Calculated new path to weapon at (${snapped.x}, ${snapped.y}).`);
      }
    }
  }

  findClosestWeapon() {
    let closest = null;
    let minD = Infinity;
    for (let weapon of weapons) {
      if (!weapon.landed) continue;
      let snapped = weapon.getClosestPlatformNode();
      if (!snapped) continue;
      let d = dist(this.x, this.y, snapped.x, snapped.y);
      if (d < minD) {
        minD = d;
        closest = weapon;
      }
    }
    return closest;
  }

  hasClearShot(node, player) {
    let x0 = node.x;
    let y0 = node.y;
    const x1 = player.x + player.width / 2;
    const y1 = player.y + player.height / 2;
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    
    while (true) {
      const col = Math.floor(x0 / map.tileSize);
      const row = Math.floor(y0 / map.tileSize);
      const tileNum = map.grid[row]?.[col];
      if (tileNum > 0 && map.tileMapping[tileNum] !== "underground_wall1") {
        return false;
      }
      if (Math.abs(x0 - x1) < 1 && Math.abs(y0 - y1) < 1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
    return true;
  }

  findShootingPosition() {
    let target = (players[0] === this) ? players[1] : players[0];
    let bestNode = null;
    let bestD = Infinity;
    for (const node of mapGraph.nodes) {
      if (!this.hasClearShot(node, target)) continue;
      if (dist(node.x, node.y, target.x, target.y) < 400) continue; // enforce safe distance
      let d = dist(this.x, this.y, node.x, node.y);
      if (d < bestD) {
        bestD = d;
        bestNode = node;
      }
    }
    if (bestNode) {
      console.log(`Shooting position selected at (${bestNode.x}, ${bestNode.y}).`);
    } else {
      console.log("No shooting position meets the criteria.");
    }
    return bestNode;
  }

  findEvadePosition() {
    let target = (players[0] === this) ? players[1] : players[0];
    let bestNode = null;
    let bestDist = Infinity;
    
    for (const node of mapGraph.nodes) {
      // Must be outside the safe distance from the target
      let distToTarget = dist(node.x, node.y, target.x, target.y);
      if (distToTarget < 400) continue; // or whatever your safeDistance is
  
      // OPTIONAL: if you still want to shoot while evading, require a clear shot:
      if (!this.hasClearShot({ x: node.x, y: node.y }, target)) continue;
  
      // Then pick whichever safe node is easiest for AI to get to
      let distToAI = dist(this.x, this.y, node.x, node.y);
      if (distToAI < bestDist) {
        bestDist = distToAI;
        bestNode = node;
      }
    }
  
    if (bestNode) {
      console.log(`Evade position selected at (${bestNode.x}, ${bestNode.y}).`);
    } else {
      console.log("No valid evade position found.");
    }
    return bestNode;
  }  
}     