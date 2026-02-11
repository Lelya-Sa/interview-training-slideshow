# Water Jug Problem

## Problem
You have a 3-liter jug and a 5-liter jug. Neither has markings. You have unlimited water supply. How do you measure exactly 4 liters?

## Approach
Use the difference between jugs. Fill the larger, pour into smaller, empty smaller, repeat.

## Solution
**Steps:**

1. **Fill 5-liter jug** → (0, 5)
   - 3L jug: 0 | 5L jug: 5

2. **Pour from 5L to 3L** → (3, 2)
   - 3L jug: 3 | 5L jug: 2

3. **Empty 3L jug** → (0, 2)
   - 3L jug: 0 | 5L jug: 2

4. **Pour from 5L to 3L** → (2, 0)
   - 3L jug: 2 | 5L jug: 0

5. **Fill 5L jug** → (2, 5)
   - 3L jug: 2 | 5L jug: 5

6. **Pour from 5L to 3L** → (3, 4)
   - 3L jug: 3 (full) | 5L jug: 4 ✅

**Answer:** After step 6, the 5-liter jug contains exactly 4 liters.

## Complexity
- **Time**: O(1) - Fixed solution for specific jug sizes (6 steps)
- **Space**: O(1) - Only tracking current water levels
- **Note**: For general case (jugs of size a and b, need amount c), this becomes a graph search problem: O(a×b) states, can be solved with BFS/DFS

## Follow-up
- How to measure 1 liter?
- What if jugs are 4L and 9L, need 6L?
- General solution for any two jugs?

