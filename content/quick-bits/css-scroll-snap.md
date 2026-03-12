---
type: quick-bits
date: 2021-11-18T00:00:00.000Z
slug: css-scroll-snap
tags:
  - front-end
intro: >-
  Scroll snapping is a popular technique to focus on a single piece of
  information. How can we implement this without the need and complexity of
  Javascript-based solutions?
teaserCopy: >-
  Scroll snapping is a popular technique to focus on a single piece of
  information. How can we implement this without the need and complexity of
  Javascript-based solutions?
teaserImage: /img/quick-bits/scroll-snap.webp
title: Full page scroll snapping with CSS only
---
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
</p> <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
