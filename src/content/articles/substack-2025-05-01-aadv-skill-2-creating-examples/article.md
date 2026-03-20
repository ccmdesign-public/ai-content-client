---
title: "AADV Skill #2: Creating examples"
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/aadv-skill-2-creating-examples"
publishedAt: "2025-05-01"
tags:
  - "ai-general"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.638Z"
---

# AADV Skill #2: Creating examples

“Where’s skill #1?,” you ask. Well, it turns out skill #1 is prompt engineering, something that has made at least a handful of people a bit of money. But it’s no longer a full-time, overpaid job, [thankfully](https://www.techrepublic.com/article/news-prompt-engineering-ai-jobs-obsolete/). That we no longer need intermediary wizards to translate human-speak-to-LLM-speak is a sign that we’ve advanced into the next generation of AI. Lieutenant Uhura and [Lieutenant Tawny Madison](https://www.youtube.com/watch?v=W4CgQMJCpZI) sadly only have jobs in a past-fictional Earth future.

You’ve already learned about one of the most important aspect of prompt engineering for AADV: LLMs like examples. That’s what mine told me, on at least a couple occasions[1](https://jjlangr.substack.com/p/aadv-skill-2-creating-examples#footnote-1-162584704). More importantly for now, providing examples in a [CAX](https://jjlangr.substack.com/p/an-aadv-glossary) prompt allows you to easily generate tests that you can Assess and then eXecute.

![Examples come from many sources, presumably.](https://substackcdn.com/image/fetch/$s_!goIb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F33438f0d-db42-4dd3-811b-f0c3e4af2be5_1024x608.png)

### Test-driven development

The core idea behind CAX comes from test-driven development (TDD). A test-driven developer writes small, fast tests as their means of driving small, logical units of behavior into the system.

When test-driving code, you start with the simplest possible case. “What happens if I pass some representation of ‘empty’ or ‘nothing’ to this function?” represents the simplest case for many programming challenges. For example, if building a sort function (as if), your first scenario (case) might be “If I pass an empty list to the `sort` function, it should return an empty list.”

When following TDD, you demonstrate that the test doesn’t pass (there’s no code in place yet!), then craft code to meet the desired outcome described in the test. For this first *zero*\-based case, that involves writing a small function that returns an empty list.

For the next test you write, you seek the next-simplest case, often a *one*\-based test: “If I pass the element *A* to the list, calling `sort` should return a list containing the sole element *A*.”

A third test often represents the *many*\-based test.

`list.push(B) list.push(A) expect(sort(list)).toEqual([A, B])`

With this form of test-driven development—TDD—you grow your system via a continual stream of very small code increments. With each increment, you strive to introduce no more code than needed to get all tests to pass. You then seek to shape the design to be as simple as possible for the new state of the system.

### CAX: Example-driven development

If you try to do straight-up TDD while interacting with an LLM, you’ll likely think it’s a waste of time, particularly if you are hitting the incremental refactoring hard (like you’re supposed to). Done well, TDD is rhythmic, fast-paced coding combined with a continuous obsession over design.

With CAX, your goal is to generate an entire module at a time, and not worry as much about the implementation specifics of the code. At that point, there’s no need to invest time in *incrementally* growing behavioral units.

CAX is still a form of test-driven development: You start by prompting the LLM with a series of examples that describe all the things your module needs to do. The LLM then creates test code from the examples (along with the code for the deliverable module you’re creating).

This set of examples helps clarify to the LLM what your code needs to do. It also defines all the ways you need to test the *intended*[2](https://jjlangr.substack.com/p/aadv-skill-2-creating-examples#footnote-2-162584704) functional behaviors of your module.

To succeed with CAX, you’ll need to be able to pin down every variant of behavior for your module—perhaps not all up front, but you do want to capture examples for as much as you think you understand right now.

Sound daunting? Not really, you already do this when you program by hand: By the time you consider your code complete, you’ve intentionally added all the code necessary to get your software to do what you know it must. You just might not think you know how to capture all the cases up front (or maybe you don’t care about capturing the behaviors in tests at all)[3](https://jjlangr.substack.com/p/aadv-skill-2-creating-examples#footnote-3-162584704).

### ZOM for the (partial) win

In the section on TDD, you learned about the common progression known as [ZOM](https://agileinaflash.blogspot.com/2012/06/simplify-design-with-zero-one-many.html):

-   **Z**ero
    
-   **O**ne
    
-   **M**any
    

The mnemonic helps you remember to move through these three test scenarios first, before considering other possible cases.

The ZOM progression will apply to many but not all modules you build. It will probably only rarely cover *all* the cases you need, though.

Let’s work through a simple example to demonstrate ZOM. Here’s a prompt containing exactly three examples varied on cardinality of input—a-zero word string (`''`), a one-word string (`'smelt'`), and a many-word string (`'was it a car or a cat I saw').`

```
prompt> create a mostFrequentWord function. Given a string of words, it returns the word with highest frequency.

Examples:

empty string returns null
  '' -> null

single-word string returns sole word
  smelt -> smelt

multi-word string returns word with highest frequency
  was it a car or a cat I saw -> a
```

Three examples, three tests generated:

```
import { mostFrequentWord } from './mostFrequentWord.mjs'

describe('mostFrequentWord', () => {
  it('returns null for empty string', () => {
    expect(mostFrequentWord('')).toBeNull()
  })

  it('returns sole word for single-word string', () => {
    expect(mostFrequentWord('smelt')).toBe('smelt')
  })

  it('returns highest frequency word for multi-word string', () => {
    expect(mostFrequentWord('was it a car or a cat I saw')).toBe('a')
  })
})
```

The generated code:

```
export const mostFrequentWord = input => {
  if (input === '') return null

  const words = input.split(' ')
  const freq = words.reduce((map, word) => ({
    ...map,
    [word]: (map[word] || 0) + 1
  }), {})

  return words.reduce((top, word) =>
    freq[word] > freq[top] ? word : top
  )
}
```

The LLM’s solution conforms to the three examples—it passes the three corresponding tests—but you of course know that you’re missing some scenarios. ZOM isn’t exhaustive.

### ZOMBIES for the kill

Well that section header seems unnecessarily violent… but imagine it’s Halloween, as it was for [James Grenning](https://blog.wingman-sw.com/tdd-guided-by-zombies) some years ago when he dreamed up ZOMBIES. ZOMBIES = ZOM + **BIES**:

-   **B**: Boundary behaviors
    
-   **I**: Interface definition
    
-   **E**: Exceptional behavior
    
-   **S**: Simple scenarios, simple solutions
    

Really, what the ZOMBIES acronym suggests is to think like a tester when deriving examples: What are the edge or interesting cases that your code must deal with? What are the exceptional cases? (It also reminds you to use the examples to help you derive an appropriate public interface for the thing you’re testing, and to focus on keeping your examples simple.)

ZOMBIES won’t exhaustively remind you of everything, either, but it should help you remember the categories you’ll need to think about.

Here’s a prompt with additional examples. Note that the latter two examples represent behaviors that the LLM added to the solution, even though not explicitly asked to do so.

```
prompt> Add the following examples:  

when multiple words tie for highest frequency, return the one that occurs first
  run fast jump high run far jump now -> run

ignores case
  Monster walks the winter lake -> monster

ignores extraneous whitespace
  '\t\n\rCry  \v\fBaby Baby   ' -> baby

Regenerate solution and tests
```

The first example—involving a tie—covers an edge case. The second two examples really just capture additional constraints. So again, don’t consider ZOMBIES exhaustive, but a good reminder for the kinds of tests you must consider.

The new tests (ChatGPT generated these three plus the original set of tests):

```
it('returns first word in case of tie', () => {
  expect(mostFrequentWord('run fast jump high run far jump now')).toBe('run')
})

it('is case insensitive', () => {
  expect(mostFrequentWord('Monster walks the winter lake')).toBe('monster')
})

it('ignores extraneous whitespace', () => {
  expect(mostFrequentWord('\t\n\rCry  \v\fBaby Baby   ')).toBe('baby')
})
```

The updated solution[4](https://jjlangr.substack.com/p/aadv-skill-2-creating-examples#footnote-4-162584704):

```
export const mostFrequentWord = input => {
  const words = input.toLowerCase().match(/\b\w+\b/g)
  if (!words) return null

  const freq = words.reduce((map, word) => ({
    ...map,
    [word]: (map[word] || 0) + 1
  }), {})

  return words.reduce((top, word) =>
    freq[word] > freq[top] ? word : top
  )
}
```

So yes, you can always add support for examples to an existing solution. You can also regenerate the entire module given the full set of examples—or tests. Prefer that (your LLM can get confused otherwise).

#### Exceptional behavior

One more example:

```
prompt> one more example:

throws when input not a string
  null -> throw new Error('null input not supported')
```

The new test:

```
it('throws when input not a string', () => {
  expect(() => mostFrequentWord(null)).toThrow(new Error('null input not supported'))
})
```

Updated code:

```
export const mostFrequentWord = input => {
  if (typeof input !== 'string') throw new Error('null input not supported')

  const matches = input.match(/\b\w+\b/g)
  if (!matches) return null

  const words = matches.map(w => w.toLowerCase())

  const freq = words.reduce((map, word) => ({
    ...map,
    [word]: (map[word] || 0) + 1
  }), {})

  return words.reduce((top, word, i) =>
    freq[word] > freq[top] ? word : top
  )
}
```

All tests pass. Ship it.

### Building the skill

The more you focus on trying to provide all necessary cases for a module—for what you need right now—the more you’ll improve on this essential CAX skill. You’ll no doubt omit some from time to time, no matter how good you get. But that’s OK: As you’ve seen here, you can incrementally add behaviors and regenerate the entire module and set of tests.

Improving your skill of providing examples—not an extremely challenging skill—should directly correlate to your ability to go faster with AADV.

[1](https://jjlangr.substack.com/p/aadv-skill-2-creating-examples#footnote-anchor-1-162584704)

I have no reason to disbelieve this yet, though I’m still trying to find time to work on some research on the premise that examples improve the outcome.

[2](https://jjlangr.substack.com/p/aadv-skill-2-creating-examples#footnote-anchor-2-162584704)

Yes you will need to generate or code other kinds of tests.

[3](https://jjlangr.substack.com/p/aadv-skill-2-creating-examples#footnote-anchor-3-162584704)

This one always gets me. I understand why TDD might not be every cup of tea. But it seems negligent to bury all sorts of interesting, intentional behaviors in code, with no quick, trustworthy way to document or quickly understand them.

[4](https://jjlangr.substack.com/p/aadv-skill-2-creating-examples#footnote-anchor-4-162584704)

It looks like the original solution passed the “tie” case. This behavior may have seemed an appropriate default to the LLM, but seems to represent a challenge with CAX. More on this later; for now, see [Kent Beck’s Substack](https://substack.com/@kentbeck) for some discussion.