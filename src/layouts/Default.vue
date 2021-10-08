<template>
  <div class="font-custom text-sm sm:text-base">
    <header class="flex h-10 sm:h-2 my-2 sm:my-8">
      <nav :class="{ 'scrolled': !topOfPage }" class="fixed bg-indigo-100 top-0 py-6 sm:py-4 flex w-full z-10">
        <div class="flex justify-between ml-12 my-auto w-full">
          <g-link v-for="(page, index) in pages" class="hidden sm:inline-flex text-black" :to="page.path" :key="index">
            <p class="pr-0.5">{{ page.text }}</p><i :class="`ml-1 ri-${page.icon}-fill`" />
          </g-link>
          <a class="hidden sm:inline-flex text-black" href="https://zachh.me/feed.xml">
            <p class="pr-0.5">RSS</p><i class="ml-1 ri-rss-fill" />
          </a>
        </div>
        <div class="flex justify-end mr-8 my-auto w-1/2">
          <g-link class="hidden sm:inline-flex text-black" to="https://github.com/zbo14/zachh.me/fork">
            <p class="pr-0.5">Fork me!</p><i class="ml-1 ri-git-branch-fill" />
          </g-link>
        </div>
        <div v-click-outside="() => { showMenu = false }" class="sm:hidden inline-block right-0 text-left">
          <div class="absolute inset-y-1 right-1">
            <button @click="showMenu = !showMenu" type="button" class="rounded-md shadow-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <i class="ri-menu-fill" />
            </button>
          </div>
          <div v-if="showMenu" class="origin-top-right absolute right-1 mt-6 bg-indigo-200 rounded-md ring-1 ring-black ring-opacity-5 divide-y divide-blue-100" role="menu" aria-orientation="vertical">
            <g-link v-for="(page, index) in pages" class="flex px-4 py-2 mr-4 text-black" :to="page.path" :key="index">
              <i :class="`mr-2 ri-${page.icon}-fill`" />
              <p class="pr-0.5">{{ page.text }}</p>
            </g-link>
            <a class="flex px-4 py-2 mr-4 text-black" href="https://zachh.me/feed.xml">
              <i class="mr-2 ri-rss-fill" />
              <p class="pr-0.5">RSS</p>
            </a>
          </div>
        </div>
      </nav>
    </header>
    <div class="max-w-screen-md mx-auto flex flex-col px-2 sm:px-0">
      <main class="mb-auto mt-2 print sm:mt-4">
        <slot/>
      </main>
    </div>
    <footer class="h-10 mt-8 w-full">
      <div :class="{ 'scrolled': !bottomOfPage }" class="bottom-0 bg-indigo-100 fixed flex justify-center py-1 w-full z-10">
        <p class="mr-1 my-auto opacity-75 text-sm">Zach Balder</p>
        <i class="mr-8 my-auto opacity-75 ri-copyright-line ri-xs"/>
        <g-link
          class="hover:no-underline mr-3 my-auto"
          v-for="(profile, i) in profiles"
          :href="profile.link"
          :key="i">
          <i :class="profile.class + ' opacity-75 text-black'"/>
        </g-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pages: [
        {
          icon: 'user-smile',
          path: '/',
          text: 'Hi'
        },
        {
          icon: 'user',
          path: '/about/',
          text: 'About'
        },
        {
          icon: 'book-read',
          path: '/blog/',
          text: 'Blog'
        },
        {
          icon: 'money-dollar-circle',
          path: '/hire/',
          text: 'Hire'
        },
        {
          icon: 'file-music',
          path: '/memos/',
          text: 'Memos'
        },
        {
          icon: 'artboard',
          path: '/projects/',
          text: 'Projects'
        },
        {
          icon: 'file-paper-2',
          path: '/resume/',
          text: 'Résumé'
        }
      ],

      profiles: [
        {
          class: 'ri-github-fill',
          link: 'https://github.com/zbo14'
        },
        {
          class: 'ri-npmjs-fill',
          link: 'https://www.npmjs.com/~zbo14'
        },
        {
          class: 'ri-linkedin-fill',
          link: 'https://linkedin.com/in/zachary-balder'
        },
        {
          class: 'ri-twitter-fill',
          link: 'https://twitter.com/digitalAn4log'
        },
        {
          class: 'ri-mastodon-fill',
          link: 'https://mastodon.zachh.me/@zach'
        }
      ],

      bottomOfPage: this.atBottomOfPage(),
      topOfPage: true,
      showMenu: false
    }
  },

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  },

  methods: {
    atBottomOfPage () {
      try {
        const docElem = document.documentElement
        const offset = docElem.scrollTop + window.innerHeight
        const height = docElem.offsetHeight

        return offset >= height
      } catch {
        return false
      }
    },

    handleScroll () {
      this.bottomOfPage = this.atBottomOfPage()
      this.topOfPage = window.pageYOffset <= 0
    }
  },

  metaInfo: {
    meta: [
      {
        property: 'og:title',
        content: 'Zach Balder ~'
      },
      {
        property: 'og:image',
        content: require.context('../../static/images/')('./me.jpeg')
      },
      {
        property: 'og:description',
        content: 'Welcome to my corner of the internet :)'
      }
    ]
  }
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
