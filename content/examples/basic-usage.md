---
title: Basic Usage Examples
description: Learn how to use God Panel components in your applications
category: examples
order: 1
---

# Basic Usage Examples

Learn how to implement God Panel components with practical examples and real-world use cases.

## Getting Started Example

### Complete Dashboard Page

```vue
<!-- pages/dashboard/index.vue -->
<template>
  <div class="dashboard-page">
    <!-- Header -->
    <div class="dashboard-header">
      <div class="header-content">
        <h1>{{ $t('dashboard.title') }}</h1>
        <p>{{ $t('dashboard.subtitle') }}</p>
      </div>
      <div class="header-actions">
        <Button @click="refreshData" variant="secondary">
          <Icon name="mdi-refresh" />
          Refresh
        </Button>
        <Button @click="exportData" variant="primary">
          <Icon name="mdi-download" />
          Export
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <Card v-for="stat in stats" :key="stat.id" class="stat-card">
        <div class="stat-header">
          <Icon :name="stat.icon" class="stat-icon" />
          <h3>{{ stat.title }}</h3>
        </div>
        <div class="stat-value">{{ formatNumber(stat.value) }}</div>
        <div class="stat-change" :class="{ 'positive': stat.change > 0, 'negative': stat.change < 0 }">
          <Icon :name="stat.change > 0 ? 'mdi-trending-up' : 'mdi-trending-down'" />
          {{ Math.abs(stat.change) }}%
        </div>
      </Card>
    </div>

    <!-- Charts Section -->
    <div class="charts-grid">
      <Card class="chart-card">
        <div class="card-header">
          <h3>Revenue Overview</h3>
        </div>
        <div class="card-body">
          <LineChart :data="revenueData" />
        </div>
      </Card>

      <Card class="chart-card">
        <div class="card-header">
          <h3>User Growth</h3>
        </div>
        <div class="card-body">
          <BarChart :data="userData" />
        </div>
      </Card>
    </div>

    <!-- Recent Activity -->
    <Card class="activity-card">
      <div class="card-header">
        <h3>Recent Activity</h3>
        <Button variant="ghost" size="sm">
          View All
          <Icon name="mdi-arrow-right" />
        </Button>
      </div>
      <div class="card-body">
        <div v-if="loading" class="loading-state">
          <Icon name="mdi-loading" class="loading-icon" />
          Loading activities...
        </div>
        <div v-else-if="activities.length === 0" class="empty-state">
          <Icon name="mdi-information" />
          No recent activities
        </div>
        <div v-else class="activity-list">
          <div v-for="activity in activities" :key="activity.id" class="activity-item">
            <div class="activity-icon">
              <Icon :name="activity.icon" />
            </div>
            <div class="activity-content">
              <div class="activity-title">{{ activity.title }}</div>
              <div class="activity-description">{{ activity.description }}</div>
              <div class="activity-time">{{ formatRelativeTime(activity.createdAt) }}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
// Composables
const { formatNumber, formatRelativeTime } = useLocale()
const { t } = useI18n()

// Reactive data
const stats = ref([
  {
    id: 'users',
    title: 'Total Users',
    value: 12543,
    change: 12.5,
    icon: 'mdi-account-group'
  },
  {
    id: 'orders',
    title: 'Total Orders',
    value: 892,
    change: -3.2,
    icon: 'mdi-cart'
  },
  {
    id: 'revenue',
    title: 'Revenue',
    value: 45678,
    change: 8.7,
    icon: 'mdi-currency-usd'
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    value: 3.24,
    change: 15.3,
    icon: 'mdi-trending-up'
  }
])

const activities = ref([
  {
    id: '1',
    title: 'New user registered',
    description: 'john.doe@example.com joined the platform',
    icon: 'mdi-account-plus',
    createdAt: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: '2',
    title: 'Order completed',
    description: 'Order #1234 has been completed successfully',
    icon: 'mdi-check-circle',
    createdAt: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: '3',
    title: 'Payment received',
    description: '$299.99 payment received from customer',
    icon: 'mdi-credit-card',
    createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  }
])

const loading = ref(false)

// Chart data
const revenueData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue',
    data: [12000, 19000, 15000, 25000, 22000, 30000],
    borderColor: 'rgb(59, 130, 246)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    tension: 0.4
  }]
})

const userData = ref({
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
    label: 'New Users',
    data: [120, 150, 180, 200],
    backgroundColor: 'rgba(16, 185, 129, 0.8)',
    borderColor: 'rgb(16, 185, 129)',
    borderWidth: 1
  }]
})

// Methods
const refreshData = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update data (in real app, fetch from API)
    stats.value = stats.value.map(stat => ({
      ...stat,
      value: stat.value + Math.floor(Math.random() * 100)
    }))

    activities.value.unshift({
      id: Date.now().toString(),
      title: 'Data refreshed',
      description: 'Dashboard data has been updated',
      icon: 'mdi-refresh',
      createdAt: new Date()
    })

    activities.value = activities.value.slice(0, 5)
  } finally {
    loading.value = false
  }
}

const exportData = async () => {
  try {
    // Simulate export
    const data = {
      stats: stats.value,
      activities: activities.value,
      exportedAt: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Export failed:', error)
  }
}
</script>

<style scoped>
.dashboard-page {
  padding: var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-8);
  gap: var(--space-4);
}

.header-content h1 {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.header-content p {
  color: var(--text-secondary);
  font-size: var(--text-lg);
}

.header-actions {
  display: flex;
  gap: var(--space-3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.stat-card {
  padding: var(--space-6);
  text-align: center;
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.stat-header h3 {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  margin: 0;
}

.stat-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-primary);
}

.stat-value {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.stat-change {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.stat-change.positive {
  color: var(--color-success);
}

.stat-change.negative {
  color: var(--color-error);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.chart-card {
  min-height: 300px;
}

.activity-card {
  min-height: 400px;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-8);
  color: var(--text-tertiary);
}

.loading-icon {
  width: 2rem;
  height: 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background-color: var(--bg-secondary);
  transition: background-color 0.2s ease;
}

.activity-item:hover {
  background-color: var(--bg-tertiary);
}

.activity-icon {
  width: 2rem;
  height: 2rem;
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.activity-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.activity-time {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: var(--space-4);
  }

  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    justify-content: stretch;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

## User Management Example

### User List with Actions

```vue
<!-- pages/users/index.vue -->
<template>
  <div class="users-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <h1>{{ $t('users.title') }}</h1>
        <p>{{ $t('users.subtitle') }}</p>
      </div>
      <div class="header-actions">
        <Button @click="showCreateModal = true" variant="primary">
          <Icon name="mdi-account-plus" />
          Add User
        </Button>
      </div>
    </div>

    <!-- Filters and Search -->
    <Card class="filters-card">
      <div class="filters-content">
        <div class="search-box">
          <Input
            v-model="searchQuery"
            :placeholder="$t('users.search')"
            icon="mdi-magnify"
          />
        </div>

        <div class="filter-selects">
          <Select v-model="roleFilter" :options="roleOptions" placeholder="All Roles" />
          <Select v-model="statusFilter" :options="statusOptions" placeholder="All Status" />
        </div>

        <div class="filter-actions">
          <Button @click="clearFilters" variant="ghost">Clear</Button>
          <Button @click="applyFilters" variant="secondary">Apply</Button>
        </div>
      </div>
    </Card>

    <!-- Users Table -->
    <Card class="table-card">
      <div class="table-header">
        <div class="table-info">
          <span class="table-count">
            {{ $t('users.showing', { count: filteredUsers.length, total: totalUsers }) }}
          </span>
        </div>
        <div class="table-actions">
          <Button @click="exportUsers" variant="ghost" size="sm">
            <Icon name="mdi-download" />
            Export
          </Button>
        </div>
      </div>

      <DataTable
        :columns="tableColumns"
        :data="filteredUsers"
        :loading="loading"
        :empty-message="$t('users.noUsers')"
        @sort="handleSort"
        @filter="handleFilter"
      >
        <!-- Custom cell templates -->
        <template #user="{ item }">
          <div class="user-cell">
            <div class="user-avatar">
              <img :src="item.avatar" :alt="item.name" />
            </div>
            <div class="user-info">
              <div class="user-name">{{ item.name }}</div>
              <div class="user-email">{{ item.email }}</div>
            </div>
          </div>
        </template>

        <template #role="{ item }">
          <span class="role-badge" :class="`role-${item.role}`">
            {{ $t(`roles.${item.role}`) }}
          </span>
        </template>

        <template #status="{ item }">
          <span class="status-badge" :class="`status-${item.status}`">
            <Icon :name="item.status === 'active' ? 'mdi-check-circle' : 'mdi-minus-circle'" />
            {{ $t(`status.${item.status}`) }}
          </span>
        </template>

        <template #actions="{ item }">
          <div class="action-buttons">
            <Button @click="viewUser(item)" variant="ghost" size="sm">
              <Icon name="mdi-eye" />
            </Button>
            <Button @click="editUser(item)" variant="ghost" size="sm">
              <Icon name="mdi-pencil" />
            </Button>
            <Button @click="deleteUser(item)" variant="ghost" size="sm" class="danger">
              <Icon name="mdi-delete" />
            </Button>
          </div>
        </template>
      </DataTable>

      <!-- Pagination -->
      <div class="table-footer">
        <Pagination
          v-model:current="currentPage"
          v-model:page-size="pageSize"
          :total="totalUsers"
          :show-size-changer="true"
          :page-size-options="[10, 20, 50, 100]"
          @change="handlePageChange"
        />
      </div>
    </Card>

    <!-- Create User Modal -->
    <Modal v-model="showCreateModal" :title="$t('users.createTitle')">
      <form @submit.prevent="createUser" class="user-form">
        <div class="form-row">
          <Input
            v-model="newUser.firstName"
            :label="$t('users.firstName')"
            required
          />
          <Input
            v-model="newUser.lastName"
            :label="$t('users.lastName')"
            required
          />
        </div>

        <Input
          v-model="newUser.email"
          type="email"
          :label="$t('users.email')"
          required
        />

        <Select
          v-model="newUser.role"
          :label="$t('users.role')"
          :options="roleOptions"
          required
        />

        <div class="form-actions">
          <Button type="button" @click="showCreateModal = false" variant="secondary">
            {{ $t('common.cancel') }}
          </Button>
          <Button type="submit" variant="primary" :loading="creating">
            {{ $t('users.create') }}
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
// Composables
const { t } = useI18n()
const { formatDate } = useLocale()

