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

### 11. What is the HTTP request/response cycle?
**Answer:** Client sends request (method, URL, headers, optional body); server processes and returns response (status, headers, optional body). Connection may close or persist (keep-alive).

### 12. Explain the difference between HTTP/1.1 and HTTP/2.
**Answer:** HTTP/2: multiplexing (multiple streams over one connection), binary protocol, header compression, server push. HTTP/1.1: one request per connection (or pipelining), text-based. HTTP/2 is faster and more efficient.

### 13. What is the purpose of the Accept header?
**Answer:** Client tells server which response format it prefers (e.g. Accept: application/json). Server uses for content negotiation; responds with Content-Type matching or 406 if none acceptable.

### 14. What is the purpose of the Content-Type header?
**Answer:** Indicates media type of request or response body (e.g. application/json, text/html). Server sets on response; client sets on request with body. Required for POST/PUT with body.

### 15. Explain the difference between 301 and 302 redirects.
**Answer:** 301 Moved Permanently: resource permanently moved; cache and clients may update URL. 302 Found: temporary redirect; client re-requests with GET to new URL. Use 301 for permanent move; 302 for temporary.

### 16. What is the Authorization header? How is it used?
**Answer:** Carries credentials: Bearer &lt;token&gt;, Basic &lt;base64(user:pass)&gt;, etc. Server validates and identifies user. Use for API auth and protected resources.

### 17. What is the purpose of the Cache-Control header?
**Answer:** Controls caching: max-age, no-cache, no-store, private, public. Server sets on response; client and proxies respect. Use for cacheable responses or to prevent caching.

### 18. Explain the difference between 400 and 500 status codes.
**Answer:** 400 Bad Request: client error (malformed request, validation). 500 Internal Server Error: server error (bug, unexpected). Client should not retry 400; may retry 500.

### 19. What is the ETag header? How is it used?
**Answer:** Entity tag for cache validation. Server returns ETag with response; client sends If-None-Match with ETag on next request; server returns 304 Not Modified if unchanged. Saves bandwidth.

### 20. What is the purpose of the User-Agent header?
**Answer:** Identifies client (browser, app, bot). Server may use for analytics, content negotiation, or blocking. Can be spoofed; don't rely for security.

### 21. Explain the difference between GET and HEAD.
**Answer:** GET returns body; HEAD returns same headers as GET but no body. Use HEAD for checking existence or metadata (e.g. size, last-modified) without downloading body.

### 22. What is the purpose of the If-Modified-Since header?
**Answer:** Client sends with GET; server returns 304 Not Modified if resource unchanged since that date. Use with Last-Modified for conditional GET. Reduces bandwidth.

### 23. What is HTTP pipelining?
**Answer:** Sending multiple requests without waiting for each response (over same connection). Allowed in HTTP/1.1 but limited; HTTP/2 multiplexing replaces it. Rarely used due to head-of-line blocking.

### 24. Explain the difference between 401 and 403.
**Answer:** 401 Unauthorized: authentication required or failed (missing or invalid credentials). 403 Forbidden: authenticated but not allowed. Use 401 to prompt login; 403 when user lacks permission.

### 25. What is the purpose of the Origin header?
**Answer:** Sent by browser with cross-origin requests; indicates request origin (scheme, host, port). Server uses for CORS (Access-Control-Allow-Origin). Not sent for same-origin requests.

### 26. What is the purpose of the Referer header?
**Answer:** Indicates URL of page that linked to current request. Used for analytics, referrer policy, anti-CSRF. Can be omitted or modified (Referrer-Policy). Don't rely for security.

### 27. Explain the difference between connection keep-alive and close.
**Answer:** Keep-Alive: reuse TCP connection for multiple requests (HTTP/1.1 default). Close: close connection after response. Use keep-alive for performance; close when done.

### 28. What is the purpose of the Accept-Encoding header?
**Answer:** Client indicates supported compression (e.g. gzip, br). Server may compress response and set Content-Encoding. Reduces transfer size. Server is not required to compress.

### 29. What is the purpose of the Last-Modified header?
**Answer:** Server sends with response; indicates when resource was last changed. Client uses If-Modified-Since on next request; server returns 304 if unchanged. Supports caching.

### 30. Explain the difference between 404 and 410.
**Answer:** 404 Not Found: resource does not exist (or no permission to know). 410 Gone: resource existed but was permanently removed. Use 410 when resource was intentionally deleted.

