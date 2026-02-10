"""
Maximum Subarray (Kadane's Algorithm) - LeetCode 53

Find contiguous subarray with largest sum.
"""

def max_sub_array(nums):
    """
    Kadane's Algorithm
    Time: O(n)
    Space: O(1)
    """
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum


# Usage Examples
if __name__ == "__main__":
    print('Max subarray [-2,1,-3,4,-1,2,1,-5,4]:', 
          max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6
    print('Max subarray [1]:', max_sub_array([1]))  # 1
    print('Max subarray [5,4,-1,7,8]:', max_sub_array([5, 4, -1, 7, 8]))  # 23

