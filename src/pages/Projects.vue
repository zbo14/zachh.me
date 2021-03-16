<template>
  <Layout>
    <p class="font-semibold mb-4 text-xl">Projects are my favorite way to learn!</p>
    <p class="font-semibold mb-4 text-md">I love to build things I can use everyday.</p> For instance, <g-link to="/blog/passing-passwords-to-myself/">this password 🔑 manager</g-link>, which I use on my desktop and iPhone daily! While researching VPNs in <b>2019</b>, I rolled my own <g-link href="https://github.com/zbo14/wirevpn-server">cloud ☁️ VPN setup</g-link>. I've since migrated to a managed VPN service; however, I got A LOT of mileage out of this "DIY VPN". My friend even used it on his phone without issue!</p>
    <br>
    <p class="font-semibold mb-4 text-md">I enjoy automating processes and improving workflows.</p>
    <p>For much of <b>2020</b>, I was hacking on public bug-bounty programs. There are a plethora of existing bug-bounty tools. However, I built my own as both a learning exercise and a way to automate repetitive, manual processes. <g-link href="https://github.com/zbo14/sc0pe">This recon 🔍 tool</g-link> allowed me to bulk enumerate in-scope domains for bug bounty programs by simply passing a configuration file from the program's web page.</p>
    <br>
    <p class="font-semibold mb-4 text-md">I like tackling complex problems.</p>
    <p>Reading through specifications, reviewing other implementations, and building my own. These steps help cement my understanding of how a system works and why it was designed the way it was. Not too long ago, I created <g-link href="https://github.com/zbo14/triple-double">my own implementation</g-link> of the Double Ratchet and Extended Triple Diffie-Hellman Algorithms, allowing users to send encrypted messages to each other over WebSockets.</p>
    <br>
    <p class="font-semibold my-4 text-lg">What I'm working on now</p>
    <p>A fun little chrome extension. More info coming soon!</p>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Projects'
  }
}
</script>
