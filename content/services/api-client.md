---
title: API Client Service
description: Advanced HTTP client with caching, retry logic, and error handling
category: services
order: 1
---

# API Client Service

The API Client Service provides a robust, feature-rich HTTP client built on top of Axios with advanced capabilities including intelligent caching, automatic retry logic, request deduplication, and comprehensive error handling. It's designed to handle production-level API communication with reliability and performance in mind.

## Features

### 🔗 **Core HTTP Methods**
- Complete REST API support (GET, POST, PUT, PATCH, DELETE)
- Type-safe request/response handling
- Flexible configuration options

### 💾 **Intelligent Caching**
- Automatic caching for GET requests
- Configurable TTL (Time To Live)
- Cache size management
- Cache invalidation methods

### 🔄 **Retry Logic**
- Exponential backoff retry strategy
- Configurable retry attempts
- Smart retry status code detection
- Request deduplication to prevent duplicate calls

### 🔐 **Authentication**
- Automatic Bearer token injection
- Token refresh handling
- Unauthorized request handling
- Secure token storage

### 📊 **Development Tools**
- Request/response logging
- Performance monitoring
- Error tracking and reporting
- Debug mode support

## Quick Start

```typescript
import { apiClient } from '~/services'

// Simple GET request
const users = await apiClient.get('/api/users')

// POST request with data
const newUser = await apiClient.post('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// GET with query parameters
const filteredUsers = await apiClient.get('/api/users', {
  params: { role: 'admin', page: 1, limit: 10 }
})

// Custom request configuration
const data = await apiClient.request({
  method: 'GET',
  url: '/api/protected-data',
  headers: { 'X-API-Key': 'your-api-key' },
  timeout: 5000
})
```

## Basic Usage

### HTTP Methods

The API client provides convenient methods for all HTTP operations:

```typescript
// GET request
const getUsers = async () => {
  try {
    const response = await apiClient.get('/api/users')
    if (response.success) {
      console.log('Users:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

// POST request
const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/api/users', userData)
    if (response.success) {
      console.log('User created:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('Failed to create user:', error)
  }
}

// PUT request
const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/api/users/${userId}`, userData)
    return response.data
  } catch (error) {
    console.error('Failed to update user:', error)
  }
}

// DELETE request
const deleteUser = async (userId) => {
  try {
    await apiClient.delete(`/api/users/${userId}`)
    console.log('User deleted successfully')
  } catch (error) {
    console.error('Failed to delete user:', error)
  }
}
```

### Response Format

All API responses follow a standardized format:

```typescript
interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
}

// Example response
{
  success: true,
  data: {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com'
  },
  message: 'User created successfully'
}

// Error response
{
  success: false,
  data: null,
  message: 'Validation failed'
}
```

## Advanced Configuration

### Request Configuration

Customize requests with Axios-compatible options:

```typescript
// Custom headers
const response = await apiClient.get('/api/secure-data', {
  headers: {
    'X-API-Key': 'your-secret-key',
    'Authorization': 'Bearer your-token'
  }
})

// Custom timeout
const response = await apiClient.post('/api/slow-endpoint', data, {
  timeout: 30000 // 30 seconds
})

// Query parameters
const response = await apiClient.get('/api/search', {
  params: {
    query: 'dashboard',
    category: 'components',
    page: 1,
    limit: 20,
    sort: 'relevance'
  }
})

// Disable caching for specific request
const freshData = await apiClient.get('/api/live-data', {
  params: { noCache: true }
})
```

### Request Options

```typescript
interface AxiosRequestConfig {
  // URL and method
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  baseURL?: string

  // Request data
  data?: any
  params?: any

  // Headers
  headers?: Record<string, string>

  // Network
  timeout?: number
  withCredentials?: boolean

  // Response type
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer'

  // Custom options
  noCache?: boolean // Disable caching for this request
}
```

## Caching System

### Automatic Caching

GET requests are automatically cached with a default TTL of 5 minutes:

```typescript
// This request will be cached
const users = await apiClient.get('/api/users')

// Second request will use cached data
const usersAgain = await apiClient.get('/api/users') // From cache

