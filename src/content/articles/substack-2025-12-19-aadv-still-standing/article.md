---
title: "AADV: Still standing"
subtitle: "AADV and architecture"
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/aadv-still-standing"
publishedAt: "2025-12-19"
tags:
  - "ai"
  - "software"
---

# AADV: Still standing

![Standing strong and bucking the tide.](https://substackcdn.com/image/fetch/$s_!BIF2!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24ac222b-8851-454d-8e20-260f52dae124_1024x608.png)

In the many months since my last post[1](https://jjlangr.substack.com/p/aadv-still-standing#footnote-1-181425503), I spent a lot of time thinking through the ideas behind AADV ([AI-Assisted Development with Verification](https://jjlangr.substack.com/p/an-aadv-glossary)) and CAX ([Create-Assess-eXecute](https://jjlangr.substack.com/p/an-aadv-glossary)) and such. I participated in a few podcasts, and watched/read a bunch of other AI-based development podcasts, too.

AADV stands, and I stand behind it, until something clearly better replaces it. Nothing has. Mostly I’ve seen a lot of thoughts on *a)* the vibe coding notion of slapping out a bunch of code and maybe adding tests after the fact, *b)* doing straight-up TDD and having the LLM help with both green & refactor steps, and *c)* people burning a lot of tokens (and time) waiting on agents to chew on things.

As part of my day job, I did have some opportunities to explore the use of AI in some “real” development work (existing systems and not personal or greenfield efforts). I’ll go into that in the next section. These efforts convinced me that my concerns about AI and design were going to continue to represent the most significant challenge to the approach. (See the last couple of posts for some exploration.) That’s likely where I lost *some* of the heart, subconsciously, to write about AADV.

## The reality of AADV

This summer, my boss asked me and a few other development team leads to explore and report on how to best apply AI to software development. Along with some other small experiments, I paired with someone to develop and ship a small feature using AADV.

The feature involved adding some very *simple behavior* to an *existing* microservice. (It turns out that both of these italicized characteristics are the opposite of the sweet spot for AADV.) The new behavior largely involved altering the data in a largely data-in, data-out endpoint, with almost no conditional logic—if it compiles it probably works.

Our changes needed to adhere to an existing design, one that spread the solution across a route module, a service module, and a persistence module. A persistence model and implementation “framework” already existed; we were compelled to reuse it.

Thus when challenged with updating the service layer in our existing microservice, we had to describe the existing interfaces in our prompt. Example: “Use the `saveCustomer` function from the persistence module.” (I’ve been calling such requirements “constraints,” but maybe *interface contracts* or *binding requirements* is a better term. I’m going with the latter for now.)

Prompting with binding requirements is where things took a downturn. Even though the LLM had ingested information about our codebase, it continued to fumble with aspects of generating the proper calling code. We found ourselves in a tedious, increasingly detailed series of prompts before the LLM was able to get all the things right.

I didn’t enjoy the process much at all, to be honest, and it ended up being very slow. **Using an LLM actually slowed us down for this overly trivial change**, but the real problem may be that **how we think** (or don’t think) **about software design is what’s really slowing us down.**

## Rethinking design

I’ve said before that AI-assisted development (and thus AADV) demands a different mentality. Its primary focus is on modular-level development: You’re not creating a function statement-by-generated-statement, and you’re not even creating a module function-by-generated-function. In AADV, **the module (plus its interface) is the building block of software development**.

If you need to change the behavior of a module in AADV, you *regenerate* it using CAX and the appropriate set of (enhanced) examples. That means you don’t tell the LLM to *add* to an existing module, and you don’t manually edit it.

The Open-Closed Principle states that “software modules should be open for extension, but closed for modification.” This doesn’t quite work for AADV. I am instead defining the **Module Closure Rule (MCR)** to replace the OCP in AADV:

## Introducing the Module Closure Rule (MCR)

***The MCR: Software modules are closed to manual modification, but open to regeneration and extension**.*

In AADV, you primarily use an LLM as a *tool to help you craft closed, behavior-encapsulating modules.*

## What of the Single Responsibility Principle (SRP)?