### 31. What is the purpose of the Location header?
**Answer:** In 201 Created: URL of created resource. In 3xx redirect: URL to redirect to. Client uses for redirect or to fetch new resource. Required for 201 and most redirects.

### 32. What is the purpose of the Allow header?
**Answer:** Lists HTTP methods allowed on resource (e.g. Allow: GET, PUT, DELETE). Returned with 405 Method Not Allowed. Helps clients discover allowed operations.

### 33. Explain the difference between safe and idempotent methods.
**Answer:** Safe: no side effect (GET, HEAD, OPTIONS). Idempotent: same effect if repeated (GET, PUT, DELETE, etc.). POST is neither. PUT is idempotent but not safe.

### 34. What is the purpose of the Retry-After header?
**Answer:** With 503 or 429: tells client when to retry (seconds or HTTP date). Use for rate limiting or maintenance. Client should respect to avoid hammering server.

### 35. What is the purpose of the Vary header?
**Answer:** Indicates which request headers affect response (e.g. Vary: Accept-Encoding). Caches use to store separate responses per varying header. Use for content negotiation caching.

### 36. Explain the difference between 500 and 503.
**Answer:** 500 Internal Server Error: unexpected server error. 503 Service Unavailable: server overloaded or down for maintenance; client may retry. Use 503 when not accepting traffic.

### 37. What is the purpose of the Content-Length header?
**Answer:** Indicates size of body in bytes. Required for request/response with body when not chunked. Enables client to know when response is complete. Don't send if Transfer-Encoding: chunked.

### 38. What is the purpose of the Transfer-Encoding header?
**Answer:** Transfer-Encoding: chunked means body is sent in chunks (size known at end). Use when length unknown (streaming, dynamic). Client decodes chunks. Common for dynamic responses.

### 39. Explain the difference between 307 and 308 redirects.
**Answer:** 307 Temporary Redirect: preserve method and body. 308 Permanent Redirect: same but permanent. Use when redirecting POST and must preserve method (308 for permanent).

### 40. What is the purpose of the Expect header?
**Answer:** Expect: 100-continue: client sends headers first, waits for 100 Continue before sending body. Server responds 100 Continue or 4xx. Use for large POST to avoid sending body if server will reject.

### 41. What is the purpose of the Host header?
**Answer:** Required in HTTP/1.1; specifies host and optional port of target. Enables virtual hosting (one server, many domains). Client sets from URL.

### 42. Explain the difference between HTTP and TCP.
**Answer:** TCP is transport layer (reliable, ordered bytes). HTTP is application layer (request/response, methods, headers). HTTP runs over TCP (or TLS over TCP for HTTPS).

### 43. What is the purpose of the X-Forwarded-For header?
**Answer:** Set by proxy/load balancer; contains original client IP (or chain of IPs). Use when server is behind proxy to get real client IP. Can be spoofed; validate in trusted proxy.

### 44. What is the purpose of the Content-Disposition header?
**Answer:** Inline (display in browser) or attachment (download); optional filename. Use for file download: Content-Disposition: attachment; filename="file.pdf". Affects how browser handles response.

### 45. Explain the difference between 200 and 201.
**Answer:** 200 OK: success with body (e.g. GET, PATCH). 201 Created: success and resource created; include Location header. Use 201 for POST that creates resource.

### 46. What is the purpose of the Accept-Language header?
**Answer:** Client indicates preferred language (e.g. Accept-Language: en). Server uses for content negotiation (localized content). Returns localized response or 406 if none.

### 47. What is the purpose of the WWW-Authenticate header?
**Answer:** Server sends with 401; indicates auth scheme (e.g. Bearer, Basic) and realm. Client uses to get credentials. Required for Basic auth; useful for API to indicate supported auth.

### 48. Explain the difference between 502 and 503.
**Answer:** 502 Bad Gateway: proxy received invalid response from upstream. 503 Service Unavailable: server overloaded or down. Use 502 when proxy; 503 when this instance not accepting traffic.

### 49. What is the purpose of the Connection header?
**Answer:** Connection: keep-alive (reuse connection) or close (close after response). HTTP/1.1 default is keep-alive. Proxies use to manage connection. Rarely set by application.

