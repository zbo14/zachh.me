<template>
  <Layout>
    <h1 class="mb-6 sm:mb-8">Hire me!</h1>
    <h2 class="italic my-8">Guess what? I freelance in the following areas:</h2>
    <ul class="list-disc list-inside">
      <li v-for="area in areas">{{ area }}</li>
    </ul>
    <h2 class="italic mt-8">Some services I offer:</h2>
    <div class="mt-8" v-for="(details, service) in services">
      <p class="font-semibold my-2">{{ service }}</p>
      <ul class="list-disc list-inside">
        <li v-for="detail in details">
          <a v-if="Array.isArray(detail)" :href="detail[1]" target="_blank">
            {{ detail[0] }}
          </a>
          <span v-else>
            {{ detail }}
          </span>
        </li>
      </ul>
    </div>
    <br>
    <p class="mt-4 mb-2">If any of this sounds interesting or helpful, please email <span class="italic">zach{at}zachh{dot}me</span> for rates.</p>
    <p>Have something in mind that isn't listed but still want to connect? Please reach out!</p>
  </Layout>
</template>

<script>
export default {
  data () {
    return {
      areas: [
        'Web development',
        'Computer networking',
        'Cloud deployment'
      ],

      services: {
        'Workflow automation': [
          ['Bash scripting', 'https://github.com/zbo14/wirevpn-server'],
          ['Browser automation (e.g. puppeteer)', 'https://github.com/zbo14/sourcery'],
          'Task scheduling'
        ],

        'Data extraction & processing': [
          'Regular expressions',
          'Web scraping'
        ],

        'Static site build & deployment': [
          ['Gridsome + Netlify', 'https://zachh.me'],
          ['Jekyll + GitHub Pages', 'https://zbo14.github.io']
        ],

        'Backend development & maintenance': [
          'DNS record creation & migration',
          'REST API design & implementation',
          'Database management',
          ['Serverless functions (Vercel)', 'https://github.com/zbo14/fastify-nuxt-vercel'],
          'VPS provisioning'
        ]
      }
    }
  },

  metaInfo: {
    title: 'Hire'
  }
}
</script>
