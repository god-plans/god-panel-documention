---
title: Theming Guide
description: Customize the appearance of your God Panel application
category: guides
order: 3
---

# Theming Guide

Customize the visual appearance of your God Panel application with comprehensive theming options.

## Overview

God Panel provides a flexible theming system that allows you to customize colors, typography, spacing, and components to match your brand identity.

## Theme Configuration

### Basic Theme Setup

Create your theme configuration in `app/config/theme.ts`:

```typescript
// app/config/theme.ts
export interface ThemeConfig {
  // Colors
  primary: string
  secondary: string
  accent: string
  success: string
  warning: string
  error: string
  info: string

  // Neutral colors
  neutral: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }

  // Typography
  fontFamily: {
    sans: string[]
    mono: string[]
  }

  // Spacing
  spacing: Record<string, string>

  // Border radius
  borderRadius: {
    none: string
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }

  // Shadows
  boxShadow: {
    sm: string
    md: string
    lg: string
    xl: string
  }

  // Dark mode
  dark: boolean
}

export const defaultTheme: ThemeConfig = {
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#f59e0b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',

  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  },

  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace']
  },

  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem'
  },

  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },

  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },

  dark: false
}
```

### CSS Variables

Update your main CSS file to use CSS variables:

```css
/* app/assets/css/main.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;

  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #06b6d4;

  /* Neutral colors */
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;

  /* Typography */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --spacing-0: 0px;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;

  /* Border radius */
  --radius-none: 0px;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Dark mode */
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-primary-50: #eff6ff;
  --color-primary-500: #60a5fa;
  --color-primary-900: #3b82f6;

  --color-neutral-50: #0f172a;
  --color-neutral-100: #1e293b;
  --color-neutral-200: #334155;
  --color-neutral-300: #475569;
  --color-neutral-400: #64748b;
  --color-neutral-500: #94a3b8;
  --color-neutral-600: #cbd5e1;
  --color-neutral-700: #e2e8f0;
  --color-neutral-800: #f1f5f9;
  --color-neutral-900: #f8fafc;
}

* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-sans);
  color: var(--color-neutral-900);
  background-color: var(--color-neutral-50);
  line-height: 1.6;
}

[data-theme="dark"] body {
  color: var(--color-neutral-100);
  background-color: var(--color-neutral-900);
}
```

## Component Theming

### Button Component

```vue
<!-- components/ui/Button.vue -->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false
})

const buttonClasses = computed(() => [
  'btn',
  `btn-${props.variant}`,
  `btn-${props.size}`,
  {
    'btn-disabled': props.disabled,
    'btn-full-width': props.fullWidth
  }
])

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-family-sans);
  font-weight: 500;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-full-width {
  width: 100%;
}

/* Variants */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-900);
}

.btn-secondary {
  background-color: var(--color-neutral-200);
  color: var(--color-neutral-800);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-neutral-300);
}

/* Sizes */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

[data-theme="dark"] .btn-secondary {
  background-color: var(--color-neutral-700);
  color: var(--color-neutral-200);
}

[data-theme="dark"] .btn-secondary:hover:not(:disabled) {
  background-color: var(--color-neutral-600);
}
</style>
```

### Card Component

```vue
<!-- components/ui/Card.vue -->
<template>
  <div :class="cardClasses">
    <div v-if="title || $slots.header" class="card-header">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <slot name="header" />
    </div>

    <div class="card-body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
interface Props {
  title?: string
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md'
})

const cardClasses = computed(() => [
  'card',
  `card-${props.variant}`,
  `card-padding-${props.padding}`
])
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

[data-theme="dark"] .card {
  background-color: var(--color-neutral-800);
}

.card-default {
  box-shadow: var(--shadow-sm);
}

.card-outlined {
  border: 1px solid var(--color-neutral-200);
}

[data-theme="dark"] .card-outlined {
  border-color: var(--color-neutral-700);
}

.card-elevated {
  box-shadow: var(--shadow-lg);
}

.card-padding-none .card-body {
  padding: 0;
}

.card-padding-sm .card-body {
  padding: 1rem;
}

.card-padding-md .card-body {
  padding: 1.5rem;
}

.card-padding-lg .card-body {
  padding: 2rem;
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-neutral-200);
  background-color: var(--color-neutral-50);
}

[data-theme="dark"] .card-header {
  border-color: var(--color-neutral-700);
  background-color: var(--color-neutral-900);
}

.card-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-neutral-900);
}

[data-theme="dark"] .card-title {
  color: var(--color-neutral-100);
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-neutral-200);
  background-color: var(--color-neutral-50);
}

[data-theme="dark"] .card-footer {
  border-color: var(--color-neutral-700);
  background-color: var(--color-neutral-900);
}
</style>
```

