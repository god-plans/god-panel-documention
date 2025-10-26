---
title: Code Examples
description: Reusable code snippets and examples for God Panel development
category: examples
order: 3
---

# Code Examples

A collection of reusable code snippets, utilities, and examples for God Panel development.

## Authentication Utilities

### JWT Token Management

```typescript
// composables/useAuthTokens.ts
export const useAuthTokens = () => {
  const accessToken = useCookie('access_token', {
    secure: true,
    sameSite: 'strict',
    httpOnly: false // For client-side access
  })

  const refreshToken = useCookie('refresh_token', {
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30 // 30 days
  })

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access
    refreshToken.value = refresh
  }

  const clearTokens = () => {
    accessToken.value = null
    refreshToken.value = null
  }

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 < Date.now()
    } catch {
      return true
    }
  }

  const refreshAccessToken = async (): Promise<string | null> => {
    if (!refreshToken.value || isTokenExpired(refreshToken.value)) {
      clearTokens()
      await navigateTo('/login')
      return null
    }

    try {
      const response = await $fetch('/api/auth/refresh', {
        method: 'POST',
        body: { refreshToken: refreshToken.value }
      })

      accessToken.value = response.access_token
      return response.access_token
    } catch (error) {
      clearTokens()
      await navigateTo('/login')
      return null
    }
  }

  return {
    accessToken: readonly(accessToken),
    refreshToken: readonly(refreshToken),
    setTokens,
    clearTokens,
    isTokenExpired,
    refreshAccessToken
  }
}
```

### Password Validation

```typescript
// utils/password-validation.ts
export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
  strength: 'weak' | 'medium' | 'strong'
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = []
  let score = 0

  // Length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  } else {
    score += 1
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  } else {
    score += 1
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  } else {
    score += 1
  }

  // Number check
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  } else {
    score += 1
  }

  // Special character check
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  } else {
    score += 1
  }

  // Determine strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak'
  if (score >= 4) strength = 'strong'
  else if (score >= 3) strength = 'medium'

  return {
    isValid: errors.length === 0,
    errors,
    strength
  }
}

export const generatePassword = (length: number = 12): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  const allChars = lowercase + uppercase + numbers + symbols
  let password = ''

  // Ensure at least one character from each category
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]

  // Fill remaining length
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}
```

## API Client Utilities

### HTTP Client with Retry Logic

```typescript
// composables/useApiClient.ts
export interface ApiConfig {
  baseURL: string
  timeout: number
  retries: number
  retryDelay: number
}

export const useApiClient = (config: Partial<ApiConfig> = {}) => {
  const defaultConfig: ApiConfig = {
    baseURL: '/api',
    timeout: 10000,
    retries: 3,
    retryDelay: 1000
  }

  const finalConfig = { ...defaultConfig, ...config }

  const request = async <T>(
    endpoint: string,
    options: any = {}
  ): Promise<T> => {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${finalConfig.baseURL}${endpoint}`

    let lastError: Error

    for (let attempt = 0; attempt <= finalConfig.retries; attempt++) {
      try {
        const response = await $fetch<T>(url, {
          timeout: finalConfig.timeout,
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          }
        })

        return response
      } catch (error: any) {
        lastError = error

        // Don't retry on 4xx errors (except 429)
        if (error.status >= 400 && error.status < 500 && error.status !== 429) {
          throw error
        }

        // Don't retry on the last attempt
        if (attempt === finalConfig.retries) {
          throw error
        }

        // Wait before retrying
        await new Promise(resolve =>
          setTimeout(resolve, finalConfig.retryDelay * Math.pow(2, attempt))
        )
      }
    }

    throw lastError!
  }

  return {
    get: <T>(endpoint: string, params?: Record<string, any>) =>
      request<T>(endpoint, { method: 'GET', params }),

    post: <T>(endpoint: string, data?: any) =>
      request<T>(endpoint, { method: 'POST', body: data }),

    put: <T>(endpoint: string, data?: any) =>
      request<T>(endpoint, { method: 'PUT', body: data }),

    patch: <T>(endpoint: string, data?: any) =>
      request<T>(endpoint, { method: 'PATCH', body: data }),

    delete: <T>(endpoint: string) =>
      request<T>(endpoint, { method: 'DELETE' })
  }
}
```

### API Response Handling

```typescript
// types/api.ts
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

export interface ApiError {
  statusCode: number
  statusMessage: string
  data?: any
}

