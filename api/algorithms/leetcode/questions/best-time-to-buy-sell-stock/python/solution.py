"""
Best Time to Buy and Sell Stock - LeetCode 121

Find maximum profit from buying and selling stock once.
"""

def max_profit(prices):
    """
    Solution - Track minimum price and maximum profit
    Time: O(n)
    Space: O(1)
    """
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit


# Usage Examples
if __name__ == "__main__":
    print('Max profit [7,1,5,3,6,4]:', max_profit([7, 1, 5, 3, 6, 4]))  # 5
    print('Max profit [7,6,4,3,1]:', max_profit([7, 6, 4, 3, 1]))  # 0

