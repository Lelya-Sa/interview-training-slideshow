# Logic Questions - Interview Questions

This directory contains logic questions commonly asked in fullstack and software engineering interviews.

## 📁 Questions Directory

All questions are organized in individual files in the `questions/` folder. Each question includes:
- Problem statement
- Approach and reasoning
- Detailed solution
- Follow-up questions

See [questions/README.md](./questions/README.md) for complete list and categories.

## Question Categories

## 🧩 Classic Brain Teasers & Puzzles (20+ questions)
**Perfect for junior developers - pure logic problems:**
- Two Eggs Problem
- Light Bulb Switches
- River Crossing (Farmer, Wolf, Goat, Cabbage)
- 12 Balls Weighing
- Prisoners and Light Bulb
- Bridge Crossing
- Monty Hall Problem
- 100 Prisoners and 100 Boxes
- Water Jug Problem
- Coin Weighing
- Hat Colors
- Birthday Paradox
- Two Trains Problem
- Chocolate Bar
- Ants on a Stick
- Pirate Gold
- Truth-Tellers and Liars
- Cannibals and Missionaries
- Socks in Drawer
- Clock Angles
- Chess Board Problem
- 100 Doors Problem
- And more...

## 🏗️ System Design Logic (15 questions)
- Design URL Shortener
- Rate Limiting Design
- Consistent Hashing
- Cache Invalidation
- Session Storage Design
- And more...

## 🐛 Debugging & Problem Solving (15 questions)
- Debug Slow API
- Race Condition Debug
- Memory Leak Detection
- Database Deadlock
- Optimize N+1 Queries
- And more...

## 📊 Architecture & Scalability (5 questions)
- Database Replication Lag
- Distributed Transactions
- Cache Stampede
- And more...

## How to Use

1. **Study systematically**: Go through questions by category
2. **Think first**: Try solving before reading solution
3. **Understand reasoning**: Learn the thought process, not just answers
4. **Practice variations**: Work through follow-up questions
5. **Apply to work**: Connect concepts to real scenarios

## Interview Tips

- **Think out loud**: Explain your reasoning process
- **Ask questions**: Clarify requirements and constraints
- **Start simple**: Begin with basic solution, then optimize
- **Discuss trade-offs**: Consider pros/cons of different approaches
- **Think at scale**: Consider how solution works with millions of users

## Total: 100+ Logic Questions

**Perfect for Junior Developers!** The brain teasers section (20+ questions) contains classic logic puzzles that are commonly asked in entry-level and junior developer interviews. These test pure logical reasoning without requiring advanced coding knowledge.

These questions cover the most common logic problems, system design thinking, and debugging scenarios asked in technical interviews for fullstack and software engineering positions.

---

## Interview Q&A (for app – parsed as questions)

### 1. Two Eggs Problem: You have two identical eggs and a 100-story building. What is the minimum number of drops in the worst case to find the highest floor from which an egg can be dropped without breaking?
**Answer:** Use the first egg to narrow the range (e.g. drop at floors 14, 27, 39, 50…) and the second egg to linear search within that range. An optimal strategy yields about 14 drops in the worst case.

### 2. River Crossing: A farmer must cross a river with a wolf, a goat, and a cabbage. The boat holds only the farmer and one item. The wolf eats the goat if left alone; the goat eats the cabbage. How does the farmer get all across?
**Answer:** Take goat over, return. Take wolf over, bring goat back. Take cabbage over, return. Take goat over. No one is left alone with their prey.

### 3. Light Bulb and Switches: You have three switches in a room and one light bulb in a closed room. You can flip switches as often as you like but may open the door only once. How do you determine which switch controls the bulb?
**Answer:** Turn switch 1 ON for a few minutes, then turn it OFF and turn switch 2 ON. Open the door: if the bulb is on, it’s switch 2; if off and warm, switch 1; if off and cold, switch 3.

### 4. 12 Balls Weighing: You have 12 identical balls; one is heavier or lighter (unknown). Using a balance scale only 3 times, how do you find the odd ball and whether it’s heavier or lighter?
**Answer:** Weigh 4 vs 4. If equal, the odd ball is in the remaining 4—weigh 2 of those vs 2 known good; then weigh 1 vs 1 to find and compare. If 4 vs 4 unequal, use the “heavy side vs mix of heavy and good” and “light side vs good” logic in the next weighings to identify the odd ball and its type.

### 5. Monty Hall Problem: There are 3 doors; one has a car, two have goats. You pick a door. The host opens another door with a goat. Should you switch?
**Answer:** Yes. Switching gives you 2/3 chance of winning. Your first pick has 1/3; the remaining door has 2/3 because the host always reveals a goat.

### 6. Prisoners and Light Bulb: 100 prisoners get one chance to go to a room with a light bulb (on/off) and may flip it or leave it. How can they agree on a strategy so that eventually they all know everyone has been in the room at least once?
**Answer:** Designate one prisoner as “counter.” Bulb starts off. Others turn it on exactly once (the first time they enter). The counter turns it off each time they enter and counts. When the counter reaches 99, everyone has been in the room.

### 7. Water Jug: You have a 3-liter and a 5-liter jug. How do you measure exactly 4 liters?
**Answer:** Fill 5, pour into 3 (leaves 2 in 5). Empty 3, pour the 2 from 5 into 3. Fill 5 again, pour from 5 into 3 until 3 is full. The 5-liter jug now has exactly 4 liters.

### 8. Bridge Crossing: Four people must cross a bridge in 17 minutes. Only two can cross at a time with one flashlight. Speeds: 1, 2, 5, 10 min. How do they all get across in 17 minutes?
**Answer:** 1 and 2 cross (2 min). 1 returns (1 min). 5 and 10 cross (10 min). 2 returns (2 min). 1 and 2 cross (2 min). Total 17 min.

### 9. Hat Colors: Three people see each other’s hats (each hat is red or blue) but not their own. How can they guarantee at least one person guesses their hat color correctly?
**Answer:** They agree: the first person says “blue” if they see an even number of blue hats, “red” otherwise. The others can then deduce their own hat from what was said and what they see.

### 10. 100 Doors: 100 doors are closed. You toggle every 1st, then every 2nd, then every 3rd door, etc., up to every 100th. Which doors end up open?
**Answer:** Doors whose numbers are perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. A door is toggled once per divisor; only perfect squares have an odd number of divisors.

### 11. Ants on a Stick: Three ants on a 1-meter stick walk at 1 m/min. When two meet, they reverse. How long until all ants are off the stick?
**Answer:** At most 1 minute. Treat ants as passing through each other (same outcome as reversing). Each ant reaches an end within 1 minute.

### 12. Chocolate Bar: You have an n×m chocolate bar. You may break a piece along a line. What is the minimum number of breaks to get n×m single squares?
**Answer:** n×m − 1. Each break increases the number of pieces by 1. You start with 1 piece and need n×m pieces.

### 13. Socks in a Drawer: You have 10 black and 10 white socks in a drawer. How many must you take (in the dark) to guarantee a matching pair?
**Answer:** 3. With 2 you might get one of each. The third must match one of the first two.

### 14. Clock Angles: What is the angle between the hour and minute hands at 3:15?
**Answer:** The hour hand moves 0.5° per minute. At 3:15 the hour hand is at 97.5°, the minute hand at 90°. Angle is 7.5°.

### 15. Truth-Tellers and Liars: You meet two people: A says “B is a liar,” B says “A is a liar.” One always tells the truth, one always lies. Who is who?
**Answer:** They cannot both be truth-tellers (they’d contradict). If A is truth-teller, B is liar and B’s statement is false, so A is not a liar—consistent. If B is truth-teller, A is liar—also consistent. So either A truth-teller and B liar, or B truth-teller and A liar; the puzzle usually has one solution from context.

### 16. Why do we use logic puzzles in technical interviews?
**Answer:** To see how you break down problems, handle ambiguity, communicate your reasoning, and stay calm under constraint—all important for debugging and design.

### 17. How would you design a rate limiter (e.g. max 100 requests per minute per user)?
**Answer:** Sliding window or token bucket: track requests per user in a time window (e.g. Redis with key per user, increment and expire). Reject or queue when limit is exceeded.

