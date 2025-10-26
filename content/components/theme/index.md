---
title: Theme Components
description: Theme customization and styling components for God Panel
category: components
order: 6
---

# Theme Components

God Panel's theme components provide comprehensive tools for customizing the visual appearance of your application. From color schemes to typography, these components make it easy to create a cohesive and branded experience.

## Component Categories

### 🎨 Color & Appearance
- **ThemeProvider**: Global theme context
- **ColorPalette**: Color selection interface
- **ThemeSwitcher**: Dark/light mode toggle
- **CustomProperties**: CSS variable management

### 📝 Typography
- **FontSelector**: Font family selection
- **TextSize**: Typography scale controls
- **LineHeight**: Line height adjustments
- **FontWeight**: Weight customization

### 🎯 Layout & Spacing
- **SpacingControls**: Margin and padding settings
- **BorderRadius**: Corner radius controls
- **ShadowControls**: Box shadow customization
- **LayoutPreview**: Visual layout testing

## ThemeProvider Component

Global theme context provider that manages theme state and CSS custom properties.

```vue
<template>
  <ThemeProvider
    :theme="currentTheme"
    :mode="themeMode"
    @theme-change="handleThemeChange"
    @mode-change="handleModeChange"
  >
    <div class="min-h-screen">
      <!-- Application content -->
      <ThemeSwitcher />

      <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

        <!-- Theme-aware components -->
        <Card class="mb-6">
          <p>This card adapts to the current theme automatically.</p>
        </Card>
      </div>
    </div>
  </ThemeProvider>
</template>

<script setup>
const themeMode = ref('light')
const currentTheme = ref(defaultTheme)

const themes = {
  light: {
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      'text-muted': '#6b7280'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    }
  },
  dark: {
    colors: {
      primary: '#60a5fa',
      secondary: '#9ca3af',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      'text-muted': '#9ca3af'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    }
  }
}

const defaultTheme = themes.light

const handleThemeChange = (newTheme) => {
  currentTheme.value = newTheme
  // Persist theme preference
  localStorage.setItem('theme', JSON.stringify(newTheme))
}

const handleModeChange = (newMode) => {
  themeMode.value = newMode
  currentTheme.value = themes[newMode]

  // Update document classes
  if (newMode === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // Persist mode preference
  localStorage.setItem('themeMode', newMode)
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | object | - | Current theme configuration |
| `mode` | string | 'light' | Theme mode (light/dark) |
| `auto-detect` | boolean | true | Auto-detect system preference |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `theme-change` | theme object | Theme configuration changed |
| `mode-change` | mode string | Theme mode changed |

## ThemeSwitcher Component

Toggle between light and dark modes with smooth transitions.

```vue
<template>
  <div class="flex items-center space-x-4">
    <!-- Simple toggle -->
    <ThemeSwitcher />

    <!-- With custom options -->
    <ThemeSwitcher
      :options="themeOptions"
      :show-labels="true"
      position="bottom"
    />

    <!-- Compact version -->
    <ThemeSwitcher
      variant="compact"
      icon-only
    />
  </div>
</template>

<script setup>
const themeOptions = [
  { label: 'Light', value: 'light', icon: 'sun' },
  { label: 'Dark', value: 'dark', icon: 'moon' },
  { label: 'System', value: 'system', icon: 'monitor' }
]
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | 'default' | Switcher style variant |
| `options` | array | - | Available theme options |
| `show-labels` | boolean | false | Show option labels |
| `icon-only` | boolean | false | Hide labels, show only icons |
| `position` | string | 'top' | Dropdown position |

## ColorPalette Component

Interactive color picker for theme customization.

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Primary colors -->
    <ColorPalette
      v-model="theme.colors.primary"
      title="Primary Colors"
      :colors="primaryPalette"
      :allow-custom="true"
      @change="updatePrimaryColors"
    />

    <!-- Accent colors -->
    <ColorPalette
      v-model="theme.colors.accent"
      title="Accent Colors"
      :colors="accentPalette"
      @change="updateAccentColors"
    />

    <!-- Neutral colors -->
    <ColorPalette
      v-model="theme.colors.neutral"
      title="Neutral Colors"
      :colors="neutralPalette"
      mode="grid"
      @change="updateNeutralColors"
    />
  </div>
</template>

<script setup>
const theme = ref({
  colors: {
    primary: '#3b82f6',
    accent: '#10b981',
    neutral: '#6b7280'
  }
})

const primaryPalette = [
  '#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a',
  '#ef4444', '#dc2626', '#b91c1c', '#991b1b',
  '#10b981', '#059669', '#047857', '#065f46',
  '#f59e0b', '#d97706', '#b45309', '#92400e'
]

const accentPalette = [
  '#10b981', '#06b6d4', '#8b5cf6', '#ec4899',
  '#f59e0b', '#ef4444', '#84cc16', '#6366f1'
]

