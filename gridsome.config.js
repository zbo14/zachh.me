// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const marked = require('marked')
const tailwindcss = require('tailwindcss')

module.exports = {
  siteName: 'Zach Balder',
  siteUrl: 'https://zachh.me',

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.m4a$/,
          loader: 'file-loader'
        }
      ]
    }
  },

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
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './memos',
        path: '*.md',
        typeName: 'Memo'
      }
    },

    {
      use: 'gridsome-plugin-tailwindcss'
    },

    {
      use: 'gridsome-plugin-feed',

      options: {
        contentTypes: ['Post'],

        feedOptions: {
          title: 'Zach Balder',
          description: 'My blog'
        },

        rss: {
          enabled: true,
          output: '/feed.xml'
        },

        filterNodes: node => true,

        // Workaround from https://github.com/gridsome/gridsome/issues/514#issuecomment-510481670
        nodeToFeedItem: node => ({
          title: node.title,
          date: node.date,
          content: marked(node.content)
        })
      }
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
    Post: '/blog/:title',
    Memo: '/memos/:title'
  },

  titleTemplate: '%s ~',

  transformers: {
    remark: {
      plugins: [
        'gridsome-plugin-remark-mermaid',
        '@gridsome/remark-prismjs'
      ]
    }
  }
}
