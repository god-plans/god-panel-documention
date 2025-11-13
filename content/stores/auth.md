---
title: Authentication Store
description: User authentication and session management
category: stores
order: 1
---

# Authentication Store

The Authentication Store manages user authentication, session state, and user profile data using Pinia. It provides a comprehensive authentication system with support for real API authentication and demo login for development.

## Overview

The auth store (`stores/auth.ts`) handles all authentication-related operations including login, registration, logout, and profile management. It integrates seamlessly with the API client service and provides reactive state management.

## Basic Usage

```typescript
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()

// Reactive state
const {
  user,
  loading,
  isAuthenticated,
  isAdmin,
  displayName,
  userEmail
} = storeToRefs(authStore)
```

## State Properties

### Reactive State

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | Current authenticated user object |
| `loading` | `boolean` | Loading state for authentication operations |

### Computed Getters

| Property | Type | Description |
|----------|------|-------------|
| `isAuthenticated` | `boolean` | Whether a user is currently logged in |
| `isAdmin` | `boolean` | Whether the current user has admin role |
| `isManager` | `boolean` | Whether the current user has manager role |
| `userRole` | `string` | Current user's role ('admin', 'manager', 'user') |
| `displayName` | `string` | User's display name |
| `userEmail` | `string` | User's email address |

## Actions

### `login(credentials: { email: string; password: string })`

Authenticates a user with email and password credentials.

```typescript
// Login with real credentials
const result = await authStore.login({
  email: 'user@example.com',
  password: 'password123'
})

if (result.success) {
  // Login successful - user is now authenticated
  console.log('Welcome back!', authStore.displayName)
} else {
  // Login failed
  console.error('Login failed:', result.error)
  toastService.error(result.error)
}
```

**Demo Login**: For development, you can use the demo account:
```typescript
await authStore.login({
  email: 'godpanel@test.com',
  password: 'god123'
})
```

### `register(userData: RegistrationData)`

Creates a new user account.

```typescript
const result = await authStore.register({
  email: 'newuser@example.com',
  password: 'securepassword',
  firstName: 'John',
  lastName: 'Doe'
})

if (result.success) {
  // Registration successful - user is now logged in
  router.push('/dashboard')
} else {
  // Registration failed
  toastService.error(result.error)
}
```

### `logout()`

Logs out the current user and clears session data.

```typescript
await authStore.logout()
// User is now logged out, localStorage cleared
router.push('/auth/login')
```

### `updateProfile(updates: Partial<User>)`

Updates the current user's profile information.

```typescript
const result = await authStore.updateProfile({
  displayName: 'John Smith',
  phoneNumber: '+1234567890'
})

if (result.success) {
  // Profile updated successfully
  toastService.success('Profile updated!')
} else {
  // Update failed
  toastService.error(result.error)
}
```

### `initialize()`

Initializes the authentication state by checking for existing tokens and validating them with the API.

```typescript
// Usually called automatically, but can be triggered manually
await authStore.initialize()
```

## User Data Structure

```typescript
interface User {
  id: string
  displayName: string
  email: string
  photoURL?: string
  phoneNumber?: string
  role: 'admin' | 'manager' | 'user'
  createdAt: string
  updatedAt: string
  accessToken: string
}
```

## Route Protection

Use the auth store with Nuxt middleware to protect routes:

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && !authStore.loading) {
    return navigateTo('/auth/login')
  }
})

// pages/dashboard/index.vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

## Reactive Authentication State

```vue
<template>
  <div>
    <!-- Show loading spinner while checking authentication -->
    <div v-if="loading" class="loading-spinner">
      Checking authentication...
    </div>

    <!-- Show login form for unauthenticated users -->
    <LoginForm v-else-if="!isAuthenticated" />

    <!-- Show dashboard for authenticated users -->
    <Dashboard v-else>
      <h1>Welcome back, {{ displayName }}!</h1>

      <!-- Admin-only content -->
      <AdminPanel v-if="isAdmin" />
    </Dashboard>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const { loading, isAuthenticated, isAdmin, displayName } = storeToRefs(authStore)
</script>
```

## Development Features

### Auto Demo Login

In development mode, the store automatically logs in with a demo user for easier development:

```typescript
// In development, this happens automatically:
// - Email: demo@example.com
// - Display Name: Demo User
// - Role: admin
// - All permissions enabled
```

### Token Management

The store automatically:
- Stores access tokens in localStorage
- Includes tokens in API requests via the axios plugin
- Validates tokens on app initialization
- Handles token expiration and refresh

## Error Handling

All authentication actions return consistent result objects:

```typescript
interface AuthResult {
  success: boolean
  error?: string
}

// Example usage
const result = await authStore.login(credentials)

if (!result.success) {
  // Handle error
  switch (result.error) {
    case 'Invalid credentials':
      toastService.error('Please check your email and password')
      break
    case 'Account locked':
      toastService.error('Your account has been locked')
      break
    default:
      toastService.error('Login failed. Please try again.')
  }
}
```

## Integration with API Client

The auth store integrates with the API client service:

```typescript
// The API client automatically includes auth tokens
import { apiClient } from '~/services/api-client'

// This request includes the auth token automatically
const userData = await apiClient.get('/api/user/profile')
```

## Security Considerations

- Tokens are stored in localStorage (not secure for sensitive applications)
- Consider implementing token refresh logic for production
- Use HTTPS in production to protect token transmission
- Implement proper session timeout handling

## Testing Authentication

```typescript
// Test authenticated state
const authStore = useAuthStore()

// Test login
await authStore.login({ email: 'test@example.com', password: 'test' })
expect(authStore.isAuthenticated).toBe(true)

// Test logout
await authStore.logout()
expect(authStore.isAuthenticated).toBe(false)
```

## Next Steps

- **[API Client Documentation](/content/services/api-client)** - Learn about the API integration
- **[Authentication Guide](/content/guides/authentication)** - Complete authentication setup guide
- **[Settings Store](/content/stores/settings)** - Manage user preferences
- **[Route Protection](/content/guides/authentication#route-protection)** - Secure your application routes
