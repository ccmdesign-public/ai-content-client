---
metadata:
  videoId: "VMj-3S1tku0"
  title: "The spelled-out intro to neural networks and backpropagation: building micrograd"
  description: "This is the most step-by-step spelled-out explanation of backpropagation and training of neural networks. It only assumes basic knowledge of Python and a vague recollection of calculus from high school.


    Links:

    - micrograd on github: https://github.com/karpathy/micrograd

    - jupyter notebooks I built in this video: https://github.com/karpathy/nn-zero-to-hero/tree/master/lectures/micrograd

    - my website: https://karpathy.ai

    - my twitter: https://twitter.com/karpathy

    - \"discussion forum\": nvm, use youtube comments below for now :)

    - (new) Neural Networks: Zero to Hero series Discord channel: https://discord.gg/3zy8kqD9Cp , for people who'd like to chat more and go beyond youtube comments


    Exercises:

    you should now be able to complete the following google collab, good luck!:

    https://colab.research.google.com/drive/1FPTx1RXtBfc4MaTkf7viZZD4U2F9gtKN?usp=sharing


    Chapters:

    00:00:00 intro

    00:00:25 micrograd overview

    00:08:08 derivative of a simple function with one input

    00:14:12 derivative of a function with multiple inputs

    00:19:09 starting the core Value object of micrograd and its visualization

    00:32:10 manual backpropagation example #1: simple expression

    00:51:10 preview of a single optimization step

    00:52:52 manual backpropagation example #2: a neuron

    01:09:02 implementing the backward function for each operation

    01:17:32 implementing the backward function for a whole expression graph

    01:22:28 fixing a backprop bug when one node is used multiple times

    01:27:05 breaking up a tanh, exercising with more operations

    01:39:31 doing the same thing but in PyTorch: comparison

    01:43:55 building out a neural net library (multi-layer perceptron) in micrograd

    01:51:04 creating a tiny dataset, writing the loss function

    01:57:56 collecting all of the parameters of the neural net

    02:01:12 doing gradient descent optimization manually, training the network

    02:14:03 summary of what we learned, how to go towards modern neural nets

    02:16:46 walkthrough of the full code of micrograd on github

    02:21:10 real stuff: diving into PyTorch, finding their backward pass for tanh

    02:24:39 conclusion

    02:25:20 outtakes :)"
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT2H25M52S"
  publishedAt: "2022-08-16T22:44:26Z"
  thumbnailUrl: "https://i.ytimg.com/vi/VMj-3S1tku0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=VMj-3S1tku0"
processedAt: "2026-03-24T02:25:58.727Z"
source: "youtube"
tldr: "Andrej Karpathy builds a tiny autograd engine called Micrograd from scratch in Python, explaining how neural networks work under the hood by implementing backpropagation, chain rule, and training a small neural net, showing that the core of deep learning is just 100-150 lines of code."
tools:
  - name: "Micrograd"
    url: "https://github.com/karpathy/micrograd"
  - name: "PyTorch"
    url: null
  - name: "Jupyter"
    url: null
  - name: "NumPy"
    url: null
  - name: "Matplotlib"
    url: null
  - name: "Graphviz"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "education"
  - "machine-learning"
  - "model-training"
  - "python"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 78007
  outputTokens: 2285
  totalTokens: 80292
  processingTimeMs: 502337
tagsNormalizedAt: "2026-03-24T04:09:36.353Z"
---

## Key Takeaways

This lecture deconstructs neural network training by building a minimal autograd engine, revealing that backpropagation and gradient descent are fundamentally simple concepts implemented through mathematical expressions and the chain rule.

*   **Backpropagation is just the chain rule applied recursively** through a computational graph, where each operation (addition, multiplication, tanh) knows its local derivative and propagates gradients backward.

*   **The core of a neural network library is surprisingly small**; Micrograd's autograd engine is about 100 lines of code, and a neural network module (neuron, layer, MLP) built on top is about 50 lines.

*   **Training involves constructing a mathematical expression (the loss function)** that measures network performance, calculating its gradient with respect to all parameters via backpropagation, and iteratively nudging parameters in the negative gradient direction (gradient descent).

*   **Operations can be defined at any level of abstraction** (e.g., a single `tanh` function or its decomposed exponential form) as long as you can compute the forward pass and the local derivative for backpropagation.

*   **A critical bug in training is forgetting to zero gradients** before each backward pass, as gradients accumulate with `+=`, which can destabilize optimization in more complex problems.

*   **Modern frameworks like PyTorch scale the same principles** using tensors for efficiency but operate on identical mathematical foundations; understanding Micrograd provides deep intuition for how they work.

## Summary

### Introduction and Motivation

Andrej Karpathy introduces the goal: to demystify neural network training by building everything from scratch in a Jupyter notebook. He presents Micrograd, a tiny scalar-valued autograd engine he created for pedagogical purposes. The key insight is that backpropagation—the algorithm at the heart of training—is simply the efficient evaluation of gradients via the chain rule through a computational graph. While production libraries use tensors for parallel efficiency, the underlying math is identical, and working with scalars makes the core concepts crystal clear. The claim is that Micrograd, at about 100 lines of code for the engine and 50 for the neural net library, contains all the fundamental concepts needed for training, with everything else being optimization.

### Building Intuition for Derivatives and the Value Object

The tutorial begins by building intuitive understanding. Karpathy reviews the definition of a derivative as a limit and shows how to approximate it numerically for a simple function. He then manually calculates gradients for a slightly more complex expression with multiple inputs (a, b, c) to show how each input's derivative indicates its influence on the output.

