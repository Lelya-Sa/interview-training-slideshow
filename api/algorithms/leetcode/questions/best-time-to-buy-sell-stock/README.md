# Best Time to Buy and Sell Stock - LeetCode 121

## Problem Description

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

## Example

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

## Approach

Track the minimum price seen so far and maximum profit:
- Keep track of minimum price
- For each day, calculate profit if we sell today
- Update maximum profit

## Time Complexity
- O(n) - single pass

## Space Complexity
- O(1) - constant space

## How to Use

### JavaScript
```bash
node js/solution.js
```

### Python
```bash
python python/solution.py
```

### Java
```bash
javac java/Solution.java
java Solution
```

## Code Example

```javascript
maxProfit([7, 1, 5, 3, 6, 4]);  // 5 (buy at 1, sell at 6)
maxProfit([7, 6, 4, 3, 1]);     // 0 (no profit possible)
```
