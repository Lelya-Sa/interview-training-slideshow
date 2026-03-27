# JWT (JSON Web Tokens) - Interview Material

## Definition
JWT is a compact, URL-safe token format for securely transmitting information between parties as JSON objects.

## Structure

JWT consists of three parts separated by dots (.):

```
header.payload.signature
```

### 1. Header
- Algorithm used for signing (e.g., HS256, RS256)
- Token type (JWT)

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### Header Fields Explained

**`typ` (Type)** - Token Type
- **Purpose**: Identifies the format/type of the token
- **Standard Value**: `"JWT"` (most common, used in 99% of cases)
- **Other Values**: Can include other types like `"secevent+jwt"` (Security Event Tokens), `"nested+jwt"` (nested JWTs), or custom types
- **Optional**: This field is optional according to JWT spec
- **Meaning**: Tells the server what type of token this is
- **Analogy**: Like a label saying "This is a letter"
- **Note**: For interview purposes and most applications, you'll see `"JWT"` almost exclusively

**`alg` (Algorithm)** - Signing Algorithm
- **Purpose**: Specifies which algorithm was used to sign the token
- **Values**: Can vary (e.g., `"HS256"`, `"RS256"`, `"ES256"`)
- **Meaning**: Tells the server which method to use for verification
- **Analogy**: Like a label saying "This was sealed with method #2"

**`cty` (Content Type)** - Content Type (Optional)
- **Purpose**: Identifies the media type of the **payload content** (not the token itself)
- **When Used**: Primarily for **nested JWTs** (when a JWT contains another JWT as its payload)
- **Common Value**: `"JWT"` (when payload is another JWT)
- **Optional**: Only needed when payload contains nested content
- **Meaning**: Tells the server what type of content is in the payload
- **Analogy**: Like a label on an envelope saying "Contains: Another envelope"

