<template>
  <Layout>
    <p class="italic mb-8 text-sm">Original songs recorded as voice memos</p>
    <ul class="list-none list-inside">
      <li class="my-4" v-for="edge in $page.memos.edges" :id="edge.node.slug" :key="edge.node.slug">
        <g-link class="text-black text-base sm:text-xl" :to="edge.node.path">{{ edge.node.title }}</g-link>
        <p class="mt-1 text-xs">{{ edge.node.date }}</p>
        <hr>
      </li>
    </ul>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Memos'
  }
}
</script>

<page-query>
query {
  memos: allMemo (sortBy: "date", order: DESC) {
    edges {
      node {
        date (format: "MMMM D, Y")
        title
        filename
        path
      }
    }
  }
}
</page-query>
