# Best Time to Buy and Sell Stock

## Problem
You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

## Examples
```
Input: prices = [7,1,5,3,6,4]
Output: 5 (buy at 1, sell at 6)

Input: prices = [7,6,4,3,1]
Output: 0 (no profit possible)
```

## Approach
1. **One Pass**: Track minimum price seen, calculate max profit
2. **Kadane's Algorithm**: Track maximum profit ending at each day
3. **Brute Force**: Check all pairs (O(n²))

## Solution

### JavaScript
```javascript
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}

// Kadane's algorithm approach
function maxProfitKadane(prices) {
    let maxCur = 0;
    let maxSoFar = 0;
    
    for (let i = 1; i < prices.length; i++) {
        maxCur = Math.max(0, maxCur + prices[i] - prices[i-1]);
        maxSoFar = Math.max(maxSoFar, maxCur);
    }
    
    return maxSoFar;
}
```

### Python
```python
def max_profit(prices):
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit
```

## Complexity
- **Time**: O(n)
- **Space**: O(1)

## Follow-up
- Best time to buy and sell stock II (multiple transactions)?
- Best time with transaction fee?
- Best time with cooldown period?

