---
title: Dashboard Components
description: Data visualization and dashboard components for admin interfaces
category: components
order: 4
---

# Dashboard Components

God Panel's dashboard components provide powerful data visualization and management tools for building comprehensive admin interfaces. These components are designed to display metrics, charts, and real-time data effectively.

## Component Categories

### 📊 Data Display
- **StatsCard**: Key metrics and KPIs
- **DataTable**: Sortable, filterable data tables
- **Chart**: Various chart types (line, bar, pie, etc.)
- **Progress**: Progress bars and indicators

### 📈 Analytics
- **MetricsGrid**: Grid of statistical cards
- **TrendChart**: Trending data visualization
- **ComparisonChart**: Side-by-side data comparison
- **Heatmap**: Color-coded data representation

### 🔄 Real-time Updates
- **LiveStats**: Real-time metric updates
- **ActivityFeed**: Live activity stream
- **NotificationPanel**: Real-time notifications

## StatsCard Component

Display key metrics and KPIs in an attractive card format.

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Basic stats -->
    <StatsCard
      title="Total Users"
      :value="userCount"
      icon="users"
      trend="+12%"
      trend-up
    />

    <StatsCard
      title="Revenue"
      :value="formatCurrency(revenue)"
      icon="dollar-sign"
      trend="+8.2%"
      trend-up
    />

    <StatsCard
      title="Orders"
      :value="orderCount"
      icon="shopping-cart"
      trend="-2.4%"
      :trend-up="false"
    />

    <StatsCard
      title="Conversion Rate"
      :value="conversionRate + '%'"
      icon="trending-up"
      trend="+5.1%"
      trend-up
    />
  </div>
</template>

<script setup>
const userCount = ref(12543)
const revenue = ref(45678.90)
const orderCount = ref(1234)
const conversionRate = ref(3.24)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Card title |
| `value` | string \| number | - | Main value to display |
| `icon` | string | - | Icon name |
| `trend` | string | - | Trend percentage |
| `trend-up` | boolean | true | Whether trend is positive |
| `loading` | boolean | false | Show loading state |

## DataTable Component

Powerful data table with sorting, filtering, and pagination.

```vue
<template>
  <DataTable
    :data="users"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    @sort="handleSort"
    @filter="handleFilter"
    @page-change="handlePageChange"
  >
    <!-- Custom column templates -->
    <template #name="{ item }">
      <div class="flex items-center space-x-3">
        <Avatar :src="item.avatar" :alt="item.name" size="sm" />
        <div>
          <div class="font-medium">{{ item.name }}</div>
          <div class="text-sm text-gray-500">{{ item.email }}</div>
        </div>
      </div>
    </template>

    <template #status="{ item }">
      <Badge :variant="getStatusVariant(item.status)">
        {{ item.status }}
      </Badge>
    </template>

    <template #actions="{ item }">
      <ButtonGroup size="sm">
        <Button variant="secondary" icon="eye" @click="viewUser(item)" />
        <Button variant="secondary" icon="edit" @click="editUser(item)" />
        <Button variant="error" icon="trash" @click="deleteUser(item)" />
      </ButtonGroup>
    </template>
  </DataTable>
</template>

<script setup>
const users = ref([])
const loading = ref(false)

const columns = [
  { key: 'name', label: 'User', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'createdAt', label: 'Created', sortable: true },
  { key: 'actions', label: 'Actions' }
]

const pagination = {
  page: 1,
  limit: 10,
  total: 0
}

const handleSort = (column, direction) => {
  // Handle sorting
  console.log('Sort:', column, direction)
}

const handleFilter = (filters) => {
  // Handle filtering
  console.log('Filters:', filters)
}

const handlePageChange = (page) => {
  // Handle pagination
  console.log('Page:', page)
}

const getStatusVariant = (status) => {
  const variants = {
    active: 'success',
    inactive: 'secondary',
    suspended: 'warning',
    banned: 'error'
  }
  return variants[status] || 'secondary'
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | array | [] | Table data |
| `columns` | array | [] | Column definitions |
| `loading` | boolean | false | Show loading state |
| `pagination` | object | - | Pagination configuration |
| `sortable` | boolean | true | Enable column sorting |
| `filterable` | boolean | true | Enable filtering |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `sort` | { column, direction } | Column sort changed |
| `filter` | filters object | Filters applied |
| `page-change` | page number | Page changed |
| `row-click` | row data | Row clicked |

## Chart Components

### Line Chart

```vue
<template>
  <Chart
    type="line"
    :data="chartData"
    :options="chartOptions"
    height="300"
  />
