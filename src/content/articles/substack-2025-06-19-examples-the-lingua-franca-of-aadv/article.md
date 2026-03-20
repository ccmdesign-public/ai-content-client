---
title: "Examples: The lingua franca of AADV?"
subtitle: "In CAX, examples are the basis for compiling intent into code and tests like a compiler produces executable artifacts."
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/examples-the-lingua-franca-of-aadv"
publishedAt: "2025-06-19"
tags:
  - "ai-general"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.567Z"
---

# Examples: The lingua franca of AADV?

In my last post, I demonstrated that ChatGPT generated code [semantic drift](https://jjlangr.substack.com/p/an-aadv-glossary): Its solution deviated from the CAX examples provide. In this case, it generated some code to support sales of shares from the stock portfolio app, something it was never asked to do (right now the stock portfolio should only support purchases):

```
export const applyTransactions = (transactions) =>
  transactions.reduce((holdings, { type, symbol, shares }) => {
    const current = holdings[symbol] || 0
    const delta = type === 'purchase' ? shares : -shares
    return { ...holdings, [symbol]: current + delta }
  }, {})
```

While the need to support sales looms in the near future, I don’t want to tolerate semantic drift at any point in the AADV process. I chose to tell the LLM to correct its over-eagerness.

![](https://substackcdn.com/image/fetch/$s_!mpO-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d666906-f487-4e30-9e72-85ffed321f10_1024x608.png)

In a longer prompt, I first provided the existing tests for the portfolio module;

```
prompt> Here are tests for portfolio.mjs:

import { applyTransactions, createPurchaseEvent, getTransactionsBySymbol } from '../../src/domain/portfolio.mjs'

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
```

I then provided the entire module containing the drifted production code.

```
...prompt> 

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

I finally finished the prompt. I included a reminder that the LLM adhere to the examples and only the examples, using the very wording that ChatGPT had itself suggested:

```
...prompt> Note that the code in portfolio.mjs includes support for what is implicitly "sales," in opposition to the explicit support for "purchases."

Test cases or examples represent the complete spec. Implement only what’s required to pass them. No extras. No validation. No inferred behavior. No assumptions.

Regen the source module.
```

On submitting the prompt, the regenerated `porfolio.mjs` module no longer contained sales-specific code:

```
export const createPurchaseEvent = (symbol, shares, timestamp) => ({
  type: 'purchase',
  symbol,
  shares,
  timestamp
})

export const applyTransactions = (transactions) =>
  transactions.reduce(
    (holdings, { symbol, shares }) => ({
      ...holdings,
      [symbol]: (holdings[symbol] || 0) + shares
    }),
    {}
  )

export const getTransactionsBySymbol = (transactions, symbol) =>
  transactions.filter(tx => tx.symbol === symbol)
```

The new code showed no evidence of sales-related logic, and the code coverage showed 100% for portfolio.mjs. Perfect.

### Examples: To persist or not?

I had the LLM remove sales-related code because it is at this moment purely speculative. At *this* moment, seconds later (now!), I’ve somewhat perversely chosen to tackle supporting sales as the next incremental step[1](https://jjlangr.substack.com/p/examples-the-lingua-franca-of-aadv#footnote-1-165837082). Take it out, put it back in.

I know the current Jest tests accurately depict the behavior I want for the system at this point in time. I could update these Jest tests to include sales behavior, but I’d much rather work with CAX examples. They’re easier to read and more concise, making it easier to read, scan, and manage.

While I could retain my examples in my project and version them, I choose not to. I keep the initial examples around long enough to generate a reasonably stable, compliant module—usually only minutes. They get lost or deleted thereafter. I don’t want the chance for the tests to deviate from the source examples.

My choice to discard examples seems the opposite of the preferred norm to not include generated material in source repository (transpiled code, for example). It’s a pragmatic choice, and here’s my justification:

-   Avoid drift between examples and tests.
    
-   Minimize ***A**ssess* cost. Always starting from examples would require continuous review of a module’s generated tests, even if only a small number of tests changed.
    
-   Accommodate exploration and incremental evolution via tests. It can be *occasionally* useful to directly tweak the generated code by quickly capturing edge cases or defect scenarios in the form of tests. While I still usually start from examples, *real-world CAX isn’t always quite as straightforward and neat.*
    

In some future where generated tests retain 100% fidelity with human examples, I’ll retain only the CAX examples.

### Generating examples from tests

You’ve seen how the tests retain high fidelity with the examples. The opposite should be true, right? In fact, I believe the fidelity to be higher when generating examples from tests, but it’s likely not quite 100% (I haven’t yet encountered deviation when I “generate left,” probably because I do so very infrequently.)

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
```

The LLM’s prompt completion included the corresponding two examples:

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

I now had my preferred—mostly *human*—medium in which to increment and iterate on the examples for the portfolio.

### With CAX examples, verification becomes generation

The generated Jest tests in CAX are an intermediary translation layer, the computer’s means of verifying the code generated by the LLM. Much like the individual statements of generated solution code, they are a secondary construct to support the human goal of delivering value in the form of working software.

With CAX, I generally look at the tests only to ensure they match my examples. When I need to change the behavior of the application, I reverse the direction of generation and create examples from tests, so that I can again focus on defining the behavior in human terms.

Yes, examples are the language in AADV that provides a bridge between human intent and the ability of LLM to generate code that complies with that intent. I don’t write code and I don’t write tests; I generate both, much like a compiler translates a high-level language into one or more lower-level representations, often in multiple stages, eventually producing executable code. The tests act like the compiler’s type checker or semantic analyzer: they verify that the generated code satisfies the intent and constraints expressed in the examples.

Next up: Changing the solution to adding support for sales.

[1](https://jjlangr.substack.com/p/examples-the-lingua-franca-of-aadv#footnote-anchor-1-165837082)

If you’ve read enough of ***AI Code Correct*** posts, by now you’ve figured out that I derive a little bit of entertainment from acting this way, i.e. like a child: “Are you hungry Jeff?”—“Not now.” “Are you hungry now?”—”No.” “Are you hungry now?”—”Yes of course.”