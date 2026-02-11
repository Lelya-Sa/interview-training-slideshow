/* ============================================
   GENERATOR SCRIPT - BEGINNER EXPLANATION
   ============================================
   
   This script reads your markdown file and converts it into
   a format that the HTML slideshow can use.
   
   Think of it like a translator:
   - Input: Markdown file (human-readable text)
   - Output: JSON file (structured data for the slideshow)
*/

// ============================================
// STEP 1: LOAD THE FILE SYSTEM MODULE
// ============================================
// 'fs' (file system) lets us read and write files
// 'require' loads a module (like importing a library)
const fs = require('fs');

// ============================================
// STEP 2: READ THE MARKDOWN FILE
// ============================================
// readFileSync reads a file and waits until it's done
// 'utf8' means "read as text" (not binary)
// This reads your full_stack_interview_answers.md file
const content = fs.readFileSync('full_stack_interview_answers.md', 'utf8');

// ============================================
// STEP 3: PARSE THE MARKDOWN
// ============================================
// This function takes the raw markdown text and extracts
// all the questions and answers into a structured format
function parseMarkdown(content) {
    // This array will store all our slides
    const slides = [];
    
    // Split the content by "## " (markdown section headers)
    // This separates different sections like "React Basics", "Node.js", etc.
    // /^## /m means:
    //   ^ = start of line
    //   ## = literal "## "
    //   m = multiline mode (^ works on each line)
    const sections = content.split(/^## /m).filter(s => s.trim());
    // filter() removes empty sections
    
    let slideIndex = 0;  // Counter to number each slide
    
    // Loop through each section (e.g., "React Basics", "Node.js")
    sections.forEach(section => {
        // Split section into individual lines
        const lines = section.split('\n');
        
        // First line is the section title (e.g., "React Basics")
        const sectionTitle = lines[0].trim();
        
        // Variables to track the current question we're building
        let currentQuestion = null;  // The question title
        let currentContent = [];     // The answer content (array of lines)
        
        // Loop through each line in the section
        lines.forEach((line) => {
            // Check if this line is a question header
            // Questions start with "### " followed by a number
            // Example: "### 1. What is React?"
            if (line.match(/^### \d+\./)) {
                // If we were working on a previous question, save it first
                if (currentQuestion) {
                    slides.push({
                        id: slideIndex++,           // Unique ID (0, 1, 2, ...)
                        category: sectionTitle,     // Which section (e.g., "React Basics")
                        title: currentQuestion,     // The question text
                        content: currentContent.join('\n')  // The answer (join lines with newlines)
                    });
                }
                
                // Start a new question
                // Remove "### " and number, keep just the question text
                // Example: "### 1. What is React?" → "What is React?"
                currentQuestion = line.replace(/^### \d+\.?\s*/, '').trim();
                currentContent = [];  // Reset content for new question
            } 
            // If we're inside a question (not a separator line)
            else if (currentQuestion && line.trim() !== '---') {
                // Add this line to the current question's content
                currentContent.push(line);
            }
        });
        
        // Don't forget the last question in the section!
        if (currentQuestion) {
            slides.push({
                id: slideIndex++,
                category: sectionTitle,
                title: currentQuestion,
                content: currentContent.join('\n')
            });
        }
    });
    
    // Return all the slides we found
    return slides;
}

// ============================================
// STEP 4: RUN THE PARSER
// ============================================
// Call the function to parse the markdown
const slides = parseMarkdown(content);

// Print how many slides we found (for debugging)
console.log(`Parsed ${slides.length} slides`);

// ============================================
// STEP 5: SAVE AS JSON FILE
// ============================================
// JSON.stringify converts JavaScript objects/arrays into JSON text
// null, 2 means "pretty print" (add indentation for readability)
// This creates slides_data.json that the HTML file will load
fs.writeFileSync('slides_data.json', JSON.stringify(slides, null, 2));
console.log('Saved slides_data.json');

// Now create a simpler HTML that loads the JSON
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Full-Stack Interview Training - Gamified Slides</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            overflow: hidden;
        }
        .container { display: flex; height: 100vh; }
        .sidebar {
            width: 300px;
            background: rgba(255, 255, 255, 0.95);
            padding: 20px;
            overflow-y: auto;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        .stats {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .stat-item {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            font-size: 14px;
        }
        .stat-value {
            font-weight: bold;
            font-size: 18px;
        }
        .progress-bar {
            width: 100%;
            height: 20px;
            background: rgba(255,255,255,0.3);
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        .progress-fill {
            height: 100%;
            background: #4ade80;
            transition: width 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: bold;
        }
        .achievements { margin-top: 20px; }
        .achievement {
            background: #f3f4f6;
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 12px;
        }
        .achievement.unlocked {
            background: #fef3c7;
            border: 2px solid #f59e0b;
        }
        .achievement-icon { font-size: 20px; }
        .slide-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            position: relative;
        }
        .slide {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 900px;
            width: 100%;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            display: none;
            animation: slideIn 0.5s ease;
        }
        .slide.active { display: block; }
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .slide-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #667eea;
        }
        .slide-number {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
        }
        .slide-category {
            color: #667eea;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .slide-title {
            font-size: 32px;
            color: #1f2937;
            margin: 20px 0;
            line-height: 1.3;
        }
        .slide-content {
            font-size: 16px;
            line-height: 1.8;
            color: #4b5563;
        }
        .slide-content h3 {
            color: #667eea;
            margin: 20px 0 10px 0;
            font-size: 24px;
        }
        .slide-content h4 {
            color: #764ba2;
            margin: 15px 0 10px 0;
            font-size: 20px;
        }
        .slide-content code {
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
        }
        .code-block {
            background: #1e293b;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.6;
            white-space: pre-wrap;
        }
        .navigation {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 15px;
            z-index: 1000;
        }
        .nav-btn {
            background: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            color: #667eea;
        }
        .nav-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .nav-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .nav-btn.prev { background: #f3f4f6; }
        .nav-btn.next {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .points-popup {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: bold;
            animation: popup 0.5s ease;
            z-index: 2000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        @keyframes popup {
            0% { transform: translateY(-100px); opacity: 0; }
            50% { transform: translateY(10px); }
            100% { transform: translateY(0); opacity: 1; }
        }
        .mark-complete {
            background: #10b981;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 20px;
            transition: all 0.3s ease;
        }
        .mark-complete:hover {
            background: #059669;
            transform: scale(1.05);
        }
        .mark-complete.completed {
            background: #6b7280;
        }
        .keyboard-hint {
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 12px;
            z-index: 999;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        th {
            background: #667eea;
            color: white;
            font-weight: bold;
        }
        tr:hover { background: #f9fafb; }
        ul, ol { margin: 15px 0; padding-left: 30px; }
        li { margin: 8px 0; }
        .highlight {
            background: #fef3c7;
            padding: 2px 6px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="sidebar">
            <div class="stats">
                <h3 style="margin-bottom: 15px;">📊 Your Progress</h3>
                <div class="stat-item">
                    <span>Points:</span>
                    <span class="stat-value" id="points">0</span>
                </div>
                <div class="stat-item">
                    <span>Slides Completed:</span>
                    <span class="stat-value" id="completed">0</span>
                </div>
                <div class="stat-item">
                    <span>Total Slides:</span>
                    <span class="stat-value" id="total">Loading...</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress" style="width: 0%">0%</div>
                </div>
            </div>
            <div class="achievements">
                <h3 style="margin-bottom: 15px;">🏆 Achievements</h3>
                <div id="achievements-list"></div>
            </div>
        </div>
        <div class="slide-container">
            <div id="slides-container"></div>
        </div>
    </div>
    <div class="navigation">
        <button class="nav-btn prev" id="prevBtn" onclick="changeSlide(-1)">← Previous</button>
        <button class="nav-btn next" id="nextBtn" onclick="changeSlide(1)">Next →</button>
    </div>
    <div class="keyboard-hint">
        Press ← → arrow keys to navigate | Space to mark complete
    </div>
    <script>
        // ============================================
        // SLIDES DATA - EMBEDDED DIRECTLY
        // ============================================
        // Instead of fetching from a separate file (which causes CORS issues),
        // we embed the data directly in the HTML
        // This way it works when opening the file directly in the browser
        const slidesData = ${JSON.stringify(slides, null, 8)};
        
        // Initialize the app immediately since data is already loaded
        document.getElementById('total').textContent = slidesData.length;
        
        let gameState = {
            currentSlide: 0,
            points: 0,
            completedSlides: new Set(),
            achievements: new Set()
        };
        
        function initApp() {
            loadProgress();
            createSlides();
            updateNavigation();
        }
        
        function loadProgress() {
            const saved = localStorage.getItem('interviewTrainingProgress');
            if (saved) {
                const data = JSON.parse(saved);
                gameState.points = data.points || 0;
                gameState.completedSlides = new Set(data.completedSlides || []);
                gameState.achievements = new Set(data.achievements || []);
            }
        }
        
        function saveProgress() {
            localStorage.setItem('interviewTrainingProgress', JSON.stringify({
                points: gameState.points,
                completedSlides: Array.from(gameState.completedSlides),
                achievements: Array.from(gameState.achievements)
            }));
        }
        
        function parseContent(content) {
            if (!content) return '';
            let html = content;
            
            // Escape HTML first
            html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            
            // Code blocks - match triple backticks (escaped in JSON)
            // Pattern: javascript code blocks or regular code blocks
            const codeBlockJs = new RegExp('\\\\u0060\\\\u0060\\\\u0060javascript\\\\n([\\\\s\\\\S]*?)\\\\u0060\\\\u0060\\\\u0060', 'g');
            html = html.replace(codeBlockJs, function(m, code) {
                return '<div class="code-block">' + code + '</div>';
            });
            const codeBlock = new RegExp('\\\\u0060\\\\u0060\\\\u0060([\\\\s\\\\S]*?)\\\\u0060\\\\u0060\\\\u0060', 'g');
            html = html.replace(codeBlock, function(m, code) {
                return '<div class="code-block">' + code + '</div>';
            });
            
            // Inline code - use Unicode escape for backtick
            const inlineCode = new RegExp('\\\\u0060([^\\\\u0060]+)\\\\u0060', 'g');
            html = html.replace(inlineCode, '<code>$1</code>');
            
            // Bold
            html = html.replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>');
            
            // Headers
            html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
            html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
            html = html.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
            
            // Lists
            html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
            html = html.replace(/(<li>.*<\/li>\\n?)+/g, '<ul>$&</ul>');
            
            // Paragraphs
            html = html.replace(/\\n\\n/g, '</p><p>');
            html = '<p>' + html + '</p>';
            html = html.replace(/<p><\/p>/g, '');
            
            return html;
        }
        
        function createSlides() {
            const container = document.getElementById('slides-container');
            slidesData.forEach((slide, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'slide';
                slideDiv.id = 'slide-' + index;
                if (index === 0) slideDiv.classList.add('active');
                
                const isCompleted = gameState.completedSlides.has(index);
                
                slideDiv.innerHTML = 
                    '<div class="slide-header">' +
                        '<div>' +
                            '<div class="slide-category">' + escapeHtml(slide.category) + '</div>' +
                            '<div class="slide-number">Slide ' + (index + 1) + ' of ' + slidesData.length + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<h1 class="slide-title">' + escapeHtml(slide.title) + '</h1>' +
                    '<div class="slide-content">' + parseContent(slide.content) + '</div>' +
                    '<button class="mark-complete ' + (isCompleted ? 'completed' : '') + '" ' +
                            'onclick="markComplete(' + index + ')" ' +
                            'id="complete-btn-' + index + '">' +
                        (isCompleted ? '✓ Completed' : 'Mark as Complete (+10 points)') +
                    '</button>';
                
                container.appendChild(slideDiv);
            });
            updateStats();
            checkAchievements();
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function changeSlide(direction) {
            const newIndex = gameState.currentSlide + direction;
            if (newIndex < 0 || newIndex >= slidesData.length) return;
            
            document.getElementById('slide-' + gameState.currentSlide).classList.remove('active');
            gameState.currentSlide = newIndex;
            document.getElementById('slide-' + gameState.currentSlide).classList.add('active');
            document.getElementById('slide-' + gameState.currentSlide).scrollTop = 0;
            
            updateNavigation();
            saveProgress();
        }
        
        function updateNavigation() {
            document.getElementById('prevBtn').disabled = gameState.currentSlide === 0;
            document.getElementById('nextBtn').disabled = gameState.currentSlide === slidesData.length - 1;
        }
        
        function markComplete(index) {
            if (gameState.completedSlides.has(index)) return;
            
            gameState.completedSlides.add(index);
            gameState.points += 10;
            
            const btn = document.getElementById('complete-btn-' + index);
            btn.classList.add('completed');
            btn.textContent = '✓ Completed';
            
            showPointsPopup(10);
            updateStats();
            checkAchievements();
            saveProgress();
        }
        
        function showPointsPopup(points) {
            const popup = document.createElement('div');
            popup.className = 'points-popup';
            popup.textContent = '+' + points + ' points! 🎉';
            document.body.appendChild(popup);
            setTimeout(function() { popup.remove(); }, 2000);
        }
        
        function updateStats() {
            document.getElementById('points').textContent = gameState.points;
            document.getElementById('completed').textContent = gameState.completedSlides.size;
            const progress = (gameState.completedSlides.size / slidesData.length) * 100;
            const progressBar = document.getElementById('progress');
            progressBar.style.width = progress + '%';
            progressBar.textContent = Math.round(progress) + '%';
        }
        
        function checkAchievements() {
            const achievements = [
                { id: 'first', name: 'First Steps', desc: 'Complete your first slide', condition: function() { return gameState.completedSlides.size >= 1; }, points: 50 },
                { id: 'learner', name: 'Quick Learner', desc: 'Complete 5 slides', condition: function() { return gameState.completedSlides.size >= 5; }, points: 100 },
                { id: 'dedicated', name: 'Dedicated Student', desc: 'Complete 10 slides', condition: function() { return gameState.completedSlides.size >= 10; }, points: 200 },
                { id: 'expert', name: 'React Expert', desc: 'Complete all React slides', condition: function() {
                    const reactSlides = slidesData.filter(function(s) { return s.category.includes('React'); }).length;
                    const completed = Array.from(gameState.completedSlides).filter(function(i) { return slidesData[i].category.includes('React'); }).length;
                    return completed >= reactSlides;
                }, points: 300 },
                { id: 'master', name: 'Full-Stack Master', desc: 'Complete all slides', condition: function() { return gameState.completedSlides.size >= slidesData.length; }, points: 500 },
                { id: 'points100', name: 'Point Collector', desc: 'Earn 100 points', condition: function() { return gameState.points >= 100; }, points: 50 },
                { id: 'points500', name: 'Point Master', desc: 'Earn 500 points', condition: function() { return gameState.points >= 500; }, points: 100 }
            ];
            
            const achievementsList = document.getElementById('achievements-list');
            achievementsList.innerHTML = '';
            
            achievements.forEach(function(achievement) {
                const unlocked = gameState.achievements.has(achievement.id);
                const canUnlock = achievement.condition() && !unlocked;
                
                if (canUnlock) {
                    gameState.achievements.add(achievement.id);
                    gameState.points += achievement.points;
                    showPointsPopup(achievement.points);
                    saveProgress();
                }
                
                const achievementDiv = document.createElement('div');
                achievementDiv.className = 'achievement ' + (unlocked || canUnlock ? 'unlocked' : '');
                achievementDiv.innerHTML = 
                    '<span class="achievement-icon">' + (unlocked || canUnlock ? '🏆' : '🔒') + '</span>' +
                    '<div><strong>' + achievement.name + '</strong><br><small>' + achievement.desc + '</small></div>';
                achievementsList.appendChild(achievementDiv);
            });
            
            updateStats();
        }
        
        window.changeSlide = changeSlide;
        window.markComplete = markComplete;
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
            if (e.key === ' ') {
                e.preventDefault();
                markComplete(gameState.currentSlide);
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync('interview_training_slides.html', htmlTemplate);
console.log('Generated interview_training_slides.html');
console.log('Make sure to open interview_training_slides.html in a web browser');
console.log('Note: You may need to serve this via a local server due to CORS restrictions with JSON files');
