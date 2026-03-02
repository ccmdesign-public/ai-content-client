---
title: "This Neural Network Was Never Trained on Data (And It Still Works)"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/this-neural-network-was-never-trained-on-data-and-it-still-works-d5ff2ea410fb?source=rss----b680b860beb1---4"
publishedAt: "2026-03-02"
tags:
  - "artificial-intelligence"
  - "machine-learning"
  - "self-supervised-learning"
  - "computer-vision"
  - "data-science"
  - "analytics"
---

# This Neural Network Was Never Trained on Data (And It Still Works)

# This Neural Network Was Never Trained on Data (And It Still Works)

[Daivik Hirpara](/@daivik.hirpara?source=post_page---byline--d5ff2ea410fb---------------------------------------)

8 min read·1 day ago

\--

*Part 2 of a series on Self Supervised Learning in Computer Vision*

**TL;DR:** In 2018, a team showed that you can denoise, inpaint, and restore images using a neural network that has never seen a single training example. No dataset. No clean images. No labels. Just one corrupted image and a random network. The structure of the network itself actually acts as a prior. This is Deep Image Prior, and it basically broke everyone’s assumptions about what neural networks learn.

![]()

## The Setup Everyone Just Assumed Was Necessary

Here’s how image restoration was supposed to work in 2018.

Step 1: Collect thousands of pairs. Noisy image, clean image. Corrupted image, original image. Blurry image, sharp image.

Step 2: Train a neural network on these pairs. Input goes in, clean output comes out.

Step 3: Deploy. Feed it new corrupted images. Get clean ones back.

Makes sense. The network learns what “clean” looks like from all those examples. More data, better results. Your standard supervised approach.

But what if you don’t have clean images? What if you only have one noisy photo and no dataset at all?

The answer, before Deep Image Prior, was basically: you’re stuck.

![]()

## The Experiment That Broke Everything

Dmitry Ulyanov and his collaborators tried something that honestly sounded stupid.

Take a neural network. Don’t train it on any dataset. Don’t show it any clean images at all. Instead, take a single corrupted image and try to *overfit* the network to reproduce it.

Now wait. If you overfit to a noisy image, you get… the noisy image back. That’s literally what overfitting means. The network memorizes the input perfectly, noise and all.

Except that’s not what actually happened.

They found that if you fit a neural network to a noisy image and stop at the right time, the network outputs the clean version. It learns the signal before it learns the noise.

Read that again. A randomly initialized network, trained on nothing but a single noisy image, produces a clean result. No training data. No clean reference. Just the network structure and one corrupted input.

![]()

## How? Just… How?

Here’s the actual setup.

Take a neural network (they used a U-Net style encoder decoder). The input is a fixed random noise tensor `z`. The output should match the corrupted image `x₀`.

```
Loss = || f(z) - x₀ ||²
```

Where: — `z` is random noise (fixed, never changes) - `f` is the neural network (starts with random weights) - `x₀` is your single corrupted image

You’re literally fitting a neural network to one image. The input is random garbage. The target is a noisy photo.

Now optimize. Update the network weights to minimize the loss. The network slowly learns to map `z` to something that looks like `x₀`.

Here’s the key thing: the network doesn’t learn everything at once.

**Early in training:** The output captures the large structures. Shapes. Edges. Smooth color regions. Basically the “real” content of the image.

**Later in training:** The output starts picking up the fine noise. The random grain. The pixel level corruption.

There’s a gap between when the network learns signal and when it learns noise. If you stop in that gap, you get a denoised image. Simple as that.

![]()

## Why Does This Actually Work?

This is the question that made the paper famous.

The authors’ answer: the structure of a convolutional neural network itself acts as a prior over images.

What does that actually mean? A CNN is built from convolutions, upsampling, skip connections. These operations have certain built in biases:

**Convolutions prefer local patterns.** A 3x3 convolution looks at a small neighborhood. It naturally captures edges, textures, smooth gradients. Things that actually repeat in natural images.

**The architecture has a limited “bandwidth.”** A U-Net compresses information through a bottleneck. It can’t represent arbitrary high frequency noise easily. Smooth things are easy for it. Random noise is hard.

**Skip connections preserve structure.** They help the network capture both coarse and fine details, but in a structured way.

Natural images have structure. They have edges, smooth regions, repeating textures, gradual color changes. A CNN finds these easy to represent because that’s basically what its operations are built for.

Noise has no structure. It’s random. Independent at each pixel. A CNN has to fight its own architecture to represent pure noise. It can do it eventually, but it takes way longer.

So when you fit the network to a noisy image, it picks up the structured signal first (because that’s easy for a CNN to represent) and the unstructured noise later (because that’s hard).

The network’s architecture is literally acting as a preference for natural images over noise. That preference is the “prior.”

