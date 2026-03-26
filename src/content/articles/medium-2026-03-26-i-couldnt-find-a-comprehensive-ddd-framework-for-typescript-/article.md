---
title: "I couldn’t find a comprehensive DDD framework for TypeScript that didn’t fight the language — So I…"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/i-couldnt-find-a-comprehensive-ddd-framework-for-typescript-that-didn-t-fight-the-language-so-i-af0581fd9580?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-26"
tags:
  - "engineering"
  - "nodejs"
  - "typescript"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-26T21:35:10.878Z"
---

# I couldn’t find a comprehensive DDD framework for TypeScript that didn’t fight the language — So I…

### TypeScript deserved a real DDD framework — so I built one

![](https://cdn-images-1.medium.com/max/1024/1*AtDln_pd4yO_ohQeJF0Y-g.png)

When I moved from Java to TypeScript a few years ago, most things got easier. The tooling was lighter, the iteration speed was faster, and the type system — while different — was surprisingly expressive once you learned to lean into it.

But when I needed Domain-Driven Design, I hit a wall.

In Java, DDD frameworks are mature and plentiful. [Axon Framework](https://www.axoniq.io/framework) gives you aggregates, event sourcing, and sagas out of the box. The patterns are well-established, the tooling is battle-tested, and the ecosystem assumes you’ll want to model your domain properly.

In TypeScript? The options were thin.

NestJS has a [CQRS module](https://docs.nestjs.com/recipes/cqrs), but it requires buying into the entire NestJS ecosystem. Its DI container, its decorators, its module system. If you’re already on NestJS, that’s fine. But if you’re working in an existing codebase, or you just want DDD primitives without adopting an opinionated application framework, it’s a non-starter.

I looked at [wolkenkit](https://www.npmjs.com/package/wolkenkit), which was genuinely promising; a CQRS and event sourcing framework built for Node.js. But the project stalled. I even reached out to one of the main contributors. It wasn’t an option for production use.

Beyond those, the landscape was scattered: thin libraries that gave you an event store client but no aggregate abstraction, hand-rolled patterns copied between projects, or blog posts explaining the theory without shipping usable code.

Coming from the Java world, where I could model aggregates, wire up event sourcing, define projections, and coordinate sagas with well-supported tooling, the gap in TypeScript felt unnecessary. The language had everything it needed: discriminated unions, mapped types, type inference, literal types. The foundations were there. Nobody had built the framework.

So I built one. I called it **noDDDe**.

### The Decider pattern over OOP aggregates

The first decision was the most important: no classes.

Most DDD frameworks model aggregates as classes that extend a base AggregateRoot. You decorate methods with @CommandHandler, mutate state through this.apply(), and wire everything together with a DI container. This works, but it fights TypeScript's strengths rather than leveraging them.

noDDDe uses the [Decider pattern](https://thinkbeforecoding.com/post/2021/12/17/functional-event-sourcing-decider) instead. An aggregate is defined by three things:

1.  An **initial state** what it looks like before anything happens
2.  **Command handlers** (*decide*) given a command and the current state, return events
3.  **Apply handlers** (*evolve*) given an event and the current state, return new state

```
const BankAccount = defineAggregate<BankAccountDef>({  initialState: { balance: 0 },  commands: {    Deposit: (command, state) => ({      name: "DepositMade",      payload: { amount: command.payload.amount },    }),  },  apply: {    DepositMade: (payload, state) => ({      balance: state.balance + payload.amount,    }),  },});
```

No base class. No decorators. No this. The defineAggregate function is actually an identity function, it exists only so TypeScript can infer the types. Zero runtime overhead.

### Type safety that actually helps

The thing I missed most from Java wasn’t the frameworks themselves, it was the confidence that the wiring was correct. TypeScript can give you that confidence, but only if the framework is designed for it.

In noDDDe, you declare a types bundle:

```
type BankAccountDef = {  state: BankAccountState;  commands: BankingCommand;  events: BankingEvent;  infrastructure: { clock: Clock };};
```

From that single type, TypeScript infers everything: what commands each handler receives, what events it can return, what the apply handler’s payload looks like, and what infrastructure is available. If it compiles, the wiring is correct.

Commands and events are built with mapped types:

```
type BankingCommand = DefineCommands<{  Deposit: { amount: number };  Withdraw: { amount: number };}>;type BankingEvent = DefineEvents<{  DepositMade: { amount: number };  WithdrawalMade: { amount: number };}>;
```

One declaration produces the discriminated union, the payload types, and the handler signatures. No enums, no manual union types, no keeping three files in sync.

### Testing without mocks

Because command handlers are functions and apply handlers are pure functions, testing is trivial:

```
const result = await testAggregate(BankAccount)  .given(    { name: "AccountCreated", payload: { id: "acc-1" } },    { name: "DepositMade", payload: { amount: 1000 } },  )  .when({    name: "Withdraw",    targetAggregateId: "acc-1",    payload: { amount: 200 },  })  .execute();expect(result.events[0].name).toBe("WithdrawalMade");expect(result.state.balance).toBe(800);
```

No framework bootstrap. No DI container setup. No mocking an event bus. Given events, when command, then events and state. That’s it.

### But wait, there’s more

noDDDe isn’t just the aggregate pattern. It’s the full stack of DDD/CQRS/ES primitives:

-   **Projections** that fold events into read-optimized views with typed query handlers
-   **Sagas** for cross-aggregate workflow coordination
-   **Two persistence strategies** event sourcing and state stored, swappable at configuration time without changing domain code
-   **Unit of Work** for atomic operations
-   **ORM adapters** for Drizzle, Prisma, and TypeORM with real database transactions and advisory locking
-   **A testing toolkit** with Given-When-Then harnesses for aggregates, projections, sagas, and full domain slices

The same aggregate definition works with event sourcing or state storage. Persistence is a **configuration choice**, not an **architecture decision**.

### Where it is today

noDDDe is new. The packages are published on npm (@noddde/core, @noddde/engine, @noddde/testing, plus ORM adapters), the [documentation](https://noddde.dev) is comprehensive, and there are several sample projects covering different ORMs and domain patterns.

The API is stabilizing, but pre-1.0. I’m looking for feedback from TypeScript developers who’ve built (or tried to build) event-sourced or DDD-based systems. What’s missing? What’s awkward? What would make this useful for your next project?

-   **GitHub:** [github.com/dogganidhal/noddde](https://github.com/dogganidhal/noddde)
-   **Docs:** [noddde.dev](https://noddde.dev)
-   **npm:** yarn add @noddde/core @noddde/engine

Open an issue, roast the API, tell me what’s missing.

* * *

[I couldn’t find a comprehensive DDD framework for TypeScript that didn’t fight the language — So I…](https://levelup.gitconnected.com/i-couldnt-find-a-comprehensive-ddd-framework-for-typescript-that-didn-t-fight-the-language-so-i-af0581fd9580) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.