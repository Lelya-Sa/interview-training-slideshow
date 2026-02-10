"""
Squares of a Sorted Array - LeetCode 977

Given an integer array nums sorted in non-decreasing order, 
return an array of the squares of each number sorted in non-decreasing order.
"""

from typing import List


def sorted_squares(nums: List[int]) -> List[int]:
    result = [0] * len(nums)
    left = 0
    right = len(nums) - 1
    idx = len(nums) - 1
    
    while left <= right:
        left_square = nums[left] * nums[left]
        right_square = nums[right] * nums[right]
        
        if left_square > right_square:
            result[idx] = left_square
            left += 1
        else:
            result[idx] = right_square
            right -= 1
        idx -= 1
    
    return result


# Test cases
if __name__ == "__main__":
    print(sorted_squares([-4, -1, 0, 3, 10]))  # [0, 1, 9, 16, 100]
    print(sorted_squares([-7, -3, 2, 3, 11]))  # [4, 9, 9, 49, 121]