**Key Difference Between `typ` and `cty`:**
- **`typ`** = Media type of the **entire token** (the JWT structure itself)
- **`cty`** = Media type of the **payload content** (what's inside the payload)

**Example - Nested JWT:**
```json
{
  "alg": "HS256",
  "typ": "JWT",        // ← This token is a JWT
  "cty": "JWT"         // ← The payload contains another JWT
}
```

**Additional Standard Header Parameters:**

**`kid` (Key ID)** - Key Identifier
- **Purpose**: Identifies which key was used to sign the token
- **Use Case**: When server uses multiple keys (key rotation, different algorithms)
- **Format**: String identifier agreed upon between parties
- **Example**: `"kid": "key-2024-01"` or `"kid": "rsa-key-1"`
- **When Used**: Key rotation, multiple signing keys, key management systems

**Other Standard Parameters** (less common):
- **`jku`** (JSON Web Key Set URL): URL pointing to set of keys
- **`x5u`** (X.509 URL): URL pointing to X.509 certificate
- **`x5c`** (X.509 Certificate Chain): Array of X.509 certificates
- **`x5t`** (X.509 Certificate SHA-1 Thumbprint): Certificate thumbprint

**Custom/Private Header Parameters:**
- **Description**: Parameters that two parties agree upon (not standardized)
- **Format**: Any custom parameter name (often prefixed like `"x-custom-"` or company-specific)
- **Use Case**: Custom metadata, proprietary information, agreed-upon conventions
- **Example**: `"x-version": "2.0"`, `"x-client-id": "mobile-app"`, `"company-tenant": "tenant-123"`
- **Important**: Both parties must agree on meaning and validate these parameters

**Example - Header with Custom Parameters:**
```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "rsa-key-2024",           // ← Standard: identifies which key
  "x-version": "2.0",               // ← Custom: agreed upon by parties
  "x-client-type": "mobile"         // ← Custom: agreed upon by parties
}
```

**Summary of Header Parameters:**
| Field | Purpose | Standard Value | When Used |
|-------|---------|----------------|-----------|
| `typ` | What format is this token? | `"JWT"` (most common) | Always (optional, but recommended) |
| `alg` | How was it signed? | `"HS256"`, `"RS256"`, etc. | Always (required) |
| `cty` | What's in the payload? | `"JWT"` (for nested JWTs) | Only for nested JWTs (optional) |
| `kid` | Which key was used? | Custom identifier | Key rotation, multiple keys (optional) |
| Custom | Agreed-upon metadata | Any value | As needed by parties (optional) |

**Common `typ` Values:**

1. **`"JWT"`** - Standard JSON Web Token
   - **Description**: The default and most common type
   - **Use Case**: Standard authentication/authorization tokens
   - **Prevalence**: Used in 99% of applications
   - **Example**: Access tokens, ID tokens in OAuth/OpenID Connect

2. **`"secevent+jwt"`** - Security Event Token (SET)
   - **Description**: Security Event Token specification (RFC 8417)
   - **Use Case**: Security event notifications, logging security events
   - **Example**: Notification when a user changes password, account locked, etc.
   - **Note**: Used in security event streaming protocols

3. **`"nested+jwt"`** - Nested JWT
   - **Description**: JWT containing another JWT as its payload
   - **Use Case**: Encrypted JWTs (JWE) containing signed JWTs (JWS) inside
   - **Example**: When you need to both encrypt and sign a token
   - **Note**: Less common, used in advanced security scenarios

4. **Custom Types** - Application-specific
   - **Description**: Applications can define their own types
   - **Format**: Usually follows pattern like `"application/vnd.company.custom+jwt"`
   - **Use Case**: Custom protocols, proprietary systems
   - **Example**: `"application/myapp-token+jwt"`

5. **Omitted** - Field is optional
   - **Description**: The `typ` field can be left out entirely
   - **Use Case**: When application context clearly indicates JWT type
   - **Prevalence**: Common in simple applications where only JWTs are used

**Why Both Are Needed:**
- `typ: "JWT"` → Helps server quickly identify the token format
- `alg: "HS256"` → Tells server which verification algorithm to use

### 2. Payload
- Claims (statements about entity)
- Registered claims: iss, exp, sub, aud
- Public claims
- Private claims

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}
```

#### Payload Fields Explained

**`sub` (Subject)** - Registered Claim
- **Purpose**: Identifies the subject of the token (usually the user ID)
- **Value**: `"1234567890"` - Unique identifier for the user
- **Required**: Often required, especially for authentication tokens
- **Use Case**: Server uses this to identify which user the token belongs to
- **Example**: User ID, username, email, or any unique identifier

**`name`** - Public/Private Claim
- **Purpose**: Contains the user's display name
- **Value**: `"John Doe"` - The user's full name
- **Type**: Custom claim (not standardized, but commonly used)
- **Use Case**: Display user information without additional database lookup
- **Note**: This is optional - you can include any user information you need

**`iat` (Issued At)** - Registered Claim
- **Purpose**: Timestamp when the token was issued/created
- **Value**: `1516239022` - Unix timestamp (number of seconds since Jan 1, 1970)
- **Format**: Numeric value (seconds since epoch)
- **Use Case**: Track when token was created, can be used for token age validation
- **Human Readable**: `1516239022` = January 18, 2018, 12:23:42 PM UTC
- **Note**: Helps detect old tokens that should be refreshed

**`exp` (Expiration)** - Registered Claim
- **Purpose**: Timestamp when the token expires and becomes invalid
- **Value**: `1516242622` - Unix timestamp
- **Format**: Numeric value (seconds since epoch)
- **Use Case**: Server rejects tokens after this time (security measure)
- **Human Readable**: `1516242622` = January 18, 2018, 2:10:22 PM UTC
- **Token Lifetime**: `1516242622 - 1516239022 = 3600 seconds = 1 hour`
- **Note**: Always validate expiration to prevent use of expired tokens

**Key Points:**
- **Registered Claims** (`sub`, `iat`, `exp`): Standardized claims defined in JWT spec
- **Custom Claims** (`name`): Any additional data you need (user info, permissions, etc.)
- **Timestamps**: `iat` and `exp` use Unix timestamps (seconds since epoch)
- **Base64 Encoded**: This payload is base64url encoded in the actual JWT
- **Not Encrypted**: Payload is visible (base64 encoded), so don't put sensitive data

**Example Timeline:**
```
iat: 1516239022 (Jan 18, 2018, 12:23 PM)  ← Token issued
                    ↓
              Token valid for 1 hour
                    ↓
exp: 1516242622 (Jan 18, 2018, 2:10 PM)   ← Token expires
```

### 3. Signature
- Created using header, payload, and secret
- Verifies token hasn't been tampered with

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

## How It Works

1. **User Login**: User authenticates, server creates JWT
2. **Token Return**: Server returns JWT to client
3. **Token Storage**: Client stores token (localStorage, cookie)
4. **Request**: Client includes token in Authorization header
5. **Verification**: Server verifies token signature
6. **Access**: If valid, server processes request

### JWT in Microservices Architecture (SSO Scenario)

**Scenario**: One Auth Microservice issues JWTs, multiple microservices (with their own UIs) use the same Auth MS for authentication.

**Architecture:**
```
┌─────────────────┐
│   Main UI       │
│  (Platform)     │
└────────┬────────┘
         │
         │ 1. Login Request
         ▼
┌─────────────────┐
│   Auth MS       │ ◄─── Issues JWT
│  (Centralized)  │
└────────┬────────┘
         │
         │ 2. JWT in Cookie (httpOnly)
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│ MS-A   │ │ MS-B   │
│ (UI-A) │ │ (UI-B) │
└────────┘ └────────┘
```

**Flow:**

**1. Initial Login (Main Platform UI):**
- User logs in via Main UI → Auth MS
- Auth MS validates credentials, creates JWT
- Auth MS sets JWT in httpOnly cookie (domain: `.platform.com`)
- Cookie automatically sent with requests to `*.platform.com`

**Code Example - How Other Microservices Use the Cookie:**

```javascript
// ms-a/server.js (Express.js example)
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
app.use(cookieParser());

