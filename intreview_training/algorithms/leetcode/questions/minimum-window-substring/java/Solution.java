import java.util.*;

/**
 * Minimum Window Substring - LeetCode 76
 *
 * Given two strings s and t, return the minimum window substring of s
 * such that every character in t (including duplicates) is included in the window.
 */
public class Solution {
    /**
     * Sliding Window Approach
     * Time: O(|s| + |t|)
     * Space: O(|s| + |t|)
     */
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) {
            return "";
        }

        // Count characters in t
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) {
            need.put(c, need.getOrDefault(c, 0) + 1);
        }

        int needCount = need.size(); // Number of unique characters needed
        int haveCount = 0; // Number of unique characters we have in current window

        Map<Character, Integer> window = new HashMap<>(); // Current window character counts
        int minLen = Integer.MAX_VALUE;
        int minStart = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            // Add character to window
            window.put(c, window.getOrDefault(c, 0) + 1);

            // Check if we have enough of this character
            if (need.containsKey(c) && window.get(c).equals(need.get(c))) {
                haveCount++;
            }

            // Try to shrink window from left
            while (haveCount == needCount) {
                // Update minimum window
                int currentLen = right - left + 1;
                if (currentLen < minLen) {
                    minLen = currentLen;
                    minStart = left;
                }

                // Remove left character from window
                char leftChar = s.charAt(left);
                window.put(leftChar, window.get(leftChar) - 1);

                // Check if we lost a required character
                if (need.containsKey(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                    haveCount--;
                }

                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        System.out.println("=== Test Cases ===");
        System.out.println("Input: s = \"ADOBECODEBANC\", t = \"ABC\"");
        System.out.println("Output: \"" + solution.minWindow("ADOBECODEBANC", "ABC") + "\"");
        System.out.println("Expected: \"BANC\"\n");

        System.out.println("Input: s = \"a\", t = \"a\"");
        System.out.println("Output: \"" + solution.minWindow("a", "a") + "\"");
        System.out.println("Expected: \"a\"\n");

        System.out.println("Input: s = \"a\", t = \"aa\"");
        System.out.println("Output: \"" + solution.minWindow("a", "aa") + "\"");
        System.out.println("Expected: \"\"\n");
    }
}

