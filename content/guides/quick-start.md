---
title: Quick Start Guide
description: Get up and running with God Panel in 5 minutes
category: guides
order: 1
---

# Quick Start Guide

Get started with God Panel in just 5 minutes! This guide will walk you through the essential setup and basic usage.

## Prerequisites

- **Node.js** 20.0 or later
- **npm** or **yarn** package manager
- Basic knowledge of JavaScript/TypeScript

## 1. Create Your Project

```bash
# Using npm (recommended)
npm create nuxt@latest god-panel-app

# Using yarn
yarn create nuxt god-panel-app

# Using pnpm
pnpm create nuxt god-panel-app
```

Follow the interactive setup:
- Select **TypeScript** for better development experience
- Choose **Tailwind CSS** for styling (or Vuetify as alternative)
- Enable **Pinia** for state management
- Add **Nuxt Content** for documentation (optional for basic apps)

## 2. Navigate to Your Project

```bash
cd god-panel-app
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start Development Server

```bash
npm run dev
```

Your application will be available at **http://localhost:3000**

## 5. Explore the Structure

Your project comes with a ready-to-use structure:

```
god-panel-app/
├── app/
│   ├── assets/css/main.css    # Global styles
│   ├── components/           # Reusable components
│   ├── layouts/              # Page layouts
│   ├── pages/                # File-based routing
│   ├── composables/          # Reusable logic
│   └── stores/               # State management
├── nuxt.config.ts            # Nuxt configuration
└── package.json
```

## 6. Create Your First Page

Create a new page at `app/pages/dashboard.vue`:

```vue
<template>
  <div class="dashboard">
    <h1>Welcome to God Panel!</h1>
    <p>This is your first dashboard page.</p>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Users</h3>
        <p class="stat-number">1,234</p>
      </div>
      <div class="stat-card">
        <h3>Orders</h3>
        <p class="stat-number">567</p>
      </div>
      <div class="stat-card">
        <h3>Revenue</h3>
        <p class="stat-number">$12,345</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page logic will go here
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #3b82f6;
}
</style>
```

## 7. Add Authentication

Install authentication module:

```bash
npm install @nuxtjs/auth-next
```

Update `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/auth-next'
  ],

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' }
        }
      }
    }
  }
})
```

Create login page at `app/pages/login.vue`:

```vue
<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Login to God Panel</h2>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
        >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
        >
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const login = async () => {
  loading.value = true
  error.value = ''

  try {
    await $auth.loginWith('local', {
      data: form.value
    })

    await navigateTo('/dashboard')
  } catch (err) {
    error.value = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #ef4444;
  margin-top: 1rem;
  text-align: center;
}
</style>
```

## 8. Add API Routes

Create API endpoints in `server/api/` directory:

**server/api/auth/login.post.ts:**
```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate credentials (replace with your logic)
  if (body.email === 'admin@example.com' && body.password === 'password') {
    const token = 'your-jwt-token-here'

    return {
      success: true,
      user: {
        id: '1',
        name: 'Admin User',
        email: body.email
      },
      token
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials'
  })
})
```

**server/api/auth/user.get.ts:**
```typescript
export default defineEventHandler(async (event) => {
  // Get token from Authorization header
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // Verify token and get user (replace with your logic)
  const user = {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com'
  }

  return {
    success: true,
    user
  }
})
```

## 9. Customize Theme

Edit `app/assets/css/main.css`:

```css
:root {
  /* Primary colors */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-900: #1e3a8a;

  /* Custom properties */
  --font-family: 'Inter', sans-serif;
  --border-radius: 8px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

* {
  font-family: var(--font-family);
}

.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--primary-900);
}
```

## 10. Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview

# Generate static files (optional)
npm run generate
```

## What's Next?

Congratulations! You now have a basic God Panel application running. Here's what you can do next:

### 🚀 Explore Features
- **[Authentication Guide](./authentication)** - Complete user management
- **[Theming Guide](./theming)** - Customize appearance
- **[Component Library](/content/components/overview)** - Use pre-built components

### 📚 Learn More
- **[Configuration Guide](/content/getting-started/configuration)** - Advanced setup
- **[API Reference](/content/api/index)** - Backend integration
- **[Deployment Guide](/content/deployment)** - Production deployment

### 🛠️ Build Something
- Add user management pages
- Create custom dashboard widgets
- Integrate with external APIs
- Set up database connections

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill processes on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

**Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Type checking
npm run typecheck

# Clear Nuxt cache
rm -rf .nuxt .output
npm run dev
```

### Getting Help

- **Documentation**: Check other guides in this documentation
- **Issues**: [GitHub Issues](https://github.com/god-plans/god-panel-documention/issues)
- **Discussions**: [Community Discussions](https://github.com/god-plans/god-panel-documention/discussions)

## Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # TypeScript checking
npm run test         # Run tests

# Utilities
npm run generate     # Generate static files
npm run clean        # Clear cache and builds
```

---

## Next Steps

Now that you have a basic setup, explore these essential features:

- **[Services Documentation](/content/services/index)** - API client, notifications, and logging systems
- **[Authentication Guide](./authentication)** - Complete user management system
- **[Component Documentation](/content/components/overview)** - UI components and layouts
- **[Theme Customization](./theming)** - Visual customization options

**Ready to build?** Start with the **[Services Overview](/content/services/index)** to understand the core systems!
