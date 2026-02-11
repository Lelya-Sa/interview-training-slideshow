# Data Model - Interview Questions

## Questions (1-10)

### 1. What is data modeling?
**Answer:** Process of designing database structure. Defines tables, relationships, constraints, indexes.

### 2. What is normalization? What are normal forms?
**Answer:** Organizing data to reduce redundancy. Normal forms: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies).

### 3. When would you denormalize a database?
**Answer:** Improve read performance, reduce joins, simplify queries, for analytics/read-heavy workloads.

### 4. What is an entity-relationship diagram (ERD)?
**Answer:** Visual representation of database structure. Shows entities, attributes, relationships, cardinality.

### 5. What are the types of relationships?
**Answer:** One-to-One, One-to-Many, Many-to-Many. Represented with foreign keys or junction tables.

### 6. What is a primary key?
**Answer:** Unique identifier for table row. Can be single column or composite. Ensures uniqueness, enables indexing.

### 7. What is a foreign key?
**Answer:** Reference to primary key in another table. Establishes relationships, enforces referential integrity.

### 8. What is indexing? Why is it important?
**Answer:** Data structure improving query performance. Creates sorted structure for faster lookups. Trade-off: faster reads, slower writes.

### 9. How do you design a data model for scalability?
**Answer:** Partition large tables, use appropriate indexes, avoid N+1 queries, denormalize where needed, consider sharding.

### 10. What is the difference between logical and physical data model?
**Answer:** Logical: business-focused, entities and relationships. Physical: implementation-focused, tables, columns, indexes, storage.

