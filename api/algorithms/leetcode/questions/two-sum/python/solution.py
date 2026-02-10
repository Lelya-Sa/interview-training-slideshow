"""
Two Sum - LeetCode 1

Given an array of integers nums and an integer target, 
return indices of the two numbers such that they add up to target.
"""

def two_sum(nums, target):
    """
    Solution using HashMap
    Time: O(n)
    Space: O(n)
    """
    map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in map:
            return [map[complement], i]
        
        map[num] = i
    
    return []


def two_sum_brute_force(nums, target):
    """
    Brute Force Solution
    Time: O(n²)
    Space: O(1)
    """
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []


# Usage Examples
if __name__ == "__main__":
    print('Two Sum [2,7,11,15], target=9:', two_sum([2, 7, 11, 15], 9))  # [0, 1]
    print('Two Sum [3,2,4], target=6:', two_sum([3, 2, 4], 6))  # [1, 2]
    print('Two Sum [3,3], target=6:', two_sum([3, 3], 6))  # [0, 1]