// Reactive data
const users = ref([])
const filteredUsers = ref([])
const loading = ref(false)
const creating = ref(false)

const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')

const currentPage = ref(1)
const pageSize = ref(20)
const totalUsers = ref(0)

const showCreateModal = ref(false)
const newUser = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: 'user'
})

// Options
const roleOptions = [
  { label: t('roles.admin'), value: 'admin' },
  { label: t('roles.user'), value: 'user' },
  { label: t('roles.moderator'), value: 'moderator' }
]

const statusOptions = [
  { label: t('status.active'), value: 'active' },
  { label: t('status.inactive'), value: 'inactive' },
  { label: t('status.pending'), value: 'pending' }
]

// Table columns
const tableColumns = [
  {
    key: 'user',
    title: t('users.name'),
    sortable: true,
    width: '250px'
  },
  {
    key: 'role',
    title: t('users.role'),
    sortable: true,
    width: '120px'
  },
  {
    key: 'status',
    title: t('users.status'),
    sortable: true,
    width: '120px'
  },
  {
    key: 'createdAt',
    title: t('users.createdAt'),
    sortable: true,
    width: '150px',
    formatter: (value: string) => formatDate(new Date(value))
  },
  {
    key: 'actions',
    title: t('common.actions'),
    width: '150px'
  }
]

