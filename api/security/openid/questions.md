# OpenID Connect - Interview Questions

## Questions (1-10)

### 1. What is OpenID Connect?
**Answer:** Authentication protocol built on OAuth 2.0. Adds authentication to OAuth's authorization, provides user identity information.

### 2. How does OpenID Connect relate to OAuth 2.0?
**Answer:** Built on OAuth 2.0, adds ID token for authentication, standardizes user information, provides identity layer.

### 3. What is an ID token?
**Answer:** JWT containing user identity information. Includes user ID, authentication time, issuer, audience. Signed by authorization server.

### 4. What is the difference between ID token and access token?
**Answer:** ID token: user identity, for client, contains user info. Access token: authorization, for API, access resources.

### 5. What are OpenID Connect scopes?
**Answer:** Define what information requested. openid (required), profile, email, phone, address. Control user data access.

### 6. What is userinfo endpoint?
**Answer:** API endpoint returning user profile information. Accessed with access token, returns claims about authenticated user.

### 7. How does OpenID Connect flow work?
**Answer:** Similar to OAuth 2.0, includes openid scope, returns ID token + access token, can fetch userinfo with access token.

### 8. What is the difference between authentication and authorization?
**Answer:** Authentication: verify identity (who are you). Authorization: verify permissions (what can you do). OIDC does authn, OAuth does authz.

### 9. What are OpenID Connect claims?
**Answer:** Information about user. Standard claims: sub, name, email, picture. Custom claims for additional information.

### 10. How do you implement OpenID Connect?
**Answer:** Register client, redirect to authorization endpoint with openid scope, receive ID token, validate token, extract user info.

