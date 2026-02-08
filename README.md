# 🎓 Full-Stack Interview Training Slideshow

A complete **React + Node.js** application for learning interview questions with gamification features.

**Perfect for interview preparation** - demonstrates real-world full-stack development skills.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation

```bash
# 1. Navigate to project
cd slideshow-app

# 2. Install all dependencies (root, backend, frontend)
npm run install-all
```

### Running the Application

**Option 1: Run Both Together (Easiest)**
```bash
npm run dev
```

This starts:
- ✅ Backend server on `http://localhost:5000`
- ✅ React app on `http://localhost:3000` (opens automatically)

**Option 2: Run Separately**

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Access the App

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000/api/slides`

---

## 📚 How to Use

### For Learning

1. **Read the Code**: Every file has extensive comments explaining every line
2. **Follow the Flow**: Start with `server/index.js`, then `client/src/App.js`
3. **Understand Concepts**: Comments explain React hooks, Express routes, etc.
4. **Practice**: Modify code, add features, break things and fix them

### For Interview Prep

1. **Study the Structure**: Understand how frontend and backend communicate
2. **Learn the Patterns**: See how to structure a full-stack app
3. **Practice Explaining**: Read code and explain it out loud
4. **Build from Scratch**: Follow `HOW_TO_BUILD_FROM_SCRATCH.md`

---

## 📁 Project Structure

```
slideshow-app/
├── server/                 # Node.js/Express Backend
│   ├── index.js           # Main server file (heavily commented)
│   └── package.json
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── App.js         # Main component (heavily commented)
│   │   ├── index.js       # Entry point (heavily commented)
│   │   └── components/    # React components (all commented)
│   │       ├── Sidebar.js
│   │       ├── SlideContainer.js
│   │       ├── Navigation.js
│   │       ├── KeyboardHint.js
│   │       └── PointsPopup.js
│   └── package.json
│
├── README.md              # This file
└── HOW_TO_BUILD_FROM_SCRATCH.md  # Step-by-step interview guide
```

---

## 🎯 What This Project Teaches

### Backend (Node.js/Express)
- ✅ Express.js server setup
- ✅ RESTful API design
- ✅ Middleware usage (CORS, JSON parser)
- ✅ File system operations
- ✅ Route handling
- ✅ Error handling
- ✅ Environment variables

### Frontend (React)
- ✅ Functional components
- ✅ React Hooks (useState, useEffect)
- ✅ API calls with axios
- ✅ Component composition
- ✅ Props and state
- ✅ Event handling
- ✅ Conditional rendering
- ✅ LocalStorage persistence

### Full-Stack Concepts
- ✅ Frontend-backend communication
- ✅ API integration
- ✅ Data flow (Backend → Frontend)
- ✅ Project structure
- ✅ Development workflow
- ✅ CORS configuration

---

## 🎮 Features

### Gamification
- ✅ **Points System** - Earn 10 points per completed slide
- ✅ **Progress Tracking** - Visual progress bar
- ✅ **Achievements** - Unlock badges as you progress
- ✅ **Auto-save** - Progress saved in browser localStorage

### Navigation
- ✅ **Arrow Keys** - Navigate with ← →
- ✅ **Space Bar** - Mark slide as complete
- ✅ **Buttons** - Click Previous/Next

### Learning Features
- ✅ **69 Slides** - All interview questions from markdown
- ✅ **Code Examples** - Syntax-highlighted code blocks
- ✅ **Categories** - Organized by topic
- ✅ **Responsive** - Works on desktop and mobile

---

## 📖 Documentation

### Code Comments

**Every file has extensive comments explaining:**
- What each line does
- Why it's needed
- How it works
- Interview concepts it demonstrates

**Example:**
```javascript
// useState: Hook that adds state to functional components
// Returns array: [currentValue, setterFunction]
// Interview: "useState returns a stateful value and function to update it"
const [count, setCount] = useState(0);
```

### Step-by-Step Guide

See `HOW_TO_BUILD_FROM_SCRATCH.md` for:
- How to build backend from scratch
- How to build frontend from scratch
- How to connect them
- Interview talking points

---

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/slides` | GET | Get all slides |
| `/api/slides/:id` | GET | Get specific slide by ID |
| `/api/stats` | GET | Get statistics |
| `/api/progress` | POST | Save progress (future) |

---

## 🎓 Interview Preparation

### How to Use This for Interviews

1. **Read All Code**: Understand every line
2. **Explain Out Loud**: Practice explaining the code
3. **Build from Scratch**: Follow the guide to build it yourself
4. **Add Features**: Practice adding new features
5. **Understand Trade-offs**: Know why you made each choice

### Key Concepts to Master

**React:**
- useState and useEffect hooks
- Component lifecycle
- Props and state
- Event handling
- API calls

**Node.js/Express:**
- Express server setup
- RESTful API design
- Middleware
- Route handling
- Error handling

**Full-Stack:**
- Frontend-backend communication
- CORS
- API design
- Data flow

---

## 🐛 Troubleshooting

### Backend won't start
- Make sure `full_stack_interview_answers.md` exists in parent directory
- Check if port 5000 is available
- Verify Node.js is installed: `node --version`

### Frontend won't start
- Check if port 3000 is available
- Make sure backend is running first
- Try deleting `node_modules` and reinstalling: `npm install`

### "Cannot GET /api/slides"
- Backend server must be running
- Check browser console for errors
- Verify proxy is set in `client/package.json`

### CORS errors
- Backend should have CORS enabled (already done)
- Make sure frontend proxy is configured
- Check that backend is on port 5000

---

## 📦 Dependencies

### Backend
- **express** - Web framework
- **cors** - Cross-origin resource sharing

### Frontend
- **react** - UI library
- **react-dom** - React for web
- **axios** - HTTP client
- **react-scripts** - Create React App tooling

---

## 🚀 Next Steps

1. **Run the app** and explore
2. **Read the code** - All files have extensive comments
3. **Follow the guide** - Build it from scratch
4. **Modify features** - Add your own ideas
5. **Practice explaining** - Prepare for interviews

---

## 💡 Tips for Interviews

### When Explaining Your Code

1. **Start High-Level**: "This is a full-stack app with React frontend and Express backend"
2. **Explain Architecture**: "I separated concerns - backend handles data, frontend handles UI"
3. **Show Understanding**: "I use useState for local state, useEffect for side effects"
4. **Mention Trade-offs**: "I use localStorage for simplicity, but in production I'd use a database"
5. **Be Honest**: "I chose Express because it's popular and well-documented"

### Common Interview Questions

**Q: Why did you choose React?**
A: "React is popular, has great ecosystem, and functional components with hooks are modern and clean."

**Q: Why Express over other frameworks?**
A: "Express is lightweight, flexible, and has great middleware ecosystem. It's also widely used."

**Q: How do you handle errors?**
A: "I use try-catch for API calls, show user-friendly messages, and log errors for debugging."

**Q: How would you scale this?**
A: "I'd add a database (MongoDB/PostgreSQL), implement authentication, add caching, and use a CDN for static assets."

---

## 📝 Notes

- Progress is saved in browser `localStorage`
- Backend reads markdown file on startup
- Frontend fetches data on component mount
- All code includes beginner-friendly comments
- Perfect for learning and interview preparation

**Happy Learning! 🎉**
