import java.util.*;

/**
 * Group Anagrams - LeetCode 49
 *
 * Given an array of strings strs, group the anagrams together.
 */
public class Solution {
    /**
     * Method 1: Sorting as Key
     * Time: O(n * k log k) where n is number of strings, k is average length
     * Space: O(n * k)
     */
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String str : strs) {
            // Sort string to get canonical form
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String sorted = new String(chars);

            map.putIfAbsent(sorted, new ArrayList<>());
            map.get(sorted).add(str);
        }

        return new ArrayList<>(map.values());
    }

    /**
     * Method 2: Character Count as Key
     * Time: O(n * k)
     * Space: O(n * k)
     */
    public List<List<String>> groupAnagramsCount(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String str : strs) {
            // Create character count array
            int[] count = new int[26];
            for (char c : str.toCharArray()) {
                count[c - 'a']++;
            }

            // Use count array as key
            String key = Arrays.toString(count);
            map.putIfAbsent(key, new ArrayList<>());
            map.get(key).add(str);
        }

        return new ArrayList<>(map.values());
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        System.out.println("=== Test Cases ===");
        System.out.println("Input: [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]");
        String[] input1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
        System.out.println("Output: " + solution.groupAnagrams(input1));
        System.out.println("Expected: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]\n");

        System.out.println("Input: [\"\"]");
        String[] input2 = {""};
        System.out.println("Output: " + solution.groupAnagrams(input2));
        System.out.println("Expected: [[\"\"]]\n");

        System.out.println("Input: [\"a\"]");
        String[] input3 = {"a"};
        System.out.println("Output: " + solution.groupAnagrams(input3));
        System.out.println("Expected: [[\"a\"]]\n");
    }
}

