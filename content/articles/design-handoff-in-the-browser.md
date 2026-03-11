---
type: articles
date: 2021-02-17T00:00:00.000Z
slug: design-handoff-in-the-browser
tags:
  - front-end
  - design
intro: >-
  I strongly believe in the concept of leveraging design handoff in the browser.
  I noticed many benefits for me as a front-end developer and the designers I
  work with using this approach. In this blog post, you will find out why you
  should design in the browser, how it works and how to start
teaserCopy: >-
  I strongly believe in the concept of leveraging design handoff in the browser.
  I noticed many benefits for me as a front-end developer and the designers I
  work with using this approach. In this blog post, you will find out why you
  should design in the browser, how it works and how to start
teaserImage: /img/articles/design-handoff-browser.jpg
title: Design handoff in the browser
---
## The problem with waterfall

![Interaction design (ID), visual design (VD) and front-end development (FED) working with a waterfall approach](/img/articles/design-front-end-development-waterfall.png)*Interaction design (ID), visual design (VD) and front-end development (FED) working with a waterfall approach*

A traditional way of collaboration between visual design, interaction design and front-end development is the waterfall technique with a review moment. Visual and interaction designers work together to produce a static design. Front-end developers translate this design into interactive components. At the end of this process, there's a moment to review the implementation by all parties.

The problem with this approach is that design and front-end development produce output for vastly different mediums. Often, designs are made in tools like Sketch, Figma or the Adobe suite. The tool outputs static images. For front-end development, the output is for a virtually unlimited variation in mediums. There are functionalities in these design tools to create interactive designs, but they don't offer the vast range of devices, browsers, screen sizes and other factors.

> In front-end development there is no one-size-fits-all

This causes issues when a design is made for a limited number of these variations (usually being a mobile, tablet and desktop viewport). Design issues or potential opportunities arise late in the production cycle. I often see that the time and capabilities to resolve these are limited at this stage. Most of these issues can be prevented by not just leveraging design handoff in the browser, but changing the approach to how design and front-end development work together.

## Several stages of design and development collaboration

![Interaction design (ID), visual design (VD) and front-end development (FED) working together in different stages of producing components](/img/articles/design-front-end-development-fluid.png)*Interaction design (ID), visual design (VD) and front-end development (FED) working together in different stages of producing components*

Front-end development at my company Mirabeau, a Cognizant Digital Business, is in the same unit as visual design and interaction design. This structure has been set up for tight collaboration between these disciplines. In projects as a front-end developer, I've identified six major stages where design and front-end development can take advantage of each other's view, experience and skillset.

### 1. Concepting

During the concepting phase, design often works with stakeholders and users to identify what the problem is and how they can solve it. Even though there isn't a line of code being written yet, this is where front-end development can help in identifying issues early on and, perhaps even more important, suggesting potential opportunities. For example, there is an ask for an incredibly important alert component. Did you know that on some mobile browsers you can use the phone's vibration to give haptic feedback? By involving front-end development in the concepting phase, these kinds of opportunities can contribute to a better solution for the user.

### 2. Design production

After this front-end development can assist design during the actual production phase. A tight collaboration in this phase adds a lot of value by having a back-and-forth between disciplines. Design can actively seek input from front-end development when taking the solution from concept to an actual design that will be implemented. Due to diversity in view, experience and skillset, both design and front-end development push each other to see problems through different eyes. This always leads to a better thought-out and considered result.

### 3. Design review

Once the design production is done, there is a moment for front-end development to do a final review. Design and front-end development go over the proposed solution, see if everything is clear and whether there are still improvements to be made. For example, front-end builds in reusable components and sizings. Does the proposed design suddenly use vastly different sizings? Is there really the need for a new kind of dropdown component? These questions can be asked to ensure consistency, preventing reinventing the wheel and more.

### 4. Browser handoff

