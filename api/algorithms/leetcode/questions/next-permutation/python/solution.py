"""
Next Permutation - LeetCode 31

Implement next permutation, which rearranges numbers into the 
lexicographically next greater permutation of numbers.
"""

from typing import List


def next_permutation(nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    # Step 1: Find the largest index i where nums[i] < nums[i+1]
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    
    # Step 2: If such index exists, find the largest index j where j > i and nums[j] > nums[i]
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]:
            j -= 1
        # Swap nums[i] and nums[j]
        nums[i], nums[j] = nums[j], nums[i]
    
    # Step 3: Reverse the suffix starting at i+1
    reverse(nums, i + 1)


def reverse(nums: List[int], start: int) -> None:
    end = len(nums) - 1
    while start < end:
        nums[start], nums[end] = nums[end], nums[start]
        start += 1
        end -= 1


# Test cases
if __name__ == "__main__":
    nums1 = [1, 2, 3]
    next_permutation(nums1)
    print(nums1)  # [1, 3, 2]
    
    nums2 = [3, 2, 1]
    next_permutation(nums2)
    print(nums2)  # [1, 2, 3]
    
    nums3 = [1, 1, 5]
    next_permutation(nums3)
    print(nums3)  # [1, 5, 1]
