---
metadata:
  videoId: "UuXF22EQTCU"
  title: "NEW Instruckt: Visual Annotations for Claude Code and Other AI Agents"
  description: "A new tool by Josh Cirre to avoid making screenshots for visual changes on the websites.


    Repo: https://github.com/joshcirre/instruckt-laravel?tab=readme-ov-file

    Initial tweet with announcement: https://x.com/joshcirre/status/2030228605620642160?s=20


    More of my AI Coding experiments on my Substack: https://aicodingdaily.substack.com"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT5M26S"
  publishedAt: "2026-03-08T09:52:48Z"
  thumbnailUrl: "https://i.ytimg.com/vi/UuXF22EQTCU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=UuXF22EQTCU"
processedAt: "2026-03-10T16:12:02.922Z"
source: "youtube"
tldr: "Instruckt is a new tool that simplifies providing visual feedback to AI coding agents like Claude Code by allowing developers to visually annotate web elements and generate structured prompts for making UI changes."
tools:
  - name: "Instruckt"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Laravel"
    url: null
  - name: "Livewire"
    url: null
  - name: "Blade"
    url: null
  - name: "Tailwind CSS"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
  - "Web Development"
tags:
  - "ai-coding"
  - "claude"
  - "productivity"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4246
  outputTokens: 871
  totalTokens: 5117
  processingTimeMs: 77360
tagsNormalizedAt: "2026-03-10T16:43:24.488Z"
---

## Key Takeaways

Instruckt is a visual annotation tool that streamlines UI feedback for AI coding agents.

*   **Visual annotation workflow:** Instead of screenshots, you click on page elements, add notes, and the tool automatically generates a structured prompt with element identifiers (like HTML tags and Tailwind classes).

*   **Framework-agnostic core with Laravel focus:** While built around a JavaScript core for broad compatibility, it has a dedicated Laravel package and adapters for Livewire and Blade, making it particularly useful for Laravel developers.

*   **Seamless AI agent integration:** The generated markdown prompt can be directly pasted into Claude Code (or similar AI agents), which then executes the requested visual changes, such as modifying text or links.

## Summary

The video introduces **Instruckt**, a tool designed to solve the cumbersome process of providing visual feedback to AI coding assistants. Traditionally, developers have to take and manage multiple screenshots to explain desired UI changes. Instruckt replaces this by adding a toolbar to a web page, allowing users to click on elements (like a headline or button) and attach notes (e.g., "make this font bigger" or "change this text to a link").

These visual annotations are then compiled into a markdown prompt. Crucially, Instruckt identifies the specific HTML elements (like `span` or `h1` tags) and their associated CSS classes (including Tailwind classes common in Laravel projects). This structured data is what the AI agent, such as **Claude Code**, needs to understand and implement the changes precisely.

The demonstration shows the tool being used on a Laravel welcome page. The user annotates two elements: changing "Laracasts" to "Laravel Daily" with a link, and increasing the font size of a "Get Started" button. After copying the generated prompt into Claude Code and executing it, the page refreshes to show both changes applied successfully, with the annotations cleared.

### Installation and Technical Details

Instruckt consists of two main packages: a framework-agnostic JavaScript core (`instruct`) and a Laravel-specific package (`instruct-laravel`). For the demo, the presenter installs it via Composer (`composer require instruct/install`) and adds a Blade component to the layout. The tool offers configuration options like keyboard shortcuts, toolbar placement, and MCP (Model Context Protocol) tools. It's noted as being in early release but highly promising for streamlining AI-assisted frontend adjustments.

## Context

This tool addresses a growing pain point in the AI-assisted development workflow. As developers increasingly use AI agents like Claude Code for coding tasks, communicating visual or UI-specific changes remains inefficient. Manually describing elements or sharing screenshots is time-consuming and prone to error. Instruckt bridges this gap by creating a direct, visual communication channel between the developer and the AI, making iterative design and content changes significantly faster. This is particularly relevant for full-stack developers, especially those working with Laravel and Tailwind CSS, who want to leverage AI for frontend tweaks without leaving their development environment.