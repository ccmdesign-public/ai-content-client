---
title: "AADV: Better vibes than vibe coding"
subtitle: "Vibe coding alone => bad idea. Vibe coding + AAD => Really not that much harder, and will take less time in the long run."
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/aadv-better-vibes-than-vibe-coding"
publishedAt: "2025-06-05"
tags:
  - "ai"
  - "software"
---

# AADV: Better vibes than vibe coding

*Update on research: Some things are mentally onerous for me; “research-y” stuff is apparently one of those things. On the plus side, my tooling now allows me to generate* **n** *solutions for a given CAX prompt. On the minus side, I’m dragging my feet when it comes to deriving the [best possible quality metric](https://jjlangr.substack.com/p/do-well-designed-llm-solutions-comply). I’m blaming an extremely busy schedule and a questionable attitude that crops up when I’m not otherwise busy.*

*Offers from you to pair with me will likely be accepted. In any case, I feel bad about not providing more content recently, so here’s a nice practical post.*

* * *

The examples you’ve seen so far for CAX have been single-module challenges. Most of your work is no doubt anything but. In this post you’ll see a slightly bigger example played out.

![Panic at the exchange](https://substackcdn.com/image/fetch/$s_!X4O6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11347d64-6366-4a1a-823a-c4827a4a3021_1024x608.png)

### The stock portfolio

I’m returning to an exercise I’m familiar with: creating code to manage a stock portfolio. Except now I’m moving it out of the realm of *kata* and into that of *real*. The stock portfolio that you’ll see here—and that I’ll build on in subsequent posts—will sport an express server, a Mongo database, and a hexagonal architecture.

Let’s cut right to the chase with a prompt to ***C**reate* the solution and tests. The prompt should tell you everything you need to know for now.

```
prompt> You will be creating a set of services to manage a stock portfolio.

Use Express to manage routes.
Use MongoDB for persistence.
Use event sourcing to manage the portfolio transactions (buy, sell, etc)
Create a clearly delineated hexagonal architecture.

Produce appropriate integration tests and unit tests for each module in the architecture.

Examples:

Retrieves shares of purchased symbol
==
buy IBM, 20 shares
verify shares of IBM = 20

Supports multiple purchases of multiple symbols
==
buy AAPL, 100 shares
buy IBM, 30 shares
buy AAPL, 250 shares
verify shares of IBM = 30
verify shares of AAPL = 350

Tracks transaction history. Support ability to inject a current time into the server.
==
buy AAPL, 50 shares, assume current time: 2025-06-04 13:01:00
buy IBM, 75 shares, assume current time: 2025-06-04 13:02:00
buy AAPL, 100 shares, assume current time: 2025-06-04 13:03:00
verify transactions of IBM = [
  [purchase, 2025-06-04 13:02:00]
]
verify transactions of AAPL = [
  [purchase, 2025-06-04 13:01:00],
  [purchase, 2025-06-04 13:03:00],
]

Supports multiple purchases of multiple symbols
==
buy AAPL, 100 shares
buy IBM, 30 shares
buy AAPL, 250 shares
verify shares of IBM = 30
verify shares of AAPL = 350
```

The CAX prompt provides the LLM with a brief overview, including a design sketch for the solution. It then provides examples for the four core (starter) scenarios.

The LLM provided in response an overview of the directory structure for the solution as well as the tests:

```
/src
  /domain
    portfolio.js              ← core logic (pure)
  /ports
    portfolioRepository.js    ← interface
    clock.js                  ← interface
  /adapters
    /http
      expressApp.mjs          ← Express app
      routes.mjs              ← REST routes
    /mongo
      mongoRepo.mjs           ← persistence adapter
    /infra
      systemClock.mjs         ← production clock
  /services
    portfolioService.mjs      ← orchestrator (uses domain + ports)

/test
  /unit
    domain.test.mjs
    portfolioService.test.mjs
  /integration
    purchaseAndQuery.test.mjs
```

It provided eight solution modules and a couple tests.

### The generated tests

We’re on the ***A**ssess* step of CAX, so let’s review the tests first.

```
// domain.test.mjs

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

Notably, the domain tests don’t precisely mirror what I provided in the CAX prompt—which is fine, because the integration tests did (and you don’t really want to use the same cases in both). Having to verify new calculations—however trivial—will be just a little slower than verifying that the input and output data are the same for both the human examples and the Jest tests.

The only downside of the LLM cooking its own examples here is that it added another smidge of slowdown with the data elements it chose, whereas I try to eliminate the potential for confusion in my examples. For example, in the test `applies transactions to get holdings`, both IBM purchases are for the same number of shares, and their total also matches the number of shares purchased for Apple. It’s easier to follow and do the mental math if all the values are distinct—e.g. IBM 5, Apple 100, IBM 10.

The integration tests *did* mirror the examples I provided:

```
// purchaseAndQueryTest.mjs

import request from 'supertest'
import { MongoClient } from 'mongodb'
import { createApp } from '../../src/adapters/http/expressApp.mjs'
import { createMongoRepo } from '../../src/adapters/mongo/mongoRepo.mjs'
import { createPortfolioService } from '../../src/services/portfolioService.mjs'

let app
let dbClient

beforeAll(async () => {
  dbClient = await MongoClient.connect('mongodb://localhost:27017')
  await dbClient.db('portfolio').collection('events').deleteMany({})
  app = await createApp()
})

afterAll(async () => {
  await dbClient.close()
})

describe('stock portfolio integration', () => {
  it('retrieves shares of purchased symbol', async () => {
    await request(app).post('/api/purchase').send({ symbol: 'IBM', shares: 20 }).expect(201)
    const res = await request(app).get('/api/holdings')
    expect(res.body.IBM).toBe(20)
  })

  it('supports multiple purchases of multiple symbols', async () => {
    await request(app).post('/api/purchase').send({ symbol: 'AAPL', shares: 100 })
    await request(app).post('/api/purchase').send({ symbol: 'IBM', shares: 30 })
    await request(app).post('/api/purchase').send({ symbol: 'AAPL', shares: 250 })

    const holdings = await request(app).get('/api/holdings')
    expect(holdings.body.AAPL).toBe(350)
    expect(holdings.body.IBM).toBe(50)
  })

  it('tracks transaction history with injected time', async () => {
    const clockMock = { now: () => new Date('2025-06-04T13:01:00Z') }
    const repo = await createMongoRepo()
    const service = createPortfolioService(repo, clockMock)
    await service.purchase('AAPL', 50)

    clockMock.now = () => new Date('2025-06-04T13:02:00Z')
    await service.purchase('IBM', 75)

    clockMock.now = () => new Date('2025-06-04T13:03:00Z')
    await service.purchase('AAPL', 100)

    const aaplTx = await service.getTransactions('AAPL')
    const ibmTx = await service.getTransactions('IBM')

    expect(aaplTx.map(t => t.timestamp)).toEqual([
      '2025-06-04T13:01:00.000Z',
      '2025-06-04T13:03:00.000Z'
    ])
    expect(ibmTx.map(t => t.timestamp)).toEqual([
      '2025-06-04T13:02:00.000Z'
    ])
  })
})
```

The integration test failed on the *e**X**ecution* step.

### A correction

I let the LLM know about the test failure:

```
prompt> It appears that the transactions are recorded with a real timestamp, not the injected one:

- Expected  - 0
+ Received  + 2

  Array [
    "2025-06-04T13:01:00.000Z",
    "2025-06-04T13:03:00.000Z",
+   "2025-06-04T23:34:15.632Z",
+   "2025-06-04T23:34:15.637Z",
  ]
```

The LLM provided a bit of information about its failure (not ensuring each test could assume a clean slate), and offered up an updated test (with changed lines **bolded** by me):

```
import request from 'supertest'
import { MongoClient } from 'mongodb'
import { createApp } from '../../src/adapters/http/expressApp.mjs'
import { createMongoRepo } from '../../src/adapters/mongo/mongoRepo.mjs'
import { createPortfolioService } from '../../src/services/portfolioService.mjs'

let app
let dbClient
let db

beforeAll(async () => {
  dbClient = await MongoClient.connect('mongodb://localhost:27017')
  db = dbClient.db('portfolio')
  await db.collection('events').deleteMany({})
  app = await createApp()
})

afterAll(async () => {
  await dbClient.close()
})

beforeEach(async () => {
  await db.collection('events').deleteMany({})
})

describe('stock portfolio integration', () => {
  it('retrieves shares of purchased symbol', async () => {
    await request(app).post('/api/purchase').send({ symbol: 'IBM', shares: 20 }).expect(201)
    const res = await request(app).get('/api/holdings')
    expect(res.body.IBM).toBe(20)
  })

  it('supports multiple purchases of multiple symbols', async () => {
    await request(app).post('/api/purchase').send({ symbol: 'AAPL', shares: 100 })
    await request(app).post('/api/purchase').send({ symbol: 'IBM', shares: 30 })
    await request(app).post('/api/purchase').send({ symbol: 'AAPL', shares: 250 })

    const holdings = await request(app).get('/api/holdings')
    expect(holdings.body.AAPL).toBe(350)
    expect(holdings.body.IBM).toBe(30)
  })

  it('tracks transaction history with injected time (service only)', async () => {
    const repo = await createMongoRepo() // this and the next line were swapped by the LLM, creating no behavioral difference
    const clockMock = { now: () => new Date('2025-06-04T13:01:00Z') }
    const service = createPortfolioService(repo, clockMock)

    await service.purchase('AAPL', 50)

    clockMock.now = () => new Date('2025-06-04T13:02:00Z')
    await service.purchase('IBM', 75)

    clockMock.now = () => new Date('2025-06-04T13:03:00Z')
    await service.purchase('AAPL', 100)

    const aaplTx = await service.getTransactions('AAPL')
    const ibmTx = await service.getTransactions('IBM')

    expect(aaplTx.map(t => t.timestamp)).toEqual([
      '2025-06-04T13:01:00.000Z',
      '2025-06-04T13:03:00.000Z'
    ])

    expect(ibmTx.map(t => t.timestamp)).toEqual([
      '2025-06-04T13:02:00.000Z'
    ])
  })
})
```

### The production code—not much to see here

Most of the production code modules were uninteresting and unlikely to be problematic—short, single-purpose, to the point. Here’s the service module, for example.

```
// portfolioService.mjs

import { createPurchaseEvent, applyTransactions, getTransactionsBySymbol } from '../domain/portfolio.mjs'

export const createPortfolioService = (repo, clock) => ({
  purchase: async (symbol, shares) => {
    const timestamp = clock.now().toISOString()
    const event = createPurchaseEvent(symbol, shares, timestamp)
    await repo.recordTransaction(event)
  },
  getHoldings: async () => {
    const txs = await repo.getAllTransactions()
    return applyTransactions(txs)
  },
  getTransactions: async (symbol) => {
    const txs = await repo.getAllTransactions()
    return getTransactionsBySymbol(txs, symbol)
  }
})
```

I also had the LLM provide me with enough instructions to be able to start up the server and Mongo, as well as run some `curl` and Mongo commands to demonstrate live interaction with the solution.

You can find all the other source code in [the repository on GitHub](https://github.com/jlangr/port).

### Doing more than asked

The portfolio domain module is straightforward. It provides all the domain logic for how the service’s behaviors are implemented:

```
// portfolio.mjs

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

However, there’s a significant wart in the code: It adds a behavior that the prompt didn’t ask for. The LLM didn’t mention this additional behavior in its response, nor did it provide any tests to demonstrate that (poorly defined) behavior. Can you spot the extra logic? (Feel welcome to discuss this topic in the comments.)

An over-eager LLM is a legitimate concern. I did ask the LLM about why it did what it did. I’ll talk about its answer and how to deal with the implications in next week’s post[1](https://jjlangr.substack.com/p/aadv-better-vibes-than-vibe-coding#footnote-1-165232892). In the post after that, I’ll demonstrate adding behaviors to the solution.

### Good vibes are here to stay

The portfolio example presented here essentially demonstrates vibe coding done right—with just the “tiny” wrinkle of CAX added to the mix. It took me about 10 minutes to type up and send the CAX prompt with my examples. It took about two minutes to review the tests, and another couple minutes to re-prompt the LLM to get it to fix the broken test. In less than a half hour, I have a full starter solution that I can depend on and build on (other than the extra behavior).

With vibe coding alone, you get bad vibes. It would have taken longer to review the complete solution, and you wouldn’t have ended up with tests that cover the behaviors you know must exist—and that let you know whether or not the solution even works.

[1](https://jjlangr.substack.com/p/aadv-better-vibes-than-vibe-coding#footnote-anchor-1-165232892)

I **will** finish the follow-up post over the weekend, while my wife is in Ocean City, MD for a high school reunion.