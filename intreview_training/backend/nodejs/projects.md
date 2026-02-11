# Node.js & Express - Mini Projects & Examples

## Project 1: RESTful API with Express

### Description
Build a Todo API with CRUD operations, authentication, and data validation.

### Implementation

```javascript
// server.js
const express = require('express');
const app = express();
app.use(express.json());

// In-memory database
let todos = [];
let nextId = 1;

// GET /api/todos - Get all todos
app.get('/api/todos', (req, res) => {
  const { completed, limit } = req.query;
  let filteredTodos = todos;
  
  if (completed !== undefined) {
    filteredTodos = filteredTodos.filter(t => t.completed === (completed === 'true'));
  }
  
  if (limit) {
    filteredTodos = filteredTodos.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    count: filteredTodos.length,
    data: filteredTodos
  });
});

// GET /api/todos/:id - Get single todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  res.json({
    success: true,
    data: todo
  });
});

// POST /api/todos - Create todo
app.post('/api/todos', (req, res) => {
  const { title, description, completed } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }
  
  const todo = {
    id: nextId++,
    title,
    description: description || '',
    completed: completed || false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(todo);
  
  res.status(201).json({
    success: true,
    data: todo
  });
});

// PUT /api/todos/:id - Update todo
app.put('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  const { title, description, completed } = req.body;
  todos[todoIndex] = {
    ...todos[todoIndex],
    ...(title && { title }),
    ...(description !== undefined && { description }),
    ...(completed !== undefined && { completed }),
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: todos[todoIndex]
  });
});

// DELETE /api/todos/:id - Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  todos.splice(todoIndex, 1);
  
  res.json({
    success: true,
    message: 'Todo deleted successfully'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Questions
1. How would you add input validation using Joi or express-validator?
2. How would you implement pagination for the GET /api/todos endpoint?
3. How would you add authentication middleware to protect these routes?
4. How would you persist data to a database instead of in-memory storage?

---

## Project 2: Authentication System with JWT

### Description
Implement user registration, login, and protected routes using JWT tokens.

### Implementation

```javascript
// auth-server.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

// In-memory user store
let users = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// POST /api/register - Register new user
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: users.length + 1,
      email,
      name: name || '',
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// POST /api/login - Login user
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// GET /api/profile - Get user profile (protected)
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    }
  });
});

// GET /api/users - Get all users (protected, admin only example)
app.get('/api/users', authenticateToken, (req, res) => {
  const userList = users.map(u => ({
    id: u.id,
    email: u.email,
    name: u.name,
    createdAt: u.createdAt
  }));
  
  res.json({
    success: true,
    count: userList.length,
    data: userList
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
```

### Questions
1. How would you implement refresh tokens for token rotation?
2. How would you add role-based access control (admin, user)?
3. How would you implement password reset functionality?
4. How would you add rate limiting to prevent brute force attacks?

---

## Project 3: File Upload with Multer

### Description
Create an API endpoint that accepts file uploads with validation and stores them.

### Implementation

```javascript
// file-upload-server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
(async () => {
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
})();

// Configure storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image, PDF, and document files are allowed!'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Store uploaded file info
let files = [];

// POST /api/upload - Single file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }
  
  const fileInfo = {
    id: files.length + 1,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    uploadedAt: new Date().toISOString()
  };
  
  files.push(fileInfo);
  
  res.json({
    success: true,
    message: 'File uploaded successfully',
    data: {
      id: fileInfo.id,
      filename: fileInfo.filename,
      originalName: fileInfo.originalName,
      mimetype: fileInfo.mimetype,
      size: fileInfo.size,
      url: `/api/files/${fileInfo.id}`
    }
  });
});

// POST /api/upload/multiple - Multiple files upload
app.post('/api/upload/multiple', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
  }
  
  const uploadedFiles = req.files.map(file => {
    const fileInfo = {
      id: files.length + 1,
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      uploadedAt: new Date().toISOString()
    };
    files.push(fileInfo);
    return {
      id: fileInfo.id,
      filename: fileInfo.filename,
      originalName: fileInfo.originalName,
      url: `/api/files/${fileInfo.id}`
    };
  });
  
  res.json({
    success: true,
    message: `${uploadedFiles.length} file(s) uploaded successfully`,
    data: uploadedFiles
  });
});

// GET /api/files - List all files
app.get('/api/files', (req, res) => {
  const fileList = files.map(f => ({
    id: f.id,
    originalName: f.originalName,
    mimetype: f.mimetype,
    size: f.size,
    uploadedAt: f.uploadedAt,
    url: `/api/files/${f.id}`
  }));
  
  res.json({
    success: true,
    count: fileList.length,
    data: fileList
  });
});

// GET /api/files/:id - Download file
app.get('/api/files/:id', async (req, res) => {
  const file = files.find(f => f.id === parseInt(req.params.id));
  
  if (!file) {
    return res.status(404).json({
      success: false,
      message: 'File not found'
    });
  }
  
  res.download(file.path, file.originalName, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Error downloading file'
      });
    }
  });
});

// DELETE /api/files/:id - Delete file
app.delete('/api/files/:id', async (req, res) => {
  const fileIndex = files.findIndex(f => f.id === parseInt(req.params.id));
  
  if (fileIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'File not found'
    });
  }
  
  const file = files[fileIndex];
  
  try {
    await fs.unlink(file.path);
    files.splice(fileIndex, 1);
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB'
      });
    }
  }
  
  res.status(400).json({
    success: false,
    message: error.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`File upload server running on port ${PORT}`);
});
```

### Questions
1. How would you upload files directly to cloud storage (S3, Azure Blob)?
2. How would you implement image resizing/processing after upload?
3. How would you add virus scanning for uploaded files?
4. How would you implement progress tracking for large file uploads?

---

## Project 4: Real-time Chat with Socket.io

### Description
Build a real-time chat application using WebSockets.

### Implementation

```javascript
// chat-server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

