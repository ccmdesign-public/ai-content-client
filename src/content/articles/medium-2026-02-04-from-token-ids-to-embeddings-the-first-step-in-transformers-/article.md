---
title: "From Token IDs to Embeddings: The First Step in Transformers Explained"
author: "Learning Data"
platform: "medium"
publicationName: "Learning Data"
url: "https://medium.com/learning-data/from-token-ids-to-embeddings-the-first-step-in-transformers-explained-49137beffa29?source=rss----eec44e936bf1---4"
publishedAt: "2026-02-04"
tags:
  - "ai-general"
  - "data-science"
  - "education"
  - "machine-learning"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.644Z"
---

# From Token IDs to Embeddings: The First Step in Transformers Explained

![Photo by MART PRODUCTION: https://www.pexels.com/photo/white-and-pink-smoke-illustration-7577825/]()

# From Token IDs to Embeddings: The First Step in Transformers Explained

[Naman Lazarus](/@namanlazarus?source=post_page---byline--49137beffa29---------------------------------------)

3 min read·May 18, 2025

\--

Ever wondered how a transformer model understands raw text? Before attention heads or multi-layer stacks come into play, there’s a crucial step: converting **token IDs** into **embeddings**. In this article, we’ll break down this process and show you how Hugging Face’s `transformers` library handles it under the hood.

## The Big Picture

Modern transformer models like BERT, GPT, and RoBERTa don’t work directly with words. Instead, they operate on numerical vectors known as **embeddings**.

But how do we get from text to these embeddings?

It’s a two-step journey:

1.  **Tokenization**: Text → Token IDs (integers)
2.  **Embedding Lookup**: Token IDs → Dense vectors (embeddings)

Let’s unpack each step.

## 1️⃣ Tokenization: Text → Token IDs

Tokenization is the process of splitting text into smaller units (tokens) and mapping them to numerical IDs using a vocabulary.

```
from transformers import AutoTokenizertokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")text = "Hello world"tokens = tokenizer(text)print(tokens["input_ids"])# Output: [101, 7592, 2088, 102]
```

These integers are **token IDs**:

-   `101` → `[CLS]` (special classification token)
-   `7592` → `hello`
-   `2088` → `world`
-   `102` → `[SEP]` (end of sequence)

These IDs are just indices in a **vocabulary table**.

## 2️⃣ Embedding Lookup: Token IDs → Vectors

The model has a **learned embedding matrix**, typically of shape:

```
(vocab_size, hidden_size)
```

For BERT-base:

```
(30522, 768)
```

Each row in this matrix corresponds to a token in the vocabulary. When we pass token IDs into the model, it simply **looks up** each token’s corresponding vector:

```
import torchfrom transformers import AutoModelmodel = AutoModel.from_pretrained("bert-base-uncased")input_ids = torch.tensor([tokens["input_ids"]])embeddings = model.get_input_embeddings()(input_ids)print(embeddings.shape)# Output: torch.Size([1, 4, 768])
```

-   `1` → batch size
-   `4` → number of tokens
-   `768` → hidden dimension

This means: each token is now a 768-dimensional vector!

## Adding Positional and Segment Embeddings

Transformers are **order-agnostic** by design. To give them a sense of sequence, we add **positional embeddings**.

In BERT, the final input embeddings are computed as:

```
input_embedding = token_embedding + position_embedding + segment_embedding
```

-   **Token embedding**: Comes from the vocabulary lookup.
-   **Position embedding**: Tells the model the position of each token (1st, 2nd, etc.).
-   **Segment embedding**: Useful for tasks involving sentence pairs (e.g., in QA or next sentence prediction).

These vectors are added element-wise before being passed into the encoder layers.

## Why This Matters

Understanding this embedding process is critical for:

-   **Custom model development** (e.g., modifying inputs)
-   **Analyzing model performance** at the input level
-   **Debugging** padding, truncation, or sequence length issues
-   **Exporting to ONNX/TFLite**, which often requires fixed input sizes

## A Quick Recap

![Quick recap of the three stages]()

## Final Thoughts

The embedding layer is the **first bridge between language and math** in a transformer. It’s simple, elegant, and foundational.

By understanding this process, you’re peeling back one of the most essential layers of how large language models work.

## Bonus: Visual Intuition

Imagine:

-   Each token is a **point** in a high-dimensional space.
-   These embeddings capture **semantic relationships**: similar words land close together.
-   This is what allows transformers to understand the context and meaning of your inputs.

## Want to Go Deeper?

Here are some ideas for further exploration:

-   Visualize embedding vectors with PCA or t-SNE
-   Modify embeddings for custom tasks
-   Prepend task-specific tokens (like in prompt tuning)

Let me know in the comments if you’d like a follow-up post on those!

*Thanks for reading! Follow for more deep dives into how transformers work under the hood.* 🚀

*The contents of external submissions are not necessarily reflective of the opinions or work of* [*Maven Analytics*](http://mavenanalytics.io) *or any of its team members.*

*We believe in fostering lifelong learning and our intent is to provide a platform for the data community to share their work and seek feedback from the Maven Analytics data fam.*

[*Submit your own writing here*](/learning-data/how-to-get-your-work-published-by-learning-data-with-maven-analytics-7df21e466a3e?sk=020dfac485597d602e218968d9ffb395) *if you’d like to become a contributor.*

*Happy learning!*

*\-Team Maven*