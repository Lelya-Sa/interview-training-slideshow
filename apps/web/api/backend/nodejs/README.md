# Node.js - Interview Material

## Definition
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows JavaScript to run on the server-side, enabling development of scalable network applications.

## Core Concepts

### 1. Event-Driven Architecture
- **Event Loop**: Single-threaded event loop handling asynchronous operations
- **Non-blocking I/O**: Operations don't block execution
- **Callbacks**: Functions executed after async operations complete
- **Event Emitters**: Objects that emit events and handle listeners

### 2. Modules and require()
- **CommonJS Modules**: `require()` and `module.exports`
- **ES6 Modules**: `import` and `export` (with .mjs or type: "module")
- **Built-in Modules**: `fs`, `http`, `path`, `crypto`, `stream`, etc.
- **Module Caching**: Modules are cached after first require
- **Module Resolution**: How Node.js finds modules

### 3. File System (fs)
- **Synchronous vs Asynchronous**: Blocking vs non-blocking operations
- **fs.readFile / fs.writeFile**: File operations
- **fs.readdir**: Read directory contents
- **fs.stat**: Get file information
- **Streams**: For large files
- **fs.promises**: Promise-based API

### 4. HTTP Module
- **http.createServer()**: Create HTTP server
- **Request Object**: Incoming request data
- **Response Object**: Outgoing response
- **Routing**: Handle different URL paths
- **Middleware**: Functions that process requests

### 5. Streams
- **Readable Streams**: Data can be read
- **Writable Streams**: Data can be written
- **Duplex Streams**: Both readable and writable
- **Transform Streams**: Modify data as it passes through
- **Stream Events**: `data`, `end`, `error`, `finish`
- **Piping**: Connect streams together

### 6. Buffers
- **Buffer Class**: Handle binary data
- **Buffer Methods**: `alloc()`, `from()`, `toString()`, `concat()`
- **Encoding**: UTF-8, ASCII, Base64, etc.
- **Binary Data**: Working with raw data

### 7. Events and EventEmitter
- **EventEmitter Class**: Base class for event-driven objects
- **Event Methods**: `on()`, `emit()`, `once()`, `removeListener()`
- **Custom Events**: Create and emit custom events
- **Event Patterns**: Observer pattern implementation

### 8. Asynchronous Programming
- **Callbacks**: Traditional async pattern
- **Promises**: Modern async pattern
- **async/await**: Syntactic sugar for promises
- **Promise.all()**: Execute promises in parallel
- **Error Handling**: try/catch with async/await

### 9. Process and Global Objects
- **process**: Information about Node.js process
- **process.env**: Environment variables
- **process.argv**: Command-line arguments
- **global**: Global namespace object
- **__dirname / __filename**: Current directory/file

### 10. Path Module
- **path.join()**: Join path segments
- **path.resolve()**: Resolve absolute path
- **path.basename()**: Get filename
- **path.dirname()**: Get directory
- **path.extname()**: Get extension
- **Cross-platform**: Works on Windows, Linux, macOS

### 11. Error Handling
- **Error Types**: Error, TypeError, ReferenceError
- **Try/Catch**: Synchronous error handling
- **Error-first Callbacks**: Callback(err, data) pattern
- **Promise Rejection**: Handling promise errors
- **Uncaught Exceptions**: process.on('uncaughtException')

### 12. Middleware
- **Concept**: Functions that execute in request/response cycle
- **Express Middleware**: req, res, next pattern
- **Error Middleware**: Handle errors
- **Custom Middleware**: Create reusable middleware
- **Middleware Order**: Execution order matters

### 13. Express.js Framework
- **Routing**: Define routes and handlers
- **Middleware**: Use built-in and custom middleware
- **Request/Response**: req and res objects
- **Template Engines**: EJS, Pug, Handlebars
- **Static Files**: Serve static assets
- **Body Parsing**: Parse request bodies

### 14. RESTful APIs
- **REST Principles**: Stateless, resource-based
- **HTTP Methods**: GET, POST, PUT, DELETE, PATCH
- **Status Codes**: 200, 201, 400, 404, 500, etc.
- **API Design**: Best practices
- **Versioning**: API versioning strategies

### 15. Database Integration
- **MongoDB**: Using Mongoose ODM
- **PostgreSQL**: Using pg or Sequelize
- **MySQL**: Using mysql2 or Sequelize
- **Connection Pooling**: Manage database connections
- **ORM/ODM**: Object-relational/object-document mapping

### 16. Authentication & Authorization
- **JWT**: JSON Web Tokens
- **bcrypt**: Password hashing
- **Passport.js**: Authentication middleware
- **Session Management**: Express-session
- **OAuth**: Third-party authentication

### 17. Security
- **Helmet.js**: Security headers
- **CORS**: Cross-Origin Resource Sharing
- **Input Validation**: Validate and sanitize input
- **SQL Injection**: Prevent SQL injection
- **XSS**: Cross-site scripting prevention
- **Rate Limiting**: Prevent abuse

### 18. Testing
- **Jest**: Testing framework
- **Mocha/Chai**: Alternative testing setup
- **Supertest**: HTTP assertions
- **Unit Testing**: Test individual functions
- **Integration Testing**: Test API endpoints

### 19. Environment Variables
- **dotenv**: Load environment variables
- **process.env**: Access environment variables
- **Configuration**: Manage different environments
- **Secrets**: Never commit secrets

### 20. Package Management
- **npm**: Node Package Manager
- **package.json**: Project configuration
- **npm scripts**: Run custom scripts
- **Dependencies**: Production vs development
- **Semantic Versioning**: Version numbers

### 21. Clustering and Performance
- **Cluster Module**: Utilize multiple CPU cores
- **PM2**: Process manager
- **Caching**: Redis for caching
- **Load Balancing**: Distribute requests
- **Performance Monitoring**: Monitor app performance

### 22. WebSockets
- **Socket.io**: Real-time communication
- **WebSocket Protocol**: Bidirectional communication
- **Real-time Features**: Chat, notifications, live updates
- **Connection Management**: Handle connections

### 23. File Uploads
- **Multer**: Handle multipart/form-data
- **File Validation**: Type and size validation
- **Storage**: Local or cloud storage
- **Streaming**: Stream large files

### 24. Logging
- **Winston**: Logging library
- **Morgan**: HTTP request logger
- **Log Levels**: error, warn, info, debug
- **Log Rotation**: Manage log files

### 25. Best Practices
- Use async/await over callbacks
- Handle errors properly
- Use environment variables
- Implement proper logging
- Follow RESTful conventions
- Validate input
- Use middleware effectively
- Optimize database queries
- Implement caching
- Use TypeScript for type safety

## Mini Projects
See [projects.md](./projects.md) for complete implementation examples:
- RESTful API with Express
- Authentication System with JWT
- File Upload with Multer
- Real-time Chat with Socket.io
- Rate Limiting Middleware