// Store connected users and messages
const users = new Map(); // socketId -> userInfo
const messages = [];

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join room
  socket.on('join-room', (data) => {
    const { username, room } = data;
    
    // Store user info
    users.set(socket.id, { username, room, socketId: socket.id });
    
    // Join socket room
    socket.join(room);
    
    // Notify others in room
    socket.to(room).emit('user-joined', {
      username,
      message: `${username} joined the room`,
      timestamp: new Date().toISOString()
    });
    
    // Send room info to user
    socket.emit('room-joined', {
      room,
      username,
      users: Array.from(users.values())
        .filter(u => u.room === room)
        .map(u => u.username)
    });
  });
  
  // Handle messages
  socket.on('send-message', (data) => {
    const user = users.get(socket.id);
    
    if (!user) {
      return socket.emit('error', { message: 'User not in a room' });
    }
    
    const message = {
      id: messages.length + 1,
      username: user.username,
      room: user.room,
      text: data.text,
      timestamp: new Date().toISOString()
    };
    
    messages.push(message);
    
    // Broadcast to room
    io.to(user.room).emit('new-message', message);
  });
  
  // Handle typing indicator
  socket.on('typing', (data) => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(user.room).emit('user-typing', {
        username: user.username,
        isTyping: data.isTyping
      });
    }
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    
    if (user) {
      // Notify room
      socket.to(user.room).emit('user-left', {
        username: user.username,
        message: `${user.username} left the room`,
        timestamp: new Date().toISOString()
      });
      
      // Remove user
      users.delete(socket.id);
    }
    
    console.log('User disconnected:', socket.id);
  });
});

// REST API for message history
app.get('/api/messages/:room', (req, res) => {
  const { room } = req.params;
  const roomMessages = messages.filter(m => m.room === room);
  
  res.json({
    success: true,
    count: roomMessages.length,
    data: roomMessages
  });
});

// REST API for active users in room
app.get('/api/rooms/:room/users', (req, res) => {
  const { room } = req.params;
  const roomUsers = Array.from(users.values())
    .filter(u => u.room === room)
    .map(u => u.username);
  
  res.json({
    success: true,
    room,
    count: roomUsers.length,
    users: roomUsers
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});
```

### Client Example (HTML)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Chat App</title>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body>
  <div id="chat-container">
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Type a message...">
    <button onclick="sendMessage()">Send</button>
  </div>

  <script>
    const socket = io();
    
    // Join room
    const username = prompt('Enter your username:');
    const room = prompt('Enter room name:');
    socket.emit('join-room', { username, room });
    
    // Listen for messages
    socket.on('new-message', (message) => {
      const messagesDiv = document.getElementById('messages');
      const messageElement = document.createElement('div');
      messageElement.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
      messagesDiv.appendChild(messageElement);
    });
    
    // Send message
    function sendMessage() {
      const input = document.getElementById('messageInput');
      socket.emit('send-message', { text: input.value });
      input.value = '';
    }
    
    // Enter key to send
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  </script>
</body>
</html>
```

### Questions
1. How would you add private messaging (direct messages)?
2. How would you implement message persistence in a database?
3. How would you add file/image sharing in the chat?
4. How would you implement user authentication for the chat?

---

## Project 5: Rate Limiting Middleware

### Description
Implement custom rate limiting middleware for Express.

### Implementation

```javascript
// rate-limiter.js
class RateLimiter {
  constructor(options = {}) {
    this.windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes
    this.maxRequests = options.max || 100; // 100 requests per window
    this.store = new Map(); // In-memory store
  }
  
  // Clean up old entries periodically
  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now - value.resetTime > this.windowMs) {
        this.store.delete(key);
      }
    }
  }
  
  middleware() {
    // Cleanup every minute
    if (!this.cleanupInterval) {
      this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    }
    
    return (req, res, next) => {
      const key = req.ip || req.connection.remoteAddress;
      const now = Date.now();
      
      let record = this.store.get(key);
      
      if (!record) {
        record = {
          count: 1,
          resetTime: now + this.windowMs
        };
        this.store.set(key, record);
        return next();
      }
      
      // Check if window expired
      if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + this.windowMs;
        this.store.set(key, record);
        return next();
      }
      
      // Check if limit exceeded
      if (record.count >= this.maxRequests) {
        const retryAfter = Math.ceil((record.resetTime - now) / 1000);
        
        res.set({
          'X-RateLimit-Limit': this.maxRequests,
          'X-RateLimit-Remaining': 0,
          'X-RateLimit-Reset': new Date(record.resetTime).toISOString(),
          'Retry-After': retryAfter
        });
        
        return res.status(429).json({
          success: false,
          message: 'Too many requests, please try again later',
          retryAfter
        });
      }
      
      // Increment count
      record.count++;
      
      res.set({
        'X-RateLimit-Limit': this.maxRequests,
        'X-RateLimit-Remaining': this.maxRequests - record.count,
        'X-RateLimit-Reset': new Date(record.resetTime).toISOString()
      });
      
      next();
    };
  }
}

// Usage example
const express = require('express');
const app = express();

// Create rate limiter
const limiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
});

// Apply to all routes
app.use(limiter.middleware());

// Or apply to specific routes
const apiLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 10 // 10 requests per minute
});

app.use('/api/', apiLimiter.middleware());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/api/data', (req, res) => {
  res.json({ data: 'Protected by rate limit' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Questions
1. How would you implement Redis-based rate limiting for distributed systems?
2. How would you add different rate limits for different user roles?
3. How would you implement sliding window rate limiting?
4. How would you add rate limiting per endpoint instead of global?

