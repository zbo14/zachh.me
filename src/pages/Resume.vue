<template>
  <Layout>
    <div class="text-xs sm:text-base">
    <h1 class="mb-4">Summary</h1>
    <p class="my-4">Backend software engineer interested in designing applications and building web infrastructure with availability, scalability, and flexibility in mind.</p>
    <h1 class="my-4">Technical Skills</h1>
    <table class="table-auto">
      <thead>
      </thead>
      <tbody>
        <tr v-for="(skills, category) in technicalSkills" class="border-separate border-b border-t border-black rounded-lg" :key="category">
          <td class="align-top border-separate border-r border-black font-semibold p-2 rounded-lg">{{ category }}</td>
          <td class="italic p-2">{{ skills.join(', ') }}</td>
        </tr>
      </tbody>
    </table>
    <h1 class="my-4">Work Experience</h1>
    <div class="my-4" v-for="job in jobs" :key="job.company">
      <h2 class="font-semibold">{{ job.company }}, {{ job.role }}</h2>
        <p>{{ job.start }} - {{ job.end }}</p>
        <p class="italic">Tech used: {{ job.techUsed.join(', ') }}</p>
        <ul class="list-disc list-inside">
          <li v-for="action in job.actions">{{ action }}</li>
        </ul>
    </div>
    <h1 class="my-4">Education</h1>
    <div class="my-4">
      <p>Northwestern University // Sep 2013 - Jun 2016</p>
    </div>
    <h1 class="my-4">Bug Bounty</h1>
    <div class="my-4">
      <ul class="list-disc list-inside">
        <li v-for="item in bugBounty">
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <h1 class="my-4">Interests</h1>
    <div class="my-4">
      <ul class="list-disc list-inside">
        <li v-for="interest in interests">
          <span>{{ interest }}</span>
        </li>
      </ul>
    </div>
  </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Resume'
  },

  data () {
    return {
      technicalSkills: {
        Languages: [
          'JavaScript',
          'Go',
          'Python',
          'Bash'
        ],

        Frameworks: [
          'Fastify',
          'Vue',
          'Express',
          'React'
        ],

        Databases: [
          'MongoDB',
          'Redis',
          'DynamoDB',
          'Elasticsearch'
        ],

        'Cloud/CDN': [
          'AWS',
          'DigitalOcean',
          'Vultr',
          'Netlify',
          'GitHub Pages'
        ],

        AWS: [
          'CloudFront',
          'CloudWatch',
          'EC2',
          'ELB/ALB',
          'Lambda',
          'S3'
        ],

        Proxies: [
          'Burp',
          'HAProxy',
          'HTTP/S',
          'SOCKS+SSH'
        ],

        VPNs: [
          'WireGuard',
          'OpenVPN',
          'Perimeter 81'
        ]
      },

      bugBounty: [
        'Participated in bug-bounty programs and refined web hacking skills',
        'Jul 2020: Awarded $2K for bug on Robinhood\'s HackerOne',
        'Apr 2020: Awarded $750 bounty for bug on Robinhood\'s HackerOne',
        'Mar 2020: Awarded $150 bounty for bug on Glassdoor\'s HackerOne'
      ],

      interests: [
        'Web applications',
        'Computer networking',
        'Distributed systems',
        'Cyber Security',
        'Singing / playing keyboard / occasionally saxophone',
        'Twin Peaks'
      ],

      jobs: [
        {
          company: 'Gatherly',
          role: 'Senior Software engineer',
          start: 'Nov 2020',
          end: 'Present',

          techUsed: [
            'Node+npm',
            'git+GitHub',
            'TypeScript',
            'DynamoDB',
            'React'
          ],

          actions: [
            'Contributed code and PR review on main product application',
            'Introduced Slack webhooks to lower incident response times',
            'Secured cloud resources with VPN and prepared for SOC2 posture',
            'Led frontend migration to CDN to improve performance & UX'
          ]
        },
        {
          company: 'Starry',
          role: 'Software engineer',
          start: 'Jun 2018',
          end: 'Feb 2020',

          techUsed: [
            'Node+npm',
            'git+GitHub',
            'Docker+Compose',
            'MongoDB',
            'Vue'
          ],

          actions: [
            'Contributed code and PR review on several internal projects',
            'Built library to make symmetric encryption more convenient for team',
            'Implemented SNMP service to fetch/modify config for field hardware',
            'Wrote full-coverage tests and made infrastructure design decisions'
          ]
        },
        {
          company: 'Ujo Music',
          role: 'Software engineer',
          start: 'Jun 2017',
          end: 'Nov 2017',

          techUsed: [
            'Node+npm',
            'git+GitHub',
            'IPFS'
          ],

          actions: [
            'Worked on project for querying/persisting linked data on IPFS',
            'Built prototypes on other decentralized platforms (e.g. BigchainDB)',
            'Made open source contributions to the COALA IP organization',
            'Collaborated with other team members in agile environment'
          ]
        },
        {
          company: 'Raise Marketplace',
          role: 'Contract developer',
          start: 'Aug 2016',
          end: 'Dec 2016',

          techUsed: [
            'git+GitHub',
            'Clojure',
            'Ethereum'
          ],

          actions: [
            'Collaborated with dev team on Ethereum Blockchain project',
            'Picked up Clojure and became familiar with code repositories',
            'Wrote tests and benchmarks for API calls'
          ]
        }
      ]
    }
  }
}
</script>