// Option 1: RS256 - Using public key (Recommended for microservices)
const PUBLIC_KEY = fs.readFileSync('./auth-ms-public-key.pem', 'utf8');
const JWT_COOKIE_NAME = 'jwt_token'; // Cookie name set by Auth MS

// Middleware to extract and verify JWT from cookie
const authenticateJWT = (req, res, next) => {
  // Extract JWT from cookie (automatically sent by browser)
  const token = req.cookies[JWT_COOKIE_NAME];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    // Verify JWT using Auth MS public key (RS256)
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
      issuer: 'auth.platform.com',      // Verify issuer
      audience: 'ms-a'                  // Verify this service is in audience
    });
    
    // Attach user info to request object
    req.user = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email
    };
    
    next(); // Continue to next middleware/route handler
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Authentication error' });
  }
};
```

**Understanding `next()` and `catch (error)` - Beginner Explanation:**

**What is `next()`?**
- `next()` is a function that tells Express.js "I'm done with this middleware, move to the next one"
- Think of it like a relay race: `next()` passes the baton to the next handler
- **Without `next()`**: The request stops here, the route handler never runs
- **With `next()`**: Express continues to the next middleware or the actual route handler

**Request Flow:**
```
1. Request comes in → 
2. authenticateJWT middleware runs → 
3. If token valid: next() → 
4. Route handler runs (e.g., app.get('/api/user/profile', ...))
```

**What is `catch (error)`?**
- `catch (error)` handles errors that occur inside the `try` block
- If `jwt.verify()` fails (invalid token, expired, etc.), it throws an error
- `catch` catches that error so your server doesn't crash
- Instead, you send a proper error response to the client

**Why do we need it?**
- **Without `catch`**: If JWT verification fails, your server crashes ❌
- **With `catch`**: Error is caught, user gets proper error message ✅

**Example Flow:**

**Success Case:**
```
1. Token valid → jwt.verify() succeeds
2. req.user is set with user info
3. next() is called → moves to route handler
4. Route handler can access req.user and return data
```

**Error Case (Token Expired):**
```
1. Token expired → jwt.verify() throws TokenExpiredError
2. catch (error) catches it
3. Checks error.name === 'TokenExpiredError'
4. Returns 401 error response to client
5. next() is NOT called → route handler never runs
```

**Key Points:**
- **`next()`** = "Everything OK, continue processing"
- **`catch (error)`** = "Something went wrong, handle it gracefully"
- **`return`** in catch = Stop processing, send error response
- Middleware without `next()` = Request stops there

// Option 2: HS256 - Using shared secret (Less secure for microservices)
// const JWT_SECRET = process.env.JWT_SECRET; // Shared secret with Auth MS
// const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });

// Protected route - requires authentication
app.get('/api/user/profile', authenticateJWT, (req, res) => {
  // req.user is available from authenticateJWT middleware
  res.json({
    userId: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

// Another protected route
app.get('/api/data', authenticateJWT, (req, res) => {
  // User is authenticated, can access data
  res.json({ data: 'Protected data for user: ' + req.user.id });
});

app.listen(3000, () => {
  console.log('MS-A server running on port 3000');
});
```

**Alternative: Using Authorization Header (if cookie not available):**

```javascript
// Middleware that accepts both cookie and Authorization header
const authenticateJWT = (req, res, next) => {
  // Try cookie first
  let token = req.cookies[JWT_COOKIE_NAME];
  
  // If no cookie, try Authorization header
  if (!token) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
      issuer: 'auth.platform.com',
      audience: 'ms-a'
    });
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
```

**Frontend Code (MS-A UI) - Using Cookie:**

```javascript
// ms-a/frontend/api.js
// Cookie is automatically sent by browser, no manual handling needed!

// Fetch API automatically includes cookies for same domain
fetch('https://ms-a.platform.com/api/user/profile', {
  method: 'GET',
  credentials: 'include', // Important: Include cookies
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (response.status === 401) {
      // Token expired or invalid, redirect to Auth MS
      window.location.href = 'https://auth.platform.com/login';
      return;
    }
    return response.json();
  })
  .then(data => console.log('User data:', data))
  .catch(error => console.error('Error:', error));

// Axios automatically includes cookies for same domain
import axios from 'axios';

axios.get('https://ms-a.platform.com/api/user/profile', {
  withCredentials: true // Important: Include cookies
})
  .then(response => console.log('User data:', response.data))
  .catch(error => {
    if (error.response?.status === 401) {
      window.location.href = 'https://auth.platform.com/login';
    }
  });
```

**2. Accessing Other Microservices (MS-A, MS-B with their own UIs):**

