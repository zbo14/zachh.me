<template>
  <div class="font-custom text-sm sm:text-base">
    <header class="flex h-10 sm:h-2 my-2 sm:my-8">
      <nav :class="{ 'scrolled': !topOfPage }" class="nav fixed bg-indigo-100 top-0 py-6 sm:py-4 flex animated z-10 w-full">
        <div class="flex justify-between ml-12 w-1/2">
          <g-link v-for="(page, index) in pages" class="hidden sm:inline-flex text-black" :to="page.path" :key="index">
            <p class="pr-0.5">{{ page.text }}</p><i :class="`ml-1 ri-${page.icon}-fill`" />
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
          </div>
        </div>
      </nav>
    </header>
    <div class="max-w-screen-md mx-auto flex flex-col min-h-screen px-2 sm:px-0">
      <main class="mb-auto">
        <slot/>
      </main>
      <footer class="h-10 mt-8">
        <div class="flex opacity-75">
          <div class="inline-flex mr-6 my-auto">
            <p class="mr-1 my-auto text-sm">Zach Balder</p>
            <i class="my-auto ri-copyright-line ri-xs"/>
          </div>
          <div class="ml-4" v-for="profile in profiles">
            <g-link class="hover:no-underline" :href="profile.link">
              <i :class="profile.class + ' text-black'"/>
            </g-link>
          </div>
        </div>
      </footer>
    </div>
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
          class: 'ri-instagram-fill',
          link: 'https://www.instagram.com/zachbalder'
        }
      ],

      showMenu: false,
      topOfPage: true
    }
  },

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll () {
      if (window.pageYOffset > 0) {
        if (this.topOfPage) {
          this.topOfPage = false
        }
      } else if (!this.topOfPage) {
        this.topOfPage = true
      }
    },

    hideMenu () {
      this.showMenu = false
    }
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