// composables/useApiResponse.ts
export const useApiResponse = () => {
  const handleApiError = (error: any): ApiError => {
    if (error.response) {
      return {
        statusCode: error.response.status,
        statusMessage: error.response.statusText,
        data: error.response.data
      }
    }

    return {
      statusCode: 500,
      statusMessage: error.message || 'An unexpected error occurred'
    }
  }

  const isValidationError = (error: ApiError): boolean => {
    return error.statusCode === 422
  }

  const getValidationErrors = (error: ApiError): Record<string, string[]> => {
    return error.data?.errors || {}
  }

  const showApiError = (error: ApiError): string => {
    if (isValidationError(error)) {
      const validationErrors = getValidationErrors(error)
      return Object.values(validationErrors).flat().join(', ')
    }

    return error.statusMessage
  }

  return {
    handleApiError,
    isValidationError,
    getValidationErrors,
    showApiError
  }
}
```

## Form Utilities

### Form Validation

```typescript
// composables/useFormValidation.ts
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export const useFormValidation = () => {
  const validateField = (
    value: any,
    rules: ValidationRule,
    fieldName: string
  ): string | null => {
    // Required validation
    if (rules.required && (value === null || value === undefined || value === '')) {
      return `${fieldName} is required`
    }

    // Skip other validations if value is empty and not required
    if (!value) return null

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${fieldName} must be no more than ${rules.maxLength} characters`
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return `${fieldName} format is invalid`
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value)
    }

    return null
  }

  const validateForm = (
    data: Record<string, any>,
    rules: Record<string, ValidationRule>
  ): ValidationResult => {
    const errors: Record<string, string> = {}

    for (const [field, fieldRules] of Object.entries(rules)) {
      const error = validateField(data[field], fieldRules, field)
      if (error) {
        errors[field] = error
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  return {
    validateField,
    validateForm
  }
}
```

### Debounced Input

```typescript
// composables/useDebounce.ts
export const useDebounce = (callback: Function, delay: number = 300) => {
  const timeoutRef = ref<NodeJS.Timeout | null>(null)

  const debouncedCallback = (...args: any[]) => {
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value)
    }

    timeoutRef.value = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  const cancel = () => {
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value)
      timeoutRef.value = null
    }
  }

  onUnmounted(() => {
    cancel()
  })

  return {
    debouncedCallback,
    cancel
  }
}

// Usage in component
const searchQuery = ref('')
const { debouncedCallback: debouncedSearch } = useDebounce((query: string) => {
  performSearch(query)
}, 500)
```

## Date and Time Utilities

### Date Formatting

```typescript
// composables/useDateFormat.ts
export const useDateFormat = () => {
  const formatDate = (
    date: Date | string | number,
    options: Intl.DateTimeFormatOptions = {}
  ): string => {
    const dateObj = new Date(date)

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }

    return new Intl.DateTimeFormat('en-US', {
      ...defaultOptions,
      ...options
    }).format(dateObj)
  }

  const formatRelativeTime = (date: Date | string | number): string => {
    const dateObj = new Date(date)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 }
    ]

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds)
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
      }
    }

    return 'Just now'
  }

  const formatDateTime = (date: Date | string | number): string => {
    return formatDate(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatTime = (date: Date | string | number): string => {
    const dateObj = new Date(date)

    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(dateObj)
  }

  const isToday = (date: Date | string | number): boolean => {
    const dateObj = new Date(date)
    const today = new Date()

    return dateObj.toDateString() === today.toDateString()
  }

  const isYesterday = (date: Date | string | number): boolean => {
    const dateObj = new Date(date)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    return dateObj.toDateString() === yesterday.toDateString()
  }

  return {
    formatDate,
    formatRelativeTime,
    formatDateTime,
    formatTime,
    isToday,
    isYesterday
  }
}
```

## File Upload Utilities

### File Upload Handler

```typescript
// composables/useFileUpload.ts
export interface UploadOptions {
  maxSize?: number // in bytes
  allowedTypes?: string[]
  onProgress?: (progress: number) => void
  onSuccess?: (result: any) => void
  onError?: (error: string) => void
}

export const useFileUpload = () => {
  const uploadFile = async (
    file: File,
    endpoint: string,
    options: UploadOptions = {}
  ): Promise<any> => {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB
      allowedTypes = ['image/*', 'application/pdf'],
      onProgress,
      onSuccess,
      onError
    } = options

    // Validate file size
    if (file.size > maxSize) {
      const error = `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
      onError?.(error)
      throw new Error(error)
    }

    // Validate file type
    const isValidType = allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1))
      }
      return file.type === type
    })

    if (!isValidType) {
      const error = `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
      onError?.(error)
      throw new Error(error)
    }

    try {
      const formData = new FormData()
      formData.append('file', file)

      const result = await $fetch(endpoint, {
        method: 'POST',
        body: formData,
        onResponseProgress: (progress) => {
          if (onProgress) {
            const percentage = Math.round((progress.progress || 0) * 100)
            onProgress(percentage)
          }
        }
      })

      onSuccess?.(result)
      return result
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message
      onError?.(errorMessage)
      throw error
    }
  }

  const uploadMultipleFiles = async (
    files: File[],
    endpoint: string,
    options: UploadOptions = {}
  ): Promise<any[]> => {
    const results: any[] = []
    const { onProgress } = options

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      try {
        const result = await uploadFile(file, endpoint, {
          ...options,
          onProgress: (progress) => {
            // Calculate overall progress
            const overallProgress = Math.round((i / files.length) * 100 + (progress / files.length))
            onProgress?.(overallProgress)
          }
        })

        results.push(result)
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error)
        results.push({ error: error.message, file: file.name })
      }
    }

    return results
  }

  const generateFilePreview = (file: File): string | null => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file)
    }

    return null
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return {
    uploadFile,
    uploadMultipleFiles,
    generateFilePreview,
    formatFileSize
  }
}
```

## Theme and Styling Utilities

### CSS Custom Properties Manager

```typescript
// composables/useThemeManager.ts
export const useThemeManager = () => {
  const cssVariables = ref<Record<string, string>>({})

  const setCSSVariable = (property: string, value: string) => {
    if (process.client) {
      document.documentElement.style.setProperty(property, value)
      cssVariables.value[property] = value
    }
  }

  const getCSSVariable = (property: string): string => {
    if (process.client) {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(property)
        .trim()
    }
    return cssVariables.value[property] || ''
  }

  const setThemeColors = (colors: Record<string, string>) => {
    Object.entries(colors).forEach(([key, value]) => {
      setCSSVariable(`--color-${key}`, value)
    })
  }

  const loadTheme = async (themeName: string) => {
    try {
      const theme = await $fetch(`/themes/${themeName}.json`)
      setThemeColors(theme.colors)

      if (process.client) {
        localStorage.setItem('current-theme', themeName)
      }

      return theme
    } catch (error) {
      console.error('Failed to load theme:', error)
      throw error
    }
  }

  const generateColorPalette = (baseColor: string): Record<string, string> => {
    // This would typically use a color manipulation library
    // For now, return a simple palette
    return {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: baseColor,
      900: '#0c4a6e'
    }
  }

  return {
    setCSSVariable,
    getCSSVariable,
    setThemeColors,
    loadTheme,
    generateColorPalette
  }
}
```

### Responsive Breakpoints

```typescript
// composables/useBreakpoints.ts
export const useBreakpoints = () => {
  const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }

  const currentBreakpoint = ref<keyof typeof breakpoints>('xs')
  const isMobile = ref(true)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  const updateBreakpoint = () => {
    if (process.client) {
      const width = window.innerWidth

      if (width >= breakpoints['2xl']) {
        currentBreakpoint.value = '2xl'
        isMobile.value = false
        isTablet.value = false
        isDesktop.value = true
      } else if (width >= breakpoints.xl) {
        currentBreakpoint.value = 'xl'
        isMobile.value = false
        isTablet.value = false
        isDesktop.value = true
      } else if (width >= breakpoints.lg) {
        currentBreakpoint.value = 'lg'
        isMobile.value = false
        isTablet.value = false
        isDesktop.value = true
      } else if (width >= breakpoints.md) {
        currentBreakpoint.value = 'md'
        isMobile.value = false
        isTablet.value = true
        isDesktop.value = false
      } else if (width >= breakpoints.sm) {
        currentBreakpoint.value = 'sm'
        isMobile.value = false
        isTablet.value = true
        isDesktop.value = false
      } else {
        currentBreakpoint.value = 'xs'
        isMobile.value = true
        isTablet.value = false
        isDesktop.value = false
      }
    }
  }

  const isAbove = (breakpoint: keyof typeof breakpoints): boolean => {
    if (process.client) {
      return window.innerWidth >= breakpoints[breakpoint]
    }
    return false
  }

  const isBelow = (breakpoint: keyof typeof breakpoints): boolean => {
    if (process.client) {
      return window.innerWidth < breakpoints[breakpoint]
    }
    return false
  }

  onMounted(() => {
    updateBreakpoint()

    if (process.client) {
      window.addEventListener('resize', updateBreakpoint)

      onUnmounted(() => {
        window.removeEventListener('resize', updateBreakpoint)
      })
    }
  })

  return {
    currentBreakpoint: readonly(currentBreakpoint),
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isDesktop: readonly(isDesktop),
    isAbove,
    isBelow,
    breakpoints: readonly(breakpoints)
  }
}
```

## Data Management Utilities

### Local Storage Manager

```typescript
// composables/useLocalStorage.ts
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const storedValue = ref<T>(defaultValue)

  // Load from localStorage on client side
  const loadFromStorage = () => {
    if (process.client) {
      try {
        const item = localStorage.getItem(key)
        if (item !== null) {
          storedValue.value = JSON.parse(item)
        }
      } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error)
      }
    }
  }

  // Save to localStorage
  const saveToStorage = (value: T) => {
    storedValue.value = value

    if (process.client) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error)
      }
    }
  }

  // Remove from localStorage
  const removeFromStorage = () => {
    storedValue.value = defaultValue

    if (process.client) {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error)
      }
    }
  }

  // Clear all localStorage
  const clearStorage = () => {
    if (process.client) {
      try {
        localStorage.clear()
        storedValue.value = defaultValue
      } catch (error) {
        console.error('Error clearing localStorage:', error)
      }
    }
  }

  // Watch for changes in other tabs
  const watchStorage = () => {
    if (process.client) {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key && e.newValue !== null) {
          storedValue.value = JSON.parse(e.newValue)
        } else if (e.key === key && e.newValue === null) {
          storedValue.value = defaultValue
        }
      }

      window.addEventListener('storage', handleStorageChange)

      onUnmounted(() => {
        window.removeEventListener('storage', handleStorageChange)
      })
    }
  }

  // Initialize
  loadFromStorage()
  watchStorage()

  return {
    value: readonly(storedValue),
    loadFromStorage,
    saveToStorage,
    removeFromStorage,
    clearStorage
  }
}
```

### Infinite Scroll

```typescript
// composables/useInfiniteScroll.ts
export interface InfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
  initialLoad?: boolean
}

export const useInfiniteScroll = (
  loadMore: () => Promise<void>,
  options: InfiniteScrollOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    initialLoad = true
  } = options

  const loading = ref(false)
  const hasMore = ref(true)
  const error = ref<string | null>(null)

  const observer = ref<IntersectionObserver | null>(null)

  const observeElement = (element: Element) => {
    if (observer.value) {
      observer.value.disconnect()
    }

    observer.value = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry.isIntersecting && hasMore.value && !loading.value) {
          loadMoreItems()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.value.observe(element)
  }

  const loadMoreItems = async () => {
    if (loading.value || !hasMore.value) return

    loading.value = true
    error.value = null

    try {
      await loadMore()
    } catch (err: any) {
      error.value = err.message || 'Failed to load more items'
      hasMore.value = false
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    loading.value = false
    hasMore.value = true
    error.value = null

    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  }

  const stop = () => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  }

  // Initial load
  if (initialLoad) {
    onMounted(() => {
      loadMoreItems()
    })
  }

  onUnmounted(() => {
    stop()
  })

  return {
    loading: readonly(loading),
    hasMore: readonly(hasMore),
    error: readonly(error),
    observeElement,
    loadMoreItems,
    reset,
    stop
  }
}
```

## Performance Utilities

### Virtual Scrolling

```typescript
// composables/useVirtualScroll.ts
export interface VirtualScrollOptions {
  itemHeight: number
  containerHeight: number
  overscan?: number
}

export const useVirtualScroll = (options: VirtualScrollOptions) => {
  const { itemHeight, containerHeight, overscan = 5 } = options

  const scrollTop = ref(0)
  const items = ref<any[]>([])

  const totalHeight = computed(() => items.value.length * itemHeight)

  const visibleRange = computed(() => {
    const start = Math.floor(scrollTop.value / itemHeight)
    const end = Math.ceil((scrollTop.value + containerHeight) / itemHeight)

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(items.value.length - 1, end + overscan)
    }
  })

  const visibleItems = computed(() => {
    const range = visibleRange.value
    return items.value.slice(range.start, range.end + 1).map((item, index) => ({
      ...item,
      index: range.start + index,
      offsetTop: (range.start + index) * itemHeight
    }))
  })

  const offsetY = computed(() => visibleRange.value.start * itemHeight)

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
  }

  const scrollToItem = (index: number) => {
    const targetScrollTop = index * itemHeight
    scrollTop.value = targetScrollTop

    if (process.client) {
      const container = document.querySelector('.virtual-scroll-container') as HTMLElement
      if (container) {
        container.scrollTop = targetScrollTop
      }
    }
  }

  return {
    totalHeight,
    visibleItems,
    offsetY,
    handleScroll,
    scrollToItem
  }
}
```

## Testing Utilities

### Mock Data Generators

```typescript
// utils/mockData.ts
export const generateMockUsers = (count: number = 10) => {
  const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Chris', 'Emma', 'Alex', 'Maria']
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson']
  const roles = ['admin', 'user', 'moderator']
  const statuses = ['active', 'inactive', 'pending']

  return Array.from({ length: count }, (_, index) => ({
    id: `user_${index + 1}`,
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    email: `user${index + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null
  }))
}