**Option A: Cookie-based (Automatic)**
- User navigates to `ms-a.platform.com` or `ms-b.platform.com`
- Browser automatically sends cookie (same domain)
- Each MS verifies JWT signature using Auth MS public key (RS256) or shared secret
- If valid → Access granted, extract user info from payload

**Option B: Token Forwarding (Manual)**
- User navigates to MS-A/MS-B UI
- UI checks for cookie, if not present → Redirect to Auth MS
- Auth MS checks existing session → Returns JWT
- MS UI stores/uses JWT for API calls

**3. API Requests Between Services:**
- Frontend sends request with JWT (from cookie or Authorization header)
- Each MS validates JWT independently:
  - Verify signature (using Auth MS public key or shared secret)
  - Check expiration (`exp` claim)
  - Extract user info (`sub`, `name`, etc.)
- No need to call Auth MS for each request (stateless)

**Key Points:**

**Shared Cookie Domain:**
- Cookie set for `.platform.com` works for all subdomains
- `auth.platform.com`, `ms-a.platform.com`, `ms-b.platform.com` share cookie
- Enables SSO across all services

**JWT Verification:**
- Each MS can verify JWT independently (no Auth MS call needed)
- **RS256 (Recommended)**: Auth MS signs with private key, all MS verify with public key
- **HS256**: All MS share same secret (less secure for distributed systems)

**JWT Payload Example:**
```json
{
  "sub": "user-123",
  "name": "John Doe",
  "email": "john@example.com",
  "iat": 1516239022,
  "exp": 1516242622,
  "iss": "auth.platform.com",     // Issuer (Auth MS)
  "aud": ["ms-a", "ms-b"]          // Audience (which services can use)
}
```

**Advantages:**
- **Single Sign-On (SSO)**: Login once, access all services
- **Stateless**: Each MS validates independently (no shared session store)
- **Scalable**: Auth MS doesn't handle every request
- **Centralized Auth**: One place to manage authentication logic

**Important Considerations:**
- Use **RS256** (asymmetric) so MS can verify without Auth MS secret
- Set proper cookie domain (`.platform.com`) for cross-subdomain sharing
- Include `iss` (issuer) and `aud` (audience) claims for security
- Use httpOnly cookies to prevent XSS attacks
- Consider refresh tokens for long-lived sessions

## Use Cases

- Authentication
- Authorization
- Information exchange
- Stateless sessions
- Single Sign-On (SSO)

## Advantages

- Stateless: No server-side session storage
- Scalable: Works across multiple servers
- Self-contained: Contains all necessary information
- Compact: Small size, easy to transmit
- Standard: Industry standard format

## Disadvantages

- Size: Larger than session IDs
- Security: If stolen, valid until expiration
- No Revocation: Can't invalidate before expiration
- Payload Visible: Base64 encoded, not encrypted

## Security Best Practices

- Use HTTPS: Always transmit over HTTPS
- Short Expiration: Set reasonable expiration times
- Secure Storage: Store securely (httpOnly cookies preferred)
- Strong Secrets: Use strong, random secrets
- Algorithm: Use RS256 for asymmetric, HS256 for symmetric
- Validate: Always validate signature and expiration
- Refresh Tokens: Use refresh tokens for long-lived sessions

## Implementation Example

