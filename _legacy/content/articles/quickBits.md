---
items:
  - type: quick-bits
    body: >-
      ## How does the `rem` unit work again?

      In CSS, the `rem` unit is a relative unit that is based on the root element (`html` element) font size. The `rem` unit is useful because it allows you to specify sizes that are relative to the root element font size, rather than specifying sizes in absolute units like `px` or `pt`.


      For example, if you set the root element font size to `16px`, and then specify that an element should have a font size of `2rem`, the element's font size will be `32px` (`2 * 16px`).


      You can use the `rem` unit to specify sizes for various CSS properties, including font size, margin, padding, and more. It is particularly useful when you want to create a responsive design that adjusts to the user's device or screen size because you can use the `rem` unit to specify sizes that are relative to the root element font size.


      The `rem` unit can also be used in media queries to specify the width of a viewport or other element in relation to the root element (`html`). For example, the following media query will apply the styles within it when the viewport is at least `20rem` wide:

      ```css

      @media (min-width: 20rem) {
        /* Styles go here */
      }

      ```

      ## There is a major gotcha!

      Even though you can set a custom font size on the root element like this:

      ```css

      html {
        font-size: 15px;
      }

      ```

      It will not always be respected by the browser. Yes, when using a `rem` unit for things like padding, margin, font size and more, it will use the `15px`. For example, this code will set a padding of `30px`:

      ```css

      .some-element {
        padding: 2rem; // 30px
      }

      ```

      It can’t be used for media queries. You would expect this media query to kick in at a screen width of `300px` (or `20rem` as `20 * 15 = 300`), but it won’t.

      ```css

      @media (min-width: 20rem) {
        /* Styles go here */
      }

      ```

      It will actually be applied on a screen width of `320px`. A sharp eye will see that it uses `16px` as the root element font-size even though we specifically set it to `15px`.

      > When using `rem` units in media queries, it will not respect your custom set root element font size, but the browser default of `16px`.

      ## Why does it do this?

      My colleague and I had quite a few headscratchers before figuring this out. We dove into the CSS specifications and came across [this section](https://www.w3.org/TR/css-values-3/#rem):


      *When used outside the context of an element (such as in [media queries](https://www.w3.org/TR/mediaqueries-5/#media-query)), these units refer to the computed font metrics corresponding to the initial values of the [font](https://www.w3.org/TR/css-fonts-4/#propdef-font) property. When used in the value of the [font-size](https://www.w3.org/TR/css-fonts-4/#propdef-font-size) property on the element they refer to, these units refer to the computed font metrics of the parent element (or the computed font metrics corresponding to the initial values of the font property, if the element has no parent).*


      So in other words, the value being used for `rem` units will be the browser standard (e.g. `16px`) instead of your custom set `15px`.


      Keep this in mind the next time you run into issues using `rem` units in media queries. Thanks for reading and see you next time!
    date: 2022-12-19T00:00:00.000Z
    slug: rem-unit-media-queries
    tags:
      - front-end
    intro: >-
      Confused about why your rem units aren't behaving in media queries? Find out the reason behind this unexpected behaviour and learn more about using rem units in responsive design in this article.
    teaserCopy: >-
      Confused about why your rem units aren't behaving in media queries? Find out the reason behind this unexpected behaviour and learn more about using rem units in responsive design in this article.
    teaserImage: /img/quick-bits/match-media-hero.jpg
    title: The unexpected behaviour of rem units in media queries
  - type: quick-bits
    body: >-
      ## What’s wrong with listening for the resize event?

      Nothing really, it does the job. This has been the way for years now. There is a downside that comes with this solution, though. Let’s say you have four breakpoints:

      * `sm` with a maximum width of 767 pixels

      * `md` with a minimum width of 768 pixels

      * `lg` with a minimum width of 1024 pixels

      * `xl` with a minimum width of 1200 pixels


      You’re only really interested in these four pixel values. However, when listening to the resize event, you’ll get an update for every pixel value in between as well. Let's say you are implementing a utility for your [React.js](https://reactjs.org) project to offer this. [A custom React.js hook](https://reactjs.org/docs/hooks-custom.html) you can write will probably look a bit like this:


      ```jsx

      import { useEffect, useState } from 'react';


      type ViewportBreakpoint = 'sm' | 'md' | 'lg' | 'xl';


      const useViewportBreakpoint = () => {
        const [
          viewportBreakpoint,
          setViewportBreakpoint,
        ] = useState<ViewportBreakpoint>('sm');

        useEffect(() => {
          const onResize = () => {
            if (window.innerWidth < 768) {
              setViewportBreakpoint('sm');
              return;
            }

            if (window.innerWidth < 1024) {
              setViewportBreakpoint('md');
              return;
            }

            if (window.innerWidth < 1200) {
              setViewportBreakpoint('lg');
              return;
            }

            setViewportBreakpoint('xl');
          };

          window.addEventListener('resize', onResize);
          onResize();

          return () => window.removeEventListener('resize', onResize);
        }, []);

        return viewportBreakpoint;
      };


      export default useViewportBreakpoint;


      ```


      Sure, you could use [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to optimize this a bit further, but inherently you’re going to receive far more updates than you actually need.

      ## Cool, so how does matchMedia fix that?

      On the window object, you’ll find a method called [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). With this method, you can listen for a media query, just like in CSS, to respond to. The basic usage looks like this:


      ```jsx

      const mql = window.matchMedia('(min-width: 768px)');


      const handleQueryChange = ({ matches }) => {
        console.log(matches); // true or false
      };


      mql.addEventListener('change', handleQueryChange);

      ```


      That’s it! Every time the viewport passed 768 pixels, you’ll receive an update. You can then handle your business logic based on whether the media query is met.

      ## Let’s make a custom hook!

      Now, let’s take the above principle and create a custom hook that will support all four of the viewport breakpoints:


      ```jsx

      import { useEffect, useState } from 'react';


      type ViewportBreakpoint = 'sm' | 'md' | 'lg' | 'xl';


      const useViewportBreakpoint = () => {
        const [
          viewportBreakpoint,
          setViewportBreakpoint,
        ] = useState<ViewportBreakpoint>('sm');

        useEffect(() => {
          const smQuery = window.matchMedia('(max-width: 767px)');
          const mdQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
          const lgQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1199px)');
          const xlQuery = window.matchMedia('(min-width: 1200px)');

          const handleSmQueryChange = ({matches} : {matches: boolean}) => matches && setViewportBreakpoint('sm');
          const handleMdQueryChange = ({matches} : {matches: boolean}) => matches && setViewportBreakpoint('md');
          const handleLgQueryChange = ({matches} : {matches: boolean}) => matches && setViewportBreakpoint('lg');
          const handleXlQueryChange = ({matches} : {matches: boolean}) => matches && setViewportBreakpoint('xl');

          smQuery.addEventListener('change', handleSmQueryChange);
          mdQuery.addEventListener('change', handleMdQueryChange);
          lgQuery.addEventListener('change', handleLgQueryChange);
          xlQuery.addEventListener('change', handleXlQueryChange);

          handleSmQueryChange({matches: smQuery.matches});
          handleMdQueryChange({matches: mdQuery.matches});
          handleLgQueryChange({matches: lgQuery.matches});
          handleXlQueryChange({matches: xlQuery.matches});

          return () => {
              smQuery.removeEventListener('change', handleSmQueryChange);
              mdQuery.removeEventListener('change', handleMdQueryChange);
              lgQuery.removeEventListener('change', handleLgQueryChange);
              xlQuery.removeEventListener('change', handleXlQueryChange);
          };
        }, []);

        return viewportBreakpoint;
      };


      export default useViewportBreakpoint;

      ```


      Wow! Quite a bit of boilerplate. As you can only listen for on media query, you’ll have to quadruple the code. Before we optimize this, let’s have a look at the different parts.


      Firstly, you now have to set a minimum and maximum width for the different media queries. Previously, you could bail out as soon as a viewport was matched. As these are all different events, they will all trigger. This can cause multiple media queries to match. By adding maximum widths, you can circumvent this.


      Secondly, the callback function when a change event is detected does receive the media query it matched against, but we then have to map which `ViewportBreakpoint` it belongs to. If you don’t want to add this complexity, you have to create four separate callbacks.


      Finally, as you have to add four event listeners, you have to remove four of them as well. This is a bit annoying.

      ### Time to refactor

      Firstly, you could refactor the callback to a single one and check each media query to conditionally set the value for the active viewport breakpoint:


      ```jsx

      import { useEffect, useState } from 'react';

      type ViewportBreakpoint = 'sm' | 'md' | 'lg' | 'xl';

      const useViewportBreakpoint = () => {
        const [
          viewportBreakpoint,
          setViewportBreakpoint,
        ] = useState<ViewportBreakpoint>('sm');

        useEffect(() => {
          const smQuery = window.matchMedia('(max-width: 767px)');
          const mdQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
          const lgQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1199px)');
          const xlQuery = window.matchMedia('(min-width: 1200px)');

          const checkMatch = () => {
              smQuery.matches && setViewportBreakpoint('sm');
              mdQuery.matches && setViewportBreakpoint('md');
              lgQuery.matches && setViewportBreakpoint('lg');
              xlQuery.matches && setViewportBreakpoint('xl');
          };

          smQuery.addEventListener('change', checkMatch);
          mdQuery.addEventListener('change', checkMatch);
          lgQuery.addEventListener('change', checkMatch);
          xlQuery.addEventListener('change', checkMatch);
          checkMatch();

          return () => {
              smQuery.removeEventListener('change', checkMatch);
              mdQuery.removeEventListener('change', checkMatch);
              lgQuery.removeEventListener('change', checkMatch);
              xlQuery.removeEventListener('change', checkMatch);
          };
        }, []);

        return viewportBreakpoint;
      };


      export default useViewportBreakpoint;

      ```


      This works because you added the maximum widths. Only one will ever match and update the state of the viewport breakpoint.


      This does still feel a bit repetitive, though. How can you make this more [DRY](https://www.digitalocean.com/community/tutorials/what-is-dry-development)? Let’s create an array with multiple viewport breakpoints and their media query. You can then loop over this array and execute the logic:


      ```jsx

      import { useEffect, useState } from 'react';


      type ViewportBreakpoint = 'sm' | 'md' | 'lg' | 'xl';

      type ViewportBreakpointConfig = {
          size: ViewportBreakpoint;
          mql: MediaQueryList;
      };


      const useViewportBreakpoint = () => {
        const [
          viewportBreakpoint,
          setViewportBreakpoint,
        ] = useState<ViewportBreakpoint>('sm');

        useEffect(() => {
          const mqls: ViewportBreakpointConfig[] = [
              { size: 'sm', mql: window.matchMedia('(max-width: 767px)') },
              { size: 'md', mql: window.matchMedia('(min-width: 768px) and (max-width: 1023px)') },
              { size: 'lg', mql: window.matchMedia('(min-width: 1024px) and (max-width: 1199px)') },
              { size: 'xl', mql: window.matchMedia('(min-width: 1200px)') }
          ];

          const checkMatch = () => mqls.forEach(({size, mql}) => mql.matches && setViewportBreakpoint(size));

          mqls.forEach((({mql}) => mql.addEventListener('change', checkMatch)));
          checkMatch();

          return () => {
              mqls.forEach((({mql}) => mql.removeEventListener('change', checkMatch)));
          };
        }, []);

        return viewportBreakpoint;
      };


      export default useViewportBreakpoint;

      ```


      There you have it! You can now use this custom hook in your React.js application to execute viewport-based logic.

      ## Final thoughts

      Once in a while, you get surprised about a better way of doing something you’ve been doing the same for years. So, is this a new technique? Well, quite the opposite! The support for matchMedia is great:

      <picture>
          <source type="image/webp" srcSet="https://caniuse.bitsofco.de/image/matchmedia.webp" />
          <source type="image/png" srcSet="https://caniuse.bitsofco.de/image/matchmedia.png" />
          <img src="https://caniuse.bitsofco.de/image/matchmedia.jpg" alt="Data on support for the matchmedia feature across the major browsers from caniuse.com" />
      </picture>

      The next time you have to create a similar utility, try matchMedia out!

    date: 2022-09-16T00:00:00.000Z
    slug: match-media
    tags:
      - front-end
    intro: >-
      Unfortunately, sometimes you need to write viewport-based logic in your JavaScript code. Usually, this is done with a listener on the window for a resize. Let’s look at a better way.
    teaserCopy: >-
      Unfortunately, sometimes you need to write viewport-based logic in your JavaScript code. Usually, this is done with a listener on the window for a resize. Let’s look at a better way.
    teaserImage: /img/quick-bits/match-media-hero.jpg
    title: How to use matchMedia to create a performant custom viewport hook
  - type: quick-bits
    body: >-
      As a reference, the mono-repo might look something like this:

      ```

      packages/

      ├── foo-pkg

      │   └── package.json

      ├── bar-pkg

      │   └── package.json

      ├── baz-pkg

      │   └── package.json

      └── qux-pkg
          └── package.json


      ```

      In its essence, [Manypkg](https://github.com/Thinkmill/manypkg) is a linter for `package.json` files in Yarn, Bolt or pnpm mono-repos. You can use it to automate these chores. Simply run `yarn add @manypkg/cli` and you can run the following commands in your pre-commit hooks and pipelines:

      ## `manypkg check`

      I use this to check whether all `package.json` files are alphabetically sorted, there are internal and external mismatches between packages, there are invalid dev and peer dependency relationships, invalid package names and more. You can have a look at the checks [here](https://github.com/Thinkmill/manypkg#checks).

      ## `manypkg fix`

      This will run the check and try to automatically resolve the issues it finds. Usually, it’s a wise idea to run this command in your pre-commit hook. That way, your pipeline won’t fail mid-way because of a minor issue.

      ## `manypkg run <partial package name or directory> <script>`

      With this command, you can run a script in a `package.json` file of a particular package in the mono-repo. Let’s say you have a package that has a script that runs a test for that package. You can then run `manypkg run your-package some-tests`.

      ## `manypkg exec <cli command>`

      This will let you run a CLI command in each of the packages. For example, you can run `yarn manypkg exec rm -rf dist` to remove the dist folder in every package in the mono-repo.

      ## Verdict

      Although the latter two are nice to have, the check and fix commands are vital in any mono-repo to me. It not only helps me but gives me peace of mind that a large group of developers can work on the mono-repo and we have checks and tools in place to make sure that dependencies are properly checked and fixed.

      Since introducing this into a project I work on, we managed to easily keep everything up-to-date across the mono-repo.

      Try it out in your project! You’ll see that it makes your life way easier.
    date: 2022-06-01T00:00:00.000Z
    slug: manypkg
    tags:
      - front-end
    intro: >-
      When building a component library as a mono-repo, you need to keep internal and external dependencies up-to-date between packages. You could do this manually once in a while, but there is a better way. Let’s have a look at Manypkg!
    teaserCopy: >-
      When building a component library as a mono-repo, you need to keep internal and external dependencies up-to-date between packages. You could do this manually once in a while, but there is a better way. Let’s have a look at Manypkg!
    teaserImage: /img/quick-bits/mono-repo.jpg
    title: Keeping dependencies in sync in your mono-repo
  - type: quick-bits
    body: >-
      The idea is simple; the user scrolls. As soon as the user is over a certain threshold, you snap to the next item. We used to do this with Javascript to calculate when the user is over this threshold. We would then manually scroll to a certain position with a neat animation.


      Besides this code becoming complex, it relies heavily on Javascript (that needs to be loaded). Next to that, you'd need to take certain aspects into account like cancelling the scroll snap if the user changes scroll direction. It would be great if the browser can handle all of this for us. Luckily it can!

      ## CSS scroll snap

      [The CSS scroll snap API](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) offers this for the web. In essence, you need two things. A container that needs to be scrolled in and items to snap to. Firstly, you add the `scroll-snap-type` property to the container:


      ```css

      main {
        height: 100vh;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
      }

      ```


      `y` is the direction you want to snap to. In this example, we want to snap while the user is scrolling vertically. `mandatory` is one of the values you can use to always snap:


      *The visual viewport of this scroll container will rest on a snap point if it isn't currently scrolled. That means it snaps on that point when the scroll action finished, if possible. If content is added, moved, deleted or resized the scroll offset will be adjusted to maintain the resting on that snap point.*


      Next, we can tell the items where we would like to align the scroll snapping to. You can do this by using the `scroll-snap-align` property on the item:


      ```css

      section {
        scroll-snap-align: center;
      }

      ```

      And that's it! This is all we need to implement scroll snapping with CSS only. Have a look at the interactive demo over at [Codepen](https://codepen.io/davebitter/full/oNeJQJw) or below. Thanks for reading!

      <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="oNeJQJw" data-user="davebitter" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
        <span>See the Pen <a href="https://codepen.io/davebitter/pen/oNeJQJw">
        Full-page scroll snap</a> by Dave Bitter (<a href="https://codepen.io/davebitter">@davebitter</a>)
        on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    date: 2021-11-18T00:00:00.000Z
    slug: css-scroll-snap
    tags:
      - front-end
    intro: >-
      Scroll snapping is a popular technique to focus on a single piece of information. How can we implement this without the need and complexity of Javascript-based solutions?
    teaserCopy: >-
      Scroll snapping is a popular technique to focus on a single piece of information. How can we implement this without the need and complexity of Javascript-based solutions?
    teaserImage: /img/quick-bits/scroll-snap.png
    title: Full page scroll snapping with CSS only
  - type: quick-bits
    body: >-
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
        const a = await bar().catch(error => handle(error)); // or .catch(handle)
        const b = await bar(a).catch(error => handle(error)); // or .catch(handle)
        const c = await bar(b).catch(error => handle(error)); // or .catch(handle)

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

        return dataA + dataB + dataC;
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

        return dataA + dataB + dataC;
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
  - type: quick-bits
    body: >-
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
  - type: quick-bits
    body: >-
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
  - type: quick-bits
    body: >-
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
  - type: quick-bits
    body: >-
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
  - type: quick-bits
    body: >-
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

  - type: quick-bits
    body: >-
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
