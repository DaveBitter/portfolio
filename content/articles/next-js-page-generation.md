---
type: articles
date: 2020-09-02T00:00:00.000Z
slug: next-js-page-generation
tags:
  - next-js
  - react-js
  - spa
intro: >-
  I often write about Next.js as it is my go-to framework when developing
  interactive React.js web applications. One of the core features of Next.js is
  the ability to generate pages on the server. Let's have a look at what is
  possible, how this works and how can leverage this when building web
  applications.
teaserCopy: >-
  I often write about Next.js as it is my go-to framework when developing
  interactive React.js web applications. One of the core features of Next.js is
  the ability to generate pages on the server. Let's have a look at what is
  possible, how this works and how can leverage this when building web
  applications.
teaserImage: /img/articles/next-page-generation.jpg
title: Next.js page generation
---
As a heads-up, I won't be going over how to build things like pages in [Next.js](https://nextjs.org/), but rather focus on the generation techniques. If you're unfamiliar with Next.js, please refer to their documentation.

## SSR/SSG versus CSR

We need to have a look at server-side rendering (SSR) and static site generation (SSG) versus client-side rendering In order to understand what Next.js offers. If you are up to speed with this, you can skip over this section and go straight over to "Generating pages with Next.js".

### SSR

SSR is a technique where a request comes in, the server builds the HTML and responds with the final page. The great thing about SSR is that it's fast. The usually means great performance as more the server is most likely more powerful than your browser. An added upside is servers can cache these pages to serve to multiple users at the same time.
The downside is that the user has to make this roundtrip for every page which can end up with slower user experience. More on this later.

### SSG

Similar to SSR, SSG serves a build HTML page. The difference, however, is when this page is built. With SSR the page gets to build upon a request by a user. An SSG page is pre-build and deployed to a server. The server will always respond with the same page for every user. This makes it easy to cache and very performant.

### Dynamic routes

The downside comes when you have dynamic routes. For example, a blog might have hundreds of articles. The URL can be `/blog/article-1.html`, `/blog/article-2.html`, ` /blog/article-3.html` etcetera. Here you have two options; either go with SSR or build every page out during build time.

### CSR

Lastly, we can leverage the use of CSR. This type of rendering is what you see with default [React.js](https://reactjs.org/) applications. In essence, you serve an (empty) HTML page, the JavaScript bundle builds the page in the browser and updates the page when navigating without going to the server. These pages can be dynamic, as the SSG example as well.
The downside of doing this is having to wait on the JavaScript bundle, that can be rather large, to load, then to parse and finally to build the HTML for the page. The initial loading time is quite long, uses much data on the user's network and demands processing power from the user's potentially low-end device.

## Generating pages with Next.js

So which of these does Next.js leverage? Well, all of them. Next.js optimizes how pages are loaded with just a little help from the front-end developer. They allow you to mix and match based on your requirements. This makes page generation incredibly powerful, easy and quick. Let's have look at the tools at your disposal.

### SSR

Firstly, let's have a look at SSR ([docs]([https://nextjs.org/docs/api-reference/data-fetching/getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps))). Next.js lets you export a special function from your page file called `getInitialProps`. In essence, this function:

* runs on the server and lets the developer get for instance data
* passes the returned object as a prop for the page
* renders the initial render on the server
* serves that HTML
* finally hydrates the front-end as soon as the React.js/Next.ts is loaded in the front-end.

```jsx
// Example of getInitialProps
...
ArticlePage.getInitialProps = (async { req, res }) => {
    const article = await fetchArticle(req.query.slug);

    return {
        article
    };
};
...
```

After that, every page navigation by the user will update the page through CSR. This combination is highly performant and offers the best of SSR and CSR.

### Serverless architecture

Shortly, I'd like to mention how you can host this server. Next.js allows you to either host a [Node.js](https://[nodejs.org](http://nodejs.org/) server where Next.js runs or make use of serverless functions for all the pages. The latter being more performant. You can read more about this in my blog [Implementing the latest web technologies to boost our blog](/articles/mirabeau-blog-latest-web-technologies).

### SSG

Even though using the Next.js SSR technique works great, there is another step we can take. Some pages might not change. The HTML will always be the same. This sounds like a better job for SSG. Luckily, Next.js detects whether you export a `getInitialProps`. If not, it will use SSG ([docs](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)) to generate your page during build time. This works out of the box.
You can still run a function before generating the page, but this only happens the one time during the build. Here, you fetch for instance some data and pass it as a prop for the page. To do this, you can export a function called `getStaticProps`.

```jsx
// Example of getStaticProps
...
export const getStaticProps: GetStaticProps = async context => {
    const article = await fetchArticle(req.query.slug);

    return {
        props: {
            article
        }
    };
}
...
```


### Dynamic routes

Sometimes though, pages might not change, but the URL is dynamic as with the blog example previously mentioned. So how do we generate all these pages during the build? Next.js thought about this. You can export a final function called `getStaticPaths` ([docs]([https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)))this function allows you to return an object with paths. This is where you tell Next.js all the dynamic routes that it needs to build. For the blog example, here you would pass a list of all the articles that exist. Next.js then takes that list and generates an HTML page for every item.

```jsx
// Example of getStaticPaths
...
export const getStaticPaths = async () => {
    const articleSlugs = await fetchArticleSlugs();

    return {
        paths: articleSlugs
    };
}
...
```


## Joining forces

The combination of these different ways of generating pages is where Next.js shines. As shown, you can use these techniques for the use case you have. By being able to mix and match you always have the opportunity to choose the best way. Welcome to the future of Single Page Application development!
