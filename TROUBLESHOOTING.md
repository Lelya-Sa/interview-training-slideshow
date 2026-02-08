# 🐛 Troubleshooting Guide

## Port Already in Use Errors

### Error: `EADDRINUSE: address already in use :::5000` or `:::3000`

**Problem**: Another process is already using the port.

**Solution 1: Kill the Process (Windows)**

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F
```

**Solution 2: Change Ports**

Edit `server/index.js`:
```javascript
const PORT = process.env.PORT || 5001; // Change to 5001
```

Edit `client/package.json`:
```json
"proxy": "http://localhost:5001"
```

**Solution 3: Use Different Ports via Environment Variables**

```powershell
# Set environment variable
$env:PORT=5001
npm run dev
```

## Other Common Issues

### "Cannot GET /api/roadmap/days"
- **Problem**: Backend server not running
- **Solution**: Make sure backend started successfully (check for "Server running" message)

### "Failed to load roadmap"
- **Problem**: Backend can't read daily-schedule folder
- **Solution**: Make sure `daily-schedule` folder exists in parent directory

### Frontend shows blank page
- **Problem**: Backend not running or CORS issue
- **Solution**: 
  1. Check backend is running on port 5000
  2. Check browser console for errors
  3. Verify proxy in `client/package.json`

### Checklist items not saving
- **Problem**: localStorage issue
- **Solution**: 
  1. Check browser console for errors
  2. Clear browser cache and try again
  3. Check browser allows localStorage

## Quick Fix Commands

```powershell
# Kill all Node processes (nuclear option)
taskkill /IM node.exe /F

# Then restart
cd slideshow-app
npm run dev
```

## Still Having Issues?

1. Check both terminal windows for error messages
2. Verify Node.js is installed: `node --version`
3. Verify npm is installed: `npm --version`
4. Try restarting your computer (sometimes ports get stuck)
