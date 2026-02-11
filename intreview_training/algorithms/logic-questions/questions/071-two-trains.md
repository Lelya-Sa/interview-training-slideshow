# Two Trains Problem

## Problem
Two trains are 100 miles apart, moving toward each other. Train A travels at 60 mph, Train B at 40 mph. A bird starts at Train A and flies back and forth between the trains at 80 mph. How far does the bird travel before the trains collide?

## Approach
Calculate when trains meet, then calculate bird's distance. Or use the fact that bird flies for the entire time until collision.

## Solution
**Method 1: Calculate Time to Collision**

Trains approach each other at: 60 + 40 = 100 mph
Time to collision: 100 miles / 100 mph = 1 hour

Bird flies at 80 mph for 1 hour:
Distance = 80 mph × 1 hour = 80 miles

**Method 2: Sum Infinite Series**
- First trip: Bird flies from A to B
- Second trip: Bird flies from B to A
- Continue until trains meet
- Sum converges to same answer

**Answer:** 80 miles

**Key Insight:** Don't calculate each trip - just find total time and multiply by bird's speed!

## Complexity
- **Time**: O(1) - Simple calculation: time = distance / relative_speed, bird_distance = bird_speed × time
- **Space**: O(1) - No data structures needed
- **Note**: Infinite series approach would be O(∞) if calculated term-by-term, but converges to O(1) solution

## Follow-up
- What if bird speed is different?
- What if trains start at different times?
- How to solve with infinite series?

