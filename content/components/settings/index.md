---
title: Settings Components
description: Configuration and settings components for admin interfaces
category: components
order: 5
---

# Settings Components

God Panel's settings components provide a complete solution for building configuration interfaces. These components handle user preferences, application settings, and system configuration with a consistent and user-friendly approach.

## Component Categories

### ⚙️ Configuration
- **SettingsForm**: General application settings
- **UserPreferences**: User-specific settings
- **SystemConfig**: System-level configuration
- **ProfileSettings**: User profile management

### 🎛️ Controls
- **ToggleSwitch**: Boolean settings
- **SelectField**: Dropdown configurations
- **ColorPicker**: Theme color selection
- **FileUpload**: Configuration file uploads

### 📝 Forms
- **FormBuilder**: Dynamic form generation
- **ValidationRules**: Setting validation
- **FormPreview**: Configuration preview

## SettingsForm Component

Main component for handling application settings with validation and persistence.

```vue
<template>
  <SettingsForm
    :settings="settings"
    :schema="settingsSchema"
    @save="handleSave"
    @reset="handleReset"
    @validate="handleValidation"
  >
    <!-- General Settings -->
    <SettingsSection title="General" icon="settings">
      <Input
        v-model="settings.siteName"
        label="Site Name"
        placeholder="My Application"
      />

      <Textarea
        v-model="settings.description"
        label="Description"
        placeholder="Application description"
        rows="3"
      />

      <Select
        v-model="settings.language"
        label="Default Language"
        :options="languageOptions"
      />
    </SettingsSection>

    <!-- Email Settings -->
    <SettingsSection title="Email" icon="mail">
      <Input
        v-model="settings.smtpHost"
        label="SMTP Host"
        placeholder="smtp.example.com"
      />

      <Input
        v-model="settings.smtpPort"
        label="SMTP Port"
        type="number"
        placeholder="587"
      />

      <Checkbox
        v-model="settings.smtpTls"
        label="Use TLS encryption"
      />
    </SettingsSection>

    <!-- Advanced Settings -->
    <SettingsSection title="Advanced" icon="code">
      <ToggleSwitch
        v-model="settings.debugMode"
        label="Debug Mode"
        description="Enable debug logging and error reporting"
      />

      <ToggleSwitch
        v-model="settings.maintenanceMode"
        label="Maintenance Mode"
        description="Put the application in maintenance mode"
        variant="warning"
      />
    </SettingsSection>
  </SettingsForm>
</template>

<script setup>
const settings = ref({
  siteName: 'God Panel',
  description: 'Modern admin dashboard',
  language: 'en',
  smtpHost: '',
  smtpPort: 587,
  smtpTls: true,
  debugMode: false,
  maintenanceMode: false
})

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' }
]

const settingsSchema = {
  siteName: { required: true, minLength: 2 },
  description: { required: true, maxLength: 500 },
  language: { required: true },
  smtpHost: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  smtpPort: { type: 'number', min: 1, max: 65535 }
}

const handleSave = async (formData) => {
  try {
    await $fetch('/api/settings', {
      method: 'PUT',
      body: formData
    })
    // Show success message
  } catch (error) {
    // Handle error
  }
}

const handleReset = () => {
  // Reset to default values
  Object.assign(settings.value, defaultSettings)
}

const handleValidation = (errors) => {
  // Handle validation errors
  console.log('Validation errors:', errors)
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `settings` | object | {} | Current settings values |
| `schema` | object | {} | Validation schema |
| `loading` | boolean | false | Show loading state |
| `disabled` | boolean | false | Disable form editing |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `save` | form data | Settings saved successfully |
| `reset` | - | Settings reset to defaults |
| `validate` | errors | Validation completed |

## SettingsSection Component

Organize settings into collapsible sections.

```vue
<template>
  <SettingsSection
    title="Notifications"
    icon="bell"
    :collapsible="true"
    :default-open="true"
  >
    <div class="space-y-4">
      <ToggleSwitch
        v-model="settings.emailNotifications"
        label="Email Notifications"
        description="Receive email notifications"
      />

      <ToggleSwitch
        v-model="settings.pushNotifications"
        label="Push Notifications"
        description="Receive push notifications"
      />

      <ToggleSwitch
        v-model="settings.smsNotifications"
        label="SMS Notifications"
        description="Receive SMS notifications"
      />
    </div>
  </SettingsSection>
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Section title |
| `icon` | string | - | Section icon |
| `collapsible` | boolean | false | Make section collapsible |
| `default-open` | boolean | true | Default open state |

## ToggleSwitch Component

Boolean settings with toggle controls.