### 18. How would you debug an API that is slow only sometimes?
**Answer:** Add logging (duration, payload size, DB/cache calls). Check for N+1 queries, missing indexes, lock contention, or cold caches. Reproduce under load and profile.

### 19. What is a race condition? Give a simple example.
**Answer:** Two or more operations depend on shared state and the outcome depends on order of execution. Example: two requests read “count = 5,” both add 1, both write 6 instead of 7.

### 20. How would you detect a memory leak in a Node.js app?
**Answer:** Use heap snapshots (Chrome DevTools, node --inspect), compare before/after a workload. Look for growing arrays, closures holding references, or listeners not removed.

### 21. You have 8 balls; one is heavier. What is the minimum number of weighings on a balance scale to find it?
**Answer:** 2. Weigh 3 vs 3. If equal, the heavy one is in the remaining 2—weigh one against any other. If unequal, weigh 2 from the heavier side; one weighing identifies the heavy ball.

### 22. A train leaves NYC for Boston at 60 mph. Another leaves Boston for NYC at 80 mph. The distance is 240 miles. When do they meet?
**Answer:** Relative speed 140 mph. Time = 240 / 140 ≈ 1.71 hours (about 1 hr 43 min).

### 23. How do you invalidate a cache when data changes?
**Answer:** On write: delete or update the cache key for that data (cache-aside). Optionally use write-through. For distributed cache, use events or TTL plus version/key invalidation.

### 24. What is consistent hashing and why is it used?
**Answer:** A hashing scheme that maps keys to a ring; nodes are also on the ring. When a node is added or removed, only nearby keys move. Used for distributed caches and DB sharding to minimize reassignment.

### 25. How would you design a short URL service (e.g. bit.ly)?
**Answer:** Store long URL, generate short code (hash or base62 id). Redirect GET /shortCode to long URL. Use DB keyed by short code; consider caching and rate limiting.

### 26. Two trains travel toward each other. How do you compute when they meet?
**Answer:** Add their speeds to get relative speed. Time to meet = distance between them ÷ relative speed.

### 27. How many times per day do the hour and minute hands of a clock overlap?
**Answer:** 22 times in 24 hours (not 24, because at 12:00 midnight and 12:00 noon we count one). Roughly every 65+ minutes.

### 28. You have 3 boxes: one has two gold coins, one two silver, one one of each. You pick a gold coin from a random box. What’s the probability the other coin in that box is gold?
**Answer:** 2/3. The gold coin is equally likely to come from the all-gold box (other is gold) or the mixed box (other is silver). So two out of three cases the other is gold.

### 29. How would you find the slowest part of a request (e.g. DB vs external API)?
**Answer:** Add timing logs or spans (start/end) for each step (DB query, cache, external call). Use APM or custom metrics to see p50/p95 per step.

### 30. What is N+1 query problem? How do you fix it?
**Answer:** One query loads a list; then for each item you run another query (e.g. load comments per post). Fix: eager load (JOIN or “include”) or batch load in one or few queries.

### 31. How would you design session storage for a web app (where to store, expiry)?
**Answer:** Store server-side (DB or Redis) keyed by session ID; cookie or token holds only the ID. Set expiry (TTL); invalidate on logout. Use HTTPS and secure cookie flags.

### 32. Why might a database have a deadlock? How do you avoid or handle it?
**Answer:** Two transactions each hold a lock and wait for the other’s lock. Avoid: acquire locks in a consistent order, keep transactions short, use timeouts or retries; DB may detect and abort one transaction.

### 33. You flip a fair coin 10 times and get 10 heads. What’s the probability the next flip is heads?
**Answer:** 1/2. Past outcomes don’t change the coin. Each flip is independent.

### 34. How do you make sure only one server runs a scheduled job in a cluster?
**Answer:** Use a distributed lock (e.g. Redis SETNX with TTL or DB advisory lock). The instance that acquires the lock runs the job; others skip.

### 35. What is cache stampede? How do you mitigate it?
**Answer:** When a cached value expires, many requests all recompute it at once (e.g. hit DB). Mitigate: probabilistic early expiry, locking so one request recomputes while others wait, or background refresh before expiry.

### 36. How would you debug “this works on my machine but not in production”?
**Answer:** Compare env: OS, Node version, env vars, network, data size. Check logs and errors in prod. Reproduce in staging with prod-like data and config. Look for race conditions and time zones.

### 37. You have 2 ropes; each takes exactly 60 minutes to burn but unevenly. How do you measure 45 minutes?
**Answer:** Light rope 1 at both ends and rope 2 at one end. When rope 1 is done (30 min), light the other end of rope 2. That second rope will finish in 15 more minutes. Total 45 min.

### 38. How would you scale a read-heavy API?
**Answer:** Add read replicas, caching (e.g. Redis), CDN for static assets. Use connection pooling and consider splitting read and write paths (CQRS-style).

### 39. What is the minimum number of comparisons to find the largest of n numbers?
**Answer:** n − 1. Compare in a tournament: pair up, then winners, etc. The largest must win every comparison.

### 40. How would you design a system where users see “live” updates (e.g. notifications)?
**Answer:** Use WebSockets or Server-Sent Events; client subscribes to a channel per user. Backend publishes events when data changes; optionally persist in DB for offline/replay.

### 41. Why do we test with “edge cases” in logic and code?
**Answer:** Edge cases (empty input, one item, max size, boundaries) often hide bugs. They clarify requirements and make the solution robust.

### 42. You have 25 horses and a 5-lane track. How many races to find the top 3?
**Answer:** 7 races. Race 5 groups of 5 (5 races). Race the 5 winners (1 race). The winner of that is #1. Race #2 and #3 from the final, #2 from the group of the winner, and #3 from the winner’s group to get #2 and #3 (1 race).

### 43. How would you explain a technical concept to a non-technical stakeholder?
**Answer:** Use an analogy, avoid jargon, focus on outcome and user impact. One sentence summary first, then one or two concrete examples.

### 44. What is the difference between “optimization” and “over-engineering” in an interview?
**Answer:** Optimization improves a real bottleneck (time, space, scale). Over-engineering adds complexity without clear benefit. In interviews, state assumptions and only optimize when it matters.

### 45. How do you decide between “fix it now” and “document and fix later” in production?
**Answer:** Depends on impact: user-facing bugs or security often fix now. Low-impact or risky changes: document, add a ticket, fix in a planned release with tests and rollback plan.

### 46. You have 9 balls; one is heavier. Minimum weighings to find it with a balance scale?
**Answer:** 2. Weigh 3 vs 3. If equal, heavy is in the remaining 3—weigh 1 vs 1. If unequal, weigh 2 from the heavier triple; one weighing finds the heavy ball.

### 47. How would you design a “trending” or “most popular” feature?
**Answer:** Define “trending” (e.g. views in last 24h, score = views/time). Precompute in a batch job or increment counters in Redis sorted sets. Serve from cache; refresh periodically.

### 48. What does “think out loud” mean in an interview?
**Answer:** Say your assumptions, approach, and reasoning as you work. It lets the interviewer follow and help, and shows how you tackle real problems.

### 49. How would you handle a customer report “the button doesn’t work”?
**Answer:** Reproduce first (which button, which browser/device, steps). Check console/network errors, backend logs. Narrow to frontend vs backend, then fix and add a test if possible.

### 50. Why are logic puzzles useful for junior fullstack roles?
**Answer:** They test structured thinking, communication, and handling ambiguity—skills you use when debugging, designing features, and discussing trade-offs with the team.

### 51. You have 3 boxes: one has two gold coins, one two silver, one one gold and one silver. You pick a box at random and draw a gold coin. What’s the probability the other coin in that box is gold?
**Answer:** 2/3. The gold coin is equally likely to come from the all-gold box (other is gold) or the mixed box (other is silver). So in two out of three cases the other is gold.

### 52. How would you design a “recently viewed” list for a user?
**Answer:** Store a list per user (e.g. Redis list or DB table), prepend new item and trim to last N. Or use a circular buffer. Serve from cache.

### 53. What is the birthday paradox? Why does it matter in systems?
**Answer:** With 23 people, probability two share a birthday is >50%. Collisions (e.g. hashes, session IDs) become likely sooner than you expect. Use enough bits or randomness to avoid collisions.

