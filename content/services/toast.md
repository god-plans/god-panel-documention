---
title: Toast Service
description: Comprehensive notification system for user feedback and alerts
category: services
order: 3
---

# Toast Service

The Toast Service provides a comprehensive notification system for displaying user feedback, alerts, and status messages. It features multiple notification types, flexible positioning, auto-dismiss functionality, and smooth animations.

## Features

### 🔔 **Notification Types**
- **Success**: Green notifications for successful operations
- **Error**: Red notifications for errors and failures
- **Warning**: Orange notifications for warnings and cautions
- **Info**: Blue notifications for informational messages
- **Loading**: Animated notifications for ongoing processes

### 📍 **Flexible Positioning**
- 9 different positions (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
- Responsive positioning that adapts to screen size
- Customizable offset and spacing

### ⏰ **Auto-dismiss & Timing**
- Configurable auto-dismiss duration
- Pause on hover functionality
- Manual dismiss controls
- Persistent notifications for important messages

### 🎯 **Interactive Elements**
- Action buttons for user interaction
- Custom icons and styling
- Click-to-dismiss functionality
- Keyboard navigation support

### 🎨 **Theme Integration**
- Automatic dark/light theme support
- Consistent with application design system
- Customizable appearance and animations

## Quick Start

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

// Update existing toast
toastService.update(toastId, {
  type: 'success',
  title: 'Success!',
  message: 'Data processed successfully',
  duration: 3000
})
```

## Basic Usage

### Simple Notifications

```typescript
// Success notification
toastService.success('User created successfully!')

// Error notification
toastService.error('Failed to create user')

// Warning notification
toastService.warning('This action cannot be undone')

// Info notification
toastService.info('System maintenance scheduled for tonight')
```

### Notification with Options

```typescript
// Custom duration and position
toastService.success('File uploaded!', {
  duration: 8000, // 8 seconds
  position: 'top-right'
})

// Non-dismissible notification
toastService.warning('Server maintenance in progress', {
  duration: 0, // Never auto-dismiss
  dismissible: false
})

// With action button
toastService.info('New version available', {
  duration: 10000,
  actions: [
    { label: 'Update Now', action: 'update' },
    { label: 'Later', action: 'dismiss' }
  ]
})
```

### Loading Notifications

```typescript
// Show loading toast
const loadingToast = toastService.loading('Saving data...')

// Update to success
setTimeout(() => {
  toastService.update(loadingToast, {
    type: 'success',
    title: 'Saved!',
    message: 'Data saved successfully',
    duration: 3000
  })
}, 2000)
```

## Advanced Features

### Toast Management

```typescript
// Get all active toasts
const allToasts = toastService.getToasts()
console.log(`Active toasts: ${allToasts.length}`)

// Get specific toast
const toast = toastService.getToast('toast-id')
if (toast) {
  console.log('Toast details:', toast)
}

// Dismiss specific toast
toastService.dismiss('toast-id')

// Dismiss all toasts
toastService.dismissAll()

// Dismiss toasts by type
toastService.dismissByType('error')
```

### Promise-based Notifications

```typescript
// Automatic loading/success/error handling
const handleAsyncOperation = async () => {
  const result = await toastService.promise(
    asyncOperation(),
    {
      loading: 'Processing your request...',
      success: 'Operation completed successfully!',
      error: 'Operation failed. Please try again.'
    }
  )
  return result
}

// Usage in component
const saveData = async () => {
  try {
    const result = await handleAsyncOperation()
    // Handle success
    console.log('Result:', result)
  } catch (error) {
    // Handle error (already shown to user)
    console.error('Operation failed:', error)
  }
}
```

### Toast Customization

```typescript
// Custom toast with all options
const customToast = toastService.show({
  type: 'success',
  title: 'Custom Success',
  message: 'This is a custom success message',
  icon: 'mdi-check-circle',
  duration: 5000,
  position: 'bottom-center',
  dismissible: true,
  pauseOnHover: true,
  showProgress: true,
  actions: [
    {
      label: 'View Details',
      action: () => console.log('View details clicked')
    }
  ]
})
```

## Toast Types and Styling

### Notification Types

| Type | Color | Icon | Use Case |
|------|-------|------|----------|
| **success** | Green | `mdi-check-circle` | Successful operations, confirmations |
| **error** | Red | `mdi-alert-circle` | Errors, failures, critical issues |
| **warning** | Orange | `mdi-alert` | Warnings, cautions, non-critical issues |
| **info** | Blue | `mdi-information` | Information, updates, announcements |
| **loading** | Primary | `mdi-loading` | Loading states, processing |

### Position Options

```typescript
// Available positions
type ToastPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

// Usage examples
toastService.success('Message', { position: 'top-center' })
toastService.error('Error', { position: 'bottom-right' })
toastService.info('Update', { position: 'top-left' })
```

### Custom Icons

```typescript
// Use custom icons
toastService.show({
  type: 'success',
  icon: 'mdi-thumb-up',
  message: 'Custom icon notification'
})

// Icon mapping
const iconMap = {
  success: 'mdi-check-circle',
  error: 'mdi-alert-circle',
  warning: 'mdi-alert',
  info: 'mdi-information',
  loading: 'mdi-loading'
}
```

## Integration with Components

### Using Toast Composable

```vue
<template>
  <div>
    <button @click="showSuccess">Show Success</button>
    <button @click="showError">Show Error</button>
    <button @click="performAction">Perform Action</button>
  </div>
</template>

<script setup>
import { useToast } from '~/composables/useToast'

const { success, error, warning, info, loading, promise } = useToast()

const showSuccess = () => {
  success('Operation completed successfully!')
}

const showError = () => {
  error('Something went wrong', {
    title: 'Error',
    duration: 8000,
    position: 'top-center'
  })
}

const performAction = async () => {
  const result = await promise(
    someAsyncOperation(),
    {
      loading: 'Processing...',
      success: 'Action completed!',
      error: 'Action failed'
    }
  )

  if (result) {
    // Handle success
  }
}
</script>
```

### Toast Container

The toast system requires a container component to render notifications:

```vue
<!-- In your main layout or app.vue -->
<template>
  <div id="app">
    <!-- Toast container must be present -->
    <ToastContainer />

    <!-- Your app content -->
    <NuxtPage />
  </div>
</template>

<script setup>
import ToastContainer from '~/components/common/ToastContainer.vue'
</script>
```

## Toast Configuration

### Global Configuration

```typescript
// Update default toast settings
toastService.setDefaults({
  duration: 4000,        // Default auto-dismiss time
  position: 'bottom-right', // Default position
  dismissible: true,     // Allow manual dismiss
  pauseOnHover: true,    // Pause on hover
  showProgress: false    // Show progress bar
})

// Configure maximum number of toasts
toastService.setDefaults({
  maxToasts: 5 // Maximum simultaneous toasts
})
```

### Per-Toast Configuration

```typescript
// Override defaults for specific toast
toastService.success('Custom message', {
  duration: 10000,        // 10 seconds
  position: 'top-center', // Different position
  dismissible: false,     // Can't be dismissed
  pauseOnHover: false,    // No pause on hover
  showProgress: true      // Show progress bar
})
```

## Animation and Transitions

### Default Animations

Toasts use CSS transitions for smooth animations:

```css
/* Toast animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
```

### Custom Animation Classes

```vue
<!-- Custom toast component with animations -->
<template>
  <TransitionGroup
    name="toast"
    tag="div"
    class="toast-container"
  >
    <ToastItem
      v-for="toast in toasts"
      :key="toast.id"
      :toast="toast"
      @close="removeToast"
    />
  </TransitionGroup>
</template>
```

## Responsive Design

### Mobile Optimization

Toasts automatically adapt to mobile screens:

```css
/* Mobile responsive styles */
@media (max-width: 640px) {
  .toast-container {
    left: 1rem !important;
    right: 1rem !important;
    transform: none !important;
  }

  .toast-enter-from,
  .toast-leave-to {
    transform: translateY(100%);
  }
}
```

### Responsive Positioning

```typescript
// Responsive position logic
const getResponsivePosition = () => {
  if (window.innerWidth < 640) {
    return 'bottom-center' // Mobile: center bottom
  }
  return 'bottom-right' // Desktop: right bottom
}

// Use in toast
toastService.info('Message', {
  position: getResponsivePosition()
})
```

## Accessibility Features

### Screen Reader Support

Toasts are announced to screen readers:

```typescript
// ARIA attributes for accessibility
const toast = {
  id: 'toast-1',
  type: 'success',
  message: 'Data saved successfully',
  'aria-live': 'polite',    // Important for screen readers
  'aria-atomic': 'true',    // Read entire message
  role: 'status'            // Semantic role
}
```

### Keyboard Navigation

```vue
<template>
  <div class="toast-item" tabindex="0">
    <div class="toast-content">
      <button
        class="toast-close"
        @click="closeToast"
        @keydown.enter="closeToast"
        @keydown.space="closeToast"
        aria-label="Close notification"
      >
        <v-icon>mdi-close</v-icon>
      </button>
    </div>
  </div>
</template>
```

## Error Handling Integration

### API Error Notifications

```typescript
// Automatic error notifications for API calls
const handleApiError = (error) => {
  const message = error.message || 'An error occurred'

  switch (error.type) {
    case 'NETWORK_ERROR':
      toastService.error('Network error. Please check your connection.', {
        duration: 8000,
        actions: [{ label: 'Retry', action: 'retry' }]
      })
      break

    case 'VALIDATION_ERROR':
      toastService.warning('Please check your input and try again.', {
        duration: 6000
      })
      break

    case 'UNAUTHORIZED_ERROR':
      toastService.error('Session expired. Please login again.', {
        duration: 10000,
        actions: [{ label: 'Login', action: 'login' }]
      })
      break

    default:
      toastService.error(message, { duration: 5000 })
  }
}
```

### Form Validation

```vue
<template>
  <form @submit="handleSubmit">
    <input v-model="email" type="email" />
    <div v-if="emailError" class="error">
      {{ emailError }}
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
const email = ref('')
const emailError = ref('')

const handleSubmit = async () => {
  emailError.value = ''

  if (!email.value) {
    emailError.value = 'Email is required'
    toastService.warning('Please fill in all required fields')
    return
  }

  try {
    await submitForm({ email: email.value })
    toastService.success('Form submitted successfully!')
  } catch (error) {
    toastService.error('Failed to submit form')
    emailError.value = error.message
  }
}
</script>
```

## Toast Actions

### Interactive Notifications

```typescript
// Toast with action buttons
const actionToast = toastService.warning('Unsaved changes', {
  duration: 0, // Persistent
  dismissible: false,
  actions: [
    {
      label: 'Save',
      action: () => {
        saveChanges()
        toastService.dismiss(actionToast)
      }
    },
    {
      label: 'Discard',
      action: () => {
        discardChanges()
        toastService.dismiss(actionToast)
      }
    }
  ]
})
```

### Confirmation Toasts

```typescript
// Confirmation dialog using toast
const confirmDelete = (itemId) => {
  const confirmToast = toastService.warning(
    `Delete ${itemId}?`,
    {
      duration: 0,
      dismissible: false,
      actions: [
        {
          label: 'Delete',
          action: () => {
            performDelete(itemId)
            toastService.dismiss(confirmToast)
          }
        },
        {
          label: 'Cancel',
          action: () => {
            toastService.dismiss(confirmToast)
          }
        }
      ]
    }
  )
}
```

## Queue Management

### Toast Limits

```typescript
// Limit maximum number of toasts
toastService.setDefaults({
  maxToasts: 3 // Only show 3 toasts at a time
})

// When limit is reached, oldest toasts are removed
toastService.success('Toast 1')
toastService.success('Toast 2')
toastService.success('Toast 3')
toastService.success('Toast 4') // Toast 1 is removed
```

### Priority System

```typescript
// Show important notifications first
const showPriorityToast = (message, priority = 'normal') => {
  const toast = {
    message,
    priority,
    duration: priority === 'high' ? 0 : 5000, // High priority = persistent
    position: priority === 'high' ? 'top-center' : 'bottom-right'
  }

  return toastService.show(toast)
}

// Usage
showPriorityToast('Critical system error', 'high')
showPriorityToast('Regular update', 'normal')
```

## Testing Toast Service

### Unit Tests

```typescript
// tests/services/toast.test.ts
import { toastService } from '~/services/toast'

describe('ToastService', () => {
  beforeEach(() => {
    toastService.dismissAll() // Clear all toasts
  })

  it('should create success toast', () => {
    const id = toastService.success('Test message')
    expect(id).toBeDefined()
    expect(toastService.getToast(id)).toBeDefined()
  })

  it('should auto-dismiss toast after duration', (done) => {
    const id = toastService.info('Test', { duration: 100 })

    setTimeout(() => {
      expect(toastService.getToast(id)).toBeUndefined()
      done()
    }, 150)
  })

  it('should handle promise-based toasts', async () => {
    const promise = Promise.resolve('success')
    const result = await toastService.promise(
      promise,
      {
        loading: 'Loading...',
        success: 'Loaded!',
        error: 'Failed!'
      }
    )

    expect(result).toBe('success')
  })
})
```

### Mock Toast Service

```typescript
// tests/mocks/toast.ts
import { vi } from 'vitest'

export const mockToastService = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
  loading: vi.fn(),
  show: vi.fn(),
  update: vi.fn(),
  dismiss: vi.fn(),
  dismissAll: vi.fn(),
  dismissByType: vi.fn(),
  getToasts: vi.fn(() => []),
  getToast: vi.fn(),
  setDefaults: vi.fn(),
  promise: vi.fn(),
}
```

## Integration Examples

### Global Toast Setup

```typescript
// plugins/toast.client.ts
import { toastService } from '~/services/toast'

