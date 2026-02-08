# 🚀 Deploy to Vercel - Complete Guide

This guide will help you deploy your interview training slideshow app to Vercel so you can access it from anywhere!

## 📋 Prerequisites

1. **GitHub Account** (free) - Vercel works best with GitHub
2. **Vercel Account** (free) - Sign up at [vercel.com](https://vercel.com)
3. **Node.js installed** (for local testing)

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Your Code

Make sure all your code is committed to Git:

```bash
cd slideshow-app
git add .
git commit -m "Prepare for Vercel deployment"
```

### Step 2: Push to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "Add New Project"**
3. **Import your GitHub repository**:
   - Select your repository from the list
   - Click "Import"
4. **Configure Project Settings**:
   - **Framework Preset**: Other (or React if available)
   - **Root Directory**: `slideshow-app` (if your repo root is one level up)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/build`
   - **Install Command**: `npm install && cd client && npm install`
5. **Add Environment Variables** (if needed):
   - Usually not needed for this project
6. **Click "Deploy"**

### Step 4: Wait for Deployment

Vercel will:
1. Install dependencies
2. Build your React app
3. Deploy serverless functions
4. Give you a URL like: `https://your-app-name.vercel.app`

### Step 5: Test Your Deployment

Visit your Vercel URL and test:
- ✅ Frontend loads
- ✅ API endpoints work (`/api/slides`, `/api/roadmap/days`, etc.)
- ✅ Questions load correctly

## 🔧 Troubleshooting

### Issue: Build Fails

**Error**: "Cannot find module"
- **Solution**: Make sure all dependencies are in `package.json`
- Check that `client/package.json` has all React dependencies

### Issue: API Routes Return 404

**Error**: "404 Not Found" for `/api/*`
- **Solution**: 
  - Make sure your `api/` folder is in the root of `slideshow-app/`
  - Check `vercel.json` configuration
  - Verify file paths in serverless functions

### Issue: Questions Don't Load

**Error**: "File not found" in questions API
- **Solution**: 
  - Make sure `full_stack_interview_answers.md` is in the project root
  - Check path resolution in `api/questions.js`
  - Verify `daily-schedule/` folder exists

### Issue: CORS Errors

**Error**: "Access-Control-Allow-Origin"
- **Solution**: Already handled in serverless functions with CORS headers

## 📁 Project Structure for Vercel

```
slideshow-app/
├── api/                    # Serverless functions (Vercel auto-detects)
│   ├── slides.js
│   ├── slides/
│   │   └── [id].js
│   ├── stats.js
│   ├── roadmap/
│   │   └── days.js
│   ├── roadmap/
│   │   └── days/
│   │       └── [dayNumber].js
│   └── questions.js
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── vercel.json            # Vercel configuration
└── full_stack_interview_answers.md  # Must be in root
```

## 🔄 Updating Your Deployment

Every time you push to GitHub:

1. **Make changes locally**
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. **Vercel automatically redeploys** (if connected to GitHub)

## 🌐 Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 💡 Tips

- **Free Tier**: Vercel free tier is generous for personal projects
- **Serverless Functions**: Each API route is a separate serverless function
- **Cold Starts**: First request might be slower (serverless function startup)
- **Caching**: Vercel caches static files automatically

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Serverless Functions Guide](https://vercel.com/docs/functions)
- [React Deployment](https://vercel.com/docs/frameworks/react)

## ✅ Checklist Before Deploying

- [ ] All code committed to Git
- [ ] Pushed to GitHub
- [ ] `vercel.json` configured correctly
- [ ] All API routes in `/api` folder
- [ ] `full_stack_interview_answers.md` in project root
- [ ] `daily-schedule/` folder exists
- [ ] Tested locally with `npm run build`

---

**Need Help?** Check Vercel's deployment logs in the dashboard for detailed error messages!
