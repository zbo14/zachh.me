<template>
  <Layout>
    <p id="terminal-1" class="terminal text-lg">
      zach@home:~$
    </p>
    <p id="terminal-2" class="invisible terminal text-lg">
      zach@home:~$
    </p>
    <div id="whoami" class="invisible">
      <div class="flex my-8">
        <img class="object-scale-down h-24 rounded-full" src="../../static/images/me.jpeg"/>
        <h1 class="mx-4 my-auto">Hi, my name's Zach!</h1>
      </div>
      <div class="flex my-8">
        <p class="my-auto text-lg">
          > I'm an open-source developer
        </p>
      </div>
      <div class="flex my-8">
        <p class="my-auto text-lg">
          > Currently working at <g-link href="https://nearform.com">NearForm</g-link>
        </p>
      </div>
      <div class="flex my-8">
        <p class="my-auto text-lg">
          > Former engineer at <g-link href="https://starry.com">Starry</g-link> and <g-link href="https://gatherly.io">Gatherly</g-link>
        </p>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  methods: {
    wait (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },

  async mounted () {
    const terminal1 = document.getElementById('terminal-1')
    const terminal2 = document.getElementById('terminal-2')
    const whoami = document.getElementById('whoami')

    const sequence1 = [
      '_',
      '',
      '_',
      'w_',
      'wh_',
      'who_',
      'whoa_',
      'whoam_',
      'whoami_'
    ]

    for (let i = 0; i < sequence1.length; i++) {
      terminal1.textContent = 'zach@home:~$ ' + sequence1[i]
      await this.wait(Math.random() * 100 + 180)
    }

    const sequence2 = [
      'whoami',
      'whoami_',
      'whoami'
    ]

    for (let i = 0; i < sequence2.length; i++) {
      terminal1.textContent = 'zach@home:~$ ' + sequence2[i]
      await this.wait(400)
    }

    terminal2.textContent += '_'
    terminal2.classList.remove('invisible')

    setInterval(() => {
      terminal2.textContent = terminal2.textContent.endsWith('_')
        ? terminal2.textContent.slice(0, -1)
        : terminal2.textContent + '_'
    }, 500)

    whoami.classList.remove('invisible')
  }
}
</script>
