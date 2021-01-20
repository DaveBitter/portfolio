---
items:
  - body: >-
      ## Why did I need this?

      I'm a fairly social (read easily distracted) guy. In an office setting, this causes some self-inflicted issues for me. On the one hand, it's great to interact with all my colleagues, on the other hand, I lack the prolonged focus to be productive. It's easy to blame others for this, but why does it get even worse while working at home?


      What I noticed is that verbal communication shifted to digital. Having a digital wall between you and the person trying to reach you is a big culprit in the daily interruptions in your work. In an office, people can see you working focussed with your fancy noise-cancelling headphones on and determine whether they should bother you with what they're about to say or ask. With everybody working at home this short moment of hesitation is gone.


      The basic advice people give is to turn off notifications and batch reply to all of your messages. For me, this is easier said than done. Let's say I respond and start a task, I usually get a message back after a few minutes. There is this urge for me to respond as quickly as the person I'm talking to. Should I now keep chatting with everybody for a while or interrupt my flow continuously? It all feels very unstructured.


      I researched some ways to keep focussed while still be able to alternate between different task like coding, communicating and coffees. You know, the big three C's! In my search, I stumbled upon the well known Pomodoro technique for time-management developed in the late 1980s by university student Francesco Cirillo. I've heard about it before but never really tried it out as I often feel fatigued by all these techniques everybody swears by until it's time to make the next blog or video.


      The Pomodoro technique helped me with improving my productivity without turning it into a large task itself. It felt very natural to work with and I will continue working this way in the future.

      ## How does it help?

      Great, so how does it help and work? In short, you divide your day into 25-minute sessions to work on smaller tasks. You set a Pomodoro (named after the tomato-shaped timer) for 25 minutes. You don't stop working on your task while that timer is running for anything. Well, if your house is on fire you might want to break the rules a bit. After the timer runs out you have a short break of five minutes. During this break, you might stretch your legs, make a coffee or stare out the window contemplating life. The important point here is that you detach from your working state. After the five-minute break timer runs out, you start another Pomodoro for 25 minutes. After four 25-minute Pomodoro's you take a longer break of 15 minutes. You repeat this pattern for your entire day using these fixed sections to focus on a single task.


      There are numerous benefits by doing this as described [here](https://todoist.com/productivity-methods/pomodoro-technique). What worked well in particular for me is having fixed time slots without putting them on a calendar. I've tried planning my calendar by the minute for an entire day before. This gave me a state of anxiety of having this calendar standing over my shoulder and continuously feeling like a was "catching up". With the Pomodoro technique, I have the structure of time slots without worrying if I'm a few minutes behind on some things.


      Next, it helped me to break down seemingly gigantic tasks into smaller chunks of work. This doesn't just give me more structure but comes with a second benefit. I'm more easily able to mix these tasks throughout my day. I can focus on singular tasks while still work on different larger tasks during the workday at the same time. This, to me, is the most vital improvement to my productivity and state of mind.

      ## What did I make?

      Luckily, to use this technique all you need is the timer on your phone or computer. But where's the fun in that? I'm a front-end developer. I can make something cool! As part of my learning goals this year I want to build a few small projects with the focus on design. I often get caught up in the engineering side of front-end development and want to work on some more creative projects as well. For this, I picked a few front-end challenges from [frontendmentor.io](http://frontendmentor.io/challenges). One of the challenges happens to be a Pomodoro timer. That sounds like a perfect match!


      The logic for a timer is fairly straight-forward. You either set an interval or recursive function that calls itself after a timeout. The timer then makes a short alarm sound. The reason I picked the challenge of the Pomodoro timer is the neumorphic design. If you're not familiar with the term, it's a design style successor to skeuomorphic design. The goal of skeumorphism is an affordance for the user by using known real-life things. A folder on your computer looks and is named like that as it directly reflects a real-life folder used by people. Therefore, people know what it is and what it does before needing to learn about it.


      Neumorphism is not as focused on affordance as it is to give depth to interfaces. After the flat-design hype that you've seen in nearly every digital interface the past few years, this design style seems to focus more making it clear to users where elements are to each other on a "stack level". I'm not sure about the affordance benefits, but I do think it looks refreshing and very cool!

      ### Design

      ![Pomodoro](/img/articles/pomodoro-hero.jpg)*Neumorphic Pomodoro*

      As you can see, the tabs at the tab are flat-design. The timer itself however seems to protrude from the background. It's clear that this is the most important element on the screen and I can interact with it. The way this effect is done is through shadows on the screen the contrast between dark and light shadows make it look like the timer itself is "higher" of the background. I used neumorphism to create the base effect in box shadows for CSS. I then tweaked the size and colour values to the point I was happy with the result. A fairly simple, but refreshing design to see on the web which at this point is flatter than the Netherlands.

      ### Interactivity

      ![Pomodoro settings](/img/articles/pomodoro-settings.jpg)*Settings*

      The second part of the challenge is to let the user set different values for the timers, choose a font and set a different primary colour. Through this modal, the user can tweak how the website works and looks. For the font and primary colour, I used CSS-variables. Whenever the user makes a change, I update the corresponding variable and the browser updates the screen accordingly.

      ### Progressive Web App?

      ![Pomodoro Progressive Web App on MacOS](/img/articles/pomodoro-pwa.jpg)*Pomodoro Progressive Web App on MacOS*

      My Pomodoro app just needs some static files to work. I added a service worker to cache all the static files and serve them if my server is down or internet connectivity is lost. This ensures that the app will always work. Next to that, I added a manifest with some more information about the app. This turned my app into a Progressive Web App (PWA). Besides the before-mentioned offline capabilities, the app can now be installed on desktop, tablet and mobile devices as well. This makes it easier to quickly open the Pomodoro from the device you're working on.

      ### Demo

      If you made it this far, you probably want to try it out. You can do so by visiting [pomodoro.davebitter.com](https://pomodoro.davebitter.com/). You can view the individual components through Storybook at [pomodoro.davebitter.com/components](https://pomodoro.davebitter.com/components). Finally, developers can head over to [github.com/DaveBitter/pomodoro](https://github.com/DaveBitter/pomodoro) to look at the source code.

      ## Wrapping up

      This technique, or rather part of this technique, works for me. It might not for you and that's fine. I suggest to try it out for a day and see what you think. I noticed a welcome change in how I structure my days and do my work. As always, thanks for reading and I see you in the next one!
    date: 2021-01-19T00:00:00.000Z
    slug: neumorphic-pomodoro
    tags:
      - pwa
      - next-js
      - react-js
    intro: >-
      There is this view many developers share of having a productive coding session by crawling behind your laptop, put on your fancy noise-cancelling headphones and grinding out a few hours of work. I often fall for this novelty of hyper-productive work state in development. Since working full-time from home I noticed a serious decline in my productivity and focus. How is this possible and how can I resolve this?
    teaserCopy: >-
      There is this view many developers share of having a productive coding session by crawling behind your laptop, put on your fancy noise-cancelling headphones and grinding out a few hours of work. I often fall for this novelty of hyper-productive work state in development. Since working full-time from home I noticed a serious decline in my productivity and focus. How is this possible and how can I resolve this?
    teaserImage: /img/articles/pomodoro-hero.jpg
    title: I build a neumorphic Pomodoro to stay sane
  - body: >-
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
    date: 2020-12-07T00:00:00.000Z
    slug: a-simple-yet-detailled-introduction-to-next-js
    tags:
      - next-js
      - react-js
      - spa
    intro: >-
      Many of my articles regarding Next.js are intermediate to advanced. Even though there are many articles out there for starting with Next.js, I want to share my point of view and perhaps help you on your way to creating your first kick-ass Next.js application.
    teaserCopy: >-
      Many of my articles regarding Next.js are intermediate to advanced. Even though there are many articles out there for starting with Next.js, I want to share my point of view and perhaps help you on your way to creating your first kick-ass Next.js application.
    teaserImage: /img/articles/create-next-app-hero.jpg
    title: A simple, yet detailled introduction to Next.js
  - body: >-
      ## What can a PWA offer?

      Before covering design, it does make sense to go over the technical possibilities. Let's focus on the most important features, in my opinion, of a PWA or web features that a PWA can leverage. I'll try to keep it as short as possible while still giving you an idea of what a PWA might look like.

      ### Add to home-screen (A2H)

      A2H is a basic, but incredibly useful. We can trigger a button to add the PWA to the user's home screen right from the website. This is possible after meeting the requirements for installability:

      * The website needs to be served over `https`

      * The website needs to register a Service Worker

      * The web app manifest needs to meet installability requirements

          * Icons for various sizes

          * A `short_name` or `name` property (e.g 'Dave Bitter')

          * A `start_url` property to start the PWA from (e.g. '/')

          * A `display` property (e.g. 'fullscreen', 'standalone' or 'minimal-ui')


      ![PWA install trigger](/img/articles/pwa-install-trigger.jpg)*PWA install trigger*


      After meeting these requirements, developers can trigger the button. A good thing to note is that even though we'd like to trigger this on phones and tablets, this will also work on a desktop.

      ### Offline capabilities through a Service Worker

      As mentioned, the PWA needs to register a [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers) (SW). Although registering a SW that does nothing will work, it would be a shame not to use this tool. A SW is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. We can use this, for instance, to cache pages when they are loaded for a user. When internet connectivity is lost, we can serve the offline cached version with a small message notifying the user what is going on. This way, like native, we can always offer a working solution.

      ## Web API's to offer native-like capabilities

      Now we have the base of our PWA we can take it to the next level. The web offers many features through Web API's that we can leverage to further increase UX, improve reach and retain users. Let's go over a Web API that might be useful for your PWA.


      Notifications are a vital tool to ensure retention. The web supports this through the [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/notification). Great, we can start sending notifications like native apps. Well yes, but it's not that straightforward. Two things will hold you back.


      Firstly, we need to request permission to send notifications. You might have seen those annoying popups on news websites. Users often deny this as they're just trying to read an article. This is why it's important to trigger this request for permission on the right moment. The bigger reason this might hold you back is not being able to ask permission again next time the user visits.


      Secondly, there is one major player that doesn't offer support for this. As you can see below, at the time of writing, iOS Safari does not offer support for the Notification API. This is often a dealbreaker as this is often a large part of the user base.


      ![Notification API support](/img/articles/notification-api-support.jpg)*Notification API support*


      So, does this mean that you have to switch completely to native? Well, not necessarily. The way I see it, you have two routes you can take. You either go for progressive enhancement. For devices that support the Notification API, we use it. For devices that don't, we omit this feature or implement it in another way (e.g. email notification). The other route is wrapping your PWA in a native shell. This way, you can make use of the native notification possibilities while loading your PWA in the native wrapper itself. Next to that, these native wrappers cater for the often expressed need to have a presence in the Apple Appstore and Google Playstore. To get a clearer picture of this, please read my article ["Wrapping your Progressive Web App for Android with Trusted Web Activity"](/articles/wrapping-your-progressive-web-app-for-android-with-trusted-web-activities).

      ## Why do we need to address the design part?

      Great, the technical part is out of the way. So why do we need to talk about design? I mean, we have a mobile version of the website right? Correct! And that's great to ensure that users get the best user experience on their mobile device. There is however one vital difference between a mobile website and a native app-like experience through a PWA. Over the course of time interface and interaction, patterns have been crafted for native apps. When trying to mimic a native app with a PWA we need to take this into account. If we don't, the PWA will feel like a website with a PWA slapped around it.

      ## How can we improve the design part?

      ### Interface patterns

      Let's look at a quick example. An interface pattern for a website is having a header, body with sections and finally a footer. This is great to use for the web, but you never see this in a native app. In a native app, you will see something called an 'app shell' that has a main part or view to load content in. This content is, for instance, something like a list. You can see this in social media applications. You often have a top navigation bar and a bottom tab navigation. These parts always remain on the screen. In the content section, you might see a list of posts by other users.


      ![App shell](/img/articles/app-shell.jpg)*App shell*


      This, amongst other patterns, gives the native app feeling. It's important to remember this when designing for a PWA. You can still design and build a mobile website next to the PWA. Developers can detect whether the website is loaded in a PWA and load the UI accordingly.

      ### Interaction patterns

      On an interaction level, we should have a look at interaction patterns. As a simple example, let's take a look at the bottom tab navigation. Every tab is like a separate browser tab. Open your Instagram app. Now scroll the feed, go over to notifications and click on one of them. If you go back to feed using the bottom tab navigation, you will see that it's still where you left it off. Now go back to the notification using the bottom navigation tab again. That's right, exactly where you left off. This is one of the numerous examples of how native apps work. We can replicate this behaviour on the web, but it does require designers and developers working together to account for this.

      Another example is the way the top navigation bar is used to show the user where they are and how to get back. By loading a fullscreen PWA you lose the browser bar. It can therefore be hard to see where you are and how you can go back to the previous page.


      ![Instagram bottom tab navigation](/img/articles/instagram-feed.png)*Instagram bottom tab navigation*


      ### Ubiquitous features

      Besides interaction patterns, we can have a look at ubiquitous features in native apps. Previously, we mentioned offline support. We can have a version of our PWA with limited features when offline. On native apps, however, I expect more as a user. Let's say I add a task to my todo list in a PWA. On a native app, I expect it to add it without internet connectivity and store it in the actual database once connectivity is restored. We can and should implement this in a PWA through a SW. It might be good to let the user know that it will store it after connectivity is restored. It will however already be added in the todo list.

      ## When should you go for a PWA?

      Great, so we can do a vast amount with PWA to replicate native apps. Should we now always go for PWA or still for native apps? Personally, I don't believe in this polarization. As we saw, the line between these two ways of building an application is getting more blurry by the minute.


      > "If a PWA offers you the capabilities you need, go for that. If not and native apps do, go for that"


      Sure, this oversimplifies the decision-making process. Every technique has its pros and cons. In the end, it’s our job to make the decision that not just benefits the client, but will help the user of the application with their problem the best. If you can go for PWA, great! If you can’t, that’s also fine. It’s just another tool that we leverage to create the best possible user experience.

      ### My decision-making process

      Generally, I first create a list of features that we will need. In case the web can offer all of those I tend to go for a PWA. We can ensure that all users, as it is the nature of the web, have access with whatever their device is. We then progressively enhance the user experience. If we need features like notifications we can either chose to offer it for supported devices of wrap the PWA in a native wrapper to ensure that all users have it. One of the strong points to go for this is having one application that runs on the web (with all its devices) and native.


      The moment I tend to go for native is on two occasions. Firstly, I tend to draw a line when I feel like I'm forcing the web for an app. This usually happens when the list of native features that should work for all devices is rather large and it starts to feel cumbersome to do all of that in a native wrapper around a PWA. Secondly, I advise you to go for native when performance is an issue. Despite all the work that is being done on the web, native apps still get one over on the web in terms of performance. This is fine, and it might be a wise decision to move over to native to ensure the best user experience.

      ## Closing thoughts

      The rise of the PWA (an awesome movie name by the way) poses new design questions. If we go for a native-like web experience, we need to change our entire approach. Slapping a PWA around a website doesn't cut it. On a variety of development and design levels, we need to have a good look at how to build the best possible solution. This can mean you'd want to go for native and that's absolutely fine.


      We have a great range of (new) tools to our disposal as developers and designers. This is exciting for the future for both. We need to work together to make tough decisions, follow proven patterns and create innovative new features. Thanks for reading!
    date: 2020-10-08T00:00:00.000Z
    slug: how-can-we-develop-and-design-for-a-pwa-to-deliver-the-best-native-user-experience
    tags:
      - pwa
      - twa
      - native
    intro: >-
      Progressive Web App (PWA) is often written about. These articles, including mine, mostly only cover the technical parts. Although vital, one aspect of building a successful PWA is design. How can we develop and design for PWA to deliver the best native user experience (UX)?
    teaserCopy: >-
      Progressive Web App (PWA) is often written about. These articles, including mine, mostly only cover the technical parts. Although vital, one aspect of building a successful PWA is design. How can we develop and design for PWA to deliver the best native user experience (UX)?
    teaserImage: /img/articles/design-and-develop-for-pwa.jpg
    title: How can we develop and design for a PWA to deliver the best native user experience?
  - body: >-
      [Trusted Web Activity (TWA)](https://developers.google.com/web/android/trusted-web-activity) is a technique to wrap your PWA in a native shell for Android. Make sure to notice the difference between PWA and TWA as this article wouldn't make much sense otherwise. If you are unfamiliar on want to learn more about PWA please refer to my article ["You might not need a native app"](/articles/you-might-not-need-a-native-app).


      Being able to build one experience cross-platform by using web techniques is one of the unique selling points of PWA. By progressively enhancing your web application with PWA features you can offer a good user experience for a variety of different users. Although you can add a PWA to your home screen, like a native app, people would still have to visit your web application in their browser. People are used to searching in their native store first. This store presence is what we want to cater for.

      ## Why TWA?

      Before TWA and still, on iOS you would traditionally load your web application in something called a [Web View](https://developer.android.com/reference/android/webkit/WebView) or a [Chrome Custom Tab (CCT)](https://developers.google.com/web/android/custom-tabs). The application is bundled with a browser that will load your page. This seems to have worked fine so why this new technique by Google?


      ![Webview, CCT and TWA comparison](/img/articles/webview-cct-twa-comparison.jpg)*Webview, CCT and TWA comparison*


      In short, TWA is Google's push to ensure a seamless user experience when loading web content in an Android app. One of those features is the ability to hide the address bar similar to an install PWA on a phone. Next to that, TWA is significantly faster, can share cookies with the web application, autocomplete data with the browser and send callbacks to the application. Finally, it will make use of the user's native chrome browser. This ensures that your web application will most likely always be loaded on the most recent version of Chrome. Developers can appreciate this when using fairly new browser APIs loaded through progressive enhancement.

      > "If you are loading web content, use TWA" - Google

      ## Sounds good. How?

      ### Bubblewrap

      As a front-end developer, I wasn't ready to start programming in Java or Kotlin. I just spend all this time crafting a highly performant PWA. Luckily, you don't have to. Google partnered with Samsung to make a great developer experience. By building the [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap) it allows developers to create a TWA out of their PWA without having to look at any native code. "Have" is key here. I don't want to be locked into a framework. Luckily, Bubblewrap just creates the native code for you and delivers a regular Android project. If you want to further develop on native features you can always do so. This sold me.

      I won't go fully into the technical details, but the CLI works as follows. It reads information from the `manifest.json` of you PWA. It then uses that, in addition to a few extra questions, to initialize the Android project. It then offers you a command to create a build. You could, however, use Android Studio from here on out to build the Android app.

      ### Digital Asset Links

      Finally, we need to verify that we own the web application. If you didn't need to, you could load somebody else's web application as your own and put it on the Playstore. Without doing this step, you see the chrome browser bar at the top of your TWA. Luckily, when using the Bubblewrap CLI to create a build, it generates a file for you called `assetlinks.json`. All you need to do is place this in the public folder of your website under `/.well-known/assetlinks.json`. The TWA can then verify that you own the web application.


      Oh yeah, if you don't want to spend two days figuring why this step didn't work let me do you a solid. It mentions nowhere in the docs that during the initialization of the TWA you need to put `https://www.` in front of the domain, you input. Without doing this, even with `https://` , it will not work.

      That's it, you now have an Android application of your PWA by using TWA!

      ## Looking back

      Google and Samsung seem to really be pushing for this new technique. Luckily, it's safe to use as the TWA will fallback if you don't meet support (Chrome 72 and above) with a CCT. This ensures that you can use the latest and greatest while still offering a solution for older browsers and/or phones. This is another technique we can use as a front-end developer to blur the lines between web and native. Next to that, it can help you to convince your client to go for PWA. I am very excited about TWA and will closely monitor the development of this. Thanks for reading!
    date: 2020-09-15T00:00:00.000Z
    slug: wrapping-your-progressive-web-app-for-android-with-trusted-web-activities
    tags:
      - pwa
      - twa
      - native
    intro: >-
      One of the first things people mention when proposing Progressive Web Apps (PWA) is the need for native store presence. Fair enough, let's make that work.
    teaserCopy: >-
      One of the first things people mention when proposing Progressive Web Apps (PWA) is the need for native store presence. Fair enough, let's make that work.
    teaserImage: /img/articles/wrapping-your-progressive-web-app-for-android-with-trusted-web-activities.jpg
    title: Wrapping your Progressive Web App for Android with Trusted Web Activity
  - body: >-
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
    date: 2020-09-02T00:00:00.000Z
    slug: next-js-page-generation
    tags:
      - next-js
      - react-js
      - spa
    intro: >-
      I often write about Next.js as it is my go-to framework when developing interactive React.js web applications. One of the core features of Next.js is the ability to generate pages on the server. Let's have a look at what is possible, how this works and how can leverage this when building web applications.
    teaserCopy: >-
      I often write about Next.js as it is my go-to framework when developing interactive React.js web applications. One of the core features of Next.js is the ability to generate pages on the server. Let's have a look at what is possible, how this works and how can leverage this when building web applications.
    teaserImage: /img/articles/next-page-generation.jpg
    title: Next.js page generation
  - body: >-
      ![Every great concept starts with a sketch](/img/articles/firebase-sketch.jpg)*Every great concept starts with a sketch*

      ## Weapons of choice

      Usually, these ideas need two parts to be realised. Let's have a look at how I like to handle both front- and back-end to build a fully functioning and rapidly built prototype.

      ### Building the Front-end part

      I've worked with [React.js](https://reactjs.org/) for years to build interactive applications. Although not needed for every project, it allows me to rapidly build prototypes or even production-level applications due to its [reactive behaviour](https://www.freecodecamp.org/news/how-to-bring-reactivity-into-react-with-states-exclude-redux-solution-4827d293dfc4/). Next (pun incoming) to that, [Next.js](https://nextjs.org/) takes away many of the downsides I used to find with React.js. You can read more about that in my article about [how I rebuild the Mirabeau blog from the ground up using Next.js, serverless and more](https://www.davebitter.com/articles/mirabeau-blog-latest-web-technologies).

      ### 'Building' the Back-end part

      The back-end part is usually where the prototyping stops as it feels like a chore in the creative process. Sure, you can mock this part for the sake of prototyping, but getting across your idea works, in my opinion, best if a user can actually do all the things they want with as little mocked parts as possible.


      In my search for an easy way to deal with authentication and databases, I came across [Firebase](https://firebase.google.com/) by Google. Firebase is a mobile and web application development platform developed by Firebase, Inc. in 2011, then acquired by Google in 2014.


      So why Firebase? The platform offers many [features](https://firebase.google.com/products) for free to help you build whatever you want. I usually don't need all these features, but it allows me to pick just the parts I need.

      #### Letting the users log in

      Authentication is a ubiquitous part of any application nowadays. It allows me to store your preferences, data and more. Authentication is more than just logging in. I want to offer users to create, delete and update their account. Next to that, they should be able to recover their password, log in through social accounts, keep a session and more.


      ![Firebase login options](/img/articles/firebase-login.png)*Firebase login options*


      This is quite a lot when you just want to build your community cat food recipe tinder-based prototype. Luckily, Firebase offers this and more to you straight out of the box. Setting it up is as easy as flipping a few switches in the Firebase dashboard, as seen above, and implementing the logic in your prototype with the easy-to-use [Firebase SDK](https://firebase.google.com/docs/reference).

      #### Storing data

      Let's say you are building the community cat food recipe tinder-based prototype and the user has created an account and logged in. They might want to store recipes, upload pictures and look at other peoples recipes. Firebase has two types of databases in store. There is a more traditional [REST](https://restfulapi.net/) based database and a reactive 'real-time' database. The difference being the 'real-time' database allowing me to listen for any changes in the database and update the user interface accordingly.


      ![Firebase database](/img/articles/firebase-database.png)*Firebase database*


      Finally, I might want to store pictures to go with my recipes. Firebase offers [storing of media files](https://firebase.google.com/products/storage) as well. As all mentioned features, there is a limit in the free version, but it is high enough for your prototypes sake.

      ### Tying it all together

      Cool, we have a React.js front-end and a Firebase back-end. Now it's time to tie it together into a fully functioning prototype. I usually tend to go for the 'real-time' database since React.js is a perfect match due to its reactive nature. Below you can see how I implemented data fetching between React.js and Firebase using the Firebase SDK.


      ![React.js and Firebase data flow](/img/articles/firebase-react-flow.png)*React.js and Firebase data flow*


      The upside of handling your data fetching this way is having only one version of your data. Normally, I send an update to the database and update my user interface when the update went through successfully. I don't have to do this with this way of updating. I listen to the database for changes. Whenever I need to update something I send the update to the database and my listener will automatically get the updated document from Firebase.

      ## Practice what you preach

      I know this might sound like a paid advertisement by Firebase. I promise you it's not. I've built several prototypes or small applications doing this. Some examples are the internal tool I build to to see all presentations for [the Mirabeau weekly inspiration session event](https://blog.mirabeau.nl/en/articles/The_Best_Is_Yet_To_Come_one_year_of_love_and_pride/5soiFSn4y5HzO3J3nHhtmq) and the Mirabeau ski event signup application. A colleague used it to build a visitor registration tool after showing him what Firebase can do for you.


      ![The Best Is Yet To Come application built with Firebase](/img/articles/firebase-tbiytc.jpg)*The Best Is Yet To Come application built with Firebase*


      ![Company ski event application built with Firebase](/img/articles/firebase-apres-business.jpg)*Company ski event application built with Firebase*


      ## Break through limitations

      I've often limited my creativity by stopping at the concept phase due to technical requirements. Using the previously mentioned tools helped me to break through these limitations and start creating. I'm now able to quickly setup a new project with all the requirements I might have. Let's keep creating, we've got the tools available!
    date: 2020-08-17T00:00:00.000Z
    slug: prototype-with-firebase
    tags:
      - firebase
      - spa
      - react-js
    intro: >-
      I often come up with new ideas for applications and tools. I usually sketch these ideas in my notebook to build whenever I have spare time. This is where I used to stop because I didn't want to handle with things like databases, authentication and all other requirements that my idea might have.I asked myself 'How can I take my idea from sketch to a fully functioning and rapidly built prototype?'.
    teaserCopy: >-
      I often come up with new ideas for applications and tools. I used to stop at sketching these ideas in my notebook to build whenever I have spare time. I asked myself 'How can I take my idea from sketch to a fully functioning and rapidly built prototype?'.
    teaserImage: /img/articles/firebase-dave.jpg
    title: How to take an idea from sketch to a fully functioning and rapidly built prototype?
  - body: >-
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
    date: 2020-08-14T00:00:00.000Z
    slug: next-js-api-routes
    tags:
      - api
      - next-js
      - react-js
    intro: >-
      Next.js is my framework of choice for any React.js application I develop. One of the big features I haven't covered before is Next.js API routes. Although not as big of a feature as page generation, it is one of the features I'm starting to enjoy more and more. Let's have a look at this feature and how to use it.
    teaserCopy: >-
      Next.js is my framework of choice for any React.js application I develop. One of the big features I haven't covered before is Next.js API routes. Although not as big of a feature as page generation, it is one of the features I'm starting to enjoy more and more. Let's have a look at this feature and how to use it.
    teaserImage: /img/articles/next-js-api-routes.jpg
    title: Next.js API routes
  - body: >-
      ## Disclaimer: I love native apps

      This is not an "I develop for the web, so the web is the best" type of article. I love native apps. The user experience is often better than their web counterparts. This becomes apparent in, for instance, eCommerce websites. Often, they feel bloated, sluggish and don't provide the same 'feel' and functionalities as the native variant.

      ## So, why go for web apps?

      I strongly believe that web counter-parts can be equally as good, if not better. The reason why I love the web so much is due to its accessibility. If developed well, the web is accessible on every device with a web browser.

      I have a top-of-the-line tablet that's about 3 years old. It's well performant, receives frequent updates and runs very well. You'd say I'll be able to run new apps. Well, no. I quite often am not able to download or view an app because of three possible reasons:

      ### "This item isn't available in your country"

      I live in the Netherlands. Generally, we are on pretty much good terms with any country of legislation. Sure, web apps can be blocked as well in certain countries for several reasons, but generally, it is accessible. Why can't native apps be?

      ### "This app is not optimized for your device"

      Why? The hardware is capable, the OS is up to date. This is a problem that the web inherently doesn't have. If built well, the web apps scale to every resolution and offer a working solution through 'progressive enhancement'.

      ### "Only for iOS"

      This one gets me more than anything. Often, new applications are just available for one OS and sometimes even starting from a specific version. This excludes a large number of potential users just because they don't have the specific OS and version you support.


      ![This item isn't available in your country.](/img/articles/app-unavailable.jpg)*This item isn't available in your country.*


      ## Can it provide the same features of native apps?

      So, the web has these upsides, but can it provide the same features of native apps? If not, though luck. Well, it will surprise you how much the web can do and provide. Let's go over a few.

      ### Performance

      One of the big issues I have with web apps that drive me to their native counter-parts is performance. This is the responsibility of the developers. For the sake of the argument, let's take two types of applications.

      #### eCommerce

      There is no, and I repeat, NO excuse for sluggish eCommerce web apps in this day and age. There is a wide variety of tools for developers to build highly performant web apps. For example, a big issue with web apps is the use of front-end SPA frameworks like [React.js](https://reactjs.org/). Although build for fast web apps, it contributes to one of the biggest factors of sluggish websites which are resources. The bundle that needs to be loaded can be quite big. This issue is however solved with frameworks like [Next.js](https://nextjs.org/). You can read more in my article on [Implementing the latest web technologies to boost the Mirabeau blog](https://www.davebitter.com/articles/mirabeau-blog-latest-web-technologies). Combine this with caching of data and you go a long way in building a performance eCommerce web app.

      #### Intensive games

      This is where native apps are better suited on first sight. The native app can make use of all the hardware possibilities of the device and ensure great performance. The web is getting better at this through techniques like [WebAssembly](https://webassembly.org/) can solve many issues.

      ### Offline support

      [Progressive Web Apps](https://web.dev/progressive-web-apps/) (PWA) and more explicitly [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). bring offline support to the web. This ensures that, like native apps, PWas can always be loaded, cache resources and offer functionality even without an active internet connection.

      ![Twitter PWA](/img/articles/twitter-pwa.jpg)*Twitter PWA*

      ### Home screen presence

      The great thing about native apps is the presence on the home screen. It is easy for users to come back to the application when they need to. It takes a bit more effort to open a browser and then go to the web app. PWAs solve this problem. One of the core functionalities is to allow the user to add the PWA to their home screen.

      A great bonus is to be able to install the PWA to desktops as well to run as a destop app.

      ### Omni-platform by default

      Native and web apps run into the same issues regarding OS (and browser). There is no way around this, but the web has a big advantage over native. Even though the user might use a different OS or browser than others, it will still be able to use the code you wrote. This is possible for native apps by using something like React Native or by wrapping a web app in a shell for native. Being able to have a Omni-platform app out of the box is a great way to ensure accessibility for every user.

      ### iOS App Store/Google Play store/Windows store presence

      One of the lesser know features of PWAs is the ability to add your app to the iOS App Store/Google Play store/Windows store. This opens up a whole way to be discovered by potential users. For a more detailed look head over to [this](https://www.freecodecamp.org/news/i-built-a-pwa-and-published-it-in-3-app-stores-heres-what-i-learned-7cb3f56daf9b/) article explaining the possibilities and experience.

      ![Twitter PWA in Google Play Store](/img/articles/twitter-google-play-store.jpeg)*Twitter PWA in Google Play Store*

      ### Version updates

      One of the downsides I see with native apps is the requirement to first install and then keeping the app up to date. Again, this is inherently not an issue with the web. Releasing an update will always be immediately available to the user.

      ### Notifications

      Another great possibility of native apps is notifications. This feature is immensely valuable to trigger users to use your app. This, again, is supported when using PWAs. Obviously, like native apps, this should be used unobtrusively.

      ### And more

      You get the picture by now. The web offers many of the functionalities that native does and brings more upsides to the table. Things like splash screens, BlueTooth support, webcam access and more are available in the browser. The web is one mighty machine.

      ## Successful web apps are not just about technological possibilities

      That was a lot of technical information, but let's step back a bit and look at the 'look and feel'. Often, web apps are turned into PWAs on a technical level. Although this is a good start, there is a big part we aren't covering yet. The look and feel of a native app versus a web app are immense. Besides platform-specific styles and interaction patterns, there is a fundamentally different design pattern.

      Native apps don't scroll. Well, they do, but very specific. On the web, it is custom to have multiple sections on a page. You might have a header, latest posts, a contact form and end with a footer. Native apps do have this sometimes, but mostly 'tuck away' sections. Generally, lists and content are scrollable. Forms and other standalone sections are often available after a user interaction on, for instance, a button.

      ![Load flow with app shell](/img/articles/appshell.png)*Load flow with app shell*

      Next to this, native apps often have a shell with a top- and bottom bar with a place for the content in the middle. This 'shell' is always available and loaded first. Content will be loaded second.

      Naturally, there is way more that goes into designing an app versus a website, but this exemplifies how crucial the design is when building a PWA.

      ## Which companys use PWAs?

      A lot actually. Here are some of the examples companies that use PWAs:

      * Starbucks

      * Housing.com

      * Digikala

      * Flipboard

      * Soundslice

      * 2048 Game

      * MakeMyTrip

      * Uber

      * Padpiper

      * Pinterest

      * Yummly

      * Spotify

      ## Which one should I choose and don't say "it depends"?

      It depends. If the functionalities are available for the web, definitely! As I just mentioned, the web offers many advantages over native apps while offering many of the same functionalities. If you need that native app, go for that.

      My goals are not to push web apps over native apps in some 'platform war'. Be open-minded for both and be up to speed with the possibilities. In the end, our goals should be to offer the user with the best product. Personal preference or other peoples opinion matter, but are not leading. With both platforms, there is only one question you should ask yourself.

      > How can I help the person using this in the best way?
    date: 2020-06-12T00:00:00.000Z
    slug: you-might-not-need-a-native-app
    tags:
      - pwa
      - native
      - spa
    intro: >-
      "We need a native app for performance, the 'feel', offline functionalities, notifications and...". Native apps have provided fundamental functionalities that serve the purpose of creating a wonderful user experience. But, you might not need that native app and opt for the technology of the wondrous web!
    teaserCopy: >-
      "We need a native app for performance, the 'feel', offline functionalities, notifications and...". Native apps have provided fundamental functionalities that serve the purpose of creating a wonderful user experience. But, you might not need that native app and opt for the technology of the wondrous web!
    teaserImage: /img/articles/pwa-vs-native.png
    title: You might not need a native app
  - body: >-
      ![Number Code Input](/img/articles/number-code-input-html-css-js.gif)*Number Code Input*

      As you can see, the core functionality of these inputs is to enter one number at a time. The building of that happy flow can be quite easy to do. When playing around we can see that there a quite a few more functionalities. Let's first set the requirements:

      The Number Code Input should:

      * automatically move to the next and stop at the last number input

      * navigate from left to right with the arrow keys

      * delete a single value in input and automatically going back to and delete the value of the previous input when hitting the backspace key

      * delete the value of a focussed and previous input if backspace is pressed multiple times

      * handle the pasting of several/all numbers in a number input

      You see, this is quite a bit of functionality. As always, I will build this custom input in a progressively enhanced way on three levels. Please read more about this in my blog ["Writing progressively enhanced custom inputs for the web"](https://www.davebitter.com/articles/custom-inputs-web).

      ## Structural (HTML)

      ![Number Code Input with HTML](/img/articles/number-code-input-html.gif)*Number Code Input with HTML*


      ```html

      <fieldset name='number-code' data-number-code-form>
          <legend>Number Code</legend>

          <input type="number" min='0' max='9' name='number-code-0' data-number-code-input='0' required />
          <input type="number" min='0' max='9' name='number-code-1' data-number-code-input='1' required />
          <input type="number" min='0' max='9' name='number-code-2' data-number-code-input='2' required />
          <input type="number" min='0' max='9' name='number-code-3' data-number-code-input='3' required />
          <input type="number" min='0' max='9' name='number-code-4' data-number-code-input='4' required />
          <input type="number" min='0' max='9' name='number-code-5' data-number-code-input='5' required />
          <input type="number" min='0' max='9' name='number-code-6' data-number-code-input='6' required />
          <input type="number" min='0' max='9' name='number-code-7' data-number-code-input='7' required />
      </fieldset>

      ```

      Let's start with the structure. As you might have read in the article I mentioned, I need to provide a working HTML version first. The Number Code Input will consist of a fieldset containing all the separate number inputs. The fieldset is used to indicate that these inputs belong together. With the `legend`, I indicate what this group is.

      The inputs itself have a few needed attributes. Firstly, I declared that the input type must be a number. This is not just for validation but triggers the [number keyboard layout](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Using_number_inputs) on devices. This increases the user experience. Next to that, I've added a `min` value of 0 and a `max` value of 9. I did this so you can only enter a single number character per input. You might see some attributes like `data-number-code-input`. This has no function right now but will be used later on by the JavaScript.

      Great, the Number Code Input now allows for numbers being entered by the user. Let's proceed to the next step.

      ## Presentational (CSS)

      ![Number Code Input with HTML and CSS](/img/articles/number-code-input-html-css.gif)*Number Code Input with HTML and CSS*

      ```css

      legend {
        font-size: 0;
      }


      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }


      input[type=number] {
        -moz-appearance: textfield;
      }

      ```

      Naturally, the style of the inputs is up to you. I did add a few things, besides nice visuals, to make the form a bit better. I set the `font-size` of the legend to 0 as visually we don't need it, but for screenreaders, we want to have that information available. Next to that, I hid the arrows in the input field as I did not find it needed in my use case. This is, of course, up to you.

      The Number Code Input is starting to look a lot better. Now let's add some interactivity.

      ## Behavioural (JavaScript)

      ![Number Code Input with HTML, CSS and JS](/img/articles/number-code-input-html-css-js.gif)*Number Code Input with HTML, CSS and JS*

      Let's take the behavioural layer one requirement at a time.

      ### Automatically move to the next and stop at the last number input

      I need to add some logic to call focus on the next number input if the case that the current number input is not the last one

      ```js

      const numberCodeForm = document.querySelector('[data-number-code-form]');

      const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')];


      const handleInput = ({target}) => {
        let currentIndex = Number(target.dataset.numberCodeInput);
        const nextIndex = currentIndex + 1;

        if(nextIndex < numberCodeInputs.length) {
          numberCodeInputs[nextIndex].focus();
        }
      });

      ```

      ### Navigate from left to right with the arrow keys

      I need to add an event listener that triggers when a key is pressed. I then focus on the next or previous number input if there is one.

      ```js

      const numberCodeForm = document.querySelector('[data-number-code-form]');

      const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')];


      const handleKeyDown = e => {
        const {code, target} = e;

        const currentIndex = Number(target.dataset.numberCodeInput);
        const previousIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;

        const hasPreviousIndex = previousIndex >= 0;
        const hasNextIndex = nextIndex <= numberCodeInputs.length - 1

        switch(code) {
          case 'ArrowLeft':
          case 'ArrowUp':
            if (hasPreviousIndex) {
              numberCodeInputs[previousIndex].focus();
            }
            e.preventDefault();
            break;

          case 'ArrowRight':
          case 'ArrowDown':
            if (hasNextIndex) {
              numberCodeInputs[nextIndex].focus();
            }
            e.preventDefault();
            break;

          default:
            break;
        }
      }


      numberCodeForm.addEventListener('keydown', handleKeyDown);

      ```

      ### Delete a single value in an input and automatically going back to and delete the value of the previous input when hitting the backspace key

      This functionality is pretty straight forward. I delete the value of the focussed number input and focus the previous number input if present.

      ```js

      const numberCodeForm = document.querySelector('[data-number-code-form]');

      const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')];


      const handleKeyDown = e => {
        const {code, target} = e;

        const currentIndex = Number(target.dataset.numberCodeInput);
        const previousIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;

        const hasPreviousIndex = previousIndex >= 0;
        const hasNextIndex = nextIndex <= numberCodeInputs.length - 1

        switch(code) {
          case 'Backspace':
            if (!e.target.value.length && hasPreviousIndex) {
              numberCodeInputs[previousIndex].value = null;
              numberCodeInputs[previousIndex].focus();
            }
            break;
          default:
            break;
        }
      }


      numberCodeForm.addEventListener('keydown', handleKeyDown);

      ```

      ### Handle the pasting of several/all numbers in a number input

      Finally, when pasting a value of multiple characters I want to automatically fill out the number input based on that value. This is important as this is a common way people fill out these forms.

      ```js

      const numberCodeForm = document.querySelector('[data-number-code-form]');

      const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')];


      const handleInput = ({target}) => {
        const inputLength = target.value.length;
        let currentIndex = Number(target.dataset.numberCodeInput);

        if (inputLength > 1) {
          const inputValues = target.value.split('');

          inputValues.forEach((value, valueIndex) => {
            const nextValueIndex = currentIndex + valueIndex;

            if (nextValueIndex >= numberCodeInputs.length) { return; }

            numberCodeInputs[nextValueIndex].value = value;
          });

          currentIndex += inputValues.length - 2;
        }

        const nextIndex = currentIndex + 1;
      });

      ```

      ## Looking back

      That's it. I build a progressively enhanced Number Code Input that deals with the several requirements we set. Feel free to have a look over at [CodePen](https://codepen.io/davebitter/full/VweaZqY) to play around with the Number Code Input and look further into the source code.

    date: 2020-06-11T00:00:00.000Z
    slug: number-code-input
    tags:
      - prototype
      - progressive-enhancement
    intro: >-
      I often come across Number Code Inputs on various websites used for security measures, voucher codes and more. These Number Code Inputs often have a bit more functionality behind them then you might think at first. Let's create our own as an exercise.
    teaserCopy: >-
      I often come across Number Code Inputs on various websites used for security measures, voucher codes and more. These Number Code Inputs often have a bit more functionality behind them then you might think at first. Let's create our own as an exercise.
    teaserImage: /img/articles/number-code-input.jpg
    title: Building a Number Code Input
  - body: >-
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

    date: 2020-03-31T00:00:00.000Z
    slug: spa-seo
    tags:
      - seo
      - spa
      - next-js
    intro: >-
      One of the biggest drawbacks when building a Single-Page Application (SPA) is to provide solid Search Engine Optimisation, often shortened to SEO. How can we improve SEO with some modern tools and techniques I love the most and use in my daily work as a front-end developer? Read more about it in this blog.
    teaserCopy: >-
      One of the biggest drawbacks when building a Single-Page Application (SPA) is to provide solid Search Engine Optimisation, often shortened to SEO. How can we improve SEO with some modern tools and techniques I love the most?
    teaserImage: /img/articles/dave-seo.jpg
    title: How can I handle SEO in my Single-page application?
  - body: >-
      Back in 2018, Mirabeau updated their main website [mirabeau.nl](https://mirabeau.nl). However, the old blogging platform became the sibling that was left behind. The branding and visual style got severely updated and as you might know, the world of (front-end) development moves at a rapid pace. Projects that are about five years old become outdated both in tooling and functionality. I want to rethink the way we build web platforms and construct a stack that stays up-to-date and is resilient for the coming years.


      ![The old blog](//images.ctfassets.net/w4dg3cjf42ew/5vXCgxn6BTCy8jqrjMiLXf/2db1ca51a38df55e69951346ab28abbc/49D97C22-25AD-4F85-862D-E6C93A006EE6-min.png)*Our aged blog platform*


      ## The new blog platform

      The biggest difference between [the new blog platform](blog.mirabeau.nl) – compared to the old – is the unified visual language. I took, in close collaboration with the visual designers, elements of the main Mirabeau website to use in the platform. Examples are the page scroll effect and the blog cards. Combining that with the corporate identity ensures a unified look & feel.

      The second major improvement is the overall ease of use. For example, you are now able to scan more quickly over the page to find an article of your interest. I implemented this by proving a teaser image and a summary of the blog. This gives authors more room to make a scannable summary of their post.


      ![The new Mirabeau visual branding](//images.ctfassets.net/w4dg3cjf42ew/36VJWDKG568fiDIAdv9Gpg/39118b835a3f11b5d59c8bcde0ee8d66/B323160D-6A46-4AD2-A48C-1FEF85BBF506-min.png)*The updated branding and visual language*


      ### Solving issues with Single Page Applications (SPA)

      Every once in awhile I see techniques or frameworks that truly excite me. The foundation of this platform is built on one of those. The platform is built in [React.js](https://reactjs.org/) with the full power of [Next.js](https://nextjs.org/).

      At Mirabeau, there are two main ways of building the front-end for a website. They either use their [front-end boilerplate](https://github.com/mirabeau-nl/frontend-boilerplate) for setting up a component library/design system and static websites or they use React.js to build more interactive heavy web applications. React.js comes with a few big downsides that you need to take into account. The reason Next.js excites me so much is that it solves many of the issues.

      The biggest drawback is the lack of server-side rendering (SSR) capabilities when using React.js or any other SPA. In short, you load a blank page and a JavaScript bundle. After loading the bundle, the page is built in the browser and the user can use the application.

      This has multiple implications like:

      * 1.  __Performance__: The page needs to load a - in most cases large -
      JavaScript bundle to be able to render the first view. Often, you then
      need to get some data - like a blog post - from a server. This then gets
      retrieved and rendered on the page. By utilising SSR, we can do all of
      this just on the server.

      * 2.  __Providing SEO__: SEO is an important factor for many types of websites like the Mirabeau blog platform. Firstly, I wanted to provide robots/crawlers from Google to properly index our pages. Secondly, I wanted social media platforms to be able to create links with images, titles and summaries.

      * 3.  __Building through progressive enhancement__: At Mirabeau, they build websites through progressive enhancement. Unfortunately, you need JavaScript for a React.js website. We can use SSR to provide the platform without having JavaScript in the browser.


      ![React.js and Next.js](//images.ctfassets.net/w4dg3cjf42ew/5JdNrYGW2SBKmIoT38kqz0/80b019ca3d6e00871b3603f842814b0c/CDFEF415-123A-4D0E-85AD-BB3B32A0B3A1-min.png)*React.js and Next.js working together*


      ### Serverless architecture

      Next.js provides a couple of ways to run your platform. You can run your platform with a [Node.js server](https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f/), generated as a  [static site (SSG)](https://nextjs.org/learn/excel/static-html-export)or [ serverless](https://serverless.com/blog/serverless-nextjs/). I decided to go with the latter for a few reasons. As the content might update frequently, a statically generated website requires rebuilds of pages when their content changes. This leaves me with Node.js and serverless. Serverless is the right choice with regards to costs, scalability and speed. More details later on in this story.

      ### Increasing engagement with custom SEO

      SEO is an important aspect of any website, but even more for a blog platform. I dove into how I could leverage this for this platform.

      * 1.  __Creating dynamic tags__. Fortunately, Next.js provides a Head component to let you dynamically add nodes, like tags for SEO, to the head of the page. I use this to load page-specific tags dynamically per page.

      * 2.  __Using standards with [Open Graph](https://ogp.me/)__. It’s a protocol that is widely supported by all major social media websites and crawlers. I use Open Graph to create semantical tags for SEO. For example, I was able to provide a title, image and summary for an article page.

      * 3.  __Custom tags for social sites__. By default robots or crawlers of websites like Facebook, LinkedIn and Twitter will try to get this information out of your website. I want to allow authors to have full control over this. In the CMS the author can give a specific image and summary for their article. This then dictates how it looks like when shared on social media sites. This gives more fine-grained control over this.

      * 4.  __Extending tags in a smart way__. Even though I want to give this fine-grained control to the others, I don't want them to worry about it. I wrote a small algorithm that takes a set of base tags for the entire blog platform and extends them based on the type of page. This ensures good SEO while taking away the work for authors.

      ### Utilising a serverless architecture

      I want to dive a bit deeper in the serverless architecture that is used for this blog platform. This is the biggest difference, technology-wise next to React.js, compared to the old platform.


      ![The Serverless Framework with Next.js](//images.ctfassets.net/w4dg3cjf42ew/6m51INzwmzmJr4Z25pfInu/52550162034fa24e94687be53e931e2c/serverless_nextjs_blog_header-min.png)*The Serverless Framework with Next.js*


      * 1.   __‘Zero’ configuration__. Configuring and deploying a fully serverless architecture can become quite difficult. For this reason, I decide to make use of the [Serverless Framework](https://serverless.com/). This allows me to get up and running relatively quickly. It simplified the configuration and deployment aspect.

      * 2.  __Next.js__. I use the [Serverless Next.js plugin](https://serverless.com/blog/serverless-nextjs/). This plugin takes the rest of the heavy lifting. It is exactly tailored to deploying a Next.js project with serverless and lambdas.

      * 3.  __Cloud services__. I decided to use AWS, where we host many services, to deploy the serverless platform on. Below you can see the architecture that I use.


      ![New Mirabeau blog platform architecture on AWS](//images.ctfassets.net/w4dg3cjf42ew/1C35P7AAsdhPyE87h90fEi/269e6dc99c0c03cc79adbed078f7e240/serverless_nextjs_lambda_edge_aws_architecture-min.png)*The new Mirabeau blog platform architecture running on AWS*


      ### Cloud Services

      A comprehensive overview of AWS services used for the new platform:

      * 1.  __CloudFront__. Amazon CloudFront speeds up the distribution of static and dynamic web content to users. Making use of S3 buckets for static files and Lambda at edge to render the requested page server-side.


      * 2.  __S3__. Amazon Simple Storage Service (S3) is storage designed to make web-scale computing easier for developers. It is utilised to serve the images, CSS and JavaScript.

      * 3.  __Lambda@Edge__ lets you run Node.js and Python Lambda functions to customize content that CloudFront delivers by executing the functions in AWS locations near the user. This results in a faster page load, in general, for every user all over the world.


      ![Lamda](//images.ctfassets.net/w4dg3cjf42ew/7uRaMDjuA7iS9kjLEau6Bm/48ef2eb84b38b9fc1314b427a523713d/cloudfront-events-that-trigger-lambda-functions-min.png)*A typical request going through AWS CloudFront*


      ### CI/CD with pipelines

      Finally, I added CI/CD through pipelines. I do this for a few reasons. I want to ensure that all front-end developers can collaborate on this platform by quickly cloning the repository, make changes and roll out an update through the pipelines. Next to that, I want to ensure that everybody that I allow through the repository rights and access configuration, can deploy without creating their own AWS accounts and keys. This all ensures a nice developer experience.


      ![CI/CD](//images.ctfassets.net/w4dg3cjf42ew/KZlhxIeJqB8y7l954ixcm/04acb40e87638f9dbfed747370ba32aa/diagram-cicd-horizontal-85f50f218b3ff47fd993ab5529b85f0147901b20f18b972fdc48504e4bc3110e-min.png)*Two ways of CI/CD*


      ## The new front-end toolbox

      Let’s take a step back and look at what a front-end developer in 2020 can do. It is a great time for front-end developers to experiment with different areas of the process of building a platform. With Next.js I was able to, relatively easy, add SSR through Lamdas. With the Serverless framework and the Serverless Next.js plugin, I was able to configure and deploy the full architecture to AWS. Finally, with pipelines I was able to implement CI/CD.


      Naturally, there are more tools out there, but this platform attests to the fact that we become increasingly more powerful as front-end developers nowadays. We can build great things with the assistance of the mentioned tools. We can, once again, focus on creating!
    date: 2020-02-03T00:00:00.000Z
    intro: >-
      The Mirabeau blog was suffering from technical debt. I decided to rebuild it using
      the latest web technologies to make it 2020 ready, which includes boosting
      the overall performance and user-friendliness. This blog post is about the
      journey I went and what the possibilities might be for your next platform.
    slug: mirabeau-blog-latest-web-technologies
    tags:
      - next-js
      - react-js
      - serverless
    teaserCopy: >-
      The Mirabeau blog was suffering from technical debt. I decided to rebuild it using
      the latest web technologies to make it 2020 ready, which includes boosting
      the overall performance and user-friendliness.
    teaserImage: /img/articles/dave-behind-laptop.jpg
    title: Implementing the latest web technologies to boost the Mirabeau blog
  - body: >-
      ### Progressive enhancement

      Progressive enhancement is a technique we use to enhance an element when the user’s browser has certain functionalities. By far, the biggest part of progressive enhancement is enhancing elements when CSS and JavaScript are available.

      The technique is simple. First, built the HTML to always offer a working solution. Then add CSS to make the element more visually appealing. Finally, add some JavaScript to enhance the user experience by adding custom interactivity.

      ### Progressively enhanced custom inputs

      So, how to deal with custom inputs? For example a custom three-way switch shown below.

      ![Three way switch with HTML, CSS and JavaScript](//images.ctfassets.net/w4dg3cjf42ew/1zNvSfEft1nLo19YjfNUZz/e3f4e68aa0c8133ba17042ad2514963e/html_css_js.gif)

      First, break down the functionality the input requires. As a user, you have three choices. We indicate with a color whether the value is active (green), inactive (red) or no preference (grey). The input will have to animate between the options as well.

      ### HTML

      First start with the HTML. There are three options the user can select and only one option can be selected at a time. This is a perfect use case for HTML radio inputs. Let’s write that first.

      ```html

      ...

      <form>
        <fieldset>
          <legend>Would you like to receive news updates?</legend>
          <div>
            <div>
              <input id='inactive' type='radio' name='email-preference' />
              <label for='inactive'>No</label>

              <input id='no-preference' type='radio' name='email-preference' checked />
              <label for='no-preference'>No preference</label>

              <input id='active' type='radio' name='email-preference' />
              <label for='active'>Yes</label>
            </div>
          </div>
        </fieldset>
      </form>

      ...

      ```

      ![Three way switch with HTML only](//images.ctfassets.net/w4dg3cjf42ew/1ZF5ZS5RboxdmcDA8Q3w1S/2a6c6e530c46eb96b90ff853f7d459ca/html.gif)

      ### CSS

      I can add styling to make it look like the design with the HTML in place. So I first add some needed wrapping `div`s and classes to the existing HTML for the CSS.

      ```html

      ...

      <body data-has-js='false'>
        <form>
          <fieldset>
            <legend>Would you like to receive news updates?</legend>
            <div class='switch-wrapper'>
              <div class='switch'>
                <input id='inactive' class='switch__input' type='radio' name='email-preference' />
                <label for='inactive' class='switch__label'>No</label>

                <input id='no-preference' class='switch__input' type='radio' name='email-preference' checked />
                <label for='no-preference' class='switch__label'>No preference</label>

                <input id='active' class='switch__input' type='radio' name='email-preference' />
                <label for='active' class='switch__label'>Yes</label>

              </div>
            </div>
          </fieldset>
        </form>
      </body>

      ...

      ```

      After this, add CSS to style the input to look like the proposed design. Then hide the labels for the inputs because you can now use CSS to indicate the chosen value. The below sample uses SCSS, a pre-processor for CSS.

      ```css

      ...

      .switch__input:checked {
        background-color: var(--color-white);

        &[data-state='active'] {
          [data-has-js='false'] & {
            background-color: var(--color-green);
          }
        }

        &[data-state='inactive'] {
          [data-has-js='false'] & {
            background-color: var(--color-red);
          }
        }

          [data-has-js='true'] & {
              background-color: transparent;
          }
      }

      ...

      ```


      As you may have noticed, I have added an attribute to the `body` element to check whether there is JavaScript enabled because some of the styling will just be needed for the non-JavaScript version.

      ![Three way switch with HTML and CSS](//images.ctfassets.net/w4dg3cjf42ew/6YU8CaGMTZWoi1SIjZ9GwI/5ed6143c2c17b8133afe66d45908759a/html_css.gif)

      ### JavaScript

      Lastly, some JavaScript is added to make the full version including an animation and containing all the design.

      I'll first add an HTML element for the, to be animated, active circle that only shows-up when there is JavaScript. I also added a few data attributes to the HTML that will be used as selectors in the JavaScript

      ```html

      ...

      <body data-has-js='false'>
        <form>
          <fieldset>
            <legend>Would you like to receive news updates?</legend>
            <div class='switch-wrapper' data-switch-wrapper>
              <div class='switch'>
                <input id='inactive' class='switch__input' type='radio' name='email-preference' data-state='inactive' data-switch-input />
                <label for='inactive' class='switch__label'>No</label>

                <input id='no-preference' class='switch__input' type='radio' name='email-preference' data-switch-input checked />
                <label for='no-preference' class='switch__label'>No preference</label>

                <input id='active' class='switch__input' type='radio' name='email-preference' data-state='active' data-switch-input />
                <label for='active' class='switch__label'>Yes</label>

                <span class='switch__pill' data-switch-pill />
              </div>
            </div>
          </fieldset>
        </form>
      </body>

      ...

      ```

      With JavaScript, I then indicate that the client has JavaScript.

      ```js

      document.body.setAttribute('data-has-js', true);

      ```

      After that, all I need to do is listen for inputs by the user and animate the active circle to the active input.

      ```js

      // Set indicator for CSS that JS is available
      document.body.setAttribute('data-has-js', true);

      // Needed DOM nodes
      const elements = {
        switchWrapper: document.querySelector('[data-switch-wrapper]'),
        inputs: Array.from(document.querySelectorAll('[data-switch-input]')),
        pill: document.querySelector('[data-switch-pill]')
      };

      // Place pill over passed node
      const updatePillPosition = ({target}, animate = true) => {
        const inputIndex = elements.inputs.findIndex(input => input === target);
        const inputState = target.getAttribute('data-state');

        elements.switchWrapper.dataset.animate = animate;
        elements.pill.style.transform = `translate(${inputIndex * target.scrollWidth}px, -50%)`;
        elements.switchWrapper.dataset.state = inputState || 'default';
      };

      // Check for default checked node
      const defaultActiveInput = elements.inputs.find(input => input.checked)
      if (defaultActiveInput) { updatePillPosition({target: defaultActiveInput}, false); }

      // Listen for input events on the nodes
      elements.inputs.forEach(input => input.addEventListener('input', updatePillPosition));

      ```

      And that makes final result! Always consider building progressively enhanced custom inputs for the web that also work in cases where a screenreader (no CSS) is used or JavaScript is not available.

      ![html+css+js](//images.ctfassets.net/w4dg3cjf42ew/5WyKR8vBL5kJXTwbiu8BOF/a97d86a406297f044fb0c80638083bf8/html_css_js.gif)

      ## Final thoughts

      Building in a progressively enhanced way is quite a bit of work. So why is it so important? By writing semantically correct HTML, we offer an accessible website for people who, for instance, use a screenreader. By making it work without JavaScript, we make our website accessible for users that can’t or won’t load JavaScript. Our website will deliver the best possible user experience for every user.

      ## Demo

      You can find the demo and all the code of the three-way switch we worked on over at [CodePen](https://codepen.io/davebitter/full/WNeByaW).
    date: 2019-10-01T00:00:00.000Z
    tags:
      - progressive-enhancement
      - prototype
    intro: >-
      As a frontend developer, I often get designs for custom inputs. These inputs improve usability and user experience. The inputs often require JavaScript to make them work like the designer intended. However, this poses a problem. How can we make custom inputs for the web while still offering a working solution without JavaScript?
    slug: custom-inputs-web
    teaserCopy: >-
      How can we make custom inputs for the web while still offering a working solution without JavaScript?
    teaserImage: /img/articles/progressive-enhancement.png
    title:  Writing progressively enhanced custom inputs for the web
---