// Disable caching for fresh data
const freshUsers = await apiClient.get('/api/users', {
  params: { noCache: true }
})
```

### Cache Management

```typescript
// Clear all cache
apiClient.clearCache()

// Clear specific cache key
apiClient.clearCacheKey('/api/users')

// Check cache status (for debugging)
const cachedData = apiClient.getCacheEntry('/api/users')
if (cachedData) {
  console.log('Data is cached:', cachedData)
}
```

### Cache Configuration

Cache behavior can be customized in the configuration:

```typescript
// ~/config/index.ts
export const cacheConfig = {
  ttl: 5 * 60 * 1000, // 5 minutes default TTL
  maxSize: 100, // Maximum number of cache entries
  enableCompression: false, // Compress cached data
}
```

## Retry Logic

### Automatic Retries

The API client automatically retries failed requests with exponential backoff:

```typescript
// Request will automatically retry on failure
const response = await apiClient.get('/api/unreliable-endpoint')

// Retry configuration is handled automatically:
// - Max retries: 3
// - Base delay: 1000ms
// - Multiplier: 2x (exponential backoff)
// - Retry status codes: 408, 429, 500, 502, 503, 504
```

### Retry Behavior

```typescript
// Retry only applies to GET requests (idempotent)
const getData = await apiClient.get('/api/data') // Will retry on failure

