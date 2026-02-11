const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, 'algorithms', 'logic-questions', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING MISSING LOGIC QUESTIONS');
console.log('='.repeat(80));

// Read existing questions
let content = fs.readFileSync(questionsFile, 'utf8');
const existingCount = (content.match(/^### /gm) || []).length;
const needed = 225 - existingCount;

console.log(`\n📊 Current questions: ${existingCount}`);
console.log(`📊 Questions needed: ${needed}`);
console.log(`\n📝 Adding ${needed} new logic questions...\n`);

// Additional logic questions for interview preparation
const newQuestions = [
  {
    title: "Three Light Switches Problem",
    problem: "You are in a room with three light switches. One controls a light bulb in another room. You can only enter that room once. How do you determine which switch controls the light?",
    answer: "**Approach:**\nTurn on the first switch and leave it on for a few minutes, then turn it off. Turn on the second switch and leave it on. Enter the room.\n\n**Solution:**\n- If the light is on: second switch controls it\n- If the light is off but warm: first switch controls it\n- If the light is off and cold: third switch controls it\n\nThis uses the heat from the bulb to identify which switch was used."
  },
  {
    title: "100 Prisoners and Light Bulb",
    problem: "100 prisoners are in separate cells. There's a light bulb in a central room. Each day, one prisoner (chosen randomly) can enter the room and flip the switch. How can they coordinate to know when everyone has been in the room at least once?",
    answer: "**Approach:**\nDesignate one prisoner as the counter. Others turn the light on only once (if it's off). The counter turns it off and counts.\n\n**Solution:**\n1. Designate one prisoner as the counter\n2. All other prisoners: if light is OFF and you haven't turned it on before, turn it ON\n3. Counter: if light is ON, turn it OFF and increment count\n4. When counter reaches 99, everyone has been in the room\n\n**Complexity:**\n- Expected time: O(n²) days\n- Worst case: O(n²) days"
  },
  {
    title: "Poisoned Wine Problem",
    problem: "You have 1000 bottles of wine, one is poisoned. You have 10 test strips that can detect poison. Each test strip can be used once and takes 7 days to show results. How do you identify the poisoned bottle in the minimum time?",
    answer: "**Approach:**\nUse binary representation. Each bottle number can be represented in binary (10 bits for 1000 bottles). Each test strip represents one bit position.\n\n**Solution:**\n1. Number bottles 0-999\n2. For each bottle, add a drop to test strips corresponding to 1-bits in its binary representation\n3. After 7 days, read the results: strips that turn positive indicate which bits are 1\n4. Convert binary result to decimal to get the poisoned bottle number\n\n**Example:**\nBottle 42 = 0010101010 (binary)\nAdd drops to strips 1, 3, 5, 7\nIf those strips turn positive, bottle 42 is poisoned\n\n**Time:** 7 days (one test cycle)"
  },
  {
    title: "Burning Ropes Problem",
    problem: "You have two ropes, each takes exactly 60 minutes to burn from end to end. The ropes burn at non-uniform rates (different parts burn at different speeds). How do you measure exactly 45 minutes?",
    answer: "**Approach:**\nLight both ends of one rope and one end of the other rope simultaneously.\n\n**Solution:**\n1. Light both ends of rope A and one end of rope B at time 0\n2. When rope A finishes burning (30 minutes), light the other end of rope B\n3. Rope B will finish burning 15 minutes later (45 minutes total)\n\n**Why it works:**\n- Rope A burns from both ends → takes 30 minutes\n- Rope B burns from one end for 30 minutes, then from both ends for remaining 15 minutes\n- Total: 30 + 15 = 45 minutes"
  },
  {
    title: "4 People Handshakes",
    problem: "Four people meet. Some shake hands, some don't. No one shakes hands with themselves, and no pair shakes hands more than once. After all handshakes, how many hands were shaken in total?",
    answer: "**Approach:**\nThis is a graph theory problem. Each person is a vertex, each handshake is an edge.\n\n**Solution:**\nMaximum handshakes = C(4,2) = 4!/(2!×2!) = 6\n\n**Explanation:**\n- Person A can shake with B, C, D (3 possibilities)\n- Person B can shake with C, D (2 possibilities, already counted A)\n- Person C can shake with D (1 possibility, already counted A, B)\n- Total: 3 + 2 + 1 = 6\n\n**General formula:**\nFor n people: n(n-1)/2 handshakes maximum"
  },
  {
    title: "Island of Truth and Lies",
    problem: "You meet two people on an island. One always tells the truth, one always lies. You can ask one question to determine which is which. What question do you ask?",
    answer: "**Approach:**\nAsk a question that forces both to give the same answer regardless of who is the truth-teller.\n\n**Solution:**\nAsk either person: \"If I asked the other person which path leads to safety, what would they say?\"\n\nThen take the opposite path.\n\n**Why it works:**\n- Truth-teller knows liar will point to wrong path, so truth-teller says wrong path\n- Liar knows truth-teller will point to right path, so liar says wrong path\n- Both point to wrong path, so you take the opposite\n\n**Alternative question:**\n\"What would the other person say if I asked if you are the truth-teller?\"\n- Both will say \"no\", so the other one is the truth-teller"
  },
  {
    title: "Prisoner Hats Problem",
    problem: "100 prisoners are lined up. Each can see all hats in front but not their own or behind. Hats are either black or white, assigned randomly. Starting from the back, each prisoner must guess their hat color. They can coordinate a strategy beforehand. What strategy guarantees at least 99 correct guesses?",
    answer: "**Approach:**\nUse parity (even/odd count) to encode information.\n\n**Solution:**\n1. Last prisoner counts black hats in front\n2. If count is even, says \"black\"; if odd, says \"white\"\n3. This encodes the parity for others\n4. Each subsequent prisoner:\n   - Counts black hats they can see\n   - Compares with expected parity from previous guesses\n   - Determines their own hat color\n\n**Why it works:**\n- Last prisoner's guess may be wrong, but it encodes the parity\n- All others can deduce their hat color from the parity information\n- Result: 99 correct, 1 may be wrong (the last one)"
  },
  {
    title: "Race Horses Problem",
    problem: "You have 25 horses. You can race 5 horses at a time. What is the minimum number of races needed to find the 3 fastest horses?",
    answer: "**Approach:**\nRace in groups, then race the winners.\n\n**Solution:**\n1. Race 1-5: Get top 3 (A1, A2, A3)\n2. Race 6-10: Get top 3 (B1, B2, B3)\n3. Race 11-15: Get top 3 (C1, C2, C3)\n4. Race 16-20: Get top 3 (D1, D2, D3)\n5. Race 21-25: Get top 3 (E1, E2, E3)\n6. Race winners: A1, B1, C1, D1, E1 → Get top 3 overall (say A1, B1, C1)\n7. Race A2, A3, B1, B2, C1 → Get 2nd and 3rd fastest\n\n**Total: 7 races**\n\n**Why:**\n- A1 is definitely fastest\n- 2nd could be A2, B1, or C1\n- 3rd could be A2, A3, B1, B2, or C1\n- Need one more race to determine"
  },
  {
    title: "Snail Climbing Problem",
    problem: "A snail climbs up a 10-foot wall. During the day, it climbs 3 feet. At night, it slides back 2 feet. How many days does it take to reach the top?",
    answer: "**Approach:**\nCalculate net progress per day, but account for the final day when it reaches the top before sliding.\n\n**Solution:**\n- Net progress per day: 3 feet up - 2 feet down = 1 foot\n- But on the last day, it reaches 10 feet before sliding back\n- So it needs to climb 7 feet (10 - 3) at 1 foot/day = 7 days\n- On day 8, it climbs 3 feet from 7 to 10 feet and reaches the top\n\n**Answer: 8 days**\n\n**Verification:**\nDay 1: 0→3→1, Day 2: 1→4→2, Day 3: 2→5→3, Day 4: 3→6→4, Day 5: 4→7→5, Day 6: 5→8→6, Day 7: 6→9→7, Day 8: 7→10 (reached!)"
  },
  {
    title: "Marbles in a Jar",
    problem: "You have a jar with red and blue marbles. You randomly pick two marbles. If both are red, you add a red marble. If both are blue, you add a blue marble. If one of each, you add a blue marble. What happens to the ratio of red to blue marbles over time?",
    answer: "**Approach:**\nAnalyze how the process changes the marble counts.\n\n**Solution:**\nThe ratio of red marbles decreases over time.\n\n**Why:**\n- RR → +R: Red count increases\n- BB → +B: Blue count increases\n- RB/BR → +B: Blue count increases (red decreases relatively)\n\n**Mathematical analysis:**\nLet r = red count, b = blue count\n- Expected change in red: P(RR) × (+1) + P(RB) × (-1)\n- P(RR) = r/(r+b) × (r-1)/(r+b-1)\n- P(RB) = 2 × r/(r+b) × b/(r+b-1)\n- Net: Red decreases when b > 0\n\n**Result:** Eventually, all marbles become blue (or very few red remain)"
  },
  {
    title: "Coin Flip Game",
    problem: "You flip a fair coin repeatedly. You win if you get two heads in a row before getting two tails in a row. What is the probability of winning?",
    answer: "**Approach:**\nUse state-based probability calculation.\n\n**Solution:**\nLet P = probability of winning from start\nLet P_H = probability of winning after one head\nLet P_T = probability of winning after one tail\n\n**Equations:**\n- P = 0.5 × P_H + 0.5 × P_T (first flip: H or T)\n- P_H = 0.5 × 1 + 0.5 × P_T (if H: win if next H, else go to P_T)\n- P_T = 0.5 × 0 + 0.5 × P_H (if T: lose if next T, else go to P_H)\n\n**Solving:**\nP_T = 0.5 × P_H\nP_H = 0.5 + 0.5 × P_T = 0.5 + 0.25 × P_H\n0.75 × P_H = 0.5\nP_H = 2/3\nP_T = 1/3\nP = 0.5 × (2/3) + 0.5 × (1/3) = 1/2\n\n**Answer: 1/2 (50%)**"
  },
  {
    title: "Josephus Problem",
    problem: "n people stand in a circle. They count off, and every k-th person is eliminated. What is the position of the last remaining person?",
    answer: "**Approach:**\nUse recurrence relation or mathematical formula.\n\n**Solution for k=2:**\nJ(n) = 2 × (n - 2^⌊log₂(n)⌋) + 1\n\n**Recursive formula:**\nJ(n, k) = (J(n-1, k) + k) mod n + 1\n\n**Example (n=7, k=2):**\nElimination order: 2, 4, 6, 1, 5, 3\nLast remaining: Position 7\n\n**General approach:**\n1. For small n, simulate the elimination\n2. For large n, use the recurrence or closed form\n3. For k=2, use the formula involving powers of 2\n\n**Time complexity:** O(n) for simulation, O(log n) for formula"
  },
  {
    title: "Tower of Hanoi",
    problem: "You have three rods and n disks of different sizes. Move all disks from the first rod to the third rod, following rules: (1) Move one disk at a time, (2) Only move the top disk, (3) Never place a larger disk on a smaller one. What is the minimum number of moves?",
    answer: "**Approach:**\nUse recursion: to move n disks, move n-1 disks to middle, move largest to destination, move n-1 disks to destination.\n\n**Solution:**\nT(n) = 2^n - 1 moves\n\n**Recurrence relation:**\nT(n) = 2 × T(n-1) + 1\nT(1) = 1\n\n**Proof:**\n- To move n disks: move n-1 to middle (T(n-1)), move largest (1), move n-1 to destination (T(n-1))\n- T(n) = 2T(n-1) + 1\n- Solving: T(n) = 2^n - 1\n\n**Example:**\n- 3 disks: 2³ - 1 = 7 moves\n- 5 disks: 2⁵ - 1 = 31 moves\n\n**Time complexity:** O(2^n)"
  },
  {
    title: "8 Queens Problem",
    problem: "Place 8 queens on an 8×8 chessboard such that no two queens attack each other. How many solutions exist?",
    answer: "**Approach:**\nUse backtracking to find all valid placements.\n\n**Solution:**\nThere are 92 distinct solutions (12 fundamental solutions, each can be rotated/reflected).\n\n**Algorithm:**\n1. Place queens row by row\n2. For each row, try each column\n3. Check if position is safe (no conflict with previous queens)\n4. If safe, recurse to next row\n5. If all rows filled, record solution\n6. Backtrack and try next column\n\n**Optimization:**\n- Track occupied columns, diagonals\n- Use bit manipulation for faster checking\n\n**Time complexity:** O(n!) worst case, but pruning makes it much faster\n**Space complexity:** O(n) for recursion stack"
  },
  {
    title: "King on Chessboard",
    problem: "A king starts at one corner of an 8×8 chessboard and wants to reach the opposite corner. It can move one square in any direction (including diagonally). How many distinct paths of minimum length exist?",
    answer: "**Approach:**\nThe king needs to move 7 steps right and 7 steps up (or any combination). Minimum path length is 7 moves.\n\n**Solution:**\nFor an n×n board, minimum path length is n-1 moves.\nNumber of paths = C(2(n-1), n-1)\n\n**For 8×8 board:**\n- Minimum moves: 7\n- Paths: C(14, 7) = 14!/(7!×7!) = 3,432\n\n**Why:**\n- Need 7 right moves and 7 up moves (or diagonal equivalents)\n- Total 14 moves, choose 7 positions for right moves\n- Remaining 7 are up moves\n\n**General formula:**\nFor m×n board: C(m+n-2, m-1) minimum-length paths"
  },
  {
    title: "Magic Square",
    problem: "Create a 3×3 magic square using numbers 1-9, where each row, column, and diagonal sums to the same number.",
    answer: "**Approach:**\nThe magic constant for 1-9 is 15 (sum 1+2+...+9 = 45, divided by 3 rows = 15).\n\n**Solution:**\nOne solution:\n```\n8 1 6\n3 5 7\n4 9 2\n```\n\n**Properties:**\n- Magic constant: 15\n- Center is always 5\n- Corners are even numbers\n- Middle edges are odd numbers\n\n**Algorithm to generate:**\n1. Place 5 in center\n2. Place 1 in top-middle\n3. Move diagonally up-right, wrapping around\n4. If cell occupied, move down instead\n\n**Number of solutions:** 8 (rotations and reflections of the same pattern)"
  },
  {
    title: "Cards Arrangement",
    problem: "You have a deck of 52 cards. You shuffle and deal them face down. What is the probability that no card is in its original position?",
    answer: "**Approach:**\nThis is the derangement problem.\n\n**Solution:**\nProbability ≈ 1/e ≈ 0.3679 (36.79%)\n\n**Derangement formula:**\nD(n) = n! × Σ(-1)^k / k! for k=0 to n\n\n**For large n:**\nD(n) ≈ n! / e\nProbability = D(n) / n! ≈ 1/e\n\n**For 52 cards:**\n- Exact calculation is complex\n- Approximation: 1/e ≈ 0.367879\n- So about 36.8% chance no card is in original position\n\n**Interesting fact:**\nAs n increases, probability approaches 1/e, regardless of deck size!"
  },
  {
    title: "Splitting Money Problem",
    problem: "Two people want to split $100 fairly. They take turns making offers. If an offer is rejected, the total decreases by $10. What is the optimal strategy?",
    answer: "**Approach:**\nUse backward induction from the end game.\n\n**Solution:**\n**Optimal strategy (first mover):**\n- Offer: $60 to yourself, $40 to other\n- If rejected, next round offers $50/$50 (or $60/$40 if you're second)\n- Accept any offer ≥ $40\n\n**Why:**\n- Last round: $10 left, first mover gets all\n- Second-to-last: $20, second mover offers $10/$10 (both accept)\n- Third-to-last: $30, first mover offers $20/$10\n- And so on...\n\n**General formula:**\nFor amount A decreasing by D each round:\n- First mover advantage increases with more rounds\n- Optimal split depends on number of rounds remaining"
  },
  {
    title: "100 Chickens and Eggs",
    problem: "A farmer has 100 chickens. Each chicken lays eggs at a different rate. You can only check one chicken's nest per day. How do you find which chicken lays the most eggs in the minimum time?",
    answer: "**Approach:**\nThis is similar to finding the maximum in an array, but with the constraint of checking one per day.\n\n**Solution:**\n**Strategy:**\n1. Check each chicken's nest once (100 days)\n2. Identify the top candidates (say top 10)\n3. Monitor those candidates over additional days\n4. Compare total eggs laid\n\n**Optimization:**\n- If you can check multiple nests per day: O(n) time\n- If one nest per day: Need at least n days to check all\n- Best approach: Check all once, then focus on top performers\n\n**Alternative (if you can mark nests):**\n- Mark nests as you check them\n- Track running maximum\n- Time: 100 days minimum (must check each at least once)"
  },
  {
    title: "Ages of Children",
    problem: "A census taker asks a mathematician: 'How many children do you have, and what are their ages?' Mathematician: 'I have three children. The product of their ages is 36, and the sum is equal to the house number next door.' Census taker: 'I need more information.' Mathematician: 'The oldest child plays piano.' Census taker: 'Now I know the ages.' What are the ages?",
    answer: "**Approach:**\nList all factor combinations of 36 with 3 factors, find which has ambiguous sum.\n\n**Solution:**\n**Factor combinations (a, b, c where a×b×c=36):**\n1, 1, 36 → sum = 38\n1, 2, 18 → sum = 21\n1, 3, 12 → sum = 16\n1, 4, 9 → sum = 14\n1, 6, 6 → sum = 13\n2, 2, 9 → sum = 13\n2, 3, 6 → sum = 11\n3, 3, 4 → sum = 10\n\n**Why census taker needed more info:**\nTwo combinations have sum 13: (1,6,6) and (2,2,9)\n\n**Why 'oldest plays piano' helps:**\n- (1,6,6): two oldest are same age (6)\n- (2,2,9): has a unique oldest (9)\n\n**Answer: Ages are 2, 2, and 9**"
  },
  {
    title: "Number Lock Combination",
    problem: "A safe has a 3-digit combination lock. You know that: (1) 682 - one digit is correct and in the right position, (2) 614 - one digit is correct but in the wrong position, (3) 206 - two digits are correct but both in wrong positions, (4) 738 - no digits are correct, (5) 870 - one digit is correct but in the wrong position. What is the combination?",
    answer: "**Approach:**\nUse process of elimination based on the clues.\n\n**Solution:**\n**Step-by-step deduction:**\n1. From (4): 7, 3, 8 are not in the combination\n2. From (1): One of 6, 8, 2 is correct and in right position\n   - Since 8 is wrong (from step 1), either 6 is 1st digit OR 2 is 3rd digit\n3. From (2): One of 6, 1, 4 is correct but wrong position\n   - If 6 is correct, it's not in 1st position (contradicts step 2 if 6 is 1st)\n   - So either 1 or 4 is correct\n4. From (3): Two of 2, 0, 6 are correct but wrong positions\n   - 2 could be correct (not in 3rd position)\n   - 0 could be correct (not in 2nd position)\n   - 6 could be correct (not in 1st position)\n5. From (5): One of 8, 7, 0 is correct but wrong position\n   - 8 and 7 are wrong (from step 1), so 0 is correct\n   - 0 is not in 2nd position\n\n**Final deduction:**\n- 0 is in 1st or 3rd position (from step 5)\n- From (3), if 0 is correct, it's not in 2nd position ✓\n- From (1), if 2 is in 3rd position, then 6 is not in 1st\n- From (2), if 6 is not in 1st, then 1 or 4 is correct\n- From (3), 2 and 6 are both correct\n- Combination: 0 _ 2 or 2 _ 0\n- Testing: 042 doesn't work with (2)\n- Answer: **042** (0 in 1st, 4 in 2nd, 2 in 3rd)\n\nWait, let me reconsider...\n\nActually: **042**\n- (1) 682: 2 is correct, 3rd position ✓\n- (2) 614: 4 is correct, wrong position (should be 2nd) ✓\n- (3) 206: 0 and 2 are correct, wrong positions ✓\n- (4) 738: none correct ✓\n- (5) 870: 0 is correct, wrong position ✓\n\n**Answer: 042**"
  }
];

// Add more questions to reach the target
const additionalQuestions = [
  {
    title: "Water Jug Measurement",
    problem: "You have a 3-gallon jug and a 5-gallon jug. How do you measure exactly 4 gallons?",
    answer: "**Solution:**\n1. Fill 5-gallon jug\n2. Pour from 5 to 3 (leaves 2 in 5-gallon)\n3. Empty 3-gallon jug\n4. Pour remaining 2 from 5 to 3\n5. Fill 5-gallon jug\n6. Pour from 5 to 3 until 3 is full (pours 1, leaves 4 in 5-gallon)\n\n**Result: 4 gallons in 5-gallon jug**"
  },
  {
    title: "Clock Hands Overlap",
    problem: "How many times do the hour and minute hands of a clock overlap in 12 hours?",
    answer: "**Solution:**\nThe hands overlap 11 times in 12 hours.\n\n**Why:**\n- They overlap at 12:00, then approximately every 65.45 minutes\n- In 12 hours (720 minutes): 720 / 65.45 ≈ 11 times\n- Exact times: 12:00, 1:05.45, 2:10.91, ..., 10:54.55, 11:59.99 (which is essentially 12:00)\n\n**Formula:**\nOverlap occurs when: (hour × 30 + minute × 0.5) = minute × 6\nSolving: minute = (hour × 30) / 5.5"
  },
  {
    title: "Trailing Zeros in Factorial",
    problem: "How many trailing zeros does 100! have?",
    answer: "**Approach:**\nTrailing zeros come from factors of 10 = 2 × 5. Count pairs of 2s and 5s.\n\n**Solution:**\nCount multiples of 5:\n- 5, 10, 15, ..., 100: 20 numbers\n- Multiples of 25: 25, 50, 75, 100: 4 additional 5s\n- Multiples of 125: 0 (none ≤ 100)\n\nTotal 5s: 20 + 4 = 24\nThere are more 2s than 5s, so answer is 24.\n\n**Answer: 24 trailing zeros**\n\n**General formula:**\nTrailing zeros in n! = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ..."
  },
  {
    title: "Estimate Gas Stations",
    problem: "Estimate the number of gas stations in the United States.",
    answer: "**Approach:**\nUse Fermi estimation: break down into smaller estimates.\n\n**Solution:**\n**Method 1: Population-based**\n- US population: ~330 million\n- Cars per person: ~0.8\n- Total cars: ~264 million\n- Average miles per car per year: ~12,000\n- Average MPG: ~25\n- Gallons per car per year: 12,000 / 25 = 480\n- Total gallons: 264M × 480 = ~127 billion gallons\n- Average station throughput: ~100,000 gallons/month = 1.2M gallons/year\n- Stations needed: 127B / 1.2M ≈ **106,000 stations**\n\n**Method 2: Geographic**\n- US area: ~3.8 million sq miles\n- Urban areas: ~3% of land, but 80% of stations\n- Assume 1 station per 2 sq miles in urban areas\n- Rough estimate: **100,000 - 150,000 stations**\n\n**Actual: ~150,000 gas stations**"
  },
  {
    title: "Why Manhole Covers Are Round",
    problem: "Why are manhole covers typically round instead of square?",
    answer: "**Solution:**\n**Primary reason: Safety**\nA round cover cannot fall through its hole, regardless of orientation. A square cover can be rotated diagonally and fall through.\n\n**Other advantages:**\n1. **No orientation needed** - can be placed in any rotation\n2. **Easier to roll** - round objects are easier to move\n3. **Equal stress distribution** - circular shape distributes weight evenly\n4. **Manufacturing** - easier to make perfectly round than perfectly square\n5. **Strength** - circular shape is inherently strong\n\n**Mathematical proof:**\n- Square diagonal = side × √2 > side\n- So square can fall through if rotated 45°\n- Circle diameter is constant in all directions"
  },
  {
    title: "Counting Set Bits",
    problem: "Count the number of 1-bits in the binary representation of a number. Optimize for speed.",
    answer: "**Approach:**\nUse bit manipulation tricks.\n\n**Solution 1: Brian Kernighan's Algorithm**\n```\ncount = 0\nwhile n > 0:\n    n = n & (n - 1)  // Removes rightmost 1-bit\n    count++\nreturn count\n```\nTime: O(number of 1-bits)\n\n**Solution 2: Lookup Table**\nPrecompute counts for 0-255, then check each byte.\nTime: O(1) for 32-bit numbers (4 lookups)\n\n**Solution 3: Parallel Count**\nUse bit manipulation to count in parallel:\n```\nn = (n & 0x55555555) + ((n >> 1) & 0x55555555)\nn = (n & 0x33333333) + ((n >> 2) & 0x33333333)\nn = (n & 0x0F0F0F0F) + ((n >> 4) & 0x0F0F0F0F)\nn = (n & 0x00FF00FF) + ((n >> 8) & 0x00FF00FF)\nn = (n & 0x0000FFFF) + ((n >> 16) & 0x0000FFFF)\nreturn n\n```\nTime: O(log w) where w is word size"
  },
  {
    title: "Happy Number",
    problem: "A happy number is a number that eventually reaches 1 when replaced by the sum of squares of its digits repeatedly. Determine if a number is happy.",
    answer: "**Approach:**\nUse cycle detection (Floyd's algorithm or hash set).\n\n**Solution:**\n```\nfunction isHappy(n):\n    seen = set()\n    while n != 1 and n not in seen:\n        seen.add(n)\n        n = sumOfSquares(n)\n    return n == 1\n\nfunction sumOfSquares(n):\n    total = 0\n    while n > 0:\n        digit = n % 10\n        total += digit * digit\n        n = n / 10\n    return total\n```\n\n**Optimization (Floyd's cycle detection):**\nUse slow and fast pointers to detect cycles without extra space.\n\n**Time:** O(log n)\n**Space:** O(1) with cycle detection, O(log n) with hash set"
  },
  {
    title: "Single Number in Array",
    problem: "Given an array where every element appears twice except one, find that single element. Optimize for O(n) time and O(1) space.",
    answer: "**Approach:**\nUse XOR property: a ^ a = 0, a ^ 0 = a\n\n**Solution:**\n```\nfunction singleNumber(nums):\n    result = 0\n    for num in nums:\n        result ^= num\n    return result\n```\n\n**Why it works:**\n- Pairs cancel out: a ^ a = 0\n- Only the single number remains\n\n**Example:**\n[2, 1, 4, 2, 1]\n0 ^ 2 ^ 1 ^ 4 ^ 2 ^ 1\n= (2^2) ^ (1^1) ^ 4\n= 0 ^ 0 ^ 4\n= 4\n\n**Time:** O(n)\n**Space:** O(1)"
  },
  {
    title: "Missing Number in Range",
    problem: "Given an array of n distinct numbers in range [0, n], find the missing number.",
    answer: "**Approach:**\nUse sum formula or XOR.\n\n**Solution 1: Sum Formula**\n```\nfunction findMissing(nums):\n    n = nums.length\n    expectedSum = n * (n + 1) / 2\n    actualSum = sum(nums)\n    return expectedSum - actualSum\n```\n\n**Solution 2: XOR**\n```\nfunction findMissing(nums):\n    missing = nums.length\n    for i in range(len(nums)):\n        missing ^= i ^ nums[i]\n    return missing\n```\n\n**Time:** O(n)\n**Space:** O(1)"
  },
  {
    title: "Number of 1 Bits",
    problem: "Count the number of 1-bits in a 32-bit unsigned integer.",
    answer: "**Solution:**\nUse Brian Kernighan's algorithm:\n```\nfunction hammingWeight(n):\n    count = 0\n    while n != 0:\n        n = n & (n - 1)  // Removes rightmost 1\n        count++\n    return count\n```\n\n**Time:** O(number of 1-bits)\n**Space:** O(1)\n\n**Alternative:** Use built-in popcount instruction if available."
  },
  {
    title: "Reverse Bits",
    problem: "Reverse the bits of a 32-bit unsigned integer.",
    answer: "**Solution:**\n```\nfunction reverseBits(n):\n    result = 0\n    for i in range(32):\n        result = (result << 1) | (n & 1)\n        n = n >> 1\n    return result\n```\n\n**Optimization:**\nUse lookup table for byte reversal, then reverse byte order.\n\n**Time:** O(1) with lookup table, O(32) with bit manipulation\n**Space:** O(1)"
  }
];

// Combine all new questions
const allNewQuestions = [...newQuestions, ...additionalQuestions];

// Add to file
let newContent = '\n';
allNewQuestions.slice(0, needed).forEach((q, idx) => {
  newContent += `### ${q.title}\n\n`;
  if (q.problem) {
    newContent += `**Problem:**\n${q.problem}\n\n`;
  }
  newContent += `**Answer:**\n${q.answer}\n\n`;
  newContent += `---\n\n`;
});

// Append to file
fs.appendFileSync(questionsFile, newContent, 'utf8');

const finalCount = (fs.readFileSync(questionsFile, 'utf8').match(/^### /gm) || []).length;

console.log('='.repeat(80));
console.log('✅ QUESTIONS ADDED');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${allNewQuestions.slice(0, needed).length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 225 questions`);
console.log(`\n✅ Consolidation and addition complete!\n`);
