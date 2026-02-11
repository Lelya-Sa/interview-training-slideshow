/**
 * Two Sum - LeetCode 1
 * 
 * Given an array of integers nums and an integer target, 
 * return indices of the two numbers such that they add up to target.
 */
import java.util.*;

public class Solution {
    /**
     * Solution using HashMap
     * Time: O(n)
     * Space: O(n)
     */
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            
            map.put(nums[i], i);
        }
        
        return new int[]{};
    }

    /**
     * Brute Force Solution
     * Time: O(n²)
     * Space: O(1)
     */
    public int[] twoSumBruteForce(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }

    // Usage Example
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        int[] result1 = solution.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println("Two Sum [2,7,11,15], target=9: [" + result1[0] + ", " + result1[1] + "]");
        
        int[] result2 = solution.twoSum(new int[]{3, 2, 4}, 6);
        System.out.println("Two Sum [3,2,4], target=6: [" + result2[0] + ", " + result2[1] + "]");
    }
}

