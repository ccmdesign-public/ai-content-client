---
metadata:
  videoId: "wym3V9FycTk"
  title: "Josh Puckett - Crafting interfaces with uncommon care"
  description: "What does it look like to demonstrate uncommon care in the way you design and build an interface?


    Josh Puckett (https://x.com/joshpuckett?lang=en) has has spent nearly two decades designing products like Wealthfront, Dropbox and helping dozens of startups.


    But recently he released Interface Craft (https://www.interfacecraft.dev/) which is a library of everything he's learned about through the years about designing with “uncommon care” 👇


    ⭐ Use this code for 20% off Interface Craft: DIVE20


    Some highlights:


    - Josh’s principles for great design

    - Morphing strategies for micro-interactions

    - How the value proposition of design is shifting

    - He builds a custom pattern generator on the fly

    - How Josh makes storyboards to collaborate with AI

    - Walks us through how he designed the onboarding flow


    Dive is where the best designers never stop learning 🤿


    🌐 dive.club

    🐦 twitter.com/joindiveclub


    Now you can join advanced courses taught by the top designers to help you take a huge leap forward in your career 💪


    Chapters

    0:00 Intro

    1:31 Designing the onboarding for Interface Craft

    9:02 How to build a custom design tool

    14:12 Continuing to pull on the library metaphor

    19:49 Solving the 3 slider problem

    27:47 Sweating the micro interaction details

    35:48 Building the v0 and Claude gift experiences

    41:27 How the value proposition of design is shifting"
  channel: "Dive Club 🤿"
  channelId: "UCkCnraWwlnBw1_i7C9-3p0w"
  duration: "PT53M58S"
  publishedAt: "2026-03-12T12:05:13Z"
  thumbnailUrl: "https://i.ytimg.com/vi/wym3V9FycTk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=wym3V9FycTk"
processedAt: "2026-03-12T15:30:24.086Z"
source: "youtube"
tldr: "Designer Josh Puckett demonstrates how to demonstrate 'uncommon care' in interface design by going beyond functional requirements to create memorable, tactile experiences that build trust and perceived value, using his interactive library card onboarding for his 'Interface Craft' course as a case study."
tools:
  - name: "Figma"
    url: null
  - name: "Framer"
    url: "https://framer.com"
  - name: "v0"
    url: null
  - name: "Claude"
    url: null
  - name: "Raycast"
    url: null
  - name: "Mobbin"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
  - "Programming"
tags:
  - "ai-coding"
  - "best-practices"
  - "product-management"
  - "ui"
  - "ux"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 42930
  outputTokens: 1574
  totalTokens: 44504
  processingTimeMs: 76099
tagsNormalizedAt: "2026-03-12T16:12:13.316Z"
---

## Key Takeaways

Josh Puckett, a veteran designer from Wealthfront and Dropbox, shares his philosophy of 'uncommon care' in product design.

*   **Design as Hospitality:** Treat interface design like a high-end hospitality experience, where thoughtful details (like personalized notes or custom sounds) communicate care and build user trust and affinity.

*   **Fidgetability & Tactile Metaphors:** Create interfaces that feel tactile and playful ('fidgetable'), encouraging exploration and personal expression, as demonstrated by the customizable, signable library card metaphor.

*   **AI for Exploration, Not Just Execution:** Use AI coding tools (like v0, Claude) to rapidly prototype and explore a wide 'conceptual range' of ideas, freeing up time to go deeper ('conceptual depth') on perfecting a few essential interactions.

*   **Intent Over Implementation:** Communicate your design intent to AI in simple language or rough sketches; you don't need to know the exact technical implementation (e.g., 'sine wave') to get started.

*   **Restraint and Distillation:** With AI enabling more complexity, practice intentional restraint. Follow the Shaker principle: 'make it as well as you can and make it as simple as you can,' constantly hacking away at the unessential.

*   **Morphing Interfaces for Focus:** Use **morphing interfaces** (inspired by designers like Benji from Family) where UI elements fluidly transform based on context (e.g., an 'Edit' button becoming 'Done'), reducing cognitive load and keeping users in the flow.

## Summary

### Introduction to Uncommon Care

Josh Puckett, a designer with nearly two decades of experience at companies like Wealthfront and Dropbox, introduces the core concept of 'uncommon care' in interface design. He argues that meticulous attention to detail in digital products communicates to users that the creator values their time and experience. This builds trust, increases perceived value, and fosters a stronger affinity for the product. The conversation centers on his recent project, 'Interface Craft'—a course and resource library—and specifically its world-class onboarding flow, which serves as a prime case study for these principles in action.

### The Library Card Metaphor and Viral Onboarding

The onboarding for Interface Craft was designed to feel 'special' and immediately demonstrate the care promised by the course. Puckett landed on the metaphor of a library card—a tactile, personal object that grants access. The flow allows users to choose from 14 color combinations and generative graphics on an infinite canvas, then personalize their card by signing it. This act of creation and expression was key to the feature going viral on design Twitter, as users spent minutes crafting their perfect signature and shared their unique cards. Puckett even used AI to write personalized welcome notes for people he knew personally, adding another layer of considered detail.

### AI as a Collaborative Crafting Tool

A major theme is how Puckett leverages AI not to add scope, but to deepen the execution of core ideas. He demonstrates building custom design tools in minutes to generate and parameterize graphics, like the wave function-driven patterns on the cards. He emphasizes that the bottleneck is now creativity, not implementation. Designers can describe their intent in plain English (e.g., 'a grid where each item's opacity is controlled by a sine wave') or even paste rough Figma sketches into AI coding agents to get a working prototype instantly. This allows for rapid exploration of a 'conceptual range' of ideas before selecting the best one to pursue with 'conceptual depth.'

### Solving Complex UI Problems with Elegant Math

Puckett dives deep into a specific UI challenge: letting users control three parameters of a wave graphic (frequency, amplitude, phase) without overwhelming them with three sliders. His solution was to research and implement a **Lissajous curve** (an infinity symbol-shaped slider) that maps one user input to changes in all three underlying values. He discovered this mathematical concept by expressing his goal to AI ('how do I change three parameters at once?'). This 'leisure slider' provides a dynamic, mysterious, and fidgetable control that feels intuitive and magical, replacing what would have been a cluttered, labeled control panel.

### The Details of Craft: Morphing Interfaces and Sound Design

The interview deconstructs the micro-interactions within the card editor. Puckett advocates for **morphing interfaces**, where buttons fluidly transform based on state (e.g., 'Edit Name' becomes 'Done'), keeping the user focused on the card itself rather than popping modals. He details considerations like auto-focusing the input, fading out non-essential UI, and changing helper text. Furthermore, he collaborated with a sound designer to create custom, dynamic scratching sounds for a virtual 'scratch-off' gift card that revealed promo codes, where the sound changed based on the direction and intensity of the user's scratch. These layers of polish make the experience feel physical and real.

### Philosophical Framework: Restraint, Reach, and Reps

Puckett frames the designer's new role in the AI era. Tools compress the time from idea to implementation, meaning designers should spend saved time on deeper thinking and refinement. He cites Bruce Lee: 'Hack away at the unessential.' The goal is to use AI to expand your 'conceptual reach' and then apply rigorous 'conceptual depth' to distill the idea to its essence. For designers early in their career, his advice is to embrace the 'five beats a day' philosophy—use AI to rapidly create and test many iterations (take 'shots on goal') to build intuition. The ultimate value designers bring is the considered thought, care, and creative direction that turns a functional interface into a memorable experience.

## Context

Josh Puckett is a seasoned product designer with nearly two decades of experience, having worked on major products like Wealthfront and Dropbox and advised dozens of startups. He recently launched 'Interface Craft,' a library distilling his learnings the 'Interface Craft' library, distilling his learnings about high-craft design. This conversation appears on the Dive Club podcast, hosted by Rid, which focuses on continuous learning for designers. The discussion is highly relevant as AI coding tools (like v0, Claude Code) are democratizing implementation, shifting the designer's role from pixel-perfect mockups to rapid prototyping and deeper experiential thinking. This video is essential for product designers, UX engineers, and front-end developers who want to understand how to leverage AI not just for speed, but to elevate the quality, creativity, and emotional resonance of their work, moving beyond functional UI to crafted experiences.