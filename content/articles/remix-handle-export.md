---
type: articles
date: 2022-02-15T00:00:00.000Z
slug: remix-handle-export
tags:
  - remix
  - progressive-enhancement
intro: >-
  There is an awesome feature in Remix that is easily overlooked, but is
  incredibly powerful! Let’s have a look at the Remix handle export object.
teaserCopy: >-
  There is an awesome feature in Remix that is easily overlooked, but is
  incredibly powerful! Let’s have a look at the Remix handle export object.
teaserImage: /img/articles/remix.webp
title: Remix’ powerful hidden feature you might not have noticed yet
---
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