```javascript
// Creating JWT
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verifying JWT
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

## Token Refresh Flow

**Why Refresh Tokens?**
- **Access tokens**: Short-lived (15-60 minutes) - limits damage if stolen
- **Refresh tokens**: Long-lived (7-30 days) - used to get new access tokens
- **Security**: Access token expires quickly, refresh token allows getting new ones without re-login

### How Token Refresh Works

**Flow Diagram:**
```
1. Login → Auth MS returns Access Token + Refresh Token
2. Use Access Token for API calls (expires after 15 min)
3. Access Token expires → API returns 401
4. Client sends Refresh Token → Auth MS
5. Auth MS validates Refresh Token → Returns new Access Token
6. Client uses new Access Token → Continue API calls
```

### Backend Implementation (Auth MS)

**1. Login Endpoint - Returns Both Tokens:**

```javascript
// auth-ms/login.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const redis = require('redis'); // For storing refresh tokens

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = '15m'; // Short-lived
const REFRESH_TOKEN_EXPIRY = '7d';  // Long-lived

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // 1. Validate credentials
  const user = await validateCredentials(email, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // 2. Create access token (short-lived)
  const accessToken = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      iss: 'auth.platform.com',
      aud: ['ms-a', 'ms-b']
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
  
  // 3. Create refresh token (long-lived)
  const refreshToken = jwt.sign(
    {
      sub: user.id,
      tokenType: 'refresh' // Distinguish from access token
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
  
  // 4. Store refresh token in database/Redis (optional but recommended)
  await storeRefreshToken(user.id, refreshToken);
  
  // 5. Set tokens in httpOnly cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true, // HTTPS only
    sameSite: 'strict',
    domain: '.platform.com',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    domain: '.platform.com',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
```

**Cookie Properties Explained:**

**`httpOnly: true`**
- **Purpose**: Prevents JavaScript access to the cookie
- **Security**: Protects against XSS (Cross-Site Scripting) attacks
- **Behavior**: Cookie is only sent in HTTP requests, not accessible via `document.cookie`
- **Example**: If malicious script runs, it cannot steal the token via `document.cookie`
- **Why Important**: JWTs are sensitive - prevents client-side scripts from accessing them

**`secure: true`**
- **Purpose**: Cookie is only sent over HTTPS connections
- **Security**: Prevents cookie from being transmitted over unencrypted HTTP
- **Behavior**: Browser only sends cookie if connection is HTTPS
- **Why Important**: Protects token from being intercepted in transit (man-in-the-middle attacks)
- **Note**: Must use in production, can disable in development with HTTP

**Understanding HTTP vs HTTPS - Beginner Explanation:**

**What is HTTP?**
- **HTTP** = HyperText Transfer Protocol
- **Yes, it's the protocol** between client (browser) and server
- **Purpose**: Rules for how client and server communicate
- **Analogy**: Like a language that both client and server understand
- **Example**: When you visit `http://example.com`, your browser uses HTTP protocol

**What is HTTPS?**
- **HTTPS** = HyperText Transfer Protocol **Secure**
- **Same protocol as HTTP, but with encryption**
- **The "S" stands for Secure** - adds a security layer
- **Purpose**: Encrypts data between client and server
- **Analogy**: Like HTTP, but the conversation is in a secret code

**Key Differences:**

| Feature | HTTP | HTTPS |
|---------|------|-------|
| **Encryption** | ❌ No - data sent in plain text | ✅ Yes - data is encrypted |
| **Port** | Port 80 | Port 443 |
| **URL** | `http://example.com` | `https://example.com` |
| **Security** | ❌ Vulnerable to interception | ✅ Secure against interception |
| **Certificate** | Not required | Requires SSL/TLS certificate |

**How It Works:**

**HTTP (Unencrypted):**
```
Client (Browser)  ──────[Plain Text]──────>  Server
                  <──────[Plain Text]──────
```
- Anyone can read the data (like sending a postcard)
- Passwords, tokens, personal data visible to anyone intercepting

**HTTPS (Encrypted):**
```
Client (Browser)  ──────[Encrypted Data]──────>  Server
                  <──────[Encrypted Data]──────
```
- Data is scrambled/encrypted (like sending a locked box)
- Even if intercepted, data is unreadable without the key

**Real-World Analogy:**
- **HTTP**: Like talking in a crowded room - everyone can hear you
- **HTTPS**: Like talking in a private, soundproof room - only you and the server can understand

**Why HTTPS Matters for JWTs:**
- **Without HTTPS**: JWT token sent in plain text - anyone can steal it
- **With HTTPS**: JWT token encrypted - safe from interception
- **`secure: true` cookie**: Browser only sends cookie over HTTPS connections
- **Security**: Protects your JWT from being stolen during transmission

**How to Identify:**
- **HTTP**: Browser shows `http://` and may show "Not Secure" warning
- **HTTPS**: Browser shows `https://` and a lock icon 🔒
- **Modern browsers**: Often block HTTP for sensitive operations

**Summary:**
- **HTTP** = Protocol for client-server communication (unencrypted)
- **HTTPS** = Same protocol but with encryption (secure)
- **For JWTs**: Always use HTTPS in production to protect tokens
- **`secure: true`**: Ensures cookies only sent over HTTPS

**`sameSite: 'strict'`**
- **Purpose**: Controls when cookie is sent with cross-site requests
- **Options**: 
  - `'strict'`: Cookie never sent with cross-site requests (most secure)
  - `'lax'`: Cookie sent with top-level navigation (e.g., link clicks)
  - `'none'`: Cookie sent with all requests (requires `secure: true`)
- **Security**: Protects against CSRF (Cross-Site Request Forgery) attacks
- **Behavior**: Cookie only sent when request originates from same site
- **Example**: If user clicks link from `evil.com` to `platform.com`, cookie not sent (with 'strict')
- **Trade-off**: 'strict' is most secure but may block legitimate cross-site navigation

**`domain: '.platform.com'`**
- **Purpose**: Specifies which domains can receive the cookie
- **Behavior**: 
  - `.platform.com` (with dot) = Cookie shared with all subdomains
  - `platform.com` (no dot) = Only exact domain
- **Use Case**: Enables Single Sign-On (SSO) across subdomains
- **Example**: Cookie works for `auth.platform.com`, `ms-a.platform.com`, `ms-b.platform.com`
- **Why Important**: Allows sharing token across microservices on different subdomains
- **Security**: Cannot set cookie for different top-level domain (e.g., cannot set `.com`)

**Key Differences Between `sameSite` and `domain`:**

**`sameSite` vs `domain` - What's the Difference?**

These are two different cookie properties that serve different purposes:

| Property | Purpose | Controls | Example |
|----------|---------|----------|---------|
| **`sameSite`** | **When** cookie is sent | Request origin/source | Prevents cross-site requests |
| **`domain`** | **Where** cookie is sent | Domain/subdomain scope | Enables SSO across subdomains |

**`sameSite: 'strict'` - Controls WHEN Cookie is Sent:**

**Purpose**: Controls whether cookie is sent based on **where the request comes from**

**How it works:**
- Checks if the request originates from the **same site** or a **different site**
- **Same site**: Request from `platform.com` → `platform.com`
- **Cross-site**: Request from `evil.com` → `platform.com`

**Examples:**

**`sameSite: 'strict'` (Cookie NOT sent):**
```
User clicks link on evil.com → Goes to platform.com
Request origin: evil.com (different site)
Cookie: NOT sent ❌
```

**`sameSite: 'strict'` (Cookie IS sent):**
```
User types URL or clicks link on platform.com → Goes to platform.com
Request origin: platform.com (same site)
Cookie: IS sent ✅
```

**`sameSite: 'lax'` (Cookie IS sent for top-level navigation):**
```
User clicks link on evil.com → Goes to platform.com (new page)
Request origin: evil.com (different site)
Type: Top-level navigation (link click)
Cookie: IS sent ✅ (less secure, but more convenient)
```

**`domain: '.platform.com'` - Controls WHERE Cookie is Sent:**

**Purpose**: Specifies which domains/subdomains can receive the cookie

**How it works:**
- Controls **which domains** the cookie is available to
- **`.platform.com`** (with dot) = Available to all subdomains
- **`platform.com`** (no dot) = Only exact domain

**Examples:**

**`domain: '.platform.com'` (Works on ALL subdomains):**
```
Cookie set on: auth.platform.com
Available on: ✅ auth.platform.com
Available on: ✅ ms-a.platform.com
Available on: ✅ ms-b.platform.com
Available on: ✅ platform.com
```

**`domain: 'platform.com'` (Only exact domain):**
```
Cookie set on: auth.platform.com
Available on: ✅ auth.platform.com (if set there)
Available on: ❌ ms-a.platform.com (different subdomain)
Available on: ❌ platform.com (different domain)
```

**Real-World Scenario:**

**Both properties work together:**

1. **`domain: '.platform.com'`** = Cookie available on all `*.platform.com` subdomains
2. **`sameSite: 'strict'`** = Cookie only sent when request comes from `*.platform.com`

**Example Flow:**
```
User on auth.platform.com → Cookie set with:
  - domain: '.platform.com' (available on all subdomains)
  - sameSite: 'strict' (only sent from platform.com domains)

User navigates to ms-a.platform.com:
  ✅ Cookie available (domain matches)
  ✅ Cookie sent (same site: platform.com → platform.com)

User clicks link from evil.com to platform.com:
  ✅ Cookie available (domain matches)
  ❌ Cookie NOT sent (different site: evil.com → platform.com)
```

**Summary:**

- **`sameSite`**: Security feature - prevents cross-site cookie sending
  - Focus: **Request origin** (where request comes from)
  - Protects: Against CSRF attacks
  
- **`domain`**: Functionality feature - enables cookie sharing across subdomains
  - Focus: **Cookie scope** (which domains can receive)
  - Enables: SSO across microservices

**Think of it this way:**
- **`domain`** = "Which doors can access this room?" (scope)
- **`sameSite`** = "Who is allowed to enter?" (security check)

**`maxAge: 15 * 60 * 1000` (for access token)**
- **Purpose**: Sets cookie expiration time in milliseconds
- **Value**: `15 * 60 * 1000 = 900,000ms = 15 minutes`
- **Behavior**: Cookie automatically deleted after this time
- **Access Token**: Short-lived (15-60 minutes) - limits damage if stolen
- **Refresh Token**: Long-lived (7 days) - `7 * 24 * 60 * 60 * 1000`
- **Why Different**: Access token expires quickly for security, refresh token lasts longer for user convenience
- **Alternative**: Can use `expires` with Date object instead

**Additional Cookie Properties (not shown but useful):**

**`path: '/api'`** (optional)
- **Purpose**: Cookie only sent for requests to this path and sub-paths
- **Example**: Cookie only sent for `/api/*` routes
- **Use Case**: Limit cookie scope to specific routes

**`signed: true`** (optional, with cookie-parser)
- **Purpose**: Cookie value is signed (not encrypted, but tamper-proof)
- **Security**: Server can detect if cookie was modified
- **Use Case**: Extra layer of security on top of JWT signature

**Summary Table:**

| Property | Value | Purpose | Security Benefit |
|----------|-------|---------|------------------|
| `httpOnly` | `true` | No JS access | Prevents XSS attacks |
| `secure` | `true` | HTTPS only | Prevents interception |
| `sameSite` | `'strict'` | Same-site only | Prevents CSRF attacks |
| `domain` | `'.platform.com'` | Shared subdomains | Enables SSO |
| `maxAge` | `15 * 60 * 1000` | Expiration time | Limits token lifetime |
  
  // Or return in response body (if not using cookies)
  res.json({
    accessToken,
    refreshToken,
    expiresIn: 900 // 15 minutes in seconds
  });
});
```

**2. Refresh Token Endpoint:**

```javascript
// auth-ms/refresh.js
app.post('/api/refresh', async (req, res) => {
  // Get refresh token from cookie or body
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }
  
  try {
    // 1. Verify refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    
    // 2. Check if refresh token exists in database (optional - for revocation)
    const tokenExists = await checkRefreshToken(decoded.sub, refreshToken);
    if (!tokenExists) {
      return res.status(403).json({ error: 'Refresh token revoked' });
    }
    
    // 3. Get user data
    const user = await getUserById(decoded.sub);
    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }
    
    // 4. Generate new access token
    const newAccessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        iss: 'auth.platform.com',
        aud: ['ms-a', 'ms-b']
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    
    // 5. Optionally rotate refresh token (security best practice)
    const newRefreshToken = jwt.sign(
      { sub: user.id, tokenType: 'refresh' },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
    
    // 6. Update refresh token in database
    await updateRefreshToken(decoded.sub, refreshToken, newRefreshToken);
    
    // 7. Set new tokens
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: '.platform.com',
      maxAge: 15 * 60 * 1000
    });
    
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: '.platform.com',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: 900
    });
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token expired - please login again' });
    }
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
});
```

### Frontend Implementation

**Automatic Token Refresh on API Calls:**

```javascript
// frontend/api-client.js
import axios from 'axios';

