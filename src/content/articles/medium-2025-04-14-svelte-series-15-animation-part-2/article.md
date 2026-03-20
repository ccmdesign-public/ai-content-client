---
title: "Svelte Series-15: Animation Part 2"
author: "Frontend Canteen"
platform: "medium"
publicationName: "Frontend Canteen"
url: "https://medium.com/frontend-canteen/svelte-series-15-animation-part-2-b3b74d3c1d24?source=rss----8c0f5ca1523c---4"
publishedAt: "2025-04-14"
tags:
  - "engineering"
  - "javascript"
  - "svelte"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-01T21:19:30.586Z"
---

# Svelte Series-15: Animation Part 2

# Svelte Series-15: Animation Part 2

[Garlic Garlic](/@garyfrost4321?source=post_page---byline--b3b74d3c1d24---------------------------------------)

8 min read·Apr 14, 2025

\--

![Svelte Series]()

## Transition

## svelte/transition

`svelte/transition`:

-   fade
-   blur
-   fly
-   slide
-   scale
-   draw
-   crossfade

The methods exported by `svelte/transition` can be used in combination with the `transition:fn` directive.

### fade

`fade` types definition:

```
function fade(    node: Element,    { delay, duration, easing }?: FadeParams | undefined): TransitionConfig;
```

Example:

```
<script>  import { fade } from "svelte/transition";  import { cubicInOut } from "svelte/easing";  let show = true;</script><button on:click={() => (show = !show)}>toggle</button>{#if show}  <div    class="ball"    transition:fade={{      easing: cubicInOut,      duration: 1000,    }}  ></div>{/if}<style>  .ball {    width: 50px;    height: 50px;    border-radius: 50%;    background-color: tomato;  }</style>
```

![fade]()

The fade animation achieves its effect by modifying the opacity of the element node.

![opacity]()

When using the `transition` directive, we can also pass no parameters directly, like `<div transition:fade></div>`, because the methods have default values. For example, in the `fade` method, the `delay` defaults to 0, the `duration` defaults to 400ms, and the `easing` defaults to `linear`.

### blur

`blur` types definition:

```
function blur(    node: Element,    {        delay,        duration,        easing,        amount,        opacity    }?: BlurParams | undefined): TransitionConfig;
```

-   opacity: The value of the node at which the transparency starts to show or is about to end. For example, if we set the opacity to 0.5, then the animation will directly start from 0.5 to 1 and end from 1 to 0.5. There is no easing effect for the change in the range from 0 to 0.5.
-   amount: The degree of blur in blur. The default value is 5. The larger the value, the more blurred it will be.

```
<script>  import { blur } from "svelte/transition";  import { cubicInOut } from "svelte/easing";  let show = true;</script><button on:click={() => (show = !show)}>toggle</button>{#if show}  <div    class="ball"    transition:blur={{      easing: cubicInOut,      duration: 1000,    }}  ></div>{/if}
```

![blur]()

When we set `amount`和`opacity`:

```
{#if show}  <div    class="ball"    transition:blur={{      easing: cubicInOut,      duration: 1000,      amount: 10,      opacity: 0.5,    }}  ></div>{/if}
```

![blur params]()

The `blur` method adds a blur filter while toggling the transparency.

![filter]()

### fly

`fly` types definition:

```
function fly(    node: Element,    {        delay,        duration,        easing,        x,        y,        opacity    }?: FlyParams | undefined): TransitionConfig
```

-   opacity: It has been explained in “blur”.
-   x: The distance that the element moves horizontally. A positive value of x indicates that the element is translated to the right.
-   y: The distance the element moves in the vertical direction. A positive value of y indicates that the element is translated downwards.

The `fly` method can control the movement of an element while setting the transparency animation of the element node.

```
{#if show}  <div    class="ball"    transition:fly={{      easing: cubicInOut,      duration: 1000,      x: 200,      y: 200    }}  ></div>{/if}
```

![fly]()

