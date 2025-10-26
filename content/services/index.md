---
title: Services Overview
description: Comprehensive API services for data management, authentication, and user experience
category: services
order: 4
---

# Services Overview

God Panel provides a comprehensive set of services for handling API communication, authentication, user management, and UI feedback. These services are built with TypeScript and follow modern patterns for maintainability and type safety.

## Service Architecture

The service layer is organized into several key areas:

### 🔗 API Services
- **API Client**: HTTP client with caching, retry logic, and error handling
- **Base Repository**: Generic data access patterns
- **Authentication Service**: User authentication and session management
- **User Service**: User profile and account management

### 📊 Business Services
- **Dashboard Service**: Dashboard data aggregation and statistics
- **Settings Service**: User preferences and configuration management

### 🔔 UI Services
- **Toast Service**: Notification system for user feedback
- **Logger Service**: Centralized logging and debugging

## API Client Service

The foundation HTTP client service with advanced features for reliable API communication.

### Features

- **Automatic Authentication**: Bearer token injection
- **Request/Response Interceptors**: Centralized request/response handling
- **Intelligent Caching**: GET request caching with TTL
- **Request Deduplication**: Prevents duplicate simultaneous requests
- **Retry Logic**: Exponential backoff for failed requests
- **Error Handling**: Standardized error types and messages
- **Development Logging**: Request/response logging in development mode

### Basic Usage

```typescript
import { apiClient } from '~/services'

// GET request with caching
const users = await apiClient.get('/api/users')

// POST request
const newUser = await apiClient.post('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// Custom configuration
const data = await apiClient.get('/api/data', {
  params: { page: 1, limit: 10 },
  timeout: 5000
})
```

### Advanced Features

```typescript
// Disable caching for specific request
const freshData = await apiClient.get('/api/data', {
  params: { noCache: true }
})

// Custom headers
const response = await apiClient.get('/api/secure-data', {
  headers: {
    'X-API-Key': 'your-api-key'
  }
})

// Handle errors
try {
  await apiClient.post('/api/users', userData)
} catch (error) {
  if (error.type === 'VALIDATION') {
    // Handle validation errors
    console.log('Validation failed:', error.data)
  } else if (error.type === 'UNAUTHORIZED') {
    // Redirect to login
    await navigateTo('/auth/login')
  }
}
```

### Configuration

The API client is configured through the application config:

```typescript
// ~/config/index.ts
export const apiConfig = {
  baseURL: process.env.API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  enableLogging: process.dev,
  enableRetry: true,
  enableCache: true
}
```

## Authentication Service

Manages user authentication, session handling, and security tokens.

### Features

- **Token Management**: Secure storage and retrieval of auth tokens
- **Session Validation**: Automatic token validation and refresh
- **Login/Logout**: Complete authentication flow
- **Permission Checking**: Role-based access control
- **Token Refresh**: Automatic token renewal before expiration

### Usage

```typescript
import { authService } from '~/services'

// Login user
const loginResult = await authService.login({
  email: 'user@example.com',
  password: 'password123'
})

// Check authentication status
const isAuthenticated = authService.isAuthenticated()
const currentUser = authService.getCurrentUser()

// Logout user
await authService.logout()

// Check permissions
const canEdit = authService.hasPermission('edit_posts')
const isAdmin = authService.hasRole('admin')
```

### Session Management

```typescript
// Automatic token refresh
authService.setupTokenRefresh()

// Manual token validation
const isValid = await authService.validateToken()

// Get user roles and permissions
const user = authService.getCurrentUser()
const roles = user?.roles || []
const permissions = user?.permissions || []
```

## User Service

Handles user profile management, account settings, and user-related operations.

### Features

- **Profile Management**: Update user information
- **Avatar Upload**: Profile picture management
- **Password Management**: Secure password updates
- **Account Settings**: User preferences and configuration
- **User Search**: Find and filter users

### Usage

```typescript
import { userService } from '~/services'

// Get user profile
const profile = await userService.getProfile(userId)

// Update profile
const updatedProfile = await userService.updateProfile({
  name: 'New Name',
  bio: 'Updated bio'
})

// Upload avatar
const avatarUrl = await userService.uploadAvatar(file)

// Change password
await userService.changePassword({
  currentPassword: 'oldpass',
  newPassword: 'newpass123'
})

// Search users
const users = await userService.searchUsers({
  query: 'john',
  role: 'admin',
  page: 1,
  limit: 20
})
```

