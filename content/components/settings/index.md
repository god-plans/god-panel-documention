---
title: Settings Drawer Components
description: Interactive settings panel for customizing dashboard appearance and behavior
category: components
order: 5
---

# Settings Drawer Components

God Panel's settings drawer provides a comprehensive interface for customizing the dashboard appearance, layout, and behavior. This slide-out panel allows users to quickly adjust theme settings, navigation preferences, and visual customizations without leaving the current page.

## Component Overview

### 🎛️ Settings Drawer System
- **SettingsDrawer**: Main settings panel with backdrop and header
- **BaseOption**: Individual toggle options with icons and switches
- **FontOptions**: Font family selection grid
- **FullscreenButton**: Fullscreen toggle with state management
- **LayoutOption**: Visual layout preview components
- **NavOptions**: Navigation layout configuration
- **PresetsOptions**: Color theme preset selection

## SettingsDrawer Component

The main settings panel that slides in from the right side of the screen.

```vue
<template>
  <!-- Settings drawer is controlled by the settings store -->
  <SettingsDrawer
    :hide-font="true"
    :hide-presets="false"
    :hide-compact="false"
    @reset="handleReset"
  />
</template>

<script setup>
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()

const handleReset = () => {
  // Settings reset to defaults
  console.log('Settings reset to defaults')
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideFont` | boolean | `false` | Hide font selection section |
| `hideCompact` | boolean | `false` | Hide compact layout option |
| `hidePresets` | boolean | `false` | Hide color presets section |
| `hideNavColor` | boolean | `false` | Hide navigation color options |
| `hideContrast` | boolean | `false` | Hide high contrast option |
| `hideNavLayout` | boolean | `false` | Hide navigation layout options |
| `hideDirection` | boolean | `false` | Hide RTL direction option |
| `hideColorScheme` | boolean | `false` | Hide dark/light mode option |

### Features

- **Backdrop Blur**: Semi-transparent backdrop with blur effect
- **Auto-close**: Closes when clicking outside or pressing Escape
- **Reset Functionality**: Reset button to restore default settings
- **Fullscreen Toggle**: Quick fullscreen mode access
- **Responsive Design**: Adapts to different screen sizes
- **RTL Support**: Right-to-left layout support

## BaseOption Component

Individual toggle options with icons, labels, and switch controls.

```vue
<template>
  <!-- Theme toggle -->
  <BaseOption
    icon="moon"
    label="Dark Mode"
    tooltip="Toggle dark/light theme"
    :selected="isDarkMode"
    @click="toggleTheme"
  />

  <!-- High contrast -->
  <BaseOption
    icon="contrast"
    label="High Contrast"
    tooltip="Increase contrast for better visibility"
    :selected="highContrast"
    @click="toggleContrast"
  />

  <!-- RTL support -->
  <BaseOption
    icon="align-right"
    label="RTL Mode"
    tooltip="Right-to-left text direction"
    :selected="isRTL"
    @click="toggleRTL"
  />

  <!-- Compact layout -->
  <BaseOption
    icon="autofit-width"
    label="Compact Layout"
    tooltip="Reduce spacing and padding"
    :selected="compactMode"
    @click="toggleCompact"
  />
</template>

<script setup>
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()

const toggleTheme = () => {
  const newScheme = settingsStore.settings.colorScheme === 'light' ? 'dark' : 'light'
  settingsStore.updateField('colorScheme', newScheme)
}

const toggleContrast = () => {
  const newContrast = settingsStore.settings.contrast === 'default' ? 'high' : 'default'
  settingsStore.updateField('contrast', newContrast)
}

const toggleRTL = () => {
  const newDirection = settingsStore.settings.direction === 'ltr' ? 'rtl' : 'ltr'
  settingsStore.updateField('direction', newDirection)
}

const toggleCompact = () => {
  settingsStore.updateField('compactLayout', !settingsStore.settings.compactLayout)
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | string | - | Icon name (maps to Material Design icons) |
| `label` | string | - | Option label text |
| `selected` | boolean | `false` | Whether option is currently selected |
| `tooltip` | string | - | Tooltip text on hover |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | - | Emitted when option is clicked |

### Icon Mapping

The component includes built-in icon mapping for common settings:

| Icon Name | Material Design Icon | Description |
|-----------|---------------------|-------------|
| `moon` | `mdi-weather-night` | Dark mode toggle |
| `contrast` | `mdi-contrast-circle` | High contrast mode |
| `align-right` | `mdi-format-align-right` | RTL text direction |
| `autofit-width` | `mdi-arrow-collapse-horizontal` | Compact layout |

## FontOptions Component

Font family selection with live preview and visual grid layout.

```vue
<template>
  <FontOptions
    :value="currentFont"
    :options="availableFonts"
    @click-option="handleFontChange"
  />
