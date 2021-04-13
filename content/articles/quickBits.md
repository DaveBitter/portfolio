---
items:
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