In addition to setting the opacity for the animation effect, the `transform: translate()` is also set.

![translate]()

### slide

`slide` types definition:

```
function slide(    node: Element,    {        delay,        duration,        easing,        axis    }?: SlideParams | undefined): TransitionConfig;
```

-   axis: Accepts `x` or `y` as values, with `y` being the default. Sets the direction from which the sliding occurs.

```
{#if show}  <div    class="ball"    transition:slide={{      easing: cubicInOut,      duration: 1000    }}  ></div>{/if}
```

Default behavior:

![slide]()

```
{#if show}  <div    class="ball"    transition:slide={{      easing: cubicInOut,      duration: 1000,+      axis: 'x'    }}  ></div>{/if}
```

Set axis to `x`:

![axis x]()

In addition to setting the opacity, the `slide` also achieves the animation effect by setting the width and height.

![width and height]()

This also explains why when an element gradually disappears, if it is in the vertical direction, the change occurs from top to bottom, and if it is in the horizontal direction, the change occurs from right to left.

### scale

`scale` types definition:

```
function scale(    node: Element,    {        delay,        duration,        easing,        start,        opacity    }?: ScaleParams | undefined): TransitionConfig;
```

-   start: Similar to the function of setting opacity, it is used to set a value. There is a transition effect between this value and 1, while there is no transition effect between 0 and this value.

```
<script>  import { scale } from "svelte/transition";  import { cubicInOut } from "svelte/easing";  let show = true;</script><button on:click={() => (show = !show)}>toggle</button>{#if show}  <div    class="ball"    transition:scale={{      easing: cubicInOut,      duration: 1000,    }}  ></div>{/if}
```

![scale]()

In addition to setting the opacity, the `scale` method also sets `transform: scale()`.

![scale]()

### draw

An animation method specifically designed for drawing SVGs. The type definition of the `draw` method is as follows:

```
<script>  import { draw } from "svelte/transition";  import { cubicInOut } from "svelte/easing";  let show = true;</script><button on:click={() => (show = !show)}>toggle</button><svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">    {#if show}        <path            transition:draw={{ duration: 5000, delay: 500, easing: cubicInOut }}            d="M25 1 L32 18 L50 18 L36 29 L40 46 L25 36 L10 46 L14 29 L1 18 L18 18 Z"            fill="none"            stroke="tomato"            stroke-width="1px"            stroke-linejoin="round"        />    {/if}</svg>
```

![draw]()

### crossfade

Won’t explain them one by one. You can explore on your own.

## Directives

The methods exported by `svelte/transition` can also be used in combination with the `in:fn` and `out:fn` directives. The difference between `in:fn`, `out:fn` and `transition:fn` lies in that they break down the time points at which the transitions occur. In the life cycle of a transition effect, it can be divided into two periods: in and out.

![transition directives]()

When an element transitions from being visible to hidden, we call this stage “out”. When an element transitions from being hidden to visible, we call this “in”.

```
<script>  import { scale, fly } from "svelte/transition";  import { cubicInOut } from "svelte/easing";  let show = true;</script><button on:click={() => (show = !show)}>toggle</button>{#if show}  <div    class="ball"    in:scale={{      easing: cubicInOut    }}    out:fly={{      x: 200,      y: 200,      easing: cubicInOut    }}  ></div>{/if}
```

When the ball is about to disappear, we use the `out:fly` effect. And when the ball is about to appear, we use the `in:scale` effect.

![in and out]()

Like the `transition` directive, the `in` and `out` directives can be used directly as `in:fn` and `out:fn` without passing parameters.

## Custom transition

API for custom transition methods:

```
transition = (node: HTMLElement, params: any) => {  delay?: number,  duration?: number,  easing?: (t: number) => number,  css?: (t: number, u: number) => string,  tick?: (t: number, u: number) => void}
```

For example, let’s implement a transition effect with rainbow-colored changes:

```
<script>  import { cubicInOut } from "svelte/easing";    let show = false;  function rainbow(node) {    const colors = [      "rgba(255, 0, 0, 1)",      "rgba(255, 154, 0, 1)",      "rgba(208, 222, 33, 1)",      "rgba(79, 220, 74, 1)",      "rgba(63, 218, 216, 1)",      "rgba(47, 201, 226, 1)",      "rgba(28, 127, 238, 1)",      "rgba(95, 21, 242, 1)",      "rgba(186, 12, 248, 1)",      "rgba(251, 7, 217, 1)",      "rgba(255, 0, 0, 1)",    ];    return {      duration: 3500,      easing: cubicInOut,      css: (t, v) => {        return `          background: ${colors[((t * 10) | 0) - 1]}        `;      },    };  }</script><button  on:click={() => {    show = !show;  }}>toggle</button>{#if show}  <div class="rainbow-box" transition:rainbow></div>{/if}<style>  .rainbow-box {    width: 80vw;    height: 200px;    border-radius: 5px;    border: 1px solid black;  }</style>
```

The colors in the array are as follows:

![colors]()

We implement a transition effect with a rainbow-like gradient:

![rainbow]()

## transition events

We can listen to the events of the following transition effects:

-   introstart
-   introend
-   outrostart
-   outroend

```
<script>  import { scale, fly } from "svelte/transition";  import { cubicInOut } from "svelte/easing";    let show = true;  const onIntroStart = () => {    console.log("intro start");  };  const onIntroEnd = () => {    console.log("intro end");  };  const onOutroStart = () => {    console.log("outro start");  };  const onOutroEnd = () => {    console.log("outro end");  };</script><button on:click={() => (show = !show)}>toggle</button>{#if show}  <div    class="ball"    in:scale={{      easing: cubicInOut,      duration: 2000,    }}    out:fly={{      x: 200,      y: 200,      duration: 2000,      easing: cubicInOut,    }}    on:introstart={onIntroStart}    on:introend={onIntroEnd}    on:outrostart={onOutroStart}    on:outroend={onOutroEnd}  ></div>{/if}
```

![events]()

In the various demonstrations above, we’ve learned that `svelte/transition` actually achieves transitions by controlling CSS animations. Therefore, we can also listen to the JavaScript `animationstart` and `animationend` events to perform certain operations at the start and end of the animation.

```
<script>  import { scale, fly } from "svelte/transition";  import { cubicInOut } from "svelte/easing";  let show = true;  const onIntroStart = () => {    console.log("intro start");  };  const onIntroEnd = () => {    console.log("intro end");  };  const onOutroStart = () => {    console.log("outro start");  };  const onOutroEnd = () => {    console.log("outro end");  };  const start = () => {    console.log("animation start");  };  const end = () => {    console.log("animation end");  };</script><button on:click={() => (show = !show)}>toggle</button>{#if show}  <div    class="ball"    in:scale={{      easing: cubicInOut,      duration: 2000,    }}    out:fly={{      x: 200,      y: 200,      duration: 2000,      easing: cubicInOut,    }}    on:introstart={onIntroStart}    on:introend={onIntroEnd}    on:outrostart={onOutroStart}    on:outroend={onOutroEnd}    on:animationstart={start}    on:animationend={end}  ></div>{/if}
```

![animationstart and animationend]()

## Animation

Currently, only one method `flip` is exported in `svelte/animation`.

## Summary

In this chapter and previous chapter, we learned about:

-   There are two kinds of motion effects exported in `svelte/motion`: tween interpolation and spring elasticity. And some third-party libraries that can provide the same effects.
-   CSS’s timing-function, easing functions, and Bezier curves function.
-   Various transition effects provided in Svelte; various directives serving transition effects such as `transition:fn`, `in:fn`, `out:fn`; and how to customize transition effects.
-   Listen to transition events
-   Incidentally, the website [robertpenner](http://robertpenner.com/easing/) provides a lot of details about animation implementation. Readers who are interested can explore it on your own.