</template>

<script setup>
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    },
    {
      label: 'Users',
      data: [1200, 1900, 1500, 2500, 2200, 3000],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>
```

### Bar Chart

```vue
<template>
  <Chart
    type="bar"
    :data="barChartData"
    :options="barChartOptions"
    height="400"
  />
</template>

<script setup>
const barChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Sales',
      data: [45000, 52000, 48000, 61000],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderWidth: 0
    }
  ]
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>
```

## Progress Component

Visual progress indicators for various use cases.

```vue
<template>
  <div class="space-y-6">
    <!-- Basic progress -->
    <Progress :value="75" label="Completion" />

    <!-- With custom colors -->
    <Progress
      :value="60"
      label="Server Usage"
      variant="warning"
      show-percentage
    />

    <!-- Circular progress -->
    <Progress
      :value="85"
      type="circular"
      size="lg"
      label="Storage"
    />

    <!-- Multiple progress bars -->
    <div class="space-y-2">
      <Progress :value="100" label="CPU" variant="error" size="sm" />
      <Progress :value="65" label="Memory" variant="warning" size="sm" />
      <Progress :value="30" label="Disk" variant="success" size="sm" />
    </div>
  </div>
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | 0 | Progress value (0-100) |
| `label` | string | - | Progress label |
| `variant` | string | 'primary' | Color variant |
| `size` | string | 'md' | Size variant |
| `type` | string | 'linear' | 'linear' or 'circular' |
| `show-percentage` | boolean | false | Show percentage text |

## Real-time Components

### Live Stats

```vue
<template>
  <LiveStats
    :metrics="liveMetrics"
    :update-interval="5000"
    @update="handleMetricsUpdate"
  />
</template>

<script setup>
const liveMetrics = ref([
  { key: 'activeUsers', label: 'Active Users', icon: 'users', format: 'number' },
  { key: 'responseTime', label: 'Response Time', icon: 'clock', format: 'duration' },
  { key: 'errorRate', label: 'Error Rate', icon: 'alert-triangle', format: 'percentage' }
])

const handleMetricsUpdate = (metrics) => {
  console.log('Metrics updated:', metrics)
}
</script>
```

### Activity Feed

```vue
<template>
  <ActivityFeed
    :activities="activities"
    :loading="loading"
    @load-more="loadMoreActivities"
  />
</template>

<script setup>
const activities = ref([])
const loading = ref(false)

const loadMoreActivities = async () => {
  loading.value = true
  try {
    const newActivities = await $fetch('/api/activities', {
      params: {
        page: Math.floor(activities.value.length / 20) + 1
      }
    })
    activities.value.push(...newActivities)
  } finally {
    loading.value = false
  }
}
</script>
```

## Theming and Styling

### Chart Theming

```css
/* Chart color scheme */
.chart-container {
  --chart-primary: var(--color-primary);
  --chart-secondary: var(--color-secondary);
  --chart-success: var(--color-success);
  --chart-warning: var(--color-warning);
  --chart-error: var(--color-error);
}

[data-theme="dark"] .chart-container {
  --chart-grid: rgba(255, 255, 255, 0.1);
  --chart-text: var(--color-gray-300);
}

[data-theme="light"] .chart-container {
  --chart-grid: rgba(0, 0, 0, 0.1);
  --chart-text: var(--color-gray-700);
}
```

### Stats Card Styling

```css
/* Stats card theming */
.stats-card {
  --stats-bg: var(--color-white);
  --stats-border: var(--color-gray-200);
  --stats-text: var(--color-gray-900);
  --stats-text-muted: var(--color-gray-500);
  --stats-trend-up: var(--color-success);
  --stats-trend-down: var(--color-error);
}

[data-theme="dark"] .stats-card {
  --stats-bg: var(--color-gray-800);
  --stats-border: var(--color-gray-700);
  --stats-text: var(--color-gray-100);
  --stats-text-muted: var(--color-gray-400);
}
```

## Advanced Features

### Export Functionality

```vue
<template>
  <div class="flex space-x-2">
    <Button
      variant="secondary"
      icon="download"
      @click="exportToCSV"
    >
      Export CSV
    </Button>

    <Button
      variant="secondary"
      icon="file-text"
      @click="exportToPDF"
    >
      Export PDF
    </Button>
  </div>
</template>

<script setup>
const exportToCSV = () => {
  // Export table data to CSV
  const csv = generateCSV(tableData.value)
  downloadFile(csv, 'data.csv', 'text/csv')
}

const exportToPDF = () => {
  // Export chart or table to PDF
  const pdf = generatePDF()
  downloadFile(pdf, 'report.pdf', 'application/pdf')
}
</script>
```

