---
type: articles
date: 2022-01-07T00:00:00.000Z
slug: remix-loaderfunction-vs-actionfunction
tags:
  - remix
  - progressive-enhancement
intro: >-
  The LoaderFunction and ActionFunction are two core functionalities of working
  with data in Remix. Let’s have a look at how they work.
teaserCopy: >-
  The LoaderFunction and ActionFunction are two core functionalities of working
  with data in Remix. Let’s have a look at how they work.
teaserImage: /img/articles/remix.webp
title: Remix LoaderFunction vs ActionFunction
---
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
