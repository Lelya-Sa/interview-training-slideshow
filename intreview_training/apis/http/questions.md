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

### 111. What is the purpose of the Accept-Language header?
**Answer:** Client sends preferred languages (e.g. en-US, fr). Server uses for content negotiation. Use for i18n. Quality values optional. Same as Accept for language.

### 112. Explain the difference between 301 and 308.
**Answer:** 301 Moved Permanently: may change method (GET). 308 Permanent Redirect: preserves method and body. Use 308 for permanent redirect with same method.

### 113. What is the purpose of the Content-Disposition header?
**Answer:** Inline (display) or attachment (download); optional filename. Use for file download. Set by server. Client may use for save dialog.

### 114. What is the difference between Connection: keep-alive and close?
**Answer:** keep-alive: reuse connection for multiple requests. close: close after response. Use keep-alive for performance. Default in HTTP/1.1 is keep-alive.

### 115. What is the purpose of the X-Forwarded-For header?
**Answer:** Proxies add client IP; chain of IPs (client, proxy1, ...). Use for logging and geo. Don't trust for auth; can be spoofed. Validate in trusted proxy.

### 116. Explain the difference between 302 and 307.
**Answer:** 302 Found: temporary; may change method (GET). 307 Temporary Redirect: preserves method and body. Use 307 for temporary redirect with same method.

### 117. What is the purpose of the TE header?
**Answer:** Client advertises transfer encodings (e.g. trailers). Rare. Use for chunked with trailers. Optional. Most clients don't use.

### 118. What is the difference between HTTP and WebSocket?
**Answer:** HTTP is request-response. WebSocket is full-duplex over single connection; upgrade from HTTP. Use HTTP for API; WebSocket for real-time.

### 119. What is the purpose of the Trailer header?
**Answer:** Lists headers sent in trailer (after chunked body). Use with chunked encoding. Rare. Use for checksum or metadata after body.

### 120. Explain the difference between 400 and 422.
**Answer:** 400 Bad Request: malformed (syntax). 422 Unprocessable Entity: valid syntax but semantic error (validation). Use 422 for validation errors.

### 121. What is the purpose of the Upgrade header?
**Answer:** Client or server requests protocol upgrade (e.g. HTTP/1.1 to WebSocket). Use for WebSocket handshake. Server responds 101 Switching Protocols.

### 122. What is the difference between Cache-Control: no-cache and no-store?
**Answer:** no-cache: revalidate with server before use. no-store: don't store at all. Use no-store for sensitive; no-cache for always fresh.

### 123. What is the purpose of the Via header?
**Answer:** Proxies add themselves to chain (protocol, version). Use for debugging and tracing. Don't remove; append. Optional.

### 124. Explain the difference between 401 and 403.
**Answer:** 401 Unauthorized: not authenticated (no or invalid credentials). 403 Forbidden: authenticated but not allowed. Use 401 for login; 403 for permission.

### 125. What is the purpose of the X-Request-Id header?
**Answer:** Client or server sets unique request id. Use for logging and tracing. Propagate to response and downstream. UUID recommended.

### 126. What is the difference between HTTP/1.0 and HTTP/1.1?
**Answer:** HTTP/1.1: persistent connection, chunked encoding, Host required, more methods. HTTP/1.0: one request per connection. Use HTTP/1.1 for modern.

### 127. What is the purpose of the Accept-Encoding header?
**Answer:** Client sends supported encodings (gzip, br, etc.). Server may compress response. Use for bandwidth. Set Content-Encoding in response.

### 128. Explain the difference between 500 and 503.
**Answer:** 500 Internal Server Error: unexpected error. 503 Service Unavailable: overloaded or maintenance. Use 503 for retry; 500 for bug.

### 129. What is the purpose of the X-Content-Type-Options header?
**Answer:** nosniff: prevent MIME sniffing. Use for security. Set on response. Prevents browser from interpreting as different type. Recommended.

### 130. What is the difference between GET and HEAD?
**Answer:** GET returns body; HEAD returns headers only (same as GET). Use HEAD for checking existence or metadata. Same semantics; no body.

