/**
 * Product of Array Except Self - LeetCode 238
 * 
 * Return array where each element is product of all other elements.
 */
public class Solution {
    /**
     * Two-pass solution
     * Time: O(n)
     * Space: O(1) excluding output array
     */
    public int[] productExceptSelf(int[] nums) {
        int[] result = new int[nums.length];
        
        // First pass: left products
        int left = 1;
        for (int i = 0; i < nums.length; i++) {
            result[i] = left;
            left *= nums[i];
        }
        
        // Second pass: right products
        int right = 1;
        for (int i = nums.length - 1; i >= 0; i--) {
            result[i] *= right;
            right *= nums[i];
        }
        
        return result;
    }

    // Usage Example
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        int[] nums1 = {1, 2, 3, 4};
        int[] result1 = solution.productExceptSelf(nums1);
        System.out.print("Product except self [1,2,3,4]: ");
        for (int num : result1) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

