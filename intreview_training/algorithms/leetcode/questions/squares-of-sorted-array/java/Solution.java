/**
 * Squares of a Sorted Array - LeetCode 977
 * 
 * Given an integer array nums sorted in non-decreasing order, 
 * return an array of the squares of each number sorted in non-decreasing order.
 */
public class Solution {
    public int[] sortedSquares(int[] nums) {
        int[] result = new int[nums.length];
        int left = 0;
        int right = nums.length - 1;
        int idx = nums.length - 1;
        
        while (left <= right) {
            int leftSquare = nums[left] * nums[left];
            int rightSquare = nums[right] * nums[right];
            
            if (leftSquare > rightSquare) {
                result[idx--] = leftSquare;
                left++;
            } else {
                result[idx--] = rightSquare;
                right--;
            }
        }
        
        return result;
    }
}
