<template>
  <Layout>
    <h1 class="mb-6 sm:mb-8">Hire me!</h1>
    <h2 class="mb-4">Guess what? I freelance in the following areas:</h2>
    <ul class="list-disc list-inside">
      <li v-for="area in areas">{{ area }}</li>
    </ul>
    <h2 class="my-4">Some services I offer:</h2>
    <div class="mb-4" v-for="(details, service) in services">
      <p class="font-semibold mb-2">{{ service }}</p>
      <ul class="list-disc list-inside">
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    </div>
    <br>
    <p class="mb-2">If any of this sounds interesting or helpful, please email <span class="italic">zach{at}zachh{dot}me</span> for rates.</p>
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
          'Bash scripting',
          'Browser automation (e.g. puppeteer)',
          'Task scheduling via cron'
        ],

        'Data extraction & processing': [
          'Text (e.g. regex)',
          'Web scraping'
        ],

        'Static site build & deployment': [
          'Gridsome',
          'GitHub Pages',
          'Jekyll',
          'Netlify'
        ],

        'Backend development & maintenance': [
          'DNS record creation & migration',
          'REST API design, implementation, & documentation',
          'Database management',
          'Serverless functions',
          'Vercel',
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
