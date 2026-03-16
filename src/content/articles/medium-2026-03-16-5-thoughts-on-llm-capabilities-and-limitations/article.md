---
title: "5 Thoughts on LLM Capabilities and Limitations"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/5-thoughts-on-llm-capabilities-and-limitations-eaa57176bb57?source=rss----98111c9905da---4"
publishedAt: "2026-03-16"
tags:
  - "ai-general"
  - "llm"
  - "machine-learning"
  - "nlp"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-16T16:37:52.614Z"
---

# 5 Thoughts on LLM Capabilities and Limitations

# 5 Thoughts on LLM Capabilities and Limitations

[Clement Piat](https://medium.com/@clement.piat2?source=post_page---byline--eaa57176bb57---------------------------------------)

11 min read·4 hours ago

\--

There are different views on the fundamental limitations of Large Language Models.

On one hand you can hear that Transformers trained on next-token prediction (NTP) are not the right paradigm for building intelligent machines, that language by itself is too limiting, as a reductive projection of a much richer space (human experience of the real-world), that these machines do not truly understand (whatever *understand* means), or even that they are « [stochastic parrot](https://en.wikipedia.org/wiki/Stochastic_parrot) ».

On the other hand next-token prediction can be seen as this simple task which, repeated many trillions of times, can lead to the emergence of complex behaviors, in the same way that the simple objective of evolution led to the emergence of complex forms of life (see [DeepMind’s Adam Brown view on this](https://www.youtube.com/watch?v=ykfQD1_WPBQ&t=2847s)).

You have people saying manipulating language doesn’t require to be intelligent, and people saying learning to manipulate language, code, and any kind of symbolic sequences that humans ever wrote, might first lead to the development of some understanding of the world, some logic, etc.

I will try to provide different evidences I gathered here and there, while I was exploring these questions.

## 1\. The empirical perspective: it’s getting hard to find questions LLMs can’t answer

A [paper from March 2025](https://arxiv.org/abs/2503.23674) shows that under specific definition of the Turing test, the best LLMs already pass it. Their version of the test could be roughly translated as *LLM can fool the average human*. While this is a significant step, it would be an even more impressive and meaningful result if an LLM could fool *any humans*, that is if a language model could fool a human who knows exactly what kind of tricky questions to ask.

So are we there already? **Is there even a single question, that no LLM can answer, yet most humans can?**

[This Reddit thread](https://www.reddit.com/r/LLMDevs/comments/1jl4k3i/give_me_stupid_simple_questions_that_all_llms/) asks this exact question but provides no convincing examples. I am also not convinced by the popular examples where LLMs fail unless they generate reasoning first:

-   *how many r are there in strawberries?*
-   *the car wash is only 100m away from my house, should I walk or drive?*

These failure modes certainly tell us something about the models. But they are actually not dramatic, because at the end of the day, these problems can be solved with a relatively short linear verbal reasoning. And LLMs excel at generating such reasoning.

In fact we could narrow the above question further: **are there problems that can’t be solved by** **verbal reasoning alone, yet most blind humans could solve them?**

The blind condition in the question is here to exclude the [ARC problems](https://arcprize.org/) from the search space, as I’m willing to focus exclusively on problems that are naturally formulated in language. ARC tasks are fundamentally visual problems; a blind human can’t solve them. In fact, ARC essentially compares these two beasts:

-   biological brain + eyes
-   LLM + Python Interpreter

Here, however, I am mainly interested in identifying the limitations of LLMs as purely text-to-text systems.

![Illustration of a blinded man asked to solve ARC problems — Source : Author, the pixel art background was generated with Nano Banana 2]()

### Insight problems

There are verbal problems that humans don’t seem to solve with the sequential reasoning of an internal voice, which are called [insight problems](https://en.wikipedia.org/wiki/Insight). Insight problems are those puzzles that first seem unsolvable, until a sudden shift of representation leads to the solution, potentially provoking an aha moment.

> Thus, the means of solution do not rely on inner speech and are ineffable. Conversely, the analytic non-insight strategy involves a conscious, step-by-step search for a solution [\[1\]](https://pmc.ncbi.nlm.nih.gov/articles/PMC10366031/).

One famous such problem is the guy entering a bar, asking for a drink, being threatened with a gun, saying “thank you,” and leaving. The solution is that the man had the hiccups.

Maybe there is a specific thinking process involved in insight problems solving that can’t be mimicked by a sequential verbal reasoning. And maybe this is a promising path towards identifying a problem LLMs can’t solve but most humans do.

So I tried to design such a problem (it needed to be *out-of-distribution*), and came up with this variant of the famous “not twins” riddle:

-   *Daniel and David are born the same day of the same month of the same year, to the same mother, yet they are not twins. How is that possible, provided that they never had any other siblings?*

GPT-5.2 Pro and Gemini 3 Pro found the solution I was expecting in a few minutes of verbal reasoning (though their non-pro reasoning counterparts failed). I provide the answer at the end of the article if interested.

Maybe there is nothing special about insight problems solving after all: when observing the underlying reasoning of GPT-5.2 Pro, we realize that an alternating sequence of [divergent thinking](https://en.wikipedia.org/wiki/Divergent_thinking) blocks (generating different original views) and convergent thinking blocks (logical deduction), can effectively lead to the correct solution.

The difficulty of finding a simple language-based problem that LLMs can’t solve attests to how remarkably strong they are as question-answering systems.

That being said, it could still be the case that this apparent effectiveness is a very sophisticated illusion. But from here it can quickly become highly conceptual: **how should we distinguish genuine intelligence from the illusion of intelligence?** Fortunately, recent work in mechanistic interpretability has begun to provide new clues on this matter.

## 2\. *LLMs’ internal machinery may contain meaningful representations*

[A recent paper from June 2024](https://arxiv.org/abs/2210.13382) showed that, in the specific setting of a game called Othello, the Transformers + NTP recipe was able to learn features that seemed to encode the underlying structure of the training data, that is the Othello board.

They trained a GPT-2 model to predict the next move in an Othello game from a sequence of previous moves (each move is a token in this setup), and proved that they could later build an accurate non-linear probe (a 2-layers MLP) from the internal tokens representations of that model to the board state right before the next move.

In mechanistic interpretability, a probe is a simple model that learns to map a complex model’s internal representations to human-interpretable targets. If a probe can be learned it suggests that the complex model encoded the human-interpretable targets in its latent space.

Their experiments’ results suggested that the model did not just learn superficial correlations, but instead “discovered” through gradient descent that these 20 million sequences of moves were actually governed by a structured 2-dimensional board.

**Now what is the equivalent of the Othello board if the training sequences are not Othello moves but all the text you can find on the internet?**

![Othello Analogy – Source : Author]()

Just as being able to encode the board state seems helpful for predicting valid Othello moves, one can assume that being able to encode some representation of the world as it is experienced by humans, could be useful to predict their next spoken word. And because the board representation has emerged from the Othello setup, one could assume such complex world representations emerged from LLMs’ massive training.

[A more recent article](https://www.neelnanda.io/mechanistic-interpretability/othello) strengthens the previous results by showing that even a linear probe can map the internal features of Othello-GPT to the board state. And [a paper](https://arxiv.org/abs/2403.15498v2) shows similar results with a linear probe capable of accurately recovering the chess board.

## Get Clement Piat’s stories in your inbox

 from this writer.

Remember me for faster sign in

Now let me highlight parts of our world representation that manifestly did not emerge in current LLMs.

## 3\. The shape of a 4

LLMs don’t *speak shapes* at a human level. Take the following riddles:

-   *From Algeria I rise due north to France, swing southwest to Spain, then glide east to Sardegna. What shape have I traced across the sea?*
-   *What does a capital L sitting on a capital X look like?*

I’m assuming answering the above wouldn’t be so hard for most humans — even though this assumption might be a strong one if I trust the few experimental results I got after asking some friends. Humans can leverage a functionality of their brain called the [*visuospatial sketchpad*](https://www.sciencedirect.com/science/chapter/bookseries/abs/pii/S0079742108604521) to basically draw with their mind.

Conversely, the only way an LLM can solve this is by using external tools. The solving process involves drawing the figures, and then analyzing the produced image. But remove those tools, and the models will constantly fail.

![The four ports riddle – Source : Author, Google Maps]()

This *four ports riddle* provides a very concrete example of a symbol that was learned without its complete semantics: the number 4.

The model probably *knows* that 4 is 2 + 2, that this is the number of edges of a square, and many other things about this number. Yet they don’t know that tracing the continuous line described above draws its shape. It doesn’t know that drawing a minimalistic sword with 2 segments, or even a + symbol, and joining this figure’s top most point and its left most point with a straight line, draws a 4.

Note that the purpose of these examples is not to make a strong claim for LLM practical limitations (since tools can efficiently compensate for them), but rather to provide a category of concrete problems that LLMs alone (without scaffolding) consistently fail to solve, which supports the idea that **the world representation emerging from the “Transformers + internet-scale NTP” recipe is incomplete.**

## 4\. Syntax and semantics

There is another response to the above “illusion of intelligence” concern. It is called the [*Chinese Room Argument*](https://en.wikipedia.org/wiki/Chinese_room).

![A variant of the Chinese Room Argument — Source : Author]()

This famous thought experiment was proposed by the American philosopher John Searle in 1980 to argue that, **no matter how intelligent a system that manipulates symbols according to rules may appear, such a system does not thereby *understand*.**

There have been many counterarguments to this idea, and the question remains largely open.

I won’t elaborate further, as this would fall outside the scope of this article. I simply offer this illustration as food for thought for those who ignored this philosophical perspective.

Perhaps one thing we can take from this, at least, is that the mere fact that people start invoking these philosophical arguments, once again attests to the significant capabilities of these models.

![Evolution of interest for the search term “chinese room” — Source: Google Trends]()

## 5\. Are LLMs the right paradigm for maximum progress in science?

I think this is eventually a better way to frame the question of LLM capabilities, as it doesn’t rely on the definition of complex concepts such as *understanding* or *intelligence*. **What really matters is whether these machines are fundamentally limited for the task we ultimately want them to perform.** And in my opinion, scientific progress is the most appealing of AI promises.

So far LLMs have proven to be useful for scientists. They have been used to conjecture an elegant formula from a sample of complex equations ([GPT 5.2 used in theoretical physics](https://huggingface.co/blog/dlouapre/gpt-single-minus-gluons)), to fact-check papers ([Gemini 3 used in maths research](https://www.youtube.com/watch?v=bNrbxCvFrKA)), etc.

Yet it remains unclear whether their contributions could go beyond useful tooling and lead to real scientific breakthroughs.

### Eleusis benchmark

A recent paper by HuggingFace called « Can LLMs play the game of science? » presents a new benchmark for evaluating LLMs.

Most benchmarks such as ARC-AGI or Humanity’s Last Exam, evaluate the model on a single inference task (one question, one answer that logically follows). But scientific research may not only be about logical inference, that is “answering questions”.

The scientific method is more of an iterative process of making experiments, observing the results, building theories, verifying these theories, etc… And all of this must be done under time and resource constraints; scientists can’t explore all imaginable hypothesis, they must somehow commit to the most promising next hypothesis at each step of the process. This implies a richer set of skills than just being able to correctly answer a given question; the author of the paper mentions for instance **metacognition** as the capacity to be aware of its own uncertainty.

![Claude x Claude — Source : Author, collage using images of R.O.B. and Claude Lévi-Strauss]()

The benchmark consists in participating in a game called Eleusis, a card game from the 1950s, where players must guess the rule a dealer has in mind by playing cards that will be accepted only if they follow that hidden rule. The author designed and implemented 26 games rules in Python, and had the best current models play it. The results show how the models compare in terms of absolute performance at the game, but also where they position on a « cautiousness — recklessness » spectrum.

I wanted to see how humans would perform on this “scientific skill” benchmark, so I forked their Github repository, implemented a simple script for human evaluation and took the test myself in (almost) the same conditions as LLMs. You can find the code [here](https://github.com/clementpiat/eleusis-llm-benchmark/tree/evaluate-human). \[2\]

![Interacitve Eleusis evaluation – Source : Author]()

![Individual and LLMs on a score vs recklessness scatter plot — Source : Author]()

Unfortunately, I can’t get any strong message out of these results. The best LLMs seem to play that science game at a human-level; and it’s hard to say more. Nothing in this experiment clearly indicates a fundamental limitation of these models.

### World models

Finally, the hypothesis I find most convincing regarding LLM limitations is that **models that are grounded in the real world** (compared to models stuck in the language space) **could be more suited for scientific research, as science seeks to understand the real world.**

*Grounded in the real world* can sound a bit abstract here, but it basically means that the raw training materials are videos (and other continuous, high-dimensional data) instead of text. These models are commonly referred as world models, and that’s what companies such as [AMI Labs](https://amilabs.xyz/) are working on.

LLMs have proven to be excellent in symbolic realms such as programming and mathematics, the recent resolution of unsolved mathematical problems ([Erdős problems #728](https://arxiv.org/html/2601.07421v1) and #281) being particularly telling evidence; but the assumption that the continuous, high-dimensional physical world is a totally different beast sounds to me like a reasonable one.

## Appendix

-   Solution to the insight problem: Daniel and David are puppies from the same litter.
-   Other new (afaik) insight problem in french that GPT-5.2 and Gemini 3 cracked: *Deux hommes se font face pour un duel: les deux hommes tirent en même temps mais un seul d’eux tombe. Que s’est-il passé?*
-   \[2\] There are obvious limitations to this « human evaluation » approach. First the test is only taken by a single individual. Second, a human taking the test might gain more expertise on the task as he moves on to different rules, whereas LLMs use a fresh context at each game. Though this provides a very rough estimate of how humans **can** perform on this task.
-   **The above was not AI-generated**.