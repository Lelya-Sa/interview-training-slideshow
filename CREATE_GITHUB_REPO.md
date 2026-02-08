# 📦 Create GitHub Repository and Push Code

## ✅ Step 1: Your Local Repository is Ready!

Your code is already committed locally. Now we need to create a GitHub repository and push to it.

## 🚀 Step 2: Create GitHub Repository

### Option A: Using GitHub Website (Easiest)

1. **Go to [github.com](https://github.com)** and sign in
2. **Click the "+" icon** in the top right → **"New repository"**
3. **Fill in the details**:
   - **Repository name**: `interview-training-slideshow` (or any name you like)
   - **Description**: "Full-stack interview training slideshow with React and Node.js"
   - **Visibility**: 
     - ✅ **Public** (free, anyone can see)
     - 🔒 **Private** (only you can see, free for personal use)
   - **DO NOT** check "Initialize with README" (we already have one)
   - **DO NOT** add .gitignore or license (we already have them)
4. **Click "Create repository"**

### Option B: Using GitHub CLI (If you have it installed)

```bash
gh repo create interview-training-slideshow --public --source=. --remote=origin --push
```

## 🔗 Step 3: Connect and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to your project (if not already there)
cd C:\Users\lelya\Desktop\intreview_training\slideshow-app

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/Lelya-Sa/interview-training-slideshow.git

# Rename branch to main (GitHub uses 'main' by default)
git branch -M main

# Push your code
git push -u origin main
```

**OR** if you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/interview-training-slideshow.git
git branch -M main
git push -u origin main
```

## 🔐 Step 4: Authentication

When you push, GitHub will ask for authentication:

- **If using HTTPS**: You'll need a Personal Access Token
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` permissions
  - Use it as your password when pushing

- **If using SSH**: Make sure your SSH key is added to GitHub
  - Go to GitHub → Settings → SSH and GPG keys
  - Add your SSH key if you haven't already

## ✅ Step 5: Verify

1. Go to your repository on GitHub
2. You should see all your files
3. The repository URL will be: `https://github.com/YOUR_USERNAME/interview-training-slideshow`

## 🎯 Next Step: Deploy to Vercel

Once your code is on GitHub, you can deploy to Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Follow the deployment guide in `DEPLOY_TO_VERCEL.md`

## 💡 Quick Copy-Paste Commands

**Replace `YOUR_USERNAME` with your actual GitHub username:**

```powershell
cd C:\Users\lelya\Desktop\intreview_training\slideshow-app
git remote add origin https://github.com/YOUR_USERNAME/interview-training-slideshow.git
git branch -M main
git push -u origin main
```

## ❓ Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/interview-training-slideshow.git
```

### Error: "Authentication failed"
- Make sure you're using a Personal Access Token (not your password)
- Or set up SSH keys

### Error: "Repository not found"
- Double-check the repository name and your username
- Make sure the repository exists on GitHub

---

**Need help?** Check GitHub's documentation: [Creating a new repository](https://docs.github.com/en/get-started/quickstart/create-a-repo)
