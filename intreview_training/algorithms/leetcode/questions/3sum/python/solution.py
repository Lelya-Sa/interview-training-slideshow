"""
3Sum - LeetCode 15

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
"""


def three_sum(nums):
    """
    Two Pointers Approach
    Time: O(n²)
    Space: O(1) excluding output
    """
    result = []
    nums.sort()  # Sort array

    for i in range(len(nums) - 2):
        # Skip duplicates for first number
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left = i + 1
        right = len(nums) - 1

        while left < right:
            sum_val = nums[i] + nums[left] + nums[right]

            if sum_val == 0:
                result.append([nums[i], nums[left], nums[right]])

                # Skip duplicates for left pointer
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                # Skip duplicates for right pointer
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1

                left += 1
                right -= 1
            elif sum_val < 0:
                left += 1
            else:
                right -= 1

    return result


# Test cases
if __name__ == "__main__":
    print("=== Test Cases ===")
    print("Input: [-1,0,1,2,-1,-4]")
    print(f"Output: {three_sum([-1, 0, 1, 2, -1, -4])}")
    print("Expected: [[-1, -1, 2], [-1, 0, 1]]\n")

    print("Input: [0,1,1]")
    print(f"Output: {three_sum([0, 1, 1])}")
    print("Expected: []\n")

    print("Input: [0,0,0]")
    print(f"Output: {three_sum([0, 0, 0])}")
    print("Expected: [[0, 0, 0]]\n")

