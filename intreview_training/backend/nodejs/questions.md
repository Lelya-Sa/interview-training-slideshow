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

