---
title: "The Evolution of Generative Modelling: A Deep Dive into JAX-Powered Transformers with TPU"
author: "AI Simplified in Plain English"
platform: "medium"
publicationName: "AI Simplified in Plain English"
url: "https://medium.com/ai-simplified-in-plain-english/the-evolution-of-generative-modelling-a-deep-dive-into-jax-powered-transformers-with-tpu-a6ec4a2453fa?source=rss----f37ab7d4e76b---4"
publishedAt: "2026-03-11"
tags:
  - "ai-general"
  - "llm"
  - "model-training"
categories:
  - "AI & Machine Learning"
tagsNormalizedAt: "2026-03-14T14:32:35.711Z"
---

# The Evolution of Generative Modelling: A Deep Dive into JAX-Powered Transformers with TPU

# The Evolution of Generative Modelling: A Deep Dive into JAX-Powered Transformers with TPU

[Frank Morales Aguilera](/@frankmorales_91352?source=post_page---byline--a6ec4a2453fa---------------------------------------)

5 min read·6 days ago

\--

![]()

### [Frank Morales Aguilera, BEng, MEng, SMIEEE](https://www.linkedin.com/in/frank-morales1964/)

Associate Technical Fellow / Global Top 10 Thought Leader: Agentic AI & Open Source / Top Voice 2025

The provided JAX-based transformer implementation represents a sophisticated leap in character-level language modelling, moving beyond basic architectures to incorporate modern enhancements used in industry-standard models like Llama 3. By leveraging JAX and **Tensor Processing Units (TPUs)**, this code demonstrates how to efficiently train a generative agent to capture the nuances of Shakespearean prose.

### 1\. Modern Architectural Enhancements

The core of the `ModernGPT` model is defined by three critical upgrades that distinguish it from the "vanilla" transformers of 2017:

-   **RMSNorm (Root Mean Square Layer Normalization):** The model replaces standard LayerNorm with RMSNorm. This component is computationally lighter because it scales activations based only on their root mean square, skipping the mean-subtraction step used in traditional normalization. This results in faster training speeds and improved numerical stability without sacrificing accuracy.
-   **RoPE (Rotary Positional Embeddings):** Instead of using additive positional vectors, the `apply_rope` function applies a rotation to the Query ($q$) and Key ($k$) vectors.

This mathematical approach allows the attention mechanism to capture relative distances between tokens more effectively, which is essential for maintaining coherence in long-form text.

-   **Weight Tying:** The model ties the weights of the input `nn.Embed` layer with the final output head. This technique reduces the total parameter count by reusing the same matrix for both embedding and prediction, thereby helping the model generalize better on smaller datasets like Tiny Shakespeare.

### 2\. High-Performance Execution on TPUs

The implementation is purpose-built for the JAX ecosystem, focusing on parallelization and hardware acceleration:

-   **Parallelization via** `**jax.pmap**`**:** The training loop utilizes `jax.pmap` (Parallel Map) to distribute the workload across multiple TPU cores. This allows each core to process a portion of the total batch in parallel, significantly reducing the time per training step.
-   **Optax and AdamW:** The optimization process is managed by the Optax library, specifically using the **AdamW** optimizer. This variant of Adam incorporates weight decay directly into the update step, which is a standard practice for preventing overfitting in deep learning models.
-   **GELU Activations:** Within the feed-forward networks, the model employs the **Gaussian Error Linear Unit (GELU)**. This activation function is smoother than the traditional ReLU, allowing for more nuanced gradient flow and better performance in transformer architectures.

### 3\. Training Dynamics and Generative Results

The execution logs confirm the effectiveness of this modern configuration. Training on a TPU core with a block size of 128 characters, the model exhibited a sharp decline in loss:

![]()

The final loss of **0.8277** indicates that the model has successfully moved from random character selection to a deep understanding of Shakespeare's stylistic patterns. During the inference stage, the `generate_top_k` function uses a sampling strategy with a $k$ value of 10. This ensures that the generated text remains creative and avoids the repetitive loops often seen in simpler models.

