# SQL vs NoSQL - Interview Material

## Definition
SQL (Structured Query Language) databases are relational databases using tables, while NoSQL databases are non-relational using various data models.

## SQL Databases

### Characteristics
- **Relational Model**: Data organized in tables with rows and columns
- **ACID Compliance**: Atomicity, Consistency, Isolation, Durability
- **Structured Schema**: Fixed schema defined before data insertion
- **SQL Language**: Standardized query language
- **Vertical Scaling**: Scale by adding more power to server
- **Examples**: PostgreSQL, MySQL, Oracle, SQL Server

### Advantages
- ACID guarantees for transactions
- Strong consistency
- Mature technology with extensive tooling
- Complex queries with JOINs
- Data integrity with foreign keys
- Standardized language

### Disadvantages
- Difficult horizontal scaling
- Schema changes are expensive
- Not ideal for unstructured data
- Can be slower for simple queries
- Requires normalization

## NoSQL Databases

### Types
1. **Document Stores**: MongoDB, CouchDB
2. **Key-Value Stores**: Redis, DynamoDB
3. **Column Stores**: Cassandra, HBase
4. **Graph Databases**: Neo4j, Amazon Neptune

### Characteristics
- **Flexible Schema**: Schema can evolve
- **Horizontal Scaling**: Scale by adding more servers
- **BASE Model**: Basically Available, Soft state, Eventual consistency
- **High Performance**: Optimized for specific use cases
- **Distributed**: Built for distributed systems

### Advantages
- Horizontal scalability
- Flexible schema
- High performance for specific queries
- Better for unstructured data
- Fast writes
- Simple data models

### Disadvantages
- Eventual consistency (not always)
- Limited query capabilities
- No standard query language
- Less mature tooling
- Data integrity challenges

## When to Use SQL

- Complex queries with JOINs
- ACID compliance required
- Strong consistency needed
- Structured data
- Financial transactions
- Reporting and analytics
- Established applications

## When to Use NoSQL

- Large scale applications
- Rapid development
- Unstructured or semi-structured data
- Horizontal scaling needed
- High write throughput
- Simple queries
- Real-time applications
- Content management

## Hybrid Approach

Many applications use both:
- **SQL**: User data, transactions, analytics
- **NoSQL**: Logs, sessions, caching, real-time data

## Comparison Table

| Feature | SQL | NoSQL |
|---------|-----|------|
| Schema | Fixed | Flexible |
| Scaling | Vertical | Horizontal |
| Consistency | Strong | Eventual |
| Query Language | SQL | Varies |
| ACID | Yes | Usually No |
| Best For | Complex queries | Simple queries |
| Examples | PostgreSQL, MySQL | MongoDB, Redis |

