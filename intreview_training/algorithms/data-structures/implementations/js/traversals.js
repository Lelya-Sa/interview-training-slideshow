/**
 * Comprehensive Traversal Patterns
 * Common traversal patterns for various data structures
 */

// Array Traversals
class ArrayTraversals {
  // Forward traversal - O(n)
  static forward(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i, arr);
    }
  }

  // Backward traversal - O(n)
  static backward(arr, callback) {
    for (let i = arr.length - 1; i >= 0; i--) {
      callback(arr[i], i, arr);
    }
  }

  // Two-pointer traversal - O(n)
  static twoPointer(arr, callback) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
      callback(arr[left], arr[right], left, right);
      left++;
      right--;
    }
  }

  // Sliding window traversal - O(n)
  static slidingWindow(arr, windowSize, callback) {
    for (let i = 0; i <= arr.length - windowSize; i++) {
      const window = arr.slice(i, i + windowSize);
      callback(window, i);
    }
  }
}

// Tree Traversal Utilities
class TreeTraversals {
  // In-order: Left, Root, Right
  static inOrder(node, callback) {
    if (node) {
      this.inOrder(node.left, callback);
      callback(node);
      this.inOrder(node.right, callback);
    }
  }

  // Pre-order: Root, Left, Right
  static preOrder(node, callback) {
    if (node) {
      callback(node);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }
  }

  // Post-order: Left, Right, Root
  static postOrder(node, callback) {
    if (node) {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node);
    }
  }

  // Level-order (BFS)
  static levelOrder(root, callback) {
    if (!root) return;
    
    const queue = [root];
    
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // Level-order with level information
  static levelOrderWithLevels(root, callback) {
    if (!root) return;
    
    const queue = [{ node: root, level: 0 }];
    
    while (queue.length > 0) {
      const { node, level } = queue.shift();
      callback(node, level);
      
      if (node.left) {
        queue.push({ node: node.left, level: level + 1 });
      }
      if (node.right) {
        queue.push({ node: node.right, level: level + 1 });
      }
    }
  }

  // Morris In-order Traversal (without stack/recursion) - O(n)
  static morrisInOrder(root, callback) {
    let current = root;
    
    while (current) {
      if (!current.left) {
        callback(current);
        current = current.right;
      } else {
        // Find inorder predecessor
        let predecessor = current.left;
        while (predecessor.right && predecessor.right !== current) {
          predecessor = predecessor.right;
        }
        
        if (!predecessor.right) {
          predecessor.right = current;
          current = current.left;
        } else {
          predecessor.right = null;
          callback(current);
          current = current.right;
        }
      }
    }
  }
}

// Graph Traversals
class GraphTraversals {
  // DFS Recursive
  static dfsRecursive(graph, startVertex, visited = new Set(), callback) {
    visited.add(startVertex);
    callback(startVertex);
    
    const neighbors = graph.getNeighbors(startVertex);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor.vertex)) {
        this.dfsRecursive(graph, neighbor.vertex, visited, callback);
      }
    }
  }

  // DFS Iterative
  static dfsIterative(graph, startVertex, callback) {
    const visited = new Set();
    const stack = [startVertex];
    
    while (stack.length > 0) {
      const vertex = stack.pop();
      
      if (!visited.has(vertex)) {
        visited.add(vertex);
        callback(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let i = neighbors.length - 1; i >= 0; i--) {
          if (!visited.has(neighbors[i].vertex)) {
            stack.push(neighbors[i].vertex);
          }
        }
      }
    }
  }

  // BFS
  static bfs(graph, startVertex, callback) {
    const visited = new Set();
    const queue = [startVertex];
    visited.add(startVertex);
    
    while (queue.length > 0) {
      const vertex = queue.shift();
      callback(vertex);
      
      const neighbors = graph.getNeighbors(vertex);
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          queue.push(neighbor.vertex);
        }
      }
    }
  }

  // BFS with levels
  static bfsWithLevels(graph, startVertex, callback) {
    const visited = new Set();
    const queue = [{ vertex: startVertex, level: 0 }];
    visited.add(startVertex);
    
    while (queue.length > 0) {
      const { vertex, level } = queue.shift();
      callback(vertex, level);
      
      const neighbors = graph.getNeighbors(vertex);
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          queue.push({ vertex: neighbor.vertex, level: level + 1 });
        }
      }
    }
  }

  // Topological Sort (DFS-based)
  static topologicalSort(graph) {
    const visited = new Set();
    const stack = [];
    
    const dfs = (vertex) => {
      visited.add(vertex);
      
      const neighbors = graph.getNeighbors(vertex);
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor.vertex)) {
          dfs(neighbor.vertex);
        }
      }
      
      stack.push(vertex);
    };
    
    for (let vertex of graph.getVertices()) {
      if (!visited.has(vertex)) {
        dfs(vertex);
      }
    }
    
    return stack.reverse();
  }
}

