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

### Option 1: Clone the Repository

The fastest way to get started is using the complete God Panel project:

```bash
# Clone the repository
git clone https://github.com/god-plans/god-panel-nuxt.git
cd god-panel-nuxt

# Install dependencies
npm install

# Start development server (runs on port 3333)
npm run dev

# Open your browser to http://localhost:3333
```

### Option 2: Create from Template

If you want to start fresh with nuxt 4 and add God Panel features:

```bash
# Create a new Nuxt project
npx nuxi@latest init god-panel-project
cd god-panel-project

# Install required modules
npm install @nuxtjs/tailwindcss @pinia/nuxt @nuxtjs/color-mode @nuxtjs/i18n vuetify @mdi/font @mdi/js

# Install additional dependencies
npm install axios zod vue-tsc
npm install @mdi/js
```

## Project Structure

The God Panel Nuxt application has the following structure:

```
god-panel-nuxt/
├── app/
│   ├── assets/css/           # Global styles and Tailwind
│   ├── components/           # Vue components
│   │   ├── auth/            # Authentication components
│   │   ├── common/          # Reusable UI components
│   │   ├── dashboard/       # Dashboard navigation
│   │   ├── settings/        # Settings drawer components
│   │   └── theme/           # Theme-related components
│   ├── composables/         # Vue composables
│   ├── layouts/             # Page layouts
│   ├── middleware/          # Route middleware
│   ├── pages/               # File-based routing
│   ├── plugins/             # Nuxt plugins
│   ├── services/            # Business logic services
│   ├── stores/              # Pinia stores
│   ├── theme/               # Theme configuration
│   └── utils/               # Utility functions
├── assets/                  # Static assets
├── i18n/                    # Internationalization files
├── public/                  # Public static files
├── nuxt.config.ts           # Nuxt configuration
├── package.json
└── tailwind.config.js       # Tailwind CSS configuration
```

## Configuration

### Nuxt Configuration

The `nuxt.config.ts` file is already configured with all necessary modules:

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

### Environment Variables

Create a `.env` file in the root directory:

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

## Running the Application

### Development Mode

```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:3333

# Features available in development:
# - Hot module replacement (HMR)
# - TypeScript checking
# - Auto-imports for components and composables
# - Vuetify theme system
```

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview

# Generate static files (for static deployment)
npm run generate
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run generate     # Generate static files
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint code linting
npm run lint:fix     # Auto-fix linting issues
```

## Authentication & Login

### Demo Login

The application includes a demo authentication system for development:

**Demo Credentials:**
- **Email:** `godpanel@test.com`
- **Password:** `god123`

```typescript
// In development, you can use demo login
const loginResult = await authStore.login({
  email: 'godpanel@test.com',
  password: 'god123'
})
```

### Real Authentication Setup

To implement real authentication:

1. **Update the Auth Store** (`app/stores/auth.ts`):
```typescript
const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await $axios.post('/auth/login', credentials)
    const { user, accessToken } = response.data

    // Store user data and token
    user.value = { ...userSchema.parse(user), accessToken }
    localStorage.setItem('auth-token', accessToken)

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

2. **Add Login Form** in `app/pages/auth/login.vue`:
```vue
<template>
  <AuthMain>
    <AuthContent>
      <v-form @submit="handleLogin">
        <v-text-field
          v-model="credentials.email"
          label="Email"
          type="email"
          required
        />
        <v-text-field
          v-model="credentials.password"
          label="Password"
          type="password"
          required
        />
        <v-btn type="submit" color="primary" block>
          Sign In
        </v-btn>
      </v-form>
    </AuthContent>
  </AuthMain>
</template>
```

3. **Configure API Client** to handle authentication automatically.

## Navigation Setup

### Route Configuration

God Panel uses **file-based routing** with nuxt 4. Pages are automatically created from files in the `app/pages/` directory:

```
app/pages/
├── index.vue              # Home page (/)
├── auth/
│   └── login.vue         # Login page (/auth/login)
└── dashboard/
    ├── index.vue         # Dashboard home (/dashboard)
    ├── analytics/        # Analytics page (/dashboard/analytics)
    ├── settings/         # Settings page (/dashboard/settings)
    └── toast-demo.vue    # Toast demo page (/dashboard/toast-demo)
```

### Sidebar Navigation

Navigation is configured in `app/utils/routes.ts`:

```typescript
export const dashboardNavItems: NavItem[] = [
  {
    key: 'dashboard',
    title: 'common.dashboard',
    path: '/dashboard',
    icon: 'mdi-view-dashboard'
  },
  {
    key: 'analytics',
    title: 'common.analytics',
    path: '/dashboard/analytics',
    icon: 'mdi-chart-line'
  },
  {
    key: 'settings',
    title: 'common.settings',
    path: '/dashboard/settings',
    icon: 'mdi-cog'
  }
]
```