## Dashboard Service

Aggregates and processes dashboard data from multiple sources.

### Features

- **Statistics Aggregation**: Real-time dashboard metrics
- **Chart Data**: Formatted data for visualization components
- **Performance Metrics**: System performance indicators
- **Data Caching**: Intelligent caching for dashboard data
- **Real-time Updates**: Live data streaming support

### Usage

```typescript
import { dashboardService } from '~/services'

// Get dashboard overview
const overview = await dashboardService.getOverview()

// Get chart data
const chartData = await dashboardService.getChartData({
  type: 'revenue',
  period: '30d',
  groupBy: 'day'
})

// Get performance metrics
const metrics = await dashboardService.getPerformanceMetrics()

// Get user activity
const activity = await dashboardService.getUserActivity({
  startDate: '2024-01-01',
  endDate: '2024-01-31'
})
```

### Data Structures

```typescript
interface DashboardOverview {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  conversionRate: number
  topProducts: Product[]
  recentOrders: Order[]
}

interface ChartDataPoint {
  date: string
  value: number
  label?: string
  metadata?: Record<string, any>
}
```

## Settings Service

Manages user preferences, application settings, and configuration.

### Features

- **Theme Management**: Light/dark mode preferences
- **Language Settings**: Internationalization preferences
- **Notification Settings**: User notification preferences
- **Layout Preferences**: Dashboard layout customization
- **Privacy Settings**: Data sharing and privacy controls

### Usage

```typescript
import { settingsService } from '~/services'

// Get user settings
const settings = await settingsService.getSettings()

// Update theme preference
await settingsService.updateSettings({
  theme: 'dark',
  language: 'en',
  notifications: {
    email: true,
    push: false,
    marketing: false
  }
})

// Get theme configuration
const themeConfig = settingsService.getThemeConfig()
const availableThemes = settingsService.getAvailableThemes()

// Reset settings to defaults
await settingsService.resetSettings()
```

## Toast Service

Comprehensive notification system for user feedback.

### Features

- **Multiple Types**: Success, error, warning, info, loading
- **Position Control**: 9 different positions for toasts
- **Auto-dismiss**: Configurable auto-dismiss timing
- **Pause on Hover**: Hover interaction support
- **Action Buttons**: Interactive toast actions
- **Queue Management**: Toast deduplication and limits

### Usage

```typescript
import { toastService } from '~/services'

// Simple notifications
toastService.success('Data saved successfully!')
toastService.error('Failed to save data')
toastService.warning('Please check your input')
toastService.info('New update available')

// Advanced notifications
const toastId = toastService.show({
  type: 'loading',
  title: 'Processing...',
  message: 'Please wait while we process your request',
  duration: 0, // Don't auto-dismiss
  position: 'top-center'
})

// Update loading toast
toastService.update(toastId, {
  type: 'success',
  title: 'Success!',
  message: 'Data processed successfully',
  duration: 3000
})

// Toast with actions
toastService.warning('Unsaved changes', {
  duration: 10000,
  actions: [
    { label: 'Save', action: 'save' },
    { label: 'Discard', action: 'discard' }
  ]
})

// Programmatic control
toastService.dismiss(toastId)
toastService.dismissAll()
toastService.dismissByType('error')
```

### Toast Types and Icons

| Type | Icon | Color | Use Case |
|------|------|-------|----------|
| success | `mdi-check-circle` | Green | Successful operations |
| error | `mdi-alert-circle` | Red | Errors and failures |
| warning | `mdi-alert` | Orange | Warnings and cautions |
| info | `mdi-information` | Blue | Information and updates |
| loading | `mdi-loading` | Primary | Loading states |

## Logger Service

Centralized logging service for debugging and monitoring.

### Features

- **Multiple Levels**: Debug, info, warn, error levels
- **Contextual Logging**: Add context data to log entries
- **Performance Monitoring**: Track execution times
- **Error Tracking**: Enhanced error logging with stack traces
- **Development Tools**: Rich console output in development

### Usage

```typescript
import { loggerService } from '~/services'

// Basic logging
loggerService.info('User logged in')
loggerService.warn('API rate limit approaching')
loggerService.error('Failed to fetch data', error)

// Contextual logging
loggerService.info('User action performed', {
  userId: '123',
  action: 'create_post',
  metadata: { postId: '456' }
})

// Performance monitoring
const startTime = performance.now()
await someOperation()
loggerService.debug('Operation completed', {
  duration: performance.now() - startTime,
  operation: 'someOperation'
})

// Error logging with context
try {
  await riskyOperation()
} catch (error) {
  loggerService.error('Operation failed', error, {
    userId: currentUser.id,
    operation: 'riskyOperation',
    timestamp: new Date()
  })
}
```

