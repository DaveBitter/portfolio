---
type: articles
date: 2020-10-08T00:00:00.000Z
slug: >-
  how-can-we-develop-and-design-for-a-pwa-to-deliver-the-best-native-user-experience
tags:
  - pwa
  - twa
  - native
intro: "Progressive Web App\_(PWA) is often written about. These articles, including mine, mostly only cover the technical parts. Although vital, one aspect of building a successful PWA is design. How can we develop and design for PWA to deliver the best native user experience (UX)?"
teaserCopy: "Progressive Web App\_(PWA) is often written about. These articles, including mine, mostly only cover the technical parts. Although vital, one aspect of building a successful PWA is design. How can we develop and design for PWA to deliver the best native user experience (UX)?"
teaserImage: /img/articles/design-and-develop-for-pwa.jpg
title: >-
  How can we develop and design for a PWA to deliver the best native user
  experience?
---
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