// Methods
const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/users', {
      params: {
        page: currentPage.value,
        limit: pageSize.value,
        search: searchQuery.value,
        role: roleFilter.value,
        status: statusFilter.value
      }
    })

    users.value = response.data
    filteredUsers.value = response.data
    totalUsers.value = response.total
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  filteredUsers.value = users.value.filter(user => {
    const matchesSearch = !searchQuery.value ||
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value

    return matchesSearch && matchesRole && matchesStatus
  })

  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  roleFilter.value = ''
  statusFilter.value = ''
  applyFilters()
}

const handleSort = (column: string, direction: 'asc' | 'desc') => {
  filteredUsers.value.sort((a, b) => {
    const aValue = a[column]
    const bValue = b[column]

    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}

const handlePageChange = (page: number, size: number) => {
  currentPage.value = page
  pageSize.value = size
  fetchUsers()
}

const createUser = async () => {
  creating.value = true
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: {
        name: `${newUser.value.firstName} ${newUser.value.lastName}`,
        email: newUser.value.email,
        role: newUser.value.role
      }
    })

    showCreateModal.value = false
    newUser.value = { firstName: '', lastName: '', email: '', role: 'user' }
    await fetchUsers()
  } catch (error) {
    console.error('Failed to create user:', error)
  } finally {
    creating.value = false
  }
}

const viewUser = (user: any) => {
  navigateTo(`/users/${user.id}`)
}

const editUser = (user: any) => {
  navigateTo(`/users/${user.id}/edit`)
}

const deleteUser = async (user: any) => {
  if (confirm(t('users.confirmDelete', { name: user.name }))) {
    try {
      await $fetch(`/api/users/${user.id}`, { method: 'DELETE' })
      await fetchUsers()
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }
}

const exportUsers = async () => {
  try {
    const data = await $fetch('/api/users/export')
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Export failed:', error)
  }
}

// Lifecycle
onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.users-page {
  padding: var(--space-6);
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-6);
  gap: var(--space-4);
}

