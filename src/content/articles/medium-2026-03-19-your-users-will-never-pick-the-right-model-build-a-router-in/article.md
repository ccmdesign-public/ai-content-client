---
title: "Your Users Will Never Pick the Right Model. Build a Router Instead."
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/your-users-will-never-pick-the-right-model-build-a-router-instead-2ee39a86f702?source=rss----98111c9905da---4"
publishedAt: "2026-03-19"
tags:
  - "agents"
  - "ai-general"
  - "engineering"
  - "research"
  - "ux"
categories:
  - "AI & Machine Learning"
  - "Product & Design"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-19T14:28:32.884Z"
---

# Your Users Will Never Pick the Right Model. Build a Router Instead.

# Your Users Will Never Pick the Right Model. Build a Router Instead.

## *Auto mode isn’t optional anymore — it’s what really help the customer harnest the value from your agent.*

[Elliott Girard](https://medium.com/@theagentmaker?source=post_page---byline--2ee39a86f702---------------------------------------)

7 min read·21 hours ago

\--

## The Problem Nobody Wants to Admit

You built a great AI agent. Multiple models available — Opus for complex reasoning, Sonnet for general use, Haiku for quick answers, GPT-4o-mini for cost efficiency. You add a nice model selector in the UI and let users choose.

Then you watch the logs.

The user who asks “what’s the price of AAPL?” selects Claude Opus. That’s $0.15 for a query that Haiku could handle for $0.001. 150x more expensive for the same answer.

The user who asks “analyze the options flow and recommend a hedging strategy considering my portfolio exposure” picks GPT-4o-mini because it’s labeled “fast.” The response is shallow garbage. They blame your product.

**Users don’t know which model to use or don’t have the attention and the time to make a choice. They never will. And expecting them to choose correctly is a design failure, not a user failure.**

This is why every production agent I build has an “Auto” mode. And in most cases, it’s the only mode users should see.

![Gif from Giphy. Your model router sorting every query into the right house. “Better be… Haiku!”]()

## What a Model Router Actually Does

A model router sits between the user’s query and the LLM call. It analyzes the query and routes it to the appropriate model based on complexity, cost, and latency requirements.

The concept is simple. The implementation has traps.

```
async def route_query(query: str, context: dict) -> str:    """Select the best model for this query."""        complexity = assess_complexity(query, context)        if complexity == "trivial":        return "gpt-4o-mini"       # $0.15/1M — instant, cheap    elif complexity == "standard":        return "claude-sonnet"      # $3/1M — balanced    elif complexity == "complex":        return "claude-opus"        # $15/1M — deep reasoning    elif complexity == "code":        return "claude-sonnet"      # Best code performance/$        return "claude-sonnet"          # Safe default
```

The question is: how do you assess complexity?

## Approach 1: Hardcoded Rules (Start Here)

The simplest router is a set of heuristics. No LLM call, no latency overhead, deterministic.

```
def assess_complexity_rules(query: str, context: dict) -> str:    """Rule-based complexity assessment."""        query_lower = query.lower()        # Trivial: simple factual queries    trivial_patterns = [        r"what('s| is) the (price|cost) of",        r"how much (is|does)",        r"what time",        r"who is",        r"define \w+",    ]    if any(re.search(p, query_lower) for p in trivial_patterns):        return "trivial"        # Complex: multi-step reasoning indicators    complex_indicators = [        "analyze", "compare", "strategy", "recommend",        "considering", "trade-off", "implications",        "step by step", "pros and cons", "evaluate"    ]    complex_count = sum(1 for ind in complex_indicators if ind in query_lower)        if complex_count >= 2:        return "complex"        # Code: programming-related    code_indicators = ["code", "function", "bug", "implement", "refactor", "debug"]    if any(ind in query_lower for ind in code_indicators):        return "code"        # Token length as a signal    if len(query.split()) < 10:        return "trivial"        return "standard"
```

**Pros:**

-   Zero latency overhead
-   Deterministic — same query always routes the same way
-   No additional API cost
-   Easy to debug and adjust

**Cons:**

-   Brittle — regex can’t understand intent
-   False positives — “analyze this simple chart” routes to complex
-   Doesn’t account for conversation context
-   Requires manual maintenance as patterns evolve

**When to use this:** Always start here. For 80% of products, hardcoded rules with a sensible default are enough. Don’t over-engineer until you have data showing the rules aren’t working.

## Approach 2: LLM-Based Classification (When Rules Aren’t Enough)

When your queries are too diverse for regex, you can use a small, fast model to classify complexity before routing to the main model.

```
async def assess_complexity_llm(query: str, context: dict) -> str:    """LLM-based complexity assessment using a fast classifier."""        classification_prompt = f"""Classify this query's complexity level.TRIVIAL: Simple factual lookup, price check, definition, yes/no question.STANDARD: General question, summary, explanation, single-step task.COMPLEX: Multi-step analysis, strategy, comparison, reasoning chain needed.CODE: Programming task, debugging, code review, implementation.Query: {query}Respond with ONLY one word: TRIVIAL, STANDARD, COMPLEX, or CODE."""response = await llm_call(        model="gpt-4o-mini",  # Fast, cheap classifier        prompt=classification_prompt,        max_tokens=10,        temperature=0    )        return response.strip().lower()
```

**Pros:**

-   Understands intent, not just keywords
-   Handles ambiguous queries better
-   Adapts to natural language variations
-   Can factor in conversation context

**Cons:**

-   Adds latency (200–500ms per classification)
-   Adds cost (small, but it adds up at scale)
-   Non-deterministic — same query might classify differently
-   The classifier itself can be wrong

**The latency trap:** You’re adding an LLM call before every LLM call. At 300ms per classification and 1000 queries/day, that’s 5 minutes of cumulative latency your users experience for… model selection. Make sure the savings justify the overhead.

**When to use this:** When you have diverse query types that rules can’t capture, AND the cost difference between models is significant enough to justify the classification overhead.

## Approach 3: Hybrid (What I Actually Use)

In Wasaphi, I use a layered approach:

```
async def smart_route(query: str, context: dict) -> str:    """Layered routing: rules first, LLM fallback."""        # Layer 1: Hard rules (instant, deterministic)    # Catch the obvious cases    if is_price_check(query):        return "gpt-4o-mini"    if is_greeting(query):        return "gpt-4o-mini"    if context.get("skill_loaded") == "deep_analysis":        return "claude-opus"        # Layer 2: Skill-based routing    # If a skill is loaded, it knows what model it needs    skill = context.get("active_skill")    if skill and skill.get("preferred_model"):        return skill["preferred_model"]        # Layer 3: Context signals    # Long conversations with complex history → stronger model    if context.get("conversation_turns", 0) > 15:        return "claude-sonnet"        # Layer 4: LLM classification (only for ambiguous cases)    # This triggers maybe 20% of the time    complexity = await assess_complexity_llm(query, context)    return MODEL_MAP[complexity]
```

The key insight: **most queries don’t need LLM classification.** Hard rules catch 60–70% of cases. Skill context catches another 10–20%. The LLM classifier only fires for genuinely ambiguous queries.

## Get Elliott Girard’s stories in your inbox

 from this writer.

Remember me for faster sign in

This keeps average routing latency under 50ms while still handling edge cases intelligently.

## The Skill Connection

If you’ve read my article on skill servers, you know that skills define not just tools but operational context. Model routing fits naturally into this:

yaml

```
skill: quick_price_check  preferred_model: gpt-4o-mini  max_latency_ms: 2000  context_budget: 500 tokensskill: deep_financial_analysis  preferred_model: claude-opus  max_latency_ms: 30000  context_budget: 15000 tokens$skill: social_sentiment  preferred_model: claude-sonnet  max_latency_ms: 10000  context_budget: 5000 tokens
```

When the agent loads a skill, the model preference comes with it. No ambiguity, no classification needed. The skill knows what it needs.

This is why skills and routing are complementary layers in the context engineering stack. The skill handles what tools to use and how. The router handles which brain to use. Together, they optimize both quality and cost per interaction.

## The Numbers That Matter

In Wasaphi, before auto-routing:

-   Average cost per query: $0.08
-   User satisfaction with responses: mixed (powerful model wasted on simple queries, weak model struggling with complex ones)
-   Users actually changing model selection: less than 5%

After auto-routing:

-   Average cost per query: $0.02 (75% reduction)
-   Response quality: better (right model for right task)
-   User complaints about model: near zero

80% of queries route to the cheapest model. 15% to the mid-tier. 5% to the premium model. And the quality is better across the board because each model operates in its comfort zone.

## When Auto Mode Doesn’t Work

I said this doesn’t suit everyone, and I mean it.

**Don’t build a router if:**

-   **You only have one model.** Obviously. But also: if you’re early stage and still figuring out product-market fit, just pick one good model and ship. Router optimization is a scaling concern, not a launch concern.
-   **Your use case is uniformly complex.** If every query requires deep reasoning (legal analysis, medical diagnosis, research synthesis), there’s nothing to route. You need the best model every time. A router would just add latency.
-   **Your use case is uniformly simple.** If you’re building a FAQ bot or a simple lookup tool, just use the cheapest model for everything. No router needed.
-   **You can’t afford routing mistakes.** A router that sends a complex financial analysis to GPT-4o-mini produces a bad answer. If your domain has low tolerance for wrong-model errors and you can’t verify quality, let users choose manually — or default to the strongest model and eat the cost.
-   **Your query volume is too low to justify the engineering.** If you have 50 queries a day, the cost difference between routing and not routing is maybe $3/day. Don’t build infrastructure for $3.

**Build a router when:**

-   You have diverse query types (simple + complex)
-   Cost optimization matters at your scale
-   Users demonstrably don’t choose models well
-   You have enough data to validate routing accuracy
-   The cost savings justify the engineering investment

## The Router Has to Work

Here’s the warning I give every client: **a bad router is worse than no router.**

A user who picks the wrong model gets a mediocre answer. A router that picks the wrong model gives a bad answer AND the user thinks your product is broken — because they trusted the system to make the right choice.

If you build a router:

-   **Log everything.** Model selected, complexity assessed, actual response quality. You need to audit routing decisions.
-   **Start conservative.** Default to the mid-tier model. Only route to cheap models when you’re confident the query is simple.
-   **Monitor aggressively.** Track the ratio of queries per model tier. If 95% routes to cheap, your router might be too aggressive. If 50% routes to premium, your rules might be too loose.
-   **A/B test.** Run the same queries through different routing configurations and measure quality + cost.
-   **Let users override.** Always. Some users want Opus for everything, and that’s fine. Auto mode should be the default, not the only option.

## The Honest Summary

Model routing is a not only a UX feature but also a FinOps pattern that becomes essential at scale. Start with hardcoded rules. Graduate to hybrid classification when you have the data. Always default to the stronger model when uncertain.

The goal isn’t to minimize cost. It’s to maximize quality-per-dollar. The cheapest model that produces the right answer is always the best choice.

Your users won’t pick the right model. Build a system that does it for them.

*Thanks for reading! I’m Elliott, a Python & Agentic AI consultant and entrepreneur. I write weekly about the agents I build, the architecture decisions behind them, and the patterns that actually work in production.*

*If auto-routing saved your agent’s budget (or your users’ experience), I’d appreciate a few claps 👏 and a follow. And if you’ve built a router with a different approach — I’d love to hear about it in the comments.*