// Matrix Traversals
class MatrixTraversals {
  // Row-wise traversal
  static rowWise(matrix, callback) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        callback(matrix[i][j], i, j);
      }
    }
  }

  // Column-wise traversal
  static columnWise(matrix, callback) {
    for (let j = 0; j < matrix[0].length; j++) {
      for (let i = 0; i < matrix.length; i++) {
        callback(matrix[i][j], i, j);
      }
    }
  }

  // Diagonal traversal (top-left to bottom-right)
  static diagonal(matrix, callback) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Top-left to bottom-right diagonals
    for (let d = 0; d < rows + cols - 1; d++) {
      for (let i = Math.max(0, d - cols + 1); i < Math.min(rows, d + 1); i++) {
        const j = d - i;
        callback(matrix[i][j], i, j);
      }
    }
  }

  // Spiral traversal
  static spiral(matrix, callback) {
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
      // Top row
      for (let j = left; j <= right; j++) {
        callback(matrix[top][j], top, j);
      }
      top++;
      
      // Right column
      for (let i = top; i <= bottom; i++) {
        callback(matrix[i][right], i, right);
      }
      right--;
      
      // Bottom row
      if (top <= bottom) {
        for (let j = right; j >= left; j--) {
          callback(matrix[bottom][j], bottom, j);
        }
        bottom--;
      }
      
      // Left column
      if (left <= right) {
        for (let i = bottom; i >= top; i--) {
          callback(matrix[i][left], i, left);
        }
        left++;
      }
    }
  }
}

// Usage Examples

// Array traversals
const arr = [1, 2, 3, 4, 5];
console.log('Forward:');
ArrayTraversals.forward(arr, (val, idx) => console.log(`Index ${idx}: ${val}`));

console.log('\nBackward:');
ArrayTraversals.backward(arr, (val, idx) => console.log(`Index ${idx}: ${val}`));

console.log('\nTwo-pointer:');
ArrayTraversals.twoPointer(arr, (left, right) => console.log(`${left}, ${right}`));

// Tree traversals (example with simple tree structure)
class SimpleNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const tree = new SimpleNode(1,
  new SimpleNode(2, new SimpleNode(4), new SimpleNode(5)),
  new SimpleNode(3, new SimpleNode(6), new SimpleNode(7))
);

console.log('\nIn-order:');
TreeTraversals.inOrder(tree, (node) => console.log(node.value));

console.log('\nPre-order:');
TreeTraversals.preOrder(tree, (node) => console.log(node.value));

console.log('\nPost-order:');
TreeTraversals.postOrder(tree, (node) => console.log(node.value));

console.log('\nLevel-order:');
TreeTraversals.levelOrder(tree, (node) => console.log(node.value));

// Matrix traversals
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log('\nSpiral traversal:');
MatrixTraversals.spiral(matrix, (val) => console.log(val));

module.exports = {
  ArrayTraversals,
  TreeTraversals,
  GraphTraversals,
  MatrixTraversals
};

