---
toolSlug: claude-code
title: Claude Code
category: AI & ML
humanSubsections:
  - overview
  - how-it-works
  - best-practices
  - common-pitfalls
agentResources:
  - type: cli
    name: Claude Code CLI
    source: Anthropic
    url: https://docs.anthropic.com/en/docs/claude-code
    installCommand: npm install -g @anthropic-ai/claude-code
  - type: config-example
    name: CLAUDE.md project config
    content: |
      # CLAUDE.md
      Project-level instructions for Claude Code.
      Place at repo root to give Claude context about your project.
  - type: primer-prompt
    name: Claude Code expert primer
    content: |
      You are an expert at using Claude Code, Anthropic's agentic coding tool.
      Claude Code runs in the terminal, has full file system access, and can
      execute shell commands. It reads CLAUDE.md files for project context.
      Key capabilities: multi-file edits, test running, git operations,
      and iterative development with automatic error correction.
agentResourceGaps: []
rawAgentMarkdown: |
  ## What your agent needs to know

  ### Primer Prompt

  You are an expert at using Claude Code, Anthropic's agentic coding tool.
  Claude Code runs in the terminal, has full file system access, and can
  execute shell commands. It reads CLAUDE.md files for project context.
  Key capabilities: multi-file edits, test running, git operations,
  and iterative development with automatic error correction.

  ### Installation

  ```bash
  npm install -g @anthropic-ai/claude-code
  ```

  ### Configuration Examples

  Create a `CLAUDE.md` file at your repository root:

  ```markdown
  # CLAUDE.md
  Project-level instructions for Claude Code.
  Place at repo root to give Claude context about your project.
  ```

  Claude Code reads this file automatically when launched from the project directory. Use it to document:
  - Build and test commands
  - Project structure and conventions
  - Code style preferences
  - Domain-specific knowledge
generatedAt: "2026-03-28T00:00:00Z"
generatedFrom:
  summaryCount: 85
  articleCount: 12
description: A comprehensive guide to Claude Code — Anthropic's agentic coding tool that runs in your terminal with full file system access, shell command execution, and iterative development capabilities.
---

## What you need to know

### Overview

Claude Code is Anthropic's agentic coding tool that operates directly in your terminal. Unlike chat-based AI assistants, Claude Code has full access to your file system and can execute shell commands, making it capable of performing complex, multi-step development tasks autonomously.

Launched in early 2025, Claude Code quickly became one of the most discussed tools in the AI developer tooling space. It represents a shift from "AI as autocomplete" to "AI as a collaborator" — capable of understanding entire codebases, running tests, debugging failures, and iterating on solutions without constant human guidance.

### How It Works

Claude Code operates through a simple but powerful loop:

1. **Read**: It analyzes your codebase by reading files, understanding project structure, and parsing CLAUDE.md configuration files
2. **Plan**: Based on your request, it formulates a multi-step plan that may involve editing multiple files, running commands, and verifying results
3. **Execute**: It makes changes, runs tests, and observes outcomes
4. **Iterate**: If something fails (a test, a lint check, a build), it reads the error output and automatically attempts to fix the issue

The tool uses a `CLAUDE.md` file at your repository root as its primary source of project context. This file tells Claude about your project's structure, conventions, commands, and any domain-specific knowledge it needs.

Key technical details:
- Runs as a CLI process in your terminal
- Communicates with Claude's API (requires an Anthropic API key or Max subscription)
- Has access to all files in the working directory
- Can execute arbitrary shell commands (with permission controls)
- Supports extended thinking for complex reasoning tasks

### Best Practices

**Write a thorough CLAUDE.md file.** This is the single highest-impact action you can take. Include:
- Essential build, test, and lint commands
- Project structure overview
- Code style conventions and patterns
- Common gotchas specific to your codebase

**Start with clear, specific requests.** Rather than "fix the bug," say "the login form submits twice when the user double-clicks the submit button — add debouncing to the handleSubmit function in src/components/LoginForm.tsx."

**Use iterative workflows.** Claude Code excels when you let it run tests after making changes. Structure your workflow so it can verify its own work: write code, run tests, fix failures, repeat.

**Leverage git integration.** Claude Code can create branches, make commits, and even create pull requests. Use this for atomic, well-documented changes.

**Keep context focused.** For large codebases, point Claude Code to the specific area you want it to work on. Use directory-scoped CLAUDE.md files for subsystem-specific instructions.

### Common Pitfalls

**Overly broad requests.** Asking Claude Code to "refactor the entire codebase" will produce worse results than targeted, specific requests. Break large tasks into focused steps.

**Ignoring CLAUDE.md.** Without project context, Claude Code has to guess at conventions, commands, and patterns. A well-written CLAUDE.md eliminates most "AI doesn't understand my project" frustrations.

**Not verifying changes.** Always review what Claude Code produces. While it can run tests and fix errors, it may introduce subtle issues that automated checks miss.

**Skipping permission controls.** In production environments, configure Claude Code's permission settings to prevent unintended destructive operations (force pushes, database drops, etc.).

## What your agent needs to know

### Primer Prompt

You are an expert at using Claude Code, Anthropic's agentic coding tool.
Claude Code runs in the terminal, has full file system access, and can
execute shell commands. It reads CLAUDE.md files for project context.
Key capabilities: multi-file edits, test running, git operations,
and iterative development with automatic error correction.

### Installation

```bash
npm install -g @anthropic-ai/claude-code
```

### Configuration Examples

Create a `CLAUDE.md` file at your repository root:

```markdown
# CLAUDE.md
Project-level instructions for Claude Code.
Place at repo root to give Claude context about your project.
```

Claude Code reads this file automatically when launched from the project directory. Use it to document:
- Build and test commands
- Project structure and conventions
- Code style preferences
- Domain-specific knowledge
