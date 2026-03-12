---
type: articles
date: 2020-08-17T00:00:00.000Z
slug: prototype-with-firebase
tags:
  - firebase
  - spa
  - react-js
intro: >-
  I often come up with new ideas for applications and tools. I usually sketch
  these ideas in my notebook to build whenever I have spare time. This is where
  I used to stop because I didn't want to handle with things like databases,
  authentication and all other requirements that my idea might have.I asked
  myself 'How can I take my idea from sketch to a fully functioning and rapidly
  built prototype?'.
teaserCopy: >-
  I often come up with new ideas for applications and tools. I used to stop at
  sketching these ideas in my notebook to build whenever I have spare time. I
  asked myself 'How can I take my idea from sketch to a fully functioning and
  rapidly built prototype?'.
teaserImage: /img/articles/firebase-dave.webp
title: >-
  How to take an idea from sketch to a fully functioning and rapidly built
  prototype?
---
![Every great concept starts with a sketch](/img/articles/firebase-sketch.webp)*Every great concept starts with a sketch*

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

![Firebase login options](/img/articles/firebase-login.webp)*Firebase login options*

This is quite a lot when you just want to build your community cat food recipe tinder-based prototype. Luckily, Firebase offers this and more to you straight out of the box. Setting it up is as easy as flipping a few switches in the Firebase dashboard, as seen above, and implementing the logic in your prototype with the easy-to-use [Firebase SDK](https://firebase.google.com/docs/reference).

#### Storing data

Let's say you are building the community cat food recipe tinder-based prototype and the user has created an account and logged in. They might want to store recipes, upload pictures and look at other peoples recipes. Firebase has two types of databases in store. There is a more traditional [REST](https://restfulapi.net/) based database and a reactive 'real-time' database. The difference being the 'real-time' database allowing me to listen for any changes in the database and update the user interface accordingly.

![Firebase database](/img/articles/firebase-database.webp)*Firebase database*

Finally, I might want to store pictures to go with my recipes. Firebase offers [storing of media files](https://firebase.google.com/products/storage) as well. As all mentioned features, there is a limit in the free version, but it is high enough for your prototypes sake.

### Tying it all together

Cool, we have a React.js front-end and a Firebase back-end. Now it's time to tie it together into a fully functioning prototype. I usually tend to go for the 'real-time' database since React.js is a perfect match due to its reactive nature. Below you can see how I implemented data fetching between React.js and Firebase using the Firebase SDK.

![React.js and Firebase data flow](/img/articles/firebase-react-flow.webp)*React.js and Firebase data flow*

The upside of handling your data fetching this way is having only one version of your data. Normally, I send an update to the database and update my user interface when the update went through successfully. I don't have to do this with this way of updating. I listen to the database for changes. Whenever I need to update something I send the update to the database and my listener will automatically get the updated document from Firebase.

## Practice what you preach

I know this might sound like a paid advertisement by Firebase. I promise you it's not. I've built several prototypes or small applications doing this. Some examples are the internal tool I build to to see all presentations for [the Mirabeau weekly inspiration session event](https://blog.mirabeau.nl/en/articles/The_Best_Is_Yet_To_Come_one_year_of_love_and_pride/5soiFSn4y5HzO3J3nHhtmq) and the Mirabeau ski event signup application. A colleague used it to build a visitor registration tool after showing him what Firebase can do for you.

![The Best Is Yet To Come application built with Firebase](/img/articles/firebase-tbiytc.webp)*The Best Is Yet To Come application built with Firebase*

![Company ski event application built with Firebase](/img/articles/firebase-apres-business.webp)*Company ski event application built with Firebase*

## Break through limitations

I've often limited my creativity by stopping at the concept phase due to technical requirements. Using the previously mentioned tools helped me to break through these limitations and start creating. I'm now able to quickly setup a new project with all the requirements I might have. Let's keep creating, we've got the tools available!
