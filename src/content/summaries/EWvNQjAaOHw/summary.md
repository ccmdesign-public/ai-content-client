---
metadata:
  videoId: "EWvNQjAaOHw"
  title: "How I use LLMs"
  description: "The example-driven, practical walkthrough of Large Language Models and their growing list of related features, as a new entry to my general audience series on LLMs. In this more practical followup, I take you through the many ways I use LLMs in my own life.


    Chapters

    00:00:00 Intro into the growing LLM ecosystem

    00:02:54 ChatGPT interaction under the hood

    00:13:12 Basic LLM interactions examples

    00:18:03 Be aware of the model you're using, pricing tiers

    00:22:54 Thinking models and when to use them

    00:31:00 Tool use: internet search

    00:42:04 Tool use: deep research

    00:50:57 File uploads, adding documents to context

    00:59:00 Tool use: python interpreter, messiness of the ecosystem

    01:04:35 ChatGPT Advanced Data Analysis, figures, plots

    01:09:00 Claude Artifacts, apps, diagrams

    01:14:02 Cursor: Composer, writing code

    01:22:28 Audio (Speech) Input/Output

    01:27:37 Advanced Voice Mode aka true audio inside the model

    01:37:09 NotebookLM, podcast generation

    01:40:20 Image input, OCR

    01:47:02 Image output, DALL-E, Ideogram, etc.

    01:49:14 Video input, point and talk on app

    01:52:23 Video output, Sora, Veo 2, etc etc.

    01:53:29 ChatGPT memory, custom instructions

    01:58:38 Custom GPTs

    02:06:30 Summary


    Links

    - Tiktokenizer https://tiktokenizer.vercel.app/

    - OpenAI's ChatGPT https://chatgpt.com/

    - Anthropic's Claude https://claude.ai/

    - Google's Gemini https://gemini.google.com/

    - xAI's Grok https://grok.com/

    - Perplexity https://www.perplexity.ai/

    - Google's NotebookLM https://notebooklm.google.com/

    - Cursor https://www.cursor.com/

    - Histories of Mysteries AI podcast on Spotify  https://open.spotify.com/show/3K4LRyMCP44kBbiOziwJjb


    - The visualization UI I was using in the video: https://excalidraw.com/

    - The specific file of Excalidraw we built up: https://drive.google.com/file/d/1DN3LU3MbKI00udxoS-W5ckCHq99V0Uqs/view?usp=sharing

    - Discord channel for Eureka Labs and this video: https://discord.gg/3zy8kqD9Cp


    Educational Use Licensing

    This video is freely available for educational and internal training purposes. Educators, students, schools, universities, nonprofit institutions, businesses, and individual learners may use this content freely for lessons, courses, internal training, and learning activities, provided they do not engage in commercial resale, redistribution, external commercial use, or modify content to misrepresent its intent."
  channel: "Andrej Karpathy"
  channelId: "UCXUPKJO5MZQN11PqgIvyuvQ"
  duration: "PT2H11M12S"
  publishedAt: "2025-02-27T22:29:56Z"
  thumbnailUrl: "https://i.ytimg.com/vi/EWvNQjAaOHw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=EWvNQjAaOHw"
processedAt: "2026-03-24T01:46:18.400Z"
source: "youtube"
tldr: "Andrej Karpathy provides a comprehensive guide to practical LLM usage in 2025, explaining how to think of models as probabilistic 'zip files' of internet knowledge and demonstrating their capabilities through examples of knowledge queries, reasoning, internet search, deep research, file analysis, code generation, multimodal interaction, and custom GPT creation."
tools:
  - name: "ChatGPT"
    url: "https://chatgpt.com"
  - name: "Claude"
    url: "https://claude.ai"
  - name: "Gemini"
    url: "https://gemini.google.com"
  - name: "Grok"
    url: "https://grok.x.ai"
  - name: "Perplexity"
    url: "https://www.perplexity.ai"
  - name: "DeepSeek"
    url: null
  - name: "Cursor"
    url: "https://cursor.sh"
  - name: "Superwhisper"
    url: null
  - name: "NotebookLM"
    url: "https://notebooklm.google.com"
  - name: "DALL-E"
    url: null
  - name: "Ideogram"
    url: null
  - name: "Anki"
    url: null
  - name: "Mermaid"
    url: "https://mermaid.js.org"
  - name: "React"
    url: "https://react.dev"
  - name: "Chatbot Arena"
    url: "https://chat.lmsys.org"
