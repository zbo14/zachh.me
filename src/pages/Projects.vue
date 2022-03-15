<template>
  <Layout>
    <h1 class="mb-6 sm:mb-8">Projects are my favorite way to learn!</h1>
    <h2 class="italic mb-4">I love to build things I can use everyday</h2>
    <p>For instance, <g-link to="/blog/passing-passwords-to-myself/">this password 🔑 manager</g-link>, which I use on my desktop and iPhone daily! While researching VPNs in <b>2019</b>, I rolled my own <g-link href="https://github.com/zbo14/wirevpn-server">cloud ☁️ VPN setup</g-link>. I've since migrated to a managed VPN service; however, I got A LOT of mileage out of this "DIY VPN". My friend even used it on his phone without issue!</p>
    <br>
    <h2 class="italic mb-4">I enjoy automating and improving workflows</h2>
    <p>For much of <b>2020</b>, I was hacking on public bug-bounty programs. There are a plethora of existing bug-bounty tools. However, I built my own as a learning exercise and a way to automate repetitive, manual processes. <g-link href="https://github.com/zbo14/sc0pe">This recon 🔍 tool</g-link> allowed me to bulk enumerate in-scope domains for bug bounty programs by simply passing a configuration file from the program's web page.</p>
    <br>
    <h2 class="italic mb-4">I like tackling complex problems</h2>
    <p>Reading through specifications, reviewing other implementations, and building my own. These steps help cement my understanding of how a system works and why it was designed the way it was. Not too long ago, I created <g-link href="https://github.com/zbo14/triple-double">my own implementation</g-link> of the Double Ratchet and Extended Triple Diffie-Hellman Algorithms, allowing users to send encrypted messages to each other over WebSockets.</p>
    <br>
    <h2 class="italic mb-4">I'm interested in web security</h2>
    <p>In <b>2021</b>, I've worked on a <g-link href="https://github.com/zbo14/tls-refresh">couple</g-link> <g-link href="https://github.com/zbo14/certnode"> projects</g-link> to make TLS certificate 🔐 issuance and renewal more accessible. This effort piggybacks on a much larger undertaking by the <g-link href="https://www.abetterinternet.org/">ISRG</g-link> and other organizations to increase Internet security. Developers have many tools at their disposal to secure their websites and web services. I've focused on ways to make this tooling even easier to use.</p>
    <br>
    <h2 class="italic mb-4">What have I been working on recently?</h2>
    <ul>
      <li class="mb-4" v-for="(project, name) in projects">
        <h3 class="mb-2">
          <a :href="project.url">{{ name }}</a>
        </h3>
        <p>{{ project.description }}</p>
      </li>
    </ul>
  </Layout>
</template>

<script>
export default {
  data () {
    return {
      projects: {
        'linkmo 🔗': {
          description: 'A tool that generates shareable payment links for venmo.',
          url: 'https://www.npmjs.com/package/linkmo'
        },

        'soundtip 💸': {
          description: 'A Spotify app that makes it easy to tip artists you\'re listening to.',
          url: 'https://soundtip.xyz'
        },

        'site 💻': {
          description: 'A simple website starter template!',
          url: 'https://github.com/zbo14/site'
        }
      }
    }
  },

  metaInfo: {
    title: 'Projects'
  }
}
</script>
