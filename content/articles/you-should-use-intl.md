---
type: articles
date: 2021-08-04T00:00:00.000Z
slug: you-should-use-intl
tags:
  - es6
  - api
intro: >-
  If you have worked with internationalisation in a project you know what a
  hassle it can be. Besides the regular content, you have to worry about the
  formatting of numbers, currencies and dates. In this article, we’ll go over
  how we can make this easier with Intl.
teaserCopy: >-
  If you have worked with internationalisation in a project you know what a
  hassle it can be. Besides the regular content, you have to worry about the
  formatting of numbers, currencies and dates. In this article, we’ll go over
  how we can make this easier with Intl.
teaserImage: /img/articles/internationalisation.jpg
title: You should use the Intl browser API
---
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
