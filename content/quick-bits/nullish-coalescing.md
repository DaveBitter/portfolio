---
type: quick-bits
date: 2021-04-26T00:00:00.000Z
slug: nullish-coalescing
tags:
  - es6
intro: >-
  One of my favourite features which were added in ES2020 is nullish coalescing.
  Despite its difficult pronunciation, this feature is a simple way of checking
  for falsey values. Let's have a look.
teaserCopy: >-
  One of my favourite features which were added in ES2020 is nullish coalescing.
  Despite its difficult pronunciation, this feature is a simple way of checking
  for falsey values. Let's have a look.
teaserImage: /img/quick-bits/js.png
title: Nullish Coalescing (try to say it quickly ten times)
---
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
