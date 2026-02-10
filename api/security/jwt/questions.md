# JWT - Interview Questions

## Questions (1-15)

### 1. What is JWT? Explain its structure.
**Answer:** JWT is token format with three parts: header.payload.signature, all base64url encoded.

### 2. What are the three parts of a JWT?
**Answer:** Header (algorithm, type), Payload (claims), Signature (verification)

### 3. How does JWT authentication work?
**Answer:** User logs in, server creates JWT, client stores token, includes in requests, server verifies.

### 4. What are the advantages of JWT?
**Answer:** Stateless, scalable, self-contained, compact, standard format

### 5. What are the disadvantages of JWT?
**Answer:** Larger size, can't revoke before expiration, payload visible (base64), security if stolen

### 6. How do you store JWTs securely?
**Answer:** httpOnly cookies (preferred), or localStorage with XSS protection. Never in URL.

### 7. What is the difference between HS256 and RS256?
**Answer:** HS256 uses symmetric key (same secret), RS256 uses asymmetric (public/private keys).

### 8. What happens if a JWT is stolen?
**Answer:** Attacker can use it until expiration. Mitigate with short expiration, refresh tokens, token rotation.

### 9. How do you invalidate a JWT before expiration?
**Answer:** Use token blacklist (Redis), refresh tokens, or shorter expiration times.

### 10. What is a refresh token?
**Answer:** Long-lived token used to obtain new access tokens without re-authentication.

### 11. Explain the difference between access token and refresh token.
**Answer:** Access token: short-lived, used for API calls. Refresh token: long-lived, used to get new access tokens.

### 12. What claims should you include in a JWT?
**Answer:** User ID, expiration, issued at, issuer. Avoid sensitive data, keep payload small.

### 13. How do you handle JWT expiration?
**Answer:** Check `exp` claim, return 401 if expired, client uses refresh token to get new token.

### 14. What security measures should you implement with JWTs?
**Answer:** HTTPS, short expiration, secure storage, strong secrets, signature validation, refresh tokens.

### 15. When would you use JWT vs session-based authentication?
**Answer:** JWT: stateless, distributed systems, mobile apps. Sessions: traditional web apps, need revocation.

