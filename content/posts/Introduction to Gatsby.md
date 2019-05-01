---
title: Introduction to Gatsby (Lengstorf, Jason)
date: "2019-04-30"
template: "post"
draft: true
slug: "/posts/intro-to-gatsby-notes/"
category: "What I Read"
tags:
  - "Gatsby"
  - "React"
  - "Frontend Masters"
description: "Notes from a live workshop I attended. (Course tagline: \"Learn to build blazing fast apps and websites with React using Gatsby, a static PWA (Progressive Web App) generator.\")"
---

## Gatsby Intro

- MDX: React components in markdown!
- Gatsby as a shortcut to eliminate a lot of boilerplate (_common issue: getting started is overwhelming!_)
- Data management is evolving (_goodbye monolithic, db-based CMS_)
- Gatsby performance strategies (_getting each aspect - image optimization, perf, etc - right is hard_)

- Under the hood, Gatsby's really just React and GraphQL.

- "Content mesh" - CMS's are moving to headless; idea is that your site stitches together data from multiple sources (including local files)

  - use a backend service for each thing it's specialized for (e.g. for a blog on an ecommerce site: algolia for search, contentful for text management, cloudinary for image management, stripe for purchases)
  - graphQL allows for this

- Gatsby doesn't serve a static site: when on the browser, it rehydrates into a fully-functional React app
- Good example: gatsby store (integrates shopify, auth0, and github api's for entire shopping-flow)

- Follows the Osmani 'PRPL' patterns for PWA

- Assets are optimized/lazy-loaded

- Can customize Webpack/Babel w/o ejection

- Anything in `pages` dir gets treated as its own page

  - `index.js` becomes the root
  - aside from `pages`, dir names can be arbitrary

- Side note: one benefit of `<Fragment>` is how it helps you avoid div soup. (Can you by default use empty brackets, e.g. `<><p>foo</p></>`), instead of `<Fragment>`? Or is that provided by a specific lib?)

- Because Gatsby is a React app, it allows you to to use dynamic routing (that is, they've wrapped ReachRouter's link to include preloading and a few other things -- but you should use the `<Link>` component instead of `<a>`)

- `gatsby-config.js` only necessary if you want to use alternate plugins, etch

- For typographic styles, (instructor's personal) preference is to use element-selectors so as to keep styling generic at top level, while allowing for the cascade to help with overwrite (by using class selectors' greater specificity to trump that of the globals.)

- Personal takeaway: [emotion](https://emotion.sh/docs/introduction) appears to be really useful for when you're building a library of logic-only React components that you want to be stylable ad-lib. Really useful for, then, component libraries -- perhaps less so for personal projects.

- This is really cool: `padding: 0.5rem calc((100vw - 550px) / 2);`

  - The `calc` obviates the need for a wrapper div => less markup clutter!
  - Instead, it's saying '_for each horizonal size, pad us inward on each side by the entire screen minus the size of the column_'

- Gatsby exposes the 'site' data, along with a few others, for GraphQL queries

  - To see them all, nav to `http://localhost:8000/___graphql` and click the two right-side drawers ('Docs' and 'Schema')
  - To pass GraphQL queries (e.g. site metadata) throughout the various pages on a site, use a React hook (along with `useStaticQuery` - this provided by Gatsby)

- Restart server, to be safe, when changing GraphQL queries (changes to this possibly coming, but not there yet)

- Note on React hooks: another example is visible in `wave.js`. (Interesting use of arguments - sometimes statement, sometimes expression...)

- Great usecase for `.mdx` files - image inclusion (with quality levels, wrapping subtitles, carousels, etc)

- `gatsby-source-filesystem` is the plugin that provides GraphQL access to local files (letting it use them as part of the data layer by transforming them into GraphQL nodes)

- In GraphQL queries, `nodes` is just shorthand for '(...an array of?) all items that are returned'

- `read-link.js` is an example of a styled component that _only_ exports presentational specs.

- `gatsby-node.js`, `gatsby-browser.js`, `gatsby-ssr.js` are the three files that Gatsby will look for, at build time, to resolve any unique functions declared therein.

- You _can_ load all data for each post into React's Context API, but that rapidly gets unwieldy. Better, instead, to follow `export const query` in `post.js` and call that Graph

- This is pretty cool -- a gradient for making an image fade out (via the color white decreasing in opacity as it reaches its 'top'): `background-image: linear-gradient(to top, #ddbbffdd 2rem, #ddbbff00);`

- `gatsby-transformer-*` is generally a library that searches for nodes and applies transformations upon them

  - e.g. `gatsby-transformer-sharp` for altering/optimizing images
  - usually used with parallel plugin (e.g. `gatsby-plugin-sharp`) inside `gatsby-config.js`

- Note on process: make as much use as you can of the graphql playground: it's almost like Postman (or React Dev Tools' tree inspection) in exploring what data's _de facto_ available to your app

- Gatsby provides a few GraphQL helpers; one is the equivalent of a spread operator. See `src/components/hero.js:48` (Note that you can't uses these "query fragments" in the Gatsby GraphQL playground, however)

- `gatsby-source-*` is generally a plugin that interacts with the API exposed by the `-*` proprietor -- there are _many_ of these

- Inside the GraphQL playground, click `option + space` inside a pair of curly-braces to see the list of

- Use the `gatsby-plugin-webpack-bundle-analyzer` plugin to confirm whether your prod bundle is including any assets or code you don't actually need; see `gatsby-config` for usage example
- Gatsby knows to run `prefetch` using browser detection and Intersection Observer API (_to e.g. determine when the user is scrolling near an image_)

- Gatsby can be good for dashboards.
  - Anything you can build at build-time, do it.
  - If not (e.g. user data), you can use Gatsby to create a hybrid app.

---

* @y: Read more re: unexpected CSS selector: https://bit.ly/2PsCnzk
* @y: read both https://www.gatsbyjs.org/docs/using-gatsby-without-graphql/ and https://www.gatsbyjs.org/docs/why-gatsby-uses-graphql/

* @y: remove flow and (eslint?) from your blog app; add prettier
* @y: analyze your sussworld image on devtools, throttled to 3G - why does it load slowly?
* @y: use analyzer to check for lodash/moment heaviness in your blog app
* @y: check sussworld on lighthouse