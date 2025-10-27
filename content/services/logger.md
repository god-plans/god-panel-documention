---
title: Logger Service
description: Centralized logging system for debugging, monitoring, and error tracking
category: services
order: 4
---

# Logger Service

The Logger Service provides a comprehensive logging system for debugging, monitoring, error tracking, and user behavior analysis. It features multiple log levels, contextual logging, performance monitoring, and remote logging capabilities.

## Features

### 📊 **Log Levels**
- **DEBUG**: Detailed information for development
- **INFO**: General information about application flow
- **WARN**: Warning messages for potential issues
- **ERROR**: Error messages for failures and exceptions
- **FATAL**: Critical errors that require immediate attention

### 🔍 **Contextual Logging**
- Rich context data with each log entry
- User identification and session tracking
- URL and user agent information
- Custom metadata support

### ⚡ **Performance Monitoring**
- Execution time tracking with timers
- User action logging
- Performance metrics collection
- Memory usage monitoring

### 🌐 **Remote Logging**
- Configurable remote logging endpoints
- Environment-based filtering
- Secure API key authentication
- Error reporting to external services

### 💾 **Log Management**
- In-memory log storage with configurable limits
- Log export in JSON and CSV formats
- Log filtering and searching
- Automatic cleanup and rotation

## Quick Start

```typescript
import { logger } from '~/services/logger'

// Initialize logger
logger.init()

// Basic logging
logger.info('Application started')
logger.warn('API rate limit approaching')
logger.error('Failed to fetch data', { userId: '123' })

// Performance monitoring
const timer = logger.time('Data fetch operation')
// ... your code ...
timer() // Logs execution time
```

## Log Levels

### Understanding Log Levels

The logger uses a hierarchical system where each level includes all higher levels:

```typescript
enum LogLevel {
  DEBUG = 0,   // Most verbose
  INFO = 1,    // General information
  WARN = 2,    // Warnings
  ERROR = 3,   // Errors
  FATAL = 4    // Critical errors
}
```

### Setting Log Level

```typescript
import { LogLevel } from '~/services/logger'

// Show all logs (development)
logger.setLevel(LogLevel.DEBUG)

// Show only warnings and errors (production)
logger.setLevel(LogLevel.WARN)

// Show only errors (minimal logging)
logger.setLevel(LogLevel.ERROR)
```

### Environment-based Logging

```typescript
// Configure based on environment
const config = {
  development: LogLevel.DEBUG,
  staging: LogLevel.INFO,
  production: LogLevel.WARN
}

logger.setLevel(config[process.env.NODE_ENV])
```

## Basic Usage

### Debug Logging

```typescript
// Simple debug message
logger.debug('User clicked button')

// Debug with context
logger.debug('Navigation started', {
  from: '/dashboard',
  to: '/users',
  userId: '123'
})

// Debug with complex data
logger.debug('API request details', {
  endpoint: '/api/users',
  method: 'GET',
  params: { page: 1, limit: 10 },
  headers: { 'X-API-Key': '***' }
})
```

### Info Logging

```typescript
// Application events
logger.info('User logged in', { userId: '123' })
logger.info('Data saved successfully', { recordCount: 5 })
logger.info('Background sync completed')

// Feature usage
logger.info('Feature accessed', {
  feature: 'export-data',
  userId: '123',
  format: 'csv'
})
```

### Warning Logging

```typescript
// Performance warnings
logger.warn('Slow query detected', {
  query: 'SELECT * FROM users',
  duration: '2500ms',
  threshold: '1000ms'
})

// API warnings
logger.warn('Rate limit approaching', {
  current: 95,
  limit: 100,
  resetTime: '2024-01-01T00:00:00Z'
})

// Validation warnings
logger.warn('Invalid input detected', {
  field: 'email',
  value: 'invalid-email',
  userId: '123'
})
```

### Error Logging

```typescript
// API errors
logger.error('Failed to fetch users', {
  endpoint: '/api/users',
  status: 500,
  userId: '123'
})

// JavaScript errors
try {
  riskyOperation()
} catch (error) {
  logger.error('Operation failed', {
    operation: 'riskyOperation',
    userId: '123',
    stack: error.stack
  })
}

// Network errors
logger.error('Network request failed', {
  url: '/api/data',
  method: 'POST',
  status: 0,
  userAgent: navigator.userAgent
})
```

