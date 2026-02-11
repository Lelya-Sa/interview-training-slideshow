/**
 * Binary Search Tree Implementation
 * Binary tree with ordering property: left < node < right
 * Time Complexity: O(log n) average, O(n) worst
 */

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  // Insert value - O(log n) average
  insert(value) {
    const newNode = new TreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
      this.size++;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          this.size++;
          return this;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          this.size++;
          return this;
        }
        current = current.right;
      } else {
        // Value already exists
        return this;
      }
    }
  }

  // Search for value - O(log n) average
  search(value) {
    let current = this.root;

    while (current) {
      if (value === current.value) {
        return current;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  // Check if contains value - O(log n) average
  contains(value) {
    return this.search(value) !== null;
  }

  // Delete value - O(log n) average
  delete(value) {
    this.root = this._deleteNode(this.root, value);
    return this;
  }

  _deleteNode(node, value) {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteNode(node.right, value);
    } else {
      // Node to delete found
      this.size--;

      // Case 1: No children
      if (!node.left && !node.right) {
        return null;
      }

      // Case 2: One child
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // Case 3: Two children
      // Find in-order successor (smallest in right subtree)
      const successor = this._findMin(node.right);
      node.value = successor.value;
      node.right = this._deleteNode(node.right, successor.value);
    }

    return node;
  }

  // Find minimum value - O(log n)
  findMin(node = this.root) {
    if (!node) {
      return null;
    }
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // Find maximum value - O(log n)
  findMax(node = this.root) {
    if (!node) {
      return null;
    }
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  // In-order traversal (Left, Root, Right) - O(n)
  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  // Pre-order traversal (Root, Left, Right) - O(n)
  preOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  // Post-order traversal (Left, Right, Root) - O(n)
  postOrder(node = this.root, result = []) {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // Level-order traversal (BFS) - O(n)
  levelOrder() {
    if (!this.root) {
      return [];
    }

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.value);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return result;
  }

  // In-order traversal with callback - O(n)
  inOrderTraverse(callback, node = this.root) {
    if (node) {
      this.inOrderTraverse(callback, node.left);
      callback(node.value, node);
      this.inOrderTraverse(callback, node.right);
    }
  }

  // Pre-order traversal with callback - O(n)
  preOrderTraverse(callback, node = this.root) {
    if (node) {
      callback(node.value, node);
      this.preOrderTraverse(callback, node.left);
      this.preOrderTraverse(callback, node.right);
    }
  }

  // Post-order traversal with callback - O(n)
  postOrderTraverse(callback, node = this.root) {
    if (node) {
      this.postOrderTraverse(callback, node.left);
      this.postOrderTraverse(callback, node.right);
      callback(node.value, node);
    }
  }

  // Level-order traversal with callback - O(n)
  levelOrderTraverse(callback) {
    if (!this.root) {
      return;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.value, node);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  // Zigzag traversal (spiral) - O(n)
  zigzagTraversal() {
    if (!this.root) {
      return [];
    }

    const result = [];
    const queue = [this.root];
    let leftToRight = true;

    while (queue.length > 0) {
      const levelSize = queue.length;
      const level = [];

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        
        if (leftToRight) {
          level.push(node.value);
        } else {
          level.unshift(node.value);
        }

        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }

      result.push(...level);
      leftToRight = !leftToRight;
    }

    return result;
  }

  // Boundary traversal - O(n)
  boundaryTraversal() {
    if (!this.root) {
      return [];
    }

    const result = [];

    // Left boundary (excluding leaves)
    const getLeftBoundary = (node) => {
      if (!node || (!node.left && !node.right)) {
        return;
      }
      result.push(node.value);
      if (node.left) {
        getLeftBoundary(node.left);
      } else if (node.right) {
        getLeftBoundary(node.right);
      }
    };

    // Right boundary (excluding leaves, in reverse)
    const getRightBoundary = (node) => {
      if (!node || (!node.left && !node.right)) {
        return;
      }
      if (node.right) {
        getRightBoundary(node.right);
      } else if (node.left) {
        getRightBoundary(node.left);
      }
      result.push(node.value);
    };

    // Leaf nodes
    const getLeaves = (node) => {
      if (!node) {
        return;
      }
      if (!node.left && !node.right) {
        result.push(node.value);
        return;
      }
      getLeaves(node.left);
      getLeaves(node.right);
    };

    result.push(this.root.value);
    getLeftBoundary(this.root.left);
    getLeaves(this.root);
    getRightBoundary(this.root.right);

    return result;
  }

  // Vertical traversal - O(n)
  verticalTraversal() {
    if (!this.root) {
      return [];
    }

    const map = new Map(); // column -> [values]
    const queue = [{ node: this.root, column: 0 }];

    while (queue.length > 0) {
      const { node, column } = queue.shift();

      if (!map.has(column)) {
        map.set(column, []);
      }
      map.get(column).push(node.value);

      if (node.left) {
        queue.push({ node: node.left, column: column - 1 });
      }
      if (node.right) {
        queue.push({ node: node.right, column: column + 1 });
      }
    }

    // Sort by column and return values
    const sortedColumns = Array.from(map.keys()).sort((a, b) => a - b);
    return sortedColumns.map(col => map.get(col));
  }

  // Get height of tree - O(n)
  height(node = this.root) {
    if (!node) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Get depth of node - O(log n)
  depth(value) {
    let current = this.root;
    let depth = 0;

    while (current) {
      if (value === current.value) {
        return depth;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
      depth++;
    }

    return -1;
  }

  // Check if valid BST - O(n)
  isValid() {
    return this._isValidBST(this.root, -Infinity, Infinity);
  }

  _isValidBST(node, min, max) {
    if (!node) {
      return true;
    }

    if (node.value <= min || node.value >= max) {
      return false;
    }

    return (
      this._isValidBST(node.left, min, node.value) &&
      this._isValidBST(node.right, node.value, max)
    );
  }

  // Get size - O(1)
  getSize() {
    return this.size;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.size === 0;
  }

  // Clear tree - O(1)
  clear() {
    this.root = null;
    this.size = 0;
  }
}

// Usage Example
const bst = new BinarySearchTree();

bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

console.log('In-order:', bst.inOrder()); // [20, 30, 40, 50, 60, 70, 80]
console.log('Pre-order:', bst.preOrder()); // [50, 30, 20, 40, 70, 60, 80]
console.log('Post-order:', bst.postOrder()); // [20, 40, 30, 60, 80, 70, 50]
console.log('Level-order:', bst.levelOrder()); // [50, 30, 70, 20, 40, 60, 80]

console.log('Search 40:', bst.search(40)?.value); // 40
console.log('Contains 100:', bst.contains(100)); // false
console.log('Min:', bst.findMin()?.value); // 20
console.log('Max:', bst.findMax()?.value); // 80
console.log('Height:', bst.height()); // 2
console.log('Depth of 40:', bst.depth(40)); // 2
console.log('Is valid BST:', bst.isValid()); // true

bst.delete(30);
console.log('After delete 30:', bst.inOrder()); // [20, 40, 50, 60, 70, 80]

module.exports = { BinarySearchTree, TreeNode };

