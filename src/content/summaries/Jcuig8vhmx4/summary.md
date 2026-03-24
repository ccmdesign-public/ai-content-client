---
metadata:
  videoId: "Jcuig8vhmx4"
  title: "AI mistakes you're probably making"
  description: "It's so easy to write code with AI, you just tell it what to do, and it does it. Right? Right????


    Thank you G2i for sponsoring! Check them out at: https://soydev.link/g2i


    SOURCES

    https://cursor.com/blog/agent-best-practices

    https://steipete.me/posts/just-talk-to-it


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT46M8S"
  publishedAt: "2026-01-24T12:39:10Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Jcuig8vhmx4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Jcuig8vhmx4"
processedAt: "2026-03-23T23:47:47.275Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Theo argues that AI coding tools are now genuinely useful for real-world problems, but most developers are making critical mistakes like using them as a last resort for poorly understood issues, dumping entire codebases into context, and over-configuring with MCPs and skills, which leads to poor results."
tools:
  - name: "Cursor"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Codex"
    url: null
  - name: "Opus"
    url: null
  - name: "Gemini"
    url: null
  - name: "Sonnet"
    url: null
  - name: "React"
    url: null
  - name: "TypeScript"
    url: null
  - name: "ESLint"
    url: null
  - name: "PNPM"
    url: null
  - name: "Convex"
    url: null
  - name: "Playwright"
    url: null
  - name: "VS Code"
    url: null
  - name: "T3 Chat"
    url: null
  - name: "Vibe Coding"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
  - "Web Development"
tags:
  - "ai-coding"
  - "claude"
  - "productivity"
  - "prompt-engineering"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 35901
  outputTokens: 2450
  totalTokens: 38351
  processingTimeMs: 54686
tagsNormalizedAt: "2026-03-24T04:11:51.594Z"
---

## Key Takeaways

Theo (t3.gg) argues that AI coding tools have evolved dramatically and can now solve real-world problems, but developers are held back by common usage mistakes. The key is to shift your mindset and approach.

*   **Select the right problems**: Don't use AI as a last resort for mysteries you can't solve. Instead, start with **problems you already understand** to build intuition and compare solutions.

*   **Manage context intelligently**: Dumping your entire codebase into the prompt (e.g., with tools like Repo Mix) causes **context rot** and degrades performance. Give the AI the **minimum necessary context** and use search tools, not a memory dump.

*   **Tune with documentation, not bloat**: Use files like `claude.md` or `agent.md` as a **'gotchas pile'** to steer the AI away from common mistakes in *your* codebase, not as generic documentation. Avoid **over-configuration** with endless MCP servers and skills.

*   **Fix broken environments first**: If your dev environment has constant type errors or weird setup requirements, **fix it for humans first**. AI agents will waste cycles chasing these 'ghosts' every single run.

*   **Use plan mode and iterate cleanly**: When the AI fails, don't just append corrections to a bad history. **Revert and restart** with a better prompt, or use **plan mode** to collaboratively build the right context before execution.

## Summary

### Introduction and Core Problem

Theo begins by addressing a common sentiment among developers: AI tools feel useful for small projects but fall short in real, complex codebases. He acknowledges this perspective was once valid but argues the landscape has changed dramatically in a very short time. The core issue, he posits, is not the capability of the tools but widespread user error. He identifies a pattern of mistakes that, when corrected, lead to transformative results with AI-assisted coding.

### Mistake 1: Selecting the Wrong Problems

The first major mistake is **problem selection**. Theo outlines a typical developer's problem-solving flow: validate the problem, try the obvious solution, then a harder solution (debugging, reading code), and finally, as a last resort, 'try something new.' Most people only reach for AI at this final, desperate stage, handing it a poorly understood, complex issue. This is the worst possible time to use a new tool.

He uses an example from fellow YouTuber Ben Davis, who asked an AI to solve a hydration error by simply pointing to a file. This is the wrong approach. Theo's recommendation is to **start with problems you already know how to solve**. This allows you to compare the AI's solution to your own, building intuition for what it can do and what context it needs. Frame it as you would for a junior engineer: give it tasks you understand, expecting it might take longer or need refinement, to get work off your plate.

A powerful tactic is to create reproducible tests from past fixes. Take a pull request that solved a problem, capture the code state and all the information you had before the fix, and use it as a benchmark for new AI models. This gives you a gold-standard, real-world evaluation suite far better than generic benchmarks.

### Mistake 2: Terrible Context Management (Context Rot)

The second critical mistake is **catastrophic context management**. Theo lambasts projects like 'Repo Mix' that flatten entire codebases into a single file for AI consumption, calling them a 'scourge.' He explains that AI, at its core, is **next-token prediction** (autocomplete). Flooding its context with irrelevant code dramatically reduces its ability to find the signal.

He introduces the concept of **context rot**: as context length increases, model performance on finding specific information plummets. For example, a graph shows a model's success rate dropping from 100% to below 60% as context bloats. Giving an AI your whole codebase is like giving a human engineer a Jira ticket where the actual problem is buried in paragraphs of nonsense.

