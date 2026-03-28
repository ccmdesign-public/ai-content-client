---
metadata:
  videoId: "aRB-DFZxtvs"
  title: "🚨🚨 Using NEW UNRELEASED Cursor!!!!!!!!  IS IT GOING TO BE GREAT #ad 🚨🚨"
  description: "https://twitch.tv/ThePrimeagen - I Stream on Twitch


    https://twitter.com/terminaldotshop - Want to order coffee over SSH?

    ssh terminal.shop


    Become Backend Dev: https://boot.dev/prime

    (plus i make courses for them)


    This is also the best way to support me is to support yourself becoming a better backend engineer. \ 


    Great News?  Want me to research and create video????: https://www.reddit.com/r/ThePrimeagen


    Kinesis Advantage 360: https://bit.ly/Prime-Kinesis"
  channel: "The PrimeTime"
  channelId: "UCUyeluBRhGPCW4rPe_UvBZQ"
  duration: "PT2H51M1S"
  publishedAt: "2026-03-26T20:28:42Z"
  thumbnailUrl: "https://i.ytimg.com/vi/aRB-DFZxtvs/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=aRB-DFZxtvs"
processedAt: "2026-03-28T17:56:31.204Z"
source: "youtube"
tldr: "Prime and TJ test an unreleased alpha version of Cursor to build a local-first Go and DataStar app for tracking quotes.

  They demonstrate new features like design mode, which allows drawing on the live UI to prompt changes, and Cloud Agents, which run parallel AI models on remote VMs.

  Cursor lead Jonas explains internal debates on managing AI-generated code via work trees versus Git state."
tools:
  - name: "Cursor"
    url: null
  - name: "Go"
    url: null
  - name: "DataStar"
    url: null
  - name: "SQLite"
    url: null
  - name: "GitHub"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "cursor"
  - "git"
  - "go"
  - "llm"
  - "productivity"
ai:
  provider: "notebooklm"
  model: "notebooklm"
  apiCalls: 1
  fallbackAttempts: 0
  processingTimeMs: 78603
tagsNormalizedAt: "2026-03-28T18:07:33.680Z"
---

## Key Takeaways

Here are the most important takeaways from the unreleased Cursor demonstration:

* The unreleased version of **Cursor** introduces a visual **design mode** that allows developers to draw directly on a live UI to prompt the AI for specific front-end changes.

* Cursor is rolling out **Cloud Agents**, which run on remote VMs to enable unlimited parallelism without overloading local hardware, complete with port forwarding and remote terminals.

* The creators built a local-first web app using **Go**, **DataStar**, and **SQLite**, successfully bypassing modern JavaScript frameworks like React.

* Instead of writing a massive initial prompt, the developers used a **plan mode** to force the AI to ask them clarifying questions about the database schema and UI flow.

* There is an internal debate at Cursor regarding how to handle AI edits: whether to rely on standard **Git state** for best-effort tracking or to enforce **work trees** for isolated, branch-based changes.

* Prime highlights the need for UI selection tools to **walk up** the DOM tree, as selecting the exact parent container in visual prompting tools can be frustrating.

## Summary

This stream features Prime and TJ building a web application from scratch using an unreleased, highly experimental alpha version of the Cursor coding assistant.
The broadcast serves as both a live product demonstration and an exploration of modern AI-assisted software development techniques.

### Building a Local-First Family App

The core project for the stream is an application designed for TJ's wife, Kaen, to securely store and organize humorous quotes from their children.
Currently relying on Google Keep, Kaen acts as the live product manager, providing specific requirements such as tracking ages, adding profile pictures, and capturing multi-person dialogue.
To ensure privacy and longevity, the developers opt for a local-first architecture using a Go backend, DataStar for hypermedia-driven frontend interactions, and a SQLite database.
They explicitly instruct the AI to avoid modern JavaScript frameworks like React and to skip strict test-driven development, relying instead on the simplicity of their SQLite sandbox and rapid visual iteration.

