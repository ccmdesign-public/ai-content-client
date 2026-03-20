---
title: "Why I Built a Masked Autoencoder (MAE) from Scratch (And How You Can Too)"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/why-i-built-a-masked-autoencoder-mae-from-scratch-and-how-you-can-too-06971b5a8d34?source=rss----98111c9905da---4"
publishedAt: "2026-02-27"
tags:
  - "ai-general"
  - "computer-vision"
  - "machine-learning"
  - "model-training"
  - "open-source"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.625Z"
---

# Why I Built a Masked Autoencoder (MAE) from Scratch (And How You Can Too)

# Why I Built a Masked Autoencoder (MAE) from Scratch (And How You Can Too)

[Alp Demirel](https://medium.com/@demirel.alp?source=post_page---byline--06971b5a8d34---------------------------------------)

5 min read·1 hour ago

\--

1

Let’s be honest: labeling data is the absolute worst part of computer vision.

For years, the standard playbook was to scrape millions of images, pay an army of annotators to draw bounding boxes, and feed them into a supervised Convolutional Neural Network. It worked, but it didn’t scale. Then self-supervised learning (SSL) came along, promising a world where models could learn from raw, unlabeled images. But early contrastive methods like SimCLR and MoCo were notoriously heavy, requiring massive batch sizes and complex, carefully tuned data augmentations.

Then, I read the 2021 paper by Kaiming He and the FAIR team: *Masked Autoencoders Are Scalable Vision Learners*. Their premise was almost laughably simple: **What if we just delete 75% of an image and force a neural network to hallucinate the rest?**

It sounded too simple to work. But it didn’t just work — it completely shattered state-of-the-art benchmarks. I knew I had to understand this under the hood, so I decided to build it myself.

You can find my complete, open-source implementation here: **((**[**https://github.com/Alpsource/Visual-Representation-Learning-MAE**](https://github.com/Alpsource/Visual-Representation-Learning-MAE)**))**.

If you want to understand how Masked Autoencoders (MAE) actually work in code, why they are so unbelievably fast to train, and how you can use my repo to train your own vision foundation models, keep reading.

![]()

> *Reconstruction results after 50 epochs of self-supervised pre-training using L1 Loss. The model successfully hallucinates missing structures such as object bodies and geometric components.*

## The “Aha!” Moment: Why 75% Masking is the Magic Number

If you’re familiar with Natural Language Processing, you know about BERT. BERT learns by hiding about 15% of the words in a sentence and guessing the blanks.

When researchers first tried this with images, it failed miserably. Why? Because language is incredibly dense, while images are full of redundant space. If I hide a 16x16 pixel patch of a blue sky, it’s trivial for a CNN to look at the neighboring blue pixels and just blur them over the gap. The network learns how to interpolate colors, but it learns absolutely nothing about the *semantics* of the image.

The genius of MAE is the **75% masking ratio**.

By obliterating three-quarters of the image, we destroy all that local redundancy. The model is forced to look at scattered, isolated fragments of a dog’s ear, a paw, and a piece of a tail, and deduce: *“Ah, this is a 3D object of a dog sitting on grass.”* It forces the network to learn the *gestalt* — the global semantic structure of the world.

## Deconstructing the Architecture

To build this in PyTorch, I had to implement the core asymmetric encoder-decoder architecture. Here is how the data actually flows through the project.

![Architecture]()

### 1\. Patchify and Shuffle

First, the image is chopped into a grid of non-overlapping patches, exactly like a standard Vision Transformer (ViT). I flatten these patches and add positional embeddings so the model doesn’t lose spatial awareness. Then, I shuffle the list of tokens and just slice off the last 75%. No complex sparse matrix math — just a clean, efficient array truncation.

### 2\. The Heavyweight Encoder (The Speed Hack)

Here is where MAE earns its reputation for speed. The encoder (a standard ViT) *only* processes the 25% of patches that remain visible.

## Get Alp Demirel’s stories in your inbox

 from this writer.

Remember me for faster sign in

Because self-attention in transformers scales quadratically ($O(N²)$), dropping 75% of the tokens makes the encoder run roughly 3x to 4x faster and use a fraction of the memory. We don’t even feed “mask tokens” to the encoder. It just processes the visible fragments and compresses them into a dense, rich latent space.

### 3\. The Lightweight Decoder

Once the encoder does the heavy lifting, we need to rebuild the image. I take the encoded visible tokens, append a bunch of shared, learnable “mask tokens” (to represent the missing 75%), and un-shuffle them back into their original spatial order.

This full set goes into the decoder. The decoder’s only job is to translate those rich semantic features back into raw RGB pixel values. Because this is a much simpler task than understanding the image, the decoder can be incredibly shallow — often requiring less than 10% of the compute of the encoder.

### 4\. The Loss Function

The model outputs a prediction for every pixel. But we calculate the Mean Squared Error (MSE) loss *only* on the patches that were masked. There is no point in penalizing the model for patches it was already allowed to see.

## Why You Should Use This Setup

Building `Visual-Representation-Learning-MAE` taught me that you don't need a supercomputer to train a state-of-the-art vision model anymore.

![]()

> *MAE pre-training (blue) significantly outperforms baseline (orange).*

Because of the asymmetric design, you can pre-train massive architectures like ViT-Large or ViT-Huge on standard GPU setups in a fraction of the time it would take to run a contrastive learning pipeline. Once pre-training is done, you simply throw away the decoder. You are left with a powerhouse encoder that understands visual semantics so deeply it can achieve 87.8% accuracy when fine-tuned on ImageNet-1K.

![]()

> *MAE pre-trained model (left) forms dense, semantically meaningful clusters before fine-tuning. The baseline model (right) trained from scratch exhibits a scattered and brittle feature space.*

More importantly, these learned representations transfer beautifully to dense, complex downstream tasks like object detection and semantic segmentation. The model already knows how to reconstruct boundaries and edges from scratch, which gives it a massive head start.

## What’s Next?

If you are tired of wrangling data augmentations and want to experiment with generative self-supervised learning, I highly encourage you to clone the repo and play around with the masking ratios and decoder depths yourself.

**Check out the code here:((**[**https://github.com/Alpsource/Visual-Representation-Learning-MAE**](https://github.com/Alpsource/Visual-Representation-Learning-MAE)**))**

If you find the implementation useful, I’d really appreciate a ⭐️ on GitHub! It helps me know what kind of open-source projects the community actually wants to see.

Have you experimented with Masked Image Modeling yet? Drop a comment below or open an issue on the repo if you want to chat about the implementation details.