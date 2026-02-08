/* ============================================
   NODE.JS/EXPRESS BACKEND SERVER
   ============================================
   
   INTERVIEW PREP: This file demonstrates:
   - Express.js server setup
   - RESTful API design
   - Middleware usage
   - File system operations
   - Error handling
   - Route handling
   
   HOW TO BUILD FROM SCRATCH IN INTERVIEW:
   1. npm init -y (creates package.json)
   2. npm install express cors
   3. Create index.js
   4. Require modules
   5. Create Express app
   6. Add middleware
   7. Define routes
   8. Start server
*/

// ============================================
// STEP 1: IMPORT MODULES
// ============================================
// require() is Node.js way to import modules (CommonJS)
// In interviews, explain: "I'm using CommonJS require() instead of ES6 import
// because Node.js traditionally uses CommonJS, though modern Node supports both"

const express = require('express');
// express: Web framework for Node.js
// Why express? Most popular, simple API, great for REST APIs
// Interview: "Express provides routing, middleware, and HTTP utilities"

const cors = require('cors');
// cors: Cross-Origin Resource Sharing middleware
// Why needed? Browser blocks requests from different origins (security)
// Interview: "CORS allows my React app (localhost:3000) to call this API (localhost:5000)"

const fs = require('fs');
// fs: File System module (built into Node.js)
// Why needed? To read the markdown file from disk
// Interview: "fs module provides file I/O operations - synchronous and asynchronous"

const path = require('path');
// path: Path utilities (built into Node.js)
// Why needed? To construct file paths that work on Windows/Mac/Linux
// Interview: "path.join() creates cross-platform paths, avoiding / vs \ issues"

// ============================================
// STEP 2: CREATE EXPRESS APPLICATION
// ============================================
// express() creates an Express application instance
// This app object has methods like .get(), .post(), .use(), .listen()
// Interview: "express() returns an app object that represents our web server"

const app = express();
// app is now our web server - we'll configure it and start it

// ============================================
// STEP 3: CONFIGURE PORT
// ============================================
// process.env.PORT: Environment variable (used in production, e.g., Heroku)
// || 5000: Fallback to 5000 if PORT not set (for local development)
// Interview: "I use process.env.PORT for production deployment flexibility"

const PORT = process.env.PORT || 5000;
// PORT will be 5000 locally, or whatever the hosting platform sets

// ============================================
// STEP 4: ADD MIDDLEWARE
// ============================================
// Middleware: Functions that run between request and response
// They can modify request/response, run code, end request-response cycle
// Interview: "Middleware executes in order - each middleware can call next()"

// ============================================
// MIDDLEWARE 1: CORS
// ============================================
// app.use() adds middleware that runs for ALL requests
// cors() creates middleware that adds CORS headers to responses
// Interview: "CORS middleware adds 'Access-Control-Allow-Origin' header"

app.use(cors());
// Now all responses include CORS headers, allowing frontend to make requests

// ============================================
// MIDDLEWARE 2: JSON PARSER
// ============================================
// express.json() is built-in middleware
// It parses incoming JSON request bodies
// Interview: "Without this, req.body would be undefined for JSON requests"

app.use(express.json());
// Now we can access JSON data from request body as req.body

// ============================================
// MIDDLEWARE 3: STATIC FILES (for production)
// ============================================
// express.static() serves static files (HTML, CSS, JS)
// path.join() creates path: __dirname/../client/build
// __dirname: Current directory (where this file is)
// Interview: "In production, I serve the React build folder from the backend"

app.use(express.static(path.join(__dirname, '../client/build')));
// In production, requests to / will serve React app
// In development, React dev server handles this

// ============================================
// STEP 5: PARSE MARKDOWN FUNCTION
// ============================================
// This function converts markdown text into structured data
// Interview: "I parse markdown because it's easier to maintain than JSON"

