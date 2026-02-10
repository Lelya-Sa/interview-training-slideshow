"""
Graph Implementation in Python
Nodes (vertices) connected by edges
Time Complexity: O(V + E) for traversal
"""

class Graph:
    def __init__(self, directed=False):
        self.vertices = {}
        self.directed = directed

    def add_vertex(self, vertex):
        """Add vertex - O(1)"""
        if vertex not in self.vertices:
            self.vertices[vertex] = []
        return self

    def add_edge(self, vertex1, vertex2, weight=1):
        """Add edge - O(1)"""
        if vertex1 not in self.vertices:
            self.add_vertex(vertex1)
        if vertex2 not in self.vertices:
            self.add_vertex(vertex2)

        self.vertices[vertex1].append({'vertex': vertex2, 'weight': weight})

        if not self.directed:
            self.vertices[vertex2].append({'vertex': vertex1, 'weight': weight})

        return self

    def get_neighbors(self, vertex):
        """Get neighbors - O(1)"""
        return self.vertices.get(vertex, [])

    def dfs(self, start_vertex, visited=None, result=None):
        """Depth-First Search (DFS) - O(V + E)"""
        if visited is None:
            visited = set()
        if result is None:
            result = []
        
        visited.add(start_vertex)
        result.append(start_vertex)

        neighbors = self.get_neighbors(start_vertex)
        for neighbor in neighbors:
            if neighbor['vertex'] not in visited:
                self.dfs(neighbor['vertex'], visited, result)

        return result

    def dfs_iterative(self, start_vertex):
        """DFS Iterative - O(V + E)"""
        visited = set()
        result = []
        stack = [start_vertex]

        while stack:
            vertex = stack.pop()

            if vertex not in visited:
                visited.add(vertex)
                result.append(vertex)

                neighbors = self.get_neighbors(vertex)
                for neighbor in reversed(neighbors):
                    if neighbor['vertex'] not in visited:
                        stack.append(neighbor['vertex'])

        return result

    def bfs(self, start_vertex):
        """Breadth-First Search (BFS) - O(V + E)"""
        visited = set()
        result = []
        queue = [start_vertex]
        visited.add(start_vertex)

        while queue:
            vertex = queue.pop(0)
            result.append(vertex)

            neighbors = self.get_neighbors(vertex)
            for neighbor in neighbors:
                if neighbor['vertex'] not in visited:
                    visited.add(neighbor['vertex'])
                    queue.append(neighbor['vertex'])

        return result

    def has_path(self, start_vertex, end_vertex):
        """Check if path exists - O(V + E)"""
        visited = set()
        queue = [start_vertex]
        visited.add(start_vertex)

        while queue:
            vertex = queue.pop(0)

            if vertex == end_vertex:
                return True

            neighbors = self.get_neighbors(vertex)
            for neighbor in neighbors:
                if neighbor['vertex'] not in visited:
                    visited.add(neighbor['vertex'])
                    queue.append(neighbor['vertex'])

        return False

    def get_vertices(self):
        """Get all vertices - O(V)"""
        return list(self.vertices.keys())

    def get_edges(self):
        """Get all edges - O(V + E)"""
        edges = []
        for vertex, neighbors in self.vertices.items():
            for neighbor in neighbors:
                edges.append({
                    'from': vertex,
                    'to': neighbor['vertex'],
                    'weight': neighbor['weight']
                })
        return edges

    def get_vertex_count(self):
        """Get vertex count - O(1)"""
        return len(self.vertices)

    def is_empty(self):
        """Check if empty - O(1)"""
        return len(self.vertices) == 0

    def clear(self):
        """Clear graph - O(1)"""
        self.vertices.clear()


# Usage Example
if __name__ == "__main__":
    graph = Graph(False)  # Undirected graph

    graph.add_vertex('A')
    graph.add_vertex('B')
    graph.add_vertex('C')
    graph.add_vertex('D')
    graph.add_edge('A', 'B')
    graph.add_edge('A', 'C')
    graph.add_edge('B', 'D')
    graph.add_edge('C', 'D')

    print('Vertices:', graph.get_vertices())
    print('DFS:', graph.dfs('A'))
    print('BFS:', graph.bfs('A'))
    print('Has path A to D:', graph.has_path('A', 'D'))
    print('Neighbors of A:', graph.get_neighbors('A'))

