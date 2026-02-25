# Node.js - Interview Questions

> **Note**: For practical implementation examples, see [projects.md](./projects.md) which contains complete mini-projects with Express.js, authentication, file uploads, WebSockets, and more.

## Basic Questions (1-25)

### 1. What is Node.js? What are its main features?
**Answer:** Node.js is a JavaScript runtime built on V8 engine. Features:
- Event-driven, non-blocking I/O
- Single-threaded with event loop
- NPM ecosystem
- Cross-platform
- Fast execution

### 2. Explain the event loop in Node.js.
**Answer:** Event loop is mechanism that handles asynchronous operations. It continuously checks call stack and queues (callback, microtask, macrotask), executing callbacks when stack is empty.

### 3. What is the difference between Node.js and JavaScript?
**Answer:** JavaScript is programming language. Node.js is runtime environment that allows JavaScript to run on server-side, providing APIs for file system, networking, etc.

### 4. Explain blocking vs non-blocking I/O.
**Answer:**
- **Blocking**: Code execution stops until operation completes
- **Non-blocking**: Code continues executing, callback handles result

### 5. What are Node.js modules? Explain CommonJS.
**Answer:** Modules are reusable code units. CommonJS uses `require()` to import and `module.exports` to export. Modules are cached after first require.

### 6. Explain the difference between require() and import.
**Answer:**
- **require()**: CommonJS, synchronous, used in Node.js
- **import**: ES6 modules, asynchronous, can be used with type: "module"

### 7. What is the purpose of package.json?
**Answer:** package.json contains project metadata, dependencies, scripts, and configuration. It's required for npm projects.

### 8. Explain the difference between dependencies and devDependencies.
**Answer:**
- **dependencies**: Packages needed in production
- **devDependencies**: Packages only needed during development

### 9. What are streams in Node.js? Why use them?
**Answer:** Streams are objects that handle data in chunks. Used for:
- Large files (memory efficient)
- Real-time data processing
- Piping data between operations

### 10. Explain the different types of streams.
**Answer:**
- **Readable**: Can read data (fs.createReadStream)
- **Writable**: Can write data (fs.createWriteStream)
- **Duplex**: Both readable and writable
- **Transform**: Modify data as it passes through

### 11. What is a Buffer in Node.js?
**Answer:** Buffer is class for handling binary data. It's similar to array but works with raw binary data. Used when working with files, network protocols, etc.

### 12. Explain EventEmitter in Node.js.
**Answer:** EventEmitter is class that allows objects to emit and listen to events. It implements observer pattern. Many Node.js objects inherit from EventEmitter.

### 13. What is middleware in Express.js?
**Answer:** Middleware are functions that execute during request/response cycle. They have access to req, res, and next. Used for logging, authentication, parsing, etc.

### 14. Explain the difference between process.nextTick() and setImmediate().
**Answer:**
- **process.nextTick()**: Executes before any other async operation (highest priority)
- **setImmediate()**: Executes in next iteration of event loop

### 15. What is the purpose of __dirname and __filename?
**Answer:**
- **__dirname**: Absolute path of directory containing current module
- **__filename**: Absolute path of current module file

### 16. How do you handle errors in Node.js?
**Answer:**
- Try/catch for synchronous code
- Error-first callbacks: callback(err, data)
- .catch() for promises
- Error middleware in Express
- process.on('uncaughtException')

### 17. Explain the cluster module in Node.js.
**Answer:** Cluster module allows creating child processes that share server ports. Enables utilizing multiple CPU cores, improving performance for CPU-intensive applications.

### 18. What is the difference between spawn() and exec() in child_process?
**Answer:**
- **spawn()**: Returns stream, better for large data, more flexible
- **exec()**: Returns buffer, simpler API, limited buffer size

### 19. Explain RESTful API design principles.
**Answer:**
- Stateless: Each request contains all information
- Resource-based URLs
- HTTP methods (GET, POST, PUT, DELETE)
- Status codes
- JSON data format

### 20. What is JWT? How is it used in Node.js?
**Answer:** JWT (JSON Web Token) is token format for securely transmitting information. Used for authentication. Contains header, payload, and signature.

### 21. Explain the difference between PUT and PATCH.
**Answer:**
- **PUT**: Replace entire resource
- **PATCH**: Partial update of resource

### 22. What is CORS? How do you handle it in Express?
**Answer:** CORS (Cross-Origin Resource Sharing) allows resources to be requested from different domain. Handle with cors middleware or custom headers.

### 23. Explain the purpose of body-parser middleware.
**Answer:** body-parser parses incoming request bodies. Converts JSON, URL-encoded, or multipart data into JavaScript objects accessible via req.body.

### 24. What is the difference between app.use() and app.get()?
**Answer:**
- **app.use()**: Mounts middleware for all HTTP methods
- **app.get()**: Handles only GET requests for specific route

### 25. Explain environment variables in Node.js.
**Answer:** Environment variables are configuration values stored outside code. Accessed via process.env. Use dotenv package to load from .env file.

## Intermediate Questions (26-50)

### 26. How do you implement authentication in Node.js?
**Answer:** Use JWT tokens, bcrypt for password hashing, middleware to verify tokens, store tokens securely (httpOnly cookies or localStorage).

### 27. Explain the difference between process.env and process.argv.
**Answer:**
- **process.env**: Environment variables
- **process.argv**: Command-line arguments as array

### 28. What is the purpose of the crypto module?
**Answer:** crypto module provides cryptographic functionality: hashing, encryption, decryption, digital signatures, random number generation.

### 29. Explain the difference between fs.readFile and fs.readFileSync.
**Answer:**
- **fs.readFile**: Asynchronous, non-blocking, uses callback
- **fs.readFileSync**: Synchronous, blocking, returns result directly

### 30. How do you handle file uploads in Node.js?
**Answer:** Use multer middleware for multipart/form-data, validate file type and size, save to disk or cloud storage, return file URL.

### 31. Explain the purpose of the path module.
**Answer:** path module provides utilities for working with file and directory paths. Handles path joining, resolution, normalization across different operating systems.

### 32. What is the difference between exports and module.exports?
**Answer:**
- **exports**: Reference to module.exports
- **module.exports**: What actually gets exported
- Can't reassign exports, must use module.exports

### 33. Explain the purpose of the util module.
**Answer:** util module provides utility functions: promisify (convert callbacks to promises), inheritance, debugging, formatting.

### 34. How do you implement rate limiting in Node.js?
**Answer:** Use express-rate-limit middleware or custom implementation with Redis. Track requests per IP, block after threshold.

### 35. Explain the difference between setInterval and setTimeout.
**Answer:**
- **setTimeout**: Executes function once after delay
- **setInterval**: Repeatedly executes function at intervals

### 36. What is the purpose of the os module?
**Answer:** os module provides operating system-related utility functions: platform info, CPU info, memory info, network interfaces.

### 37. Explain the difference between readFile and createReadStream.
**Answer:**
- **readFile**: Reads entire file into memory
- **createReadStream**: Reads file in chunks (stream), memory efficient for large files

### 38. How do you implement logging in Node.js?
**Answer:** Use winston or morgan libraries. Configure log levels, format, and destinations (console, file, remote service).

### 39. Explain the purpose of the querystring module.
**Answer:** querystring module provides utilities for parsing and formatting URL query strings. Converts between objects and query strings.

### 40. What is the difference between app.listen() and server.listen()?
**Answer:**
- **app.listen()**: Express convenience method, creates HTTP server
- **server.listen()**: Node.js http.Server method, more control

### 41. How do you handle database connections in Node.js?
**Answer:** Use connection pooling, handle connection errors, implement retry logic, close connections properly, use ORM/ODM libraries.

### 42. Explain the purpose of the zlib module.
**Answer:** zlib module provides compression/decompression using gzip, deflate, brotli. Used for reducing response sizes, file compression.

### 43. What is the difference between process.exit() and process.kill()?
**Answer:**
- **process.exit()**: Gracefully exits current process with code
- **process.kill()**: Sends signal to process (can kill other processes)

### 44. How do you implement caching in Node.js?
**Answer:** Use in-memory cache (Map/Set), Redis for distributed caching, set expiration, invalidate on updates, use appropriate cache keys.

### 45. Explain the purpose of the url module.
**Answer:** url module provides utilities for URL resolution and parsing. Parses URLs into components (protocol, host, path, query).

### 46. What is the difference between req.params and req.query?
**Answer:**
- **req.params**: Route parameters (/users/:id)
- **req.query**: Query string parameters (?name=John)

### 47. How do you implement WebSockets in Node.js?
**Answer:** Use socket.io library, handle connection events, emit and listen to events, manage rooms/namespaces, handle disconnections.

### 48. Explain the purpose of the http module.
**Answer:** http module provides HTTP server and client functionality. Used to create servers, make HTTP requests, handle HTTP protocol.

### 49. What is the difference between app.use() and app.all()?
**Answer:**
- **app.use()**: Mounts middleware, matches all paths starting with route
- **app.all()**: Matches all HTTP methods for exact route

### 50. How do you handle errors in Express.js?
**Answer:** Use error-handling middleware (4 parameters: err, req, res, next), try/catch in async routes, use next(err) to pass errors, centralize error handling.

## Advanced Questions (51-75)

### 51. Implement a custom middleware for authentication.
**Answer:**
```javascript
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```

### 52. Implement a rate limiter using Redis.
**Answer:**
```javascript
const redis = require('redis');
const client = redis.createClient();

async function rateLimit(req, res, next) {
  const key = `rate_limit:${req.ip}`;
  const current = await client.incr(key);
  if (current === 1) await client.expire(key, 60);
  if (current > 100) return res.status(429).send('Too many requests');
  next();
}
```

### 53. Implement a file upload handler with validation.
**Answer:**
```javascript
const multer = require('multer');
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});
```

### 54. Implement a custom logger using Winston.
**Answer:**
```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 55. Implement connection pooling for PostgreSQL.
**Answer:**
```javascript
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database: 'mydb',
  max: 20,
  idleTimeoutMillis: 30000
});

async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}
```

### 56. Implement a custom error class.
**Answer:**
```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage
throw new AppError('User not found', 404);
```

### 57. Implement a caching middleware.
**Answer:**
```javascript
const cache = new Map();

function cacheMiddleware(duration) {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);
    
    if (cached && Date.now() < cached.expiry) {
      return res.json(cached.data);
    }
    
    const originalJson = res.json;
    res.json = function(data) {
      cache.set(key, {
        data,
        expiry: Date.now() + duration
      });
      originalJson.call(this, data);
    };
    
    next();
  };
}
```

### 58. Implement a request validator middleware.
**Answer:**
```javascript
function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details.map(d => d.message).join(', ')
      });
    }
    next();
  };
}

// Usage with Joi
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
app.post('/users', validateRequest(userSchema), createUser);
```

### 59. Implement a WebSocket server with Socket.io.
**Answer:**
```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-room', (room) => {
    socket.join(room);
  });
  
  socket.on('message', (data) => {
    io.to(data.room).emit('message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
```

### 60. Implement a health check endpoint.
**Answer:**
```javascript
app.get('/health', async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    database: await checkDatabase(),
    redis: await checkRedis()
  };
  
  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = 'ERROR';
    res.status(503).json(healthcheck);
  }
});
```

### 61. Implement a graceful shutdown handler.
**Answer:**
```javascript
function gracefulShutdown(signal) {
  process.on(signal, () => {
    console.log(`Received ${signal}, closing server...`);
    server.close(() => {
      console.log('HTTP server closed');
      db.close(() => {
        console.log('Database closed');
        process.exit(0);
      });
    });
  });
}

gracefulShutdown('SIGTERM');
gracefulShutdown('SIGINT');
```

### 62. Implement a request ID middleware.
**Answer:**
```javascript
const { v4: uuidv4 } = require('uuid');

function requestIdMiddleware(req, res, next) {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
}

// Add to logger
logger.info('Request', { requestId: req.id, method: req.method, url: req.url });
```

### 63. Implement a compression middleware.
**Answer:**
```javascript
const compression = require('compression');
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6
}));
```

### 64. Implement a CORS middleware with options.
**Answer:**
```javascript
function corsMiddleware(req, res, next) {
  const allowedOrigins = ['http://localhost:3000', 'https://example.com'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
}
```

### 65. Implement a request timeout middleware.
**Answer:**
```javascript
function timeoutMiddleware(timeout) {
  return (req, res, next) => {
    req.setTimeout(timeout, () => {
      res.status(408).json({ error: 'Request timeout' });
    });
    next();
  };
}
```

### 66. Implement a response time middleware.
**Answer:**
```javascript
function responseTimeMiddleware(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
    res.setHeader('X-Response-Time', `${duration}ms`);
  });
  next();
}
```

### 67. Implement a session management system.
**Answer:**
```javascript
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
```

### 68. Implement a password hashing utility.
**Answer:**
```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
```

### 69. Implement a JWT token generator and verifier.
**Answer:**
```javascript
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
```

### 70. Implement a database transaction wrapper.
**Answer:**
```javascript
async function withTransaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
```

### 71. Implement a retry mechanism for failed requests.
**Answer:**
```javascript
async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}
```

### 72. Implement a queue system using Bull.
**Answer:**
```javascript
const Queue = require('bull');
const emailQueue = new Queue('email', {
  redis: { host: 'localhost', port: 6379 }
});

emailQueue.process(async (job) => {
  const { to, subject, body } = job.data;
  await sendEmail(to, subject, body);
});

// Add job
emailQueue.add({ to: 'user@example.com', subject: 'Welcome', body: '...' });
```

### 73. Implement a custom stream transformer.
**Answer:**
```javascript
const { Transform } = require('stream');

class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

const upperCase = new UpperCaseTransform();
readableStream.pipe(upperCase).pipe(writableStream);
```

### 74. Implement a cluster setup for Node.js.
**Answer:**
```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  require('./server');
}
```

### 75. Implement a monitoring and metrics collection system.
**Answer:**
```javascript
const prometheus = require('prom-client');

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

