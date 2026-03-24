---
metadata:
  videoId: "zduSFxRajkE"
  title: "Let's build the GPT Tokenizer"
  description: "The Tokenizer is a necessary and pervasive component of Large Language Models (LLMs), where it translates between strings and tokens (text chunks). Tokenizers are a completely separate stage of the LLM pipeline: they have their own training sets, training algorithms (Byte Pair Encoding), and after training implement two fundamental functions: encode() from strings to tokens, and decode() back from tokens to strings. In this lecture we build from scratch the Tokenizer used in the GPT series from OpenAI. In the process, we will see that a lot of weird behaviors and problems of LLMs actually trace back to tokenization. We'll go through a number of these issues, discuss why tokenization is at fault, and why someone out there ideally finds a way to delete this stage entirely.


    Chapters:

    00:00:00 intro: Tokenization, GPT-2 paper, tokenization-related issues

    00:05:50 tokenization by example in a Web UI (tiktokenizer)

    00:14:56 strings in Python, Unicode code points

    00:18:15 Unicode byte encodings, ASCII, UTF-8, UTF-16, UTF-32

    00:22:47 daydreaming: deleting tokenization

    00:23:50 Byte Pair Encoding (BPE) algorithm walkthrough

    00:27:02 starting the implementation

    00:28:35 counting consecutive pairs, finding most common pair

    00:30:36 merging the most common pair

    00:34:58 training the tokenizer: adding the while loop, compression ratio

    00:39:20 tokenizer/LLM diagram: it is a completely separate stage

    00:42:47 decoding tokens to strings

    00:48:21 encoding strings to tokens

    00:57:36 regex patterns to force splits across categories

    01:11:38 tiktoken library intro, differences between GPT-2/GPT-4 regex

    01:14:59 GPT-2 encoder.py released by OpenAI walkthrough

    01:18:26 special tokens, tiktoken handling of, GPT-2/GPT-4 differences

    01:25:28 minbpe exercise time! write your own GPT-4 tokenizer

    01:28:42 sentencepiece library intro, used to train Llama 2 vocabulary

    01:43:27 how to set vocabulary set? revisiting gpt.py transformer

    01:48:11 training new tokens, example of prompt compression

    01:49:58 multimodal [image, video, audio] tokenization with vector quantization

    01:51:41 revisiting and explaining the quirks of LLM tokenization

    02:10:20 final recommendations

    02:12:50 ??? :)


    Exercises:

    - Advised flow: reference this document and try to implement the steps before I give away the partial solutions in the video. The full solutions if you're getting stuck are in the minbpe code https://github.com/karpathy/minbpe/blob/master/exercise.md


    Links:

    - Google colab for the video: https://colab.research.google.com/drive/1y0KnCFZvGVf_odSfcNAws6kcDD7HsI0L?usp=sharing

    - GitHub repo for the video: minBPE https://github.com/karpathy/minbpe

    - Playlist of the whole Zero to Hero series so far: https://www.youtube.com/watch?v=VMj-3S1tku0&list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ

    - our Discord channel: https://discord.gg/3zy8kqD9Cp

    - my Twitter: https://twitter.com/karpathy


    Supplementary links:

    - tiktokenizer https://tiktokenizer.vercel.app

    - tiktoken from OpenAI: https://github.com/openai/tiktoken

    - sentencepiece from Google https://github.com/google/sentencepiece"
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT2H13M35S"
  publishedAt: "2024-02-20T17:11:35Z"
  thumbnailUrl: "https://i.ytimg.com/vi/zduSFxRajkE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=zduSFxRajkE"