const API_BASE_URL = 'https://api.platform.com';
```

**Understanding `import axios from 'axios';` - Beginner Explanation:**

**What is `import`?**
- **`import`** is a JavaScript keyword to load code from other files/packages
- **ES6 Modules syntax**: Modern way to import code (also called ES6 modules)
- **Alternative**: `require()` (CommonJS - older way, used in Node.js)
- **Purpose**: Use code written by others (libraries/packages)

**What is `axios`?**
- **Axios** is a JavaScript library for making HTTP requests
- **Purpose**: Send requests to servers (GET, POST, PUT, DELETE, etc.)
- **Alternative**: `fetch()` (built-in browser API)
- **Why use axios**: Easier to use, better features, automatic JSON handling

**What does `import axios from 'axios';` do?**
- **Loads the axios library** from the 'axios' package
- **Makes axios available** in this file
- **Similar to**: Getting a tool from a toolbox to use it

**Before using axios, you need to install it:**
```bash
npm install axios
# or
yarn add axios
```

**Comparison - Axios vs Fetch:**

**Using `fetch` (built-in, no import needed):**
```javascript
// No import needed - fetch is built into browsers
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**Using `axios` (requires import):**
```javascript
import axios from 'axios';

// Easier syntax, automatic JSON parsing
axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Why use Axios? (Benefits)**
- **Automatic JSON parsing**: No need for `.json()` step
- **Better error handling**: Automatically throws errors for bad status codes
- **Request/Response interceptors**: Can modify requests/responses (like we use for token refresh)
- **Automatic cookie handling**: Easier to work with cookies
- **Cleaner syntax**: Less boilerplate code

**Example Usage:**
```javascript
import axios from 'axios';