</template>

<script setup>
import { useDynamicFonts } from '~/composables/useDynamicFonts'

const { getAvailableFonts } = useDynamicFonts()

const currentFont = ref('Inter')
const availableFonts = getAvailableFonts()

const handleFontChange = (font: string) => {
  currentFont.value = font
  // Font is automatically loaded via useDynamicFonts composable
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | - | Currently selected font family |
| `options` | string[] | - | Array of available font options |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click-option` | string | Emitted when font option is selected |

### Available Fonts

The component supports these Google Fonts:

- **Inter** (Modern, clean interface font)
- **Roboto** (Google's design system font)
- **Poppins** (Friendly, rounded font)
- **Barlow** (Contemporary, geometric font)
- **DM Sans** (Humanist, readable font)
- **Nunito Sans** (Friendly, rounded font)

### Features

- **Live Preview**: Font names displayed in their actual font
- **Visual Selection**: Grid layout with clear selection states
- **Automatic Loading**: Integrates with `useDynamicFonts` composable
- **Fallback Support**: Graceful fallback for font loading failures

## FullscreenButton Component

Quick fullscreen toggle button with state management.

```vue
<template>
  <div class="header-actions">
    <!-- Fullscreen button with tooltip -->
    <FullscreenButton />

    <!-- Reset button -->
    <v-btn icon variant="text" @click="resetSettings">
      <v-icon>mdi-restart</v-icon>
    </v-btn>

    <!-- Close button -->
    <v-btn icon variant="text" @click="closeSettings">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>
```

### Features

- **Auto-detection**: Automatically detects current fullscreen state
- **Keyboard Support**: Responds to F11 and Escape keys
- **Visual Feedback**: Icon changes based on fullscreen state
- **Tooltip**: Shows appropriate tooltip text
- **Smooth Animation**: Icon transition animations

## LayoutOption Component

Visual preview components for navigation layout options.

```vue
<template>
  <div class="layout-options">
    <LayoutOption
      option="vertical"
      :selected="currentLayout === 'vertical'"
      @click="setLayout('vertical')"
    />
    <LayoutOption
      option="horizontal"
      :selected="currentLayout === 'horizontal'"
      @click="setLayout('horizontal')"
    />
    <LayoutOption
      option="mini"
      :selected="currentLayout === 'mini'"
      @click="setLayout('mini')"
    />
  </div>
</template>

<script setup>
const currentLayout = ref('vertical')

const setLayout = (layout: 'vertical' | 'horizontal' | 'mini') => {
  currentLayout.value = layout
  // Update settings store
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `option` | `'vertical' \| 'horizontal' \| 'mini'` | - | Layout type to display |
| `selected` | boolean | `false` | Whether this layout is currently selected |

### Layout Types

| Layout | Description | Use Case |
|--------|-------------|----------|
| **vertical** | Traditional sidebar navigation | Standard desktop layout |
| **horizontal** | Top navigation bar | Mobile and compact layouts |
| **mini** | Collapsed icon-only sidebar | Space-constrained environments |

### Visual Design

Each layout option shows a mini preview:

```
Vertical:   [Sidebar] [Content Area]
Horizontal: [Top Nav Bar]
            [Content Area]
Mini:       [Icons] [Content Area]
```

## NavOptions Component

Navigation layout configuration section with visual previews.

```vue
<template>
  <NavOptions
    :value="{ layout: currentNavLayout }"
    :options="{ layouts: ['vertical', 'horizontal', 'mini'] }"
    :tooltip="'Navigation layout affects sidebar behavior'"
    @click-option="handleNavLayoutChange"
  />
</template>

<script setup>
const currentNavLayout = ref('vertical')

const handleNavLayoutChange = (option: { layout?: string }) => {
  if (option.layout) {
    currentNavLayout.value = option.layout as 'vertical' | 'horizontal' | 'mini'
  }
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | object | - | Current navigation settings |
| `options` | object | - | Available layout options |
| `hideNavLayout` | boolean | `false` | Hide layout selection |
| `hideNavColor` | boolean | `false` | Hide navigation color options |
| `tooltip` | string | - | Tooltip text for the section |

## PresetsOptions Component

Color theme preset selection with visual color indicators.

```vue
<template>
  <PresetsOptions
    :value="currentPrimaryColor"
    :options="colorPresets"
    @click-option="handleColorChange"
  />
</template>

<script setup>
const currentPrimaryColor = ref('default')

const colorPresets = [
  { name: 'Default', value: '#00A76F', key: 'default' },
  { name: 'Cyan', value: '#078DEE', key: 'cyan' },
  { name: 'Purple', value: '#7635dc', key: 'purple' },
  { name: 'Blue', value: '#0C68E9', key: 'blue' },
  { name: 'Orange', value: '#fda92d', key: 'orange' },
  { name: 'Red', value: '#FF3030', key: 'red' }
]

const handleColorChange = (colorKey: string) => {
  currentPrimaryColor.value = colorKey
  // Update theme
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | - | Currently selected preset |
| `options` | array | - | Array of preset options |

### Color Presets

| Preset | Color | Hex Code | Use Case |
|--------|-------|----------|----------|
| **Default** | Green | `#00A76F` | Professional, success-oriented |
| **Cyan** | Blue | `#078DEE` | Tech, modern applications |
| **Purple** | Purple | `#7635dc` | Creative, premium feel |
| **Blue** | Blue | `#0C68E9` | Corporate, trustworthy |
| **Orange** | Orange | `#fda92d` | Energetic, attention-grabbing |
| **Red** | Red | `#FF3030` | Urgent, error states |

## Integration with Settings Store

All components integrate with the Pinia settings store:

```vue
<script setup>
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()

// Components automatically sync with store
// Settings are persisted and reactive across the app

// Manual store updates
const updateSetting = (field: string, value: any) => {
  settingsStore.updateField(field, value)
}

const resetSettings = () => {
  settingsStore.onReset()
}
</script>
```

## Usage in Components

### Settings Button Integration

```vue
<template>
  <div class="header-actions">
    <!-- Settings button triggers the drawer -->
    <SettingsButton @click="openSettings" />

    <!-- Settings drawer -->
    <SettingsDrawer />
  </div>
</template>

<script setup>
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()

const openSettings = () => {
  settingsStore.onOpenDrawer()
}
</script>
```

### Layout Integration

```vue
<template>
  <div class="app-layout">
    <!-- Navigation adapts to settings -->
    <DashboardNav :mini="settingsStore.settings.navLayout === 'mini'" />

    <!-- Content area respects compact mode -->
    <main :class="{ 'compact': settingsStore.settings.compactLayout }">
      <slot />
    </main>

    <!-- Settings drawer -->
    <SettingsDrawer />
  </div>
</template>
```

## Customization

### Custom Color Presets

```vue
<script setup>
const customPresets = [
  { name: 'Brand Blue', value: '#1e40af', key: 'brand-blue' },
  { name: 'Forest Green', value: '#059669', key: 'forest-green' },
  { name: 'Sunset Orange', value: '#ea580c', key: 'sunset-orange' },
  { name: 'Royal Purple', value: '#7c3aed', key: 'royal-purple' }
]

const handleCustomPreset = (preset: string) => {
  // Apply custom preset logic
}
</script>
```

### Custom Option Sections

```vue
<template>
  <SettingsDrawer>
    <!-- Custom section -->
    <div class="custom-settings-section">
      <BaseOption
        icon="custom-icon"
        label="Custom Feature"
        :selected="customEnabled"
        @click="toggleCustom"
      />
    </div>
  </SettingsDrawer>
</template>
```

## Theme Integration

All settings components respect the current theme:

```css
/* Light theme */
.settings-drawer {
  --drawer-bg: rgba(255, 255, 255, 0.9);
  --drawer-text: rgb(33, 37, 41);
  --drawer-border: rgba(33, 37, 41, 0.12);
}

/* Dark theme */
[data-theme="dark"] .settings-drawer {
  --drawer-bg: rgba(31, 41, 55, 0.9);
  --drawer-text: rgb(249, 250, 251);
  --drawer-border: rgba(249, 250, 251, 0.12);
}
```

## Responsive Design

The settings drawer adapts to different screen sizes:

```css
/* Desktop (≥ 960px) */
.settings-drawer {
  width: 360px;
  max-width: 400px;
}

/* Mobile (< 960px) */
@media (max-width: 959px) {
  .settings-drawer {
    width: 100vw;
    max-width: none;
  }
}
```

## Accessibility Features

### Keyboard Navigation

- **Tab Navigation**: Full keyboard navigation support
- **Enter/Space**: Activate buttons and options
- **Escape**: Close settings drawer
- **Arrow Keys**: Navigate between options

### Screen Reader Support

```vue
<template>
  <SettingsDrawer
    aria-label="Application settings"
    role="dialog"
    aria-modal="true"
  >
    <BaseOption
      :aria-label="`Toggle ${label}`"
      role="button"
      :aria-pressed="selected"
    />
  </SettingsDrawer>
</template>
```

### ARIA Attributes

- **aria-label**: Descriptive labels for all interactive elements
- **aria-pressed**: Toggle state indication
- **role**: Proper semantic roles for screen readers
- **aria-modal**: Modal dialog behavior

## Performance Considerations

### Efficient Updates

```vue
<script setup>
// Debounced settings updates
const updateSetting = useDebounceFn((field: string, value: any) => {
  settingsStore.updateField(field, value)
}, 300)

// Batch updates for better performance
const batchUpdate = (updates: Record<string, any>) => {
  settingsStore.batchUpdate(updates)
}
</script>
```

### Memory Management

```vue
<script setup>
// Proper cleanup
onUnmounted(() => {
  // Clear any subscriptions or timers
  clearInterval(updateInterval)
})
</script>
```

## Best Practices

### Settings Organization

1. **Group related settings** in logical sections
2. **Provide visual feedback** for all changes
3. **Include tooltips** for complex options
4. **Show current state** clearly with visual indicators

### User Experience

1. **Auto-save changes** for immediate feedback
2. **Provide reset option** for easy recovery
3. **Show loading states** for async operations
4. **Validate input** before saving

### Performance

1. **Debounce rapid changes** to avoid excessive updates
2. **Use computed properties** for derived settings
3. **Lazy load** complex sections when needed
4. **Cache** expensive operations

## Troubleshooting

### Common Issues

**Settings not persisting:**
- Check if settings store is properly configured
- Verify localStorage permissions
- Check for JavaScript errors in console

**Options not responding:**
- Ensure event handlers are properly bound
- Check if settings store methods are working
- Verify component props are correctly passed

**Styling issues:**
- Check CSS custom properties are defined
- Verify theme configuration
- Test in both light and dark modes

**Mobile layout problems:**
- Check responsive CSS breakpoints
- Verify drawer positioning for RTL
- Test touch interactions on mobile devices

## Integration Examples

### Complete Settings Integration

```vue
<!-- In your dashboard layout -->
<template>
  <div class="dashboard">
    <!-- Settings trigger button -->
    <SettingsButton @click="openSettings" />

    <!-- Main settings drawer -->
    <SettingsDrawer
      :hide-font="false"
      :hide-presets="false"
      :hide-compact="false"
      @reset="handleReset"
    />

    <!-- Settings are automatically applied -->
    <DashboardNav :mini="settingsStore.settings.navLayout === 'mini'" />
    <main :class="{ 'compact': settingsStore.settings.compactLayout }">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()

const openSettings = () => {
  settingsStore.onOpenDrawer()
}

const handleReset = () => {
  // Show confirmation dialog
  if (confirm('Reset all settings to defaults?')) {
    settingsStore.onReset()
  }
}
</script>
```

### Custom Settings Section

```vue
<template>
  <SettingsDrawer>
    <!-- Custom notifications section -->
    <div class="custom-section">
      <div class="section-header">
        <span>Notifications</span>
      </div>

      <BaseOption
        icon="email"
        label="Email Notifications"
        :selected="emailNotifications"
        @click="toggleEmailNotifications"
      />

      <BaseOption
        icon="bell"
        label="Push Notifications"
        :selected="pushNotifications"
        @click="togglePushNotifications"
      />
    </div>
  </SettingsDrawer>
</template>
```

## Next Steps

- **[Theme Components Documentation](../theme)** - Theme system and customization
- **[Settings Store Documentation](../../stores/settings)** - State management for settings
- **[Logger Service Documentation](../../services/logger)** - Settings change logging
- **[Dashboard Components Documentation](../dashboard)** - Navigation integration
- **[Layout System Documentation](../layouts)** - Layout customization

