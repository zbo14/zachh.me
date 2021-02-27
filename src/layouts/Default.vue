<template>
  <div class="bg-indigo-100">
    <div class="max-w-screen-md mx-auto flex flex-col min-h-screen">
      <header class="h-10 my-8">
        <nav class="nav">
          <g-link class="p-2 inline-flex text-black" to="/"><p>Hi</p><i class=" ml-2 ri-user-smile-fill" /></g-link>
          <g-link class="ml-8 p-2 inline-flex text-black" to="/about/">About<i class="ml-2 ri-user-fill" /></g-link>
          <g-link class="ml-8 p-2 inline-flex text-black" to="/blog/">Blog<i class="ml-2 ri-book-read-fill" /></g-link>
          <g-link class="ml-8 p-2 inline-flex text-black" to="/resume/">Résumé<i class="ml-2 ri-file-paper-2-fill" /></g-link>
        </nav>
      </header>
      <main class="mb-auto">
        <slot/>
      </main>
      <footer class="h-10 mt-8">
        <div class="flex opacity-75">
          <div class="inline-flex my-auto mr-6">
            <p class="mr-1 text-sm">Zach Balder</p>
            <i class="ri-copyright-line ri-xs"/>
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
        }
      ]
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
