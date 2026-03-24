---
metadata:
  videoId: "q8SA3rM6ckI"
  title: "Building makemore Part 4: Becoming a Backprop Ninja"
  description: "We take the 2-layer MLP (with BatchNorm) from the previous video and backpropagate through it manually without using PyTorch autograd's loss.backward(): through the cross entropy loss, 2nd linear layer, tanh, batchnorm, 1st linear layer, and the embedding table. Along the way, we get a strong intuitive understanding about how gradients flow backwards through the compute graph and on the level of efficient Tensors, not just individual scalars like in micrograd. This helps build competence and intuition around how neural nets are optimized and sets you up to more confidently innovate on and debug modern neural networks.


    !!!!!!!!!!!!

    I recommend you work through the exercise yourself but work with it in tandem and whenever you are stuck unpause the video and see me give away the answer. This video is not super intended to be simply watched. The exercise is here:

    https://colab.research.google.com/drive/1WV2oi2fh9XXyldh02wupFQX0wh5ZC-z-?usp=sharing

    !!!!!!!!!!!!


    Links:

    - makemore on github: https://github.com/karpathy/makemore

    - jupyter notebook I built in this video: https://github.com/karpathy/nn-zero-to-hero/blob/master/lectures/makemore/makemore_part4_backprop.ipynb

    - collab notebook: https://colab.research.google.com/drive/1WV2oi2fh9XXyldh02wupFQX0wh5ZC-z-?usp=sharing

    - my website: https://karpathy.ai

    - my twitter: https://twitter.com/karpathy

    - our Discord channel: https://discord.gg/3zy8kqD9Cp


    Supplementary links:

    - Yes you should understand backprop: https://karpathy.medium.com/yes-you-should-understand-backprop-e2f06eab496b

    - BatchNorm paper: https://arxiv.org/abs/1502.03167

    - Bessel’s Correction: http://math.oxford.emory.edu/site/math117/besselCorrection/

    - Bengio et al. 2003 MLP LM https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf\ 


    Chapters:

    00:00:00 intro: why you should care & fun history

    00:07:26 starter code

    00:13:01 exercise 1: backproping the atomic compute graph

    01:05:17 brief digression: bessel’s correction in batchnorm

    01:26:31 exercise 2: cross entropy loss backward pass

    01:36:37 exercise 3: batch norm layer backward pass

    01:50:02 exercise 4: putting it all together

    01:54:24 outro"
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT1H55M24S"
  publishedAt: "2022-10-11T17:56:19Z"
  thumbnailUrl: "https://i.ytimg.com/vi/q8SA3rM6ckI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=q8SA3rM6ckI"
processedAt: "2026-03-24T02:07:16.850Z"
source: "youtube"
tldr: "Andrej Karpathy demonstrates how to manually implement backpropagation for a neural network from scratch in PyTorch, replacing automatic differentiation with explicit gradient calculations to build a deeper understanding of how gradients flow through complex architectures like multilayer perceptrons with batch normalization."
tools:
  - name: "PyTorch"
    url: "https://pytorch.org"
  - name: "NumPy"
    url: "https://numpy.org"
  - name: "Jupyter Notebook"
    url: "https://jupyter.org"
  - name: "Google Colab"
    url: "https://colab.research.google.com"
  - name: "Matlab"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-general"
  - "engineering"
  - "machine-learning"
  - "model-training"
  - "python"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 67736
  outputTokens: 1861
  totalTokens: 69597
  processingTimeMs: 185816
tagsNormalizedAt: "2026-03-24T04:13:27.584Z"
---

## Key Takeaways

Karpathy argues that automatic differentiation is a 'leaky abstraction' and that manually implementing backpropagation is crucial for debugging and truly understanding neural networks.

*   **Backpropagation as a leaky abstraction:** Relying solely on autograd can mask bugs and lead to suboptimal performance; understanding the internal mechanics is essential for effective debugging.

*   **Manual implementation builds intuition:** Breaking down operations (like softmax, matrix multiplication, batch normalization) into atomic pieces and calculating their derivatives by hand provides invaluable insight into gradient flow and network behavior.

*   **The duality of broadcasting and summation:** A key pattern: broadcasting in the forward pass corresponds to summation in the backward pass, and vice-versa. This is critical for correctly handling operations like `mean` and element-wise operations with mismatched shapes.

*   **Analytical derivatives are more efficient:** While implementing the full chain of atomic operations is educational, deriving and implementing consolidated, mathematical expressions for gradients (e.g., for cross-entropy loss or batch norm) is far more computationally efficient and is what frameworks do internally.

## Summary

### Introduction and Motivation

Andrej Karpathy begins by stating the goal of the lecture: to remove the reliance on PyTorch's `loss.backward()` and manually write the backward pass for their ongoing 'makemore' character-level language model. He emphasizes that this is a critical exercise because backpropagation is a 'leaky abstraction.' Simply stacking layers and relying on autograd can lead to subtle bugs, vanishing/exploding gradients, and poor performance if the internal mechanics are not understood. He references his blog post on the topic and shows historical examples from his own 2010-2014 code where manual backpropagation was the standard.

