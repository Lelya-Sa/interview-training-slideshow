# Cards Arrangement

## Problem
You have a deck of 52 cards. You deal them face down in a row. A friend picks a number 1-52. You flip cards one by one, counting. When count matches the number, that card is set aside. Process repeats with remaining cards. What's the final card?

## Approach
This is related to the Josephus problem. Use recursion or work backwards.

## Solution
**This is a variant of Josephus problem with k=1 (but counting resets).**

Actually, let me clarify: This is like "eliminate every kth person" but the counting method is different.

**Simpler version:**
Deal cards, count to N, remove that card, continue from next card.

**For N=1:** Remove every 1st card → Last card is the 52nd card
**For N=2:** Remove every 2nd card → Similar to Josephus with k=2

**General solution:**
Use Josephus problem formula: J(52, N)

**For N=7 (example):**
- Cards 1-52
- Count to 7, remove card 7
- Continue from card 8, count to 7, remove card 14
- And so on...

**Answer:** Depends on the number N chosen. Use Josephus problem formula J(52, N) to find the final card position.

## Complexity
- **Time**: O(n) where n is number of cards - same as Josephus problem
- **Space**: O(1) with iterative approach, O(n) with recursion
- **Note**: This is a variant of Josephus problem. For deck of size D and count N, use J(D, N) formula.

## Follow-up
- What if deck has different number of cards?
- What if counting doesn't reset?
- How to solve for any N?

