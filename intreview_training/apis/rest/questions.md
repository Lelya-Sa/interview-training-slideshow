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

### 16. What is a resource in REST?
**Answer:** A resource is any entity that can be identified by a URI (e.g. /users/1, /orders). Resources are nouns; use plural for collections (/users, /orders).

### 17. Explain the difference between GET and POST.
**Answer:** GET retrieves a resource; safe and idempotent; no body. POST creates a resource; not idempotent; body contains representation. Use GET for reads, POST for creates.

### 18. When would you use 204 No Content?
**Answer:** Success with no response body: DELETE after successful delete, PUT/PATCH when no representation returned. Client should not expect a body.

### 19. What is content negotiation in REST?
**Answer:** Client requests format via Accept header (e.g. Accept: application/json). Server responds with Content-Type. Supports JSON, XML, or other formats from same URI.

### 20. How do you design nested resources (e.g. /users/1/orders)?
**Answer:** Use nested routes when child belongs to parent: /users/:userId/orders. Limit depth (2 levels); for complex queries use query params on top-level resource.

### 21. What is the difference between 401 and 403?
**Answer:** 401 Unauthorized: authentication required or failed (missing/invalid credentials). 403 Forbidden: authenticated but not allowed to perform action.

### 22. How do you implement filtering and sorting in REST?
**Answer:** Query parameters: ?status=active&sort=createdAt&order=desc. Use consistent names; document in API spec. Avoid deep nesting in query.

### 23. What is safe method in HTTP?
**Answer:** Safe methods do not modify server state: GET, HEAD, OPTIONS. Idempotent is different: GET, PUT, DELETE, HEAD, OPTIONS are idempotent; POST is not.

### 24. How do you handle bulk operations in REST?
**Answer:** POST to collection with array in body (e.g. POST /users with list). Return 207 Multi-Status with per-item results, or 201 with list of created resources.

### 25. What is the purpose of the OPTIONS method?
**Answer:** Preflight for CORS: browser sends OPTIONS to check allowed methods/headers. Also used to describe available operations on a resource (e.g. Allow header).

### 26. How do you implement soft delete in REST?
**Answer:** PATCH resource with deleted: true or status: deleted; or DELETE that sets flag. Filter deleted in list (e.g. ?includeDeleted=false). Use 200 or 204 for delete response.

### 27. What is the difference between REST and RPC?
**Answer:** REST is resource-oriented (nouns, HTTP methods). RPC is action-oriented (verbs in URL or method). REST uses HTTP semantics; RPC often uses POST for everything.

### 28. How do you document a REST API?
**Answer:** OpenAPI (Swagger), Postman collections, or README with endpoints, methods, request/response examples. Keep docs in sync with code; consider code-first or spec-first.

### 29. What is the purpose of the ETag header?
**Answer:** Entity tag for caching and conditional requests. Server returns ETag; client sends If-None-Match; server returns 304 Not Modified if unchanged. Reduces bandwidth.

### 30. How do you implement conditional requests (If-Match, If-None-Match)?
**Answer:** If-Match: update only if ETag matches (optimistic locking). If-None-Match: return 304 if ETag matches. Use for cache validation and concurrent update safety.

### 31. What is the difference between 400 and 422?
**Answer:** 400 Bad Request: malformed request (invalid JSON, wrong content-type). 422 Unprocessable Entity: well-formed but semantic validation failed (e.g. invalid field value).

### 32. How do you handle file upload in REST?
**Answer:** POST with multipart/form-data; or PUT to resource URL with binary body. Return 201 with Location of resource. Limit size; validate content-type.

### 33. What is the purpose of the Location header?
**Answer:** In 201 Created, Location contains URI of the created resource. Client can use it for redirect or to fetch the new resource. Required for 201 in REST.

### 34. How do you implement search in REST?
**Answer:** GET on collection with query params: ?q=term&field=name. Return 200 with list. For complex search consider dedicated /search endpoint with structured params.

### 35. What is the difference between REST and GraphQL?
**Answer:** REST: fixed endpoints, client gets full response per endpoint. GraphQL: single endpoint, client requests exact fields. REST uses HTTP cache; GraphQL is flexible query.

### 36. How do you implement field selection (sparse fieldsets)?
**Answer:** Query param: ?fields=id,name,email. Return only requested fields in response. Reduces payload; document supported fields in API spec.

### 37. What is the purpose of the Accept-Language header?
**Answer:** Client requests language for response (e.g. Accept-Language: en). Server returns localized content or 406 if not supported. Use for i18n in API.

### 38. How do you handle long-running operations in REST?
**Answer:** Return 202 Accepted with Location to status resource. Client polls until complete; status resource returns 200 when done. Or use webhooks for notification.

### 39. What is the difference between 500 and 503?
**Answer:** 500 Internal Server Error: unexpected server error. 503 Service Unavailable: server overloaded or down for maintenance; client may retry with Retry-After.

### 40. How do you implement API versioning in URL vs header?
**Answer:** URL: /api/v1/users (explicit, cacheable). Header: Accept: application/vnd.api+v1 (no URL change). Choose one; URL is more common and easier to debug.

### 41. What is the purpose of the Link header?
**Answer:** Link header contains URLs for related resources (e.g. next page, alternate format). Enables HATEOAS-style discovery without embedding in body. Use for pagination next/prev.

### 42. How do you design pagination with cursor vs offset?
**Answer:** Offset: ?page=1&limit=10 (simple; inconsistent if data changes). Cursor: ?cursor=abc&limit=10 (stable for real-time data). Prefer cursor for large or changing datasets.

### 43. What is idempotency key? How do you use it?
**Answer:** Client sends Idempotency-Key header (e.g. UUID). Server stores key with response; duplicate request returns same response. Use for POST (payments, orders) to avoid double submission.

### 44. How do you handle authentication with API keys?
**Answer:** API key in header (X-API-Key or Authorization: Bearer <key>) or query (less secure). Validate key; map to user/tenant; return 401 if invalid. Rotate keys periodically.

### 45. What is the purpose of the Retry-After header?
**Answer:** With 503 or 429, Retry-After tells client when to retry (seconds or HTTP date). Use for rate limiting or maintenance. Client should respect to avoid hammering server.

### 46. How do you implement HATEOAS in responses?
**Answer:** Include _links or links in response: self, related, next. Client discovers actions from links. Optional for internal APIs; useful for public or evolving APIs.

### 47. What is the difference between REST and gRPC?
**Answer:** REST uses HTTP/JSON (or XML); human-readable; wide support. gRPC uses HTTP/2 and Protocol Buffers; binary; streaming; better performance. Choose by ecosystem and needs.

### 48. How do you handle CORS preflight in REST?
**Answer:** Respond to OPTIONS with Access-Control-Allow-Origin, -Methods, -Headers. Include credentials if needed (Allow-Credentials). Apply same rules to actual request.

### 49. What is the purpose of the Vary header?
**Answer:** Vary indicates which headers affect response (e.g. Vary: Accept-Encoding). Caches use it to store separate responses per varying header. Use for content negotiation caching.

### 50. How do you implement rate limiting per user vs per IP?
**Answer:** Per user: identify by API key or token; limit by user id. Per IP: limit by client IP. Use both: stricter per-user limit, fallback per-IP for unauthenticated. Return 429 with Retry-After.

### 51. What is the difference between 301 and 302?
**Answer:** 301 Moved Permanently: resource moved; cache and clients may update URL. 302 Found: temporary redirect; use GET on new URL. Use 308/307 for preserving method in HTTP/1.1.

### 52. How do you design error response format?
**Answer:** Consistent structure: { error: { code, message }, details? }. Use code for client logic; message for display. Include validation errors (e.g. field-level) in details. Document codes.

### 53. What is the purpose of the Prefer header?
**Answer:** Client preferences: e.g. Prefer: return=representation (return body on create/update), respond-async (async processing). Optional; server may ignore.

### 54. How do you implement webhooks for REST APIs?
**Answer:** Client registers URL; server POSTs to URL on events (e.g. order.created). Include signature for verification; retry with backoff; document payload and events.

