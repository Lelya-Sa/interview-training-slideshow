"""
Maximum Sum Subarray of Size K - Sliding Window

Given an array of integers nums and an integer k, 
find the maximum sum of any contiguous subarray of size k.
"""

from typing import List


def max_sum_subarray(nums: List[int], k: int) -> int:
    if len(nums) < k:
        return 0
    
    # Calculate sum of first window
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    # Slide window
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum


# Test cases
if __name__ == "__main__":
    print(max_sum_subarray([2, 1, 5, 1, 3, 2], 3))  # 9
    print(max_sum_subarray([2, 3, 4, 1, 5], 2))  # 7