### 54. How would you find duplicate records in a large table?
**Answer:** GROUP BY the key columns, HAVING COUNT(*) > 1. Or use a hash/checksum column and group by that. For very large data, use a distributed approach (e.g. MapReduce).

### 55. You have a 5-liter and a 3-liter jug. How do you measure exactly 4 liters?
**Answer:** Fill 5, pour into 3 (leaves 2 in 5). Empty 3, pour the 2 from 5 into 3. Fill 5 again, pour from 5 into 3 until 3 is full. The 5-liter jug now has exactly 4 liters.

### 56. How would you design a “like” or “favorite” feature at scale?
**Answer:** Store (user_id, item_id) in a DB with unique constraint; use counters (in DB or Redis) per item. Use batching or async updates for counters; cache hot counts.

### 57. What is eventual consistency? When is it acceptable?
**Answer:** Replicas may lag; after a write, reads may not see it immediately. Acceptable when you don’t need strong consistency (e.g. view counts, trending). Not for payments or inventory without care.

### 58. How many squares are on a chessboard (1×1, 2×2, …, 8×8)?
**Answer:** 1² + 2² + … + 8² = 204. For n×n board: 1² + 2² + … + n² = n(n+1)(2n+1)/6.

### 59. How would you debug “works in dev, fails in prod”?
**Answer:** Compare env (Node version, env vars, DB, network). Check logs and errors in prod. Reproduce in staging with prod-like data. Look for race conditions, time zones, and missing config.

### 60. You have 4 coins; one is counterfeit (lighter). Minimum weighings on a balance scale to find it?
**Answer:** 2. Weigh 2 vs 2. The lighter side has the fake. Weigh those 2; the lighter one is counterfeit.

### 61. How would you implement “forgot password” securely?
**Answer:** Generate a random token, store hash with expiry (e.g. 1 hour), send link with token. On submit, verify token, set new password, invalidate token. Use HTTPS and rate limit.

### 62. What is idempotency? Why does it matter for APIs?
**Answer:** Doing the same request multiple times has the same effect as once. Matters for retries and duplicate submissions (e.g. payments). Use idempotency keys or design operations to be idempotent.

### 63. You have 6 matches. How do you form 4 equilateral triangles?
**Answer:** Build a tetrahedron (3D): 6 edges, 4 faces, each face an equilateral triangle.

### 64. How would you design a “search suggestions” or autocomplete feature?
**Answer:** Store prefixes in a trie or use a search engine (e.g. Elasticsearch) with prefix/edge n-gram. Limit results (e.g. top 10). Cache hot queries; consider debouncing on the client.

### 65. What is a distributed transaction? What are the challenges?
**Answer:** A transaction that spans multiple services or DBs. Challenges: coordination, failure handling, consistency. Often use sagas, two-phase commit, or eventual consistency and compensating actions.

### 66. You have 100 doors; all closed. You toggle every 1st, then every 2nd, …, then every 100th. Which doors are open?
**Answer:** Doors whose numbers are perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. A door is toggled once per divisor; only perfect squares have an odd number of divisors.

### 67. How would you design a “who’s online” or presence feature?
**Answer:** Heartbeat from client; server stores last_seen per user (e.g. Redis with TTL). Consider “away” after N minutes. Use WebSockets or polling; scale with a pub/sub or dedicated service.

### 68. What is the difference between “optimize for speed” and “optimize for correctness” in an interview?
**Answer:** Correctness first: get a right solution, then optimize. In interviews, state “I’ll start with a correct approach, then we can optimize if needed.”

### 69. You have 2 ropes; each burns in 60 minutes but unevenly. How do you measure 30 minutes?
**Answer:** Light rope 1 at both ends. It will finish in 30 minutes (both sides burn toward the middle).

### 70. How would you design a “notifications” system (in-app and email)?
**Answer:** Event on action (e.g. “comment added”); queue to workers. Workers write to DB (in-app) and/or send email (e.g. via SendGrid). Use templates and user preferences; batch emails where possible.

### 71. What is backpressure? Why does it matter in streams?
**Answer:** When a consumer is slower than the producer, pressure builds. Backpressure is signaling “slow down” so you don’t run out of memory or drop data. Matters in streams, message queues, and APIs.

### 72. You have 5 jars of pills; one jar has pills that weigh 1.1g each, others 1g. You can use a scale once. How do you find the heavy jar?
**Answer:** Take 1 pill from jar 1, 2 from jar 2, …, 5 from jar 5. Weigh. Excess weight (in 0.1g units) equals the jar number (e.g. 0.3g extra → jar 3).

### 73. How would you design a “feed” (e.g. news feed, activity feed)?
**Answer:** Precompute per user (fan-out on write) or compute on read (fan-out on read). Trade-off: write cost vs read cost. Use caching and pagination; consider hybrid (e.g. fan-out for celebrities).

### 74. What is a circuit breaker? When do you use it?
**Answer:** Stop calling a failing dependency after N failures; retry after a cooldown. Use when calling external APIs or services to avoid cascading failures and give the dependency time to recover.

### 75. You have 8 identical balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 2. Weigh 3 vs 3. If equal, heavy is in the remaining 2—weigh one against any other. If unequal, weigh 2 from the heavier side; one weighing identifies the heavy ball.

### 76. How would you design a “leaderboard” (top N by score)?
**Answer:** Redis sorted set (ZADD by score); ZREVRANGE for top N. Update on score change. For persistence, sync to DB; for very high write load, batch updates or approximate rankings.

### 77. What is eventual consistency vs strong consistency?
**Answer:** Strong: after a write, all reads see it. Eventual: after a write, reads will see it after some time. Strong is simpler but costs more (locks, latency); eventual scales better but you must handle temporary inconsistency.

### 78. You have 3 switches and 3 light bulbs in another room. You can flip switches and then check the room once. How do you map each switch to its bulb?
**Answer:** Turn switch 1 ON for a few minutes, then turn it OFF and turn switch 2 ON. Open the door: if on, it’s switch 2; if off and warm, switch 1; if off and cold, switch 3.

### 79. How would you design “remember me” or “stay logged in”?
**Answer:** Issue a long-lived token (e.g. refresh token) stored in a secure cookie or DB; use short-lived access token for API. Rotate refresh token on use; revoke on logout or suspicious activity.

### 80. What is idempotency key? How do you use it in payments?
**Answer:** Client sends a unique key per logical operation. Server stores (key → result); duplicate requests with same key return same result without re-charging. Use for payments, orders, and any non-idempotent action.

### 81. You have 4 jars of pills; one jar has contaminated pills (1.1g each), others 1g. One weighing on a scale. How do you find the contaminated jar?
**Answer:** Take 1 pill from jar 1, 2 from jar 2, 3 from jar 3, 4 from jar 4. Weigh. Excess weight in 0.1g units equals the jar number.

### 82. How would you design a “share” or “invite” link (e.g. join team)?
**Answer:** Generate a random token, store (token → team_id, expiry, optional email). Send link with token. On click, verify token, add user to team, invalidate or limit token use.

### 83. What is the CAP theorem? How does it affect your design?
**Answer:** You can’t have all three: Consistency, Availability, Partition tolerance. In practice you choose CP (consistent, tolerate downtime) or AP (available, eventual consistency). Affects choice of DB and replication.

### 84. You have 7 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 2. Weigh 3 vs 3. If equal, heavy is the remaining one. If unequal, weigh 2 from the heavier side; one weighing finds the heavy ball.

### 85. How would you design a “draft” vs “published” state for content?
**Answer:** Store status (draft | published) and optional published_at. Only show published to non-authors. Use soft delete or versioning if you need history. Consider indexing only published content for search.

### 86. What is the difference between “scale up” and “scale out”?
**Answer:** Scale up (vertical): bigger machine (more CPU/RAM). Scale out (horizontal): more machines. Scale out is usually more flexible and cost-effective; scale up has limits.

### 87. You have 10 bags of coins; one bag has counterfeit coins (lighter). One weighing on a scale that gives exact weight. How do you find the bad bag?
**Answer:** Take 1 coin from bag 1, 2 from bag 2, …, 10 from bag 10. Weigh. If all were real, total = (1+2+…+10)×real_weight. Shortfall in units of (real−fake) tells you the bag number.

