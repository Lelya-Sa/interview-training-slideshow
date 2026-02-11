# Monty Hall Problem

## Problem
You're on a game show with 3 doors. Behind one door is a car, behind the other two are goats. You pick a door (say Door 1). The host, who knows what's behind each door, opens another door (say Door 3) revealing a goat. He then asks: "Do you want to switch to Door 2?" Should you switch? What's the probability of winning if you switch vs stay?

## Approach
Calculate probabilities: initial probability vs conditional probability after host reveals a goat.

## Solution
**Initial Probabilities:**
- Car behind Door 1: 1/3
- Car behind Door 2: 1/3
- Car behind Door 3: 1/3

**After you pick Door 1:**

**If car is behind Door 1 (1/3 probability):**
- Host opens Door 2 or 3 (goat)
- If you switch: You lose
- If you stay: You win

**If car is behind Door 2 (1/3 probability):**
- Host must open Door 3 (goat)
- If you switch: You win
- If you stay: You lose

**If car is behind Door 3 (1/3 probability):**
- Host must open Door 2 (goat)
- If you switch: You win
- If you stay: You lose

**Probabilities:**
- **Stay:** Win 1/3 of the time
- **Switch:** Win 2/3 of the time

**Answer:** Yes, switch! You have 2/3 probability of winning if you switch, only 1/3 if you stay.

## Complexity
- **Time**: O(1) - Single decision, no algorithm needed
- **Space**: O(1) - No data structures required
- **Note**: This is a probability/statistics problem demonstrating conditional probability and Bayes' theorem

## Follow-up
- What if there are 100 doors?
- What if host doesn't know where the car is?
- How does this relate to conditional probability?

