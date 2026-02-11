/**
 * Graph Implementation
 * Nodes (vertices) connected by edges
 * Time Complexity: O(V + E) for traversal
 */

class Graph {
  constructor(directed = false) {
    this.vertices = new Map();
    this.directed = directed;
  }

  // Add vertex - O(1)
  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, []);
    }
    return this;
  }

  // Add edge - O(1)
  addEdge(vertex1, vertex2, weight = 1) {
    if (!this.vertices.has(vertex1)) {
      this.addVertex(vertex1);
    }
    if (!this.vertices.has(vertex2)) {
      this.addVertex(vertex2);
    }

    this.vertices.get(vertex1).push({ vertex: vertex2, weight });

    if (!this.directed) {
      this.vertices.get(vertex2).push({ vertex: vertex1, weight });
    }

    return this;
  }

  // Remove edge - O(V)
  removeEdge(vertex1, vertex2) {
    if (this.vertices.has(vertex1)) {
      this.vertices.set(
        vertex1,
        this.vertices.get(vertex1).filter(edge => edge.vertex !== vertex2)
      );
    }

    if (!this.directed && this.vertices.has(vertex2)) {
      this.vertices.set(
        vertex2,
        this.vertices.get(vertex2).filter(edge => edge.vertex !== vertex1)
      );
    }

    return this;
  }

  // Remove vertex - O(V + E)
  removeVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      return this;
    }

    // Remove all edges to this vertex
    for (let [v, edges] of this.vertices) {
      this.vertices.set(
        v,
        edges.filter(edge => edge.vertex !== vertex)
      );
    }

    this.vertices.delete(vertex);
    return this;
  }

  // Get neighbors - O(1)
  getNeighbors(vertex) {
    return this.vertices.get(vertex) || [];
  }

  // Depth-First Search (DFS) - O(V + E)
  dfs(startVertex, visited = new Set(), result = []) {
    visited.add(startVertex);
    result.push(startVertex);

    const neighbors = this.getNeighbors(startVertex);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor.vertex)) {
        this.dfs(neighbor.vertex, visited, result);
      }
    }

    return result;
  }

  // DFS Iterative - O(V + E)
  dfsIterative(startVertex) {
    const visited = new Set();
    const result = [];
    const stack = [startVertex];

    while (stack.length > 0) {
      const vertex = stack.pop();

      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);

        const neighbors = this.getNeighbors(vertex);
        for (let i = neighbors.length - 1; i >= 0; i--) {
          if (!visited.has(neighbors[i].vertex)) {
            stack.push(neighbors[i].vertex);
          }
        }
      }
    }

    return result;
  }

  // Breadth-First Search (BFS) - O(V + E)
  bfs(startVertex) {
    const visited = new Set();
    const result = [];
    const queue = [startVertex];
    visited.add(startVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      const neighbors = this.getNeighbors(vertex);
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          queue.push(neighbor.vertex);
        }
      }
    }

    return result;
  }

  // Check if path exists - O(V + E)
  hasPath(startVertex, endVertex) {
    const visited = new Set();
    const queue = [startVertex];
    visited.add(startVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();

      if (vertex === endVertex) {
        return true;
      }

      const neighbors = this.getNeighbors(vertex);
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          queue.push(neighbor.vertex);
        }
      }
    }

    return false;
  }

  // Get all vertices - O(V)
  getVertices() {
    return Array.from(this.vertices.keys());
  }

  // Get all edges - O(V + E)
  getEdges() {
    const edges = [];
    for (let [vertex, neighbors] of this.vertices) {
      for (let neighbor of neighbors) {
        edges.push({
          from: vertex,
          to: neighbor.vertex,
          weight: neighbor.weight
        });
      }
    }
    return edges;
  }

  // Get vertex count - O(1)
  getVertexCount() {
    return this.vertices.size;
  }

  // Get edge count - O(V + E)
  getEdgeCount() {
    let count = 0;
    for (let neighbors of this.vertices.values()) {
      count += neighbors.length;
    }
    return this.directed ? count : count / 2;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.vertices.size === 0;
  }

  // Clear graph - O(1)
  clear() {
    this.vertices.clear();
  }
}

// Usage Example
const graph = new Graph(false); // Undirected graph

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');

console.log('Vertices:', graph.getVertices()); // ['A', 'B', 'C', 'D']
console.log('Edges:', graph.getEdges());
console.log('DFS:', graph.dfs('A')); // ['A', 'B', 'D', 'C']
console.log('BFS:', graph.bfs('A')); // ['A', 'B', 'C', 'D']
console.log('Has path A to D:', graph.hasPath('A', 'D')); // true
console.log('Neighbors of A:', graph.getNeighbors('A')); // [{vertex: 'B', weight: 1}, {vertex: 'C', weight: 1}]

// Directed graph example
const directedGraph = new Graph(true);
directedGraph.addEdge('A', 'B');
directedGraph.addEdge('B', 'C');
directedGraph.addEdge('A', 'C');
console.log('Directed graph edges:', directedGraph.getEdges());

module.exports = Graph;

