# OAuth - Interview Questions

## Questions (1-10)

### 1. What is OAuth?
**Answer:** Authorization framework allowing third-party applications to access user resources without sharing passwords.

### 2. What is the difference between OAuth 1.0 and OAuth 2.0?
**Answer:** OAuth 1.0: complex, signature-based. OAuth 2.0: simpler, token-based, more widely adopted, better for web/mobile.

### 3. What are the OAuth 2.0 roles?
**Answer:** Resource Owner (user), Client (application), Authorization Server (issues tokens), Resource Server (API).

### 4. What is the OAuth 2.0 flow?
**Answer:** 1) Redirect to authorization server, 2) User authorizes, 3) Authorization code returned, 4) Exchange code for token, 5) Use token for API calls.

### 5. What are OAuth 2.0 grant types?
**Answer:** Authorization Code (web apps), Client Credentials (server-to-server), Implicit (deprecated), Refresh Token, Device Code.

### 6. What is the difference between OAuth and authentication?
**Answer:** OAuth is authorization (permission to access resources). Authentication verifies identity. Often used together (OAuth 2.0 + OpenID Connect).

### 7. What is an access token?
**Answer:** Credential used to access protected resources. Short-lived, issued by authorization server, included in API requests.

### 8. What is a refresh token?
**Answer:** Long-lived token used to obtain new access tokens. More secure, stored securely, rotated on use.

### 9. How do you secure OAuth implementation?
**Answer:** Use HTTPS, validate redirect URIs, store secrets securely, use PKCE for mobile, validate tokens, implement token revocation.

### 10. What is OpenID Connect?
**Answer:** Authentication layer on top of OAuth 2.0. Adds ID token (user identity), standardizes authentication, profile information.

