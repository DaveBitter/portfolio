---
type: articles
date: 2020-03-31T00:00:00.000Z
slug: spa-seo
tags:
  - seo
  - spa
  - next-js
intro: >-
  One of the biggest drawbacks when building a Single-Page Application (SPA) is
  to provide solid Search Engine Optimisation, often shortened to SEO. How can
  we improve SEO with some modern tools and techniques I love the most and use
  in my daily work as a front-end developer? Read more about it in this blog.
teaserCopy: >-
  One of the biggest drawbacks when building a Single-Page Application (SPA) is
  to provide solid Search Engine Optimisation, often shortened to SEO. How can
  we improve SEO with some modern tools and techniques I love the most?
teaserImage: /img/articles/dave-seo.jpg
title: How can I handle SEO in my Single-page application?
---
## The issue with SEO in SPAs

The issue with SEO in SPAs has to do with where the page gets built or rendered. The rise of client-side SPA frameworks like [React.js](https://reactjs.org/), [Vue.js](https://vuejs.org/) and others caused an issue I didn't encounter before with server-side frameworks.
In short, there are two ways of rendering a page. Traditionally, the page gets rendered on the server. As a result, bots like [GoogleBot](https://yoast.com/what-is-googlebot/) will visit your page, read the content and [meta tags](https://www.webpresencesolutions.net/metadata-meta-tags-web-page-titles-page-descriptions-explained/) of the page and use that information for Googles search engine. SPA frameworks work a little different. Normally, a blank page is loaded. The framework will build the entire page client-side as soon as the JavaScript bundle is loaded. Besides potential performance issues, this raised a new problem. Bots will visit a page, find a blank page and return that information.

## So is Google just ignoring this?

Nope, they are trying their best to deal with this issue. As you can read [here](https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html), Google can execute JavaScript to build the page and then get the content and metadata. So, problem fixed? Well, not entirely. They mention that _sometimes things don't go perfectly during rendering, which may negatively impact search results for your site_. Google is providing tools for you to debug and see what causes issues.
> Building applications for the web is hard enough.

## Do I want to deal with this?

Well, no. Building applications for the web is hard enough. At the start, I mentioned that I wanted to solve this issue with modern tools and techniques I love to use. Let's pick React.js as the SPA framework. I love to use React.js in combination with [Next.js](https://nextjs.org/) to solve many of the issues with SPA frameworks. You can read up on that in my article on [Implementing the latest web technologies to boost the Mirabeau blog](/articles/mirabeau-blog-latest-web-technologies).
![React.js and Next.js](//images.ctfassets.net/w4dg3cjf42ew/5JdNrYGW2SBKmIoT38kqz0/80b019ca3d6e00871b3603f842814b0c/CDFEF415-123A-4D0E-85AD-BB3B32A0B3A1-min.png)*React.js and Next.js working together*

I will leverage the solution that Next.js offers regarding server-side rendering. This solves the issue in the old fashioned way. The page will be rendered on the server, GoogleBot will get the content and metadata and I will have solved my problem.

## Taking it a bit further

I can call it a day now, but let's look at how I took it a bit further when building the  the [Mirabeau blog](blog.mirabeau.nl). The content, [semantically written](https://html.com/semantic-markup/), is received by the GoogleBot. The metadata implementation needs to be done by me. In theory, it is simple. I have a set of [basic meta tags](https://support.google.com/webmasters/answer/79812?hl=en) that I update for every page. An article page may use the title and description of the article while the home page uses the name of the blog and the tagline.
In the case of Next.js, I load a component called `SiteMeta` the head element of the page using the Next.js `head` component like so:
![Simplified code snippet of loading SiteMeta component](//images.ctfassets.net/w4dg3cjf42ew/1ux4A6clBzDNpDdqYdoc7I/a8cd4433d13cb83b6e822f057bd2a968/meta-tags.png)*Simplified code snippet of loading SiteMeta component*
For an article, for instance, I set the title tag to the title of the article. I then load the `SiteMeta` component that sets a couple more tags. This is already starting to look more like it. The meta tags are being added dynamically based on the article and locale. Here you can see a simplified version:
![Simplified code snippet of SiteMeta component](//images.ctfassets.net/w4dg3cjf42ew/4RkWDgVEekZ7QlDK2CxE6A/7a00962575163a0ebadabbbdcf3418f1/site-meta.png)*Simplified code snippet of SiteMeta component*

## Taking it even further by taking social media into account

Social media is vital for the reach of your blog. Naturally, we need to spend some time here to have the best chance of getting people to click the link to the article.

### OpenGraph

I can specify the page even further by using standards with [Open Graph](https://ogp.me/). It’s a protocol that is widely supported by all major social media websites and crawlers. I use Open Graph to create semantical tags for SEO and sharing. For example, I can provide a title, image and summary for an article page specifically aimed towards social media sites. I now load a second component called `SiteOpenGraphTags` in the head element.
![Simplified code snippet of loading OpenGraphTags component](//images.ctfassets.net/w4dg3cjf42ew/7b71NBLQBlK5VK9x0nPcEn/36b05ab8de8b8ed3b10078f091bd2e87/open-graph-tags.png)*Simplified code snippet of loading OpenGraphTags component*
Here we can set additional tags according to the Open Graph specification. Below you find a simplified version that for instance sets tags specific for [Twitter cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started).
![Simplified code snippet of OpenGraphTags component](//images.ctfassets.net/w4dg3cjf42ew/6RHSmvijxYUhoyYCaBMysX/9bf84bed3b1183bb029536532b786bf2/site-open-graph.png)*Simplified code snippet of OpenGraphTags component*

## The result

When I share an article to social media I can now see that it shows a custom title, description and image that I can set in the CMS used. A social media card might look something like:
![Mirabeau blog social card example](//images.ctfassets.net/w4dg3cjf42ew/6tAjqUcClkipkwktwCRzhY/3252230919b7c43d4070cf55adccea10/mira-blog-seo.jpg)*Mirabeau blog social card example*

## Case: Lely Used

Sure, a blog is relatively simple. Often, we need to put in a bit more work. [Lely used](https://used.lely.com/en/why-used) is a platform I build similarly. The platform consists of 'content pages', a product search page and product detail pages. The goal is to sell products. As a result, detail pages are often shared on social media platforms. The implementation for many of the pages is the same, but as an article page on a blog, there is a product page on an e-commerce platform. I looked into setting dynamic tags specific to a product. Below you can see the response of a product detail page.
![Lely Used social card example](//images.ctfassets.net/w4dg3cjf42ew/2SsaB4tQB3QXMmenbqmonb/9249a5987f901dbe43df60740484307d/lely-used-seo.jpg)*Lely Used social card example*
I've added quite a bit of information in this card. You can see the:

- platform
- model
- location
- build-year
- localised currency and amount (price)
- specifications
- image of product
- content localised based on locale in link
These tags are being used both for sharing the product and by bots like GoogleBot.

## Looking back

SPA frameworks have an impact on SEO. Although Google is working hard an this, there are still several issues. I can solve all issues by using server-side rendering with a framework like Next.js. I can use React.js to dynamically load regular meta tags and Open Graph tags in the head element of the page. I can then fully customise the tags based on the what kind of page it is. This is my current way of handling SEO with SPA frameworks. What is yours?
