---
title: "Karpathy’s MicroGPT: A Complete Code Walkthrough of GPT in 243 Lines of Pure Python"
author: "Generative AI"
platform: "medium"
publicationName: "Generative AI"
url: "https://generativeai.pub/karpathys-microgpt-a-complete-code-walkthrough-of-gpt-in-243-lines-of-pure-python-d0f55fdded64?source=rss----440100e76000---4"
publishedAt: "2026-02-24"
tags:
  - "ai-general"
categories:
  - "AI & Machine Learning"
tagsNormalizedAt: "2026-03-01T21:19:30.571Z"
---

# Karpathy’s MicroGPT: A Complete Code Walkthrough of GPT in 243 Lines of Pure Python

# Karpathy’s MicroGPT: A Complete Code Walkthrough of GPT in 243 Lines of Pure Python

[The Dev Suite](https://blog.thedevsuite.com/?source=post_page---byline--d0f55fdded64---------------------------------------)

19 min read·1 day ago

\--

On February 11, 2026, Andrej Karpathy posted something that made me stop scrolling and actually read every single line. A complete GPT — training and inference — in 243 lines of dependency-free Python. No PyTorch. No TensorFlow. No NumPy. Just `os`, `math`, and `random`. He called it [microGPT](https://karpathy.ai/microgpt.html), and described it as "the full algorithmic content of what is needed. Everything else is just efficiency."

I’ve spent the last week pulling this code apart line by line. What I found is that once you strip away the optimized CUDA kernels, the batched tensor operations, and the GPU memory management — the actual *algorithm* behind GPT is surprisingly readable. This post is my attempt to walk you through every piece of it, because I think understanding this code is the single best way to understand how language models actually work.

![]()

## Why This Matters

Most of us interact with GPT through APIs. We send text in, text comes out. The internals are hidden behind thousands of lines of optimized C++ and CUDA code in frameworks like PyTorch. Karpathy’s microGPT strips all of that away and shows you the raw algorithm.

This isn’t a toy demo. It implements:

-   A scalar-valued autograd engine (automatic differentiation)
-   The full GPT-2 transformer architecture with multi-head attention
-   The Adam optimizer with bias correction and learning rate decay
-   A complete training loop with next-token prediction
-   Temperature-controlled text generation at inference

The model trains on a dataset of names and learns to generate new, plausible-sounding names from scratch. It’s slow — pure Python scalar math instead of GPU-accelerated tensor operations — but it’s *correct*. The same algorithm, scaled up with efficient hardware, is what powers the models we use every day.

Let’s walk through it.

## Step 1: Data Loading — Let There Be Text

```
import os       # os.path.existsimport math     # math.log, math.expimport random   # random.seed, random.choices, random.gauss, random.shufflerandom.seed(42) # Let there be order among chaosif not os.path.exists('input.txt'):    import urllib.request    names_url = 'https://raw.githubusercontent.com/karpathy/makemore/refs/heads/master/names.txt'    urllib.request.urlretrieve(names_url, 'input.txt')docs = [l.strip() for l in open('input.txt').read().strip().split('\n') if l.strip()]random.shuffle(docs)print(f"num docs: {len(docs)}")
```

Three imports. That’s it. The entire dependency list is Python’s standard library.

The code downloads a dataset of ~32,000 human names (one per line) from Karpathy’s [makemore](https://github.com/karpathy/makemore) repository. Each name becomes a “document” — the model will learn to predict the next character in a name, one character at a time. The shuffle ensures the model doesn’t memorize the alphabetical ordering of the dataset.

Why names? They’re short (typically 2–8 characters, averaging around 6), have clear patterns (common endings like “-lyn”, “-son”, “-ley”), and you can immediately tell if the model’s output looks reasonable. It’s the perfect toy dataset for a toy-sized model.

## Step 2: The Tokenizer — Characters Become Numbers

```
uchars = sorted(set(''.join(docs)))  # unique characters in the datasetBOS = len(uchars)                     # Beginning of Sequence tokenvocab_size = len(uchars) + 1          # total unique tokens, +1 for BOSprint(f"vocab size: {vocab_size}")
```

Neural networks operate on numbers, not characters. The tokenizer here is about as simple as it gets: every unique character in the dataset gets an integer ID. The sorted set of all characters (a–z) becomes token IDs 0 through 25, and a special `BOS` (Beginning of Sequence) token gets ID 26. That gives us a vocabulary of 27 tokens.

The `BOS` token serves double duty — it marks both the start and end of a name. During training, each name is wrapped like this:

```
"emma" → [BOS, e, m, m, a, BOS] → [26, 4, 12, 12, 0, 26]
```

This is a character-level tokenizer. Production models like GPT-2 use Byte Pair Encoding (BPE) with vocabularies of 50,000+ tokens, where common words become single tokens. But the principle is identical: map text to integers so the model can do math on them.

## Step 3: The Autograd Engine — Backpropagation from Scratch

This is where things get interesting. Karpathy builds a complete automatic differentiation engine in a single class. If you’ve ever wondered what PyTorch’s `autograd` actually does under the hood, this is it — distilled to its essence.

```
class Value:    __slots__ = ('data', 'grad', '_children', '_local_grads')def __init__(self, data, children=(), local_grads=()):        self.data = data                # scalar value (forward pass)        self.grad = 0                   # gradient (backward pass)        self._children = children       # input operands in computation graph        self._local_grads = local_grads # local derivatives w.r.t. each child
```

Every number in the model — every weight, every intermediate calculation — is wrapped in a `Value` object. Each `Value` stores three things:

1.  Its actual numeric value (`data`)
2.  Its gradient with respect to the loss (`grad`) — starts at 0, filled in during backpropagation
3.  Links to its input operands (`_children`) and the corresponding local derivatives (`_local_grads`) — this is how the computation graph is built

The `__slots__` declaration is a Python optimization that prevents the creation of a `__dict__` for each instance, saving memory when you have thousands of these objects.

## Arithmetic Operations Build the Graph

```
def __add__(self, other):    other = other if isinstance(other, Value) else Value(other)    return Value(self.data + other.data, (self, other), (1, 1))def __mul__(self, other):    other = other if isinstance(other, Value) else Value(other)    return Value(self.data * other.data, (self, other), (other.data, self.data))
```

When you add two `Value` objects, the result is a new `Value` that:

-   Stores the sum as its `data`
-   Records both inputs as `_children`
-   Records the local gradients as `(1, 1)` — because ∂(a+b)/∂a = 1 and ∂(a+b)/∂b = 1

For multiplication, the local gradients follow the product rule: ∂(a×b)/∂a = b and ∂(a×b)/∂b = a.

The remaining operations follow the same pattern, each recording the correct local derivative from calculus:

```
def __pow__(self, other):    return Value(self.data**other, (self,), (other * self.data**(other-1),))    # Power rule: d/dx(x^n) = n * x^(n-1)def log(self):    return Value(math.log(self.data), (self,), (1/self.data,))    # d/dx(ln(x)) = 1/xdef exp(self):    return Value(math.exp(self.data), (self,), (math.exp(self.data),))    # d/dx(e^x) = e^xdef relu(self):    return Value(max(0, self.data), (self,), (float(self.data > 0),))    # d/dx(relu(x)) = 1 if x > 0, else 0
```

The convenience operators (`__neg__`, `__sub__`, `__truediv__`, etc.) are all built on top of `__add__`, `__mul__`, and `__pow__` — so the chain rule flows through them automatically.

## The Backward Pass — Chain Rule in Action

```
def backward(self):    topo = []    visited = set()    def build_topo(v):        if v not in visited:            visited.add(v)            for child in v._children:                build_topo(child)            topo.append(v)    build_topo(self)    self.grad = 1    for v in reversed(topo):        for child, local_grad in zip(v._children, v._local_grads):            child.grad += local_grad * v.grad
```

This is the heart of backpropagation. When you call `loss.backward()`, two things happen:

1.  **Topological sort**: The computation graph is traversed depth-first to produce a linear ordering where every node appears after all its children. This ensures we process nodes in the right order during backpropagation.
2.  **Reverse-mode differentiation**: Starting from the loss (whose gradient is 1 by definition — ∂loss/∂loss = 1), we walk backward through the sorted graph. At each node, we multiply the incoming gradient by the local gradient and *accumulate* it into each child’s `.grad`. The accumulation (+=) is critical — a value used in multiple operations receives gradient contributions from all of them.

This is exactly what PyTorch does, just without the GPU acceleration, batched operations, or memory optimizations. The algorithm is identical.

![]()

> *💡* ***Key insight****: This autograd engine is a direct descendant of Karpathy’s earlier* [*micrograd*](https://github.com/karpathy/micrograd) *project, which he built as a teaching tool in 2020. The* `*Value*` *class here uses a slightly different design — storing* `*local_grads*` *tuples instead of closure-based* `*_backward*` *functions — but the core idea is the same.*

## Step 4: Model Parameters — The Knowledge Store

```
n_embd = 16      # embedding dimensionn_head = 4       # number of attention headsn_layer = 1      # number of transformer layersblock_size = 16   # maximum sequence lengthhead_dim = n_embd // n_head  # dimension per head = 4
```

These hyperparameters define the model’s capacity. For context, GPT-2 Small uses `n_embd=768`, `n_head=12`, `n_layer=12`, and `block_size=1024`. MicroGPT is intentionally tiny — just enough to learn character patterns in short names.

```
matrix = lambda nout, nin, std=0.08: [    [Value(random.gauss(0, std)) for _ in range(nin)]     for _ in range(nout)]
```

The `matrix` helper creates a 2D list of `Value` objects, each initialized with a small random Gaussian value (standard deviation 0.08). This is the weight initialization — every learnable parameter starts as a small random number.

```
state_dict = {    'wte': matrix(vocab_size, n_embd),      # token embeddings: 27 × 16    'wpe': matrix(block_size, n_embd),       # position embeddings: 16 × 16    'lm_head': matrix(vocab_size, n_embd),   # output projection: 27 × 16}for i in range(n_layer):    state_dict[f'layer{i}.attn_wq'] = matrix(n_embd, n_embd)   # Query: 16 × 16    state_dict[f'layer{i}.attn_wk'] = matrix(n_embd, n_embd)   # Key: 16 × 16    state_dict[f'layer{i}.attn_wv'] = matrix(n_embd, n_embd)   # Value: 16 × 16    state_dict[f'layer{i}.attn_wo'] = matrix(n_embd, n_embd)   # Output: 16 × 16    state_dict[f'layer{i}.mlp_fc1'] = matrix(4 * n_embd, n_embd)  # MLP expand: 64 × 16    state_dict[f'layer{i}.mlp_fc2'] = matrix(n_embd, 4 * n_embd)  # MLP contract: 16 × 64params = [p for mat in state_dict.values() for row in mat for p in row]print(f"num params: {len(params)}")
```

The `state_dict` holds all learnable weight matrices. The naming follows GPT-2 conventions:

-   `wte` — token embedding table (what each character "means")
-   `wpe` — position embedding table (what each position "means")
-   `attn_wq/wk/wv/wo` — attention projection matrices (Query, Key, Value, Output)
-   `mlp_fc1/fc2` — feed-forward network weights (expand then contract)
-   `lm_head` — final projection from hidden state to vocabulary logits

All parameters are flattened into a single list for the optimizer. With these dimensions, the model has exactly 4,192 parameters. GPT-2 Small has 124 million. But the structure is the same.

One important detail: **there are no bias terms anywhere**. Every linear projection computes only `Wx`, never `Wx + b`. This is a simplification that also aligns with modern GPT design trends — many recent models have dropped biases.

## Step 5: Building Blocks — Linear, Softmax, RMSNorm

Before the main model function, three utility functions define the fundamental operations.

## Linear Projection

```
def linear(x, w):    return [sum(wi * xi for wi, xi in zip(wo, x)) for wo in w]
```

This is matrix-vector multiplication, written as nested Python loops over `Value` objects. For each row `wo` in weight matrix `w`, it computes the dot product with input vector `x`. In PyTorch, this would be `torch.matmul(w, x)` — a single GPU kernel call. Here, it's explicit scalar arithmetic, which is why microGPT is slow but transparent.

## Softmax

```
def softmax(logits):    max_val = max(val.data for val in logits)    exps = [(val - max_val).exp() for val in logits]    total = sum(exps)    return [e / total for e in exps]
```

Softmax converts a vector of raw scores (logits) into a probability distribution that sums to 1. The `max_val` subtraction is a numerical stability trick — subtracting the maximum value before exponentiation prevents overflow without changing the result (since `softmax(x) = softmax(x - c)` for any constant `c`). This is standard practice in every deep learning framework.

## RMSNorm

```
def rmsnorm(x):    ms = sum(xi * xi for xi in x) / len(x)    scale = (ms + 1e-5) ** -0.5    return [xi * scale for xi in x]
```

RMSNorm (Root Mean Square Normalization) stabilizes the values flowing through the network. It divides each element by the root mean square of the vector, keeping magnitudes in a reasonable range. The `1e-5` epsilon prevents division by zero.

This is a simplification of LayerNorm used in the original GPT-2. As Zhang and Sennrich showed in their 2019 NeurIPS paper, RMSNorm achieves comparable performance to LayerNorm while being computationally simpler — it drops the mean-centering step entirely. Notably, this implementation has **no learnable scale or shift parameters** (no γ or β), making it purely a normalization operation.

MicroGPT uses a **pre-norm** architecture: RMSNorm is applied before each sub-layer (attention and MLP), plus once after the initial embedding. This is the same design used in GPT-3 and most modern transformers, as it tends to produce more stable training dynamics than the post-norm design of the original transformer.

## Step 6: The GPT Model — Where It All Comes Together

The `gpt()` function is the transformer. It processes **one token at a time** — no batching, no parallel sequence processing. This single-token design is what makes causality structural rather than mask-based.

```
def gpt(token_id, pos_id, keys, values):    tok_emb = state_dict['wte'][token_id]  # token embedding    pos_emb = state_dict['wpe'][pos_id]    # position embedding    x = [t + p for t, p in zip(tok_emb, pos_emb)]  # combine identity + position    x = rmsnorm(x)
```

## Embeddings: Identity + Position

The first thing the model does is look up two vectors:

-   `tok_emb` — a 16-dimensional vector representing *what* this character is (looked up by token ID)
-   `pos_emb` — a 16-dimensional vector representing *where* this character sits in the sequence (looked up by position)

These are added element-wise to produce a single vector that encodes both pieces of information. Without positional embeddings, the model would treat “e” at position 1 identically to “e” at position 5 — losing all sense of word structure.

This is the same approach used in GPT-2, as described in Radford et al.’s 2019 paper. The original transformer by Vaswani et al. (2017) used fixed sinusoidal positional encodings, but GPT-2 switched to learned positional embeddings, which is what microGPT uses.

## Multi-Head Self-Attention

This is the core mechanism that gives transformers their power. Let me walk through it carefully.

```
for li in range(n_layer):  # 1) Multi-head attention block  x_residual = x  x = rmsnorm(x)  q = linear(x, state_dict[f'layer{li}.attn_wq'])  # Query projection  k = linear(x, state_dict[f'layer{li}.attn_wk'])  # Key projection  v = linear(x, state_dict[f'layer{li}.attn_wv'])  # Value projection  keys[li].append(k)  values[li].append(v)
```

First, the current token’s hidden state `x` is projected into three vectors through learned linear transformations:

-   **Query (Q)**: “What am I looking for?”
-   **Key (K)**: “What do I contain?”
-   **Value (V)**: “What information should I contribute?”

The K and V vectors are appended to a cache (`keys` and `values` lists). This is the **KV cache** — a critical optimization that avoids recomputing K and V for previous tokens. Notice that the current token's K and V are appended *before* attention is computed, so at position 5, the cache contains entries from positions 0 through 5 (inclusive).

## Get The Dev Suite’s stories in your inbox

 from this writer.

**This is also how causality works.** There’s no explicit causal mask. When processing position 5, the KV cache contains entries for positions 0–5 but nothing beyond — positions 6, 7, 8… haven’t been processed yet. The model can attend to the current position and all past positions, but it cannot see the future — structurally, not by masking.

```
x_attn = []for h in range(n_head):    hs = h * head_dim  # head start index    q_h = q[hs:hs+head_dim]    k_h = [ki[hs:hs+head_dim] for ki in keys[li]]    v_h = [vi[hs:hs+head_dim] for vi in values[li]]
```

The 16-dimensional Q, K, V vectors are split into 4 heads of 4 dimensions each. Each head independently computes attention over its own slice. This is multi-head attention — different heads can learn to attend to different types of relationships (e.g., one head might focus on the previous character, another on vowel patterns).

```
attn_logits = [    sum(q_h[j] * k_h[t][j] for j in range(head_dim)) / head_dim**0.5    for t in range(len(k_h))]attn_weights = softmax(attn_logits)head_out = [    sum(attn_weights[t] * v_h[t][j] for t in range(len(v_h)))    for j in range(head_dim)]x_attn.extend(head_out)
```

For each head:

1.  **Compute attention scores**: The dot product between the current query and all cached keys, scaled by √(head\_dim). The scaling prevents dot products from growing too large, which would cause softmax to produce near-one-hot distributions and kill gradient flow — as noted in the original “Attention Is All You Need” paper by Vaswani et al.
2.  **Normalize with softmax**: Convert scores to weights that sum to 1. Higher scores mean “pay more attention to this position.”
3.  **Weighted sum of values**: The output is a weighted combination of all cached value vectors, where the weights come from the attention scores.

The outputs from all 4 heads are concatenated back into a 16-dimensional vector.

```
x = linear(x_attn, state_dict[f'layer{li}.attn_wo'])  # output projectionx = [a + b for a, b in zip(x, x_residual)]  # residual connection
```

The concatenated attention output passes through one more linear projection (`attn_wo`), then gets added back to the original input via a **residual connection**. Residual connections are essential — they allow gradients to flow directly through the network without degradation, making deep networks trainable.

![]()

## The MLP Block

```
# 2) MLP blockx_residual = xx = rmsnorm(x)x = linear(x, state_dict[f'layer{li}.mlp_fc1'])  # expand: 16 → 64x = [xi.relu() for xi in x]                       # non-linearityx = linear(x, state_dict[f'layer{li}.mlp_fc2'])  # contract: 64 → 16x = [a + b for a, b in zip(x, x_residual)]       # residual connection
```

After attention, the MLP block processes each position independently. It follows a classic expand-then-contract pattern:

1.  **Expand** (`mlp_fc1`): Project from 16 dimensions to 64 (4× expansion)
2.  **Activate** (`relu`): Apply ReLU non-linearity — zero out negative values
3.  **Contract** (`mlp_fc2`): Project back from 64 to 16 dimensions
4.  **Residual**: Add back the input

The 4× expansion gives the network more “room to think” — more dimensions to represent intermediate computations before compressing back down. This ratio is standard across GPT variants.

The original GPT-2 uses GeLU activation instead of ReLU. Karpathy chose ReLU for simplicity — it’s trivially implementable (`max(0, x)`) and its derivative is just 0 or 1. The performance difference is negligible at this scale.

## The Output — Logits Over Vocabulary

```
logits = linear(x, state_dict['lm_head'])  # project to vocab size: 16 → 27return logits
```

After all transformer layers, the final hidden state is projected to vocabulary size (27) through the `lm_head` matrix. The result is 27 raw scores (logits) — one for each possible next character. These aren't probabilities yet; they'll be passed through softmax later.

## Step 7: The Training Loop — Learning from Mistakes

```
learning_rate, beta1, beta2, eps_adam = 0.01, 0.85, 0.99, 1e-8m = [0.0] * len(params)  # first moment buffer (mean of gradients)v = [0.0] * len(params)  # second moment buffer (mean of squared gradients)num_steps = 1000for step in range(num_steps):    doc = docs[step % len(docs)]    tokens = [BOS] + [uchars.index(ch) for ch in doc] + [BOS]    n = min(block_size, len(tokens) - 1)
```

Each training step picks one name from the dataset, tokenizes it, and wraps it with `BOS` tokens on both sides. The `n = min(block_size, len(tokens) - 1)` caps the sequence length at `block_size` (16) — if a name is longer, only the first 16 positions are trained on.

## Forward Pass — Building the Computation Graph

```
keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]losses = []for pos_id in range(n):    token_id, target_id = tokens[pos_id], tokens[pos_id + 1]    logits = gpt(token_id, pos_id, keys, values)    probs = softmax(logits)    loss_t = -probs[target_id].log()    losses.append(loss_t)loss = (1 / n) * sum(losses)
```

For each position in the sequence, the model:

1.  Takes the current token and feeds it through the GPT model
2.  Gets 27 logits back, converts them to probabilities via softmax
3.  Looks up the probability assigned to the *correct* next token
4.  Computes the negative log of that probability — this is the **cross-entropy loss**

The loss measures how surprised the model is by the correct answer. If the model assigns probability 0.9 to the right character, `-log(0.9) ≈ 0.105` (low loss, good). If it assigns probability 0.01, `-log(0.01) ≈ 4.6` (high loss, bad). The final loss is averaged across all positions in the document.

Every operation here — every addition, multiplication, softmax, log — is performed on `Value` objects, silently building the computation graph that backpropagation will traverse.

## Backward Pass — Computing Gradients

```
loss.backward()
```

One line. But this single call traverses the entire computation graph — potentially tens of thousands of `Value` nodes — applying the chain rule at each one to compute how every parameter should change to reduce the loss. This is the same `backward()` method we defined in the `Value` class earlier.

## Adam Optimizer — Updating the Weights

```
lr_t = learning_rate * (1 - step / num_steps)  # linear decay: 0.01 → 0for i, p in enumerate(params):    m[i] = beta1 * m[i] + (1 - beta1) * p.grad          # 1st moment (mean)    v[i] = beta2 * v[i] + (1 - beta2) * p.grad ** 2     # 2nd moment (variance)    m_hat = m[i] / (1 - beta1 ** (step + 1))             # bias correction    v_hat = v[i] / (1 - beta2 ** (step + 1))             # bias correction    p.data -= lr_t * m_hat / (v_hat ** 0.5 + eps_adam)   # update weight    p.grad = 0                                             # reset gradient
```

This is the Adam optimizer, implemented from scratch following the original algorithm by Kingma and Ba (2015). Let me break down what each line does:

1.  **Learning rate decay**: The learning rate starts at 0.01 and linearly decays to 0 over 1,000 steps. This is a common schedule — large steps early for fast progress, smaller steps later for fine-tuning.
2.  **First moment (**`**m**`**)**: An exponential moving average of the gradients. With `beta1=0.85`, this smooths out noisy gradient estimates, acting like momentum — the optimizer "remembers" which direction it's been moving.
3.  **Second moment (**`**v**`**)**: An exponential moving average of the *squared* gradients. This tracks the variance of each parameter's gradient, allowing Adam to adapt the learning rate per-parameter. Parameters with consistently large gradients get smaller updates; parameters with small gradients get larger updates.
4.  **Bias correction**: The `m_hat` and `v_hat` corrections compensate for the fact that `m` and `v` are initialized to zero. Without correction, the early estimates would be biased toward zero. This correction was one of the key contributions of the Adam paper.
5.  **Weight update**: The actual parameter update divides the corrected first moment by the square root of the corrected second moment. This is the adaptive learning rate — each parameter effectively gets its own learning rate based on its gradient history.
6.  **Gradient reset**: `p.grad = 0` clears the gradient for the next training step. The `Value` engine accumulates gradients, so this reset is essential.

```
print(f"step {step+1:4d} / {num_steps:4d} | loss {loss.data:.4f}")
```

The training loop prints the loss at each step. You should see it decrease from around 3.3 (random guessing across 27 tokens: `-log(1/27) ≈ 3.3`) down to around 2.0–2.5 after 1,000 steps, indicating the model has learned meaningful character patterns.

![]()

## Step 8: Inference — The Model Speaks

```
temperature = 0.5print("\n--- inference (new, hallucinated names) ---")for sample_idx in range(20):    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]    token_id = BOS    sample = []    for pos_id in range(block_size):        logits = gpt(token_id, pos_id, keys, values)        probs = softmax([l / temperature for l in logits])        token_id = random.choices(range(vocab_size), weights=[p.data for p in probs])[0]        if token_id == BOS:            break        sample.append(uchars[token_id])    print(f"sample {sample_idx+1:2d}: {''.join(sample)}")
```

Inference is the forward pass without any loss computation or weight updates. The model generates text **autoregressively** — each generated token becomes the input for the next step.

Here’s the process:

1.  Start with the `BOS` token
2.  Run it through the model to get 27 logits
3.  Divide logits by `temperature` before softmax
4.  Sample a token from the resulting probability distribution
5.  If the sampled token is `BOS`, stop (end of name)
6.  Otherwise, append the character and feed the new token back in

## Temperature: Controlling Creativity

The `temperature` parameter is a simple but powerful control. The source code notes it should be in the range `(0, 1]`:

-   **temperature < 1** (like 0.5 here): Dividing logits by a number less than 1 *increases* the differences between them, making the softmax distribution *sharper*. The model becomes more confident and conservative — it picks the most likely characters more often.
-   **temperature = 1**: The raw model distribution, unchanged.

Mathematically, values greater than 1 also work (they *flatten* the distribution, making the model more random), but Karpathy’s implementation defaults to 0.5 for conservative, pattern-following generation.

The sampling itself uses `random.choices`, Python's built-in weighted random selection. In production models, you'd see more sophisticated sampling strategies like top-k, top-p (nucleus sampling), or beam search — but the core idea is the same: sample from a probability distribution over the vocabulary.

## The Full Architecture at a Glance

![]()

## What MicroGPT Teaches Us About Real GPTs

The beauty of this code is that it’s not an approximation or a simplified analogy. It’s the actual algorithm. Here’s what scales up and what changes:

![]()

The algorithm in the second column is identical to the first. Production-scale models add engineering optimizations (mixed precision, tensor parallelism, pipeline parallelism, flash attention) — but the core math is the same math you just read.

As Karpathy wrote in the code’s docstring: “This file is the complete algorithm. Everything else is just efficiency.”

## Limitations and Experiments

This is a teaching tool, not a production system. A few things to keep in mind:

**Performance**: Pure Python scalar math is orders of magnitude slower than GPU-accelerated tensor operations. Training 1,000 steps on names takes hours instead of seconds. The entire point is clarity, not speed.

**Capacity**: With 1 layer, 16-dim embeddings, and 4,192 parameters, the model can learn basic character patterns in short names but nothing more complex. Experiments with Shakespeare text produce recognizable short words and punctuation but no coherent structure — the model simply doesn’t have enough capacity or context length to capture language at that level.

**No batching**: The model processes one document per training step. Production training uses batches of thousands of sequences processed in parallel, which both speeds up training and provides more stable gradient estimates.

**No regularization**: There’s no dropout, no weight decay, no gradient clipping. For a model this small on a simple task, it doesn’t matter much. For larger models, these are essential for stable training.

If you want to experiment, try:

-   Increasing `n_layer` to 2 or 3 (more depth)
-   Increasing `n_embd` to 32 or 64 (wider representations)
-   Training for 5,000+ steps (more learning time)
-   Swapping the dataset for something else (song lyrics, code snippets, any text file)

## Key Takeaways

-   **The GPT algorithm fits in 243 lines of Python** — the core math behind language models is surprisingly compact once you strip away the engineering optimizations
-   **Autograd is just the chain rule applied recursively** — every operation records its local derivative, and backpropagation walks the graph in reverse to compute all gradients
-   **Attention is a learned weighted average** — each token computes how much to “attend” to every previous token, then takes a weighted sum of their values
-   **The KV cache makes causality structural** — by processing tokens one at a time and caching K/V vectors, the model naturally can’t see future positions
-   **Adam adapts learning rates per-parameter** — using running averages of gradient magnitude to give each weight its own effective learning rate
-   **Everything else is efficiency** — batching, GPU kernels, mixed precision, distributed training — these make the algorithm fast, but they don’t change what it computes

## References

1.  Karpathy, A. “microGPT.” *karpathy.ai*, February 2026. [https://karpathy.ai/microgpt.html](https://karpathy.ai/microgpt.html)
2.  Karpathy, A. “microGPT — Gist.” *GitHub Gist*, February 2026. [https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95](https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95)
3.  Vaswani, A. et al. “Attention Is All You Need.” *Advances in Neural Information Processing Systems (NeurIPS)*, 2017. [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
4.  Radford, A. et al. “Language Models are Unsupervised Multitask Learners.” *OpenAI*, 2019. [https://cdn.openai.com/better-language-models/language\_models\_are\_unsupervised\_multitask\_learners.pdf](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
5.  Kingma, D. P. and Ba, J. “Adam: A Method for Stochastic Optimization.” *ICLR*, 2015. [https://arxiv.org/abs/1412.6980](https://arxiv.org/abs/1412.6980)
6.  Zhang, B. and Sennrich, R. “Root Mean Square Layer Normalization.” *Advances in Neural Information Processing Systems (NeurIPS)*, 2019. [https://arxiv.org/abs/1910.07467](https://arxiv.org/abs/1910.07467)
7.  Karpathy, A. “micrograd: A tiny scalar-valued autograd engine.” *GitHub*, 2020. [https://github.com/karpathy/micrograd](https://github.com/karpathy/micrograd)
8.  Karpathy, A. “makemore: An autoregressive character-level language model.” *GitHub*, 2022. [https://github.com/karpathy/makemore](https://github.com/karpathy/makemore)

*Until next time, keep observing, keep learning.*

**— The Architect’s Notebook**

*I’m a Software Engineer learning architecture by watching architects work. If these field notes help you understand architecture better, consider following for more observations every Week.*

**Have you run microGPT yourself?** I’d love to hear what you tried — different datasets, different hyperparameters, or just your experience reading through the code. The best way to understand this stuff is to break it and see what happens. Drop your experiments in the comments.

![]()

This story is published on [Generative AI](https://generativeai.pub/). Connect with us on [LinkedIn](https://www.linkedin.com/company/generative-ai-publication) and follow [Zeniteq](https://www.zeniteq.com/) to stay in the loop with the latest AI stories.

Subscribe to our [newsletter](https://www.generativeaipub.com/) and [YouTube](https://www.youtube.com/@generativeaipub) channel to stay updated with the latest news and updates on generative AI. Let’s shape the future of AI together!

![]()