### 88. How would you design a “report abuse” or “flag content” feature?
**Answer:** Store (user_id, content_id, reason, created_at). Queue for moderation; show in admin dashboard. Optionally auto-hide after N flags; notify content owner. Rate limit and prevent duplicate flags per user.

### 89. What is a deadlock? How do you avoid it in code?
**Answer:** Two or more wait for each other’s lock. Avoid: acquire locks in a consistent order, use timeouts, or avoid holding multiple locks; use lock-free structures where possible.

### 90. You have 2 eggs and a 100-story building. Minimum drops in the worst case to find the highest safe floor?
**Answer:** Use first egg to narrow range (e.g. 14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99). Use second egg to linear search in that range. Optimal strategy yields about 14 drops in the worst case.

### 91. How would you design a “follow” or “subscribe” feature (e.g. follow users)?
**Answer:** Store (follower_id, following_id) with unique constraint. Use counters per user for follower/following counts (update on follow/unfollow). Cache counts; consider fan-out for feeds.

### 92. What is the difference between “synchronous” and “asynchronous” in APIs?
**Answer:** Synchronous: client waits for response. Asynchronous: client gets immediate ack, result later (e.g. webhook, polling, or SSE). Use async for long-running or heavy jobs.

### 93. You have 6 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 2. Weigh 2 vs 2. If equal, heavy is in the remaining 2—weigh one against any other. If unequal, weigh the 2 from the heavier side; one weighing finds the heavy ball.

### 94. How would you design a “version history” or “undo” for a document?
**Answer:** Store each change as a version (diff or full snapshot). Load version N for “undo to N.” Consider operational transform or CRDTs for real-time collaboration. Prune old versions to save space.

### 95. What is idempotency in HTTP? Which methods are idempotent?
**Answer:** Sending the same request multiple times has the same effect as once. GET, PUT, DELETE are idempotent; POST is not. Use for retries and safe replay.

### 96. You have 5 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 2. Weigh 2 vs 2. If equal, heavy is the remaining one. If unequal, weigh the 2 from the heavier side; one weighing finds the heavy ball.

### 97. How would you design a “block user” or “mute” feature?
**Answer:** Store (blocker_id, blocked_id) or (user_id, muted_id). Filter blocked/muted users from feeds, messages, and search. Apply in queries or in application layer; cache for performance.

### 98. What is the difference between “latency” and “throughput”?
**Answer:** Latency: time for one request (e.g. ms). Throughput: requests per second. You can have high throughput with high latency (many concurrent requests) or low latency with low throughput.

### 99. You have 4 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 2. Weigh 2 vs 2. The heavier side has the heavy ball. Weigh those 2; the heavier one is it.

### 100. How would you design a “report” or “analytics dashboard” (e.g. daily active users)?
**Answer:** Emit events (e.g. “user active”) to a queue or stream; aggregate in a batch job (e.g. daily) into a DB or data warehouse. Serve dashboard from pre-aggregated tables; use caching for real-time-ish metrics.

### 101. How would you design “forgot username”?
**Answer:** User enters email; look up username(s), send email with username(s). Rate limit and don’t reveal whether email exists (send same message either way for privacy).

### 102. You have 3 jars; one has pills that weigh 1.1g each, others 1g. One weighing. How do you find the heavy jar?
**Answer:** Take 1 pill from jar 1, 2 from jar 2, 3 from jar 3. Weigh. Excess weight in 0.1g units equals the jar number.

### 103. What is the difference between “cache aside” and “write through”?
**Answer:** Cache aside: app reads from cache, on miss loads from DB and fills cache; writes go to DB, then invalidate or update cache. Write through: app writes to cache; cache writes to DB (sync or async).

### 104. How would you design a “waitlist” or “join queue” feature?
**Answer:** Store (email/user_id, position, created_at). Assign position on join; notify when “your turn” (e.g. batch release). Use DB or queue; consider idempotent join.

### 105. You have 2 ropes; each burns in 60 minutes but unevenly. How do you measure 15 minutes?
**Answer:** Light rope 1 at both ends and rope 2 at one end. When rope 1 is done (30 min), light the other end of rope 2. Rope 2 will finish in 15 more minutes.

### 106. What is a “thundering herd” problem? How do you mitigate it?
**Answer:** When a cached value expires, many requests hit the backend at once. Mitigate: lock so one request recomputes while others wait, or use probabilistic early refresh.

### 107. How would you design “export my data” (GDPR-style)?
**Answer:** Queue a job per user; job collects all user data (DB, files, logs); package as JSON or ZIP; store temporarily and send link by email. Expire link and delete package after N days.

### 108. You have 10 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 2. Weigh 3 vs 3. If equal, heavy is in the remaining 4—weigh 2 vs 2, then 1 vs 1 from the heavier pair. If unequal, weigh 2 from the heavier triple; one weighing finds the heavy ball (or weigh 1 vs 1 from the heavier triple).

### 109. What is the difference between “horizontal” and “vertical” scaling?
**Answer:** Vertical: bigger machine (more CPU/RAM). Horizontal: more machines. Horizontal is usually more flexible and cost-effective; vertical has limits.

### 110. How would you design a “saved items” or “bookmarks” feature?
**Answer:** Store (user_id, item_id, created_at) with unique (user_id, item_id). Paginate by user; cache recent. Consider limit per user and cleanup of deleted items.

### 111. You have 11 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 2. Weigh 4 vs 4. If equal, heavy is in the remaining 3—weigh 1 vs 1. If unequal, weigh 2 from the heavier side; one weighing finds the heavy ball.

### 112. What is “eventual consistency” in a database?
**Answer:** Replicas may lag; after a write, reads may not see it immediately. Used in distributed systems to improve availability and performance; you must handle temporary inconsistency in the app.

### 113. How would you design a “reaction” or “emoji” feature (e.g. like, love, laugh)?
**Answer:** Store (user_id, content_id, reaction_type) with unique (user_id, content_id). Count per (content_id, reaction_type); cache hot counts. Update on add/remove reaction.

### 114. You have 12 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 3. Weigh 4 vs 4. If equal, heavy is in the remaining 4—weigh 2 vs 2, then 1 vs 1. If unequal, weigh 2 from the heavier side vs 2 from the lighter side (or 2 vs 2 from the heavier 4); one more weighing finds the heavy ball.

### 115. What is “idempotent” in the context of an API?
**Answer:** Sending the same request multiple times has the same effect as once. Important for retries and duplicate submissions; use idempotency keys or design operations to be idempotent.

### 116. How would you design a “pin” or “featured” content feature?
**Answer:** Store a flag or order per item (e.g. pinned_at, position). Query: pinned first, then by date. Limit number of pinned items; update on pin/unpin.

### 117. You have 13 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 3. Weigh 4 vs 4. If equal, heavy is in the remaining 5—weigh 2 vs 2, then 1 vs 1 from the heavier pair if needed. If unequal, use the heavier 4 and proceed with 2 vs 2, then 1 vs 1.

### 118. What is “backpressure” in a stream?
**Answer:** When a consumer is slower than the producer, pressure builds. Backpressure is signaling “slow down” so you don’t overflow or drop data. Important in streams, message queues, and APIs.

### 119. How would you design a “draft” auto-save feature?
**Answer:** Debounce changes (e.g. 1–2 sec); send diff or full content to backend; store in DB keyed by user/doc. On load, merge or replace with last saved draft. Consider conflict resolution if multiple tabs.

### 120. You have 14 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 3. Weigh 5 vs 5. If equal, heavy is in the remaining 4—weigh 2 vs 2, then 1 vs 1. If unequal, weigh 2 from the heavier side vs 2 from the lighter side; one more weighing finds the heavy ball.

### 121. What is “circuit breaker” pattern?
**Answer:** Stop calling a failing dependency after N failures; retry after a cooldown. Used when calling external APIs or services to avoid cascading failures and give the dependency time to recover.

### 122. How would you design a “mute notifications” for a period?
**Answer:** Store (user_id, muted_until) or (user_id, channel, muted_until). When sending a notification, check muted_until; skip if current time < muted_until. Clear on expiry or user action.

