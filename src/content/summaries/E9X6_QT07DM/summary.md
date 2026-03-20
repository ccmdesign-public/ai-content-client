---
metadata:
  videoId: "E9X6_QT07DM"
  title: "Figma Slots Explained"
  description: "Figma just introduced Slots, a new way to make components more flexible.


    In this video we break down how Figma Slots work, when to use them, and how they fit into real design systems.


    If you work with components in Figma, this is a feature worth understanding.


    🔗 KEY LINKS

    📣 JOIN THE COMMUNITY: https://uicollective.co/\ 

    ❎ Follow me on X: https://x.com/KirkMDesign


    Why Join UI Collective Academy? Get access to premium courses, premium downloads, and so much more on the way (I am largely building this solo...trying to make design education available for all, support goes a long way!)


    ↪️ Need a design system? (also included in the academy): https://collectivekit.co/


    🔗 VIDEOS TO WATCH

    Build a Design System: https://youtu.be/opTANvl9G1g

    Complex Design System Setup: https://youtu.be/L-tpK7Eeuow

    AI & Design Systems: https://youtu.be/XfezMs8B-O8


    🔗 MORE LINKS

    Let us build or fix your design system: https://designsystemlabs.co/

    📣 Save 20% on the Annual Mobbin plan: http://mobbin.com/uicollective

    kirkland@uicollective.co


    0:00 An Introduction

    0:45 Introduction to Slots

    2:18 How Slots Work

    5:28 Preferred Instances

    6:52 Modifying Our Existing Components

    7:54 Slots for Layouts

    9:07 Your Next Steps

    11:10 Outro"
  channel: "UI Collective"
  channelId: "UCBB1ZWZyf0RaKuHgpTjpcug"
  duration: "PT11M35S"
  publishedAt: "2026-03-06T13:54:51Z"
  thumbnailUrl: "https://i.ytimg.com/vi/E9X6_QT07DM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=E9X6_QT07DM"
processedAt: "2026-03-06T19:26:50.075Z"
source: "youtube"
tldr: "Figma slots are a new feature that allows designers to create flexible, editable content areas within components, eliminating the need to detach instances or create excessive variants for layout changes."
tools:
  - name: "Figma"
    url: null
categories:
  - "Product & Design"
tags:
  - "design-systems"
  - "figma"
  - "ui"
  - "ux"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9019
  outputTokens: 750
  totalTokens: 9769
  processingTimeMs: 67183
tagsNormalizedAt: "2026-03-06T19:29:07.961Z"
---

## Key Takeaways

Figma slots revolutionize component flexibility by allowing dynamic content areas. • **Slots are editable frames** inside components that let users rearrange or replace child elements without detaching the instance. • You can set **preferred instances** for slots to guide designers and speed up workflow, and **wrap existing component elements** in a slot for easy migration. • **Not all components need slots**; start with an audit focusing on layout-heavy components like cards, complex widgets, and accordions.

## Summary

Figma slots introduce a powerful new paradigm for building flexible design components. Unlike traditional components where rearranging internal elements required detaching the instance or creating numerous variants, slots allow designated areas within a component to be freely editable.

### What Are Slots?

Slots are frames inside a component that are converted into editable areas. When you create an instance of a component with a slot, you can click into that slot and freely add, remove, or rearrange the elements inside—all while maintaining the connection to the master component. This solves a major pain point where designers previously had to detach instances, creating messy, unlinked copies.

### Implementation and Best Practices

To create a slot, you must first place a frame inside a component. Only frames can be converted into slots. A key feature is the ability to set **preferred instances** for a slot. This creates "guard rails" for designers by surfacing recommended components (like specific image placeholders or text blocks) when they add content to the slot, eliminating the need to search the entire design system.

Figma's implementation is thoughtful for migration. Instead of rebuilding all components from scratch, you can select the elements inside an existing **legacy component** and simply wrap them in a new slot frame. This allows teams to incrementally adopt slots without a disruptive overhaul.

### Strategic Use Cases

Slots are ideal for **content cards**, **complex dashboard widgets** (allowing easy swapping of graphs and legends), and **accordions** (enabling varied content like text, images, or other components within the expandable area). They excel at creating flexible layout structures, such as rows or columns of slots for dashboard designs.

However, **not every component needs a slot**. Basic components like buttons, inputs, and icons do not benefit from this flexibility. The speaker advises starting with a team audit to identify which components would most improve designer workflow and efficiency, emphasizing a slow, considered rollout over rushing to implement the new feature everywhere.

## Context

This video matters because it addresses a fundamental limitation in design system workflows within Figma. Before slots, making even minor layout adjustments to a component instance (like moving an image above text) required detaching it, breaking the link to the source and creating maintenance headaches, or bloating the system with countless variants. Slots represent a significant evolution in component design, enabling true flexibility and reusability. This is crucial for design system maintainers, product designers, and teams working on complex applications (like fintech dashboards) where components need to adapt to diverse content without fracturing the design system's consistency.