### Fatal Logging

```typescript
// Critical system errors
logger.fatal('Database connection lost', {
  database: 'primary',
  uptime: '24h 30m',
  activeUsers: 1500
})

// Application crashes
logger.fatal('Unexpected application error', {
  error: error.message,
  stack: error.stack,
  url: window.location.href,
  userAgent: navigator.userAgent
})
```

## Contextual Logging

### Rich Context Data

```typescript
// User context
logger.info('Profile updated', {
  userId: '123',
  changes: ['name', 'email', 'avatar'],
  previousValues: { name: 'John', email: 'old@example.com' },
  newValues: { name: 'Jane', email: 'new@example.com' }
})

// Performance context
logger.warn('Slow operation', {
  operation: 'dataExport',
  duration: '4500ms',
  recordCount: 10000,
  userId: '123',
  timestamp: new Date()
})

// Error context
logger.error('Validation failed', {
  form: 'userRegistration',
  fields: ['email', 'password'],
  errors: {
    email: 'Invalid format',
    password: 'Too short'
  },
  userAgent: navigator.userAgent
})
```

### Automatic Context

The logger automatically includes context information:

```typescript
// Automatically added to all logs
{
  timestamp: new Date(),
  userId: '123',        // From localStorage
  sessionId: 'session_123', // Generated session ID
  url: 'https://app.com/dashboard',
  userAgent: 'Mozilla/5.0...'
}
```

## Performance Monitoring

### Execution Timers

```typescript
// Manual timing
const startTime = performance.now()

try {
  await complexOperation()
  const duration = performance.now() - startTime
  logger.info('Operation completed', { duration: `${duration.toFixed(2)}ms` })
} catch (error) {
  const duration = performance.now() - startTime
  logger.error('Operation failed', { duration: `${duration.toFixed(2)}ms`, error })
}

// Using built-in timer
const timer = logger.time('Database query')
await fetchDataFromDatabase()
timer() // Automatically logs duration
```

### User Action Tracking

```typescript
// Track user interactions
logger.logUserAction('button_click', {
  buttonId: 'save-button',
  page: '/dashboard',
  element: 'button[data-action="save"]'
})

logger.logUserAction('form_submit', {
  formId: 'user-profile-form',
  fields: ['name', 'email', 'bio'],
  duration: '1200ms'
})

logger.logUserAction('navigation', {
  from: '/dashboard',
  to: '/users',
  method: 'link' // or 'button', 'menu', etc.
})
```

### Performance Metrics

```typescript
// Track application performance
logger.info('Page load time', {
  page: '/dashboard',
  loadTime: '850ms',
  resources: 12,
  timestamp: new Date()
})

logger.warn('Memory usage high', {
  used: '120MB',
  limit: '256MB',
  percentage: 46.9
})

logger.error('API response time exceeded', {
  endpoint: '/api/users',
  responseTime: '3500ms',
  threshold: '1000ms'
})
```

## Remote Logging

### Configuration

```typescript
// Configure remote logging
logger.setRemoteLogging(
  true,                                    // Enable remote logging
  'https://logs.yourapp.com/api/logs',   // Remote endpoint
  'your-api-key'                         // API key for authentication
)

// Environment-based configuration
const config = {
  development: {
    enableRemote: false,
    level: LogLevel.DEBUG
  },
  staging: {
    enableRemote: true,
    level: LogLevel.INFO,
    url: 'https://staging-logs.yourapp.com/api/logs'
  },
  production: {
    enableRemote: true,
    level: LogLevel.WARN,
    url: 'https://logs.yourapp.com/api/logs'
  }
}

const envConfig = config[process.env.NODE_ENV]
logger.setRemoteLogging(envConfig.enableRemote, envConfig.url)
logger.setLevel(envConfig.level)
```

### Remote Log Filtering

