---
title: Dashboard Components
description: Navigation and layout components for dashboard interfaces
category: components
order: 4
---

# Dashboard Components

God Panel's dashboard components provide comprehensive navigation and layout functionality for admin interfaces. These components work together to create responsive, accessible dashboard navigation with theme support and internationalization.

## Component Categories

### 🧭 Navigation Components
- **DashboardHeader**: Top navigation bar with breadcrumbs, notifications, and user menu
- **DashboardNav**: Main sidebar navigation with collapsible groups and mini mode
- **DashboardNavMobile**: Mobile-optimized navigation drawer

### 🎨 Layout Features
- **Responsive Design**: Adapts to desktop, tablet, and mobile
- **RTL Support**: Right-to-left language support
- **Theme Integration**: Dark/light mode compatibility
- **Mini Mode**: Collapsible sidebar for space efficiency

## DashboardHeader Component

The main navigation header component with breadcrumbs, search, notifications, and user menu.

```vue
<template>
  <!-- Main dashboard header -->
  <DashboardHeader
    :mobile="isMobile"
    @toggle-nav="handleNavToggle"
  />
</template>

<script setup>
const isMobile = ref(false)
const navigationOpen = ref(false)

const handleNavToggle = () => {
  navigationOpen.value = !navigationOpen.value
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mobile` | boolean | `false` | Enable mobile-specific styling |
| `isHorizontal` | boolean | `false` | Horizontal layout mode |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `toggle-nav` | - | Emitted when mobile nav toggle is clicked |

### Features

- **Breadcrumbs**: Dynamic breadcrumb navigation based on current route
- **Search Field**: Integrated search functionality (commented in current implementation)
- **Notification Dropdown**: Real-time notifications with badge counter
- **User Menu**: Profile access, settings, and logout options
- **Theme Integration**: Language switcher and settings button
- **Responsive Design**: Mobile-friendly layout with collapsible elements

### Breadcrumb Integration

The header automatically generates breadcrumbs from the current route:

```vue
<script setup>
// Breadcrumbs are generated from route path
// Example: /dashboard/users/edit -> Dashboard > Users > Edit
const breadcrumbItems = [
  { title: 'Dashboard', to: '/dashboard' },
  { title: 'Users', to: '/dashboard/users' },
  { title: 'Edit', disabled: true }
]
</script>
```

## DashboardNav Component

The main sidebar navigation with advanced features for desktop and tablet interfaces.

```vue
<template>
  <DashboardNav
    :mini="sidebarMini"
    :mobile="false"
    @toggle-mini="handleMiniToggle"
  />
</template>

<script setup>
const sidebarMini = ref(false)

const handleMiniToggle = () => {
  sidebarMini.value = !sidebarMini.value
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mini` | boolean | `false` | Collapsed mini mode |
| `mobile` | boolean | `false` | Mobile navigation style |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `toggle-mini` | - | Emitted when mini mode toggle is clicked |
| `open-mobile` | - | Emitted when mobile menu is opened |

### Features

- **Collapsible Groups**: Expandable navigation sections
- **Mini Mode**: Space-efficient collapsed state
- **Active Route Detection**: Automatic highlighting of current page
- **Badge Support**: Notification badges on navigation items
- **RTL Support**: Right-to-left text direction support
- **Theme Integration**: Respects current theme and layout settings

### Navigation Structure

```vue
<script setup>
// Navigation items are defined in ~/utils/routes
const navItems = [
  {
    key: 'dashboard',
    title: 'nav.dashboard',
    path: '/dashboard',
    icon: 'mdi-view-dashboard'
  },
  {
    key: 'users',
    title: 'nav.users',
    path: '/dashboard/users',
    icon: 'mdi-account-group',
    badge: '3'
  },
  {
    key: 'settings',
    title: 'nav.settings',
    icon: 'mdi-cog',
    children: [
      { key: 'profile', title: 'nav.profile', path: '/dashboard/profile', icon: 'mdi-account' },
      { key: 'preferences', title: 'nav.preferences', path: '/dashboard/preferences', icon: 'mdi-tune' }
    ]
  }
]
</script>
```

### Responsive Behavior

```vue
<template>
  <!-- Desktop: Always visible sidebar -->
  <DashboardNav v-if="!mobile" :mini="mini" />

  <!-- Tablet/Mobile: Overlay drawer -->
  <DashboardNavMobile v-else :open="navOpen" @close="closeNav" />
</template>
```

## DashboardNavMobile Component

Mobile-optimized navigation drawer with user profile and quick actions.