## Dark Mode Implementation

### Theme Provider

```vue
<!-- components/ThemeProvider.vue -->
<template>
  <div :data-theme="currentTheme">
    <slot />
  </div>
</template>

<script setup>
const currentTheme = ref<'light' | 'dark'>('light')

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', currentTheme.value)

  // Update document class
  if (process.client) {
    document.documentElement.setAttribute('data-theme', currentTheme.value)
  }
}

// Load saved theme on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
  if (savedTheme) {
    currentTheme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  } else {
    // Detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    currentTheme.value = prefersDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', currentTheme.value)
  }
})

// Watch for system theme changes
if (process.client) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      currentTheme.value = e.matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', currentTheme.value)
    }
  })
}

defineExpose({
  toggleTheme,
  currentTheme: readonly(currentTheme)
})
</script>
```

### Theme Toggle Component

```vue
<!-- components/ui/ThemeToggle.vue -->
<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :title="`Switch to ${nextTheme} mode`"
  >
    <Icon
      :name="currentTheme === 'light' ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny'"
      class="theme-icon"
    />
  </button>
</template>

<script setup>
const { $theme } = useNuxtApp()

const currentTheme = computed(() => $theme.currentTheme)
const nextTheme = computed(() => currentTheme.value === 'light' ? 'dark' : 'light')

const toggleTheme = () => {
  $theme.toggleTheme()
}
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background-color: var(--color-neutral-100);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

[data-theme="dark"] .theme-toggle {
  background-color: var(--color-neutral-800);
}

.theme-toggle:hover {
  background-color: var(--color-neutral-200);
  transform: scale(1.05);
}

[data-theme="dark"] .theme-toggle:hover {
  background-color: var(--color-neutral-700);
}

.theme-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-neutral-600);
}

[data-theme="dark"] .theme-icon {
  color: var(--color-neutral-400);
}
</style>
```

### Theme Configuration

```typescript
// composables/useTheme.ts
export const useTheme = () => {
  const currentTheme = ref<'light' | 'dark'>('light')

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'

    if (process.client) {
      localStorage.setItem('theme', currentTheme.value)
      document.documentElement.setAttribute('data-theme', currentTheme.value)
    }
  }

  const setTheme = (theme: 'light' | 'dark') => {
    currentTheme.value = theme

    if (process.client) {
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  const initializeTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      const theme = savedTheme || (prefersDark ? 'dark' : 'light')
      setTheme(theme)
    }
  }

  return {
    currentTheme: readonly(currentTheme),
    toggleTheme,
    setTheme,
    initializeTheme
  }
}
```

## Tailwind CSS Configuration

### Custom Theme

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a'
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      borderRadius: {
        '4xl': '2rem'
      },
      spacing: {
        18: '4.5rem',
        88: '22rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      }
    }
  },
  plugins: [
    // Custom plugins
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }
      addUtilities(newUtilities)
    }
  ],
  darkMode: 'class'
}
```

## Component Library

### Form Components

```vue
<!-- components/ui/Input.vue -->
<template>
  <div class="form-group">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="input-wrapper">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      >

      <div v-if="icon" class="input-icon">
        <Icon :name="icon" />
      </div>
    </div>

    <p v-if="error" class="form-error">{{ error }}</p>
    <p v-if="hint" class="form-hint">{{ hint }}</p>
  </div>
</template>

<script setup>
interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string
  icon?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md'
})

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

