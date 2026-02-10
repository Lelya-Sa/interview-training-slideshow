# Estimate Number of Gas Stations

## Problem
How many gas stations are there in the United States?

## Approach
Use Fermi estimation: break down into smaller estimates and multiply.

## Solution
**Estimation Steps:**
1. US population: ~330 million
2. Cars per person: ~0.8 (some have multiple, some have none)
3. Total cars: ~264 million
4. Average cars per station per day: ~500-1000
5. Assume each car refuels every 7 days
6. Daily refuels: 264M / 7 ≈ 38 million
7. Stations needed: 38M / 750 (avg) ≈ 50,000

**Answer:** Approximately 50,000-150,000 gas stations in the US

**Actual:** ~150,000 gas stations

## Complexity
- **Time**: O(1) - Estimation using mathematical reasoning
- **Space**: O(1) - No data structures needed
- **Note**: This is a Fermi estimation problem testing analytical thinking and approximation skills

## Follow-up
- How would you estimate for a different country?
- What factors affect this number?
- How would you validate your estimate?

