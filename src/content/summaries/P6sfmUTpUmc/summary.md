---
metadata:
  videoId: "P6sfmUTpUmc"
  title: "Building makemore Part 3: Activations & Gradients, BatchNorm"
  description: "We dive into some of the internals of MLPs with multiple layers and scrutinize the statistics of the forward pass activations, backward pass gradients, and some of the pitfalls when they are improperly scaled. We also look at the typical diagnostic tools and visualizations you'd want to use to understand the health of your deep network. We learn why training deep neural nets can be fragile and introduce the first modern innovation that made doing so much easier: Batch Normalization. Residual connections and the Adam optimizer remain notable todos for later video.


    Links:

    - makemore on github: https://github.com/karpathy/makemore

    - jupyter notebook I built in this video: https://github.com/karpathy/nn-zero-to-hero/blob/master/lectures/makemore/makemore_part3_bn.ipynb

    - collab notebook: https://colab.research.google.com/drive/1H5CSy-OnisagUgDUXhHwo1ng2pjKHYSN?usp=sharing

    - my website: https://karpathy.ai

    - my twitter: https://twitter.com/karpathy

    - Discord channel: https://discord.gg/3zy8kqD9Cp


    Useful links:

    - \"Kaiming init\" paper: https://arxiv.org/abs/1502.01852

    - BatchNorm paper: https://arxiv.org/abs/1502.03167

    - Bengio et al. 2003 MLP language model paper (pdf): https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf

    - Good paper illustrating some of the problems with batchnorm in practice: https://arxiv.org/abs/2105.07576


    Exercises:

    - E01: I did not get around to seeing what happens when you initialize all weights and biases to zero. Try this and train the neural net. You might think either that 1) the network trains just fine or 2) the network doesn't train at all, but actually it is 3) the network trains but only partially, and achieves a pretty bad final performance. Inspect the gradients and activations to figure out what is happening and why the network is only partially training, and what part is being trained exactly.

    - E02: BatchNorm, unlike other normalization layers like LayerNorm/GroupNorm etc. has the big advantage that after training, the batchnorm gamma/beta can be \"folded into\" the weights of the preceeding Linear layers, effectively erasing the need to forward it at test time. Set up a small 3-layer MLP with batchnorms, train the network, then \"fold\" the batchnorm gamma/beta into the preceeding Linear layer's W,b by creating a new W2, b2 and erasing the batch norm. Verify that this gives the same forward pass during inference. i.e. we see that the batchnorm is there just for stabilizing the training, and can be thrown out after training is done! pretty cool.


    Chapters:

    00:00:00 intro

    00:01:22 starter code

    00:04:19 fixing the initial loss\ 

    00:12:59 fixing the saturated tanh

    00:27:53 calculating the init scale: “Kaiming init”

    00:40:40 batch normalization

    01:03:07 batch normalization: summary

    01:04:50 real example: resnet50 walkthrough

    01:14:10 summary of the lecture

    01:18:35 just kidding: part2: PyTorch-ifying the code

    01:26:51 viz #1: forward pass activations statistics

    01:30:54 viz #2: backward pass gradient statistics

    01:32:07 the fully linear case of no non-linearities

    01:36:15 viz #3: parameter activation and gradient statistics

    01:39:55 viz #4: update:data ratio over time

    01:46:04 bringing back batchnorm, looking at the visualizations

    01:51:34 summary of the lecture for real this time"
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT1H55M58S"
  publishedAt: "2022-10-04T16:41:03Z"
  thumbnailUrl: "https://i.ytimg.com/vi/P6sfmUTpUmc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=P6sfmUTpUmc"
processedAt: "2026-03-24T02:11:27.472Z"
source: "youtube"
tldr: "This lecture focuses on diagnosing and fixing neural network training issues by analyzing activation and gradient distributions, then introduces batch normalization as a modern solution to stabilize deep network training by controlling activation statistics throughout the network."
tools:
  - name: "PyTorch"
    url: null
  - name: "torch.nn"
    url: null
  - name: "torch.nn.Linear"
    url: null
  - name: "torch.nn.BatchNorm1d"
    url: null
  - name: "torch.nn.init"
    url: null
  - name: "torch.nn.init.kaiming_normal_"
    url: null
  - name: "matplotlib"
    url: null
  - name: "torch.no_grad"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-general"
  - "debugging"
  - "engineering"
  - "machine-learning"
  - "model-training"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 70072
  outputTokens: 1413
  totalTokens: 71485
  processingTimeMs: 217673
tagsNormalizedAt: "2026-03-24T04:13:57.965Z"
---

## Key Takeaways

This lecture teaches how to diagnose neural network training problems and introduces modern stabilization techniques.

* **Proper initialization is critical** - Neural networks should start with uniform logits and activations in reasonable ranges to avoid wasteful early training.