export default defineNuxtPlugin(() => {
  // Configure global toast settings
  toastService.setDefaults({
    duration: 4000,
    position: 'bottom-right',
    pauseOnHover: true,
    showProgress: false,
    maxToasts: 5
  })

  return {
    provide: {
      toast: toastService
    }
  }
})
```

### API Integration

```typescript
// composables/useApiWithToast.ts
import { toastService } from '~/services/toast'

export const useApiWithToast = () => {
  const { execute } = useApi()

  const apiCallWithToast = async (
    apiCall,
    options = {}
  ) => {
    const toastMessages = {
      loading: options.loadingMessage || 'Loading...',
      success: options.successMessage || 'Success!',
      error: options.errorMessage || 'Something went wrong',
      ...options.messages
    }

    return toastService.promise(
      execute(apiCall),
      toastMessages
    )
  }

  return {
    apiCallWithToast
  }
}
```

### Form Integration

```vue
<template>
  <form @submit="handleSubmit">
    <input v-model="formData.name" />
    <textarea v-model="formData.message"></textarea>
    <button type="submit" :disabled="submitting">
      {{ submitting ? 'Sending...' : 'Send' }}
    </button>
  </form>
</template>

<script setup>
import { useToast } from '~/composables/useToast'

const { promise } = useToast()
const submitting = ref(false)
const formData = reactive({
  name: '',
  message: ''
})

