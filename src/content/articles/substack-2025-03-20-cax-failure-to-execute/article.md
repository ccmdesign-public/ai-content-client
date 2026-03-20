---
title: "CAX: Failure to Execute"
subtitle: "Last post demonstrated Create-Assess-eXecute (CAX) using a trivial FizzBuzz example. This time around, you'll see what happens when LLM code generation fails (it will)."
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/cax-failure-to-execute"
publishedAt: "2025-03-20"
tags:
  - "ai-general"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.598Z"
---

# CAX: Failure to Execute

[Last post](https://jjlangr.substack.com/p/create-assess-execute-cax) I demonstrated Create-Assess-eXecute (CAX) using a trivial FizzBuzz example. My LLM provided a couple working solutions.

Let's take a look at generating a slightly-more-useful function, the *name normalizer*. Its goal is to transform Western names into *Last, First M.* format. It’s not a terribly complex challenge, but at least it’s “real.”

![](https://substackcdn.com/image/fetch/$s_!O7Tv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F661def5d-db5d-4c7c-ac5d-7738fb285711_1024x608.png)

I’ve created the name normalizer via CAX a number of times. I’m showing it to you now not because the problem is that interesting, but because the outcome is: most of the time, the LLM-created solution for name normalizer has a compliance gap in one area.

The first prompt describes the baseline problem:

```
prompt> Build a name-normalizer function, with the general idea of transforming a person's name from First Middle Last format to "Last, First M."

Project specifics: Create .mjs files. Include jest tests. Use the 'it' function and not the 'test' function. No semicolons!

Examples:

Mononym:
Plato -> Plato

Duonym:
Clarence Ellis -> Ellis, Clarence

Trims spaces:
" \n\n  Alan  \n\t\r\v\fMathison  Turing  " -> Turing, Alan M.

Initializes middle name:
Donald Ervin Knuth -> Knuth, Donald E.

Initializes multiple middle names:
Grace Brewster Murray Hopper -> Hopper, Grace B. M.
```

The tests that are C-for-Created should look just like the examples provided:

```
import { normalizeName } from './nameNormalizer.mjs'

describe('normalizeName', () => {
  it('handles mononyms correctly', () => {
    expect(normalizeName('Plato')).toBe('Plato')
  })

  it('handles duonyms correctly', () => {
    expect(normalizeName('Clarence Ellis')).toBe('Ellis, Clarence')
  })

  it('trims spaces correctly', () => {
    expect(normalizeName(' \n\n  Alan  \n\t\r\v\fMathison  Turing  ')).toBe('Turing, Alan M.')
  })

  it('initializes a single middle name', () => {
    expect(normalizeName('Donald Ervin Knuth')).toBe('Knuth, Donald E.')
  })

  it('initializes multiple middle names', () => {
    expect(normalizeName('Grace Brewster Murray Hopper')).toBe('Hopper, Grace B. M.')
  })
})
```

Unsurprisingly, the LLM-created production code is high in implementation detail and low with respect to abstraction. While the C-for-Created solution contains a number of stylistic *faux pas*, it looks like it should pass the tests.

```
export function normalizeName(name) {
  let trimmedName = name.trim()
  let parts = trimmedName.split(/\s+/)

  if (parts.length === 1) {
    return parts[0]
  }

  let lastName = parts.pop()
  let firstName = parts.shift()
  let middleInitials = parts.map(name => `${name.charAt(0)}.`).join(' ')

  return `${lastName}, ${firstName} ${middleInitials}`.trim()
}
```

Indeed, the tests X-for-eXecute successfully. CAX complete.

### Failing on the Addition of an Example

I have a new requirement for the name normalizer: It must now support suffixes. Here’s the example.

```
prompt> Add a new example:

Retains suffixes, which appear after a comma:
Martin Luther King, Jr. -> King, Martin L., Jr.
```

I have at least two options when updating a solution:

-   Regenerate the entire module given the newly-updated set of examples
    
-   Ask the LLM to update the existing module, given the new example
    

Based on my experience developing pre-AI, my natural inclination is to tell the LLM to make changes to the existing module. But AADV says otherwise: In most cases, I should regenerate the entire module given an updated list of examples. I am creating a mindset that says a solution is but implementation specifics that I can regenerate.

Still, there are cases where I’ll want to shape existing code. I’ll revisit this topic down the road.

The created code looks like a reasonable solution.

```
export const normalizeName = (name) => {
  if (!name.trim()) return ''

  const [main, suffix] = name.split(',').map(part => part.trim())
  const parts = main.split(/\s+/).filter(Boolean)

  if (parts.length === 1) return parts[0]

  const [first, ...middles] = parts
  const last = middles.pop()
  const initials = middles.map(m => `${m[0]}.`).join(' ')

  return [last + ',', first, initials, suffix].filter(Boolean).join(' ')
}
```

A quick A-for-Assessment of the created test shows that it aligns perfectly with the provided example:

```
it('retains suffixes', () => {
   expect(normalizeName('Martin Luther King, Jr.')).toBe('King, Martin L., Jr.')
})
```

Yet the test fails:

```
Expected: "King, Martin L., Jr."
Received: "King, Martin L. Jr."
```

The problem seems simple enough to repair—a missing comma. I *might* find the defect and manually fix the code within a few minutes, but that takes me down the path of quickly reducing the potential ROI of AADV.

Don’t succumb to the temptation. Recreate[1](https://jjlangr.substack.com/p/cax-failure-to-execute#footnote-1-159372809), don’t edit. A key goal for AADV is to *minimize* the amount of hand-coded implementation detail I write.

I’ll cover some tactics over the next few posts or so for addressing compliance gaps, starting with an obvious tactic: if you don’t at first succeed, …

### …Try Try Again

The easiest regeneration approach involves simply re-prompting the LLM, after pointing out the failing tests. Here’s a succinct way to do that via a prompt[2](https://jjlangr.substack.com/p/cax-failure-to-execute#footnote-2-159372809):

```
prompt> The new test fails:

Expected: "King, Martin L., Jr."
Received: "King, Martin L. Jr."
```

Such a retry sometimes works. Here’s the regenerated code.

```
export function normalizeName(name) {
  let trimmedName = name.trim();
  let hasSuffix = trimmedName.includes(',');
  let suffix = '';

  if (hasSuffix) {
    [trimmedName, suffix] = trimmedName.split(',');
    suffix = ', ' + suffix.trim();  // Ensure space after comma for the suffix
  }

  let parts = trimmedName.split(/\s+/);

  if (parts.length === 1) {
    return parts[0] + suffix;
  }

  let lastName = parts.pop();
  let firstName = parts.shift();
  let middleInitials = parts.map(name => `${name.charAt(0)}.`).join(' ');

  return `${lastName}, ${firstName} ${middleInitials}`.trim() + suffix;
}
```

In this case, regeneration *did* work!

Note that the last solution is considerably different than the prior.

Other times, I’ve ended up in a runaround, where I ultimately found myself back at what looks a lot like the first failing solution I saw.

If the created solution demonstrates a failure out of the gate, I already have a likelier chance of a compliance gap with any future re-creation based on a prompt using the same examples. The suffix requirement in the name normalizer code seems to fail *most* of the time.

### Software Design

The prior paragraph might contain a light bulb moment: Some problems appear to be consistently challenging for LLMs to code correctly. A casual observation, based off a few modules I’ve generated, is that algorithms involving local state entanglement appear to be more challenging.

Here is where I start talking about the increasing significance of *design* in AADV.

The [single responsibility (SRP)](https://en.wikipedia.org/wiki/Single-responsibility_principle) says that a module should have only one reason to change. The [open/closed principle](https://en.wikipedia.org/wiki/Open–closed_principle) says that you should add behavior to a system by extending it, not modifying it: You want to find ways to design modules so they are *closed* to future change.

*Hypothesis*: To succeed with AADV and CAX, it will generally be easier if the modules you create are small and closed (i.e. adherent to the SRP and OCP). The compliance gap generally increases as modules increase in responsibility.

Proof left to the reader, but I’ll hopefully be able to demonstrate some anecdotal evidence as I continue to post in **AI Code Correct**.

### Coming Up

*Next:* I’ll begin to explore other regeneration tactics based on revisiting solution design, but first I’ll revisit the concept of general code quality. Higher code quality *might* increase compliance, and I’ll explore that—mostly because higher quality *can* make it easier to negotiate with the LLM.

*Want to discuss any of the posts? Or help me figure out where to head next? Join the conversation.*

[![User's avatar](https://substackcdn.com/image/fetch/$s_!TnFC!,w_64,h_64,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Favatars%2Fdefault-light.png)Join Jeff Langr’s subscriber chatAvailable in the Substack app and on webJoin chat](https://open.substack.com/pub/jjlangr/chat?utm_source=chat_embed)

[1](https://jjlangr.substack.com/p/cax-failure-to-execute#footnote-anchor-1-159372809)

hey, GAX was a bad idea, but the bonus of CAX is I can use the word “recreate” and think about sitting around relaxing while the LLM does the heavy lifting.

[2](https://jjlangr.substack.com/p/cax-failure-to-execute#footnote-anchor-2-159372809)

Adding to my list of things a plugin should streamline