### Prompting Strategies and Schema Design

Instead of writing a massive, prescriptive prompt, Prime and TJ utilize a planning mode where they instruct the AI to ask them clarifying product questions first.
The AI generates a comprehensive list of questions regarding database schemas, UI flows, file handling for profile pictures, and edge cases like timestamp overriding.
During the database generation, they actively intervene to modify the schema, requesting that dialogue lines be stored as JSON text entries rather than separate relational tables.
They also encounter naming philosophy debates, forcefully instructing the AI to rename all instances of profiles to people to make the family application feel warmer and less clinical.
They discuss the importance of placing commands at the bottom of long prompts to maximize the LLM's attention mechanism.
They also experiment with pulling in external design inspiration, asking the AI to search the web for Gary Tan's GStack design principles to apply high-end styling to their basic HTML forms.

### Visual Prompting and Design Mode

A major feature showcased in the unreleased version of Cursor is a visual design mode that operates directly within the browser view.
Rather than describing CSS changes in text, developers can draw bounding boxes around specific UI elements and attach natural language instructions.
Prime uses this feature extensively to fix broken scroll bars, align input fields, and swap out clunky radio buttons for interactive pushpin icons.
Prime discovers that switching between the design mode and the standard code editor sometimes causes the application state to freeze, requiring a manual refresh.
While Prime praises the tactile feel of this vibe coding experience, he notes a critical user experience hurdle: it is often difficult to select the exact correct parent container or HTML div.
He suggests adding a feature to visually walk up the DOM tree using keyboard shortcuts to easily expand a selection bounding box.

### Cloud Agents and Remote Parallelism

Midway through the stream, the hosts test Cursor's new Cloud Agents feature by navigating to a dedicated onboarding URL.
This feature provisions a remote virtual machine that automatically configures the project's dependencies and runs the application in the cloud.
By offloading the computational load, developers achieve unlimited agent parallelism without burning out their local CPU or hardware.
The cloud agent includes remote terminal access and port forwarding, allowing Prime to safely instruct an agent to completely redesign the quotes page while he continues working locally.
In a comedic twist, the remote agent takes the prompt to make it look like a cell phone conversation literally, wrapping the entire web UI inside a massive graphic of a mobile phone.

### The Two Schools of AI Version Control

Jonas, a lead developer at Cursor, joins the stream to explain the internal debates shaping the product's future.
He outlines two distinct schools of thought regarding how to manage the code changes generated by autonomous AI agents.
The first camp believes that because agents can execute complex, untrackable terminal commands, the editor should simply display a best effort Git state and let standard version control handle the rest.
The second camp, which Prime strongly supports, advocates for running agents in isolated work trees or branches by default.
Prime argues that developers need a reliable, single-click method to undo an entire conversation's worth of changes without manually untangling Git commits, especially when exploratory AI features fail or introduce bugs.
Jonas reveals that the ultimate goal of these cloud agents is to allow users to step further away from editing text files directly, shifting the developer's role to high-level orchestration.
He hints at upcoming agent groups, where multiple specialized AI models will actively collaborate and share context on a single feature simultaneously.

## Context

The shift from traditional integrated development environments to AI-first coding platforms is rapidly accelerating.
As large language models become capable of writing entire full-stack applications autonomously, the primary bottleneck for developers is moving from syntax generation to orchestrating multi-agent workflows and managing context.
Cursor's unreleased features highlight a broader industry trend toward multimodal visual prompting.
This interface allows developers to direct AI by interacting with a live user interface rather than translating visual bugs into text descriptions.
Furthermore, the introduction of Cloud Agents signals a critical move toward remote, parallelized AI development.
Running multiple autonomous agents locally places massive strain on consumer hardware and creates port-conflict nightmares.
By shifting agents to the cloud, tools like Cursor enable developers to act more like product managers, assigning independent tasks to various agents simultaneously while maintaining a single source of truth.