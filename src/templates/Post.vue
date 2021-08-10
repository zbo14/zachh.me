<template>
  <Layout>
    <div class="text-xs sm:text-base">
      <h1 class="p-1">{{ $page.post.title }}</h1>
      <span class="font-light italic p-1">{{ $page.post.date }}</span>
      <div class="post p-1" v-html="$page.post.content" />
      <div class="flex mt-8 sm:mb-8">
        <div>
          <g-link class="text-black hover:text-shadow-yellow" to="/blog"><< back to blog</g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
   post (path: $path) {
    content
    date (format: "MMMM D, Y")
    title
  }
}
</page-query>

<script>
export default {
  metaInfo () {
    return {
      title: this.$page.post.title
    }
  }
}
</script>