```typescript
// Only send important logs to remote service
private shouldSendRemote(level: LogLevel): boolean {
  if (this.config.environment === 'production') {
    // Production: only warnings and above
    return level >= LogLevel.WARN
  }

  // Development/Staging: send all logs
  return true
}
```

### Error Reporting Integration

```typescript
// Integration with error reporting services
logger.error('Critical error occurred', {
  error: error.message,
  stack: error.stack,
  userId: getCurrentUser()?.id,
  url: window.location.href,
  userAgent: navigator.userAgent,
  timestamp: new Date(),
  environment: process.env.NODE_ENV
})

// This will be sent to remote logging service
// for monitoring and alerting
```

## Log Management

### Viewing Logs

```typescript
// Get all log entries
const allLogs = logger.getEntries()
console.log(`Total logs: ${allLogs.length}`)

// Get logs by level
const errorLogs = logger.getEntriesByLevel(LogLevel.ERROR)
const warningLogs = logger.getEntriesByLevel(LogLevel.WARN)

// Get recent logs
const recentLogs = logger.getRecentEntries(5) // Last 5 minutes

// Filter logs by context
const userLogs = logger.getEntries().filter(entry =>
  entry.userId === '123'
)
```

### Log Export

```typescript
// Export logs as JSON
const jsonLogs = logger.exportLogs('json')
const blob = new Blob([jsonLogs], { type: 'application/json' })
const url = URL.createObjectURL(blob)
const link = document.createElement('a')
link.href = url
link.download = `logs-${new Date().toISOString()}.json`
link.click()

// Export logs as CSV
const csvLogs = logger.exportLogs('csv')
const csvBlob = new Blob([csvLogs], { type: 'text/csv' })
const csvUrl = URL.createObjectURL(csvBlob)
const csvLink = document.createElement('a')
csvLink.href = csvUrl
csvLink.download = `logs-${new Date().toISOString()}.csv`
csvLink.click()
```

### Log Cleanup

```typescript
// Clear all logs
logger.clearEntries()

// Clear old logs (keep last 100)
const maxEntries = 100
if (logger.getEntries().length > maxEntries) {
  const entriesToKeep = logger.getEntries().slice(0, maxEntries)
  logger.clearEntries()
  // Re-add entries to keep
  entriesToKeep.forEach(entry => {
    logger.getEntries().push(entry)
  })
}
```

## Integration with Components

### Vue Composables

```vue
<template>
  <div>
    <button @click="performAction">Perform Action</button>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script setup>
import { useLogger } from '~/composables/useLogger'

const { logger } = useLogger()
const loading = ref(false)

const performAction = async () => {
  const timer = logger.time('User action')

  loading.value = true
  logger.info('Action started', { action: 'dataExport' })

  try {
    await exportUserData()
    logger.info('Action completed successfully')
    timer()
  } catch (error) {
    logger.error('Action failed', { error: error.message })
    timer()
  } finally {
    loading.value = false
  }
}
</script>
```

### Error Boundary Integration

```vue
<template>
  <ErrorBoundary @error="handleError">
    <ComponentThatMightFail />
  </ErrorBoundary>
</template>

<script setup>
import { useLogger } from '~/composables/useLogger'

const { logger } = useLogger()

const handleError = (error, instance, info) => {
  logger.error('Component error caught by boundary', {
    component: instance?.$?.type?.name || 'Unknown',
    error: error.message,
    stack: error.stack,
    info,
    url: window.location.href
  })
}
</script>
```

### API Integration

```typescript
// API request logging
const logApiRequest = (method: string, url: string, options: any) => {
  logger.debug('API request initiated', {
    method,
    url,
    params: options.params,
    data: options.data
  })
}

const logApiResponse = (method: string, url: string, response: any, duration: number) => {
  logger.info('API request completed', {
    method,
    url,
    status: response.status,
    duration: `${duration}ms`,
    dataSize: JSON.stringify(response.data).length
  })
}

const logApiError = (method: string, url: string, error: any, duration: number) => {
  logger.error('API request failed', {
    method,
    url,
    error: error.message,
    status: error.status,
    duration: `${duration}ms`
  })
}
```

## Configuration

### Logger Initialization