processedAt: "2026-03-24T01:53:15.727Z"
source: "youtube"
tldr: "Andrej Karpathy explains tokenization's critical role in large language models, builds a Byte Pair Encoding tokenizer from scratch, compares implementations (OpenAI's tiktoken vs. SentencePiece), and demonstrates how tokenization quirks cause many LLM oddities like poor spelling, arithmetic issues, and the 'solid gold Magikarp' phenomenon."
tools:
  - name: "tiktoken"
    url: null
  - name: "SentencePiece"
    url: null
  - name: "regex"
    url: null
  - name: "Google Colab"
    url: null
  - name: "Tokenizer Playground"
    url: "https://tiktokenizer.vercel.app"
  - name: "minbpe"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "chatgpt"
  - "llm"
  - "nlp"
  - "python"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 80294
  outputTokens: 2077
  totalTokens: 82371
  processingTimeMs: 312314
tagsNormalizedAt: "2026-03-24T04:10:03.100Z"
---

## Key Takeaways

Tokenization is a separate pre-processing stage from LLM training that converts text to integer sequences using a vocabulary. It's responsible for many LLM quirks and requires careful design.

*   **Byte Pair Encoding (BPE) is the core algorithm:** It starts with raw bytes (UTF-8) and iteratively merges the most frequent adjacent pairs, creating a vocabulary of chunks, not just characters.

*   **Tokenizer design has major performance implications:** Vocabulary size, handling of whitespace (crucial for Python), and the training data mixture (languages, code) directly impact sequence length, context window efficiency, and model capabilities.

*   **Real-world tokenizers add complex rules:** OpenAI's GPT-2/4 tokenizers use regex patterns to prevent merging across categories (letters, numbers, punctuation) and add special tokens (like `<|endoftext|>`), while SentencePiece operates on Unicode code points with a fallback to bytes.

*   **Tokenization explains many LLM failures:** Issues with spelling, arithmetic, non-English language performance, trailing whitespace warnings, and bizarre outputs (like 'solid gold Magikarp') are often traceable to tokenization artifacts and distribution mismatches.

*   **Practical guidance:** For inference, use **tiktoken** (OpenAI's library). For training a new tokenizer, consider **SentencePiece** (used by LLaMA) but be wary of its complexity, or build your own BPE implementation. Always be mindful of token efficiency in formats (e.g., YAML often beats JSON).

## Summary

### Introduction and Motivation

Andrej Karpathy begins by stating that tokenization is his least favorite part of working with large language models (LLMs) but is necessary to understand because it's at the heart of many oddities and 'foot guns.' He contrasts a naive character-level tokenizer (like in his 'Let's build GPT' video) with the subword tokenizers used in state-of-the-art models. Using the interactive **Tokenizer Playground**, he demonstrates key quirks: the same word ('egg') can be different tokens depending on capitalization and position, numbers break up arbitrarily (e.g., '127' is one token, '677' is two), non-English languages use more tokens for the same meaning, and GPT-2's handling of Python spaces is inefficient. These inefficiencies directly impact the model's finite context window.

### Building a Basic BPE Tokenizer from Scratch

The core solution is **Byte Pair Encoding (BPE)**. Karpathy explains the algorithm: start with a base vocabulary of 256 bytes (from UTF-8 encoding), find the most frequent pair of tokens in the training text, merge them into a new token, add it to the vocabulary, and repeat. This compresses the sequence. He implements this in Python step-by-step: encoding text to UTF-8 bytes, writing a `get_stats` function to find frequent pairs, and a `merge` function to replace pairs. He then creates a training loop that performs a set number of merges (e.g., 20 to go from 256 to 276 tokens), building a `merges` dictionary that defines the tokenizer.

He emphasizes that the tokenizer is a separate, pre-trained component. Once trained (with its own dataset), you need **encode** (text -> tokens) and **decode** (tokens -> text) functions. He implements `decode` by building a `vocab` dictionary that maps token IDs to byte sequences, concatenating them, and decoding with UTF-8 (using `errors='replace'` for safety). The `encode` function is more complex: it takes raw bytes, then iteratively applies the merges in the correct order (from earliest to latest merge) until no more merges are possible.

### Evolution to Real-World Tokenizers: GPT-2/4 and SentencePiece

