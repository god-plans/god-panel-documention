---
title: Authentication Components
description: Layout components for authentication pages and forms
category: components
order: 2
---

# Authentication Components

God Panel provides layout components specifically designed for authentication pages. These components work together to create consistent and responsive authentication layouts.

## Components Overview

### 🏗️ Layout Components
- **Main**: Main layout wrapper with responsive design
- **Section**: Content section with image and responsive behavior
- **Content**: Inner content wrapper with proper spacing and alignment

## Quick Start

```vue
<template>
  <!-- Auth page layout -->
  <AuthMain>
    <AuthSection
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      img-url="/assets/illustrations/auth-illustration.webp"
    />

    <AuthContent>
      <!-- Your login form goes here -->
      <LoginForm />
    </AuthContent>
  </AuthMain>
</template>
```

## AuthMain Component

The `AuthMain` component serves as the main layout wrapper for authentication pages, providing responsive layout structure.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layoutQuery` | string | 'md' | Responsive breakpoint for layout switching |

### Usage

```vue
<template>
  <AuthMain layout-query="lg">
    <AuthSection />
    <AuthContent>
      <!-- Auth forms and content -->
    </AuthContent>
  </AuthMain>
</template>
```

## AuthSection Component

The `AuthSection` component displays promotional content alongside the authentication form. It includes an image and responsive text content.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | 'Manage the job' | Section heading |
| `subtitle` | string | 'More effectively with optimized workflows.' | Section description |
| `imgUrl` | string | '/assets/illustrations/illustration-dashboard.webp' | Image URL for illustration |
| `layoutQuery` | string | 'md' | Responsive breakpoint for visibility |

### Usage

```vue
<template>
  <AuthSection
    title="Secure Access"
    subtitle="Enterprise-grade security for your applications"
    img-url="/assets/illustrations/security-illustration.webp"
  />
</template>
```

## AuthContent Component

The `AuthContent` component wraps the actual authentication forms and provides proper spacing and alignment.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layoutQuery` | string | 'md' | Responsive breakpoint for styling |

### Usage

```vue
<template>
  <AuthContent>
    <div class="auth-form">
      <h2>Sign In</h2>
      <!-- Your authentication form -->
    </div>
  </AuthContent>
</template>
```

## Responsive Design

The authentication components are fully responsive and adapt to different screen sizes:

```vue
<!-- Mobile-first approach -->
<AuthMain>
  <AuthSection /> <!-- Hidden on mobile, visible on desktop -->
  <AuthContent>
    <!-- Always visible, responsive layout -->
  </AuthContent>
</AuthMain>
```

### Breakpoints

- **Mobile (< 960px)**: Section component is hidden, content takes full width
- **Desktop (≥ 960px)**: Side-by-side layout with section and content

## Styling and Theming

All authentication components use Vuetify's theme system and CSS custom properties:

```css
/* Authentication layout styling */
.auth-main {
  min-height: 100vh;
  background: rgb(var(--v-theme-background));
}

.auth-section {
  background: rgb(var(--v-theme-surface));
  padding: var(--layout-header-desktop-height);
}

.auth-content {
  padding: 16px 24px;
}

/* Dark theme support */
[data-theme="dark"] .auth-section {
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
}
```

## Integration Examples

### With Authentication Forms

```vue
<template>
  <AuthMain>
    <!-- Promotional section -->
    <AuthSection
      title="Dashboard Access"
      subtitle="Manage your projects efficiently"
      img-url="/assets/illustrations/dashboard-access.webp"
    />

    <!-- Login form -->
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

        <v-btn
          type="submit"
          color="primary"
          block
          :loading="loading"
        >
          Sign In
        </v-btn>
      </v-form>
    </AuthContent>
  </AuthMain>
</template>

<script setup>
const credentials = ref({
  email: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    // Authentication logic
    await authenticateUser(credentials.value)
    navigateTo('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>
```

### With Registration Form

```vue
<template>
  <AuthMain>
    <!-- Registration benefits -->
    <AuthSection
      title="Join Today"
      subtitle="Start building amazing applications"
      img-url="/assets/illustrations/get-started.webp"
    />

    <!-- Registration form -->
    <AuthContent>
      <v-form @submit="handleRegister">
        <v-text-field
          v-model="user.name"
          label="Full Name"
          required
        />

        <v-text-field
          v-model="user.email"
          label="Email"
          type="email"
          required
        />

        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
          required
        />

        <v-checkbox
          v-model="user.terms"
          label="I agree to the terms and conditions"
          required
        />

        <v-btn
          type="submit"
          color="primary"
          block
          :loading="loading"
        >
          Create Account
        </v-btn>
      </v-form>
    </AuthContent>
  </AuthMain>
</template>

<script setup>
const user = ref({
  name: '',
  email: '',
  password: '',
  terms: false
})

const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  try {
    // Registration logic
    await registerUser(user.value)
    navigateTo('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}
</script>
```

## Layout Customization

### Custom Breakpoints

```vue
<template>
  <!-- Custom responsive breakpoint -->
  <AuthMain layout-query="sm">
    <!-- Section visible from 640px+ -->
    <AuthSection />
    <!-- Content always visible -->
    <AuthContent layout-query="sm" />
  </AuthMain>
</template>
```

### Custom Content

```vue
<template>
  <AuthMain>
    <!-- Custom promotional content -->
    <AuthSection>
      <template #title>
        <h1>Custom Title</h1>
      </template>
      <template #subtitle>
        <p>Custom subtitle content</p>
      </template>
      <template #image>
        <v-img src="/custom-image.webp" />
      </template>
    </AuthSection>

    <!-- Custom form content -->
    <AuthContent>
      <div class="custom-auth-form">
        <!-- Your custom form implementation -->
      </div>
    </AuthContent>
  </AuthMain>
</template>
```

## Accessibility Features

The authentication components are built with accessibility in mind:

- **Semantic HTML**: Proper heading structure and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Logical focus flow and visual indicators
- **Responsive Design**: Works across all device sizes

## Best Practices

### Layout Structure

1. **Always use AuthMain as the root** component for auth pages
2. **Place AuthSection first** for better semantic structure
3. **Use AuthContent for forms** and interactive elements
4. **Test on mobile devices** to ensure proper responsive behavior

### Performance

1. **Lazy load images** in AuthSection component
2. **Use proper loading states** for form submissions
3. **Optimize images** for different screen sizes
4. **Minimize bundle size** by using only necessary components

### User Experience

1. **Provide clear visual hierarchy** with proper spacing
2. **Use consistent styling** across all auth pages
3. **Include helpful illustrations** in the section component
4. **Ensure smooth transitions** between responsive breakpoints

## Troubleshooting

### Common Issues

**Layout not responsive:**
- Check that layout-query prop matches your breakpoint requirements
- Verify CSS media queries are working correctly
- Test on actual devices, not just browser dev tools

**Content not centering:**
- Ensure AuthContent has proper max-width constraints
- Check for conflicting CSS from parent components
- Verify flexbox alignment properties

**Images not loading:**
- Confirm image paths are correct
- Check if images are in the public directory
- Verify proper alt text for accessibility

## Next Steps

- **[Authentication Guide](../../guides/authentication)** - Complete setup guide
- **[Layout System Documentation](../../layouts)** - Other layout components
- **[Theme Components](../theme)** - Theming and customization
- **[Component Overview](../overview)** - All available components
