---
type: quick-bits
date: 2021-10-14T00:00:00.000Z
slug: avoid-the-async-await-try-catch-hell
tags:
  - es6
intro: >-
  Remember the old callback hell we used to deal with? Luckily, we can
  circumvent this nowadays with the use of Async Await. Unfortunately, this can
  introduce a new Async Await try-catch hell. Here's the solution on how to fix
  this.
teaserCopy: >-
  Remember the old callback hell we used to deal with? Luckily, we can
  circumvent this nowadays with the use of Async Await. Unfortunately, this can
  introduce a new Async Await try-catch hell. Here's the solution on how to fix
  this.
teaserImage: /img/quick-bits/js.webp
title: Avoid the Async Await try-catch hell
---
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
