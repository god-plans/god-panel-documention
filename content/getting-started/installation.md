---
title: Installation
description: Install and set up God Panel
category: getting-started
order: 2
---

# Installation

This guide covers detailed installation options for God Panel.

## System Requirements

### Minimum Requirements
- **Node.js**: 18.0.0 or later
- **npm**: 8.0.0 or later (or yarn 1.22.0+ / pnpm 7.0.0+)
- **Memory**: 512MB RAM minimum, 1GB recommended
- **Storage**: 1GB free space

### Recommended Setup
- **Node.js**: 20.0.0 or later (LTS)
- **Package Manager**: npm, yarn, or pnpm
- **OS**: Linux, macOS, or Windows (WSL recommended for Windows)

## Installation Methods

### Method 1: Clone the Repository (Recommended)

```bash
# Clone the God Panel Nuxt application
git clone https://github.com/your-org/god-panel.git
cd god-panel/god-panel-nuxt

# Install dependencies
npm install

# Start development server (runs on port 3333)
npm run dev
```

### Method 2: Create from Scratch

If you prefer to start fresh:

```bash
# Create a new Nuxt project
npx nuxi@latest init god-panel-project
cd god-panel-project

# Install required modules
npm install @nuxtjs/tailwindcss @pinia/nuxt @nuxtjs/color-mode @nuxtjs/i18n vuetify @mdi/font @mdi/js

# Install additional dependencies
npm install axios zod vue-tsc
npm run dev
```

### Method 3: Manual Installation

```bash
# Create new Nuxt project
npx nuxi@latest init god-panel-project
cd god-panel-project

# Install God Panel core dependencies
npm install vue vue-router @nuxt/kit

# Install UI framework (choose one)
npm install @nuxtjs/tailwindcss  # For Tailwind CSS
# OR
npm install @nuxtjs/vuetify     # For Vuetify

# Install additional dependencies
npm install @nuxt/content       # For documentation
npm install @nuxtjs/i18n        # For internationalization
npm install @pinia/nuxt         # For state management

# Install development dependencies
npm install --save-dev @nuxt/devtools
```

## Initial Configuration

### 1. Environment Setup

Create a `.env` file in your project root:

```env
# Application
NODE_ENV=development
APP_NAME="God Panel"
APP_URL=http://localhost:3000

# Database
DATABASE_URL="your-database-connection-string"

# Authentication
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN="24h"

# API
API_BASE_URL="https://api.your-domain.com"
API_KEY="your-api-key"

# Email (optional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-email-password
```

### 2. Nuxt Configuration

Update `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Basic configuration
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',

  // Site information
  site: {
    url: process.env.APP_URL || 'http://localhost:3000',
    name: process.env.APP_NAME || 'God Panel'
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME || 'God Panel',
      appUrl: process.env.APP_URL || 'http://localhost:3000',
      apiBaseUrl: process.env.API_BASE_URL || '/api'
    },
    // Private keys (only available on server-side)
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],

  // Content module configuration
  content: {
    markdown: {
      anchorLinks: {
        depth: 4,
        exclude: [1]
      }
    },
    navigation: {
      fields: ['title', 'description', 'category']
    }
  },

  // Internationalization
  i18n: {
    locales: ['en', 'fa'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  },

  // Pinia configuration
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  }
})
```

### 3. Package.json Scripts

Ensure your `package.json` has these scripts:

```json
{
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "nuxt typecheck"
  }
}
```

## Verification

### 1. Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to verify the installation.

### 2. Build Test

```bash
npm run build
npm run preview
```

### 3. Type Checking

```bash
npm run typecheck
```

## Advanced Installation

### Docker Setup

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  god-panel:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - ./data:/app/data
```

### CI/CD Setup

Example GitHub Actions workflow:

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: aws s3 sync dist/ s3://your-bucket
```

## Troubleshooting Installation

### Common Issues

**Permission Errors:**
```bash
# On Linux/macOS
sudo chown -R $(whoami) ~/.npm
# Or use a Node version manager
```

**Module Not Found:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Failures:**
```bash
# Check Node version
node --version

# Clear Nuxt cache
rm -rf .nuxt .output
npm run dev
```

### Getting Help

If you encounter issues during installation:

1. Verify your Node.js version: `node --version`
2. Check npm version: `npm --version`
3. Review error logs carefully
4. Search existing issues: [GitHub Issues](https://github.com/your-org/god-panel/issues)
5. Create a new issue with system information

## Next Steps

After successful installation:

1. **[Configuration Guide](./configuration)** - Set up your application
2. **[Authentication Setup](../guides/authentication)** - Configure user management
3. **[Theme Customization](/content/guides/theming)** - Customize appearance
4. **[Quick Start Guide](/content/guides/quick-start)** - Start developing features

Happy installing! 🚀
