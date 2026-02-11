/**
 * Best Time to Buy and Sell Stock - LeetCode 121
 * 
 * Find maximum profit from buying and selling stock once.
 */
public class Solution {
    /**
     * Solution - Track minimum price and maximum profit
     * Time: O(n)
     * Space: O(1)
     */
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        
        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        
        return maxProfit;
    }

    // Usage Example
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        int[] prices1 = {7, 1, 5, 3, 6, 4};
        System.out.println("Max profit [7,1,5,3,6,4]: " + solution.maxProfit(prices1)); // 5
        
        int[] prices2 = {7, 6, 4, 3, 1};
        System.out.println("Max profit [7,6,4,3,1]: " + solution.maxProfit(prices2)); // 0
    }
}