### 55. What is the difference between 200 and 201?
**Answer:** 200 OK: success with body (e.g. GET, PATCH). 201 Created: success and resource created; include Location header. Use 201 for POST that creates a resource.

### 56. How do you handle partial response (field filtering) for large resources?
**Answer:** Query param ?fields=id,name. Return only those fields. For nested resources use dot notation if supported (e.g. ?fields=user.id,user.name). Reduces payload size.

### 57. What is the purpose of the Cache-Control header?
**Answer:** Controls caching: max-age, no-cache, no-store, private, public. Server sets on response; client and proxies respect. Use for static or cacheable API responses.

### 58. How do you implement health check endpoint for REST API?
**Answer:** GET /health or /ready returns 200 if service is up. For readiness include dependency checks (DB, cache); return 503 if not ready. Use for load balancer and K8s probes.

### 59. What is the difference between REST and message queues?
**Answer:** REST is request-response over HTTP; synchronous. Queues are async; client sends message; consumer processes later. Use REST for real-time; queues for decoupling and reliability.

### 60. How do you secure REST API (HTTPS, auth, input validation)?
**Answer:** HTTPS only; authenticate (JWT, OAuth, API key); authorize per resource; validate and sanitize input; rate limit; use security headers (CORS, CSP). Log and monitor.

### 61. What is the purpose of the If-Modified-Since header?
**Answer:** Client sends with GET; server returns 304 Not Modified if resource unchanged since date. Use with Last-Modified. Reduces bandwidth for cached resources.

### 62. How do you implement bulk update in REST?
**Answer:** PATCH to collection with array of ids and payloads; or multiple PATCH requests. Return 207 with per-item status, or 200 with summary. Document behavior.

### 63. What is the difference between 404 and 410?
**Answer:** 404 Not Found: resource does not exist (or no permission to know). 410 Gone: resource existed but was permanently removed. Use 410 when resource was intentionally deleted.

### 64. How do you handle request validation errors?
**Answer:** Validate body and params; return 400 or 422 with error body: { errors: [{ field, message }] }. Use schema validation (e.g. JSON Schema); document validation rules.

### 65. What is the purpose of the Allow header?
**Answer:** Allow lists HTTP methods allowed on resource (e.g. Allow: GET, PUT, DELETE). Return with 405 Method Not Allowed. Helps clients discover allowed operations.

### 66. How do you implement deprecation for REST API version?
**Answer:** Add Deprecation or Sunset header; document in API docs; provide migration path. Return 301/302 to new version if appropriate. Give clients time before removing.

### 67. What is the difference between REST and WebSocket?
**Answer:** REST is request-response; stateless. WebSocket is full-duplex; stateful connection. Use REST for CRUD and queries; WebSocket for real-time push or streaming.

### 68. How do you design resource naming (plural, singular, nested)?
**Answer:** Use plural nouns for collections: /users, /orders. Use id for single: /users/1. Nested when child belongs to parent: /users/1/orders. Avoid verbs; use HTTP methods.

### 69. What is the purpose of the Content-Range header?
**Answer:** With 206 Partial Content, Content-Range indicates which part is returned (e.g. bytes 0-499/1000). Use for range requests (large file download, pagination by range).

### 70. How do you implement async job status in REST?
**Answer:** POST returns 202 with Location: /jobs/123. GET /jobs/123 returns status (pending, completed, failed) and result when done. Client polls until completed.

### 71. What is the difference between 409 and 422?
**Answer:** 409 Conflict: request conflicts with current state (e.g. duplicate, version conflict). 422: validation failed. Use 409 for optimistic locking or duplicate key.

### 72. How do you handle CORS for credentials (cookies)?
**Answer:** Set Access-Control-Allow-Credentials: true; specify exact origin (no *). Client sends credentials: true in fetch. Use for cookie-based auth from browser.

### 73. What is the purpose of the Last-Modified header?
**Answer:** Server sends with GET response; indicates when resource was last modified. Client uses If-Modified-Since on next request; server returns 304 if unchanged. Supports caching.

### 74. How do you implement API key rotation?
**Answer:** Support multiple keys per client; add new key; clients switch; deprecate old key; remove after grace period. Or issue short-lived keys from auth endpoint. Document rotation policy.

### 75. What is the difference between REST and server-sent events?
**Answer:** REST is request-response. SSE is server push over single HTTP connection; one-way. Use REST for CRUD; SSE for live updates (notifications, progress).

### 76. How do you design query parameters for list endpoints?
**Answer:** page, limit (or offset, size); sort, order; filter by field (status=active); search (q=). Use consistent names; document; avoid reserved chars. Consider max limit.

### 77. What is the purpose of the X-Request-ID header?
**Answer:** Client or gateway sends unique request ID. Server logs it; returns in response (X-Request-ID or header). Use for tracing and correlating logs across services.

### 78. How do you implement backward compatibility when changing API?
**Answer:** Add new fields (optional); don't remove required fields; version API (v1, v2); deprecate with headers and docs; support old version for grace period. Test client compatibility.

### 79. What is the difference between 307 and 308?
**Answer:** 307 Temporary Redirect: preserve request method and body. 308 Permanent Redirect: same, but permanent. Use when redirecting POST and need to preserve body (308 for permanent).

### 80. How do you handle large response (streaming)?
**Answer:** Stream response: chunked transfer; write chunks as available. Or use range requests (Range header) for large files. Document if endpoint streams; client must handle incrementally.

### 81. What is the purpose of the Accept header?
**Answer:** Client requests response format: Accept: application/json. Server responds with Content-Type matching or 406 Not Acceptable. Use for content negotiation.

### 82. How do you implement audit logging for REST API?
**Answer:** Middleware logs method, path, user, timestamp, status; store in DB or log aggregator. Log sensitive actions (create, update, delete); redact sensitive data. Comply with audit requirements.

### 83. What is the difference between REST and tRPC?
**Answer:** REST uses HTTP and JSON; generic. tRPC is type-safe RPC over HTTP; client and server share types (TypeScript). Use tRPC for type safety and DX in TypeScript stack.

### 84. How do you handle request timeout in REST?
**Answer:** Server: set timeout for request handling; return 504 if upstream timeout. Client: set timeout; retry with backoff. Document timeout values; use consistent strategy.

### 85. What is the purpose of the X-RateLimit-* headers?
**Answer:** X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset inform client of rate limit state. Return with responses; client can throttle or show user. Optional but improves UX.

### 86. How do you implement resource embedding (include related)?
**Answer:** Query param: ?include=profile,orders. Response embeds related resources to avoid N+1 requests. Document embeddable relations; limit depth to avoid huge payloads.

### 87. What is the difference between 500 and 502?
**Answer:** 500: application error. 502 Bad Gateway: gateway/proxy received invalid response from upstream. Use 502 when your server is proxy and upstream failed or timed out.

### 88. How do you design REST API for mobile apps?
**Answer:** Same principles; use compression; minimize payload (fields, pagination); support offline (cache, sync); use tokens with refresh; version API; handle poor network (timeout, retry).

### 89. What is the purpose of the Strict-Transport-Security header?
**Answer:** HSTS: browser uses HTTPS only for host. Server sets max-age; includeSubDomains optional. Prevents downgrade attacks. Use with HTTPS.

### 90. How do you implement request signing for REST API?
**Answer:** Client signs request (e.g. HMAC of method, path, timestamp); sends signature in header. Server verifies; reject if invalid or timestamp too old. Use for server-to-server auth.

### 91. What is the difference between 403 and 404 for forbidden resource?
**Answer:** 404: hide existence of resource (avoid information disclosure). 403: reveal existence but not allowed. Use 404 when revealing existence is sensitive (e.g. private user).

### 92. How do you handle multipart form data in REST?
**Answer:** POST with Content-Type: multipart/form-data; parse parts (files, fields). Validate type and size; store files; return 201 with resource URL. Use for upload with metadata.

### 93. What is the purpose of the Content-Disposition header?
**Answer:** Inline (display in browser) or attachment (download); filename for download. Use for file download: Content-Disposition: attachment; filename="report.pdf".

### 94. How do you implement REST API versioning with header?
**Answer:** Accept: application/vnd.company.v1+json. Server reads version from header; routes to handler. No URL change; cache key must include version. Document header format.

