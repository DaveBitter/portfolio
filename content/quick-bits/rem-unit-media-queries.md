---
type: quick-bits
date: 2022-12-19T00:00:00.000Z
slug: rem-unit-media-queries
tags:
  - front-end
intro: >-
  Confused about why your rem units aren't behaving in media queries? Find out
  the reason behind this unexpected behaviour and learn more about using rem
  units in responsive design in this article.
teaserCopy: >-
  Confused about why your rem units aren't behaving in media queries? Find out
  the reason behind this unexpected behaviour and learn more about using rem
  units in responsive design in this article.
teaserImage: /img/quick-bits/match-media-hero.webp
title: The unexpected behaviour of rem units in media queries
---
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