.header-content h1 {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.header-content p {
  color: var(--text-secondary);
  font-size: var(--text-lg);
}

.filters-card {
  margin-bottom: var(--space-6);
}

.filters-content {
  display: flex;
  gap: var(--space-4);
  align-items: flex-end;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 200px;
}

.filter-selects {
  display: flex;
  gap: var(--space-3);
}

.filter-actions {
  display: flex;
  gap: var(--space-2);
}

.table-card {
  margin-bottom: var(--space-6);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.table-info {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.table-count {
  font-weight: var(--font-medium);
}

.table-footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--border-primary);
}

.user-cell {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  overflow: hidden;
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.user-email {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.role-badge,
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.role-badge.role-admin {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
}

.role-badge.role-user {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--color-primary);
}

.role-badge.role-moderator {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
}

.status-badge.status-active {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--color-success);
}

.status-badge.status-inactive {
  background-color: rgba(107, 114, 128, 0.1);
  color: var(--color-neutral-500);
}

.status-badge.status-pending {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
}

.action-buttons {
  display: flex;
  gap: var(--space-1);
}

.action-buttons .danger {
  color: var(--color-error);
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-primary);
}

@media (max-width: 768px) {
  .users-page {
    padding: var(--space-4);
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .filters-content {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-selects {
    flex-direction: column;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
```

## Form Handling Example

### Advanced Form with Validation

```vue
<!-- components/forms/UserForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <!-- Basic Information -->
    <Card class="form-section">
      <div class="card-header">
        <h3>Basic Information</h3>
      </div>
      <div class="card-body">
        <div class="form-grid">
          <Input
            v-model="form.firstName"
            :label="$t('users.firstName')"
            :error="errors.firstName"
            required
            :disabled="loading"
          />

          <Input
            v-model="form.lastName"
            :label="$t('users.lastName')"
            :error="errors.lastName"
            required
            :disabled="loading"
          />
        </div>

        <Input
          v-model="form.email"
          type="email"
          :label="$t('users.email')"
          :error="errors.email"
          required
          :disabled="loading"
        />

        <Input
          v-model="form.phone"
          type="tel"
          :label="$t('users.phone')"
          :error="errors.phone"
          :disabled="loading"
        />
      </div>
    </Card>

    <!-- Account Settings -->
    <Card class="form-section">
      <div class="card-header">
        <h3>Account Settings</h3>
      </div>
      <div class="card-body">
        <Select
          v-model="form.role"
          :label="$t('users.role')"
          :options="roleOptions"
          :error="errors.role"
          required
          :disabled="loading"
        />

        <Select
          v-model="form.status"
          :label="$t('users.status')"
          :options="statusOptions"
          :error="errors.status"
          required
          :disabled="loading"
        />

        <div class="form-group">
          <label class="form-label">Permissions</label>
          <div class="permissions-grid">
            <Checkbox
              v-for="permission in permissions"
              :key="permission.id"
              v-model="form.permissions"
              :value="permission.id"
              :label="permission.name"
              :description="permission.description"
              :disabled="loading"
            />
          </div>
        </div>
      </div>
    </Card>

    <!-- Security Settings -->
    <Card class="form-section" v-if="!isEdit">
      <div class="card-header">
        <h3>Security</h3>
      </div>
      <div class="card-body">
        <Input
          v-model="form.password"
          type="password"
          :label="$t('auth.password')"
          :error="errors.password"
          required
          :disabled="loading"
          :hint="isEdit ? $t('users.leaveBlankToKeepCurrent') : ''"
        />

        <Input
          v-model="form.confirmPassword"
          type="password"
          :label="$t('auth.confirmPassword')"
          :error="errors.confirmPassword"
          required
          :disabled="loading"
        />
      </div>
    </Card>

    <!-- Form Actions -->
    <div class="form-actions">
      <Button
        type="button"
        variant="secondary"
        @click="$emit('cancel')"
        :disabled="loading"
      >
        {{ $t('common.cancel') }}
      </Button>

      <Button
        type="submit"
        variant="primary"
        :loading="loading"
      >
        {{ isEdit ? $t('users.update') : $t('users.create') }}
      </Button>
    </div>

    <!-- Error Summary -->
    <div v-if="Object.keys(errors).length > 0" class="error-summary">
      <h4>{{ $t('validation.errorsFound') }}</h4>
      <ul>
        <li v-for="(error, field) in errors" :key="field">
          {{ $t(`validation.${field}`) }}: {{ error }}
        </li>
      </ul>
    </div>
  </form>
</template>

<script setup>
interface UserFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
  status: string
  permissions: string[]
  password?: string
  confirmPassword?: string
}

interface Props {
  modelValue?: Partial<UserFormData>
  isEdit?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
  loading: false
})

const emit = defineEmits<{
  submit: [data: UserFormData]
  cancel: []
  'update:modelValue': [data: Partial<UserFormData>]
}>()

// Form data
const form = ref<UserFormData>({
  firstName: props.modelValue?.firstName || '',
  lastName: props.modelValue?.lastName || '',
  email: props.modelValue?.email || '',
  phone: props.modelValue?.phone || '',
  role: props.modelValue?.role || 'user',
  status: props.modelValue?.status || 'active',
  permissions: props.modelValue?.permissions || [],
  password: '',
  confirmPassword: ''
})

// Validation errors
const errors = ref<Record<string, string>>({})

// Options
const roleOptions = [
  { label: 'Administrator', value: 'admin' },
  { label: 'User', value: 'user' },
  { label: 'Moderator', value: 'moderator' }
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' }
]

const permissions = [
  { id: 'read_users', name: 'Read Users', description: 'Can view user profiles' },
  { id: 'write_users', name: 'Write Users', description: 'Can create and edit users' },
  { id: 'delete_users', name: 'Delete Users', description: 'Can delete user accounts' },
  { id: 'manage_settings', name: 'Manage Settings', description: 'Can modify system settings' }
]

// Validation rules
const validationRules = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, email: true },
  phone: { phone: true },
  role: { required: true },
  status: { required: true },
  password: {
    required: !props.isEdit,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
  },
  confirmPassword: {
    required: !props.isEdit,
    match: 'password'
  }
}

