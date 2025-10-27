---
title: Getting Started
description: Get started with God Panel in minutes
category: getting-started
order: 1
---

# Getting Started

Welcome to God Panel! This guide will help you get up and running with your first God Panel project.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** 18.0 or later
- **npm** or **yarn** package manager
- **Git** for version control

## Installation

### Option 1: Create from Template

The fastest way to get started is using our official template:

```bash
# Using npm
npm create nuxt@latest god-panel-project

# Using yarn
yarn create nuxt god-panel-project

# Using pnpm
pnpm create nuxt god-panel-project
```

### Option 2: Manual Setup

If you prefer to start from scratch:

```bash
# Create a new Nuxt project
npx nuxi@latest init god-panel-project
cd god-panel-project

# Install God Panel dependencies
npm install @nuxtjs/tailwindcss @nuxtjs/vuetify
npm install @nuxt/content vue-router

# Install additional UI dependencies
npm install @mdi/js
```

## Project Structure

After installation, your project will have the following structure:

```
god-panel-project/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── dashboard/
│   │   └── settings/
│   ├── layouts/
│   ├── pages/
│   ├── composables/
│   ├── middleware/
│   ├── plugins/
│   ├── stores/
│   └── utils/
├── content/              # Documentation content (if using content module)
├── public/
├── nuxt.config.ts
├── package.json
└── README.md
```

## Configuration

### Basic Configuration

Update your `nuxt.config.ts` file:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Site configuration
  site: {
    url: 'https://your-domain.com',
    name: 'Your Admin Panel'
  },

  // CSS framework
  css: ['~/assets/css/main.css'],

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content' // For documentation
  ],

  // Runtime configuration
  runtimeConfig: {
    public: {
      siteName: 'God Panel',
      siteDescription: 'Modern Admin Dashboard'
    }
  }
})
```

### Environment Variables

Create a `.env` file for configuration:

```env
# API Configuration
API_BASE_URL=https://api.your-domain.com
API_KEY=your_api_key_here

# Authentication
JWT_SECRET=your_jwt_secret_here

# Database
DATABASE_URL=your_database_connection_string

# Application
NODE_ENV=development
```

## Running the Development Server

Start the development server:

```bash
# Development
npm run dev

# The application will be available at:
# http://localhost:3000
```

## Building for Production

```bash
# Build for production
npm run build

# Preview the production build
npm run preview

# Generate static files (if using static generation)
npm run generate
```

## Next Steps

Now that you have God Panel running, check out these guides:

- **[Authentication Setup](./authentication)** - Configure user authentication
- **[Theme Customization](./theme)** - Customize the appearance
- **[Component Usage](./components)** - Learn about available components
- **[Services Documentation](../services)** - API client, notifications, and logging
- **[API Integration](./api)** - Connect to your backend

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill processes using port 3000
npx kill-port 3000
# Or specify a different port in nuxt.config.ts
export default defineNuxtConfig({
  devServer: {
    port: 3001
  }
})
```

**Module resolution errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Regenerate TypeScript definitions
npm run prepare
```

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting Guide](./troubleshooting)
2. Search existing [GitHub Issues](https://github.com/your-org/god-panel/issues)
3. Create a new issue with:
   - Your Node.js version (`node --version`)
   - Your npm version (`npm --version`)
   - Steps to reproduce the issue
   - Error messages and stack traces

Happy coding! 🎉
