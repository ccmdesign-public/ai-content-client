---
metadata:
  videoId: "kCc8FmEb1nY"
  title: "Let's build GPT: from scratch, in code, spelled out."
  description: "We build a Generatively Pretrained Transformer (GPT), following the paper \"Attention is All You Need\" and OpenAI's GPT-2 / GPT-3. We talk about connections to ChatGPT, which has taken the world by storm. We watch GitHub Copilot, itself a GPT, help us write a GPT (meta :D!) . I recommend people watch the earlier makemore videos to get comfortable with the autoregressive language modeling framework and basics of tensors and PyTorch nn, which we take for granted in this video.


    Links:

    - Google colab for the video: https://colab.research.google.com/drive/1JMLa53HDuA-i7ZBmqV7ZnA3c_fvtXnx-?usp=sharing

    - GitHub repo for the video: https://github.com/karpathy/ng-video-lecture

    - Playlist of the whole Zero to Hero series so far: https://www.youtube.com/watch?v=VMj-3S1tku0&list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ

    - nanoGPT repo: https://github.com/karpathy/nanoGPT

    - my website: https://karpathy.ai

    - my twitter: https://twitter.com/karpathy

    - our Discord channel: https://discord.gg/3zy8kqD9Cp


    Supplementary links:

    - Attention is All You Need paper: https://arxiv.org/abs/1706.03762

    - OpenAI GPT-3 paper: https://arxiv.org/abs/2005.14165\ 

    - OpenAI ChatGPT blog post: https://openai.com/blog/chatgpt/

    - The GPU I'm training the model on is from Lambda GPU Cloud, I think the best and easiest way to spin up an on-demand GPU instance in the cloud that you can ssh to: https://lambdalabs.com . If you prefer to work in notebooks, I think the easiest path today is Google Colab.


    Suggested exercises:

    - EX1: The n-dimensional tensor mastery challenge: Combine the `Head` and `MultiHeadAttention` into one class that processes all the heads in parallel, treating the heads as another batch dimension (answer is in nanoGPT).

    - EX2: Train the GPT on your own dataset of choice! What other data could be fun to blabber on about? (A fun advanced suggestion if you like: train a GPT to do addition of two numbers, i.e. a+b=c. You may find it helpful to predict the digits of c in reverse order, as the typical addition algorithm (that you're hoping it learns) would proceed right to left too. You may want to modify the data loader to simply serve random problems and skip the generation of train.bin, val.bin. You may want to mask out the loss at the input positions of a+b that just specify the problem using y=-1 in the targets (see CrossEntropyLoss ignore_index). Does your Transformer learn to add? Once you have this, swole doge project: build a calculator clone in GPT, for all of +-*/. Not an easy problem. You may need Chain of Thought traces.)

    - EX3: Find a dataset that is very large, so large that you can't see a gap between train and val loss. Pretrain the transformer on this data, then initialize with that model and finetune it on tiny shakespeare with a smaller number of steps and lower learning rate. Can you obtain a lower validation loss by the use of pretraining?

    - EX4: Read some transformer papers and implement one additional feature or change that people seem to use. Does it improve the performance of your GPT?


    Chapters:

    00:00:00 intro: ChatGPT, Transformers, nanoGPT, Shakespeare

    baseline language modeling, code setup

    00:07:52 reading and exploring the data

    00:09:28 tokenization, train/val split

    00:14:27 data loader: batches of chunks of data

    00:22:11 simplest baseline: bigram language model, loss, generation

    00:34:53 training the bigram model

    00:38:00 port our code to a script

    Building the \"self-attention\"

    00:42:13 version 1: averaging past context with for loops, the weakest form of aggregation

    00:47:11 the trick in self-attention: matrix multiply as weighted aggregation

    00:51:54 version 2: using matrix multiply

    00:54:42 version 3: adding softmax

    00:58:26 minor code cleanup

    01:00:18 positional encoding

    01:02:00 THE CRUX OF THE VIDEO: version 4: self-attention

    01:11:38 note 1: attention as communication

    01:12:46 note 2: attention has no notion of space, operates over sets

    01:13:40 note 3: there is no communication across batch dimension

    01:14:14 note 4: encoder blocks vs. decoder blocks

    01:15:39 note 5: attention vs. self-attention vs. cross-attention

    01:16:56 note 6: \"scaled\" self-attention. why divide by sqrt(head_size)

    Building the Transformer

    01:19:11 inserting a single self-attention block to our network

    01:21:59 multi-headed self-attention

    01:24:25 feedforward layers of transformer block

    01:26:48 residual connections

    01:32:51 layernorm (and its relationship to our previous batchnorm)

    01:37:49 scaling up the model! creating a few variables. adding dropout

    Notes on Transformer

    01:42:39 encoder vs. decoder vs. both (?) Transformers

    01:46:22 super quick walkthrough of nanoGPT, batched multi-headed self-attention

    01:48:53 back to ChatGPT, GPT-3, pretraining vs. finetuning, RLHF

    01:54:32 conclusions


    Corrections:\ 

    00:57:00 Oops \"tokens from the _future_ cannot communicate\", not \"past\". Sorry! :)

    01:20:05 Oops I should be using the head_size for the normalization, not C"
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT1H56M20S"
  publishedAt: "2023-01-17T16:33:27Z"
  thumbnailUrl: "https://i.ytimg.com/vi/kCc8FmEb1nY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=kCc8FmEb1nY"
processedAt: "2026-03-24T01:59:08.170Z"
source: "youtube"
tldr: "Andrej Karpathy builds a GPT-like Transformer language model from scratch in PyTorch, training it on the tiny Shakespeare dataset to demonstrate the core architecture and training process behind systems like ChatGPT."
tools:
  - name: "PyTorch"
    url: null
  - name: "Google Colab"
    url: null
  - name: "Jupyter"
    url: null
  - name: "GitHub"
    url: null
  - name: "nanoGPT"
    url: null
  - name: "tiktoken"
    url: null
  - name: "SentencePiece"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "chatgpt"
  - "llm"
  - "machine-learning"
  - "model-training"
  - "nlp"
  - "python"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 68622
  outputTokens: 1785
  totalTokens: 70407
  processingTimeMs: 60775
tagsNormalizedAt: "2026-03-24T04:14:09.321Z"
---

## Key Takeaways

This video provides a comprehensive, hands-on guide to understanding and implementing the Transformer architecture that powers modern language models like GPT and ChatGPT.

*   **Transformers are built from self-attention blocks** that allow tokens to communicate via **queries, keys, and values**, enabling data-dependent information aggregation across a sequence.

*   **Multi-head attention** runs multiple independent self-attention channels in parallel, and **feed-forward networks** allow tokens to 'think' individually after gathering information.

*   **Residual connections and layer normalization** are critical for training stability in deep networks, creating a gradient superhighway and normalizing activations.

*   **The full training pipeline** involves data tokenization, batching with context windows, a cross-entropy loss objective, and an autoregressive sampling function for text generation.

*   **Real-world systems like ChatGPT** involve a massive **pre-training** stage on internet-scale data followed by complex **fine-tuning and alignment** stages (supervised fine-tuning, reward modeling, RLHF) to create a helpful assistant.

## Summary

### Introduction and Goal

Andrej Karpathy introduces the video by highlighting the remarkable capabilities of ChatGPT and similar large language models. He clarifies that the goal is not to reproduce a production system but to build a small-scale, educational version from scratch. The aim is to demystify the core neural network architecture—the Transformer—introduced in the landmark 2017 paper 'Attention Is All You Need.' He chooses to build a character-level language model trained on the 'tiny Shakespeare' dataset (about 1MB of text) to keep things simple and illustrative.

### Data Preparation and the Bigram Baseline

The first step is data preparation. Karpathy reads the Shakespeare text, creates a vocabulary of 65 unique characters, and implements a simple character-level tokenizer to convert text into integer sequences. He splits the data into training and validation sets. He then introduces the concept of batching, where random chunks of text (with a defined `block_size` or context length) are sampled to create input (`x`) and target (`y`) tensors for the model. Before building the Transformer, he implements a **Bigram language model** as a baseline. This simple model predicts the next character based only on the identity of the current character, using a single token embedding table. He demonstrates training this model and generating predictably poor, random text.

### The Mathematical Trick: Weighted Aggregations with Matrix Multiplication

Before diving into self-attention, Karpathy explains a crucial mathematical trick. The goal is for a token to aggregate information from all previous tokens in the sequence. A naive way is to average them. He shows how this averaging operation can be performed efficiently for all tokens simultaneously using a **batched matrix multiplication** with a lower-triangular matrix of weights. This sets the stage for understanding self-attention, where these weights are not uniform averages but are calculated in a data-dependent way.

### Implementing a Single Self-Attention Head

The core of the Transformer is the **self-attention mechanism**. Karpathy builds it step-by-step. Each token's embedding is used to produce three vectors via linear projections: a **query** (what the token is looking for), a **key** (what the token contains), and a **value** (what the token will communicate). The affinity or attention weight between tokens is calculated as the dot product of queries and keys. These raw affinities are then scaled (divided by the square root of the head dimension for stability), masked to prevent future tokens from communicating with the past (making it a decoder block), and passed through a softmax to create a normalized probability distribution. Finally, the output for each token is a weighted sum of all the value vectors, where the weights are these attention probabilities. This allows tokens to gather relevant information from anywhere in their past context.

### Building the Full Transformer Block

A single attention head is just one communication channel. **Multi-head attention** runs several of these heads in parallel (e.g., 4 heads each with a smaller dimension) and concatenates their outputs, allowing the model to gather different types of information simultaneously. After communication via attention, each token processes the gathered information independently using a **feed-forward network** (a small MLP applied per token). This creates a cycle of communication (attention) and computation (feed-forward).

To train deep networks effectively, Karpathy introduces two more critical components: **residual connections** (adding a block's input to its output) and **layer normalization** (normalizing the activations across the feature dimension for each token). Residual connections create a 'gradient superhighway,' ensuring stable gradient flow during backpropagation. These elements are combined into a **Transformer block**, and multiple such blocks are stacked to form the complete network.

### Training the Model and Scaling Up

With the full model defined, Karpathy trains it on the Shakespeare dataset. He starts with a small model and iteratively adds components (self-attention, multiple heads, feed-forward networks, residual connections, layer norm), observing the validation loss improve from ~2.5 (Bigram) down to ~2.1. He then demonstrates scaling up the model by increasing key hyperparameters: embedding dimension (`n_embed=384`), number of heads (`n_head=6`), number of layers (`n_layer=6`), and context length (`block_size=256`). He also adds **dropout** for regularization. Training this larger model yields a much lower validation loss of **1.48**, and the generated text begins to convincingly mimic Shakespearean English in structure and style, though it remains nonsensical.

### Connecting to Real-World Systems and Conclusion

Karpathy concludes by connecting the educational model to production systems. He explains that models like **GPT-3** use the same decoder-only Transformer architecture but are scaled up astronomically (billions of parameters, trained on trillions of tokens). He outlines the two-stage process for creating a system like **ChatGPT**: 1) **Pre-training** a large language model on internet text (what was demonstrated), and 2) **Fine-tuning & Alignment**, which involves supervised fine-tuning on question-answer pairs, training a reward model from human preferences, and using reinforcement learning (like PPO) to align the model's outputs with human values. He briefly walks through the `nanoGPT` codebase (available on his GitHub), which is a more feature-complete version of the code written in the video, capable of reproducing GPT-2.

The video provides a complete, from-scratch implementation of a GPT-like Transformer, making the once-daunting architecture accessible and understandable.

## Context

Andrej Karpathy is a renowned AI researcher, formerly Director of AI at Tesla and a key figure at OpenAI. He is famous for his clear, educational deep dives into neural networks and their implementations. This video contributes to the essential public understanding of the Transformer architecture, which has become the foundational building block for nearly all modern AI breakthroughs in language, vision, and beyond. Its relevance is paramount as LLMs like ChatGPT become culturally and economically significant, yet their internal workings remain opaque to most. This video is invaluable for software engineers, data scientists, students, and anyone with basic Python and math skills who wants to move beyond using AI APIs to genuinely understanding how they work under the hood.