### 95. What is the difference between idempotent and safe?
**Answer:** Safe: no side effect (GET, HEAD, OPTIONS). Idempotent: same effect if repeated (GET, PUT, DELETE, etc.). POST is neither safe nor idempotent. PUT is idempotent but not safe.

### 96. How do you implement REST client retry logic?
**Answer:** Retry on 5xx, 429; exponential backoff; respect Retry-After; max retries; don't retry 4xx (except 429). Use idempotency key for POST retry. Document retry behavior.

### 97. What is the purpose of the WWW-Authenticate header?
**Answer:** Server sends with 401; indicates auth scheme (e.g. Bearer, Basic) and realm. Client uses it to get credentials. Required for Basic auth; useful for API to indicate supported auth.

### 98. How do you design REST for microservices?
**Answer:** Each service exposes REST API; use consistent design (nouns, status codes, errors); gateway for auth and routing; service-to-service with internal auth. Version and document each service API.

### 99. What is the difference between 502 and 503?
**Answer:** 502: bad response from upstream (error or invalid). 503: service unavailable (overload, maintenance). Use 502 when proxy; 503 when this instance is not accepting traffic.

### 100. How do you implement REST API with OpenAPI spec?
**Answer:** Write or generate OpenAPI spec; use for docs (Swagger UI), codegen (client/server), validation. Keep spec in sync with implementation; consider spec-first or code-first workflow.

### 101. What is the purpose of the Connection header?
**Answer:** Connection: keep-alive (reuse TCP) or close (close after response). HTTP/1.1 default is keep-alive. Rarely set by application; used by proxies and load balancers.

### 102. How do you handle REST API deprecation and sunset?
**Answer:** Announce deprecation; add Sunset header (RFC); document migration; support old version for period; return 410 or redirect after sunset. Communicate with API consumers early.

### 103. What is the difference between REST and Falcor?
**Answer:** REST is resource-based. Falcor (from Netflix) allows querying a virtual JSON graph; one request for multiple paths. Less common; REST and GraphQL more widely used.

### 104. How do you implement REST API testing?
**Answer:** Unit test handlers; integration test with real HTTP (supertest, httpx); test status, body, headers; use fixtures; test auth and errors. Contract tests with OpenAPI. Run in CI.

### 105. What is the purpose of the Transfer-Encoding header?
**Answer:** Transfer-Encoding: chunked means response is sent in chunks. Server uses when length unknown (streaming). Client decodes chunks. Common for dynamic or streamed responses.

### 106. How do you implement REST API for file download?
**Answer:** GET returns 200 with Content-Disposition: attachment; filename="x"; Content-Type; body is file bytes. Support Range for resume. Optionally stream for large files.

### 107. What is the difference between 301 and 308?
**Answer:** 301: may change method to GET (legacy). 308 Permanent Redirect: method and body preserved. Use 308 when permanently moving POST/PUT and client must resend to new URL.

### 108. How do you handle REST API backward compatibility for new fields?
**Answer:** Add new fields as optional; don't break existing clients. Document new fields; use default or omit. For breaking change, use new version (v2) or new endpoint.

### 109. What is the purpose of the Expect header?
**Answer:** Expect: 100-continue: client sends header, waits for 100 Continue before sending body. Server responds 100 Continue or 4xx. Use for large POST to avoid sending body if server will reject.

### 110. How do you implement REST API with GraphQL alongside?
**Answer:** Expose both: REST for simple CRUD or legacy; GraphQL for flexible queries. Or use GraphQL as BFF that calls REST backends. Share auth and versioning strategy.

### 111. What is the difference between safe and idempotent for PUT?
**Answer:** PUT is idempotent (same result if repeated) but not safe (it modifies state). Safe means no side effect; PUT has side effect. GET is both safe and idempotent.

### 112. How do you implement REST API documentation with examples?
**Answer:** OpenAPI with examples in schema; or separate examples section. Provide request/response samples per endpoint; show errors. Use tools that render examples (Swagger UI, Redoc).

### 113. What is the purpose of the Via header?
**Answer:** Via indicates proxy chain (each proxy adds itself). Used for debugging and tracing. Application rarely sets; proxies add it. Can be used to detect proxy presence.

### 114. How do you implement REST API with API gateway?
**Answer:** Gateway: auth, rate limit, routing, logging. Backend services expose internal REST; gateway exposes public API. Use gateway for cross-cutting concerns; keep business logic in services.

### 115. What is the difference between REST and HTTP?
**Answer:** REST is an architectural style that uses HTTP. HTTP is the protocol (methods, status, headers). Not all HTTP APIs are RESTful (e.g. RPC over POST). REST uses HTTP semantics (methods, status codes).

### 116. How do you design REST resource for "action" that isn't a CRUD verb?
**Answer:** Model as sub-resource or use POST to action URL (e.g. POST /orders/1/cancel). Or use RPC-style POST /cancelOrder with body. Prefer noun for resource: /orders/1/cancellation or POST /orders/1/actions/cancel.

### 117. What is the purpose of the Accept-Charset header?
**Answer:** Client indicates preferred character set (e.g. utf-8). Server uses for content negotiation. Rarely used; UTF-8 is default. Use when supporting multiple encodings.

### 118. How do you implement REST API with request signing?
**Answer:** Client signs request (HMAC of method, path, timestamp, body); sends signature in header. Server verifies; reject if invalid or timestamp too old. Use for server-to-server auth and integrity.

### 119. What is the difference between REST and JSON-RPC?
**Answer:** REST is resource-oriented (nouns, HTTP methods). JSON-RPC is procedure-oriented (method name, params in body). REST uses HTTP semantics; JSON-RPC uses POST for everything. Choose by style and tooling.

### 120. How do you implement REST API with OAuth2?
**Answer:** Client gets token from auth server (authorization code, client credentials, etc.); sends Bearer token in Authorization header. Server validates token; grants or denies. Use for delegated access (user or app).

### 121. What is the purpose of the Sunset header?
**Answer:** RFC 8594: Sunset: &lt;date&gt; indicates when API or version will be retired. Use for deprecation notice; clients can plan migration. Return with deprecated endpoints.

### 122. How do you design REST for real-time updates?
**Answer:** REST is request-response; for real-time use WebSocket or SSE alongside REST. REST for CRUD; WebSocket/SSE for push. Or use long polling (not ideal). Document both in API.

### 123. What is the difference between REST and Hypermedia API?
**Answer:** REST can be hypermedia (HATEOAS) or not. Hypermedia API embeds links in response; client discovers actions. Full REST encourages HATEOAS; many "REST" APIs are JSON over HTTP without links.

### 124. How do you implement REST API with API key in query vs header?
**Answer:** Header (X-API-Key or Authorization) is preferred; not logged in URL. Query param (e.g. ?api_key=) is easier but leaks in logs and referrer. Use header for production; document both if needed.

### 125. What is the purpose of the Deprecation header?
**Answer:** Indicates API or response is deprecated (true or date). Use with Sunset for migration path. Clients can warn or migrate. Not standard but common; Sunset is RFC.

### 126. How do you design REST pagination with offset and limit?
**Answer:** Query params: ?page=1&amp;limit=10 or ?offset=0&amp;limit=10. Return total count or totalPages. Simple but inconsistent if data changes during pagination. Use for small datasets or stable data.

### 127. What is the difference between REST and OData?
**Answer:** OData is a protocol on top of HTTP for querying data (filter, orderby, expand). REST is style; OData is a specific RESTful protocol. Use OData for standardized query; plain REST for custom API.

### 128. How do you implement REST API with mutual TLS (mTLS)?
**Answer:** Client and server present certificates; TLS handshake validates both. Use for server-to-server; no token in request. Configure server to require client cert; map cert to identity.

### 129. What is the purpose of the Content-Encoding header?
**Answer:** Indicates compression of body (e.g. gzip, br). Server sets when response is compressed. Client sends Accept-Encoding; server may compress. Reduces transfer size.

### 130. How do you design REST for batch create (multiple resources)?
**Answer:** POST to collection with array in body; return 201 with list of created resources or 207 Multi-Status with per-item status. Or multiple POSTs; document behavior. Use 207 for partial success.

