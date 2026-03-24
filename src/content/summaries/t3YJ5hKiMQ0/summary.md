---
metadata:
  videoId: "t3YJ5hKiMQ0"
  title: "Building makemore Part 5: Building a WaveNet"
  description: "We take the 2-layer MLP from previous video and make it deeper with a tree-like structure, arriving at a convolutional neural network architecture similar to the WaveNet (2016) from DeepMind. In the WaveNet paper, the same hierarchical architecture is implemented more efficiently using causal dilated convolutions (not yet covered). Along the way we get a better sense of torch.nn and what it is and how it works under the hood, and what a typical deep learning development process looks like (a lot of reading of documentation, keeping track of multidimensional tensor shapes, moving between jupyter notebooks and repository code, ...).


    Links:

    - makemore on github: https://github.com/karpathy/makemore

    - jupyter notebook I built in this video: https://github.com/karpathy/nn-zero-to-hero/blob/master/lectures/makemore/makemore_part5_cnn1.ipynb

    - collab notebook: https://colab.research.google.com/drive/1CXVEmCO_7r7WYZGb5qnjfyxTvQa13g5X?usp=sharing

    - my website: https://karpathy.ai

    - my twitter: https://twitter.com/karpathy

    - our Discord channel: https://discord.gg/3zy8kqD9Cp


    Supplementary links:

    - WaveNet 2016 from DeepMind https://arxiv.org/abs/1609.03499

    - Bengio et al. 2003 MLP LM https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf\ 


    Chapters:

    intro

    00:00:00 intro

    00:01:40 starter code walkthrough

    00:06:56 let’s fix the learning rate plot

    00:09:16 pytorchifying our code: layers, containers, torch.nn, fun bugs

    implementing wavenet

    00:17:11 overview: WaveNet

    00:19:33 dataset bump the context size to 8

    00:19:55 re-running baseline code on block_size 8

    00:21:36 implementing WaveNet

    00:37:41 training the WaveNet: first pass

    00:38:50 fixing batchnorm1d bug

    00:45:21 re-training WaveNet with bug fix

    00:46:07 scaling up our WaveNet

    conclusions

    00:46:58 experimental harness

    00:47:44 WaveNet but with “dilated causal convolutions”

    00:51:34 torch.nn

    00:52:28 the development process of building deep neural nets

    00:54:17 going forward

    00:55:26 improve on my loss! how far can we improve a WaveNet on this data?"
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT56M22S"
  publishedAt: "2022-11-21T00:32:48Z"
  thumbnailUrl: "https://i.ytimg.com/vi/t3YJ5hKiMQ0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=t3YJ5hKiMQ0"
processedAt: "2026-03-24T02:03:38.001Z"
source: "youtube"
tldr: "Andrej Karpathy builds a hierarchical character-level language model from scratch, evolving a simple MLP into a WaveNet-like architecture with progressive information fusion, while implementing PyTorch-style modules and debugging batch normalization for multi-dimensional inputs."
tools:
  - name: "PyTorch"
    url: null
  - name: "torch.nn"
    url: null
  - name: "Jupyter Notebook"
    url: null
  - name: "VS Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-general"
  - "debugging"
  - "machine-learning"
  - "model-training"
  - "nlp"
  - "python"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 34304
  outputTokens: 1715
  totalTokens: 36019
  processingTimeMs: 236711
tagsNormalizedAt: "2026-03-24T04:11:33.581Z"
---

## Key Takeaways

This video demonstrates the practical development of a deep neural network for character-level language modeling, transitioning from a simple architecture to a hierarchical one inspired by WaveNet.

*   **Architectural Evolution:** The core progression is from a simple **multi-layer perceptron (MLP)** that crushes all input characters at once to a **hierarchical tree-like structure** that fuses information progressively (e.g., pairs of characters, then pairs of those representations).

*   **Module-Based Design:** The implementation emphasizes building a library of reusable **PyTorch-style modules** (like `Linear`, `BatchNorm1D`, `Embedding`, `FlattenConsecutive`, and `Sequential`) to compose neural networks like Lego bricks.

*   **Practical Debugging & Shape Management:** A significant portion of development involves **debugging tensor shapes** and fixing a critical bug in the custom `BatchNorm1D` layer to correctly handle multi-dimensional inputs by reducing over the appropriate batch dimensions.

*   **Performance & Experimentation:** Increasing context length and model size improves validation loss, but the hierarchical architecture shows only slight gains without extensive hyperparameter tuning, highlighting the need for a proper **experimental harness**.

*   **Connection to Convolutions:** The implemented hierarchical structure is functionally equivalent to a **dilated causal convolutional network** (like WaveNet), where convolutions would provide computational efficiency through weight sharing and sliding window computations.

## Summary

### Introduction and Project Setup

