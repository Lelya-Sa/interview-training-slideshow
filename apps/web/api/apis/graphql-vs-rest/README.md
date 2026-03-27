# GraphQL vs REST - Interview Material

## Definition
Comparison between GraphQL (query language for APIs) and REST (architectural style) for building APIs.

## REST (Representational State Transfer)

### Characteristics
- Multiple endpoints for different resources
- Fixed response structure
- HTTP methods (GET, POST, PUT, DELETE)
- Stateless communication
- Standard status codes

### Advantages
- Simple and familiar
- Caching support
- Stateless
- Wide tooling support
- HTTP standards

### Disadvantages
- Over-fetching (get more data than needed)
- Under-fetching (need multiple requests)
- Fixed response structure
- Versioning challenges

## GraphQL (Graph Query Language)

### Characteristics
- Single endpoint
- Client specifies needed data
- Strongly typed schema
- Real-time subscriptions
- Query language

### Advantages
- Fetch exactly needed data
- Single request for related data
- Strong typing
- Introspection
- Versioning through schema evolution

### Disadvantages
- Complexity
- Learning curve
- Caching challenges
- N+1 query problem
- Over-engineering for simple cases

## When to Use REST

- Simple CRUD operations
- Caching is important
- Familiar with REST
- Standard HTTP operations
- Microservices with clear boundaries

## When to Use GraphQL

- Complex data relationships
- Multiple clients with different needs
- Mobile apps (reduce data transfer)
- Real-time requirements
- Need for strong typing

## Comparison Table

| Feature | REST | GraphQL |
|---------|------|---------|
| Endpoints | Multiple | Single |
| Data Fetching | Fixed | Flexible |
| Over-fetching | Yes | No |
| Under-fetching | Yes | No |
| Caching | Easy | Complex |
| Learning Curve | Low | Medium |
| Typing | Weak | Strong |
