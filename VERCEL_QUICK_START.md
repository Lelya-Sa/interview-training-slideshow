# ⚡ Quick Start: Deploy to Vercel

## 🚀 Fastest Way (5 minutes)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Vercel"
   git push
   ```

2. **Go to [vercel.com](https://vercel.com)** → Sign in → "Add New Project"

3. **Import your GitHub repo** → Click "Import"

4. **Configure**:
   - **Root Directory**: `slideshow-app` (if your repo is one level up)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/build`
   - **Install Command**: `npm install && cd client && npm install`

5. **Click "Deploy"** → Wait 2-3 minutes → Done! 🎉

## ✅ What's Already Done

- ✅ All Express routes converted to Vercel serverless functions
- ✅ Frontend uses relative API paths (works automatically)
- ✅ `vercel.json` configured
- ✅ CORS headers added to all API functions

## 📍 Your App Will Be At

`https://your-project-name.vercel.app`

## 🔄 Auto-Deploy

Every `git push` to main branch = automatic redeploy!

## ❓ Need Help?

See `DEPLOY_TO_VERCEL.md` for detailed troubleshooting.
