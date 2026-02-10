/**
 * Graph Implementation in Java
 * Nodes (vertices) connected by edges
 * Time Complexity: O(V + E) for traversal
 */
import java.util.*;

public class Graph {
    private Map<String, List<Edge>> vertices;
    private boolean directed;

    private static class Edge {
        String vertex;
        int weight;

        Edge(String vertex, int weight) {
            this.vertex = vertex;
            this.weight = weight;
        }
    }

    public Graph(boolean directed) {
        this.vertices = new HashMap<>();
        this.directed = directed;
    }

    public Graph() {
        this(false);
    }

    public Graph addVertex(String vertex) {
        if (!vertices.containsKey(vertex)) {
            vertices.put(vertex, new ArrayList<>());
        }
        return this;
    }

    public Graph addEdge(String vertex1, String vertex2, int weight) {
        if (!vertices.containsKey(vertex1)) {
            addVertex(vertex1);
        }
        if (!vertices.containsKey(vertex2)) {
            addVertex(vertex2);
        }

        vertices.get(vertex1).add(new Edge(vertex2, weight));

        if (!directed) {
            vertices.get(vertex2).add(new Edge(vertex1, weight));
        }

        return this;
    }

    public Graph addEdge(String vertex1, String vertex2) {
        return addEdge(vertex1, vertex2, 1);
    }

    public List<Edge> getNeighbors(String vertex) {
        return vertices.getOrDefault(vertex, new ArrayList<>());
    }

    public List<String> dfs(String startVertex) {
        List<String> result = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        dfsRecursive(startVertex, visited, result);
        return result;
    }

    private void dfsRecursive(String vertex, Set<String> visited, List<String> result) {
        visited.add(vertex);
        result.add(vertex);

        List<Edge> neighbors = getNeighbors(vertex);
        for (Edge neighbor : neighbors) {
            if (!visited.contains(neighbor.vertex)) {
                dfsRecursive(neighbor.vertex, visited, result);
            }
        }
    }

    public List<String> bfs(String startVertex) {
        List<String> result = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        java.util.Queue<String> queue = new java.util.LinkedList<>();
        
        queue.offer(startVertex);
        visited.add(startVertex);

        while (!queue.isEmpty()) {
            String vertex = queue.poll();
            result.add(vertex);

            List<Edge> neighbors = getNeighbors(vertex);
            for (Edge neighbor : neighbors) {
                if (!visited.contains(neighbor.vertex)) {
                    visited.add(neighbor.vertex);
                    queue.offer(neighbor.vertex);
                }
            }
        }

        return result;
    }

    public boolean hasPath(String startVertex, String endVertex) {
        Set<String> visited = new HashSet<>();
        java.util.Queue<String> queue = new java.util.LinkedList<>();
        
        queue.offer(startVertex);
        visited.add(startVertex);

        while (!queue.isEmpty()) {
            String vertex = queue.poll();

            if (vertex.equals(endVertex)) {
                return true;
            }

            List<Edge> neighbors = getNeighbors(vertex);
            for (Edge neighbor : neighbors) {
                if (!visited.contains(neighbor.vertex)) {
                    visited.add(neighbor.vertex);
                    queue.offer(neighbor.vertex);
                }
            }
        }

        return false;
    }

    public List<String> getVertices() {
        return new ArrayList<>(vertices.keySet());
    }

    public int getVertexCount() {
        return vertices.size();
    }

    public boolean isEmpty() {
        return vertices.isEmpty();
    }

    public void clear() {
        vertices.clear();
    }

    // Usage Example
    public static void main(String[] args) {
        Graph graph = new Graph(false); // Undirected graph

        graph.addVertex("A");
        graph.addVertex("B");
        graph.addVertex("C");
        graph.addVertex("D");
        graph.addEdge("A", "B");
        graph.addEdge("A", "C");
        graph.addEdge("B", "D");
        graph.addEdge("C", "D");

        System.out.println("Vertices: " + graph.getVertices());
        System.out.println("DFS: " + graph.dfs("A"));
        System.out.println("BFS: " + graph.bfs("A"));
        System.out.println("Has path A to D: " + graph.hasPath("A", "D"));
    }
}

