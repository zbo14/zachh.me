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
    <h2 class="italic mb-4">Want to work on something together?</h2>
    <p>I'm always excited for opportunities to collaborate on projects!</p>
    <p>Feel free to reach out on social or email: zmbalder{at}gmail{dot}com.</p>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Projects'
  }
}
</script>
