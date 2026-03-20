---
title: "Semantic drift in AADV"
subtitle: "The cost of unwanted code"
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/behavioral-drift-in-aadv"
publishedAt: "2025-06-10"
tags:
  - "ai-general"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.663Z"
---

# Semantic drift in AADV

[1](https://jjlangr.substack.com/p/behavioral-drift-in-aadv#footnote-1-165494689)In my [prior post](https://jjlangr.substack.com/p/aadv-better-vibes-than-vibe-coding), I exposed an example of how LLMs at times generate more code than you request. When I provided examples that demonstrated how to track stock purchases in my portfolio, the LLM generated this domain module:

```
export const applyTransactions = (transactions) =>
  transactions.reduce((holdings, { type, symbol, shares }) => {
    const current = holdings[symbol] || 0
    const delta = type === 'purchase' ? shares : -shares
    return { ...holdings, [symbol]: current + delta }
  }, {})

export const getTransactionsBySymbol = (transactions, symbol) =>
  transactions.filter(tx => tx.symbol === symbol)

export const createPurchaseEvent = (symbol, shares, timestamp) => ({
  type: 'purchase',
  symbol,
  shares,
  timestamp
})
```

I was unamused that the LLM hallucinated a `sell` intent in the ternary statement. No examples described sales, the LLM didn’t generate any tests to cover its proactive drift, and the LLM didn’t bother mentioning the extra behavior.

![](https://substackcdn.com/image/fetch/$s_!2fSt!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff5ff2896-c24c-41e1-ab06-ae3a21f0dd8c_1024x608.png)

The implication of such hallucinations is that your code will likely end up containing unwanted code unless you remain vigilant. ***A**ssess* in CAX is your defense step, during which your first order of review is to ensure that the LLM created no unsolicited tests. Once you *e**X**ecute* the generated code, you can employ additional tools and approaches to check for extra code:

-   **Code coverage.** You provided what you deemed the complete list of examples and expected the LLM to comply in an exacting manner. You should thus reject a code completion of anything less than 100%. Branch coverage for `portfolio.mjs` showed 75% due to the uncovered `false` clause of the bolded ternary.
    
-   **Mutation testing.** A mutation tool changes (*mutates*) elements of your code, *expecting* the tests to break—if mutated code doesn’t break any tests, then the behavior that code implements is either not tested properly, or it’s in dead (unexercised) code. Mutation testing can be slow, since it might involve triggering hundreds or thousands of mutations. If your modules are small and single-responsibility, mutation tests will run fast enough in the context of a CAX cycle.
    
    For tooling, the definitive solution is [StrykerJS](https://stryker-mutator.io) (which by the way provides a great example of how to package and document a tool).
    
-   **Example drift audits (EDAs**[2](https://jjlangr.substack.com/p/behavioral-drift-in-aadv#footnote-2-165494689)**).** The LLM provided you with code & test completion for the examples you provided in the ***C**reate* step of CAX. You can ask the LLM to generate tests against this spanking new code it generated, then compare the results to the tests you assessed and approved. It will definitely unearth responsibilities you didn’t ask for at times. Some of these characterization tests will likely prod you to acknowledge needed behaviors you had overlooked.
    
-   **A quick scan.** If you’re generated small modules and small functions, the unwanted extra code will often stand out in a 10-second scan through the generated module.
    

AADV tooling employing MCP could incorporate a number of detect-and-regenerate points.

### Asking the LLM

An LLM can provide plenty of explanation and potentially useful insights if asked. I asked how I might get it to generate no more than what the examples demonstrated. It suggested I include the following verbiage in my CAX prompt:

*Test cases are the complete spec. Implement only what’s required to pass them. No extras. No validation. No inferred behavior. No assumptions.*

Sure. We’ll see how well it really listens. You’ll want to make this insistence an ever-present clause in your prompt, and you’ll want to ask it to help you refine the verbiage if/when it ignores you.

It also offered:

*If you want me to fail when I try to be clever, you can say: “Flag any line of code not directly required by the tests. If you’re unsure, ask.”*

Let me know how that goes.

### The cost of unused code

How much should you care that your generated module contains *unused* code? I’ve never had nice words to say about dead code, exemplified by this old tweet:

Dead code is like vampires; it can sap energy years later as people try to figure out if it's still useful. Delete code the moment you no longer need it. It can be near impossible for future souls to discern whether or not code is undead.
— Jeff Langr, [May 2018](https://x.com/jlangr/status/993913283504619520)

I’ve also railed about *speculative* code, which is essentially what these hallucinated intents represent. Sometimes developers will add code to handle what they foresee as soon-to-exist requirements. But it’s always a mistake. Sometimes that future never comes. Sometimes it does come but with nuanced changes to the requirements. In the interim, the unwanted complexity costs, and it sometimes increases costs for the lifetime of the software.

Whether dead or speculative, unused code incurs the following costs (in addition to the waste of generating the code in the first place):

-   Developers must scan or read unused code, increasing the sheer amount of time needed to understand that passage. Even if not directly noticed, it will often jolt the experienced reader, kind of like with Gladwell’s “blink” effect, as they’re confronted with something that feels out of place. This in turn will waste their time as they try to discern what’s amiss.
    
-   Once developers identify that code does represent an undocumented, untested feature, they’ll spend time trying to pin down whether or not it belongs there. Doing so first requires they understand what they think the code is doing. If the developer isn’t so diligent or is too busy, countless other code readers will waste what adds up to be significant amounts of time.
    
-   Any unused code incurs an additional cost for just about everything related to maintaining a codebase. Not only does it get scanned/read over and over, developers write tests for it, and waste time tracking down and fixing such useless tests that break. (Not long ago I watched developers over an hour doing exactly this. It was as amusing as it was distressing.) The unused code slows down other efforts when it ends up in search results, distracting from legitimate results.
    

### If you don’t care what the code looks like…

With AADV, I’m learning to not sweat code implementation specifics so much, mostly focusing on interfaces and module responsibilities. Imagine you’ve reached this future in which you trust the code (because tests for your examples all pass).

Most of the costs I mentioned for unused code are incurred when we humans manually read and manipulate code. **Some costs remain regardless**—the cost to find a specific behavior when the codebase includes hallucinated intents, for example. (Symbol searches and filters of your IDE’s structure view can represent a great improvement over raw text searches.)

It’s possible, though unlikely, that there’s enough unused code to represent a performance problem. But you have tests for that performance requirement, right? (Right?)

On the surface, small bits of unnecessary code can seem innocuous, but over-generation represents a few real problems:

-   **Semantic drift**. Every tiny bit of extra behavior—conditional branch, fallback, validation, etc.—still exists as part of the code’s interface/contract with other code. It does **something**. That *something* may result in future modules or developers or LLMs depending on it, further increasing the drift.
    
    *Behavior becomes expectation. Expectation becomes obligation.*
    
-   **Mutation bloat**. A humorous little vicious downward cycle of increasing time to run mutation testing and address its results, as unwanted behaviors foster more semantic drift.
    
-   **Abstraction drift.** The unused code can have an impact on your interface and module declarations when the LLM generates incorrect or nonexistent abstractions.
    

We will likely have to deal with hallucinated intent for some time to come. Invest some time during each CAX cycle to protect against it.

Next: Let’s start adding features we actually *do* want to the portfolio.

[1](https://jjlangr.substack.com/p/behavioral-drift-in-aadv#footnote-anchor-1-165494689)

Getting a little picky on terminology here. I changed the title of the article from referencing *behavioral* drift (the deviation in behavior when the code is executed) to *semantic* drift—the deviation in intent of the code.

[2](https://jjlangr.substack.com/p/behavioral-drift-in-aadv#footnote-anchor-2-165494689)

Yes I’m inventing YAA (yet another abbreviation).