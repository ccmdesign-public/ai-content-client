---
title: "Create, Assess, eXecute (CAX)"
subtitle: "A Simple Example"
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/create-assess-execute-cax"
publishedAt: "2025-03-11"
tags:
  - "ai-general"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.606Z"
---

# Create, Assess, eXecute (CAX)

![Good luck generating conceptual graphics with LLMs. Generating code is easer.](https://substackcdn.com/image/fetch/$s_!vqpA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff5881778-1dc8-41b8-8b7b-e44fd4720384_1024x608.png)

I introduced the concept of CAX—the cycle of **C**reate, **A**ssess, e**X**ecute for generating LLM code— in the [prior post](https://jjlangr.substack.com/p/ai-assisted-development-with-verification?r=36s2h1), my first publication for **AI Code Correct**. In this post you’ll see a trivial example played out, so that you can see what should be happening at each step.

For the short-term, you’ll see CAX demonstrated as an interaction with an LLM chat interface—a copy and paste affair. I’ve experimented with a few chat interfaces, including Claude.ai, Meta.ai, and Mistral.ai. Here you’ll see interactions with ChatGPT, which is the one I chose to pay for—a non-trivial $20 per month.

I’m close to having my CAX plugin working again, but it’ll be constrained for the short term to IntelliJ IDEA, Java, and the OpenAI API. After that, I’ll look to support, in order, WebStorm + JavaScript, TypeScript, VSCode, and finally other APIs. I’ll also take a look to see if it’s easily possible to piggyback on CoPilot. Integration with an IDE definitely streamlines the CAX cycle.

Before we get into CAX, let’s take a look at generating a simple solution using an LLM.

### Letting Your LLM Slap Out Code

For my simple example, I’m choosing FizzBuzz. If an LLM can generate proper FizzBuzz code, there’s hope for the singularity, right?

(Don’t worry; I’ll get to real problems soon enough in **AI Code Correct**.)

Let’s get right to it. I’m using a new chat session with ChatGPT’s o3-mini-high chat model (“great at coding and logic,” purportedly).

So you can follow my chats, you’ll first see a code block with my `prompt>`, then a code block with the LLM’s response, which is usually trimmed for brevity.

```
prompt> generate a fizzbuzz solution in javascript
```

```
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
```

I mean, *you* might not know what FizzBuzz is, but my LLM sure did. If you’re unfamiliar with the exercise, I’ll soon show some examples that help portray the goal for FizzBuzz.

The LLM’s solution wasn’t in line with my standards. I wheedled and pleaded, providing a number of stipulations:

```
prompt> For all requested code, generate JavaScript with ES22.
Functions should be const fat-arrow declarations.
Functions accessed from other modules (including tests) should be exported at the point of declaration.
Use import, not require.
Prefer array and other functional operations to old-school loops and the like.
Do not use semicolons.

Do not mix output with calculations. FizzBuzz should return a string. Also, the solution should involve one function to produce an array of results, and another to assemble that array into a singular string.
```

Most of my stipulations are pertinent to *any* JavaScript code I want generated, and thus I’d love to not continue repeating these stylistic preferences. If you’re not interacting with an API, you can accomplish this (in ChatGPT) by creating a specialized GPT. It’s pretty simple; start by clicking **Explore GPTs** → **\+ Create**. Then provide some simple rules and guidelines using the self-explanatory UI. Be forewarned that some of these guidelines will be forgotten from time to time.

I’ll be using my [custom GPT](https://chatgpt.com/g/g-knF5dC8A2-mcp), “[MCP](https://www.youtube.com/watch?v=KSEPZCjWxjw),” in future posts until my plugin is usable. Somewhere along the way (two posts out?) I’ll publish a post where I describe how to create an appropriate set of AADV programming style rules.

After that lecture, the LLM produced something a bit more professional and aligned with my needs:

```
export const generateFizzBuzzArray = (n = 100) =>
  Array.from({ length: n }, (_, i) => {
    const num = i + 1
    if (num % 15 === 0) return 'FizzBuzz'
    if (num % 3 === 0) return 'Fizz'
    if (num % 5 === 0) return 'Buzz'
    return num.toString()
  })

export const assembleFizzBuzz = (n = 100, separator = '\n') =>
  generateFizzBuzzArray(n).join(separator)
```

It’s FizzBuzz! I can glance at it and know it’s properly coded, right?

No, and that’s a key AADV point: While you’re free to peruse the generated code, the goal is not to expend any real time here (I usually just scan it quickly). First, it’s JavaScript—good luck with all that wonderful JS code that looks slick but hides an insidious little defect. Second, the goal is to go fast, and spending time carefully reading logic (each time code is generated or regenerated) is not fast.

To know that the code works, you can actually generate tests and run them yourself (note: some current models will actually attempt to run their own tests; more on that down the stack).

You might try the following workflow:

-   Describe code
    
-   Generate code
    
-   Generate tests
    
-   Run tests
    

… which can work, and you can of course ask the LLM to generate both tests and code at the same time. But this flow requires careful inspection of the tests generated. Reviewing tests becomes far more an exercise of “do they cover all the scenarios” than “is each individual test correct?” That in turn requires carefully reviewing the generated code to see what cases exist. Slow and error prone.

#### Test-Driven

A better idea might be to code tests, then provide them to LLM as your first step.

I’m saying the word *test*; I realize I’ve not really explained what I mean. Here’s a test written using the test framework Jest, used primarily for TypeScript and JavaScript:

```
describe('fizzbuzzDigit', () => {
  it('returns "Fizz" for numbers divisible by 3', () => {
    expect(fizzbuzzDigit(3)).toBe('Fizz')
    expect(fizzbuzzDigit(9)).toBe('Fizz')  
  })
})
```

A test describes one facet of whatever you’re building. Here, you can read the summary description of that behavior by combining the text in the `describe` function call with the text in the `it` function call:

*fizzbuzzDigit returns “Fizz” for numbers divisible by 3*

The test is supported by one or more examples. In Jest, these examples are defined as *expectations*. The test here provides two such expectations:

-   the fizzbuzz “digit” for the number 3 should be ‘Fizz’
    
-   the fizzbuzz digit for the number 9 should also be ‘Fizz’
    

When you run the test code through Jest, it passes if both expectations are met, otherwise it fails.

### CAX: An Example-Driven Approach

It might take you only a minute or two to write a single Jest test, but that time quickly adds up. It turns out, however, that your LLM does a very good job of *generating* such tests from a streamlined, human set of *examples*.

Most days you probably aren’t handed the cushy task of coding something already well-defined like FizzBuzz. Generally, a key part of your job is breaking down higher-level needs into unit-level behaviors. If you’re test-driving, then, you’re responsible for representing those behaviors as a bunch of tests, each describing a specific *case* or *scenario*.

Figuring out all the pertinent cases remains a still-useful skill in the age of AI—it is your primary means to gaining confidence that the LLM properly generalized your solution. Humans are easily misunderstood by others; they will continue to be easily misunderstood by LLMs for a long time, if not forever. Consider the various cases as your way of pinning down all the possible ways the computer might misinterpret you.

With CAX, you capture the cases in the form of behavioral *examples*.

```
prompt> Generate FizzBuzz and tests.
It should return results in the form of a string.

Examples:

fizzbuzz(1) -> "1"
fizzbuzz(2) -> "1, 2"
fizzbuzz(3) -> "1, 2, Fizz"
fizzbuzz(5) -> "1, 2, Fizz, 4, Buzz"
fizzbuzz(15) -> "1, 2, Fizz, 4, Buzz, Fizz, ... , 14, FizzBuzz"
fizzbuzz() -> "1, 2, ... , 98, Fizz, Buzz"
```

I could see ChatGPT working through some reasoning steps where it thought that the code output should include ellipses. I was prepared for the worst, but it looked like the multiple reasoning passes helped. The LLM’s solution, verbatim:

```
// fizzbuzz.test.js
import { fizzbuzz } from './fizzbuzz'

describe('fizzbuzz', () => {
  test('fizzbuzz(1) returns "1"', () => {
    expect(fizzbuzz(1)).toBe('1')
  })

  test('fizzbuzz(2) returns "1, 2"', () => {
    expect(fizzbuzz(2)).toBe('1, 2')
  })

  test('fizzbuzz(3) returns "1, 2, Fizz"', () => {
    expect(fizzbuzz(3)).toBe('1, 2, Fizz')
  })

  test('fizzbuzz(5) returns "1, 2, Fizz, 4, Buzz"', () => {
    expect(fizzbuzz(5)).toBe('1, 2, Fizz, 4, Buzz')
  })

  test('fizzbuzz(15) returns complete FizzBuzz sequence', () => {
    const expected = '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz'
    expect(fizzbuzz(15)).toBe(expected)
  })

  test('fizzbuzz() defaults to 100 and returns proper start and end', () => {
    const result = fizzbuzz()
    expect(result.startsWith('1, 2')).toBe(true)
    expect(result.endsWith('Fizz, Buzz')).toBe(true)
    expect(result.split(', ').length).toBe(100)
  })
})
```

```
// fizzbuzz.js
export const fizzbuzz = (n = 100) => {
  return Array.from({length: n}, (_, i) => {
    const num = i + 1
    if (num % 15 === 0) return 'FizzBuzz'
    if (num % 3 === 0) return 'Fizz'
    if (num % 5 === 0) return 'Buzz'
    return num.toString()
  }).join(', ')
}
```

The solution contains plenty of small implementation details to annoyed with, but I’ve learned to move past most of that. Most importantly right now is step #2 in CAX: Do the tests match your examples?

The names of the tests aren’t great (particularly the test for `fizzbuzz(15)`, for which the inclusion of the word “complete” is misleading). The test names also do not succeed with one of the key goals for behavioral unit tests—to help a reader understand the intents of the system. Here, they aren’t explicit about the rules for FizzBuzz. We’ll come back to that.

But the inputs and expected outputs for each example clearly match. And the final test—for a complete FizzBuzz string of the number 1 through 100—provides three clear declarations[1](https://jjlangr.substack.com/p/create-assess-execute-cax#footnote-1-158386302). You can declare the generated tests to be properly A-for-Assessed.

Which means you can move on to the last step, X-for-eXecute. You should be able to quickly copy the generated production code and replace the corresponding source content (if there is any) in your IDE, then do the same for the generated test code, then run the tests. (This is where a plugin is going to be immensely helpful.)

Here, they pass. Did you generate all of the cases necessary? Do you need other sorts of tests (generative tests, feature tests, approvals tests, etc.)? Do you need to do exploratory testing? (All forthcoming **AI Code Complete** topics.)

### CAX Refined: Describing Examples

The examples you provide to your LLM capture the outcomes you wish to achieve. If you add a brief description to the example cases, your LLM will use it as the basis for your test names. The descriptions also provide additional context, which theoretically should improve the likelihood that your LLM produces correct code.

#### Create

Here’s a fleshed-out prompt; it took about 5 minutes to create. I decided to break out the notion of calculating the FizzBuzz digit to a separate set of examples from the notion of assembling FizzBuzz digits into a sequenced stream.

```
prompt> FizzBuzz is the classic interview exercise. It should return results in the form of a string.

Examples:

numbers divisible by three translate to "Fizz"
fizzbuzzDigit(3) -> "Fizz"
fizzbuzzDigit(9) -> "Fizz"

numbers divisible by five translate to "Buzz"
fizzbuzzDigit(5) -> "Buzz"
fizzbuzzDigit(10) -> "Buzz"

numbers divisible by three and five translate to "FizzBuzz"
fizzbuzzDigit(15) -> "FizzBuzz"

all other numbers translate to themselves
fizzbuzzDigit(1) -> "1"

generate a stream of numbers from 1 through a target
fizzbuzz(1) -> "1"
fizzbuzz(5) -> "1, 2, Fizz, 4, Buzz"

generate a stream of 100 numbers by default
fizzbuzz() -> "1, 2, Fizz, 4, ... , 98, Fizz, Buzz"

Generate production code and tests.
```

The LLM similarly split the tests:

```
// fizzbuzz.test.js
import { fizzbuzzDigit, fizzbuzz } from './fizzbuzz.js'

describe('fizzbuzzDigit', () => {
  test('returns Fizz for numbers divisible by 3 only', () => {
    expect(fizzbuzzDigit(3)).toBe('Fizz')
    expect(fizzbuzzDigit(9)).toBe('Fizz')
  })

  test('returns Buzz for numbers divisible by 5 only', () => {
    expect(fizzbuzzDigit(5)).toBe('Buzz')
    expect(fizzbuzzDigit(10)).toBe('Buzz')
  })

  test('returns FizzBuzz for numbers divisible by both 3 and 5', () => {
    expect(fizzbuzzDigit(15)).toBe('FizzBuzz')
  })

  test('returns the number as a string for other numbers', () => {
    expect(fizzbuzzDigit(1)).toBe('1')
    expect(fizzbuzzDigit(2)).toBe('2')
  })
})

describe('fizzbuzz', () => {
  test('generates correct stream for target 1', () => {
    expect(fizzbuzz(1)).toBe('1')
  })

  test('generates correct stream for target 5', () => {
    expect(fizzbuzz(5)).toBe('1, 2, Fizz, 4, Buzz')
  })

  test('generates a stream of 100 numbers by default', () => {
    const result = fizzbuzz().split(', ')
    expect(result.length).toBe(100)
    expect(result[0]).toBe('1')
    expect(result[2]).toBe('Fizz')
    expect(result[4]).toBe('Buzz')
  })
})
```

#### Assess

Assessing the FizzBuzz tests, per CAX, should take about 15 seconds. Once you’re happy with the tests, you of course needn’t regenerate them unless you have changes. You’ll certainly need to regenerate production code when the LLM gets it wrong.

The solution demonstrates the two separately-verified functions:

```
// fizzbuzz.js
export const fizzbuzzDigit = (n) => {
  if (n % 15 === 0) {
      return 'FizzBuzz'
  }
  if (n % 3 === 0) {
      return 'Fizz'
  }
  if (n % 5 === 0) {
      return 'Buzz'
  }
  return n.toString()
}

export const fizzbuzz = (target = 100) => {
  return Array.from({ length: target }, (_, i) =>
    fizzbuzzDigit(i + 1)).join(', ')
}
```

I usually prefer to provide a set of examples representing what the public interface should support. Here I felt like exploring what the LLM would do when asked to decompose the problem into two chunks, each with a clear set of examples. (It also seemed to make the examples easier to write, for what that’s worth.) I don’t think you want to do a lot of this, but if it helps you generate solutions more quickly, and if you can describe distinct *behaviors* (and not in terms of implementation specifics), it’s fine.

#### eXecute

All tests should pass.

Not counting all the time required to read this article, it took you perhaps 5 minutes to specify the expected outcome in the form of examples, 10 seconds waiting for the solution to generate, 15 seconds assessing the tests, and a few seconds to put the solution in place and run the tests.

Coding fizzbuzz goes pretty fast for seasoned developers. Add unit tests into the mix, though, and most humans are probably at 15+ minutes.

Tackle a more complex—more “realistic”—need, however, and the payoff for CAX-generated code is potentially much higher. That is, however, until the LLM generates code that passes only some of your tests. I refer to this amount of test failure as the *compliance gap*.

Currently, the compliance gap always has a potential to be non-zero. I’ve heard a few people suggest that it’s around 10%—that is, the code produced is generally around 90% correct.

The gap can be shrunk a bit, also, by the sorts of prompts you provide the LLM. More on that in later posts.

Until it’s consistently near-zero, the compliance gap can create a risk of spending more time with AADV than with creating code by hand. Future explorations with AADV will involve me actively seeking to reduce it.

#### Not TDD

For those of you who are Test-Driven Development (TDD) practitioners (like me), you’ll note that CAX isn’t a highly-incremental approach like TDD. In TDD, you introduce one test at a time, usually representing the simplest possible case. You get it to pass, clean up the code, and move on to the next-simplest case.

The TDD cycle can provide numerous benefits. One of the most significant is that it creates the controls necessary for keeping the system’s code quality high via continual refactoring.

In contrast, when using CAX you seek to capture all possible cases for a given module or class as the first step, then let the LLM generate the entire solution (including tests). You forego the refactoring step—the premise is that you don’t really care much about the implementation details the more that you trust the auto-generated implementation.

*The implications of that stance are huge.* For AADV to work in a larger system, you still must understand good software design. You’ll want to ensure you’re atop key design concepts that have stood the test of time—particularly notions of creating small, closed modules.

Technically, you’ve learned all you need to know about the CAX cycle itself, and you could figure out the rest on your own.

However, AADV is a bigger thing. It encompasses CAX, appropriate style guidelines, approaches to providing examples, design considerations, and other topics.

Despite having your LLM do a lot of dirty work, *you will remain a developer* when you use AADV. Success—being able to continually deliver quality software product—still requires numerous software development and engineering skills.

As such, there won’t be a shortage of **AI Code Complete** posts to come, as I continue to explore AADV.

### Next Up

You’ll see a slightly beefier example of CAX, and this time not a “known quantity.”

[1](https://jjlangr.substack.com/p/create-assess-execute-cax#footnote-anchor-1-158386302)

I am writing all posts for **AI Code Correct** from scratch, with freshly-generated tests + code, even if I’ve already tried some of these examples before. This will help me track with model advances, for one. Here, I was pleasantly surprised with what was generated with the test for 100—providing three assertions to both describe and spot-check a longer sequence seemed a thoughtful, reasonable solution.