### 131. What is the difference between REST and JSON:API?
**Answer:** JSON:API is a specification for REST APIs (media type, structure for resources, relationships, errors). REST is style; JSON:API is a concrete format. Use JSON:API for consistency and tooling.

### 132. How do you implement REST API with JWT in cookie?
**Answer:** Set JWT in HttpOnly, Secure, SameSite cookie; server reads from cookie (no Authorization header). Use for browser-based apps; prevents XSS access. Same validation as Bearer JWT.

### 133. What is the purpose of the Accept-Datetime header?
**Answer:** Client requests resource state at a point in time (Memento protocol). Server may return 302 to time-specific URL. Use for temporal queries. Rare; most APIs don't support.

### 134. How do you design REST for "export" or "report"?
**Answer:** GET with query params (format, date range) or POST to /reports with body; return 202 with Location to job, or stream response. Use 202 + poll for long reports; stream for moderate size.

### 135. What is the difference between REST and GraphQL for nested data?
**Answer:** REST: multiple requests or ?include= (embed). GraphQL: client requests exact shape in one query. REST is fixed or over-fetch; GraphQL is flexible. Choose by client needs and backend complexity.

### 136. How do you implement REST API with scoped API key?
**Answer:** API key has scope (e.g. read_only, write). Server checks scope for each request; return 403 if insufficient. Store scope with key in DB; validate on every request. Use for fine-grained access.

### 137. What is the purpose of the Preference-Applied header?
**Answer:** Server echoes which Prefer request preferences were applied (e.g. return=representation). Use for debugging and client confirmation. Optional; part of Prefer spec.

### 138. How do you design REST for "undo" or "revert"?
**Answer:** POST to /resources/1/revert or PATCH with previous version. Store version or snapshot; revert restores. Or use action resource: POST /resources/1/actions/revert. Document idempotency.

### 139. What is the difference between REST and Falcor for data fetching?
**Answer:** Falcor (Netflix) allows querying JSON graph (paths); one request for multiple paths. REST is resource per URL. Falcor is less common; REST and GraphQL more widely used.

### 140. How do you implement REST API with IP allowlist?
**Answer:** Middleware or gateway checks client IP against allowlist; return 403 if not allowed. Use for server-to-server or admin API. Combine with auth for defense in depth.

### 141. What is the purpose of the Link header for pagination?
**Answer:** Link: &lt;next-url&gt;; rel="next", &lt;prev-url&gt;; rel="prev". Client discovers next/prev page without building URL. Use for cursor or offset pagination. Standard and cache-friendly.

### 142. How do you design REST for "duplicate" or "clone" resource?
**Answer:** POST to collection with body referencing source (e.g. { "sourceId": 1 }) or POST /resources/1/clone. Server creates copy; return 201 with Location. Use idempotency key if needed.

### 143. What is the difference between REST and tRPC for TypeScript?
**Answer:** tRPC is type-safe RPC; client and server share types. REST is untyped (OpenAPI can generate types). tRPC is great for TypeScript full-stack; REST is universal and tool-rich.

### 144. How do you implement REST API with request throttling per user?
**Answer:** Identify user (token, API key); count requests per user in window (Redis); if over limit return 429 with Retry-After. Use same logic as per-IP but keyed by user. Stricter than per-IP.

### 145. What is the purpose of the ALPN (Application-Layer Protocol Negotiation)?
**Answer:** TLS extension for negotiating protocol (h2, http/1.1). Enables HTTP/2 over HTTPS. Server and client agree on protocol during handshake. Transparent to REST API design.

### 146. How do you design REST for "merge" or "combine" resources?
**Answer:** POST to /merge with body listing resources; or PATCH one resource with merge payload. Return 200/201 with result. Define semantics (e.g. merge user profiles). Use idempotency key for POST.

### 147. What is the difference between REST and gRPC-Web?
**Answer:** gRPC-Web allows gRPC from browser (via proxy). REST is HTTP + JSON. gRPC-Web is binary and typed; REST is text and flexible. Use gRPC-Web for performance and types in browser.

### 148. How do you implement REST API with audit trail?
**Answer:** Log every request (user, method, path, timestamp, status) to DB or log store. Include in middleware; redact sensitive body. Use for compliance and debugging. Query by user or resource.

### 149. What is the purpose of the Accept-Patch header?
**Answer:** Server lists patch formats supported (e.g. application/json-patch+json). Client knows how to build PATCH body. Optional; document in API spec. Part of PATCH spec.

### 150. How do you design REST for "archive" or "soft delete"?
**Answer:** PATCH with status=archived or DELETE that sets flag. Filter archived in list (?includeArchived=false). Use 200 or 204 for delete response. Document retention and restore.

### 151. What is the difference between REST and BFF (Backend for Frontend)?
**Answer:** BFF is a backend per client that may use REST to talk to services. REST is API style; BFF is architecture. BFF aggregates REST (or other) APIs for one client. Use BFF when clients need different shapes.

### 152. How do you implement REST API with circuit breaker on client?
**Answer:** Client tracks failures per host; after threshold stop sending requests (fail fast); after timeout try again. Use library (e.g. opossum). Protects client and server from cascade. Not a server header.

### 153. What is the purpose of the MS-Author-Via header?
**Answer:** Microsoft extension for authoring (e.g. WebDAV). Rare in typical REST. Ignore unless using Microsoft authoring protocols.

### 154. How do you design REST for "approve" or "workflow" action?
**Answer:** POST to /resources/1/approve or PATCH with status=approved. Or use action resource: POST /resources/1/actions/approve. Return 200 with updated resource. Document state machine.

### 155. What is the difference between REST and event-driven (webhooks)?
**Answer:** REST is request-response (client pulls). Webhooks are server pushes (server POSTs to client URL). Use REST for CRUD; webhooks for notifications. Both can coexist in same system.

### 156. How do you implement REST API with request replay (idempotency)?
**Answer:** Client sends Idempotency-Key; server stores key with response (and TTL); duplicate request returns stored response. Use for POST (payments, orders). Prevents double submission on retry.

### 157. What is the purpose of the Delta-Link header?
**Answer:** OData: link for delta query (changes since). Rare in plain REST. Use when implementing OData or change feed. Not standard for generic REST.

### 158. How do you design REST for "bulk delete"?
**Answer:** DELETE to collection with body listing IDs, or DELETE ?ids=1,2,3. Return 200 with result or 207 with per-item status. Use 204 if no body. Document atomicity (all or nothing vs partial).

### 159. What is the difference between REST and Server-Sent Events?
**Answer:** REST is request-response. SSE is server push over HTTP (one-way). Use REST for CRUD; SSE for live updates (notifications). Same transport (HTTP); different direction.

### 160. How do you implement REST API with API version in URL path?
**Answer:** /api/v1/users, /api/v2/users. Router dispatches by version. Clear and cacheable. Support old version until clients migrate. Document version policy.

### 161. What is the purpose of the Want-Digest header?
**Answer:** Client requests digest (e.g. SHA-256) of response body in Digest header. Use for integrity check. Server may send Digest. Rare; use for critical data.

### 162. How do you design REST for "schedule" or "delayed" action?
**Answer:** POST with scheduledAt in body; return 202 with Location to job. Client polls or receives webhook when done. Or use PATCH to set scheduledAt. Document timezone and cancellation.

### 163. What is the difference between REST and CoAP?
**Answer:** CoAP is Constrained Application Protocol (IoT; UDP, small packets). REST is style; CoAP is REST-like for devices. Use CoAP for sensors/actuators; REST for servers and browsers.

### 164. How do you implement REST API with tenant isolation?
**Answer:** Identify tenant (subdomain, header, or token claim); scope all queries and data by tenant. Use middleware to set tenant context; DB row-level security or schema per tenant. Multi-tenant SaaS pattern.

### 165. What is the purpose of the Content-Language header?
**Answer:** Indicates language of response body (e.g. en, fr). Server sets for localized content. Use with Accept-Language for i18n. Optional but recommended for localized API.

### 166. How do you design REST for "invite" or "share"?
**Answer:** POST to /resources/1/invites or /resources/1/share with body (email, role). Return 201. Or use membership resource: POST /members. Document permissions and expiry.

