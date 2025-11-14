---
title: Settings Store
description: Application settings and user preferences management
category: stores
order: 2
---

# Settings Store

The Settings Store manages application-wide settings and user preferences using Pinia. It provides a comprehensive settings system with support for themes, layouts, and user customization options.

## Overview

The settings store (`stores/settings.ts`) handles all user preference management including theme selection, layout options, and UI customization. Settings are persisted using cookies for SSR compatibility.

## Basic Usage

```typescript
import { useSettingsStore } from '~/stores/settings'
import { storeToRefs } from 'pinia'

const settingsStore = useSettingsStore()

// Reactive state and computed properties
const {
  settings,
  openDrawer,
  isRtl,
  isDarkMode,
  isMiniLayout,
  canReset
} = storeToRefs(settingsStore)
```

## State Properties

### Settings Object

The main settings object contains all user preferences:

```typescript
interface Settings {
  colorScheme: 'light' | 'dark'      // Theme selection
  direction: 'ltr' | 'rtl'           // Text direction
  contrast: 'high' | 'normal'        // Contrast level
  primaryColor: string               // Primary color preset
  navLayout: 'vertical' | 'horizontal' | 'mini'  // Navigation layout
  compactLayout: boolean             // Compact spacing
  fontFamily: string                 // Font selection
}
```

### Reactive State

| Property | Type | Description |
|----------|------|-------------|
| `settings` | `Settings` | Complete settings object |
| `openDrawer` | `boolean` | Settings drawer visibility state |

### Computed Getters

| Property | Type | Description |
|----------|------|-------------|
| `isRtl` | `boolean` | Whether RTL (right-to-left) layout is active |
| `isMiniLayout` | `boolean` | Whether mini sidebar layout is active |
| `isHorizontalLayout` | `boolean` | Whether horizontal navigation is active |
| `isVerticalLayout` | `boolean` | Whether vertical navigation is active (default) |
| `isDarkMode` | `boolean` | Whether dark theme is active |
| `canReset` | `boolean` | Whether settings differ from defaults |

## Actions

### `updateSettings(newSettings: Partial<Settings>)`

Updates multiple settings at once and persists to storage.

```typescript
// Update theme and layout
settingsStore.updateSettings({
  colorScheme: 'dark',
  primaryColor: 'cyan',
  navLayout: 'mini',
  compactLayout: true
})

// Update font and contrast
settingsStore.updateSettings({
  fontFamily: 'Inter',
  contrast: 'high'
})
```

### `updateField<K extends keyof Settings>(field: K, value: Settings[K])`

Updates a single setting field.

```typescript
// Change theme
settingsStore.updateField('colorScheme', 'dark')

// Change primary color
settingsStore.updateField('primaryColor', 'purple')

// Toggle layout
settingsStore.updateField('navLayout', 'mini')
```

### `resetSettings()`

Resets all settings to default values.

```typescript
settingsStore.resetSettings()
// All settings revert to defaults
```

### Drawer Actions

```typescript
// Open settings drawer
settingsStore.onOpenDrawer()

// Close settings drawer
settingsStore.onCloseDrawer()
```

## Default Settings

```typescript
const defaultSettings: Settings = {
  colorScheme: 'light',      // Light theme by default
  direction: 'ltr',          // Left-to-right text direction
  contrast: 'high',          // High contrast for accessibility
  primaryColor: 'default',   // Default green color (#00A76F)
  navLayout: 'vertical',     // Vertical navigation sidebar
  compactLayout: true,       // Compact spacing
  fontFamily: 'Inter'        // Modern font
}
```

## Available Options

### Color Schemes
- `'light'` - Light theme (default)
- `'dark'` - Dark theme

### Text Directions
- `'ltr'` - Left-to-right (default)
- `'rtl'` - Right-to-left (for RTL languages like Persian/Arabic)

### Contrast Levels
- `'high'` - High contrast (default)
- `'normal'` - Normal contrast

