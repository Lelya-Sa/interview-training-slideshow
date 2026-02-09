# 🔧 Vercel Build Fix Guide

If you're still getting `react-scripts: command not found` errors, try these solutions:

## Solution 1: Check Vercel Project Settings

In your Vercel dashboard:

1. Go to your project → **Settings** → **General**
2. **Framework Preset**: Set to **"Other"** (not "Create React App")
3. **Root Directory**: Leave blank (or set to `slideshow-app` if your repo root is one level up)
4. **Build Command**: Should be `cd client && npm run build` (or leave blank to use vercel.json)
5. **Output Directory**: Set to `client/build`

## Solution 2: Alternative vercel.json Configuration

If the current config doesn't work, try this alternative:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ],
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

## Solution 3: Check package-lock.json

Make sure `client/package-lock.json` is committed to Git:

```bash
git add client/package-lock.json
git commit -m "Ensure package-lock.json is committed"
git push
```

## Solution 4: Manual Build Test

Test the build locally to ensure it works:

```bash
cd client
npm ci
npm run build
```

If this works locally but fails on Vercel, it's a configuration issue.

## Solution 5: Use Vercel CLI Locally

Test the build with Vercel CLI:

```bash
npm install -g vercel
vercel build
```

This will show you exactly what Vercel sees.

## Common Issues

### Issue: "Only 29 packages installed"
- **Cause**: npm install might be running in wrong directory
- **Fix**: Ensure `installCommand` in vercel.json uses correct path

### Issue: "react-scripts not found"
- **Cause**: Dependencies not installed or wrong directory
- **Fix**: Use `npm ci` instead of `npm install` for reliable installs

### Issue: "Framework detection conflict"
- **Cause**: Vercel auto-detecting wrong framework
- **Fix**: Set Framework Preset to "Other" in project settings

---

**Current vercel.json uses `npm ci` which should be more reliable. If issues persist, try the alternative configuration above.**
