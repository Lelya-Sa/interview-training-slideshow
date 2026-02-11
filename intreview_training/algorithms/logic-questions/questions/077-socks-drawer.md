# Socks in Drawer

## Problem
A drawer contains 10 red socks and 10 blue socks. They're all mixed together. You're in a dark room and can't see the colors. How many socks must you take out to guarantee you have a matching pair?

## Approach
Use the pigeonhole principle. Worst case: take one of each color, then the next one must match.

## Solution
**Worst Case Scenario:**
- Take 1 red sock
- Take 1 blue sock
- Still no pair

**Next sock:**
- Must be either red or blue
- Either way, you now have a pair ✅

**Answer:** 3 socks minimum

**General Formula:** For n colors, you need n + 1 socks to guarantee a pair.

## Complexity
- **Time**: O(1) - Direct application of pigeonhole principle
- **Space**: O(1) - No data structures needed
- **Note**: This demonstrates the pigeonhole principle: if n+1 objects are placed in n boxes, at least one box contains 2 objects.

## Follow-up
- How many for 3 colors (red, blue, green)?
- How many to guarantee 2 pairs?
- What about different quantities of each color?