In my previous post [Adding Small New Requirements, Revisited](https://jjlangr.substack.com/p/adding-small-new-requirements-revisited), I talk about both the SRP and OCP. The SRP states that “a class should have one, and only one, reason to change.” I claim that we need to be more strict about it: If we want to build a system out of “modules that encapsulate behaviors,” we must get better about understanding how to best clump ‘n’ close our behaviors.

At its heart, the SRP makes a lot of sense in the AADV world. Rather than one big `routes.ts` module defining all our REST endpoints, what if you were to start with the idea of each route in its own module?

In other words, don’t create a system that demands unnecessary regeneration of unrelated code for a behavior change. **Stochastic code generation represents variance that threatens [compliance](https://jjlangr.substack.com/p/an-aadv-glossary)**, which in turn just slows you down. Stated simpler: every time you regenerate code for the same set of examples, it has the risk of breaking. (As with many LLM-related concerns, mentally append “for the time being” to that.)

In the current ecosystem, agentic systems that regenerate and re-execute until they achieve 100% compliance can be a viable (though costly) workaround. But the devil is in the details—without exhaustive examples, regression against intended behavior will occur. Specifying exactly how you want the system to behave remains critical.

Still, there are plenty of things to consider. Should we do the same with each public service behavior and separate it into its own module, never mind that all of the (say) date routines are conceptually related? The service routines themselves will likely depend on reusable concepts, particularly persistence. That brings us back to the frustration of telling the LLM about existing interfaces. We probably don’t want a huge surface area of interfaces, either.

Here’s a potential starting point for a regeneration-aware modular architecture:

-   ISP-compliant entry points. The *Interface Segregation Principle* says that “clients should not be forced to depend on interfaces they do not use.” Thus a larger number of route modules, each containing only very strongly-related routes.
    
-   A small, stable layer of “frozen” modules. This would include things like persistence modules, error handling routines, time and other pervasive utilities, shared domain primitives. The stable layer should contain trusted modules that are rarely regenerated. Each has a small public surface.
    
-   A regenerable application layer. This would include service modules, DTO ←→ domain mapping code, policy rules, and feature logic. Regeneration would occur most frequently in this layer.
    
    A key goal for application layer modules: Minimize outward dependencies on infrastructure or concrete implementations. This is achieved by embracing another SOLID principle[2](https://jjlangr.substack.com/p/aadv-still-standing#footnote-2-181425503), the *Dependency Inversion Principle* (DIP): Dependencies are expressed as abstractions, ensuring high-level policy never depends on low-level detail.
    

This architecture is based on Clean / Hexagonal architectures, but is tuned for change frequency and CAX-driven regeneration. It is the starting point for AADV architecture.

I will continue to evolve AADV particularly in this area: How do we best design a system based on modular regeneration? I know that there are some traps in the above, such as the potential of undesirable side effects from file explosion. Comments please.

## Are we using the wrong tools?

At some point, it might make sense to rethink the programming language we use. I’ve been demonstrating the bulk of things here (or to myself) in JavaScript, Java, and TypeScript. But these all suffer the challenge that LLMs aren’t good about identifying the right way to bind a call to function in another module.

Message passing (as in Smalltalk or Elixir) might help a little, but it still implies bindings that the LLM must correctly identify, and won’t at times.

Today’s languages rely on name-based binding. Name-based binding assumes exact symbol recall across contexts. But LLMs don’t have that property. A binding substrate that assigns stable, identity-level references to interfaces could give LLMs something concrete to target and verify against.

## We’re missing a camp

Based on what I’ve seen over the past half year, I see people with the following mindsets. (You might align with one or more of these mentalities.)

-   ***“TDD is awesome, and I want to keep doing granular TDD with my LLM*****.”** I love TDD, too. It’s a great process when done well, and thinking about the outcomes first will always be important.
    
    TDD allows you to continually keep your code/design clean, though such granular refactoring isn’t necessary in a system built around module regeneration.
    
    I found doing pure TDD with an LLM too slow, however. There’s too much back-and-forth conversation with the LLM, since it doesn’t always do all the things you asked for. LLM-assisted TDD with such granular steps quickly became *annoying* to me. Mulling over my negative feelings led to CAX, a similarly outcome-driven form of development that is far less granular.
    
    From the stance of “test-driven,” CAX eliminates the completely unnecessary waste of hand-writing your own tests. Examples are much more succinct and much easier to discuss with other humans (this is where core ideas of BDD come from). And the tests you generate as part of CAX will have very high fidelity with the examples you provide.
    
-   ***“LLM code generation is a bad idea and can’t possible work; LLMs suck; etc.”*** In some ways I’d sincerely love it if I could just finish out my career pretending that hand-crafted code remained the best approach. But compliance for modular-level generation has steadily improved over the past couple and a half years. Even were advancement on AI to stop at this point—i.e. we’re stuck with the LLMs of today—the potential gains are immense. We only now need to adopt a process that best takes advantage of their known limitations.
    
-   ***“Vibe coding for the win, dude.”*** Also know as, “just get better at your prompts.” I attended a podcast by a major IDE vendor recently. Its premise seemed to be “do some more rigorous work in capturing the requirements and translating them to prompts,” yet the speakers more-or-less poo-poo’ed the notion of incorporating much in the way of testing into the mix. AADV suggests that it’s pretty easy to introduce disciplined testing—it’s part of the cyclical process of CAX.
    
    Ultimately, vibe coding *alone* seems to border on malpractice: Generate a large mass of code with an LLM, then come back and manually inspect/test it. I have to think that in the long run this will cost more than hand-coding with proper quality controls.
    

My biggest writing block for the past half year has been that I’ve seen *only* these ideas discussed. Which is odd, because it appears that 2025 will have been the “year of vibe coding” in a dozen days, with no backlash or alternate approaches being discussed. That makes me think the software development industry isn’t yet serious about making LLM-assisted development work in a disciplined way.

[1](https://jjlangr.substack.com/p/aadv-still-standing#footnote-anchor-1-181425503)

Life intervenes. Loads of personal, professional, and physical stressors, all mostly resolved. Apologies, and I will suggest converting to a free subscription if the gap concerns you.

[2](https://jjlangr.substack.com/p/aadv-still-standing#footnote-anchor-2-181425503)

I was not purposefully trying to dig deeper into SOLID.