![]()

## No Training Data. Actually Zero.

Let me just say this clearly because it’s easy to miss.

There is no training set. There is no validation set. There is no dataset of any kind.

You have one image. One. And a randomly initialized network. That’s it.

The network has never seen a clean image in its life. It doesn’t know what “clean” means. It doesn’t have any concept of what natural images look like beyond what’s baked into its architecture.

And yet it denoises.

This is wild because it means the prior isn’t learned from data. It’s structural. It comes from how CNNs are built, not from what they’ve seen.

## It’s Not Just Denoising

Deep Image Prior actually works for a bunch of different tasks:

**Denoising:** Fit to a noisy image, stop early, get a clean one. We covered this.

**Inpainting:** Have an image with missing regions? Optimize the network to match only the known pixels. The network fills in the gaps, and because of its structural prior, the fill ins actually look natural.

```
Loss = || mask * (f(z) - x₀) ||²
```

Where `mask` is 1 for known pixels and 0 for missing ones. The network is free to generate anything in the missing regions, and it generates plausible content.

**Super resolution:** Start with a low res image. Optimize the network to produce a high res output that, when down sampled, matches the original. The prior fills in the high frequency details.

**Artifact removal:** JPEG compression artifacts, quantization noise, whatever. Same approach. Fit to the corrupted image, the prior resists reproducing the artifacts.

One idea. Multiple applications. No dataset for any of them.

## The Catch: Early Stopping

There’s an obvious problem though. How do you know when to stop?

If you train too little, the output is blurry. The network hasn’t captured enough detail yet.

If you train too long, the network memorizes the noise. You’re right back to the corrupted image.

The sweet spot is somewhere in between, and finding it without a clean reference is actually tricky.

In the paper, they kind of hand waved this. They showed the loss curve and said “stop here.” In practice, people use heuristics. Monitor the output visually. Use a validation metric if you have one. Stop when things look good.

This is a real limitation. Early stopping is sensitive. Different images, different noise levels, different architectures all need different stopping points. There’s no universal rule.

Later papers in this series will actually address this problem directly. Some of them remove the need for early stopping entirely. But for now, it’s the price you pay for learning from a single image.

## What This Tells Us About Neural Networks

Deep Image Prior isn’t just a denoising trick. It says something about what neural networks actually are.

We usually think of neural networks as blank slates. Randomly initialized, they know nothing. All their knowledge comes from training data.

Deep Image Prior says that’s not completely true. The architecture itself carries information. A CNN “knows” something about images before seeing any data. The convolutional structure, the local connectivity, the translation equivariance, all of these encode assumptions about what images look like.

When we train a massive model on millions of images, some of what it learns is from the data. But some of it was always there, baked into the architecture.

The network isn’t a blank slate. It’s a biased slate. And that bias, at least for images, turns out to be surprisingly useful.

## The Results

For a method that uses zero training data, the results were actually pretty competitive.

On denoising, DIP matched or came close to BM3D, which was basically the gold standard in non learning based denoising at the time. Not bad for a method that literally makes things up from scratch.

On inpainting, the results were visually convincing. Missing regions got filled with textured, structured content that looked natural.

On super resolution, the quality was comparable to supervised methods trained on thousands of image pairs.

Not state of the art. But remember: this uses one image and no training. The fact that it works at all is basically the point.

## Why This Matters for the Series

Deep Image Prior is the starting point for a whole family of methods.

It proved one thing: you don’t always need clean data. The structure of the problem, the structure of the network, the structure of the image, these can give you enough signal to learn from.

But DIP has limitations. It works on one image at a time. You can’t just train once and deploy. Every new image means re optimizing from scratch. And the early stopping problem is real.

The papers that followed asked: can we keep the “no clean data” part but make it actually practical? Can we train on a dataset of noisy images and get something that generalizes? Can we remove the early stopping issue entirely?

That’s where Noise2Noise, Noise2Void, Noise2Self, and the rest come in. Each one relaxes a different assumption. Each one gets closer to a practical self supervised denoiser.

But it all started here. One image. One network. No labels.

## Key Takeaways

-   Deep Image Prior fits a neural network to a single corrupted image with no training data at all
-   The CNN’s architecture acts as a prior: it learns structured signal before random noise
-   This works because convolutions, bottlenecks, and skip connections basically prefer natural image patterns
-   The same approach works for denoising, inpainting, super resolution, and artifact removal
-   Early stopping is required: stop too early and it’s blurry, stop too late and it memorizes noise
-   The key insight: neural network architecture itself carries information about natural images, before seeing any data
-   This paper opened the door for all the self supervised vision methods that followed

*Next up: what happens when you have a whole dataset of noisy images, but still no clean ones?*