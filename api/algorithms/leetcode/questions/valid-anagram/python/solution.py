"""
Valid Anagram - LeetCode 242

Given two strings s and t, return true if t is an anagram of s, and false otherwise.
"""

from collections import Counter


def is_anagram(s: str, t: str) -> bool:
    """
    Method 1: Character Frequency Count
    Time: O(n)
    Space: O(1) - fixed size for 26 letters
    """
    if len(s) != len(t):
        return False

    char_count = [0] * 26

    # Count characters in s
    for char in s:
        char_count[ord(char) - ord('a')] += 1

    # Decrement for characters in t
    for char in t:
        index = ord(char) - ord('a')
        char_count[index] -= 1
        if char_count[index] < 0:
            return False

    return True


def is_anagram_counter(s: str, t: str) -> bool:
    """
    Method 2: Using Counter (Pythonic)
    Time: O(n)
    Space: O(k) where k is unique characters
    """
    return Counter(s) == Counter(t)


def is_anagram_sort(s: str, t: str) -> bool:
    """
    Method 3: Sorting
    Time: O(n log n)
    Space: O(1) or O(n) depending on sorting implementation
    """
    return sorted(s) == sorted(t)


# Test cases
if __name__ == "__main__":
    print("=== Test Cases ===")
    print('Input: s = "anagram", t = "nagaram"')
    print(f'Output: {is_anagram("anagram", "nagaram")}')  # True
    print('Expected: True\n')

    print('Input: s = "rat", t = "car"')
    print(f'Output: {is_anagram("rat", "car")}')  # False
    print('Expected: False\n')

    print('Input: s = "listen", t = "silent"')
    print(f'Output: {is_anagram("listen", "silent")}')  # True
    print('Expected: True\n')