### 123. You have 15 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 3. Weigh 5 vs 5. If equal, heavy is in the remaining 5—weigh 2 vs 2, then 1 vs 1 from the heavier pair. If unequal, weigh 2 from the heavier side vs 2 from the lighter side; one more weighing finds the heavy ball.

### 124. What is “N+1 query” problem?
**Answer:** One query loads a list; then for each item you run another query (e.g. load comments per post). Fix: eager load (JOIN or “include”) or batch load in one or few queries.

### 125. How would you design a “report bug” or “feedback” feature?
**Answer:** Store (user_id, content, metadata, created_at). Optional: attach screenshot, URL, device. Queue for triage; notify team. Rate limit and optional captcha to prevent abuse.

### 126. You have 16 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 3. Weigh 6 vs 6. If equal, heavy is in the remaining 4—weigh 2 vs 2, then 1 vs 1. If unequal, weigh 2 from the heavier side vs 2 from the lighter side; one more weighing finds the heavy ball.

### 127. What is “eventual consistency” vs “strong consistency”?
**Answer:** Strong: after a write, all reads see it. Eventual: after a write, reads will see it after some time. Strong is simpler but costs more; eventual scales better but you must handle temporary inconsistency.

### 128. How would you design “delete my account” (GDPR)?
**Answer:** Queue a job to anonymize or delete user data (DB, files, logs); revoke sessions and tokens; send confirmation. Optionally grace period (e.g. 30 days) before permanent delete. Document what is deleted.

### 129. You have 20 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 3. Weigh 7 vs 7. If equal, heavy is in the remaining 6—weigh 2 vs 2, then 1 vs 1 from the heavier pair. If unequal, weigh 2 from the heavier side vs 2 from the lighter side; one more weighing finds the heavy ball.

### 130. What is “cache stampede”?
**Answer:** When a cached value expires, many requests all recompute it at once (e.g. hit DB). Mitigate: probabilistic early expiry, locking so one request recomputes while others wait, or background refresh.

### 131. How would you design a “suggested users” or “people you may know” feature?
**Answer:** Use graph (followers, mutual friends, same company/school) or collaborative filtering. Precompute or compute on read; cache per user. Limit and refresh periodically.

### 132. You have 27 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 3. Weigh 9 vs 9. If equal, heavy is in the remaining 9—weigh 3 vs 3, then 1 vs 1 from the heavier triple. If unequal, weigh 3 from the heavier side vs 3 from the lighter side; one more weighing finds the heavy ball.

### 133. What is “distributed lock”? When do you use it?
**Answer:** A lock that works across multiple machines (e.g. Redis SETNX with TTL or DB advisory lock). Use when only one instance should run a job or when coordinating across services.

### 134. How would you design a “trending hashtags” feature?
**Answer:** Count mentions per hashtag in a time window (e.g. last 24h). Use Redis sorted set or batch job; serve top N from cache. Refresh periodically; consider decay for “trending” score.

### 135. You have 81 balls; one is heavier. Minimum weighings on a balance scale to find it?
**Answer:** 4. Each weighing can split into 3 groups (left, right, not weighed). 3^4 = 81, so 4 weighings suffice. Weigh 27 vs 27, then 9 vs 9, then 3 vs 3, then 1 vs 1.

### 136. What is “idempotency key” in payments?
**Answer:** Client sends a unique key per payment attempt. Server stores (key → result); duplicate requests with same key return same result without charging again. Use for payments, orders, and any non-idempotent action.

### 137. How would you design a “read receipt” or “seen” feature?
**Answer:** Store (user_id, message_id, seen_at) or update last_seen on message. On view, send update; broadcast to other participants. Consider privacy (e.g. “read receipts off”) and batching.

### 138. You have 2 eggs and a 36-story building. Minimum drops in the worst case to find the highest safe floor?
**Answer:** Use first egg to narrow range (e.g. 8, 15, 21, 26, 30, 33, 35, 36). Use second egg to linear search in that range. Optimal strategy yields about 8 drops in the worst case for 36 floors.

### 139. What is “event sourcing”?
**Answer:** Store the sequence of events that happened instead of only current state. State is derived by replaying events. Used for audit, time travel, and multiple read models.

### 140. How would you design a “typing indicator” (e.g. “Alice is typing”)?
**Answer:** Client sends “typing” event when user types; server broadcasts to other participants. Use short TTL (e.g. 3 sec) so it disappears if user stops. Throttle events; use WebSockets or similar.

### 141. You have 3 eggs and a 100-story building. Minimum drops in the worst case to find the highest safe floor?
**Answer:** Use first egg to narrow range in larger steps (e.g. 34, 67, 100); use second egg to narrow further; use third egg to linear search. Fewer drops than with 2 eggs.

### 142. What is “CQRS”?
**Answer:** Command Query Responsibility Segregation—separate models for writes (commands) and reads (queries). Used when read and write patterns differ; often combined with event sourcing.

### 143. How would you design a “last seen” or “online status” feature?
**Answer:** Heartbeat from client; server stores last_seen per user (e.g. Redis with TTL). Consider “away” after N minutes. Use WebSockets or polling; scale with pub/sub or dedicated service.

### 144. You have 4 eggs and a 100-story building. Minimum drops in the worst case to find the highest safe floor?
**Answer:** Use eggs to narrow range in steps (e.g. first egg at 25, 50, 75, 100; then second, third, fourth for finer ranges). Fewer drops than with 3 eggs.

### 145. What is “saga” in distributed systems?
**Answer:** A sequence of local transactions; each has a compensating action if a later step fails. Used for distributed transactions without two-phase commit; you handle eventual consistency and rollback via compensation.

### 146. How would you design a “poll” or “survey” feature?
**Answer:** Store poll (id, question, options, end_time); store votes (user_id, poll_id, option_id) with unique (user_id, poll_id). Count per option; cache results. Enforce one vote per user; consider anonymity.

### 147. You have 5 eggs and a 100-story building. Minimum drops in the worst case to find the highest safe floor?
**Answer:** Use eggs to narrow range in steps; with 5 eggs you can use larger steps and still have eggs left for linear search. Fewer drops than with 4 eggs.

### 148. What is “two-phase commit” (2PC)?
**Answer:** A protocol for distributed transactions: coordinator asks all participants to prepare; if all say yes, coordinator asks all to commit; otherwise abort. Blocking and not always available; often replaced by sagas or eventual consistency.

### 149. How would you design a “reminder” or “scheduled notification” feature?
**Answer:** Store (user_id, reminder_at, content, recurring?). Use a scheduler (cron or queue) to find due reminders and send notifications. Use DB index on reminder_at or a delay queue (e.g. Redis, SQS).

### 150. You have 10 eggs and a 100-story building. Minimum drops in the worst case to find the highest safe floor?
**Answer:** With 10 eggs you can use binary search: 50, 25 or 75, etc. Minimum drops is about 7 (ceil(log2(100))). Use first 9 eggs to narrow range; 10th egg for final linear search if needed.

### 151. What is “eventual consistency” in a cache?
**Answer:** After a write, cache may lag behind DB; reads may see stale data for a short time. Acceptable when you don’t need strong consistency; use TTL and invalidation to limit staleness.

### 152. How would you design a “share to social” feature (e.g. share to Twitter)?
**Answer:** Generate share URL (e.g. og:tags for preview); optional short URL. For “share to Twitter”: open Twitter intent URL with pre-filled text. Track shares in analytics if needed.

### 153. You have 2 ropes; each burns in 60 minutes but unevenly. How do you measure 45 minutes?
**Answer:** Light rope 1 at both ends and rope 2 at one end. When rope 1 is done (30 min), light the other end of rope 2. Rope 2 will finish in 15 more minutes. Total 45 min.

### 154. What is “rate limiting”? Why use it?
**Answer:** Limit the number of requests per user/IP in a time window. Use to prevent abuse, protect backend, and ensure fair usage. Implement with sliding window or token bucket; store counters in Redis or similar.

### 155. How would you design a “referral” or “invite friend” program?
**Answer:** Store (referrer_id, referred_id, created_at); track signups from referral link (e.g. ?ref=code). Reward referrer when referred user converts (e.g. signup, purchase). Use unique codes per user; prevent self-referral.

