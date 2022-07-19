<template>
  <Layout>
    <p><b>Hi, my name's Zach!</b> I'm a software engineer and former bug-bounty hunter interested in all things web. In my free time, I like to sing and play keyboard. Every once in a blue moon, I'll scrape the rust off my saxophone.</p>
    <h1 class="font-heading mt-8">My path</h1>
    <div v-for="(step, idx) in myPath" :key="idx">
      <div class="inline-flex">
        <img v-if="step.image" :class="[step.image.height, step.image.width, 'my-6', 'rounded'].filter(Boolean)" :src="getImgURL(step.image.file)">
        <i v-if="step.icon" :class="[step.icon.class,step.icon.height, step.icon.width, 'my-6', 'rounded'].filter(Boolean)" />
        <g-link v-if="step.company.link" class="font-semibold mx-4 my-auto text-black text-lg" :href="step.company.link">{{ step.company.name }}</g-link>
        <p v-else class="font-semibold mx-4 my-auto text-black text-lg" :href="step.company.link">{{ step.company.name }}</p>
      </div>
      <div>
        <p>{{ step.description }}  <g-link class="my-auto" v-if="step.company.hiring" :href="step.company.hiring.link">{{ step.company.hiring.message || 'And we\'re hiring!' }}</g-link></p>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  data () {
    return {
      myPath: [
        {
          image: {
            file: 'starry.png',
            height: 'h-10',
            width: 'w-10'
          },

          company: {
            name: 'Starry, Inc.',
            link: 'https://starry.com'
          },

          description: 'I joined the cloud services team and built web applications and internal tooling to help deliver affordable, high-speed internet to customers.'
        },
        {
          description: 'I spent several months hacking on bug bounty programs. I submitted vulnerability reports to Glassdoor and Robinhood describing security issues I found and suggested measures to address them. Hacking on these programs gave me insight into how and where security vulnerabilities arise in web applications and the extent to which they affect businesses and users.',

          image: {
            file: 'bug.png',
            height: 'h-10',
            width: 'w-10'
          },

          company: {
            name: 'Bug bounty',
            link: 'https://hackerone.com/zbo14/?type=user'
          }
        },
        {
          image: {
            file: 'gatherly.png',
            height: 'h-10',
            width: 'w-10'
          },

          company: {
            name: 'Gatherly',
            link: 'https://gatherly.io'
          },

          description: 'At Gatherly, I worked on a spatial video chat platform to make online events more accessible and enjoyable!'
        },
        {
          company: {
            name: 'Wisiwig',
            link: 'https://wisiwig.co',
            hiring: {
              link: 'https://angel.co/company/wisiwig-app',
              message: 'And we\'re growing our team in Boston!'
            }
          },

          image: {
            file: 'wisiwig.png',
            height: 'h-10',
            width: 'w-10',
            hiring: 'https://angel.co/company/wisiwig-app'
          },

          description: 'Now I\'m technical cofounder at Wisiwig (MC\'22), a development platform allowing product designers to build user interfaces and deliver code to engineering teams.'
        }
      ]
    }
  },

  methods: {
    getImgURL (filename) {
      const imgs = require.context('../../static/images/')
      return imgs('./' + filename)
    }
  },

  metaInfo: {
    title: 'About'
  }
}
</script>
