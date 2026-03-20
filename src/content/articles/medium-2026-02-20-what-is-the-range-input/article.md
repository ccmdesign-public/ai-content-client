---
title: "What is the Range Input?"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/best-range-input-library-540dfb2f2ea1?source=rss----5517fd7b58a6---4"
publishedAt: "2026-02-20"
tags:
  - "engineering"
  - "html-css"
  - "react"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-01T21:19:30.624Z"
---

# What is the Range Input?

# What is the Range Input?

[Bethany Drake](https://medium.com/@drake_beth?source=post_page---byline--540dfb2f2ea1---------------------------------------)

3 min read·1 day ago

\--

And how do I make it pretty?

## What is range input?

When you want the user to pick from a range of values, you use an *input* with the *range* type. For example, you might want the user to input how happy they are on a scale of 1–100.

![unstyled range input]()

Sliders can be discrete, meaning the slider snaps to predefined values; or continuous, meaning the user has infinite(ish) values to choose from. For a discrete slider, it’s nice to have ‘ticks’ to show the values. The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range) demonstrate how to do this with the a *datalist.*

![discrete unstyled range input with ticks]()

## Why do we need a library?

The raw html slider can be styled, but it’s tricky. The [css tricks article](https://css-tricks.com/sliding-nightmare-understanding-range-input/) on the topic starts with how to inspect the shadow dom on various browsers. This lets you view the underlying implentation of the ranger, including the psuedo elements that can be styled using css. For example, in chrome, we can use the *\-webkit-slider-runnable-track*.

![ranger input with styled track]()

Different browsers have different implementations however, and just because the above works in chrome, you can’t expect it to work in firefox or safari. A library would ideally abstract those browser differences, as well as make styling possible without stuffing around with the shadow dom.

## Option #1: rsuite

The docs of [rsuite](https://rsuitejs.com/components/slider/#slider) looked promising. Classy white dots as ticks/graduation marks, some nice hover interactions.

![Styled range input from rsuite]()

However, as I continued, I found styling difficult. I didn’t have to inspect a shadow dom, but there was a lot of inspection and guesswork in order to style the various elements. How do I make the blue part dark purple? How do I make the elegent graduation marks into cute bobbles? The answers weren’t obvious or intuitive.

## Option #2: Tanstack Ranger

[Tanstack Ranger](https://tanstack.com/) promises “headless, lightweight, and extensible primitives for building range and multi-range sliders.” The boilerplate for a basic slider was a little more involved than rsuite. It supports multiple handles out of the box, and each one is rendered however you like — the [quick start docs](https://tanstack.com/ranger/latest/docs/quick-start) show how to render them as buttons.

Boilderplate for Tanstack range input

![Tanstack rang input with multiple handles.]()

The styling is complicated because, as a headless implentation, you have to display and position each element from scratch. Customisation is correspondingly easy, because

## Get Bethany Drake’s stories in your inbox

 from this writer.

I didn’t want multiple handles, so my first step was to simplify the code from *values* to *value*. I wanted tick marks, so my next step was to use *rangerInstance.getTicks()* to display each of the tick marks. I chose to diplay them as large white circle with a border the same colour as the track for a cute bobble effect.

Tanstack range input with styled ticks.

![Ticks styled a cute bobbles.]()

Putting it all together with variable colours, I ended up with a visually appealing form using range inputs. My use case was for adding *aspects* of a writing project for [novel-november.com](https://www.novel-november.com/) , then displaying the *fingerpint* of the novel using a [radar chart.](https://recharts.github.io/en-US/storybook/)

![Aspects of a novel]()