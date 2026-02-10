"""
Group Anagrams - LeetCode 49

Given an array of strings strs, group the anagrams together.
"""

from collections import defaultdict


def group_anagrams(strs):
    """
    Method 1: Sorting as Key
    Time: O(n * k log k) where n is number of strings, k is average length
    Space: O(n * k)
    """
    map_dict = defaultdict(list)

    for s in strs:
        # Sort string to get canonical form
        sorted_str = ''.join(sorted(s))
        map_dict[sorted_str].append(s)

    return list(map_dict.values())


def group_anagrams_count(strs):
    """
    Method 2: Character Count as Key (more efficient for longer strings)
    Time: O(n * k)
    Space: O(n * k)
    """
    map_dict = defaultdict(list)

    for s in strs:
        # Create character count array
        count = [0] * 26
        for char in s:
            count[ord(char) - ord('a')] += 1

        # Use count tuple as key
        map_dict[tuple(count)].append(s)

    return list(map_dict.values())


# Test cases
if __name__ == "__main__":
    print("=== Test Cases ===")
    print('Input: ["eat","tea","tan","ate","nat","bat"]')
    result = group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
    print(f'Output: {result}')
    print('Expected: [["bat"],["nat","tan"],["ate","eat","tea"]]\n')

    print('Input: [""]')
    print(f'Output: {group_anagrams([""])}')
    print('Expected: [[""]]\n')

    print('Input: ["a"]')
    print(f'Output: {group_anagrams(["a"])}')
    print('Expected: [["a"]]\n')