* **Monitor activation/gradient statistics** - Use histograms to check for saturation (e.g., tanh outputs near ±1) and ensure gradients flow evenly through all layers.

* **Use principled initialization** - Scale weights by `gain / sqrt(fan_in)` with gains like 5/3 for tanh to maintain unit Gaussian activations throughout the network.

* **Batch normalization stabilizes deep nets** - Normalizes activations to unit Gaussian, adds learnable scale/shift parameters, and uses running statistics for inference.

* **Visual diagnostics are essential** - Plot activation distributions, gradient statistics, and update-to-data ratios to identify training issues.

* **Modern layers reduce fragility** - Batch normalization makes networks more robust to initialization choices and enables training of much deeper architectures.

## Summary

### Introduction to Training Diagnostics

Andrej Karpathy begins by examining issues with their existing multilayer perceptron for character-level language modeling. He shows that at initialization, the network produces extremely high loss (27 vs expected ~3.29) because the logits are too extreme, making the softmax confidently wrong about character predictions. This creates a "hockey stick" loss curve where early training merely squashes weights rather than learning useful patterns. The solution is to initialize the output layer with small weights (multiplying by 0.01) to produce more uniform probabilities at startup.

### Hidden Layer Activation Problems

Even with fixed output initialization, the hidden layer activations show serious issues. The tanh activations are heavily saturated near ±1, which kills gradients during backpropagation since tanh's gradient is `1 - t²`. When activations are near ±1, this gradient approaches zero, preventing learning. Karpathy visualizes this with histograms showing most activations in the saturated tails. The solution is to scale down the weights feeding into the tanh layer by approximately 0.2, bringing activations into the more linear region where gradients can flow.

### Principled Weight Initialization

Manually tuning weight scales is impractical for deep networks. Karpathy introduces the mathematical principle: for a linear layer `y = xW`, if `x` has unit Gaussian distribution, then `y` will have standard deviation `sqrt(fan_in)` when `W` has unit Gaussian. To maintain unit Gaussian outputs, weights should be scaled by `1/sqrt(fan_in)`. For nonlinearities like tanh that contract the distribution, a gain factor is needed

- 5/3 for tanh, √2 for ReLU. This **Kaiming initialization** (from the "Delving Deep into Rectifiers" paper) ensures activations remain roughly Gaussian throughout the network.

### Introduction to Batch Normalization

The core innovation of batch normalization is to explicitly normalize activations to unit Gaussian distribution after each linear layer. The operation is differentiable: calculate mean and variance across the batch, normalize, then apply learnable scale (gamma) and shift (beta) parameters. At initialization, gamma=1 and beta=0 give exactly unit Gaussian outputs regardless of preceding layer statistics. During training, batch statistics are used; during inference, running averages of mean/variance are used. This coupling of examples acts as a regularizer by adding noise through batch statistics.

### Implementation Details and Trade-offs

Batch normalization requires careful handling: biases before normalization become useless (subtracted out), so linear layers should use `bias=False`. The layer maintains running statistics updated via exponential moving average (momentum ~0.1). An epsilon term prevents division by zero. Karpathy shows how to "torchify" code by creating Linear, BatchNorm1D, and Tanh modules that mimic PyTorch's API, enabling easy stacking into deep networks. The update-to-data ratio (learning_rate

* gradient_std / weight_std) should be around 10⁻³ for stable training.

### Diagnostic Tools and Visualization

Karpathy demonstrates comprehensive diagnostics: plotting activation histograms per layer, gradient distributions, weight statistics, and update ratios over time. These reveal problems like asymmetric gradient flow (last layer updates 10× faster) or saturation. With proper initialization, all layers show similar statistics; with batch normalization, statistics remain excellent even with poor weight scaling. The visual tools help tune learning rates and identify when networks are training too fast/slow.

### Historical Context and Modern Practice

Before batch normalization (2015), training deep networks required meticulous balancing of initialization gains. Modern innovations like residual connections, better optimizers (Adam), and normalization layers have made training more robust. While batch normalization works well, its batch-coupling causes issues; alternatives like layer normalization and group normalization avoid this but may lack the same regularizing effect. The lecture concludes by showing how to integrate these layers into modular neural networks following PyTorch conventions.

## Context

Andrej Karpathy is a leading AI researcher and educator, formerly Director of AI at Tesla and currently at OpenAI. This lecture is part of his "makemore" series building neural networks from scratch for character-level language modeling. The video addresses fundamental challenges in training deep neural networks that were major research problems before modern innovations like batch normalization. This content is crucial for anyone moving beyond simple networks to deeper architectures, as it explains both the historical difficulties and modern solutions for stabilizing training. Researchers, engineers, and students building or debugging neural networks would benefit most from the comprehensive diagnostic techniques and implementation details covered.