---
title: Authentication Components
description: Complete documentation for God Panel's authentication components
category: components
order: 2
---

# Authentication Components

God Panel provides a comprehensive set of authentication components for user login, registration, password management, and user profile functionality.

## Components Overview

### 🔐 Login Components
- **LoginForm**: Complete login form with validation
- **SocialLogin**: Social media authentication buttons
- **RememberMe**: Remember me functionality
- **ForgotPassword**: Password recovery link

### 📝 Registration Components
- **RegisterForm**: User registration form
- **EmailVerification**: Email verification component
- **TermsAndConditions**: Terms acceptance component

### 👤 Profile Components
- **ProfileForm**: User profile editing
- **PasswordChange**: Password change form
- **AvatarUpload**: Profile picture upload

## Quick Start

```vue
<template>
  <div>
    <!-- Login Form -->
    <AuthLoginForm @success="handleLoginSuccess" />

    <!-- Registration Form -->
    <AuthRegisterForm @success="handleRegisterSuccess" />
  </div>
</template>

<script setup>
const handleLoginSuccess = (user) => {
  console.log('User logged in:', user)
  // Redirect to dashboard
}

const handleRegisterSuccess = (user) => {
  console.log('User registered:', user)
  // Redirect to email verification
}
</script>
```

## Login Form

The `AuthLoginForm` component provides a complete login experience with validation and error handling.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `redirect` | string | '/' | Redirect URL after successful login |
| `showSocialLogin` | boolean | true | Show social login buttons |
| `showRememberMe` | boolean | true | Show remember me checkbox |
| `showForgotPassword` | boolean | true | Show forgot password link |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `success` | User object | Emitted on successful login |
| `error` | Error object | Emitted on login failure |
| `forgot-password` | Email | Emitted when forgot password is clicked |

### Usage

```vue
<template>
  <AuthLoginForm
    redirect="/dashboard"
    :show-social-login="false"
    @success="handleLogin"
    @error="handleError"
  />
</template>

<script setup>
const handleLogin = (user) => {
  // Handle successful login
  navigateTo('/dashboard')
}

const handleError = (error) => {
  // Handle login error
  console.error('Login failed:', error)
}
</script>
```

## Registration Form

The `AuthRegisterForm` handles user registration with validation and email verification.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `requireEmailVerification` | boolean | true | Require email verification |
| `showTerms` | boolean | true | Show terms and conditions |
| `redirect` | string | '/' | Redirect URL after registration |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `success` | User object | Emitted on successful registration |
| `error` | Error object | Emitted on registration failure |

## Profile Components

### Profile Form

```vue
<template>
  <AuthProfileForm
    :user="currentUser"
    @update="handleProfileUpdate"
  />
</template>

<script setup>
const currentUser = ref({
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Software developer'
})

const handleProfileUpdate = (updatedUser) => {
  // Update user profile
  console.log('Profile updated:', updatedUser)
}
</script>
```

### Password Change

```vue
<template>
  <AuthPasswordChange
    @success="handlePasswordChange"
    @error="handleError"
  />
</template>

<script setup>
const handlePasswordChange = () => {
  // Password changed successfully
  console.log('Password updated')
}

const handleError = (error) => {
  // Handle error
  console.error('Password change failed:', error)
}
</script>
```

## Styling and Theming

All authentication components use CSS custom properties for easy theming:

```css
/* Login form styling */
.auth-login-form {
  --auth-form-bg: var(--color-white);
  --auth-form-border: var(--color-gray-200);
  --auth-form-radius: var(--radius-lg);
  --auth-primary-color: var(--color-primary);
  --auth-input-height: 48px;
}

[data-theme="dark"] .auth-login-form {
  --auth-form-bg: var(--color-gray-800);
  --auth-form-border: var(--color-gray-700);
}
```

## Validation

Components include built-in validation with customizable rules:

```vue
<script setup>
const validationRules = {
  email: [
    { required: true, message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email' }
  ],
  password: [
    { required: true, message: 'Password is required' },
    { min: 8, message: 'Password must be at least 8 characters' }
  ]
}
</script>
```

## Accessibility

All authentication components are fully accessible:

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and roles
- **Focus Management**: Logical focus flow
- **Error Announcements**: Screen reader announcements for errors

## Internationalization

Components support i18n out of the box:

```vue
<template>
  <AuthLoginForm :locale="currentLocale" />
</template>

<script setup>
const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
</script>
```

## Advanced Usage

### Custom Validation

```vue
<template>
  <AuthLoginForm>
    <template #custom-validation="{ errors, values }">
      <div v-if="customError" class="custom-error">
        {{ customError }}
      </div>
    </template>
  </AuthLoginForm>
</template>
```

### Custom Styling

```vue
<style scoped>
/* Custom login form styling */
.auth-login-form {
  border: 2px solid var(--color-primary);
}

.auth-login-form .form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}
</style>
```

## Integration Examples

### With Nuxt Auth

```vue
<script setup>
// Using @nuxtjs/auth-next or similar
const { login, register, logout } = useAuth()

const handleLogin = async (credentials) => {
  try {
    await login('local', credentials)
    await navigateTo('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>
```

### With Custom Backend

```vue
<script setup>
const handleLogin = async (credentials) => {
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })

    // Store token
    localStorage.setItem('auth_token', response.token)

    // Redirect
    await navigateTo('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>
```

## Best Practices

### Security

1. **Always use HTTPS** in production
2. **Validate on both client and server**
3. **Implement rate limiting** on login attempts
4. **Use secure password requirements**
5. **Enable two-factor authentication** when possible

### User Experience

1. **Provide clear feedback** for all actions
2. **Show loading states** during async operations
3. **Remember form state** when possible
4. **Offer password strength indicator**
5. **Provide helpful error messages**

### Performance

1. **Lazy load** authentication components
2. **Cache user data** appropriately
3. **Minimize re-renders** with proper state management
4. **Use proper error boundaries**

## Troubleshooting

### Common Issues

**Form not submitting:**
- Check if all required fields are filled
- Verify validation rules are correct
- Check browser console for JavaScript errors

**Authentication failing:**
- Verify API endpoints are correct
- Check if authentication token is valid
- Ensure proper CORS configuration

**Styling issues:**
- Check if CSS custom properties are defined
- Verify theme configuration
- Check for CSS specificity conflicts

## Contributing

Help improve the authentication components:

1. **Report issues** on GitHub
2. **Submit feature requests** via discussions
3. **Contribute code** following our guidelines
4. **Improve documentation** with examples

## Next Steps

- **[Authentication Guide](../../guides/authentication)** - Complete setup guide
- **[API Reference](../../api/index)** - Backend integration
- **[Examples](../../examples/basic-usage)** - Code examples
- **[Component Overview](../overview)** - All available components
