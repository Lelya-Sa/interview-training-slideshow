"""
Subarray Sum Equals K - LeetCode 560

Given an array of integers nums and an integer k, 
return the total number of subarrays whose sum equals to k.
"""

from typing import List
from collections import defaultdict


def subarray_sum(nums: List[int], k: int) -> int:
    prefix_sum = defaultdict(int)
    prefix_sum[0] = 1  # Initialize with sum 0 having count 1
    current_sum = 0
    count = 0
    
    for num in nums:
        current_sum += num
        
        # Check if (current_sum - k) exists, meaning we found a subarray
        if (current_sum - k) in prefix_sum:
            count += prefix_sum[current_sum - k]
        
        # Update map with current sum
        prefix_sum[current_sum] += 1
    
    return count


# Test cases
if __name__ == "__main__":
    print(subarray_sum([1, 1, 1], 2))  # 2
    print(subarray_sum([1, 2, 3], 3))  # 2
    print(subarray_sum([1, -1, 0], 0))  # 3