// GET request
axios.get('/api/user')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// POST request
axios.post('/api/login', { email, password })
  .then(response => console.log(response.data));

// With configuration
axios.get('/api/data', {
  headers: { 'Authorization': 'Bearer token' },
  withCredentials: true // Include cookies
});
```

**Key Points:**
- **`import`** = Load code from a package/library
- **`axios`** = HTTP request library (tool for API calls)
- **`from 'axios'`** = Get axios from the 'axios' package
- **Must install first**: `npm install axios` before using

**In our code:**
- We use axios to make API calls to the server
- Axios helps us handle token refresh automatically
- We use interceptors to refresh tokens when they expire

```javascript
// frontend/api-client.js
import axios from 'axios';

const API_BASE_URL = 'https://api.platform.com';
const AUTH_URL = 'https://auth.platform.com';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // Include cookies
});
```

**Understanding `axios.create()` - Beginner Explanation:**

**What is `axios.create()`?**
- **`axios.create()`** creates a custom axios instance with default configuration
- **Instance**: A configured version of axios with your settings
- **Purpose**: Reuse the same configuration for multiple requests
- **Alternative**: Use `axios.get()` directly (but repeat configuration each time)

**Why Create an Instance?**
- **Reuse configuration**: Set defaults once, use many times
- **Cleaner code**: Don't repeat the same config in every request
- **Organized**: One instance per API service

**What is `baseURL`?**
- **`baseURL`**: Base URL that gets prepended to all requests
- **Purpose**: Don't repeat the full URL in every request
- **Example**: If `baseURL` is `'https://api.platform.com'`, you can use `/api/user` instead of `'https://api.platform.com/api/user'`

**How `baseURL` Works:**

**Without `baseURL` (repetitive):**
```javascript
axios.get('https://api.platform.com/api/user')
axios.get('https://api.platform.com/api/data')
axios.get('https://api.platform.com/api/profile')
// Have to repeat full URL every time
```

**With `baseURL` (cleaner):**
```javascript
const apiClient = axios.create({
  baseURL: 'https://api.platform.com'
});

