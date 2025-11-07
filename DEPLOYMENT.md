# 🚀 Netlify Deployment Guide

This guide covers multiple ways to deploy your God Panel documentation to Netlify.

## 📋 Prerequisites

- [Netlify Account](https://app.netlify.com/)
- Node.js 20+ installed
- Git repository (for Git-based deployment)

## 🎯 Deployment Methods

### Method 1: Git-Based Deployment (Recommended)

#### Step 1: Connect Repository to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider (GitHub, GitLab, Bitbucket)
4. Select your repository

#### Step 2: Configure Build Settings
```
Build command: npm run docs:build
Publish directory: .vitepress/dist
Node version: 20
```

#### Step 3: Deploy
- Click **"Deploy site"**
- Netlify will automatically build and deploy on every push to main branch

### Method 2: Manual Deployment via CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Build and Deploy
```bash
# Build the documentation
npm run docs:build

# Deploy to Netlify
netlify deploy --dir=.vitepress/dist --prod
```

#### Step 4: Use the Provided Script
```bash
# Make script executable (already done)
chmod +x deploy-netlify.sh

# Run deployment script
./deploy-netlify.sh
```

### Method 3: Drag & Drop Deployment

#### Step 1: Build Locally
```bash
npm run docs:build
```

#### Step 2: Deploy via Netlify Dashboard
1. Go to [Netlify Sites](https://app.netlify.com/)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the `.vitepress/dist` folder
4. Click **"Deploy site"**

### Method 4: GitHub Actions (CI/CD)

#### Step 1: Add Secrets to Repository
Go to your repository Settings → Secrets and variables → Actions:
```
NETLIFY_AUTH_TOKEN: Your Netlify personal access token
NETLIFY_SITE_ID: Your Netlify site ID
```

#### Step 2: Get Netlify Credentials
```bash
# Get your personal access token from: https://app.netlify.com/user/applications#personal-access-tokens
# Get your site ID from: netlify sites:list
```

#### Step 3: Push and Deploy
The workflow will automatically deploy on pushes to main/master branch.

## ⚙️ Configuration Files

### netlify.toml
The `netlify.toml` file is pre-configured with:
- Build settings
- Environment variables
- Redirect rules
- Security headers
- Cache optimization

### GitHub Actions Workflow
The `.github/workflows/netlify.yml` handles automated deployments.

## 🌐 Custom Domain (Optional)

### Step 1: Add Custom Domain
1. Go to your site settings in Netlify
2. Click **"Domain management"**
3. Add your custom domain

### Step 2: Configure DNS
Follow Netlify's DNS configuration instructions.

## 🔧 Environment Variables

Add these in Netlify dashboard under Site settings → Environment variables:

```bash
NODE_VERSION=20
NPM_FLAGS=--production=false
```

## 🚀 Build Optimization

### Bundle Analysis
```bash
npm install -g vite-bundle-analyzer
vite-bundle-analyzer .vitepress/dist
```

### Performance Tips
- Large bundles are split automatically
- Static assets are cached for 1 year
- Images are optimized by Netlify

## 🔍 Troubleshooting

### Build Fails
```bash
# Check build logs in Netlify dashboard
# Test build locally first
npm run docs:build
npm run docs:preview
```

### 404 Errors
- Check `netlify.toml` redirect rules
- Ensure SPA fallback is configured

### Slow Builds
- Use Netlify's build cache
- Minimize dependencies
- Use build hooks for long builds

## 📊 Monitoring & Analytics

### Enable Analytics
1. Go to Site settings → Analytics
2. Enable Netlify Analytics

### Performance Monitoring
- Use Netlify's speed insights
- Monitor Core Web Vitals
- Set up uptime monitoring

## 🔒 Security

The deployment includes security headers:
- X-Frame-Options: DENY
- X-XSS-Protection: Enabled
- Content-Type: Nosniff
- Referrer-Policy: Strict

## 🎉 Success!

Once deployed, your documentation will be available at:
- `https://your-site-name.netlify.app`
- Or your custom domain

## 📞 Support

- [Netlify Documentation](https://docs.netlify.com/)
- [VitePress Deployment Guide](https://vitepress.dev/guide/deploy)
- [God Panel Issues](https://github.com/god-plans/god-panel-documention/issues)

---

**Happy Deploying! 🚀**

