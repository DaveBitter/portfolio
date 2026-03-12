---
type: articles
date: 2021-06-15T00:00:00.000Z
slug: next-js-11
tags:
  - next-js
  - react-js
intro: >-
  The team over at Vercel just announced Next.js 11. These are the important new
  updates to Next.js you need to know about.
teaserCopy: >-
  The team over at Vercel just announced Next.js 11. These are the important new
  updates to Next.js you need to know about.
teaserImage: /img/articles/next-js-11-hero.webp
title: What's new in Next.js 11?
---
## Next.js ❤️ DX

Next.js is already an amazing experience for developers. It was by no means a sluggish experience. With Next.js 10, startup times were improved up to 24% and processing times were decreased by 40%.

But why stop there? Next.js 11 now includes another optimization to Babel to further reduce the startup time. A brand new implementation of the Babel loader for Webpack, optimizing loading and adding an in-memory config caching layer is added. In practice, this means no change for developers but will ultimately mean a faster development experience.

## Next.js Live (Preview Release)

A very exciting new feature for team collaboration is Next.js Live. By leveraging tools like ServiceWorker, WebAssembly, and ES Modules, Next.js manages to put the entire development process in the browser. In practice, this means that developers can share a URL with their team and live view, discuss and edit the application right in the browser. Even more impressive is that it needs no build step for this, making it blazingly fast!

At the moment this feature is in preview release. Learn more about Next.js Live and how you can pair it with Vercel's real-time collaboration engine [over at Vercel]([https://nextjs.org/live](https://nextjs.org/live)).

## Image placeholders

Before, you had to define the height and width of a local image that you load in this component. From now on, Next.js automatically detects these sizes so you don't have to.

You can now use blurred placeholder images while your actual image loads. You can do this by adding `placeholder="blur"` to your Image component. Next.js also supports blurring dynamic images by allowing you to provide a custom `blurDataURL`, which is provided by your backend. For example, you can generate a [blurha.sh](http://blurha.sh/) on the server.

## External script loading

Loading external scripts happens a lot. Whether you need to load Google Analytics, a helpdesk service or others. Developers can now prioritize script loading with the new `strategy` property on the Script component. You can set one of three strategies:

* `beforeInteractive`: For critical scripts that need to be fetched and executed **before** the page is interactive, such as bot detection and consent management. These scripts are injected into the initial HTML from the server and run before self-bundled JavaScript is executed.
* `afterInteractive` (**default**): For scripts that can fetch and execute **after** the page is interactive, such as tag managers and analytics. These scripts are injected on the client-side and will run after hydration.
* `lazyOnload` For scripts that can wait to load during idle time, such as chat support and social media widgets.

Finally, the default script loading is changed from preloading and `async` to `defer`. By adding this new `strategy` property, developers have better fine-grained control in loading behaviour.

## Conformance

Developers are often asked to become experts in UX quality topics like performance, security and accessibility. Google, by leveraging a system of strong defaults and safeguards, empower developers to focus more on features and products. With the release of Next.js 11, Google's Web Platforms team has begun open-sourcing their system with Conformance for Next.js.

Conformance is a system that provides carefully crafted solutions and rules to support optimal loading and Core Web Vitals, with further additions coming to support other quality aspects like security and accessibility. These solutions free your team from memorizing all the latest rules for optimal loading performance, while still giving you the flexibility to make the right choices for your applications.

Next.js 11 now supports ESLint out of the box to make it easier to catch framework-specific issues during development and set guidelines for your team to ensure best practices even as you scale. For new Next.js 11 applications this is used by default. For existing applications, that upgrade to this new version, you can run `next lint` to get started.

## Other bits and pieces


### Webpack 5 out of the box

Webpack 5 could already be turned on in Next.js 10, but starting with Next.js 11 it will be used by default. From experience, I can say that moving over to Webpack 5 with Next.js was a breeze, so don't let it scare you off to upgrade to the latest Next.js major version.

### Create React App (CRA) migration tool

Although migrating from CRA to Next.js was surprisingly easy, it can always be improved. To make it even easier to migrate your existing CRA apps, you can now use this tool with the following command: `npx @next/codemod cra-to-next`

The transform automatically adds a pages/ directory and moves CSS imports to the right location. It'll also enable a CRA compatibility mode in Next.js that ensures some patterns used in Create React App work with Next.js. This allows for incremental adoption which is great for large projects.

## Try it out!

You can head over to [Next.js]([https://nextjs.org/docs](https://nextjs.org/docs)) to get started with these and all the other features of Next.js. As Vercel puts it: *Let’s make the web. Faster.*
