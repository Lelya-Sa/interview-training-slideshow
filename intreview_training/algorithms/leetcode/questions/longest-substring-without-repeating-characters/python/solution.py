"""
Longest Substring Without Repeating Characters - LeetCode 3

Given a string s, find the length of the longest substring without repeating characters.
"""


def length_of_longest_substring(s: str) -> int:
    """
    Sliding Window Approach
    Time: O(n)
    Space: O(min(m, n)) where m is charset size
    """
    if not s:
        return 0

    char_map = {}  # character -> index
    max_length = 0
    left = 0

    for right in range(len(s)):
        char = s[right]

        # If character exists in current window, move left pointer
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1

        # Update character's latest index
        char_map[char] = right

        # Update max length
        max_length = max(max_length, right - left + 1)

    return max_length


# Alternative: Using Set
def length_of_longest_substring_set(s: str) -> int:
    if not s:
        return 0

    char_set = set()
    max_length = 0
    left = 0

    for right in range(len(s)):
        # Shrink window until no duplicate
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1

        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)

    return max_length


# Test cases
if __name__ == "__main__":
    print("=== Test Cases ===")
    print(f'Input: "abcabcbb"')
    print(f'Output: {length_of_longest_substring("abcabcbb")}')  # 3
    print('Expected: 3\n')

    print(f'Input: "bbbbb"')
    print(f'Output: {length_of_longest_substring("bbbbb")}')  # 1
    print('Expected: 1\n')

    print(f'Input: "pwwkew"')
    print(f'Output: {length_of_longest_substring("pwwkew")}')  # 3
    print('Expected: 3\n')

    print(f'Input: ""')
    print(f'Output: {length_of_longest_substring("")}')  # 0
    print('Expected: 0\n')

    print(f'Input: "dvdf"')
    print(f'Output: {length_of_longest_substring("dvdf")}')  # 3
    print('Expected: 3\n')

