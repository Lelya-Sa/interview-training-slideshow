"""
Product of Array Except Self - LeetCode 238

Return array where each element is product of all other elements.
"""

def product_except_self(nums):
    """
    Two-pass solution
    Time: O(n)
    Space: O(1) excluding output array
    """
    result = [1] * len(nums)
    
    # First pass: left products
    left = 1
    for i in range(len(nums)):
        result[i] = left
        left *= nums[i]
    
    # Second pass: right products
    right = 1
    for i in range(len(nums) - 1, -1, -1):
        result[i] *= right
        right *= nums[i]
    
    return result


# Usage Examples
if __name__ == "__main__":
    print('Product except self [1,2,3,4]:', product_except_self([1, 2, 3, 4]))  # [24,12,8,6]
    print('Product except self [-1,1,0,-3,3]:', product_except_self([-1, 1, 0, -3, 3]))  # [0,0,9,0,0]