### 131. What is the purpose of the X-Frame-Options header?
**Answer:** DENY or SAMEORIGIN: prevent clickjacking. Use for security. Set on response. SAMEORIGIN allows same-origin iframe. Recommended.

### 132. Explain the difference between 200 and 204.
**Answer:** 200 OK: response has body. 204 No Content: success, no body. Use 204 for DELETE or PUT/PATCH when no representation returned.

### 133. What is the purpose of the Strict-Transport-Security header?
**Answer:** HSTS: force HTTPS for duration (max-age). Use for security. Set on HTTPS response. Preload list for first visit. Recommended.

### 134. What is the difference between relative and absolute URL?
**Answer:** Relative: path only (e.g. /api/users). Absolute: scheme, host, path (e.g. https://example.com/api). Use relative for same origin; absolute for redirect.

### 135. What is the purpose of the X-XSS-Protection header?
**Answer:** Legacy XSS filter (1; mode=block). Deprecated; use Content-Security-Policy. Optional. Modern browsers prefer CSP.

### 136. Explain the difference between 404 and 410.
**Answer:** 404 Not Found: resource doesn't exist or no permission. 410 Gone: existed but permanently removed. Use 410 for deprecated or deleted.

### 137. What is the purpose of the Content-Security-Policy header?
**Answer:** CSP: control sources for script, style, etc. Use for XSS prevention. Set on response. Report-URI optional. Recommended for security.

### 138. What is the difference between request and response headers?
**Answer:** Request: sent by client (Accept, Authorization). Response: sent by server (Content-Type, Set-Cookie). Some can be both (Cache-Control).

### 139. What is the purpose of the Referrer-Policy header?
**Answer:** Control Referer (referrer) sent (no-referrer, same-origin, etc.). Use for privacy. Set on response. Don't leak URL to third party.

### 140. Explain the difference between 301 and 302.
**Answer:** 301 permanent; 302 temporary. Search engines treat differently. Use 301 for permanent move; 302 for temporary. Both may change method to GET.

### 141. What is the purpose of the Retry-After header?
**Answer:** Sent with 503 or 429; seconds or date. Client should wait before retry. Use for rate limit and maintenance. Optional; client may use backoff.

### 142. What is the difference between HTTP and HTTPS handshake?
**Answer:** HTTP: TCP then request. HTTPS: TCP, TLS handshake (certificate, keys), then encrypted HTTP. Use HTTPS for security. TLS adds latency once.

### 143. What is the purpose of the If-None-Match header?
**Answer:** Client sends with GET; value is ETag. Server returns 304 if ETag matches. Use for conditional GET and cache revalidation. Reduces bandwidth.

### 144. Explain the difference between 201 and 200.
**Answer:** 201 Created: resource created; Location header with URL. 200 OK: success, may be create or update. Use 201 for POST that creates resource.

### 145. What is the purpose of the Vary header?
**Answer:** Lists headers that affect response (e.g. Accept-Encoding). Caches use for cache key. Use for correct caching when response varies by header.

### 146. What is the difference between idempotent and safe methods?
**Answer:** Safe: no side effect (GET, HEAD, OPTIONS). Idempotent: same effect if repeated (GET, HEAD, PUT, DELETE, OPTIONS). POST is neither. PATCH may be idempotent.

### 147. What is the purpose of the Allow header?
**Answer:** Lists methods allowed on resource (GET, POST, ...). Sent with 405. Use for discovery. Optional. Client can use for OPTIONS response.

### 148. Explain the difference between 303 and 307.
**Answer:** 303 See Other: redirect to GET (after POST). 307 preserves method. Use 303 for PRG (POST redirect GET); 307 for same method. Both temporary.

### 149. What is the purpose of the Location header?
**Answer:** Sent with 201 (URL of new resource), 3xx (redirect URL). Use for redirect and create. Required for 201 and 3xx. Client follows redirect.

### 150. What is the difference between HTTP and gRPC?
**Answer:** HTTP is text/JSON or binary; REST-style. gRPC is HTTP/2, binary, codegen, streaming. Use HTTP for broad compatibility; gRPC for performance and types.

### 151. What is the purpose of the Last-Modified header?
**Answer:** Server sends with GET; date of last change. Client uses If-Modified-Since next time. Use for conditional GET and 304. Less precise than ETag.

### 152. Explain the difference between 408 and 504.
**Answer:** 408 Request Timeout: client didn't send in time. 504 Gateway Timeout: upstream didn't respond. Use 408 for client; 504 for proxy/upstream.

### 153. What is the purpose of the ETag header?
**Answer:** Opaque identifier of resource version. Use for conditional GET (If-None-Match) and 304; optimistic concurrency (If-Match). Strong or weak ETag.

### 154. What is the difference between Content-Type and Accept?
**Answer:** Content-Type: type of body (request or response). Accept: preferred response type. Use Content-Type for body; Accept for negotiation.

### 155. What is the purpose of the If-Match header?
**Answer:** Client sends with PUT/PATCH/DELETE; value is ETag. Server returns 412 if ETag doesn't match. Use for optimistic concurrency. Prevents lost update.

### 156. Explain the difference between 413 and 429.
**Answer:** 413 Payload Too Large: body too big. 429 Too Many Requests: rate limit. Use 413 for size limit; 429 for rate limit. Both are client limits.

### 157. What is the purpose of the Range header?
**Answer:** Client requests range of resource (bytes=0-499). Server returns 206 with Content-Range. Use for resume and partial content. Support optional.

### 158. What is the difference between HTTP and HTTP/2 multiplexing?
**Answer:** HTTP/1.1: one request per connection (or pipelining limited). HTTP/2: multiple streams over one connection; no head-of-line blocking per stream.

### 159. What is the purpose of the Content-Range header?
**Answer:** Sent with 206 Partial Content; indicates range (e.g. bytes 0-499/1000). Use for range requests. Client requests Range; server responds with Content-Range.

### 160. Explain the difference between 100 and 200.
**Answer:** 100 Continue: client may send body (after Expect: 100-continue). 200 OK: success. Use 100 for large upload confirmation. Server may skip 100.

### 161. What is the purpose of the Expect header?
**Answer:** Client sends Expect: 100-continue for large body; waits for 100 before sending. Server responds 100 or 417. Use for upload optimization. Optional.

### 162. What is the difference between cookie and session?
**Answer:** Cookie: stored in browser; sent with each request. Session: server stores data; session id in cookie. Use cookie for id; session for server state.

### 163. What is the purpose of the Transfer-Encoding header?
**Answer:** chunked: body sent in chunks; last chunk size 0. Use for streaming when length unknown. Don't use with Content-Length. Common for dynamic content.

### 164. Explain the difference between 307 and 308.
**Answer:** 307 Temporary Redirect: preserves method. 308 Permanent Redirect: preserves method. Both preserve body. Use 307 for temporary; 308 for permanent.

### 165. What is the purpose of the X-Forwarded-Proto header?
**Answer:** Proxies set original scheme (http or https). Use when behind TLS terminator. Server uses for redirect and links. Don't trust without validation.

### 166. What is the difference between HTTP and CoAP?
**Answer:** HTTP: TCP, web. CoAP: UDP, constrained devices (IoT). Use HTTP for web; CoAP for sensors. Different layers and use cases.

### 167. What is the purpose of the Prefer header?
**Answer:** Client requests preference (e.g. return=representation, wait=30). Server may honor. Use for conditional response. Optional; document support.

### 168. Explain the difference between 502 and 503.
**Answer:** 502 Bad Gateway: invalid response from upstream. 503 Service Unavailable: overloaded or maintenance. Use 502 for upstream error; 503 for capacity.

### 169. What is the purpose of the Link header?
**Answer:** Contains URLs for related resources (next, prev, canonical). Use for pagination and discovery. Format: &lt;url&gt;; rel="next". Use for API and HTML.

### 170. What is the difference between GET and POST body?
**Answer:** GET has no body (semantic); use query for params. POST has body (e.g. JSON). Don't send body in GET; not guaranteed to be sent. Use POST for data.

### 171. What is the purpose of the WWW-Authenticate header?
**Answer:** Sent with 401; indicates auth scheme (Bearer, Basic) and params (realm). Client uses to get credentials. Use for challenge. Required for 401 when auth possible.

### 172. Explain the difference between 304 and 200.
**Answer:** 304 Not Modified: use cached copy; no body. 200 OK: full response. Use 304 for conditional GET when ETag or date matches. Reduces bandwidth.

### 173. What is the purpose of the X-RateLimit-* headers?
**Answer:** X-RateLimit-Limit, Remaining, Reset (and Retry-After on 429). Use for rate limit feedback. Client can throttle. Optional but helpful. Various names.

### 174. What is the difference between HTTP and MQTT?
**Answer:** HTTP is request-response over TCP. MQTT is pub/sub over TCP (lightweight). Use HTTP for APIs; MQTT for device messaging and IoT.

### 175. What is the purpose of the Cache-Control: max-age?
**Answer:** max-age=seconds: response fresh for that time. Use for caching. After max-age revalidate or use stale. Use for static and cacheable API.

### 176. Explain the difference between 411 and 413.
**Answer:** 411 Length Required: Content-Length required but missing. 413 Payload Too Large: body too big. Use 411 for required header; 413 for size. Both request body.

### 177. What is the purpose of the Content-Length header?
**Answer:** Length of body in bytes. Required for body when not chunked. Use for framing. Don't send if Transfer-Encoding chunked. Client may use for progress.

### 178. What is the difference between HTTP/2 server push and preload?
**Answer:** Server push: server sends resource before requested. Preload: Link rel=preload; browser fetches early. Push is deprecated in favor of preload. Use preload for critical.

### 179. What is the purpose of the If-Modified-Since header?
**Answer:** Client sends with GET; value is date. Server returns 304 if not modified since. Use for conditional GET. Use with Last-Modified. Simpler than ETag for date-based.

### 180. Explain the difference between 400 and 401.
**Answer:** 400 Bad Request: malformed request. 401 Unauthorized: not authenticated. Use 400 for syntax/validation; 401 for missing or invalid credentials.

### 181. What is the purpose of the Access-Control-* headers?
**Answer:** CORS: Allow-Origin, Allow-Methods, Allow-Headers, Allow-Credentials, Expose-Headers, Max-Age. Use for cross-origin requests. Set on response and preflight.

### 182. What is the difference between HTTP and Server-Sent Events?
**Answer:** HTTP is request-response. SSE: single GET, server streams events. Use HTTP for API; SSE for server-to-client stream. SSE is one-way.

### 183. What is the purpose of the If-Unmodified-Since header?
**Answer:** Client sends with PUT/DELETE; server returns 412 if modified since. Use for optimistic concurrency. Use with Last-Modified. Less common than If-Match.

### 184. Explain the difference between 403 and 404.
**Answer:** 403 Forbidden: authenticated but not allowed. 404 Not Found: resource doesn't exist (or no permission to know). Don't leak existence with 403; use 404 when appropriate.

### 185. What is the purpose of the Origin header?
**Answer:** Sent by browser with cross-origin request; value is scheme+host+port. Server uses for CORS. Don't trust for auth; use for Allow-Origin check. Required for CORS.

### 186. What is the difference between HTTP and QUIC?
**Answer:** HTTP/3 uses QUIC (UDP); HTTP/1 and /2 use TCP. QUIC reduces head-of-line blocking, faster setup. Use HTTP/3 for best performance. QUIC is transport.

### 187. What is the purpose of the Sec-Fetch-* headers?
**Answer:** Browser sends Sec-Fetch-Mode, Site, Dest, etc. Use for CSRF and security. Server may check. Don't rely alone; use with other checks. Modern browsers.

### 188. Explain the difference between 200 and 201.
**Answer:** 200 OK: success (get, update, or create). 201 Created: resource created; include Location. Use 201 for POST that creates; 200 for GET or update.

### 189. What is the purpose of the Set-Cookie header?
**Answer:** Server sets cookie (name=value; options). Options: Path, Domain, Max-Age, HttpOnly, Secure, SameSite. Use for session and preference. Set options for security.

### 190. What is the difference between request line and status line?
**Answer:** Request line: METHOD URI HTTP/VERSION. Status line: HTTP/VERSION STATUS REASON. First line of request vs response. Both have version and line end.

### 191. What is the purpose of the Proxy-Authorization header?
**Answer:** Client sends credentials to proxy (Basic or Bearer). Use when proxy requires auth. Rare. Don't use for origin auth; use Authorization.

### 192. Explain the difference between 502 and 504.
**Answer:** 502 Bad Gateway: upstream returned invalid response. 504 Gateway Timeout: upstream didn't respond in time. Use 502 for error; 504 for timeout. Both from proxy.

### 193. What is the purpose of the Age header?
**Answer:** Caches set; seconds since response was generated. Use for cache freshness. Client can compute stale. Optional. Set by cache not origin.

### 194. What is the difference between HTTP and FTP?
**Answer:** HTTP: request-response, stateless, web. FTP: separate control and data, stateful. Use HTTP for web; FTP for file transfer. Different protocols.

### 195. What is the purpose of the Date header?
**Answer:** Server sets; date/time of response (HTTP-date format). Use for caching and logging. Optional but recommended. Client may use for clock skew.

### 196. Explain the difference between 301 and 303.
**Answer:** 301 permanent; 303 temporary, change to GET. Use 301 for permanent move; 303 for POST redirect GET (PRG). Both redirect. 303 is "see other" after POST.

### 197. What is the purpose of the Server header?
**Answer:** Server advertises software (e.g. nginx). Use for debugging. Optional; some hide for security. Don't expose version in production. Optional.

### 198. What is the difference between HTTP and SMTP?
**Answer:** HTTP: request-response, web. SMTP: email transfer, store-and-forward. Use HTTP for web; SMTP for email. Different layers and use cases.

### 199. What is the purpose of the X-Forwarded-Host header?
**Answer:** Proxies set original Host. Use when behind reverse proxy. Server uses for redirect and links. Don't trust without validation. Same as Host behind proxy.

### 200. Explain the difference between 405 and 501.
**Answer:** 405 Method Not Allowed: method not supported for resource. 501 Not Implemented: method not implemented by server. Use 405 for resource; 501 for server. Both method-related.

### 201. What is the purpose of the Connection header?
**Answer:** keep-alive or close; controls connection lifetime. Use keep-alive for reuse. In HTTP/1.1 default is keep-alive. Proxies may use for hop-by-hop.

### 202. What is the difference between HTTP and TCP?
**Answer:** TCP is transport (reliable, ordered). HTTP is application (request-response). HTTP runs over TCP. Use TCP for connection; HTTP for message. Different layers.

### 203. What is the purpose of the Authorization header?
**Answer:** Carries credentials: Bearer &lt;token&gt;, Basic &lt;base64&gt;, etc. Use for auth. Validate on server. Document scheme. Standard header for API auth.

### 204. Explain the difference between 409 and 412.
**Answer:** 409 Conflict: state conflict (e.g. duplicate). 412 Precondition Failed: If-Match or If-Unmodified-Since failed. Use 409 for business conflict; 412 for concurrency.

### 205. What is the purpose of the Cookie header?
**Answer:** Client sends cookies (name=value; name2=value2). Use for session and preference. Same-origin only by default. Don't put sensitive without HttpOnly.

### 206. What is the difference between HTTP and WebSocket upgrade?
**Answer:** Client sends Upgrade: websocket; server responds 101. Same connection becomes WebSocket. Use for real-time. HTTP is handshake; then different protocol.

### 207. What is the purpose of the Accept header?
**Answer:** Client sends preferred response type (application/json, text/html). Server uses for content negotiation. Use for API format. Default; document supported types.

### 208. Explain the difference between 416 and 417.
**Answer:** 416 Range Not Satisfiable: range invalid for resource. 417 Expectation Failed: Expect: 100-continue not met. Use 416 for range; 417 for expect. Both client request.

### 209. What is the purpose of the Content-Encoding header?
**Answer:** Encoding of body (gzip, br, etc.). Use when body is compressed. Client decodes. Use for bandwidth. Set when Accept-Encoding was sent. Match request.

### 210. What is the difference between HTTP/1.1 pipelining and HTTP/2?
**Answer:** Pipelining: send requests without waiting; limited support, head-of-line blocking. HTTP/2: multiplexing, no blocking per stream. Use HTTP/2 for performance.

### 211. What is the purpose of the Deprecation header?
**Answer:** RFC 8594; indicates deprecated (true) or Sunset date. Use for versioning. Document migration. Optional. Client may warn. New standard.

### 212. Explain the difference between 500 and 502.
**Answer:** 500 Internal Server Error: server error. 502 Bad Gateway: proxy received invalid response from upstream. Use 500 for app; 502 for proxy/upstream. Both server-side.

### 213. What is the purpose of the Host header?
**Answer:** Required in HTTP/1.1; domain of request. Use for virtual hosting. Server uses for routing. Required for request. One host per request.

### 214. What is the difference between HTTP and RPC over HTTP?
**Answer:** HTTP: resource-oriented (REST). RPC: action-oriented (procedure call). Both use HTTP; different semantics. Use HTTP for REST; RPC for procedure style.

### 215. What is the purpose of the If-Range header?
**Answer:** Client sends with Range; value is ETag or date. If match, server returns 206; else 200 full. Use for resume; avoid re-download if unchanged. Optional.

### 216. Explain the difference between 429 and 503.
**Answer:** 429 Too Many Requests: rate limit; client should retry with backoff. 503 Service Unavailable: overloaded; retry later. Use 429 for limit; 503 for capacity. Both retry.

### 217. What is the purpose of the Proxy-Authenticate header?
**Answer:** Proxy sends with 407; indicates auth scheme for proxy. Client responds with Proxy-Authorization. Use when proxy requires auth. Rare. Same as WWW-Authenticate for proxy.

### 218. What is the difference between HTTP and HTTP/2 prioritization?
**Answer:** HTTP/2 allows stream priority (weight, dependency). Client can prioritize. Use for critical resources first. HTTP/1.1 has no priority. Improves perceived performance.

### 219. What is the purpose of the Sunset header?
**Answer:** RFC 8594; date when resource will be removed. Use for deprecation. Document migration. Optional. Client may warn. Use with Deprecation.

### 220. Explain the difference between 100 and 417.
**Answer:** 100 Continue: send body. 417 Expectation Failed: server doesn't support Expect. Use 100 for upload; 417 when server rejects Expect. Both relate to Expect header.

### 221. What is the purpose of the Transfer-Encoding: chunked?
**Answer:** Body in chunks; each chunk: size (hex), CRLF, data. Last chunk size 0. Use when length unknown. Don't use with Content-Length. Common for dynamic.

### 222. What is the difference between HTTP and HTTP/2 header compression?
**Answer:** HTTP/1.1: headers plain text. HTTP/2: HPACK compresses headers. Reduces size. Use HTTP/2 for less overhead. Same semantics; different encoding.

### 223. What is the purpose of the X-Forwarded-Port header?
**Answer:** Proxies set original port. Use when behind reverse proxy. Server uses for redirect. Don't trust without validation. Optional. Same as port behind proxy.

### 224. Explain the difference between 406 and 415.
**Answer:** 406 Not Acceptable: no representation matching Accept. 415 Unsupported Media Type: Content-Type not supported. Use 406 for response type; 415 for request body type.

### 225. What is the purpose of the Keep-Alive header?
**Answer:** Parameters for keep-alive (timeout, max). Use in HTTP/1.0 for persistent connection. HTTP/1.1 uses Connection: keep-alive. Optional. Rare in modern.

### 226. What is the difference between HTTP and HTTP/2 binary framing?
**Answer:** HTTP/1.1: text. HTTP/2: binary frames (headers, data). Use HTTP/2 for efficiency. Same semantics; different wire format. Parsing is faster.

### 227. What is the purpose of the Alt-Svc header?
**Answer:** Server advertises alternative service (e.g. h3=":443"). Use for HTTP/3 discovery. Client may switch. Optional. Use for protocol upgrade. Modern.

### 228. Explain the difference between 303 and 302.
**Answer:** 302 Found: temporary; may change to GET. 303 See Other: temporary; change to GET (for POST). Use 303 for PRG; 302 for generic temporary. Both temporary.

