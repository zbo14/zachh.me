<template>
  <Layout>
    <div class="flex">
      <img class="object-scale-down h-24 rounded-full" src="../../static/images/me.jpeg"/>
      <h1 class="mx-4 my-auto">Hey! I'm Zach Balder</h1>
    </div>
    <p class="my-8 text-lg">
      <code>$ whoami</code>
    </p>

    <p class="my-8 text-lg">
      > Open-source developer 🖥️ 🌐
    <p class="my-8 text-lg">
      > Former engineer at <g-link href="https://starry.com">Starry</g-link> 📶
    </p>
    <p class="my-8 text-lg">
      > Currently building at <g-link href="https://gatherly.io">Gatherly</g-link> 🎥 🎫
    </p>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Home'
  }
}
</script>
