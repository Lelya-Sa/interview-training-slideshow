# Cannibals and Missionaries

## Problem
Three missionaries and three cannibals need to cross a river using a boat that holds 2 people. If cannibals ever outnumber missionaries on either side, the missionaries get eaten. How do they all cross safely?

## Approach
Track the count on each side. The key is bringing a cannibal back after taking missionaries across.

## Solution
**Step-by-step:**

1. **Take 2 cannibals across** (Left: 3M, 1C | Right: 2C)
   - Safe: 3M > 1C on left, 0M < 2C on right

2. **Bring 1 cannibal back** (Left: 3M, 2C | Right: 1C)
   - Safe: 3M > 2C on left

3. **Take 2 cannibals across** (Left: 3M | Right: 3C)
   - Safe: 3M > 0C on left, 0M < 3C on right

4. **Bring 1 cannibal back** (Left: 3M, 1C | Right: 2C)
   - Safe: 3M > 1C on left

5. **Take 2 missionaries across** (Left: 1M, 1C | Right: 2M, 2C)
   - Safe: 1M = 1C on left, 2M = 2C on right

6. **Bring 1 missionary and 1 cannibal back** (Left: 2M, 2C | Right: 1M, 1C)
   - Safe: 2M = 2C on left, 1M = 1C on right

7. **Take 2 missionaries across** (Left: 0M, 2C | Right: 3M, 1C)
   - Safe: 0M < 2C on left (no missionaries to eat), 3M > 1C on right

8. **Bring 1 cannibal back** (Left: 0M, 3C | Right: 3M, 0C)
   - Safe: No missionaries on left

9. **Take 2 cannibals across** (Left: 0M, 1C | Right: 3M, 2C)
   - Safe: 3M > 2C on right

10. **Bring 1 cannibal back** (Left: 0M, 2C | Right: 3M, 1C)
    - Safe: 3M > 1C on right

11. **Take 2 cannibals across** ✅
    - All safely across!

**Answer:** 11 trips total. Key is maintaining safe ratios and bringing cannibals back strategically.

## Complexity
- **Time**: O(1) - Fixed solution for 3 missionaries and 3 cannibals (11 steps)
- **Space**: O(1) - Only tracking current state
- **Note**: For M missionaries and C cannibals, this becomes a state space search: O(b^d) where b is branching factor, d is solution depth. Can be solved with BFS/DFS.

## Follow-up
- What if boat holds 3 people?
- What if there are 4 of each?
- How to solve programmatically?