// POST, PUT, PATCH, DELETE requests don't retry (non-idempotent)
const createData = await apiClient.post('/api/data', payload) // No retry
```

### Custom Retry Logic

For advanced use cases, you can implement custom retry behavior:

```typescript
// Custom retry with exponential backoff
const customRetry = async (operation, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (attempt === maxRetries) throw error

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Usage
const result = await customRetry(() =>
  apiClient.get('/api/unreliable-endpoint')
)
```

## Error Handling

### Error Types

The API client provides structured error handling with specific error types:

```typescript
import { ERROR_TYPES } from '~/constants/api'

// Available error types
enum ErrorTypes {
  NETWORK = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED_ERROR',
  FORBIDDEN = 'FORBIDDEN_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  SERVER = 'SERVER_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR'
}
```

### Error Response Structure

```typescript
// All errors follow this structure
interface ApiError extends Error {
  type: string
  status?: number
  data?: any
}

// Example error handling
try {
  await apiClient.post('/api/users', userData)
} catch (error) {
  switch (error.type) {
    case ERROR_TYPES.NETWORK:
      console.log('Check internet connection')
      break
    case ERROR_TYPES.UNAUTHORIZED:
      console.log('Redirect to login')
      // Token automatically cleared and user redirected
      break
    case ERROR_TYPES.VALIDATION:
      console.log('Validation errors:', error.data)
      break
    case ERROR_TYPES.SERVER:
      console.log('Server error, try again later')
      break
    default:
      console.log('Unknown error:', error.message)
  }
}
```

### Error Handling in Components

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">
      <div class="error-message">
        <p>{{ error.message }}</p>
        <button @click="retry">Try Again</button>
      </div>
    </div>
    <div v-else>
      <!-- Display data -->
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '~/composables/useApi'

const { data, loading, error, execute } = useApi()

const fetchData = async () => {
  await execute(async () => {
    return await apiClient.get('/api/data')
  }, {
    onError: (errorMessage) => {
      console.error('API Error:', errorMessage)
      // Show user-friendly error message
    }
  })
}

const retry = () => {
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>
```

## Authentication Integration

### Automatic Token Management

The API client automatically handles authentication tokens:

```typescript
// Login and store token
const loginResponse = await apiClient.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
})

if (loginResponse.success) {
  // Token is automatically stored in localStorage
  localStorage.setItem('auth-token', loginResponse.data.token)
}

// All subsequent requests include the token
const protectedData = await apiClient.get('/api/protected-data')
// Authorization: Bearer <token> header added automatically
```

### Token Refresh

```typescript
// Manual token refresh
const refreshResponse = await apiClient.post('/auth/refresh', {
  refreshToken: localStorage.getItem('refresh-token')
})

// Update stored tokens
if (refreshResponse.success) {
  localStorage.setItem('auth-token', refreshResponse.data.token)
  localStorage.setItem('refresh-token', refreshResponse.data.refreshToken)
}
```

### Logout Handling

```typescript
// Clear tokens on logout
const logout = async () => {
  try {
    await apiClient.post('/auth/logout')
  } finally {
    // Clear local storage regardless of API response
    localStorage.removeItem('auth-token')
    localStorage.removeItem('refresh-token')

    // Redirect to login
    await navigateTo('/auth/login')
  }
}
```

## Development Tools

### Request/Response Logging

Enable detailed logging in development mode:

```bash
# Enable API logging
ENABLE_API_LOGGING=true
```

```typescript
// Logs appear in browser console
🚀 API Request: {
  method: 'GET',
  url: '/api/users',
  params: { page: 1, limit: 10 }
}

✅ API Response: {
  status: 200,
  url: '/api/users',
  data: { users: [...] }
}
```

### Performance Monitoring

```typescript
// Monitor request performance
const startTime = performance.now()

try {
  const response = await apiClient.get('/api/large-dataset')
  const duration = performance.now() - startTime

  console.log(`Request took ${duration}ms`)

  if (duration > 5000) {
    console.warn('Slow API request detected')
  }
} catch (error) {
  const duration = performance.now() - startTime
  console.error(`Request failed after ${duration}ms:`, error)
}
```

### Debug Mode

```typescript
// Enable debug mode for detailed error information
const debugResponse = await apiClient.get('/api/debug-endpoint', {
  params: { debug: true }
})
```

## Request Deduplication

Prevent duplicate simultaneous requests:

```typescript
// Multiple calls to the same endpoint
const [users1, users2, users3] = await Promise.all([
  apiClient.get('/api/users'),
  apiClient.get('/api/users'), // Uses cached promise
  apiClient.get('/api/users')  // Uses cached promise
])

// Only one actual HTTP request is made
// All three variables get the same response
```

## File Uploads

Handle file uploads with proper content type:

```typescript
// Single file upload
const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', 'avatar')

  return await apiClient.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Multiple files upload
const uploadFiles = async (files: File[]) => {
  const formData = new FormData()

  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file)
  })

  return await apiClient.post('/api/upload/multiple', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
```

## Batch Operations

Handle multiple API calls efficiently:

```typescript
// Batch user operations
const batchOperations = async () => {
  const operations = [
    apiClient.get('/api/users'),
    apiClient.get('/api/groups'),
    apiClient.get('/api/permissions')
  ]

  try {
    const [users, groups, permissions] = await Promise.all(operations)

    return {
      users: users.data,
      groups: groups.data,
      permissions: permissions.data
    }
  } catch (error) {
    console.error('Batch operation failed:', error)
    throw error
  }
}

// Sequential operations with error handling
const sequentialOperations = async () => {
  try {
    // Get user profile first
    const profile = await apiClient.get('/api/profile')

    // Then get user-specific data
    const userData = await apiClient.get(`/api/users/${profile.data.id}`)

    // Update profile
    const updated = await apiClient.put(`/api/profile`, {
      ...profile.data,
      lastActive: new Date()
    })

    return updated.data
  } catch (error) {
    console.error('Sequential operation failed:', error)
    throw error
  }
}
```

## Real-time Data

Handle real-time data updates:

```typescript
// Polling for updates
const pollForUpdates = async () => {
  const pollInterval = setInterval(async () => {
    try {
      const response = await apiClient.get('/api/live-data', {
        params: { noCache: true } // Always fetch fresh data
      })

      if (response.data.updated) {
        // Handle update
        updateLocalState(response.data)
      }
    } catch (error) {
      console.error('Polling error:', error)
    }
  }, 5000) // Poll every 5 seconds

  // Cleanup
  return () => clearInterval(pollInterval)
}

// WebSocket integration
const setupWebSocket = () => {
  const ws = new WebSocket('ws://localhost:4000')

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)

    // Invalidate related cache entries
    apiClient.clearCacheKey(`/api/${data.type}`)
  }

  return ws
}
```

## Configuration

### Environment Variables

```bash
# API Configuration
NUXT_PUBLIC_API_URL=http://localhost:4000
API_TIMEOUT=10000
ENABLE_API_LOGGING=true

# Authentication
JWT_SECRET=your-secret-key
REFRESH_TOKEN_EXPIRY=7d

# Feature Flags
ENABLE_MOCK_DATA=false
```

### Runtime Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      enableMockData: process.env.ENABLE_MOCK_DATA,
    },
    private: {
      jwtSecret: process.env.JWT_SECRET,
    }
  }
})
```

### Custom Configuration

```typescript
// Create custom API client instance
import { ApiClient } from '~/services/api-client'

