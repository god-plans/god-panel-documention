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
git clone https://github.com/god-plans/god-panel-nuxt.git
cd god-panel-nuxt

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

# Install required modules and dependencies
npm install @nuxtjs/tailwindcss @pinia/nuxt @nuxtjs/color-mode @nuxtjs/i18n vuetify @mdi/font @mdi/js axios zod vue-tsc

# Start development server
npm run dev
```

### Method 3: Manual Installation

```bash
# Create new Nuxt project
npx nuxi@latest init god-panel-project
cd god-panel-project

# Install core God Panel dependencies
npm install vue vue-router @nuxt/kit

# Install UI and styling dependencies
npm install @nuxtjs/tailwindcss vuetify @mdi/font @mdi/js

# Install state management and utilities
npm install @pinia/nuxt @nuxtjs/color-mode @nuxtjs/i18n
npm install axios zod vue-tsc

# Install development dependencies
npm install --save-dev @nuxt/devtools
```

## Initial Configuration

### 1. Environment Setup

Create a `.env` file in your project root:

```env
# Application
NODE_ENV=development

# API Configuration
NUXT_PUBLIC_API_URL=http://localhost:4000

# Site Configuration
NUXT_PUBLIC_SITE_URL=http://localhost:3333

# Authentication
JWT_SECRET="your-jwt-secret-key"
REFRESH_TOKEN_EXPIRY=7d

# Feature Flags
ENABLE_MOCK_DATA=true

# Database (if using backend)
DATABASE_URL="your-database-connection-string"

# API Key (if using external services)
API_KEY="your-api-key"

```

### 2. Nuxt Configuration

Update `nuxt.config.ts` with the actual God Panel configuration:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Development server configuration
  devServer: {
    port: 3333,
    // host: '0.0.0.0'
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n'
  ],

  // Auto-imports for better DX
  imports: {
    autoImport: true
  },

  // Runtime config for API
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000',
      appName: 'God Panel',
      version: '1.0.0',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      enableMockData: process.env.ENABLE_MOCK_DATA === 'true'
    },
    private: {
      jwtSecret: process.env.JWT_SECRET,
      refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d'
    }
  },

  // Color mode configuration
  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // CSS configuration
  css: [
    '~/assets/css/main.css',
    // Load Vuetify styles
    'vuetify/lib/styles/main.sass',
    // Load MDI font for icons
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  // Build configuration
  build: {
    transpile: ['vuetify']
  },

  // SSR configuration
  ssr: true,

  // Nitro configuration for better performance
  nitro: {
    compressPublicAssets: true,
    minify: true,
    experimental: {
      wasm: true
    }
  },

  // Vite configuration for optimization
  vite: {
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            ui: ['vuetify', '@mdi/js'],
            utils: ['axios', 'zod', 'clsx']
          }
        }
      }
    }
  },

  // Experimental features
  experimental: {
    payloadExtraction: false,
    viewTransition: true
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false // Disable during development for better performance
  },

  // App configuration
  app: {
    head: {
      title: 'Gods Projects - Divine Innovation',
      meta: [
        { name: 'description', content: 'Modern dashboard built with divine innovation and cutting-edge technology.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#6366f1' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/god-pure-dark.png' },
        { rel: 'apple-touch-icon', href: '/god-pure-dark.png' }
      ]
    }
  },

  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'fa',
        language: 'fa-IR',
        dir: 'rtl',
        files: ['fa.json']
      },
      {
        code: 'en',
        language: 'en-US',
        files: ['en.json'],
        dir: 'ltr'
      }
    ],
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    langDir: './locales/'
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

Visit `http://localhost:3333` to verify the installation.

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
4. Search existing issues: [GitHub Issues](https://github.com/god-plans/god-panel-documention/issues)
5. Create a new issue with system information

## Next Steps

After successful installation:

1. **[Configuration Guide](./configuration)** - Set up your application
2. **[Authentication Setup](../guides/authentication)** - Configure user management
3. **[Theme Customization](/content/guides/theming)** - Customize appearance
4. **[Quick Start Guide](/content/guides/quick-start)** - Start developing features

Happy installing! 🚀
