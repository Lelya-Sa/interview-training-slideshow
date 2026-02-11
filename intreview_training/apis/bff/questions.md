# BFF (Backend for Frontend) - Interview Questions

## Questions (1-10)

### 1. What is BFF pattern?
**Answer:** Backend for Frontend - separate backend service tailored for specific frontend client (web, mobile, etc.).

### 2. Why use BFF pattern?
**Answer:** Different clients have different needs, optimize data for each client, reduce over-fetching, simplify frontend.

### 3. What are the benefits of BFF?
**Answer:** Client-specific optimization, better performance, simplified frontend code, independent deployment, team autonomy.

### 4. What are the challenges of BFF?
**Answer:** Code duplication, maintenance overhead, additional services to manage, team coordination needed.

### 5. How does BFF differ from API Gateway?
**Answer:** BFF is client-specific, aggregates/transforms data. API Gateway is single entry point, handles routing/auth for all clients.

### 6. When would you use BFF vs direct API calls?
**Answer:** BFF when clients have different data needs, need aggregation, different authentication. Direct when simple, single client.

### 7. How do you implement BFF?
**Answer:** Create service per client type, calls backend services, aggregates/transforms data, returns optimized response.

### 8. What is the relationship between BFF and microservices?
**Answer:** BFF sits between clients and microservices. Aggregates calls to multiple microservices, provides unified interface.

### 9. How do you handle authentication in BFF?
**Answer:** BFF handles client authentication, forwards tokens to backend services, manages session if needed.

### 10. What are alternatives to BFF?
**Answer:** GraphQL (single endpoint, client specifies data), API Gateway with transformations, client-side data aggregation.

