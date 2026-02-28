---
title: "The Emperor Has No Clothes: Demystifying GPT in 8 Simple Steps"
author: "AI Simplified in Plain English"
platform: "medium"
publicationName: "AI Simplified in Plain English"
url: "https://medium.com/ai-simplified-in-plain-english/the-emperor-has-no-clothes-demystifying-gpt-in-8-simple-steps-e9c0d61ff413?source=rss----f37ab7d4e76b---4"
publishedAt: "2026-02-28"
tags:
  - "llm"
  - "gpt"
  - "deep-learning"
  - "mathematics"
  - "andrej-karpathy"
  - "ai"
  - "beginner"
---

# The Emperor Has No Clothes: Demystifying GPT in 8 Simple Steps

# The Emperor Has No Clothes: Demystifying GPT in 8 Simple Steps

[Frank Morales Aguilera](/@frankmorales_91352?source=post_page---byline--e9c0d61ff413---------------------------------------)

17 min read·Just now

\--

![]()

### [Frank Morales Aguilera, BEng, MEng, SMIEEE](https://www.linkedin.com/in/frank-morales1964/)

Associate Technical Fellow / Global Top 10 Thought Leader: Agentic AI & Open Source / Top Voice 2025

### A Complete Tutorial for Students

### Introduction: A Message from a Messenger

Before we begin, I need to reveal something important. The code you’re about to study — this complete, working GPT implementation — was not written by me. It was created by **Andrej Karpathy,** one of the greatest educators and researchers in artificial intelligence. Former Director of AI at Tesla, co-creator of some of the most influential AI models, and, perhaps most importantly, a **master teacher** who believes that complex things should be made simple.

> **I am merely a messenger, delivering his gift to you.**

**Karpathy’s philosophy, embedded in the very first lines of his code, is this:**

> \> \*”The most atomic way to train and run inference for a GPT in pure, dependency-free Python. This file is the complete algorithm. Everything else is just efficiency.”\*

**Read that again: ” Everything else is just efficiency.”**

In an era where companies spend billions on AI, where news articles describe GPT as magical or mysterious, where even experts sometimes speak in confusing jargon — Karpathy gave us this: **200 lines of pure Python that reveal the entire algorithm.** No frameworks. No black boxes. No mystery. Just the mathematical truth, laid bare for anyone willing to read it.

When you hear “ChatGPT” or “GPT-4,” they’re hearing about models with billions of parameters, trained on supercomputers for months. But underneath all that, industrial-scale engineering is **exactly what’s in this code** — just more of it, running faster.

Karpathy stripped away the efficiency to show us the essence. He gave us the **skeleton** so we could understand the **anatomy.**

Now, let me guide you through his masterpiece, line by line, so you can share this understanding with anyone. By the end, you won’t just know what a GPT is — you will have built one with your own hands.

### The 8 Steps to GPT Enlightenment

**A Note Before We Begin**

This code is written in **pure Python** — **no PyTorch, no TensorFlow, no NumPy**. This is intentional and profound. It means that every multiplication, every addition, and every gradient calculation is **visible and explicit**. You can step through it with a debugger. They can print intermediate values. You can modify it and see what breaks.

This is how real understanding happens.

**STEP 1: Get Data (The Raw Material)**

```
import osimport urllib.requestif not os.path.exists('input.txt'):    names_url = 'https://raw.githubusercontent.com/karpathy/makemore/988aa59/names.txt'    urllib.request.urlretrieve(names_url, 'input.txt')docs = [line.strip() for line in open('input.txt') if line.strip()]random.shuffle(docs)print(f"num docs: {len(docs)}")
```

**What’s happening:** We’re downloading a list of names — thousands of them, from Aaron to Zoya. This is our training data. The model will stare at these names until it internalizes their patterns: which letters tend to follow which, common endings, and typical lengths.

**Why Karpathy chose names:** Names are perfect for teaching. They’re short (most < 15 characters), they have clear patterns, and they’re fun to generate. When the model later creates “invented” names, you can immediately judge if they “sound like real names.”

**Key insight:** All AI begins with data. Without examples, there’s nothing to learn. The model is essentially a compression engine — it finds patterns in the training data and stores them as numbers (parameters).

