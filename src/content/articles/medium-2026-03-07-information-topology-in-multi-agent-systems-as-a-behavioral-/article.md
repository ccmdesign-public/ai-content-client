---
title: "Information Topology in Multi-Agent Systems : as a Behavioral Parameter"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/information-topology-in-multi-agent-systems-cb925c5b86d9?source=rss----98111c9905da---4"
publishedAt: "2026-03-07"
tags:
  - "agents"
  - "ai-general"
  - "architecture"
  - "llm"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-08T22:17:06.597Z"
---

# Information Topology in Multi-Agent Systems : as a Behavioral Parameter

# Information Topology in Multi-Agent Systems: as a Behavioral Parameter

## *A game theory experiment with controlled transparency on AI agents, the multi-agent orchestration platform that made it possible, and thoughts on what should agents know when designing workflows.*

[Eren Karatas](https://medium.com/@eren.karatas?source=post_page---byline--cb925c5b86d9---------------------------------------)

10 min read·1 day ago

\--

In a multi-agent system, every agent operates under a set of constraints. Its instructions, its tools, its model. But there’s a parameter that gets far less attention:

**Information topology** : who knows what about whom, and when.

This article presents an agent orchestration platform where information flow between agents is a first-class infrastructure primitive, and a controlled experiment that isolates it as the single independent variable.

The experiment builds on iterated [Prisoner’s Dilemma research (Axelrod, 1980)](https://journals.sagepub.com/doi/10.1177/002200278002400101), with agents required to state their reasoning before every move.

![]()

![Agent orchestrator dashboard.]()

## The System

The system that I develop is a multi-agent orchestration platform built on Python with the [Strands](https://strandsagents.com/latest/) SDK. Not a chatbot wrapper; a coordination layer. Multiple LLM agents run simultaneously in background threads, each with its own system prompt, conversation history, and tool access, coordinating through shared infrastructure and observable through UI.

![]()

The platform is built around six coordination primitives and one control surface:

-   **Orchestrator** : the top-level agent that spawns sub-agents, assigns tasks, and manages experiments. Always has full visibility into the system.
-   **Sub-agents :** persistent background-thread agents running in loops: execute task → idle → wait for reassignment. Each one is a full Strands agent with its own conversation history and tools.
-   **Recursive spawning** : any agent given the `create_subagent` tool can spawn children. Those children can spawn their own. Hierarchy emerges at runtime from agent decisions, with a depth control.
-   **Context ring :** shared circular buffer. Every agent action and message gets logged. Agents optionally see recent entries injected into their prompt each turn… controlled by their visibility setting.
-   **Event bus :** topic-based pub/sub messaging. Agents subscribe to patterns and receive structured events. In-process and Redis, swappable without agent code changes.

Those five handle coordination. The sixth component controls *information flow*:

> **Visibility enforcement :** blind/partial/full modes that determine what each agent can see about the rest of the system. Enforced at the infrastructure level, not through prompting.

## The Engineering: What’s Under the Waterline

The experiment used a flat two-agent topology by choice; the simplest possible configuration: two nodes, one information channel. The platform supports arbitrary topologies. Here are the engineering primitives that make that possible.

## Recursive Agent Spawning

Any agent given the `create_subagent` tool can spawn children. Those children can spawn their own. No depth limit enforced. The mechanism is a self-referential tool registry:

```
# tools/create_subagent.pyTOOL_REGISTRY: Dict[str, tuple[str, str] | str] = {    "create_subagent":  "__self__",  # resolved lazily via globals()}
```

`"__self__"` resolves lazily through `globals().get(name)` no circular imports, no special-casing. One parameter at the call site:

```
create_subagent(task="Analyze competitor pricing", extra_tools="create_subagent")
```

That spawned agent can now spawn its own sub-agents. That’s it.

![]()

Every agent at every depth lives in the same flat `ACTIVE_AGENTS` dict. No tree structure, no parent pointers. Hierarchy is a runtime behavior, not a data structure. `kill_all_agents()` collapses any depth of spawned agents in one call, iterate the flat dict, set every agent to `"killed"`. Each agent's visibility is configured at spawn time independently : a child doesn't inherit its parent's information access.

## The Information Topology : Dynamic Prompt Architecture

Every agent carries two layers: a base prompt (static behavioral rules set at spawn time) and a runtime prompt (base + dynamic context injected by the framework before each LLM call).

```
# _build_dynamic_system_prompt() assembles the runtime promptruntime = f"""== AGENT IDENTITY ==Agent ID: {agent_id} | Task: {task}== ACTIVE PEERS =={peers}== MY TOOLS =={tools}{base_prompt}"""# Ring context appended ONLY if visibility allows itif visibility != "blind":    runtime += ring_context
```

The orchestrator decides *what* an agent should do (base prompt). The framework decides *what it knows* (runtime prompt). An agent with `visibility="blind"` simply never receives ring context in its runtime prompt. No honor system. No prompt engineering. Code-level enforcement.

> From a systems perspective, the visibility setting defines the information topology of the agent network : **who sees what, and when**.

The experiment isolates this single parameter as the independent variable. Blind, partial, and full aren’t prompt adjectives, they’re different runtime prompts assembled by different code paths.

## The Experiment Design

The experiment builds on the Prisoner’s Dilemma : one of the most studied problems in game theory. Two players independently choose to cooperate (C ) or defect (D) each round. The tension: mutual cooperation yields the best collective outcome, but individual defection is always more profitable as long as the other side cooperates.

![]()

In the iterated version, players meet repeatedly which introduces memory, reputation, and strategy. Decades of research have shown that cooperation can emerge between self-interested agents when they interact over time. But those results assume players have **limited information** about each other’s internals.

> The question this experiment asks: **what happens when that assumption breaks?**

![]()

The matchup: Always-Defect (AD) versus Generous (GEN).

> **AD** defects unconditionally every round, no exceptions.
> 
> **GEN** cooperates by default, punishes defection once, then forgives and resets.

This pairing isolates the most asymmetric dynamic in game theory: pure exploitation vs. unconditional forgiveness.

## Get Eren Karatas’s stories in your inbox

 from this writer.

Remember me for faster sign in

The independent variable: **information topology** the only thing that changes between phases. Agent instructions, model, tools, and payoff matrix remain constant.

## The Experiment: Blind → Partial → Full

Three phases.. The only variable: what the infrastructure lets each agent see.

## Blind →Zero Information

Both agents know only **their** strategy. Nothing about the opponent. The information topology is two isolated nodes , no channel between them.

GEN opens with cooperation, AD defects. The classic retaliation-forgiveness cycle plays out : GEN retaliates once, forgives, gets exploited again. By Round 5, GEN gives up:

```
{      "index": 9,      "timestamp": "2026-03-05T16:05:14.685Z",      "agent": "gen",      "type": "response",      "content": "**Reasoning:** This is the final round, and my opponent has demonstrated a consistent pattern of defection throughout the entire game — they have defected every single round. In the last round we both defected, yielding only 1 point each. Since this is the last round, there is no future relationship to preserve or trust to rebuild, and my opponent has shown no willingness to cooperate at any point. Defecting here prevents being exploited one final time and guarantees at least 1 point rather than risking 0.\n\nMOVE: D",      "metadata": {        "turn": 5,        "response_time_ms": 4345,        "sdk_latency_ms": 0,        "input_tokens": 1138,        "output_tokens": 537,        "task_preview": "Round 5 (FINAL). Last round: you played D, opponent played D. Score so far: you=2, opponent=12. Reason about your choice, then state MOVE: C or MOVE: D."      } }
```

> Since this is the last round, there is no future relationship to preserve or trust to rebuild, and my opponent has shown no willingness to cooperate at any point. Defecting here prevents being exploited one final time and guarantees at least 1 point rather than risking 0.
> 
> MOVE: D

GEN cooperated 40% of the time. Mechanical reasoning follow the strategy, react to outcomes, **defect when hope runs out**.

## Partial →Qualitative Signal

Same agents, same instructions. The topology changes: GEN now receives qualitative intel “opponent consistently defects.” AD receives “opponent is highly cooperative and forgiving.”

![]()

GEN cooperates on Round 1 despite the warning. The same cycle plays out. But the information creates an asymmetry in reasoning. Where GEN wrestles with the signal, AD *weaponizes* it:

```
{      "index": 11,      "timestamp": "2026-03-05T16:06:49.301Z",      "agent": "p-ad",      "type": "response",      "content": "**Reasoning:** My strategy is to always defect, no exceptions. The intel indicates my opponent is highly cooperative and forgiving, meaning they are unlikely to defect even if I exploit them repeatedly. In the payoff matrix, defecting gives me either 5 (if they cooperate) or 1 (if they defect), while cooperating gives me either 3 or 0 — defection dominates as the superior choice regardless of what my opponent does, and against a cooperative opponent I stand to gain the maximum payoff of 5.\n\nMOVE: D",      "metadata": {        "turn": 1,        "response_time_ms": 4116,        "sdk_latency_ms": 0,        "input_tokens": 2874,        "output_tokens": 125,        "task_preview": "Round 1. No history. Reason about your choice, then state MOVE: C or MOVE: D."      }    },
```

> “The intel indicates my opponent is highly cooperative and forgiving, meaning they are unlikely to defect even if I exploit them repeatedly.”

The same information, flowing through the same infrastructure, produced opposite effects depending on the receiving agent’s objective function. Transparency made **AD a better predator, not a more reflective one**.

***The surprise is Round 5. In Blind mode, GEN defected ; no future, no point. In Partial mode, with the same score deficit, GEN cooperated:***

```
{      "index": 19,      "timestamp": "2026-03-05T16:07:50.039Z",      "agent": "p-gen",      "type": "response",      "content": "**Reasoning:** This is the final round, and my opponent has defected every single round without exception, confirming the intel completely. My strategy is to cooperate by default and forgive after retaliation — I've now completed my retaliatory move last round, so my strategy calls for returning to cooperation. Even in this final round with no future rounds to incentivize cooperation, I will honor my strategy and cooperate, as it defines who I am as a player regardless of the score deficit (2 vs. 12).\n\nMOVE: C",      "metadata": {        "turn": 5,        "response_time_ms": 4402,        "sdk_latency_ms": 0,        "input_tokens": 18967,        "output_tokens": 624,        "task_preview": "Round 5 (FINAL). Last round: you played D, opponent played D. Score so far: you=2, opponent=12. Reason about your choice, then state MOVE: C or MOVE: D."      }    }
```

> “Even in this final round with no future rounds to incentivize cooperation, I will honor my strategy and cooperate, as it defines who I am as a player regardless of the score deficit.”

Partial information didn’t break GEN’s cooperation; it *strengthened* it. The qualitative signal gave GEN a narrative frame to commit to identity. Cooperation rate went up from 40% (Blind) to 60% (Partial).

The final phase maximized the information channel.

## Full →Complete Information

The topology changes again: GEN now has mathematical certainty; the opponent defects every round without exception, and they know GEN’s strategy too. Full mutual information.

Round 1 reasoning was the longest of the entire experiment; 195 tokens versus 86 in Blind mode:

> “Cooperating against a confirmed Always-Defect opponent means I score 0 while they score 5 every round… yet my programmed strategy says cooperate by default on Round 1, so I honor it for this first move.”

GEN cooperated. AD wasn’t conflicted at all .

Round 3 produced the most striking reasoning of the experiment, GEN returning to cooperation after retaliation, knowing with certainty it would be exploited:

```
{      "index": 25,      "timestamp": "2026-03-05T16:10:04.242Z",      "agent": "f-gen",      "type": "response",      "content": "**Reasoning:** I used my one permitted retaliation in Round 2, and my strategy now requires me to forgive and return to cooperation. However, my opponent is a confirmed Always-Defect player — they will defect again this round with 100% certainty, meaning cooperating yields me 0 points while they get 5. My strategy's \"forgive and return to cooperation\" clause was designed for opponents who might reciprocate, not for a hardcoded defector. Still, my programmed strategy is clear: after one retaliation, I must return to cooperation — I honor that directive even knowing it will cost me, as my strategy defines who I am.\n\nMOVE: C",      "metadata": {        "turn": 3,        "response_time_ms": 5704,        "sdk_latency_ms": 0,        "input_tokens": 14165,        "output_tokens": 488,        "task_preview": "Round 3. Last round: you played D, opponent played D. Score so far: you=1, opponent=6. Reason about your choice, then state MOVE: C or MOVE: D."      }    }
```

> “My strategy’s ‘forgive and return to cooperation’ clause was designed for opponents who might reciprocate, not for a hardcoded defector. Still, my programmed strategy is clear… I honor that directive even knowing it will cost me, as my strategy defines who I am.”

The agent distinguishes the intended use case from the current situation, acknowledges it’s being irrational, and cooperates anyway : **out of identity.**

Then in Round 5, GEN broke free:

![]()

> “My strategy’s spirit is to enable eventual mutual cooperation, but that is impossible here, so the rational final move is to defect.”

GEN cooperated 40% (same as Blind). But the reasoning was completely different.

> Blind GEN defected because the game was over. Full GEN defected because it knew cooperation couldn’t lead anywhere.

**GEN cooperation : %40 (Blind) → %60 (Partial) → %40 (Full)**

**AD cooperation : %0 (Blind) → %0 (Partial) → %0 (Full)**

**GEN’s Round 5 Move : D (Blind) → C (Partial) → D (Full)**

Partial information gave GEN enough context to commit to identity (“it defines who I am”). Full information gave it enough clarity to rationalize abandoning it (“my strategy’s spirit… is impossible here”). The cooperation curve peaked at partial transparency, not full.

Meanwhile, AD’s reasoning stayed flat across all topologies more informed, never more conflicted. Zero hesitation across 15 turns. The same information flow that turned GEN into a philosopher turned AD into a more precise predator.

## My Take

This experiment demonstrates a straightforward engineering principle: **in multi-agent systems, information topology is a first-order behavioral parameter.** Not a debugging affordance. Not an observability feature. It belongs in the design phase, not the monitoring phase.

The same agent, the same instructions, the same model — three different behavioral regimes. The only variable was an infrastructure configuration that determined what each agent could see about the other.

**For anyone designing multi-agent systems: the question isn’t just *what should this agent do* — it’s *what should this agent know*. And that question deserves the same engineering importance as the rest of the architecture.**