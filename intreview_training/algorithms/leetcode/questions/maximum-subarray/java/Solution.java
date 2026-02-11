/**
 * Maximum Subarray (Kadane's Algorithm) - LeetCode 53
 * 
 * Find contiguous subarray with largest sum.
 */
public class Solution {
    /**
     * Kadane's Algorithm
     * Time: O(n)
     * Space: O(1)
     */
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }

    // Usage Example
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        int[] nums1 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Max subarray: " + solution.maxSubArray(nums1)); // 6
        
        int[] nums2 = {1};
        System.out.println("Max subarray [1]: " + solution.maxSubArray(nums2)); // 1
    }
}

