---
metadata:
  videoId: "Vbws3a_OmBM"
  title: "Claude Code Let's Build: The AI Video Oracle (Qwen3 TTS)"
  description: "Claude Code Let's Build: The AI Video Oracle (Qwen3 TTS)


    👊 Become a YouTube Member to Support Me:

    https://www.youtube.com/c/AllAboutAI/join


    My AI Video Course:

    https://www.theaivideocourse.com/


    🔥Open GH:

    https://github.com/AllAboutAI-YT/


    Business Inquiries:

    kbfseo@gmail.com"
  channel: "All About AI"
  channelId: "UCR9j1jqqB5Rse69wjUnbYwA"
  duration: "PT10M5S"
  publishedAt: "2026-01-23T19:00:24Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Vbws3a_OmBM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Vbws3a_OmBM"
processedAt: "2026-01-24T16:13:15.719Z"
source: "youtube"
tldr: "This video demonstrates building a local AI video pipeline using Claude Code to combine Google's Gemini 3 Flash for research, the new Qwen3 TTS 1.7B model for voice cloning, and the Omnihuman model to generate animated VTuber-style answer videos from any text question."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2738
  outputTokens: 870
  totalTokens: 3608
  processingTimeMs: 25111
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tools:
  - name: "Claude Code"
    url: null
  - name: "Gemini 3 Flash"
    url: null
  - name: "Qwen3 TTS"
    url: null
  - name: "Omnihuman"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "ai-coding"
  - "gemini"
  - "llm"
  - "nlp"
tagsNormalizedAt: "2026-03-01T21:19:30.386Z"
---

## Key Takeaways

The creator built a fully functional local AI video generation pipeline using Claude Code for rapid development. Key insights include:

*   **Local, Cost-Effective AI Pipeline:** Successfully combined three AI models (Gemini 3 Flash for research, Qwen3 TTS for voice cloning, Omnihuman for video generation) to create a question-to-video answer system running locally on a Mac

Book.

*   **Impressive Qwen3 TTS Performance:** The new 1.7B parameter Qwen3 TTS model provides surprisingly good voice cloning quality for its small size, offering a free local alternative to services like Eleven

Labs for long-form content.

*   **Future of Content Creation:** The pipeline prototypes a potential future where platforms like You

Tube could generate personalized, on-demand video answers instead of serving pre-recorded creator content.

## Summary

The video is a hands-on coding session where the creator builds a multi-step AI pipeline using Claude Code. The goal is to create an "AI Video Oracle" that can answer any question by researching online, generating a voice response, and creating a final animated video.

### The Pipeline Architecture
The system works in six distinct steps:
1.  A user inputs a question (e.g., "Will there be a season 3 of Severance in 2026?").
2.  **Gemini 3 Flash** conducts web research and condenses the answer into a 50-word, 2-3 sentence summary.
3.  The text answer is passed to the **Qwen3 TTS 1.7B model**. Using a reference audio file (a VTuber voice clip), it clones the voice to speak the generated text, outputting an audio file.
4.  This audio, along with a static character image, is sent to the **Omnihuman model**.
5.  Omnihuman generates a video with a lip-synced, animated avatar.
6.  The final MP4 video answer is retrieved and saved.

The creator emphasizes that Claude Code was instrumental in rapidly assembling this pipeline by helping to gather and implement the necessary documentation from the various model repositories (Gemini, Qwen, Omnihuman).

### Testing and Results
In a live demo, the pipeline successfully generated a video answering the *Severance* question in about 5-7 minutes. The answer, while not perfectly accurate, demonstrated a functional workflow. A second test with a time-sensitive question ("What did Daario Amadei say at Davos 2026?") yielded an up-to-date and correct answer about chip exports and AI automation, proving the system's capacity for current research.

The creator was particularly impressed with the **Qwen3 TTS model's performance on a Mac

Book (using MPS)**, noting its speed and decent quality for a local, free model. He suggests it's ideal for projects where premium voice quality isn't critical but cost or privacy is a concern.

### Future Vision and Inspiration
The project was inspired by a vision of future content consumption, where platforms could generate personalized video answers on-demand. The video concludes by showing that with current tools like Claude Code and accessible open-source models, building complex, local AI media pipelines is now feasible for developers.

## Context

This demonstration sits at the intersection of several key AI trends: the rise of powerful, small-footprint open-source models (like Qwen3), the growing capability for local AI processing, and the automation of multimedia content creation. It matters to developers, content creators, and AI enthusiasts as it showcases a practical, integrated application of multiple AI modalities (text, speech, video) without relying on expensive cloud APIs. It points toward a future of highly personalized, AI-generated media and democratizes tools that were recently inaccessible outside of large tech companies.