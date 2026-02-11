const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING LEETCODE QUESTIONS - BATCH 6 (15 questions)');
console.log('='.repeat(80));

// Read current file
let content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### \d+\./gm) || []).length;
console.log(`\n📊 Current questions: ${currentCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Adding: 15 questions\n`);

// 15 more LeetCode questions with both JS and Python
const newQuestions = [
  {
    title: "Add Two Numbers",
    problem: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    js: `function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;
  
  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    l1 = l1?.next;
    l2 = l2?.next;
  }
  
  return dummy.next;
}
// Time: O(max(m, n)), Space: O(max(m, n))`,
    python: `def add_two_numbers(l1, l2):
    """
    Linked list addition with carry
    Time: O(max(m, n))
    Space: O(max(m, n))
    """
    dummy = ListNode(0)
    current = dummy
    carry = 0
    
    while l1 or l2 or carry:
        total = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry
        carry = total // 10
        current.next = ListNode(total % 10)
        current = current.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    
    return dummy.next`
  },
  {
    title: "Swap Nodes in Pairs",
    problem: "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).",
    js: `function swapPairs(head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  
  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = prev.next.next;
    
    prev.next = second;
    first.next = second.next;
    second.next = first;
    
    prev = first;
  }
  
  return dummy.next;
}
// Time: O(n), Space: O(1)`,
    python: `def swap_pairs(head):
    """
    Iterative approach
    Time: O(n)
    Space: O(1)
    """
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    
    while prev.next and prev.next.next:
        first = prev.next
        second = prev.next.next
        
        prev.next = second
        first.next = second.next
        second.next = first
        
        prev = first
    
    return dummy.next`
  },
  {
    title: "Reverse Nodes in k-Group",
    problem: "Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list. `k` is a positive integer and is less than or equal to the length of the linked list.",
    js: `function reverseKGroup(head, k) {
  let current = head;
  let count = 0;
  
  // Check if there are k nodes
  while (current && count < k) {
    current = current.next;
    count++;
  }
  
  if (count === k) {
    current = reverseKGroup(current, k);
    
    // Reverse k nodes
    while (count > 0) {
      const temp = head.next;
      head.next = current;
      current = head;
      head = temp;
      count--;
    }
    head = current;
  }
  
  return head;
}
// Time: O(n), Space: O(n/k)`,
    python: `def reverse_k_group(head, k):
    """
    Recursive approach
    Time: O(n)
    Space: O(n/k)
    """
    current = head
    count = 0
    
    # Check if there are k nodes
    while current and count < k:
        current = current.next
        count += 1
    
    if count == k:
        current = reverse_k_group(current, k)
        
        # Reverse k nodes
        while count > 0:
            temp = head.next
            head.next = current
            current = head
            head = temp
            count -= 1
        head = current
    
    return head`
  },
  {
    title: "Copy List with Random Pointer",
    problem: "A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`. Construct a deep copy of the list.",
    js: `function copyRandomList(head) {
  if (!head) return null;
  
  const map = new Map();
  let current = head;
  
  // First pass: create all nodes
  while (current) {
    map.set(current, new Node(current.val));
    current = current.next;
  }
  
  // Second pass: set next and random pointers
  current = head;
  while (current) {
    map.get(current).next = current.next ? map.get(current.next) : null;
    map.get(current).random = current.random ? map.get(current.random) : null;
    current = current.next;
  }
  
  return map.get(head);
}
// Time: O(n), Space: O(n)`,
    python: `def copy_random_list(head):
    """
    Hash map approach
    Time: O(n)
    Space: O(n)
    """
    if not head:
        return None
    
    map = {}
    current = head
    
    # First pass: create all nodes
    while current:
        map[current] = Node(current.val)
        current = current.next
    
    # Second pass: set next and random pointers
    current = head
    while current:
        map[current].next = map.get(current.next)
        map[current].random = map.get(current.random)
        current = current.next
    
    return map[head]`
  },
  {
    title: "LRU Cache",
    problem: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the `LRUCache` class with `get(key)` and `put(key, value)` methods.",
    js: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  
  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
    this.map.set(key, value);
  }
}
// Time: O(1), Space: O(capacity)`,
    python: `from collections import OrderedDict

class LRUCache:
    """
    OrderedDict implementation
    Time: O(1)
    Space: O(capacity)
    """
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        elif len(self.cache) >= self.capacity:
            self.cache.popitem(last=False)
        self.cache[key] = value`
  },
  {
    title: "Merge Intervals",
    problem: "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    js: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }
  
  return merged;
}
// Time: O(n log n), Space: O(n)`,
    python: `def merge(intervals):
    """
    Sort and merge
    Time: O(n log n)
    Space: O(n)
    """
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for i in range(1, len(intervals)):
        last = merged[-1]
        if intervals[i][0] <= last[1]:
            last[1] = max(last[1], intervals[i][1])
        else:
            merged.append(intervals[i])
    
    return merged`
  },
  {
    title: "Non-overlapping Intervals",
    problem: "Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    js: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let end = intervals[0][1];
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < end) {
      count++;
    } else {
      end = intervals[i][1];
    }
  }
  
  return count;
}
// Time: O(n log n), Space: O(1)`,
    python: `def erase_overlap_intervals(intervals):
    """
    Greedy approach - sort by end time
    Time: O(n log n)
    Space: O(1)
    """
    intervals.sort(key=lambda x: x[1])
    count = 0
    end = intervals[0][1]
    
    for i in range(1, len(intervals)):
        if intervals[i][0] < end:
            count += 1
        else:
            end = intervals[i][1]
    
    return count`
  },
  {
    title: "Meeting Rooms",
    problem: "Given an array of meeting time `intervals` where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings.",
    js: `function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }
  
  return true;
}
// Time: O(n log n), Space: O(1)`,
    python: `def can_attend_meetings(intervals):
    """
    Sort and check overlaps
    Time: O(n log n)
    Space: O(1)
    """
    intervals.sort(key=lambda x: x[0])
    
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    
    return True`
  },
  {
    title: "Meeting Rooms II",
    problem: "Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of conference rooms required.",
    js: `function minMeetingRooms(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
  
  let rooms = 0;
  let endIndex = 0;
  
  for (let start of starts) {
    if (start >= ends[endIndex]) {
      endIndex++;
    } else {
      rooms++;
    }
  }
  
  return rooms;
}
// Time: O(n log n), Space: O(n)`,
    python: `def min_meeting_rooms(intervals):
    """
    Two pointers approach
    Time: O(n log n)
    Space: O(n)
    """
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])
    
    rooms = 0
    end_index = 0
    
    for start in starts:
        if start >= ends[end_index]:
            end_index += 1
        else:
            rooms += 1
    
    return rooms`
  },
  {
    title: "Insert Interval",
    problem: "You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `i`th interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval. Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).",
    js: `function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  
  // Add all intervals before newInterval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }
  
  // Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);
  
  // Add remaining intervals
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }
  
  return result;
}
// Time: O(n), Space: O(n)`,
    python: `def insert(intervals, new_interval):
    """
    Three phases: before, merge, after
    Time: O(n)
    Space: O(n)
    """
    result = []
    i = 0
    
    # Add all intervals before new_interval
    while i < len(intervals) and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1
    
    # Merge overlapping intervals
    while i < len(intervals) and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    result.append(new_interval)
    
    # Add remaining intervals
    while i < len(intervals):
        result.append(intervals[i])
        i += 1
    
    return result`
  },
  {
    title: "Jump Game",
    problem: "You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index, or `false` otherwise.",
    js: `function canJump(nums) {
  let maxReach = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  
  return true;
}
// Time: O(n), Space: O(1)`,
    python: `def can_jump(nums):
    """
    Greedy approach
    Time: O(n)
    Space: O(1)
    """
    max_reach = 0
    
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
        if max_reach >= len(nums) - 1:
            return True
    
    return True`
  },
  {
    title: "Jump Game II",
    problem: "You are given a 0-indexed array of integers `nums` of length `n`. You are initially positioned at `nums[0]`. Each element `nums[i]` represents the maximum length of a forward jump from index `i`. Return the minimum number of jumps to reach `nums[n - 1]`.",
    js: `function jump(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;
  
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }
  
  return jumps;
}
// Time: O(n), Space: O(1)`,
    python: `def jump(nums):
    """
    Greedy BFS approach
    Time: O(n)
    Space: O(1)
    """
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        
        if i == current_end:
            jumps += 1
            current_end = farthest
    
    return jumps`
  },
  {
    title: "Gas Station",
    problem: "There are `n` gas stations along a circular route, where the amount of gas at the `i`th station is `gas[i]`. You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `i`th station to its next `(i + 1)`th station. Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`.",
    js: `function canCompleteCircuit(gas, cost) {
  let totalTank = 0;
  let currentTank = 0;
  let startStation = 0;
  
  for (let i = 0; i < gas.length; i++) {
    totalTank += gas[i] - cost[i];
    currentTank += gas[i] - cost[i];
    
    if (currentTank < 0) {
      startStation = i + 1;
      currentTank = 0;
    }
  }
  
  return totalTank >= 0 ? startStation : -1;
}
// Time: O(n), Space: O(1)`,
    python: `def can_complete_circuit(gas, cost):
    """
    Greedy approach
    Time: O(n)
    Space: O(1)
    """
    total_tank = 0
    current_tank = 0
    start_station = 0
    
    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        current_tank += gas[i] - cost[i]
        
        if current_tank < 0:
            start_station = i + 1
            current_tank = 0
    
    return start_station if total_tank >= 0 else -1`
  },
  {
    title: "Candy",
    problem: "There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`. You are giving candies to these children subjected to the following requirements: Each child must have at least one candy. Children with a higher rating get more candies than their neighbors. Return the minimum number of candies you need to have to distribute the candies to the children.",
    js: `function candy(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  
  // Left to right
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }
  
  // Right to left
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }
  
  return candies.reduce((a, b) => a + b, 0);
}
// Time: O(n), Space: O(n)`,
    python: `def candy(ratings):
    """
    Two passes
    Time: O(n)
    Space: O(n)
    """
    n = len(ratings)
    candies = [1] * n
    
    # Left to right
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1
    
    # Right to left
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)
    
    return sum(candies)`
  },
  {
    title: "Trapping Rain Water",
    problem: "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
    js: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  
  return water;
}
// Time: O(n), Space: O(1)`,
    python: `def trap(height):
    """
    Two pointers approach
    Time: O(n)
    Space: O(1)
    """
    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0
    
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    
    return water`
  }
];

// Append to file
let newContent = '\n';
newQuestions.forEach((q, idx) => {
  const questionNum = currentCount + idx + 1;
  newContent += `### ${questionNum}. ${q.title}\n\n`;
  newContent += `**Problem:**\n${q.problem}\n\n`;
  newContent += `**Answer:**\n\n`;
  newContent += `### JavaScript\n\`\`\`javascript\n${q.js}\n\`\`\`\n\n`;
  newContent += `### Python\n\`\`\`python\n${q.python}\n\`\`\`\n\n`;
  newContent += `---\n\n`;
});

fs.appendFileSync(questionsFile, newContent, 'utf8');

const finalCount = (fs.readFileSync(questionsFile, 'utf8').match(/^### \d+\./gm) || []).length;

console.log('='.repeat(80));
console.log('✅ QUESTIONS ADDED - BATCH 6');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Still need: ${Math.max(0, 150 - finalCount)} more questions\n`);
console.log(`✅ Batch 6 complete! Continue with batch 7 in next chat.\n`);
