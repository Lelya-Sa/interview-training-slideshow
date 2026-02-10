"""
Minimum Size Subarray Sum - LeetCode 209

Given an array of positive integers nums and a positive integer target, 
return the minimal length of a contiguous subarray whose sum is greater 
than or equal to target. If there is no such subarray, return 0.
"""

from typing import List


def min_sub_array_len(target: int, nums: List[int]) -> int:
    min_len = float('inf')
    window_sum = 0
    left = 0
    
    for right in range(len(nums)):
        window_sum += nums[right]
        
        # Shrink window while sum >= target
        while window_sum >= target:
            min_len = min(min_len, right - left + 1)
            window_sum -= nums[left]
            left += 1
    
    return 0 if min_len == float('inf') else min_len


# Test cases
if __name__ == "__main__":
    print(min_sub_array_len(7, [2, 3, 1, 2, 4, 3]))  # 2
    print(min_sub_array_len(4, [1, 4, 4]))  # 1
    print(min_sub_array_len(11, [1, 1, 1, 1, 1, 1, 1, 1]))  # 0
