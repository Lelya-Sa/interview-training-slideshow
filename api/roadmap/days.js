/* ============================================
   VERCEL SERVERLESS FUNCTION: GET ALL DAYS
   ============================================
   
   URL: /api/roadmap/days
   Method: GET
*/

const fs = require('fs');
const path = require('path');

// Force Vercel to include the daily-schedule directory
// Check if it exists to ensure it's included in the bundle
try {
    // Check api directory first (where files are committed)
    const apiSchedulePath = path.join(__dirname, '../daily-schedule');
    if (fs.existsSync(apiSchedulePath)) {
        // Directory exists, will be included in bundle
        console.log('Daily schedule directory will be included:', apiSchedulePath);
    }
} catch (e) {
    // Ignore - we'll read it at runtime
}

function parseDayReadme(dayPath) {
    try {
        // Try README.md first, then fall back to topics.md
        let readmePath = path.join(dayPath, 'README.md');
        let content = null;
        let fileType = 'README.md';
        
        if (fs.existsSync(readmePath)) {
            content = fs.readFileSync(readmePath, 'utf8');
        } else {
            // Fall back to topics.md
            readmePath = path.join(dayPath, 'topics.md');
            if (fs.existsSync(readmePath)) {
                content = fs.readFileSync(readmePath, 'utf8');
                fileType = 'topics.md';
                console.log(`Using topics.md for day at: ${dayPath}`);
            } else {
                console.warn(`Neither README.md nor topics.md found for day at: ${dayPath}`);
                return null;
            }
        }
        
        const day = {
            topics: [],
            corePractice: [],
            completion: []
        };
        
        const lines = content.split('\n');
        
        // Parse based on file type
        if (fileType === 'topics.md') {
            // Parse topics.md format
            let currentTopic = null;
            let inCoreTopics = false;
            
            console.log(`Parsing topics.md format for day at: ${dayPath}`);
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                // Extract day number
                if (line.match(/^# Day (\d+)/)) {
                    const match = line.match(/Day (\d+)/);
                    if (match) {
                        day.dayNumber = parseInt(match[1]);
                        console.log(`Extracted day number: ${day.dayNumber}`);
                    }
                }
                
                // Check if we're in Core Topics section
                if (line.includes('Core Topics')) {
                    inCoreTopics = true;
                    console.log(`Found Core Topics section at line ${i}`);
                    continue;
                }
                
                // Check if we're in Extra Topics section (skip for now)
                if (line.includes('Extra Topics')) {
                    inCoreTopics = false;
                    console.log(`Found Extra Topics section at line ${i}, stopping core topics`);
                    continue;
                }
                
                // Topic name (starts with ###)
                if (line.match(/^### (.+)$/)) {
                    const match = line.match(/^### (.+)$/);
                    if (match && inCoreTopics) {
                        currentTopic = {
                            name: match[1].trim(),
                            path: '',
                            text: match[1].trim(),
                            completed: false
                        };
                        console.log(`Found topic: ${currentTopic.name}`);
                    }
                }
                
                // Path line (format: - **Path**: `...`)
                // Try multiple patterns to match the path
                const pathPatterns = [
                    /- \*\*Path\*\*:\s*`([^`]+)`/,  // - **Path**: `...`
                    /Path:\s*`([^`]+)`/,            // Path: `...`
                    /- Path:\s*`([^`]+)`/           // - Path: `...`
                ];
                
                for (const pattern of pathPatterns) {
                    const match = line.match(pattern);
                    if (match && currentTopic) {
                        currentTopic.path = match[1];
                        currentTopic.text += `\n  - Path: \`${match[1]}\``;
                        day.topics.push(currentTopic);
                        console.log(`Added topic with path: ${currentTopic.name} -> ${currentTopic.path}`);
                        currentTopic = null;
                        break; // Found the path, move to next topic
                    }
                }
            }
            
            console.log(`Parsed ${day.topics.length} topics from topics.md`);
            console.log(`Day number: ${day.dayNumber}`);
            
            // If no day number was found, try to extract from path
            if (!day.dayNumber) {
                const pathMatch = dayPath.match(/day-(\d+)/);
                if (pathMatch) {
                    day.dayNumber = parseInt(pathMatch[1]);
                    console.log(`Extracted day number from path: ${day.dayNumber}`);
                }
            }
        } else {
            // Parse README.md format (original format)
            let currentSection = null;
            let lastTopicIndex = -1;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                if (line.includes('CORE PRACTICE')) {
                    currentSection = 'corePractice';
                } else if (line.includes('CORE TOPICS')) {
                    currentSection = 'topics';
                } else if (line.includes('Completion')) {
                    currentSection = 'completion';
                }
                
                if (line.trim().startsWith('- [ ]')) {
                    const item = line.replace('- [ ]', '').trim();
                    if (currentSection === 'corePractice') {
                        day.corePractice.push({ text: item, completed: false });
                    } else if (currentSection === 'topics') {
                        const nameMatch = item.match(/\*\*(.*?)\*\*/);
                        let path = '';
                        
                        const pathMatch = item.match(/Path:\s*`([^`]+)`/) || 
                                         (i + 1 < lines.length && lines[i + 1].match(/Path:\s*`([^`]+)`/));
                        
                        if (pathMatch) {
                            path = pathMatch[1];
                        }
                        
                        day.topics.push({
                            name: nameMatch ? nameMatch[1] : item,
                            text: item + (path ? `\n  - Path: \`${path}\`` : ''),
                            path: path,
                            completed: false
                        });
                        lastTopicIndex = day.topics.length - 1;
                    } else if (currentSection === 'completion') {
                        day.completion.push({ text: item, completed: false });
                    }
                }
                else if (currentSection === 'topics' && line.match(/^\s+-\s+Path:\s*`([^`]+)`/)) {
                    const pathMatch = line.match(/Path:\s*`([^`]+)`/);
                    if (pathMatch && lastTopicIndex >= 0) {
                        day.topics[lastTopicIndex].path = pathMatch[1];
                        day.topics[lastTopicIndex].text += '\n  - Path: `' + pathMatch[1] + '`';
                    }
                }
                
                if (line.startsWith('# Day')) {
                    const match = line.match(/Day (\d+):/);
                    if (match) {
                        day.dayNumber = parseInt(match[1]);
                    }
                }
                
                if (line.includes('Level:')) {
                    const match = line.match(/Level: (.*?)\|/);
                    if (match) {
                        day.level = match[1].trim();
                    }
                }
            }
        }
        
        return day;
    } catch (err) {
        console.error(`Error parsing day: ${err.message}`);
        return null;
    }
}

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
    
    // In Vercel, __dirname points to /var/task/api/roadmap
    // The daily-schedule directory should be in the api directory itself
    // Try api directory first (where files are committed)
    const apiSchedulePath = path.join(__dirname, '../daily-schedule');
    const days = [];
    
    console.log('Looking for daily-schedule at:', apiSchedulePath);
    console.log('__dirname:', __dirname);
    
    // List files in api directory to debug
    try {
        const apiDir = path.resolve(__dirname, '..');
        const apiFiles = fs.readdirSync(apiDir);
        console.log('Files in api directory:', apiFiles.slice(0, 20));
    } catch (e) {
        console.log('Could not list api directory:', e.message);
    }
    
    try {
        // Check api directory first (where files are committed)
        if (fs.existsSync(apiSchedulePath)) {
            console.log('Found daily-schedule at:', apiSchedulePath);
            const entries = fs.readdirSync(apiSchedulePath, { withFileTypes: true });
            return processDays(entries, apiSchedulePath, res);
        }
        
        console.error('Daily schedule not found at:', apiSchedulePath);
        // Try alternative paths (project root - fallback)
        const altPaths = [
            path.join(__dirname, '../../daily-schedule'),
            '/var/task/daily-schedule'
        ];
        
        for (const altPath of altPaths) {
            console.log('Trying alternative path:', altPath);
            if (fs.existsSync(altPath)) {
                console.log('Found at:', altPath);
                const entries = fs.readdirSync(altPath, { withFileTypes: true });
                return processDays(entries, altPath, res);
            }
        }
        
        console.error('Could not find daily-schedule in any location');
        return res.status(404).json({
            success: false,
            message: 'Daily schedule directory not found',
            attemptedPath: apiSchedulePath,
            __dirname: __dirname
        });
    } catch (err) {
        console.error('Error reading roadmap:', err);
        res.status(500).json({
            success: false,
            message: 'Error reading roadmap',
            error: err.message
        });
    }
};