### Filtering and Search

```vue
<template>
  <div class="flex space-x-4 mb-6">
    <Input
      v-model="searchQuery"
      placeholder="Search..."
      icon="search"
      class="flex-1"
    />

    <Select
      v-model="statusFilter"
      placeholder="Filter by status"
      :options="statusOptions"
    />

    <Button variant="secondary" @click="clearFilters">
      Clear Filters
    </Button>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const statusFilter = ref('')

const filteredData = computed(() => {
  let data = tableData.value

  // Apply search filter
  if (searchQuery.value) {
    data = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Apply status filter
  if (statusFilter.value) {
    data = data.filter(item => item.status === statusFilter.value)
  }

  return data
})
</script>
```

## Integration Examples

### With Chart.js

```vue
<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Chart component handles Chart.js integration automatically
</script>
```

### With Data Sources

```vue
<script setup>
// Fetch data from API
const dashboardData = ref(null)

onMounted(async () => {
  try {
    dashboardData.value = await $fetch('/api/dashboard')
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
})

// Real-time updates
const { data: liveData } = useFetch('/api/dashboard/live', {
  server: false,
  default: () => ({}),
  transform: (data) => ({
    users: data.activeUsers || 0,
    revenue: data.totalRevenue || 0,
    orders: data.orderCount || 0
  })
})
</script>
```

## Performance Optimization

### Virtual Scrolling

For large datasets, use virtual scrolling:

```vue
<template>
  <DataTable
    :data="largeDataset"
    :virtual-scroll="true"
    :item-height="60"
    :container-height="400"
  />
</template>
```

### Chart Optimization

```vue
<script setup>
// Use computed for expensive chart calculations
const chartData = computed(() => {
  if (!rawData.value) return null

  return {
    labels: rawData.value.map(item => item.date),
    datasets: [{
      data: rawData.value.map(item => item.value),
      backgroundColor: generateColors(rawData.value.length)
    }]
  }
})
</script>
```

## Accessibility

### Chart Accessibility

```vue
<template>
  <Chart
    :data="chartData"
    :accessibility="{
      enabled: true,
      description: 'Revenue chart showing monthly growth'
    }"
  />
</template>
```

### Keyboard Navigation

```vue
<!-- Data table keyboard navigation -->
<DataTable
  :data="tableData"
  keyboard-navigation
  @row-select="handleRowSelect"
  @row-action="handleRowAction"
/>
```

## Best Practices

### Data Visualization

1. **Choose appropriate chart types** for your data
2. **Use consistent color schemes** across charts
3. **Provide context** with titles and labels
4. **Consider accessibility** for colorblind users
5. **Don't overload** with too much data

### Performance

1. **Lazy load** chart libraries
2. **Debounce** user interactions
3. **Virtualize** large data tables
4. **Cache** expensive calculations
5. **Optimize** re-renders

### User Experience

1. **Provide loading states** for async data
2. **Show error states** gracefully
3. **Allow customization** of views
4. **Implement proper filtering** and search
5. **Consider mobile responsiveness**

## Troubleshooting

### Common Issues

**Charts not rendering:**
- Ensure Chart.js is properly imported
- Check data format matches expected structure
- Verify container dimensions

**Performance issues:**
- Implement virtual scrolling for large datasets
- Use computed properties for derived data
- Debounce rapid updates

**Styling problems:**
- Check CSS custom properties are defined
- Verify theme configuration
- Test in both light and dark modes

## Contributing

Help improve dashboard components:

1. **Add new chart types** or visualizations
2. **Improve performance** optimizations
3. **Enhance accessibility** features
4. **Add comprehensive tests**
5. **Create example implementations**

## Resources

- **[Chart.js Documentation](https://www.chartjs.org/docs/)**
- **[Data Visualization Best Practices](https://www.tableau.com/learn/articles/data-visualization)**
- **[D3.js](https://d3js.org/)** for advanced visualizations
- **[Accessibility in Data Viz](https://accessibility.psu.edu/graphs/)**

---

**Next**: Explore **[Settings Components](../settings)** for configuration UI and **[Theme Components](../theme)** for styling customization.
