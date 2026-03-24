---
metadata:
  videoId: "lXS2P3xtAUY"
  title: "A couple of great anchor positioning use cases"
  description: "Anchor positioning is great at a lot more than just tooltips!


    🔗 Links

    ✅ OddBird article I mentioned on fixes for when anchor positioning doesn't work: Here’s Why Your Anchor Positioning Isn’t Working: https://www.oddbird.net/2025/01/29/anchor-position-validity/

    ✅ The nav video I mentioned at the end: https://youtu.be/8_NQ7ARXz8c

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


    ⌚ Timestamps

    00:00 - Introduction

    00:45 - Tethering to another element

    06:45 - anchor-scope

    10:24 - Tethering to more than one element


    #css


    --


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


    And whatever you do, don't forget to keep on making your corner of the internet just a little bit more awesome!"
  channel: "Kevin Powell"
  channelId: "UCJZv4d5rbIKd4QHMPkcABCw"
  duration: "PT20M1S"
  publishedAt: "2026-01-28T14:01:23Z"
  thumbnailUrl: "https://i.ytimg.com/vi/lXS2P3xtAUY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=lXS2P3xtAUY"
processedAt: "2026-03-24T00:03:23.809Z"
source: "youtube"
playlistId: "PL-SEjLl-bojUBbH6pniyrHDaxs-WO6E7R"
playlistName: "Personal"
category: "personal"
tldr: "CSS anchor positioning enables dynamic element tethering without restructuring HTML: • Tether badges to sibling images using anchor positioning and anchor-scope • Create connecting lines between comment threads with multiple anchor references"
tools: []
categories:
  - "Product & Design"
  - "Web Development"
tags:
  - "html-css"
  - "performance"
  - "ui"
  - "ux"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 15757
  outputTokens: 530
  totalTokens: 16287
  processingTimeMs: 18751
tagsNormalizedAt: "2026-03-24T04:12:33.092Z"
---

## Key Takeaways

CSS anchor positioning solves layout problems without HTML restructuring by creating dynamic relationships between elements.

## Summary

The video explores two practical applications of CSS anchor positioning beyond the typical tooltip and menu use cases.

The first example demonstrates **tethering a badge to an image** that isn't a direct parent-child relationship. Normally, positioning a badge in the bottom-right corner of an image would require complex calculations if the image size changes. With anchor positioning, you can declare `anchor-name: --product-image` on the image element, then on the badge use `position: absolute`, `position-anchor: --product-image`, and `bottom: anchor(bottom)` with `right: anchor(right)`. This creates a direct relationship where the badge stays positioned relative to the image regardless of its dimensions.

A crucial consideration is **anchor scope** - when multiple elements share the same anchor name, you need to scope them using `anchor-scope: --product-image` on a parent element to prevent all badges from anchoring to the last image in the DOM.

The second example shows **tethering to multiple elements** using a chat thread visualization. Each reply needs a connecting line from the parent comment to itself. By setting anchor names on both the comment (`--comment`) and reply (`--reply`) elements, a single pseudo-element can be positioned using multiple anchor references: `top: anchor(bottom from --comment)` and `bottom: anchor(center from --reply)`. The `anchor()` function accepts modifiers like `from` to specify which anchor to reference.

Both examples highlight how anchor positioning eliminates the need for JavaScript calculations or HTML restructuring when designers change layout requirements. The browser handles all positioning calculations automatically, making responsive designs more maintainable.

## Context

CSS anchor positioning is a relatively new specification that solves long-standing layout challenges in web development. Frontend developers and designers should care about this because it eliminates complex JavaScript calculations for element positioning and reduces HTML restructuring when design requirements change. This connects to broader trends toward more declarative, powerful CSS that reduces reliance on JavaScript for visual effects.