### 167. What is the difference between REST and MQTT for IoT?
**Answer:** MQTT is pub/sub over TCP; lightweight. REST is request-response over HTTP. Use MQTT for device telemetry and commands; REST for device management and APIs. Different use cases.

### 168. How do you implement REST API with request deduplication?
**Answer:** Same as idempotency: Idempotency-Key header; server stores response by key; duplicate returns stored. Use for POST. TTL (e.g. 24h) to avoid unbounded storage.

### 169. What is the purpose of the Accept-Post header?
**Answer:** Server lists POST formats accepted (e.g. application/json). Client knows what to send. Optional; document in API. Part of POST content negotiation.

### 170. How do you design REST for "comment" or "reaction"?
**Answer:** Nested resource: POST /resources/1/comments, GET /resources/1/comments. Or /resources/1/reactions with PATCH to add. Return 201 with Location. Use sub-resource for ownership and pagination.

### 171. What is the difference between REST and WebSocket for real-time?
**Answer:** REST is pull (client requests). WebSocket is push (bidirectional). Use REST for CRUD; WebSocket for chat, live updates. REST can use SSE for one-way push as alternative.

### 172. How do you implement REST API with API key scopes (read/write)?
**Answer:** API key has scopes (e.g. read, write). Validate scope per request (e.g. GET requires read). Return 403 if scope insufficient. Store scopes with key; check in middleware.

### 173. What is the purpose of the Optional-WWW-Authenticate header?
**Answer:** Not standard. WWW-Authenticate is standard (with 401). Optional variant would hint auth is optional. Use standard WWW-Authenticate; document optional auth in API spec.

### 174. How do you design REST for "notification preferences"?
**Answer:** Sub-resource: GET/PATCH /users/1/notification-preferences. Or nested under /users/1/settings. Body has channel toggles (email, push). Use PATCH for partial update.

### 175. What is the difference between REST and SOAP for enterprise?
**Answer:** REST is lightweight (HTTP, JSON); SOAP is XML, WSDL, WS-*. Enterprise often has SOAP legacy; new APIs prefer REST. Use REST for new; SOAP when integrating with legacy.

### 176. How do you implement REST API with response caching (ETag)?
**Answer:** Compute ETag for response (hash); set ETag header. On request, if If-None-Match matches return 304. Reduces bandwidth. Use for GET; invalidate on update.

### 177. What is the purpose of the Accept-Encoding in request?
**Answer:** Client lists supported compression (gzip, br). Server may compress response and set Content-Encoding. Reduces transfer size. Server is not required to compress.

### 178. How do you design REST for "follow" or "subscribe"?
**Answer:** POST /users/1/followers with body { "userId": 2 } or POST /users/2/follow. Return 201. Or use relationship resource. Document unfollow (DELETE). Use idempotency for duplicate follow.

### 179. What is the difference between REST and HATEOAS?
**Answer:** REST is architectural style; HATEOAS (Hypermedia as Engine of Application State) is constraint: responses include links to related actions. Full REST includes HATEOAS; many APIs omit it.

### 180. How do you implement REST API with correlation ID?
**Answer:** Read or generate X-Correlation-Id in gateway; pass to all downstream; log in every service; return in response. Use for distributed tracing. Same as request ID but propagated.

### 181. What is the purpose of the Content-Location header?
**Answer:** Indicates URL of content (e.g. for 201 Created, or when content is available at different URL). Use when response body is available at another URL. Optional; Location is more common for 201.

### 182. How do you design REST for "like" or "favorite"?
**Answer:** POST /resources/1/likes or /users/1/favorites with body { "resourceId": 1 }. Return 201. DELETE to remove. Or PATCH resource with likes array. Use sub-resource for count and list.

### 183. What is the difference between REST and OpenAPI?
**Answer:** REST is style; OpenAPI is specification format (describe REST API: paths, methods, schemas). OpenAPI documents REST; tools generate clients and servers. Use OpenAPI to describe REST API.

### 184. How do you implement REST API with request validation (schema)?
**Answer:** Validate body and params against schema (JSON Schema, Zod, etc.); return 400 or 422 with errors if invalid. Use middleware or per-route. Document schema in OpenAPI.

### 185. What is the purpose of the Slug header?
**Answer:** Not standard HTTP. Slug is used in Atom Pub for suggested filename. In REST, use Content-Disposition filename for download. Ignore unless using Atom Pub.

### 186. How do you design REST for "tag" or "categorize"?
**Answer:** PATCH resource with tags array, or POST /resources/1/tags with body { "tag": "x" }. GET /resources?tag=x for filter. Use tags as first-class or embedded. Document tag list or allow free-form.

### 187. What is the difference between REST and RAML?
**Answer:** RAML is another API spec format (like OpenAPI). REST is style; RAML describes REST. Use OpenAPI or RAML to document; REST is the design. OpenAPI is more widely adopted.

### 188. How do you implement REST API with response schema validation?
**Answer:** Validate response body against schema before sending (in dev or tests). Ensures API contract. Use in tests; optional in production. OpenAPI can generate validators.

### 189. What is the purpose of the Forwarded header?
**Answer:** Standard replacement for X-Forwarded-*: Forwarded: for=client, host=original, proto=https. Use when behind proxy to get original request info. Parse and trust from known proxy only.

### 190. How do you design REST for "version" or "revision" of resource?
**Answer:** Sub-resource: GET /resources/1/versions or /resources/1?version=2. Or version in URL: /resources/1/v/2. Return specific version; support version comparison. Document versioning semantics.

### 191. What is the difference between REST and Swagger?
**Answer:** Swagger is former name of OpenAPI; Swagger UI is tool to render OpenAPI. REST is style; Swagger/OpenAPI describes it. Use Swagger UI for interactive docs; OpenAPI for spec.

### 192. How do you implement REST API with rate limit headers on response?
**Answer:** Set X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset on every response. Client can throttle before hitting 429. Optional but improves client UX. Use with rate limit middleware.

### 193. What is the purpose of the Priority header?
**Answer:** HTTP/2 and HTTP/3: hint for stream priority. Affects multiplexing order. Rare in REST API design; more for browser and server internals. Optional.

### 194. How do you design REST for "draft" vs "published"?
**Answer:** Resource has status (draft, published). PATCH to change; or POST /resources/1/publish. List with ?status=published. Use workflow; document transitions. Consider version on publish.

### 195. What is the difference between REST and AsyncAPI?
**Answer:** AsyncAPI describes async APIs (message queues, events). REST is sync request-response. Use AsyncAPI for event-driven; OpenAPI for REST. Different protocols.

### 196. How do you implement REST API with CORS preflight cache?
**Answer:** Set Access-Control-Max-Age on OPTIONS response; browser caches preflight. Reduces OPTIONS requests. Use for stable CORS config. Max-Age in seconds.

### 197. What is the purpose of the Signature header (HTTP Signatures)?
**Answer:** Draft standard for signing request/response (keyId, algorithm, signature). Use for integrity and auth. Similar to request signing. Not yet universal; custom signing is common.

### 198. How do you design REST for "template" or "copy from"?
**Answer:** POST to collection with body { "templateId": 1 } or POST /templates/1/copy. Server creates from template; return 201 with Location. Use for creating from blueprint.

### 199. What is the difference between REST and Webhook?
**Answer:** REST is client-initiated (client calls server). Webhook is server-initiated (server calls client URL on event). Use REST for API; webhook for notifications. Complementary.

### 200. How do you implement REST API with health check (liveness vs readiness)?
**Answer:** GET /health returns 200 if process is up (liveness). GET /ready returns 200 only if dependencies (DB, cache) are OK (readiness). Use for K8s probes; don't send traffic if not ready.

### 201. What is the purpose of the Cache-Status header?
**Answer:** Draft: indicates cache result (hit, miss, stale). Use for debugging and monitoring. Not standard yet; CDNs may use. Optional.

### 202. How do you design REST for "permission" or "role" on resource?
**Answer:** Sub-resource: GET/POST/DELETE /resources/1/permissions or /resources/1/roles. Or PATCH resource with permissions array. Use RBAC; document role list. Return 403 when insufficient.

