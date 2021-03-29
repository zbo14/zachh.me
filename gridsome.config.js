// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const tailwindcss = require('tailwindcss');

module.exports = {
  siteName: 'Zach Balder',

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwindcss
        ]
      }
    }
  },

  icon: 'static/icons/favicon-32x32.png',

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './blog',
        path: '*.md',
        typeName: 'Post'
      }
    },

    {
      use: 'gridsome-plugin-tailwindcss'
    },

    {
      use: 'gridsome-plugin-fathom',
        options: {
          siteId: 'YZUZBGIG',
          host: 'zachh.me',
          debug: true
        }
      }
  ],

  templates: {
    Post: '/blog/:title'
  },

  titleTemplate: '%s ~',

  transformers: {
    remark: {
      plugins: [
        'gridsome-plugin-remark-mermaid'
      ]
    }
  }
}