### Primary Colors
- `'default'` - Green (#00A76F)
- `'cyan'` - Blue (#078DEE)
- `'purple'` - Purple (#7635dc)
- `'blue'` - Blue (#0C68E9)
- `'orange'` - Orange (#fda92d)
- `'red'` - Red (#FF3030)

### Navigation Layouts
- `'vertical'` - Vertical sidebar (default)
- `'horizontal'` - Horizontal top navigation
- `'mini'` - Mini collapsed sidebar

### Font Families
- `'Inter'` - Modern sans-serif (default)
- `'Roboto'` - Google's font
- `'Open Sans'` - Clean readable font

## Reactive Theme Classes

Use computed properties to apply theme classes dynamically:

```vue
<template>
  <div :class="themeClasses">
    <nav :class="{ 'mini-sidebar': isMiniLayout }">
      <!-- Navigation content -->
    </nav>

    <main :class="{ 'rtl-layout': isRtl }">
      <!-- Main content -->
    </main>
  </div>
</template>

<script setup>
const settingsStore = useSettingsStore()
const { isMiniLayout, isRtl, isDarkMode, settings } = storeToRefs(settingsStore)

const themeClasses = computed(() => ({
  'dark-theme': isDarkMode.value,
  'rtl-layout': isRtl.value,
  'mini-sidebar': isMiniLayout.value,
  'compact-layout': settings.value.compactLayout,
  'high-contrast': settings.value.contrast === 'high'
}))
</script>
```

## Persistence

Settings are automatically persisted using cookies for SSR compatibility:

```typescript
// Settings are saved to cookies automatically
// Available across server and client
// Persist for 1 year by default
```

## Integration with UI Components

### Settings Drawer

The settings store integrates with the settings drawer component:

```vue
<template>
  <v-navigation-drawer
    v-model="openDrawer"
    temporary
    right
    width="400"
  >
    <SettingsPanel />
  </v-navigation-drawer>
</template>

<script setup>
const settingsStore = useSettingsStore()
const { openDrawer } = storeToRefs(settingsStore)
</script>
```

### Color Picker Component

```vue
<template>
  <div class="color-picker">
    <v-btn
      v-for="color in colorPresets"
      :key="color.key"
      :color="color.value"
      @click="settingsStore.updateField('primaryColor', color.key)"
      :variant="settings.primaryColor === color.key ? 'flat' : 'outlined'"
    >
      {{ color.name }}
    </v-btn>
  </div>
</template>

<script setup>
const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

const colorPresets = [
  { name: 'Default', value: '#00A76F', key: 'default' },
  { name: 'Cyan', value: '#078DEE', key: 'cyan' },
  { name: 'Purple', value: '#7635dc', key: 'purple' },
  { name: 'Blue', value: '#0C68E9', key: 'blue' },
  { name: 'Orange', value: '#fda92d', key: 'orange' },
  { name: 'Red', value: '#FF3030', key: 'red' }
]
</script>
```

## Layout Management

### Vertical Layout (Default)

```vue
<template>
  <div class="vertical-layout">
    <v-navigation-drawer
      :mini="isMiniLayout"
      permanent
    >
      <NavItems />
    </v-navigation-drawer>

    <v-main>
      <AppBar />
      <slot />
    </v-main>
  </div>
</template>
```

### Horizontal Layout

```vue
<template>
  <div class="horizontal-layout">
    <v-app-bar>
      <HorizontalNav />
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </div>
</template>
```

## Theme Integration

### CSS Custom Properties

Settings integrate with CSS custom properties for dynamic theming:

```css
:root {
  --primary-color: #00A76F;
  --font-family: 'Inter', sans-serif;
}

[data-theme="dark"] {
  --primary-color: #078DEE;
}

[data-theme="compact"] {
  --spacing-unit: 0.5rem;
}
```

### Vuetify Theme Integration

```typescript
// plugins/vuetify.ts
export default defineNuxtPlugin((nuxtApp) => {
  const settingsStore = useSettingsStore()

  const vuetify = createVuetify({
    theme: {
      defaultTheme: settingsStore.isDarkMode ? 'dark' : 'light'
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
```

## Internationalization Support

Settings store supports RTL layouts for international users:

```typescript
// Automatic RTL detection
const isRtl = computed(() => {
  return settingsStore.settings.direction === 'rtl' ||
         $i18n.locale.value === 'fa' // Persian locale
})
```

## Performance Considerations

- Settings are reactive but updates are batched
- Cookie persistence is optimized for SSR
- Computed properties are cached automatically
- Minimal re-renders on settings changes

## Testing Settings

```typescript
describe('Settings Store', () => {
  it('should update settings', () => {
    const settingsStore = useSettingsStore()

    // Test theme change
    settingsStore.updateField('colorScheme', 'dark')
    expect(settingsStore.isDarkMode).toBe(true)

    // Test reset
    settingsStore.resetSettings()
    expect(settingsStore.settings.colorScheme).toBe('light')
  })
})
```

## Common Patterns

### Theme Toggle

```vue
<template>
  <v-btn @click="toggleTheme">
    <v-icon>{{ isDarkMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
    {{ isDarkMode ? 'Light' : 'Dark' }} Mode
  </v-btn>
</template>

<script setup>
const settingsStore = useSettingsStore()
const { isDarkMode } = storeToRefs(settingsStore)

const toggleTheme = () => {
  const newTheme = isDarkMode.value ? 'light' : 'dark'
  settingsStore.updateField('colorScheme', newTheme)
}
</script>
```

### Layout Switcher

```vue
<template>
  <v-select
    v-model="settings.navLayout"
    :items="layoutOptions"
    label="Navigation Layout"
    @update:model-value="settingsStore.updateField('navLayout', $event)"
  />
</template>

<script setup>
const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

const layoutOptions = [
  { title: 'Vertical', value: 'vertical' },
  { title: 'Horizontal', value: 'horizontal' },
  { title: 'Mini', value: 'mini' }
]
</script>
```

## Next Steps

- **[Authentication Store](/content/stores/auth)** - User authentication management
- **[Theme Customization](/content/guides/theming)** - Advanced theming guide
- **[Component Documentation](/content/components/overview)** - UI components
- **[Settings Panel Component](/content/components/settings/index)** - Settings UI implementation

