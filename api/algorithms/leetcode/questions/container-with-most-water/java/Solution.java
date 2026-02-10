/**
 * Container With Most Water - LeetCode 11
 *
 * Find two lines that together with the x-axis form a container,
 * such that the container contains the most water.
 */
public class Solution {
    /**
     * Two Pointers Approach
     * Time: O(n)
     * Space: O(1)
     */
    public int maxArea(int[] height) {
        int maxWater = 0;
        int left = 0;
        int right = height.length - 1;

        while (left < right) {
            // Calculate current area
            int width = right - left;
            int currentHeight = Math.min(height[left], height[right]);
            int area = width * currentHeight;
            maxWater = Math.max(maxWater, area);

            // Move pointer with smaller height
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxWater;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        System.out.println("=== Test Cases ===");
        System.out.println("Input: [1,8,6,2,5,4,8,3,7]");
        int[] input1 = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        System.out.println("Output: " + solution.maxArea(input1));
        System.out.println("Expected: 49\n");

        System.out.println("Input: [1,1]");
        int[] input2 = {1, 1};
        System.out.println("Output: " + solution.maxArea(input2));
        System.out.println("Expected: 1\n");

        System.out.println("Input: [1,2,1]");
        int[] input3 = {1, 2, 1};
        System.out.println("Output: " + solution.maxArea(input3));
        System.out.println("Expected: 2\n");
    }
}