const handleSubmit = async () => {
  if (!formData.name || !formData.message) {
    toastService.warning('Please fill in all fields')
    return
  }

  try {
    const result = await promise(
      submitForm(formData),
      {
        loading: 'Sending message...',
        success: 'Message sent successfully!',
        error: 'Failed to send message'
      }
    )

    // Reset form on success
    formData.name = ''
    formData.message = ''
  } catch (error) {
    // Error already handled by promise
  }
}
</script>
```

## Best Practices

### User Experience

1. **Use appropriate types**: Choose the right notification type for the message
2. **Keep messages concise**: Short, clear messages are more effective
3. **Set appropriate durations**: Important messages need more time
4. **Provide actions when needed**: Allow users to take action on notifications

### Performance

1. **Limit simultaneous toasts**: Prevent notification spam
2. **Use appropriate positions**: Consider screen real estate
3. **Clean up dismissed toasts**: Remove from DOM properly
4. **Batch similar notifications**: Group related messages

### Accessibility

1. **Use semantic types**: Different types for different purposes
2. **Provide alternatives**: Text alternatives for icons
3. **Support keyboard navigation**: Full keyboard accessibility
4. **Announce to screen readers**: Use proper ARIA attributes

### Content Strategy

1. **Be specific**: Clear, actionable error messages
2. **Use consistent language**: Follow your app's tone and voice
3. **Provide next steps**: Tell users what they can do
4. **Avoid technical jargon**: Use user-friendly language

## Troubleshooting

### Common Issues

**Toasts not showing:**
- Ensure ToastContainer is mounted in your app
- Check if toast service is properly initialized
- Verify toast options are valid

**Toasts not dismissing:**
- Check duration settings
- Verify dismiss handlers are working
- Check for JavaScript errors preventing cleanup

**Styling issues:**
- Ensure CSS transitions are loaded
- Check theme integration
- Verify responsive breakpoints

**Memory leaks:**
- Properly cleanup dismissed toasts
- Remove event listeners
- Clear intervals and timeouts

### Debug Mode

```typescript
// Enable toast debugging
toastService.setDefaults({
  duration: 0, // Persistent for debugging
  position: 'top-center'
})

