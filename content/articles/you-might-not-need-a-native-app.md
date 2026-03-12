---
type: articles
date: 2020-06-12T00:00:00.000Z
slug: you-might-not-need-a-native-app
tags:
  - pwa
  - native
  - spa
intro: >-
  "We need a native app for performance, the 'feel', offline functionalities,
  notifications and...". Native apps have provided fundamental functionalities
  that serve the purpose of creating a wonderful user experience. But, you might
  not need that native app and opt for the technology of the wondrous web!
teaserCopy: >-
  "We need a native app for performance, the 'feel', offline functionalities,
  notifications and...". Native apps have provided fundamental functionalities
  that serve the purpose of creating a wonderful user experience. But, you might
  not need that native app and opt for the technology of the wondrous web!
teaserImage: /img/articles/pwa-vs-native.webp
title: You might not need a native app
---
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

![This item isn't available in your country.](/img/articles/app-unavailable.webp)*This item isn't available in your country.*

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
![Twitter PWA](/img/articles/twitter-pwa.webp)*Twitter PWA*

### Home screen presence

The great thing about native apps is the presence on the home screen. It is easy for users to come back to the application when they need to. It takes a bit more effort to open a browser and then go to the web app. PWAs solve this problem. One of the core functionalities is to allow the user to add the PWA to their home screen.
A great bonus is to be able to install the PWA to desktops as well to run as a destop app.

### Omni-platform by default

Native and web apps run into the same issues regarding OS (and browser). There is no way around this, but the web has a big advantage over native. Even though the user might use a different OS or browser than others, it will still be able to use the code you wrote. This is possible for native apps by using something like React Native or by wrapping a web app in a shell for native. Being able to have a Omni-platform app out of the box is a great way to ensure accessibility for every user.

### iOS App Store/Google Play store/Windows store presence

One of the lesser know features of PWAs is the ability to add your app to the iOS App Store/Google Play store/Windows store. This opens up a whole way to be discovered by potential users. For a more detailed look head over to [this](https://www.freecodecamp.org/news/i-built-a-pwa-and-published-it-in-3-app-stores-heres-what-i-learned-7cb3f56daf9b/) article explaining the possibilities and experience.
![Twitter PWA in Google Play Store](/img/articles/twitter-google-play-store.webp)*Twitter PWA in Google Play Store*

### Version updates

One of the downsides I see with native apps is the requirement to first install and then keeping the app up to date. Again, this is inherently not an issue with the web. Releasing an update will always be immediately available to the user.

### Notifications

Another great possibility of native apps is notifications. This feature is immensely valuable to trigger users to use your app. This, again, is supported when using PWAs. Obviously, like native apps, this should be used unobtrusively.

### And more

You get the picture by now. The web offers many of the functionalities that native does and brings more upsides to the table. Things like splash screens, BlueTooth support, webcam access and more are available in the browser. The web is one mighty machine.

## Successful web apps are not just about technological possibilities

That was a lot of technical information, but let's step back a bit and look at the 'look and feel'. Often, web apps are turned into PWAs on a technical level. Although this is a good start, there is a big part we aren't covering yet. The look and feel of a native app versus a web app are immense. Besides platform-specific styles and interaction patterns, there is a fundamentally different design pattern.
Native apps don't scroll. Well, they do, but very specific. On the web, it is custom to have multiple sections on a page. You might have a header, latest posts, a contact form and end with a footer. Native apps do have this sometimes, but mostly 'tuck away' sections. Generally, lists and content are scrollable. Forms and other standalone sections are often available after a user interaction on, for instance, a button.
![Load flow with app shell](/img/articles/appshell.webp)*Load flow with app shell*
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