categories:
  - "AI & Machine Learning"
tags:
  - "chatgpt"
  - "llm"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 81437
  outputTokens: 2090
  totalTokens: 83527
  processingTimeMs: 273136
tagsNormalizedAt: "2026-03-24T04:13:51.255Z"
---

## Key Takeaways

Karpathy frames LLMs as powerful but probabilistic tools that require understanding their architecture, limitations, and available features for effective use. Key insights include:

* **Think of LLMs as 'zip files'** – they are compressed, probabilistic representations of internet knowledge with a cutoff date, not exact databases.

* **Use the right model for the task** – distinguish between standard, 'thinking' (reasoning), and multimodal models, and be aware of pricing tiers (free, plus, pro) which grant access to different capabilities.

* **Leverage tools to extend capabilities** – integrate internet search for recent info, Python interpreters for calculations/code, and file uploads for document analysis to overcome the model's inherent knowledge limits.

* **Adopt efficient interaction patterns** – use voice input for speed, start new chats to manage context window 'working memory', and create custom GPTs for repetitive, specialized tasks like language learning.

## Summary

### Introduction and Core Mental Model

Karpathy begins by establishing a foundational mental model for interacting with large language models like ChatGPT. He describes an LLM as a probabilistic 'zip file' – a neural network with parameters (e.g., one trillion) trained to predict the next token in a sequence. This training compresses a vast amount of internet knowledge, but the compression is lossy and vague. The model has a knowledge cutoff (e.g., from its pre-training months or years ago) and a 'persona' shaped by post-training. Therefore, users should treat its knowledge as a fuzzy recollection, not a guaranteed fact, especially for niche or recent information.

The basic interaction is a collaborative building of a one-dimensional token sequence (the context window). Karpathy emphasizes managing this 'working memory' as a precious resource: start new chats when switching topics to avoid distraction, slow performance, and unnecessary cost. He also stresses the importance of knowing which model you're using (e.g., GPT-4o, GPT-4o Mini, Claude 3.5 Sonnet) as capabilities and costs vary significantly across providers (OpenAI, Anthropic, Google, xAI) and their pricing tiers.

### Knowledge Queries and Reasoning Models

