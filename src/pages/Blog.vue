<template>
  <Layout>
    <ul class="list-none list-inside">
      <li class="my-4" v-for="edge in $page.posts.edges" :key="edge.node.path">
        <g-link class="text-black text-base sm:text-xl" :to="edge.node.path">{{ edge.node.title }}</g-link>
        <p class="mt-1 text-xs">{{ edge.node.date }}</p>
        <p class="italic mt-1 text-sm">{{ edge.node.description }}</p>
        <hr>
      </li>
    </ul>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Blog'
  }
}
</script>

<page-query>
query {
  posts: allPost (sortBy: "date", order: DESC) {
    edges {
      node {
        date (format: "MMMM D, Y")
        description
        title
        path
      }
    }
  }
}
</page-query>