### Log Levels

```typescript
// Configure log levels
loggerService.setLevel('debug') // Show all logs
loggerService.setLevel('warn')  // Show only warnings and errors
loggerService.setLevel('error') // Show only errors

// Check current level
const currentLevel = loggerService.getLevel()
```

## Service Integration

### Using Services Together

```typescript
// Example: User registration with comprehensive feedback
const handleRegistration = async (userData) => {
  try {
    // Show loading toast
    const loadingToast = toastService.loading('Creating account...')

    // Attempt registration
    const newUser = await userService.create(userData)

    // Update toast to success
    toastService.update(loadingToast, {
      type: 'success',
      title: 'Welcome!',
      message: `Account created for ${newUser.email}`,
      duration: 5000
    })

    // Log successful registration
    loggerService.info('User registered successfully', {
      userId: newUser.id,
      email: newUser.email
    })

    // Redirect to dashboard
    await navigateTo('/dashboard')

  } catch (error) {
    // Show error toast
    toastService.error('Registration failed', {
      message: error.message,
      duration: 8000,
      actions: [
        { label: 'Retry', action: 'retry' }
      ]
    })

    // Log error with context
    loggerService.error('User registration failed', error, {
      email: userData.email,
      timestamp: new Date()
    })
  }
}
```

### Service Configuration

```typescript
// Configure services globally
export const configureServices = () => {
  // Configure API client
  apiClient.defaults.baseURL = process.env.API_URL

  // Configure toast defaults
  toastService.setDefaults({
    duration: 4000,
    position: 'bottom-right',
    pauseOnHover: true
  })

  // Configure logger
  loggerService.setLevel(process.dev ? 'debug' : 'warn')

  // Set up error handling
  apiClient.interceptors.response.use(
    response => response,
    error => {
      loggerService.error('API request failed', error)
      return Promise.reject(error)
    }
  )
}
```

## Best Practices

### Error Handling

1. **Always handle API errors** at the service level
2. **Provide user-friendly error messages** in UI components
3. **Log technical details** for debugging
4. **Implement retry logic** for transient failures

### Performance

1. **Use caching** for frequently accessed data
2. **Implement request deduplication** to prevent duplicate calls
3. **Set appropriate timeouts** for different operations
4. **Monitor service performance** with logging

### Security

1. **Validate tokens** before making authenticated requests
2. **Handle token expiration** gracefully
3. **Secure token storage** using httpOnly cookies when possible
4. **Implement proper logout** on security events

### User Experience

1. **Provide immediate feedback** for all user actions
2. **Use appropriate toast types** for different scenarios
3. **Handle loading states** consistently
4. **Allow users to dismiss** non-critical notifications

## Testing Services

```typescript
// Example service test
describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = new AuthService()
  })

  it('should authenticate user with valid credentials', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    }

    const result = await authService.login(credentials)

    expect(result.success).toBe(true)
    expect(result.user).toBeDefined()
    expect(result.token).toBeDefined()
  })

  it('should reject invalid credentials', async () => {
    const credentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    }

    await expect(authService.login(credentials))
      .rejects.toThrow('Invalid credentials')
  })
})
```

## Troubleshooting

### Common Issues

**API requests failing:**
- Check API base URL configuration
- Verify authentication tokens are valid
- Check network connectivity and CORS settings
- Review error logs for specific error types

**Toast notifications not showing:**
- Ensure ToastContainer is mounted in your app
- Check that toast service is properly initialized
- Verify toast options are valid

**Authentication issues:**
- Check token expiration and refresh logic
- Verify token storage mechanism
- Review authentication flow implementation

**Performance problems:**
- Monitor request caching effectiveness
- Check for request deduplication
- Review retry logic configuration
- Implement proper error boundaries

## Next Steps

- **[API Client Documentation](./api-client)** - Detailed HTTP client features
- **[Authentication Service](./auth)** - Complete authentication system
- **[User Service](./user)** - User management features
- **[Dashboard Service](./dashboard)** - Dashboard data aggregation
- **[Toast Service](./toast)** - Notification system details
- **[Logger Service](./logger)** - Logging and debugging tools
