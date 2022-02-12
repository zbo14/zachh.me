<template>
  <Layout>
    <p><b>Hi, my name's Zach!</b> I'm a software engineer and former bug-bounty hunter interested in all things web. Typically, coffee and tea are the bookends to my day. In my free time, I like to sing and play keyboard. Every once in a blue moon, I'll scrape the rust off my saxophone.</p>
    <h1 class="font-heading mt-8">My path</h1>
    <div v-for="(step, idx) in myPath" :key="idx">
      <div class="inline-flex">
        <img :class="[step.image.height, step.image.width, 'my-6', 'rounded'].filter(Boolean)" :src="getImgURL(step.image.file)">
        <g-link v-if="step.company.link" class="font-semibold mx-4 my-auto text-black text-lg" :href="step.company.link">{{ step.company.name }}</g-link>
        <p v-else class="font-semibold mx-4 my-auto text-black text-lg" :href="step.company.link">{{ step.company.name }}</p>
      </div>
      <div>
        <p>{{ step.description }}  <g-link class="my-auto" v-if="step.company.hiring" :href="step.company.hiring">And we're hiring!</g-link></p>
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
          image: {
            file: 'nearform.png',
            height: 'h-10',
            width: 'w-10'
          },

          company: {
            name: 'NearForm',
            link: 'https://www.nearform.com/'
          },

          description: 'Now I\'m at NearForm, helping clients build and maintain software architecture while contributing to open-source projects.'
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
