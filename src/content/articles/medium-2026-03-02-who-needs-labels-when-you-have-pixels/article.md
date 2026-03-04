---
title: "Who Needs Labels When You Have Pixels?"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/who-needs-labels-when-you-have-pixels-368696d1b7f4?source=rss----b680b860beb1---4"
publishedAt: "2026-03-02"
tags:
  - "ai-general"
  - "analytics"
  - "data-science"
  - "machine-learning"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-04T16:11:13.358Z"
---

# Who Needs Labels When You Have Pixels?

# Who Needs Labels When You Have Pixels?

[Daivik Hirpara](/@daivik.hirpara?source=post_page---byline--368696d1b7f4---------------------------------------)

6 min read·1 day ago

\--

*Part 1 of a series on Self Supervised Learning in Computer Vision*

**TL;DR:** What if I told you that no human actually taught GPT how language works? That the biggest models in vision learned to see without a single labeled image? That’s basically self supervised learning. The idea that data can teach itself. This article explains what it is, where it started, and where we’re going with it.

![]()

## The Dirty Secret of Supervised Learning

Let’s talk about what machine learning looked like before all of this.

You wanted to train a model to classify images? Someone had to actually look at a million photos and tag each one. “Dog.” “Cat.” “Hotdog.” One by one. By hand. For months.

Want medical diagnosis from scans? A trained doctor reviews each one. Satellite image segmentation? Someone draws masks around every building, road, tree. Want to train a denoising model? You need pairs of noisy and clean images. For every single example.

This is supervised learning. Human provides the answer. Model learns to copy the human.

And it works. But it has one massive problem.

It doesn’t scale.

There are billions of images on the internet. Nobody is going to label all of them. In medical imaging alone, getting labeled data means getting a doctor to sit there and annotate. That costs real money and real time. And for some tasks, like denoising, you might not even have clean ground truth images at all. The clean version simply doesn’t exist.

For every labeled dataset out there, there’s a thousand times more raw data just sitting around, completely useless to supervised methods.

It’s like having the entire ocean but only being allowed to drink from one bottle.

![]()

## What If We Just Didn’t Need Labels?

That’s basically the question self supervised learning answers.

The core idea is almost too simple. Instead of a human providing the labels, the data labels itself.

Wait, what?

Take a sentence:

```
"The cat sat on the ___"
```

You know the answer. “Mat.” “Floor.” “Couch.” You didn’t need anyone to label this for you. The structure of the sentence itself gives you a learning signal. Mask a word, predict what’s missing.

Same thing works for images. Mask a patch, predict what was there. Take a noisy image, learn to predict what the clean version looks like using just the noisy image itself. No ground truth needed.

That’s self supervised learning. You create a task from the data’s own structure. No human annotation. The data basically provides its own supervision.

![]()

## Three Ways to Actually Do It

Self supervised learning isn’t one technique. It’s a whole family of ideas. But they all share the same trick: hide or corrupt part of the input, then train the model to recover it.

**1\. Masked Prediction**

Hide a piece, predict what’s missing.

For text: mask a word, predict the word. This is basically how BERT works.

```
Input:  "The [MASK] sat on the mat"Target: "cat"
```

For images: cover patches, reconstruct the full image. This is how MAE (Masked Autoencoders) works. You gray out 75% of an image and train the model to fill it back in.

**2\. Contrastive Learning**

Don’t predict what’s missing. Instead learn what’s similar and what’s different.

Take an image. Create two versions of it. Crop it differently, change the colors, flip it. These two views should be “close” in the model’s representation. A completely different image should be “far away.”

No labels anywhere. The model just learns: these two things came from the same source, so map them close. Those two things didn’t, so push them apart.

SimCLR, MoCo, BYOL. All contrastive methods.

**3\. Next Token / Autoregressive Prediction**

Predict the next thing in a sequence. Always the next thing.

```
Input:  "The cat sat"Target: "on"
```

This is how GPT works. Every version of it. Take a massive pile of text and predict the next token. Billions of times. No labels at all.

## Where It Actually Started: Words

To understand why self supervised learning hit so hard, you need to know what NLP looked like before 2013.

Each word was basically a “one hot vector.” If your vocabulary had 50,000 words, each word was a 50,000 dimensional vector. All zeros except one.

“Cat” = `[0, 0, ..., 1, ..., 0, 0]` at position 3,412. “Dog” = `[0, 0, ..., 1, ..., 0, 0]` at position 7,891.

By this representation, “cat” and “dog” are equally far from each other as “cat” and “refrigerator.” Zero information about meaning. Every word is basically an island.

Then in 2013, Tomas Mikolov at Google published Word2Vec. The idea: words that appear in similar contexts probably mean similar things. So train a model to predict context words. It will be forced to learn meaning as a side effect.

Given a word, predict its neighbors:

```
Input:  "fox"Targets: "brown", "quick", "jumps", "over"
```

The model? A single linear layer. Each word gets a 300 dimensional vector. To check if “fox” and “jumps” are context partners, you just take the dot product.

```
score = dot(embedding("fox"), embedding("jumps"))
```

That’s the whole model. No deep network. No attention. A lookup table and a dot product.

After training on billions of words, the vectors actually captured real structure:

```
vector("King") - vector("Man") + vector("Woman") ≈ vector("Queen")vector("Paris") - vector("France") + vector("Italy") ≈ vector("Rome")
```

Nobody told the model about genders or capitals. It just picked these up on its own, just by predicting which words show up near each other.

Simple task. Rich result. That gap is basically where self supervised learning lives.

![]()

## From Words to Vision

Word2Vec worked for text. But text is easy. Words are discrete. You can mask them cleanly. Vocabularies are finite.

Images are different. They’re continuous. Noisy. High dimensional. A 256x256 image has 196,608 pixel values. There’s no “vocabulary” of pixel patches to look up.

For years, computer vision stayed stubbornly supervised. ImageNet with its 1.2 million labeled images was king. Everyone trained on ImageNet labels and called it a day.

But labels in vision are actually even harder to get than in NLP. Think about it:

Labeling text is reading sentences and picking categories. Labeling images might mean drawing pixel perfect segmentation masks around every object. Or getting a medical expert to annotate disease boundaries in MRI scans. Or somehow producing a clean, noiseless version of a photograph to use as ground truth.

Some of these labels are expensive. Some are basically impossible.

What if you could train a model to denoise an image without ever seeing the clean version? What if you could train on just the noisy images themselves?

That’s not hypothetical. People actually figured out how to do it.

![]()

## Where This Series Is Going

This first article is the setup. Self supervised learning is the idea that data can supervise itself. It started in NLP, proved the concept, and then moved to vision.

In the next articles, we’ll go paper by paper through the methods that made self supervised learning actually work for images. We’ll start with the foundational ones and build up:

How do you denoise without clean data? How do you learn image representations without labels? What tricks make this work, and what breaks when you try the obvious approach?

Each article will break down one paper. What it did. Why it mattered. What it got wrong.

## Key Takeaways

-   Supervised learning needs human labels, which are expensive and sometimes just flat out impossible to get
-   Self supervised learning creates training signals from the data itself. No labels needed
-   Three approaches: masked prediction, contrastive learning, autoregressive prediction
-   Word2Vec (2013) proved the idea for language: predict context, learn meaning as a side effect
-   Simple self supervised tasks on massive data produce representations way richer than the task itself
-   Vision is harder than text for this, but the same principles actually apply
-   This series will cover the papers that brought self supervised learning to computer vision, paper by paper

[*Next up: the paper that first showed you can actually learn from images without any labels at all.*](/p/d5ff2ea410fb?postPublishedType=initial)