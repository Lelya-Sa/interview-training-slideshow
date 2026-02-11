# Data Structures - Interview Material

## Definition
Data structures are ways of organizing and storing data in computer memory for efficient access and modification.

## Arrays
- **Definition**: Contiguous memory locations storing elements
- **Access**: O(1) - direct index access
- **Search**: O(n) - linear search
- **Insert/Delete**: O(n) - shift elements
- **Use Cases**: When size is known, random access needed

## Linked Lists
- **Definition**: Nodes connected by pointers
- **Types**: Singly, Doubly, Circular
- **Access**: O(n) - traverse from head
- **Search**: O(n)
- **Insert/Delete**: O(1) - if position known
- **Use Cases**: Dynamic size, frequent insertions/deletions

## Stacks
- **Definition**: LIFO (Last In First Out)
- **Operations**: push, pop, peek
- **Time Complexity**: O(1) for all operations
- **Use Cases**: Function calls, undo operations, expression evaluation

## Queues
- **Definition**: FIFO (First In First Out)
- **Types**: Simple, Circular, Priority, Deque
- **Operations**: enqueue, dequeue
- **Time Complexity**: O(1) for enqueue/dequeue
- **Use Cases**: Task scheduling, BFS, request handling

## Hash Tables
- **Definition**: Key-value pairs with hash function
- **Operations**: insert, delete, search
- **Time Complexity**: O(1) average, O(n) worst
- **Collision Handling**: Chaining, Open addressing
- **Use Cases**: Fast lookups, caching, indexing

## Trees
- **Definition**: Hierarchical structure with nodes
- **Types**: Binary, BST, AVL, Red-Black, B-tree
- **Traversal**: Inorder, Preorder, Postorder, Level-order
- **Use Cases**: Hierarchical data, searching, sorting

## Binary Search Trees
- **Definition**: Binary tree with ordering property
- **Operations**: insert, delete, search
- **Time Complexity**: O(log n) average, O(n) worst
- **Use Cases**: Dynamic sorted data, range queries

## Heaps
- **Definition**: Complete binary tree with heap property
- **Types**: Min-heap, Max-heap
- **Operations**: insert, extract-min/max, heapify
- **Time Complexity**: O(log n) for insert/extract
- **Use Cases**: Priority queues, heap sort, scheduling

## Graphs
- **Definition**: Nodes (vertices) connected by edges
- **Representation**: Adjacency list, Adjacency matrix
- **Traversal**: DFS, BFS
- **Algorithms**: Shortest path, MST, Topological sort
- **Use Cases**: Social networks, routing, dependencies

## Tries
- **Definition**: Tree for storing strings
- **Operations**: insert, search, prefix search
- **Time Complexity**: O(m) where m is string length
- **Use Cases**: Autocomplete, spell check, IP routing

## Comparison Table

| Structure | Access | Search | Insert | Delete | Space |
|-----------|--------|--------|--------|--------|-------|
| Array | O(1) | O(n) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1) | O(1) | O(n) |
| Stack | O(1) | O(n) | O(1) | O(1) | O(n) |
| Queue | O(n) | O(n) | O(1) | O(1) | O(n) |
| Hash Table | O(1) | O(1) | O(1) | O(1) | O(n) |
| BST | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| Heap | O(1) | O(n) | O(log n) | O(log n) | O(n) |

## Implementations

Complete implementations with all operations are available in the [implementations](./implementations/) directory:

- [Array Implementation](./implementations/array.js)
- [Linked List Implementation](./implementations/linked-list.js)
- [Stack Implementation](./implementations/stack.js)
- [Queue Implementation](./implementations/queue.js)
- [Hash Table Implementation](./implementations/hash-table.js)
- [Binary Search Tree Implementation](./implementations/binary-search-tree.js)
- [Heap Implementation](./implementations/heap.js)
- [Graph Implementation](./implementations/graph.js)
- [Trie Implementation](./implementations/trie.js)

Each implementation includes:
- Complete class with all operations
- Time complexity analysis
- Usage examples
- Error handling
- Ready-to-run code

