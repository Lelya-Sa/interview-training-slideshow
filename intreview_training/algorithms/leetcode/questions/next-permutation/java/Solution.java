/**
 * Next Permutation - LeetCode 31
 * 
 * Implement next permutation, which rearranges numbers into the 
 * lexicographically next greater permutation of numbers.
 */
public class Solution {
    public void nextPermutation(int[] nums) {
        // Step 1: Find the largest index i where nums[i] < nums[i+1]
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        
        // Step 2: If such index exists, find the largest index j where j > i and nums[j] > nums[i]
        if (i >= 0) {
            int j = nums.length - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            // Swap nums[i] and nums[j]
            swap(nums, i, j);
        }
        
        // Step 3: Reverse the suffix starting at i+1
        reverse(nums, i + 1);
    }
    
    private void reverse(int[] nums, int start) {
        int end = nums.length - 1;
        while (start < end) {
            swap(nums, start, end);
            start++;
            end--;
        }
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