```typescript
// Initialize logger with custom configuration
logger.init()

// Or create with custom config
const customLogger = new LoggerService({
  level: LogLevel.INFO,
  enableConsole: true,
  enableRemote: false,
  maxEntries: 500,
  environment: 'production',
  appVersion: '1.0.0'
})
```

### Runtime Configuration

```typescript
// Update configuration at runtime
logger.setLevel(LogLevel.ERROR)        // Only show errors
logger.setConsoleLogging(false)        // Disable console output
logger.setRemoteLogging(true, url, key) // Enable remote logging

// Check current configuration
console.log('Current level:', LogLevel[logger.getLevel()])
console.log('Console enabled:', logger.isConsoleEnabled())
console.log('Remote enabled:', logger.isRemoteEnabled())
```

### Environment Configuration

```bash
# Development
ENABLE_LOGGING=true
LOG_LEVEL=debug
LOG_REMOTE=false

# Staging
ENABLE_LOGGING=true
LOG_LEVEL=info
LOG_REMOTE=true
LOG_REMOTE_URL=https://staging-logs.example.com/api/logs

# Production
ENABLE_LOGGING=true
LOG_LEVEL=warn
LOG_REMOTE=true
LOG_REMOTE_URL=https://logs.example.com/api/logs
LOG_API_KEY=your-production-key
```

## Advanced Features

### Custom Log Processors

```typescript
// Add custom log processing
const originalLog = logger.log
logger.log = function(level, message, context) {
  // Add custom processing
  const processedContext = {
    ...context,
    processedAt: new Date(),
    environment: process.env.NODE_ENV
  }

  // Add performance metrics
  if (level >= LogLevel.WARN) {
    processedContext.performance = {
      memory: performance.memory?.usedJSHeapSize,
      timestamp: performance.now()
    }
  }

  return originalLog.call(this, level, message, processedContext)
}
```

### Log Filtering

```typescript
// Filter logs by criteria
const getLogsByUser = (userId: string) => {
  return logger.getEntries().filter(entry =>
    entry.userId === userId || entry.context?.userId === userId
  )
}

const getLogsByType = (type: string) => {
  return logger.getEntries().filter(entry =>
    entry.context?.type === type
  )
}

const getErrorLogsWithStack = () => {
  return logger.getEntries().filter(entry =>
    entry.level >= LogLevel.ERROR && entry.stack
  )
}
```

### Log Analytics

```typescript
// Analyze log patterns
const analyzeLogs = () => {
  const entries = logger.getEntries()
  const lastHour = logger.getRecentEntries(60)

  const stats = {
    total: entries.length,
    lastHour: lastHour.length,
    errors: entries.filter(e => e.level >= LogLevel.ERROR).length,
    warnings: entries.filter(e => e.level === LogLevel.WARN).length,
    users: new Set(entries.map(e => e.userId).filter(Boolean)).size,
    sessions: new Set(entries.map(e => e.sessionId).filter(Boolean)).size
  }

  logger.info('Log analysis completed', stats)
  return stats
}
```

## Testing

### Unit Testing

```typescript
// tests/services/logger.test.ts
import { LoggerService, LogLevel } from '~/services/logger'

describe('LoggerService', () => {
  let logger: LoggerService

  beforeEach(() => {
    logger = new LoggerService({
      level: LogLevel.DEBUG,
      enableConsole: false, // Disable console for tests
      maxEntries: 100
    })
  })

  it('should log messages at correct levels', () => {
    logger.debug('Debug message')
    logger.info('Info message')
    logger.warn('Warning message')
    logger.error('Error message')

    const entries = logger.getEntries()
    expect(entries.length).toBe(4)
    expect(entries[0].level).toBe(LogLevel.ERROR)
    expect(entries[3].level).toBe(LogLevel.DEBUG)
  })

  it('should respect log levels', () => {
    logger.setLevel(LogLevel.WARN)

    logger.debug('Debug message') // Should not be logged
    logger.info('Info message')   // Should not be logged
    logger.warn('Warning message') // Should be logged

    const entries = logger.getEntries()
    expect(entries.length).toBe(1)
    expect(entries[0].level).toBe(LogLevel.WARN)
  })

  it('should include context data', () => {
    logger.info('Test message', { userId: '123', action: 'test' })

    const entries = logger.getEntries()
    expect(entries[0].context).toEqual({
      userId: '123',
      action: 'test'
    })
  })
})
```

