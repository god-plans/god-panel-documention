---
title: Authentication Guide
description: Implement user authentication and authorization in God Panel
category: guides
order: 2
---

# Authentication Guide

Implement comprehensive user authentication and authorization in your God Panel application.

## Overview

God Panel provides a flexible authentication system that supports multiple strategies and providers. This guide covers setup, configuration, and implementation.

## Authentication Strategies

### 1. Local Authentication

Basic email/password authentication with JWT tokens.

#### Setup

Install required modules:

```bash
npm install @nuxtjs/auth-next bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

#### Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/tailwindcss'
  ],

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30 // 30 days
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/dashboard'
    }
  }
})
```

#### API Implementation

**server/api/auth/login.post.ts:**
```typescript
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // Validate input
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  // Find user (replace with your database query)
  const user = await findUserByEmail(email)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  )

  // Update user's refresh token
  await updateUserRefreshToken(user.id, refreshToken)

  return {
    success: true,
    access_token: accessToken,
    refresh_token: refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }
})
```

**server/api/auth/user.get.ts:**
```typescript
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  // Get token from Authorization header
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any

    // Get user from database
    const user = await findUserById(decoded.userId)

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found'
      })
    }

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }
})
```

### 2. Social Authentication

#### Google OAuth

Install Google OAuth module:

```bash
npm install @nuxtjs/auth-next @nuxtjs/google-auth
```

**nuxt.config.ts:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/google-auth'
  ],

  googleAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },

  auth: {
    strategies: {
      google: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          token: 'https://oauth2.googleapis.com/token',
          userInfo: 'https://www.googleapis.com/oauth2/v2/userinfo'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 60 * 60 * 24 * 7
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user'
        }
      }
    }
  }
})
```

#### GitHub OAuth

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  auth: {
    strategies: {
      github: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://github.com/login/oauth/authorize',
          token: 'https://github.com/login/oauth/access_token',
          userInfo: 'https://api.github.com/user'
        },
        token: {
          property: 'access_token',
          type: 'Bearer'
        },
        user: {
          property: 'user'
        }
      }
    }
  }
})
```

### 3. Role-Based Access Control (RBAC)

#### Define Roles and Permissions

```typescript
// types/auth.ts
export interface Permission {
  resource: string
  action: 'create' | 'read' | 'update' | 'delete'
}

export interface Role {
  id: string
  name: string
  permissions: Permission[]
}

export const ROLES: Record<string, Role> = {
  admin: {
    id: 'admin',
    name: 'Administrator',
    permissions: [
      { resource: 'users', action: 'create' },
      { resource: 'users', action: 'read' },
      { resource: 'users', action: 'update' },
      { resource: 'users', action: 'delete' },
      { resource: 'settings', action: 'update' }
    ]
  },
  user: {
    id: 'user',
    name: 'User',
    permissions: [
      { resource: 'profile', action: 'read' },
      { resource: 'profile', action: 'update' }
    ]
  }
}
```

#### Permission Checking

```typescript
// composables/usePermissions.ts
export const usePermissions = () => {
  const { $auth } = useNuxtApp()

  const hasPermission = (resource: string, action: string): boolean => {
    if (!$auth.user) return false

    return $auth.user.permissions?.some(
      (permission: Permission) =>
        permission.resource === resource && permission.action === action
    ) || false
  }

  const hasRole = (role: string): boolean => {
    return $auth.user?.role === role
  }

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => hasRole(role))
  }

  const isAdmin = (): boolean => {
    return hasRole('admin')
  }

  return {
    hasPermission,
    hasRole,
    hasAnyRole,
    isAdmin
  }
}
```

#### Protected Routes

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { $auth } = useNuxtApp()

  if (!$auth.loggedIn) {
    return navigateTo('/login')
  }
})
```

```typescript
// middleware/admin.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { $auth } = useNuxtApp()
  const { hasRole } = usePermissions()

  if (!$auth.loggedIn) {
    return navigateTo('/login')
  }

  if (!hasRole('admin')) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }
})
```

### 4. Login Components

#### Login Page

```vue
<!-- pages/login.vue -->
<template>
  <div class="auth-container">
    <div class="auth-form">
      <h1>Login</h1>

      <!-- Local Login -->
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="credentials.email"
            type="email"
            required
            :disabled="loading"
          >
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            required
            :disabled="loading"
          >
        </div>

        <div class="form-options">
          <label class="checkbox">
            <input v-model="credentials.remember" type="checkbox">
            <span>Remember me</span>
          </label>
          <NuxtLink to="/forgot-password">Forgot password?</NuxtLink>
        </div>

        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>

      <!-- Social Login -->
      <div class="divider">
        <span>or</span>
      </div>

      <div class="social-buttons">
        <button @click="loginWithGoogle" class="btn-google">
          <Icon name="mdi-google" />
          Continue with Google
        </button>
        <button @click="loginWithGitHub" class="btn-github">
          <Icon name="mdi-github" />
          Continue with GitHub
        </button>
      </div>

      <p class="auth-footer">
        Don't have an account?
        <NuxtLink to="/register">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const credentials = ref({
  email: '',
  password: '',
  remember: false
})