### Exercise 1: Backpropagation Through Atomic Operations

The core of the lecture is a step-by-step, manual backpropagation through a two-layer MLP with batch normalization. Karpathy starts with a forward pass that has been expanded to save many intermediate tensors (e.g., `logits`, `counts`, `probs`, `logprobs`). He then works backwards from the loss, calculating gradients for each variable.

*   **Loss to Logits:** He first derives `dlogprobs`, showing that the gradient is `-1/n` at the positions of the correct labels and zero elsewhere. He then chains back through the log operation (`dprobs = dlogprobs

* (1/probs)`), through the softmax normalization (carefully handling the broadcasting of the `countsuminv`), and through the `logitmaxes` subtraction.

*   **Key Insight on Broadcasting:** A major theme is correctly handling operations where tensors are broadcast (e.g., a column vector added to a matrix). The rule is that **broadcasting in the forward pass turns into summation in the backward pass** along the broadcasted dimension. This is repeatedly applied when dealing with sums like `countsum` and means.

*   **Linear Layers:** Backpropagation through the matrix multiplication `logits = h @ W2 + b2` is derived by dimensional analysis. The gradients are: `dh = dlogits @ W2.T`, `dW2 = h.T @ dlogits`, and `db2 = dlogits.sum(0)`.

*   **Non-linearity and Batch Norm:** He backpropagates through the `tanh` activation (`dhpreact = (1 - h**2) * dh`) and then through the batch normalization layer. The batch norm backward pass is broken into its many constituent operations (mean, variance, standardization, scaling), each handled individually, showcasing the complexity.

*   **Embedding Layer:** Finally, he routes gradients back into the embedding table `C` by using the indices in `xb` to scatter the gradients from the flattened embedding matrix `m` back to the correct rows of `C`, summing gradients where the same embedding is used multiple times.

### Exercise 2: Efficient Gradient for Cross-Entropy Loss

Having done the laborious atomic backpropagation, Karpathy shows a more efficient approach. Instead of backpropagating through the decomposed softmax and log operations, he derives the analytic gradient of the cross-entropy loss with respect to the logits. The result is elegant: `dlogits = F.softmax(logits, dim=1); dlogits[range(n), yb] -= 1; dlogits /= n`. This single, consolidated expression is mathematically equivalent to the long chain of operations in Exercise 1 but is vastly more efficient and numerically stable. He visualizes this gradient, explaining it intuitively as 'forces' that pull down the probabilities of incorrect characters and pull up the probability of the correct character, with the sum of forces being zero.

### Exercise 3: Efficient Gradient for Batch Normalization

Karpathy repeats the efficiency lesson for batch normalization. He presents the daunting task of deriving the analytic backward pass for the entire batch norm operation as a single, vectorized expression. He outlines the mathematical derivation on paper, showing how to go from `dy` (the gradient of the loss with respect to the batch norm output) to `dx` (the gradient with respect to the input), considering the paths through the mean `mu` and variance `sigma_squared`. The final implemented formula is a complex but single line of PyTorch code that performs the backward pass for all neurons in parallel. He also discusses the nuance of Bessel's correction (using `n-1` instead of `n` for variance estimation) and argues that the PyTorch default, which creates a train/test discrepancy, is suboptimal.

### Exercise 4: Putting It All Together

In the final exercise, Karpathy assembles the manually derived backpropagation code into a complete training loop. He replaces the call to `loss.backward()` with his own gradient computation using the efficient formulas for cross-entropy and batch norm, and the manually derived code for the linear and embedding layers. He then updates the parameters directly using these manually computed gradients. The neural network trains successfully, achieving the same loss and sample quality as the autograd version, proving the correctness of the manual implementation. The final backward pass is compact (roughly 20 lines of clear code), demystifying the training process.

### Conclusion and Historical Context

Karpathy concludes by reflecting on the value of the exercise. While no one manually writes backpropagation in production today, having done it builds an 'unshakable intuition' for how gradients flow. He notes that about a decade ago, this manual implementation was the standard. He positions the viewer who understands this material as moving from the 'confused' to the 'enlightened' side of a meme, fully prepared to understand and debug more complex architectures like RNNs and LSTMs, which are teased for the next lecture.

## Context

Andrej Karpathy is a renowned AI researcher, former Director of AI at Tesla, and a founding member of OpenAI. This video is part of his 'Neural Networks: Zero to Hero' series, an educational deep-dive into building neural networks from first principles. The series is famous for its hands-on, code-first approach that demystifies core concepts. This lecture sits at a pivotal point in the 'makemore' series, after building a basic MLP but before moving on to recurrent networks. It addresses a foundational gap in many practitioners' understanding: the mechanics of backpropagation. This is critically relevant for anyone who wants to move beyond treating neural networks as black boxes, especially those interested in model debugging, developing new architectures, or writing efficient, low-level training code. The full video is most beneficial for intermediate machine learning practitioners and students who are comfortable with PyTorch basics but seek a profound, operational understanding of how neural networks learn.