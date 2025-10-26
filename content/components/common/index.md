---
title: Common Components
description: Essential UI components for navigation, feedback, and user experience
category: components
order: 3
---

# Common Components

God Panel's common components provide essential UI functionality for navigation, loading states, error handling, and user feedback. These components are built with Vuetify and follow the project's design system.

## Component Categories

### 🧭 Navigation Components
- **AppBar**: Main navigation header with logo and menu
- **Logo**: Adaptive brand logo with theme support

### 🔄 Loading & Progress
- **LoadingScreen**: Full-screen loading with animations
- **ProgressBar**: Top progress indicator

### 🔔 Feedback Components
- **ToastContainer & ToastItem**: Toast notification system
- **ErrorBoundary**: Error handling and recovery

### 🔍 Utility Components
- **SearchNotFound**: Search results fallback
- **Blank**: Empty state placeholder

## AppBar Component

The main navigation header component with responsive design, theme toggle, and mobile menu support.

```vue
<template>
  <!-- Main application bar -->
  <CommonAppBar />
</template>
```

### Features

- **Responsive Design**: Adapts to different screen sizes
- **Theme Toggle**: Dark/light mode switching
- **Mobile Menu**: Collapsible navigation for mobile devices
- **Logo Integration**: Displays the application logo
- **Active Route Highlighting**: Shows current page in navigation

### Usage in Layouts

```vue
<!-- In your layout -->
<template>
  <div class="app-layout">
    <CommonAppBar />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>
```

## Logo Component

Adaptive logo component that automatically switches between light and dark theme variants.

```vue
<template>
  <div class="flex items-center gap-4">
    <!-- Full logo with text -->
    <CommonLogo variant="full" size="lg" />

    <!-- Compact version -->
    <CommonLogo variant="compact" size="md" />

    <!-- Icon only -->
    <CommonLogo variant="icon" size="sm" />
  </div>
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'full' \| 'compact' \| 'mono' \| 'icon'` | `'full'` | Logo style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Logo size |
| `color` | string | - | Custom color for mono variant |
| `class` | string | - | Additional CSS classes |

### Variants

- **full**: Complete logo with text (default)
- **compact**: Smaller version with text
- **mono**: Monochrome version for navigation
- **icon**: Icon-only version for buttons/headers

### Theme Integration

The logo automatically adapts to the current theme:

```vue
<script setup>
const { isDarkMode } = useSettingsStore()

// Logo automatically switches based on theme
// Light mode: /full-logo.png, /logo.png
// Dark mode: /god-pure-dark-full.png, /god-pure-dark.png
</script>
```

## LoadingScreen Component

Full-screen loading component with animations and progress support.

```vue
<template>
  <div>
    <!-- Basic loading -->
    <CommonLoadingScreen />

    <!-- With custom message -->
    <CommonLoadingScreen
      title="Loading Dashboard"
      subtitle="Preparing your workspace..."
    />

    <!-- With progress -->
    <CommonLoadingScreen
      title="Processing"
      subtitle="Please wait..."
      :show-progress="true"
      :progress="75"
    />
  </div>
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `'Loading...'` | Loading screen title |
| `subtitle` | string | `'Please wait while we prepare your dashboard'` | Subtitle text |
| `showProgress` | boolean | `false` | Show progress bar |
| `progress` | number | `0` | Progress percentage (0-100) |

### Features

- **Animated Logo**: Bouncing logo animation
- **Progress Dots**: Animated loading dots
- **Progress Bar**: Optional progress indicator
- **Customizable Text**: Title and subtitle support
- **Responsive Design**: Works on all screen sizes
- **Theme Integration**: Respects dark/light theme

### Usage Scenarios

```vue
<script setup>
// During initial app load
const { pending } = await useLazyAsyncData('initial-data', fetchInitialData)

// During route transitions
const { pending } = useLoadingIndicator()

// During async operations
const loading = ref(false)