export const generateMockOrders = (count: number = 20) => {
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E']

  return Array.from({ length: count }, (_, index) => ({
    id: `order_${index + 1}`,
    customer: `Customer ${index + 1}`,
    email: `customer${index + 1}@example.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    total: Math.floor(Math.random() * 1000) + 50,
    items: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
      name: products[Math.floor(Math.random() * products.length)],
      quantity: Math.floor(Math.random() * 10) + 1,
      price: Math.floor(Math.random() * 100) + 10
    })),
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
  }))
}

export const generateMockStats = () => {
  return {
    users: {
      total: Math.floor(Math.random() * 10000) + 1000,
      active: Math.floor(Math.random() * 8000) + 500,
      new: Math.floor(Math.random() * 500) + 10,
      growth: (Math.random() * 40) - 20 // -20% to +20%
    },
    orders: {
      total: Math.floor(Math.random() * 5000) + 100,
      pending: Math.floor(Math.random() * 100) + 5,
      completed: Math.floor(Math.random() * 2000) + 50,
      revenue: Math.floor(Math.random() * 100000) + 10000,
      growth: (Math.random() * 60) - 30 // -30% to +30%
    },
    products: {
      total: Math.floor(Math.random() * 1000) + 50,
      active: Math.floor(Math.random() * 500) + 25,
      outOfStock: Math.floor(Math.random() * 50) + 1,
      categories: Math.floor(Math.random() * 20) + 5
    }
  }
}
```

## Error Handling Utilities

### Global Error Handler

```typescript
// composables/useErrorHandler.ts
export const useErrorHandler = () => {
  const handleError = (error: any, context?: string) => {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error)

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
      logErrorToService(error, context)
    }
  }

  const handleAsyncError = async (asyncFn: () => Promise<any>, context?: string) => {
    try {
      return await asyncFn()
    } catch (error) {
      handleError(error, context)
      throw error
    }
  }

  const withErrorBoundary = (component: any, fallback?: any) => {
    return {
      ...component,
      setup(props: any, ctx: any) {
        const error = ref<Error | null>(null)

        const resetError = () => {
          error.value = null
        }

        // Override error handler
        const originalErrorHandler = ctx.errorCaptured
        ctx.errorCaptured = (err: Error) => {
          error.value = err
          handleError(err, 'Component Error')
          return false // Don't propagate error
        }

        onUnmounted(() => {
          ctx.errorCaptured = originalErrorHandler
        })

        return () => {
          if (error.value && fallback) {
            return h(fallback, { error: error.value, reset: resetError })
          }
          return component.setup ? component.setup(props, ctx) : component
        }
      }
    }
  }

  return {
    handleError,
    handleAsyncError,
    withErrorBoundary
  }
}
```

## Next Steps

These utilities provide a solid foundation for building robust applications. For more advanced examples:

- **API Integration Patterns** - Complex API handling strategies
- **State Management Examples** - Advanced Pinia store patterns
- **Testing Examples** - Comprehensive testing strategies
- **Performance Optimization** - Advanced performance techniques

## Contributing

Have a useful utility or code example? We'd love to see it!

1. **Test your code** thoroughly
2. **Add documentation** with usage examples
3. **Follow TypeScript best practices**
4. **Submit a pull request** with a clear description

---

**Next**: Check out the **[Component Library Documentation](../components)** for more specific component examples!
