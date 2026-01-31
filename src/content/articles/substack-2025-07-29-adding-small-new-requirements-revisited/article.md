---
title: "Adding Small New Requirements, Revisited"
subtitle: "In which I justify re-generating the whole of the (small) stock portfolio system, with a detailed one-shot prompt."
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/adding-small-new-requirements-revisited"
publishedAt: "2025-07-29"
tags:
  - "ai"
  - "software"
---

# Adding Small New Requirements, Revisited

If you’re wondering where you can find the article “Adding Small New Requirements” (i.e. not with the word “Revisited”), it doesn’t exist. No wait, that’s not true. It does exist, except that it’s not complete, polished, or published. I might never want to do any of those things with the article. So for now, I’m skipping ahead to a hopefully-happier context.

![Small new requirements](https://substackcdn.com/image/fetch/$s_!BKnC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75a74ad6-73a9-4f4c-a55e-1bce1fdb8423_1024x608.png)

I wasn’t happy with the [current state of the stock portfolio](https://jjlangr.substack.com/p/changing-behavior-with-aadv). After producing what looked to be a reasonable initial solution, I went along with a couple things I knew I wasn’t quite happy with. That served my intents at that time—one of which was to demonstrate how LLMs often generate more than what you ask for.

Unfortunately, as I started to change things, the codebases’s structure created headaches. I was locked into a world of describing too many constraints around the existing implementation. My prompts for the abandoned article talked a lot about shoe-horning a small requirement into the existing codebase. They included information about what modules to change, what interfaces to interact with, and some of “this is how the code already does things, so do it that way.”

As a result of a little too much disappointment over the initial solution, and disappointment about too many prompt refinement passes, I decided to revisit the overall portfolio implementation. Per my self-imposed schedule (at least two posts per month), this post is late as a result.

### Where are we heading?

*(Right here, it said. Which only makes sense if you put a comma before the word heading.)*

Long-term, the ideal for AI is to *fully* specify an entire system. No more focusing on modular design. No more specifying architectures.

That future might arrive sooner than we all expect. But it’s not here yet.

Short-term, at least a few problems exist:

-   LLMs haven’t demonstrated yet that they can consistently adhere to all the requests in a longer prompt. I’m frequently reminding my LLM to remember to do something.
    
-   Even when LLMs “listen” to all the requests, compliance isn’t always at 100%.
    
-   Tooling isn’t streamlined to support wholesale system replacement or using examples as first-class specifications of record (or even 2nd-class specifications of record).
    

Usually, the biggest cost of software development is in *maintaining* systems, not in the effort to initially ship an MVP. It might be straightforward to slap out a solution that provides some initial functionality. But costs usually increase significantly over time as a system grows: Almost every small change to the system runs the risk of degrading its design. That degradation increases costs, even if just a little. Lots of little costs add up quickly.

Thinking about managing systems that must change over time (which is of course most of them), two core possibilities for long-term AI exist:

-   You prompt the AI to update the codebase with a new feature. The AI analyzes the system’s current state. It then generates new code, or rewrites & replaces existing code, or both. You assess the changed tests (which *all* exercise the system from an end-to-end, user/client-facing perspective) for fidelity with the examples, ensure they all pass, and ship the updated system.
    
-   You add the new feature request to your collection of all examples for the entire system, and send a prompt requesting that the whole thing get regenerated.
    

Neither possibility is fully realized at this point, due to the problems I described earlier. Context and compliance are insufficient, particularly for the first option where the AI holds your entire system in context.

That reality of current AI limitations puts you back in the world of AADV, whereby you must continue to specify the design at the granularity of modules and interfaces. That in turn means that you need guidelines for appropriate modular design. The goal of such modular design would be to make it easier to replace modules or drop new ones in place. You want a streamlined prompt, one that doesn’t demand you to provide extensive detail about the existing state of the system

### Back to established design principles

Let’s revisit two core [SOLID](https://en.wikipedia.org/wiki/SOLID) design principles that I discussed in [CAX: Failure to Execute](https://jjlangr.substack.com/p/cax-failure-to-execute)—the OCP and the SRP.

First, the Open-Closed Principle (OCP). The OCP tells you to design a system so that it can be changed by adding new modules, not “opening up” existing modules to change them.

In reality, the vast majority of developers don’t really follow OCP well. Me included. The stock portfolio service I’m working up here provides an almost canonical example of how it does not: To add a typical new feature, you must ***edit*** existing modules. A new endpoint minimally requires changes to the modules that define routes, services, and domain logic. None of these modules are *closed to change.*

To create a maximally-closed system demands stricter adherence to the SRP (Single Responsibility Principle). The SRP says that modules should have one reason to change. A module defining multiple routes has multiple reasons to change—when another route is added to the system, when an individual route must change its behavior, when the API contract must change, when middleware needs to be added to the mix, etc.

With a typical JavaScript implementation, even separating each route into a separate module isn’t quite enough: Something has to import these modules so that you can register the routes with Express, unless you use consign or develop your own auto-loaded. Yes it’s trivial, it represents minimal risk, but it still means your system isn’t fully closed.

### Remind me, why do I care about OCP/SRP?

Back to my earlier contention that AI isn’t ready to generate or manage an entire large system. Context and compliance aren’t there yet.

As a result of having insufficient context, it makes sense to focus at the modular level. Modules with one core responsibility have high levels of cohesion. You’ll generally be able to describe these with a small set of examples. Compliance—your ability to get the LLM to generate working code—should remain high as a result.

OCP usually comes along for the ride with lots of SRP adherence. Remember, though, that even small bits of code can hide an OCP problem—switch statements, for example, particularly if their cases are repeated elsewhere in the codebase.

Adhering to SRP and OCP will allow AADV to work its magic, giving you a very plug-and-play environment. Need a new route? Generate and drop it in place. Need to change how a service orchestrates things to accomplish its work? Regenerate and replace the existing service module.

Keep in mind that the ideal design for your system is a moving target. With respect to generating the portfolio system with AADV, I’m going to tackle some obvious multi-responsibility targets (specifically, combined routes and services modules). I’ll wait and see before I worry about introducing dynamic loading or breaking up the domain layer.

***Next up***: The regenerated portfolio solution—lots of code!