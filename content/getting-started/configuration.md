---
title: Configuration
description: Configure God Panel for your needs
category: getting-started
order: 3
---

# Configuration

This guide covers configuring God Panel for your specific requirements.

## Project Configuration

### Nuxt Configuration

The main configuration file is `nuxt.config.ts`. Here are the key sections:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Development
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',

  // Site Information
  site: {
    url: 'https://your-domain.com',
    name: 'Your Admin Panel'
  },

  // Runtime Configuration
  runtimeConfig: {
    public: {
      appName: 'God Panel',
      appUrl: 'https://your-domain.com',
      apiBaseUrl: '/api'
    },
    // Server-only keys
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    emailConfig: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],

  // Content Configuration
  content: {
    markdown: {
      anchorLinks: { depth: 4, exclude: [1] }
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
  }
})
```

## Environment Variables

### Required Variables

Create a `.env` file:

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

# Email Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-email-password

# Storage
STORAGE_DRIVER=local
STORAGE_PATH=./storage
```

### Optional Variables

```env
# Caching
REDIS_URL="redis://localhost:6379"
CACHE_TTL=3600

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Security
CORS_ORIGIN="http://localhost:3000"
RATE_LIMIT=100

# Features
ENABLE_REGISTRATION=true
ENABLE_EMAIL_VERIFICATION=false
```

## Module Configuration

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    }
  },
  plugins: []
}
```

### Vuetify Configuration

```typescript
// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#3b82f6',
            secondary: '#64748b',
            accent: '#f59e0b'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
```

## Application Settings

### Theme Configuration

Create theme configuration in `app/config/theme.ts`:

```typescript
export interface ThemeConfig {
  primary: string
  secondary: string
  accent: string
  dark: boolean
  rtl: boolean
}

export const defaultTheme: ThemeConfig = {
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#f59e0b',
  dark: false,
  rtl: false
}

export const themes = {
  light: defaultTheme,
  dark: {
    ...defaultTheme,
    dark: true
  }
}
```

### Navigation Configuration

Create navigation structure in `app/config/navigation.ts`:

```typescript
export interface NavItem {
  title: string
  path: string
  icon?: string
  children?: NavItem[]
}

export const mainNavigation: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'mdi-view-dashboard'
  },
  {
    title: 'Users',
    path: '/users',
    icon: 'mdi-account-group'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: 'mdi-cog',
    children: [
      {
        title: 'General',
        path: '/settings/general'
      },
      {
        title: 'Security',
        path: '/settings/security'
      }
    ]
  }
]
```

## Database Configuration

### Database Setup

Configure your database connection:

```typescript
// composables/useDatabase.ts
export const useDatabase = () => {
  const config = useRuntimeConfig()

  return {
    url: config.databaseUrl,
    // Database-specific configuration
    options: {
      // Connection options
    }
  }
}
```

### Migration Setup

```bash
# Create migration files
npm run migrate:make create_users_table

# Run migrations
npm run migrate
```

## API Configuration

### API Routes Setup

```typescript
// server/api/config.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  return {
    appName: config.public.appName,
    apiBaseUrl: config.public.apiBaseUrl,
    features: {
      registration: process.env.ENABLE_REGISTRATION === 'true',
      emailVerification: process.env.ENABLE_EMAIL_VERIFICATION === 'true'
    }
  }
})
```

### External API Integration

```typescript
// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()

  const fetchWithConfig = async (endpoint: string, options: any = {}) => {
    const baseURL = config.public.apiBaseUrl

    return $fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        ...options.headers
      }
    })
  }

  return {
    get: (endpoint: string) => fetchWithConfig(endpoint),
    post: (endpoint: string, data: any) => fetchWithConfig(endpoint, {
      method: 'POST',
      body: data
    }),
    put: (endpoint: string, data: any) => fetchWithConfig(endpoint, {
      method: 'PUT',
      body: data
    }),
    delete: (endpoint: string) => fetchWithConfig(endpoint, {
      method: 'DELETE'
    })
  }
}
```

## Development Configuration

### Development Tools

```typescript
// nuxt.config.ts - Development only
export default defineNuxtConfig({
  // Only in development
  devtools: { enabled: true },

  // Development server
  devServer: {
    port: 3000,
    host: 'localhost'
  },

  // Hot reload
  vite: {
    server: {
      hmr: {
        port: 24678
      }
    }
  }
})
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

## Production Configuration

### Build Optimization

```typescript
// nuxt.config.ts - Production
export default defineNuxtConfig({
  // Disable devtools in production
  devtools: { enabled: false },

  // Enable SSR
  ssr: true,

  // Build optimization
  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  // CSS optimization
  css: ['~/assets/css/main.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/variables.scss";'
        }
      }
    }
  }
})
```

## Security Configuration

### CORS Setup

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
      }
    }
  }
})
```

### Rate Limiting

```typescript
// server/middleware/rate-limit.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const limit = parseInt(config.public.rateLimit || '100')

  // Implement rate limiting logic
  // This is a simplified example
  const clientIP = getClientIP(event)
  const now = Date.now()

  // Check rate limit
  if (exceedsLimit(clientIP, limit, now)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests'
    })
  }
})
```

## Deployment Configuration

### Static Generation

```typescript
// nuxt.config.ts - For static sites
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  }
})
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build application
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/.output ./
EXPOSE 3000
CMD ["node", "server/index.mjs"]
```

## Testing Configuration

```json
// package.json - Testing scripts
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Monitoring Configuration

```typescript
// composables/useMonitoring.ts
export const useMonitoring = () => {
  const config = useRuntimeConfig()

  const logError = (error: Error, context?: any) => {
    // Log to external service
    console.error('Application Error:', {
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    })
  }

  const logPerformance = (metric: string, value: number) => {
    // Log performance metrics
    console.log('Performance Metric:', {
      metric,
      value,
      timestamp: new Date().toISOString()
    })
  }

  return {
    logError,
    logPerformance
  }
}
```

## Configuration Validation

Create a configuration validator:

```typescript
// utils/config-validator.ts
export const validateConfig = () => {
  const config = useRuntimeConfig()
  const errors: string[] = []

  // Validate required environment variables
  if (!config.jwtSecret) {
    errors.push('JWT_SECRET is required')
  }

  if (!config.public.appName) {
    errors.push('APP_NAME is required')
  }

  // Validate URLs
  try {
    new URL(config.public.appUrl)
  } catch {
    errors.push('APP_URL must be a valid URL')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
```

## Next Steps

After configuration:

1. **[Authentication Setup](/content/guides/authentication)** - Configure user authentication
2. **[Theme Customization](/content/guides/theming)** - Customize appearance
3. **[Quick Start Guide](/content/guides/quick-start)** - Start developing features
4. **[Deployment Guide](/content/deployment)** - Deploy your application

## Troubleshooting

### Common Configuration Issues

**Environment Variables Not Loading:**
- Ensure `.env` file is in project root
- Check variable names match exactly
- Restart development server after changes

**Module Configuration Errors:**
- Verify module versions in `package.json`
- Check import paths in configuration files
- Review Nuxt documentation for breaking changes

**Build Failures:**
- Clear `.nuxt` and `node_modules` directories
- Run `npm install` to ensure all dependencies
- Check TypeScript configuration

### Getting Help

For configuration issues:

1. Review [Nuxt Configuration Docs](https://nuxt.com/docs)
2. Check [Module Documentation](https://modules.nuxtjs.org)
3. Search [Community Discussions](https://github.com/nuxt/framework/discussions)
4. Create issue with complete configuration details

Happy configuring! ⚙️
