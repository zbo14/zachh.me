<template>
  <Layout>
    <h1 class="my-4">Summary</h1>
    <p class="my-4">Backend software engineer interested in designing applications and building web infrastructure with availability, scalability, and flexibility in mind.</p>
    <h1 class="my-4">Technical Skills</h1>
    <div class="flex items-start my-4">
      <div class="mr-5">
        <p class="font-semibold py-1" v-for="category in technicalSkills.categories" :key="category">{{ category }}:</p>
      </div>
      <div>
        <p class="py-1" v-for="(values, idx) in technicalSkills.values" :key="idx">{{ values.join(', ') }}</p>
      </div>
    </div>
    <h1 class="my-4">Work Experience</h1>
    <div class="my-4" v-for="job in jobs" :key="job.company">
      <h2 class="font-semibold text-lg">{{ job.company }}, {{ job.role }} // {{ job.start }} - {{ job.end }}</h2>
        <p class="italic text-sm">Tech used: {{ job.techUsed.join(', ') }}</p>
        <ul class="list-disc list-inside m-2">
          <li v-for="action in job.actions">{{ action }}</li>
        </ul>
    </div>
    <h1 class="my-4">Education</h1>
    <div class="my-4">
      <p>Northwestern University // Sep 2013 - Jun 2016</p>
    </div>
    <h1 class="my-4">Bug Bounty</h1>
    <div class="my-4">
      <ul class="list-disc list-inside m-2">
        <li v-for="item in bugBounty">
          <span v-if="typeof item === 'string'">{{ item }}</span>
        </li>
      </ul>
    </div>
    <h1 class="my-4">Interests</h1>
    <div class="my-4">
      <ul class="list-disc list-inside m-2">
        <li v-for="interest in interests">
          <span v-if="typeof interest === 'string'">{{ interest }}</span>
          <ul v-else class="list-disc list-inside m-2">
            <li v-for="subInterest in interest">
              {{ subInterest }}
            </li>
          </ul>
        </li>
      </ul>
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
        categories: [
          'Languages',
          'Frameworks',
          'Databases',
          'Cloud',
          'AWS',
          'Proxies',
          'VPNs'
        ],

        values: [
          [
            'JavaScript',
            'Go',
            'Python',
            'Bash'
          ],
          [
            'Fastify',
            'Vue',
            'Express',
            'React'
          ],
          [
            'MongoDB',
            'Redis',
            'DynamoDB',
            'Elasticsearch'
          ],
          [
            'AWS',
            'DigitalOcean',
            'Vultr'
          ],
          [
            'CloudFront',
            'CloudWatch',
            'EC2',
            'ELB/ALB',
            'Lambda@edge',
            'S3'
          ],
          [
            'Burp',
            'HAProxy',
            'HTTP/S',
            'SOCKS+SSH'
          ],
          [
            'WireGuard',
            'OpenVPN',
            'Perimeter 81'
          ]
        ]
      },

      bugBounty: [
        'Participated in public bug-bounty programs in 2020 and refined web hacking skills',
        'July 2020: Awarded $2K for bug reported to Robinhood\'s HackerOne program',
        'April 2020: Awarded $750 bounty for bug reported to Robinhood\'s HackerOne program',
        'March 2020: Awarded $150 bounty for bug reported to Glassdoor\'s HackerOne program'
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
            'Introduced Slack webhooks to aid with debugging and lower incident response times',
            'Secured cloud resources with remote VPN and prepared for SOC2 posture',
            'Coordinated frontend migration to CDN to improve performance and user experience of our product'
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
            'Wrote code for and provided code review on several internal projects',
            'Developed software library to make symmetric encryption more convenient for team',
            'Implemented SNMP service to fetch and modify configuration for field hardware',
            'Learned how to write full-coverage tests and weigh engineering decisions'
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
            'Worked on project for querying/persisting linked metadata (IPLD) and media to IPFS',
            'Built prototypes on top of other decentralized platforms (e.g. BigchainDB, Swarm)',
            'Made open source contributions to the COALA IP organization',
            'Collaborated with other team members in agile development process'
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
            'Collaborated with small team of programmers on Ethereum Blockchain project',
            'Picked up Clojure and became familiar with code repositories',
            'Wrote tests and benchmarks for API calls'
          ]
        }
      ]
    }
  }
}
</script>
