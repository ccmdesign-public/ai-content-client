---
metadata:
  videoId: "HNp8naNxS0w"
  title: "jQuery 4 FINALLY released... (What!?)"
  description: "jQuery 4 is finally here, 20 years later. Let’s break down what changed, what broke, what got removed, and why this “old” library still powers most of the web today.


    🔗 Relevant Links

    jQuery 4: https://blog.jquery.com/2026/01/17/jquery-4-0-0/

    w3tech source: https://w3techs.com/technologies/details/js-jquery


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT4M31S"
  publishedAt: "2026-01-23T17:30:15Z"
  thumbnailUrl: "https://i.ytimg.com/vi/HNp8naNxS0w/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=HNp8naNxS0w"
processedAt: "2026-01-24T16:12:18.845Z"
source: "youtube"
tldr: "jQuery 4, the first major update since 2016, modernizes the library by dropping legacy browser support (IE10 and below), migrating to ES modules, removing functions now native to JavaScript, and fixing long-standing bugs, while still powering 88% of websites."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1823
  outputTokens: 921
  totalTokens: 2744
  processingTimeMs: 70203
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tools:
  - name: "jQuery"
    url: "https://blog.jquery.com/2026/01/17/jquery-4-0-0/"
  - name: "Vite"
    url: null
  - name: "Webpack"
    url: null
  - name: "WordPress"
    url: null
  - name: "BetterStack"
    url: "https://betterstack.com/"
  - name: "GitHub"
    url: "https://github.com/BetterStackHQ"
  - name: "w3techs"
    url: "https://w3techs.com/technologies/details/js-jquery"
categories:
  - "Web Development"
tags:
  - javascript
  - nodejs
  - performance
---

## Key Takeaways

The j

Query 4 release marks a significant modernization effort for the 20-year-old library still used by 88% of websites.

*   **Drops legacy browser support**, ending support for Internet Explorer 10 and below, Edge Legacy, and old mobile browsers, while IE11 support remains until j

Query 5.

*   **Modernizes the codebase** by migrating from AMD to ES modules for better compatibility with modern build tools like Vite and Webpack.

*   **Removes redundant functions** like `$.is

Array` and `$.trim` that are now standard in Java

Script itself, reflecting the language's evolution.

*   **Fixes long-standing bugs** and inconsistencies, such as focus event ordering and automatic pixel appending in CSS, some dating back to 2014.

## Summary

j

Query 4 represents a major, long-awaited update focused on modernization and removing legacy cruft. After two years in beta, this release makes breaking changes the team has wanted for years, acknowledging that while j

Query still powers a vast majority of websites (largely through Word

Press), it needs to evolve with the web platform.

### Browser Support Modernization
The most visible change is the **dropped support for legacy browsers**. Internet Explorer 10 and below, Edge Legacy, and older versions of iOS, Firefox, and Android browsers are no longer supported. Internet Explorer 11 support remains for now but is slated for removal in j

Query 5. This allows j

Query to stop polyfilling behaviors for outdated platforms.

### Architectural & API Updates
The core code has been migrated from **AMD to ES modules**, making it play nicely with modern bundlers like Vite and Webpack without workarounds. Furthermore, a host of j

Query utility functions have been removed because their functionality is now native to Java

Script. Examples include `$.is

Array`, `$.parseJSON`, `$.trim`, `$.is

Numeric`, and `$.is

Function`.

### Bug Fixes & Consistency
With older browsers out of the picture, j

Query can now align with modern standards. A key fix is for **focus event ordering**; j

Query previously had to enforce its own order because browsers disagreed, but now all supported browsers (except IE11) behave consistently. The update also squashes bugs dating back years, like j

Query auto-promoting JSON to JSONP (2014) and the CSS setter automatically appending 'px' to unitless numbers (2015).

### Slim Build & Legacy Role
The team offers a **slim build** (19.5KB) that strips out modules for features like animations (now easier in CSS) and deferreds/callbacks (largely replaced by Promises). This reflects j

Query's current role: a stable, modernized library crucial for maintaining legacy applications and a testament to the layered, evolutionary nature of web technology, even if it's not the first choice for new projects.

## Context

j

Query remains a foundational pillar of the web, with an estimated 88% of sites still relying on it, often through Word

Press or other legacy systems. This update matters to developers maintaining these existing sites and to anyone interested in web development history and ecosystem evolution. It highlights how core web technologies mature: libraries like j

Query initially fill gaps in the native platform (Java

Script, browsers), and then shrink as those platforms catch up, focusing on stability and modernization for their enduring user base.