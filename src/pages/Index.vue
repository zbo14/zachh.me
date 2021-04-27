<template>
  <Layout>
    <p class="terminal text-lg">
      zach@home:~$
    </p>
    <div class="whoami">
      <div class="flex my-8">
        <img class="object-scale-down h-24 rounded-full" src="../../static/images/me.jpeg"/>
        <h1 class="mx-4 my-auto">Hi, my name's Zach!</h1>
      </div>
      <p class="my-8 text-lg">
        > I'm an open-source developer
      <p class="my-8 text-lg">
        > Former engineer at <g-link href="https://starry.com">Starry</g-link>
      </p>
      <p class="my-8 text-lg">
        > Currently building at <g-link href="https://gatherly.io">Gatherly</g-link>
      </p>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Home'
  }
}
</script>

<style>
.terminal:after {
  content:"_";
  opacity: 0;
  animation: typing 3s step-end forwards;
  animation-iteration-count: 1;
}

.whoami div:nth-child(1) {
  opacity: 0;
  animation: show 3s ease-in forwards;
  animation-iteration-count: 1;
}

.whoami p:nth-child(2) {
  opacity: 0;
  animation: show 3s ease-in forwards;
  animation-iteration-count: 1;
  animation-delay: 0.4s;
}

.whoami p:nth-child(3) {
  opacity: 0;
  animation: show 3s ease-in forwards;
  animation-iteration-count: 1;
  animation-delay: 0.8s;
}

.whoami p:nth-child(4) {
  opacity: 0;
  animation: show 3s ease-in forwards;
  animation-iteration-count: 1;
  animation-delay: 1.2s;
}

@keyframes show {
  75% {
    opacity: 0;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@keyframes typing {
  0% {
    opacity: 1;
  }

  20% {
    opacity: 0;
  }

  40% {
    content:"_";
    opacity: 1;
  }

  45% {
    content: "w_";
  }

  50% {
    content: "wh_";
  }

  55% {
    content: "who_";
  }

  60% {
    content: "whoa_";
  }

  65% {
    content: "whoam_";
  }

  70% {
    content: "whoami_";
  }

  80% {
    content: "whoami";
    opacity: 1;
  }

  100% {
    content: "whoami";
    opacity: 1;
  }
}
</style>
