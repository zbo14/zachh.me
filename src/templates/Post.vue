<template>
  <Layout>
    <div>
      <h1 class="p-1">{{ $page.post.title }}</h1>
      <span class="font-light italic p-1">{{ $page.post.date }}</span>
      <div class="p-1" v-html="$page.post.content" />
      <div class="flex my-8">
        <g-link class="text-black" to="/blog"><< back to blog</g-link>
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
  },
}
</script>
