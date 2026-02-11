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

