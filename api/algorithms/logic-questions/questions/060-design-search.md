# Design Search System

## Problem
Design a search system that can search through 100 million documents. Users type queries and get relevant results in <100ms. What's your approach?

## Approach
Consider: full-text search, indexing, ranking, caching, and scalability.

## Solution
**Key Components:**

1. **Search Engine (Elasticsearch/Solr)**
   - Inverted index for fast lookups
   - Full-text search capabilities
   - Ranking and relevance scoring
   - Handles 100M+ documents

2. **Indexing Pipeline**
   ```
   Documents → Parser → Tokenizer → Indexer → Search Engine
   ```
   - Extract text from documents
   - Tokenize (split into words)
   - Build inverted index
   - Store metadata (title, URL, timestamp)

3. **Query Processing**
   - Parse user query
   - Expand synonyms
   - Handle typos (fuzzy search)
   - Rank results by relevance

4. **Caching**
   - Cache popular queries (80/20 rule)
   - Redis for query results
   - TTL: 1-24 hours depending on data freshness

5. **Architecture**
   ```
   Load Balancer
   → App Servers (Query API)
   → Search Engine Cluster (Elasticsearch)
   → Cache Layer (Redis)
   → Document Store (S3/Database)
   ```

6. **Scaling**
   - Horizontal scaling of search cluster
   - Shard indices across nodes
   - Replicate for availability
   - Separate read/write nodes

**Query Flow:**
1. User types query
2. Check cache
3. If miss, query search engine
4. Rank and filter results
5. Cache result
6. Return to user

**Performance:**
- Indexing: Batch process, async
- Search: <100ms with proper indexing
- Cache hit: <10ms

## Complexity
- **Time**: 
  - Indexing: O(n) where n is number of documents (one-time or incremental)
  - Search: O(log n) with inverted index, O(k) where k is result size
  - Cache lookup: O(1)
- **Space**: O(n) for index storage, O(m) for cache where m is cached queries
- **Note**: Search engines use inverted indexes for fast lookups. Complexity depends on index structure and query complexity.

## Follow-up
- How to handle real-time updates?
- What about autocomplete?
- How to rank results?