### 50. What is the purpose of the Range header?
**Answer:** Client requests partial content (e.g. Range: bytes=0-499). Server returns 206 Partial Content with Content-Range. Use for resume download or streaming. Server may ignore (200 full content).

### 51. Explain the difference between 204 and 304.
**Answer:** 204 No Content: success with no body (e.g. DELETE, PUT). 304 Not Modified: use cached copy (conditional request; resource unchanged). Use 204 for success no body; 304 for cache validation.

### 52. What is the purpose of the If-None-Match header?
**Answer:** Client sends with ETag value(s); server returns 304 if current ETag matches. Use for conditional GET with ETag. More accurate than If-Modified-Since when date is unreliable.

### 53. What is the purpose of the If-Match header?
**Answer:** Client sends with ETag; server performs request only if current ETag matches. Use for optimistic locking (update only if not changed). Return 412 if no match.

### 54. Explain the difference between 409 and 422.
**Answer:** 409 Conflict: request conflicts with current state (e.g. duplicate, version conflict). 422 Unprocessable Entity: validation failed. Use 409 for optimistic locking or duplicate; 422 for semantic validation.

### 55. What is the purpose of the Prefer header?
**Answer:** Client preferences: e.g. return=representation (return body on create/update), respond-async (async processing). Optional; server may ignore. Use for client hints.

### 56. What is the purpose of the X-Request-ID header?
**Answer:** Unique ID for request (client or gateway sets). Server logs it; returns in response. Use for tracing and correlating logs across services. Not standard but widely used.

### 57. What is the purpose of the Access-Control-Allow-Origin header?
**Answer:** CORS: server lists allowed origins (or *). Browser checks before exposing response to script. Use for APIs consumed by browser from other origin. Restrict in production (no * with credentials).

### 58. Explain the difference between 408 and 504.
**Answer:** 408 Request Timeout: server timed out waiting for request. 504 Gateway Timeout: proxy timed out waiting for upstream. Use 408 when client too slow; 504 when upstream too slow.

### 59. What is the purpose of the Strict-Transport-Security header?
**Answer:** HSTS: tells browser to use HTTPS only for this host. Prevents downgrade attacks. Set max-age; optional includeSubDomains. Use with HTTPS.

### 60. What is the purpose of the X-Content-Type-Options header?
**Answer:** X-Content-Type-Options: nosniff prevents MIME sniffing. Browser uses declared Content-Type. Use to reduce XSS and MIME confusion. Security best practice.

### 61. Explain the difference between 413 and 429.
**Answer:** 413 Payload Too Large: request body too big. 429 Too Many Requests: rate limit exceeded. Use 413 for size limit; 429 for rate limit. Client may retry 429 with backoff.

### 62. What is the purpose of the X-Frame-Options header?
**Answer:** Controls whether page can be embedded in iframe (DENY, SAMEORIGIN, or allow-from). Use to prevent clickjacking. SAMEORIGIN allows same-origin embed. Security header.

### 63. What is the purpose of the Content-Security-Policy header?
**Answer:** CSP: restricts sources for scripts, styles, images, etc. Reduces XSS and injection. Use allowlist of origins or nonce. Complex; tune for your app.

### 64. Explain the difference between 100 and 101 status codes.
**Answer:** 100 Continue: server will accept body; client may send. 101 Switching Protocols: upgrade (e.g. to WebSocket). Use 100 for Expect: 100-continue; 101 for protocol upgrade.

### 65. What is the purpose of the Upgrade header?
**Answer:** Request or response: request protocol upgrade (e.g. Upgrade: websocket). With 101 response, connection switches protocol. Use for WebSocket upgrade.

### 66. What is the purpose of the Sec-WebSocket-Key header?
**Answer:** Client sends random key in WebSocket handshake; server responds with Sec-WebSocket-Accept (derived from key). Prevents caching of handshake. Required for WebSocket.

### 67. Explain the difference between 206 and 200.
**Answer:** 200 OK: full response. 206 Partial Content: partial response (Range request). Use 206 for range requests; 200 when range not supported or full content returned.

### 68. What is the purpose of the Content-Range header?
**Answer:** With 206: indicates which part of resource is in body (e.g. bytes 0-499/1000). Use for partial content response. Required for 206.

### 69. What is the purpose of the Accept-Ranges header?
**Answer:** Server indicates it supports range requests (e.g. Accept-Ranges: bytes). Client may send Range header. Use for resources that support partial content. Value "none" means no ranges.

