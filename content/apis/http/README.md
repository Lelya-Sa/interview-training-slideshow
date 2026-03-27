# HTTP - Interview Material

## Definition
HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the World Wide Web.

## HTTP Methods

- **GET**: Retrieve data (idempotent, safe)
- **POST**: Create resource (not idempotent)
- **PUT**: Update/replace resource (idempotent)
- **PATCH**: Partial update (idempotent)
- **DELETE**: Delete resource (idempotent)
- **HEAD**: Get headers only
- **OPTIONS**: Get allowed methods

## HTTP Status Codes

### 2xx Success
- 200 OK
- 201 Created
- 204 No Content

### 3xx Redirection
- 301 Moved Permanently
- 302 Found
- 304 Not Modified

### 4xx Client Error
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict

### 5xx Server Error
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable

## HTTP Headers

### Request Headers
- `Content-Type`: MIME type of body
- `Authorization`: Credentials
- `Accept`: Acceptable response types
- `User-Agent`: Client information
- `Cookie`: Stored cookies

### Response Headers
- `Content-Type`: Response MIME type
- `Set-Cookie`: Set cookies
- `Cache-Control`: Caching directives
- `Location`: Redirect URL
- `ETag`: Entity tag for caching

## HTTP Request Structure

```
GET /api/users HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer token
```

## HTTP Response Structure

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 123

{"data": "..."}
```

## Key Concepts

- **Stateless**: Each request independent
- **Request/Response**: Client-server model
- **Headers**: Metadata about request/response
- **Body**: Data payload
- **Status Codes**: Result of request