### Adding New Navigation Items

1. **Create a new page** in `app/pages/`:
```vue
<!-- app/pages/dashboard/users.vue -->
<template>
  <div>
    <h1>User Management</h1>
    <!-- Your user management content -->
  </div>
</template>
```

2. **Add to navigation** in `app/utils/routes.ts`:
```typescript
export const dashboardNavItems: NavItem[] = [
  // ... existing items
  {
    key: 'users',
    title: 'common.users',
    path: '/dashboard/users',
    icon: 'mdi-account-group'
  }
]
```

3. **Add translation key** for the title in your i18n files.

### Protected Routes

Use middleware to protect routes:

```typescript
<!-- app/middleware/auth.ts -->
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && !authStore.loading) {
    return navigateTo('/auth/login')
  }
})
```

Apply to protected pages:
```vue
<!-- app/pages/dashboard/settings.vue -->
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

## Theme Customization

### Changing Colors

God Panel uses a sophisticated theme system with preset colors. To change colors:

1. **Update Settings Store** (`app/stores/settings.ts`):
```typescript
const defaultSettings: Settings = {
  colorScheme: 'light',
  primaryColor: 'cyan', // Change from 'default' to 'cyan', 'purple', 'blue', etc.
  // ... other settings
}
```

2. **Available Color Presets:**
```typescript
// Available in the settings drawer
const colorPresets = [
  { name: 'Default', value: '#00A76F', key: 'default' },    // Green
  { name: 'Cyan', value: '#078DEE', key: 'cyan' },         // Blue
  { name: 'Purple', value: '#7635dc', key: 'purple' },     // Purple
  { name: 'Blue', value: '#0C68E9', key: 'blue' },         // Blue
  { name: 'Orange', value: '#fda92d', key: 'orange' },     // Orange
  { name: 'Red', value: '#FF3030', key: 'red' }           // Red
]
```

3. **Custom Colors** in `app/theme/core/colors.json`:
```json
{
  "primary": {
    "lighter": "#C8FAD6",
    "light": "#5BE49B",
    "main": "#00A76F",        // Change this main color
    "dark": "#007867",
    "darker": "#004B50",
    "contrastText": "#FFFFFF"
  }
}
```

### Using the Settings Panel

1. **Access Settings:** Click the settings button in the dashboard header
2. **Choose Color:** Select from preset colors in the settings drawer
3. **Apply Changes:** Colors are applied immediately and persisted

### Advanced Theme Customization

For custom themes, update the Vuetify theme in `app/theme/vuetify-config.js`:

```typescript
// Custom theme configuration
const customTheme = {
  colors: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    accent: '#your-accent-color',
    // ... other colors
  }
}
```

## Services Integration

### API Client Service

The application includes a powerful API client service:

```typescript
// Use the API client service
import { apiClient } from '~/services/api-client'

// Make API calls with automatic error handling
const users = await apiClient.get('/api/users')
const newUser = await apiClient.post('/api/users', userData)

// Features:
// - Automatic authentication token injection
// - Request caching and deduplication
// - Retry logic with exponential backoff
// - Error handling and logging
```

### Toast Service

Display notifications to users:

```typescript
// Use toast notifications
import { toastService } from '~/services/toast'

toastService.success('Data saved successfully!')
toastService.error('Failed to save data')
toastService.warning('Please check your input')
```

### Logger Service

Log application events and errors:

```typescript
// Use the logger service
import { logger } from '~/services/logger'

logger.info('User logged in', { userId: '123' })
logger.error('API request failed', { endpoint: '/api/users' })
logger.time('Data export') // Timer for performance monitoring
```

## Next Steps

Now that you understand the God Panel structure:

- **[Services Documentation](/content/services/index)** - Learn about API client, notifications, and logging
- **[Component Documentation](/content/components/overview)** - Explore the component library
- **[Theme Customization](/content/guides/theming)** - Customize appearance and colors
- **[Authentication Guide](/content/guides/authentication)** - Set up user authentication

**Ready to build?** Check out the **[Services Overview](/content/services/index)** to understand the core systems, then explore **[Component Documentation](/content/components/overview)** to start building your interface!

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

1. Check the [Quick Start Guide](/content/guides/quick-start) troubleshooting section
2. Search existing [GitHub Issues](https://github.com/god-plans/god-panel-documention/issues)
3. Create a new issue with:
   - Your Node.js version (`node --version`)
   - Your npm version (`npm --version`)
   - Steps to reproduce the issue
   - Error messages and stack traces

Happy coding! 🎉