Andrej Karpathy continues the *makemore* series, focusing on building a character-level language model. He starts from the codebase of part three, which features a simple MLP that takes three previous characters to predict the next one. The goal for this lecture is to 'complexify' this architecture: to take in more context (increasing block size from 3 to 8) and to avoid squashing all that information in a single layer. Instead, he aims to build a deeper model that fuses information progressively, leading naturally to an architecture reminiscent of **WaveNet**, the 2016 model for audio generation.

### Refactoring and PyTorch-ifying the Code

The first major section involves cleaning up and modularizing the existing code. Karpathy starts by fixing a noisy loss plot by averaging loss values over chunks of 1000 iterations. He then refactors the forward pass by creating new module classes: an `Embedding` layer (to look up vector representations for character integers) and a `Flatten` layer (to concatenate embeddings). These replace special-case code, simplifying the model's forward pass.

He takes this further by implementing a `Sequential` container module, which holds a list of layers and passes data through them sequentially. This allows the entire model to be defined as a `Sequential` block, making the code cleaner and more aligned with PyTorch conventions. The parameters are now accessed via `model.parameters()`, and the forward pass becomes a simple `logits = model(xb)`.

### Implementing the Hierarchical (WaveNet-like) Architecture

With a modular codebase, Karpathy pivots to the main architectural change. The simple 'flat' model concatenates all eight character embeddings into an 80-dimensional vector for the first linear layer. The new hierarchical approach aims to fuse characters in pairs.

He demonstrates that PyTorch's matrix multiplication can work with multi-dimensional tensors, treating all but the last dimension as batch dimensions. This allows him to restructure the 4x8x10 tensor (batch, time, channels) after embedding into a 4x4x20 tensor, where the last dimension holds concatenated pairs of 10D character vectors, and the new middle dimension represents the four independent pairs.

To achieve this, he creates a new `FlattenConsecutive` module that takes a parameter `n` (e.g., 2) and reshapes the input to group `n` consecutive elements along the channel dimension. The first linear layer now operates on 20 inputs (2*10) instead of 80, processing each pair independently but in parallel across the batch and the new 'pair' dimension.

### Debugging Batch Normalization for Multi-Dimensional Inputs

A critical bug emerges when running the new hierarchical model. The custom `BatchNorm1D` layer, written for 2D inputs (batch, features), now receives 3D inputs (batch, pairs, features). It was incorrectly computing mean and variance only over the zeroth dimension, leading to separate statistics for each 'pair' position instead of shared statistics per feature channel across all pairs and batch elements.

Karpathy debugs this by inspecting tensor shapes and the running mean/variance within the BatchNorm layer. The fix involves making the layer aware of input dimensionality: for 2D inputs, reduce over dimension 0; for 3D inputs, reduce over dimensions (0, 1). This ensures the layer maintains a single mean and variance per feature channel, estimated from all data in the combined batch and pair dimensions, making the estimates more stable. Fixing this bug provides a slight performance improvement.

### Results, Observations, and Future Directions

Training the new hierarchical model with a comparable number of parameters shows validation loss similar to the flat baseline. After fixing BatchNorm and scaling up the model (increasing embedding dimensions and hidden units), the validation loss improves from ~2.1 to below 2.0 (specifically 1.993).

Karpathy concludes by contextualizing the work. He notes that the implemented tree structure is computationally equivalent to a **dilated causal convolutional network**; convolutions would be an efficiency optimization, allowing the 'sliding' of filters over the input sequence to compute all outputs simultaneously, reusing intermediate computations.

He reflects on the development process: heavy reliance on (often lacking) PyTorch documentation, extensive shape debugging in Jupyter notebooks, and the absence of a systematic experimental harness for hyperparameter tuning. He outlines potential future topics: implementing actual convolutions, adding residual/skip connections, building an experiment management system, and exploring RNNs and Transformers.

Finally, he challenges viewers to try and beat the 1.993 validation loss by tuning the hierarchical architecture, exploring different channel allocations, or even seeing if a sufficiently large flat MLP could outperform it.

## Context

Andrej Karpathy is a renowned AI researcher, formerly Director of AI at Tesla and a founding member of OpenAI. This video is part of his 'makemore' series, a hands-on educational project where he builds a character-level language model from scratch. The series is famous for its 'from first principles' approach, teaching the internals of neural networks and deep learning frameworks. This installment contributes to the broader conversation about efficient neural network architectures for sequence modeling, directly connecting classic models like WaveNet to modern deep learning practice. It's highly relevant for anyone wanting to understand how to structure and implement complex neural networks, debug low-level tensor operations, and think about the design choices behind influential papers. The video is most beneficial for intermediate practitioners and students who are comfortable with basic neural networks and Python and want to deepen their understanding of model architecture, module design, and practical debugging.