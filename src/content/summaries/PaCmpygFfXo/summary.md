---
metadata:
  videoId: "PaCmpygFfXo"
  title: "The spelled-out intro to language modeling: building makemore"
  description: "We implement a bigram character-level language model, which we will further complexify in followup videos into a modern Transformer language model, like GPT. In this video, the focus is on (1) introducing torch.Tensor and its subtleties and use in efficiently evaluating neural networks and (2) the overall framework of language modeling that includes model training, sampling, and the evaluation of a loss (e.g. the negative log likelihood for classification).


    Links:

    - makemore on github: https://github.com/karpathy/makemore

    - jupyter notebook I built in this video: https://github.com/karpathy/nn-zero-to-hero/blob/master/lectures/makemore/makemore_part1_bigrams.ipynb

    - my website: https://karpathy.ai

    - my twitter: https://twitter.com/karpathy

    - (new) Neural Networks: Zero to Hero series Discord channel: https://discord.gg/3zy8kqD9Cp , for people who'd like to chat more and go beyond youtube comments


    Useful links for practice:

    - Python + Numpy tutorial from CS231n https://cs231n.github.io/python-numpy-tutorial/ . We use torch.tensor instead of numpy.array in this video. Their design (e.g. broadcasting, data types, etc.) is so similar that practicing one is basically practicing the other, just be careful with some of the APIs - how various functions are named, what arguments they take, etc. - these details can vary.

    - PyTorch tutorial on Tensor https://pytorch.org/tutorials/beginner/basics/tensorqs_tutorial.html

    - Another PyTorch intro to Tensor https://pytorch.org/tutorials/beginner/nlp/pytorch_tutorial.html


    Exercises:

    E01: train a trigram language model, i.e. take two characters as an input to predict the 3rd one. Feel free to use either counting or a neural net. Evaluate the loss; Did it improve over a bigram model?

    E02: split up the dataset randomly into 80% train set, 10% dev set, 10% test set. Train the bigram and trigram models only on the training set. Evaluate them on dev and test splits. What can you see?

    E03: use the dev set to tune the strength of smoothing (or regularization) for the trigram model - i.e. try many possibilities and see which one works best based on the dev set loss. What patterns can you see in the train and dev set loss as you tune this strength? Take the best setting of the smoothing and evaluate on the test set once and at the end. How good of a loss do you achieve?

    E04: we saw that our 1-hot vectors merely select a row of W, so producing these vectors explicitly feels wasteful. Can you delete our use of F.one_hot in favor of simply indexing into rows of W?

    E05: look up and use F.cross_entropy instead. You should achieve the same result. Can you think of why we'd prefer to use F.cross_entropy instead?

    E06: meta-exercise! Think of a fun/interesting exercise and complete it.


    Chapters:

    00:00:00 intro

    00:03:03 reading and exploring the dataset

    00:06:24 exploring the bigrams in the dataset

    00:09:24 counting bigrams in a python dictionary

    00:12:45 counting bigrams in a 2D torch tensor (\"training the model\")

    00:18:19 visualizing the bigram tensor

    00:20:54 deleting spurious (S) and (E) tokens in favor of a single . token

    00:24:02 sampling from the model

    00:36:17 efficiency! vectorized normalization of the rows, tensor broadcasting\ 

    00:50:14 loss function (the negative log likelihood of the data under our model)

    01:00:50 model smoothing with fake counts

    01:02:57 PART 2: the neural network approach: intro

    01:05:26 creating the bigram dataset for the neural net

    01:10:01 feeding integers into neural nets? one-hot encodings

    01:13:53 the \"neural net\": one linear layer of neurons implemented with matrix multiplication

    01:18:46 transforming neural net outputs into probabilities: the softmax

    01:26:17 summary, preview to next steps, reference to micrograd

    01:35:49 vectorized loss

    01:38:36 backward and update, in PyTorch

    01:42:55 putting everything together

    01:47:49 note 1: one-hot encoding really just selects a row of the next Linear layer's weight matrix

    01:50:18 note 2: model smoothing as regularization loss

    01:54:31 sampling from the neural net

    01:56:16 conclusion"
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT1H57M45S"
  publishedAt: "2022-09-07T19:14:47Z"
  thumbnailUrl: "https://i.ytimg.com/vi/PaCmpygFfXo/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=PaCmpygFfXo"
processedAt: "2026-03-24T02:14:23.096Z"
source: "youtube"
tldr: "Andrej Karpathy builds a character-level bigram language model from scratch to generate names, demonstrating both statistical counting and neural network approaches using PyTorch, culminating in identical models trained via maximum likelihood estimation and gradient descent."
tools:
  - name: "PyTorch"
    url: null
  - name: "Matplotlib"
    url: null
  - name: "Jupyter Notebook"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "education"
  - "llm"
  - "machine-learning"
  - "model-training"
  - "nlp"
  - "python"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 62411
  outputTokens: 1650
  totalTokens: 64061
  processingTimeMs: 61108
tagsNormalizedAt: "2026-03-24T04:10:09.876Z"
---

## Key Takeaways

This video provides a foundational introduction to language modeling by constructing the 'makemore' model step-by-step, starting with simple bigrams and progressing toward neural networks.

*   **Bigram language models** are simple probabilistic models that predict the next character based only on the previous one, trained by counting character pair frequencies in a dataset.

*   **Model evaluation uses negative log-likelihood**, a standard loss function where lower values indicate the model assigns higher probabilities to the actual next characters in the training data.

*   **Neural networks can implement the same model** using a single linear layer with softmax, where the weight matrix rows represent log counts, and training via gradient descent converges to the same solution as counting.

*   **Broadcasting in tensor operations is subtle and critical**; incorrect dimension handling during normalization (e.g., using `keepdim=False`) can silently produce wrong results by normalizing columns instead of rows.

*   **The neural network framework is vastly more extensible** than explicit counting tables, enabling future scaling to models using more context (like transformers) without the combinatorial explosion of table sizes.

## Summary

### Introduction and Dataset

Andrej Karpathy introduces the 'makemore' project, a character-level language model designed to generate new items similar to a given dataset, starting with a list of 32,000 names. The goal is to build a model that learns the statistical structure of names to produce novel, name-like sequences. He explains that a character-level model treats each name as a sequence of characters and aims to predict the next character given previous ones. The initial focus is on a **bigram language model**, which considers only the immediate previous character, establishing a simple baseline.

### Building the Bigram Model via Counting

The first implementation approach is statistical. The code loads the names, creates special start (`.`) and end tokens to demarcate word boundaries, and iterates through each name to extract all consecutive character pairs (bigrams). These bigrams are counted and stored in a 27x27 matrix `N` (26 letters plus the dot), where `N[i, j]` records how often character `j` follows character `i`. This count matrix is visualized, revealing the statistical structure of the dataset, such as common starting letters and frequent character transitions.

To generate samples, the model starts with the start token, looks at the corresponding row in the normalized count matrix (converted to probabilities), and samples the next character from that distribution. This process repeats until the end token is sampled. The generated names are simplistic and often nonsensical, highlighting the severe limitation of a model with only one character of memory.

### Evaluating Model Quality with Likelihood

The quality of the model is quantified using the principle of **maximum likelihood estimation**. For each bigram in the training set, the model assigns a probability. The product of all these probabilities is the **likelihood** of the data under the model. For numerical stability, we work with the **log likelihood** (sum of log probabilities). A common loss function is the **negative log likelihood (NLL)**, which we minimize; lower NLL means the model assigns higher probability to the actual data. The average NLL over the dataset provides a single performance metric. Karpathy also introduces **model smoothing** (adding a small count to all entries) to prevent infinite loss from unseen bigrams.

### Neural Network Implementation

The second part of the tutorial re-frames the bigram model as a neural network to establish a foundation for more complex architectures. The training set is rebuilt as pairs of input characters (as integers) and target next characters. Inputs are converted to **one-hot encoded** vectors of size 27. A neural network with a single **linear layer** (27 inputs, 27 outputs, no bias) is defined. The weights `W` (27x27) are initialized randomly. The forward pass is: `logits = x_enc @ W`, then `counts = exp(logits)`, then `probs = counts / counts.sum(dim=1, keepdim=True)`. This sequence—linear layer, exponentiation, row normalization—is the **softmax** function, converting logits to a probability distribution.

### Training with Gradient Descent

The loss is calculated as the average NLL: for each example, we take the probability the model assigns to the correct next character (using the target index), take the log, average, and negate. Using PyTorch's autograd, the gradient of this loss with respect to the weight matrix `W` is computed (`loss.backward()`), and a simple gradient descent update is performed (`w.data += -learning_rate

* w.grad`). After optimization, the loss converges to approximately 2.45, matching the loss from the counting-based model. The trained weight matrix `W` is shown to be equivalent to the log of the count matrix `N` from the statistical approach.

### Key Insights and Extensions

Karpathy highlights several critical insights. The neural network's matrix multiplication with a one-hot input effectively **selects a row** of the weight matrix, mirroring the table lookup of the counting method. He emphasizes the importance and subtlety of **broadcasting rules** in tensor operations, demonstrating how a missing `keepdim=True` during normalization can lead to incorrect column-wise normalization. The neural network approach, while equivalent for bigrams, is fundamentally more scalable. **Regularization** (e.g., adding an L2 penalty on weights) is introduced as the neural network analog of model smoothing, discouraging large weights and promoting more uniform predictions. Finally, sampling from the trained neural network model produces the same results as the counting model, confirming their equivalence.

### Conclusion and Preview

Karpathy concludes that both methods—explicit counting and gradient-based optimization of a neural network—arrive at the same bigram model. The key takeaway is that the neural network framework, with its differentiable loss and gradient descent, is the preferred path forward because it can be seamlessly extended. The simple linear layer will be replaced with increasingly sophisticated architectures (MLPs, RNNs, Transformers) that can condition on more than one previous character, all while using the same training loop and loss function.

## Context

Andrej Karpathy is a renowned AI researcher, formerly Director of AI at Tesla and a key figure in deep learning education. This video is part of his 'spelled-out' tutorial series, which builds complex AI concepts from first principles with live coding. It follows his prior 'micrograd' tutorial on automatic differentiation. The video contributes to the foundational understanding of language modeling, a core subfield of NLP and modern AI, demystifying the basics before advancing to state-of-the-art models like GPT. This is highly relevant for anyone entering AI/ML, as it bridges simple statistics to neural network training in a clear, hands-on manner. The full video is most beneficial for developers and students with basic Python knowledge who want a deep, intuitive grasp of how language models work under the hood.