```vue
<template>
  <div class="space-y-4">
    <!-- Basic toggle -->
    <ToggleSwitch
      v-model="featureEnabled"
      label="Enable Feature"
      description="Turn this feature on or off"
    />

    <!-- With custom styling -->
    <ToggleSwitch
      v-model="darkMode"
      label="Dark Mode"
      description="Use dark theme"
      variant="theme"
    />

    <!-- Disabled state -->
    <ToggleSwitch
      v-model="experimentalFeature"
      label="Experimental Feature"
      description="This feature is experimental"
      disabled
    />
  </div>
</template>

<script setup>
const featureEnabled = ref(true)
const darkMode = ref(false)
const experimentalFeature = ref(false)
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | boolean | false | Toggle value (v-model) |
| `label` | string | - | Toggle label |
| `description` | string | - | Helper description |
| `disabled` | boolean | false | Disable toggle |
| `variant` | string | 'default' | Visual variant |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | boolean | Value changed |

## ColorPicker Component

Theme color selection for customization.

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Primary color -->
    <ColorPicker
      v-model="theme.primary"
      label="Primary Color"
      :presets="colorPresets"
      show-alpha
    />

    <!-- Accent color -->
    <ColorPicker
      v-model="theme.accent"
      label="Accent Color"
      :presets="accentPresets"
    />

    <!-- Background color -->
    <ColorPicker
      v-model="theme.background"
      label="Background Color"
      :presets="backgroundPresets"
      show-alpha
    />
  </div>
</template>

<script setup>
const theme = ref({
  primary: '#3b82f6',
  accent: '#10b981',
  background: '#ffffff'
})

const colorPresets = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
]

const accentPresets = [
  '#10b981', '#3b82f6', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#06b6d4', '#64748b'
]

const backgroundPresets = [
  '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0',
  '#1e293b', '#0f172a', '#18181b', '#27272a'
]
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | string | - | Color value (v-model) |
| `label` | string | - | Color picker label |
| `presets` | array | [] | Predefined color options |
| `show-alpha` | boolean | false | Show alpha channel |
| `format` | string | 'hex' | Color format |

## FormBuilder Component

Dynamic form generation based on schema.

```vue
<template>
  <FormBuilder
    :schema="dynamicSchema"
    :values="formValues"
    @submit="handleSubmit"
    @change="handleChange"
  />
</template>

<script setup>
const formValues = ref({})

const dynamicSchema = {
  name: {
    type: 'text',
    label: 'Full Name',
    required: true,
    placeholder: 'Enter your full name'
  },
  email: {
    type: 'email',
    label: 'Email Address',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email'
    }
  },
  role: {
    type: 'select',
    label: 'User Role',
    required: true,
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' }
    ]
  },
  notifications: {
    type: 'checkbox',
    label: 'Email Notifications',
    description: 'Receive email updates'
  },
  bio: {
    type: 'textarea',
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    rows: 4
  }
}

const handleSubmit = async (values) => {
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: values
    })
    // Success handling
  } catch (error) {
    // Error handling
  }
}

const handleChange = (field, value) => {
  console.log(`Field ${field} changed to:`, value)
}
</script>
```

## Theming and Styling

### Settings Theming

```css
/* Settings form theming */
.settings-form {
  --settings-bg: var(--color-white);
  --settings-border: var(--color-gray-200);
  --settings-text: var(--color-gray-900);
  --settings-muted: var(--color-gray-500);
  --settings-primary: var(--color-primary);
}

[data-theme="dark"] .settings-form {
  --settings-bg: var(--color-gray-800);
  --settings-border: var(--color-gray-700);
  --settings-text: var(--color-gray-100);
  --settings-muted: var(--color-gray-400);
}

