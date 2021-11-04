---
slug: "skimming-the-process-pool-2"
title: "Skimming the process pool (part 2)"
description: ""
date: 2021-11-04
---

In a [previous post](/blog/skimming-the-process-pool), I discuss when and how you might use `xargs` as a process pool to speed up computations, without exhausting resources on your machine or network. In this post, I'll walk through some Node code that implements a similar process pool. Then we'll look at ways to extend this code beyond explicitly spawning processes.

This implementation uses a pattern I've found myself writing a lot recently, which I call the "resolve queue". In JavaScript, [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) have "resolve" and "reject" callbacks that determine whether the promise resolves with a value or rejects with an error, respectively.

The code below uses the [`child_process`](https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html) module from Node core to spawn OS processes, each of which reads from stdin and echos "foo-ified" results to stdout. The `echo()` method takes an integer as input, pulls a process off the process queue (really an array), and sends it a number to foo-ify. It captures the foo-ified number from the process's stdout and prints this to console (i.e. writes it to the main process's stdout).

When all the processes are busy foo-ifying, the program pushes promise resolve callbacks onto the resolve queue. Each time a task completes, it pulls a resolve callback off the queue and calls it, allowing the hanging method invocation to proceed and send its input to a (now available) process. If there are no callbacks left, it pushes the process back onto the process queue for subsequent method calls to reference.

```js
#!/usr/bin/env node

'use strict'

const cp = require('child_process')
const EventEmitter = require('events')

const processQueue = []
const resolveQueue = []

// Spawn OS processes
for (let i = 0; i < 5; i++) {
  const proc = cp.spawn(
    // sleep mocks expensive computation
    'while read i; do sleep 1; echo foo$i; done',
    { shell: '/bin/bash' }
  )

  proc.stdout.setEncoding('utf8')
  processQueue.push(proc)
}

const echo = async i => {
  let proc

  if (processQueue.length) {
    proc = processQueue.shift()
  } else {
    proc = await new Promise((resolve, reject) => {
      resolveQueue.push(resolve)
    })
  }

  const promise = EventEmitter.once(proc.stdout, 'data')

  proc.stdin.write(i + '\n')

  await promise.then(([foo]) => console.log(foo.trim()))

  const resolve = resolveQueue.shift()

  if (resolve) {
    resolve(proc)
  } else {
    processQueue.push(proc)
  }
}

// Run tasks and then terminate processes
const promises = Array.from({ length: 100 }).map((_, i) => echo(i))

Promise.all(promises).then(() => {
  processQueue.forEach(proc => proc.kill())
})
```

This block of code might be tricky to follow, especially if one is unfamiliar with promises. I suggest executing and possibly modifying it yourself to get a feel for how it works. What is the output? Is it what you expected?

The key thing to note is the process count never exceeds the limit (5). Our program spawns 5 processes and, regardless of how many consecutive method invocations there are, it distributes these tasks across them without spawning more. In other words, it parallelizes an arbitrary number of tasks across a fixed number of processes.

This pattern is useful for other expensive operations besides the explicit spawning of processes. The pattern can be applied to CPU intensive operations that don't spawn processes. For instance, it can be used to implement a pool of [Worker Threads](https://nodejs.org/dist/latest-v16.x/docs/api/worker_threads.html) for performing CPU heavy workloads. The docs even recommend using a Worker Thread pool like this.

Browser automation is another potential use case. Suppose we have a list of 100 URLs we want to scrape. We *can't* use something like [`cheerio`](https://cheerio.js.org/) to scrape the webpages because, let's assume, a lot of them contain JavaScript that renders HTML in the browser. Instead, we use a browser automation tool like [`puppeteer`](https://developers.google.com/web/tools/puppeteer/) to open browser tabs, navigate to each URL, and scrape the data we want.

Visiting 100 URLs in serial takes some time, even with automation. If we open 100 chrome tabs at the same time, we'll hear some fan whirring and our machine will likely freeze up. Not to mention, we'll be sending out hundreds of HTTP/S requests, which could aggravate the web services we're scraping. Ideally, we'd open a handful of tabs and do the following in each of them: (1) visit an unvisited URL, (2) scrape the data we want, and (3) repeat until there are no unvisited URLs left. This requires some modification to the above snippet, but it leverages the same control flow. Instead of a process pool, we can think of it as a "browser tab pool", although chromium is spinning up processes, behind the scenes, for tab rendering. I'll leave the implementation as an exercise to the reader.

Hopefully this gives you some idea how a process pool can be implemented and abstracted for other use cases :)
