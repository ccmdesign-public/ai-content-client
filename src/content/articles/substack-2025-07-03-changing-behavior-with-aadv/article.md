---
title: "Changing behavior with AADV"
subtitle: "Adding new behaviors means regenerating entire modules. How do you begin to accomplish that in a well-designed, multi-module solution?"
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/changing-behavior-with-aadv"
publishedAt: "2025-07-03"
tags:
  - "ai"
  - "software"
---

# Changing behavior with AADV

### Capturing examples and interfaces

[Last post](https://jjlangr.substack.com/p/examples-the-lingua-franca-of-aadv), I reversed the CAX order and had my LLM generate examples from the existing tests for portfolio. The idea: Distill test code back into a simpler medium, to make it easier to focus on the next increment for portfolio—adding support for sales. Here are the generated two examples:

```
applies transactions to get holdings

applyTransactions([
 purchase(‘IBM’, 10),
 purchase(‘AAPL’, 20),
 purchase(‘IBM’, 10)
])
=> { IBM: 20, AAPL: 20 }

⸻

filters transactions by symbol

getTransactionsBySymbol([
 purchase(‘IBM’, 5),
 purchase(‘AAPL’, 10),
 purchase(‘IBM’, 15)
], ‘IBM’)
=> [
 { symbol: ‘IBM’, shares: 5 },
 { symbol: ‘IBM’, shares: 15 }
]
```

As I began to craft examples to demonstrate *selling* stock, I noted that the generated examples were conspicuously missing transaction timestamps. I wouldn’t be able to turn them around directly to re-generate an enhanced portfolio module. I’d need to first annotate the examples to again contain timestamps. Not acceptable! I’ll be regenerating these examples shortly.

![](https://substackcdn.com/image/fetch/$s_!nrOv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3dd40ea2-41e8-43d4-b0bb-17262ec100c1_1024x608.png)

I also noted that the generated examples are now distinctly code-like, unlike the [original examples I started with](https://jjlangr.substack.com/p/aadv-better-vibes-than-vibe-coding). Here’s a snippet of those original examples, to remind you how sparse they are:

```
Supports multiple purchases of multiple symbols
==
buy AAPL, 100 shares
buy IBM, 30 shares
buy AAPL, 250 shares
verify shares of IBM = 30
verify shares of AAPL = 350
```

I want to also remind you of the design for the portfolio app that I now have in front of me. Here’s a module dependency diagram I generated in CoPilot:

```
route/portfolioRoute.mjs
        │
        ▼
service/portfolioService.mjs
  ├─ getPortfolio
  ├─ addTransaction
  └─ getTransactions
        │
        ▼
domain/portfolio.mjs
  ├─ createPurchaseEvent
  ├─ createSellEvent
  ├─ applyTransactions
  └─ getTransactionsBySymbol
```

(CoPilot is still a useful tool even in an AADV world!)

The key thing to note is that **my portfolio solution now embodies a specific multi-module design**. Its implementation adheres to a specific collection of interfaces.

### AADV: A focus on modular design

To add or change behavior to the portfolio, I could retain my top-level (end-to-end) examples, update them as needed, and regenerate the entire system. I started the portfolio project this way, using top-level examples to describe a couple vertical slices. But I don’t think that’s the right approach to grow a potentially large solution, at least not give the state of LLMs in 2025.

In a small system (like portfolio at this moment), regenerating everything is a reasonable approach. Given a small number of examples, compliance levels will likely remain high.

As the number of examples needed to describe the portfolio grows, however, I believe the amount of non-compliant generated code would increase if I were to regenerate the entire system from top-level examples. Addressing the failed tests would result in a slower CAX process.

Further, such an all-encompassing approach smacks of being unnecessarily disruptive—the modules would all get regenerated, meaning that a module which worked once might now be broken. I’d need to continually re-***A**ssess* all generated tests (unless you were feeding those directly to the LLM… meh). Lots of context, lots more tokens purchased, and lots more to manage (though a plugin would minimize the disruption).

I want to instead focus on the new behaviors, and minimize having to re-visit or re-generate the rest of the system. This ideal represents some notion of “closed”—it would be nice to always enhance the system by extending it, and not having to change existing behaviors.[1](https://jjlangr.substack.com/p/changing-behavior-with-aadv#footnote-1-166333097)

Such a focus represents the *modular* emphasis that AADV promotes. This modularity demands a design that captures the responsibilities for each module—which in turn requires a design for the *interfaces* between the modules.

Accordingly, examples in the CAX prompt must specify the interactions (the function names and parameters) correctly. This will help ensure that the interfaces stay fixed, allowing modules to keep talking to each other without needing to be regenerated[2](https://jjlangr.substack.com/p/changing-behavior-with-aadv#footnote-2-166333097).

### Regenerating the generated examples

With all this in mind, I need to have my LLM regenerate the examples from the existing tests. The examples it initially generated do not align with the generated system.

I asked the LLM to regenerate.

```
prompt> create examples from the following tests

describe('domain logic', () => {
  it('applies transactions to get holdings', () => {
    const txs = [
      createPurchaseEvent('IBM', 10, '2025-01-01'),
      createPurchaseEvent('AAPL', 20, '2025-01-02'),
      createPurchaseEvent('IBM', 10, '2025-01-03')
    ]
    expect(applyTransactions(txs)).toEqual({ IBM: 20, AAPL: 20 })
  })

  it('filters transactions by symbol', () => {
    const txs = [
      createPurchaseEvent('IBM', 5, '2025-06-01'),
      createPurchaseEvent('AAPL', 10, '2025-06-02'),
      createPurchaseEvent('IBM', 15, '2025-06-03')
    ]
    expect(getTransactionsBySymbol(txs, 'IBM')).toEqual([
      { type: 'purchase', symbol: 'IBM', shares: 5, timestamp: '2025-06-01' },
      { type: 'purchase', symbol: 'IBM', shares: 15, timestamp: '2025-06-03' }
    ])
  })
})

Also: Distill the interface declarations (including return types) into simplifications suitable for a subsequent prompt to generate code. 
For example:
  createPurchaseEvent(symbol, shares, timestamp)
```

The LLM provided me with the following two examples plus the interface declarations:

```
// increases shares on purchase
applyTransactions([
  createPurchaseEvent('IBM', 10, '2025-01-01'),
  createPurchaseEvent('AAPL', 20, '2025-01-02'),
  createPurchaseEvent('IBM', 10, '2025-01-03')
])
   => { IBM: 20, AAPL: 20 }

// filters transactions by symbol
getTransactionsBySymbol([
  createPurchaseEvent('IBM', 5, '2025-06-01'),
  createPurchaseEvent('AAPL', 10, '2025-06-02'),
  createPurchaseEvent('IBM', 15, '2025-06-03')
], 'IBM')
   => [{ type: 'purchase', symbol: 'IBM', shares: 5, timestamp: '2025-06-01' },
       { type: 'purchase', symbol: 'IBM', shares: 15, timestamp: '2025-06-03' }]

Distilled interface declarations:

* createPurchaseEvent(symbol, shares, timestamp) -> { type: 'purchase', symbol, shares, timestamp }
* applyTransactions(transactions) -> { [symbol]: shares }
* getTransactionsBySymbol(transactions, symbol) -> [{ type: 'purchase', symbol, shares, timestamp }]
```

The generated examples retained the proper function names, parameters, and return structures. I’m not thrilled with the fact that they now look a little too much like code; I’ll talk about that soon.

I cleaned up the formatting a little and then edited the examples to support sales. I subsequently sent this ***C**reate* prompt:

```
prompt> Generate portfolio.mjs and tests

Test cases or examples represent the complete spec. Implement only what’s required to pass them. No extras. No validation. No inferred behavior. No assumptions.

Implement and conform to the following established interface:

* createPurchaseEvent(symbol, shares, timestamp) -> { type: 'purchase', symbol, shares, timestamp }
* createSellEvent(symbol, shares, timestamp) -> { type: 'sell', symbol, shares, timestamp }
* applyTransactions(transactions) -> { [symbol]: shares }
* getTransactionsBySymbol(transactions, symbol) -> [{ type: 'purchase', symbol, shares, timestamp }]

Examples:

Increases shares on purchase
==
applyTransactions([
  createPurchaseEvent('IBM', 10, '2025-01-01'),
  createPurchaseEvent('AAPL', 20, '2025-01-02'),
  createPurchaseEvent('IBM', 10, '2025-01-03')
])
   => { IBM: 20, AAPL: 20 }

Decreases shares on sale
==
applyTransactions([
  createPurchaseEvent(‘IBM’, 50, '2025-07-01'), 
  createSellEvent(‘IBM’, 20, '2025-07-02')
])
   => { IBM: 30 }

Filters transactions by symbol
==
getTransactionsBySymbol([
  createPurchaseEvent('IBM', 5, '2025-06-01'),
  createPurchaseEvent('AAPL', 10, '2025-06-02'),
  createPurchaseEvent('IBM', 15, '2025-06-03')
], 'IBM')
   => [{ type: 'purchase', symbol: 'IBM', shares: 5, timestamp: '2025-06-01' },
       { type: 'purchase', symbol: 'IBM', shares: 15, timestamp: '2025-06-03' }]
```

Here’s the regenerated production code:

```
export const createPurchaseEvent = (symbol, shares, timestamp) => ({
  type: 'purchase',
  symbol,
  shares,
  timestamp
})

export const createSellEvent = (symbol, shares, timestamp) => ({
  type: 'sell',
  symbol,
  shares,
  timestamp
})

const isSymbol = symbol => event => event.symbol === symbol

const applyTransaction = (acc, event) => {
  const current = acc[event.symbol] || 0
  const delta = event.type === 'purchase' ? event.shares : -event.shares
  return { ...acc, [event.symbol]: current + delta }
}

export const applyTransactions = transactions =>
  transactions.reduce(applyTransaction, {})

export const getTransactionsBySymbol = (transactions, symbol) =>
  transactions.filter(isSymbol(symbol))
```

And here’s the regenerated test code (which I quickly ***A**ssessed*):

```
import { createPurchaseEvent, createSellEvent, applyTransactions, getTransactionsBySymbol } from './portfolio.mjs'

describe('portfolio', () => {
  it('increases shares on purchase', () => {
    const result = applyTransactions([
      createPurchaseEvent('IBM', 10, '2025-01-01'),
      createPurchaseEvent('AAPL', 20, '2025-01-02'),
      createPurchaseEvent('IBM', 10, '2025-01-03')
    ])
    expect(result).toEqual({ IBM: 20, AAPL: 20 })
  })

  it('decreases shares on sale', () => {
    const result = applyTransactions([
      createPurchaseEvent('IBM', 50, '2025-07-01'),
      createSellEvent('IBM', 20, '2025-07-02')
    ])
    expect(result).toEqual({ IBM: 30 })
  })

  it('filters transactions by symbol', () => {
    const result = getTransactionsBySymbol([
      createPurchaseEvent('IBM', 5, '2025-06-01'),
      createPurchaseEvent('AAPL', 10, '2025-06-02'),
      createPurchaseEvent('IBM', 15, '2025-06-03')
    ], 'IBM')
    expect(result).toEqual([
      { type: 'purchase', symbol: 'IBM', shares: 5, timestamp: '2025-06-01' },
      { type: 'purchase', symbol: 'IBM', shares: 15, timestamp: '2025-06-03' }
    ])
  })
})
```

The tests *e**X**ecute* successfully. CAX cycle complete.

### The examples are getting ugly

The generated examples look a lot like code:

```
applyTransactions([
  createPurchaseEvent('IBM', 10, '2025-01-01'),
  createPurchaseEvent('AAPL', 20, '2025-01-02'),
  createPurchaseEvent('IBM', 10, '2025-01-03')
])
   => { IBM: 20, AAPL: 20 }
```

Yuk, I suppose. Most of that ticky-tacky syntax—brackets, parentheses, commas, etc.—isn’t necessary for examples delivered to the LLM in a CAX prompt. I don’t want to have to worry about adding all the syntax-y things and getting them right (though the LLM is usually smart enough to figure out what you meant). Examples can and should be spartan. Otherwise, I might as well be working in the much-pickier language of test code.

One solution to streamline generated examples is to provide the LLM with enough guidance on what examples should look like. To do that, I can create boilerplate prompt text to explain what streamlined examples should look like. (I’ll demonstrate how to do so in a short, **paid-subscribers-only** post.) The better answer is to automate this interest through tooling.

There’s also the question of what to do with the interface declarations. Ultimately the right answer is again “tooling.” In the meantime I suppose persisting them along with the project is an OK answer.

### Up next

In my next (free!) post, I’ll tackle adding a couple more features to the portfolio. Conspicuously missing now is support for exceptional cases, and support for what should happen when all shares of a symbol are sold. As I add these features, I’ll talk about the necessary skill of “thinking like a tester.” Or like a test-driven developer.

[1](https://jjlangr.substack.com/p/changing-behavior-with-aadv#footnote-anchor-1-166333097)

The open-closed principle (OCP) exists to promote a few goals. A primary goal is to minimize the need to *open* up existing modules in order to make changes. Changing code within a module increases the risk of breaking existing behaviors. A predominantly *closed* system reduces that risk.

With AADV, that risk of breaking existing behaviors certainly still exists, since you’re regenerating and replacing entire modules. However, it’s mitigated by the fact that you’re also generating and employing enough tests to catch any newly-generated defects.

[2](https://jjlangr.substack.com/p/changing-behavior-with-aadv#footnote-anchor-2-166333097)

Appropriate tooling*—*on the order of CoPilot, which uses code context ingestion—could minimize the need to explicitly represent the programmatic interface directly in the examples.