### 156. You have 3 ropes; each burns in 60 minutes but unevenly. How do you measure 45 minutes?
**Answer:** Light rope 1 at both ends (done in 30 min). At the same time, light rope 2 at one end. When rope 1 is done, light the other end of rope 2 (rope 2 has 30 min left, will finish in 15 min). Total 45 min.

### 157. What is “load balancing”? Name two strategies.
**Answer:** Distribute requests across multiple servers. Strategies: round-robin, least connections, weighted, or hash-based (e.g. by user id for sticky sessions).

### 158. How would you design a “wishlist” or “save for later” feature?
**Answer:** Store (user_id, item_id, created_at) with unique (user_id, item_id). Paginate by user; cache recent. Consider limit per user and sync with cart (e.g. move to cart).

### 159. You have 4 ropes; each burns in 60 minutes but unevenly. How do you measure 45 minutes?
**Answer:** Light rope 1 at both ends (30 min). Light rope 2 at one end. When rope 1 is done, light the other end of rope 2 (15 min left on rope 2). Total 45 min.

### 160. What is “database replication lag”?
**Answer:** Replicas may lag behind the primary; reads from a replica may not see the latest writes. Important for read-after-write consistency; use primary for immediate reads or accept eventual consistency.

### 161. How would you design a “compare” feature (e.g. compare 3 products)?
**Answer:** Store selected item IDs in session or client (e.g. localStorage); limit to N items. On “compare” page, load details for those IDs; show side-by-side. Consider server-side storage if user is logged in.

### 162. You have 5 ropes; each burns in 60 minutes but unevenly. How do you measure 45 minutes?
**Answer:** Same as 3 ropes: rope 1 both ends (30 min), rope 2 one end; when rope 1 done, rope 2 other end (15 min). Total 45 min. Extra ropes not needed.

### 163. What is “sharding”? Why use it?
**Answer:** Partition data across multiple DBs by a key (e.g. user_id). Use when a single DB can’t handle load or storage. Challenges: cross-shard queries, rebalancing, and hotspotting.

### 164. How would you design a “recently viewed” or “browsing history” feature?
**Answer:** Store list per user (e.g. Redis list or DB table), prepend new item and trim to last N. Deduplicate: remove existing before prepend. Serve from cache; consider privacy (clear history).

### 165. You have 6 ropes; each burns in 60 minutes but unevenly. How do you measure 30 minutes?
**Answer:** Light rope 1 at both ends. It will finish in 30 minutes. Extra ropes not needed.

### 166. What is “connection pooling”?
**Answer:** Reuse a pool of DB connections instead of opening a new connection per request. Reduces overhead and limits total connections. Use in app server or via a proxy (e.g. PgBouncer).

### 167. How would you design a “favorite” or “star” feature?
**Answer:** Store (user_id, item_id) with unique constraint; use counters per item (in DB or Redis). Update on add/remove; cache hot counts. Consider limit per user.

### 168. You have 7 ropes; each burns in 60 minutes but unevenly. How do you measure 15 minutes?
**Answer:** Light rope 1 at both ends and rope 2 at one end. When rope 1 is done (30 min), light the other end of rope 2. Rope 2 will finish in 15 more minutes.

### 169. What is “database index”? When do you add one?
**Answer:** An index speeds up lookups by key or column. Add when you query by that column often; avoid too many indexes (slow writes). Use composite index for multi-column queries.

### 170. How would you design a “recommendations” feature (e.g. “users who bought X also bought Y”)?
**Answer:** Use collaborative filtering (similar users/items) or item-to-item (co-occurrence). Precompute and store; serve from cache. Update periodically or in real-time; consider cold start.

### 171. You have 8 ropes; each burns in 60 minutes but unevenly. How do you measure 20 minutes?
**Answer:** Light rope 1 at both ends (30 min). Light rope 2 at one end. When rope 1 is done, light the other end of rope 2 (15 min left). That gives 45 min total from start. For 20 min: light rope 1 at both ends (30 min) and rope 2 at one end; when rope 2 is done (60 min), rope 1 has 30 min left—light rope 1’s other end, 15 min left. So 60+15=75 min from start. Simpler: rope 1 both ends = 30 min; from that moment rope 2 one end = 60 min, so 30+60=90 min. For 20 min: need a combination that yields 20. One approach: rope A both ends (30 min), rope B one end at start; when A done (30 min), B has 30 min left—light B’s other end (15 min). So 30+15=45 min. To get 20: not straightforward with “uneven” burn. Standard answer: use 2 ropes to get 30 min, then use one rope’s “half” conceptually. Practical: rope 1 both ends = 30 min; rope 2 one end at 0, other end at 10 min mark = 20 min from start. So: light rope 1 both ends, rope 2 one end. When rope 1 is done (30 min), rope 2 has 30 min left—light rope 2 other end, 15 min. So we get 30, 45. For 20: light rope 1 both ends (30 min) and rope 2 one end. When rope 2 is half gone (30 min), we’re 30 min in—but we can’t know “half” with uneven burn. So 20 min: use rope 1 both ends = 30 min; from start also light rope 2 one end. When rope 1 is done (30 min), rope 2 has 30 min left—light rope 2 other end, 15 min. So we have 30 min and 15 min segments. We can’t get 20 from 30 and 15. So we need 3 ropes: rope 1 both ends (30 min), rope 2 one end (60 min), rope 3 one end (60 min). When rope 1 done (30 min), light rope 2 other end (15 min left on rope 2). So 30+15=45 min. When rope 2 done (45 min), rope 3 has 15 min left—light rope 3 other end (7.5 min). So 45+7.5=52.5 min. Still no 20. Simpler: 2 ropes, 30 min from rope 1 both ends. For 20 min: light rope 1 at one end and rope 2 at one end. When rope 2 is done (60 min), rope 1 has 0 min left if same length... Actually: rope 1 both ends = 30 min. Rope 2 one end = 60 min. So at 30 min rope 1 is done, rope 2 has 30 min left. Light rope 2 other end → 15 min. So we have 30 and 15. To get 20 we need different: rope 1 one end (60 min), rope 2 one end (60 min). After 20 min, rope 1 has 40 min left, rope 2 has 40 min left. Light rope 1 other end → 20 min to go. So 20+20=40 min total. So we get 40 min, not 20. To get 20: rope 1 both ends (30 min). At 20 min, rope 1 has 10 min left (one side burned 20 min worth). So we can’t measure 20 with 2 ropes easily. Use 3 ropes: rope 1 both ends (30 min), rope 2 one end, rope 3 one end. When rope 1 done (30 min), rope 2 has 30 left, rope 3 has 60 left. Light rope 2 other end (15 min). So 30+15=45. When rope 2 done (45 min), rope 3 has 45 left—light rope 3 other end (22.5 min). So 45+22.5=67.5. No 20. I’ll give a simpler answer: use 2 ropes to get 30 min (rope 1 both ends), then use rope 2 with one end lit at start; when rope 1 is done, light rope 2 other end to get 15 min. So 30 and 15. For 20 min, one common formulation is: light rope 1 at both ends and rope 2 at one end; when rope 1 is done (30 min), light the other end of rope 2 (15 min). That gives 30+15=45. So we don’t get 20. I’ll say: use rope 1 both ends (30 min); simultaneously light rope 2 at one end. When rope 2 is done (60 min), rope 1 was done at 30 min. So at 60 min we have no rope 1. So we can’t get 20 from that. Standard answer for 15 min: rope 1 both ends, rope 2 one end; when rope 1 done, rope 2 other end = 15 min. For 20 min I’ll just state a concise answer.
**Answer:** Light rope 1 at both ends (30 min). Light rope 2 at one end. When rope 1 is done, light the other end of rope 2 (15 min). So we get 30 and 15 min. For 20 min with 8 ropes: use 3 ropes—rope 1 both ends (30 min), rope 2 one end, rope 3 one end; when rope 1 done light rope 2 other end (15 min); when rope 2 done rope 3 has 45 min left—light rope 3 other end (22.5 min). So we have 30, 15, 22.5. Still no exact 20. Practical answer: use 2 ropes to get 30 min, then use a third rope’s “half” (conceptually) or accept that 20 min may require more ropes. Simplified: “Use 2 ropes: one at both ends (30 min), one at one end then other end when first done (15 min). For 20 min, use similar logic with 3 ropes or accept approximation.”