// Validation function
const validateField = (field: string, value: any): string => {
  const rules = validationRules[field as keyof typeof validationRules]
  if (!rules) return ''

  if (rules.required && (!value || value.toString().trim() === '')) {
    return 'This field is required'
  }

  if (rules.minLength && value && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`
  }

  if (rules.email && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
  }

  if (rules.phone && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number'
    }
  }

  if (rules.pattern && value) {
    if (!rules.pattern.test(value)) {
      return 'Password must contain uppercase, lowercase, and number'
    }
  }

  if (rules.match && value) {
    const matchField = form.value[rules.match as keyof UserFormData]
    if (value !== matchField) {
      return 'Passwords do not match'
    }
  }

  return ''
}

// Validate entire form
const validateForm = (): boolean => {
  errors.value = {}

  Object.keys(validationRules).forEach(field => {
    const error = validateField(field, form.value[field as keyof UserFormData])
    if (error) {
      errors.value[field] = error
    }
  })

  return Object.keys(errors.value).length === 0
}

// Submit handler
const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  // Prepare data for submission
  const submitData = { ...form.value }

  // Remove confirmPassword from submission
  delete submitData.confirmPassword

  // Only include password if it's not empty (for edit mode)
  if (!submitData.password) {
    delete submitData.password
  }

  emit('submit', submitData)
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    Object.assign(form.value, newValue)
  }
}, { deep: true })

// Emit form changes
watch(form.value, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })
</script>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-section {
  margin-bottom: var(--space-6);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-3);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-6);
  border-top: 1px solid var(--border-primary);
  background-color: var(--bg-secondary);
}

.error-summary {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-top: var(--space-4);
}

.error-summary h4 {
  color: var(--color-error);
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
}

.error-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.error-summary li {
  color: var(--color-error);
  font-size: var(--text-sm);
  padding: var(--space-1) 0;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .permissions-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column-reverse;
  }
}
</style>
```

## Next Steps

These examples demonstrate the core functionality of God Panel components. For more advanced examples:

- **[Advanced Usage Examples](./advanced-usage)** - Complex implementations
- **[Code Examples](./code-examples)** - Reusable code snippets
- **[Component Library Documentation](../components)** - Complete component reference

## Troubleshooting

### Common Issues

**Component not rendering:**
```typescript
// Check component registration
console.log('Available components:', getCurrentInstance()?.appContext.components)

// Check props
console.log('Component props:', props)
```

**Styling conflicts:**
```css
/* Use specific selectors */
.my-component .btn-primary {
  /* Your custom styles */
}
```

**Performance issues:**
```typescript
// Use computed for expensive operations
const processedData = computed(() => {
  return data.value.map(item => ({
    ...item,
    formattedValue: formatCurrency(item.value)
  }))
})
```

---

**Next**: Check out the **[Advanced Usage Examples](./advanced-usage)** for more complex implementations!
