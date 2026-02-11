# HTTP Headers - Interview Questions

## Questions (1-10)

### 1. What are HTTP headers?
**Answer:** Metadata sent with HTTP request or response. Provide information about request, response, or connection.

### 2. What are common request headers?
**Answer:** Content-Type, Authorization, Accept, User-Agent, Cookie, Host, Accept-Language, Cache-Control.

### 3. What are common response headers?
**Answer:** Content-Type, Set-Cookie, Cache-Control, Location, ETag, Content-Length, Server, Status.

### 4. What is the Authorization header?
**Answer:** Contains credentials for authentication. Format: "Bearer token" or "Basic credentials".

### 5. What is the Content-Type header?
**Answer:** Specifies media type of request/response body. Examples: application/json, text/html, application/xml.

### 6. What is the Cache-Control header?
**Answer:** Directives for caching. Examples: no-cache, max-age=3600, private, public, must-revalidate.

### 7. What is CORS? What headers are involved?
**Answer:** Cross-Origin Resource Sharing. Headers: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers.

### 8. What is the ETag header?
**Answer:** Entity tag for cache validation. Server sends ETag, client sends If-None-Match. 304 if unchanged.

### 9. What is the difference between Set-Cookie and Cookie headers?
**Answer:** Set-Cookie: server sets cookie in response. Cookie: client sends cookies in request.

### 10. What are security-related headers?
**Answer:** X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Content-Security-Policy, X-XSS-Protection.

