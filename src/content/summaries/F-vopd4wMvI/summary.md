---
metadata:
  videoId: "F-vopd4wMvI"
  title: "When Variables Cascade with MIRIAM SUZANNE - SmashingConf New York 2025"
  channel: "Smashing Magazine"
  channelId: "UCSDtqcJ8ZXviPrEcj1vuLiQ"
  duration: "PT56M17S"
  publishedAt: "2026-03-20T16:13:39Z"
  thumbnailUrl: "https://i.ytimg.com/vi/F-vopd4wMvI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=F-vopd4wMvI"
processedAt: "2026-03-24T01:15:46.998Z"
source: "youtube"
tldr: "CSS expert Miriam Suzanne explains that CSS custom properties (variables) fundamentally work differently from variables in imperative languages like JavaScript or Sass, requiring developers to understand the CSS value resolution process (filtering, cascading, defaulting, and resolving) to avoid common pitfalls and effectively use new features like container queries, if functions, and custom functi"
tools: []
categories:
  - "Programming"
  - "Web Development"
tags:
  - "best-practices"
  - "html-css"
  - "javascript"
  - "performance"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 33277
  outputTokens: 1587
  totalTokens: 34864
  processingTimeMs: 234021
tagsNormalizedAt: "2026-03-24T04:10:45.633Z"
---

## Key Takeaways

This talk by CSS expert Miriam Suzanne explores how CSS custom properties (variables) work within the declarative nature of CSS, contrasting them with variables in imperative languages like JavaScript and Sass, and explaining the CSS value resolution process that developers must understand to avoid common pitfalls.

*   **CSS is declarative, not imperative:** Variables in CSS do not follow a linear, step-by-step execution order like in JavaScript. Instead, they are resolved as part of the CSS cascade and inheritance system, where order only matters for resolving conflicts within the same property.

*   **The CSS value resolution process is key:** To understand how variables work, you must understand the four-stage process the browser uses: **filtering** (removing invalid/unmatched rules), **cascading** (resolving conflicts based on origin, importance, specificity, and order), **defaulting** (filling in missing values via inheritance or initial values), and finally **resolving** (substituting variables and calculating final values).

*   **Custom properties have unique behaviors:** They are typeless by default (accepting any value), making them **"invalid at computed value time"** if the substituted value doesn't match the target property's type. Importance (`!important`) applies to the custom property itself, not to the properties that use it. Their fallback in the `var()` function only triggers if the variable's value is the **"guaranteed invalid value"** (like `initial` for an unregistered property).

*   **New CSS features inherit this complexity:** Upcoming features like the `if()` function, custom functions (`@function`), and mix-ins will also exhibit "invalid at computed value time" behavior because they cannot be evaluated during the initial parse, requiring the same mental model as variables.

*   **Practical architecture advice:** Use **cascade layers** to manage legacy code and third-party styles systematically. Avoid over-constraining designs; write CSS that allows the browser and user preferences flexibility. Understand that inheritance passes **computed values**, not the raw specified values (e.g., `2em` becomes `32px` before being inherited).

## Summary

### Introduction and Core Distinction

Miriam Suzanne begins by contrasting variable behavior in imperative languages (JavaScript, Sass) versus declarative CSS. In an imperative example, a variable is set to red, then yellow, then used, then set to green and blue. The background color using that variable becomes yellow, as the code executes step-by-step. The same code in CSS yields a different result: powder blue. This is because CSS is declarative—the browser doesn't execute steps but instead resolves a "bucket of properties" for each element.

To get one final value for every property on every element, the browser follows a specific **value resolution process**. Suzanne argues that understanding this process is crucial, especially as CSS gains powerful new features inspired by pre-processors.

### The CSS Value Resolution Process

The process has four main stages: **filtering, cascading, defaulting, and resolving**.

First, **filtering** removes irrelevant or invalid declarations. CSS is strictly typed; each standard property has allowed value types. `color: 3M;` is discarded at parse time because `3M` is not a valid color type. However, custom properties are typeless by default. `--my-color: 3M;` is valid syntax, even if later used in `color: var(--my-color);`. This leads to **"invalid at computed value time"** behavior—the invalidity is only caught later in the process.

Second, **cascading** resolves conflicts between remaining declarations using origin, importance, cascade layers, specificity, and finally order of appearance. Custom properties cascade like any other property, but `!important` on a variable does not transfer to the property using it. If `background-color: maroon !important` conflicts with `background-color: var(--my-color)` where `--my-color` is `deep-pink !important`, `maroon` wins because the importance is evaluated on the `background-color` property, not the variable it references.

Third, **defaulting** fills in values if the cascade yields none. Some properties **inherit** from their parent (typically text-related properties like `color` and `font-size`), while others use an **initial value** (typically box-related properties like `padding`). Every property has a defined initial value (e.g., `display: inline`, `color: canvasText`). Custom properties have a special **"guaranteed invalid value"** as their initial value, which triggers fallbacks in the `var()` function.

Fourth, **resolving** substitutes variables, evaluates functions, and calculates final values (e.g., converting `2em` to `32px`). **Inheritance passes the parent's computed value, not its specified value.** This is a key detail for variables containing calculations.

### Implications for New Features and Development Practices

Suzanne explains that new CSS features like the `if()` function, custom functions (`@function`), and mix-ins will also be **"invalid at computed value time."** They cannot be validated early, so developers must understand this late-failure model.

She offers practical advice for CSS architecture. **Cascade layers** are a powerful tool for managing code, especially in legacy systems. Start by placing resets and third-party code in layers to gain control over the cascade. Avoid **over-constraining** designs; CSS is designed to be flexible for the browser and user. For accessibility, leverage new features like `light-dark()` and upcoming style queries to respect user preferences.

In the Q&A, Suzanne discusses tools like Sass and Tailwind. She views Sass as a complementary tool for static pre-processing, while expressing concern that tools like Tailwind can become an obstacle by reinventing CSS features and controlling what parts of the language developers can use. On modernizing legacy CSS, her first step would be to introduce layers to establish control over the cascade order before refactoring.

## Context

Miriam Suzanne is a prominent CSS expert, spec author, and developer who has been deeply influential in the evolution of CSS, contributing to features like cascade layers and container queries. This talk was delivered at SmashingConf New York 2025, a major front-end development conference. The talk is situated within a period of rapid innovation in CSS, where features once only possible with pre-processors (Sass) or JavaScript are now being integrated natively into the browser (e.g., nesting, container queries, custom functions). This creates a knowledge gap for developers who need to understand how these native implementations differ fundamentally from their pre-processor counterparts due to CSS's declarative, cascade-based nature. The talk is essential for intermediate to advanced web developers, CSS architects, and anyone who wants to move beyond copying patterns and truly understand how to write robust, maintainable, and future-proof CSS in the modern era.