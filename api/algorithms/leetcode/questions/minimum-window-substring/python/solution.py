"""
Minimum Window Substring - LeetCode 76

Given two strings s and t, return the minimum window substring of s
such that every character in t (including duplicates) is included in the window.
"""

from collections import Counter


def min_window(s: str, t: str) -> str:
    """
    Sliding Window Approach
    Time: O(|s| + |t|)
    Space: O(|s| + |t|)
    """
    if len(s) < len(t):
        return ''

    # Count characters in t
    need = Counter(t)
    need_count = len(need)  # Number of unique characters needed
    have_count = 0  # Number of unique characters we have in current window

    window = {}  # Current window character counts
    min_len = float('inf')
    min_start = 0
    left = 0

    for right in range(len(s)):
        char = s[right]

        # Add character to window
        window[char] = window.get(char, 0) + 1

        # Check if we have enough of this character
        if char in need and window[char] == need[char]:
            have_count += 1

        # Try to shrink window from left
        while have_count == need_count:
            # Update minimum window
            current_len = right - left + 1
            if current_len < min_len:
                min_len = current_len
                min_start = left

            # Remove left character from window
            left_char = s[left]
            window[left_char] -= 1

            # Check if we lost a required character
            if left_char in need and window[left_char] < need[left_char]:
                have_count -= 1

            left += 1

    return '' if min_len == float('inf') else s[min_start:min_start + min_len]


# Test cases
if __name__ == "__main__":
    print("=== Test Cases ===")
    print('Input: s = "ADOBECODEBANC", t = "ABC"')
    print(f'Output: "{min_window("ADOBECODEBANC", "ABC")}"')
    print('Expected: "BANC"\n')

    print('Input: s = "a", t = "a"')
    print(f'Output: "{min_window("a", "a")}"')
    print('Expected: "a"\n')

    print('Input: s = "a", t = "aa"')
    print(f'Output: "{min_window("a", "aa")}"')
    print('Expected: ""\n')

