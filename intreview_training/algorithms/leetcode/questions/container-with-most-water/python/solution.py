"""
Container With Most Water - LeetCode 11

Find two lines that together with the x-axis form a container,
such that the container contains the most water.
"""


def max_area(height):
    """
    Two Pointers Approach
    Time: O(n)
    Space: O(1)
    """
    max_water = 0
    left = 0
    right = len(height) - 1

    while left < right:
        # Calculate current area
        width = right - left
        current_height = min(height[left], height[right])
        area = width * current_height
        max_water = max(max_water, area)

        # Move pointer with smaller height
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water


# Test cases
if __name__ == "__main__":
    print("=== Test Cases ===")
    print("Input: [1,8,6,2,5,4,8,3,7]")
    print(f"Output: {max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])}")
    print("Expected: 49\n")

    print("Input: [1,1]")
    print(f"Output: {max_area([1, 1])}")
    print("Expected: 1\n")

    print("Input: [1,2,1]")
    print(f"Output: {max_area([1, 2, 1])}")
    print("Expected: 2\n")

