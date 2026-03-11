---
type: articles
date: 2020-09-15T00:00:00.000Z
slug: wrapping-your-progressive-web-app-for-android-with-trusted-web-activities
tags:
  - pwa
  - twa
  - native
intro: >-
  One of the first things people mention when proposing Progressive Web Apps
  (PWA) is the need for native store presence. Fair enough, let's make that
  work.
teaserCopy: >-
  One of the first things people mention when proposing Progressive Web Apps
  (PWA) is the need for native store presence. Fair enough, let's make that
  work.
teaserImage: >-
  /img/articles/wrapping-your-progressive-web-app-for-android-with-trusted-web-activities.jpg
title: Wrapping your Progressive Web App for Android with Trusted Web Activity
---
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