apiClient.get('/api/user')      // → https://api.platform.com/api/user
apiClient.get('/api/data')      // → https://api.platform.com/api/data
apiClient.get('/api/profile')   // → https://api.platform.com/api/profile
// baseURL is automatically prepended
```

**What is `withCredentials: true`?**
- **`withCredentials`**: Tells browser to include cookies with requests
- **Purpose**: Send cookies (like JWT tokens) with API requests
- **Important**: Needed for cross-origin requests with cookies
- **Alternative**: `false` (default) - cookies not sent

**Why `withCredentials: true` for JWTs?**
- **JWTs stored in cookies**: Our JWT tokens are stored in httpOnly cookies
- **Cookies need to be sent**: Browser needs permission to send cookies
- **Cross-origin requests**: When frontend and API are on different domains/subdomains
- **Required**: Without this, cookies won't be sent, authentication fails

**Example:**

**Without `withCredentials` (cookies not sent):**
```javascript
axios.get('/api/user')
// Cookie NOT sent → 401 Unauthorized ❌
```

**With `withCredentials` (cookies sent):**
```javascript
const apiClient = axios.create({
  baseURL: 'https://api.platform.com',
  withCredentials: true
});

apiClient.get('/api/user')
// Cookie IS sent → 200 OK ✅
```

**Complete Example:**

```javascript
import axios from 'axios';

// Configuration
const API_BASE_URL = 'https://api.platform.com';

// Create instance with defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,        // Base URL for all requests
  withCredentials: true          // Include cookies
});

// Now use apiClient instead of axios
apiClient.get('/api/user')       // Uses baseURL + includes cookies
  .then(response => console.log(response.data));

apiClient.post('/api/data', { name: 'John' })
  .then(response => console.log(response.data));
```

**Key Points:**
- **`axios.create()`** = Create configured axios instance
- **`baseURL`** = Base URL prepended to all requests (saves repetition)
- **`withCredentials: true`** = Include cookies with requests (needed for JWTs in cookies)
- **Instance** = Reusable configured version of axios
- **Why**: Cleaner code, reuse configuration, easier maintenance

**In our code:**
- `apiClient` = Our custom axios instance
- `baseURL` = Set to API URL (don't repeat it)
- `withCredentials` = Send cookies (needed for JWT authentication)

// Flag to prevent multiple simultaneous refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request interceptor - add access token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Access token is in cookie, automatically sent
    // Or you can add it manually:
    // const accessToken = getAccessTokenFromCookie();
    // config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
  (response) => response, // Success - pass through
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for ongoing refresh
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        // Request new access token using refresh token
        const response = await axios.post(
          `${AUTH_URL}/api/refresh`,
          {},
          { withCredentials: true } // Refresh token in cookie
        );
        
        const { accessToken } = response.data;
        
        // Update access token cookie (handled by server)
        // Or store it if not using cookies:
        // localStorage.setItem('accessToken', accessToken);
        
        processQueue(null, accessToken);
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
        
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Refresh failed - redirect to login
        window.location.href = `${AUTH_URL}/login`;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

// Usage - token refresh happens automatically
apiClient.get('/api/user/profile')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### Key Points

**Access Token:**
- Short-lived (15-60 minutes)
- Used for API calls
- Sent with every request
- If expired → 401 error

**Refresh Token:**
- Long-lived (7-30 days)
- Used only to get new access tokens
- Stored securely (httpOnly cookie preferred)
- If expired → User must login again

**Security Best Practices:**
- Store refresh tokens in database (for revocation)
- Rotate refresh tokens on each use
- Use different secrets for access/refresh tokens
- Implement token blacklist for logout
- Use httpOnly cookies (prevents XSS)
- Set secure flag (HTTPS only)

**Token Refresh Flow Summary:**
1. Access token expires → API returns 401
2. Client intercepts 401 → Calls refresh endpoint
3. Server validates refresh token → Returns new access token
4. Client retries original request with new token
5. If refresh token expired → Redirect to login

## Common Claims

- **iss** (issuer): Who issued the token
- **sub** (subject): Subject of token (user ID)
- **aud** (audience): Intended recipient
- **exp** (expiration): Expiration time
- **iat** (issued at): When token was issued
- **nbf** (not before): Token not valid before
- **jti** (JWT ID): Unique identifier

