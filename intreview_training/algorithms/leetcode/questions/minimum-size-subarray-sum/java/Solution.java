/**
 * Minimum Size Subarray Sum - LeetCode 209
 * 
 * Given an array of positive integers nums and a positive integer target, 
 * return the minimal length of a contiguous subarray whose sum is greater 
 * than or equal to target. If there is no such subarray, return 0.
 */
public class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int minLen = Integer.MAX_VALUE;
        int windowSum = 0;
        int left = 0;
        
        for (int right = 0; right < nums.length; right++) {
            windowSum += nums[right];
            
            // Shrink window while sum >= target
            while (windowSum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                windowSum -= nums[left];
                left++;
            }
        }
        
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}
