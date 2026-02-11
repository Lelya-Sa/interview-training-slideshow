# REST API - Interview Questions

## Questions (1-15)

### 1. What is REST? What does it stand for?
**Answer:** REST (Representational State Transfer) is architectural style for web services using HTTP.

### 2. What are the main principles of REST?
**Answer:** Stateless, resource-based, HTTP methods, uniform interface, layered system

### 3. Explain the difference between PUT and PATCH.
**Answer:** PUT replaces entire resource, PATCH performs partial update.

### 4. What HTTP status codes would you use for different scenarios?
**Answer:**
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 404: Not found
- 500: Server error

### 5. What does "stateless" mean in REST?
**Answer:** Each request contains all information. Server doesn't store client state.

### 6. How do you handle versioning in REST APIs?
**Answer:** URL versioning (`/api/v1/users`), header versioning, or query parameter.

### 7. What is idempotency? Which HTTP methods are idempotent?
**Answer:** Idempotent means multiple identical requests have same effect. GET, PUT, DELETE are idempotent.

### 8. How do you implement pagination in REST APIs?
**Answer:** Use query parameters: `?page=1&limit=10` or cursor-based: `?cursor=abc123`

### 9. What is HATEOAS?
**Answer:** Hypermedia as the Engine of Application State - API responses include links to related resources.

### 10. How do you handle errors in REST APIs?
**Answer:** Return appropriate status codes, consistent error format: `{error: {code, message}}`

### 11. What is the difference between REST and SOAP?
**Answer:** REST is lightweight, uses HTTP, JSON. SOAP is XML-based, more complex, has built-in security.

### 12. How do you implement authentication in REST APIs?
**Answer:** JWT tokens, OAuth, API keys, Basic Auth. Include in Authorization header.

### 13. What is CORS? How do you handle it?
**Answer:** Cross-Origin Resource Sharing. Handle with CORS headers or middleware.

### 14. How do you implement rate limiting in REST APIs?
**Answer:** Track requests per IP/user, use Redis, return 429 status when limit exceeded.

### 15. What are REST API best practices?
**Answer:** Use nouns, proper HTTP methods, status codes, versioning, pagination, consistent format, error handling.