### 70. Explain the difference between 303 and 307.
**Answer:** 303 See Other: redirect; client should use GET on new URL (even if original was POST). 307 Temporary Redirect: preserve method. Use 303 after POST for GET redirect; 307 to preserve POST.

### 71. What is the purpose of the X-XSS-Protection header?
**Answer:** Legacy XSS filter (IE, old Chrome). X-XSS-Protection: 1; mode=block. Prefer Content-Security-Policy. Often deprecated; CSP is modern approach.

### 72. What is the purpose of the X-Forwarded-Proto header?
**Answer:** Set by proxy; indicates original scheme (http or https). Use when server is behind TLS-terminating proxy to know if request was HTTPS. Trust only from known proxy.

### 73. Explain the difference between 411 and 413.
**Answer:** 411 Length Required: server requires Content-Length (e.g. for POST). 413 Payload Too Large: body too big. Use 411 when length required; 413 when over limit.

### 74. What is the purpose of the TE header?
**Answer:** Transfer-Encoding preferences (e.g. TE: trailers). Rare; used for chunked encoding with trailers. Most apps don't use.

### 75. What is the purpose of the Trailer header?
**Answer:** Lists headers that will be in trailer (after chunked body). Use with chunked encoding for metadata at end. Rare.

### 76. Explain the difference between 414 and 431.
**Answer:** 414 URI Too Long: request URL too long. 431 Request Header Fields Too Large: headers too big. Use 414 for URL limit; 431 for header limit. Both client errors.

### 77. What is the purpose of the If-Unmodified-Since header?
**Answer:** Client sends with date; server performs request only if resource not modified since that date. Use for conditional PUT/DELETE (optimistic locking). Return 412 if modified.

### 78. What is the purpose of the If-Range header?
**Answer:** With Range: if ETag or date matches, server returns range; else full resource. Use for resume download (avoid 412 when resource changed). Combines conditional and range.

### 79. Explain the difference between 416 and 417.
**Answer:** 416 Range Not Satisfiable: range invalid (e.g. beyond end). 417 Expectation Failed: Expect header not met (e.g. 100-continue rejected). Use 416 for bad range; 417 for Expect failure.

### 80. What is the purpose of the Proxy-Authenticate header?
**Answer:** Proxy sends with 407; indicates proxy auth scheme. Client sends Proxy-Authorization. Use when proxy requires auth. Rare in typical web apps.

### 81. What is the purpose of the Proxy-Authorization header?
**Answer:** Client sends credentials to proxy (similar to Authorization). Use when proxy requires auth. Rare; set by client or proxy client.

### 82. Explain the difference between 426 and 428.
**Answer:** 426 Upgrade Required: server requires protocol upgrade (e.g. TLS). 428 Precondition Required: server requires conditional request (e.g. If-Match). Use 426 for upgrade; 428 for conditional.

### 83. What is the purpose of the Alt-Svc header?
**Answer:** Alternative Service: server suggests alternative (e.g. HTTP/2, different host). Client may use for future requests. Use for protocol or endpoint advertisement. Optional.

### 84. What is the purpose of the Link header?
**Answer:** Contains URLs for related resources (e.g. next page, alternate format). Use for HATEOAS or pagination (rel=next). Same as HTML link but in header.

### 85. Explain the difference between 429 and 503 for overload.
**Answer:** 429 Too Many Requests: rate limit; client should slow down. 503 Service Unavailable: server overloaded; retry later. Use 429 for per-client limit; 503 for global overload.

### 86. What is the purpose of the X-RateLimit-Limit header?
**Answer:** Informs client of rate limit (e.g. 100 requests per hour). Optional; helps client throttle. Use with 429 or on every response. Not standard but common.

### 87. What is the purpose of the X-RateLimit-Remaining header?
**Answer:** Informs client how many requests left in window. Use with rate limiting; client can slow before 429. Optional but improves UX.

### 88. What is the purpose of the X-RateLimit-Reset header?
**Answer:** When rate limit window resets (Unix timestamp or HTTP date). Client knows when to retry. Use with 429 or on response. Optional.

### 89. Explain the difference between 501 and 505.
**Answer:** 501 Not Implemented: server does not support method or feature. 505 HTTP Version Not Supported: version not supported. Use 501 for unimplemented; 505 for wrong HTTP version.

