---
metadata:
  videoId: "vGfTyHPWZLE"
  title: "Build smarter color systems with relative colors"
  description: "Relative colors are one of my favorite new features in CSS, and in this video I take a bit of time exploring why.


    (this video is reposted, the original one was missing the last 2 minutes!)


    🔗 Links

    ✅ The demo: https://codepen.io/kevinpowell/pen/wBMbozY

    ✅ The pragmatic guide to color, part one: https://piccalil.li/blog/a-pragmatic-guide-to-modern-css-colours-part-one/

    ✅ The pragmatic guide to color, part 2: https://piccalil.li/blog/a-pragmatic-guide-to-modern-css-colours-part-two/

    ✅ Piccalilli's courses: https://piccalil.li/courses/


    ✉ Keep up to date with everything I'm up to  https://www.kevinpowell.co/newsletter

    💬 Come hang out with other devs in my Discord Community https://discord.gg/nTYCvrK

    ⭐ Are you a beginner? HTML & CSS for absolute beginners is for you: https://learn.kevinpowell.co

    🎓 Start writing CSS with confidence with CSS Demystified: [https://cssdemystified.com](https://cssdemystified.com/)

    🚀 Already mastered CSS? Check out my advanced course, Beyond CSS: https://www.beyondcss.dev/


    ---


    Help support my channel

    👨‍🎓 Get a course: https://www.kevinpowell.co/courses

    👕 Buy a shirt: https://cottonbureau.com/people/kevin-powell

    💖 Support me on Patreon: https://www.patreon.com/kevinpowell or through YT memberships: https://youtube.com/@KevinPowell/join


    ---


    🧑‍💻 My editor: VS Code - https://code.visualstudio.com/


    🌈 My theme: One Dark Pro Var Night

    🔤 My font: Cascadia Code


    ---


    I'm on some other places on the internet too!


    If you'd like a behind the scenes and previews of what's coming up on my YouTube channel:


    Bluesky: https://bsky.app/profile/kevinpowell.co

    Codepen: https://codepen.io/kevinpowell/

    Github: https://github.com/kevin-powell


    ---


    And whatever you do, don't forget to keep on making your corner of the internet just a little bit more awesome!


    ⌚ Timestamps

    00:00 - Introduction

    00:40 - the basics of relative colors

    04:20 - why this is so powerful

    06:50 - the pragmatic guide to color

    07:45 - using oklch instead of hsl


    #css"
  channel: "Kevin Powell"
  channelId: "UCJZv4d5rbIKd4QHMPkcABCw"
  duration: "PT10M41S"
  publishedAt: "2026-01-07T16:59:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/vGfTyHPWZLE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=vGfTyHPWZLE"
processedAt: "2026-01-26T07:31:51.417Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Use CSS relative colors with `hsl from` and `oklch from` syntax to generate lighter, darker, and transparent color variations from a single base variable, replacing manual color variables for better consistency and maintainability."
tools: []
categories:
  - "Web Development"
tags:
  - "css"
  - "relative-colors"
  - "color-systems"
  - "frontend"
  - "design-systems"
  - "oklch"
  - "hsl"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3944
  outputTokens: 899
  totalTokens: 4843
  processingTimeMs: 34427
---

## Key Takeaways

CSS relative colors enable dynamic color systems from a single source. Key insights include:

*   **Use `hsl from` or `oklch from` syntax** to manipulate hue, saturation, and lightness values directly from a base CSS variable.

*   **Generate variations automatically** for backgrounds, borders, and shadows by modifying the lightness or alpha channel, eliminating separate variables.

*   **Prefer `oklch` over `hsl`** for color manipulation as it provides more perceptual consistency across different hues, especially for yellows and greens.

*   **Combine with data attributes** for dynamic theming, where a single custom property can be updated to change an entire component's color scheme.

## Summary

The video demonstrates how to build smarter, more maintainable color systems in CSS using the relative colors syntax, which allows developers to generate color variations from a single source value.

**The Core Syntax: `hsl from` and `oklch from`**
The fundamental technique uses the `hsl from` function. By writing `color: hsl(from var(--base-color) h s l)`, you can access the hue (h), saturation (s), and lightness (l) channels of a base color variable. The power comes from being able to replace any of these placeholders with a new value. For example, `background-color: hsl(from var(--base-color) h s 90%)` creates a background that is a lighter tint of the base color by fixing the lightness at 90%.

**Practical Applications and Workflow**
This method is perfect for UI components like toast notifications that require multiple color states (info, warning, error). Instead of declaring separate variables for text, background, and border colors for each state, you declare one base color variable (e.g., `--toast-color`). All other colors are derived from it using relative colors. This is often paired with data attributes (e.g., `data-toast="warning"`) for dynamic theming, where JavaScript only needs to update the single `--toast-color` property.

You can also adjust opacity for effects like shadows by adding a forward slash and alpha value: `box-shadow: ... hsl(from var(--base-color) h s l / 0.25)`. To ensure text readability on colored backgrounds, you can fix the text color's lightness to a darker value (e.g., 20%) regardless of the base hue.

**Superior Color Space: OKLCH**
While `hsl` works, the video strongly recommends using the `oklch` color space for manipulations. The `oklch` model (Lightness, Chroma, Hue) is perceptually uniform, meaning a change in lightness value looks consistent across all hues. In `hsl`, colors like yellow appear perceptually brighter at the same lightness value as a blue. By using `oklch from` (e.g., `oklch(from var(--base-color) l c h)`), your generated color variations—like lighter backgrounds or darker text—will maintain a more consistent visual weight and contrast across your entire palette, leading to a more polished design system.

## Context

For years, front-end developers have managed color palettes by manually creating and maintaining numerous CSS variables for different shades and transparencies of the same base color (e.g., `--primary`, `--primary-light`, `--primary-dark`). This is tedious, error-prone, and hard to maintain. CSS relative colors, supported in modern browsers, solve this by allowing colors to be defined relative to others. This matters for any developer or designer building design systems, component libraries, or themable applications, as it drastically reduces code complexity and ensures color relationships are mathematically consistent.