Real tokenizers add layers of complexity. Karpathy examines **OpenAI's GPT-2 tokenizer code**. A key addition is a massive **regex pattern** used to pre-split text before BPE. This pattern uses Unicode property escapes (`\p{L}` for letters, `\p{N}` for numbers) to separate categories, preventing merges across, say, a word and a following punctuation mark. This addresses issues noted in the GPT-2 paper. He shows how GPT-4's tokenizer uses a different, case-insensitive pattern, merges whitespace more aggressively (benefiting Python), and has a larger vocabulary (~100k vs. GPT-2's ~50k).

He introduces **tiktoken**, OpenAI's official Rust-based library for fast inference, and notes it only provides inference, not training. For training, many models use **SentencePiece** (from Google). Karpathy highlights a fundamental difference: SentencePiece typically runs BPE on **Unicode code points**, not bytes, and uses a 'byte fallback' for rare characters. It also has many configuration options (like `add_dummy_prefix` and character coverage) that he replicates from LLaMA 2's settings. He finds SentencePiece powerful but complex and poorly documented, with potentially confusing concepts like 'sentences.'

### Model Architecture, Vocabulary Size, and Special Tokens

Karpathy connects tokenization back to the Transformer. The vocabulary size determines the size of the **embedding table** (input) and the **linear head** (output). There's a trade-off: too few tokens make sequences too long; too many make the embedding table large and tokens undertrained. Common sizes are in the tens to hundreds of thousands. He explains **special tokens** (like `<|endoftext|>` in GPT-2), which are added to the vocabulary and used to delimit documents or structure conversations (like in ChatGPT). Adding new special tokens post-training requires 'model surgery' to expand the embedding and head layers.

### Revisiting and Explaining LLM Oddities

With the tokenization foundation laid, Karpathy returns to the initial examples to explain them fully:

*   **Spelling/Character Tasks:** Long tokens (e.g., 'defaultStyle' as one token) cram too much information into a single unit; the model struggles to reason about internal characters.

*   **Non-English Languages:** Tokenizer training data is English-heavy, so non-English text isn't merged as efficiently, resulting in longer, 'bloated' sequences that waste context.

*   **Arithmetic:** Numbers tokenize arbitrarily (e.g., '2024' could be one token or split as '20' + '24'), breaking the character-level structure needed for arithmetic algorithms.

*   **Trailing Whitespace Warning:** Adding a space at the end of a prompt creates a lone space token (`220`). Normally, a space starts the next word token (e.g., `' o'`). The model has rarely seen a prompt ending with just a space token, leading to out-of-distribution behavior.

*   **Solid Gold Magikarp:** This Reddit username was frequent in the *tokenizer's* training data, so it became a single token. However, it was absent from the *LLM's* training data. Thus, its embedding vector was never trained (initialized randomly), leading to completely undefined, often bizarre model behavior when evoked.

*   **Format Efficiency:** JSON is token-inefficient due to many quotes and braces; YAML is often more token-efficient, a practical consideration for API costs and context limits.

### Conclusion and Recommendations

Karpathy concludes that tokenization is a gnarly but critical piece of the LLM stack, full of sharp edges and security/safety implications. His recommendations are: for inference, use **tiktoken**; if you must train a new tokenizer, you can use **SentencePiece** but be very careful with its settings, or build/use a clean BPE-on-bytes implementation like the one he demonstrates (**minbpe**). He expresses hope for future 'tokenization-free' models but acknowledges that for now, understanding and working with tokenizers is essential.

## Context

Andrej Karpathy is a leading AI researcher, former Director of AI at Tesla and Senior Director of AI at OpenAI, known for his deep technical tutorials on neural networks and LLMs. This video is part of his series building foundational AI concepts from scratch, following his popular 'Let's build GPT' video. It addresses a critical but often overlooked component of the modern AI stack. The topic is highly relevant as practitioners increasingly encounter tokenization-related issues when deploying and debugging LLMs. This deep dive is essential for AI engineers, researchers, and advanced developers who need to move beyond using LLMs as black boxes and understand the root causes of their peculiar behaviors.