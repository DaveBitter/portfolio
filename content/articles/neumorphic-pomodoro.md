---
type: articles
date: 2021-01-19T00:00:00.000Z
slug: neumorphic-pomodoro
tags:
  - pwa
  - next-js
  - react-js
intro: >-
  There is this view many developers share of having a productive coding session
  by crawling behind your laptop, put on your fancy noise-cancelling headphones
  and grinding out a few hours of work. I often fall for this novelty of
  hyper-productive work state in development. Since working full-time from home
  I noticed a serious decline in my productivity and focus. How is this possible
  and how can I resolve this?
teaserCopy: >-
  There is this view many developers share of having a productive coding session
  by crawling behind your laptop, put on your fancy noise-cancelling headphones
  and grinding out a few hours of work. I often fall for this novelty of
  hyper-productive work state in development. Since working full-time from home
  I noticed a serious decline in my productivity and focus. How is this possible
  and how can I resolve this?
teaserImage: /img/articles/pomodoro-hero.jpg
title: I build a neumorphic Pomodoro to stay sane
---
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