function metricsMiddleware(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration.observe({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode
    }, duration);
  });
  next();
}

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});
```

### 76. What is the difference between require() and import() in Node.js?
**Answer:** require() is CommonJS, synchronous, and runs at runtime. import is ES modules, can be static, and is the standard in ES6. Use "type": "module" in package.json for native ESM; then use import/export.

### 77. Explain the Node.js module caching behavior.
**Answer:** Modules are cached after first require(). Same path returns the same instance. Clearing cache: delete require.cache[require.resolve('./module')]. Useful in tests; otherwise expect single instance per path.

### 78. What is process.nextTick() vs setImmediate()?
**Answer:** process.nextTick() runs before the next event loop iteration (same phase, microtask-like). setImmediate() runs in the check phase of the next iteration. nextTick has higher priority; use setImmediate for yielding to I/O.

### 79. How do you read environment variables in Node.js?
**Answer:** process.env.VAR_NAME. Use dotenv package to load from .env file (require('dotenv').config()). Never commit .env; use .env.example as template. For production use real env (e.g. Vercel, AWS).

### 80. What is the purpose of the child_process module?
**Answer:** Spawn and run other processes (scripts, commands). spawn() for streaming output; exec() for buffered output; execFile() for executables; fork() for Node scripts with IPC. Use for CLI tools, workers, or shell commands.

### 81. Explain the difference between fs.promises and fs callback API.
**Answer:** fs.promises exposes async/await versions (fs.promises.readFile). Callback API (fs.readFile with callback) is the original. Prefer fs.promises or require('fs').promises for promise-based code.

### 82. What is the purpose of the events module?
**Answer:** Provides EventEmitter class for custom events. .on(), .once(), .emit(), .removeListener(). Used by many Node APIs (streams, http). Use for decoupling and custom event-driven logic.

### 83. How do you handle uncaught exceptions in Node.js?
**Answer:** process.on('uncaughtException', (err) => { ... }). Log, clean up, then process.exit(1). Uncaught exceptions leave the process in an undefined state; restart is recommended. Use for logging; fix the bug.

### 84. What is the difference between Buffer.alloc() and Buffer.allocUnsafe()?
**Answer:** alloc() fills with zeros (safe). allocUnsafe() does not initialize (faster but may expose old data). Use alloc() unless you overwrite immediately; allocUnsafe() for performance-critical buffers.

### 85. Explain the purpose of the net and dgram modules.
**Answer:** net: TCP sockets (createServer, connect). dgram: UDP (createSocket). Use for custom protocols, real-time apps, or when HTTP is not enough. Most apps use HTTP or WebSockets on top.

### 86. What is the purpose of the readline module?
**Answer:** Read input line by line (e.g. from stdin or a file). createInterface({ input, output }). Use for CLI prompts, parsing log files line by line. For files, also consider createReadStream + split.

### 87. How do you implement a simple HTTP server without Express?
**Answer:** const http = require('http'); http.createServer((req, res) => { res.writeHead(200); res.end('OK'); }).listen(3000); Use req.url and req.method to route; for APIs, parse JSON and set headers.

### 88. What is the purpose of the cluster module?
**Answer:** Run multiple processes (workers) that share the same port. Master forks workers; workers handle requests. Use to utilize multiple CPU cores. Load is distributed by the OS (e.g. round-robin on some platforms).

### 89. Explain the difference between stream.pipe() and manual read/write.
**Answer:** pipe() connects readable to writable; handles backpressure and errors. Manual: read in chunks, write when needed. Use pipe() when possible; manual for custom transformation or flow control.

### 90. What is the purpose of the assert module?
**Answer:** Built-in assertions (assert.strictEqual, assert.ok, assert.throws). Use in tests or for invariants. Prefer a test framework (Jest, Mocha) for full tests; assert is minimal.

### 91. How do you parse JSON safely in Node.js?
**Answer:** JSON.parse(str) throws on invalid JSON. Wrap in try/catch or use a reviver for custom parsing. For large or streaming JSON, use a streaming parser (e.g. JSONStream) to avoid memory spikes.

### 92. What is the difference between __dirname and process.cwd()?
**Answer:** __dirname is the directory of the current module file. process.cwd() is the working directory where the process was started. They differ when the script is run from another directory; __dirname is stable.

### 93. Explain the purpose of the vm module.
**Answer:** Run code in a V8 context (sandbox). vm.runInNewContext(code) isolates globals. Use with care; not a security boundary. Useful for plugins or DSLs; for full isolation use child_process.

### 94. How do you handle SIGTERM and SIGINT for graceful shutdown?
**Answer:** process.on('SIGTERM', () => { stopServer(); closeDb(); process.exit(0); }); Stop accepting new connections, finish in-flight requests, close DB/connections, then exit. Same for SIGINT (Ctrl+C).

### 95. What is the purpose of the perf_hooks module?
**Answer:** Performance measurement: perf_hooks.performance.now(), PerformanceObserver. Use for measuring execution time, marks and measures. Helpful for profiling and monitoring.

### 96. Explain the difference between app.get() and app.use() in Express.
**Answer:** app.get() matches GET method and path; app.use() matches path prefix and all methods (or no path for global middleware). Use app.get() for routes; app.use() for middleware or router.

### 97. How do you serve static files in Express?
**Answer:** app.use(express.static('public')); Serves files from the given directory. For multiple dirs add more static middleware. Set Cache-Control headers for production (e.g. with maxAge).

### 98. What is the purpose of the helmet middleware?
**Answer:** Sets security-related HTTP headers (X-Content-Type-Options, X-Frame-Options, etc.). Reduces risk of common attacks. Use app.use(helmet()) in production.

### 99. Explain the difference between req.body and req.query.
**Answer:** req.body: parsed body (JSON or urlencoded) from POST/PUT. req.query: query string (e.g. ?id=1). Both depend on middleware (body-parser/express.json()); query is built-in.

### 100. How do you validate request body in Express?
**Answer:** Use a validation library (Joi, express-validator, zod). Validate after parsing body; return 400 with errors if invalid. Example: const schema = Joi.object({...}); const { error } = schema.validate(req.body);

### 101. What is the purpose of the morgan middleware?
**Answer:** HTTP request logger. Logs method, URL, status, response time. Use app.use(morgan('combined')) or 'dev' for development. Helps with debugging and audit.

### 102. How do you implement async error handling in Express?
**Answer:** Wrap async route handlers: (req, res, next) => { asyncFn().catch(next); } or use express-async-errors. Then use an error middleware (4-arg) to handle errors and send response.

### 103. What is the difference between res.send() and res.json()?
**Answer:** res.json() sets Content-Type to application/json and calls JSON.stringify. res.send() can send string, object (then JSON), or Buffer. For JSON APIs use res.json() for clarity.

### 104. How do you set cookies in Express?
**Answer:** res.cookie('name', 'value', { maxAge, httpOnly, secure, sameSite }); Read with req.cookies (requires cookie-parser). Use httpOnly for auth cookies to reduce XSS risk.

### 105. What is the purpose of the express.Router()?
**Answer:** Modular route handlers. const router = Router(); router.get('/path', ...); app.use('/prefix', router); Organize routes by feature or resource; mount under a path prefix.

### 106. How do you implement request timeout in Node.js?
**Answer:** req.setTimeout(ms) or use middleware that sets a timer and aborts if response not sent. For fetch/axios use AbortController with timeout. Prefer server-side timeout to avoid hung connections.

### 107. What is the purpose of the compression middleware?
**Answer:** Compresses response bodies (gzip/brotli). Reduces size over the network. Use app.use(compression()); Ensure client sends Accept-Encoding. Often done by reverse proxy (nginx).

### 108. How do you connect to MongoDB from Node.js?
**Answer:** Use mongoose or mongodb driver. mongoose.connect(uri). Then define schemas and models. Handle connection events (connected, error). Use connection pooling (default in driver).

### 109. What is the purpose of the dotenv package?
**Answer:** Loads environment variables from .env file into process.env. Call require('dotenv').config() early (e.g. in index.js). Do not commit .env; use .env.example. In production use real env.

### 110. How do you implement file download in Express?
**Answer:** res.download(filePath) or set headers (Content-Disposition: attachment) and pipe file stream to res. For large files use streams to avoid loading into memory.

### 111. What is the difference between npm install and npm ci?
**Answer:** npm install updates package-lock.json and can install latest within range. npm ci installs exactly from package-lock.json; deletes node_modules first. Use ci in CI/CD for reproducible builds.

### 112. How do you run multiple Node versions (nvm, fnm)?
**Answer:** nvm or fnm: install and switch versions (nvm use 18). .nvmrc file specifies version. Use in dev and CI so everyone uses same Node version.

### 113. What is the purpose of the debug package?
**Answer:** Conditional logging via DEBUG env var (e.g. DEBUG=express:*). Avoids console.log in production. Use namespaces (e.g. app:server) and enable in development or when troubleshooting.

### 114. How do you implement request ID for tracing?
**Answer:** Generate UUID per request; set in middleware (req.id = uuid()); add to res header (X-Request-Id); log it in every log line. Use for correlating logs across services.

### 115. What is the purpose of the cors package?
**Answer:** Middleware to set CORS headers (Access-Control-Allow-Origin, etc.). Configure origin, methods, credentials. Use for APIs consumed by browsers from another origin. Restrict origin in production.

### 116. How do you implement health check with DB check?
**Answer:** /health returns 200 if app is up. /ready checks DB (e.g. db.query('SELECT 1')) and returns 200 only if DB is reachable. K8s liveness vs readiness; use ready for dependency checks.

### 117. What is the difference between npm and npx?
**Answer:** npm installs packages. npx runs a package without installing globally (npx create-react-app). Runs from cache or temporary install. Use for one-off tools and CLI runners.

### 118. How do you implement rate limiting per IP in Express?
**Answer:** Use express-rate-limit or similar. Store count per IP (memory or Redis). Limit: max requests per window. Return 429 when exceeded. Use Redis for multi-instance.

### 119. What is the purpose of the bcrypt package?
**Answer:** Hash and compare passwords. bcrypt.hash(password, rounds) and bcrypt.compare(password, hash). Use for storing passwords; never store plain text. Rounds control cost (e.g. 10–12).

### 120. How do you structure a large Express application?
**Answer:** By feature or layer: routes/, controllers/, services/, models/, middleware/. Or by domain (user/, product/). Use Router for each module; keep app.js thin. Config and env in config/.

### 121. What is the purpose of the uuid package?
**Answer:** Generate unique IDs (v4 random, v1 time-based). Use for request IDs, resource IDs, distributed systems. Built-in crypto.randomUUID() in Node 19+; uuid package for older versions.

### 122. How do you implement pagination in an Express API?
**Answer:** Query params: ?page=1&limit=10. Offset = (page-1)*limit. Return { data, total, page, totalPages }. For large datasets consider cursor-based pagination (more stable).

### 123. What is the purpose of the winston logger?
**Answer:** Structured logging with levels (info, error), transports (console, file), and format. Use for production logging; JSON format for log aggregators. Replace console.log in apps.

### 124. How do you mock environment in tests?
**Answer:** process.env.VAR = 'value' before require; or use dotenv with .env.test. Restore in afterEach. For modules that read env at load time, may need to reset module cache.

### 125. What is the purpose of the express-validator?
**Answer:** Validation and sanitization middleware. body('email').isEmail(), validationResult(req). Use for validating and sanitizing input; return 400 with errors. Reduces boilerplate.

### 126. How do you implement WebSocket with ws package?
**Answer:** const WebSocket = require('ws'); const wss = new WebSocket.Server({ server }); wss.on('connection', (ws) => { ws.on('message', (data) => { ... }); }); Handle upgrade; use for real-time bidirectional communication.

### 127. What is the purpose of the nodemon package?
**Answer:** Restarts the Node process when files change. Use in development (nodemon index.js). Speeds up dev loop. Do not use in production.

### 128. How do you implement API versioning in Express?
**Answer:** URL prefix: app.use('/v1', v1Router). Or header/query. Keep old version until clients migrate. Document version in OpenAPI or README.

### 129. What is the purpose of the joi package?
**Answer:** Schema-based validation. Define schema (Joi.object({ name: Joi.string().required() })); validate(data). Use for request body, config, env. Returns { value, error }; throw or return 400 on error.

### 130. How do you run tests with Jest in Node?
**Answer:** npm test runs Jest. Put tests in __tests__ or *.test.js. Use describe/it; mock with jest.mock(). For integration tests, start server or use supertest to hit HTTP. Run in CI.

### 131. What is the purpose of the supertest package?
**Answer:** Test HTTP endpoints. request(app).get('/api/users').expect(200). Use in integration tests; no need to listen on port. Chain .expect() for status and body.

### 132. How do you implement graceful shutdown with open connections?
**Answer:** Track connections (server.on('connection', track)); on SIGTERM stop server (server.close()), then close each connection, close DB, then exit. Or use a timeout and force exit.

### 133. What is the purpose of the pm2 process manager?
**Answer:** Run and monitor Node apps in production. pm2 start index.js; restart on crash; log management; cluster mode. Use for process management; alternative: systemd or Docker.

### 134. How do you parse multipart form data (file upload)?
**Answer:** Use multer middleware. upload.single('field') or .array('files'). Files in req.file(s); fields in req.body. Validate type and size; store on disk or cloud (S3).

### 135. What is the purpose of the node-cron package?
**Answer:** Schedule recurring tasks (cron syntax). cron.schedule('0 * * * *', () => { ... }). Use for periodic jobs (cleanup, reports). For distributed systems use a job queue (Bull, agenda).

### 136. How do you implement request/response logging with body?
**Answer:** Middleware that logs req.body and res.body (or clone res.write/res.end to capture). Be careful with PII and size; log in dev only or redact. Use for debugging.

### 137. What is the purpose of the express-async-errors package?
**Answer:** Patches Express so async route handlers automatically pass errors to next(). No need to wrap in try/catch or .catch(next). Reduces boilerplate in async routes.

### 138. How do you implement database migrations in Node?
**Answer:** Use a migration tool (e.g. node-pg-migrate, Knex, Prisma migrate). Migrations are versioned SQL or code; run up/down. Run migrations in CI or deploy step before starting app.

### 139. What is the purpose of the node-fetch or undici?
**Answer:** HTTP client for Node (fetch API). node-fetch or built-in fetch (Node 18+). For streaming or advanced use, undici. Use for calling other APIs from the server.

### 140. How do you implement retry logic for external API calls?
**Answer:** Retry with exponential backoff (delay *= 2), max retries, and only on retryable errors (5xx, network). Use a library (axios-retry, p-retry) or simple loop with delay.

### 141. What is the purpose of the ioredis package?
**Answer:** Redis client for Node. Supports promises, cluster, pub/sub. Use for cache, sessions, rate limiting, queues. Connection pooling and reconnection built-in.

### 142. How do you implement request context (async local storage)?
**Answer:** AsyncLocalStorage (Node 12+): run a store in a callback; values available in same async chain. Use for request ID, user, tenant. Alternative: cls-hooked for older Node.

### 143. What is the purpose of the knex query builder?
**Answer:** SQL query builder (supports Postgres, MySQL, etc.). Reduces SQL string building; migrations included. Use for flexible queries; for ORM-like use add Objection.js or raw queries.

### 144. How do you implement API key authentication in Express?
**Answer:** Middleware that reads API key from header (X-API-Key) or query; look up in DB or config; attach user/service to req; return 401 if invalid. Use for server-to-server or mobile.

### 145. What is the purpose of the pino logger?
**Answer:** Fast JSON logger for Node. Low overhead; JSON by default. Use for high-throughput apps. Transports for pretty-print or send to log aggregator.

### 146. How do you implement circuit breaker for external calls?
**Answer:** Track failures per dependency; after threshold open circuit (fail fast); after timeout try again (half-open). Use a library (opossum) or implement state machine. Prevents cascading failures.

### 147. What is the purpose of the bull queue?
**Answer:** Job queue backed by Redis. Add jobs (with delay, repeat); workers process jobs. Use for background tasks (emails, reports). Retries, rate limiting, and dashboard (Bull Board) available.

### 148. How do you implement response compression per route?
**Answer:** Use compression() middleware; it compresses when Accept-Encoding includes gzip. For per-route, apply compression only to specific router or use res.setHeader and manual compress (rare).

### 149. What is the purpose of the helmet middleware options?
**Answer:** helmet() enables sensible defaults. Customize: helmet({ contentSecurityPolicy: false }) to disable, or pass options per middleware. Tune for your app (e.g. CSP for XSS).

### 150. How do you implement request validation with Zod?
**Answer:** const schema = z.object({ body: z.object({...}) }); const parsed = schema.parse({ body: req.body }); req.body = parsed.body. On error Zod throws; catch and return 400. TypeScript-friendly.

### 151. What is the purpose of the express-mongo-sanitize?
**Answer:** Removes $ and . from user input to prevent NoSQL injection (e.g. req.body with $gt). Use as middleware before using body in queries. Simple but important for MongoDB.

### 152. How do you implement server-sent events (SSE) in Node?
**Answer:** Set headers (Content-Type: text/event-stream, Cache-Control: no-cache); keep connection open; res.write('data: ...\n\n'). Use for one-way server push (notifications, progress).

### 153. What is the purpose of the config package?
**Answer:** Loads config by NODE_ENV (development, production). config/default.json, config/production.json. Use for app config; secrets from env. Alternative: dotenv + custom config module.

### 154. How do you implement correlation ID across services?
**Answer:** Generate or read X-Correlation-Id from incoming request; pass to all outbound requests (headers). Log it everywhere. Use for distributed tracing; can integrate with OpenTelemetry.

### 155. What is the purpose of the node-postgres (pg) package?
**Answer:** PostgreSQL client for Node. Pool for connection pooling; query() for SQL. Use for relational DB. Prefer parameterized queries to avoid SQL injection.

### 156. How do you implement request size limit in Express?
**Answer:** express.json({ limit: '10kb' }); or use express.json() then middleware that checks req.body size (body already parsed). Reject with 413. Protects against large payloads.

### 157. What is the purpose of the express-rate-limit store (Redis)?
**Answer:** Store rate limit counters in Redis so limits apply across multiple app instances. Use with express-rate-limit and custom store (rate-limit-redis). Essential for horizontal scaling.

### 158. How do you implement structured error responses?
**Answer:** Error middleware formats errors: { code, message, details }. Use custom error classes (AppError with statusCode). In production hide stack and internal details; log full error.

### 159. What is the purpose of the cls-hooked (async local storage)?
**Answer:** Continuation-local storage: attach data to the async context (request id, user). Alternative to passing req everywhere. Node 12+ has AsyncLocalStorage; use cls-hooked for older versions.

### 160. How do you implement API documentation with Swagger?
**Answer:** Use swagger-jsdoc (JSDoc to OpenAPI) and swagger-ui-express. Annotate routes; serve UI at /api-docs. Keep spec in sync with code; can generate client from OpenAPI.

### 161. What is the purpose of the node-cache package?
**Answer:** In-memory key-value cache with TTL. Simple get/set/del. Use for single-instance caching (sessions, rate limit). For multi-instance use Redis.

### 162. How do you implement database connection retry on startup?
**Answer:** Retry loop with delay (e.g. 5 times, 2s delay). Try connect(); on success break; on error wait and retry. Exit with 1 if all retries fail. Handles DB not ready at deploy time.

### 163. What is the purpose of the hpp (HTTP parameter pollution) middleware?
**Answer:** Prevents parameter pollution (e.g. ?id=1&id=2). Chooses first or last value. Use to avoid unexpected behavior and security issues. app.use(hpp()).

### 164. How do you implement request timeout middleware?
**Answer:** Set req.setTimeout(ms) and res.setTimeout(ms); or wrap next() in a timer that calls next(err) if handler does not finish. Clear timer when response is sent. Prefer server-level timeout.

### 165. What is the purpose of the express-mung?
**Answer:** Transform response body before sending (e.g. add envelope, redact). Less common than custom middleware. Use when you need to modify all JSON responses in one place.

### 166. How do you implement health check for Redis?
**Answer:** In /ready or /health, call redis.ping() or redis.get('health'). If it fails, return 503. Ensures app does not accept traffic if cache is down (when cache is required).

### 167. What is the purpose of the node:test module (Node 18+)?
**Answer:** Built-in test runner. describe, it, mock. Run with node --test. Use for unit tests without Jest/Mocha. Good for small projects or avoiding extra deps.

### 168. How do you implement API versioning with header?
**Answer:** Read Accept or custom header (e.g. X-API-Version: 1). Route to v1 or v2 router. Document in API docs. Same URL, different behavior by version.

### 169. What is the purpose of the express-validator sanitization?
**Answer:** Sanitize input (trim, escape, toLowerCase). Prevents XSS and normalizes data. Use with validation: body('email').trim().isEmail(). Chain sanitize then validate.

### 170. How do you implement request logging with response time?
**Answer:** Middleware: record start time; on res.finish compute duration; log method, url, status, duration. Or use morgan with :response-time. Helps find slow endpoints.

### 171. What is the purpose of the node --inspect flag?
**Answer:** Enables DevTools protocol for debugging. Chrome chrome://inspect to attach. Use for breakpoints and profiling. Not for production.

### 172. How do you implement graceful reload (zero-downtime)?
**Answer:** Cluster: send signal to workers to finish and exit; master spawns new workers. Or use PM2 reload. New code in new workers; old workers drain then exit.

### 173. What is the purpose of the NODE_OPTIONS env var?
**Answer:** Pass options to Node (e.g. NODE_OPTIONS=--max-old-space-size=4096). Use for memory limit, inspect, or other flags. Applied to every node process in that env.

### 174. How do you implement request deduplication (idempotency)?
**Answer:** Client sends Idempotency-Key header. Server stores key with response (in cache or DB) and TTL. Duplicate request returns stored response. Use for payments, orders.

### 175. What is the purpose of the Node.js --max-old-space-size flag?
**Answer:** Sets V8 heap size (e.g. --max-old-space-size=4096 for 4GB). Use when Node runs out of memory (OOM). Increase for memory-heavy apps; also optimize leaks.

### 176. How do you implement request/response logging with request ID?
**Answer:** Middleware generates or reads X-Request-Id; attaches to req; logs with every line; returns in response header. Use for tracing across services and debugging.

### 177. What is the purpose of the Node.js --experimental-vm-modules flag?
**Answer:** Enables ES modules in vm module (vm.Module). Use when running dynamic code in VM with import/export. Experimental; check Node version.

### 178. How do you implement API key rotation without downtime?
**Answer:** Support multiple keys per client (primary + secondary); add new key; clients switch; deprecate old key after grace period; remove. Document rotation policy.

### 179. What is the difference between Node.js LTS and Current?
**Answer:** LTS (Long Term Support): stable, longer support, recommended for production. Current: latest features, shorter support. Use LTS for production; Current for testing new features.

### 180. How do you implement request validation with Joi schemas?
**Answer:** Define schema (Joi.object({ name: Joi.string().required() })); validate(req.body) in middleware; return 400 with errors if invalid. Use for body, query, params.

### 181. What is the purpose of the Node.js --trace-warnings flag?
**Answer:** Prints stack trace for process warnings. Use for debugging deprecation or other warnings. Not for production.

### 182. How do you implement graceful shutdown with in-flight requests?
**Answer:** On SIGTERM stop accepting new connections (server.close()); wait for in-flight requests to finish (track count, timeout); close DB; then exit. Use timeout to force exit.

### 183. What is the difference between npm run and npx?
**Answer:** npm run runs script from package.json scripts. npx runs package binary (installed or temporary). Use npm run for defined scripts; npx for one-off or external tools.

### 184. How do you implement structured logging with Pino?
**Answer:** Use pino logger; log JSON with level, msg, and custom fields (reqId, userId). Use child loggers per request. Send to stdout; use transport for file or remote.

### 185. What is the purpose of the Node.js --enable-source-maps flag?
**Answer:** Enables source map support for stack traces (TypeScript, transpiled). Use in development and production for readable stack traces. Requires source maps in build.

### 186. How do you implement database connection health check?
**Answer:** Run simple query (e.g. SELECT 1 or ping); if success return 200; if fail return 503. Use in /ready endpoint. Run periodically or on demand.

### 187. What is the difference between process.env and process.config?
**Answer:** process.env is environment variables (string values). process.config is Node build configuration (from node -p process.config). Use env for app config; config for Node internals.

### 188. How do you implement request timeout with AbortController?
**Answer:** Create AbortController; pass signal to fetch or request; setTimeout to abort after ms. Cancel in-flight request on timeout. Use for HTTP client timeout.

### 189. What is the purpose of the Node.js --unhandled-rejections flag?
**Answer:** Controls unhandled rejection behavior: warn (default), strict (throw), none. Use strict in tests to fail on unhandled rejection. Set in NODE_OPTIONS or command line.

### 190. How do you implement response caching in Express?
**Answer:** Middleware checks cache (e.g. by URL + query); if hit return cached response (304 or body); if miss call next(), then cache response. Use for GET only; set Cache-Control.

### 191. What is the difference between require('fs') and require('fs').promises?
**Answer:** require('fs') gives callback-based API. require('fs').promises or fs.promises gives Promise-based API. Use promises for async/await; callback for streams or legacy.

### 192. How do you implement request body size limit?
**Answer:** express.json({ limit: '10kb' }) or body-parser limit. Reject with 413 if exceeded. Use to prevent large payload DoS. Set per route or globally.

### 193. What is the purpose of the Node.js --trace-deprecation flag?
**Answer:** Prints stack trace when deprecated API is used. Use for finding and fixing deprecation warnings. Not for production.

### 194. How do you implement CORS with credentials?
**Answer:** Set Access-Control-Allow-Credentials: true; specify exact origin (no *). Client sends credentials: true. Use for cookie or auth header from browser. Restrict origin in production.

### 195. What is the difference between cluster and pm2 cluster mode?
**Answer:** Node cluster module: manual setup, master forks workers. PM2 cluster: PM2 manages workers, restart, reload. Use PM2 for production process management; cluster for custom setup.

### 196. How do you implement error reporting (e.g. Sentry)?
**Answer:** Use Sentry SDK; captureException in error middleware; set context (user, request). Report in production; filter sensitive data. Use for alerting and debugging.

### 197. What is the purpose of the Node.js --max-http-header-size flag?
**Answer:** Sets max HTTP header size (default 16KB). Increase if legitimate requests have large headers (e.g. many cookies). Use sparingly; prefer reducing header size.

### 198. How do you implement request signing for webhooks?
**Answer:** Compute HMAC of body with secret; send in header (e.g. X-Signature). Receiver verifies with same secret; reject if mismatch. Use for webhook authenticity.

### 199. What is the difference between Buffer and Uint8Array?
**Answer:** Buffer is Node-specific, extends Uint8Array, has extra methods (e.g. base64). Uint8Array is standard JS. Use Buffer in Node; Uint8Array for portable code. Buffer is Uint8Array in Node.

### 200. How do you implement database transaction in Express route?
**Answer:** Start transaction (client.query('BEGIN')); run queries; on success commit; on error rollback. Use try/finally to always release connection. Or use ORM transaction method.

### 201. What is the purpose of the Node.js --expose-gc flag?
**Answer:** Exposes global.gc() for manual garbage collection (if node started with --expose-gc). Use for testing or tuning; not for production logic. Requires --expose-gc.

### 202. How do you implement rate limiting with sliding window?
**Answer:** Store timestamps per key (e.g. in Redis); remove timestamps outside window; if count under limit allow and add timestamp; else 429. More accurate than fixed window.

### 203. What is the difference between res.send and res.end?
**Answer:** res.send handles object (JSON), string, Buffer, sets Content-Type; res.end only sends body. Use res.send for Express; res.end for raw http or when you set headers manually.

### 204. How do you implement request correlation across services?
**Answer:** Read or generate X-Correlation-Id in gateway; pass to all downstream requests (header); log in every service. Use for distributed tracing and debugging.

### 205. What is the purpose of the Node.js --trace-sync-io flag?
**Answer:** Prints stack trace when sync I/O is detected after first tick. Use for finding blocking operations. Not for production; use for debugging performance.

### 206. How do you implement API versioning with URL path?
**Answer:** app.use('/api/v1', v1Router); app.use('/api/v2', v2Router). Version in path; clear and cacheable. Document and support old version during migration.

### 207. What is the difference between stream.finish and stream.end?
**Answer:** stream.end() signals no more writes; stream fires 'finish' when all data flushed. Use end() to close write side; listen to 'finish' for cleanup or response.

### 208. How do you implement health check for external dependencies?
**Answer:** /ready calls each dependency (DB, Redis, API); if any fails return 503 with details. Use for K8s readiness; don't send traffic if dependency down. Timeout per check.

### 209. What is the purpose of the Node.js --throw-deprecation flag?
**Answer:** Throws error when deprecated API is used (instead of warning). Use in tests or CI to catch deprecations. Not for production.

### 210. How do you implement request deduplication with Redis?
**Answer:** Use Idempotency-Key as Redis key; value is response or status; TTL (e.g. 24h). On request check key; if exists return stored response; else process and store. Use for POST idempotency.

### 211. What is the difference between child_process.spawn and child_process.fork?
**Answer:** spawn launches any command; fork is spawn for Node script with IPC channel. Use fork for Node workers that communicate with parent; spawn for shell commands or other binaries.

### 212. How do you implement graceful reload with PM2?
**Answer:** pm2 reload app zero-downtime: new workers start; old workers drain and exit. Use for zero-downtime deploy. Ensure app handles SIGTERM and drains.

### 213. What is the purpose of the Node.js --no-warnings flag?
**Answer:** Suppresses process warnings. Use sparingly (e.g. known third-party warning). Prefer fixing warning over suppressing.

### 214. How do you implement request context with AsyncLocalStorage?
**Answer:** AsyncLocalStorage.run(store, () => { ... }) wraps request handler; store is available in same async chain. Set requestId, user in store; use in logs and downstream. Node 12+.

### 215. What is the difference between module.exports and exports?
**Answer:** module.exports is the actual export; exports is shorthand that works only when you assign properties (exports.foo = x). Assigning exports = x does not work. Prefer module.exports.

### 216. How do you implement API documentation with OpenAPI?
**Answer:** Write or generate OpenAPI spec (YAML/JSON); serve with swagger-ui-express or redoc. Validate requests with openapi-validator. Keep spec in sync with routes; consider code-first or spec-first.

### 217. What is the purpose of the Node.js --trace-uncaught flag?
**Answer:** Prints stack trace for uncaught exceptions (in addition to default behavior). Use for debugging. Node 18+.

### 218. How do you implement request timeout in Express middleware?
**Answer:** Set req.setTimeout(ms) and res.setTimeout(ms); or wrap next() in timer that calls next(error) if handler does not finish in time. Clear timer when response sent. Use for preventing hung requests.

### 219. What is the difference between setImmediate and setTimeout(fn, 0)?
**Answer:** setImmediate runs in check phase; setTimeout(fn, 0) runs in timer phase (minimum 1ms in browser, similar in Node). Order may differ in same tick. Use setImmediate for yielding to I/O.

### 220. How do you implement database connection pool sizing?
**Answer:** Size pool to max expected concurrent queries and DB max_connections. Rule of thumb: pool size = num_workers * 2 or less. Monitor pool usage; adjust based on load.

### 221. What is the purpose of the Node.js --trace-exit flag?
**Answer:** Prints stack trace when process exits (normal or not). Use for debugging exit conditions. Not for production.

### 222. How do you implement response compression per route?
**Answer:** Apply compression() middleware to specific router or route; or skip compression for certain routes in middleware (check path). Most apps use global compression; per-route is rare.

### 223. What is the difference between err.code and err.errno?
**Answer:** err.code is string (e.g. 'ECONNREFUSED'); err.errno is numeric (e.g. -61). Use code for comparison; errno for system errors. Check code for portable handling.

### 224. How do you implement request validation with Zod?
**Answer:** Define schema with z.object({ body: z.object({...}) }); parse({ body: req.body }); on success assign to req; on error return 400 with Zod errors. Use for type-safe validation.

### 225. What is the purpose of the Node.js --disable-warning flag?
**Answer:** Disables specific warning by code (e.g. --disable-warning=DeprecationWarning). Use for suppressing known warning; prefer fixing. Node 18+.

### 226. How do you implement WebSocket with authentication?
**Answer:** Validate token or session on connection (e.g. from query or first message); if invalid close connection. Use same auth as HTTP (JWT, session). Restrict to authenticated users.

### 227. What is the difference between process.cwd() and process.execPath?
**Answer:** process.cwd() is current working directory (where process was started). process.execPath is path to Node binary. Use cwd for relative paths; execPath for spawning same Node.

### 228. How do you implement request rate limit per user?
**Answer:** Identify user (token, API key); count requests per user in window (Redis or memory); if over limit return 429. Use same logic as per-IP but keyed by user. Stricter limit per user.

### 229. What is the purpose of the Node.js --trace-atomics-wait flag?
**Answer:** Traces Atomics.wait usage. Use for debugging shared memory. Rare; for advanced concurrency.

### 230. How do you implement server-sent events with authentication?
**Answer:** Validate auth on GET request (cookie or header); if invalid return 401. Stream events only to authenticated client. Use same auth middleware as REST.

### 231. What is the difference between stream.readable and stream.writable?
**Answer:** readable is true if stream has readable side and can be read; writable is true if stream can be written. Use for checking stream state before read/write. Check stream type (Readable vs Writable).

### 232. How do you implement database migration rollback?
**Answer:** Migration tool supports down() or separate rollback scripts. Run down in order (reverse of up). Use in CI or manually for rollback. Test rollback before production.

### 233. What is the purpose of the Node.js --trace-warnings flag?
**Answer:** Prints stack trace for process warnings. Use for debugging deprecation or other warnings. Helps find source of warning.

### 234. How do you implement request body parsing for XML?
**Answer:** Use xml2js or similar; middleware parses body when Content-Type is application/xml; attach to req.body. Validate and sanitize; use for legacy or XML APIs.

### 235. What is the difference between global and globalThis?
**Answer:** global is Node alias for global object; globalThis is standard (ES2020) cross-environment. Use globalThis for portable code (browser, Node, worker); global in Node only.

### 236. How do you implement API key with scope or permissions?
**Answer:** Store API key with scope (e.g. read_only, admin); on request validate key and check scope for route; return 403 if insufficient. Use for fine-grained API access.

### 237. What is the purpose of the Node.js --trace-event-categories flag?
**Answer:** Enables trace events for specified categories (e.g. node, v8). Use for profiling and performance analysis. Output to file or stream.

### 238. How do you implement response streaming for large data?
**Answer:** Use res.write() in chunks or pipe readable stream to res. Set Transfer-Encoding: chunked (automatic with write). Use for large JSON array, CSV export, or file stream.

### 239. What is the difference between require.resolve and require.cache?
**Answer:** require.resolve(path) returns resolved path of module. require.cache is object of loaded modules (key = path). Use resolve for path; cache for clearing or inspecting loaded modules.

### 240. How do you implement request logging with sanitization?
**Answer:** Log method, URL, status, duration; sanitize body (redact password, token); never log full body in production. Use middleware; configurable redaction list.

### 241. What is the purpose of the Node.js --trace-event-file-pattern flag?
**Answer:** Sets file pattern for trace event output. Use with trace events for profiling. Node 18+.

### 242. How do you implement health check with version info?
**Answer:** /health returns 200 and optionally JSON with version (from package.json or env), uptime. Use for deployment verification. Don't expose sensitive info.

### 243. What is the difference between EventEmitter.on and EventEmitter.once?
**Answer:** on adds listener that stays until removed; once adds listener that runs once then is removed. Use once for one-time events (e.g. connection); on for repeated events.

### 244. How do you implement request timeout with fetch?
**Answer:** Use AbortController; setTimeout to call controller.abort() after ms; pass signal to fetch. fetch throws on abort. Use for client-side or server-side fetch timeout.

### 245. What is the purpose of the Node.js --heap-prof flag?
**Answer:** Enables heap profiler; outputs heap snapshot. Use for memory leak debugging. Not for production; use with chrome devtools or similar.

### 246. How do you implement CORS preflight cache?
**Answer:** Set Access-Control-Max-Age on OPTIONS response; browser caches preflight for that duration. Reduces OPTIONS requests. Use for stable CORS config.

### 247. What is the difference between stream.destroy and stream.end?
**Answer:** stream.end() gracefully closes write side; stream.destroy() immediately destroys stream (error optional). Use destroy for error or force close; end for normal finish.

### 248. How do you implement request retry with exponential backoff?
**Answer:** On failure wait delay (e.g. 2^attempt * baseMs); retry until success or max attempts. Use for external API or DB. Add jitter; respect Retry-After header.

### 249. What is the purpose of the Node.js --cpu-prof flag?
**Answer:** Enables CPU profiler; outputs CPU profile. Use for CPU bottleneck analysis. Not for production; use with chrome devtools or similar.

### 250. How do you implement API versioning with Accept header?
**Answer:** Read Accept: application/vnd.api+v1+json; route to v1 or v2 handler. No URL change; cache key must include version. Document header format. Less common than URL versioning.

### 251. What is the difference between Buffer.from and Buffer.alloc?
**Answer:** Buffer.from creates from string, array, or buffer (copy). Buffer.alloc(size) creates new buffer of size (zero-filled). Use from for existing data; alloc for new buffer of known size.

### 252. How do you implement request size limit per route?
**Answer:** Apply express.json({ limit }) or body parser with limit to specific router or route. Different limits for upload vs API. Use middleware order to apply before route handler.

### 253. What is the purpose of the Node.js --diagnostic-dir flag?
**Answer:** Sets directory for diagnostic output (heap dump, CPU profile, etc.). Use for capturing diagnostics in known location. Node 18+.

### 254. How do you implement database query logging?
**Answer:** Log query and params (sanitized) in development; optional in production. Use ORM hook or pool middleware. Never log passwords; redact sensitive params.

### 255. What is the difference between res.redirect and res.redirect with status?
**Answer:** res.redirect(url) defaults to 302; res.redirect(301, url) or res.redirect(status, url) for permanent or other code. Use 301 for permanent redirect; 302 for temporary.

### 256. How do you implement request validation with express-validator?
**Answer:** Use body(), param(), query() chains; validationResult(req); if errors return 400 with errors array. Chain sanitize and validate. Use for body, params, query.

### 257. What is the purpose of the Node.js --report-on-signal flag?
**Answer:** Generates report on specified signal (e.g. SIGUSR2). Use for on-demand diagnostic report (heap, CPU) in production. Node 18+.

### 258. How do you implement graceful shutdown with WebSocket connections?
**Answer:** On SIGTERM stop accepting new WS; notify clients (e.g. close frame); wait for connections to close or timeout; then exit. Use timeout to force exit.

### 259. What is the difference between stream.pipeline and stream.pipe?
**Answer:** stream.pipeline(...streams, callback) pipes multiple streams and handles errors and cleanup. stream.pipe(dest) pipes one stream. Use pipeline for multiple streams and proper error handling.

### 260. How do you implement request ID from header or generate?
**Answer:** Middleware: req.id = req.get('X-Request-Id') || uuid(); res.setHeader('X-Request-Id', req.id). Use for tracing; pass to downstream services.

### 261. What is the purpose of the Node.js --report-on-fatal-error flag?
**Answer:** Generates diagnostic report on fatal error (before exit). Use for post-mortem debugging. Report includes stack, heap, etc. Node 18+.

### 262. How do you implement response caching with ETag?
**Answer:** Compute ETag of response body (hash); set ETag header; on request if If-None-Match matches return 304; else send body. Use for conditional GET and bandwidth saving.

### 263. What is the difference between process.exit(0) and process.exit(1)?
**Answer:** 0 means success; non-zero means failure. Use 0 for normal exit; 1 or other for error. Exit codes used by scripts and process managers (e.g. PM2, systemd).

### 264. How do you implement API versioning with query parameter?
**Answer:** Read ?version=1 or ?api_version=1; route to v1 or v2 handler. Less common; not cache-friendly. Document and support during migration.

### 265. What is the purpose of the Node.js --report-signal flag?
**Answer:** Same as --report-on-signal. Specifies signal that triggers diagnostic report. Use for on-demand report in production.

### 266. How do you implement request timeout for WebSocket?
**Answer:** Set server timeout on upgrade request; or track last activity and close if idle too long. Use for preventing hung connections. Send ping/pong for keepalive.

### 267. What is the difference between stream.Transform and stream.PassThrough?
**Answer:** Transform is abstract base for transform streams (implement _transform). PassThrough is Transform that passes data through unchanged (useful for piping with hooks). Use PassThrough for observation or tee.

### 268. How do you implement database connection with SSL?
**Answer:** Add ssl: true or ssl: { rejectUnauthorized: true, ca: ... } to connection config. Use for encrypted connection to DB. Required in cloud (e.g. RDS, Atlas).

### 269. What is the purpose of the Node.js --report-filename flag?
**Answer:** Sets filename for diagnostic report. Use with --report-on-fatal-error or --report-on-signal for custom report path. Node 18+.

### 270. How do you implement request body parsing for form-data?
**Answer:** Use multer for multipart/form-data; upload.single('file') or upload.array('files'). Files in req.file(s); fields in req.body. Validate type and size; store or process.

### 271. What is the difference between res.status and res.sendStatus?
**Answer:** res.status(code) sets status and returns chain for body; res.sendStatus(code) sets status and sends status message as body (e.g. "Not Found"). Use sendStatus for status-only response.

### 272. How do you implement API documentation with redoc?
**Answer:** Serve OpenAPI spec with redoc (HTML page); same spec as Swagger. Use for readable docs; redoc is single page. Serve from /docs or similar.

### 273. What is the purpose of the Node.js --report-compact flag?
**Answer:** Outputs compact (single-line) diagnostic report. Use for log-friendly report. Node 18+.

### 274. How do you implement request validation error format?
**Answer:** Return 400 with consistent body: { error: 'Validation failed', details: [{ field, message }] }. Use from express-validator or Zod format. Document error shape.

### 275. What is the difference between require and import in Node.js ESM?
**Answer:** In ESM ("type": "module") use import/export only; require is not available. In CommonJS use require/module.exports. Use dynamic import() for async load in ESM.

### 276. How do you implement graceful shutdown with open connections?
**Answer:** On SIGTERM/SIGINT set flag; stop accepting new requests; wait for active requests to finish (track count or use server.close callback); then exit. Use server.close() and clearInterval for timers.

### 277. What is the purpose of process.env in Node.js?
**Answer:** process.env holds environment variables. Use for config (port, DB URL, NODE_ENV). Don't commit secrets; use .env file with dotenv or platform env. Validate required vars at startup.

### 278. Explain the difference between cluster and worker_threads.
**Answer:** cluster: multiple processes, each with own event loop; for CPU scaling. worker_threads: threads in same process; share memory via SharedArrayBuffer. Use cluster for multi-core; workers for CPU-heavy tasks.

### 279. How do you implement request timeout middleware?
**Answer:** Set req.setTimeout(ms) or wrap next() in setTimeout that calls next(err). Or use express-timeout. Cancel long-running handlers; return 408 or 504. Clean up on timeout.

### 280. What is the difference between __dirname and import.meta.url in ESM?
**Answer:** __dirname is CommonJS (path to current dir). In ESM use path.dirname(fileURLToPath(import.meta.url)). import.meta.url is file URL; convert for path operations.

### 281. How do you implement health check endpoint?
**Answer:** GET /health returns 200 and { status: 'ok', db: true } or similar. Check DB connection; optional check disk/cache. Use for load balancer and k8s liveness. Keep fast and lightweight.

### 282. Explain Node.js Buffer and when to use it.
**Answer:** Buffer is fixed-size raw binary data. Use for file I/O, streams, crypto, network. Create with Buffer.alloc, from, or from string encoding. Don't use for large data; use streams.

### 283. How do you implement CORS with credentials?
**Answer:** res.set('Access-Control-Allow-Credentials', 'true'); Allow-Origin must be specific (no *). Allow methods and headers. Use for cookies/auth. Validate origin against whitelist.

### 284. What is the purpose of process.nextTick?
**Answer:** Schedules callback before next event loop phase. Use for deferring to after current stack; or to allow I/O before continuing. Don't starve event loop with recursive nextTick.

### 285. How do you implement rate limiting per user?
**Answer:** Track requests per user (id from token or IP); in-memory or Redis. Increment counter; reset or sliding window. Reject with 429 when over limit. Use express-rate-limit or custom.

### 286. Explain the difference between setImmediate and setTimeout(0).
**Answer:** setImmediate runs in check phase; setTimeout(0) in timers. Order can differ. Use setImmediate for "after I/O" deferral; setTimeout for delay. Both are macrotasks.

### 287. How do you implement structured logging?
**Answer:** Log JSON with timestamp, level, message, context (reqId, userId). Use pino or winston. Avoid console in production. Correlate requests with id in header or middleware.

### 288. What is the difference between stream.readable and stream.writable?
**Answer:** Readable: source (fs.createReadStream, http IncomingMessage). Writable: destination (fs.createWriteStream, res). Duplex: both. Transform: read and write with transform.

### 289. How do you implement request ID (correlation ID)?
**Answer:** Middleware: generate or read X-Request-Id; set on req; add to res header and logs. Use uuid. Propagate to downstream services. Use for tracing and debugging.

### 290. Explain Node.js crypto module use cases.
**Answer:** Hash (createHash), HMAC, sign/verify (createSign), encrypt/decrypt (createCipher). Use for passwords (bcrypt or scrypt), JWT, TLS. Never store plain passwords.

### 291. How do you implement API versioning in URL?
**Answer:** /v1/users, /v2/users. Router per version or prefix; middleware to set version. Document and deprecate old versions. Use for breaking changes.

### 292. What is the purpose of process.cwd()?
**Answer:** process.cwd() is current working directory (where node was started). __dirname is script directory. Use cwd for relative paths from project root; __dirname for paths relative to file.

### 293. How do you implement compression middleware?
**Answer:** Use compression middleware (gzip); res with compressible content-type. Reduces payload. Set Vary: Accept-Encoding. Optional for JSON APIs; useful for HTML/assets.

### 294. Explain the difference between pipe and pipeline.
**Answer:** stream.pipe(dest) pipes one stream; pipeline(...streams, cb) pipes multiple and handles errors and cleanup. Prefer pipeline for multiple streams and error handling.

### 295. How do you implement request body size limit?
**Answer:** express.json({ limit: '1mb' }); or body-parser limit. Reject with 413 if larger. Protect against large payload DoS. Set per route or global.

### 296. What is the difference between require.cache and import cache?
**Answer:** require.cache is object of loaded modules (can delete to reload). ESM has its own cache; no direct clear in Node. Use for clearing cache in tests or hot reload.

### 297. How do you implement WebSocket with Express?
**Answer:** Use ws or socket.io; attach to same HTTP server (server.on('upgrade')). Or separate WebSocket server. Handle connection, message, close. Use for real-time.

### 298. Explain Node.js path module key methods.
**Answer:** path.join, resolve (absolute path), dirname, basename, extname, parse. Use join for cross-platform paths. resolve for absolute from cwd or relative.

### 299. How do you implement graceful drain (stop accepting, finish in-flight)?
**Answer:** server.close() stops new connections; callback when all connections closed. Track in-flight requests; wait for them before exit. Use with SIGTERM handler.

### 300. What is the purpose of NODE_OPTIONS?
**Answer:** NODE_OPTIONS env var passes options to Node (e.g. --max-old-space-size=4096). Use for memory limit or flags in deployment. Check docs for allowed options.

### 301. How do you implement static file caching headers?
**Answer:** Set Cache-Control (max-age, immutable for hashed assets); ETag optional. Use express.static with maxAge or custom middleware. Balance freshness and performance.

### 302. Explain the difference between spawn and exec.
**Answer:** spawn streams output; exec buffers and returns when done. Use spawn for long-running or large output; exec for short commands and simple output. Always sanitize input.

### 303. How do you implement CSRF protection?
**Answer:** CSRF token in form or header; validate against session or signed cookie. Use csurf middleware or custom. SameSite cookie helps. Use for state-changing requests.

### 304. What is the difference between res.send and res.json?
**Answer:** res.send can send string, object (as JSON), Buffer. res.json sets Content-Type application/json and JSON.stringify. Use res.json for API; res.send for flexibility.

### 305. How do you implement request logging (morgan)?
**Answer:** Use morgan middleware; format 'combined' or 'dev'. Log to stdout or stream. Add request id. Use for access logs. Don't log sensitive headers or body.

### 306. Explain Node.js util.promisify.
**Answer:** util.promisify(fn) wraps callback-based function to return Promise. Use for fs, http, etc. Node 8+. Or use fs.promises for promise-based fs.

### 307. How do you implement response time header?
**Answer:** Middleware: record start time; on finish set X-Response-Time. Use process.hrtime or Date. Helps debugging and monitoring.

### 308. What is the purpose of process.exit(code)?
**Answer:** process.exit(0) success; non-zero failure. Use after graceful shutdown or on fatal error. Let event loop drain first when possible; exit(1) for uncaught error.

### 309. How do you implement API key authentication?
**Answer:** Middleware: read key from header (X-API-Key) or query; validate against store; 401 if invalid. Use for server-to-server. Rate limit and rotate keys.

### 310. Explain the difference between EventEmitter and callback.
**Answer:** EventEmitter: multiple listeners, emit events. Callback: one function for result. Use EventEmitter for pub/sub; callback for one-off async. Both are async patterns.

### 311. How do you implement request validation with Zod?
**Answer:** Define schema; parse req.body with schema.parse; catch ZodError and return 400 with details. Use for type-safe validation. Replace manual checks.

### 312. What is the difference between global and globalThis?
**Answer:** global is Node alias for global object. globalThis is standard (ES2020) cross-platform. Use globalThis for portable code; global in Node only.

### 313. How do you implement file upload with progress?
**Answer:** Use multer with memoryStorage or custom; track bytes in stream; emit progress. Or use busboy and count chunks. Send progress to client via SSE or WebSocket.

### 314. Explain Node.js child_process.execFile.
**Answer:** execFile runs executable without shell; safer than exec (no shell expansion). Pass args array. Use for running binaries. Sanitize args.

### 315. How do you implement response caching (in-memory)?
**Answer:** Cache key from URL + query; store response and headers; on hit return cached. Set TTL. Use for idempotent GET. Invalidate on update or use short TTL.

### 316. What is the purpose of module.exports vs exports?
**Answer:** module.exports is the actual export. exports is shorthand; assigning exports = x doesn't work (only exports.foo = x). Use module.exports for single export or default.

### 317. How do you implement request/response logging with body (dev only)?
**Answer:** Log req.body and res.body in dev; skip in production (PII, size). Use middleware that buffers and logs. Or use debug library with namespace.

### 318. Explain the difference between readFile and createReadStream.
**Answer:** readFile loads entire file into memory. createReadStream reads in chunks; use for large files. Prefer streams for files and network; readFile for small configs.

### 319. How do you implement JWT refresh token flow?
**Answer:** Access token short-lived; refresh token long-lived, stored securely. Endpoint exchanges refresh for new access; rotate refresh optional. Revoke refresh on logout. Use httpOnly cookie for refresh.

### 320. What is the difference between res.end and res.send?
**Answer:** res.end sends and closes; no automatic headers. res.send sets Content-Type and can send object as JSON. Use res.send for Express; res.end for raw http.

### 321. How do you implement database connection pooling?
**Answer:** Use pool from pg, mysql2, etc.; limit pool size; reuse connections. Don't create new connection per request. Configure min/max; handle pool errors.

### 322. Explain Node.js os module key methods.
**Answer:** os.cpus(), freemem(), totalmem(), platform(), hostname(). Use for monitoring or platform-specific logic. Don't overuse; prefer env for config.

### 323. How do you implement request timeout with AbortController?
**Answer:** AbortController; setTimeout to abort after ms; pass signal to fetch or axios. Cancel in-flight request. Use for API calls with timeout. Clean up on abort.

### 324. What is the purpose of require.resolve?
**Answer:** require.resolve('module') returns path to module. Use for finding module path or checking if module exists. Doesn't load module. Useful for tooling.

### 325. How do you implement graceful shutdown with database?
**Answer:** On SIGTERM close DB pool (wait for connections); then server.close(). Ensure no new queries; wait for in-flight. Use pool.end() and await.

### 326. Explain the difference between middleware and route handler.
**Answer:** Middleware: function(req, res, next); can run for multiple routes; call next() or end. Route handler: handles specific method/path; doesn't call next. Middleware for auth, logging, body.

### 327. How do you implement API documentation with Swagger?
**Answer:** Define OpenAPI spec (YAML/JS); serve with swagger-ui-express. Annotate routes or generate from code. Use for interactive docs and client generation.

### 328. What is the difference between cluster and PM2?
**Answer:** cluster is Node built-in (fork workers). PM2 is process manager: cluster mode, restart, logs, monitoring. Use PM2 in production for process management; cluster for bare Node.

### 329. How do you implement request validation with Joi?
**Answer:** Joi.validate(req.body, schema); return 400 with details on error. Use for validation and sanitization. Replace manual checks. Joi or Zod are common choices.

### 330. Explain Node.js dns module.
**Answer:** dns.lookup, dns.resolve for hostname to IP. dns.promises for Promise API. Use for custom DNS or checking. Prefer fetch/axios for HTTP (they resolve).

### 331. How do you implement CORS preflight cache?
**Answer:** Set Access-Control-Max-Age for preflight response; browser caches preflight. Reduces OPTIONS requests. Use for stable CORS config.

### 332. What is the purpose of process.memoryUsage()?
**Answer:** Returns heap used, external, etc. Use for monitoring and debugging memory. Don't use for business logic; use for metrics and alerts.

### 333. How do you implement WebSocket authentication?
**Answer:** Validate token on connection (query or header); reject or close if invalid. Use same JWT/session as HTTP. Pass token in connection URL or first message.

### 334. Explain the difference between res.redirect and res.redirect(308).
**Answer:** res.redirect(302) temporary; res.redirect(308) permanent. 301/302 may change method (GET); 307/308 preserve method. Use 308 for permanent redirect with same method.

### 335. How do you implement request deduplication (idempotency)?
**Answer:** Client sends Idempotency-Key; server stores result by key; on repeat return same result. Use for POST/PATCH. TTL for keys. Prevents duplicate charges etc.

### 336. What is the difference between Buffer.alloc and Buffer.from?
**Answer:** Buffer.alloc(size) creates zero-filled. Buffer.from(array|string) from data. Use alloc for empty buffer; from for existing data. Never use deprecated new Buffer().

### 337. How do you implement response compression per route?
**Answer:** Use compression middleware per route or conditional (compress only for certain types). Or skip compression for small or already compressed. Same as global but scoped.

### 338. Explain Node.js stream Transform.
**Answer:** Transform is Duplex; read and write; override _transform(chunk, enc, cb); call cb(null, output). Use for parsing, compression, encryption. Pipeline with other streams.

### 339. How do you implement rate limiting with Redis?
**Answer:** Increment key per user/IP; EXPIRE for window; check limit. Or use sliding window with sorted set. Use for distributed rate limit across instances. Library: rate-limiter-flexible.

### 340. What is the purpose of --inspect flag?
**Answer:** Enables DevTools debugger. Use --inspect for breakpoints and profiling. --inspect-brk to pause on start. Use for debugging Node apps.

### 341. How do you implement request context (async local storage)?
**Answer:** AsyncLocalStorage for request-scoped data (request id, user). Run middleware that sets storage.run(context, next). Use for passing context without passing args. Node 12+.

### 342. Explain the difference between app.use and app.METHOD.
**Answer:** app.use(middleware) runs for all methods and paths (or mounted path). app.get(path, handler) runs for GET and path. Use use for global middleware; METHOD for routes.

### 343. How do you implement health check with DB ping?
**Answer:** /health runs SELECT 1 or pool.query('SELECT 1'); return 503 if DB down. Use for readiness probe. Keep fast; don't run heavy queries.

### 344. What is the difference between require() and import() dynamic?
**Answer:** require() is sync; import() is async and returns Promise. Use dynamic import() in ESM for code split or conditional load. require in CommonJS only.

### 345. How do you implement file download with resume (Range)?
**Answer:** Read Range header; stream from offset; set 206 and Content-Range. Use fs.createReadStream with start/end. Support Range for large files.

### 346. Explain Node.js http module createServer.
**Answer:** createServer((req, res) => {}). req is IncomingMessage; res is ServerResponse. Use for raw HTTP. Express wraps this. Handle req.url and method.

### 347. How do you implement API versioning in header?
**Answer:** Accept or custom header (e.g. X-API-Version); middleware reads and routes. Same as URL versioning but header-based. Use for version negotiation.

### 348. What is the purpose of process.argv?
**Answer:** process.argv is array of CLI args (first is node, second is script). Use for CLI tools. Parse with minimist or yargs. Don't use for secrets (use env).

### 349. How do you implement request size limit per route?
**Answer:** express.json({ limit }) per route with router.use or inline. Different limits for upload vs JSON. Reject with 413 when exceeded.

### 350. Explain the difference between stream.finish and stream.end.
**Answer:** finish event when writable stream finished (after end and flush). end() method signals no more data. Use finish for knowing when write is fully done.

### 351. How do you implement WebSocket heartbeat (ping/pong)?
**Answer:** Set interval to send ping; expect pong. Close if no pong. Use for detecting dead connections. ws library has ping/pong. Clear interval on close.

### 352. What is the difference between npm and npx?
**Answer:** npm installs packages; npx runs package without global install (or runs local). Use npx for one-off (create-react-app, jest). npx uses cache.

### 353. How do you implement error handler middleware (four args)?
**Answer:** (err, req, res, next) => {}; must have four args. Log err; send 500 or appropriate status. Use for central error handling. Don't forget next(err) in routes.

### 354. Explain Node.js fs.promises.
**Answer:** fs.promises has promise-based fs (readFile, writeFile, etc.). Use instead of util.promisify(fs.readFile). Node 10+. Cleaner than callbacks.

### 355. How do you implement request validation with express-validator?
**Answer:** body(), param(), query() with validators; validationResult(req); return 400 with errors. Use for validation and sanitization. Chain validators.

### 356. What is the purpose of process.platform?
**Answer:** process.platform is 'darwin', 'win32', 'linux'. Use for platform-specific code (path, exec). Prefer cross-platform libraries when possible.

### 357. How do you implement static files with etag?
**Answer:** express.static with etag: true (default). Or custom: compute hash of file; set ETag header; handle If-None-Match for 304. Use for caching.

### 358. Explain the difference between res.json and res.jsonp.
**Answer:** res.json sends JSON. res.jsonp sends JSON with callback wrapper for JSONP. Use jsonp for legacy cross-domain; prefer CORS for modern APIs.

### 359. How do you implement request timeout per route?
**Answer:** req.setTimeout(ms) in route or middleware for that path. Or wrap handler in Promise.race with timeout. Same as global but per route.

### 360. What is the difference between EventEmitter.once and on?
**Answer:** once adds listener that runs once then removed. on runs every time. Use once for one-off (e.g. connection). Reduces memory leak risk.

### 361. How do you implement response schema validation?
**Answer:** Validate res body with schema before sending (in dev or middleware). Use for ensuring API contract. Library: ajv or Zod. Optional; useful for strict APIs.

### 362. Explain Node.js url module.
**Answer:** url.parse or new URL() for parsing URL. pathname, searchParams, host. Use for routing or query parsing. URL is standard; url module is legacy.

### 363. How do you implement graceful shutdown with Redis?
**Answer:** On SIGTERM disconnect Redis client (quit()); wait for in-flight; then server.close(). Use for clean shutdown. Redis client has disconnect.

### 364. What is the purpose of NODE_ENV?
**Answer:** NODE_ENV is convention (development, production, test). Used by Express and others for behavior (caching, errors). Set in deployment. Don't rely for secrets.

### 365. How do you implement API key rotation?
**Answer:** Support multiple valid keys; add new key; deprecate old; remove after grace period. Store keys with expiry. Use for security without downtime.

### 366. Explain the difference between pipe and manual read/write.
**Answer:** pipe handles backpressure and cleanup. Manual read/write requires handling pause/resume and errors. Prefer pipe or pipeline for stream handling.

### 367. How do you implement request logging with PII redaction?
**Answer:** Redact Authorization, Cookie, body fields (password, email). Use middleware that clones and redacts before log. Comply with privacy; don't log tokens.

### 368. What is the difference between res.write and res.end?
**Answer:** res.write sends chunk; res.end sends and closes. Must call res.end when done. Use write for streaming response; end to finish.

### 369. How do you implement WebSocket room (broadcast to group)?
**Answer:** Maintain map of room -> Set of clients; join/leave room; broadcast to room only. Use for chat channels or game rooms. socket.io has rooms built-in.

### 370. Explain Node.js querystring module.
**Answer:** querystring.parse(str) for query string to object. Legacy; prefer URLSearchParams or new URL(). Use for parsing ?key=value.

### 371. How do you implement response timeout?
**Answer:** Set res.setTimeout(ms); on timeout close or send 504. Protect against slow clients. Use with request timeout for full control.

### 372. What is the purpose of process.hrtime?
**Answer:** process.hrtime() returns high-resolution time [seconds, nanoseconds]. Use for measuring duration. Prefer process.hrtime.bigint() for simpler diff. Don't use for wall clock.

### 373. How do you implement request body validation with type coercion?
**Answer:** Schema with coercion (number from string, date from string); Zod or Joi transform. Validate and coerce in one step. Document expected types.

### 374. Explain the difference between middleware order and route order.
**Answer:** Middleware runs in order of app.use; route runs first match. Put auth before protected routes; body parser before routes that read body. Order matters.

### 375. How do you implement file upload with virus scan?
**Answer:** After upload run virus scan (ClamAV or cloud API); quarantine or delete if infected. Use queue for async scan. Don't serve file until scanned.

### 376. What is the difference between stream.pause and stream.destroy?
**Answer:** pause() pauses readable; resume() continues. destroy() closes stream and emits error. Use pause for backpressure; destroy for cleanup and error.

### 377. How do you implement API documentation with Postman?
**Answer:** Export OpenAPI or Postman collection; share with team. Generate from code or write manually. Use for testing and docs. Postman can import OpenAPI.

### 378. Explain Node.js net module for TCP.
**Answer:** net.createServer for TCP server; socket for connection. Use for custom protocol or non-HTTP. Raw TCP; handle framing yourself. Use for WebSocket or RPC.

### 379. How do you implement request retry with backoff?
**Answer:** Retry failed request with exponential backoff; max retries; retry on 5xx or network error. Use for resilience. Library: axios-retry or p-retry.

### 380. What is the purpose of process.stdin/stdout?
**Answer:** process.stdin is readable stream (input); process.stdout writable (output). Use for CLI input/output. Set encoding for string. Use readline for line-by-line.

### 381. How do you implement CORS with dynamic origin?
**Answer:** Check Origin header against whitelist (regex or list); set Allow-Origin to that origin. Use for multi-tenant or dynamic subdomains. Never reflect arbitrary Origin.

### 382. Explain the difference between res.sendStatus and res.status().send.
**Answer:** res.sendStatus(200) sets status and sends "OK". res.status(200).send(body) sends custom body. Use sendStatus for status-only; status().send for body.

### 383. How do you implement database transaction in API?
**Answer:** Begin transaction; run queries; commit or rollback on error. Use pool connection for transaction; release when done. Wrap in try/catch.

### 384. What is the difference between require and dynamic import in CommonJS?
**Answer:** In CommonJS require() is sync; dynamic import() returns Promise (available in Node). Use import() for conditional or async load. require for sync.

### 385. How do you implement request correlation across services?
**Answer:** Generate or propagate X-Request-Id; pass to downstream (header); log in each service. Use for distributed tracing. Jaeger or OpenTelemetry for full tracing.

### 386. Explain Node.js stream backpressure.
**Answer:** When writable is slow, readable pauses; when writable drains, readable resumes. pipe handles this. Use for memory control. Don't ignore backpressure.

### 387. How do you implement rate limiting by IP and by user?
**Answer:** Two limits: by IP (anonymous) and by user (authenticated). Apply stricter limit for IP; higher for user. Use for fair usage and abuse prevention.

### 388. What is the purpose of --max-old-space-size?
**Answer:** Sets V8 heap size (MB). Use when Node runs out of memory. Increase for large apps. Monitor before increasing; fix leaks if possible.

### 389. How do you implement WebSocket with reconnection (client)?
**Answer:** On close or error schedule reconnect with backoff; limit max retries. Use for resilient client. Server should accept reconnection; optional heartbeat.

### 390. Explain the difference between app.listen and server.listen.
**Answer:** app.listen() creates server and listens. server = http.createServer(app); server.listen() for same server (e.g. for WebSocket attach). Use server when you need server reference.

### 391. How do you implement request validation error response format?
**Answer:** Return 400 with { error: 'ValidationError', details: [{ path, message }] }. Use from Joi/Zod format. Consistent format for client handling.

### 392. What is the difference between Buffer and Uint8Array?
**Answer:** Buffer extends Uint8Array; Node-specific. Uint8Array is standard. Use Buffer in Node for compatibility; Uint8Array for portable code. Buffer has extra methods.

### 393. How do you implement static file with immutable cache?
**Answer:** Set Cache-Control: max-age=31536000, immutable for hashed filenames. Use for assets with content hash. No revalidation needed.

### 394. Explain Node.js events module.
**Answer:** EventEmitter class; on, emit, once, removeListener. Use for custom events. Node core uses it (stream, http). Don't overuse; prefer callbacks for one-off.

### 395. How do you implement API versioning with content negotiation?
**Answer:** Accept header or Accept-Version; server returns versioned response. Same resource, different representation. Use for versioning without URL change.

### 396. What is the purpose of process.uptime()?
**Answer:** process.uptime() returns seconds since process start. Use for monitoring and health. Don't use for business logic.

### 397. How do you implement request body parsing for XML?
**Answer:** Use xml2js or fast-xml-parser; parse req.body (raw) to JSON. Validate and use. Use for legacy APIs. Consider security (billion laughs, etc.).

### 398. Explain the difference between res.set and res.header.
**Answer:** res.set(key, value) and res.header(key, value) are same; set single header. res.set(object) sets multiple. Use for setting response headers.

### 399. How do you implement graceful shutdown with message queue?
**Answer:** On SIGTERM stop consuming; finish current message; close connection. Use for RabbitMQ, SQS. Don't accept new messages; ack/nack and drain.

### 400. What is the difference between npm install and npm ci?
**Answer:** npm install updates lockfile; npm ci installs from lockfile exactly (deletes node_modules first). Use npm ci in CI for reproducible builds. Faster and strict.

### 401. How do you implement request context with AsyncLocalStorage?
**Answer:** AsyncLocalStorage.run(context, () => next()); in middleware set context (req id, user). Access in downstream without passing. Use for logging and auth context. Node 12+.

### 402. Explain Node.js stream Duplex.
**Answer:** Duplex is both readable and writable (e.g. TCP socket). Implement _read and _write. Use for bidirectional streams. Transform is Duplex with transform logic.

### 403. How do you implement health check with dependencies?
**Answer:** /health checks app; /ready checks DB, Redis, etc. Return 503 if dependency down. Use for k8s readiness. Separate liveness (app up) and readiness (can serve).

### 404. What is the purpose of process.chdir()?
**Answer:** process.chdir(path) changes current working directory. Use sparingly; can affect relative paths. Prefer absolute paths or __dirname. Rare in server code.

### 405. How do you implement response streaming (SSE)?
**Answer:** Set headers (Content-Type: text/event-stream); res.write for each event; keep connection open. Use for server-sent events. Handle client disconnect.

### 406. Explain the difference between res.location and res.redirect.
**Answer:** res.location(url) sets Location header only; res.redirect(url) sets status and Location and optionally sends body. Use redirect for full redirect response.

### 407. How do you implement request validation with TypeScript?
**Answer:** Define interface; validate at runtime (Zod, io-ts) and infer type. Or use class-validator. Type-safe validation. Don't trust client; always validate.

### 408. What is the difference between cluster and fork?
**Answer:** cluster module forks workers and load balances. child_process.fork is single child. Use cluster for multi-core HTTP; fork for worker process. Cluster uses fork internally.

### 409. How do you implement API rate limit response (Retry-After)?
**Answer:** On 429 set Retry-After header (seconds or date). Client can wait and retry. Use for rate limit. Optional; client may use exponential backoff anyway.

### 410. Explain Node.js stream PassThrough.
**Answer:** PassThrough is Transform that passes data unchanged. Use for observing or teeing stream. Or for testing. Minimal transform.

### 411. How do you implement request body parsing for multipart (file + fields)?
**Answer:** Use multer or busboy; handle file stream and fields. Validate type and size. Store file or stream to storage. Use for upload forms.

### 412. What is the purpose of process.emitWarning?
**Answer:** process.emitWarning(msg) emits warning (deprecation, etc.). Use for deprecating API. Doesn't crash; can be listened with process.on('warning').

### 413. How do you implement CORS for multiple origins?
**Answer:** Check Origin against array of allowed origins; set Allow-Origin to request origin if allowed. Use for multiple frontends. Never use * with credentials.

### 414. Explain the difference between middleware next() and next(err).
**Answer:** next() passes to next middleware. next(err) skips to error handler. Use next(err) when error occurs; error handler (four args) catches. Don't call both.

### 415. How do you implement request timeout with cleanup?
**Answer:** Set req.setTimeout; on timeout call req.destroy() or res.end(408). Clean up in-flight work (abort fetch, close DB query). Use for preventing hung requests.

### 416. What is the difference between stream and buffer for large file?
**Answer:** Buffer loads all in memory; stream processes in chunks. Use stream for large file (upload, download). Buffer for small or when you need full content.

### 417. How do you implement WebSocket with Express (same server)?
**Answer:** const server = http.createServer(app); const wss = new WebSocket.Server({ server }); server.listen(port). Same port for HTTP and WebSocket. Handle upgrade in wss.

### 418. Explain Node.js vm module (sandbox).
**Answer:** vm.createContext, runInContext for sandboxed code. Not safe for untrusted code (escape possible). Use for simple sandbox; prefer isolate for real sandbox.

### 419. How do you implement response caching with ETag?
**Answer:** Compute ETag of response; set header; on If-None-Match return 304 if match. Use for conditional request. Reduces bandwidth.

### 420. What is the purpose of process.kill?
**Answer:** process.kill(pid, signal) sends signal to process. Use for graceful shutdown (SIGTERM) or force (SIGKILL). Same as kill command. Use from parent or orchestrator.

### 421. How do you implement request validation with express-validator sanitization?
**Answer:** Chain sanitize methods (trim, escape, toInt); run validation after. Use for preventing XSS and normalizing input. Validate and sanitize together.

### 422. Explain the difference between res.append and res.set.
**Answer:** res.append adds to existing header (e.g. multiple Set-Cookie). res.set replaces header. Use append for multiple values; set for single.

### 423. How do you implement graceful shutdown with open WebSockets?
**Answer:** On SIGTERM close WebSocket connections (send close frame); wait for drain; then server.close(). Track connections; close each. Use for clean shutdown.

### 424. What is the difference between require and import for JSON?
**Answer:** require('./file.json') loads JSON (Node only). import from JSON needs assert or experimental. Use require for JSON in Node; or readFile and parse.

### 425. How do you implement API versioning with URL path?
**Answer:** /v1/resource, /v2/resource. Router per version; or middleware that sets req.apiVersion. Use for breaking changes. Document deprecation.

### 426. Explain Node.js stream Writable.
**Answer:** Writable: _write(chunk, enc, cb). Use for writing to file, HTTP response. Implement _write; call cb when done. Handle backpressure (cb after write).

### 427. How do you implement request logging with structured JSON?
**Answer:** Log object with timestamp, level, msg, reqId, method, url, status, duration. Use pino or winston with format. Use for log aggregation (ELK, etc.).

### 428. What is the purpose of process.config?
**Answer:** process.config is build configuration (from node -p process.config). Rarely used. Use for debugging build options. Don't rely for app config.

### 429. How do you implement file upload with size limit per file?
**Answer:** Multer limits: fileSize; or check in middleware. Reject with 413 if over. Use for protecting disk and memory. Set per route or global.

### 430. Explain the difference between res.cookie and res.clearCookie.
**Answer:** res.cookie(name, value, options) sets cookie. res.clearCookie(name) clears by setting expired. Use for session and auth. Set httpOnly, secure in production.

### 431. How do you implement request retry with circuit breaker?
**Answer:** Retry with backoff; if failures exceed threshold open circuit (fail fast); after timeout try again. Use for resilience. Library: opossum or similar.

### 432. What is the difference between cluster and worker_threads for CPU?
**Answer:** cluster: multiple processes, no shared memory. worker_threads: threads, SharedArrayBuffer. Use cluster for multi-core HTTP; workers for CPU-heavy in process. Both offload CPU.

### 433. How do you implement API documentation with ReDoc?
**Answer:** Serve OpenAPI spec with ReDoc (HTML). Same spec as Swagger. Use for readable docs. ReDoc is single-page. Serve from /docs.

### 434. Explain Node.js stream Readable.
**Answer:** Readable: _read() to push data. Use for reading file, HTTP request. Implement _read; push chunks; push(null) when done. Handle backpressure.

### 435. How do you implement request body parsing for raw text?
**Answer:** express.text() or body-parser with type text. req.body is string. Use for webhooks or custom format. Set limit. Validate content-type.

### 436. What is the purpose of process.execPath?
**Answer:** process.execPath is path to Node binary. Use for spawning same Node version. Rare. Use for child_process or debugging.

### 437. How do you implement response compression per content type?
**Answer:** Compression middleware with filter: compress only text/html, application/json. Skip for images or already compressed. Use for bandwidth saving.

### 438. Explain the difference between app.get and router.get.
**Answer:** app.get is on app; router.get is on Router. Mount router with app.use('/path', router). Use router for modular routes. Same API.

### 439. How do you implement request validation with custom validator?
**Answer:** Middleware: check req.body/params; return 400 with message if invalid. Use schema library or custom. Centralize validation. Reuse validators.

### 440. What is the difference between setImmediate and process.nextTick?
**Answer:** nextTick runs before next phase; setImmediate in check phase. nextTick can starve I/O; use setImmediate for deferral. nextTick for same-turn deferral.

### 441. How do you implement WebSocket with JWT auth?
**Answer:** Pass token in query or first message; verify JWT; reject connection if invalid. Use same secret as HTTP. Parse and verify in connection handler.

### 442. Explain Node.js stream pipeline error handling.
**Answer:** pipeline(...streams, cb) passes errors to cb and destroys streams. Use instead of pipe for error handling. Prefer pipeline for multiple streams.

### 443. How do you implement health check with cache?
**Answer:** Cache health result for short time (e.g. 5s); return cached to avoid DB hit every time. Use for high-traffic health. Invalidate on failure.

### 444. What is the purpose of process.release?
**Answer:** process.release has name, sourceUrl, etc. Use for identifying Node version and distribution. Rare. Use for support or debugging.

### 445. How do you implement request size limit with custom error?
**Answer:** On limit exceeded return 413 with custom body { error: 'Payload too large', max: '1mb' }. Use body-parser limit and error handler. Document limit.

### 446. Explain the difference between res.sendFile and res.download.
**Answer:** res.sendFile sends file with Content-Disposition inline (display). res.download sets attachment (download). Use sendFile for view; download for save.

### 447. How do you implement graceful shutdown with timers?
**Answer:** On SIGTERM clearInterval/clearTimeout for all timers; then server.close(). Track timers or use AbortController. Use for clean shutdown.

### 448. What is the difference between require and ESM import for side effects?
**Answer:** require('module') runs module. import 'module' runs module (side effect). Both load once. Use for polyfills or init. Prefer explicit imports.

### 449. How do you implement API key with scope (read/write)?
**Answer:** Store scope per key; middleware checks scope for route (e.g. write required). Return 403 if insufficient. Use for fine-grained API keys.

### 450. Explain Node.js stream highWaterMark.
**Answer:** highWaterMark is buffer size; when exceeded readable pauses (backpressure). Set in stream options. Use for tuning memory vs throughput. Default is 16KB.

### 451. How do you implement request validation with array (multiple items)?
**Answer:** Schema for array (min/max length, item schema); validate req.body.items. Use Joi.array().items(schema) or Zod array. Use for bulk operations.

### 452. What is the purpose of process.versions?
**Answer:** process.versions has node, v8, etc. Use for debugging and support. Log in startup or health. Don't use for business logic.

### 453. How do you implement CORS with credentials and custom header?
**Answer:** Allow-Credentials: true; Allow-Origin specific; Allow-Headers for custom (e.g. X-Requested-With). Expose headers if client needs. Use for auth headers.

### 454. Explain the difference between res.json and res.send with object.
**Answer:** res.json sets Content-Type application/json and stringifies. res.send(object) does same for object. Use res.json for API; equivalent for objects.

### 455. How do you implement database connection retry on startup?
**Answer:** Retry connect with backoff (e.g. 5 retries); exit if failed. Use for Docker Compose (DB may start after app). Wait for DB before accepting requests.

### 456. What is the difference between stream and callback for async?
**Answer:** Stream: chunk-based, backpressure. Callback: one result. Use stream for large or continuous data; callback for single result. Both are async.

### 457. How do you implement request timeout with AbortSignal?
**Answer:** AbortController; setTimeout to abort; pass signal to fetch or axios. Cancel in-flight. Use for API calls. Clean up on timeout.

### 458. Explain Node.js stream finished utility.
**Answer:** require('stream').finished(stream, cb) calls cb when stream closes or errors. Use for knowing when stream is done. Replaces manual event handling.

### 459. How do you implement response schema (OpenAPI)?
**Answer:** Document response schema in OpenAPI; validate in dev with middleware. Use for API contract. Optional runtime validation. Use for client generation.

### 460. What is the purpose of process.binding?
**Answer:** process.binding is internal C++ bindings. Deprecated; don't use. Use public API only. For debugging only. May be removed.

### 461. How do you implement file upload with type validation (magic bytes)?
**Answer:** Check file buffer magic bytes (first bytes) for type; don't trust extension or Content-Type. Use for security. Reject invalid types.

### 462. Explain the difference between res.redirect(301) and (302).
**Answer:** 301 permanent; 302 temporary. Search engines treat differently. Use 301 for permanent move; 302 for temporary. 307/308 preserve method.

### 463. How do you implement graceful shutdown with DB transactions?
**Answer:** On SIGTERM don't start new transactions; wait for in-flight to commit/rollback; then close pool. Use for data integrity. Track active transactions.

### 464. What is the difference between npm script and node script?
**Answer:** npm run script runs from package.json scripts (with node_modules in PATH). node script.js runs directly. Use npm for project scripts; node for one-off.

### 465. How do you implement request validation with conditional (if field A then B required)?
**Answer:** Custom validator or Joi.when: if A present then B required. Use for conditional validation. Document rules. Use ref() for cross-field.

### 466. Explain Node.js stream destroy.
**Answer:** stream.destroy() closes stream and emits error. Use for cleanup and error. Destroys both readable and writable. Call on error or cancel.

### 467. How do you implement API versioning with query param?
**Answer:** ?version=1 or ?api_version=2; middleware reads and routes. Same as header but query. Use for optional version. Less common than path.

### 468. What is the purpose of process.connected (child)?
**Answer:** process.connected is false after disconnect(). Use in child process to know if channel to parent is open. Use for cleanup. Child process only.

### 469. How do you implement WebSocket with room and broadcast?
**Answer:** Map room -> Set of sockets; socket.join(room); broadcast to room: room.forEach(s => s.send(msg)). Use for chat or game. socket.io has rooms.

### 470. Explain the difference between middleware and error handler.
**Answer:** Middleware: (req, res, next). Error handler: (err, req, res, next). Error handler has four args. Put error handler last. Only next(err) goes to error handler.

### 471. How do you implement request body parsing for JSON with reviver?
**Answer:** express.json({ reviver: (key, value) => ... }); reviver transforms parsed value. Use for Date or custom type. Same as JSON.parse reviver.

### 472. What is the difference between res.status and res.sendStatus?
**Answer:** res.status(code) returns chain (for send, json). res.sendStatus(code) sets status and sends status message. Use status() when sending body; sendStatus for status only.

### 473. How do you implement rate limiting with sliding window?
**Answer:** Store timestamps per key; remove older than window; count remaining; reject if over limit. Use for smooth limit. Redis sorted set for distributed.

### 474. Explain Node.js stream pipeline.
**Answer:** stream.pipeline(...streams, cb) pipes streams and calls cb on finish or error. Destroys all on error. Use for multiple streams. Prefer over pipe.

### 475. How do you implement health check with detailed status?
**Answer:** Return 200 with { status, db, redis, version }. Use for debugging. Optional; keep /health simple for load balancer. Use /health/detail for verbose.

### 476. What is the purpose of process.disconnect (child)?
**Answer:** process.disconnect() closes IPC channel to parent. Use in child after fork when done. Parent gets 'disconnect' event. Child process only.

### 477. How do you implement request validation with async (DB check)?
**Answer:** Async validator: check DB (e.g. unique email); return 400 if invalid. Use for uniqueness or external validation. Express-validator supports async.

### 478. Explain the difference between app.use and app.all.
**Answer:** app.use runs for all methods at path. app.all runs for all methods at path but as route (one handler). Use use for middleware; all for catch-all route.

### 479. How do you implement response caching with Vary?
**Answer:** Set Vary header (e.g. Accept-Encoding) when response varies. Cache uses Vary for key. Use for correct caching when response depends on header.

### 480. What is the difference between Buffer.copy and Buffer.slice?
**Answer:** copy copies to target buffer. slice returns new buffer sharing memory (not copy). Use copy for clone; slice for view. Be careful with slice and write.

### 481. How do you implement WebSocket with ping/pong timeout?
**Answer:** Set interval to send ping; set timeout for pong; close if no pong. Use for detecting dead connections. Clear on pong. ws has ping/pong.

### 482. Explain Node.js stream readableLength.
**Answer:** readableLength is bytes in internal buffer. Use for monitoring backpressure. Don't use for business logic. Debugging and metrics.

### 483. How do you implement request validation with file type (upload)?
**Answer:** Check mimetype and/or magic bytes; whitelist allowed (e.g. image/*). Reject with 400 if invalid. Use for security. Don't trust client.

### 484. What is the purpose of process.stdout.write?
**Answer:** process.stdout.write(data) writes to stdout (no newline). Use for progress or log without newline. Set encoding for string. Use for CLI output.

### 485. How do you implement CORS preflight cache (Max-Age)?
**Answer:** Set Access-Control-Max-Age in OPTIONS response. Browser caches preflight. Reduces OPTIONS requests. Use for stable CORS. Max 86400 often.

### 486. Explain the difference between res.end and res.send with buffer.
**Answer:** res.end(buffer) sends buffer. res.send(buffer) sets Content-Type and sends. Use res.send for Express; res.end for raw. Both send and close.

### 487. How do you implement graceful shutdown with active requests?
**Answer:** Track in-flight count (increment on request, decrement on response); on SIGTERM stop accepting; wait for count 0 or timeout; then exit. Use for clean shutdown.

### 488. What is the difference between cluster and PM2 cluster mode?
**Answer:** Cluster is Node API. PM2 cluster mode uses cluster and adds restart, log, monitoring. Use PM2 in production. Same concept; PM2 is process manager.

### 489. How do you implement API documentation with code generation?
**Answer:** OpenAPI spec; generate client/server with openapi-generator or similar. Use for type-safe client. Keep spec in sync with code. Use for SDK.

### 490. Explain Node.js stream writableFinished.
**Answer:** writableFinished is true after end() and flush. Use for knowing when write is done. Check before closing. Use with finish event.

### 491. How do you implement request body parsing for URL-encoded?
**Answer:** express.urlencoded({ extended: true }) for application/x-www-form-urlencoded. req.body is object. Use for forms. Set limit. extended for nested objects.

### 492. What is the purpose of process.stderr?
**Answer:** process.stderr is writable stream for errors. Use for error output. console.error writes to stderr. Use for separating log and error. Redirect in deployment.

### 493. How do you implement request validation with regex pattern?
**Answer:** Schema with pattern (string format); Joi.pattern or Zod regex. Use for email, phone, etc. Document pattern. Don't rely for security (use allowlist).

### 494. Explain the difference between res.setHeader and res.header.
**Answer:** res.setHeader is Node API; res.header is Express (same as set). Use for setting single header. res.set can set multiple. Express wraps Node.

### 495. How do you implement response streaming with backpressure?
**Answer:** Use writable stream; respect backpressure (drain event). Don't write until drain if write returns false. Use for large response. Pipe handles this.

### 496. What is the difference between require and import for default export?
**Answer:** require: const x = require('m'); default is module.exports. import: import x from 'm'; default is export default. Same concept; different syntax.

### 497. How do you implement WebSocket with reconnection (server)?
**Answer:** Server accepts reconnection; client sends same session id; server restores state optional. Use for resilient client. Server should be stateless or restore.

### 498. Explain Node.js stream Readable.from.
**Answer:** Readable.from(iterable) creates readable from iterable. Use for converting array or generator to stream. Node 10+. Simple way to create readable.

### 499. How do you implement request validation with nested object?
**Answer:** Schema with nested schema (Joi.object({ user: Joi.object({ name: ... }) })). Validate full tree. Use for complex body. Document structure.

### 500. What is the purpose of process.getgid/getuid (Unix)?
**Answer:** process.getgid()/getuid() return group/user id. Use for dropping privileges. Unix only. Use for security (run as non-root). Rare in Node apps.

### 501. How do you implement API versioning with header (Accept-Version)?
**Answer:** Read Accept-Version or X-API-Version; route to version handler. Same URL, different implementation. Use for version negotiation. Document header.

### 502. Explain the difference between stream and event for async.
**Answer:** Stream: data in chunks; backpressure. Event: emit when done. Use stream for data flow; event for signals. Both use EventEmitter under the hood.

### 503. How do you implement request timeout with middleware?
**Answer:** Middleware: req.setTimeout(ms); req.on('timeout', () => ...). Or wrap next in Promise.race with timeout. Use for global or per-route timeout.

### 504. What is the difference between res.json and res.type().json()?
**Answer:** res.json(body) sets Content-Type and sends. res.type('json').send(body) same effect. Use res.json for API. type() for custom content type.

### 505. How do you implement graceful shutdown with HTTP keep-alive?
**Answer:** server.close() stops new connections; existing keep-alive may stay. Set timeout or track connections. Use for clean shutdown. Node closes idle after timeout.

### 506. Explain Node.js stream Transform flush.
**Answer:** _flush(cb) called when no more input; use for emitting final data. Call cb() when done. Use for compression (flush remaining). Optional in Transform.

### 507. How do you implement request validation with enum?
**Answer:** Schema with enum (allowed values); Joi.valid(...) or Zod.enum. Use for status, type, etc. Reject with 400 if invalid. Document allowed values.

### 508. What is the purpose of process.send (child)?
**Answer:** process.send(msg) sends message to parent (when channel open). Use for IPC in fork. Parent receives in child.on('message'). Child process only.

### 509. How do you implement CORS with regex origin?
**Answer:** Check Origin against regex (e.g. /^https://.*\.example\.com$/); set Allow-Origin if match. Use for dynamic subdomains. Validate carefully; avoid ReDoS.

### 510. Explain the difference between app.route and router.route.
**Answer:** app.route(path) returns chainable route for same path. router.route(path) same for router. Use for grouping GET/POST on same path. Reduces repetition.

### 511. How do you implement response caching with Cache-Control?
**Answer:** Set Cache-Control: max-age=3600, public. Use for static or cacheable API. private for user-specific. no-store for sensitive. Use for HTTP caching.

### 512. What is the difference between Buffer.allocUnsafe and Buffer.alloc?
**Answer:** allocUnsafe is faster but may contain old data; alloc zero-fills. Use alloc for security; allocUnsafe when you overwrite entirely. Don't use allocUnsafe for sensitive.

### 513. How do you implement WebSocket with authentication middleware?
**Answer:** On connection validate token (query or header); reject or close if invalid. Use same auth as HTTP. Optional: attach user to socket for handlers.

### 514. Explain Node.js stream objectMode.
**Answer:** objectMode: stream passes objects instead of buffers. Use for JSON stream or object stream. Set in options. No encoding; chunks are objects.

### 515. How do you implement request validation with date format?
**Answer:** Schema with date (ISO or format); Joi.date() or Zod with coerce. Validate and parse. Use for date fields. Document expected format.

### 516. What is the purpose of process.throwDeprecation?
**Answer:** process.throwDeprecation: when true, deprecation throws. Use for strict deprecation in dev. Default false. Use for finding deprecated usage.

### 517. How do you implement API versioning with deprecation header?
**Answer:** For deprecated version set Deprecation: true or Sunset: date header. Use for warning clients. Document migration path. RFC 8594.

### 518. Explain the difference between res.send and res.json for number?
**Answer:** res.send(42) sends "42" with default Content-Type. res.json(42) sends "42" with application/json. Use res.json for API. send may not set JSON type.

### 519. How do you implement graceful shutdown with cleanup callback?
**Answer:** On SIGTERM run cleanup (close DB, clear timers); then process.exit(0). Use async cleanup with timeout; exit(1) on timeout. Use for ordered shutdown.

### 520. What is the difference between require and import for circular dependency?
**Answer:** In CommonJS circular can work (partial exports). In ESM circular may fail; use dynamic import or restructure. Avoid circular when possible. ESM is stricter.

### 521. How do you implement request validation with min/max length?
**Answer:** Schema with min/max (string length, array length, number range); Joi.min/max or Zod. Use for validation. Document limits. Use for DoS prevention.

### 522. Explain Node.js stream readableFlowing.
**Answer:** readableFlowing is null, true, or false; indicates flow state. Use for debugging. Don't use for business logic. Internal state.

### 523. How do you implement response compression with Brotli?
**Answer:** Use compression with brotli option or compression middleware that supports Brotli. Use for better ratio than gzip. Check client Accept-Encoding.

### 524. What is the purpose of process.traceDeprecation?
**Answer:** process.traceDeprecation: when true, deprecation prints stack. Use for finding deprecated call sites. Default false. Use for debugging.

### 525. How do you implement file upload with progress (server to client)?
**Answer:** Send progress in response (chunked or SSE); or WebSocket. Client updates UI. Use for large upload feedback. Or use multipart with progress event.

### 526. Explain the difference between middleware and route middleware.
**Answer:** Middleware runs for path prefix; route middleware runs for specific route. Same function; different mount point. Use route middleware for route-specific (e.g. auth for one route).

### 527. How do you implement request validation with custom message?
**Answer:** Schema with .message() or custom validator that throws/returns message. Use for user-friendly errors. Document messages. Use for i18n optional.

### 528. What is the difference between res.render and res.send?
**Answer:** res.render(view, data) renders template and sends HTML. res.send sends raw. Use render for server-rendered HTML; send for API or static. Requires view engine.

### 529. How do you implement graceful shutdown with queue drain?
**Answer:** On SIGTERM stop enqueueing; wait for queue to drain (all messages processed); then close connections. Use for job queues. Don't accept new jobs.

### 530. Explain Node.js stream pipeline with async transform.
**Answer:** Use Transform with async _transform (async function); call cb after await. Use for async processing in pipeline. Handle errors in transform.

### 531. How do you implement API versioning with default version?
**Answer:** If no version in request use default (e.g. v1). Use header or query default. Document default. Use for backward compatibility.

### 532. What is the purpose of process.umask (Unix)?
**Answer:** process.umask(mask) sets file mode mask. Use for default file permissions. Unix only. Rare in Node. Use for creating files with restricted mode.

### 533. How do you implement WebSocket with binary message?
**Answer:** Send Buffer or ArrayBuffer; set binaryType if needed. Use for binary protocol. Parse on receive. Same API; binary instead of string.

### 534. Explain the difference between res.vary and res.set('Vary').
**Answer:** res.vary(field) appends to Vary header. res.set('Vary', 'Accept') sets. Use vary() for adding; set for replace. Use for cache key.

### 535. How do you implement request validation with optional field?
**Answer:** Schema with optional() or default; Joi.optional() or Zod.optional(). Use for optional body fields. Document optional vs required. Use for PATCH.

### 536. What is the difference between stream and callback for file read?
**Answer:** readFile: callback with full content. createReadStream: stream chunks. Use stream for large file; callback for small. Both are async.

### 537. How do you implement response timeout with cleanup?
**Answer:** res.setTimeout(ms); on timeout destroy res or end with 504. Clean up in-flight (abort DB). Use for slow client protection. Handle timeout event.

### 538. Explain Node.js stream readableDidRead.
**Answer:** readableDidRead is internal. Use for debugging read state. Don't use for app code. Node internal. Prefer readableLength or events.

### 539. How do you implement CORS with credentials and wildcard origin (no)?
**Answer:** Cannot use * with credentials. Must set specific Allow-Origin when credentials true. Use whitelist. Security requirement.

### 540. What is the purpose of process.debugPort?
**Answer:** process.debugPort is port for debugger when --inspect. Use for connecting DevTools. Rare. Use for debugging. Set by Node.

### 541. How do you implement request validation with format (email, URL)?
**Answer:** Schema with format (email, uri); Joi.email(), Zod.url(). Use for common formats. Validate and normalize. Don't rely for security alone.

### 542. Explain the difference between app.param and router.param.
**Answer:** app.param(name, fn) runs when route has :param; fn loads resource. router.param same for router. Use for loading user by id etc. Runs before route.

### 543. How do you implement graceful shutdown with signal handler?
**Answer:** process.on('SIGTERM', async () => { await shutdown(); process.exit(0); }). Use once; don't double-handle. Set flag to prevent new work. Use for clean exit.

### 544. What is the difference between require and import for dynamic path?
**Answer:** require(path) can use variable (with care). import() takes string; can be dynamic. require is sync; import() async. Use import() for dynamic in ESM.

### 545. How do you implement API rate limit with Redis sliding window?
**Answer:** Redis sorted set: key per user; score = timestamp; add current; remove older than window; count; compare to limit. Use for distributed sliding window.

### 546. Explain Node.js stream writableCorked.
**Answer:** writableCorked is count of cork. Use for debugging. cork()/uncork() for batching writes. Rare. Use for performance when batching.

### 547. How do you implement request body parsing for GraphQL?
**Answer:** Parse application/graphql or application/json; body is query and variables. Use graphql-http or express-graphql. Validate and execute. Use for GraphQL endpoint.

### 548. What is the purpose of process.report?
**Answer:** process.report has report on exception, etc. Use for diagnostic report. Node 11+. Use for debugging crashes. Set report directory.

### 549. How do you implement WebSocket with heartbeat timeout?
**Answer:** Set interval ping; set timeout for pong; clear timeout on pong; close if timeout. Use for dead connection detection. Same as ping/pong with timeout.

### 550. Explain the difference between res.format and res.type.
**Answer:** res.format({ 'application/json': () => res.json(...), 'text/html': () => res.render(...) }) content negotiation. res.type sets Content-Type. Use format for multiple representations.

### 551. How do you implement request validation with allowUnknown?
**Answer:** Joi.allowUnknown(true) allows extra keys; stripUnknown to remove. Use for permissive body (ignore extra). Document allowed. Use for forward compatibility.

### 552. What is the difference between stream and promise for async?
**Answer:** Stream: chunk-based, backpressure. Promise: single value. Use stream for large or continuous; promise for one result. Both are async patterns.

### 553. How do you implement response caching with stale-while-revalidate?
**Answer:** Cache-Control: max-age=60, stale-while-revalidate=300. Serve stale; revalidate in background. Use for better UX. Support varies.

### 554. Explain Node.js stream finished (promise).
**Answer:** require('stream/promises').finished(stream) returns promise when stream done or error. Use for async/await with stream. Node 10+. Cleaner than callback.

### 555. How do you implement graceful shutdown with active WebSockets?
**Answer:** On SIGTERM send close frame to each WebSocket; wait for close or timeout; then server.close(). Track connections. Use for clean shutdown.

### 556. What is the purpose of process.noDeprecation?
**Answer:** process.noDeprecation: when true, no deprecation warnings. Use for silencing. Default false. Use for legacy code temporarily. Prefer fixing.

### 557. How do you implement API versioning with media type?
**Answer:** Accept: application/vnd.api+v1+json; parse version from Accept. Use for content negotiation. Less common. Document media type.

### 558. Explain the difference between res.redirect and res.redirect(301, url).
**Answer:** res.redirect(301, url) permanent redirect. res.redirect(url) defaults 302. Use 301 for permanent; 302 for temporary. Same as status then redirect.

### 559. How do you implement request validation with transform?
**Answer:** Schema with transform (coerce, sanitize); Joi custom or Zod transform. Validate and transform in one step. Use for trimming, lowercasing, etc.

### 560. What is the difference between cluster worker and main process?
**Answer:** Main: manages workers, load balances. Worker: handles requests. cluster.isMaster (or isPrimary) to detect. Workers share no memory. Use for scaling.

### 561. How do you implement WebSocket with compression?
**Answer:** Enable permessage-deflate extension; negotiate in handshake. Use for large messages. ws supports it. Reduces bandwidth. Optional.

### 562. Explain Node.js stream pipeline with streams (array).
**Answer:** pipeline(...streams, cb) or pipeline(stream1, stream2, ..., cb). Same as spread. Use for piping multiple. Handles errors. Use for stream chain.

### 563. How do you implement health check with timeout?
**Answer:** Run health checks with timeout; if DB check hangs return 503. Use Promise.race with timeout. Use for avoiding stuck health. Set short timeout.

### 564. What is the purpose of process.ppid?
**Answer:** process.ppid is parent process id. Use for detecting parent. Rare. Use for process tree or debugging. Unix/Windows.

### 565. How do you implement request validation with oneOf (discriminator)?
**Answer:** Schema with oneOf (variant A or B); Joi.alternatives or Zod.discriminatedUnion. Use for polymorphic body. Document variants. Use for webhook with event types.

### 566. Explain the difference between res.links and res.set('Link').
**Answer:** res.links(links) sets Link header (multiple). res.set('Link', value) sets single. Use links() for pagination (next, prev). Use for HTTP Link header.

### 567. How do you implement graceful shutdown with child processes?
**Answer:** On SIGTERM kill children (SIGTERM first); wait for exit or timeout; then exit. Use for cleanup. Track child PIDs. Use Promise.all for wait.

### 568. What is the difference between npm run and npx run?
**Answer:** npm run runs script from package.json. npx runs package (local or remote). Use npm run for defined scripts; npx for one-off or binary. Different purposes.

### 569. How do you implement API documentation with Swagger UI?
**Answer:** swagger-ui-express serves UI from OpenAPI spec. Interactive docs. Use for exploration. Same spec for client gen. Serve at /api-docs or similar.

### 570. Explain Node.js stream Readable.from with async iterator.
**Answer:** Readable.from(asyncIterator) creates readable from async iterable. Use for streaming async source. Node 12+. Use for fetch body or async generator.

### 571. How do you implement request validation with ref (cross-field)?
**Answer:** Joi.ref('field') or Zod for cross-field (e.g. passwordConfirm must equal password). Use for confirmation fields. Document. Use for validation.

### 572. What is the purpose of process.emit?
**Answer:** process.emit is internal. Use process.emitWarning for warnings. Don't use emit directly. Use for event emission on process. Same as EventEmitter.

### 573. How do you implement CORS with methods and headers?
**Answer:** Set Access-Control-Allow-Methods (GET, POST, ...) and Allow-Headers (Content-Type, Authorization). Use for preflight. Reflect or whitelist. Use for API.

### 574. Explain the difference between res.jsonp and res.json with callback.
**Answer:** res.jsonp(body) wraps in callback(query param). res.json doesn't. Use jsonp for legacy; prefer CORS. Same for JSON; jsonp adds wrapper.

### 575. How do you implement response streaming with NDJSON?
**Answer:** Set Content-Type application/x-ndjson; write line per JSON object. Use for streaming JSON. Client parses line by line. Use for large list.

### 576. What is the difference between require and import for default vs named?
**Answer:** require: default is module.exports; named is .prop. import: default is import x; named is import { x }. Same concept; syntax differs. ESM has static analysis.

### 577. How do you implement WebSocket with message queue (pub/sub)?
**Answer:** Subscribe to Redis/RabbitMQ in server; on message broadcast to WebSocket clients. Use for multi-instance. Each instance subscribes; publish on event. Use for scale.

### 578. Explain Node.js stream pipeline with Duplex.
**Answer:** pipeline(readable, transform, writable) or include Duplex in chain. Duplex is both read and write. Use for bidirectional in pipeline. Same as Transform for one-way.

### 579. How do you implement request validation with custom error code?
**Answer:** Schema with .error() or custom that sets code; return 400 with { code: 'VALIDATION_ERROR', details }. Use for client handling. Document codes. Use for i18n.

### 580. What is the purpose of process.channel (child)?
**Answer:** process.channel is IPC channel to parent (when forked). Use for send/receive. Child process only. Use for parent-child communication. Undefined in main.

### 581. How do you implement API versioning with feature flag?
**Answer:** Feature flag per version; route to old or new handler. Use for gradual rollout. Same code path with flag. Use for canary. Document flag.

### 582. Explain the difference between res.send and res.write + res.end.
**Answer:** res.send does write + end and sets headers. res.write + res.end for streaming. Use send for single response; write/end for chunked. Send handles type.

### 583. How do you implement graceful shutdown with timeout?
**Answer:** On SIGTERM start shutdown; set timeout (e.g. 30s); if not done, exit(1). Use for avoiding hung shutdown. Force exit after timeout. Use for orchestration.

### 584. What is the difference between stream and async iterator?
**Answer:** Stream: Node API, backpressure. Async iterator: for await. Readable is async iterable in Node. Use for await for readable. Same data; different consumption.

### 585. How do you implement request validation with file size (upload)?
**Answer:** Check file.size in multer or middleware; reject with 413 if over limit. Use for upload limit. Set per file and total. Use for DoS prevention.

### 586. Explain Node.js stream writableLength.
**Answer:** writableLength is bytes in write buffer. Use for monitoring. Don't use for logic. Debugging. Use with drain for backpressure.

### 587. How do you implement response caching with private?
**Answer:** Cache-Control: private for user-specific. Use for authenticated response. Not cached by CDN. Use for user data. Public for shared.

### 588. What is the purpose of process.allowedNodeEnvironmentFlags?
**Answer:** process.allowedNodeEnvironmentFlags is Set of allowed NODE_OPTIONS flags. Use for checking. Node 10+. Rare. Use for security or validation.

