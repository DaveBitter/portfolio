---
items:
  - body: >-
      Full disclaimer, I came across this solution watching a 45-second video by Fireship on Youtube which you can watch [here]([https://www.youtube.com/watch?v=ITogH7lJTyE](https://www.youtube.com/watch?v=ITogH7lJTyE)). All credits to them. I'm a fan of reading these at my own pace, how impressive 45 seconds is though, so here it is in writing.

      ## The problem

      Let's use the following example:

      ```jsx

      const foo = async () => {
        const a = await bar();
        const b = await bar(a);
        const c = await bar(b);

        return a + b + c;
      };

      ```

      Not to bad right? Watch what happens if we introduce try-catch to handle errors:

      ```jsx

      const foo = async () => {
        let a;
        let b;
        let c;

        try {
          a = await bar();
        } catch (error) {
          handle(error);
        }

        try {
          b = await bar(a);
        } catch (error) {
          handle(error);
        }

        try {
          c = await bar(b);
        } catch (error) {
          handle(error);
        }

        return a + b + c;
      };

      ```

      Not so pretty now. You end up with, as Fireship calls it, the try-catch tower of terror. You can of course append the catch method to the each promise like so:

      ```jsx

      const foo = async () => {
        const a = await bar().catch(error => handle(error)); // or .catch(error)
        const b = await bar(a).catch(error => handle(error)); // or .catch(error)
        const c = await bar(b).catch(error => handle(error)); // or .catch(error)

        return a + b + c;
      };

      ```

      Yes this works, but there is still a lot of repetitive code which we ideally don't want. The solution is to write a helper function that implements one try catch that replaces the others:

      ```jsx

      const helper = async (param) => {
        try {
          const data = await bar(param);
          return [data, null];
        } catch (error) {
          return [null, error];
        }
      };

      ```

      We return an array that will contain either the data or the error. We can then use it like so:

      ```jsx

      const foo = async () => {
        const [dataA, errorA] = await helper();
        const [dataB, errorB] = await helper(dataA);
        const [dataC, errorC] = await helper(dataB);

        return a + b + c;
      }

      ```

      This is looking pretty clean. Now we can also easily handle an error with an if statement:

      ```jsx

      const foo = async () => {
        const [dataA, errorA] = await helper();

        if (errorA) {
        }

        const [dataB, errorB] = await helper(dataA);
        const [dataC, errorC] = await helper(dataB);

        return a + b + c;
      }

      ```

      That's it, thanks for reading!
    date: 2021-10-14T00:00:00.000Z
    slug: avoid-the-async-await-try-catch-hell
    tags:
      - es6
    intro: >-
      Remember the old callback hell we used to deal with? Luckily, we can circumvent this nowadays with the use of Async Await. Unfortunately, this can introduce a new Async Await try-catch hell. Here's the solution on how to fix this.
    teaserCopy: >-
      Remember the old callback hell we used to deal with? Luckily, we can circumvent this nowadays with the use of Async Await. Unfortunately, this can introduce a new Async Await try-catch hell. Here's the solution on how to fix this.
    teaserImage: /img/quick-bits/js.png
    title: Avoid the Async Await try-catch hell
  - body: >-
      ## My problem with classes

      We've all written/seen classes for adding some different states to an HTML element. A generic example with pseudo-code is the something like this:

      ```html

      <li class="list-item">List item</li>

      <li class="list-item">List item</li>

      <li class="list-item active">Active List item</li>

      <li class="list-item">List item</li>

      <li class="list-item">List item</li>

      ```

      ```css

      li.active {
        background-color: #dbdbdb;
      }

      ```

      ```js

      const activeItem = document.querySelector('.list-item.active');


      doSomething(activeItem);

      ```

      My first issue is with using classes as JS selectors is that I have to update my JS code as soon as I alter some classes while refactoring my HTML and CSS. In this example, that's not a big deal but in larger codebases, with more complex components and multiple team members, it can become a bit of a hassle. The Javascript is too tightly coupled to these classes which were meant to be for styling the HTML elements. I want to have my CSS and JS selectors separated.


      My second issue is that there is only one value you can add to the HTML element ("active"). Implicitly, we're saying that if there is no "active" class, the styles of "inactive" should be applied. You could circumvent this by adding an "inactive" class to the HTML element, but that would mean that, technically, both classes could be applied at the same time. This can cause some styling issues you don't want. Now, this is with just active or not, but what if you have multiple states. A status component could have "success", "warning", "error", "info" and more.

      ## Data attributes to the rescue!

      Let's refactor the above component to use data attributes instead:

      ```html

      <li class="list-item">List item</li>

      <li class="list-item">List item</li>

      <li class="list-item" data-active="true">Active List item</li>

      <li class="list-item">List item</li>

      <li class="list-item">List item</li>

      ```

      ```css

      li[data-active='true'] {
        background-color: #dbdbdb;
      }

      ```

      ```js

      const activeItem = document.querySelector('.list-item[data-active="true"]');


      doSomething(activeItem);

      ```

      As you can see, it's not all that different, but we get some really nice benefits. Firstly, there is a clear separation of concerns. My HTML has some classes that my CSS uses to style the list item. The data attribute shows the state of the HTML element and can be used to add the stateful styles. I am now free to change my classes in the HTML and CSS without having to worry that any of my JS breaks. Naturally, you would still have to keep an eye out for changes in the data attribute.


      Secondly, there is now an explicit descriptive singular state the list item can be in. It's either active or not, true or false. This prevents some of the potential bugs I mentioned earlier with the status component example.


      Thirdly, we get a nice added bonus. We can easily get all the key-value pairs out of the HTML element by calling the `dataset` property on the DOM Node:

      ```html

      <li class="list-item" data-status="success">List item</li>

      <li class="list-item" data-status="warning">List item</li>

      <li class="list-item" data-status="warning" data-active="true">Active List item</li>

      <li class="list-item" data-status="error">List item</li>

      <li class="list-item" data-status="error">List item</li>

      ```

      ```css

      li[data-active='true'] {
        background-color: #dbdbdb;
      }

      ```

      ```js

      const doSomething = (node) => {
        console.log(node.dataset); // { active: "true", status: "warning" }

        switch (node.dataset.status) {
          case "warning":
              doSomethingElse()
              break;
          default:
              break;
        }
      };


      const activeItem = document.querySelector('.list-item[data-active="true"]');


      doSomething(activeItem);

      ```

      This is great if you have further data attributes like "status" in this example. If these were classes, it would be more cumbersome to do the same.

      ## Final thoughts

      This way of working has always been great for me to separate information needed in JS in a declarative manner and ensuring I can easily refactor components. Maybe try it out in your next side-project and let me know if this works for you as well. Thanks for reading!
    date: 2021-06-30T00:00:00.000Z
    slug: declarative-data-attributes-over-classes
    tags:
      - es6
    intro: >-
      I always use data attributes over classes to query declarative elements in my JS code for a few reasons. Here's why.
    teaserCopy: >-
      I always use data attributes over classes to query declarative elements in my JS code for a few reasons. Here's why.
    teaserImage: /img/quick-bits/js.png
    title: Why I use data attributes over classes for declarative element states
  - body: >-
      The nullish coalescing operator is a short-circuiting operator you can use to provide an alternative for a left-hand side operand by writing `??`. You might already have used `&&` or `||` before. So how is this different?  Let's take the following examples:

      ```jsx

      const a = '' || 'unknown' // results in 'a' being 'unknown'

      const b = 0 || 'unknown' // results in 'b' being 'unknown'

      const c = false || 'unknown' // results in 'c' being 'unknown'

      const d = NaN || 'unknown' // results in 'd' being 'unknown'

      ```

      This is because `''`, `0`, `false` and `NaN` are falsey values. The nullish coalescing operator however will only return the right-hand side operand if the left-hand side operand is either `null` or `undefined`.

      ## Practical example

      Let's say you want to display `unknown` if somebody's amount of points is not known (arbitrary React.js sample code):

      ```jsx

      const person = {
          name: 'Roberta Woods',
          email: 'roberta.woods@example.com',
          location: 'California',
          points: 0
      };


      return <dl>
          <dt>Name</dt>
          <dd>{person.name || 'unknown'}</dd>

          <dt>Email</dt>
          <dd>{person.email || 'unknown'}</dd>

          <dt>Location</dt>
          <dd>{person.location || 'unknown'}</dd>

          <dt>Points</dt>
          <dd>{person.points || 'unknown'}</dd>
      </dl>;

      ```

      In this case, `points` will display `unknown` which isn't right. We know the number of points, it's `0`. Previously, a fix would have been to also check if `points` is `0` or a number in general and then display that. By using the nullish coalescing operator we can keep our code clean and simple:

      ```jsx

      const person = {
          name: 'Roberta Woods',
          email: 'roberta.woods@example.com',
          location: 'California',
          points: 0
      };


      return return <dl>
          <dt>Name</dt>
          <dd>{person.name || 'unknown'}</dd>

          <dt>Email</dt>
          <dd>{person.email || 'unknown'}</dd>

          <dt>Location</dt>
          <dd>{person.location || 'unknown'}</dd>

          <dt>Points</dt>
          <dd>{person.points ?? 'unknown'}</dd>
      </dl>;

      ```

      That's it! I won't bother you with a bunch of other examples. This feature is one of those additions that you will probably find helpful in a variety of code you write and need to check for values. As always, thanks for reading!
    date: 2021-04-26T00:00:00.000Z
    slug: nullish-coalescing
    tags:
      - es6
    intro: >-
      One of my favourite features which were added in ES2020 is nullish coalescing. Despite its difficult pronunciation, this feature is a simple way of checking for falsey values. Let's have a look.
    teaserCopy: >-
      One of my favourite features which were added in ES2020 is nullish coalescing. Despite its difficult pronunciation, this feature is a simple way of checking for falsey values. Let's have a look.
    teaserImage: /img/quick-bits/js.png
    title: Nullish Coalescing (try to say it quickly ten times)
  - body: >-
      ## A real-world use case

      For one of the [Next.js]([https://nextjs.org/](https://nextjs.org/)) projects I was working on, I needed to add an asset prefix to the configuration if the [Node]([https://nodejs.org/en/](https://nodejs.org/en/)) environment wasn't "development". The first thing you might think of is to create a configuration object, write an if-statement and add a key to the configuration object if the statement is true. This would look something like this:

      ```js

      require('dotenv').config();


      const nextConfig = {
          poweredByHeader: false
      };


      if (process.env.NODE_ENV !== 'development' {
          nextConfig.assetPrefix = 'example.website';
      }


      export default nextConfig

      ```

      In essence, we want to export an object with a few keys, one of which is optional. This is quite a bit of lines to do just that. I needed to declare a variable called `nextConfig` to optionally add a key to and then export it. This got me wondering if there is an easier way.

      ## The solution

      The solution is quite elegant I think. This is what I came up with:

      ```js

      require('dotenv').config();


      export default {
          poweredByHeader: false,
          ...(process.env.NODE_ENV !== 'development' && { assetPrefix: 'example.website' }),
      };

      ```

      It might be a small decrease in lines of code, but imagine having multiple of these optional keys. In the first example, this would turn into quite a big file.


      So Dave, why does this work? There are two parts to the solution. Firstly, I use the [Spread syntax]([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)) to take all the keys from an object and add to to the configuration object like so:


      ```js

      require('dotenv').config();


      export default {
          poweredByHeader: false,
          ...{ assetPrefix: 'example.website' }
      };


      // result: { poweredByHeader: false, assetPrefix: 'example.website' }

      ```

      I then add the statement to check whether the Node environment is "development" using `&&`. If it is not, it will try the spread the value `false` in the object. That falsey value will be omitted from the configuration object. This way it will optionally add the key to the configuration object.


      There we have it, We have a sweet one-liner to optionally add a key to an object. Thanks for reading!
    date: 2021-04-13T00:00:00.000Z
    slug: opionally-add-key-to-object-one-line
    tags:
      - es6
    intro: >-
      I sometimes need to optionally add a key to an object based on a statement. This can easily be done with a few lines of code, but where's the fun in that? How can I do this as clean as possible?
    teaserCopy: >-
      I sometimes need to optionally add a key to an object based on a statement. This can easily be done with a few lines of code, but where's the fun in that? How can I do this as clean as possible?
    teaserImage: /img/quick-bits/js.png
    title: Optionally add a key to an object in one line
  - body: >-
      You start by creating a public repository with the same name as your GitHub username. In my case, I create a repository called "DaveBitter". In that repository, you add a `README.md`. That's it. From here on you can use MarkDown to tell more about yourself, highlight skills, share social media links and anything you can think of. The README will now be used to display this content on your GitHub profile.


      ![My GitHub profile README](/img/articles/github-profile-readme.jpg)*My GitHub profile README*


      As you can see, my README is fairly brief, but it does allow me to tell a bit more about myself, share a link to my articles and plug some social media channels. As always, some developers take full advantage and push for the limit. A collection with several of these examples can be found in [this collection repository](https://github.com/abhisheknaiidu/awesome-github-profile-readme).


      The biggest reason I like this feature is how it converts a "dry" profile page into a more human and personal page. Looking at some of the above-linked examples makes me reminiscent of pages on an old and retired Dutch social media platform called Hyves.


      That's all. Make sure to add one of these README files to make the web more personalized, fun and awesome!
    date: 2020-09-16T00:00:00.000Z
    slug: github-profile-readme
    tags:
      - git-hub
    intro: >-
      GitHub profiles always seemed a bit impersonal to me. Generally, you would pin some repositories and give some information like employer, location and website. To give developers more control, GitHub released the possibility for a profile README. Let's have a quick look.
    teaserCopy: >-
      GitHub profiles always seemed a bit impersonal to me. Generally, you would pin some repositories and give some information like employer, location and website. To give developers more control, GitHub released the possibility for a profile README. Let's have a quick look.
    teaserImage: /img/articles/github-profile-readme.jpg
    title: GitHub profile README
  - body: >-
        ## The old way

        I used to start new projects in three different ways:

        * Fork another repository that fits the needs and remove what is not needed

        * Fork a boilerplate repository

        * Create a new repository and copy files from another local repository


        These three do the trick but come with issues. Firstly, I don't want to fork or copy files from another repository to then remove what is not needed. Secondly, I don't want to for another repository and then squash the entire history and/or remove all branches besides the main one.

        ## The new way

        Luckily, the folks over at GitHub recognize these issues and provide a solution: GitHub template repositories. So, how is this different from having a boilerplate repository? Well, they offer:

        * A new fork includes the entire commit history of the parent repository, while a repository created from a template starts with a single commit.

        * Commits to a fork don't appear in your contributions graph, while commits to a repository created from a template do appear in your contribution graph.

        * A fork can be a temporary way to contribute code to an existing project while creating a repository from a template starts a new project quickly.


        ## This is how I use it

        I started off with creating a boilerplate repository. My boilerplate repository, among other things, consists of:


        * React.js

        * Next.js

        * TypeScript

        * Jest

        * Enzyme

        * Storybook

        * Husky

        * ESLint

        * StyleLint

        * LintStaged

        * Basic styles

        * Basic utilities


        You see why I want to have all of this quickly for a project.

        ![The Next Boilerplate repository](/img/articles/next-boilerplate-repository.png)*The Next Boilerplate repository*


        Next, I went over to the settings of this repository and enabled 'Template repository'.

        ![The Next Boilerplate settings](/img/articles/next-boilerplate-settings.png)*The Next Boilerplate settings*

        That was all the setup that is required. Whenever I want to start a new project with this repository I go to the Next Boilerplate and click the green button saying 'Use this template'.

        I then have the option to:

        * Create a new repository and name it

        * Give a description

        * Make it public or private

        * Include all branches


        ![The Next Boilerplate template](/img/articles/next-boilerplate-template.png)*The Next Boilerplate template*


        After clicking 'Create repository from template' I have a new repository with all the files, non of the history or branches and start creating right away.

        Please head over to [GitHub](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to learn more.

    date: 2020-06-18T00:00:00.000Z
    slug: github-template-repositories
    tags:
      - git-hub
    intro: >-
      I tend to do a lot of side projects. I like to try out and explore instead of just reading about something. This leads to quite a few public and private repositories on my GitHub (at the time of writing ~80). Most of these never see the light of day, but still require a project set up to get started. Next to that, I start quite a few actual projects as well. I like to have a few things like frameworks, linting, testing etc. setup. Let's have a look at making this a breeze with GitHub template repositories.
    teaserCopy: >-
      Let's have a quick look at GitHub Template repositores. We'll go over the why and the how with a practical example.
    teaserImage: /img/articles/next-boilerplate-repository.png
    title: Using template repositories with GitHub

  - body: >-
        The backdrop-filter property lets you apply graphical effects such as blurring or colour shifting to the area behind an element. Because it applies to everything behind the element, to see the effect you must make the element or its background at least partially transparent.

        This introduces a new tool to progressively enhance your website or web -application.  [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) has a list of all the values you can set. Today, we will take a look at one that my co-worker and CSS wizard [Syb Wartna](https://waarissyb.nl/) and I recently used in a project. This value is blur-filter.

        We made a sidebar that would reveal more information after clicking on an item. It was sort of like a modal. For the past few years, there has been one technique that everybody would use. The backdrop, or overlay, would have a slightly transparent, solid, grey colour. Let’s enhance this using the new backdrop-filter!

        For this example, we are going to build a simple modal. First, we’ll create the version that just displays a backdrop:

        ```scss

            ...

            &[data-overlay='true'] {
                &:after {
                    content: '';
                    z-index: 101;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-color: rgba($navy, 0.4);
                }
            }

            ...

        ```

        ![default backdrop](/img/quick-bits/backdrop-default.jpg)*Default backdrop*

        Then we add one simple CSS property.

        ```scss

            ...

            &[data-overlay='true'] {
                &:after {
                    content: '';
                    z-index: 101;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-color: rgba($navy, 0.4);
                    backdrop-filter: blur(2px);
                }
            }

            ...

        ```

        ![blurry backdrop](/img/quick-bits/backdrop-blur.jpg)*Blurry backdrop*


        And there we have it. It’s a simple way to quickly enhance the feel of your website or web-application. Just add this property below your default slightly transparent backdrop and you will offer this style as soon as it hits in the browser your user is using. Obviously, this effect is more dramatic with a less empty page. [View the demo here](/examples/backdrop-filter/modal/modal.html). This demo was built with the [Mirabeau boilerplate](https://github.com/mirabeau-nl/frontend-boilerplate). The source code for this demo can be found at [this Gist](https://gist.github.com/DaveBitter/dd0cc612ce87bd6f69fc379b101b9265) if you would like to have a look at the final working code.

    date: 2019-03-01T00:00:00.000Z
    slug: backdrop-filter
    tags:
      - prototype
      - progressive-enhancement
    intro: >-
      The backdrop-filter property is one of the most useful new, at the time of writing, CSS properties that are landing in major browsers. It will allow you to set a custom backdrop-filter on a div. This is not to be mistaken for the CSS filter property.
    teaserCopy: >-
      The backdrop-filter property is one of the most useful new, at the time of writing, CSS properties that are landing in major browsers. It will allow you to set a custom backdrop-filter on a div. This is not to be mistaken for the CSS filter property.
    teaserImage: /img/articles.jpg
    title: Backdrop Filter
---
