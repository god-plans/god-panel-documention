---
title: Composables Overview
description: Vue composables for API integration, state management, and common functionality
category: composables
order: 5
---

# Composables Overview

God Panel provides a comprehensive set of Vue composables that follow the Composition API patterns. These composables handle API integration, state management, UI interactions, and common utility functions.

## Composable Categories

### 🔗 API & Data Composables
- **useApi**: Generic API calls with loading states and error handling
- **useAuth**: Authentication operations (login, logout, profile)
- **useUsers**: User management operations (CRUD operations)
- **useDashboard**: Dashboard data fetching and analytics
- **useSettings**: User settings and preferences management
- **useApiData**: Reactive data fetching with caching support

### 🛠️ Utility Composables
- **useBoolean**: Boolean state management with toggle functions
- **useLocalStorage**: Persistent localStorage state management
- **useDynamicFonts**: Dynamic font loading and management
- **useErrorHandler**: Centralized error handling and reporting
- **useToast**: Toast notification management

## API Composables

### useApi

Generic composable for API calls with reactive loading states and error handling.

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>

    <button @click="fetchData">Refresh</button>
  </div>
</template>

<script setup>
import { useApi } from '~/composables/useApi'

const { data, loading, error, execute } = useApi()

const fetchData = async () => {
  await execute(async () => {
    const response = await $fetch('/api/users')
    return response
  }, {
    onSuccess: (result) => {
      console.log('Data fetched:', result)
    },
    onError: (error) => {
      console.error('Failed to fetch:', error)
    }
  })
}

// Auto-fetch on mount
onMounted(() => {
  fetchData()
})
</script>
```

#### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `data` | `Ref<T \| null>` | The API response data |
| `loading` | `Ref<boolean>` | Loading state |
| `error` | `Ref<string \| null>` | Error message if any |
| `execute` | `Function` | Execute API call function |
| `reset` | `Function` | Reset all state |

#### Options

```typescript
interface ExecuteOptions {
  onSuccess?: (result: any) => void
  onError?: (error: string) => void
  immediate?: boolean
}
```

### useAuth

Composable for authentication operations and session management.

```vue
<template>
  <div>
    <div v-if="!isAuthenticated">
      <input v-model="credentials.email" placeholder="Email" />
      <input v-model="credentials.password" type="password" placeholder="Password" />
      <button @click="login" :disabled="loading">Login</button>
    </div>
    <div v-else>
      <p>Welcome, {{ user?.name }}!</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useApi'

const { login: authLogin, logout, getProfile, isAuthenticated } = useAuth()
const loading = ref(false)
const user = ref(null)
const credentials = ref({
  email: '',
  password: ''
})