const inputClasses = computed(() => [
  'form-input',
  `form-input-${props.size}`,
  {
    'form-input-error': props.error,
    'form-input-with-icon': props.icon
  }
])

defineEmits<{
  'update:modelValue': [value: string | number]
  'blur': []
  'focus': []
}>()
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-neutral-700);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  font-family: var(--font-family-sans);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: white;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:disabled {
  background-color: var(--color-neutral-100);
  cursor: not-allowed;
  opacity: 0.6;
}

.form-input-error {
  border-color: var(--color-error);
}

.form-input-error:focus {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-input-with-icon {
  padding-right: 2.5rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-neutral-400);
  pointer-events: none;
}

.form-error {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-error);
}

.form-hint {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

/* Sizes */
.form-input-sm {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.form-input-lg {
  padding: 1rem;
  font-size: 1.125rem;
}

[data-theme="dark"] .form-label {
  color: var(--color-neutral-300);
}

[data-theme="dark"] .form-input {
  background-color: var(--color-neutral-800);
  border-color: var(--color-neutral-600);
  color: var(--color-neutral-100);
}

[data-theme="dark"] .form-input:disabled {
  background-color: var(--color-neutral-700);
}

[data-theme="dark"] .form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

[data-theme="dark"] .form-hint {
  color: var(--color-neutral-400);
}
</style>
```

## Layout Theming

### Dashboard Layout

```vue
<!-- layouts/dashboard.vue -->
<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <NuxtLink to="/dashboard" class="logo">
          <Icon name="mdi-view-dashboard" />
          <span v-if="!sidebarCollapsed">God Panel</span>
        </NuxtLink>
        <button @click="toggleSidebar" class="sidebar-toggle">
          <Icon name="mdi-menu" />
        </button>
      </div>

      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li v-for="item in navigation" :key="item.path" class="nav-item">
            <NuxtLink
              :to="item.path"
              class="nav-link"
              :class="{ 'nav-link-active': $route.path.startsWith(item.path) }"
            >
              <Icon :name="item.icon" />
              <span v-if="!sidebarCollapsed">{{ item.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <ThemeToggle />
        <button @click="logout" class="logout-btn">
          <Icon name="mdi-logout" />
          <span v-if="!sidebarCollapsed">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content" :class="{ 'main-content-full': sidebarCollapsed }">
      <header class="top-header">
        <button @click="toggleSidebar" class="mobile-menu-btn">
          <Icon name="mdi-menu" />
        </button>

        <div class="header-actions">
          <SearchBox />
          <NotificationBell />
          <UserMenu />
        </div>
      </header>

      <div class="content-area">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const sidebarCollapsed = ref(false)

const navigation = [
  { title: 'Dashboard', path: '/dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Users', path: '/users', icon: 'mdi-account-group' },
  { title: 'Settings', path: '/settings', icon: 'mdi-cog' }
]

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value.toString())
}

const logout = async () => {
  await $auth.logout()
  await navigateTo('/login')
}

onMounted(() => {
  const saved = localStorage.getItem('sidebarCollapsed')
  if (saved) {
    sidebarCollapsed.value = saved === 'true'
  }
})
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-neutral-50);
}

[data-theme="dark"] .dashboard-layout {
  background-color: var(--color-neutral-900);
}

.sidebar {
  width: 250px;
  background-color: white;
  border-right: 1px solid var(--color-neutral-200);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

[data-theme="dark"] .sidebar {
  background-color: var(--color-neutral-800);
  border-color: var(--color-neutral-700);
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

[data-theme="dark"] .sidebar-header {
  border-color: var(--color-neutral-700);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.125rem;
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  color: var(--color-neutral-600);
}

.sidebar-toggle:hover {
  background-color: var(--color-neutral-100);
}

[data-theme="dark"] .sidebar-toggle:hover {
  background-color: var(--color-neutral-700);
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--color-neutral-600);
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-900);
}

[data-theme="dark"] .nav-link:hover {
  background-color: var(--color-neutral-700);
  color: var(--color-neutral-100);
}

.nav-link-active {
  background-color: var(--color-primary);
  color: white;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-neutral-200);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

