---
type: articles
date: 2020-12-07T00:00:00.000Z
slug: a-simple-yet-detailled-introduction-to-next-js
tags:
  - next-js
  - react-js
  - spa
intro: >-
  Many of my articles regarding Next.js are intermediate to advanced. Even
  though there are many articles out there for starting with Next.js, I want to
  share my point of view and perhaps help you on your way to creating your first
  kick-ass Next.js application.
teaserCopy: >-
  Many of my articles regarding Next.js are intermediate to advanced. Even
  though there are many articles out there for starting with Next.js, I want to
  share my point of view and perhaps help you on your way to creating your first
  kick-ass Next.js application.
teaserImage: /img/articles/create-next-app-hero.jpg
title: 'A simple, yet detailed introduction to Next.js'
---
## Ultra quick setup

Many of the people I speak to regarding [React.js](https://reactjs.org/) use [Create React App](https://github.com/facebook/create-react-app) (CRA) to quickly bootstrap applications. It would be great if [Next.js](https://nextjs.org/) had something similar. Let's call it Create Next App (CNA). Well, it exists! [Vercel](https://vercel.com/), the company behind Next.js has created [CNA](https://nextjs.org/docs/api-reference/create-next-app). Let's have a look.

![yarn create next-app](/img/articles/create-next-app-command.png)

You will be guided to an interactive setup that will just ask you for a project name. After that, all the required node modules will be installed and a very basic Next.js app will be bootstrapped. You could opt-in for a TypeScript variant as well. The output should look something like this:

![Outputted Create Next App folders](/img/articles/create-next-app-folders.jpg)*Outputted Create Next App folders*

Note: you can ignore the `pages/api` folder for now. If you are interested in the feature you can have a read at my article ["Next.js API routes"](https://www.davebitter.com/articles/next-js-api-routes).

For those who are familiar with CRA, this will look very familiar. Besides all the build tools, CNA outputs a simple home page with an image and some styling. As you can see, by default CSS modules are used. If you want to add something like SCSS you can easily do so by installing SCSS. Next.js will just work. Next to all of this, CNA comes with the development tools that you'd expect it to like, for instance, hot-module reloading. In my experience, the way you alter your CRA project for things like linting and rules is very similar in CNA. Please refer to the documentation if you want more details. That's it, you are now ready to start developing!

![yarn dev](/img/articles/create-next-app-dev.png)

![Create Next App default page](/img/articles/create-next-app-boilerplate-page.jpg)*Create Next App default page*

## Building your first page

Naturally, Next.js documented all you need to know very well. Let's have a quick look however how we can build our first page.

### Standard route

The `pages` folder is a special folder by Next.js. Basically, every file in this folder translates to a route. For example, by default, you see an `index.js` file. This gets build into `/index.html`.  So what if we want to create an about page. Well, we make a file called `about.js` and return a React.js component. In this case a functional component:

![Created "about" page](/img/articles/create-next-app-about-page.png)*Created "about" page*

If you go to `/about` in your browser you will see that you now have an about page. This is all you need to do to create pages. Creating folders works as you expect it to. `pages/contact/socials.js` will translate to `/contact/socials.html`.

From here on out you can write all the same React.js code you are familiar with for every page. As you might have guessed, you can use [Next links](https://nextjs.org/docs/api-reference/next/link) to take care of your client-side routing.

### Dynamic routes

So what if we need to use dynamic routes. In the case of my blog, I have various articles under `/articles/... .html`. It wouldn't make sense to create a separate file for each new article. This is where dynamic routes come in. You can use the special bracket notation to indicate to Next.js that a part of the route is dynamic. In the case of the example of the articles, we can create a file under `pages/articles/[slug].js`. Whatever you put as a slug now in the URL will be mapped to this file. There is one small addition you need to make that we'll cover in the next chapter.

### Special page files

As you may have noticed, there is a file called `pages/_app.js`. Next.js has a couple of special files which are prefixed with a `_`. This specific file is exactly the same as the file you might have worked with in a CRA React.js app. It is a sort of "wrapper component" around your page. Here, you could for instance load a header, navigation and footer component that will be loaded for each page. Next to this file, there are a few more. `pages/_error.js` is a page that will be loaded if there is a critical error. You can create a bit of a nicer page than the default one if you want. Finally, there is a `pages/_document.js` page which is a "wrapper-page" around the `pages/_app.js` where you can load for instance some external scripts or set meta-information in the `head`. Please refer to the documentation for these pages to learn more.

## You can stop here

Great, that's the basics. We now have React.js pages build with Next.js that will be rendered server-side. Next.js takes care of the development environment and build process with things like automatic code-splitting, minifying and post-processing. You can stop here for now or take it up one notch and really get the benefits of Next.js.

## A short introduction to server-side functions

By far, having server-side functions is one of Next.js's biggest features. It may sound a bit daunting at first, but let's look at some practical examples of how to use it.
In essence, these functions run on the server, or during build time, before the page gets loaded in the client. These functions can, for instance, fetch some needed data on the server, return the data as a React.js prop to the page and be rendered on the server based on the value.

### getInitialProps

Let's keep using the blog as an example. When the user navigates to `/articles/the-meaning-of-life` we want to fetch the articles from a CMS and return it as a React.js prop to the page. This is done through by exporting a special Next.js function. This could look something like this:

![Code example getInitialProps](/img/articles/create-next-app-get-initial-props.png)*Code example getInitialProps*

As you can see, we retrieve the dynamic slug from the request object, fetch the article and return the article. We now receive it as a React.js prop for the page itself. You can now use the data to render the page (server-side).

There is however a small addition to this. Next.js needs to know what all the possible slugs are in order to build a page for every article. We can do this by exporting another special Next.js function like this:

![Code example getStaticPaths](/img/articles/create-next-app-get-static-paths.png)*Code example getStaticPaths*

Based on this array of slugs, Next.js will now build pages during the build process.

### getInitialProps

The previous example is used when you want to fetch some data on the serving during build time, but what if you want to fetch during run time? You can export an other special Next.js function like this:

![Code example getInitialPaths](/img/articles/create-next-app-get-initial-paths.png)*Code example getInitialPaths*

The vital difference in this function, compared to the previous one, is that this will only run on run time. This page will therefore no longer be statically generated but requires either a Node.js server or serverless function. The question is how you want to host your site. A statically generated site is easier to deploy as it is just some static files, a Node.js server or serverless environment will allow you to retrieve data on demand. The cool thing about Next.js is that you can use both these techniques on different pages. If you want to dive a bit more into this part of Next.js I suggest you to read my article ["Next.js page generation"](https://www.davebitter.com/articles/next-js-page-generation).

## Deploying your Next.js app

The deployment of your Next.js app depends on a variety of factors. Let's take a statically generated site for the purpose of keeping it simple. You can run the following command to create a fresh build of your app:

![yarn build](/img/articles/create-next-app-build.png)

You then have to add a new NPM script called `export` that runs the command `next export`. Once you run that you will have the following output:

![yarn export](/img/articles/create-next-app-export.png)

![Outputted Create Next App export](/img/articles/create-next-app-export.jpg)*Outputted Create Next App export*

You're now free to host these static files wherever you want. In the case of going for serverless, you might want to check out my article [Implementing the latest web technologies to boost the Mirabeau blog](https://www.davebitter.com/articles/mirabeau-blog-latest-web-technologies).

## C'est tout!

That's it, in my opinion, you should be able to do most of what you want with these basic principles. I often write about Next.js. Please refer to [my Next.js articles](https://www.davebitter.com/tags/next-js) as well as the [Next.js documentation](https://nextjs.org/docs) if you are interested in going a bit deeper in the matter.

Finally, you can have a look at [my personal Next.js boilerplate](https://github.com/DaveBitter/next-boilerplate) based on this which includes all the things you might want to add like unit tests with [Jest](https://jestjs.io/) and [Enzyme](https://github.com/enzymejs/enzyme), [Storybook](https://storybook.js.org/), linting and more.
