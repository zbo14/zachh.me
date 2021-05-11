---
"slug": "new(ish)-site"
title: "New(ish) site"
description: ""
date: 2021-05-11
---
<br>

I thought it was about time to write about my little corner of the internet :)

<br>

My first site, [zbo14.github.io](https://zbo14.github.io), is a [Jekyll](https://jekyllrb.com/) blog deployed via [GitHub pages](https://pages.github.com/). It was easy to set up and update, but it didn't look great on mobile and I didn't implement a responsive design from the outset. Also, I wasn't a huge fan of [Liquid](https://github.com/Shopify/liquid/wiki) and would've preferred to write code in the vein of a modern JS framework (e.g. React, Vue).

<br>

I decided to recreate my personal website using [Gridsome](https://gridsome.org/) and [Tailwind CSS](https://tailwindcss.com/). Gridsome provides all the benefits of [jamstack](https://jamstack.org/what-is-jamstack/) with the familiarity and flexibility of writing Vue code. Tailwind has a [mobile first breakpoint system](https://tailwindcss.com/docs/responsive-design#mobile-first) that makes it really easy to build UIs for different screen sizes. This stack checked a bunch of boxes for me and overall seemed like a solid selection for my new internet home.

<br>

I wanted to preserve the general workflow of my first site: code is kept in a GitHub repo and deploys are triggered when I push code. There are no shortage of deployment options, and Gridsome can easily deploy to several of these platforms (e.g. GitHub Pages, [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/)). I decided to try Netlify since a friend mentioned liking it and I had already used GitHub Pages.

<br>

I guess that's pretty much it? [Here](https://github.com/zbo14/zachh.me)'s the source code or you can [fork](https://github.com/zbo14/zachh.me/fork) if you like!
