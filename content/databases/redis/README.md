# Redis - Interview Material

## Definition
Redis (Remote Dictionary Server) is an in-memory data structure store used as database, cache, and message broker.

## Data Types

- **Strings**: Simple key-value pairs
- **Lists**: Ordered collections
- **Sets**: Unordered unique collections
- **Sorted Sets**: Sets with scores
- **Hashes**: Field-value maps
- **Bitmaps**: Bit operations
- **HyperLogLog**: Cardinality estimation
- **Streams**: Log-like data structure

## Common Use Cases

- **Caching**: Store frequently accessed data
- **Session Storage**: User sessions
- **Rate Limiting**: Track request counts
- **Real-time Analytics**: Counters, leaderboards
- **Message Queues**: Pub/Sub, job queues
- **Distributed Locks**: Coordination

## Key Features

- **In-Memory**: Very fast (sub-millisecond)
- **Persistence**: RDB snapshots, AOF logging
- **Replication**: Master-slave replication
- **Clustering**: Horizontal scaling
- **Atomic Operations**: Thread-safe operations

## Common Commands

```redis
SET key value
GET key
DEL key
EXPIRE key seconds
INCR key
LPUSH list value
SADD set value
HSET hash field value
```

## Persistence Options

- **RDB**: Point-in-time snapshots
- **AOF**: Append-only file logging
- **Both**: Hybrid approach

## Best Practices

- Use appropriate data types
- Set expiration for cache keys
- Monitor memory usage
- Use pipelining for multiple commands
- Implement connection pooling
- Handle failures gracefully