const login = async () => {
  loading.value = true
  try {
    const result = await authLogin(credentials.value)
    if (result.success) {
      user.value = result.user
      await navigateTo('/dashboard')
    }
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}

const logoutHandler = async () => {
  await logout()
  user.value = null
  await navigateTo('/auth/login')
}

// Get user profile
const loadProfile = async () => {
  try {
    const profile = await getProfile()
    user.value = profile
  } catch (error) {
    console.error('Failed to load profile:', error)
  }
}

onMounted(() => {
  loadProfile()
})
</script>
```

#### Available Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `login` | `credentials: { email: string, password: string }` | Authenticate user |
| `logout` | - | Clear session and logout |
| `refreshToken` | - | Refresh authentication token |
| `getProfile` | - | Get current user profile |
| `isAuthenticated` | - | Check if user is authenticated |

### useUsers

Composable for user management operations.

```vue
<template>
  <div>
    <div v-for="user in users" :key="user.id">
      {{ user.name }} - {{ user.email }}
    </div>

    <button @click="loadUsers">Load Users</button>
    <button @click="createUser">Create User</button>
  </div>
</template>

<script setup>
import { useUsers } from '~/composables/useApi'

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = useUsers()

const users = ref([])
const loading = ref(false)

const loadUsers = async () => {
  loading.value = true
  try {
    const result = await getUsers({
      page: 1,
      limit: 10,
      role: 'admin'
    })
    users.value = result.data
  } catch (error) {
    console.error('Failed to load users:', error)
  } finally {
    loading.value = false
  }
}

const createUserHandler = async () => {
  try {
    const newUser = await createUser({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    })
    users.value.push(newUser)
  } catch (error) {
    console.error('Failed to create user:', error)
  }
}
</script>
```

### useDashboard

Composable for dashboard data and analytics.

```vue
<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Users</h3>
        <span>{{ stats.totalUsers }}</span>
      </div>
      <div class="stat-card">
        <h3>Revenue</h3>
        <span>${{ stats.totalRevenue }}</span>
      </div>
    </div>

    <div class="chart-container">
      <!-- Chart component -->
    </div>
  </div>
</template>

<script setup>
import { useDashboard } from '~/composables/useApi'

const {
  getStats,
  getOverview,
  getAnalytics,
  refreshData
} = useDashboard()

const stats = ref({})
const overview = ref({})
const loading = ref(false)

const loadDashboardData = async () => {
  loading.value = true
  try {
    const [statsData, overviewData] = await Promise.all([
      getStats(),
      getOverview()
    ])

    stats.value = statsData
    overview.value = overviewData
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const loadAnalytics = async () => {
  try {
    const analytics = await getAnalytics({
      period: '30d',
      metrics: ['users', 'revenue', 'conversion']
    })
    // Process analytics data for charts
  } catch (error) {
    console.error('Failed to load analytics:', error)
  }
}

onMounted(() => {
  loadDashboardData()
  loadAnalytics()
})
</script>
```

### useSettings

Composable for user settings and preferences management.

```vue
<template>
  <div class="settings">
    <div class="setting-group">
      <label>Theme</label>
      <select v-model="settings.theme" @change="updateSettings">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="auto">Auto</option>
      </select>
    </div>

    <div class="setting-group">
      <label>Language</label>
      <select v-model="settings.language" @change="updateSettings">
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { useSettings } from '~/composables/useApi'

const {
  getUserSettings,
  updateUserSettings,
  getPreferences,
  updatePreferences
} = useSettings()

const settings = ref({
  theme: 'light',
  language: 'en',
  notifications: true
})

const loadSettings = async () => {
  try {
    const userSettings = await getUserSettings()
    settings.value = { ...settings.value, ...userSettings }
  } catch (error) {
    console.error('Failed to load settings:', error)
  }
}

const updateSettingsHandler = async () => {
  try {
    await updateUserSettings(settings.value)
    // Show success message
  } catch (error) {
    console.error('Failed to update settings:', error)
  }
}

onMounted(() => {
  loadSettings()
})
</script>
```

### useApiData

Reactive data fetching composable with caching and auto-refresh.

```vue
<template>
  <div>
    <div v-if="loading">Loading posts...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <article v-for="post in data" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </article>
    </div>

    <button @click="refetch">Refresh</button>
  </div>
</template>

<script setup>
import { useApiData } from '~/composables/useApi'

const {
  data,
  loading,
  error,
  refetch,
  reset
} = useApiData(
  () => $fetch('/api/posts'),
  {
    immediate: true,
    errorHandler: (error) => {
      console.error('Failed to fetch posts:', error)
    }
  }
)

// Refetch data every 30 seconds
const { pause, resume } = useIntervalFn(refetch, 30000)
</script>
```

## Utility Composables

### useBoolean

Simple boolean state management with utility functions.

```vue
<template>
  <div>
    <button @click="toggle">Toggle</button>
    <button @click="setTrue">Set True</button>
    <button @click="setFalse">Set False</button>
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup>
import { useBoolean } from '~/composables/useBoolean'

const {
  value,
  setValue,
  setTrue,
  setFalse,
  toggle
} = useBoolean(false)

// Direct value manipulation
setValue(true)
setValue((prev) => !prev) // Functional update
</script>
```

#### Usage Examples

```vue
<script setup>
// Modal visibility
const { value: isModalOpen, toggle, setTrue, setFalse } = useBoolean()

// Form state
const { value: isSubmitting, setTrue, setFalse } = useBoolean()

// Loading states
const { value: isLoading, setTrue: startLoading, setFalse: stopLoading } = useBoolean()

// Feature toggles
const { value: isFeatureEnabled } = useBoolean(true)
</script>
```

### useLocalStorage

Persistent state management using localStorage with SSR safety.

```vue
<template>
  <div>
    <input v-model="userPreferences.theme" placeholder="Theme" />
    <input v-model="userPreferences.language" placeholder="Language" />
    <p>Settings are automatically saved to localStorage</p>
  </div>
</template>

<script setup>
import { useLocalStorage } from '~/composables/useLocalStorage'

const userPreferences = useLocalStorage('user-preferences', {
  theme: 'light',
  language: 'en',
  notifications: true
})

// Functional updates
const updateTheme = (newTheme: string) => {
  userPreferences.setValue((prev) => ({
    ...prev,
    theme: newTheme
  }))
}

// Reset to defaults
const resetPreferences = () => {
  userPreferences.removeValue()
}
</script>
```

#### Features

- **SSR Safe**: Works correctly during server-side rendering
- **Type Safe**: Full TypeScript support
- **Functional Updates**: Support for functional state updates
- **Error Handling**: Graceful handling of localStorage errors
- **Reactive**: Fully reactive state management

#### Usage Patterns

```vue
<script setup>
// Simple values
const isDarkMode = useLocalStorage('dark-mode', false)

// Complex objects
const settings = useLocalStorage('app-settings', {
  theme: 'light',
  fontSize: 14,
  sidebarCollapsed: false
})

// Arrays
const favoriteItems = useLocalStorage('favorites', [])

// Functional updates
const addFavorite = (item: any) => {
  favoriteItems.setValue((prev) => [...prev, item])
}

const removeFavorite = (itemId: string) => {
  favoriteItems.setValue((prev) => prev.filter(item => item.id !== itemId))
}
</script>
```

### useDynamicFonts

Dynamic font loading and management with Google Fonts integration.

```vue
<template>
  <div>
    <select v-model="selectedFont" @change="loadFont">
      <option v-for="font in availableFonts" :key="font" :value="font">
        {{ font }}
      </option>
    </select>
    <p>Current font: {{ selectedFont }}</p>
    <p>Available fonts: {{ availableFonts.join(', ') }}</p>
  </div>
</template>

<script setup>
import { useDynamicFonts } from '~/composables/useDynamicFonts'

const {
  loadFont,
  getFontDefinition,
  getAvailableFonts,
  loadedFonts
} = useDynamicFonts()

const selectedFont = ref('Inter')
const availableFonts = getAvailableFonts()

// Load font on mount
onMounted(() => {
  loadFont(selectedFont.value)
})

// Watch for font changes
watch(selectedFont, (newFont) => {
  if (newFont) {
    loadFont(newFont)
  }
})
</script>
```

#### Available Fonts

| Font | Weights | Use Case |
|------|---------|----------|
| Inter | 400, 500, 600, 700 | Modern, clean interface |
| Roboto | 400, 500, 700 | Google's design system |
| Poppins | 400, 500, 600, 700 | Friendly, rounded |
| Barlow | 400, 500, 600, 700 | Contemporary, geometric |
| DM Sans | 400, 500, 700 | Humanist, readable |
| Nunito Sans | 400, 600, 700 | Friendly, rounded |

#### Font Definition Interface

```typescript
interface FontDefinition {
  name: string
  family: string
  url?: string
  weights?: string[]
}
```

### useErrorHandler

Centralized error handling with toast notifications and logging.

```vue
<template>
  <div>
    <button @click="performRiskyOperation">
      Perform Risky Operation
    </button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { useErrorHandler } from '~/composables/useErrorHandler'

const { handleError, handleAsync, withErrorBoundary } = useErrorHandler()

const performRiskyOperation = async () => {
  try {
    // This might fail
    await riskyApiCall()
  } catch (error) {
    handleError(error, {
      showToast: true,
      toastMessage: 'Operation failed. Please try again.',
      logError: true,
      context: {
        operation: 'risky-operation',
        userId: currentUser.value?.id
      }
    })
  }
}

// Wrap async operations
const safeAsyncOperation = async () => {
  return handleAsync(
    () => riskyApiCall(),
    {
      showToast: true,
      toastMessage: 'Data saved successfully!',
      logError: true,
      onSuccess: (result) => {
        console.log('Operation succeeded:', result)
      },
      onError: (error) => {
        console.log('Operation failed:', error)
      }
    }
  )
}

// Error boundary for components
const safeComponentMethod = withErrorBoundary(
  riskyComponentMethod,
  {
    showToast: true,
    fallback: 'Fallback content'
  }
)
</script>
```

#### Error Handling Options

```typescript
interface ErrorHandlerOptions {
  showToast?: boolean
  toastMessage?: string
  logError?: boolean
  context?: Record<string, any>
  onSuccess?: (result: any) => void
  onError?: (error: AppError) => void
}
```

### useToast

Toast notification management with multiple types and positions.

```vue
<template>
  <div>
    <button @click="showSuccessToast">Success</button>
    <button @click="showErrorToast">Error</button>
    <button @click="showWarningToast">Warning</button>
    <button @click="showInfoToast">Info</button>
    <button @click="showLoadingToast">Loading</button>
  </div>
</template>

<script setup>
import { useToast } from '~/composables/useToast'

const {
  success,
  error,
  warning,
  info,
  loading,
  promise,
  removeToast,
  clearAll,
  toasts,
  updateConfig
} = useToast()

// Simple notifications
const showSuccessToast = () => {
  success('Operation completed successfully!')
}

const showErrorToast = () => {
  error('Something went wrong', {
    title: 'Error',
    duration: 8000,
    position: 'top-center'
  })
}

const showWarningToast = () => {
  warning('Please check your input', {
    title: 'Warning',
    actions: [
      { label: 'Fix', onClick: () => console.log('Fix clicked') }
    ]
  })
}

const showInfoToast = () => {
  info('New update available', {
    title: 'Update',
    duration: 10000,
    position: 'top-right'
  })
}

// Loading toast
const showLoadingToast = () => {
  loading('Processing...', {
    title: 'Loading',
    position: 'top-center'
  })
}

// Promise-based toast
const handleAsyncOperation = async () => {
  const result = await promise(
    asyncOperation(),
    {
      loading: 'Saving data...',
      success: 'Data saved successfully!',
      error: 'Failed to save data'
    }
  )
  return result
}

// Toast management
const dismissToast = (id: string) => {
  removeToast(id)
}

const clearAllToasts = () => {
  clearAll()
}

// Configure toast settings
updateConfig({
  position: 'bottom-right',
  duration: 5000,
  maxToasts: 3
})
</script>
```

#### Toast Types

| Type | Color | Icon | Use Case |
|------|-------|------|----------|
| success | Green | Check circle | Successful operations |
| error | Red | Alert circle | Errors and failures |
| warning | Orange | Alert triangle | Warnings and cautions |
| info | Blue | Info circle | Information and updates |
| loading | Primary | Spinner | Loading states |

#### Toast Positions

- `top-left`, `top-center`, `top-right`
- `bottom-left`, `bottom-center`, `bottom-right`

## Advanced Usage

### Combining Composables

```vue
<script setup>
// Combine multiple composables for complex functionality
const { data, loading, error, execute } = useApi()
const { success, error: showError } = useToast()
const { handleError } = useErrorHandler()

const fetchUserData = async () => {
  await execute(async () => {
    return await $fetch(`/api/users/${userId.value}`)
  }, {
    onSuccess: (userData) => {
      success(`User ${userData.name} loaded successfully!`)
    },
    onError: (errorMessage) => {
      handleError(new Error(errorMessage), {
        showToast: false // Already shown by execute
      })
    }
  })
}
</script>
```

### Reactive Data with Caching

```vue
<script setup>
// Auto-refreshing data with caching
const { data: users, refetch } = useApiData(
  () => $fetch('/api/users'),
  {
    immediate: true
  }
)

// Refresh data every 30 seconds
const { pause, resume } = useIntervalFn(refetch, 30000)

// Manual refresh with loading state
const refreshUsers = async () => {
  await refetch()
  success('Users refreshed!')
}
</script>
```

### Global State Management

```vue
<script setup>
// Persistent settings across the app
const theme = useLocalStorage('app-theme', 'light')
const fontSize = useLocalStorage('font-size', 16)
const sidebarCollapsed = useLocalStorage('sidebar-collapsed', false)

// Reactive settings
watch(theme.value, (newTheme) => {
  // Apply theme changes
  document.documentElement.setAttribute('data-theme', newTheme)
})

watch(fontSize.value, (newSize) => {
  // Apply font size changes
  document.documentElement.style.fontSize = `${newSize}px`
})
</script>
```

## Best Practices

### API Composables

1. **Always handle loading states** in UI components
2. **Provide meaningful error messages** for users
3. **Use appropriate caching** for frequently accessed data
4. **Implement retry logic** for critical operations

### State Management

1. **Use useLocalStorage** for persistent user preferences
2. **Prefer useBoolean** for simple boolean state
3. **Use reactive references** for complex state objects
4. **Implement proper cleanup** for subscriptions

### Error Handling

1. **Use useErrorHandler** for consistent error management
2. **Provide context** when logging errors
3. **Show user-friendly messages** via toasts
4. **Implement fallback UI** for error states

### Performance

1. **Lazy load** heavy composables when needed
2. **Use computed properties** for derived state
3. **Implement proper cleanup** in composables
4. **Monitor memory usage** for long-running applications

## Testing Composables

```vue
<script setup>
// Example composable test
describe('useBoolean', () => {
  it('should manage boolean state correctly', () => {
    const { value, setTrue, setFalse, toggle } = useBoolean(false)

    expect(value.value).toBe(false)

    setTrue()
    expect(value.value).toBe(true)

    setFalse()
    expect(value.value).toBe(false)

    toggle()
    expect(value.value).toBe(true)
  })
})

describe('useLocalStorage', () => {
  it('should persist state to localStorage', () => {
    const testValue = useLocalStorage('test-key', 'default')

    testValue.setValue('new value')
    expect(testValue.value.value).toBe('new value')

    // Simulate page reload
    const newInstance = useLocalStorage('test-key', 'default')
    expect(newInstance.value.value).toBe('new value')
  })
})
</script>
```

## Troubleshooting

### Common Issues

**Composables not reactive:**
- Ensure you're using `ref()` or `reactive()` properly
- Check that you're accessing `.value` for refs
- Verify composable is properly imported

**LocalStorage not persisting:**
- Check browser console for localStorage errors
- Verify SSR compatibility
- Ensure JSON serializable data

**API calls not working:**
- Verify API endpoints are correct
- Check authentication tokens
- Review error handling

**Toast notifications not showing:**
- Ensure ToastContainer is mounted in your app
- Check toast service configuration
- Verify toast options are valid

## Integration Examples

### Complete User Management

```vue
<template>
  <div class="user-management">
    <!-- User List -->
    <div v-if="loading">Loading users...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button @click="editUser(user)">Edit</button>
        <button @click="deleteUser(user.id)">Delete</button>
      </div>
    </div>

    <!-- Add User Form -->
    <form @submit="createUser" v-if="showForm">
      <input v-model="newUser.name" placeholder="Name" required />
      <input v-model="newUser.email" placeholder="Email" type="email" required />
      <button type="submit" :disabled="formLoading">Create</button>
    </form>
  </div>
</template>

<script setup>
import { useApi, useUsers } from '~/composables/useApi'
import { useToast } from '~/composables/useToast'
import { useBoolean } from '~/composables/useBoolean'

const { success, error: showError } = useToast()
const { getUsers, createUser: createUserApi, deleteUser: deleteUserApi } = useUsers()
const { value: showForm, setTrue: showFormFn, setFalse: hideForm } = useBoolean()

const {
  data: users,
  loading,
  error,
  execute: loadUsers
} = useApi()

const formLoading = ref(false)
const newUser = ref({
  name: '',
  email: ''
})

const loadUsersData = async () => {
  await loadUsers(async () => {
    return await getUsers({ page: 1, limit: 50 })
  })
}

const createUserHandler = async () => {
  formLoading.value = true
  try {
    await createUserApi(newUser.value)
    success('User created successfully!')
    newUser.value = { name: '', email: '' }
    hideForm()
    await loadUsersData() // Refresh list
  } catch (err) {
    showError('Failed to create user')
  } finally {
    formLoading.value = false
  }
}

const deleteUserHandler = async (userId: string) => {
  if (!confirm('Are you sure you want to delete this user?')) return

  try {
    await deleteUserApi(userId)
    success('User deleted successfully!')
    await loadUsersData() // Refresh list
  } catch (err) {
    showError('Failed to delete user')
  }
}

onMounted(() => {
  loadUsersData()
})
</script>
```

### Settings Management

```vue
<script setup>
// Complete settings management example
import { useSettings } from '~/composables/useApi'
import { useLocalStorage } from '~/composables/useLocalStorage'
import { useDynamicFonts } from '~/composables/useDynamicFonts'
import { useToast } from '~/composables/useToast'

const {
  updateUserSettings,
  getUserSettings
} = useSettings()

const { loadFont, getAvailableFonts } = useDynamicFonts()
const { success } = useToast()

// Persistent settings
const theme = useLocalStorage('theme', 'light')
const fontFamily = useLocalStorage('font-family', 'Inter')
const fontSize = useLocalStorage('font-size', 16)
const sidebarCollapsed = useLocalStorage('sidebar-collapsed', false)

// Available fonts
const availableFonts = getAvailableFonts()

// Watch for theme changes
watch(theme.value, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
})

// Watch for font changes
watch(fontFamily.value, (newFont) => {
  loadFont(newFont)
})

// Save settings to server
const saveSettings = async () => {
  try {
    await updateUserSettings({
      theme: theme.value.value,
      fontFamily: fontFamily.value.value,
      fontSize: fontSize.value.value,
      sidebarCollapsed: sidebarCollapsed.value.value
    })
    success('Settings saved successfully!')
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}

// Load settings from server
const loadSettings = async () => {
  try {
    const serverSettings = await getUserSettings()
    theme.setValue(serverSettings.theme || 'light')
    fontFamily.setValue(serverSettings.fontFamily || 'Inter')
    fontSize.setValue(serverSettings.fontSize || 16)
    sidebarCollapsed.setValue(serverSettings.sidebarCollapsed || false)
  } catch (error) {
    console.error('Failed to load settings:', error)
  }
}

onMounted(() => {
  loadSettings()
  loadFont(fontFamily.value.value)
})
</script>
```

## Next Steps

- **[API Client Documentation](../services/api-client)** - HTTP client implementation
- **[Authentication Guide](../guides/authentication)** - Complete auth setup
- **[State Management Guide](../stores)** - Pinia store documentation
- **[Error Handling Guide](../guides/error-handling)** - Error management patterns