### Mock Logger

```typescript
// tests/mocks/logger.ts
import { vi } from 'vitest'

export const mockLogger = {
  init: vi.fn(),
  setLevel: vi.fn(),
  setConsoleLogging: vi.fn(),
  setRemoteLogging: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  fatal: vi.fn(),
  time: vi.fn(() => vi.fn()),
  logUserAction: vi.fn(),
  getEntries: vi.fn(() => []),
  getEntriesByLevel: vi.fn(() => []),
  getRecentEntries: vi.fn(() => []),
  clearEntries: vi.fn(),
  exportLogs: vi.fn(() => '[]'),
}
```

## Integration Examples

### Global Error Handler

```typescript
// plugins/error-handler.client.ts
import { logger } from '~/services/logger'

export default defineNuxtPlugin(() => {
  // Global error handler
  const handleError = (error, instance, info) => {
    logger.error('Unhandled error occurred', {
      error: error.message,
      stack: error.stack,
      component: instance?.$?.type?.name,
      info,
      url: window.location.href,
      userAgent: navigator.userAgent
    })
  }

  return {
    provide: {
      errorHandler: {
        handleError
      }
    }
  }
})
```

### Performance Monitoring

```typescript
// composables/usePerformance.ts
import { logger } from '~/services/logger'

export const usePerformance = () => {
  const trackPageLoad = () => {
    if (process.client) {
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
        logger.info('Page load completed', {
          loadTime: `${loadTime}ms`,
          url: window.location.href,
          timestamp: new Date()
        })
      })
    }
  }

  const trackResourceTiming = () => {
    if (process.client && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 1000) { // Slow resources
            logger.warn('Slow resource detected', {
              name: entry.name,
              duration: `${entry.duration}ms`,
              type: entry.initiatorType
            })
          }
        })
      })

      observer.observe({ entryTypes: ['resource'] })
    }
  }

  return {
    trackPageLoad,
    trackResourceTiming
  }
}
```

### User Behavior Tracking

```typescript
// composables/useUserTracking.ts
import { logger } from '~/services/logger'

export const useUserTracking = () => {
  const trackPageView = (page: string) => {
    logger.logUserAction('page_view', {
      page,
      referrer: document.referrer,
      timestamp: new Date()
    })
  }

  const trackFeatureUsage = (feature: string, details?: any) => {
    logger.logUserAction('feature_usage', {
      feature,
      ...details
    })
  }

  const trackError = (error: string, context?: any) => {
    logger.error('User encountered error', {
      error,
      ...context,
      userId: getCurrentUser()?.id
    })
  }

  return {
    trackPageView,
    trackFeatureUsage,
    trackError
  }
}
```

## Best Practices

### Logging Strategy

1. **Use appropriate levels**: DEBUG for development, WARN/ERROR for production
2. **Include context**: Always provide relevant context data
3. **Be concise**: Keep log messages clear and actionable
4. **Structure data**: Use consistent context field names

### Performance

1. **Filter by level**: Only log what's necessary in production
2. **Batch operations**: Use timers for performance-critical code
3. **Limit context size**: Avoid logging large objects
4. **Clean up old logs**: Implement log rotation

### Security

1. **Sanitize sensitive data**: Remove passwords, tokens, PII
2. **Use secure transport**: HTTPS for remote logging
3. **Access control**: Protect log endpoints
4. **Audit logging**: Track who accesses logs

### Monitoring

1. **Set up alerts**: Monitor for critical errors
2. **Track performance**: Log slow operations
3. **User behavior**: Track feature usage patterns
4. **Error trends**: Monitor error rates and patterns

## Troubleshooting

### Common Issues

**Logs not appearing:**
- Check if logger is initialized
- Verify log level is set correctly
- Ensure console logging is enabled

**Remote logging failing:**
- Check network connectivity
- Verify API endpoint and key
- Check CORS configuration
- Review authentication