The solution is to give the AI **tools, not data**. Modern tools like Cursor, Claude Code, and Codex work well because they give the model search capabilities (like `cmd+F`) and structured guides (like `claude.md` files) to find what it needs, rather than pre-loading everything. Your goal should be to provide the **minimum amount of information** another smart engineer would need to solve the problem, assuming they know nothing about your codebase.

### The Role of Tuning Files (`claude.md`/`agent.md`)

Theo dedicates significant time to the proper use of tuning files like `claude.md` or `agent.md`. These are not for documenting your entire codebase. Their primary role is to act as a **'gotchas pile'**—a living document of mistakes you've seen the AI make, used to steer it away from repeating them.

He shares a personal example: the AI kept trying to run `pnpm dev`, but he already had a dev server running. He updated his `claude.md` to specify 'don't use this script unless told to' and added a command to regenerate Convex types after schema changes. These small, targeted edits, born from observed failures, saved hours of frustration. He compares this to how senior engineers at Twitch would update internal docs after a junior made a mistake, preventing the next person from falling into the same trap. The AI is a 'new engineer' every time it runs; this file is its onboarding guide to your codebase's quirks.

### Mistake 3: Using Outdated Tools and Perspectives

Theo warns against judging AI's potential based on experiences with tools from six months or a year ago. The pace of improvement is historically unprecedented—problems that were completely unsolvable by AI have become trivial in 3-month windows. If your company forces you to use outdated, locked-down tools (he cites Amazon's internal fork 'Kira' as an example), your perspective will be skewed. He encourages developers to seek out and try the state-of-the-art tools, even if it means bending rules, because the gap between old and new is 'like comparing Notepad.exe to Vim.'

### Mistake 4: Broken Development Environments

A surprisingly common roadblock is a **broken local environment**. If your project requires opening specific subdirectories for TypeScript to work, or if `eslint` throws errors on every file due to a bad config, you must fix this—for humans and AI alike. AI agents have their 'memory' wiped each run; they will encounter and waste time reacting to the same environment ghosts on every execution. Theo shares how he used an AI agent *to fix* a broken TypeScript config in a monorepo with a one-click 'fix this error' command. The very tools struggling in your environment can be used to repair it.

### Mistake 5: Over-Configuration and MCP Hell

Theo strongly cautions against **over-engineering your AI setup**. He shows his own Claude Code configuration: it uses zero MCP servers and has only one custom 'skill'—a markdown file telling the model to avoid 'AI slop' aesthetics. He observes that developers who aren't yet seeing value often make things worse by adding dozens of MCPs, skills, and plugins, creating bloat and confusion.

He points to prolific developer 'Pete' as an example of effectiveness through simplicity. Pete outputs hundreds of commits daily using a nearly stock Codex configuration. The lesson is clear: **if the tool isn't useful in its simple form, adding complexity won't make it useful**. Start simple, add configuration only to solve specific, observed problems.

### Effective Workflow: Plan Mode and Clean Iteration

The final piece is adopting an effective workflow. When an AI produces bad output, a common mistake is to keep appending corrections to the existing, flawed conversation history. Since AI is autocomplete based on history, this piles more bad context onto the problem.

The better approach is to **revert and restart** with a cleaner, more informed prompt. **Plan mode** is excellent for this, as it forces a collaborative scoping phase where the AI asks clarifying questions. This builds a history of high-quality context, making successful execution more likely. When execution does go wrong, analyze *why*: was the plan bad, or is there a misunderstanding about the codebase? Fix the root cause in the plan or the `claude.md` file, then rerun from a clean state.

### Conclusion and Case Study

Theo concludes by revisiting the opening example of Adam's hydration error. Adam's failure stemmed from using the AI as a last resort for a problem he didn't fully understand (he didn't have the exact error diff). Once the right context (the React 19 error diff) was provided, the AI solved it instantly. This encapsulates all the lessons: select tractable problems, provide precise context, avoid using AI as a Hail Mary, and iteratively improve your setup based on failures. By correcting these mistakes, developers can move from skepticism to effectively leveraging AI as a powerful collaborative partner.

## Context

Theo, from the channel 't3.gg', is a well-known developer, entrepreneur, and commentator on software engineering trends, particularly focused on modern web development and the practical application of new technologies. This video contributes to the ongoing and heated debate about the real-world utility of AI coding assistants (like GitHub Copilot, Cursor, Claude Code) beyond simple autocomplete. It's highly relevant in early 2026, as the tools have evolved rapidly, creating a gap between early skeptics (whose opinions are based on older, weaker models) and early adopters who are achieving significant productivity gains. This video is crucial for developers who have tried AI tools and been disappointed, as well as for those using them daily who want to optimize their workflow and avoid common pitfalls. Theo provides a pragmatic, experience-based framework for moving from frustration to effective use.