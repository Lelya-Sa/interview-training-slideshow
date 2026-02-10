# Link Directions in Doubly Linked List

## Structure

```
[dummy head] <--next--> [node1] <--next--> [node2] <--next--> [dummy tail]
              <--prev--          <--prev--          <--prev--
```

## Accessing Nodes

### From Head (Most Recent):
- **`head.next`** → First real node (most recently used)
- **`head.next.next`** → Second node
- We use **`next`** to go forward from head toward tail

### From Tail (Least Recent):
- **`tail.prev`** → Last real node (least recently used)
- **`tail.prev.prev`** → Second-to-last node
- We use **`prev`** to go backward from tail toward head

## Code Examples

### Getting Most Recent Node:
```python
most_recent = self.head.next  # Use NEXT from head
```

### Getting Least Recent Node:
```python
least_recent = self.tail.prev  # Use PREV from tail
```

### Adding Node After Head:
```python
def _add_node(self, node):
    node.prev = self.head           # Point back to head
    node.next = self.head.next      # Point forward to what head.next was
    self.head.next.prev = node      # Update the old first node's prev
    self.head.next = node           # Update head's next to new node
```

### Removing Last Node:
```python
def _pop_tail(self):
    last_node = self.tail.prev      # Use PREV from tail
    self._remove_node(last_node)
    return last_node
```

## Summary

✅ **From `head`**: Use **`next`** to go forward (toward tail)  
✅ **From `tail`**: Use **`prev`** to go backward (toward head)

This is standard for doubly linked lists - each node has both `next` and `prev` pointers!

