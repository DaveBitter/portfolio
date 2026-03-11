---
type: quick-bits
date: 2021-06-30T00:00:00.000Z
slug: declarative-data-attributes-over-classes
tags:
  - es6
intro: >-
  I always use data attributes over classes to query declarative elements in my
  JS code for a few reasons. Here's why.
teaserCopy: >-
  I always use data attributes over classes to query declarative elements in my
  JS code for a few reasons. Here's why.
teaserImage: /img/quick-bits/js.png
title: Why I use data attributes over classes for declarative element states
---
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
