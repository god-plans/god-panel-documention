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

## Environment Variables

### Required Variables

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
```

### Optional Variables

```env
# Database (if using backend)
DATABASE_URL="your-database-connection-string"

# API Key (if using external services)
API_KEY="your-api-key"

# Email Configuration (if using email features)
MAIL_MAILER=smtp
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-email-password

# Logging
LOG_LEVEL=info

# Security
CORS_ORIGIN="http://localhost:3333"
```

## Module Configuration

### Color Mode Configuration

God Panel uses the `@nuxtjs/color-mode` module for dark/light theme switching:

```typescript
// nuxt.config.ts - Color mode configuration
colorMode: {
  preference: 'light',        // Default theme
  fallback: 'light',          // Fallback if preference fails
  hid: 'nuxt-color-mode-script',
  globalName: '__NUXT_COLOR_MODE__',
  componentName: 'ColorScheme',
  classPrefix: '',
  classSuffix: '',
  storageKey: 'nuxt-color-mode'
}
```

### Internationalization (i18n) Configuration

Multi-language support is configured with `@nuxtjs/i18n`:

```typescript
// nuxt.config.ts - i18n configuration
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
  strategy: 'no_prefix',      // No language prefix in URLs
  defaultLocale: 'en',
  detectBrowserLanguage: false,
  langDir: './locales/'       // Translation files location
}
```

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

God Panel includes comprehensive build optimizations:

```typescript
// nuxt.config.ts - Build configuration
build: {
  transpile: ['vuetify']  // Transpile Vuetify for compatibility
},

// SSR configuration
ssr: true,

// Nitro configuration for better performance
nitro: {
  compressPublicAssets: true,  // Compress static assets
  minify: true,                // Minify code
  experimental: {
    wasm: true                 // Enable WebAssembly support
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
          vendor: ['vue', 'vue-router'],    // Core Vue libraries
          ui: ['vuetify', '@mdi/js'],       // UI libraries
          utils: ['axios', 'zod', 'clsx']   // Utility libraries
        }
      }
    }
  }
},

// Experimental features
experimental: {
  payloadExtraction: false,  // Disable payload extraction
  viewTransition: true       // Enable view transitions
},

// TypeScript configuration
typescript: {
  strict: true,
  typeCheck: false  // Disable during development for better performance
}
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
        'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || 'http://localhost:3333',
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
