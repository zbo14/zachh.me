<template>
  <Layout>
    <p><b>Hi, my name's Zach!</b> I'm a software engineer and occasional bug-bounty hunter interested in all things web. I love to write backend code and design distributed applications. Projects are my favorite way to learn and I use some of them daily, including <g-link href="/blog/passing-passwords-to-myself">this password manager</g-link> and <g-link href="/blog/diy-vp-ns/">this VPN</g-link>. Typically, coffee and beer are the bookends to my day. In my free time, I like to sing and play keyboard. Every once in a blue moon, I'll scrape the rust off my saxophone.</p>
    <h1 class="my-4">My path</h1>
    <div class="grid grid-cols-7" v-for="(step, idx) in myPath" :key="idx">
      <div>
        <img :class="[step.image.height, step.image.width, 'my-8', 'rounded'].filter(Boolean)" :src="getImgURL(step.image.file)">
      </div>
      <div class="-mx-8 my-auto">
        <g-link class="font-semibold text-black text-lg" :href="step.company.link">{{ step.company.name }}</g-link>
      </div>
      <div class="col-span-5 -mx-8 my-auto">
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
            file: 'ujo.png',
            height: 'h-6',
            link: 'https://ujomusic.com/',
            width: 'w-12'
          },

          company: {
            name: 'Ujo Music',
            link: 'https://ujomusic.com'
          },

          description: 'As a software developer here, I worked at the intersection of music and decentralized technologies, including Ethereum and IPFS.'
        },
        {
          image: {
            file: 'starry.png',
            height: 'h-10',
            link: 'https://starry.com/',
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
            file: 'gatherly.jpeg',
            height: 'h-10',
            link: 'https://www.gatherly.io/',
            width: 'w-10'
          },

          company: {
            name: 'Gatherly',
            link: 'https://gatherly.io',
            hiring: 'https://gatherly.breezy.hr/'
          },

          description: 'Now, I\'m working on a spatial video chat platform to make online events more accessible and enjoyable!'
        }
      ]
    }
  },

  methods: {
    getImgURL (filename) {
      const imgs = require.context('../../static/images/')
      return imgs('./' + filename )
    }
  },

  metaInfo: {
    title: 'About'
  }
}
</script>
