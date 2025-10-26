---
title: Common Components
description: Reusable UI components for forms, buttons, cards, and more
category: components
order: 3
---

# Common Components

God Panel's common components provide a solid foundation for building consistent and accessible user interfaces. These components are designed to be flexible, themeable, and easy to integrate.

## Component Categories

### 🎯 Form Components
- **Input**: Text inputs with validation
- **Textarea**: Multi-line text inputs
- **Select**: Dropdown selection
- **Checkbox**: Boolean inputs
- **Radio**: Single-choice options
- **Switch**: Toggle controls

### 🔘 Button Components
- **Button**: Primary UI actions
- **IconButton**: Icon-only buttons
- **ButtonGroup**: Grouped button controls

### 📦 Layout Components
- **Card**: Content containers
- **Container**: Page layout wrapper
- **Grid**: Responsive grid system
- **Flex**: Flexible layouts

## Button Component

The `Button` component is the primary interactive element in your interface.

```vue
<template>
  <div class="space-y-4">
    <!-- Basic buttons -->
    <Button>Default Button</Button>
    <Button variant="primary">Primary Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="success">Success Button</Button>
    <Button variant="warning">Warning Button</Button>
    <Button variant="error">Error Button</Button>

    <!-- Different sizes -->
    <Button size="xs">XS Button</Button>
    <Button size="sm">Small Button</Button>
    <Button size="md">Medium Button</Button>
    <Button size="lg">Large Button</Button>
    <Button size="xl">XL Button</Button>

    <!-- With icons -->
    <Button icon="save">Save Changes</Button>
    <Button icon="plus" variant="primary">Add Item</Button>

    <!-- Loading state -->
    <Button :loading="isLoading">Processing...</Button>

    <!-- Disabled state -->
    <Button disabled>Disabled Button</Button>
  </div>
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | 'default' | Button style variant |
| `size` | string | 'md' | Button size |
| `icon` | string | - | Icon name (from icon library) |
| `loading` | boolean | false | Show loading spinner |
| `disabled` | boolean | false | Disable button interaction |
| `fullWidth` | boolean | false | Make button full width |

### Events

| Event | Description |
|-------|-------------|
| `click` | Emitted when button is clicked |

## Input Component

Flexible input component with validation and accessibility features.

```vue
<template>
  <div class="space-y-4">
    <!-- Basic text input -->
    <Input
      v-model="email"
      label="Email Address"
      placeholder="Enter your email"
      type="email"
    />

    <!-- With validation -->
    <Input
      v-model="password"
      label="Password"
      type="password"
      :error="passwordError"
      hint="Must be at least 8 characters"
    />

    <!-- Required field -->
    <Input
      v-model="username"
      label="Username"
      required
      :error="usernameError"
    />

    <!-- Disabled state -->
    <Input
      label="Disabled Field"
      disabled
      value="Cannot edit this"
    />
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const username = ref('')

const passwordError = computed(() => {
  if (password.value.length < 8) {
    return 'Password must be at least 8 characters'
  }
  return ''
})

const usernameError = computed(() => {
  if (!username.value) {
    return 'Username is required'
  }
  return ''
})
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | string \| number | - | Input value (v-model) |
| `label` | string | - | Input label |
| `placeholder` | string | - | Placeholder text |
| `type` | string | 'text' | Input type |
| `required` | boolean | false | Mark as required |
| `disabled` | boolean | false | Disable input |
| `error` | string | - | Error message |
| `hint` | string | - | Helper text |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | string \| number | Emitted when value changes |
| `blur` | Event | Emitted when input loses focus |
| `focus` | Event | Emitted when input gains focus |

## Card Component