// Log all toast operations
const originalShow = toastService.show
toastService.show = function(options) {
  console.log('Toast created:', options)
  return originalShow.call(this, options)
}
```

## Advanced Features

### Custom Toast Types

```typescript
// Define custom toast types
const customTypes = {
  URGENT: {
    type: 'urgent',
    icon: 'mdi-alert-circle',
    color: '#ff1744',
    duration: 0, // Persistent
    position: 'top-center'
  },
  CELEBRATION: {
    type: 'celebration',
    icon: 'mdi-party-popper',
    color: '#ff9800',
    duration: 8000,
    position: 'top-center'
  }
}

// Usage
toastService.show({
  ...customTypes.URGENT,
  message: 'Critical system alert!'
})
```

### Toast Middleware

```typescript
// Intercept toast creation
const originalShow = toastService.show
toastService.show = function(options) {
  // Add timestamp
  options.createdAt = new Date()

  // Add user context
  options.userId = getCurrentUser()?.id

  // Log for analytics
  logToastEvent(options)

  return originalShow.call(this, options)
}
```

## API Reference

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `success(message, options?)` | `message: string, options?: ToastOptions` | `string` | Show success toast |
| `error(message, options?)` | `message: string, options?: ToastOptions` | `string` | Show error toast |
| `warning(message, options?)` | `message: string, options?: ToastOptions` | `string` | Show warning toast |
| `info(message, options?)` | `message: string, options?: ToastOptions` | `string` | Show info toast |
| `loading(message, options?)` | `message: string, options?: ToastOptions` | `string` | Show loading toast |
| `show(options)` | `options: ToastOptions` | `string` | Show custom toast |
| `update(id, updates)` | `id: string, updates: Partial<ToastOptions>` | `void` | Update existing toast |
| `dismiss(id)` | `id: string` | `void` | Dismiss specific toast |
| `dismissAll()` | - | `void` | Dismiss all toasts |
| `dismissByType(type)` | `type: ToastType` | `void` | Dismiss toasts by type |
| `getToasts()` | - | `Toast[]` | Get all active toasts |
| `getToast(id)` | `id: string` | `Toast \| undefined` | Get specific toast |
| `setDefaults(options)` | `options: Partial<ToastOptions>` | `void` | Update default options |
| `promise(promise, messages, options?)` | `promise: Promise<T>, messages: object, options?: ToastOptions` | `Promise<T>` | Promise-based toast |

### Toast Options

```typescript
interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading'
  title?: string
  message: string
  icon?: string
  duration?: number
  position?: ToastPosition
  dismissible?: boolean
  pauseOnHover?: boolean
  showProgress?: boolean
  actions?: Array<{
    label: string
    action: string | (() => void)
  }>
}
```

### Toast Positions

```typescript
type ToastPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
```

## Next Steps

- **[Toast Components Documentation](../../components/common)** - Toast UI components
- **[Logger Service Documentation](../services/logger)** - Logging and error handling
- **[API Client Service Documentation](../services/api-client)** - HTTP client integration
- **[Composables Documentation](../../composables)** - Vue composables for notifications
