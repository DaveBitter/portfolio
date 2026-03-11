---
type: quick-bits
date: 2021-04-13T00:00:00.000Z
slug: opionally-add-key-to-object-one-line
tags:
  - es6
intro: >-
  I sometimes need to optionally add a key to an object based on a statement.
  This can easily be done with a few lines of code, but where's the fun in that?
  How can I do this as clean as possible?
teaserCopy: >-
  I sometimes need to optionally add a key to an object based on a statement.
  This can easily be done with a few lines of code, but where's the fun in that?
  How can I do this as clean as possible?
teaserImage: /img/quick-bits/js.png
title: Optionally add a key to an object in one line
---
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