Content containers for organizing information.

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Basic card -->
    <Card>
      <template #header>
        <h3 class="text-lg font-semibold">Card Title</h3>
      </template>

      <p class="text-gray-600 dark:text-gray-300">
        Card content goes here. This is a flexible container for your content.
      </p>

      <template #footer>
        <div class="flex justify-between">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Save</Button>
        </div>
      </template>
    </Card>

    <!-- Card with image -->
    <Card>
      <template #image>
        <img src="/placeholder.jpg" alt="Card image" class="w-full h-48 object-cover rounded-t-lg" />
      </template>

      <template #header>
        <h3>Image Card</h3>
      </template>

      <p>Card with an image header.</p>
    </Card>
  </div>
</template>
```

### Slots

| Slot | Description |
|------|-------------|
| `default` | Card content |
| `header` | Card header |
| `footer` | Card footer |
| `image` | Card image (shows above content) |

## Form Components

### Select Component

```vue
<template>
  <Select
    v-model="selectedCountry"
    label="Country"
    :options="countries"
    placeholder="Select a country"
  />
</template>

<script setup>
const selectedCountry = ref('')

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' }
]
</script>
```

### Checkbox Component

```vue
<template>
  <div class="space-y-2">
    <Checkbox
      v-model="notifications"
      label="Email notifications"
    />
    <Checkbox
      v-model="marketing"
      label="Marketing emails"
    />
    <Checkbox
      v-model="security"
      label="Security alerts"
      disabled
    />
  </div>
</template>

<script setup>
const notifications = ref(true)
const marketing = ref(false)
const security = ref(true)
</script>
```

## Layout Components

### Grid Component

```vue
<template>
  <!-- Responsive grid -->
  <Grid :columns="{ default: 1, md: 2, lg: 3 }" gap="6">
    <Card v-for="item in items" :key="item.id">
      {{ item.title }}
    </Card>
  </Grid>

  <!-- Fixed columns -->
  <Grid columns="3" gap="4">
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
      Column 1
    </div>
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
      Column 2
    </div>
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
      Column 3
    </div>
  </Grid>
</template>
```

### Container Component

```vue
<template>
  <Container size="xl" class="py-8">
    <h1 class="text-3xl font-bold mb-6">Page Title</h1>

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <!-- Page content -->
    </div>
  </Container>
</template>
```

## Theming and Customization

### CSS Custom Properties

All components use CSS custom properties for consistent theming:

```css
/* Component theming */
:root {
  --button-primary-bg: var(--color-primary);
  --button-primary-text: var(--color-white);
  --button-secondary-bg: var(--color-gray-100);
  --button-secondary-text: var(--color-gray-900);

  --input-border: var(--color-gray-300);
  --input-border-focus: var(--color-primary);
  --input-bg: var(--color-white);
  --input-text: var(--color-gray-900);

  --card-bg: var(--color-white);
  --card-border: var(--color-gray-200);
  --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --button-secondary-bg: var(--color-gray-800);
  --button-secondary-text: var(--color-gray-100);

  --input-bg: var(--color-gray-800);
  --input-text: var(--color-gray-100);
  --input-border: var(--color-gray-600);

  --card-bg: var(--color-gray-800);
  --card-border: var(--color-gray-700);
}
```

### Component Variants

Most components support multiple variants:

```vue
<!-- Button variants -->
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="info">Info</Button>

<!-- Size variants -->
<Button size="xs">XS</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">XL</Button>
```

## Accessibility Features

### Keyboard Navigation

All components support full keyboard navigation:

- **Tab**: Navigate between components
- **Enter/Space**: Activate buttons and checkboxes
- **Arrow keys**: Navigate select options and radio groups
- **Escape**: Close modals and dropdowns

### Screen Reader Support

Components include proper ARIA attributes:

```vue
<!-- Automatic ARIA attributes -->
<Button aria-label="Save changes" />
<Input label="Email address" aria-describedby="email-hint" />
<Checkbox label="Remember me" aria-checked="true" />
```

### Focus Management

Visual focus indicators and logical focus flow:

```css
/* Focus styles */
.button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}
```

## Advanced Usage

### Custom Validation

```vue
<template>
  <Input
    v-model="email"
    label="Email"
    :rules="emailRules"
    :validate-on="['blur', 'input']"
  />