For straightforward knowledge questions about common, non-recent topics (e.g., caffeine in an Americano, ingredients in NyQuil), the base 'zip file' model is often sufficient, though verification is advised. For more complex problems in math and coding, 'thinking models' (like OpenAI's o1 series or DeepSeek R1) are essential. These models, trained with reinforcement learning, engage in an internal 'monologue,' exploring and backtracking through problems, which can take minutes but yields higher accuracy on difficult tasks. Karpathy demonstrates this with a coding bug example where a standard model failed, but a thinking model (o1 Pro) successfully identified the issue after a minute of reasoning.

### Tool Use: Internet Search and Deep Research

To access information beyond the model's knowledge cutoff, tool integration is key. The most common tool is internet search. Applications like ChatGPT (with search enabled), Perplexity, and some Gemini models can autonomously query the web, fetch pages, load the text into the context window, and synthesize answers with citations. Karpathy uses this for queries about recent events, product offerings, or travel safety.

A more advanced capability is 'Deep Research' (ChatGPT Pro) or similar features in Perplexity and Grok. Here, the model combines prolonged thinking with extensive internet searches over many minutes to produce detailed, sourced reports on complex topics. Karpathy shows examples researching a supplement ingredient (Ca-AKG) and comparing web browsers. He cautions that these reports are excellent first drafts but must be fact-checked against their citations.

### File Uploads, Code, and Artifacts

Users can provide concrete documents to LLMs via file upload (PDFs, text, images). Karpathy uses this extensively to 'read' papers or books with an AI assistant, asking for summaries and clarifications to improve comprehension and retention. For example, he uploads chapters of Adam Smith's *The Wealth of Nations* to Claude for analysis.

For tasks requiring computation or data visualization, tools like the Python interpreter (in ChatGPT's Advanced Data Analysis) allow the model to write and execute code. Karpathy demonstrates plotting valuation data and fitting trend lines, warning that users must scrutinize the generated code for hidden assumptions or errors.

Claude's 'Artifacts' feature allows the model to generate and run interactive applications directly in the chat. Karpathy creates a flashcard study app and, most usefully, conceptual diagrams (using Mermaid.js) to visually map the arguments of book chapters, aiding in understanding and memory.

### Professional Coding and Multimodal Interaction

For professional software development, Karpathy uses dedicated tools like Cursor, which integrates an LLM (Claude) directly into the IDE. Using features like 'Composer' (agentic coding), he demonstrates 'vibe coding' – describing an app in natural language and letting the AI write the React code, add confetti effects, and sound effects, with the human overseeing and making corrections.

He then covers multimodal interaction. For efficiency, he uses system-wide speech-to-text apps (like Superwhisper) for half his queries. True multimodal models handle audio and video natively. He demos ChatGPT's 'Advanced Voice' mode, having a real-time conversation where the model can see his camera feed, identify books, and measure CO2 levels from a monitor. He also shows Grok's entertaining, less restricted voice modes (Romantic, Unhinged, Conspiracy). For audio output, he highlights NotebookLM's ability to generate custom podcasts from uploaded source documents.

For images, models can analyze uploaded screenshots (e.g., nutrition labels, blood test results, memes) via OCR and provide explanations. Conversely, they can generate images via tools like DALL-E 3 for content creation (e.g., YouTube thumbnails). Video generation models (like Sora, Veo) are noted as rapidly advancing.

### Quality of Life and Customization

Finally, Karpathy covers features that personalize and streamline the experience. ChatGPT's 'Memory' learns about the user over time (e.g., movie preferences) and prepends this info to conversations, making interactions more relevant. 'Custom Instructions' let users set a default tone and style (e.g., 'don't be like an HR business partner'). Most powerfully, 'Custom GPTs' allow the creation of specialized assistants with detailed, few-shot prompts. Karpathy builds several for Korean language learning: a vocabulary extractor for flashcards, a detailed translator that breaks down grammar, and a tool that OCRs and translates screenshot subtitles from TV shows.

### Conclusion and Ecosystem Overview

Karpathy concludes that the LLM ecosystem is rich and fast-moving. While ChatGPT is the most feature-rich incumbent, other apps excel in specific areas: Perplexity for search, Claude for artifacts and long context, Grok for entertainment. The key is to understand the core model (the zip file), know what tools are available (search, code, uploads), and choose the right app and model tier for your specific task, constantly experimenting as the landscape evolves.

## Context

Andrej Karpathy is a leading AI researcher, former Director of AI at Tesla and founding member of OpenAI, renowned for his deep technical explanations of machine learning. This video is part of his 'general audience' series demystifying LLMs, following a previous video on their internal fundamentals. It arrives in early 2025 amidst rapid proliferation of consumer-facing AI tools from OpenAI, Anthropic, Google, xAI, and others, creating confusion about their differing capabilities. The video is highly relevant for anyone—from beginners to professionals—seeking to move beyond basic chatbot use and strategically integrate LLMs as powerful, multifaceted assistants in their work, learning, and daily life. It provides a crucial framework for navigating the complex and shifting landscape of AI applications.