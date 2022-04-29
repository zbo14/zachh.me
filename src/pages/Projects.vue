<template>
  <Layout>
    <h1 class="mb-6 sm:mb-8">Projects I've been working on:</h1>
    <ul>
      <li class="mb-4" v-for="(project, name) in projects">
        <h3 class="mb-2">
          <a :href="project.url">{{ name }}</a>
        </h3>
        <p>{{ project.description }}</p>
        <button class="py-2 underline" @click="() => { demo = ''; demo = project.demo }" v-if="project.demo">
          Watch demo
        </button>
        <p class="inline ml-2 text-sm" v-if="project.disclaimer">({{ project.disclaimer }})</p>
      </li>
    </ul>
    <p class="italic mt-8">
      Want to see more? Check out my
      <g-link href="https://github.com/zbo14">
        GitHub
      </g-link>
    </p>

    <div v-if="demo" class="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div class="bg-black w-11/12 md:max-w-md mx-auto relative rounded shadow-lg z-50 overflow-y-auto">
        <div class="absolute top-0 text-white right-0 text-sm p-1 z-50">
          <button @click="demo = ''" class="ri-close-fill"></button>
        </div>
        <div class="py-4 text-left px-6">
          <video width="640" height="480" :src="getDemoUrl(demo)" controls></video>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  methods: {
    getDemoUrl (demo) {
      return (new URL(demo)).href
    }
  },

  data () {
    return {
      demo: '',

      projects: {
        ptt: {
          description: 'Packet Tube Transport: a CLI for directly and securly sharing information with other people. Uses TLS hole punching.',
          url: 'https://github.com/zbo14/ptt'
        },

        sightsea: {
          description: '🌊 Web app that allows you to modify pixel RGB values on the fly using formulas',
          url: 'https://sightsea.dev',
          demo: 'https://drive.google.com/uc?export=download&id=1M6ZYzE3EkTzmZcJOJk3MJrbKgrT96qNe',
          disclaimer: 'WARNING: flashing lights'
        },

        site: {
          description: '🧰 A simple website starter kit! Uses Astro, Vue, Tailwind CSS and other tech I like.',
          url: 'https://github.com/zbo14/site'
        },

        spa: {
          description: '📐 A Single Page Application (SPA) template',
          url: 'https://github.com/zbo14/spa'
        },

        'this site!': {
          description: 'My personal website',
          url: 'https://zachh.me'
        },

        'tls-hole-punching': {
          description: '👊 Hole punching for direct, reliable, and secure p2p communication. I blog about it!',
          url: 'https://zachh.me/blog/tls-hole-punching'
        }
      }
    }
  },

  metaInfo: {
    title: 'Projects'
  }
}
</script>