### 203. What is the difference between REST and Server-Sent Events (SSE)?
**Answer:** REST is request-response. SSE is server push (one-way) over HTTP. Use REST for CRUD; SSE for live stream (notifications). Same origin; SSE is EventSource API.

### 204. How do you implement REST API with request size limit?
**Answer:** Reject body larger than limit (e.g. 10MB); return 413 Payload Too Large. Set in body parser or middleware. Protect against DoS. Document limit in API spec.

### 205. What is the purpose of the Sec-Fetch-* headers?
**Answer:** Browser sets Sec-Fetch-Dest, Sec-Fetch-Mode, etc. Indicates request context (e.g. navigate, cors). Use for security (CSRF, etc.). Read-only for server; don't rely for auth alone.

### 206. How do you design REST for "reminder" or "scheduled task"?
**Answer:** POST /reminders with body (resourceId, at, message). Or PATCH resource with reminderAt. Return 201. Server runs job at time; optionally send webhook or push. Document timezone.

### 207. What is the difference between REST and GraphQL subscription?
**Answer:** REST has no built-in subscription; use SSE or WebSocket. GraphQL has subscription (over WebSocket). For real-time, REST uses separate channel; GraphQL integrates subscription in same API.

### 208. How do you implement REST API with API version in Accept header?
**Answer:** Accept: application/vnd.api+v1+json. Server parses version; dispatches to handler. No URL change; cache key must include version. Document media type. Less common than URL versioning.

### 209. What is the purpose of the Cross-Origin-Resource-Policy header?
**Answer:** CORP: controls which origins can load resource (same-origin, same-site, cross-origin). Use for isolation. Prevents cross-origin read. Security header.

### 210. How do you design REST for "activity" or "audit log"?
**Answer:** GET /resources/1/activities or /audit-logs?resourceId=1. Read-only; paginate. Filter by actor, action, date. Use for compliance and debugging. Consider retention and size.

### 211. What is the difference between REST and gRPC streaming?
**Answer:** REST is one request-one response (or chunked). gRPC has server streaming, client streaming, bidirectional. Use REST for simple request-response; gRPC for streams and performance.

### 212. How do you implement REST API with API key in header (custom)?
**Answer:** X-API-Key: &lt;key&gt; or Authorization: ApiKey &lt;key&gt;. Validate in middleware; map to user/tenant. Return 401 if invalid. Prefer standard Authorization; X-API-Key is common.

### 213. What is the purpose of the Permissions-Policy header?
**Answer:** Replaces Feature-Policy; controls browser features (camera, geolocation, etc.). Use to restrict features in iframe or page. Security and privacy. Not directly REST; applies to HTML delivery.

### 214. How do you design REST for "search" with filters?
**Answer:** GET /resources?q=term&amp;filter=field:value&amp;sort=field&amp;order=asc. Return 200 with list. Document params; use consistent names. Consider max limit and allowed filters.

### 215. What is the difference between REST and MQTT for messaging?
**Answer:** REST is HTTP request-response. MQTT is pub/sub over TCP (lightweight). Use REST for APIs; MQTT for device messaging and IoT. Different layers and use cases.

### 216. How do you design REST for "export" (bulk download)?
**Answer:** GET /resources/export?format=csv&amp;ids=1,2,3 or POST /exports with body. Return 202 with job id or stream response. Use for reports; consider async for large exports. Rate limit.

### 217. What is the purpose of the Accept-Patch header?
**Answer:** Server advertises supported patch formats (e.g. application/json-patch+json). Client uses in PATCH. Use for content negotiation on PATCH. Optional; document in API docs.

### 218. How do you implement REST API versioning with URL path?
**Answer:** /v1/resources, /v2/resources. Router per version; or prefix middleware. Use for breaking changes. Document deprecation and sunset. Prefer path over header for clarity.

### 219. What is the difference between 401 and 403?
**Answer:** 401 Unauthorized: not authenticated (no or invalid credentials). 403 Forbidden: authenticated but not allowed. Use 401 for login; 403 for permission denied. Don't leak existence with 403.

### 220. How do you design REST for "invite" or "share"?
**Answer:** POST /resources/1/invites or /shares with { email, role }. Return 201 with invite link or token. GET to list; DELETE to revoke. Use for collaboration. Optional expiry.

### 221. Explain idempotency in REST.
**Answer:** Same request multiple times = same effect as once. GET, PUT, DELETE are idempotent; POST is not. Use Idempotency-Key for POST to make safe. Use for payments and duplicate prevention.

### 222. How do you implement REST API with OAuth2 client credentials?
**Answer:** Client gets token from token endpoint (client_id, client_secret); use Bearer token in requests. Use for server-to-server. No user context. Secure secret storage.

### 223. What is the purpose of the Retry-After header?
**Answer:** Server sends with 503 or 429; value is seconds or date. Client should wait before retry. Use for rate limit and maintenance. Optional; client may use backoff anyway.

### 224. How do you design REST for "duplicate" or "clone"?
**Answer:** POST /resources/1/duplicate or POST /resources with sourceId. Return 201 with new resource. Use for copy. Optional query for deep vs shallow. Idempotency-Key if needed.

### 225. What is the difference between REST and GraphQL subscription?
**Answer:** REST has no built-in subscription; use polling or WebSocket separately. GraphQL has subscription over WebSocket. Use REST for request-response; GraphQL for real-time when needed.

### 226. How do you implement REST API documentation with OpenAPI 3?
**Answer:** Write YAML/JSON spec (paths, schemas, security); serve with Swagger UI or ReDoc. Use for interactive docs and client generation. Keep spec in sync with code.

### 227. What is the purpose of the Vary header?
**Answer:** Vary lists headers that affect response (e.g. Accept-Encoding). Caches use for cache key. Use for correct caching when response varies by header. Important for CDN.

### 228. How do you design REST for "archive" or "soft delete"?
**Answer:** PATCH /resources/1 with { archived: true } or DELETE with soft delete. Filter archived in list (query param ?includeArchived). Use for recoverable delete. Document behavior.

### 229. Explain HATEOAS in practice.
**Answer:** Responses include links to related actions (self, edit, delete, next page). Client discovers API from links. Use for flexibility; often skipped for simplicity. Document links in API docs.

### 230. How do you implement REST API with JWT in cookie?
**Answer:** Set httpOnly, secure cookie with token; send automatically. Validate cookie in middleware. Use for XSS-safe auth. SameSite for CSRF. Prefer cookie over header for browser.

### 231. What is the purpose of the Content-Range header?
**Answer:** Sent with 206 Partial Content; indicates range of response (e.g. bytes 0-499/1000). Use for range requests and pagination of large response. Client requests Range; server responds with Content-Range.

### 232. How do you design REST for "merge" (e.g. merge users)?
**Answer:** POST /resources/merge with { sourceIds, targetId }. Return 200 or 202. Use for consolidating records. Define merge rules (which fields win). Idempotency-Key recommended.

### 233. What is the difference between PUT and PATCH?
**Answer:** PUT replaces resource (full update). PATCH partial update (only sent fields). Use PUT when client sends full resource; PATCH for partial. PATCH is safer for large resources.

### 234. How do you implement REST API rate limiting response?
**Answer:** Return 429 with Retry-After; headers X-RateLimit-Limit, Remaining, Reset. Use for fair usage. Document limits. Client should respect Retry-After and backoff.

### 235. What is the purpose of the Allow header?
**Answer:** Allow lists methods allowed on resource (GET, POST, ...). Sent with 405. Use for discovery. Optional; document in API docs. Client can use for OPTIONS response.

### 236. How do you design REST for "restore" (from archive)?
**Answer:** PATCH /resources/1 with { archived: false } or POST /resources/1/restore. Return 200. Use after soft delete. Document; consider audit log.

### 237. Explain content negotiation in REST.
**Answer:** Client sends Accept; server returns representation (JSON, XML, etc.). Use Accept and Content-Type. Use for multiple formats. JSON is default for APIs; document others.

### 238. How do you implement REST API with API gateway?
**Answer:** Gateway routes, auth, rate limit, transform. Backend services behind gateway. Use for central auth and cross-cutting. Kong, AWS API Gateway, etc. Document gateway config.

