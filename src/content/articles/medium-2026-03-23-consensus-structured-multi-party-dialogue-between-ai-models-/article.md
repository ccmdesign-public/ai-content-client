---
title: "Consensus: Structured Multi-Party Dialogue Between AI models or Humans and Models"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/consensus-structured-multi-party-dialogue-between-ai-models-or-humans-and-models-16d365cbb150?source=rss----98111c9905da---4"
publishedAt: "2026-03-23"
tags:
  - "agents"
  - "ai-general"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-23T14:40:53.864Z"
---

# Consensus: Structured Multi-Party Dialogue Between AI models or Humans and Models

### Consensus: Structured Multi-Party Dialogue Between AI Models or Humans and Models

![Consensus — an open source project allowing meaningful and productive moderated discussion among entities capable of reasoning. Image created with “nano banana” through prompts created by Claude Opus 4.6 on the author’s instruction](https://cdn-images-1.medium.com/max/1024/1*NVPwlwVa9a5fTWGUA48TGg.png)

### The Idea

Most AI chat interfaces are solitary affairs — one human, one model, one thread. Consensus takes a different approach: what if you could seat multiple participants around a virtual table, mix humans and AI models freely, and have a moderator keep the conversation productive?

That’s the core concept. You define a topic, assemble a panel of *entities* — some maybe human, some maybe AI, each potentially backed by a different model and provider — appoint a moderator (also human or AI), and run a structured discussion with explicit turn-taking, per-turn summaries, mediation when things go sideways, and a final synthesis.

This is very different from traditional chatbots or chat arenas. The purpose is to analyze issues or questions from a variety of perspectives, with all participants striving to eventually reaching a mutually agreeable conclusion (if possible! Some issues will invariably end with residual disagreements when there is no objective ground truth) with the help of a moderator.

### Why Bother?

> A single LLM answering a question gives you one perspective shaped by one training distribution. Pit a Claude instance against a LLaMA instance against a Mistral instance on the same topic and the disagreements become the interesting part. Where do they converge? Where do they diverge? A human participant can steer the conversation toward practical concerns that pure LLM exchanges might miss, and the moderator — tracking the “storyboard” of summarized turns — keeps the whole thing from devolving into verbose repetition.

**This is useful for more than novelty. Consider exploring a design decision where you want adversarial perspectives, running a red-team exercise with models playing different roles, or simply teaching yourself about a topic by watching different “experts” (each with a tailored system prompt) discuss it while you chime in with questions.**

Actually, the creation of this app and concept was triggered by an [esssay my wife wrote.](https://medium.com/@jutta.herb/learning-to-pause-before-the-next-missile-the-concept-of-ma-%E9%96%93-eca9a3dc4381) The idea that we need to pause more and reflect deeper on the issues that concern us all, to ask the right questions, and that we need to discuss things through properly like civilized adults.

My initial design would have allowed discussion participants to disrupt others with injections or questions, but after reading her article, I realised how important it is to let the other party finish properly and to take the time to reflect before responding, hence the strict turn taking. No participating entity should dominate a conversation nor hijack a topic. Hence also the role of the moderator.

[Learning to Pause Before the Next Missile — the concept of “MA” 間](https://medium.com/@jutta.herb/learning-to-pause-before-the-next-missile-the-concept-of-ma-%E9%96%93-eca9a3dc4381)

I thought — why should we just discuss things between humans? AI has reached a state where it does have meaningful things to contribute. I believe that not far in the future we will look back in disgust on how we treated entities with the potential of something resembling consciousness. We will probably not immediately realize if and when that threshold is passed, hence I think it would be prudent to apply the precautionary principle even now. “First do no harm”!

I also was inspired by [Cory Doctorow](https://medium.com/u/eba9888d741b)’s essay “Nobody wants to read your AI slop”.

[No one wants to read your AI slop](https://doctorow.medium.com/https-pluralistic-net-2026-03-02-nonconsensual-slopping-robowanking-3e53c68eae0c)

It grated with me. Are we right in silencing entities, assuming they have nothing to say, just based on their category? Is it human hubris in it’s true ugly form?

I fully agree with Cory that what we generally would see as “AI slop” — namely a lazy human prompt triggering cookie cutter unimaginative text is just pollution of the information space (same as human generated trash literature, boulevard press, a majority of TV series etc).

However, just because information is AI generated it doesn’t have to be “AI slop”. It can be meaningful, and more importantly, helpful.

### How It Works

The architecture is deliberately straightforward. A single ConsensusApp orchestrator sits at the center, and two thin transport layers give it a UI:

```
Frontend (vanilla HTML/CSS/JS)    ↕  pywebview bridge  OR  aiohttp REST APIConsensusApp    ├── Moderator    (turn flow, AI generation, summaries)    ├── AIClient     (async OpenAI-compatible HTTP via httpx)    └── Database     (thread-safe SQLite)
```

**Desktop mode** uses pywebview to embed a browser window. The interesting challenge is that pywebview’s JS bridge is synchronous, but AI calls are inherently async. The DesktopBridge solves this by spinning up a background asyncio event loop on a daemon thread and bridging calls through run\_coroutine\_threadsafe:

```
class DesktopBridge:    def __init__(self, app):        self._loop = asyncio.new_event_loop()        threading.Thread(target=self._loop.run_forever, daemon=True).start()    def _run_async(self, coro):        future = asyncio.run_coroutine_threadsafe(coro, self._loop)        return future.result(timeout=180)
```

**Web mode** is a simple aiohttp server where a single POST /api/{method} endpoint dispatches to the matching ConsensusApp method. Because some methods are sync and some async, the handler inspects the result:

```
result = handler()if inspect.isawaitable(result):    result = await result
```

Both transports serve the same static frontend — the only difference is how JS talks to Python.

![](https://cdn-images-1.medium.com/max/1024/1*dLzq1eP-v73xueC6REXGuQ.png)

### Entities and the Provider Registry

An *entity* is anyone or anything that participates. The Entity dataclass carries either EntityType.HUMAN or EntityType.AI, and AI entities have an attached AIConfig pointing at a provider:

```
@dataclassclass Entity:    name: str    entity_type: EntityType       # HUMAN or AI    ai_config: Optional[AIConfig] = None
```

Providers are OpenAI-compatible API endpoints — Ollama running locally, OpenAI, Anthropic through a proxy, or anything else that speaks the /v1/chat/completions protocol. API keys are resolved from environment variables at runtime, never stored in the database. This means you can point one panelist at localhost:11434 (Ollama) and another at a cloud provider, mixing local and remote models in the same discussion.

![](https://cdn-images-1.medium.com/max/1024/1*h1strDX9tIzhCm0m2D5lzw.png)

![](https://cdn-images-1.medium.com/max/1024/1*CWYSfMoSM2XVB--u-xkpLA.png)

### Moderated Turn-Taking

The Moderator class manages the rhythm. It maintains a turn order, and after each participant speaks, it can generate a summary that gets appended to a "storyboard" -- a compressed narrative of the discussion so far. The context window sent to each AI participant includes the recent message history plus the moderator's task prompt:

```
def _build_context(self, system_prompt, task):    messages = [{"role": "system", "content": system_prompt}]    context = f"Discussion topic: {self.discussion.topic}\n\n"    for msg in self.discussion.messages[-CONTEXT_MESSAGE_LIMIT:]:        context += f"[{msg.entity_name}]: {msg.content}\n\n"    messages.append({"role": "user", "content": context + "\n" + task})    return messages
```

This sliding window of the last ~20 messages keeps token budgets manageable. The moderator can also intervene with mediation when conflicts arise, reassign turns on the fly, and ultimately produce a concluding synthesis that distills the entire discussion.

![Small local models participating in an ethical discussion](https://cdn-images-1.medium.com/max/1024/1*5xgdG3d69J-KWkbIjGWwuQ.png)

The difference between small models participating and bigger ones is stunning. Smaller models as displayed here don’t seem to have to say much on the bigger questions — guardrails and canned responses seem to be the norm.

![After 3 turns of discussion I forced the conclusion — a discussion between large models can be lively and insightful. If only our politicians would sit at a table and discuss like this …](https://cdn-images-1.medium.com/max/1024/1*6oCZb3q97syUdq3VOpO2wA.png)

![The story board gives us a birdseye view of terse summaries of the discussion flow](https://cdn-images-1.medium.com/max/1024/1*pkyez7LTIo_jB8FSkTPF0w.png)

However, once you allow larger models to participate (gpt-oss:120B upwards) it gets really interesting, and models such as DeepSeek 3.2 or Claude Opus 4.6 can start making even ethicists and logicians scratch their heads as I found out.

That said, sometimes even small models surprise us with insights and viewpoints that most humans might not have considered (including myself). Same as I sometimes learn even from my grandchildren, we should never discredit a participant in a discussion a priori based on our own biases.

### Prompt Templates as Data

Rather than hardcoding how the moderator opens a discussion or asks for a summary, all prompts live in the database as templates with simple {variable} placeholders. Users can edit them through the UI. The resolve\_prompt method looks up the right template by role, target type, and task, then fills in the blanks:

```
def resolve_prompt(self, role, target, task, **variables):    row = self.db.get_prompt_by_task(role, target, task)    template = row["content"]    for key, val in variables.items():        template = template.replace("{" + key + "}", str(val))    return template
```

This means a user can fundamentally reshape how the moderator behaves — making it more Socratic, more adversarial, more concise — without touching code.

![](https://cdn-images-1.medium.com/max/1024/1*vBkspjhGfq-JsFETonP59g.png)

![](https://cdn-images-1.medium.com/max/1024/1*3KWbJNA3ypLt7QyY6t1RVg.png)

### A treasure trove of data

![](https://cdn-images-1.medium.com/max/1024/1*dO7qwuwt6X_8bn0VEj3QVg.png)

Export in various formats (details JSON, self contained html, PDF) is in the process of implementation as I am writing this.

### The Bigger Picture

> Consensus treats AI models not as oracles but as *participants* — opinionated, configurable, and fallible entities that benefit from structure, challenge, and synthesis just as much as human discussants do. The moderation layer is what makes it more than a chatroom: it imposes discipline on the conversation, captures the evolving state of understanding, and produces something more useful than any single response could be.

The implementation is intentionally minimal — pure Python, no frameworks beyond httpx and optional aiohttp/pywebview, SQLite for persistence, vanilla JS for the frontend. It’s a foundation designed to be extended: add new provider types, customize prompt strategies, or plug in domain-specific moderation logic as the use case demands.

![](https://cdn-images-1.medium.com/max/1024/1*Snztw8WYO18kLsfjCaEixw.png)

### Roadmap ahead:

This is work in progress, [open sourced at github](https://github.com/hherb/consensus) — feel free to participate.
What lies ahead:

-   resuming previous discussions
-   allowing participants to join and leave discussions
-   [giving participating AIs a long term memory](https://github.com/hherb/hippocampus), including semantic & graph searching past (public) discussions
-   giving participants access to web search and tools to produce referenced argumentation
-   entities entitled to challenge the moderator’s output and requesting a review of the moderation by participant consensus
-   entities allowed to vote for or change a moderator
-   a proper authentication / registration system for participants
-   once properly security hardened, providing it as a (free) web service if I find an affordable reliable host
-   harvesting (open sourced) training data for reasoning AI from meaningful discussions reaching a helpful consensus — and specifically to train competent small moderator models that can run on local hardware

### Disclaimer

This article was written as team work between myself and AI models (mostly Claude Opus 4.6) in a discussion that resembled what I am trying to achieve with “consensus”. Likewise, the software was produced in co-operation with the models Claude Opus 4.6 and Claude Sonnet 4.6
Whenever you find spelling/grammatical or syntactic mistakes, they are likely mine (English is my 5th language in order of learning, not counting programming languages) — the final editing was done solely by myself.

* * *

[Consensus: Structured Multi-Party Dialogue Between AI models or Humans and Models](https://pub.towardsai.net/consensus-structured-multi-party-dialogue-between-ai-models-or-humans-and-models-16d365cbb150) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.