const loading = ref(false)
const error = ref('')

const login = async () => {
  loading.value = true
  error.value = ''

  try {
    await $auth.loginWith('local', {
      data: credentials.value
    })

    await navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = () => {
  // Implement Google OAuth
}

const loginWithGitHub = () => {
  // Implement GitHub OAuth
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.auth-form {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
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
  border-radius: 6px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb;
}

.divider span {
  background: white;
  padding: 0 1rem;
  color: #6b7280;
}

.social-buttons {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.btn-google,
.btn-github {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-google:hover {
  border-color: #4285f4;
  background: #f8fbff;
}

.btn-github:hover {
  border-color: #24292e;
  background: #f6f8fa;
}

.auth-footer {
  text-align: center;
  color: #6b7280;
}

.auth-footer a {
  color: #3b82f6;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #fecaca;
  margin-top: 1rem;
}
</style>
```

#### Registration Page

```vue
<!-- pages/register.vue -->
<template>
  <div class="auth-container">
    <div class="auth-form">
      <h1>Create Account</h1>

      <form @submit.prevent="register" class="register-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              required
              :disabled="loading"
            >
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              :disabled="loading"
            >
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :disabled="loading"
          >
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            :disabled="loading"
            minlength="8"
          >
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            required
            :disabled="loading"
            minlength="8"
          >
        </div>

        <div class="form-options">
          <label class="checkbox">
            <input v-model="form.acceptTerms" type="checkbox" required>
            <span>I accept the <NuxtLink to="/terms">Terms of Service</NuxtLink> and <NuxtLink to="/privacy">Privacy Policy</NuxtLink></span>
          </label>
        </div>

        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>

      <p class="auth-footer">
        Already have an account?
        <NuxtLink to="/login">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const loading = ref(false)
const error = ref('')

const register = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  error.value = ''

  try {
    // Implement registration API call
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: `${form.value.firstName} ${form.value.lastName}`,
        email: form.value.email,
        password: form.value.password
      }
    })

    await navigateTo('/login?message=Registration successful')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.auth-form {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
  border-radius: 6px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-options {
  margin-bottom: 1.5rem;
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.checkbox input[type="checkbox"] {
  margin-top: 0.125rem;
}

.auth-footer {
  text-align: center;
  color: #6b7280;
  margin-top: 1.5rem;
}

.auth-footer a {
  color: #3b82f6;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #fecaca;
  margin-top: 1rem;
}
</style>
```

## Advanced Features

### Password Reset

#### Forgot Password Page

```vue
<!-- pages/forgot-password.vue -->
<template>
  <div class="auth-container">
    <div class="auth-form">
      <h1>Reset Password</h1>

      <div v-if="!resetSent">
        <p>Enter your email address and we'll send you a link to reset your password.</p>

        <form @submit.prevent="sendResetEmail">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              :disabled="loading"
            >
          </div>

          <button type="submit" :disabled="loading" class="btn-primary">
            {{ loading ? 'Sending...' : 'Send Reset Link' }}
          </button>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
      </div>

      <div v-else class="success-message">
        <Icon name="mdi-check-circle" />
        <h3>Check your email</h3>
        <p>We've sent a password reset link to {{ email }}</p>
        <NuxtLink to="/login" class="btn-secondary">
          Back to Login
        </NuxtLink>
      </div>

      <p class="auth-footer">
        <NuxtLink to="/login">Back to Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const email = ref('')
const loading = ref(false)
const error = ref('')
const resetSent = ref(false)

const sendResetEmail = async () => {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })

    resetSent.value = true
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to send reset email'
  } finally {
    loading.value = false
  }
}
</script>
```

#### Reset Password API

```typescript
// server/api/auth/forgot-password.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required'
    })
  }

  // Find user
  const user = await findUserByEmail(email)

  if (!user) {
    // Don't reveal if email exists or not
    return {
      success: true,
      message: 'If an account with that email exists, a reset link has been sent.'
    }
  }

  // Generate reset token
  const resetToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  // Save reset token to database
  await savePasswordResetToken(user.id, resetToken)

  // Send reset email
  await sendPasswordResetEmail(user.email, resetToken)

  return {
    success: true,
    message: 'If an account with that email exists, a reset link has been sent.'
  }
})
```

### Session Management

#### Persistent Sessions

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const { $auth } = useNuxtApp()

  const login = async (credentials: any) => {
    await $auth.loginWith('local', {
      data: credentials,
      rememberMe: credentials.remember
    })
  }

  const logout = async () => {
    await $auth.logout()
    await navigateTo('/login')
  }

  const refreshToken = async () => {
    try {
      await $auth.refreshTokens()
    } catch (error) {
      // Token refresh failed, redirect to login
      await logout()
    }
  }

  return {
    user: $auth.user,
    loggedIn: $auth.loggedIn,
    login,
    logout,
    refreshToken
  }
}
```

