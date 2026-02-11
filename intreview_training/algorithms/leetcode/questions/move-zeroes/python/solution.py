"""
Move Zeroes - LeetCode 283

Given an integer array nums, move all 0's to the end of it 
while maintaining the relative order of the non-zero elements.

Note: You must do this in-place without making a copy of the array.
"""

from typing import List


def move_zeroes(nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    insert_pos = 0
    
    # Move all non-zero elements to the front
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[insert_pos] = nums[i]
            insert_pos += 1
    
    # Fill remaining positions with zeros
    while insert_pos < len(nums):
        nums[insert_pos] = 0
        insert_pos += 1


# Test cases
if __name__ == "__main__":
    nums1 = [0, 1, 0, 3, 12]
    move_zeroes(nums1)
    print(nums1)  # [1, 3, 12, 0, 0]
    
    nums2 = [0]
    move_zeroes(nums2)
    print(nums2)  # [0]
    
    nums3 = [0, 0, 1]
    move_zeroes(nums3)
    print(nums3)  # [1, 0, 0]