[data-theme="dark"] .sidebar-footer {
  border-color: var(--color-neutral-700);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.main-content-full {
  margin-left: 0;
}

.top-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}

[data-theme="dark"] .top-header {
  border-color: var(--color-neutral-700);
  background-color: var(--color-neutral-800);
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  color: var(--color-neutral-600);
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 50;
    transform: translateX(-100%);
  }

  .sidebar:not(.sidebar-collapsed) {
    transform: translateX(0);
  }
}
</style>
```

## Advanced Theming

### Custom Color Schemes

```typescript
// app/config/colorSchemes.ts
export const colorSchemes = {
  blue: {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#f59e0b'
  },
  green: {
    primary: '#10b981',
    secondary: '#6b7280',
    accent: '#f59e0b'
  },
  purple: {
    primary: '#8b5cf6',
    secondary: '#64748b',
    accent: '#06b6d4'
  },
  red: {
    primary: '#ef4444',
    secondary: '#6b7280',
    accent: '#f59e0b'
  }
}

export type ColorScheme = keyof typeof colorSchemes
```

### Dynamic Theme Switching

```vue
<!-- components/ColorSchemeSelector.vue -->
<template>
  <div class="color-scheme-selector">
    <label>Color Scheme</label>
    <div class="scheme-options">
      <button
        v-for="scheme in schemes"
        :key="scheme.id"
        @click="selectScheme(scheme.id)"
        class="scheme-option"
        :class="{ 'scheme-option-active': scheme.id === currentScheme }"
        :style="{ backgroundColor: scheme.primary }"
        :title="scheme.name"
      >
        <Icon v-if="scheme.id === currentScheme" name="mdi-check" />
      </button>
    </div>
  </div>
</template>

<script setup>
const schemes = [
  { id: 'blue', name: 'Blue', primary: '#3b82f6' },
  { id: 'green', name: 'Green', primary: '#10b981' },
  { id: 'purple', name: 'Purple', primary: '#8b5cf6' },
  { id: 'red', name: 'Red', primary: '#ef4444' }
]

const currentScheme = ref('blue')

const selectScheme = (schemeId: string) => {
  currentScheme.value = schemeId
  const scheme = schemes.find(s => s.id === schemeId)

  if (scheme) {
    document.documentElement.style.setProperty('--color-primary', scheme.primary)
    localStorage.setItem('colorScheme', schemeId)
  }
}

onMounted(() => {
  const saved = localStorage.getItem('colorScheme')
  if (saved && schemes.find(s => s.id === saved)) {
    selectScheme(saved)
  }
})
</script>

<style scoped>
.color-scheme-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.scheme-options {
  display: flex;
  gap: 0.5rem;
}