/* Section styling */
.settings-section {
  background: var(--settings-bg);
  border: 1px solid var(--settings-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.settings-section-header {
  color: var(--settings-text);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-4);
}
```

### Toggle Styling

```css
/* Toggle switch theming */
.toggle-switch {
  --toggle-bg: var(--color-gray-200);
  --toggle-bg-active: var(--color-primary);
  --toggle-knob: var(--color-white);
  --toggle-border: var(--color-gray-300);
}

[data-theme="dark"] .toggle-switch {
  --toggle-bg: var(--color-gray-700);
  --toggle-border: var(--color-gray-600);
}

.toggle-switch--checked {
  --toggle-bg: var(--toggle-bg-active);
}

.toggle-switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Validation and Error Handling

### Built-in Validation

```vue
<script setup>
const validationRules = {
  email: [
    { required: true, message: 'Email is required' },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    }
  ],
  password: [
    { required: true, message: 'Password is required' },
    { minLength: 8, message: 'Password must be at least 8 characters' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain uppercase, lowercase, and number'
    }
  ],
  confirmPassword: [
    { required: true, message: 'Password confirmation is required' },
    {
      validator: (value, formData) => value === formData.password,
      message: 'Passwords do not match'
    }
  ]
}
</script>
```

### Custom Validation

```vue
<template>
  <SettingsForm
    :settings="settings"
    :custom-validators="customValidators"
    @validate="handleCustomValidation"
  />
</template>

<script setup>
const customValidators = {
  username: async (value) => {
    if (!value) return 'Username is required'

    try {
      const response = await $fetch(`/api/users/check-username`, {
        method: 'POST',
        body: { username: value }
      })

      if (!response.available) {
        return 'Username is already taken'
      }

      return true
    } catch (error) {
      return 'Error checking username availability'
    }
  }
}

const handleCustomValidation = (errors) => {
  console.log('Custom validation errors:', errors)
}
</script>
```

## Persistence and Storage

### Local Storage

```vue
<script setup>
const settings = useLocalStorage('app-settings', defaultSettings)

const saveSettings = () => {
  // Settings are automatically saved to localStorage
  console.log('Settings saved:', settings.value)
}
</script>
```

### API Persistence

```vue
<script setup>
const settings = ref(defaultSettings)

// Load settings from API
onMounted(async () => {
  try {
    const savedSettings = await $fetch('/api/settings')
    Object.assign(settings.value, savedSettings)
  } catch (error) {
    console.error('Failed to load settings:', error)
  }
})

const saveSettings = async () => {
  try {
    await $fetch('/api/settings', {
      method: 'PUT',
      body: settings.value
    })
    // Show success message
  } catch (error) {
    // Show error message
  }
}
</script>
```

## Advanced Features

### Settings Import/Export

```vue
<template>
  <div class="flex space-x-2">
    <Button variant="secondary" @click="exportSettings">
      Export Settings
    </Button>
    <Button variant="secondary" @click="importSettings">
      Import Settings
    </Button>
  </div>
</template>

<script setup>
const exportSettings = () => {
  const settingsJson = JSON.stringify(settings.value, null, 2)
  const blob = new Blob([settingsJson], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'settings.json'
  link.click()

  URL.revokeObjectURL(url)
}

const importSettings = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'

  input.onchange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result)
          Object.assign(settings.value, importedSettings)
          // Show success message
        } catch (error) {
          // Show error message
        }
      }
      reader.readAsText(file)
    }
  }

  input.click()
}
</script>
```

### Settings History

```vue
<template>
  <div class="space-y-4">
    <h3>Settings History</h3>
    <div v-for="entry in settingsHistory" :key="entry.id" class="border rounded p-4">
      <div class="flex justify-between items-start">
        <div>
          <div class="font-medium">{{ entry.description }}</div>
          <div class="text-sm text-gray-500">{{ entry.timestamp }}</div>
        </div>
        <Button size="sm" variant="secondary" @click="revertTo(entry)">
          Revert
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
const settingsHistory = ref([])

const revertTo = (entry) => {
  Object.assign(settings.value, entry.data)
  // Save reverted settings
}
</script>
```

## Integration Examples

### With Vue I18n

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const settings = computed(() => ({
  siteName: t('settings.siteName'),
  description: t('settings.description')
}))
</script>
```

### With Pinia Store

```vue
<script setup>
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()

const settings = computed(() => settingsStore.settings)
const saveSettings = () => settingsStore.updateSettings(settings.value)
</script>
```

## Best Practices

### User Experience

1. **Provide clear labels** and descriptions
2. **Group related settings** logically
3. **Show validation feedback** immediately
4. **Offer reset functionality** for mistakes
5. **Save automatically** when appropriate

### Performance

1. **Debounce** rapid changes
2. **Lazy load** complex components
3. **Cache** settings data
4. **Optimize** re-renders
5. **Use virtual scrolling** for long lists

### Security

1. **Validate** all input on server
2. **Sanitize** user input
3. **Use secure storage** methods
4. **Implement proper permissions**
5. **Log setting changes** for audit

## Troubleshooting

### Common Issues

**Settings not saving:**
- Check API endpoints are accessible
- Verify authentication is working
- Check browser console for errors

**Validation not working:**
- Ensure validation schema is correct
- Check if validation functions are async
- Verify error handling

**Styling issues:**
- Check CSS custom properties
- Verify theme configuration
- Test in different browsers

## Contributing

Help improve settings components:

1. **Add new setting types**
2. **Improve validation**
3. **Enhance accessibility**
4. **Add comprehensive tests**
5. **Create example implementations**

## Resources

- **[Form Design Patterns](https://www.lukew.com/ff/entry.asp?1502)**
- **[Settings UI Best Practices](https://material.io/design/communication/settings.html)**
- **[Accessibility Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/)**

---

**Next**: Explore **[Theme Components](../theme)** for visual customization and **[Component Overview](../overview)** for all available components.
