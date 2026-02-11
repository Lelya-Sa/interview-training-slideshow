# HTTP - Interview Questions

## Questions (1-10)

### 1. What is HTTP? Explain its purpose.
**Answer:** HTTP is protocol for transferring hypertext. Enables communication between clients and servers.

### 2. What are the main HTTP methods?
**Answer:** GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

### 3. Explain the difference between GET and POST.
**Answer:** GET retrieves data (safe, idempotent). POST creates resource (not idempotent, has body).

### 4. What is the difference between PUT and PATCH?
**Answer:** PUT replaces entire resource. PATCH performs partial update.

### 5. What are HTTP status codes? Give examples.
**Answer:** Numeric codes indicating request result. 200 (success), 404 (not found), 500 (server error).

### 6. What are HTTP headers? Give examples.
**Answer:** Metadata about request/response. Content-Type, Authorization, Accept, Cookie.

### 7. What does "stateless" mean in HTTP?
**Answer:** Each request is independent. Server doesn't remember previous requests.

### 8. Explain idempotency in HTTP methods.
**Answer:** Multiple identical requests have same effect. GET, PUT, DELETE are idempotent.

### 9. What is the difference between HTTP and HTTPS?
**Answer:** HTTPS adds TLS/SSL encryption. HTTP is plain text, HTTPS is encrypted.

### 10. What are cookies? How do they work?
**Answer:** Small data stored by browser. Sent in Cookie header, set via Set-Cookie header.

