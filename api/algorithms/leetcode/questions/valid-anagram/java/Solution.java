import java.util.*;

/**
 * Valid Anagram - LeetCode 242
 *
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 */
public class Solution {
    /**
     * Method 1: Character Frequency Count
     * Time: O(n)
     * Space: O(1) - fixed size for 26 letters
     */
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        int[] charCount = new int[26];

        // Count characters in s
        for (int i = 0; i < s.length(); i++) {
            charCount[s.charAt(i) - 'a']++;
        }

        // Decrement for characters in t
        for (int i = 0; i < t.length(); i++) {
            int index = t.charAt(i) - 'a';
            charCount[index]--;
            if (charCount[index] < 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * Method 2: Using HashMap (works for Unicode)
     * Time: O(n)
     * Space: O(k) where k is unique characters
     */
    public boolean isAnagramHashMap(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Integer> charMap = new HashMap<>();

        // Count characters in s
        for (char c : s.toCharArray()) {
            charMap.put(c, charMap.getOrDefault(c, 0) + 1);
        }

        // Decrement for characters in t
        for (char c : t.toCharArray()) {
            if (!charMap.containsKey(c) || charMap.get(c) == 0) {
                return false;
            }
            charMap.put(c, charMap.get(c) - 1);
        }

        return true;
    }

    /**
     * Method 3: Sorting
     * Time: O(n log n)
     * Space: O(n)
     */
    public boolean isAnagramSort(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        char[] sArray = s.toCharArray();
        char[] tArray = t.toCharArray();
        Arrays.sort(sArray);
        Arrays.sort(tArray);

        return Arrays.equals(sArray, tArray);
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        System.out.println("=== Test Cases ===");
        System.out.println("Input: s = \"anagram\", t = \"nagaram\"");
        System.out.println("Output: " + solution.isAnagram("anagram", "nagaram")); // true
        System.out.println("Expected: true\n");

        System.out.println("Input: s = \"rat\", t = \"car\"");
        System.out.println("Output: " + solution.isAnagram("rat", "car")); // false
        System.out.println("Expected: false\n");

        System.out.println("Input: s = \"listen\", t = \"silent\"");
        System.out.println("Output: " + solution.isAnagram("listen", "silent")); // true
        System.out.println("Expected: true\n");
    }
}

