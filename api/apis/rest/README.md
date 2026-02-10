# REST API - Interview Material

## Definition
REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP methods to perform operations on resources.

## Principles

### 1. Stateless
- Each request contains all information needed
- Server doesn't store client state
- Session state stored on client

### 2. Resource-Based
- Everything is a resource
- Resources identified by URIs
- Resources have representations (JSON, XML)

### 3. HTTP Methods
- **GET**: Retrieve resource
- **POST**: Create resource
- **PUT**: Update/replace resource
- **PATCH**: Partial update
- **DELETE**: Delete resource

### 4. Uniform Interface
- Consistent way to interact with resources
- Standard HTTP methods and status codes
- Self-descriptive messages

### 5. Layered System
- System can have multiple layers
- Client doesn't know if connected directly to server
- Proxies, gateways, load balancers

## HTTP Status Codes

### Success (2xx)
- **200 OK**: Request successful
- **201 Created**: Resource created
- **204 No Content**: Success, no content

### Client Error (4xx)
- **400 Bad Request**: Invalid request
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource conflict

### Server Error (5xx)
- **500 Internal Server Error**: Server error
- **502 Bad Gateway**: Gateway error
- **503 Service Unavailable**: Service down

## Best Practices

- Use nouns for resources, not verbs
- Use plural nouns: `/users` not `/user`
- Use hierarchical structure: `/users/123/posts`
- Version APIs: `/api/v1/users`
- Use proper HTTP methods
- Return appropriate status codes
- Use consistent response format
- Implement pagination for lists
- Use filtering, sorting, searching
- Include proper headers
- Handle errors consistently

## Example Endpoints

```
GET    /api/users           # Get all users
GET    /api/users/123       # Get user by ID
POST   /api/users           # Create user
PUT    /api/users/123       # Update user
PATCH  /api/users/123       # Partial update
DELETE /api/users/123       # Delete user
```

## Request/Response Example

**Request:**
```
GET /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer token
Accept: application/json
```

**Response:**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com"
}
```

