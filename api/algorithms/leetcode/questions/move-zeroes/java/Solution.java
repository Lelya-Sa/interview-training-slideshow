/**
 * Move Zeroes - LeetCode 283
 * 
 * Given an integer array nums, move all 0's to the end of it 
 * while maintaining the relative order of the non-zero elements.
 * 
 * Note: You must do this in-place without making a copy of the array.
 */
public class Solution {
    public void moveZeroes(int[] nums) {
        int insertPos = 0;
        
        // Move all non-zero elements to the front
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                nums[insertPos++] = nums[i];
            }
        }
        
        // Fill remaining positions with zeros
        while (insertPos < nums.length) {
            nums[insertPos++] = 0;
        }
    }
}