### 239. What is the purpose of the Location header?
**Answer:** Sent with 201 Created; URL of new resource. Client can GET resource. Use for POST response. Required for 201 in REST. Optional for other statuses.

### 240. How do you design REST for "bulk" operations?
**Answer:** POST /resources/bulk with array; return 207 Multi-Status or 200 with results per item. Use for batch create/update. Limit batch size; document. Consider partial success.

### 241. What is the difference between REST and SOAP?
**Answer:** REST uses HTTP, JSON/XML, simple. SOAP is XML, WSDL, strict. REST is lighter and common for web APIs; SOAP for enterprise. Choose REST for most new APIs.

### 242. How do you implement REST API error response format?
**Answer:** Consistent body: { error: { code, message }, details? }. Use for 4xx/5xx. Document codes. Include request id for support. Don't expose stack in production.

### 243. What is the purpose of the ETag header?
**Answer:** ETag is opaque identifier of resource version. Use for conditional GET (If-None-Match) and 304. Use for caching and optimistic concurrency (If-Match for PUT). Strong or weak ETag.

### 244. How do you design REST for "preview" or "draft"?
**Answer:** POST /resources with draft: true or PATCH to set status. GET returns draft; publish via PATCH or POST /publish. Use for content workflow. Filter drafts in list.

### 245. Explain statelessness in REST.
**Answer:** Server doesn't store client state; each request has all needed info (auth, params). Use token or session cookie for auth. Enables scaling and simplicity. Don't rely on server-side session for API.

### 246. How do you implement REST API with CORS?
**Answer:** Set Access-Control-Allow-Origin (or dynamic); Allow-Methods, Allow-Headers; credentials if needed. Use for browser clients. Validate origin; never * with credentials.

### 247. What is the purpose of the If-Match header?
**Answer:** Client sends with PUT/PATCH; value is ETag. Server returns 412 if ETag doesn't match. Use for optimistic concurrency. Prevents lost update. Use ETag from GET.

### 248. How do you design REST for "approval" workflow?
**Answer:** PATCH /resources/1 with { status: 'approved' } or POST /resources/1/approve. Use roles; return 403 if not allowed. Use for workflow. Optional: GET /pending-approvals.

### 249. What is the difference between 200 and 204?
**Answer:** 200 OK: response has body. 204 No Content: success, no body. Use 204 for DELETE or PUT/PATCH when no representation returned. Use 200 when returning updated resource.

### 250. How do you implement REST API pagination with cursor?
**Answer:** GET /resources?cursor=abc&amp;limit=20. Return next cursor in response or Link header. Use for large lists; stable under insert/delete. Prefer over offset for consistency.

### 251. What is the purpose of the Prefer header?
**Answer:** Client requests preference (e.g. return=representation, wait=30). Server may honor. Use for conditional response (return body on create). Optional; document support.

### 252. How do you design REST for "revert" or "undo"?
**Answer:** POST /resources/1/revert or PATCH with previous version. Store history or version; revert to version. Use for audit and undo. Document scope (last change vs version).

### 253. Explain resource naming in REST.
**Answer:** Use nouns (not verbs); plural for collections (/users). Use hierarchy when it's ownership (/users/1/orders). Keep URLs short and consistent. Use kebab-case or camelCase consistently.

### 254. How do you implement REST API with request validation?
**Answer:** Validate body, params, query (schema); return 400 with details on error. Use Zod, Joi, or OpenAPI. Document schema. Validate early; consistent error format.

### 255. What is the purpose of the Link header?
**Answer:** Link contains URLs for related resources (next, prev, canonical). Use for pagination and discovery. Format: &lt;url&gt;; rel="next". Use for API discovery and clients.

### 256. How do you design REST for "notification" preferences?
**Answer:** GET/PATCH /users/me/notification-preferences or nested under /users/1/settings. Use for opt-in/out. Document keys. Use PATCH for partial update.

### 257. What is the difference between 404 and 410?
**Answer:** 404 Not Found: resource doesn't exist or no permission. 410 Gone: existed but permanently removed. Use 410 for deprecated or deleted. Client may remove from cache.

### 258. How do you implement REST API versioning with header?
**Answer:** Accept-Version: 1 or X-API-Version: 1. Middleware reads and routes. Same URL, different handler. Use for version negotiation. Document header. Less visible than path.

### 259. What is the purpose of the Cache-Control header?
**Answer:** Controls caching (max-age, no-cache, no-store, private, public). Use for performance and freshness. Set on response. Use for static and cacheable API. Document TTL.

### 260. How do you design REST for "favorite" or "bookmark"?
**Answer:** POST /resources/1/favorites or PUT /users/me/favorites/1. DELETE to remove. GET /users/me/favorites for list. Use for user-specific lists. Consider collection resource.

### 261. Explain safe methods in REST.
**Answer:** GET, HEAD, OPTIONS are safe (no side effect). PUT, POST, PATCH, DELETE are not. Use safe for read; don't change state. Idempotent: GET, HEAD, PUT, DELETE (same effect if repeated).

### 262. How do you implement REST API with compression?
**Answer:** Support Accept-Encoding: gzip; respond with Content-Encoding: gzip when accepted. Use for large responses. Set Vary: Accept-Encoding. Optional for JSON; useful for large payloads.

### 263. What is the purpose of the If-None-Match header?
**Answer:** Client sends with GET; value is ETag. Server returns 304 if ETag matches. Use for conditional GET and cache revalidation. Reduces bandwidth. Use ETag from previous response.

### 264. How do you design REST for "template" (create from template)?
**Answer:** POST /resources with templateId or POST /templates/1/instantiate. Return 201 with new resource. Use for cloning config. Document templates. Idempotency-Key optional.

### 265. What is the difference between REST and RPC-style HTTP?
**Answer:** REST is resource-oriented (nouns, HTTP methods). RPC is action-oriented (verbs in URL or body). Use REST for CRUD; RPC for procedures. REST is more cacheable and standard.

### 266. How do you implement REST API health check?
**Answer:** GET /health returns 200 and { status: 'ok' }. Optional: check DB, cache. Use for load balancer and k8s. Keep fast; no auth. Use /ready for dependencies.

### 267. What is the purpose of the WWW-Authenticate header?
**Answer:** Sent with 401; indicates auth scheme (Bearer, Basic) and params (realm). Client uses to get credentials. Use for challenge. Required for 401 when auth is possible.

### 268. How do you design REST for "schedule" or "recurrence"?
**Answer:** Resource with schedule (cron or RRULE); PATCH to update. Or sub-resource /resources/1/schedule. Use for recurring events. Document format. Consider timezone.

### 269. Explain HTTP methods in REST.
**Answer:** GET read; POST create; PUT replace; PATCH partial update; DELETE remove; HEAD like GET no body; OPTIONS allowed methods. Use correctly for semantics and caching.

### 270. How do you implement REST API with OpenAPI code generation?
**Answer:** Write OpenAPI spec; generate client/server with openapi-generator or similar. Use for type-safe client. Keep spec in sync. Use for SDK and consistency.

### 271. What is the purpose of the Content-Location header?
**Answer:** Indicates URL of representation (e.g. for 201 or 303). Use when response URL differs from request. Optional. Use for redirect to canonical URL. Rare.

### 272. How do you design REST for "comment" or "review"?
**Answer:** POST /resources/1/comments with body; GET to list; PATCH/DELETE for own. Use nested or /comments?resourceId=1. Paginate. Consider moderation. Use for feedback.

### 273. What is the difference between 400 and 422?
**Answer:** 400 Bad Request: malformed (syntax, invalid JSON). 422 Unprocessable Entity: valid syntax but semantic error (validation). Use 422 for validation errors. Both are client error.

### 274. How do you implement REST API idempotency?
**Answer:** Client sends Idempotency-Key (header or body); server stores result by key; return same response on replay. Use for POST/PATCH. TTL for keys. Document key format.

### 275. What is the purpose of the Range header?
**Answer:** Client requests range of resource (bytes=0-499). Server returns 206 with Content-Range. Use for large file download and resume. Use for partial content. Support optional.