const customClient = new ApiClient({
  baseURL: 'https://custom-api.com',
  timeout: 15000,
  enableLogging: true
})

// Use custom client
const data = await customClient.get('/api/custom-endpoint')
```

## Integration Examples

### With Vue Composables

```vue
<template>
  <div>
    <div v-if="loading">Loading users...</div>
    <div v-else-if="error" class="error">
      {{ error }}
      <button @click="refetch">Retry</button>
    </div>
    <div v-else>
      <div v-for="user in data" :key="user.id">
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '~/composables/useApi'

const {
  data,
  loading,
  error,
  execute,
  reset
} = useApi()

const fetchUsers = async () => {
  await execute(async () => {
    const response = await apiClient.get('/api/users')
    return response
  }, {
    onSuccess: (data) => {
      console.log('Users loaded:', data.length)
    },
    onError: (error) => {
      console.error('Failed to load users:', error)
    }
  })
}

const refetch = () => {
  reset()
  fetchUsers()
}

onMounted(() => {
  fetchUsers()
})
</script>
```

### With Pinia Stores

```typescript
// stores/users.ts
import { apiClient } from '~/services'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null

      try {
        const response = await apiClient.get('/api/users')
        if (response.success) {
          this.users = response.data
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createUser(userData) {
      try {
        const response = await apiClient.post('/api/users', userData)
        if (response.success) {
          this.users.push(response.data)
          return response.data
        }
      } catch (error) {
        throw new Error('Failed to create user')
      }
    }
  }
})
```

### With Form Handling

```vue
<template>
  <form @submit="handleSubmit">
    <input v-model="form.email" type="email" required />
    <input v-model="form.password" type="password" required />
    <button type="submit" :disabled="loading">
      {{ loading ? 'Creating...' : 'Create Account' }}
    </button>
  </form>
</template>

<script setup>
const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)

const handleSubmit = async (event) => {
  event.preventDefault()
  loading.value = true

  try {
    const response = await apiClient.post('/api/users', form)

    if (response.success) {
      // Success handling
      console.log('User created:', response.data)
      form.email = ''
      form.password = ''
    }
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}
</script>
```

## Testing

### Unit Testing API Client

```typescript
// tests/services/api-client.test.ts
import { apiClient } from '~/services/api-client'

describe('ApiClient', () => {
  beforeEach(() => {
    // Clear cache before each test
    apiClient.clearCache()
  })

  it('should make GET requests', async () => {
    const response = await apiClient.get('/api/test')
    expect(response.success).toBe(true)
    expect(response.data).toBeDefined()
  })

  it('should cache GET requests', async () => {
    // First request
    const response1 = await apiClient.get('/api/test')

    // Second request should use cache
    const response2 = await apiClient.get('/api/test')

    expect(response1).toEqual(response2)
  })

  it('should handle errors gracefully', async () => {
    await expect(
      apiClient.get('/api/nonexistent')
    ).rejects.toThrow()
  })
})
```

### Mock API Client

```typescript
// tests/mocks/api-client.ts
import { vi } from 'vitest'

export const mockApiClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  request: vi.fn(),
  clearCache: vi.fn(),
  clearCacheKey: vi.fn(),
}