**Pedagogical note:** What patterns might the model find? Common prefixes? Suffixes? Vowel-consonant patterns? Length distributions? The fact that names often end in vowels? All of these will be encoded in the weights.

**STEP 2: Tokenization (Turning Letters into Numbers)**

```
uchars = sorted(set(''.join(docs)))  # Find all unique charactersBOS = len(uchars)  # Special "Beginning of Sequence" tokenvocab_size = len(uchars) + 1  # Total tokens (characters + BOS)print(f"vocab size: {vocab_size}")
```

**What’s happening:** Computers don’t understand letters — they understand numbers. So we create a dictionary:
\- \`a\` → 0
\- \`b\` → 1
\- …
\- \`z\` → 25
\- \`BOS\` → 26 (special marker)

> BOS: Beginning of Sequence

Every name becomes a sequence of numbers: \`”emma”\` → \`\[26, 4, 12, 12, 0, 26\]\` (with BOS at both ends).

**Why BOS matters**: The Beginning of Sequence token serves two purposes:
1\. It tells the model “a new name is starting”
2\. It provides a way for the model to “end” generation (when it predicts BOS, we stop)

**Key insight:** Tokenization is just a mapping. There’s no “understanding” of language here — we’re literally just assigning numbers to characters. The “meaning” emerges later from how these numbers interact.

**STEP 3: Autograd (The Calculus Engine)**

> This is where Karpathy’s teaching genius really shines. Instead of using PyTorch’s automatic differentiation, he **builds it from scratch.**

```
class Value:    __slots__ = ('data', 'grad', '_children', '_local_grads')        def __init__(self, data, children=(), local_grads=()):        self.data = data      # The actual number        self.grad = 0         # Derivative (initially zero)        self._children = children  # What created this Value        self._local_grads = local_grads  # Local derivatives        def __add__(self, other):        other = other if isinstance(other, Value) else Value(other)        # When we add, we remember what we added and the derivatives (both 1)        return Value(self.data + other.data, (self, other), (1, 1))        def __mul__(self, other):        other = other if isinstance(other, Value) else Value(other)        # Local grads: (other.data, self.data) because d(ab)/da = b, d(ab)/db = a        return Value(self.data * other.data, (self, other), (other.data, self.data))        def backward(self):        # Build topological order        topo = []        visited = set()                def build_topo(v):            if v not in visited:                visited.add(v)                for child in v._children:                    build_topo(child)                topo.append(v)                build_topo(self)                # Initialize gradient at output to 1        self.grad = 1                # Apply chain rule backwards        for v in reversed(topo):            for child, local_grad in zip(v._children, v._local_grads):                child.grad += local_grad * v.grad
```

**What’s happening:** This is the **secret sauce** of modern AI — and Karpathy exposes every ingredient.

Every time we do math, we build a computational graph. When we want to learn, we traverse this graph backwards, applying the chain rule from calculus.

**The beautiful part:** Look at \`\_\_add\_\_\` and \`\_\_mul\_\_\`. They don’t just compute results — they **store the operations and the local derivatives.** The addition knows that its derivative with respect to each input is 1. Multiplication knows that d(ab)/da = b and d(ab)/db = a.

Then \`backward()\` simply applies the chain rule: for each operation, multiply the local derivative by the gradient coming from above, and accumulate at the children.

**Example walkthrough:**

```
a = Value(2)        # data=2b = Value(3)        # data=3c = a * b           # data=6, children=(a,b), local_grads=(3,2)d = c + 1           # data=7, children=(c,), local_grads=(1,)d.backward()# What happens:# d.grad = 1 (initialized)# At d: child=c, local_grad=1 → c.grad += 1 * 1 = 1# At c: child=a, local_grad=3 → a.grad += 3 * 1 = 3# At c: child=b, local_grad=2 → b.grad += 2 * 1 = 2
```

The gradients are exactly what calculus predicts: dd/da = 3, dd/db = 2.

> When I wrote “dd/da = 3, dd/db = 2”, I was referring to this specific computation from the autograd example

```
a = Value(2)        # a = 2b = Value(3)        # b = 3  c = a * b           # c = a * b = 6d = c + 1           # d = c + 1 = 7d.backward()        # Calculate gradients!# After backward():print(a.grad)  # 3  👈 dd/da = 3print(b.grad)  # 2  👈 dd/db = 2
```

```
∂d/∂b = (∂d/∂c) × (∂c/∂b) = 1 × a = 1 × 2 = 2
```

Let me explain this **calculus moment** in the code with a simple example:

**🧮 The Chain Rule in Action**

**When I wrote “dd/da = 3, dd/db = 2”, I was referring to this specific computation from the autograd example:**

\`\`\`Python
a = Value(2) # a = 2
b = Value(3) # b = 3
c = a \* b # c = a \* b = 6
d = c + 1 # d = c + 1 = 7
d.backward() # Calculate gradients!

\# After backward():
print(a.grad) # 3 👈 dd/da = 3
print(b.grad) # 2 👈 dd/db = 2
\`\`\`

**📐 Why These Numbers?**

Let’s trace the \*\*chain rule\*\* step by step:

\### \*\*Step 1: The Computation Graph\*\*
\`\`\`
a(2) ──┐
├─ (×) ── c(6) ── (+) ── d(7)
b(3) ──┘ 1 ──┘
\`\`\`

**Step 2: Apply Chain Rule**

We want to find how \`d\` changes when \`a\` changes: \*\*∂d/∂a\*\*

Using the chain rule:
\`\`\`
∂d/∂a = (∂d/∂c) × (∂c/∂a)
\`\`\`

**Let’s calculate each part:**

1\. **∂d/∂c** = 1 (because d = c + 1, derivative is 1)
2\. **∂c/∂a** = b = 3 (because c = a × b, derivative with respect to a is b)

**Therefore:**
\`\`\`
∂d/∂a = 1 × 3 = 3
\`\`\`

Similarly for b:
\`\`\`
∂d/∂b = (∂d/∂c) × (∂c/∂b) = 1 × a = 1 × 2 = 2
\`\`\`

**What This Means**

\- **∂d/∂a = 3**: If we increase \`a\` by 1, \`d\` will increase by 3
\- **∂d/∂b = 2**: If we increase \`b\` by 1, \`d\` will increase by 2

**This makes intuitive sense:**
\- \`a\` is multiplied by \`b=3\` in \`c\`, so it has a 3× effect
\- \`b\` is multiplied by \`a=2\` in \`c\`, so it has a 2× effect

**🔍 In the Code**

**The magic happens here in the \`Value\` class:**

\`\`\`Python
def \_\_mul\_\_(self, other):
\# Local gradients: (other.data, self.data)
return Value(self.data \* other.data, (self, other), (other.data, self.data))
\# ↑ ↑
\# d(c)/da = b d(c)/db = a
\`\`\`

And in \`backward()\`:
\`\`\`python
child.grad += local\_grad \* v.grad
\# ↑ ↑
\# b or a ∂d/∂c = 1
\`\`\`

So \`a.grad\` becomes: \`b(3) × 1 = 3\` ✓

**🎯 The Beautiful Truth**

This is **exactly what you learned in calculus**! The autograd engine is just:
1\. Building a graph of operations
2\. Storing local derivatives at each operation
3\. Multiplying them together (chain rule)
4\. Voilà — gradients!

**No magic. Just calculus, systematically applied.** This is why Karpathy’s code is so brilliant — it reveals that deep learning is just math we already know!

**Key insight:** Backpropagation is just the chain rule systematically applied. You learned this in calculus class — you didn’t know you were learning AI!

**Why this is brilliant teaching:** By building autograd from scratch, you see that there’s **no magic.** It’s just a directed graph and the chain rule. When you later use PyTorch, you will understand exactly what \`.backward()\` is doing under the hood.

**STEP 4: Architecture (The Transformer Blueprint)**

```
# Hyperparametersn_layer = 1      # Depth (how many transformer blocks)n_embd = 16      # Width (size of hidden vectors)block_size = 16  # Maximum context lengthn_head = 4       # Attention heads (parallel pattern finders)head_dim = n_embd // n_head  # Size of each head# Initialize weights randomlymatrix = lambda nout, nin, std=0.08: [[Value(random.gauss(0, std)) for _ in range(nin)]                                        for _ in range(nout)]state_dict = {    'wte': matrix(vocab_size, n_embd),      # Token embeddings    'wpe': matrix(block_size, n_embd),       # Position embeddings    'lm_head': matrix(vocab_size, n_embd),   # Output projection}# Add transformer layersfor i in range(n_layer):    state_dict[f'layer{i}.attn_wq'] = matrix(n_embd, n_embd)  # Query    state_dict[f'layer{i}.attn_wk'] = matrix(n_embd, n_embd)  # Key    state_dict[f'layer{i}.attn_wv'] = matrix(n_embd, n_embd)  # Value    state_dict[f'layer{i}.attn_wo'] = matrix(n_embd, n_embd)  # Output projection    state_dict[f'layer{i}.mlp_fc1'] = matrix(4 * n_embd, n_embd)  # Expand    state_dict[f'layer{i}.mlp_fc2'] = matrix(n_embd, 4 * n_embd)  # Compressparams = [p for mat in state_dict.values() for row in mat for p in row]print(f"num params: {len(params)}")
```

**What’s happening:** We’re creating the model’s “brain” — thousands of tiny numbers (parameters) initialized randomly. At the start, the model knows nothing. These numbers will be gradually tuned during training.

**Karpathy’s naming convention:** state\_dict is the same term PyTorch uses for model parameters.

**The architecture components:**

1\. **Token Embeddings (\`wte\`):** A lookup table. Token ID 0 (for ‘a’) gets a 16-dimensional vector. These vectors will learn to represent semantic similarities — vowels might cluster together, common consonants might cluster, etc.

2\. **Position Embeddings (\`wpe\`):** Another lookup table. Position 0 gets a vector, position 1 gets another, etc. This is how the model knows word order — without it, “emma” and “amme” would look identical.

3\. **Attention Weights**: Four matrices per layer (Q, K, V, O). These are the heart of the transformer, enabling communication between tokens.

4\. **MLP Weights:** Two matrices per layer that process information token-by-token after attention.

**Why the 4x expansion in MLP:** The feed-forward network expands to 4× the embedding dimension (16 → 64), then compresses back. This gives the model more capacity to process information at each token.

**Key insight:** The architecture is like a factory assembly line. Raw materials (tokens) enter at one end, pass through various processing stations (attention, MLP), and emerge as predictions at the other end. The weights are the machine settings at each station.

**Parameter count:** Let’s calculate together:
\- Token embeddings: 27 × 16 = 432
\- Position embeddings: 16 × 16 = 256
\- LM head: 27 × 16 = 432
\- Attention Q,K,V,O: 4 × (16 × 16) = 1,024
\- MLP fc1, fc2: (64×16) + (16×64) = 2,048
Total: ~4,192 parameters

YOU can verify this matches the printed count!

**STEP 5: Forward Pass (How the Model “Thinks”)**

Now we get to the actual transformer implementation. Karpathy implements GPT-2 specifically, with minor simplifications (RMSNorm instead of LayerNorm, ReLU instead of GeLU).

```
def linear(x, w):    return [sum(wi * xi for wi, xi in zip(wo, x)) for wo in w]def softmax(logits):    max_val = max(val.data for val in logits)    exps = [(val - max_val).exp() for val in logits]    total = sum(exps)    return [e / total for e in exps]def rmsnorm(x):    ms = sum(xi * xi for xi in x) / len(x)    scale = (ms + 1e-5) ** -0.5    return [xi * scale for xi in x]def gpt(token_id, pos_id, keys, values):    # 1. Look up embeddings    tok_emb = state_dict['wte'][token_id]  # What token is this?    pos_emb = state_dict['wpe'][pos_id]    # Where is it in sequence?    x = [t + p for t, p in zip(tok_emb, pos_emb)]    x = rmsnorm(x)        for li in range(n_layer):        # ==================== ATTENTION BLOCK ====================        x_residual = x        x = rmsnorm(x)                # Compute Q, K, V        q = linear(x, state_dict[f'layer{li}.attn_wq'])        k = linear(x, state_dict[f'layer{li}.attn_wk'])        v = linear(x, state_dict[f'layer{li}.attn_wv'])                # Store in KV cache for future tokens        keys[li].append(k)        values[li].append(v)                # Multi-head attention        x_attn = []        for h in range(n_head):            hs = h * head_dim            q_h = q[hs:hs+head_dim]            k_h = [ki[hs:hs+head_dim] for ki in keys[li]]            v_h = [vi[hs:hs+head_dim] for vi in values[li]]                        # Scaled dot-product attention            attn_logits = [sum(q_h[j] * k_h[t][j] for j in range(head_dim)) / head_dim**0.5                           for t in range(len(k_h))]            attn_weights = softmax(attn_logits)                        # Apply attention to values            head_out = [sum(attn_weights[t] * v_h[t][j] for t in range(len(v_h)))                        for j in range(head_dim)]            x_attn.extend(head_out)                # Project attention outputs        x = linear(x_attn, state_dict[f'layer{li}.attn_wo'])        x = [a + b for a, b in zip(x, x_residual)]  # Residual connection                # ==================== MLP BLOCK ====================        x_residual = x        x = rmsnorm(x)        x = linear(x, state_dict[f'layer{li}.mlp_fc1'])        x = [xi.relu() for xi in x]        x = linear(x, state_dict[f'layer{li}.mlp_fc2'])        x = [a + b for a, b in zip(x, x_residual)]  # Residual connection        # Output projection    logits = linear(x, state_dict['lm_head'])    return logits
```

**What’s happening:** This is where the architecture comes alive. Let’s trace through what happens when we feed in a token:

**Step 5.1: Embeddings**
\- Look up what this token means (token embedding)
\- Look up where it appears (position embedding)
\- Add them together (now the vector knows both identity and position)

**Step 5.2: Attention Block (The Revolutionary Part)**

This is the core innovation of the transformer. Each token can “look at” all previous tokens and decide what to focus on.

**Query, Key, Value analogy:**
\- **Query:** “What am I interested in?” (e.g., “I’m a vowel, I want to know what consonants came before”)
\- **Key:** “What do I contain?” (e.g., “I’m ‘m’, a consonant”)
\- **Value**: “What information should I pass along?” (e.g., “I’m the first letter of the name”)

The dot product between Query and Key measures compatibility. High score = pay more attention.

-   **The attention formula in code:**

```
attn_logits = [sum(q_h[j] * k_h[t][j] for j in range(head_dim)) / head_dim**0.5                for t in range(len(k_h))]This is exactly `(Q @ K^T) / sqrt(d_k)` from the “Attention Is All You Need” paper, just written out explicitly.
```

**Multi-head attention:** We run 4 attention mechanisms in parallel, each with different learned projections. This lets the model attend to different types of relationships simultaneously — one head might focus on vowel-consonant patterns, another on name endings, another on length.

**Step 5.3: MLP Block**
After tokens exchange information through attention, each token processes it independently using a small neural network. The expansion to 4× dimensions provides more capacity, and compression synthesizes the result.

**Step 5.4: Residual Connections**
Notice the pattern:

```
x_residual = x# ... do some computation ...x = [a + b for a, b in zip(x, x_residual)]
```

This adds the original input back to the processed output. This seemingly simple trick is crucial for training deep networks — it gives gradients a “highway” to flow directly back through the network.

**Step 5.5: RMSNorm**
Instead of the more complex LayerNorm, Karpathy uses RMSNorm:

ms = sum(xi \* xi for xi in x) / len(x)
scale = (ms + 1e-5) \*\* -0.5
return \[xi \* scale for xi in x\]

This normalizes the activations by their root mean square, keeping values in a reasonable range and stabilizing training.

**Key insight for students:** Every line in this function is just basic math — addition, multiplication, exponentiation. The “magic” of transformers is just cleverly organized operations.

**STEP 6: Optimizer (The Learning Algorithm)**

```
learning_rate, beta1, beta2, eps_adam = 0.01, 0.85, 0.99, 1e-8m = [0.0] * len(params)  # First moment bufferv = [0.0] * len(params)  # Second moment buffer
```

**What’s happening:** After we calculate gradients (which direction to adjust each parameter), we need an actual update rule. Karpathy implements Adam (Adaptive Moment Estimation), the workhorse optimizer of deep learning.

**The Adam update (inside training loop):**

```
lr_t = learning_rate * (1 - step / num_steps)  # Linear decayfor i, p in enumerate(params):    # Update biased first and second moment estimates    m[i] = beta1 * m[i] + (1 - beta1) * p.grad    v[i] = beta2 * v[i] + (1 - beta2) * p.grad ** 2        # Bias correction (important for early steps)    m_hat = m[i] / (1 - beta1 ** (step + 1))    v_hat = v[i] / (1 - beta2 ** (step + 1))        # Update parameter    p.data -= lr_t * m_hat / (v_hat ** 0.5 + eps_adam)        # Reset gradient for next iteration    p.grad = 0
```

**What Adam does:**
\- **Momentum (m):** Remembers past gradients. If we’ve been moving in a direction consistently, keep going that way. This smooths out updates and helps escape local minima.
\- **Variance (v):** Remembers squared gradients. If gradients are huge and inconsistent, take smaller steps. If gradients are tiny and consistent, take larger steps.
\- **Bias correction:** Early in training, m and v are biased toward zero. The correction terms fix this.

**Why Adam works:** It’s like having an adaptive learning rate per parameter. Each parameter gets its own customized step size based on its gradient history.

**Learning rate decay:** Karpathy linearly decays the learning rate from 0.01 to 0 over the training run. This is common practice — take big steps early, smaller steps later as we approach a minimum.

**STEP 7: Training (The Learning Loop)**

```
num_steps = 1000for step in range(num_steps):    # Take a single document    doc = docs[step % len(docs)]    tokens = [BOS] + [uchars.index(ch) for ch in doc] + [BOS]    n = min(block_size, len(tokens) - 1)        # Forward pass through sequence    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]    losses = []        for pos_id in range(n):        token_id, target_id = tokens[pos_id], tokens[pos_id + 1]        logits = gpt(token_id, pos_id, keys, values)        probs = softmax(logits)        loss_t = -probs[target_id].log()        losses.append(loss_t)        loss = (1 / n) * sum(losses)  # Average loss over sequence        # Backward pass    loss.backward()        # Adam update    # ... (code from Step 6) ...        print(f"step {step+1:4d} / {num_steps:4d} | loss {loss.data:.4f}", end='\r')
```

**What’s happening:** This is the actual learning process — repetition, repetition, repetition. For each name:

1\. **Tokenize with BOS**: Add special tokens at start and end
2\. **Process each position:** For ‘e’ predict ‘m’, for ‘m’ predict ‘m’, for ‘m’ predict ‘a’, for ‘a’ predict BOS
3\. **Calculate loss at each step:** How wrong was the prediction?
4\. **Average loss:** Get a single number for this sequence
5\. **Backpropagate:** Calculate gradients for all parameters
6\. **Update:** Adjust parameters with Adam
7\. **Repeat:** Do it again with a different name

**The loss function explained:**

```
loss_t = -probs[target_id].log()
```

If the model predicts the correct next token with 90% probability, log(0.9) ≈ -0.1, so loss = 0.1.
If it predicts with 10% probability, log(0.1) ≈ -2.3, so loss = 2.3.

The model wants low loss. It will adjust parameters to make correct predictions more probable.

**KV Cache:** Notice we pass \`keys\` and \`values\` to \`gpt\` and they grow with each position. This is the KV cache — we store key-value pairs for each token so future tokens can access them without recomputation.

**Why we average loss:** Longer sequences would naturally have higher total loss (more prediction opportunities). Averaging makes loss comparable across sequences of different lengths.

**Key insight for students:** Training is just **trial and error at scale.** The model tries, fails (has high loss), adjusts, tries again. After thousands of attempts, it gets better.

**STEP 8: Inference (The Magic Moment)**

```
temperature = 0.5  # Control randomness (lower = more conservative)print("\n--- inference (new, hallucinated names) ---")for sample_idx in range(20):    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]    token_id = BOS    sample = []        for pos_id in range(block_size):        logits = gpt(token_id, pos_id, keys, values)        probs = softmax([l / temperature for l in logits])        token_id = random.choices(range(vocab_size), weights=[p.data for p in probs])[0]                if token_id == BOS:            break                sample.append(uchars[token_id])        print(f"sample {sample_idx+1:2d}: {''.join(sample)}")
```

**What’s happening:** After training, the model has internalized patterns from thousands of names. Now we let it create new ones:

1\. **Start with BOS:** “Begin a new name”
2\. **Get predictions:** What token should come next?
3\. **Sample, don’t always pick the best**: If we always picked the highest probability, we’d get boring, repetitive outputs. Sampling introduces creativity.
4\. **Temperature scaling:** Divide logits by temperature before softmax
— Temperature = 0.1: Almost deterministic, picks highest probability almost always
— Temperature = 1.0: Samples according to learned probabilities
— Temperature = 1.5: More uniform distribution, more random/creative

5\. **Stop at BOS:** When the model predicts BOS, the name is complete
6\. **Convert tokens back to characters:** Numbers → letters

**Why sampling matters:** Language is inherently probabilistic. Given “My name is Em”, many completions are valid (“ma”, “ily”, “erson”). Sampling lets us explore this diversity.

**The temperature trick:**

```
probs = softmax([l / temperature for l in logits])
```

Dividing by temperature > 1 makes the distribution more uniform (more creative). Dividing by temperature < 1 makes it more peaked (more conservative).

**The full notebook with the entire 8 steps in here:** [https://github.com/frank-morales2020/MLxDL/blob/main/GPT\_ONECELL.ipynb](https://github.com/frank-morales2020/MLxDL/blob/main/GPT_ONECELL.ipynb)

### **Conclusion: The Gift of Understanding**

> [Andrej Karpathy](https://karpathy.ai/) gave us something precious with this code. In an era of billion-parameter models and trillion-dollar valuations, he stripped Everything away to show us the **essence.**

**What did we learn?**

1\. **GPTs are not magical** — They’re just next-token predictors with clever architecture
2\. **Attention is not mysterious** — It’s weighted sums with learned compatibility scores
3\. **Learning is not mystical** — It’s gradient descent and the chain rule, repeated thousands of times
4\. **The entire algorithm fits in 200 lines**— Everything else (GPUs, distributed training, optimizations) is just making it faster

When you finish studying this code, YOU won’t just “understand GPTs” in an abstract sense. You will have **built one.** You will have seen every multiplication. YOU will have traced every gradient. YOU will have generated your own names from a model you have been trained on.

> This is Karpathy’s gift to education: not a black box, but a **clear window** into the heart of modern AI.

> **The real magic isn’t in the model — it’s in the understanding.**

### Extensions and Questions for YOU

**For further exploration:**

1. **Change hyperparameters**: What happens if you increase n\_layer to 2? Decrease n\_embd to 8? Increase n\_head to 8?

2. **Different data:** What if you train on country names? Pokémon names? Your friend’s names?

3. **Temperature exploration:** Generate temperatures 0.1, 0.5, 1.0, 2.0. How does creativity change?

4. **Visualize attention:** Add code to print attention weights. Which tokens attend to which?

5. **Beam search:** Instead of sampling, implement beam search for more coherent generation.

**Discussion questions:**

1. Why does the model need position embeddings? What would happen without them?

2. Why multiple attention heads? What different patterns might different heads learn?

3. The residual connections add the original x to the transformed x. Why is this helpful?

4. What would happen if we trained for 10,000 steps instead of 1,000? Would it overfit?

5. How is this character-level model different from word-level models like GPT-3?

### Final Words

Share this with your classmates OR friends. Let them run it. Let them modify it. Let them break it and fix it. Let them experience the joy of watching a blank slate of random numbers gradually learn to generate names that sound real.

And when someone asks them, “How do GPTs work?”, they won’t gesture vaguely at articles they’ve read. They’ll say:

> Let me show you the code. It’s actually just 8 steps.

> **That is Karpathy’s legacy, and now it’s yours to pass on.**