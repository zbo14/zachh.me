<template>
  <Layout>
    <h1 class="mb-6 sm:mb-8">Projects I've worked on:</h1>
    <ul>
      <li class="mb-6" v-for="(project, name) in projects">
        <div class="flex items-center mb-2">
          <h3 class="mr-2">
            {{ name }}
          </h3>
          <g-link class="mr-2 text-black" v-if="project.website" :href="project.website">
            <i class="ri-home-2-fill" />
          </g-link>
          <g-link class="mr-2 text-black" v-if="project.github" :href="project.github">
            <i class="ri-github-fill" />
          </g-link>
          <g-link class="text-black" v-if="project.blogPost" :href="project.blogPost">
            <i class="ri-article-fill" />
          </g-link>
          <button class="hover:text-shadow-pink mr-2" @click="() => { demo = ''; demo = project.demo }" v-if="project.demo">
            <i class="ri-play-fill" />
          </button>
        </div>
        <p>{{ project.description }}</p>
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
          description: 'Packet Tube Transport: a CLI for directly and securly sharing information with other people. Uses TLS hole punching (see below).',
          github: 'https://github.com/zbo14/ptt'
        },

        sightsea: {
          description: '🌊 Web app that allows you to modify pixel RGB values on the fly using formulas.',
          website: 'https://sightsea.dev',
          github: 'https://github.com/zbo14/sightsea.dev',
          demo: 'https://drive.google.com/uc?export=download&id=1M6ZYzE3EkTzmZcJOJk3MJrbKgrT96qNe'
        },

        site: {
          description: '🧰 A simple website starter kit! Uses Astro, Vue, Tailwind CSS and other tech I like.',
          github: 'https://github.com/zbo14/site'
        },

        spa: {
          description: '📐 A Single Page Application (SPA) template',
          github: 'https://github.com/zbo14/spa'
        },

        'this site!': {
          description: 'My personal website',
          github: 'https://github.com/zbo14/zachh.me'
        },

        'tls-hole-punching': {
          description: '👊 Hole punching for direct, reliable, and secure p2p communication. I blog about it!',
          github: 'https://github.com/zbo14/tls-hole-punching',
          blogPost: 'http://zachh.me/blog/tls-hole-punching/'
        },

        vomblog: {
          description: 'Chronicled chaos',
          website: 'https://vomblog.pages.dev'
        },

        whimsee: {
          description: '👀 👀 👀',
          website: 'https://whimsee.pages.dev'
        }
      }
    }
  },

  metaInfo: {
    title: 'Projects'
  }
}
</script>
