---
metadata:
  videoId: "TCH_1BHY58I"
  title: "Building makemore Part 2: MLP"
  description: "We implement a multilayer perceptron (MLP) character-level language model. In this video we also introduce many basics of machine learning (e.g. model training, learning rate tuning, hyperparameters, evaluation, train/dev/test splits, under/overfitting, etc.).


    Links:

    - makemore on github: https://github.com/karpathy/makemore

    - jupyter notebook I built in this video: https://github.com/karpathy/nn-zero-to-hero/blob/master/lectures/makemore/makemore_part2_mlp.ipynb

    - collab notebook (new)!!!: https://colab.research.google.com/drive/1YIfmkftLrz6MPTOO9Vwqrop2Q5llHIGK?usp=sharing

    - Bengio et al. 2003 MLP language model paper (pdf): https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf

    - my website: https://karpathy.ai

    - my twitter: https://twitter.com/karpathy

    - (new) Neural Networks: Zero to Hero series Discord channel: https://discord.gg/3zy8kqD9Cp , for people who'd like to chat more and go beyond youtube comments


    Useful links:

    - PyTorch internals ref http://blog.ezyang.com/2019/05/pytorch-internals/


    Exercises:

    - E01: Tune the hyperparameters of the training to beat my best validation loss of 2.2

    - E02: I was not careful with the intialization of the network in this video. (1) What is the loss you'd get if the predicted probabilities at initialization were perfectly uniform? What loss do we achieve? (2) Can you tune the initialization to get a starting loss that is much more similar to (1)?

    - E03: Read the Bengio et al 2003 paper (link above), implement and try any idea from the paper. Did it work?


    Chapters:

    00:00:00 intro

    00:01:48 Bengio et al. 2003 (MLP language model) paper walkthrough

    00:09:03 (re-)building our training dataset

    00:12:19 implementing the embedding lookup table

    00:18:35 implementing the hidden layer + internals of torch.Tensor: storage, views

    00:29:15 implementing the output layer

    00:29:53 implementing the negative log likelihood loss

    00:32:17 summary of the full network

    00:32:49 introducing F.cross_entropy and why

    00:37:56 implementing the training loop, overfitting one batch

    00:41:25 training on the full dataset, minibatches

    00:45:40 finding a good initial learning rate

    00:53:20 splitting up the dataset into train/val/test splits and why

    01:00:49 experiment: larger hidden layer

    01:05:27 visualizing the character embeddings

    01:07:16 experiment: larger embedding size

    01:11:46 summary of our final code, conclusion

    01:13:24 sampling from the model

    01:14:55 google collab (new!!) notebook advertisement"
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT1H15M40S"
  publishedAt: "2022-09-12T14:43:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/TCH_1BHY58I/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=TCH_1BHY58I"
processedAt: "2026-03-24T02:12:48.692Z"
source: "youtube"
tldr: "Andrej Karpathy implements a multi-layer perceptron (MLP) character-level language model to overcome the limitations of bigram models, demonstrating how neural networks with embeddings and hidden layers can capture longer context dependencies and generalize better for next-character prediction."
tools:
  - name: "PyTorch"
    url: null
  - name: "Matplotlib"
    url: null
  - name: "Jupyter Notebook"
    url: null
  - name: "Google Colab"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "ai-general"
  - "embeddings"
  - "machine-learning"
  - "model-training"
  - "nlp"
  - "performance"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 41665
  outputTokens: 1376
  totalTokens: 43041
  processingTimeMs: 47713
tagsNormalizedAt: "2026-03-24T04:14:16.037Z"
---

## Key Takeaways

This lecture builds a neural language model from scratch, moving beyond simple bigram statistics to a more powerful architecture that learns distributed representations of characters. The key insights include the power of embeddings for generalization, practical PyTorch implementation techniques, and the importance of proper training methodology.

## Summary

### Introduction and Motivation

Karpathy begins by reviewing the limitations of the bigram language model implemented in the previous lecture. While simple and approachable, bigram models only consider a single previous character, resulting in poor predictions that don't produce name-like sounding outputs. The fundamental problem is that expanding context length in statistical models leads to exponential growth in parameter space

- going from 1 to 3 characters of context increases possible contexts from 27 to 20,000, making the approach infeasible due to data sparsity.