function processDays(entries, roadmapPath, res) {
    const days = [];
    const skippedDays = [];
    
    console.log(`\n=== PROCESSING DAYS ===`);
    console.log(`Processing ${entries.length} entries from ${roadmapPath}`);
    console.log(`Roadmap path exists: ${fs.existsSync(roadmapPath)}`);
    
    // List what's actually in the directory
    try {
        const dirContents = fs.readdirSync(roadmapPath);
        console.log(`Directory contents (first 20):`, dirContents.slice(0, 20));
        console.log(`Total items in directory: ${dirContents.length}`);
        
        // Check if day directories exist
        const dayDirs = dirContents.filter(item => {
            const itemPath = path.join(roadmapPath, item);
            try {
                return fs.statSync(itemPath).isDirectory() && item.startsWith('day-');
            } catch {
                return false;
            }
        });
        console.log(`Found ${dayDirs.length} day directories:`, dayDirs.slice(0, 5));
    } catch (e) {
        console.error(`Cannot read directory: ${e.message}`);
        return res.status(500).json({
            success: false,
            message: 'Cannot read roadmap directory: ' + e.message
        });
    }
    
    // Process only first 3 days for detailed debugging
    let processedCount = 0;
    const maxDebugDays = 3;
    
    entries.forEach(entry => {
        if (entry.isDirectory() && entry.name.startsWith('day-')) {
            const dayNumber = parseInt(entry.name.replace('day-', ''));
            const dayPath = path.join(roadmapPath, entry.name);
            
            // Detailed logging for first few days
            const isDebugDay = processedCount < maxDebugDays;
            
            if (isDebugDay) {
                console.log(`\n--- Processing Day ${dayNumber} ---`);
                console.log(`Day path: ${dayPath}`);
                console.log(`Day path exists: ${fs.existsSync(dayPath)}`);
            }
            
            // Check if day directory exists
            if (!fs.existsSync(dayPath)) {
                if (isDebugDay) {
                    console.warn(`Day ${dayNumber}: Directory not found at ${dayPath}`);
                }
                skippedDays.push({ day: dayNumber, reason: 'Directory not found', path: dayPath });
                return;
            }
            
            // List files in day directory
            let dayFiles = [];
            try {
                dayFiles = fs.readdirSync(dayPath);
                if (isDebugDay) {
                    console.log(`Day ${dayNumber} files (${dayFiles.length}):`, dayFiles);
                }
            } catch (e) {
                if (isDebugDay) {
                    console.warn(`Day ${dayNumber}: Cannot list directory: ${e.message}`);
                }
                skippedDays.push({ day: dayNumber, reason: 'Cannot list directory: ' + e.message, path: dayPath });
                return;
            }
            
            // Check if README.md or topics.md exists before trying to parse
            const readmePath = path.join(dayPath, 'README.md');
            const topicsPath = path.join(dayPath, 'topics.md');
            const readmeExists = fs.existsSync(readmePath);
            const topicsExists = fs.existsSync(topicsPath);
            
            if (isDebugDay) {
                console.log(`Day ${dayNumber}: README.md exists? ${readmeExists}`);
                console.log(`Day ${dayNumber}: topics.md exists? ${topicsExists}`);
                if (readmeExists) {
                    try {
                        const stats = fs.statSync(readmePath);
                        console.log(`Day ${dayNumber}: README.md size: ${stats.size} bytes`);
                    } catch (e) {
                        console.warn(`Day ${dayNumber}: Cannot stat README.md: ${e.message}`);
                    }
                }
                if (topicsExists) {
                    try {
                        const stats = fs.statSync(topicsPath);
                        console.log(`Day ${dayNumber}: topics.md size: ${stats.size} bytes`);
                    } catch (e) {
                        console.warn(`Day ${dayNumber}: Cannot stat topics.md: ${e.message}`);
                    }
                }
            }
            
            if (!readmeExists && !topicsExists) {
                if (isDebugDay) {
                    console.warn(`Day ${dayNumber}: Neither README.md nor topics.md found`);
                    console.warn(`Day ${dayNumber}: Available files:`, dayFiles);
                }
                skippedDays.push({ day: dayNumber, reason: 'Neither README.md nor topics.md found', path: dayPath });
                return; // Skip this day
            }
            
            try {
                const dayData = parseDayReadme(dayPath);
                
                if (dayData && dayData.topics && dayData.topics.length > 0) {
                    // Ensure dayNumber is set
                    if (!dayData.dayNumber) {
                        dayData.dayNumber = dayNumber;
                    }
                    days.push(dayData);
                    if (isDebugDay) {
                        console.log(`Day ${dayNumber}: Successfully parsed with ${dayData.topics.length} topics`);
                    }
                } else {
                    if (isDebugDay) {
                        console.warn(`Day ${dayNumber}: Failed to parse day data`);
                        console.warn(`Day ${dayNumber}: dayData:`, dayData ? JSON.stringify({ 
                            topicsCount: dayData.topics?.length || 0,
                            dayNumber: dayData.dayNumber,
                            hasTopics: !!dayData.topics
                        }, null, 2) : 'null');
                    }
                    skippedDays.push({ 
                        day: dayNumber, 
                        reason: dayData ? `No topics found (found ${dayData.topics?.length || 0})` : 'Parse returned null', 
                        path: dayPath 
                    });
                }
            } catch (err) {
                if (isDebugDay) {
                    console.error(`Day ${dayNumber}: Error parsing - ${err.message}`);
                    console.error(`Day ${dayNumber}: Stack:`, err.stack);
                }
                skippedDays.push({ day: dayNumber, reason: err.message, path: dayPath });
            }
            
            processedCount++;
        }
    });
    
    days.sort((a, b) => a.dayNumber - b.dayNumber);
    
    console.log(`Successfully loaded ${days.length} days. Skipped ${skippedDays.length} days.`);
    if (skippedDays.length > 0) {
        console.log('Skipped days:', skippedDays.slice(0, 5).map(d => `Day ${d.day}: ${d.reason}`));
    }
    
    res.json({
        success: true,
        count: days.length,
        days: days,
        skipped: skippedDays.length > 0 ? skippedDays.length : undefined
    });
}
