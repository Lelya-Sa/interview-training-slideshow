# GraphQL vs REST - Interview Questions

## Questions (1-15)

### 1. What is the main difference between REST and GraphQL?
**Answer:** REST uses multiple endpoints with fixed responses. GraphQL uses single endpoint where client specifies needed data.

### 2. What is over-fetching? How does GraphQL solve it?
**Answer:** Over-fetching is getting more data than needed. GraphQL lets client specify exactly what fields to return.

### 3. What is under-fetching? How does GraphQL solve it?
**Answer:** Under-fetching requires multiple requests to get all needed data. GraphQL allows fetching related data in single request.

### 4. When would you choose REST over GraphQL?
**Answer:** Simple CRUD, caching important, standard HTTP operations, team familiar with REST, microservices.

### 5. When would you choose GraphQL over REST?
**Answer:** Complex relationships, multiple clients with different needs, mobile apps, need flexible queries, strong typing.

### 6. How does caching differ between REST and GraphQL?
**Answer:** REST uses HTTP caching easily. GraphQL caching is more complex, need field-level caching or persisted queries.

### 7. What is the N+1 query problem in GraphQL?
**Answer:** Resolver executes query for each item in list, causing many database queries. Solve with DataLoader batching.

### 8. Explain GraphQL schema and types.
**Answer:** Schema defines available data and operations. Types include Object, Scalar, Enum, Input, Union, Interface.

### 9. What are GraphQL mutations vs queries?
**Answer:** Queries fetch data (read). Mutations modify data (write). Both defined in schema.

### 10. How do you handle errors in GraphQL?
**Answer:** Return errors in response alongside data. Use error extensions for additional details. Can return partial results.

### 11. What is GraphQL introspection?
**Answer:** Ability to query schema structure. Allows tools to discover available types and fields automatically.

### 12. How do you implement pagination in GraphQL?
**Answer:** Use cursor-based pagination with first/after or last/before. Or offset-based with limit/offset.

### 13. What are the security considerations for GraphQL?
**Answer:** Rate limiting (harder), query complexity analysis, depth limiting, authentication/authorization, query whitelisting.

### 14. How does versioning work in GraphQL vs REST?
**Answer:** REST uses URL versioning (/v1, /v2). GraphQL versions through schema evolution, deprecate fields gradually.

### 15. Can you use GraphQL with REST in the same application?
**Answer:** Yes, can use both. GraphQL for complex queries, REST for simple operations or when caching critical.
