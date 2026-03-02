---
title: "AI Code Correct"
subtitle: "Exploring AI-Assisted Development With Verification (AADV)"
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/ai-assisted-development-with-verification"
publishedAt: "2025-03-04"
tags:
  - "ai-general"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.633Z"
---

# AI Code Correct

![Our world will still be.](https://substackcdn.com/image/fetch/$s_!RFsB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff89029b1-4035-4899-a375-5c9f6d479cc5_1024x608.png)

Welcome to the first post for the **AI Code Correct** Substack!

**AI Code Correct** will be an ongoing series of articles about my experiences with building software using AI. I’ll be exploring my notion of a simple process, AADV, designed to help you ensure you ship AI-generated code with some level of confidence. I’ll also be exploring Substack itself, as this is my first experience writing with it.

Please feel free to provide honest feedback on any of my explorations, then. I’d like to hear your ideas, thoughts on when I’m not doing something well enough, or where you think something is just a bad idea.

My altruistic goal for **AI Code Correct** is to help our industry ensure that we adopt a reputable approach for AI-assisted software development. If it’s AADV, great; if my ideas trigger others to create a better approach, greater! (Hm. ChatGPT suggested the word “better” here instead.)

My not-so-altruistic goal is to earn a little bit from the effort put into these explorations. While there will be enough free postings to convey how you might adopt AADV or a similar approach (hint: it’s really a pretty simple set of ideas), I’ll also be posting articles that dig deeper into the nuances of AADV.

I expect to post at least a couple times per month. Most posts will include code, though some of the necessary software design discussions won’t feature as much code.

### AADV

ChatGPT was released to the public in November 2022. Copilot, based on GPT-4, followed in February 2023. We’re only a couple years in, then, yet AI assistants already feel like indispensable, natural software development companions for many (including me). The world of AI will only continue to speed up, though. Buckle up!

I’ll be honest: I’ve only recently started using Copilot. I’ve been neck-deep in “cheap” subscriptions for a few years, and am very reluctant to pay for yet another $8-to-$20 a month hit. I’d survived since early 2023 with *chat & paste* AI-assisted development using ChatGPT ($20/month), however much of a nuisance it was. Tales from other developers had convinced me that I was doing fine without Copilot—hey, I’m fast and [typing isn’t the bottleneck](https://www.infoq.com/news/2009/05/hill-pair-tdd-for-productivity/).

Copilot definitely saves me some time, though it needs plenty of babysitting and correction. I’m happy to have it for free now, but I think it’s aiming at the wrong target: **If an LLM can generate code, why code line-by-line at all?**

I’ve been instead exploring the notion of employing an AI collaborator to create wholesale modules and classes. For the near future, this Substack will focus on **how to create deliverable code and systems by employing an LLM as a collaborator** that does bulk of the programming work.

#### Challenges With LLM-Generated Code

You can no doubt think of many reasons why *not* to let LLM generate most of the code. Some of the important resistances:

1.  *It’s going to produce code that doesn’t work.*
    
2.  *I’m going to have to spend reviewing and testing the code, losing much of the time I might have saved*
    
3.  *The code quality stinks. I’m going to have to spend too much time trying to understand bad code in order to review and test it.*
    
4.  *It’s going to produce code that might “work” but isn’t quite what I asked for.*
    
5.  *LLMs provide only the illusion of intelligence, and my problems aren’t so easily solved.*
    
6.  *Much of our systems are ever-changing, and LLMs don’t do terribly well with legacy code.*
    
7.  *Where’s the fun in that?*
    

That’s scratching the surface; I’m sure you can think of numerous other challenges to the idea. I think these are all legitimate concerns, and I expect to continue to deal with all of them at some level or another as I continue to explore in posts for **AI Code Correct**.

The primary concern is of course that LLMs can produce incorrect code, and in fact they are likely to do so for some time to come. It’s such a big consideration that it’s the basis for AADV’s prime directive:

**The Prime Directive of AADV**
Any AI-generated code may be wrong.
Trust, but verify. (доверяй, но проверяй)

The scary thought is that a good amount of *faulty* generated code will find its way to production deployments. That’s made even scarier due to what will be a rapid and massive increase in the volume of AI-generated code—I predict that within three years, we’ll have generated more code than all human-written code to date.

### Vetting Generated Code With Tests

The obvious reaction to any concern about heaps of untrustworthy AI-generated code is to ensure all code is properly tested before shipping.

*Test-driven* approaches have been used by humans for decades. These folks design and implement tests as the drivers of code—they don’t write any production code without first defining tests that describe expected outcomes. Software isn’t considered shippable until all tests pass. (Most tests are automated; some tests might remain manual.)

### AADV

AADV is a simple, test-driven approach for building code with an LLM. You’ll see some simple examples first, but I’ll eventually explore having an LLM build most of a small but real(istic) system.

The core of AADV is primarily a unit-test-driven process, implemented in the form of the CAX cycle:

-   **C**reate *both* production code and test code, using an LLM, at a modular or class level,
    
-   **A**ssess the tests: Do they match expectations?
    
-   e**X**ecute the tests and ensure they pass
    

Maybe it should’ve been “Generate, Assess, eXecute,” but I don’t think I could stomach the idea of saying “GAX” more than a few times.

It turns out that LLMs generally do a great job of generating unit test code when given simple, named examples; poorly generated tests are rare. Your LLM prompt that requests code generation can include succinct examples:

```
reverses single-word:
ABC => CBA

reverses individual words:
ABC DEF GHI => CBA FED IHG
```

Narrative examples work, too.

You’ll see how the CAX cycle plays out in the next post with a simple example.

#### Recognizing the Quality Problem

By default, LLM generated-code is highly procedural:

```
function normalizeName(name) {
  // Split the name into parts
  const parts = name.trim().split(' ');
  // Check for suffix
  let suffix = '';
  if (parts[parts.length - 1].includes(',')) {
    suffix = ',' + parts.pop();
  }
  // Check for multiple commas
  if (name.includes(',,') || name.startsWith(',') || name.endsWith(','){
    throw new Error('Invalid name format');
  }
  // Initialize middle name
  let middleName = '';
  // Check if there is a middle name
  if (parts.length > 2) {
    middleName = parts.slice(1, -1).join(' ');
  }

  // ...
```

Like code generated by some novice human developers, LLM code is rife with informational comments describing the next step in an algorithm—a reflection of its academic origins.

While procedural code can allow for laid-back, top-to-bottom reading, it’s not ideal for production systems for numerous reasons. Such code is very slow to scan, it fosters dramatically increased redundancy across the system, it’s harder to change, it’s more likely to obscure defects, to name a few challenges it represents.

LLMs are trained on publicly available codebases (e.g. from GitHub) and code we’ve written about in books and articles. The code LLMs produce is necessarily “old school,” since that’s what the bulk of publicly available code looks like. That should hint at another scary likelihood: A new mass of inelegant, generated code that feeds back into future AI models.

#### But Do You Care?

If you’re seeking to generate wholesale modules or classes, does it matter what the code looks like? You might start thinking about such classes as being *closed* to some extent: If you need the system to support new behavior, you don’t change these classes, you instead update the examples and repeat the CAX cycle. Or, better, you start designing systems that truly adhere to the *[Open-Closed Principle](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html)*, at which point you support new behavior by generating classes that extend the system rather than change it.

*For closed modules that you can wholly regenerate, you need not fully understand their implementation specifics.*

That de-emphasis of code and logic details may be outright offensive to many of you. But it’s where we are heading… in **AI Code Correct** at least. Hang on, though: You’ll quickly see how code and design quality remains important in the realm of AADV.

By default, the code generated by LLMs is inelegant: It is not clear, concise, or cohesive. You might be like me—someone who is significantly bothered by such ugly code. You know that code can be far more elegant and scannable, immediately accessible to its readers. You likely enjoy whittling inelegant functions into something refined and flexible. (It is one of my loves as well.) However …

A function’s body of code is an implementation detail. Its interface is important—its name, what it accepts, and what it returns—but its body is not, as long as it produces correct results and doesn’t represent a performance sink. You might replace a function’s `map/filter` pipeline with an old-school `while` loop, and the rest of the system is unperturbed.

In the AADV world, you begin to scan past these implementation details. You focus instead on the bigger picture, on the abstractions and interactions.

#### It Didn’t Work!… So Now Do You Care?

Generated code *will* have defects, and won’t always pass the tests (that it generated) that you vetted. You can try asking the LLM to regenerate the code, but my experience has shown that once it’s produced a faulty solution, it’s likely to do so the next time you send a prompt.

Fortunately, many approaches exist for you to begin resolving the problem. I’ll talk about some techniques in upcoming posts, but for the most part they involve negotiating with the LLM around the solution and its design. For example, you might need to provide the LLM with examples around a specific problematic function.

If you’re going to need to talk with the LLM about its faulty code, the conversation is going to go a lot better if it’s a well-crafted solution and not a bunch of procedural code. To have the LLM create a better solution, you’ll want to provide it with some design guidelines. Most of those things you already know about “good” design play well here—primarily small, cohesive modules and small, single-purpose functions.

The LLM can do a decent job of adhering to a small set of style guidelines that you provide. Your LLM will no longer generate heavily-stepwise code (well, at least it won’t until it “forgets”). You’ll see an example of a simple style in the next post.

#### Your Skills Still Matter

As you learn to trust generated logic in your module (but only when your tests pass), your design attention must escalate to focus on the module’s structure. How do clients interface with its public behaviors? How are larger behavioral considerations broken out into smaller functions? Should you move a non-cohesive function to another module?

**All your software design skills remain relevant**, as already mentioned. Your primary building blocks are now modules or classes and their interfaces, rather than functions or methods. Now that you’re spending far less time on implementation details, you can focus on how those building blocks fit together to produce a deliverable solution.

As you adopt an AADV approach, you’ll be sharpening your skills in design as well as testing (particularly at a unit level). You’ll add tools like the [ZOMBIES](http://blog.wingman-sw.com/tdd-guided-by-zombies) mnemonic to your repertoire, which will help you ensure that you’ve provided comprehensive unit coverage.

### Let’s Get Started

Enough talk. Let’s move on to take a look at how a simple example of AADV plays out.