```vue
<template>
  <DashboardNavMobile
    :open="navOpen"
    @update:open="navOpen = $event"
    @close="handleClose"
  />
</template>

<script setup>
const navOpen = ref(false)

const handleClose = () => {
  navOpen.value = false
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | boolean | `false` | Controls drawer visibility |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | boolean | Drawer open state changed |
| `close` | - | Emitted when close is requested |

### Features

- **User Profile Section**: Avatar, name, and role display
- **Full Navigation**: Complete navigation menu for mobile
- **Quick Actions**: Settings and logout buttons in footer
- **Touch Optimized**: Mobile-friendly touch targets
- **Accessibility**: ARIA labels and keyboard navigation

## Navigation Configuration

Navigation items are centrally managed in the routes utility:

```typescript
// ~/utils/routes.ts
export interface NavItem {
  key: string
  title: string
  path: string
  icon: string
  badge?: string
  children?: NavItem[]
}

export const dashboardNavItems: NavItem[] = [
  {
    key: 'overview',
    title: 'nav.overview',
    path: '/dashboard',
    icon: 'mdi-view-dashboard'
  },
  {
    key: 'analytics',
    title: 'nav.analytics',
    path: '/dashboard/analytics',
    icon: 'mdi-chart-line',
    badge: 'new'
  },
  // ... more items
]
```

## Theme Integration

All dashboard components integrate with the theme system:

```vue
<script setup>
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()

// Components automatically adapt to theme changes
// - Dark/light mode support
// - Compact layout mode
// - RTL text direction
// - Custom color schemes
</script>
```

## Responsive Breakpoints

The components adapt to different screen sizes:

```css
/* Mobile (< 960px) */
.dashboard-header .search-field {
  display: none;
}

/* Tablet (960px - 1263px) */
.dashboard-nav {
  width: 260px; /* Standard width */
}

/* Desktop (≥ 1264px) */
.dashboard-nav {
  width: 300px; /* Full width */
}

.nav-mini {
  width: 88px; /* Collapsed width */
}
```

## Internationalization

Navigation supports full i18n integration:

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Navigation titles use translation keys
// nav.dashboard -> "Dashboard"
// nav.users -> "Users"
// nav.settings -> "Settings"
</script>
```

## Integration Examples

### Complete Dashboard Layout

```vue
<template>
  <div class="dashboard-layout">
    <!-- Top header -->
    <DashboardHeader
      :mobile="mobile"
      @toggle-nav="toggleMobileNav"
    />

    <!-- Main navigation -->
    <DashboardNav
      v-if="!mobile"
      :mini="sidebarMini"
      @toggle-mini="toggleMiniMode"
    />

    <!-- Mobile navigation -->
    <DashboardNavMobile
      v-else
      :open="mobileNavOpen"
      @close="closeMobileNav"
    />

    <!-- Main content -->
    <main class="dashboard-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()
const mobile = ref(false)
const sidebarMini = ref(false)
const mobileNavOpen = ref(false)

const toggleMobileNav = () => {
  mobileNavOpen.value = !mobileNavOpen.value
}

const toggleMiniMode = () => {
  sidebarMini.value = !sidebarMini.value
}

const closeMobileNav = () => {
  mobileNavOpen.value = false
}

// Responsive detection
const checkMobile = () => {
  mobile.value = window.innerWidth < 960
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
```

### Navigation with Permissions

```vue
<script setup>
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

// Filter navigation items based on permissions
const allowedNavItems = computed(() => {
  return dashboardNavItems.filter(item => {
    // Check if user has permission for this navigation item
    return authStore.hasPermission(item.permission) || !item.permission
  })
})

// Show admin-only sections
const showAdminSection = computed(() => {
  return authStore.hasRole('admin')
})
</script>
```

### Custom Navigation Items

```vue
<script setup>
// Add custom navigation items
const customNavItems = [
  {
    key: 'custom-reports',
    title: 'nav.customReports',
    path: '/dashboard/reports',
    icon: 'mdi-file-chart',
    badge: 'beta'
  }
]

// Combine with default navigation
const allNavItems = computed(() => {
  return [...dashboardNavItems, ...customNavItems]
})
</script>
```

## Customization

### Custom Styling

```css
/* Custom navigation colors */
.dashboard-nav {
  --nav-bg: rgb(var(--v-theme-surface));
  --nav-border: rgb(var(--v-theme-surface-variant));
  --nav-text: rgb(var(--v-theme-on-surface));
  --nav-active: rgb(var(--v-theme-primary));
}

.nav-item-active {
  background: rgba(var(--nav-active-rgb), 0.12);
  color: var(--nav-active);
}

/* Custom header styling */
.dashboard-header {
  --header-bg: rgb(var(--v-theme-surface));
  --header-border: rgb(var(--v-theme-surface-variant));
  --header-text: rgb(var(--v-theme-on-surface));
}
```