### 276. How do you design REST for "tag" or "label"?
**Answer:** GET/PATCH /resources/1/tags or /resources?tag=x. Use array or relation. PATCH to set; GET to filter. Use for categorization. Consider tag namespace and limit.

### 277. Explain idempotency key in REST.
**Answer:** Client sends unique key (UUID) with POST; server deduplicates; return same response if key seen. Use for payments and retries. Store key with TTL. Document in API docs.

### 278. How do you implement REST API with request ID?
**Answer:** Generate or read X-Request-Id; set on request and response; log everywhere. Use for tracing and support. Propagate to downstream. UUID or similar. Document header.

### 279. What is the purpose of the If-Modified-Since header?
**Answer:** Client sends with GET; value is date. Server returns 304 if not modified since. Use for conditional GET. Use with Last-Modified. Simpler than ETag for date-based resources.

### 280. How do you design REST for "version" or "revision"?
**Answer:** GET /resources/1/versions or /resources/1?version=2. Use for history and rollback. Optional: POST to restore version. Use for audit. Consider retention.

### 281. What is the difference between REST and WebSocket?
**Answer:** REST is request-response over HTTP. WebSocket is full-duplex over single connection. Use REST for API; WebSocket for real-time. Different protocols; use both when needed.

### 282. How do you implement REST API with correlation ID?
**Answer:** Same as request ID; propagate X-Correlation-Id to services; log in each. Use for distributed tracing. Same as request id for many APIs. Document header.

### 283. What is the purpose of the Last-Modified header?
**Answer:** Server sends with GET; date of last change. Client uses If-Modified-Since next time. Use for conditional GET and 304. Less precise than ETag; use for date-based resources.

### 284. How do you design REST for "subscription" (recurring)?
**Answer:** POST /subscriptions with plan, billing; GET/PATCH/DELETE. Use for SaaS billing. Webhook for renewal. Consider trial and cancel. Use for recurring revenue.

### 285. Explain REST and HTTP status code categories.
**Answer:** 2xx success; 3xx redirect; 4xx client error; 5xx server error. Use correct code for semantics. 200/201/204 for success; 400/401/403/404/422 for client; 500/503 for server.

### 286. How do you implement REST API with API key in query (legacy)?
**Answer:** ?api_key=xxx. Not recommended (logs, referrer). Use header instead. Support for legacy clients only. Document deprecation. Prefer Authorization or X-API-Key header.

### 287. What is the purpose of the Accept header?
**Answer:** Client sends preferred response type (application/json, etc.). Server uses for content negotiation. Use for API format. Default JSON; document others. Use for version optional.

### 288. How do you design REST for "analytics" or "stats"?
**Answer:** GET /resources/stats or /analytics?from=&amp;to=&amp;metric=. Return aggregated data. Use for dashboards. Consider caching and range limit. Document metrics. Optional real-time.

### 289. What is the difference between 500 and 503?
**Answer:** 500 Internal Server Error: unexpected error. 503 Service Unavailable: overloaded or maintenance. Use 503 for retry; 500 for bug. Client may retry 503 with backoff.

### 290. How do you implement REST API with deprecation header?
**Answer:** Set Deprecation: true or Sunset: date on deprecated endpoints. Use for warning clients. Document migration. RFC 8594. Use for version sunset. Optional Retry-After.

### 291. What is the purpose of the Content-Type header?
**Answer:** Request: type of body (application/json). Response: type of body. Use for parsing. Required for body. Use application/json for API. Document charset if needed.

### 292. How do you design REST for "webhook" delivery?
**Answer:** Client registers URL; server POSTs events. Use retry and signature. Document events and payload. Use for async notification. Consider idempotency and timeout.

### 293. Explain REST resource hierarchy.
**Answer:** Use nested URLs for ownership: /users/1/orders. Don't nest too deep (3 levels max). Use flat with query when equal: /orders?userId=1. Balance clarity and length.

### 294. How do you implement REST API with response schema?
**Answer:** Document response in OpenAPI; validate in dev optional. Use for contract. Consistent shape. Use for client generation. Optional runtime validation. Document in spec.

### 295. What is the purpose of the X-Request-Id header?
**Answer:** Client or server sets unique request id. Use for logging and support. Propagate to response and downstream. Use for tracing. Document as optional or required. UUID recommended.

### 296. How do you design REST for "permission" or "role"?
**Answer:** GET/PATCH /users/1/permissions or /roles. Use for RBAC. Nested or separate resource. Document roles. Use for authorization. Consider scope (global vs resource).

### 297. What is the difference between REST and gRPC?
**Answer:** REST is HTTP/JSON; human-readable; wide support. gRPC is HTTP/2, binary, codegen. Use REST for public API; gRPC for internal and performance. Different tradeoffs.

### 298. How do you implement REST API with CORS preflight?
**Answer:** Respond to OPTIONS with Allow-Origin, Allow-Methods, Allow-Headers; 204. Set Max-Age for cache. Use for browser. Handle OPTIONS on all routes or middleware. Same as CORS.

### 299. What is the purpose of the Authorization header?
**Answer:** Carries credentials: Bearer &lt;token&gt;, Basic &lt;base64&gt;, etc. Use for auth. Validate in middleware. Document scheme. Use for API auth. Standard header.

### 300. How do you design REST for "import" (bulk create)?
**Answer:** POST /resources/import with file or body array; return 202 with job id or 200 with results. Use for bulk create. Limit size; document format. Consider async for large.

### 301. Explain REST and security (auth, HTTPS, CORS).
**Answer:** Use HTTPS; validate CORS; auth (Bearer, API key); rate limit; validate input; don't expose internals. Use for production. Document security. Consider OWASP.

### 302. How do you implement REST API with versioning and deprecation?
**Answer:** Support multiple versions (path or header); set Deprecation/Sunset on old; document migration. Use for breaking changes. Communicate timeline. Remove after sunset.

### 303. What is the purpose of the X-RateLimit-* headers?
**Answer:** X-RateLimit-Limit, Remaining, Reset (and Retry-After on 429). Use for rate limit feedback. Client can throttle. Document in API docs. Optional but helpful. Various names (GitHub, etc.).

### 304. How do you design REST for "dependency" (e.g. task depends on task)?
**Answer:** POST /tasks/1/dependencies with { taskId: 2 }; GET to list; DELETE to remove. Use for graph. Validate no cycle. Use for project/task management. Document semantics.

### 305. What is the difference between REST and GraphQL?
**Answer:** REST: fixed endpoints, over/under fetch. GraphQL: single endpoint, client queries shape. Use REST for simple CRUD; GraphQL for flexible query. Different paradigms; choose by need.

### 306. How do you implement REST API with request logging?
**Answer:** Log method, path, status, duration, request id; redact auth and body in prod. Use for debugging and audit. Structured JSON. Don't log PII without policy. Use middleware.

### 307. What is the purpose of the If-Unmodified-Since header?
**Answer:** Client sends with PUT/DELETE; server returns 412 if modified since. Use for optimistic concurrency. Use with Last-Modified. Less common than If-Match/ETag. Use for simple concurrency.

### 308. How do you design REST for "link" (relation between resources)?
**Answer:** POST /resources/1/links with { targetId, type }; GET to list; DELETE to remove. Use for many-to-many or graph. Document relation types. Use for associations. Consider bidirectional.

### 309. Explain REST and caching (Cache-Control, ETag).
**Answer:** Set Cache-Control (max-age, etc.); use ETag for validation. Use for performance. 304 on If-None-Match. Document cacheable endpoints. Use for GET. Don't cache with auth sensitive data without care.

### 310. How do you implement REST API with health and readiness?
**Answer:** GET /health for liveness (200 = up). GET /ready for readiness (DB, etc.). Use for k8s. Return 503 when not ready. Keep fast. Document. Use for orchestration.

### 311. What is the purpose of the OPTIONS method?
**Answer:** Returns allowed methods and CORS headers. Use for preflight. Server responds with Allow and CORS headers. Use for discovery. Optional; many APIs support for CORS only. Document.

### 312. How do you design REST for "audit" (who changed what)?
**Answer:** Store audit log (resource, action, actor, timestamp); GET /resources/1/audit or /audit?resourceId=1. Use for compliance. Paginate. Consider retention. Use for accountability.