.scheme-option {
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.scheme-option:hover {
  transform: scale(1.1);
  border-color: var(--color-neutral-300);
}

.scheme-option-active {
  border-color: white;
  box-shadow: 0 0 0 2px var(--color-primary);
}
</style>
```

## Responsive Theming

### Mobile-First Approach

```css
/* Mobile styles */
.card {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: var(--radius-md);
}

/* Tablet styles */
@media (min-width: 768px) {
  .card {
    margin: 1.5rem 0;
    padding: 1.5rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .card {
    margin: 2rem 0;
    padding: 2rem;
  }
}
```

### Responsive Typography

```css
/* Fluid typography */
.title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  line-height: 1.2;
}

.body {
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.6;
}
```

## Performance Optimization

### CSS Optimization

```css
/* Use CSS containment for better performance */
.dashboard-widget {
  contain: layout style paint;
}

/* Optimize animations */
.smooth-transition {
  will-change: transform;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Theme Loading Strategy

```typescript
// composables/useThemePerformance.ts
export const useThemePerformance = () => {
  const themeLoaded = ref(false)

  const preloadTheme = async () => {
    // Preload theme CSS
    if (process.client) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'style'
      link.href = '/themes/current.css'
      document.head.appendChild(link)
    }
  }

  const loadTheme = async (theme: string) => {
    themeLoaded.value = false

    // Load theme CSS
    await loadCSS(`/themes/${theme}.css`)

    themeLoaded.value = true
  }

  return {
    themeLoaded: readonly(themeLoaded),
    preloadTheme,
    loadTheme
  }
}
```

## Testing Themes

### Visual Regression Testing

```typescript
// test/theme.test.ts
describe('Theme System', () => {
  test('should apply light theme correctly', async () => {
    await setTheme('light')

    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary')

    expect(primaryColor).toBe('#3b82f6')
  })

  test('should apply dark theme correctly', async () => {
    await setTheme('dark')

    const backgroundColor = getComputedStyle(document.body)
      .getPropertyValue('background-color')

    expect(backgroundColor).toBe('rgb(15, 23, 42)')
  })

  test('should persist theme preference', async () => {
    await setTheme('dark')

    // Simulate page reload
    await refresh()

    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
```

## Deployment Considerations

### Theme CDN

```javascript
// For CDN deployment
const themeCSS = `
  :root {
    --color-primary: #3b82f6;
    --color-neutral-50: #f8fafc;
    /* ... other variables */
  }

  [data-theme="dark"] {
    --color-primary: #60a5fa;
    --color-neutral-50: #0f172a;
    /* ... dark theme variables */
  }
`

// Inject CSS
const style = document.createElement('style')
style.textContent = themeCSS
document.head.appendChild(style)
```

### Theme Preloading

```html
<!-- In your HTML head -->
<link rel="preload" href="/themes/default.css" as="style">
<link rel="preload" href="/themes/dark.css" as="style">
```

## Troubleshooting

### Common Issues

**Theme not applying:**
- Check CSS variable names match
- Ensure theme provider is wrapping your app
- Clear browser cache

**Dark mode not working:**
- Verify data-theme attribute is set correctly
- Check dark mode CSS selectors
- Test in different browsers

**Performance issues:**
- Minimize CSS repaints
- Use CSS containment
- Optimize animations

### Debug Tools

```typescript
// composables/useThemeDebug.ts
export const useThemeDebug = () => {
  const logThemeVariables = () => {
    if (process.client) {
      const styles = getComputedStyle(document.documentElement)
      const themeVars = Array.from(styles)
        .filter(name => name.startsWith('--color-') || name.startsWith('--theme-'))

      console.table(themeVars.map(name => ({
        property: name,
        value: styles.getPropertyValue(name)
      })))
    }
  }

  const checkThemeConsistency = () => {
    const issues: string[] = []

    if (process.client) {
      const rootStyles = getComputedStyle(document.documentElement)
      const bodyStyles = getComputedStyle(document.body)

      // Check if required variables are defined
      const requiredVars = ['--color-primary', '--color-neutral-50']
      requiredVars.forEach(varName => {
        if (!rootStyles.getPropertyValue(varName)) {
          issues.push(`Missing CSS variable: ${varName}`)
        }
      })
    }

    return issues
  }

  return {
    logThemeVariables,
    checkThemeConsistency
  }
}
```

## Best Practices

### Theme Organization

1. **Consistent naming**: Use semantic color names
2. **CSS variables**: Define everything as CSS variables
3. **Component isolation**: Theme components independently
4. **Performance**: Minimize style recalculations
5. **Accessibility**: Ensure good contrast ratios

### Color Palette

```typescript
// Recommended color palette structure
export const colorPalette = {
  // Brand colors
  brand: {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#f59e0b'
  },

  // Semantic colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4'
  },

  // Neutral colors (gray scale)
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
}
```

## Next Steps

After implementing theming:

1. **[Component Library](../components)** - Style your components
2. **[Internationalization](./i18n)** - Add multi-language support
3. **[Advanced Layouts](./layouts)** - Create complex layouts
4. **[Performance Optimization](./performance)** - Optimize theme loading

## Resources

- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**
- **[CSS Custom Properties (Variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)**
- **[Color Contrast Guidelines](https://webaim.org/articles/contrast/)**
- **[Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)**

---

**Next**: Check out the **[Internationalization Guide](./i18n)** to add multi-language support to your themed application!