The first data structure, the `Value` object, is introduced to wrap scalar numbers and build expression graphs. It stores the data (`data`), its gradient (`grad`), the operation that created it (`_op`), and pointers to its child `Value` objects (`_prev`). Basic operations like addition (`__add__`) and multiplication (`__mul__`) are implemented, which create new `Value` nodes and store the operation and children. A visualization function using Graphviz is provided to draw these expression graphs, showing how mathematical expressions are built as directed acyclic graphs (DAGs).

### Manual Backpropagation and the Chain Rule

With a multi-layer expression graph built (e.g., `L = d

* f`, where `d = (a*b) + c`), Karpathy manually performs backpropagation to fill in the `grad` for every node. This is the core teaching moment. He starts at the output `L`, where `L.grad = 1.0`. He then works backward:

*   For `L = d

* f`, the local derivatives are `dL/dd = f.data` and `dL/df = d.data`.

*   The chain rule is then applied at each node. For a plus node like `d = c + e`, the local derivative for each child is 1.0, so the gradient is simply routed: `c.grad += d.grad

* 1.0` and `e.grad += d.grad

* 1.0`.

*   For a times node like `e = a

* b`, the local derivatives are `de/da = b.data` and `de/db = a.data`. The chain rule gives `a.grad += e.grad

* b.data` and `b.grad += e.grad

* a.data`.

This process is repeated recursively. The key realization is that **backpropagation is just a recursive application of the chain rule**, where each node takes the gradient flowing into it from its parent and multiplies it by the local derivative with respect to each of its children, accumulating the result into the children's gradients. An important nuance is that gradients *accumulate* (`+=`) if a `Value` is used multiple times in the graph.

### Automating Backpropagation and Implementing More Operations

The manual process is then automated within the `Value` class. Each operation (`__add__`, `__mul__`, etc.) now defines a closure (a `_backward` function) that encodes its chain rule logic. A `backward()` method on the `Value` class orchestrates the process: it performs a topological sort of the graph to get the correct node order, sets the output gradient to 1.0, and then calls each node's `_backward()` function in reverse order.

To build more complex functions like a neuron, more operations are needed. Karpathy implements:

*   `tanh` as a single operation, with its derivative `1 - output**2`.

*   `exp` for exponentiation, with its derivative `output.data`.

*   Division and subtraction, implemented in terms of multiplication with negative powers and addition with negation.

*   A power operation (`__pow__`) for raising to a constant.

He then demonstrates that the `tanh` function can be broken down into its constituent `exp`, addition, and division operations, and the gradients computed automatically by Micrograd match both the manual calculation and the monolithic `tanh` implementation, proving the flexibility of the engine.

### Building and Training a Neural Network

The final third of the lecture uses the `Value` engine to build neural network components in a PyTorch-like API.

*   A `Neuron` takes `n_inputs`, initializes random weights and a bias (all as `Value` objects), and its forward pass computes `tanh(sum(w_i

* x_i) + b)`.

*   A `Layer` is a list of `Neuron`s that process the same input independently.

*   An `MLP` (Multi-Layer Perceptron) is a list of `Layer`s, where the output of one layer is the input to the next.

A simple training example is created: a small dataset of four 2D points with binary labels (`1.0` or `-1.0`). The process is outlined:
1.  **Forward Pass:** Pass all data through the MLP to get predictions.
2.  **Loss Calculation:** Use a Mean Squared Error (MSE) loss: `sum((prediction

- target)**2)`. This is a single `Value` scalar.
3.  **Backward Pass:** Call `loss.backward()` to compute gradients for every parameter (weights and biases) in the network.
4.  **Gradient Descent Update:** For each parameter `p`, update its data: `p.data += -learning_rate

* p.grad`. The negative sign is crucial because the gradient points towards *increasing* loss, and we want to decrease it.
5.  **Zero Gradients:** A critical step! Before the next backward pass, all parameter gradients must be set to `0.0` to prevent accumulation from previous steps.

Iterating this loop (forward, backward, update) causes the loss to decrease and the predictions to match the targets, successfully training the network. Karpathy highlights a common bug—forgetting to zero gradients—and shows how it can sometimes work on simple problems but fails on more complex ones.

### Conclusion and Connection to Real Libraries

The lecture concludes by walking through the actual Micrograd source code on GitHub, showing its two files (`engine.py` and `nn.py`) and how they match what was built. Karpathy connects it to PyTorch, showing equivalent code and verifying that the gradients match. He emphasizes that while PyTorch is vastly more complex for performance (CPU/GPU kernels, tensor operations, data types), the fundamental algorithm—building a graph, propagating gradients via chain rule, and doing gradient descent—is exactly the same. Understanding Micrograd provides a foundational, intuitive grasp of what powers all modern deep learning frameworks.

## Context

Andrej Karpathy is a leading AI researcher, formerly Director of AI at Tesla and a founding member of OpenAI, with over a decade of experience training deep neural networks. This lecture is part of his effort to make the fundamentals of deep learning accessible and demystify the 'black box' perception of neural networks. It contributes to the broader educational movement of understanding AI from first principles, stripping away the complexity of large frameworks to reveal the elegant, simple mathematics at the core. This is highly relevant as AI becomes more pervasive, yet the underlying mechanisms remain opaque to many developers and enthusiasts. The video is essential for students, software engineers, and anyone interested in AI who wants to move beyond using libraries as black boxes and truly understand how neural networks learn. It bridges the gap between high-level API usage and low-level mathematical implementation.