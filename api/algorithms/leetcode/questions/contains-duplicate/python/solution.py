"""
Contains Duplicate - LeetCode 217

Check if array contains duplicates.
"""

def contains_duplicate(nums):
    """
    Solution using Set
    Time: O(n)
    Space: O(n)
    """
    return len(set(nums)) != len(nums)


def contains_duplicate_map(nums):
    """
    Solution using Set (manual)
    Time: O(n)
    Space: O(n)
    """
    seen = set()
    
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    
    return False


# Usage Examples
if __name__ == "__main__":
    print('Contains duplicate [1,2,3,1]:', contains_duplicate([1, 2, 3, 1]))  # True
    print('Contains duplicate [1,2,3,4]:', contains_duplicate([1, 2, 3, 4]))  # False

