---
title: "Instruction Fine-Tuning LLMs: Complete Guide with Python Code (GPT-2, Llama, Alpaca Dataset)"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/instruction-fine-tuning-llms-complete-guide-with-python-code-gpt-2-llama-alpaca-dataset-0172e1a70766?source=rss----98111c9905da---4"
publishedAt: "2026-01-31"
tags:
  - "ai-general"
  - "llm"
  - "model-training"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.566Z"
---

# Instruction Fine-Tuning LLMs: Complete Guide with Python Code (GPT-2, Llama, Alpaca Dataset)

# Instruction Fine-Tuning LLMs: Complete Guide with Python Code (GPT-2, Llama, Alpaca Dataset)

## *Understanding the mechanics of teaching language models to follow your instructions*

[Mandar Panse](https://medium.com/@mandar.panse?source=post_page---byline--0172e1a70766---------------------------------------)

12 min read·3 days ago

\--

![Instruction Fine-Tuning]()

So you’ve been playing with ChatGPT or Claude, and you’re thinking “this is cool, but I wish it would just do X consistently.” Maybe you need it to always return JSON in a specific format, or you want it to adopt your company’s writing style, or you’re tired of crafting 500-word prompts just to get decent results.

That’s the fine-tuning problem. And honestly, most tutorials either hand-wave the details or throw you into the deep end with 50 lines of code and no explanation.

This guide is different. We’re going to understand what’s actually happening at each step. Because here’s the thing — if you don’t understand what tokenization is doing, or why we shift labels by 1, or what that weird -100 token thing is about, you’re going to waste days debugging mysterious errors.

Let’s dig in.

> While this tutorial uses GPT-2 for hands-on training, the techniques apply to any causal language model including Llama, Mistral, and others. We’ll also use Claude API to evaluate our fine-tuned model’s quality.

## Wait, What Even Is Instruction Fine-Tuning?

Quick primer on how these models are built (skip if you already know this):

**Stage 1: Pre-training**
The model reads enormous amounts of text — Wikipedia, books, GitHub, random websites. It learns patterns: “the cat sat on the \_\_\_” → probably “mat”. This takes millions of dollars and weeks of compute. Companies like OpenAI, Anthropic, Meta do this part.

**Stage 2: Instruction Fine-tuning** ← We are here
Take that pre-trained model and teach it to follow instructions. Show it examples: “Summarize this article” → good summary, “Write a haiku” → actual haiku. This is what we’re covering today.

**Stage 3: RLHF**
Make it align with human preferences through reinforcement learning. That’s a whole other topic.

## Should You Actually Fine-Tune?

Real talk: fine-tuning is not always the answer. Sometimes prompt engineering gets you 90% of the way there in 1/10th the time.

**When fine-tuning makes sense:**

-   You need rock-solid consistency (like always returning valid JSON)
-   You’re working with weird domain-specific language (medical codes, legal jargon, your company’s internal acronyms)
-   You have 1000+ examples of good inputs/outputs
-   You’re tired of prompt engineering and want the behavior baked in
-   You need a smaller model to match a bigger model’s performance (cost savings)

**When to just use better prompts:**

-   You can already get good results with examples in the prompt
-   Your requirements keep changing
-   You don’t have much training data
-   You need the model to know about current events (fine-tuning freezes knowledge at training time)

The honest answer? Try prompting first. Seriously. You’ll know when you hit the wall and need fine-tuning.

## Getting the Data Ready

This is where things get real. Your model is only as good as your training data. Period.

## Finding a Dataset

For this tutorial, we’re using Alpaca — it’s 52,000 instruction-response pairs that cover everything from creative writing to code generation. Stanford released it, it’s free, and it’s a solid starting point.

```
from datasets import load_datasetimport json# Download the datasetdataset = load_dataset("tatsu-lab/alpaca")# Check it outprint(f"Total examples: {len(dataset['train'])}")print("\nFirst example:")print(dataset['train'][0])
```

You’ll see something like:

```
{  "instruction": "Give three tips for staying healthy.",  "input": "",  "output": "1. Eat a balanced diet...\n2. Exercise regularly...\n3. Get enough sleep..."}
```

Notice it has three fields: `instruction`, `input`, and `output`. The `input` field is often empty - it's only used when you need extra context for the instruction.

Here’s one where input matters:

```
{  "instruction": "Translate this to French.",  "input": "Hello, how are you?",  "output": "Bonjour, comment allez-vous?"}
```

## Formatting: The Template That Makes It Work

Now here’s where it clicks. We need to format this data in a way that teaches the model a *pattern*. When it sees “### Instruction:”, it knows “oh, a task is coming.” When it sees “### Response:”, it knows “this is where I generate.”

```
def format_instruction(example):    """    Turn raw data into training format.    This template is crucial - it's teaching the model the structure.    """    prompt = f"### Instruction:\n{example['instruction']}\n\n"        # Only add input section if there's actual input    if example['input'].strip():        prompt += f"### Input:\n{example['input']}\n\n"        prompt += f"### Response:\n{example['output']}"        return prompt# Try itsample = dataset['train'][0]formatted = format_instruction(sample)print(formatted)
```

Output:

```
### Instruction:Give three tips for staying healthy.### Input:### Response:1. Eat a balanced diet and make sure to include plenty of fruits and vegetables.2. Exercise regularly to keep your body active and strong.3. Get enough sleep and maintain a consistent sleep schedule.
```

This format becomes the model’s “language” for understanding instructions. You could use different markers (like “TASK:” and “ANSWER:”), but “### Instruction:” and “### Response:” have become pretty standard.

Let’s format everything:

```
formatted_data = []for example in dataset['train']:    formatted_data.append({        'text': format_instruction(example)    })print(f"Formatted {len(formatted_data)} examples")
```

## The Data Prep Deep Dive (This Part Matters)

Okay, this section is long but super important. Understanding this will save you hours of “why isn’t my model training?” frustration.

## Split Your Data (Don’t Skip This)

You need three sets. Not optional.

```
from sklearn.model_selection import train_test_split# 80% training, 10% validation, 10% testtrain_data, temp_data = train_test_split(formatted_data, test_size=0.2, random_state=42)val_data, test_data = train_test_split(temp_data, test_size=0.5, random_state=42)print(f"Training: {len(train_data):,}")print(f"Validation: {len(val_data):,}")  print(f"Test: {len(test_data):,}")
```

Why three sets?

-   **Training (80%)**: Model learns from this
-   **Validation (10%)**: Check if we’re overfitting during training
-   **Test (10%)**: Final evaluation after everything is done

The validation set is your sanity check. If training loss goes down but validation loss goes up, you’re overfitting (memorizing instead of learning).

## Tokenization: Turning Text Into Numbers

Neural networks don’t understand text. They understand numbers. So we convert text to “tokens” (roughly word pieces), then to token IDs (integers).

```
from transformers import AutoTokenizertokenizer = AutoTokenizer.from_pretrained("gpt2")tokenizer.pad_token = tokenizer.eos_token  # GPT-2 doesn't have a pad token by default# Let's see what tokenization looks liketext = "Hello, how are you?"tokens = tokenizer(text, return_tensors='pt')print(f"Text: {text}")print(f"Token IDs: {tokens['input_ids'][0].tolist()}")print(f"Decoded back: {tokenizer.decode(tokens['input_ids'][0])}")
```

Output:

```
Text: Hello, how are you?Token IDs: [15496, 11, 703, 389, 345, 30]Decoded back: Hello, how are you?
```

Each number is a token ID that maps to a piece of text in the tokenizer’s vocabulary.

## The Padding Problem (And Why It’s Annoying)

Here’s the issue: our examples are all different lengths. Some are 50 tokens, some are 300. But neural networks need fixed-size inputs for batching.

Look at this:

```
# Check length variationlengths = []for item in train_data[:100]:    tokens = tokenizer(item['text'])    lengths.append(len(tokens['input_ids']))print(f"Shortest: {min(lengths)} tokens")print(f"Longest: {max(lengths)} tokens")print(f"Average: {sum(lengths)/len(lengths):.1f} tokens")
```

You’ll see something like:

```
Shortest: 38 tokensLongest: 287 tokens  Average: 124.3 tokens
```

So what do we do? **Padding**. We add a special padding token (ID 50256 for GPT-2) to the end of shorter sequences until everything is the same length.

```
def tokenize_with_padding(texts, max_length=512):    """    Tokenize and pad everything to max_length.    Shorter sequences get padding tokens added.    Longer sequences get truncated.    """    return tokenizer(        texts,        truncation=True,        max_length=max_length,        padding='max_length',        return_tensors='pt'    )# Examplebatch_texts = [item['text'] for item in train_data[:3]]batch_tokens = tokenize_with_padding(batch_texts, max_length=128)print(f"Batch shape: {batch_tokens['input_ids'].shape}")print(f"\nLast 10 tokens of first sequence:")print(batch_tokens['input_ids'][0][-10:].tolist())
```

Output:

```
Batch shape: torch.Size([3, 128])Last 10 tokens of first sequence:[13, 50256, 50256, 50256, 50256, 50256, 50256, 50256, 50256, 50256]
```

See all those 50256s? That’s padding. The real content ended at token 13, everything after is just filler.

## The Label Shifting Thing (This Confused Me At First)

Okay, this is crucial. In language modeling, we’re training the model to predict the *next* token. So if the input is:

```
[A, B, C, D, E]
```

The targets (what we want the model to predict) should be:

```
[B, C, D, E, <pad>]
```

Why? Because:

-   Given token A, predict B
-   Given token B, predict C
-   Given token C, predict D
-   etc.

We “shift” the sequence to the right by 1 position. Here’s the code:

```
def create_labels(input_ids, pad_token_id=50256):    """    Create training labels by shifting input right by 1.    This is the core of causal language modeling.    """    labels = input_ids.clone()        # Remove first token, add padding at end    labels = torch.cat([        labels[:, 1:],        torch.full((labels.shape[0], 1), pad_token_id)    ], dim=1)        return labels
```

```
# Test itimport torchsample_ids = batch_tokens['input_ids'][0:1]sample_labels = create_labels(sample_ids)print("Input (first 10):", sample_ids[0][:10].tolist())print("Labels (first 10):", sample_labels[0][:10].tolist())
```

Output:

```
Input (first 10): [21017, 46486, 25, 198, 23318, 1115, 9040, 329, 10589, 5448]Labels (first 10): [46486, 25, 198, 23318, 1115, 9040, 329, 10589, 5448, 13]
```

See how each label is the next token from the input? That’s the shift.

## The Mysterious -100 Token (Finally Explained)

Here’s something that took me forever to figure out: we don’t want the model to learn from padding tokens. They’re fake — they don’t represent real content.

## Get Mandar Panse’s stories in your inbox

 from this writer.

PyTorch’s loss function has a trick: any label with value `-100` gets ignored. So we replace all the padding tokens in our labels with -100.

But wait — there’s a subtlety. We keep the *first* padding token because that represents the model learning when to stop (the end-of-sequence token). We only replace the *extra* padding with -100.

```
def prepare_labels(labels, pad_token_id=50256):    """    Replace padding tokens with -100 (except the first one).        Why? PyTorch's CrossEntropyLoss ignores -100 labels.    This means the model doesn't waste time learning to predict padding.    """    labels_processed = labels.clone()        for i in range(labels.shape[0]):        # Find all padding positions        pad_positions = (labels[i] == pad_token_id).nonzero(as_tuple=True)[0]                # Replace all but the first padding token        if len(pad_positions) > 1:            labels_processed[i, pad_positions[1:]] = -100        return labels_processed# Apply itprocessed_labels = prepare_labels(sample_labels)print("Original labels (last 10):", sample_labels[0][-10:].tolist())print("Processed labels (last 10):", processed_labels[0][-10:].tolist())
```

Output:

```
Original labels (last 10): [13, 50256, 50256, 50256, 50256, 50256, 50256, 50256, 50256, 50256]Processed labels (last 10): [13, 50256, -100, -100, -100, -100, -100, -100, -100, -100]
```

During training, the loss function sees -100 and goes “okay, ignore this token completely.” This is huge because:

1.  The model doesn’t waste capacity learning meaningless padding patterns
2.  Loss calculation is accurate (only reflects real content)
3.  Training is faster

## PyTorch DataLoaders (The Unsung Hero)

DataLoaders handle all the annoying logistics of batching and loading data. Think of it as your training pipeline manager.

```
from torch.utils.data import Dataset, DataLoaderimport torchclass InstructionDataset(Dataset):    """    Custom dataset that handles tokenization and label creation.    """    def __init__(self, data, tokenizer, max_length=512):        self.data = data        self.tokenizer = tokenizer        self.max_length = max_length        def __len__(self):        return len(self.data)        def __getitem__(self, idx):        text = self.data[idx]['text']                # Tokenize        encoding = self.tokenizer(            text,            truncation=True,            max_length=self.max_length,            padding='max_length',            return_tensors='pt'        )                input_ids = encoding['input_ids'].squeeze(0)        attention_mask = encoding['attention_mask'].squeeze(0)                # Create labels        labels = torch.cat([input_ids[1:], torch.tensor([self.tokenizer.pad_token_id])])                # Replace extra padding with -100        pad_positions = (labels == self.tokenizer.pad_token_id).nonzero(as_tuple=True)[0]        if len(pad_positions) > 1:            labels[pad_positions[1:]] = -100                return {            'input_ids': input_ids,            'attention_mask': attention_mask,            'labels': labels        }# Create datasetstrain_dataset = InstructionDataset(train_data, tokenizer)val_dataset = InstructionDataset(val_data, tokenizer)test_dataset = InstructionDataset(test_data, tokenizer)# Create dataloaderstrain_loader = DataLoader(    train_dataset,    batch_size=8,    shuffle=True,  # Randomize order each epoch    num_workers=4,    pin_memory=True)val_loader = DataLoader(val_dataset, batch_size=8, shuffle=False, num_workers=4)test_loader = DataLoader(test_dataset, batch_size=8, shuffle=False, num_workers=4)print(f"Training batches: {len(train_loader)}")print(f"Validation batches: {len(val_loader)}")
```

What DataLoaders give you:

-   Automatic batching
-   Background loading (data loads while GPU trains)
-   Shuffling
-   Multi-process loading for speed
-   Memory efficiency

Without them, you’d be writing a ton of boilerplate. Not worth it.

## Actually Training the Model

Alright, time for the main event.

## Loading the Base Model

We’ll use GPT-2. It’s small (124M parameters) so it trains fast, and it’s well-documented.

```
from transformers import AutoModelForCausalLMimport torchdevice = torch.device('cuda' if torch.cuda.is_available() else 'cpu')print(f"Using: {device}")# Load modelmodel = AutoModelForCausalLM.from_pretrained(    "gpt2",    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32)model = model.to(device)print(f"Parameters: {model.num_parameters():,}")
```

## Testing Before Fine-Tuning

Let’s see what the base model does (spoiler: it won’t follow instructions well):

```
from transformers import pipelinegenerator = pipeline('text-generation', model=model, tokenizer=tokenizer, device=0 if torch.cuda.is_available() else -1)test_prompt = """### Instruction:Write a haiku about AI.### Input:### Response:"""output = generator(test_prompt, max_length=100, temperature=0.7, do_sample=True, pad_token_id=tokenizer.eos_token_id)print(output[0]['generated_text'])
```

You’ll probably get something that doesn’t follow the instruction at all. It might start explaining things or go off on a tangent. That’s because base GPT-2 wasn’t trained to follow instruction formats.

## The Training Setup

Time to fix that. We’ll use AdamW (Adam with weight decay), which is the standard optimizer for transformers.

```
from torch.optim import AdamWfrom transformers import get_linear_schedule_with_warmupfrom torch.nn import CrossEntropyLossfrom tqdm import tqdmimport numpy as np# Hyperparameterslearning_rate = 5e-5  # Small to avoid catastrophic forgettingnum_epochs = 3warmup_steps = 500# Optimizeroptimizer = AdamW(    model.parameters(),    lr=learning_rate,    weight_decay=0.01)# Learning rate schedulertotal_steps = len(train_loader) * num_epochsscheduler = get_linear_schedule_with_warmup(    optimizer,    num_warmup_steps=warmup_steps,    num_training_steps=total_steps)print(f"Total training steps: {total_steps:,}")
```

## **Quick explanation of hyperparameters:**

**Learning rate (5e-5)**: How big of steps we take when updating weights. Too high = unstable training, too low = slow training. 5e-5 is the sweet spot for fine-tuning.

**Epochs (3)**: How many times we go through the entire dataset. 3 is usually enough for instruction fine-tuning. More risks overfitting.

**Weight decay (0.01)**: Regularization to prevent overfitting. Adds a small penalty for large weights.

**Warmup steps (500)**: Gradually increase learning rate at the start. Prevents instability in early training.

## The Training Loop

```
def train_one_epoch(model, loader, optimizer, scheduler, device):    model.train()    total_loss = 0        progress = tqdm(loader, desc="Training")    for batch in progress:        # Move to GPU        input_ids = batch['input_ids'].to(device)        attention_mask = batch['attention_mask'].to(device)        labels = batch['labels'].to(device)                # Forward pass        outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)        loss = outputs.loss                # Backward pass        loss.backward()        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)  # Prevent exploding gradients                # Update weights        optimizer.step()        scheduler.step()        optimizer.zero_grad()                total_loss += loss.item()        progress.set_postfix({'loss': f'{loss.item():.4f}'})        return total_loss / len(loader)def validate(model, loader, device):    model.eval()    total_loss = 0        with torch.no_grad():        for batch in tqdm(loader, desc="Validating"):            input_ids = batch['input_ids'].to(device)            attention_mask = batch['attention_mask'].to(device)            labels = batch['labels'].to(device)                        outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)            total_loss += outputs.loss.item()        return total_loss / len(loader)
```

## Run Training

```
best_val_loss = float('inf')for epoch in range(num_epochs):    print(f"\nEpoch {epoch + 1}/{num_epochs}")    print("-" * 50)        train_loss = train_one_epoch(model, train_loader, optimizer, scheduler, device)    val_loss = validate(model, val_loader, device)        # Perplexity (lower is better)    train_ppl = np.exp(train_loss)    val_ppl = np.exp(val_loss)        print(f"Train Loss: {train_loss:.4f} (PPL: {train_ppl:.2f})")    print(f"Val Loss: {val_loss:.4f} (PPL: {val_ppl:.2f})")        # Save if best    if val_loss < best_val_loss:        best_val_loss = val_loss        model.save_pretrained("./best_model")        tokenizer.save_pretrained("./best_model")        print("Saved new best model!")print("\nTraining done!")
```

Watch the validation loss. If it starts going up while training loss keeps dropping, you’re overfitting. That’s your signal to stop.

## Evaluation (The Part Everyone Forgets)

Training is done. But how do you know if it actually worked?

## Quantitative: Test Set Performance

```
# Load best modelmodel = AutoModelForCausalLM.from_pretrained("./best_model").to(device)# Evaluate on test settest_loss = validate(model, test_loader, device)test_ppl = np.exp(test_loss)print(f"Test Loss: {test_loss:.4f}")print(f"Test Perplexity: {test_ppl:.2f}")
```

Perplexity is a measure of how “surprised” the model is by the test data. Lower is better. If you got from 15 to 6, that’s a huge improvement.

## Qualitative: Actually Try It

Numbers are fine, but you need to see if it actually works:

```
def generate_response(instruction, max_length=200):    prompt = f"""### Instruction:{instruction}### Input:### Response:"""        inputs = tokenizer(prompt, return_tensors='pt').to(device)        with torch.no_grad():        outputs = model.generate(            **inputs,            max_length=max_length,            temperature=0.7,            top_p=0.9,            do_sample=True,            pad_token_id=tokenizer.eos_token_id        )        response = tokenizer.decode(outputs[0], skip_special_tokens=True)    return response.split("### Response:")[-1].strip()# Test ittest_cases = [    "Write a haiku about machine learning.",    "Explain recursion to a 10-year-old.",    "Create a Python function to reverse a string.",]for instruction in test_cases:    print(f"\nInstruction: {instruction}")    print(f"Response: {generate_response(instruction)}")    print("-" * 50)
```

Actually read the outputs. Are they following instructions? Are they coherent? Are they helpful?

## Human Evaluation (The Gold Standard)

Get real humans to rate responses on:

1.  Does it follow the instruction? (1–5)
2.  Is it accurate/helpful? (1–5)
3.  Is it coherent? (1–5)

Sample 50–100 examples, get 3 people to rate each one, average the scores.

## LLM-as-Judge (When You Need Scale)

You can use Claude or GPT-4 to evaluate outputs:

```
# Using Anthropic's API (you need an API key)import anthropicdef llm_evaluate(instruction, response):    client = anthropic.Anthropic(api_key="your-key")        eval_prompt = f"""Rate this AI response on a scale of 1-5:Instruction: {instruction}Response: {response}Criteria:- Instruction following (did it do what was asked?)- Quality (is it accurate and helpful?)- Coherence (is it clear and well-structured?)Provide scores and brief reasoning."""        message = client.messages.create(        model="claude-3-5-sonnet-20241022",        max_tokens=500,        messages=[{"role": "user", "content": eval_prompt}]    )        return message.content[0].text# Use itfor instruction in test_cases:    response = generate_response(instruction)    evaluation = llm_evaluate(instruction, response)    print(f"\nInstruction: {instruction}")    print(f"Evaluation:\n{evaluation}")
```

This scales better than human eval but isn’t perfect. LLMs can be biased toward responses that match their own style.

## Things That Will Bite You (Learn From My Mistakes)

**Overfitting**: Training loss goes down, validation loss goes up. Solution: stop training earlier, add more data, or use stronger regularization.

**Catastrophic forgetting**: Model loses its general knowledge. Solution: use small learning rates, don’t train too long.

**Data quality**: Garbage in, garbage out. One bad batch of training data can ruin everything. Always manually review samples.

**Wrong label preparation**: If you mess up the -100 token replacement or the label shifting, your model will train but learn nonsense. Double-check your data prep code.

**Learning rate too high**: Training becomes unstable, loss explodes. Start with 5e-5 and go lower if needed.

**Not enough data**: 500 examples is bare minimum. Ideally you want 10k+. Quality matters more than quantity though.

## Wrapping Up

So that’s instruction fine-tuning. The key steps:

1.  Format your data consistently (### Instruction / ### Response pattern)
2.  Split into train/val/test (don’t skip validation!)
3.  Tokenize and pad to fixed length
4.  Shift labels right by 1 for next-token prediction
5.  Replace extra padding with -100
6.  Use DataLoaders for efficient batching
7.  Train with small learning rate (5e-5) and AdamW
8.  Watch validation loss like a hawk
9.  Evaluate with metrics, humans, and LLM judges

The thing is, most of this is just plumbing. The real art is in the data — curating good examples, ensuring diversity, maintaining quality.

And honestly? Sometimes you don’t need fine-tuning at all. Try prompt engineering first. If that hits a wall, then fine-tune.

But when you do need it, now you know how it actually works.

## Resources

-   [Alpaca Dataset](https://github.com/tatsu-lab/stanford_alpaca)
-   [Hugging Face Transformers Docs](https://huggingface.co/docs/transformers)
-   [PyTorch Tutorial](https://pytorch.org/tutorials/)
-   Questions? Leave a comment below.