// Mock implementation
mockApiClient.get.mockResolvedValue({
  success: true,
  data: { id: '1', name: 'Test' }
})
```

## Best Practices

### Request Management

1. **Use appropriate HTTP methods**: GET for fetching, POST for creating, etc.
2. **Include proper error handling**: Always handle potential failures
3. **Leverage caching**: Use caching for data that doesn't change frequently
4. **Implement request deduplication**: Prevent unnecessary duplicate requests

### Performance

1. **Batch related requests**: Use Promise.all for independent requests
2. **Use appropriate timeouts**: Set reasonable timeout values
3. **Monitor request performance**: Track slow requests in development
4. **Implement proper loading states**: Show feedback to users

### Security

1. **Validate responses**: Don't trust API responses blindly
2. **Handle token expiration**: Implement proper token refresh
3. **Use HTTPS in production**: Always use secure connections
4. **Sanitize error messages**: Don't expose internal error details

### Error Handling

1. **Use specific error types**: Handle different error scenarios appropriately
2. **Provide user feedback**: Show meaningful error messages
3. **Log errors appropriately**: Use proper logging levels
4. **Implement retry logic**: For transient failures

## Troubleshooting

### Common Issues

**Requests failing with 401 Unauthorized:**
- Check if authentication token is valid
- Verify token is being sent in requests
- Check if token has expired and needs refresh

**Slow request performance:**
- Check network connectivity
- Verify server response times
- Monitor for excessive caching or retry attempts

**Cache not working:**
- Ensure requests are GET methods
- Check if noCache parameter is set
- Verify cache configuration

**CORS errors:**
- Check server CORS configuration
- Verify request headers
- Ensure proper origin settings

### Debug Mode

Enable detailed logging for troubleshooting:

```typescript
// Temporarily enable logging
import { apiConfig } from '~/config'
apiConfig.enableLogging = true

// All requests will now be logged
const data = await apiClient.get('/api/debug-endpoint')
```

## Advanced Features

### Custom Interceptors

```typescript
// Add custom request interceptor
apiClient.getClient().interceptors.request.use(
  (config) => {
    // Add custom logic before request
    config.headers['X-Custom-Header'] = 'custom-value'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add custom response interceptor
apiClient.getClient().interceptors.response.use(
  (response) => {
    // Process response data
    return response
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error)
  }
)
```

### Request/Response Transformers

```typescript
// Transform request data
const client = apiClient.getClient()
client.defaults.transformRequest = [
  (data, headers) => {
    // Transform outgoing data
    if (data instanceof FormData) {
      // Handle FormData
      return data
    }

    // Add timestamp to requests
    return {
      ...data,
      timestamp: Date.now()
    }
  }
]

// Transform response data
client.defaults.transformResponse = [
  (data) => {
    // Transform incoming data
    try {
      const parsed = JSON.parse(data)
      return {
        ...parsed,
        receivedAt: new Date()
      }
    } catch {
      return data
    }
  }
]
```

## API Reference

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `get<T>(url, config?)` | `url: string, config?: AxiosRequestConfig` | `Promise<ApiResponse<T>>` | GET request |
| `post<T>(url, data?, config?)` | `url: string, data?: any, config?: AxiosRequestConfig` | `Promise<ApiResponse<T>>` | POST request |
| `put<T>(url, data?, config?)` | `url: string, data?: any, config?: AxiosRequestConfig` | `Promise<ApiResponse<T>>` | PUT request |
| `patch<T>(url, data?, config?)` | `url: string, data?: any, config?: AxiosRequestConfig` | `Promise<ApiResponse<T>>` | PATCH request |
| `delete<T>(url, config?)` | `url: string, config?: AxiosRequestConfig` | `Promise<ApiResponse<T>>` | DELETE request |
| `request<T>(config)` | `config: AxiosRequestConfig` | `Promise<ApiResponse<T>>` | Generic request |

### Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `baseURL` | string | From config | Base URL for all requests |
| `timeout` | number | 10000ms | Request timeout |
| `enableLogging` | boolean | false | Enable request logging |
| `retries` | number | 3 | Maximum retry attempts |
| `retryDelay` | number | 1000ms | Base retry delay |

### Error Types

| Type | Status Codes | Description |
|------|--------------|-------------|
| `NETWORK` | - | Network connectivity issues |
| `TIMEOUT` | 408 | Request timeout |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `SERVER` | 500, 502, 503 | Server errors |
| `VALIDATION` | 400, 422 | Invalid request data |
| `UNKNOWN` | - | Unspecified error |

## Next Steps

- **[Service Integration Guide](../services)** - How services work together
- **[Toast Service Documentation](../services/toast)** - Notification system integration
- **[Logger Service Documentation](../services/logger)** - Logging and error handling
- **[Composables Documentation](../../composables)** - Vue composables for API integration
