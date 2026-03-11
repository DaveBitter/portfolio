---
type: articles
date: 2020-08-14T00:00:00.000Z
slug: next-js-api-routes
tags:
  - api
  - next-js
  - react-js
intro: >-
  Next.js is my framework of choice for any React.js application I develop. One
  of the big features I haven't covered before is Next.js API routes. Although
  not as big of a feature as page generation, it is one of the features I'm
  starting to enjoy more and more. Let's have a look at this feature and how to
  use it.
teaserCopy: >-
  Next.js is my framework of choice for any React.js application I develop. One
  of the big features I haven't covered before is Next.js API routes. Although
  not as big of a feature as page generation, it is one of the features I'm
  starting to enjoy more and more. Let's have a look at this feature and how to
  use it.
teaserImage: /img/articles/next-js-api-routes.jpg
title: Next.js API routes
---
## What do they do?

You might have guessed it. [Next.js](https://nextjs.org/) API routes provide an easy to use way of building an API within your Next.js project. Most modern web applications need data whether it is articles, like this blog, or data about the weather. We want to separate data from our applications as much as possible. Let's say you build a blog. You don't want to bundle all the articles with your JavaScript bundle. You want to load your bundle, which loads your UI and utilities, which renders your full article. This makes sense, but how can you do this?

### Simply RESTful

[GraphQL](https://graphql.org/) gets a lot of traction and notice, which is right, but setting it up for a simple blog could be a bit too much. Next.js provides a simple [RESTful](https://restfulapi.net/) API for your front-end to consume. No fancy techniques here, but an easy-to-use API.

### Going serverless

Just like the way Next.js can render pages with the [serverless]([https://aws.amazon.com/serverless/](https://aws.amazon.com/serverless/)) approach, it can render API routes using serverless functions. This is great as you can easily scale your functions and implement caching. An added benefit is that if you already set this up for your pages, your API routes get it for free.

## How do they do that?

Great, I'm interested! What do I have to do? Luckily, the feature is pretty straightforward. You provide functions, Next.js executes them. The API routes are configured the same as done for Next.js pages. For those unfamiliar, let's have a look at how this works.

### The Next.js filesystem-based routing

The system works as follows. You create a folder called pages in the root of your Next.js project. You then add a file called `index.tsx` or `index.js` if you don't use TypeScript. This exports a function that renders some JSX. Next.js, during the build, turns `pages/index.tsx` into `/index.html` following this pattern you can make a file in `pages/about/contact.tsx`. This will be turned into `/about/contact.html`.
That's not to bad. We can dive one level deeper to make use of dynamic routes. In case of a blog, you don't want to create a file for every blog post. You want to make a route dynamic. Next.js offers a simple solution. Let's say you want to have all articles under `/articles/--SOMETHING--`. You can do this by letting Next.js know that the file should match anything after where we now put `--SOMETHING--`. We do this by creating the following file: `pages/articles/[slug].tsx`. This works for folder names as well. Now, when we go to `/articles/next-js-api-routes` it will load that file and pass what the slug was. In this example is use the key slug, but you can use anything you want.

### Using this pattern for the API

We start with creating a folder called api in pages. We can then follow the same pattern as for regular pages. For example, `pages/api/articles/[slug].tsx` will turn into `/api/articles/next-js-api-routes` with one distinction. It will not render a page, but return a response as it knows that anything under `/api/` is not a page but an API route. More then likely, this response will be JSON.

### The req/res pattern

Great, so we created a file in `pages/api/articles/[slug].tsx` but how do we handle the request and send a response? The function receives two parameters, res and req that you can use to handle the response. The req object contains all the information about the request. You could, for instance, get the value for the slug here. The res object will be used to return a proper response. This response should contain the following:

* a statuscode (e.g. `res.statusCode = 200`)
* a header for the type of content you are sending back (e.g. `res.setHeader('Content-Type', 'application/json'`)
* the actual data (e.g. `res.end(JSON.stringify(article))`)

What you send back depends on where your data is stored of course. In case of an error, you might want to send back some error messages. To do all of this, I created two small helper functions:

```
const errors = {
    default: 'A server error occurred',
    notFound: 'Document not found',
    notImplemented: 'Request handling not implemented'
}

export const errorHandler = (res: any, response: { status: number, error: string, message?: string } = { status: 500, error: 'default' }) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ...response, message: response.message || (errors[response.error] || errors.default) }));
}

export const successHandler = (res: any, response: any = {}) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}
```


## When/why should I use them?

This is great if you require an API but don't want to host a separate API server somewhere. It bundles your entire application in one neat package. There are however more advantages you get right out of the box which made me switch to this in the first place.

### CORS

Out of the box, the API will only be callable from your domain where you are running the Next.js application. This ensures that nobody from the outside world can access your API from their application or script. Heads up, you can't just call `/api/*` from your application. You always need to have the domain in there as well. A quick solution to this is to call ``${window.location.origin}/api/*``.

### Private API keys

The main reason I looked into Next.js API routes was to hide my API keys. For a project, I was using Firebase for storage. I didn't want to expose my keys to the public. With private keys with Next.js, I was able to hide those and just let them be present on the API server.

### Middleware

Finally, Next.js makes it easy to apply your middleware. You might want to consider this when working with authentication and roles. For example, you can shield of certain request for just administrators.

## That's it

So, looking back, we can now easily create our own secure and scalable API without the hassle of setting up another service. Everything lives nicely together in one package. If you ever wanted to look into building your API or proxy I highly recommend checking this feature out. If you are interested to read more about Next.js, I suggest to read [Implementing the latest web technologies to boost the Mirabeau blog](https://www.davebitter.com/articles/mirabeau-blog-latest-web-technologies).
