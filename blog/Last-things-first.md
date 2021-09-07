---
slug: "last-things-first"
title: "Last things first"
description: ""
date: 2021-09-06
---

Has this ever happened to you? You start a project, complete steps 1-4, hit an impassable roadblock, and then kick yourself for not identifying the obstacle sooner and saving yourself the time and effort?

<div class="flex justify-center items-center">
  <img class="py-4" src="/images/mitch-bryant.gif" />
</div>

I'm guessing you've found yourself, at one time or another, in a similar situtation. These endeavors aren't always sunken costs; they can be valuable learning experiences. However, they can be a source of fatigue and frustration especially when experienced in succession.

As you might have inferred from the title of this post, I believe it's sometimes helpful to do the last thing *first*. I'll describe a project I was working on and how it led me to think of this approach.

I often occupy this mindset: complete step 1, move onto step 2, complete step 2, etc. This works in many cases, allowing me to focus my energy on the current task at hand. In other cases such as the aforementioned scenario, it leads me down a dead-end. For instance, step 5 has a particular constraint that obstructs the direction I took in steps 1-4. This mindset, I find, values productivity and quantity of work achieved. It doesn't have much patience for planning, which could save time later on.

When I'm faced with a complex problem that has many moving parts, I tend to occupy a planning mindset. Executing the steps without sketching some kind of blueprint beforehand seems overwhelming and ill-advised. So I'll write up a design document or map out the necessary steps before embarking on the journey.

Planning can be difficult work, especially when the plan depends on some degree of trial and error. Implementation details can ultimately influence what path we end up taking. If the planning process makes assumptions that aren't validated in practice, we can hit roadblocks later despite correctly following our own directions.

Ideally, we'd be able to identify and address all blockers during the planning process. This isn't always possible though, so iterative trial and error is an effective way to test and refine our methods. This still leaves the question of *how* to perform trial and error, especially when there are many trials to perform, overlapping or encompassing trials, or depedencies between them.

This can be tricky to sort out and the solution may differ depending on the situation. A common theme I've noticed in my work and in discussions with friends and colleagues: neglecting the constraints of the later steps comes with a cost. Testing the later steps in isolation, early on, to shorten the feedback loop, even if it involves work that isn't included in the final product, can be a huge time-saver.

I've been building a web application that requires certain server side logic. Basically, a collection of API routes that makes HTTPS requests and exposes an Oauth2 flow. Since this happens server-side, I wouldn't be able to statically serve the bundle and assets from a CDN using a Jamstack framework like [Gatsby](https://www.gatsbyjs.com/) or [Gridsome](https://gridsome.org/). No problem, there are still a lot of frameworks to choose from. [Next](https://nextjs.org/) and [Nest](https://nestjs.com/) are 2 popular ones that have server side rendering, helpful abstractions, and many other bells and whistles. I opted for [Nuxt](https://nuxtjs.org/) since I'm more comfortable with Vue on the frontend.

The next step, in my head, was implementing the API routes. It seemed like the quickest approach would be building them into the Nuxt server side middleware. This didn't seem idiomatic though; my application didn't have any *actual* middleware. Pretty much, just a function with a giant switch statement, HTTP verb checks, and other messy boilerplate that should be handled declaratively via API route definition. Plus, my "API-routes-as-middleware" approach would make it harder to add actual middleware later on.

Instead, I decided to run a [Fastify](https://www.fastify.io/) web server locally that served the API routes *and* my Nuxt application. This wasn't too difficult, since [There's a Plugin for That](https://github.com/gomah/fastify-nuxtjs) ™️ and I've used Fastify before.

Then came time to deploy my application. I looked at several different platforms and chose [Vercel](https://vercel.com/docs) because (1) I hadn't used it before and wanted to try it out, and (2) it has serverless capabilities so I could run my backend logic without worrying about provisioning instances. I deployed the application as it was written, and guess what happened?... It broke :/

Fortunately, after skimming the Vercel docs and making a few tweaks, I was able to deploy my application. I stuck with Fastify and Nuxt, it was just a matter of changing the Vercel configuration to build Fastify and Nuxt individually and run them as separate serverless functions. On my machine, I still ran them together to ease local development.

I was very lucky! This could have been a case where the deployment fix wasn't a simple code or configuration change. I realized I should have thought about deployment before I got deep in the code. A better approach might have been:

1. (1) Choose a cloud platform (Vercel)
1. (2) Choose frontend + backend frameworks and think about how to deploy them on Vercel
1. (3) Build a minimal frontend + backend and do a test deploy
1. (4) Then write the backend logic and build out the UI

Step 3 in the above flow wouldn't be included in the final product. However, it would indicate early on whether our architecture works in the cloud as it does locally.

There's a lot of discussion around which software frameworks to use. This question, which quickly and frequently turns into a heated argument, is sometimes answered before another important question: how are you going to deploy whatever you're building? The answer to this question may, in the end, influence the answer to the former. Even if it doesn't, it could very well affect *how* one builds the application.

Sometimes, it's helpful to think of last things first :)
