---
title: API Reference
description: Complete API documentation for God Panel
category: api
order: 1
---

# API Reference

Complete documentation for God Panel's API endpoints and services.

## Overview

The God Panel API provides RESTful endpoints for all application functionality. The API is built with Nuxt 3's server-side capabilities and follows RESTful conventions.

## Base URL

```
Production: https://api.your-domain.com
Development: http://localhost:3000/api
```

## Authentication

Most API endpoints require authentication. Include the JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer your-jwt-token" \
     https://api.your-domain.com/api/users
```

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

## Error Format

Error responses include detailed information:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": ["Email is required"],
      "password": ["Password must be at least 8 characters"]
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Default**: 100 requests per minute per IP
- **Authenticated**: 1000 requests per minute per user
- **Headers**: Rate limit information is included in response headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Endpoints

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": "2025-01-15T11:30:00Z"
  }
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer your-jwt-token
```

#### Refresh Token
```http
POST /api/auth/refresh
Authorization: Bearer your-jwt-token
```

### Users

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer your-jwt-token
```

#### Update Profile
```http
PUT /api/users/me
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

#### Change Password
```http
PUT /api/users/me/password
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "current_password": "oldpassword",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

#### List Users (Admin)
```http
GET /api/users
Authorization: Bearer admin-jwt-token
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search term
- `role`: Filter by role

#### Get User by ID (Admin)
```http
GET /api/users/{id}
Authorization: Bearer admin-jwt-token
```

#### Create User (Admin)
```http
POST /api/users
Authorization: Bearer admin-jwt-token
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Update User (Admin)
```http
PUT /api/users/{id}
Authorization: Bearer admin-jwt-token
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "admin"
}
```

#### Delete User (Admin)
```http
DELETE /api/users/{id}
Authorization: Bearer admin-jwt-token
```

### Settings

#### Get Settings
```http
GET /api/settings
Authorization: Bearer your-jwt-token
```

#### Update Settings
```http
PUT /api/settings
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "theme": "dark",
  "language": "en",
  "notifications": {
    "email": true,
    "push": false
  }
}
```

#### Get Public Settings
```http
GET /api/settings/public
```

### Dashboard

#### Get Dashboard Data
```http
GET /api/dashboard
Authorization: Bearer your-jwt-token
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "users": 1250,
      "orders": 89,
      "revenue": 45678.90,
      "growth": 12.5
    },
    "recentActivity": [...],
    "charts": {
      "users": [...],
      "revenue": [...]
    }
  }
}
```

#### Get Widget Data
```http
GET /api/dashboard/widgets/{widgetId}
Authorization: Bearer your-jwt-token
```

### Content Management

#### List Content
```http
GET /api/content
Authorization: Bearer your-jwt-token
```

**Query Parameters:**
- `type`: Content type filter
- `status`: Status filter (draft, published, archived)
- `page`: Page number
- `limit`: Items per page

#### Get Content by ID
```http
GET /api/content/{id}
Authorization: Bearer your-jwt-token
```

#### Create Content
```http
POST /api/content
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "title": "New Article",
  "content": "Article content in markdown",
  "type": "blog",
  "status": "draft",
  "tags": ["tag1", "tag2"]
}
```

#### Update Content
```http
PUT /api/content/{id}
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "title": "Updated Article",
  "content": "Updated content",
  "status": "published"
}
```

#### Delete Content
```http
DELETE /api/content/{id}
Authorization: Bearer your-jwt-token
```

### File Upload

#### Upload File
```http
POST /api/upload
Authorization: Bearer your-jwt-token
Content-Type: multipart/form-data

file: (binary file data)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "file_123",
    "filename": "uploaded-file.jpg",
    "url": "https://cdn.your-domain.com/uploads/uploaded-file.jpg",
    "size": 2048576,
    "mimeType": "image/jpeg"
  }
}
```

#### Delete File
```http
DELETE /api/upload/{fileId}
Authorization: Bearer your-jwt-token
```

### Health & Monitoring

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00Z",
  "version": "2.0.0",
  "services": {
    "database": "connected",
    "redis": "connected",
    "storage": "available"
  },
  "uptime": "7d 14h 32m"
}
```

#### System Metrics
```http
GET /api/metrics
Authorization: Bearer admin-jwt-token
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cpu": 45.2,
    "memory": 67.8,
    "disk": 23.1,
    "network": {
      "inbound": 1024,
      "outbound": 2048
    },
    "requests": {
      "total": 15432,
      "successful": 15321,
      "failed": 111
    }
  }
}
```

## Status Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 204  | No Content |
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 422  | Validation Error |
| 429  | Rate Limited |
| 500  | Internal Server Error |

## SDK & Libraries

### JavaScript SDK

```bash
npm install @god-panel/sdk
```

```javascript
import { GodPanel } from '@god-panel/sdk'

const client = new GodPanel({
  baseURL: 'https://api.your-domain.com',
  apiKey: 'your-api-key'
})

const users = await client.users.list()
```

### TypeScript Types

```bash
npm install @god-panel/types
```

```typescript
import type { User, ApiResponse } from '@god-panel/types'

const response: ApiResponse<User[]> = await $fetch('/api/users')
```

## Webhooks

Configure webhooks to receive real-time notifications:

### Webhook Events

- `user.created`
- `user.updated`
- `user.deleted`
- `content.published`
- `content.updated`
- `system.alert`

### Webhook Configuration

```http
POST /api/webhooks
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks",
  "events": ["user.created", "content.published"],
  "secret": "your-webhook-secret"
}
```

## API Versions

Current API version: **v1**

### Versioning Strategy

- **URL versioning**: `/api/v1/users`
- **Header versioning**: `Accept: application/vnd.god-panel.v1+json`

### Changelog

Check the [Changelog](./changelog) for API changes and migration guides.

## Support

### Getting Help

- **Documentation**: This API reference
- **Issues**: [GitHub Issues](https://github.com/your-org/god-panel/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/god-panel/discussions)

### Rate Limits

- Review your current usage in response headers
- Request limit increases for verified applications
- Implement exponential backoff for retries

### Breaking Changes

- Major version updates may include breaking changes
- Review changelog before upgrading
- Test thoroughly in staging environment

---

## Next Steps

- **[Authentication Guide](../guides/authentication)** - Implement user authentication
- **[Integration Examples](../examples/basic-usage)** - Code examples
- **[Contributing](../contributing)** - Help improve the API