#### Session Validation

```typescript
// middleware/session.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $auth } = useNuxtApp()

  if (!$auth.loggedIn) {
    return navigateTo('/login')
  }

  // Validate session on client side
  try {
    await $auth.fetchUser()
  } catch (error) {
    // Session invalid, redirect to login
    return navigateTo('/login')
  }
})
```

## Security Best Practices

### Password Security

```typescript
// server/utils/password.ts
import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}
```

### JWT Security

```typescript
// server/utils/jwt.ts
import jwt from 'jsonwebtoken'

export const generateToken = (payload: any, expiresIn: string = '7d'): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
    issuer: 'god-panel',
    audience: 'god-panel-users'
  })
}

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'god-panel',
      audience: 'god-panel-users'
    })
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }
}
```

### Rate Limiting

```typescript
// server/middleware/rate-limit.ts
const rateLimit = new Map()

export default defineEventHandler(async (event) => {
  const clientIP = getClientIP(event)
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // 5 attempts per window

  // Clean up old entries
  for (const [ip, data] of rateLimit.entries()) {
    if (now - data.resetTime > windowMs) {
      rateLimit.delete(ip)
    }
  }

  // Check rate limit
  const userData = rateLimit.get(clientIP) || { count: 0, resetTime: now }

  if (userData.count >= maxRequests) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.'
    })
  }

  userData.count++
  rateLimit.set(clientIP, userData)
})
```

## Testing Authentication

### Unit Tests

```typescript
// test/auth.test.ts
describe('Authentication', () => {
  test('should login with valid credentials', async () => {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    })

    expect(response.success).toBe(true)
    expect(response.access_token).toBeDefined()
    expect(response.user).toBeDefined()
  })

  test('should reject invalid credentials', async () => {
    await expect(
      $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      })
    ).rejects.toThrow('Invalid credentials')
  })

  test('should require authentication for protected routes', async () => {
    await expect(
      $fetch('/api/users/me')
    ).rejects.toThrow('Unauthorized')
  })
})
```

## Deployment Considerations

### Environment Variables

```env
# Production environment variables
JWT_SECRET=your-super-secure-jwt-secret
JWT_REFRESH_SECRET=your-refresh-token-secret

# OAuth credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Security settings
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### HTTPS Requirement

Always use HTTPS in production for authentication:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Force HTTPS in production
  ssr: true,

  routeRules: {
    '/api/auth/**': {
      headers: {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
      }
    }
  }
})
```

## Troubleshooting

### Common Issues

**Token expiration:**
- Implement automatic token refresh
- Handle token expiry gracefully
- Redirect to login when refresh fails

**CORS issues:**
- Configure CORS properly for your domain
- Allow credentials in CORS settings
- Test with different browsers

**Session persistence:**
- Use secure cookie settings
- Implement proper logout functionality
- Clear all tokens on logout

### Debug Mode

Enable debug logging for authentication:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  auth: {
    debug: process.env.NODE_ENV === 'development'
  }
})
```

## Next Steps

After implementing authentication:

1. **[User Management](./user-management)** - Complete user administration
2. **[Role Management](./roles)** - Advanced permission system
3. **[API Security](./api-security)** - Secure your endpoints
4. **[Testing](./testing)** - Test authentication flows

## Resources

- **[Nuxt Auth Documentation](https://auth.nuxtjs.org/)**
- **[JWT Best Practices](https://jwt.io/)**
- **[OWASP Authentication Guide](https://owasp.org/www-project-top-ten/)**
- **[Password Security](https://haveibeenpwned.com/Passwords)**

---

**Next**: Check out the **[Theming Guide](./theming)** to customize the appearance of your authenticated application!
