---
title: Deployment
description: Deploy God Panel to production
category: deployment
order: 4
---

# Deployment Guide

This guide covers deploying God Panel to various hosting platforms.

## Deployment Options

### 1. Vercel (Recommended)

**Automatic Deployments:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Manual Setup:**
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.output`
   - Install Command: `npm install`
3. Add environment variables in Vercel dashboard

### 2. Netlify

**Setup:**
```bash
# Build settings
npm run generate

# netlify.toml
[build]
  publish = "dist"
  command = "npm run generate"

[[redirects]]
  from = "/api/*"
  to = "https://api.your-domain.com/:splat"
  status = 200
```

### 3. Docker

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS builder
COPY . .
RUN npm run build

FROM base AS runner
COPY --from=builder /app/.output ./
EXPOSE 3000
CMD ["node", "server/index.mjs"]
```

**docker-compose.yml:**
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
    restart: unless-stopped
```

### 4. Traditional Hosting

**Build Process:**
```bash
# Build for production
npm run build

# The .output directory contains your built application
# Upload the contents to your web server
```

## Environment Configuration

### Production Environment Variables

```env
# Production settings
NODE_ENV=production
APP_URL=https://your-domain.com

# Database
DATABASE_URL="your-production-database-url"

# Authentication
JWT_SECRET="your-production-jwt-secret"

# API
API_BASE_URL="https://api.your-domain.com"
API_KEY="your-production-api-key"

# Email
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-email-password

# Security
CORS_ORIGIN="https://your-domain.com"
```

## Performance Optimization

### Build Optimization

```typescript
// nuxt.config.ts - Production
export default defineNuxtConfig({
  // Enable SSR
  ssr: true,

  // Build optimization
  nitro: {
    compressPublicAssets: true,
    minify: true,
    experimental: {
      wasm: true
    }
  },

  // Image optimization
  image: {
    format: ['webp', 'avif'],
    quality: 80
  }
})
```

### Caching Strategy

```typescript
// server/api/cache.get.ts
export default defineCachedEventHandler(async (event) => {
  return {
    timestamp: Date.now()
  }
}, {
  maxAge: 60 * 60 * 24, // 24 hours
  varies: ['authorization']
})
```

## Monitoring & Analytics

### Application Monitoring

```typescript
// composables/useMonitoring.ts
export const useMonitoring = () => {
  const logError = async (error: Error, context?: any) => {
    // Send to monitoring service
    await $fetch('/api/monitoring/error', {
      method: 'POST',
      body: {
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString()
      }
    })
  }

  const logPerformance = async (metric: string, value: number) => {
    await $fetch('/api/monitoring/performance', {
      method: 'POST',
      body: { metric, value, timestamp: new Date().toISOString() }
    })
  }

  return { logError, logPerformance }
}
```

### Health Check Endpoint

```typescript
// server/api/health.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Check database connection
  const dbStatus = await checkDatabaseConnection()

  // Check external API
  const apiStatus = await checkApiConnection()

  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: config.public.appVersion || '1.0.0',
    services: {
      database: dbStatus,
      api: apiStatus
    }
  }
})
```

## Security Considerations

### HTTPS Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Force HTTPS
  routeRules: {
    '/**': { headers: { 'X-Frame-Options': 'DENY' } },
    '/api/**': { cors: true }
  },

  // Security headers
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block'
  }
})
```

### Environment Security

```bash
# Production .env
# Use strong, unique secrets
JWT_SECRET="your-super-secure-jwt-secret-here"
API_KEY="your-secure-api-key"

# Database credentials
DATABASE_URL="postgresql://user:strong_password@host:5432/database"

# Never commit secrets to version control
echo ".env" >> .gitignore
```

## Backup Strategy

### Database Backups

```bash
# Automated backup script
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"

# Create backup
pg_dump $DATABASE_URL > $BACKUP_DIR/backup_$DATE.sql

# Upload to cloud storage
aws s3 cp $BACKUP_DIR/backup_$DATE.sql s3://your-backup-bucket/
```

### Application Backups

```typescript
// server/api/backup.post.ts
export default defineEventHandler(async (event) => {
  // Verify admin access
  const user = await requireAuth(event)

  if (!user.isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }

  // Create application backup
  const backup = await createBackup()

  return {
    success: true,
    backupId: backup.id,
    timestamp: backup.timestamp
  }
})
```

## Rollback Strategy

### Version Management

```json
// package.json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=9.0.0"
  }
}
```

### Rollback Commands

```bash
# Using Git
git log --oneline -10
git checkout <previous-commit-hash>

# Using Docker
docker tag god-panel:current god-panel:backup
docker tag god-panel:v1.0.0 god-panel:current

# Using deployment platform
vercel rollback
```

## Troubleshooting Production Issues

### Common Issues

**High Memory Usage:**
```bash
# Monitor memory usage
pm2 monit

# Restart with memory limit
pm2 start npm -- run start --max-memory-restart 1G
```

**Slow Response Times:**
```typescript
// Add performance monitoring
const startTime = Date.now()

// Your API logic here

const duration = Date.now() - startTime
console.log(`API call took ${duration}ms`)
```

**Database Connection Issues:**
```typescript
// Connection retry logic
export const connectWithRetry = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await connectToDatabase()
      return true
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error)
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
  }
  return false
}
```

## Scaling Considerations

### Horizontal Scaling

```yaml
# Docker Compose for scaling
version: '3.8'
services:
  god-panel:
    image: your-app:latest
    deploy:
      replicas: 3
    environment:
      - NODE_ENV=production
```

### Load Balancing

```typescript
// nuxt.config.ts - Load balancing ready
export default defineNuxtConfig({
  // Ensure stateless application
  experimental: {
    payloadExtraction: false
  },

  // Session management
  session: {
    storage: 'redis' // Use external session storage
  }
})
```

## Support & Maintenance

### Log Management

```typescript
// composables/useLogger.ts
export const useLogger = () => {
  const log = (level: 'info' | 'warn' | 'error', message: string, data?: any) => {
    const logEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    }

    // Send to logging service
    console.log(JSON.stringify(logEntry))
  }

  return {
    info: (message: string, data?: any) => log('info', message, data),
    warn: (message: string, data?: any) => log('warn', message, data),
    error: (message: string, data?: any) => log('error', message, data)
  }
}
```

### Maintenance Mode

```typescript
// server/middleware/maintenance.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (config.maintenanceMode === 'true') {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Temporarily Unavailable',
      data: {
        message: 'Site is under maintenance',
        estimatedTime: config.maintenanceETA
      }
    })
  }
})
```

## Getting Help

### Production Support

1. **Check Logs**: Review application and server logs
2. **Health Checks**: Use `/api/health` endpoint
3. **Performance Monitoring**: Monitor resource usage
4. **Community**: Check GitHub issues and discussions
5. **Professional Support**: Contact the development team

### Emergency Contacts

- **Development Team**: dev@your-domain.com
- **System Administrator**: admin@your-domain.com
- **Status Page**: https://status.your-domain.com

---

Happy deploying! 🚀
