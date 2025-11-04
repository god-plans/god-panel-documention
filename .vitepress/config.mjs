import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "God Panel Documentation",
  description: "Comprehensive documentation for God Panel - Modern Admin Dashboard System",

  // Base URL for deployment
  base: '/',

  // Theme configuration
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',

    // Navigation
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/content/getting-started/installation' },
          { text: 'Configuration', link: '/content/getting-started/configuration' },
          { text: 'Quick Start', link: '/content/guides/quick-start' }
        ]
      },
      {
        text: 'Documentation',
        items: [
          { text: 'Components', link: '/content/components/overview' },
          {
            text: 'Services',
            items: [
              { text: 'Services Overview', link: '/content/services/index' },
              { text: 'API Client Service', link: '/content/services/api-client' },
              { text: 'Toast Service', link: '/content/services/toast' },
              { text: 'Logger Service', link: '/content/services/logger' }
            ]
          },
          {
            text: 'State Management',
            items: [
              { text: 'Stores Overview', link: '/content/stores/index' },
              { text: 'Settings Store', link: '/content/stores/settings' },
              { text: 'Auth Store', link: '/content/stores/auth' }
            ]
          },
          { text: 'API Reference', link: '/content/api/index' },
          { text: 'Authentication', link: '/content/guides/authentication' },
          { text: 'Theming', link: '/content/guides/theming' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Basic Usage', link: '/content/examples/basic-usage' },
          { text: 'Code Examples', link: '/content/examples/code-examples' }
        ]
      },
      { text: 'Contributing', link: '/content/contributing' }
    ],

    // Sidebar navigation
    sidebar: {
      // Home/Overview
      '/': [
        {
          text: 'Overview',
          items: [
            { text: 'Welcome', link: '/content/index' }
          ]
        }
      ],

      // Getting Started
      '/content/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/content/getting-started/index' },
            { text: 'Installation', link: '/content/getting-started/installation' },
            { text: 'Configuration', link: '/content/getting-started/configuration' }
          ]
        }
      ],

      // Guides
      '/content/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'Quick Start', link: '/content/guides/quick-start' },
            { text: 'Authentication', link: '/content/guides/authentication' },
            { text: 'Internationalization (i18n)', link: '/content/guides/i18n' },
            { text: 'Theming', link: '/content/guides/theming' }
          ]
        }
      ],

      // Components
      '/content/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/content/components/overview' },
            {
              text: 'Authentication',
              items: [
                { text: 'Auth Components', link: '/content/components/auth/index' }
              ]
            },
            {
              text: 'Common',
              items: [
                { text: 'Common Components', link: '/content/components/common/index' }
              ]
            },
            {
              text: 'Dashboard',
              items: [
                { text: 'Dashboard Components', link: '/content/components/dashboard/index' }
              ]
            },
            {
              text: 'Settings',
              items: [
                { text: 'Settings Components', link: '/content/components/settings/index' }
              ]
            },
            {
              text: 'Theme',
              items: [
                { text: 'Theme Components', link: '/content/components/theme/index' }
              ]
            }
          ]
        }
      ],

      // Services
      '/content/services/': [
        {
          text: 'Services',
          items: [
            { text: 'Services Overview', link: '/content/services/index' },
            { text: 'API Client Service', link: '/content/services/api-client' },
            { text: 'Toast Service', link: '/content/services/toast' },
            { text: 'Logger Service', link: '/content/services/logger' }
          ]
        }
      ],

      // API Reference
      '/content/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/content/api/index' }
          ]
        }
      ],

      // Examples
      '/content/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Usage', link: '/content/examples/basic-usage' },
            { text: 'Code Examples', link: '/content/examples/code-examples' }
          ]
        }
      ],

      // Other sections
      '/content/': [
        {
          text: 'Documentation',
          items: [
            { text: 'Overview', link: '/content/index' },
            { text: 'Changelog', link: '/content/changelog' },
            { text: 'Contributing', link: '/content/contributing' },
            { text: 'Deployment', link: '/content/deployment' }
          ]
        }
      ],

      // Stores (when implemented)
      '/content/stores/': [
        {
          text: 'State Management',
          items: [
            { text: 'Settings Store', link: '/content/stores/settings' },
            { text: 'Auth Store', link: '/content/stores/auth' },
            { text: 'Store Overview', link: '/content/stores/index' }
          ]
        }
      ]
    },

    // Footer
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present God Panel Team'
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/god-panel' },
      { icon: 'twitter', link: 'https://twitter.com/godpanel' },
      { icon: 'discord', link: 'https://discord.gg/god-panel' }
    ],

    // Search
    search: {
      provider: 'local'
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/your-org/god-panel-docs/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    // Last updated
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    // Outline
    outline: {
      level: [2, 3],
      label: 'Page Contents'
    },

    // Return to top
    returnToTopLabel: 'Back to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to light mode',
    darkModeSwitchTitle: 'Switch to dark mode'
  },

  // Markdown configuration
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true,
    toc: { level: [1, 2, 3] }
  },

  // Clean URLs
  cleanUrls: true,

  // Sitemap
  sitemap: {
    hostname: 'https://docs.godpanel.dev'
  },

  // Ignore dead links for now - documentation is still being built
  ignoreDeadLinks: true
})