### 4\. CODE

[This notebook](https://github.com/frank-morales2020/MLxDL/blob/main/JAX_MODEL.ipynb) contains a JAX-powered implementation of a **Modern GPT (Generative Pre-trained Transformer)**. It is designed to run efficiently on **TPUs, using the Flax neural network library** and Optax for optimization. The code trains a character-level language model on the **Tiny Shakespeare** dataset, which allows it to generate text that mimics the style of Shakespearean plays.

C**ore Architecture Improvements**

Unlike the original "Vanilla" Transformer, this "Modern" GPT includes several architectural upgrades used in state-of-the-art models like Llama 3 or Mistral:

-   **RMSNorm (Root Mean Square Layer Normalization):** Faster and more computationally efficient than standard LayerNorm. It scales the activation based on the root mean square rather than subtracting the mean and dividing by variance.
-   **RoPE (Rotary Positional Embeddings):** Instead of adding fixed positional vectors to embeddings, RoPE rotates the Query ($q$) and Key ($k$) vectors in a complex space. This allows the model to understand the relative distance between tokens better.
-   **Weight Tying:** The model "ties" the weights of the input embedding layer to those of the final output head. This reduces the total number of parameters and often improves performance on smaller datasets.

F**unctional Breakdown**

**Data Pipeline:**

The `get_data()` function downloads the Tiny Shakespeare text and creates a character-level vocabulary.

-   **Vocabulary:** Every unique character (letters, spaces, punctuation) is assigned an integer.
-   **Tokenization:** The `encode` and `decode` lambdas convert strings to lists of integers and vice versa.

**The ModernGPT Model:**

The model is built using **Flax Linen**. Inside the `__call__` method:

-   **Embedding:** Characters are converted into 384-dimensional vectors.
-   **Transformer Layers:** Six layers of Attention and Feed-Forward networks.
-   **Attention:** Uses the RoPE-enhanced $q$ and $k$ to calculate self-attention, masked so that tokens can't "look into the future".
-   **Feed-Forward:** A standard expansion-contraction network using the **GELU** activation function.

**Training Logic:**

The notebook utilizes JAX's high-performance features:

-   `**jax.pmap**`**:** This "Parallel Map" distributes the training batch across all available TPU cores.
-   `**optax.adamw**`**:** A version of the Adam optimizer with Weight Decay, which helps prevent the model from overfitting.
-   **Cross-Entropy Loss:** The standard loss function for predicting the next token in a sequence.

P**erformance & Output**

The training loop runs for **5,000 steps** with a batch size of 32 sequences per core.

-   **Loss Curve:** The loss starts at **4.78** (random guessing) and drops to **~0.82** by the end, indicating that the model has learned the language's patterns.
-   **Inference:** The `generate_top_k` function uses "Top-K" sampling. Instead of just picking the most likely next character, it samples from the top 10 most likely candidates, which makes the generated text more creative and less repetitive.

**Example Result:**

At the end of the script, the model generates a response starting with `"KING RICHARD: "`. As seen in the logs, it successfully captures the formatting (character names in caps) and the "pseudo-Shakespearean" vocabulary, even if the logic is nonsensical.

### Conclusion: The Future of Scalable Intelligence

This implementation serves as more than just a creative exercise in mimicking classic literature; it is a compact blueprint for the future of scalable, high-efficiency AI. By integrating advanced mathematical concepts such as Rotary Positional Embeddings with the raw power of JAX-based TPU parallelization, the code achieves a level of performance once reserved for massive computing clusters. This work highlights a critical shift in AI development: the move toward architectures that are not just larger, but fundamentally smarter and more efficient in how they process information. For researchers and engineers, this represents a path toward democratizing state-of-the-art generative modelling, proving that with the right architectural choices, even character-level models can capture the profound complexity of human expression.