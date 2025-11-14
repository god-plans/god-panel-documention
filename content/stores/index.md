---
title: State Management
description: Pinia stores for state management
category: stores
order: 0
---

# State Management

God Panel uses [Pinia](https://pinia.vuejs.org/) as its state management solution. Pinia provides a lightweight, type-safe, and intuitive way to manage application state with excellent TypeScript support and developer experience.

## Overview

The application uses Pinia stores to manage different aspects of the application state:

- **Authentication Store** - User authentication and session management
- **Settings Store** - Application settings and user preferences

## Pinia Benefits

- 🚀 **Type-safe** - Full TypeScript support with auto-completion
- 🔧 **Developer Tools** - Built-in devtools integration
- 📦 **Lightweight** - Minimal bundle size impact
- ⚡ **Reactive** - Seamless Vue 3 reactivity integration
- 🏗️ **Modular** - Organized by feature/domain
- 🔄 **SSR Compatible** - Works perfectly with Nuxt's server-side rendering

## Store Structure

Each store follows a consistent pattern:

```typescript
export const useStoreName = defineStore('storeName', () => {
  // State (reactive refs)
  const state = ref(initialValue)

  // Getters (computed properties)
  const computedValue = computed(() => deriveFromState(state.value))

  // Actions (functions that modify state)
  const action = async (payload) => {
    // Modify state
    state.value = newValue
  }

  return {
    // Expose state, getters, and actions
    state,
    computedValue,
    action
  }
})
```

## Available Stores

### 🔐 Authentication Store

Manages user authentication, login/logout, and user profile data.

- **File**: `stores/auth.ts`
- **Features**:
  - User login/logout
  - Registration
  - Profile management
  - Demo login for development
  - Role-based permissions
  - Token management

### ⚙️ Settings Store

Manages application settings and user preferences.

- **File**: `stores/settings.ts`
- **Features**:
  - Theme switching (light/dark)
  - Layout preferences
  - Color customization
  - Language direction (LTR/RTL)
  - Cookie-based persistence
  - SSR compatibility

## Basic Usage

```typescript
import { useAuthStore, useSettingsStore } from '~/stores'
import { storeToRefs } from 'pinia'

// Use in components
const authStore = useAuthStore()
const settingsStore = useSettingsStore()

// Reactive destructuring
const { user, isAuthenticated } = storeToRefs(authStore)
const { settings, isDarkMode } = storeToRefs(settingsStore)

// Actions
await authStore.login(credentials)
settingsStore.updateField('colorScheme', 'dark')
```

## Store Composition

Stores use the Composition API pattern for better TypeScript support and tree-shaking:

```typescript
// ✅ Composition API (Recommended)
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials) => {
    // Login logic
    user.value = await api.login(credentials)
  }

  return {
    user,
    isAuthenticated,
    login
  }
})
```

## Reactive State Management

### Reactive References

```typescript
const authStore = useAuthStore()

// Reactive state
const user = computed(() => authStore.user)
const isLoggedIn = computed(() => authStore.isAuthenticated)

// Auto-updates when store state changes
watch(user, (newUser) => {
  if (newUser) {
    console.log('User logged in:', newUser.displayName)
  }
})
```

### Store-to-Refs

```typescript
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const settingsStore = useSettingsStore()

// Destructure reactive references
const {
  user,
  loading,
  isAuthenticated,
  displayName
} = storeToRefs(authStore)

const {
  settings,
  openDrawer,
  isDarkMode
} = storeToRefs(settingsStore)
```

## SSR Compatibility

All stores are designed to work with Nuxt's server-side rendering:

```typescript
// Server-side safe operations
const settingsStore = useSettingsStore()

// Cookies work on both server and client
const userSettings = settingsStore.settings

// Conditional client-side operations
if (process.client) {
  // Browser-only operations
  localStorage.setItem('key', 'value')
}
```

## Best Practices

### 1. Store Organization

```typescript
// ✅ Good: Feature-based stores
stores/
├── auth.ts       # Authentication
├── settings.ts   # User preferences
├── products.ts   # Product management
└── cart.ts       # Shopping cart
```

### 2. Type Safety

```typescript
// ✅ Good: Define interfaces
interface User {
  id: string
  email: string
  role: 'admin' | 'user'
}

// Use in store
const user = ref<User | null>(null)
```

### 3. Error Handling

```typescript
// ✅ Good: Handle errors in actions
const login = async (credentials) => {
  try {
    const response = await api.login(credentials)
    user.value = response.user
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}
```

### 4. Reactive Getters

```typescript
// ✅ Good: Use computed for derived state
const isAdmin = computed(() => user.value?.role === 'admin')
const displayName = computed(() => user.value?.name || 'Guest')
```

## Testing Stores

```typescript
// store.test.ts
import { setActivePinia, createPinia } from 'pinia'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should login user', async () => {
    const authStore = useAuthStore()

    await authStore.login({
      email: 'test@example.com',
      password: 'password'
    })

    expect(authStore.isAuthenticated).toBe(true)
  })
})
```

## Performance Tips

1. **Lazy Loading**: Import stores only when needed
2. **Selective Reactivity**: Use `storeToRefs` for better performance
3. **Computed Caching**: Let Vue cache computed properties
4. **Action Batching**: Group multiple state changes

## Migration from Vuex

If migrating from Vuex to Pinia:

```typescript
// Vuex 4
const store = useStore()
store.commit('setUser', user)
store.dispatch('login', credentials)

// Pinia
const authStore = useAuthStore()
authStore.user = user
await authStore.login(credentials)
```

## Next Steps

Explore the individual store documentation:

- **[Authentication Store](/content/stores/auth)** - User management and authentication
- **[Settings Store](/content/stores/settings)** - Application preferences and theming

For more advanced Pinia features, check the [official Pinia documentation](https://pinia.vuejs.org/).

