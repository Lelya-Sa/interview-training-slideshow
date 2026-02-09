# ✅ Vercel Settings Checklist

If builds are still failing, check these settings in your Vercel dashboard:

## 🔧 Project Settings → General

1. **Framework Preset**: Set to **"Other"** (NOT "Create React App")
2. **Root Directory**: 
   - If your GitHub repo root IS `slideshow-app`, leave **blank**
   - If your GitHub repo contains `slideshow-app` as a subfolder, set to **`slideshow-app`**
3. **Build Command**: Leave blank (uses vercel.json) OR set to `npm run build`
4. **Output Directory**: Set to **`client/build`**
5. **Install Command**: Leave blank (uses vercel.json) OR set to `cd client && npm install`

## 🔍 Debugging Steps

### Step 1: Check Build Logs
Look at the build logs in Vercel dashboard. Check:
- What directory is it running from?
- Is `cd client` actually changing directories?
- Are dependencies being installed?

### Step 2: Test Locally
Test the exact commands Vercel runs:

```bash
cd client
npm install
npm run build
```

If this works locally but fails on Vercel, it's a configuration issue.

### Step 3: Check Package Lock
Ensure `client/package-lock.json` is committed:

```bash
git ls-files client/package-lock.json
```

Should show: `client/package-lock.json`

### Step 4: Alternative - Use Root Build
If client directory installs keep failing, try building from root:

**vercel.json:**
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "client/build",
  "installCommand": "npm run install-all",
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

This uses the root `package.json`'s `install-all` script which installs everything.

## 🚨 Common Issues

### "Only 29 packages installed"
- **Cause**: npm install not finding/using package-lock.json correctly
- **Fix**: Try `npm install` instead of `npm ci`, or regenerate package-lock.json

### "react-scripts: command not found"
- **Cause**: Dependencies not installed in client/node_modules
- **Fix**: Ensure installCommand runs in client directory and installs all deps

### "Framework detection conflict"
- **Cause**: Vercel auto-detecting wrong framework
- **Fix**: Set Framework Preset to "Other" in settings

---

**Current vercel.json uses `npm install --legacy-peer-deps`. If this still fails, try the root build approach above.**
