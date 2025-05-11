class Node {
    constructor(row, col, x, y) {
      this.row = row; // Grid row index
      this.col = col; // Grid column index
      this.x = x; // x-coordinate (center) in pixels
      this.y = y; // y-coordinate (center) in pixels
  
      // Store references to neighboring nodes
      this.left = null;
      this.right = null;
      this.up = null;
      this.down = null;
    }
  }
  
  function buildPlatformNetwork(map) {
    const rows = map.grid.length;
    const cols = map.grid[0].length;
    const tileSize = map.tileSize;
  
    const nodeGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => []));
    const nodes = [];
  
    //console.log("Building Platform Network...");
  
    // Create a node for every platform-top cell
    for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < cols; j++) {
            if ((map.grid[i][j] === 0 || map.tileMapping[map.grid[i][j]] === "underground_wall1") && (map.grid[i + 1][j] > 0 && map.tileMapping[map.grid[i + 1][j]] !== "underground_wall1")) {
                const node = new Node(i, j, j * tileSize + tileSize / 2, i * tileSize + tileSize / 2);
                nodeGrid[i][j].push(node);
                nodes.push(node);
            }
        }
    }
  
    // each platform-top node has two horizontal neighbors and link existing ones
    for (const node of nodes) {
        const { row, col } = node;
  
        // Left neighbor (existing)
        if (col > 0 && nodeGrid[row][col - 1].length > 0) {
            node.left = nodeGrid[row][col - 1][0];
            nodeGrid[row][col - 1][0].right = node;
        }
        // Right neighbor (existing)
        if (col < cols - 1 && nodeGrid[row][col + 1].length > 0) {
            node.right = nodeGrid[row][col + 1][0];
            nodeGrid[row][col + 1][0].left = node;
        }
    }
  
    // Newly Created Horizontal Nodes Are Connected
    const newNodes = [];  
    for (const node of nodes) {
        const { row, col } = node;
        let neighborCount = 0;
  
        // Check left neighbor
        if (col > 0 && ((map.grid[row][col - 1] >= 1 && map.tileMapping[map.grid[row][col - 1]] !== "underground_wall1") || nodeGrid[row][col - 1].length > 0)) {
            neighborCount++;
        }
        // Check right neighbor
        if (col < cols - 1 && ((map.grid[row][col + 1] >= 1 && map.tileMapping[map.grid[row][col + 1]] !== "underground_wall1") || nodeGrid[row][col + 1].length > 0)) {
            neighborCount++;
        }
  
        // If the node has fewer than 2 neighbors, we add left/right filler nodes
        if (neighborCount < 2) {
            //-------------------------------------
            // FILLER NODE TO THE LEFT
            //-------------------------------------
            if (col > 0 && nodeGrid[row][col - 1].length === 0) {
            // Check tile data
            const leftTileId = map.grid[row][col - 1];
            const leftTileName = map.tileMapping[leftTileId] || "";
            
            // Treat "underground_wall1" as if it's basically 0
            const isLikeEmpty = (leftTileId === 0 || leftTileName === "underground_wall1");
            
            if (isLikeEmpty) {
                const newNode = new Node(
                row,
                col - 1,
                (col - 1) * tileSize + tileSize / 2,
                row * tileSize + tileSize / 2
                );
                nodeGrid[row][col - 1].push(newNode);
                newNodes.push(newNode);
        
                // Link them horizontally
                newNode.right = node;
                node.left = newNode;
            }
            }
        
            //-------------------------------------
            // FILLER NODE TO THE RIGHT
            //-------------------------------------
            if (col < cols - 1 && nodeGrid[row][col + 1].length === 0) {
            const rightTileId = map.grid[row][col + 1];
            const rightTileName = map.tileMapping[rightTileId] || "";
        
            const isLikeEmpty = (rightTileId === 0 || rightTileName === "underground_wall1");
        
            if (isLikeEmpty) {
                const newNode = new Node(
                row,
                col + 1,
                (col + 1) * tileSize + tileSize / 2,
                row * tileSize + tileSize / 2
                );
                nodeGrid[row][col + 1].push(newNode);
                newNodes.push(newNode);
        
                // Link them horizontally
                newNode.left = node;
                node.right = newNode;
            }
            }
        }
  
    }
    nodes.push(...newNodes);
  
    // Fill Vertically Downward and Connect Horizontally
    for (const node of nodes) {
        let currentRow = node.row;
        let lastNode = node;
  
        while (currentRow < rows - 1) {
            if (nodeGrid[currentRow + 1][node.col].length > 0) {
                // Connect downward
                lastNode.down = nodeGrid[currentRow + 1][node.col][0];
                nodeGrid[currentRow + 1][node.col][0].up = lastNode;
                break;
            }
            // check if the tile below is like empty
            const tileBelowId = map.grid[currentRow + 1][node.col];
            const tileBelowName = map.tileMapping[tileBelowId] || "";
            // We treat it like empty if it is 0 or it is "underground_wall1"
            const isLikeEmpty = (tileBelowId === 0 || tileBelowName === "underground_wall1");

            // If it's not "empty/wall," that means it's a real platform => stop
            if (!isLikeEmpty) {
                break;
            }
            const newNode = new Node(
                currentRow + 1,
                node.col,
                node.col * tileSize + tileSize / 2,
                (currentRow + 1) * tileSize + tileSize / 2
            );
            nodeGrid[currentRow + 1][node.col].push(newNode);
            nodes.push(newNode);
  
            // Connect Downward
            lastNode.down = newNode;
            newNode.up = lastNode;
  
            // Connect Horizontally Across the Same Row
            if (node.col > 0 && nodeGrid[currentRow + 1][node.col - 1].length > 0) {
                newNode.left = nodeGrid[currentRow + 1][node.col - 1][0];
                nodeGrid[currentRow + 1][node.col - 1][0].right = newNode;
            }
            if (node.col < cols - 1 && nodeGrid[currentRow + 1][node.col + 1].length > 0) {
                newNode.right = nodeGrid[currentRow + 1][node.col + 1][0];
                nodeGrid[currentRow + 1][node.col + 1][0].left = newNode;
            }
  
            lastNode = newNode;
            currentRow++;
        }
    }
  
    // Print Node Connections
    // nodes.forEach(node => {
    //     console.log(`Node at (${node.row}, ${node.col}) Links - Left: ${!!node.left}, Right: ${!!node.right}, Up: ${!!node.up}, Down: ${!!node.down}`);
    // });
  
    console.log("Built Platform Network:", nodeGrid, nodes);
    return { nodeGrid, nodes };
  }
  
  
  
  function drawNodeNetwork(nodeGrid, nodes) {
    // Draw each node as a blue dot
    strokeWeight(2);
    for (const node of nodes) {
      fill('blue');
      stroke('white');
      ellipse(node.x, node.y, 10, 10);
    }
  
    // Draw red lines to visualize connections between nodes
    stroke('red');
    for (const node of nodes) {
      if (node.right) line(node.x, node.y, node.right.x, node.right.y);
      if (node.down) line(node.x, node.y, node.down.x, node.down.y);
    }
  }