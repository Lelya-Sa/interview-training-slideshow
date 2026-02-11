# Frontend Testing Instructions - Logic Questions

## ✅ What Was Fixed

1. **Question Count**: Changed from random 2-5 to exactly **3 questions per day**
2. **Removed System Design Questions**: Removed 34 system design questions that don't belong in Logic Questions
3. **Parser Updated**: Now correctly handles JavaScript/Python subsections

## 🧪 How to Test the Frontend

### Step 1: Start the Development Server

```bash
cd slideshow-app
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3001`

### Step 2: Open the Frontend

1. Open your browser to `http://localhost:3001`
2. Navigate to the Roadmap view
3. Click on **Day 1**

### Step 3: Verify Logic Questions

**For Day 1:**
- ✅ Should show exactly **3 Logic Questions**
- ✅ Questions should be:
  - Find Missing Number in Array
  - Find Duplicate Number
  - Two Sum
- ✅ Each question should have both JavaScript and Python code blocks

**For Day 2:**
- ✅ Should show exactly **3 Logic Questions**
- ✅ Questions should be **different** from Day 1:
  - Reverse Integer
  - Palindrome Number
  - Power of Two
- ✅ Each question should have both JavaScript and Python code blocks

**For Day 71-75:**
- ✅ Should show exactly **3 Logic Questions** each day
- ✅ Questions should be logic puzzles (no code needed):
  - Snail Climbing Problem
  - Marbles in a Jar
  - Coin Flip Game
  - etc.

### Step 4: Check for Issues

**❌ Things that should NOT happen:**
- More or less than 3 questions per day
- System design questions (Cache Stampede, Design Search System, etc.)
- Same questions on consecutive days
- Missing JavaScript or Python code blocks (for algorithmic questions)

**✅ Things that should happen:**
- Exactly 3 questions per day
- Different questions each day (progressive learning)
- Both JS and Python implementations preserved
- Only actual logic questions (no system design)

## 🔍 Manual API Testing

You can also test the API directly:

```bash
# Test Day 1
curl "http://localhost:5000/api/roadmap/days/1"

# Test Logic Questions for Day 1
curl "http://localhost:5000/api/questions?path=algorithms/logic-questions/questions.md&dayNumber=1&count=3"
```

## 📊 Expected Results

| Day | Questions | All Different? | Has JS? | Has Python? |
|-----|-----------|----------------|---------|-------------|
| 1   | 3         | ✅             | ✅      | ✅          |
| 2   | 3         | ✅             | ✅      | ✅          |
| 3   | 3         | ✅             | ✅      | ✅          |
| 4   | 3         | ✅             | ✅      | ✅          |
| 5   | 3         | ✅             | ✅      | ✅          |
| 71  | 3         | ✅             | ❌*     | ❌*         |
| 72  | 3         | ✅             | ❌*     | ❌*         |
| 73  | 3         | ✅             | ❌*     | ❌*         |
| 74  | 3         | ✅             | ❌*     | ❌*         |
| 75  | 3         | ✅             | ❌*     | ❌*         |

*Later days have logic puzzles that don't require code (expected behavior)

## 🐛 Troubleshooting

**If you see wrong question counts:**
1. Check browser console for errors
2. Verify `QuestionsView.js` has the fix (should return 3, not random 2-5)
3. Clear browser cache and reload

**If you see system design questions:**
1. Check that `questions.md` was updated (should have 121 questions, not 155)
2. Verify the filtered file is in place

**If questions are the same each day:**
1. Check API logs for dayNumber parameter
2. Verify progressive learning logic is working

## ✅ Success Criteria

The frontend test passes if:
- [x] Exactly 3 questions per day
- [x] Different questions each day (no overlap)
- [x] No system design questions
- [x] JavaScript and Python code preserved
- [x] Questions match the topic (logic questions only)
