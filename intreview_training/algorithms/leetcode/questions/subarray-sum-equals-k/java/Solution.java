import java.util.HashMap;
import java.util.Map;

/**
 * Subarray Sum Equals K - LeetCode 560
 * 
 * Given an array of integers nums and an integer k, 
 * return the total number of subarrays whose sum equals to k.
 */
public class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1); // Initialize with sum 0 having count 1
        int sum = 0;
        int count = 0;
        
        for (int num : nums) {
            sum += num;
            
            // Check if (sum - k) exists, meaning we found a subarray
            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }
            
            // Update map with current sum
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        
        return count;
    }
}