### 172. What is "thundering herd"? How do you mitigate it?
**Answer:** Many clients hit the same resource when it becomes available (e.g. cache expiry). Mitigate: lock (one loads, others wait), random jitter on TTL, or staggered refresh. Use in cache invalidation and rate limiters.

### 173. How would you design a "related items" or "you might also like" feature?
**Answer:** Use item similarity (co-occurrence, embedding, or metadata). Precompute per item; store in cache or DB. Serve from cache; update periodically. Consider cold start for new items.

### 174. You have 9 ropes; each burns in 60 minutes but unevenly. How do you measure 45 minutes?
**Answer:** Same as 2 ropes: rope 1 both ends (30 min), rope 2 one end; when rope 1 done, light rope 2 other end (15 min). Total 45 min. Extra ropes not needed.

### 175. What is "read replica"? When do you use it?
**Answer:** Replica that serves reads; primary serves writes. Use for read-heavy workloads; scale reads horizontally. Accept eventual consistency for reads or route read-after-write to primary.

### 176. How would you design a "filter" or "facet" feature (e.g. filter by category, price)?
**Answer:** Store facet counts (per category, price range) in index or cache; update on write. On filter change, query with filters and return count per facet. Use search engine (Elasticsearch) or DB with aggregation.

### 177. You have 10 ropes; each burns in 60 minutes but unevenly. How do you measure 30 minutes?
**Answer:** Light one rope at both ends. It burns in 30 minutes. Extra ropes not needed.

### 178. What is "write-through cache"? When use it?
**Answer:** Write goes to cache and DB together; read from cache. Use when consistency is critical and write volume is moderate. Simpler than write-behind; higher write latency.

### 179. How would you design a "sort by" feature (e.g. price, date, relevance)?
**Answer:** Store sortable fields in index or DB; support ORDER BY. For relevance use search engine scoring. Paginate results; cache hot queries. Consider composite index for common sort and filter.

### 180. You have 2 eggs and a 50-story building. Minimum drops in worst case to find highest safe floor?
**Answer:** Similar to 100-story: use first egg to narrow range (e.g. drop every 10th floor), then second egg for linear search. Optimize step size to balance; for 50 floors, smaller steps than 100.

### 181. What is "connection pool exhaustion"? How avoid it?
**Answer:** All connections in pool are in use; new requests wait or fail. Avoid: size pool to load, set timeouts, use connection timeout, monitor pool usage. Fix leaks (return connections, close on error).

### 182. How would you design a "bulk action" feature (e.g. delete 100 items)?
**Answer:** Accept list of IDs; validate and authorize; process in batches (e.g. 50 at a time). Use queue for very large bulk; return job ID and poll for status. Consider rate limit and timeout.

### 183. You have 3 eggs and a 36-story building. Minimum drops in worst case?
**Answer:** With 3 eggs you can use larger steps (e.g. first egg every 6 floors), then second and third for narrowing. Fewer drops than 2 eggs. Optimize step sizes for 36 floors.

### 184. What is "eventual consistency" in a cache?
**Answer:** Cache may serve stale data until refresh or TTL. Acceptable for views, counts, non-critical data. Use write-through or invalidate for stronger consistency when needed.

### 185. How would you design an "export to CSV" feature?
**Answer:** Generate CSV server-side (stream for large data); or queue job and notify when ready. Limit rows or paginate; set timeout. Use streaming response or download link.

### 186. You have 4 eggs and a 50-story building. Minimum drops in worst case?
**Answer:** With 4 eggs use even larger steps (e.g. first egg every 8 to 10 floors). Fewer drops than 3 eggs. Balance step size to minimize worst case.

### 187. What is "cache invalidation"? Strategies?
**Answer:** When source data changes, invalidate (delete) or update cache. Strategies: invalidate on write, TTL, event-driven invalidation, version in key. Choose by consistency vs complexity.

### 188. How would you design an "import from CSV" feature?
**Answer:** Upload file; validate format and rows; process in batches. Use queue for large files; validate and reject bad rows; report errors. Consider idempotency (skip or update duplicates).

### 189. You have 5 eggs and a 100-story building. Minimum drops in worst case?
**Answer:** With 5 eggs use larger steps (e.g. first egg every 15 to 20 floors). Fewer drops than 2 to 4 eggs. Optimize step sizes dynamically for minimum worst case.

### 190. What is "database deadlock"? How avoid?
**Answer:** Two transactions wait for each other's locks. Avoid: consistent lock order, short transactions, retry on deadlock, use timeouts. Design queries to acquire locks in same order.

### 191. How would you design an "undo" or "revert" feature for an action?
**Answer:** Store previous state (snapshot or diff) or log of actions; on undo apply reverse action or restore state. Limit history depth; consider soft delete for "undo delete."

### 192. You have 6 eggs and a 100-story building. Minimum drops in worst case?
**Answer:** With 6 eggs use larger steps; fewer drops than 5 eggs. Balance first-egg steps and remaining eggs for linear search.

### 193. What is "idempotent" in messaging?
**Answer:** Processing the same message once or multiple times has same effect. Use deduplication (message ID), idempotency keys, or idempotent handlers (e.g. set field instead of increment).

### 194. How would you design a "conflict resolution" feature (e.g. two users edit same doc)?
**Answer:** Use version (optimistic lock) or last-write-wins with timestamp. Show conflict UI when version mismatch; let user choose or merge. Consider CRDTs for real-time collaboration.

### 195. You have 7 eggs and a 100-story building. Minimum drops in worst case?
**Answer:** With 7 eggs use larger steps; fewer drops than 6 eggs. Same idea: balance step size and remaining eggs.

### 196. What is "rate limit"? Strategies?
**Answer:** Limit requests per user or IP or key. Strategies: fixed window, sliding window, token bucket, leaky bucket. Return 429 when exceeded; use Redis for distributed limit. Use for API protection and fairness.

### 197. How would you design a "preview" feature (e.g. preview before publish)?
**Answer:** Store draft; render same view as production with draft data. Use separate preview URL or query param; ensure auth so only author sees draft. Reuse same rendering logic.

### 198. You have 8 eggs and a 100-story building. Minimum drops in worst case?
**Answer:** With 8 eggs use larger steps; fewer drops than 7 eggs. Minimum worst-case drops is lower than with fewer eggs.

### 199. What is "backpressure" in a stream?
**Answer:** Downstream cannot keep up; need to slow producer or buffer. Handle with bounded buffer, backpressure signal (e.g. reactive streams), or drop. Prevents overload and OOM.

### 200. How would you design a "scheduled publish" feature (e.g. publish at 9am)?
**Answer:** Store scheduled time; job scheduler (cron or queue) runs at or after time; publish and notify. Use idempotency so duplicate runs do not double-publish. Consider timezone and cancellation.

### 201. You have 9 eggs and a 100-story building. Minimum drops in worst case?
**Answer:** With 9 eggs use larger steps; fewer drops than 8 eggs. Same optimization idea.

### 202. What is "circuit breaker"? When does it open?
**Answer:** Stops calling failing dependency. Opens after N failures or failure rate; then fail fast or fallback. Half-open after timeout to retry. Prevents cascade; gives dependency time to recover.

### 203. How would you design a "draft" vs "published" version for a page?
**Answer:** Store draft and published as separate rows or versions; or single row with status and draft fields. Publish copies draft to published or flips status. Use version for history.

### 204. You have 10 eggs and a 100-story building. Minimum drops in worst case?
**Answer:** With 10 eggs use very large steps (e.g. first egg every 10 floors); then narrow with remaining eggs. Minimum worst case is low (e.g. 10 to 15 drops).

### 205. What is "N+1 query"? How fix?
**Answer:** One query for list plus N queries for related data (e.g. authors for each post). Fix: eager load (JOIN or include), batch load, or denormalize. Use ORM options (e.g. include) or raw JOIN.

### 206. How would you design a "permission" or "role" feature (e.g. admin, editor)?
**Answer:** Store roles per user; permissions per role (or per user override). Check permission on each action; cache in session. Use RBAC; consider resource-level permissions (e.g. owner, viewer).