### The Bengio et al. 2003 Paper and Neural Network Approach

The solution comes from the influential 2003 paper by Bengio et al., which proposed using neural networks for language modeling. Instead of treating words (or characters) as discrete symbols, the paper introduced the concept of embedding vectors

- continuous representations where similar items have similar vectors. This allows for knowledge transfer: even if the exact phrase 'a dog was running in a' never appeared in training, the model can generalize from similar phrases like 'the dog was running in a' because 'a' and 'the' would have similar embeddings.

Karpathy explains the architecture: characters are first converted to integer indices, then embedded into continuous vectors via a lookup table C. For three-character context, these three embedding vectors are concatenated and fed through a hidden layer with tanh activation, then through an output layer producing logits for all possible next characters, followed by softmax normalization.

### Implementation in PyTorch

The implementation begins with dataset preparation, creating input-output pairs where the input is a sequence of characters and the output is the next character. Karpathy demonstrates PyTorch's powerful indexing capabilities for efficient embedding lookup, showing how `C[X]` can embed entire batches of integers simultaneously. He then constructs the neural network layers: embedding matrix C, hidden layer weights W1 and bias b1, and output layer weights W2 and bias b2.

Important PyTorch techniques are covered, including using `.view()` for efficient tensor reshaping instead of concatenation, and leveraging built-in functions like `F.cross_entropy()` which is more numerically stable and efficient than manually implementing softmax and log operations. Karpathy explains why cross-entropy is preferred: it uses fused kernels for efficiency, has simpler mathematical derivatives, and handles numerical stability by internally subtracting the maximum logit value to prevent overflow.

### Training Methodology and Optimization

Karpathy demonstrates the training loop with gradient descent, emphasizing mini-batch training for efficiency. He shows how to determine an appropriate learning rate using a learning rate finder approach: training with exponentially increasing learning rates from 0.001 to 1.0 over 1000 steps, then plotting loss against learning rate to find the 'sweet spot' where loss decreases rapidly without exploding. The optimal learning rate found was 0.1.

He introduces the standard practice of splitting data into training (80%), validation/dev (10%), and test (10%) sets. The training set optimizes parameters, the validation set tunes hyperparameters (like hidden layer size, embedding dimension, learning rate schedule), and the test set provides a final, unbiased evaluation. Karpathy emphasizes that test loss should only be evaluated sparingly to avoid overfitting to the test set.

### Model Scaling and Analysis

Starting with a small model (2D embeddings, 100 hidden neurons, 3,400 parameters), Karpathy shows how increasing model capacity improves performance. Scaling to 10D embeddings and 200 hidden neurons (11,000 parameters) reduces loss from ~2.45 (bigram baseline) to 2.17 on the validation set. He visualizes the learned 2D character embeddings, revealing interesting structure: vowels cluster together, the dot character (padding) separates distinctly, and 'q' appears as an outlier

- showing the network learns meaningful relationships between characters.

Karpathy discusses the underfitting/overfitting dynamic: when training and validation losses are roughly equal, the model is underfitting and can benefit from increased capacity. As they diverge, overfitting begins, suggesting the need for regularization or stopping training.

### Sampling and Practical Deployment

The lecture concludes with sampling from the trained model. Starting with a context of dots, the model generates characters probabilistically using `torch.multinomial()` on the output probabilities. The results show significant improvement over bigram models, producing more name-like outputs such as 'ham' and 'joes'. Karpathy mentions making the code accessible via Google Colab, allowing viewers to experiment without local installation.

He leaves as an exercise for viewers to beat the achieved 2.17 validation loss by tuning hyperparameters: changing hidden layer size, embedding dimensionality, context length, optimization details (learning rate schedule, batch size), and implementing improvements from the Bengio paper.

## Context

Andrej Karpathy is a leading AI researcher and educator, formerly Director of AI at Tesla and currently at OpenAI. This lecture is part of his 'makemore' series, which builds increasingly sophisticated language models from scratch. The series contributes to the broader conversation about making AI/ML education accessible and intuitive, showing how modern neural architectures emerge naturally from solving practical limitations of simpler models. This is particularly relevant as language models have become central to AI progress. The video benefits anyone wanting to understand the foundations of neural language models, from students to practitioners looking to deepen their PyTorch skills and model intuition.