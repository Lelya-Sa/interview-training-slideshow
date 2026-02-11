/**
 * Best Time to Buy and Sell Stock - LeetCode 121
 * 
 * Find maximum profit from buying and selling stock once.
 */

/**
 * Solution - Track minimum price and maximum profit
 * Time: O(n)
 * Space: O(1)
 */
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  
  return maxProfit;
}

// Usage Examples
console.log('Max profit [7,1,5,3,6,4]:', maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log('Max profit [7,6,4,3,1]:', maxProfit([7, 6, 4, 3, 1])); // 0

module.exports = maxProfit;

