// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import vClickOutside from 'v-click-outside'
import '~/main.css'
import DefaultLayout from '~/layouts/Default.vue'
import 'prismjs/themes/prism-twilight.css'

const getImage = filename => {
  const imgs = require.context('../static/images/')
  return imgs('./' + filename)
}

export default function (Vue, { router, head, isClient }) {
  Vue.use(vClickOutside)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.htmlAttrs = {
    lang: 'en_US'
  }

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inconsolata&display=swap'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
  })

  head.link.push({
    rel: 'preload',
    href: getImage('gatherly.png'),
    as: 'image'
  })

   head.link.push({
    rel: 'preload',
    href: getImage('starry.png'),
    as: 'image'
  })

  head.link.push({
    rel: 'preload',
    href: getImage('mitch-bryant.gif'),
    as: 'image'
  })
}
