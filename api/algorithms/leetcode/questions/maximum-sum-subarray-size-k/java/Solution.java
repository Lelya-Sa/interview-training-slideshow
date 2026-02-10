/**
 * Maximum Sum Subarray of Size K - Sliding Window
 * 
 * Given an array of integers nums and an integer k, 
 * find the maximum sum of any contiguous subarray of size k.
 */
public class Solution {
    public int maxSumSubarray(int[] nums, int k) {
        if (nums.length < k) return 0;
        
        // Calculate sum of first window
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        
        int maxSum = windowSum;
        
        // Slide window
        for (int i = k; i < nums.length; i++) {
            windowSum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }
}