### 90. What is the purpose of the Via header?
**Answer:** Added by proxies; indicates proxy chain. Use for debugging and tracing. Application rarely sets; proxies add. Can detect proxy presence.

### 91. What is the purpose of the Warning header?
**Answer:** Carries warning (e.g. stale response, transformation applied). Deprecated in HTTP/1.1; use other mechanisms. Rare.

### 92. What is the purpose of the Date header?
**Answer:** Date and time of message (HTTP-date format). Should be set on response. Use for caching and logging. Required in HTTP/1.1 response.

### 93. Explain the difference between 412 and 428.
**Answer:** 412 Precondition Failed: conditional request condition not met (e.g. If-Match failed). 428 Precondition Required: server requires conditional (e.g. If-Match). Use 412 when condition fails; 428 when client must send condition.

### 94. What is the purpose of the Server header?
**Answer:** Identifies server software (e.g. Server: nginx). Optional; some strip for security. Use for debugging; consider hiding in production.

### 95. What is the purpose of the Age header?
**Answer:** Set by cache; indicates how long response has been in cache (seconds). Use for cache freshness. Client or downstream can use for validation.

### 96. What is the purpose of the Expires header?
**Answer:** Date when response becomes stale. Legacy; prefer Cache-Control max-age. Use for backward compatibility. Cache-Control takes precedence.

### 97. Explain the difference between 502 and 504.
**Answer:** 502 Bad Gateway: proxy got invalid response from upstream. 504 Gateway Timeout: proxy timed out waiting for upstream. Use 502 for bad response; 504 for timeout.

### 98. What is the purpose of the Pragma header?
**Answer:** Legacy (HTTP/1.0); Pragma: no-cache means don't use cached copy. Replaced by Cache-Control. Use for backward compatibility with old caches.

### 99. What is the purpose of the X-Forwarded-Host header?
**Answer:** Set by proxy; original Host value. Use when server is behind proxy to get original host. Trust only from known proxy.

### 100. What is the purpose of the X-Real-IP header?
**Answer:** Set by proxy; original client IP. Use when behind proxy to get real IP. Non-standard; X-Forwarded-For is more common. Trust only from known proxy.

### 101. Explain HTTP request smuggling.
**Answer:** Attack where attacker sends request that proxy and server interpret differently (e.g. conflicting Content-Length and Transfer-Encoding). Can lead to cache poisoning or request hijacking. Fix: normalize requests, use HTTP/2.

### 102. What is the purpose of the TRACE method?
**Answer:** Echoes request back to client (for debugging). Disabled by default (security: can expose cookies). Use for diagnostics; rarely needed. Prevent in production.

### 103. What is the purpose of the CONNECT method?
**Answer:** Establishes tunnel (e.g. for HTTPS through proxy). Proxy forwards bytes; doesn't see content. Use for SSL/TLS tunneling. Required for HTTPS via proxy.

### 104. Explain the difference between 418 and 420.
**Answer:** 418 I'm a teapot: joke code (RFC 2324). 420 (non-standard): e.g. Twitter rate limit. Use 418 for fun; 420 not in standard. Prefer 429 for rate limit.

### 105. What is the purpose of the Max-Forwards header?
**Answer:** Used with TRACE; limits number of proxies that forward request. Decremented by each proxy; 0 means don't forward. Use for TRACE debugging. Rare.

### 106. What is the purpose of the Proxy-Connection header?
**Answer:** Legacy; used by old proxies for keep-alive. Replaced by Connection. Don't use in new code.

### 107. Explain the difference between 306 and 307.
**Answer:** 306 was "Switch Proxy"; deprecated. 307 Temporary Redirect: preserve method and body. Use 307 for temporary redirect preserving method.

### 108. What is the purpose of the From header?
**Answer:** Email of user (for bots). Rarely used; privacy concern. Don't set in browser. Optional.

### 109. What is the purpose of the Warning response header (deprecated)?
**Answer:** Carried warning codes (e.g. 110 stale). Deprecated; use Cache-Control or other mechanisms. Rare in modern APIs.

### 110. Explain the difference between HTTP/2 and HTTP/3.
**Answer:** HTTP/3 uses QUIC (over UDP) instead of TCP; reduces head-of-line blocking, faster connection setup. HTTP/2 uses TCP. HTTP/3 is newer; adoption growing. Both support multiplexing.

