# Coin Flip Game

## Problem
Two players take turns flipping a fair coin. Player A wins if heads appears, Player B wins if tails appears. What's the probability that Player A wins?

## Approach
Since coin is fair, each flip is independent with 50% chance. But who goes first matters.

## Solution
**Analysis:**

**If Player A goes first:**
- P(A wins on 1st flip) = 1/2
- P(A wins on 3rd flip) = P(tails, tails, heads) = (1/2)³
- P(A wins on 5th flip) = (1/2)⁵
- ...

**Geometric Series:**
P(A wins) = 1/2 + (1/2)³ + (1/2)⁵ + ...
          = 1/2 × (1 + 1/4 + 1/16 + ...)
          = 1/2 × (1 / (1 - 1/4))
          = 1/2 × 4/3
          = 2/3

**Alternative:**
Let p = P(A wins)
- A wins immediately: 1/2
- If A doesn't win (tails), it's B's turn, but then it's like A goes second
- p = 1/2 + 1/2 × (1 - p)
- p = 1/2 + 1/2 - p/2
- 3p/2 = 1
- p = 2/3

**Answer:** Player A has 2/3 probability of winning (if A goes first)

## Complexity
- **Time**: O(1) - Direct probability calculation using geometric series
- **Space**: O(1) - No data structures needed
- **Note**: This is a probability problem. Expected number of flips: E = 1/p = 2 flips (geometric distribution)

## Follow-up
- What if coin is biased (60% heads)?
- What if players alternate who goes first?
- What's the expected number of flips?