### Navigation Themes

```vue
<script setup>
// Different navigation themes
const navThemes = {
  light: {
    background: '#ffffff',
    border: '#e5e7eb',
    text: '#374151'
  },
  dark: {
    background: '#1f2937',
    border: '#374151',
    text: '#f9fafb'
  },
  colorful: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'transparent',
    text: '#ffffff'
  }
}
</script>
```

## Accessibility Features

All dashboard components are built with accessibility in mind:

### Keyboard Navigation

- **Tab Navigation**: Full keyboard navigation support
- **Enter/Space**: Activate buttons and links
- **Escape**: Close mobile navigation and dropdowns
- **Arrow Keys**: Navigate through menu items

### Screen Reader Support

```vue
<template>
  <DashboardNav
    aria-label="Main navigation"
    role="navigation"
  >
    <v-list-item
      v-for="item in navItems"
      :key="item.key"
      :aria-label="t(item.title)"
      role="menuitem"
    >
      {{ t(item.title) }}
    </v-list-item>
  </DashboardNav>
</template>
```

### ARIA Attributes

- **aria-label**: Descriptive labels for screen readers
- **role**: Proper semantic roles (navigation, menuitem, etc.)
- **aria-expanded**: Group expansion state
- **aria-current**: Current page indication

## Performance Considerations

### Navigation Loading

```vue
<script setup>
// Lazy load navigation items
const navItems = ref([])

onMounted(async () => {
  // Load navigation based on user permissions
  const userNav = await fetchNavigationForUser()
  navItems.value = userNav
})
</script>
```

### Mobile Performance

```vue
<script setup>
// Optimize mobile navigation
const mobileNavItems = computed(() => {
  // Limit items for mobile performance
  return navItems.value.slice(0, 10)
})
</script>
```

## Best Practices

### Navigation Structure

1. **Keep navigation shallow**: Limit nesting to 2-3 levels
2. **Use descriptive icons**: Choose icons that clearly represent functionality
3. **Group related items**: Use navigation groups for related features
4. **Consider user workflows**: Order items by frequency of use

### Mobile Experience

1. **Test touch targets**: Ensure buttons are at least 44px
2. **Optimize for thumb navigation**: Place important items in easy reach
3. **Provide quick actions**: Include common actions in mobile header
4. **Consider one-handed use**: Design for comfortable interaction

### Performance

1. **Lazy load navigation items**: Load only when needed
2. **Cache permissions**: Avoid repeated permission checks
3. **Debounce resize events**: Optimize responsive behavior
4. **Use computed properties**: Efficient reactive navigation state

## Troubleshooting

### Common Issues

**Navigation not responsive:**
- Check CSS media queries are working
- Verify viewport meta tag is set
- Test on actual devices, not just browser dev tools

**Active states not working:**
- Ensure route paths match navigation item paths
- Check `isActiveRoute` utility function
- Verify router configuration

**Theme not applying:**
- Check if theme store is properly configured
- Verify CSS custom properties are defined
- Test theme switching functionality

**Mobile navigation not opening:**
- Check if `open` prop is properly bound
- Verify event handlers are working
- Test touch events on mobile devices

**RTL layout issues:**
- Verify direction settings in theme store
- Check RTL-specific CSS rules
- Test with actual RTL languages

## Integration with Layout System

```vue
<!-- In your dashboard layout -->
<template>
  <div class="dashboard-container">
    <!-- Navigation components -->
    <DashboardHeader />
    <DashboardNav />
    <DashboardNavMobile />

    <!-- Content area -->
    <div class="dashboard-content">
      <!-- Page content with proper spacing -->
      <div class="content-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

.dashboard-content {
  flex: 1;
  margin-left: var(--nav-width, 300px);
  padding: 24px;
}

@media (max-width: 959px) {
  .dashboard-content {
    margin-left: 0;
  }
}
</style>
```

## Next Steps

- **[Layout Components](/content/components/overview)** - Complete layout components
- **[Theme Components](/content/components/theme/index)** - Theme customization options
- **[Settings Components](/content/components/settings/index)** - Settings drawer components
- **[Settings Store](/content/api/index)** - Navigation preferences
- **[Navigation Utils](/content/api/index)** - Navigation configuration and utilities