**Performance impact:**
- Reduce log level in production
- Limit context data size
- Implement log sampling
- Use async remote logging

**Memory usage:**
- Monitor log entry count
- Implement automatic cleanup
- Set reasonable max entries limit

### Debug Mode

```typescript
// Enable debug logging temporarily
logger.setLevel(LogLevel.DEBUG)
logger.setConsoleLogging(true)

// Log current state
console.log('Logger state:', {
  level: LogLevel[logger.getLevel()],
  entries: logger.getEntries().length,
  console: logger.isConsoleEnabled(),
  remote: logger.isRemoteEnabled()
})
```

## Integration with External Services

### Error Tracking Services

```typescript
// Integration with Sentry
import * as Sentry from '@sentry/browser'

logger.error('Application error', {
  error: error.message,
  stack: error.stack,
  userId: getCurrentUser()?.id,
  url: window.location.href
})

// Sentry automatically captures this
Sentry.captureException(error)
```

### Analytics Services

```typescript
// Integration with Google Analytics
const trackEvent = (event: string, parameters: any) => {
  logger.logUserAction('analytics_event', {
    event,
    parameters,
    userId: getCurrentUser()?.id
  })

  // Send to Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', event, parameters)
  }
}
```

## API Reference

### Core Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `init()` | - | `void` | Initialize logger |
| `setLevel(level)` | `level: LogLevel` | `void` | Set minimum log level |
| `setConsoleLogging(enabled)` | `enabled: boolean` | `void` | Enable/disable console output |
| `setRemoteLogging(enabled, url?, apiKey?)` | `enabled: boolean, url?: string, apiKey?: string` | `void` | Configure remote logging |
| `debug(message, context?)` | `message: string, context?: Record<string, any>` | `void` | Log debug message |
| `info(message, context?)` | `message: string, context?: Record<string, any>` | `void` | Log info message |
| `warn(message, context?)` | `message: string, context?: Record<string, any>` | `void` | Log warning message |
| `error(message, context?)` | `message: string \| Error, context?: Record<string, any>` | `void` | Log error message |
| `fatal(message, context?)` | `message: string \| Error, context?: Record<string, any>` | `void` | Log fatal error message |

### Management Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getEntries()` | - | `LogEntry[]` | Get all log entries |
| `getEntriesByLevel(level)` | `level: LogLevel` | `LogEntry[]` | Get logs by level |
| `getRecentEntries(minutes?)` | `minutes?: number` | `LogEntry[]` | Get recent logs |
| `clearEntries()` | - | `void` | Clear all logs |
| `exportLogs(format?)` | `format?: 'json' \| 'csv'` | `string` | Export logs |
| `time(label)` | `label: string` | `() => void` | Start performance timer |
| `logUserAction(action, details?)` | `action: string, details?: Record<string, any>` | `void` | Log user action |

### Log Entry Structure

```typescript
interface LogEntry {
  level: LogLevel
  message: string
  timestamp: Date
  context?: Record<string, any>
  userId?: string
  sessionId?: string
  url?: string
  userAgent?: string
  error?: Error
  stack?: string
}
```

### Log Levels

```typescript
enum LogLevel {
  DEBUG = 0,   // Development details
  INFO = 1,    // General information
  WARN = 2,    // Warnings and issues
  ERROR = 3,   // Errors and failures
  FATAL = 4    // Critical errors
}
```

## Configuration Options

```typescript
interface LoggerConfig {
  level: LogLevel              // Minimum log level
  enableConsole: boolean       // Enable console output
  enableRemote: boolean        // Enable remote logging
  maxEntries: number          // Maximum log entries to keep
  remoteUrl?: string          // Remote logging endpoint
  apiKey?: string            // API key for remote logging
  environment: string        // Environment name
  appVersion: string         // Application version
}
```

## Next Steps

- **[Toast Service Documentation](../services/toast)** - Notification system integration
- **[API Client Service Documentation](../services/api-client)** - HTTP client error handling
- **[Composables Documentation](../../composables)** - Vue composables for logging
- **[Error Boundary Components](../../components/common)** - Error handling components
