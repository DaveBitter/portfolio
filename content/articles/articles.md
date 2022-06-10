---
items:
  - type: articles
    body: >-
      * "Yeah, that was written two years ago... We need to rewrite that...”

      * "What were those developers thinking?”

      * "Ah, that's legacy code...”

        * "What? It's not even a few years old!”

      * "Let's write our own, that one is super complex and it's easier to make our own...”


      Then two years later, the same things are said about the new better solutions these developers made. The larger the projects, the more this seems to happen. Naturally, large projects can become quite complex and therefore the solutions can become quite complex. It does feel however that it's more the rule than an exception. Thinking about this, a couple of questions came to mind:

      * Why does this happen so often, so quickly?

      * How quickly does something become "legacy code”?

      * How can we prevent this for our development teams and own code?

      Now, I've got some ideas for my own on these questions, but what does the development world think is the reason for all of this.

      ## Time for research

      I have spoken to people in technology with a variety of skills, experience and roles. Time to find out how they think about these questions, what tips they have to prevent these issues and more.

      ### The startup mentality

      Whether you work at a small startup or a large corporation, there seems to be a common reason why unsustainable solutions are written. Often, the credo is to deliver early, deliver much and keep on getting funding/budget. Especially in front-end development, it's easy to fall into this trap. It's very easy to deliver quickly in front-end development with flashy UI and new features. Almost always this means you have to sacrifice some things. Scalability, documentation and sustainability are some of those things. It's hard to sell these to management who first need to see quick positive results before thinking about long-term consequences. A lot of temporary solutions are made to stay on track with the deadlines.


      ![I'll fix it later... he, in fact, did not fix it later...](/img/articles/fix-it-later.png)

      > Nothing is as permanent as a temporary solution.


      However hard it is, developers need to make time for this. It's naive to think you will get time for this (soon). Developers need to explain, and managers need to understand, that these things are part of building a product that can't be skipped over. If you do, you will create an instant debt that will have an interest.

      ### Relying fully on frameworks in a coupled way

      Front-end development is always mentioned in one breath with frameworks. The rise of frameworks in the past decade(s) has allowed the front-end world to evolve at a rapid pace. Developers can create state of the art user experiences with relatively low effort.


      A downside of these frameworks is that, more often than not, developers write their solutions in a very coupled way. Framework-specific logic is completely intertwined with non-framework-specific logic. This makes it hard to migrate to new (versions of) frameworks. By decoupling this logic into smaller modules you can encapsulate features into standalone features. This makes it easier to refactor small parts of your application without having to do a "big bang refactor”.

      ### ~~Getting~~ Making time

      It's incredibly hard to get time to refactor "legacy code”. There is often a communication gap between developers and their product owners/management. Naturally, it's easier to get time for a fancy new feature than to make "invisible” updates. This communication gap can lead to a lot of frustration. Both "sides” have to work on this, however.


      As a developer, you often fall into the trap of making your case to non-technical people with technical terms. For example, try explaining to a non-technical person that you need to refactor your global state manager to a new framework that makes it easier to persist state client- and serverside. These terms are not difficult for developers to understand, but if you are not a developer, they can sound like a foreign language.


      ![Making your manager fall asleep with technical terms](/img/articles/making-your-manager-fall-asleep.png)


      Instead, try to not just "dumb down” what you are explaining, but ask yourself if you need to explain it at all. A better way of communicating this to your manager is to explain the benefits for the users of their product. We need to use this new technique as it will allow us to remember choices the user made across different pages and moments in time. This way we can personalise the user experience and work on improving the conversion rate. You see, this turns it into an understandable story that clearly shows the business value.


      Both sides need to keep an eye on miscommunication due to technical terms. On the one hand, developers need to work on how they communicate desires, on the other hand, managers need to be vocal when a developer is not making any sense to them and ask for an understandable explanation.

      ### Having a process in place

      A big question is how seriously does your organisation take this? There's no denying that regular updates and refactors are vital to delivering a solid product. However, we do see that often the work and priority of this are heavily underestimated. There needs to be a process in place to ensure this won't get overlooked.


      Luckily, you can automate parts of this. It might be wise to set a standard in your organization and automate audits in your CI/CD to monitor with tools like dependa-bot. This way, problems become visible earlier on, are more tangible and you don't see them a year after your last check.


      Next to this, teams working with Scrum should make this part of their standard sprint. Update early, update often is one of the best things you can do as a team and organization. I've seen it so many times that teams postpone updating their applications to the latest versions of external and internal dependencies. You can postpone this all you want, but you're accumulating debt. This ends up with an update/refactor or rebuild discussion crippling any other work, like new features, that need to be built. You'd be surprised how many "legacy applications” can be prevented to rebuild if there was a process in place to keep them up to date.

      ### Really smart developers will cause issues

      It may seem like a counterintuitive statement, but a major downfall of very smart developers is that they may tend to build rather complex solutions. These solutions may even be unnecessarily complex, difficult to maintain and have no/little tests in place. The problem with these solutions is that, although they might work well and are very impressive, you run into trouble once these developers leave your organization. Suddenly, there are these overly complex solutions that are difficult to fully understand by other developers.


      Naturally, this can be countered with well-written documentation, knowledge transfers and similar solutions, but you will never fully understand how it works as the original developer did. There is an acronym that we like to use called K.I.S.S. (Keep It Simple Stupid). Although this may seem overly obvious, this credo is not followed in a lot of situations. It's actually quite hard to keep your solution simple and easy to understand. The extra time invested in this will be worth it in the long run as developers not using an existing solution because it's they can't grasp what it offers or how it works is such a shame. A new solution, maybe equally as complex, is written and the cycle continues.

      ## Front-end is in its infancy

      ![Two front-end developers walk into a bar. They've got nothing to talk about...](/img/articles/two-front-end-developers-walk-into-a-bar.png)


      I can go on and on about reasons for the _"The infinite legacy cycle in front-end”_ phenomenon, but it comes mostly down to a simple observation. Front-end is in its infancy compared to, for instance, Java and .NET by about 30 years. These platforms went through similar cycles and became more standardised and agreed upon over the years.

      ### We are not really focused on design patterns

      Naturally, we have design patterns in front-end, but we tend to have a lot. Front-end is susceptible to whatever a developer wants to do. Many different opinions on how we should do things. This leads to many discussions and frameworks implementing their own.


      Let's compare this to the back-end landscape. Some patterns are over 60 years old! These patterns work, stood the test of time and are not under debate. How different is that from front-end? Can you imagine us having similar patterns undisputed patterns? This would help greatly with our applications withstanding the test of time past two years.

      ### Frameworks

      Let's take frameworks as an indicator. One of the big reasons for certain front-end applications becoming "legacy” is the vast number of frameworks popping up. Suddenly, the framework you used two years ago isn't considered good enough anymore. Although these framework wars spark innovation, they make the front-end landscape change rapidly. My feeling is that this curve is slowly calming down, but you need to be aware of this when starting new applications. You want to make sure that you don't choose a framework as a developer because it looks like the best solution **now**, but can stand the test of time to a certain degree.

      ### Rendering strategies

      ![Rendering schema from SSR to CSR to SSG to SSR](/img/articles/rendering-schema.png)


      Another example is rendering strategies. Ever noticed we tend to go in circles? We started with rendering all applications server-side. The rise of SPA frameworks moved everything to client-side rendering. This caused issues that we tried to resolve with static site generation. This was cumbersome so one of the latest frameworks, [Remix](https://www.davebitter.com/articles/first-look-at-remix), is moving back to web fundamentals with server-side rendering. The front-end community figuring this out over the past decade has caused an immense rise in "legacy applications”.

      ### We'll get there

      We're still figuring things out. That's fine, tremendous strides are being made to solidify patterns, better the developer and user experience and more. These things take time. It's our job as front-end developers to be cognizant of this and try to not keep jumping to the latest and newest thing right away.

      ## Closing thoughts

      There is no magic way to prevent your applications to become "legacy”. There are however things you can do to mitigate this as much as possible. This is a joint effort between developers and business. Front-end applications are incredibly complex. We need to recognize this and put checks in place to prevent getting stuck in this cycle.

    date: 2022-06-02T00:00:00.000Z
    slug: the-infinite-legacy-cycle-in-front-end
    tags:
      - front-end
    intro: >-
      As a front-end developer and consultant, It seems like many of the existing projects I join have the same issues. Generally, within the first week, you hear one of the following quotes:
    teaserCopy: >-
      Projects often become legacy in an incredibly short time. I have spoken to people in technology with a variety of skills, experience and roles. Time to find out how they think about this, what tips they have to prevent these issues and more.
    teaserImage: /img/articles/interview.jpg
    title: The infinite legacy cycle in front-end
  - type: articles
    body: >-
      Remix spends a single line in the documentation on the [handle export](https://remix.run/docs/en/v1/api/conventions#handle). It simply states:


      *Exporting a handle allows you to create application conventions with the `useMatches()` hook. You can put whatever values you want on it.*


      That’s it, a simple object that you can export on a (nested) route. So why is this such an awesome feature? Well, you can create functionalities like their [meta export feature](https://remix.run/docs/en/v1/api/conventions#meta) and more.

      ## Dave, give me a practical example

      To best explain how this works we’re going to build a breadcrumb-bar that you see on many websites. To do this with the handle export, we’ll first create our pages. We’ll create our page structure like this:


      ```markdown

      .

      └── app
          ├── routes
          │   ├── about.tsx
          │   └── about
          │       ├── us.tsx
          │       └── us
          │           ├── history.tsx
          │           └── values.tsx
          └── root.tsx

      ```


      `root.tsx`, `about.tsx` and `us.tsx` all load the [Outlet component](https://reactrouter.com/docs/en/v6/api#outlet) to load their respective nested routes.


      The next step is to export an object called `handle` from every nested route that looks something like this:


      ```jsx

      // app/routes/about.tsx


      import { NavLink } from 'remix';


      export const handle = {
        breadcrumb: <NavLink to='/about'>About</Navlink>,
        pageTitle: 'About'
      };

      ```


      Note that we can export any value we want. Here, I’m exporting a React component for the breadcrumb itself and a string for the page title.


      So we’ve added this for the about route and all its nested routes. How do we now use it? Well, I want to only load a breadcrumb-bar in one place for all nested routes. We head over to `root.tsx` to do just that. Here, I want to, not just get the data for the current route, but all it’s parents’ data as well. Once I have all these pieces of data, I can start constructing a breadcrumb.


      That single line of documentation on this Remix mentions the `useMatches` hook. This hook returns an array of the currently active route, but all its active parent routes as well. Perfect for our breadcrumb-bar! Let’s have a look at how this translates to code in our `root.tsx`. When we navigate to `/about/us/history`, we get something like this:


      ```jsx

      // app/routes/root.tsx


      import { useMatches } from 'remix';


      export default function App() {
        const matches = useMatches();


        /*
          matches contains an array with this data: [
            { pathname, data, params, handle }, // root route
            { pathname, data, params, handle }, // about route
            { pathname, data, params, handle }, // about/us route
            { pathname, data, params, handle } // about/us/history route
          ];
        */
      };

      ```


      There we can access the object, for every nested route (breadcrumb), we exported as `handle`. Next, we can write some JSX to loop over this list and return the breadcrumb:


      ```jsx

      // app/routes/root.tsx


      import { NavLink, useMatches } from 'remix';


      export default function App() {
        const matches = useMatches();


        return <>
          <nav>
            <ul>
              {matches.map((match, index) => <li key={index}>
                {match.handle?.breadcrumb}
              </li>)}
            </ul>
          </nav>
        </>
      };

      ```


      I’ve created a [CodeSandbox](https://codesandbox.io/s/remix-handle-84nhx) (❤️) where you can see this in action:

       <iframe
        src="https://codesandbox.io/embed/remix-handle-84nhx?fontsize=14&hidenavigation=1&theme=dark"
       style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
       title="remix-handle"
       allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
       sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

      ## So what else can I build with this?

      Well, that depends on your creativity! Remix basically offers a way to keep data at a nested route, but access it higher up in the route in any component you want. You can then render a component or execute logic for every nested route in a single place. What you want to use it for is really up to you. Remix, I believe, uses this to aggregate exported Meta functions and write the meta-tags to the head of the document.


      And that’s all! Let me know what you will use this for. Cheers!
    date: 2022-02-15T00:00:00.000Z
    slug: remix-handle-export
    tags:
      - remix
      - progressive-enhancement
    intro: >-
      There is an awesome feature in Remix that is easily overlooked, but is incredibly powerful! Let’s have a look at the Remix handle export object.
    teaserCopy: >-
      There is an awesome feature in Remix that is easily overlooked, but is incredibly powerful! Let’s have a look at the Remix handle export object.
    teaserImage: /img/articles/remix.jpg
    title: Remix’ powerful hidden feature you might not have noticed yet
  - type: articles
    body: >-
      **New to [Remix](http://remix.run)? Get up to speed by reading my [first look at Remix](https://www.davebitter.com/articles/first-look-at-remix).**

      ## LoaderFunction

      A LoaderFunction is used to fetch and load some data for a (nested) route on the server. Like [Next.js API routes](https://www.davebitter.com/articles/next-js-api-routes), Remix lets you export a special async function that can be used to fetch some data and return an object containing the data. Here is an example of how that may look like when building an overview page for some articles:


      ```

      // app/pages/articles/overview.tsx


      import { LoaderFunction } from 'remix';


      export const loader: LoaderFunction = async ({ }) => {
          const { articles } = await fetch('https://website.com/api/articles').then(res => res.json())

          return {
              articles: articles
                  .splice(0, 5)
                  .map(({ title, slug }: ArticleData) => ({ title, slug }))
          };
      };

      ```

      Note that by naming the exported function `loader`, Remix picks it up. A great optimization you can do right of the box is just returning the data that your front-end needs. In this case, we just need the first five articles’ `title` and `slug` properties. In general, you want to just return the data you actually need for performance and security reasons. The LoaderFunction is the perfect place to do so.


      Next, we want to use this data in the front-end. We export some JSX in the same file where we can access the data form the LoaderFunction by using the `useLoaderData` hook provided by Remix:


      ```

      // app/pages/articles/overview.tsx


      import { LoaderFunction, useLoaderData, Link } from 'remix';


      type LoaderData = {
          articles?: Partial<ArticleData>[];
      };


      export const loader: LoaderFunction = async () => {
          const { articles } = await fetch('https://website.com/api/articles').then(res => res.json())

          return {
              articles: articles
                  .splice(0, 5)
                  .map(({ title, slug }: ArticleData) => ({ title, slug }))
          };
      };


      const OverviewPage = () => {
          const loaderData = useLoaderData<LoaderData | undefined>();

          return <>
              <h1>Articles</h1>

              <ul>
                  {loaderData?.articles?.map(({title, slug}) => {<li key={slug}>
                      <Link to={`/aricles/${slug}`} prefetch='intent'>{title}</Link>
                  </li>})}
              </ul>
          </>;
      }

      export default OverviewPage;

      ```

      And that’s it. Whenever this (nested) route gets requested by the user, the LoaderFunction will fetch some data and then render the JSX on the server. Note that for a nested route, the data request is code-split right out of the box. I enjoy how straightforward it is, but incredibly powerful as well!

      > The web’s core interactivity consists of links and forms. The rest is secondary.

      ## ActionFunction

      So far, Next.js does things in a similar matter. Where Remix, to me, really shines is the handling of forms. In a framework like Next.js, you’d have to create an API route, probably `preventDefault` on the form submit and post client-side to the API route. Remix, being built on web standards, take a great approach to handling forms. It can actually handle your native form submit right out of the box with ActionFunctions like so:


      ```

      // app/pages/contact.tsx


      import { Form, ActionFunction, useActionData, redirect } from 'remix';


      type ActionData = {
          fieldErrors?: {
              name: string | undefined;
              question: string | undefined;
          };
          fields?: {
              name: string;
              question: string;
          };
      };


      export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
          const form = await request.formData();
          const name = form.get('name');
          const question = form.get('question');

          const fieldErrors = {
              name: validateName(name),
              question: validateQuestion(question)
          };

          const fields = { name, question };

          if (Object.values(fieldErrors).some(Boolean)) {
              return { fieldErrors, fields };
          }

          await handleNewContactRequest(fields)

          return redirect(`/contact/thank-you`);
      };


      const ContactPage = () => {
          const actionData = useActionData<ActionData | undefined>();

          return <>
              <h1>Contact</h1>

              <Form method='post'>
                  <label htmlFor='name'>Name</label>
                  <input id='name' name='name' defaultValue={actionData?.fields?.name || ''} required></input>
                  {actionData?.fieldErrors?.name && <span>{actionData?.fieldErrors?.name}</span>}

                  <label htmlFor='question'>Question</label>
                  <input id='question' name='question' defaultValue={actionData?.fields?.question || ''} required></input>
                  {actionData?.fieldErrors?.question && <span>{actionData?.fieldErrors?.question}</span>}

                  <button type='submit'>Send</button>
              </Form>
          </>;
      }


      export default ContactPage;

      ```

      Quite a lot is happening here. Let’s break it up into smaller pieces:


      ```

      // app/pages/contact.tsx


      import { Form } from 'remix';


      <Form method='post'>
          <label htmlFor='name'>Name</label>
          <input id='name' name='name' required></input>

          <label htmlFor='question'>Question</label>
          <input id='question' name='question' required></input>

          <button type='submit'>Send</button>
      </Form>

      ```

      We use the `Form` component by Remix to have client-side form handling if client-side JavaScript is available. If not, it falls back to a regular HTML `form` element. We make sure to properly add the attribute to our `input` elements with the `name` property as we’re going to need that in the form handling. Remember, Remix is built on web standards. We need to add a form method with the value `post` to make it work.


      ```

      // app/pages/contact.tsx


      import { Form, ActionFunction, redirect } from 'remix';


      type ActionData = {
          fieldErrors?: {
              name: string | undefined;
              question: string | undefined;
          };
          fields?: {
              name: string;
              question: string;
          };
      };


      export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
          const form = await request.formData();
          const name = form.get('name');
          const question = form.get('question');

          const fieldErrors = {
              name: validateName(name),
              question: validateQuestion(question)
          };

          const fields = { name, question };

          if (Object.values(fieldErrors).some(Boolean)) {
              return { fieldErrors, fields };
          }

          await handleNewContactRequest(fields)

          return redirect(`/contact/thank-you`);
      };

      ```

      Just like the LoaderFunction, we export a special async function called `action` for the ActionFunction. Because we used a form with the method `post` in this file/route, the function will handle the incoming `post` request automatically.


      We can then do some basic server-side form validation to ensure we don’t send any bad data to our email service. If there is an error for one of the form fields, we return an object containing the error messages. If all is good, we call our email handling service and redirect the user to a thank you page.


      ```

      // app/pages/contact.tsx


      import { Form, useActionData } from 'remix';


      type ActionData = {
          fieldErrors?: {
              name: string | undefined;
              question: string | undefined;
          };
          fields?: {
              name: string;
              question: string;
          };
      };


      const ContactPage = () => {
          const actionData = useActionData<ActionData | undefined>();

          return <>
              <h1>Contact</h1>

              <Form method='post'>
                  <label htmlFor='name'>Name</label>
                  <input id='name' name='name' defaultValue={actionData?.fields?.name || ''} required></input>
                  {actionData?.fieldErrors?.name && <span>{actionData?.fieldErrors?.name}</span>}

                  <label htmlFor='question'>Question</label>
                  <input id='question' name='question' defaultValue={actionData?.fields?.question || ''} required></input>
                  {actionData?.fieldErrors?.question && <span>{actionData?.fieldErrors?.question}</span>}

                  <button type='submit'>Send</button>
              </Form>
          </>;
      }

      ```

      In case there were errors, our ActionFunction behaves like a LoaderFunction where we can access the data that has been returned. Similarly, we use the `useActionData` hook provided by Remix to access the form field errors and entered values. We can then render the form field errors on the page and make sure to set the `defaultValue` property of the `input` elements with the values the user entered.

      > Remix lets you build forms [progressively enhanced](https://www.davebitter.com/articles/custom-inputs-web) without even having to think about it. Writing applications that don’t solely rely on client-side JavaScript has never been easier.

      ## So all this for a no client-side JavaScript?

      Naturally, the visitors of your website will most likely nearly all have client-side JavaScript enabled. There is a common misconception that this is why we want to build websites and web applications without the need of client-side JavaScript. There are a few more major benefits of building with this approach.

      ### Performance

      Firstly, not having to load a large JavaScript bundle on a user’s device and mobile network is a great advantage. As more and more of the web’s functionality is moving to client-side JavaScript, so is the bundle size increasing. Handling all this logic on the server will help greatly with combatting this.

      ### Reliability

      Secondly, having a non-client-side JavaScript “fallback” is great for the reliability and robustness of your web application. What happens when your JavaScript doesn’t load or breaks? In most modern web applications the user won’t be able to complete their task. Having an HTML-only “fallback” available that always works is great to rely on.


      Notice how I keep adding quotation marks around “fallback”. This is because it’s not really a fallback with the Progressive Enhancement mindset. Building with the Graceful Degradation mindset would indeed mean that you first build the full functionality in an ideal situation and then make sure that you can fall back on a solution if that doesn’t work.


      Progressive Enhancement however flips this around. You first build a working solution with just the basics. In this case, a regular HTML form that will post to a server and be redirected or reloaded after the server is done. Then, when there is client-side JavaScript available, we can handle it on the client and enhance the user experience. The great thing about Remix is that you get most of this right out of the box.

      ### Reduced complexity (by moving the state to the server)

      Finally, a big benefit is moving the state to the server. Notice how I never used any client-side state in this form. This not only reduces the risk of a broken application but makes the code far simpler to read and keep up to date.


      Sure, this form will just post the data and be done with it. Imagine you have a form that can create/read/update/delete (CRUD) users. Whenever you modify the user list, you need to make sure that you update all the client-side state that has a copy of the “real” (server-side) state. This can become quite complex and often developers resort to techniques like Redux. This makes an application so much more complex. By doing everything on the server, **Remix will hydrate all the pages every time they load to reflect the latest state of the data**. This is such a powerful shift of responsibility!

      ## Concluding

      Remix makes it incredibly easy to build robust, well-performing and simple web applications by using the “old” web standards with new tricks up its sleeve. I’m a big advocate for how they do this and can’t wait to explore further. For now, thanks for reading and follow me for more of these articles!
    date: 2022-01-07T00:00:00.000Z
    slug: remix-loaderfunction-vs-actionfunction
    tags:
      - remix
      - progressive-enhancement
    intro: >-
      The LoaderFunction and ActionFunction are two core functionalities of working with data in Remix. Let’s have a look at how they work.
    teaserCopy: >-
      The LoaderFunction and ActionFunction are two core functionalities of working with data in Remix. Let’s have a look at how they work.
    teaserImage: /img/articles/remix.jpg
    title: Remix LoaderFunction vs ActionFunction
  - type: articles
    body: >-
      [Remix](https://remix.run) is a full-stack web framework that lets you focus on the user interface and work back through web fundamentals to deliver a fast, slick, and resilient user experience. This is what excited me when I first read about Remix. I'm a big advocate for progressively enhancing web applications and this framework seems to take this approach by simply using web fundamentals.


      This is not a step-by-step guide on how to make a web application with Remix, but rather some features I noticed and wanted to highlight. That might come later. If you are looking for that, [Remix.run](http://Remix.run) is an amazing landing page and contains very well written documentation that will take you through all the reasons why they build this framework, what it offers and how it works. Seriously, one of the best landing pages I've seen in the past few years. Please, have a read there and come back for my view as a [Next.js](https://nextjs.org/) fanboy.

      ## Routing mechanism

      Like Next.js, Remix uses a file-based routing system. In `/app` (where your app will live) you can create a folder called `routes`. Every file you add (e.g. `/app/routes/example` will create a route and page under `http://website.com/example`. If you're unfamiliar with this concept, please read my article [A simple, yet detailed introduction to Next.js](https://www.davebitter.com/articles/a-simple-yet-detailled-introduction-to-next-js). Next.js and Remix work nearly the same with some exceptions like creating a dynamic page (`[slug]` vs. `$slug`. If this is not the way you want to work, you can also define your routes in an object for both of these frameworks.

      ### Nested routes

      Remix seems to heavily rely on the usage of nested routes as "partials". Let's say you are building an admin view. You might have multiple routes for several admin pages:

      ```

      - app
          - routes
              - admin.tsx
              - admin
                  - new.tsx
                  - edit.tsx
                      $user.tsx

      ```

      All these admin pages might share a special navigation bar for logged in admins. Naturally, you could load a reusable component in the markup of all these pages, but that sounds more like a partial that you used to use back when building websites with templating languages like Pug or Handlebars. Remix allows you to just load the partial in `app/routes/admin.tsx` and add a Remix component called `<Outlet />` . This component serves as a placeholder where a child route can be rendered. In this case, that would be the new and edit route. I really like this approach of templating out pages.

      ### Scoped JS and CSS per nested route

      These nested routes are not just useful as partials, but will allow Remix to also easily chunck-up your nested routes for JS and CSS bundles. Naturally, it knows what pieces to load as you load them per nested route. This makes these nested routes true small little routes and optimises the loading of resources.


      This concept is fundamental to how Remix works. You can read more about nested routes [here](https://remix.run/docs/en/v1/guides/routing) and CSS scoping with `<Links />` [here](https://remix.run/docs/en/v1/guides/styling).

      ## Server- and client-side code

      We've seen great strides by Next.js to make it easy for developers to expose server-side functions right next to client-side code. You can read more about that in my article [Next.js page generation](https://www.davebitter.com/articles/next-js-page-generation). At a first glance, Remix has an evenly convenient, if not better solution. I feel like Remix takes it to the next level by fully focussing on not having to use client-side JS as a standard, but rather an afterthought.

      ### Loaders

      Many web applications need to fetch data. You can use `loader` functions in combination with a `useLoaderData` hook to set this up.

      ```jsx

      import type { LoaderFunction } from "remix";

      import type { User } from "@prisma/client";

      import { db } from "~/utils/db.server";


      type LoaderData = { users: Array<User> };

      export let loader: LoaderFunction = async () => {
        const data: LoaderData = {
          users: await db.user.findMany()
        };

        return { data };
      };


      export default function Users() {
        const data = useLoaderData<LoaderData>();

        return (
          <ul>
            {data.map(user => (
              <li>{user.name}</li>
            ))}
          </ul>
        );
      }

      ```

      There is quite some Typescript-specific code here, but in its essence there is an async function exported called `loader`. This function fetches some data and returns an object with data. Note that you can return multiple pieces of data from various sources here. You can now access all this data using the `useLoaderData` hook. An important aspect of this is that no client-side JS is needed here. You just want some data from your server-side function and then use it to render a list on the server to serve to the client.

      ### Actions

      So what about handling things like forms? I need to handle that on the client right? Well, not necessarily. Forms can easily be handled with a `method` attribute on the form element. Sure, you might want to make a fancy multi-step form, but this is where progressive enhancement pops up again. Just make a form with a `method` and let it post using the web standards. You then export an `action` function that will handle the posting of the form. Take a look at this code snippet of the [Jokes app tutorial](https://remix.run/docs/en/v1/tutorials/jokes) I followed in preparation for this article. You can find my full end result in [this repository](https://github.com/DaveBitter/remix-jokes).

      ```jsx

      import type { ActionFunction } from "remix";

      import { redirect } from "remix";

      import { db } from "~/utils/db.server";


      export const action: ActionFunction = async ({
        request
      }) => {
        const form = await request.formData();
        const name = form.get("name");
        const content = form.get("content");
        // we do this type check to be extra sure and to make TypeScript happy
        // we'll explore validation next!
        if (
          typeof name !== "string" ||
          typeof content !== "string"
        ) {
          throw new Error(`Form not submitted correctly.`);
        }


        const fields = { name, content };


        const joke = await db.joke.create({ data: fields });
        return redirect(`/jokes/${joke.id}`);
      };


      export default function NewJokeRoute() {
        return (
          <div>
            <p>Add your own hilarious joke</p>
            <form method="post">
              <div>
                <label>
                  Name: <input type="text" name="name" />
                </label>
              </div>
              <div>
                <label>
                  Content: <textarea name="content" />
                </label>
              </div>
              <div>
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
          </div>
        );
      }

      ```

      There is a basic form (with no client-side JS) that just posts on submit. The `action` function is then called where we can then get the form data and handle it like normal. But what about validation? Naturally, you want to do this on the server, but it's considered good practice to do this on the client as well. The nice thing about having everything in this file is that we can reuse the same validation function in both places. Here's another snippet with just server-side validation implemented.

      ```jsx

      import type { ActionFunction, LoaderFunction } from "remix";

      import {
          useActionData,
          redirect,
          Form
      } from "remix";

      import { JokeDisplay } from "~/components/joke";

      import { db } from "~/utils/db.server";

      import {
          requireUserId,
          getUserId
      } from "~/utils/session.server";


      export const loader: LoaderFunction = async ({
          request
      }) => {
          const userId = await getUserId(request);
          if (!userId) {
              throw new Response("Unauthorized", { status: 401 });
          }
          return {};
      };


      function validateJokeContent(content: string) {
          if (content.length < 10) {
              return `That joke is too short`;
          }
      }


      function validateJokeName(name: string) {
          if (name.length < 2) {
              return `That joke's name is too short`;
          }
      }


      type ActionData = {
          formError?: string;
          fieldErrors?: {
              name: string | undefined;
              content: string | undefined;
          };
          fields?: {
              name: string;
              content: string;
          };
      };


      export const action: ActionFunction = async ({
          request
      }): Promise<Response | ActionData> => {
          const userId = await requireUserId(request);
          const form = await request.formData();
          const name = form.get("name");
          const content = form.get("content");
          if (
              typeof name !== "string" ||
              typeof content !== "string"
          ) {
              return { formError: `Form not submitted correctly.` };
          }


          const fieldErrors = {
              name: validateJokeName(name),
              content: validateJokeContent(content)
          };
          const fields = { name, content };
          if (Object.values(fieldErrors).some(Boolean)) {
              return { fieldErrors, fields };
          }


          const joke = await db.joke.create({
              data: { ...fields, jokesterId: userId }
          });
          return redirect(`/jokes/${joke.id}`);
      };


      export default function NewJokeRoute() {
          const actionData = useActionData<
              ActionData | undefined
          >();


          return (
              <div>
                  <p>Add your own hilarious joke</p>
                  <Form method="post">
                      <div>
                          <label>
                              Name:{" "}
                              <input
                                  type="text"
                                  defaultValue={actionData?.fields?.name}
                                  name="name"
                                  aria-invalid={
                                      Boolean(actionData?.fieldErrors?.name) ||
                                      undefined
                                  }
                                  aria-describedby={
                                      actionData?.fieldErrors?.name
                                          ? "name-error"
                                          : undefined
                                  }
                              />
                          </label>
                          {actionData?.fieldErrors?.name ? (
                              <p
                                  className="form-validation-error"
                                  role="alert"
                                  id="name-error"
                              >
                                  {actionData.fieldErrors.name}
                              </p>
                          ) : null}
                      </div>
                      <div>
                          <label>
                              Content:{" "}
                              <textarea
                                  defaultValue={actionData?.fields?.content}
                                  name="content"
                                  aria-invalid={
                                      Boolean(actionData?.fieldErrors?.content) ||
                                      undefined
                                  }
                                  aria-describedby={
                                      actionData?.fieldErrors?.content
                                          ? "content-error"
                                          : undefined
                                  }
                              />
                          </label>
                          {actionData?.fieldErrors?.content ? (
                              <p
                                  className="form-validation-error"
                                  role="alert"
                                  id="content-error"
                              >
                                  {actionData.fieldErrors.content}
                              </p>
                          ) : null}
                      </div>
                      <div>
                          <button type="submit" className="button">
                              Add
                          </button>
                      </div>
                  </Form>
              </div>
          );
      }

      ```

      Note that we return the validation messages if there is something wrong and render the page again accessing them with the `useActionData` hook. If the form validates fine, we can redirect to the overview page.

      > This is a great example of how easy it can be to create an interactive part of your web application without the need for client-side JS for something that has web standards. Sure you can, but Remix is built in a way where you take this approach first.


      ## Resource routes

      If I would've build the previous form without any client-side JS in Next.js, I would've had to build a Next.js API route. These are incredibly powerful. You can read more about these API routes in my article [Next.js API routes](https://www.davebitter.com/articles/next-js-api-routes). With Remix, you can do exactly the same, but even more. Remix doesn't just offer this for, for instance, JSON responses, but for any kind of response really. You can create a file with a special naming pattern like `/app/routes/jokes[.]rss.tsx`. The `[.]rss` part tells Remix that you will return a `.rss` file. In this code snippet, you can see how something like this could work.

      ```jsx

      import type { LoaderFunction } from "remix";

      import { db } from "~/utils/db.server";


      export const loader: LoaderFunction = async ({
          request
      }) => {
          const jokes = await db.joke.findMany({
              take: 100,
              orderBy: { createdAt: "desc" },
              include: { jokester: { select: { username: true } } }
          });


          const host =
              request.headers.get("X-Forwarded-Host") ??
              request.headers.get("host");
          if (!host) {
              throw new Error("Could not determine domain URL.");
          }
          const protocol = host.includes("localhost")
              ? "http"
              : "https";
          const domain = `${protocol}://${host}`;
          const jokesUrl = `${domain}/jokes`;


          const rssString = `
          <rss xmlns:blogChannel="${jokesUrl}" version="2.0">
            <channel>
              <title>Remix Jokes</title>
              <link>${jokesUrl}</link>
              <description>Some funny jokes</description>
              <language>en-us</language>
              <generator>Kody the Koala</generator>
              <ttl>40</ttl>
              ${jokes
                  .map(joke =>
                      `
                  <item>
                    <title>${joke.name}</title>
                    <description>A funny joke called ${joke.name}</description>
                    <author>${joke.jokester.username}</author>
                    <pubDate>${joke.createdAt}</pubDate>
                    <link>${jokesUrl}/${joke.id}</link>
                    <guid>${jokesUrl}/${joke.id}</guid>
                  </item>
                `.trim()
                  )
                  .join("\n")}
            </channel>
          </rss>
        `.trim();


          return new Response(rssString, {
              headers: {
                  "Cache-Control": `public, max-age=${60 * 10
                      }, s-maxage=${60 * 60 * 24}`,
                  "Content-Type": "application/xml",
                  "Content-Length": String(Buffer.byteLength(rssString))
              }
          });
      };

      ```

      How cool is that! The routes folder is not just for HTML pages, but you can create routes for any resource you need, hence the name resource routes.

      ## Nested route utility exports

      I found the utility exports that Remix offers on nested routes incredibly nice to use. Previously, I mentioned you could import CSS on nested routes and have it scoped and chuncked to just that nested route. There are a variety of other Remix utilities you can use scoped to a nested route.

      ### SEO

      You probably want to add some meta-tags to your pages. You can do this easily by exporting a `MetaFunction` on (nested) routes. Let's say you have some basic meta-tags on the root of the pages under `app/root.tsx`. You can export that function there like so:

      ```jsx
      export const meta: MetaFunction = () => {

        const description = `Learn Remix and laugh at the same time!`;
        return {
          description,
          keywords: "Remix,jokes",
          "twitter:image": "https://remix-jokes.lol/social.png",
          "twitter:card": "summary_large_image",
          "twitter:creator": "@remix_run",
          "twitter:site": "@remix_run",
          "twitter:title": "Remix Jokes",
          "twitter:description": description
        };
      };

      ```

      But you might want to update the title or description for a specific nested route. You guessed it, you can export the same function with different values there to extend this base set of meta tags. I think that's pretty sweet.

      ### Error handling

      You can export a `CatchBoundary` and `ErrorBoundary` function for every (nested) route.

      ```jsx

      export function CatchBoundary() {
          const caught = useCatch();


          if (caught.status === 404) {
              return (
                  <div className="error-container">
                      There are no jokes to display.
                  </div>
              );
          }
          throw new Error(
              `Unexpected caught response with status: ${caught.status}`
          );
      }


      export function ErrorBoundary() {
          return (
              <div className="error-container">
                  I did a whoopsies.
              </div>
          );
      }

      ```

      This will help you with two things. You can notify the user with some custom message on the page, but more importantly, you can isolate this error to just the nested route. The rest of you're application will run fine. This helps you think about how you want to handle your not so optimal flow.

      ## Finally, loading some client-side JS for the first time

      During the Jokes app tutorial, I didn't even realize that hadn't written any client-side JS yet. I think it's really cool that Remix doesn't load any client-side JS by default. Naturally, you might need some client-side JS so you can load the `<Scripts />` component. This is the first time you will see JS files in your network tab. These optimised and chuncked files will be loaded and "hydrate" your application on the client.

      ## Verdict.

      I'm a big advocate of Progressive Enhancement to make web applications simple, accessible and resilient. You can read some of my articles on this [here](https://www.davebitter.com/tags/progressive-enhancement). I usually put this to practice for just components. Seeing Remix take this approach to the entire application gives me hope for a future of building great web applications using web standards and progressive enhancement.


      For the first time in years, I felt like a "web developer" again instead of a JS engineer. It's incredible fun to start thinking about how to leverage these standards smartly. I'm very excited about what Remix will offer and will definitely continue researching Remix and sharing it with all of you. Thanks for reading!
    date: 2021-12-08T00:00:00.000Z
    slug: first-look-at-remix
    tags:
      - remix
      - progressive-enhancement
      - seo
      - serverless
    intro: >-
      There has been a lot of buzz around the open-source release of Remix. I took a first look by following the deep-dive tutorial and this is what I found.
    teaserCopy: >-
      There has been a lot of buzz around the open-source release of Remix. I took a first look by following the deep-dive tutorial and this is what I found.
    teaserImage: /img/articles/remix.jpg
    title: First look at Remix
  - type: articles
    body: >-
      ## Why should I use this at all?

      Internationalisation is hard. There are many ways different countries handle the formatting of numbers, currencies and dates. In Dutch, we write `DD/MM/YYYY` while in English you’d write `MM/DD/YYYY`. That’s a pretty well-known one, but do you know how we format large numbers with decimals in Dutch compared to English? In Dutch we use `100.000,11` while in English you’d write `100,000.11`. These might be familiar to you but what about French? In French, you’d write `100 000,11`. There are even more differences if we look at currencies. In Dutch, you’d write `€ 100.000,11` while in German you’d write `100.000,11 €` This is where it becomes difficult to write your own formatting functions. You’d not only have to know about these differences but would have to extend your formatting functions for every language that you’re going to support.

      ## There is a library for that!

      In the past, this would be the solution. If we look at just dates, libraries like Moment.js and date-fns have been around for a long time. Although this does the trick, it comes at a hefty price. Let’s say you just want to format some dates. Moment.js would cost you a lot of KB’s in your bundle. If you visit [Moment.JS’s website](https://momentjs.com/), you see that they actually discourage you to use their library and use the default Intl browser API instead.


      > We now generally consider Moment to be a legacy project in maintenance mode. It is not dead, but it is indeed done.


      This is not something to be sad about, it’s great news! Years ago Moment.js filled the gap for this need of developers that wasn’t met with a default browser API. Luckily, we do have that now.

      ## So what does Intl offer?

      Intl offers a standard for formatting build in the browser for two main categories. Firstly we can format dates easily with `Intl.DateTimeFormat` and `Intl.RelativeTimeFormat` for regular and relative dates. Secondly, we can format numbers with `Intl.NumberFormat` for numbers and currencies. These three methods most likely satisfy the majority of your formatting needs.

      ### DateTimeFormat and RelativeTimeFormat

      The `DateTimeFormat` method consists of three parts. The locale, formatting options and date.

      ```js

      new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: '2-digit' }).format(new Date());

      // outputs: "August 4, 21"


      new Intl.DateTimeFormat('nl', { day: 'numeric', month: 'long', year: '2-digit' }).format(new Date());

      // outputs: "4 augustus 21"


      ```

      You can see that it will not just put the day, month and year in the correct order, but also handle the translation of the name of the month. Naturally, there is a wide range of formatting options to be used which you could check out over at the documentation.

      One of the cool things in Moment.js was the ability for relative dates. You can do this to with Intl by using `Intl.RelativeTimeFormat`.

      ```js

      new Intl.RelativeTimeFormat('en').format(-1, 'day');

      // outputs: "1 day ago"


      new Intl.RelativeTimeFormat('en').format(-2, 'day');

      // outputs: "2 days ago"


      new Intl.RelativeTimeFormat('nl').format(-1, 'day');

      // outputs: "1 dag geleden"


      new Intl.RelativeTimeFormat('nl').format(-2, 'day');

      // outputs: "2 dagen geleden"


      ```

      You can see that it handles the pluralisation and translation for you. This is great while working with many languages. You can check out the documentation for more examples of what you can do.

      ## NumberFormat

      The `NumberFormat` method consist of three parts as well. The locale, formatting options and number.

      ```js

      new Intl.NumberFormat('en', {}).format(number)

      // outputs: "100,000.11"


      new Intl.NumberFormat('nl', {}).format(number)

      // outputs: "100.000,11"


      ```

      Next to this, you can format the number as a currency by passing the following formatting options:

      ```js

      new Intl.NumberFormat('en', { style: 'currency', currency: 'GBP' }).format(number)

      // outputs: "£100,000.11"


      new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(number)

      // outputs: "€100,000.11"


      new Intl.NumberFormat('nl', { style: 'currency', currency: 'EUR' }).format(number)

      // outputs: "€ 100.000,11"


      new Intl.NumberFormat('de', { style: 'currency', currency: 'EUR' }).format(number)

      // outputs: "100.000,11 €"


      ```

      As you can see, there are quite a few differences between locales. You can also mix and match locales and currencies to, for instance, get euro's in English number formatting.

      ## That's awesome!

      Right!? This standardised way of formatting numbers, currencies and dates makes it a breeze to always display the correct value to users based on their locale. We don't need to load any libraries that will increase our bundle size because Intl lives right in the browser. I encourage you to try it out and use it in your (next) projects. If you'd like to see some examples you can watch my Friday tips on Intl [here](https://www.davebitter.com/friday-tips/intl) and visit the docs over at MDN. Thanks for reading!
    date: 2021-08-04T00:00:00.000Z
    slug: you-should-use-intl
    tags:
      - es6
      - api
    intro: >-
      If you have worked with internationalisation in a project you know what a hassle it can be. Besides the regular content, you have to worry about the formatting of numbers, currencies and dates. In this article, we’ll go over how we can make this easier with Intl.
    teaserCopy: >-
      If you have worked with internationalisation in a project you know what a hassle it can be. Besides the regular content, you have to worry about the formatting of numbers, currencies and dates. In this article, we’ll go over how we can make this easier with Intl.
    teaserImage: /img/articles/internationalisation.jpg
    title: You should use the Intl browser API
  - type: articles
    body: >-
      ## Next.js ❤️ DX

      Next.js is already an amazing experience for developers. It was by no means a sluggish experience. With Next.js 10, startup times were improved up to 24% and processing times were decreased by 40%.


      But why stop there? Next.js 11 now includes another optimization to Babel to further reduce the startup time. A brand new implementation of the Babel loader for Webpack, optimizing loading and adding an in-memory config caching layer is added. In practice, this means no change for developers but will ultimately mean a faster development experience.

      ## Next.js Live (Preview Release)

      A very exciting new feature for team collaboration is Next.js Live. By leveraging tools like ServiceWorker, WebAssembly, and ES Modules, Next.js manages to put the entire development process in the browser. In practice, this means that developers can share a URL with their team and live view, discuss and edit the application right in the browser. Even more impressive is that it needs no build step for this, making it blazingly fast!


      At the moment this feature is in preview release. Learn more about Next.js Live and how you can pair it with Vercel's real-time collaboration engine [over at Vercel]([https://nextjs.org/live](https://nextjs.org/live)).

      ## Image placeholders

      Before, you had to define the height and width of a local image that you load in this component. From now on, Next.js automatically detects these sizes so you don't have to.


      You can now use blurred placeholder images while your actual image loads. You can do this by adding `placeholder="blur"` to your Image component. Next.js also supports blurring dynamic images by allowing you to provide a custom `blurDataURL`, which is provided by your backend. For example, you can generate a [blurha.sh](http://blurha.sh/) on the server.

      ## External script loading

      Loading external scripts happens a lot. Whether you need to load Google Analytics, a helpdesk service or others. Developers can now prioritize script loading with the new `strategy` property on the Script component. You can set one of three strategies:


      * `beforeInteractive`: For critical scripts that need to be fetched and executed **before** the page is interactive, such as bot detection and consent management. These scripts are injected into the initial HTML from the server and run before self-bundled JavaScript is executed.

      * `afterInteractive` (**default**): For scripts that can fetch and execute **after** the page is interactive, such as tag managers and analytics. These scripts are injected on the client-side and will run after hydration.

      * `lazyOnload` For scripts that can wait to load during idle time, such as chat support and social media widgets.


      Finally, the default script loading is changed from preloading and `async` to `defer`. By adding this new `strategy` property, developers have better fine-grained control in loading behaviour.

      ## Conformance

      Developers are often asked to become experts in UX quality topics like performance, security and accessibility. Google, by leveraging a system of strong defaults and safeguards, empower developers to focus more on features and products. With the release of Next.js 11, Google's Web Platforms team has begun open-sourcing their system with Conformance for Next.js.


      Conformance is a system that provides carefully crafted solutions and rules to support optimal loading and Core Web Vitals, with further additions coming to support other quality aspects like security and accessibility. These solutions free your team from memorizing all the latest rules for optimal loading performance, while still giving you the flexibility to make the right choices for your applications.


      Next.js 11 now supports ESLint out of the box to make it easier to catch framework-specific issues during development and set guidelines for your team to ensure best practices even as you scale. For new Next.js 11 applications this is used by default. For existing applications, that upgrade to this new version, you can run `next lint` to get started.

      ## Other bits and pieces

      ### Webpack 5 out of the box

      Webpack 5 could already be turned on in Next.js 10, but starting with Next.js 11 it will be used by default. From experience, I can say that moving over to Webpack 5 with Next.js was a breeze, so don't let it scare you off to upgrade to the latest Next.js major version.

      ### Create React App (CRA) migration tool

      Although migrating from CRA to Next.js was surprisingly easy, it can always be improved. To make it even easier to migrate your existing CRA apps, you can now use this tool with the following command: `npx @next/codemod cra-to-next`


      The transform automatically adds a pages/ directory and moves CSS imports to the right location. It'll also enable a CRA compatibility mode in Next.js that ensures some patterns used in Create React App work with Next.js. This allows for incremental adoption which is great for large projects.

      ## Try it out!

      You can head over to [Next.js]([https://nextjs.org/docs](https://nextjs.org/docs)) to get started with these and all the other features of Next.js. As Vercel puts it: *Let’s make the web. Faster.*

    date: 2021-06-15T00:00:00.000Z
    slug: next-js-11
    tags:
      - next-js
      - react-js
    intro: >-
      The team over at Vercel just announced Next.js 11. These are the important new updates to Next.js you need to know about.
    teaserCopy: >-
      The team over at Vercel just announced Next.js 11. These are the important new updates to Next.js you need to know about.
    teaserImage: /img/articles/next-js-11-hero.jpg
    title: What's new in Next.js 11?
  - type: articles
    body: >-
      ## But!

      Before we start, let's debunk a few reasons why not to start writing that you probably told yourself.

      * *I don't know what to write about.* What do you enjoy doing? For me, I like to explore new front-end development technologies and patterns. While doing this, I learn a lot about specific topics. It's a great way to get started by writing up your findings and sharing them with the world.

      * *There is somebody (better) out there who has already written about this.* Sure, but you bring your view and experience to the table. Articles by just a few writers would get dull real quick. Try writing your articles from your point of view.

      * *I don't have the time to write an article.* This one always got me as well. I saw all these lengthy articles on medium and felt discouraged to write my own. The thing is, articles can be whatever length you want. If you don't have the time or want to write lengthy articles try splitting it into multiple parts. Next to that, I have written a bunch of short articles called QuickBits. In these QuickBits I focus on something small I learned and want to share with the world. Usually, I can knock these out in about 20 minutes.

      * *I can't write.* For me, this consists of two parts. Firstly, there is storytelling. I usually try to write as if I was explaining the subject to a co-worker or friend. Writing like this feels, in my opinion, most natural. Secondly, I used to make quite a few grammar mistakes. Lately, I've been using [Grammarly](https://www.grammarly.com) to check this before publishing. The cool thing is that Grammarly not just corrects, but also explains why it was wrong. This way, you won't make the same mistake next time.

      ## Share your findings

      The cool thing about (front-end) development is that you never stop learning. Whether it is a new framework, a different way of doing things or else, you continuously learn new things. Chances are that you have co-workers and friends who would find that interesting as well. Writing articles is a great way to share your findings and views with them.


      More times than I can count I've had conversations with peers and was able to share one of my articles with them to give them more information on a subject and my view on this. The response has always been great and it's what motivates me to keep writing on a wide variety of subjects.

      ## Showcase your work

      One of the most heard quotes during job interviews is "I can't share that code because it's a client project". Unless you have quite a few side-projects that perfectly reflect your work, it's hard to give somebody good insights on what you work on as a developer, what you find important and how you work. Although an article may not give as much insight into your hard skills as an actual codebase, you can paint a fairly good picture. If you look through my articles you probably notice that I do quite a bit of work with Next.js and the engineering side of front-end development. If I didn't write all those separate articles, you might've just had to take my word on it.


      What I usually do when I want to share something I worked on at a client project is to create a standalone demo "project". This could be as small as a Codepen with the isolated problem and how you fixed it. This way you can share how you tackled the problem without having to share company code.

      ## Learn to convey a message

      The hard thing about writing articles is that you have a good picture of who your target audience is but you don't know how well known they are with the subject. I've had this struggle in the past as well while giving guest lectures. You have to try to convey your message, make it easy to follow and keep it interesting for all. By writing articles, you can practice this skill. You can then use it while communicating on your project with your peers or during public speaking.

      ## Get discovered

      The final thing I love about writing is getting discovered. I always share my articles on LinkedIn with the world. Recently, I have been found someone and invited to give a talk at their company about what I write about. This is a perfect example of how something that started as a simple article can turn into an awesome speaking opportunity. This is, of course, if that sounds like something you'd want to do.

      ## So, get started!

      I can keep naming reasons why you should start writing, but I think you get the point. Try to start small and maybe just write a short article on a problem you encountered and how you fixed it. You'll see that it's incredibly fun to do!

    date: 2021-06-04T00:00:00.000Z
    slug: why-i-write
    tags: []
    intro: >-
      Writing articles is one of the things I started doing fairly regularly over the past year. It took quite a while for me to get into it so I want to share why I write and why you should start.
    teaserCopy: >-
      Writing articles is one of the things I started doing fairly regularly over the past year. It took quite a while for me to get into it so I want to share why I write and why you should start.
    teaserImage: /img/articles/why-i-write-hero.jpg
    title: Why I write and you should too
  - type: articles
    body: >-
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

    date: 2021-02-17T00:00:00.000Z
    slug: design-handoff-in-the-browser
    tags:
      - front-end
      - design
    intro: >-
      I strongly believe in the concept of leveraging design handoff in the browser. I noticed many benefits for me as a front-end developer and the designers I work with using this approach. In this blog post, you will find out why you should design in the browser, how it works and how to start
    teaserCopy: >-
      I strongly believe in the concept of leveraging design handoff in the browser. I noticed many benefits for me as a front-end developer and the designers I work with using this approach. In this blog post, you will find out why you should design in the browser, how it works and how to start
    teaserImage: /img/articles/design-handoff-browser.jpg
    title: Design handoff in the browser
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
    title: A simple, yet detailed introduction to Next.js
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
  - type: articles
    body: >-
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
    title: Writing progressively enhanced custom inputs for the web
---