const performAction = async () => {
  loading.value = true
  try {
    await apiCall()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <CommonLoadingScreen
    v-if="pending || loading"
    title="Loading..."
    subtitle="Please wait..."
  />
</template>
```

## ProgressBar Component

Fixed top progress bar for indicating loading states.

```vue
<template>
  <!-- Automatic progress during navigation -->
  <CommonProgressBar :is-loading="pending" />

  <!-- Manual control -->
  <CommonProgressBar :is-loading="isProcessing" :progress="uploadProgress" />
</template>

<script setup>
const { pending } = useLoadingIndicator()
const isProcessing = ref(false)
const uploadProgress = ref(0)
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | boolean | `false` | Show/hide progress bar |
| `progress` | number | `0` | Progress percentage (0-100) |

### Features

- **Fixed Position**: Stays at top of viewport
- **Smooth Animation**: CSS transitions for progress changes
- **Gradient Fill**: Attractive gradient background
- **Theme Colors**: Uses current theme colors
- **Auto-hide**: Disappears when not loading

## Toast System

The toast notification system consists of two components working together.

### ToastContainer

```vue
<template>
  <!-- Toast container automatically displays toasts -->
  <CommonToastContainer />
</template>
```

### ToastItem

Individual toast notifications with different types and positions.

```vue
<template>
  <!-- Success toast -->
  <CommonToastItem
    :toast="{
      id: '1',
      type: 'success',
      title: 'Success!',
      message: 'Data saved successfully',
      duration: 3000
    }"
    @close="removeToast"
  />

  <!-- Error toast -->
  <CommonToastItem
    :toast="{
      id: '2',
      type: 'error',
      title: 'Error',
      message: 'Failed to save data',
      duration: 5000,
      actions: [
        { label: 'Retry', action: 'retry' },
        { label: 'Dismiss', action: 'dismiss' }
      ]
    }"
    @close="removeToast"
    @action="handleToastAction"
  />
</template>
```

### Toast Types

- **success**: Green success notifications
- **error**: Red error notifications
- **warning**: Orange warning notifications
- **info**: Blue informational notifications

### Using the Toast Composable

```vue
<script setup>
const { showToast, toasts, removeToast } = useToast()

// Show different types of toasts
const handleSuccess = () => {
  showToast({
    type: 'success',
    title: 'Success!',
    message: 'Operation completed successfully'
  })
}

const handleError = () => {
  showToast({
    type: 'error',
    title: 'Error',
    message: 'Something went wrong',
    duration: 5000,
    position: 'top-right'
  })
}

const handleWarning = () => {
  showToast({
    type: 'warning',
    title: 'Warning',
    message: 'Please check your input',
    actions: [
      { label: 'Fix', action: 'fix' }
    ]
  })
}
</script>
```

## ErrorBoundary Component

Comprehensive error handling component that catches and displays errors gracefully.

```vue
<template>
  <!-- Wrap components that might fail -->
  <CommonErrorBoundary
    title="Something went wrong"
    :show-retry="true"
    :show-report="true"
    @error="handleError"
    @retry="handleRetry"
  >
    <DashboardChart />
  </CommonErrorBoundary>

  <!-- With custom error handling -->
  <CommonErrorBoundary
    :show-details="false"
    :show-home="false"
    @error="logError"
  >
    <ApiDataComponent />
  </CommonErrorBoundary>
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `'Something went wrong'` | Error title |
| `showMessage` | boolean | `true` | Show error message |
| `showDetails` | boolean | `true` | Show error details (dev only) |
| `showRetry` | boolean | `true` | Show retry button |
| `showReport` | boolean | `true` | Show report issue button |
| `showHome` | boolean | `true` | Show go home button |
| `fallback` | any | - | Custom fallback content |
| `onError` | function | - | Error callback |
| `onRetry` | function | - | Retry callback |

### Features

- **Error Catching**: Catches JavaScript errors in child components
- **Structured Logging**: Creates detailed error reports
- **Development Tools**: Shows error details in development
- **Recovery Options**: Retry, report, and navigation actions
- **Accessibility**: Screen reader friendly error messages
- **Theme Integration**: Matches current theme colors

### Error Handling

```vue
<script setup>
const handleError = (error) => {
  console.error('Component error:', error)
  // Send to error tracking service
  sendToErrorTracker(error)
}

const handleRetry = async () => {
  // Reset component state
  await resetComponentState()
  // Retry the operation
  await fetchData()
}
</script>
```

## SearchNotFound Component

Empty state component for when search results are not found.

```vue
<template>
  <!-- In search results -->
  <CommonSearchNotFound
    v-if="results.length === 0"
    search-query="dashboard widgets"
    :suggestions="[
      'Try different keywords',
      'Check spelling',
      'Use broader search terms'
    ]"
  />
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchQuery` | string | - | The search term that was used |
| `suggestions` | string[] | - | Array of helpful suggestions |
| `title` | string | `'No results found'` | Custom title |
| `message` | string | - | Custom message |

## Blank Component

Minimal placeholder component for empty states.

```vue
<template>
  <!-- Empty state -->
  <CommonBlank height="200px">
    <div class="text-center">
      <h3>No data available</h3>
      <p class="text-grey">Check back later for updates</p>
    </div>
  </CommonBlank>
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | string | `'100px'` | Component height |
| `class` | string | - | Additional CSS classes |

## Theming and Customization

All common components integrate with the Vuetify theme system:

```vue
<script setup>
// Access theme settings
const { isDarkMode } = useSettingsStore()

// Components automatically adapt to theme changes
</script>

<style>
/* Custom theme integration */
.common-component {
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
}

/* Dark mode specific styles */
[data-theme="dark"] .common-component {
  border-color: rgb(var(--v-theme-outline));
}
</style>
```

## Best Practices

### Performance

1. **Use LoadingScreen** only for full-page loads
2. **Prefer ProgressBar** for smaller operations
3. **Lazy load** toast and error components
4. **Minimize re-renders** with proper state management

### User Experience

1. **Provide clear feedback** for all operations
2. **Use appropriate toast types** for different messages
3. **Include retry options** for failed operations
4. **Test error states** in development

### Accessibility

1. **Toast notifications** are announced to screen readers
2. **Error boundaries** provide accessible error messages
3. **All components** support keyboard navigation
4. **Loading states** indicate progress clearly

## Integration Examples

### Global Setup

```vue
<!-- In app.vue or layout -->
<template>
  <div id="app">
    <!-- Always present components -->
    <CommonToastContainer />
    <CommonProgressBar :is-loading="globalLoading" />

    <!-- Page content -->
    <NuxtPage />
  </div>
</template>

<script setup>
// Global error handling
const { $errorHandler } = useNuxtApp()

onMounted(() => {
  // Set up global error boundaries
  if ($errorHandler) {
    $errorHandler.setGlobalBoundary(ErrorBoundary)
  }
})
</script>
```

### In Pages

```vue
<template>
  <div class="page">
    <!-- Page-specific error boundary -->
    <CommonErrorBoundary title="Failed to load dashboard">
      <DashboardContent />
    </CommonErrorBoundary>
  </div>
</template>

<script setup>
const { showToast } = useToast()

// Show success message
const handleSave = async () => {
  try {
    await saveData()
    showToast({
      type: 'success',
      message: 'Dashboard saved successfully'
    })
  } catch (error) {
    showToast({
      type: 'error',
      message: 'Failed to save dashboard'
    })
  }
}
</script>
```

## Troubleshooting

### Common Issues

**Toast notifications not showing:**
- Check if ToastContainer is mounted in your app
- Verify useToast composable is properly initialized
- Check browser console for JavaScript errors

**Error boundary not catching errors:**
- Ensure ErrorBoundary wraps the failing component
- Check if onError prop is properly handled
- Verify error is thrown, not just logged

**LoadingScreen not responsive:**
- Check CSS media queries
- Verify viewport meta tag is set
- Test on actual devices

**Logo not switching themes:**
- Verify theme store is properly configured
- Check image paths in public directory
- Confirm Logo component is using the right props

## Next Steps

- **[Toast Service Documentation](../../services/toast)** - Toast system implementation
- **[Error Handler Documentation](../../services/error-handler)** - Global error handling
- **[Theme System Documentation](../theme)** - Theme integration
- **[Dashboard Components](../dashboard)** - Dashboard-specific components
