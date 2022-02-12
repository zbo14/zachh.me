<template>
  <Layout>
    <div class="text-xs sm:text-base">
      <h1 class="p-1">{{ $page.memo.title }}</h1>
      <span class="font-light italic p-1">{{ $page.memo.date }}</span>
      <audio class="mt-8" :src="getAudioURL($page.memo.filename)" controls></audio>
      <h2 class="mt-8 p-1">Lyrics:</h2>
      <div class="italic mt-2 p-1 text-sm" v-html="formatLyrics($page.memo.content)" />
      <div class="flex mt-8 sm:mb-8">
        <div>
          <g-link class="text-black hover:text-shadow-pink" to="/memos"><< back to memos</g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Memo ($path: String!) {
   memo (path: $path) {
    content
    date (format: "MMMM D, Y")
    title
    filename
  }
}
</page-query>

<script>
export default {
  methods: {
    formatLyrics (content) {
      return content
        .replace(/<\/p>/g, '<\/p><br>')
        .replace(/\n/g, '<p>')
    },

    getAudioURL (filename) {
      const audio = require.context('../../static/audio/')
      return audio('./' + filename)
    }
  },

  metaInfo () {
    return {
      title: this.$page.memo.title
    }
  }
}
</script>