const neutralPalette = [
  '#ffffff', '#f9fafb', '#f3f4f6', '#e5e7eb',
  '#d1d5db', '#9ca3af', '#6b7280', '#374151',
  '#1f2937', '#111827', '#000000'
]

const updatePrimaryColors = (colors) => {
  // Update CSS custom properties
  document.documentElement.style.setProperty('--color-primary', colors.main)
  document.documentElement.style.setProperty('--color-primary-50', colors.lightest)
  document.documentElement.style.setProperty('--color-primary-900', colors.darkest)
}

const updateAccentColors = (colors) => {
  document.documentElement.style.setProperty('--color-accent', colors.main)
}

const updateNeutralColors = (colors) => {
  colors.forEach((color, index) => {
    document.documentElement.style.setProperty(`--color-neutral-${index * 100}`, color)
  })
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | string \| array | - | Selected colors (v-model) |
| `title` | string | - | Palette title |
| `colors` | array | - | Available colors |
| `mode` | string | 'list' | Display mode (list/grid) |
| `allow-custom` | boolean | false | Allow custom color input |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change` | color object | Color selection changed |

## FontSelector Component

Typography customization with font family selection.

```vue
<template>
  <div class="space-y-6">
    <!-- Heading fonts -->
    <FontSelector
      v-model="theme.fonts.heading"
      label="Heading Font"
      :fonts="headingFonts"
      :preview-text="headingPreview"
      category="headings"
    />

    <!-- Body fonts -->
    <FontSelector
      v-model="theme.fonts.body"
      label="Body Font"
      :fonts="bodyFonts"
      :preview-text="bodyPreview"
      category="body"
    />

    <!-- Monospace fonts -->
    <FontSelector
      v-model="theme.fonts.mono"
      label="Code Font"
      :fonts="monoFonts"
      :preview-text="codePreview"
      category="monospace"
    />
  </div>
</template>

<script setup>
const theme = ref({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono'
  }
})

const headingFonts = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat',
  'Poppins', 'Nunito', 'Source Sans Pro', 'Work Sans', 'Space Grotesk'
]

const bodyFonts = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Source Sans Pro',
  'Work Sans', 'Nunito', 'Poppins', 'Space Grotesk', 'IBM Plex Sans'
]

const monoFonts = [
  'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Monaco',
  'Consolas', 'Courier New', 'SF Mono', 'IBM Plex Mono'
]

const headingPreview = 'The quick brown fox jumps over the lazy dog'
const bodyPreview = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const codePreview = 'const theme = { fontFamily: "Inter" }'
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | string | - | Selected font (v-model) |
| `label` | string | - | Font selector label |
| `fonts` | array | - | Available fonts |
| `preview-text` | string | - | Preview text |
| `category` | string | - | Font category |

## SpacingControls Component

Interactive controls for margin, padding, and spacing settings.

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Margin controls -->
    <SpacingControls
      v-model="theme.spacing.margin"
      title="Margins"
      :options="marginOptions"
      unit="rem"
    />

    <!-- Padding controls -->
    <SpacingControls
      v-model="theme.spacing.padding"
      title="Padding"
      :options="paddingOptions"
      unit="rem"
    />

    <!-- Border radius -->
    <SpacingControls
      v-model="theme.borderRadius"
      title="Border Radius"
      :options="radiusOptions"
      unit="px"
    />

    <!-- Shadow controls -->
    <SpacingControls
      v-model="theme.shadows"
      title="Box Shadows"
      :options="shadowOptions"
      unit=""
    />
  </div>
</template>

<script setup>
const theme = ref({
  spacing: {
    margin: { xs: 0.25, sm: 0.5, md: 1, lg: 1.5, xl: 2 },
    padding: { xs: 0.25, sm: 0.5, md: 1, lg: 1.5, xl: 2 }
  },
  borderRadius: { sm: 4, md: 8, lg: 12, xl: 16 },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }
})

const marginOptions = [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8]
const paddingOptions = [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8]
const radiusOptions = [0, 2, 4, 6, 8, 12, 16, 24, 32]
const shadowOptions = ['none', 'sm', 'md', 'lg', 'xl', '2xl']
</script>
```

## LayoutPreview Component

Real-time preview of theme changes with visual feedback.

```vue
<template>
  <div class="space-y-6">
    <!-- Theme preview -->
    <LayoutPreview
      :theme="currentTheme"
      :components="previewComponents"
      class="border rounded-lg"
    />

    <!-- Component showcase -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card v-for="component in previewComponents" :key="component.name">
        <template #header>
          <h4 class="font-medium">{{ component.name }}</h4>
        </template>
        <component :is="component.component" />
      </Card>
    </div>
  </div>
</template>

<script setup>
const currentTheme = ref(defaultTheme)