function parseMarkdown(content) {
    // content: The entire markdown file as a string
    
    // Create empty array to store slides
    const slides = [];
    
    // Split content by "## " (section headers)
    // /^## /m: Regex - ^ = start of line, ## = literal, m = multiline mode
    // filter(s => s.trim()): Remove empty sections
    // Interview: "I use regex to split markdown into sections"
    
    const sections = content.split(/^## /m).filter(s => s.trim());
    // sections is now an array of section strings
    
    // Track slide index (used as unique ID)
    let slideIndex = 0;
    
    // Loop through each section
    // forEach: Array method that runs function for each element
    // Interview: "forEach is appropriate here - we're doing side effects, not returning"
    
    sections.forEach(section => {
        // Split section into lines
        const lines = section.split('\n');
        // lines is array of strings, one per line
        
        // First line is the section title (category)
        const sectionTitle = lines[0].trim();
        // trim() removes whitespace from start/end
        
        // Track current question being built
        let currentQuestion = null;
        // null means "no value" - we haven't found a question yet
        
        // Track content for current question
        let currentContent = [];
        // Array to collect lines until we hit next question
        
        // Loop through each line in the section
        lines.forEach((line) => {
            // Check if line starts with "### " followed by number
            // /^### \d+\./: Regex - ^ = start, ### = literal, \d+ = one or more digits, \. = literal dot
            // match() returns array if match found, null otherwise
            // Interview: "I use regex to identify question headers"
            
            if (line.match(/^### \d+\./)) {
                // This is a new question!
                
                // If we were building a previous question, save it first
                if (currentQuestion) {
                    // Push new slide object to slides array
                    slides.push({
                        id: slideIndex++, // Increment after using (post-increment)
                        // id: unique identifier for this slide
                        category: sectionTitle, // Which section it belongs to
                        title: currentQuestion, // The question text
                        content: currentContent.join('\n') // Join array into string
                        // join('\n'): Combine array elements with newline between
                    });
                }
                
                // Extract question text from line
                // replace(): Remove "### " and number, keep the question
                // /^### \d+\.?\s*/: Match "### ", digits, optional dot, optional spaces
                // trim(): Remove leading/trailing whitespace
                currentQuestion = line.replace(/^### \d+\.?\s*/, '').trim();
                
                // Reset content for new question
                currentContent = [];
            } 
            // If line is not a separator and we have a current question
            else if (currentQuestion && line.trim() !== '---') {
                // This is content for the current question
                // Add line to content array
                currentContent.push(line);
            }
        });
        
        // Don't forget the last question in the section!
        // After loop ends, save the last question if it exists
        if (currentQuestion) {
            slides.push({
                id: slideIndex++,
                category: sectionTitle,
                title: currentQuestion,
                content: currentContent.join('\n')
            });
        }
    });
    
    // Return the array of slide objects
    return slides;
}

// ============================================
// STEP 6: LOAD SLIDE DATA
// ============================================
// Read markdown file and parse it into slides
// Interview: "I load data on server startup - in production, I'd use a database"

// Construct path to markdown file
// path.join(): Combines path segments with correct separator (/ or \)
// __dirname: Directory where this file is (server/)
// '../..': Go up two directories (to project root)
// 'full_stack_interview_answers.md': The markdown file
const markdownPath = path.join(__dirname, '../../full_stack_interview_answers.md');

// Initialize empty array (will be filled with slides)
let slidesData = [];

// try-catch: Error handling
// Interview: "I use try-catch to handle file read errors gracefully"

try {
    // fs.readFileSync(): Synchronously read file (blocks until done)
    // 'utf8': Encoding - tells Node.js to interpret bytes as text
    // Interview: "readFileSync is simpler for startup, but readFile (async) is better for requests"
    
    const content = fs.readFileSync(markdownPath, 'utf8');
    // content is now the entire markdown file as a string
    
    // Parse the markdown into structured data
    slidesData = parseMarkdown(content);
    // slidesData is now an array of slide objects
    
    // Log success message
    // Template literal: `${variable}` inserts variable into string
    console.log(`✅ Loaded ${slidesData.length} slides from markdown`);
} catch (err) {
    // If error occurs (file not found, permission denied, etc.)
    // err.message: Human-readable error message
    
    console.error('❌ Error loading markdown file:', err.message);
    console.log('📝 Using empty slides array');
    // slidesData remains empty array - server still starts, just no data
}

// ============================================
// STEP 7: DEFINE API ROUTES
// ============================================
// Routes: Define what happens when client requests specific URLs
// Interview: "RESTful API design - GET for reading, POST for creating"

// Import roadmap routes
const roadmapRoutes = require('./routes/roadmap');
app.use('/api/roadmap', roadmapRoutes);

// Import questions routes
const questionsRoutes = require('./routes/questions');
app.use('/api/questions', questionsRoutes);
// app.use(): Mounts middleware/router at specified path
// '/api/roadmap': Base path for all roadmap routes
// roadmapRoutes: Router object with roadmap endpoints
// Interview: "I use Express Router to organize routes into separate files"

// ============================================
// ROUTE 1: GET ALL SLIDES
// ============================================
// app.get(path, handler): Handle GET requests to this path
// '/api/slides': The URL path (full URL: http://localhost:5000/api/slides)
// (req, res) => {}: Handler function - runs when request comes in
// req: Request object (contains data from client)
// res: Response object (used to send data back to client)
// Interview: "GET /api/slides returns all slides - RESTful design"

app.get('/api/slides', (req, res) => {
    // res.json(): Sends JSON response and sets Content-Type header
    // Automatically converts JavaScript object to JSON string
    // Interview: "res.json() is shorthand for res.send(JSON.stringify(data))"
    
    res.json({
        success: true, // Indicates request succeeded
        count: slidesData.length, // Number of slides
        slides: slidesData // The actual slide data
    });
    // Client receives: { success: true, count: 69, slides: [...] }
});

// ============================================
// ROUTE 2: GET SINGLE SLIDE BY ID
// ============================================
// '/api/slides/:id': :id is a route parameter
// Example: GET /api/slides/5 → req.params.id = "5"
// Interview: "Route parameters allow dynamic URLs"

app.get('/api/slides/:id', (req, res) => {
    // req.params: Object containing route parameters
    // req.params.id: The value of :id from URL
    // parseInt(): Convert string to integer ("5" → 5)
    // Interview: "I parse the ID because URL params are always strings"
    
    const id = parseInt(req.params.id);
    
    // Array.find(): Returns first element where function returns true
    // s => s.id === id: Arrow function - checks if slide's id matches
    // Interview: "find() is O(n) - for large datasets, I'd use a Map for O(1) lookup"
    
    const slide = slidesData.find(s => s.id === id);
    
    // If slide found, send it
    if (slide) {
        res.json({
            success: true,
            slide: slide
        });
    } else {
        // If not found, send 404 status
        // res.status(): Sets HTTP status code
        // 404: Not Found (standard HTTP status)
        // Interview: "Proper HTTP status codes are important for API design"
        
        res.status(404).json({
            success: false,
            message: 'Slide not found'
        });
    }
});

// ============================================
// ROUTE 3: GET STATISTICS
// ============================================
// Returns summary information about slides
// Interview: "This endpoint provides aggregated data - useful for dashboards"

app.get('/api/stats', (req, res) => {
    // Create empty object to count slides by category
    const categories = {};
    
    // Loop through all slides
    // forEach: Execute function for each slide
    // slide => {}: Arrow function - receives each slide
    // Interview: "forEach is for side effects, map is for transformations"
    
    slidesData.forEach(slide => {
        // categories[slide.category]: Access property (creates if doesn't exist)
        // (categories[slide.category] || 0): If undefined, use 0
        // + 1: Increment count
        // Interview: "I use || 0 to handle undefined - nullish coalescing (??) is also valid"
        
        categories[slide.category] = (categories[slide.category] || 0) + 1;
    });
    
    // Send statistics
    res.json({
        success: true,
        totalSlides: slidesData.length, // Total number of slides
        categories: categories // Object like { "React": 10, "Node.js": 5 }
    });
});

// ============================================
// ROUTE 4: SAVE PROGRESS (POST)
// ============================================
// POST: Used for creating/updating data
// In production, this would save to database
// Interview: "POST is for creating resources, PUT is for updating"

app.post('/api/progress', (req, res) => {
    // req.body: Contains parsed JSON from request body
    // Destructuring: Extract userId and progress from req.body
    // Interview: "Destructuring is cleaner than req.body.userId"
    
    const { userId, progress } = req.body;
    
    // In production, save to database here
    // For now, just log it
    // Template literal with multiple variables
    console.log(`Progress saved for user ${userId}:`, progress);
    
    // Send success response
    res.json({
        success: true,
        message: 'Progress saved'
    });
});

// ============================================
// STEP 8: ERROR HANDLING MIDDLEWARE
// ============================================
// This middleware catches errors from routes above
// Must be defined AFTER routes (middleware runs in order)
// Interview: "Error handling middleware has 4 parameters: (err, req, res, next)"

app.use((err, req, res, next) => {
    // err: The error object thrown from route handlers
    // Log error for debugging
    console.error('Server error:', err);
    
    // Send error response
    // 500: Internal Server Error
    // process.env.NODE_ENV: Environment variable ('development' or 'production')
    // In production, don't expose error details (security)
    // Interview: "Never expose internal errors to clients in production"
    
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        // Only show error details in development
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ============================================
// STEP 9: START THE SERVER
// ============================================
// app.listen(): Starts the HTTP server
// PORT: The port number to listen on
// Callback: Function that runs when server starts
// Interview: "listen() is asynchronous - server starts in background"

app.listen(PORT, () => {
    // These console.logs run when server successfully starts
    // Template literals for string interpolation
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API available at http://localhost:${PORT}/api/slides`);
    console.log(`📚 Total slides loaded: ${slidesData.length}`);
});

// ============================================
// INTERVIEW TALKING POINTS:
// ============================================
// 1. "I chose Express because it's lightweight and has great middleware ecosystem"
// 2. "I use CORS middleware to allow cross-origin requests from the React frontend"
// 3. "I parse markdown on server startup - in production, I'd use a database"
// 4. "I follow RESTful conventions: GET for reading, POST for creating"
// 5. "I handle errors gracefully with try-catch and error middleware"
// 6. "I use proper HTTP status codes: 200 for success, 404 for not found, 500 for errors"
// 7. "I structure routes logically: /api/slides for all, /api/slides/:id for one"
// 8. "I use environment variables for configuration (PORT) for deployment flexibility"
