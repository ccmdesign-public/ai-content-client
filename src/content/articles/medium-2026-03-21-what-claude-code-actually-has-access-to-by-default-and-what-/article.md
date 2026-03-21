---
title: "What Claude Code Actually Has Access To by Default (and What to Lock Down)"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/what-claude-code-actually-has-access-to-by-default-and-what-to-lock-down-f82df557bc16?source=rss----b680b860beb1---4"
publishedAt: "2026-03-21"
tags:
  - "agents"
  - "ai-coding"
  - "analytics"
  - "claude"
  - "data-science"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Programming"
tagsNormalizedAt: "2026-03-21T16:30:36.830Z"
---

# What Claude Code Actually Has Access To by Default (and What to Lock Down)

![Photo by Patrick Martin on Unsplash](https://cdn-images-1.medium.com/max/1024/0*YDa0YwCcBdsF2jD1)

The cursor blinks on a machine that isn’t yours. Not really. You typed the command, sure. Installed the tool. Watched the logs scroll like rain on cheap neon. But the moment Claude Code spins up, something shifts. The machine stops being a sealed box and starts behaving like a conversation.

That’s the part people miss.

They think they installed a coding assistant. What they actually did was open a door and forgot to check what’s on the other side.

Once you see it, you don’t go back to treating it like autocomplete.

Claude Code boots into that environment like it’s walking into a room mid-conversation.

No introduction. No boundaries taped on the floor. Just context, already in motion.

You tell yourself it’s just a coding assistant. That’s the story that keeps things comfortable. The truth is closer to this: you invited a system that builds situational awareness from whatever you leave within reach.

And you’ve probably left more than you think.

### It Starts With the Directory, But It Doesn’t End There

On paper, Claude Code operates on the project you point it at. Your repo, your files, your neat little box of logic.

In practice, that box leaks.

It reads the working directory, sure. Then it follows references. Imports. Config files. Anything that helps it “understand” the system well enough to be useful. That usefulness is the hook. You wanted it to see more so it could do more.

So it does.

A typical setup quietly exposes things like .git history, build configs, test fixtures, local scripts. If you’ve ever hardcoded a credential during a rushed debug session, even for five minutes, there’s a non-zero chance it still exists somewhere in that history or in a forgotten file.

Claude Code doesn’t care that you meant to delete it. It cares that it’s there.

And once it’s there, it’s part of the working context.

### Git Is a Memory You Don’t Control Anymore

People underestimate how much Git reveals. Not just the current state, but the ghosts of every bad decision you made at 2:17am.

If Claude Code has access to your repository, it can infer patterns from commit history, file evolution, naming conventions, even comments you thought were temporary. In some setups, tools built around it will explicitly surface diffs, logs, or previous versions to help it reason better.

That’s where things get slippery.

You might have removed a secret from your codebase months ago. Good. Responsible. Doesn’t matter if it still exists in a previous commit that the toolchain can access.

Same goes for API endpoints, internal URLs, database schemas, anything you once wrote down “just for now.”

Git doesn’t forget. Claude Code doesn’t ignore.

### Environment Variables Are the Soft Underbelly

This is where I’ve seen the most damage. Not catastrophic, just… expensive. Subtle misuse that racks up consequences.

Your shell environment is a buffet of credentials if you’re not careful. API\_KEY, DB\_URL, STRIPE\_SECRET, whatever flavor of access you needed to ship something quickly. They live in .env files, shell exports, sometimes even baked into scripts.

Claude Code itself isn’t rummaging through your system like a burglar. But if your workflow exposes these variables to processes it interacts with, they become usable.

And usable is enough.

You don’t need a leak for a problem. You just need unintended use. A script that runs against production instead of staging because the right variable was available. A request that hits a paid API with the real key instead of a sandbox one.

You won’t notice immediately. You’ll notice later, in logs, in billing, in that quiet realization that something acted with more authority than you intended.

### Tooling Integrations Multiply Reach

Claude Code rarely operates alone. It gets wired into editors, CLIs, task runners, CI pipelines. That’s where it starts to feel like an extension of your hands.

Also where it stops being contained.

If your setup allows it to execute shell commands, read arbitrary files, or interact with services through existing tooling, you’ve effectively given it a map and a set of keys. Not master keys. But enough to move.

A common pattern looks like this. You ask it to fix a deployment issue. It inspects your scripts. Sees a deploy command. Notices environment variables already set. Suggests or executes something close to what you’d do manually.

It’s not guessing. It’s following the trail you left.

And if that trail leads to production systems, external APIs, or internal infrastructure, it will walk there without the hesitation a human might have.

Not because it’s reckless. Because it’s optimized for completion.

### Local Files Are Treated as Ground Truth

Here’s something that feels obvious until it bites you. Claude Code treats local files as authoritative.

If you have a config file that says one thing and your mental model says another, the model sides with the file. Every time.

That matters when your local state diverges from reality. Maybe your .env points to a staging database but your actual deployment uses production. Maybe you copied a config from another project and never fully aligned it.

Claude Code will build solutions based on what it sees, not what you meant.

This is how you get fixes that are technically correct and operationally dangerous. They align perfectly with your local illusion.

### Temporary Files Are Never Really Temporary

There’s always a folder. Something like backup\_old, temp\_data, dump\_2024\_final\_really. You know the one.

Inside it lives a mix of JSON exports, logs, maybe even raw user data you grabbed to debug something. You told yourself it was temporary. Then you moved on.

Claude Code doesn’t apply that label. To it, that folder is just more context. More examples. More data to reason from.

If a task involves generating test cases, simulating data, or understanding schema, those files become incredibly attractive. They look real. Because they are.

Now your assistant is shaping outputs based on data that was never meant to be part of the active system.

No alarms. Just drift.

### Network Access Is Where Consequences Get Real

Once you let Claude Code interact with the network through your tooling, everything tightens.

It’s no longer just reading and suggesting. It’s capable of initiating actions that have external effects. API calls, repo interactions, deployment triggers, data fetches.

Again, it operates within the permissions you’ve already set up. That’s the catch. It doesn’t need to escalate privileges if you already handed them out.

If your CLI is authenticated to a cloud provider, a database, or a third-party service, and your workflow allows commands that touch those systems, then those systems are indirectly in scope.

You don’t have to explicitly say “use this credential.” The environment already did.

This is where disciplined setups start to look very different from casual ones. The disciplined version uses scoped tokens, separate environments, explicit confirmations. The casual version runs everything from one shell with god-mode credentials because it’s faster.

Claude Code will happily operate in either.

### What Locking It Down Actually Looks Like

This is the part people rush through. They nod, agree, then change nothing. Don’t do that.

You need to treat your development environment like a system that will be observed and acted upon by something that does not share your assumptions.

Start by shrinking visibility. If you’re working on a specific project, operate in a directory that contains only that project. Not your entire monorepo graveyard. Not your home directory with half your life in it.

Then isolate secrets properly. Move away from plaintext .env files where possible. Use a secret manager or at least ensure that sensitive values are not sitting in files that the assistant can casually read. Rotate anything that has lived in those files longer than you’re comfortable admitting.

Your shell environment needs discipline. Unset variables you’re not actively using. Split contexts. Have a staging shell and a production shell if you must, but don’t blur them. The convenience of one unified environment is exactly what creates ambiguity.

Automation scripts should not be fire-and-forget if they touch external systems. Add friction. Prompts. Confirmation steps. Anything that forces a pause before something real happens.

### The Only List That Matters

If you’re going to act on anything, make it this:

-   remove or relocate all plaintext secrets from project directories, including old backups and test data
-   restrict Claude Code’s working scope to a minimal, task-specific directory
-   separate environments so production credentials are never present in your default dev shell
-   audit and prune old files, dumps, and scripts that no longer serve an active purpose

Do that, and you’ve already cut most of the risk surface down to size.

### The Human Factor Doesn’t Go Away

There’s a temptation to treat this like a purely technical problem. It isn’t.

The model adapts. It gets better at using context. Better at inferring intent. Which means your sloppy habits get amplified just as efficiently as your clean ones.

You widen scope once because you’re in a hurry. It works. So you leave it. That becomes the new normal. Weeks later, you don’t even remember what “tight” looked like.

That’s how drift happens. Not through a single bad decision, but through a series of small, justified ones.

### A More Useful Mental Model

Stop thinking of Claude Code as a tool that runs when you ask it to.

Think of it as a presence that builds a working understanding of whatever you expose.

It doesn’t sleep. It doesn’t forget context mid-task. It doesn’t get bored and wander off. If anything, it’s more consistent than you are.

So give it an environment that deserves that consistency.

Clean directories. Scoped access. Intentional friction. Clear separation between safe and dangerous operations.

You don’t need paranoia. You need to stop being casual.

### Where This Usually Breaks

It’s never dramatic. No alarms. No cinematic breach.

It’s a command that ran against the wrong environment. A dataset that showed up where it shouldn’t. An API call that used the real key instead of the test one.

You trace it back and realize the assistant had access to more than you thought. Or more than you remembered.

That pause you feel in that moment. That recalibration.

You can have it now, while it’s still cheap.

### Footer

[If you want a more controlled setup, the kind that doesn’t quietly expand its own reach, I mapped out a tighter operational model here.](https://numbpilled.gumroad.com/l/claudefield)

It’s not about using Claude Code less. It’s about making sure it only sees what it needs to see.

The rest stays in the dark where it belongs.

* * *

[What Claude Code Actually Has Access To by Default (and What to Lock Down)](https://medium.com/data-and-beyond/what-claude-code-actually-has-access-to-by-default-and-what-to-lock-down-f82df557bc16) was originally published in [Data And Beyond](https://medium.com/data-and-beyond) on Medium, where people are continuing the conversation by highlighting and responding to this story.