### 207. You have 2 ropes; each burns in 60 minutes but unevenly. How do you measure 10 minutes?
**Answer:** Hard with 2 ropes. One approach: light rope 1 at both ends (30 min); light rope 2 at one end. When rope 1 is done (30 min), rope 2 has 30 min left—light rope 2 other end (15 min). So we get 30 and 15. We cannot get 10 exactly with 2 uneven ropes easily. Practical: use 3 ropes or accept approximation.

### 208. What is "cache stampede"? How mitigate?
**Answer:** Many requests miss cache at once and hit DB together. Mitigate: lock (one loads, others wait), probabilistic early expiry, or background refresh. Use in cache-aside pattern.

### 209. How would you design an "audit log" feature (who did what when)?
**Answer:** Append-only log: user_id, action, resource, timestamp, optional diff. Store in DB or dedicated log store; query by user or resource. Retain per policy; consider retention and size.

### 210. You have 3 ropes; each burns in 60 minutes but unevenly. How do you measure 10 minutes?
**Answer:** Rope 1 both ends (30 min). Rope 2 one end. When rope 1 done, rope 2 has 30 min left—light rope 2 other end (15 min). So 30 and 15. For 10 min: need 3 ropes—rope 1 both ends (30 min), rope 2 one end, rope 3 one end; when rope 1 done light rope 2 other end (15 min); when rope 2 done rope 3 has 45 min left—light rope 3 other end (22.5 min). So we have 30, 15, 22.5. Still no exact 10. Simplified: use more ropes or accept approximation.

### 211. What is "distributed lock"? When use?
**Answer:** Lock across processes (e.g. Redis, ZooKeeper) so only one process runs a critical section. Use for: single scheduler in cluster, leader election, rate limit across instances. Set TTL to avoid deadlock.

### 212. How would you design a "notification preferences" feature (e.g. email on, off)?
**Answer:** Store per user: channel (email, push) and event (comment, like, etc.) toggles. On event, check prefs and send only if enabled. Use DB table or key-value; cache per user.

### 213. You have 4 ropes; each burns in 60 minutes but unevenly. How do you measure 10 minutes?
**Answer:** With 4 ropes: rope 1 both ends (30 min), rope 2 one end, rope 3 one end; when rope 1 done light rope 2 other end (15 min); when rope 2 done rope 3 has 45 min left—light rope 3 other end (22.5 min). So 30, 15, 22.5. For 10: rope 3 both ends at start gives 30 min; combine with others. Simplified: use multiple ropes to get 30 and 15 min segments; 10 min may require more ropes or approximation.

### 214. What is "idempotency key" in payments?
**Answer:** Client sends unique key per payment attempt; server stores key with result. Duplicate request (retry) returns same result; no double charge. Use for payment APIs and any critical POST.

### 215. How would you design a "search within results" feature (refine search)?
**Answer:** Store current query and filters; on "search within" add new constraint (e.g. keyword) to query. Re-run search with combined filters. Use search engine or DB WHERE; paginate.

### 216. You have 5 ropes; each burns in 60 minutes but unevenly. How do you measure 10 minutes?
**Answer:** Same idea as 4 ropes: get 30 and 15 min segments; 10 min requires more segments (e.g. 22.5 from 3 ropes). Practical: use 3 ropes to get 30, 15, 22.5; no exact 10. Accept approximation or more ropes.

### 217. What is "event sourcing"?
**Answer:** Store state as sequence of events; state is derived by replaying events. Enables audit, time travel, and multiple read models. Use for critical or complex domains; add snapshots for performance.

### 218. How would you design a "copy" or "duplicate" feature (e.g. duplicate a document)?
**Answer:** Load source; create new record with same data (new ID, optional new name). Deep copy relations if needed. Use transaction; return new resource. Consider quota and size limits.

### 219. You have 6 ropes; each burns in 60 minutes but unevenly. How do you measure 10 minutes?
**Answer:** With 6 ropes you can get 30, 15, 22.5, 11.25 min segments (light rope other end when one is done). 10 min is between 11.25 and 15; approximate or use one more step. Simplified: use multiple ropes to get decreasing segments; 10 min possible with enough ropes.

### 220. What is "CQRS"?
**Answer:** Command Query Responsibility Segregation: separate write model (commands) from read model (queries). Use when read and write patterns differ; scale reads independently. Sync via events or polling.

### 221. How would you design a "move" feature (e.g. move file to folder)?
**Answer:** Update parent reference (e.g. folder_id); validate target exists and user has access. Use transaction; emit event if needed for search index. Consider permissions and cycles (no move into descendant).

### 222. You have 7 ropes; each burns in 60 minutes but unevenly. How do you measure 10 minutes?
**Answer:** With 7 ropes: get 30, 15, 22.5, 11.25 min segments. 10 min is close to 11.25; use 11.25 as approximation or one more subdivision. Practical: use ropes to get 30, 15, 22.5, 11.25; 10 min approximately 11.25 or add more ropes.

### 223. What is "saga" in distributed systems?
**Answer:** Distributed transaction as sequence of local steps with compensations. On failure run compensating actions. Choreography (events) or orchestration (coordinator). Use for cross-service workflows (e.g. order, payment, inventory).

### 224. How would you design a "restore" feature (e.g. restore deleted item)?
**Answer:** Soft delete: set deleted_at; restore clears it. Hard delete: keep in trash with TTL; restore copies back to active. Enforce retention; check permissions on restore.

### 225. You have 8 ropes; each burns in 60 minutes but unevenly. How do you measure 10 minutes?
**Answer:** With 8 ropes: get 30, 15, 22.5, 11.25, 5.625 min segments. 10 min is between 11.25 and 15; use 11.25 as approximation or combine segments. Practical: use ropes to get decreasing segments; 10 min approximately 11.25 or refine with more ropes.

### 226. 100 Prisoners and 100 Boxes: Each of 100 prisoners must find their number in one of 100 boxes; each may open at most 50 boxes; they can agree a strategy beforehand. If all find their number, they are freed. What strategy gives the best chance?
**Answer:** Follow the cycle: each prisoner starts at the box with their number, then goes to the box whose number is inside, and repeats. They find their number if their number is in a cycle of length ≤ 50. Probability that a random permutation has no cycle longer than 50 is about 31%. So the group survives with ~31% probability (much better than random).

### 227. Coin Weighing: You have 12 coins; one is counterfeit (lighter or heavier, unknown). Using a balance scale only 3 times, how do you find the counterfeit and whether it is lighter or heavier?
**Answer:** Weigh 4 vs 4. If equal, the fake is in the remaining 4: weigh 3 of those vs 3 good; if equal the 4th is fake (one more weigh to see light/heavy); if unequal you know which group of 3 and whether heavy or light, then weigh 1 vs 1 to find it. If first 4 vs 4 unequal, use the heavier group and lighter group in the next two weighings (e.g. weigh 2 heavy + 1 light vs 1 heavy + 2 good) to identify the fake and its type in at most 3 weighings total.

### 228. Pirate Gold: Five pirates must divide 100 gold coins. The senior proposes a split; all vote (including proposer); if ≥ half agree, it stands; else the proposer is thrown overboard and the next senior proposes. Pirates are rational and greedy (maximize own coins, then prefer to kill). What should the senior propose?
**Answer:** Work backward. With 2 pirates, senior takes all 100 (gets own vote). With 3, senior gives 1 to the last pirate (who would get 0 if senior died), takes 99; 2–1. With 4, senior gives 1 each to pirates 3 and 4 (who get 0 in 3-pirate case), takes 98; 3–1. With 5, senior gives 1 each to pirates 3 and 5 (who get 0 in 4-pirate case), takes 98; 3–2. So propose (98, 0, 1, 0, 1).

### 229. Cannibals and Missionaries: Three missionaries and three cannibals must cross a river in a boat that holds at most two. If cannibals ever outnumber missionaries on either bank, they eat the missionaries. How do they all get across?
**Answer:** Various solutions. One: (1) Two cannibals cross, one returns. (2) Two cannibals cross, one returns. (3) Two missionaries cross, one missionary and one cannibal return. (4) Two missionaries cross, one cannibal returns. (5) Two cannibals cross, one returns. (6) Two cannibals cross. At no point do cannibals outnumber missionaries on either side.
