/**
 * Contains Duplicate - LeetCode 217
 * 
 * Check if array contains duplicates.
 */
import java.util.*;

public class Solution {
    /**
     * Solution using HashSet
     * Time: O(n)
     * Space: O(n)
     */
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        
        for (int num : nums) {
            if (seen.contains(num)) {
                return true;
            }
            seen.add(num);
        }
        
        return false;
    }

    // Usage Example
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println("Contains duplicate [1,2,3,1]: " + 
            solution.containsDuplicate(new int[]{1, 2, 3, 1})); // true
        System.out.println("Contains duplicate [1,2,3,4]: " + 
            solution.containsDuplicate(new int[]{1, 2, 3, 4})); // false
    }
}

