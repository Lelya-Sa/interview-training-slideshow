const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, 'algorithms', 'logic-questions', 'questions.md');

// Read current count
const content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### /gm) || []).length;
const needed = 225 - currentCount;

console.log(`Current: ${currentCount}, Needed: ${needed}`);

const remainingQuestions = [
  {
    title: "Two Trains Collision",
    problem: "Two trains are 100 miles apart, moving toward each other. One travels at 60 mph, the other at 40 mph. A bird flies back and forth between them at 80 mph. How far does the bird travel before the trains collide?",
    answer: "**Solution:**\nTrains collide in: 100 / (60 + 40) = 1 hour\nBird travels: 80 mph × 1 hour = **80 miles**\n\n**Key insight:** Don't calculate each trip - just find collision time and multiply by bird's speed."
  },
  {
    title: "Chocolate Bar Breaking",
    problem: "You have a chocolate bar with m×n pieces. You can break it along grid lines. What is the minimum number of breaks needed to separate all pieces?",
    answer: "**Solution:**\nMinimum breaks = m×n - 1\n\n**Why:**\n- Start with 1 piece\n- Each break increases piece count by 1\n- Need m×n pieces total\n- So need m×n - 1 breaks\n\n**Example:**\n3×4 bar = 12 pieces\nBreaks needed: 12 - 1 = 11 breaks"
  },
  {
    title: "Ants on a Stick",
    problem: "Three ants are on a 1-meter stick. They move at 1 cm/s. When two ants meet, they reverse direction. When an ant reaches an end, it falls off. How long until all ants fall off?",
    answer: "**Solution:**\nMaximum time = 100 seconds (1 meter = 100 cm)\n\n**Key insight:** Ants passing each other is equivalent to ants passing through each other (they're identical). So just calculate time for farthest ant to reach an end.\n\n**Worst case:** Ant at one end, others moving away. Farthest ant travels 100 cm at 1 cm/s = 100 seconds."
  },
  {
    title: "Pirate Gold Distribution",
    problem: "5 pirates find 100 gold coins. They vote on distribution. If majority approves, coins are distributed. Otherwise, proposer is thrown overboard and next pirate proposes. Pirates are rational and prioritize: (1) survival, (2) maximizing gold, (3) killing others. What distribution does the first pirate propose?",
    answer: "**Solution:**\nWork backwards from last pirate.\n\n**Pirate 5 alone:** Gets all 100 (needs 1 vote = himself)\n**Pirate 4:** Needs 2 votes. Pirate 5 will reject (wants all). So pirate 4 gets 0, dies.\n**Pirate 3:** Needs 2 votes. Offers 0 to 4, 1 to 5. Gets: 99 coins\n**Pirate 2:** Needs 3 votes. Offers 0 to 3, 1 to 4, 0 to 5. Gets: 99 coins\n**Pirate 1:** Needs 3 votes. Offers 0 to 2, 1 to 3, 0 to 4, 1 to 5. Gets: **98 coins**\n\n**Answer: Pirate 1 proposes [98, 0, 1, 0, 1]**"
  },
  {
    title: "Truth-Tellers and Liars",
    problem: "On an island, some always tell truth, some always lie. You meet two people. One says 'At least one of us is a liar.' What are they?",
    answer: "**Solution:**\n**Case 1: Speaker is truth-teller**\n- Statement is true: at least one is liar\n- Since speaker is truth-teller, other must be liar ✓\n\n**Case 2: Speaker is liar**\n- Statement is false: neither is liar (both truth-tellers)\n- But speaker claims to be liar, contradiction ✗\n\n**Answer: Speaker is truth-teller, other is liar**"
  },
  {
    title: "Cannibals and Missionaries",
    problem: "Three missionaries and three cannibals must cross a river using a boat that holds two people. If cannibals ever outnumber missionaries on either side, missionaries get eaten. How do they all cross safely?",
    answer: "**Solution:**\n1. Two cannibals cross (C C | M M M C)\n2. One cannibal returns (C C C | M M M)\n3. Two cannibals cross (C | M M M C C)\n4. One cannibal returns (C C | M M M C)\n5. Two missionaries cross (C C M M | M C)\n6. One missionary and one cannibal return (C C C M | M M)\n7. Two missionaries cross (C C C | M M M)\n8. One cannibal returns (C C C C | M M M)\n9. Two cannibals cross (C C | M M M C C)\n10. One cannibal returns (C C C | M M M C)\n11. Two cannibals cross (C | M M M C C C)\n12. One cannibal returns (C C | M M M C C)\n13. Two cannibals cross (| M M M C C C C)\n\n**Total: 13 trips**"
  },
  {
    title: "Socks in Drawer",
    problem: "A drawer contains red and blue socks. You randomly pick two socks. What is the minimum number of socks needed to guarantee a matching pair?",
    answer: "**Solution:**\n**Answer: 3 socks**\n\n**Why:**\n- Worst case: Pick 1 red, 1 blue (2 socks, no pair)\n- Next sock must be red or blue, creating a pair\n\n**General formula:**\nFor n colors: n + 1 socks guarantee a pair"
  },
  {
    title: "Birthday Paradox Probability",
    problem: "How many people are needed in a room for there to be a 50% chance that at least two share a birthday?",
    answer: "**Solution:**\n**Answer: 23 people**\n\n**Calculation:**\nP(no shared birthday) = 365/365 × 364/365 × ... × (365-n+1)/365\nP(at least one shared) = 1 - P(no shared)\n\nFor n=23:\nP(no shared) ≈ 0.4927\nP(at least one shared) ≈ 0.5073 ≈ 50%\n\n**Key insight:** Counterintuitively low number due to many possible pairs (C(23,2) = 253 pairs)"
  },
  {
    title: "Design Rate Limiter",
    problem: "Design a rate limiter that allows at most N requests per minute per user. How would you implement this?",
    answer: "**Approach:**\nUse sliding window or token bucket algorithm.\n\n**Solution 1: Sliding Window Log**\n- Store timestamps of requests in sorted list\n- Remove timestamps older than 1 minute\n- If count < N, allow request\n- Time: O(log n) per request, Space: O(n)\n\n**Solution 2: Token Bucket**\n- Refill tokens at fixed rate\n- Each request consumes one token\n- If tokens > 0, allow request\n- Time: O(1), Space: O(1) per user\n\n**Solution 3: Fixed Window Counter**\n- Count requests in current minute window\n- Reset counter each minute\n- Simple but allows bursts at window boundaries\n- Time: O(1), Space: O(1)"
  },
  {
    title: "Consistent Hashing Design",
    problem: "Explain consistent hashing and why it's useful for distributed systems.",
    answer: "**Solution:**\n**Consistent Hashing:**\n- Maps both nodes and keys to a hash ring\n- Key is assigned to first node clockwise from its hash\n- When node added/removed, only nearby keys remap\n\n**Advantages:**\n1. **Minimal remapping:** Only k/n keys remap (k=keys, n=nodes)\n2. **Load balancing:** Keys distributed evenly\n3. **Scalability:** Easy to add/remove nodes\n\n**Implementation:**\n- Use sorted map (tree map) of node positions\n- Binary search to find node for key\n- Virtual nodes for better distribution\n\n**Use cases:**\n- Distributed caches (Redis, Memcached)\n- CDN content routing\n- Database sharding"
  },
  {
    title: "Cache Invalidation Strategy",
    problem: "What are different cache invalidation strategies and their trade-offs?",
    answer: "**Solution:**\n**1. Time-based (TTL)**\n- Cache expires after fixed time\n- Simple, but may serve stale data\n- Good for: Data that changes infrequently\n\n**2. Write-through**\n- Write to cache and database simultaneously\n- Always consistent, but slower writes\n- Good for: Critical data requiring consistency\n\n**3. Write-back**\n- Write to cache first, database later\n- Fast writes, risk of data loss\n- Good for: High write throughput\n\n**4. Invalidation on update**\n- Invalidate cache when data changes\n- Most consistent, requires coordination\n- Good for: Real-time data\n\n**5. Cache-aside**\n- Application manages cache\n- Check cache, if miss, load from DB and cache\n- Simple, but cache can become inconsistent"
  },
  {
    title: "Session Storage Design",
    problem: "How would you design a distributed session storage system?",
    answer: "**Solution:**\n**Requirements:**\n- Fast reads/writes\n- High availability\n- Scalability\n- Session expiration\n\n**Design:**\n1. **Storage:** Redis cluster (in-memory, fast)\n2. **Session ID:** Cryptographically random token\n3. **Replication:** Master-slave for availability\n4. **Sharding:** Hash session ID to shard\n5. **Expiration:** TTL on keys\n6. **Sticky sessions:** Optional, route to same server\n\n**Alternatives:**\n- Database (slower, but persistent)\n- Cookie-based (stateless, but size limits)\n- JWT tokens (stateless, but can't revoke easily)"
  },
  {
    title: "Debug Slow API Endpoint",
    problem: "An API endpoint that used to respond in 50ms now takes 2 seconds. How do you debug this?",
    answer: "**Solution:**\n**Debugging steps:**\n1. **Check logs:** Look for errors, warnings, increased traffic\n2. **Profile code:** Use profiler to find bottlenecks\n3. **Database queries:** Check for slow queries, missing indexes\n4. **External services:** Check third-party API latency\n5. **Resource usage:** CPU, memory, disk I/O\n6. **Network:** Check latency, bandwidth\n7. **Caching:** Verify cache hit rates\n8. **Code changes:** Review recent deployments\n\n**Tools:**\n- APM tools (New Relic, Datadog)\n- Database query analyzers\n- Profilers (pprof, JProfiler)\n- Log aggregation (ELK stack)"
  },
  {
    title: "Race Condition Debug",
    problem: "A bug only occurs occasionally. You suspect a race condition. How do you debug it?",
    answer: "**Solution:**\n**Debugging techniques:**\n1. **Add logging:** Log all state changes with timestamps\n2. **Thread dumps:** Capture when bug occurs\n3. **Reproduce:** Increase concurrency to make it more likely\n4. **Static analysis:** Review code for shared state\n5. **Testing:** Use race condition detectors (ThreadSanitizer)\n6. **Synchronization:** Add locks and see if bug disappears\n7. **Isolation:** Test components independently\n\n**Prevention:**\n- Use immutable data structures\n- Minimize shared state\n- Use proper synchronization primitives\n- Design for thread safety from start"
  },
  {
    title: "Memory Leak Detection",
    problem: "Your application's memory usage keeps growing. How do you find and fix memory leaks?",
    answer: "**Solution:**\n**Detection:**\n1. **Monitor:** Track memory usage over time\n2. **Heap dumps:** Capture and analyze heap snapshots\n3. **Profiling:** Use memory profilers (Valgrind, VisualVM)\n4. **GC logs:** Analyze garbage collection patterns\n\n**Common causes:**\n- Unclosed resources (files, connections)\n- Event listeners not removed\n- Circular references\n- Caches without size limits\n- Static collections growing\n\n**Fixes:**\n- Use weak references\n- Set cache size limits\n- Close resources in finally blocks\n- Remove event listeners\n- Use memory-efficient data structures"
  },
  {
    title: "Database Deadlock Resolution",
    problem: "Your database is experiencing deadlocks. How do you identify and resolve them?",
    answer: "**Solution:**\n**Identification:**\n1. **Logs:** Check database deadlock logs\n2. **Monitoring:** Track deadlock frequency\n3. **Queries:** Query deadlock graph\n\n**Resolution strategies:**\n1. **Lock ordering:** Always acquire locks in same order\n2. **Timeout:** Set lock timeout to break deadlocks\n3. **Retry logic:** Automatically retry failed transactions\n4. **Reduce transaction scope:** Hold locks for shorter time\n5. **Index optimization:** Ensure queries use indexes\n6. **Isolation levels:** Use appropriate isolation level\n\n**Prevention:**\n- Design schema to minimize lock contention\n- Use row-level locking when possible\n- Batch operations to reduce lock time"
  },
  {
    title: "Optimize N+1 Query Problem",
    problem: "Your application makes 1 query to get users, then N queries to get each user's posts. How do you optimize this?",
    answer: "**Solution:**\n**Problem:**\n1 query for users + N queries for posts = N+1 queries\n\n**Solutions:**\n1. **Eager loading:** JOIN posts in initial query\n2. **Batch loading:** Load all posts in one query with WHERE user_id IN (...)\n3. **DataLoader pattern:** Batch and cache requests\n4. **Denormalization:** Store post count in user table\n\n**Example (SQL):**\n```sql\n-- Instead of:\nSELECT * FROM users;\n-- Then for each user:\nSELECT * FROM posts WHERE user_id = ?;\n\n-- Do:\nSELECT u.*, p.* FROM users u\nLEFT JOIN posts p ON u.id = p.user_id;\n```\n\n**ORMs:**\n- Use `.include()` or `.preload()` methods\n- Configure eager loading relationships"
  },
  {
    title: "Database Replication Lag",
    problem: "Reads from replica are showing stale data due to replication lag. How do you handle this?",
    answer: "**Solution:**\n**Strategies:**\n1. **Read-after-write consistency:**\n   - Route reads to master for recently written keys\n   - Use session-based routing\n\n2. **Causal consistency:**\n   - Track write timestamps\n   - Route to replica only if lag < threshold\n\n3. **Synchronous replication:**\n   - Wait for replica confirmation (slower writes)\n   - Use for critical reads\n\n4. **Accept eventual consistency:**\n   - Design app to handle stale reads\n   - Use version numbers/timestamps\n\n5. **Monitoring:**\n   - Track replication lag\n   - Alert if lag exceeds threshold\n\n**Trade-offs:**\n- Consistency vs. performance\n- Choose based on use case"
  },
  {
    title: "Distributed Transactions",
    problem: "How do you ensure atomicity across multiple databases/services in a distributed system?",
    answer: "**Solution:**\n**Approaches:**\n1. **Two-Phase Commit (2PC):**\n   - Coordinator coordinates commit\n   - All participants vote, then commit/abort\n   - Blocking, not fault-tolerant\n\n2. **Saga Pattern:**\n   - Break transaction into steps\n   - Each step has compensating action\n   - Execute steps sequentially, rollback on failure\n\n3. **Event Sourcing:**\n   - Store events, not state\n   - Replay events to rebuild state\n   - Natural audit trail\n\n4. **Outbox Pattern:**\n   - Write to local DB and outbox\n   - Separate process publishes events\n   - Ensures exactly-once delivery\n\n**Choose based on:**\n- Consistency requirements\n- Latency tolerance\n- Failure scenarios"
  },
  {
    title: "Cache Stampede Prevention",
    problem: "When a cache key expires, many requests try to regenerate it simultaneously, causing a thundering herd. How do you prevent this?",
    answer: "**Solution:**\n**Strategies:**\n1. **Lock-based:**\n   - First request acquires lock and regenerates\n   - Others wait for lock release\n   - Use distributed lock (Redis)\n\n2. **Probabilistic early expiration:**\n   - Expire cache slightly before TTL\n   - Regenerate in background\n   - Serve stale data during regeneration\n\n3. **Background refresh:**\n   - Refresh cache before expiration\n   - Always serve from cache\n   - Update asynchronously\n\n4. **Request coalescing:**\n   - Batch concurrent requests\n   - Single regeneration for batch\n\n**Implementation (Redis):**\n```\nSET key value EX 3600 NX  # Only if not exists\nIf miss:\n  SET lock EX 10 NX\n  If lock acquired: regenerate\n  Else: wait and retry\n```"
  },
  {
    title: "Design Search System",
    problem: "Design a search system that can handle millions of documents and return relevant results in milliseconds.",
    answer: "**Solution:**\n**Components:**\n1. **Crawler:** Scrape/index documents\n2. **Indexer:** Build inverted index (word → documents)\n3. **Ranker:** Score and rank results (TF-IDF, PageRank)\n4. **Query processor:** Parse query, retrieve, rank\n\n**Storage:**\n- Inverted index in distributed storage\n- Shard by document ID or term\n- Replicate for availability\n\n**Optimization:**\n- Caching frequent queries\n- Pre-compute common searches\n- Use specialized search engines (Elasticsearch, Solr)\n\n**Scaling:**\n- Horizontal sharding\n- Replication for read scaling\n- Async indexing pipeline"
  },
  {
    title: "Estimate Server Capacity",
    problem: "How many servers do you need to handle 1 million requests per second, where each request takes 10ms to process?",
    answer: "**Solution:**\n**Calculation:**\n- Requests per second: 1,000,000\n- Processing time: 10ms = 0.01 seconds\n- Requests per server per second: 1 / 0.01 = 100\n- Servers needed: 1,000,000 / 100 = **10,000 servers**\n\n**But consider:**\n- **Overhead:** CPU context switching, I/O wait\n- **Safety margin:** 50-100% headroom\n- **Load balancing:** Distribute evenly\n- **Failover:** Extra capacity for failures\n\n**Realistic estimate:**\n- With 50% overhead: 15,000 servers\n- With 2x safety margin: 30,000 servers\n\n**Optimization:**\n- Reduce processing time\n- Use async processing\n- Cache responses\n- Scale horizontally"
  },
  {
    title: "Test a Pen",
    problem: "How would you test a pen?",
    answer: "**Solution:**\n**Functional testing:**\n1. Does it write?\n2. Is ink flowing smoothly?\n3. Does cap fit?\n4. Does click mechanism work (if retractable)?\n\n**Usability:**\n1. Comfortable to hold?\n2. Grip not slippery?\n3. Weight appropriate?\n\n**Durability:**\n1. Drop test\n2. Pressure test\n3. Temperature extremes\n4. Long-term storage\n\n**Edge cases:**\n1. Write on different surfaces\n2. Write at different angles\n3. Left-handed users\n4. Different writing speeds\n\n**Performance:**\n1. How long does ink last?\n2. How many pages can it write?\n3. Drying time\n\n**Compatibility:**\n1. Works with different paper types\n2. Works in different environments"
  },
  {
    title: "Handle Concurrent Updates",
    problem: "Multiple users try to update the same database record simultaneously. How do you prevent lost updates?",
    answer: "**Solution:**\n**Strategies:**\n1. **Pessimistic locking:**\n   - Lock row during transaction\n   - Others wait\n   - Simple but can cause deadlocks\n\n2. **Optimistic locking:**\n   - Use version number/timestamp\n   - Check version before update\n   - Fail if version changed\n   - Retry on conflict\n\n3. **Atomic operations:**\n   - Use database atomic operations\n   - UPDATE SET value = value + 1\n   - No lost updates\n\n4. **Last-write-wins:**\n   - Accept last update\n   - Use timestamps\n   - May lose some updates\n\n**Example (Optimistic):**\n```sql\nUPDATE users SET name = 'New', version = version + 1\nWHERE id = 1 AND version = 5;\n-- Fails if version changed\n```\n\n**Choose based on:**\n- Update frequency\n- Conflict likelihood\n- Consistency requirements"
  }
];

// Add remaining questions
let newContent = '\n';
remainingQuestions.slice(0, needed).forEach((q) => {
  newContent += `### ${q.title}\n\n`;
  if (q.problem) {
    newContent += `**Problem:**\n${q.problem}\n\n`;
  }
  newContent += `**Answer:**\n${q.answer}\n\n`;
  newContent += `---\n\n`;
});

fs.appendFileSync(questionsFile, newContent, 'utf8');

const finalCount = (fs.readFileSync(questionsFile, 'utf8').match(/^### /gm) || []).length;

console.log(`\n✅ Added ${remainingQuestions.slice(0, needed).length} questions`);
console.log(`📊 Total questions: ${finalCount}`);
console.log(`🎯 Target: 225 questions`);
console.log(`\n${finalCount >= 225 ? '✅' : '⚠️'} ${finalCount >= 225 ? 'Target reached!' : `Need ${225 - finalCount} more`}\n`);