const previewComponents = [
  {
    name: 'Button',
    component: 'Button',
    props: { variant: 'primary' }
  },
  {
    name: 'Card',
    component: 'Card',
    props: {}
  },
  {
    name: 'Input',
    component: 'Input',
    props: { label: 'Sample Input' }
  },
  {
    name: 'Badge',
    component: 'Badge',
    props: { variant: 'success' }
  }
]
</script>
```

## CSS Custom Properties

### Theme Variables

```css
/* Root theme variables */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;

  /* Typography */
  --font-family-heading: 'Inter', sans-serif;
  --font-family-body: 'Inter', sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Borders */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Dark theme */
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-primary-50: #1e3a8a;
  --color-primary-100: #1e40af;
  --color-primary-500: #60a5fa;
  --color-primary-900: #dbeafe;

  --color-background: #111827;
  --color-surface: #1f2937;
  --color-text: #f9fafb;
  --color-text-muted: #9ca3af;
}

/* High contrast theme */
[data-theme="high-contrast"] {
  --color-primary: #000000;
  --color-background: #ffffff;
  --color-text: #000000;
  --border-width: 2px;
}
```

### Dynamic Theme Updates

```vue
<script setup>
const updateThemeProperty = (property, value) => {
  document.documentElement.style.setProperty(property, value)

  // Update theme object
  const path = property.replace('--', '').split('-')
  let target = theme.value

  for (let i = 0; i < path.length - 1; i++) {
    target = target[path[i]] = target[path[i]] || {}
  }

  target[path[path.length - 1]] = value
}
</script>
```

## Advanced Features

### Theme Inheritance

```vue
<script setup>
// Base theme
const baseTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280'
  }
}

// Extended theme
const extendedTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    accent: '#10b981',
    success: '#22c55e'
  }
}
</script>
```

### Theme Validation

```vue
<script setup>
const validateTheme = (theme) => {
  const errors = []

  // Check required colors
  const requiredColors = ['primary', 'background', 'text']
  requiredColors.forEach(color => {
    if (!theme.colors[color]) {
      errors.push(`Missing required color: ${color}`)
    }
  })

  // Check contrast ratios
  const contrastRatio = getContrastRatio(
    theme.colors.primary,
    theme.colors.background
  )

  if (contrastRatio < 4.5) {
    errors.push('Primary color contrast ratio too low')
  }

  return errors
}
</script>
```

## Integration Examples

### With CSS-in-JS

```vue
<script setup>
import { useTheme } from '~/composables/useTheme'

const { theme, updateTheme } = useTheme()

// Apply theme to component styles
const componentStyles = computed(() => ({
  backgroundColor: theme.value.colors.background,
  color: theme.value.colors.text,
  borderColor: theme.value.colors.border
}))
</script>
```

### With Tailwind CSS

```vue
<script setup>
// Generate Tailwind theme configuration
const tailwindTheme = computed(() => ({
  colors: {
    primary: theme.value.colors.primary,
    secondary: theme.value.colors.secondary,
    success: theme.value.colors.success,
    warning: theme.value.colors.warning,
    error: theme.value.colors.error
  },
  fontFamily: {
    heading: theme.value.fonts.heading,
    body: theme.value.fonts.body,
    mono: theme.value.fonts.mono
  }
}))
</script>
```

## Best Practices

### Performance

1. **Preload** theme fonts
2. **Cache** theme calculations
3. **Debounce** rapid changes
4. **Lazy load** theme assets
5. **Optimize** CSS custom properties

### Accessibility

1. **Maintain contrast ratios** above 4.5:1
2. **Test with screen readers**
3. **Provide theme descriptions**
4. **Consider motion preferences**
5. **Validate color combinations**

### User Experience

1. **Provide smooth transitions**
2. **Show loading states** for theme changes
3. **Allow theme preview** before applying
4. **Remember user preferences**
5. **Offer reset functionality**

## Troubleshooting

### Common Issues

**Theme not applying:**
- Check CSS custom property names
- Verify theme provider setup
- Check for JavaScript errors

**Colors not updating:**
- Ensure color format is valid
- Check CSS specificity
- Verify theme context

**Fonts not loading:**
- Check font loading strategy
- Verify font URLs
- Check network connectivity

## Contributing

Help improve theme components:

1. **Add new theme options**
2. **Improve accessibility**
3. **Optimize performance**
4. **Add comprehensive tests**
5. **Create theme templates**

## Resources

- **[CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)**
- **[Color Accessibility](https://webaim.org/articles/contrast/)**
- **[Typography Guidelines](https://material.io/design/typography/the-type-system.html)**
- **[Theme Design](https://material.io/design/color/the-color-system.html)**

---

**Next**: **[Component Overview](../overview)** for complete component reference and **[Authentication Components](../auth)** for user management.
