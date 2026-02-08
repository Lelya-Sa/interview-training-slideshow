# 🚀 Quick Start Guide

## ⚠️ Important: Run from Root Directory

**You must run commands from the `slideshow-app` folder (root), NOT from `client` or `server` folders!**

## Step 1: Navigate to Root

```bash
cd slideshow-app
# Make sure you're in: C:\Users\lelya\Desktop\intreview_training\slideshow-app
```

## Step 2: Start the Application

### Option A: Run Both Together (Recommended)
```bash
npm run dev
```

This starts:
- ✅ Backend on `http://localhost:5000`
- ✅ Frontend on `http://localhost:3001` (Note: 3001, not 3000)

**Note**: Port 3000 might be in use by other software (like Grafana). The app uses port 3001 instead.

### Option B: Run Separately (If Option A doesn't work)

**Terminal 1 - Backend:**
```bash
cd slideshow-app
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd slideshow-app
npm run client
```

## Step 3: Access the App

1. Wait for both servers to start
2. Open `http://localhost:3001` in your browser (Note: port 3001!)
3. You'll see the **Roadmap View** by default
4. Click on **Day 1** to see the checklist

## 🎮 How to Use

### Roadmap View
- See all training days in a grid
- Click any day to open its checklist
- See progress percentage for each day

### Day View
- Check off items as you complete them
- Earn 10 points per completed item
- Watch progress bar update
- Get completion banner at 100%

### View Switching
- Use buttons in top-right to switch between:
  - 📋 Training Roadmap
  - 📚 Interview Questions (slideshow)

## 🐛 Troubleshooting

### "Missing script: dev"
- **Problem**: You're in the wrong directory
- **Solution**: Make sure you're in `slideshow-app` (root), not `client` or `server`

### "Port already in use"
- **Problem**: Another process is using the port
- **Solution**: 
  - Port 5000: `taskkill /PID <PID> /F` (find PID with `netstat -ano | findstr :5000`)
  - Port 3001: Should be free, but if not, edit `.env` file to use different port

### Backend won't start
- Make sure `full_stack_interview_answers.md` exists in parent directory
- Check if port 5000 is available

### Frontend won't start
- Check if port 3001 is available
- Make sure backend is running first
- If port 3001 is taken, edit `client/.env` and change `PORT=3001` to another port

### "Cannot GET /api/roadmap/days"
- Backend server must be running
- Check browser console for errors
- Verify backend is on port 5000

## 📝 Available Commands

From root directory (`slideshow-app`):

```bash
npm run dev          # Start both servers
npm run server       # Start backend only
npm run client       # Start frontend only
npm run build        # Build for production
npm run install-all  # Install all dependencies
```

## ✅ Verification

After starting, you should see:
1. Backend console: "🚀 Server running on http://localhost:5000"
2. Frontend opens automatically at `http://localhost:3001` (or manually open it)
3. Roadmap view shows all days
4. Clicking Day 1 opens the checklist

## 🔧 Port Configuration

- **Backend**: Port 5000 (configurable via `PORT` environment variable)
- **Frontend**: Port 3001 (configurable via `client/.env` file)

If you need to change ports:
1. Backend: Edit `server/index.js` - change `const PORT = process.env.PORT || 5000;`
2. Frontend: Edit `client/.env` - change `PORT=3001`
3. Proxy: Edit `client/package.json` - change `"proxy": "http://localhost:5000"` to match backend port

**Happy Learning! 🎉**