</template>

<script setup>
const email = ref('')

const emailRules = [
  { required: true, message: 'Email is required' },
  {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  }
]
</script>
```

### Async Validation

```vue
<script setup>
const username = ref('')
const checkingUsername = ref(false)
const usernameError = ref('')

const validateUsername = async (username) => {
  if (!username) return

  checkingUsername.value = true

  try {
    const response = await $fetch(`/api/users/check-username`, {
      method: 'POST',
      body: { username }
    })

    if (!response.available) {
      usernameError.value = 'Username is already taken'
    } else {
      usernameError.value = ''
    }
  } catch (error) {
    usernameError.value = 'Error checking username availability'
  } finally {
    checkingUsername.value = false
  }
}

watch(username, (newValue) => {
  if (newValue) {
    validateUsername(newValue)
  }
})
</script>
```

## Performance Considerations

### Lazy Loading

```vue
<script setup>
const showAdvancedForm = ref(false)

const loadAdvancedComponents = async () => {
  showAdvancedForm.value = false

  // Lazy load heavy components
  const { AdvancedForm } = await import('~/components/forms/AdvancedForm.vue')

  showAdvancedForm.value = true
}
</script>
```

### Component Memoization

```vue
<script setup>
const expensiveOptions = computed(() => {
  // Expensive calculation
  return generateOptions()
})
</script>

<template>
  <Select
    :options="expensiveOptions"
    placeholder="Select an option"
  />
</template>
```

## Integration Examples

### With Form Libraries

```vue
<!-- Using @vueuse/form -->
<script setup>
import { useForm } from '@vueuse/form'

const form = useForm({
  email: '',
  password: ''
})

const submitForm = async () => {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: form.data
    })
  } catch (error) {
    form.setErrors(error.response?.data?.errors || {})
  }
}
</script>
```

### With Validation Libraries

```vue
<!-- Using yup or zod -->
<script setup>
import { object, string } from 'yup'

const schema = object({
  email: string().email().required(),
  password: string().min(8).required()
})

const validateForm = async () => {
  try {
    await schema.validate(form.data)
    // Form is valid
  } catch (error) {
    // Handle validation errors
  }
}
</script>
```

## Best Practices

### Component Usage

1. **Use semantic HTML** when possible
2. **Provide meaningful labels** for all inputs
3. **Group related components** logically
4. **Use consistent naming** conventions
5. **Handle loading and error states**

### Styling

1. **Use CSS custom properties** for theming
2. **Avoid inline styles** when possible
3. **Follow design system** guidelines
4. **Test in both light and dark modes**
5. **Ensure responsive design**

### Performance

1. **Lazy load** non-critical components
2. **Memoize** expensive computations
3. **Use proper key props** in lists
4. **Avoid deep nesting** when possible
5. **Optimize re-renders** with proper state management

## Troubleshooting

### Common Issues

**Components not rendering:**
- Check if components are properly imported/registered
- Verify prop names and types
- Check browser console for errors

**Styling issues:**
- Ensure CSS custom properties are defined
- Check for CSS specificity conflicts
- Verify theme configuration

**Form validation not working:**
- Check validation rule syntax
- Verify event handling
- Test with simple validation first

## Contributing

Help improve the common components:

1. **Report bugs** and issues
2. **Suggest new components** or features
3. **Improve accessibility** and usability
4. **Add comprehensive tests**
5. **Update documentation** with examples

## Resources

- **[Vue 3 Documentation](https://vuejs.org/)**
- **[Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)**
- **[Form Design Best Practices](https://www.nngroup.com/articles/web-form-design/)**
- **[Component Design Patterns](https://www.patterns.dev/)**

---

**Next**: Explore **[Dashboard Components](../dashboard)** for data visualization and **[Theme Components](../theme)** for styling options.