Next, front-end development builds the design. This is where the most vital part of the approach lies. There is no way you can predict and prevent all potential issues you will encounter. With real content or data, the fluidity of the web and different context in which design is used you're bound to find problems. For example, a narrow component with a welcome message does not fit on an in-between screen size due to a longer name. During the design phase, two things weren't accounted for. First, a design was made for mobile and tablet. What about right in between? Second, during the design phase, the default persona was used with a name eight characters long. With production users, there can be a wide range of lengths of users' names.

Luckily, design and front-end development have been working tightly together online or in person. They work together in the browser to identify the specifics of the issue, brainstorm options and build the solution in the browser together. The disciplines come up with the solution together when there is an unusually long name. There is no need to update all the actual designs. In the end, we all work together to build for the web. Our single source of truth lives there and this is where we collaboratively craft our final version.

### 5. Development review

After front-end completes their work, there is a final session between design and front-end development to dot the i's and cross the t's. I've noticed a lot of designers I worked with who are really appreciative of this moment. Together design and front-end development go over the final implementation. Are there some things that front-end development missed? Are there some things the design would like to alter based on the actual interactive product?

> Here's where we perfect our creation together

I've asked my colleague and interaction designer Virginia Rispoli what she thinks about browser handoff and the development review. Virginia loves that you can finally see the interactions and designs in action. This usually allows both design and front-end development to look at the ideas, features and components a bit more critically. To her, this is the moment where the superpowers and skills of design and front-end development come together. If both are open enough to discuss and rethink their ideas, the result is always better than the initial idea.

These points are further solidified by my colleague and visual designer Alexander Munz. He states that the advantages of design handoff in the browser are diverse. It’s a great opportunity to collaborate between development and design; seeing, feeling and anticipating behaviours on an iteration of the end-product offers the opportunity to discover, change and adapt quickly. Design handoff in the browser and collaboration offers the opportunity to learn from each other, create better solutions and do this a lot quicker then re-designing a static screen in your design tool of choice. The team saves time, which gives the client more value for their money and they can even be part of the fun if they choose to be.

### 6. Documentation

Lastly, we document our single source of truth. There's already a static design, so what's the point of documenting the component again? Besides developer-documentation on how to work with the component, we want to document the interactive component in a way where you can view it in all the contexts you'd like.

![Storybook showcasing a badge component](/img/articles/storybook.jpg)*Storybook showcasing a badge component*

A good solution for this is an interactive component showcase library, the best-known among them being [Storybook](https://storybook.js.org/). Storybook offers a flexible UI for both design and front-end development to not just view and interact with the components, but alter them as well. With the wide range of features and plugins you can dynamically change the content (e.g. change the name in a component to more characters), test different screen sizes and more. This fluid version of showcasing the design implemented in interactive components is most flexible.

Finally, documenting all existing interactive components and variations gives the team a place to reference. For example, design might check whether there's already a dropdown component, developers look up what variants they can use and copywriters can see what happens when they change certain labels.

## Get started in your team

Excited to try a similar approach? There are a few people you might want to open the discussion up to. First, open up the discussion with your design and front-end development team. Try to see if you ever ran into some of the issues I mentioned above. In my experience, design is often very open to more moments of working together with front-end development.

Second, you might work in a scrum team. Propose this new way of working together as design and front-end development to your project manager and scrum master. It might be a bit too much to completely overhaul the current workflow you have. Start with one new component. If it works, try it again and again.

Finally, you might have to persuade certain stakeholders. This will be on a case-by-case basis. Time, costs and resources however are an often-heared concern. You are asking for more time together to craft the best work possible. An immense benefit of this new approach is that you actually resolve many of these concerns. You tackle (potential) issues early on. This costs time at the start of the trajectory, but you earn this back by mitigating the surfacing of these issues at the end or even in production. You could use the components you build while trying out this workflow as examples to get them on board.

Try to see if this way of working works well for your team. This doesn't work for you? That's fine as well. The goal is to further improve cross-discipline collaboration and ensure you build your best work together!
