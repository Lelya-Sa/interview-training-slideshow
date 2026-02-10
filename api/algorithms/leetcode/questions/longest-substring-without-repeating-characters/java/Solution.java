import java.util.*;

/**
 * Longest Substring Without Repeating Characters - LeetCode 3
 *
 * Given a string s, find the length of the longest substring without repeating characters.
 */
public class Solution {
    /**
     * Sliding Window Approach
     * Time: O(n)
     * Space: O(min(m, n)) where m is charset size
     */
    public int lengthOfLongestSubstring(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        Map<Character, Integer> charMap = new HashMap<>(); // character -> index
        int maxLength = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            // If character exists in current window, move left pointer
            if (charMap.containsKey(c) && charMap.get(c) >= left) {
                left = charMap.get(c) + 1;
            }

            // Update character's latest index
            charMap.put(c, right);

            // Update max length
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }

    // Alternative: Using Set
    public int lengthOfLongestSubstringSet(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        Set<Character> charSet = new HashSet<>();
        int maxLength = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            // Shrink window until no duplicate
            while (charSet.contains(s.charAt(right))) {
                charSet.remove(s.charAt(left));
                left++;
            }

            charSet.add(s.charAt(right));
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        System.out.println("=== Test Cases ===");
        System.out.println("Input: \"abcabcbb\"");
        System.out.println("Output: " + solution.lengthOfLongestSubstring("abcabcbb")); // 3
        System.out.println("Expected: 3\n");

        System.out.println("Input: \"bbbbb\"");
        System.out.println("Output: " + solution.lengthOfLongestSubstring("bbbbb")); // 1
        System.out.println("Expected: 1\n");

        System.out.println("Input: \"pwwkew\"");
        System.out.println("Output: " + solution.lengthOfLongestSubstring("pwwkew")); // 3
        System.out.println("Expected: 3\n");

        System.out.println("Input: \"\"");
        System.out.println("Output: " + solution.lengthOfLongestSubstring("")); // 0
        System.out.println("Expected: 0\n");

        System.out.println("Input: \"dvdf\"");
        System.out.println("Output: " + solution.lengthOfLongestSubstring("dvdf")); // 3
        System.out.println("Expected: 3\n");
    }
}

