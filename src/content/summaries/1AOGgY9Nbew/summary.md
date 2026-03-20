---
metadata:
  videoId: "1AOGgY9Nbew"
  title: "AWS AI Practitioner Question 21: Speech to Text"
  description: "For the AWS AI Practitioner exam, the correct service for converting thousands of customer call recordings into text is Amazon Transcribe. Unlike Amazon Polly, which performs text-to-speech, or Amazon Translate and Amazon Comprehend, which require text inputs for translation or analysis, Transcribe is built for audio-to-text conversion with features like speaker identification and multi-language support.  Effectively, Transcribe writes what is spoken, making it the essential first step for analyzing voice data.


    #AWS #CloudComputing #MachineLearning #AmazonTranscribe #AIPractitioner #TechTips #AWSCertification #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M20S"
  publishedAt: "2026-03-11T13:00:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/1AOGgY9Nbew/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=1AOGgY9Nbew"
processedAt: "2026-03-11T16:35:07.049Z"
source: "youtube"
tldr: "For converting thousands of customer support call recordings to text for analysis, use Amazon Transcribe, which specializes in speech-to-text transcription with speaker identification."
tools:
  - name: "Amazon Transcribe"
    url: null
  - name: "Amazon Polly"
    url: null
  - name: "Amazon Translate"
    url: null
  - name: "Amazon Comprehend"
    url: null
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "DevOps & Infrastructure"
tags:
  - "ai-general"
  - "analytics"
  - "aws"
  - "machine-learning"
  - "nlp"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2003
  outputTokens: 577
  totalTokens: 2580
  processingTimeMs: 138538
tagsNormalizedAt: "2026-03-12T16:14:09.960Z"
---

## Key Takeaways

This video explains how to choose the correct AWS AI service for converting audio to text. • **Amazon Transcribe** is the correct service for **speech-to-text** conversion from audio/video files. • **Amazon Polly** does the opposite (text-to-speech). • **Amazon Translate** converts text between languages, not audio. • **Amazon Comprehend** analyzes text for sentiment/entities but doesn't transcribe.

## Summary

This exam prep question presents a scenario where a company needs to convert thousands of customer support call recordings to text for analyzing common complaints. The key requirement is speech-to-text conversion from audio files.

### Service Differentiation

The video clearly distinguishes between four AWS AI services:

- **Amazon Transcribe**: Specializes in converting speech to text from audio and video files, supporting multiple languages and speaker identification.

- **Amazon Polly**: Performs the opposite function

- converting text to speech (text-to-speech).

- **Amazon Translate**: Translates text between different languages but doesn't work with audio files directly.

- **Amazon Comprehend**: Analyzes text for sentiment, entities, and other insights but requires text input rather than audio.

### Memory Aid

A simple mnemonic is provided: "Speech to text equals transcribe. Text to speech equals poly." This helps avoid confusing the two services during exams or real-world implementations.

The correct solution is Amazon Transcribe because it directly addresses the core requirement of converting audio recordings to analyzable text format, which can then be processed further for insights into customer complaints.

## Context

This video is part of AWS AI Practitioner certification exam preparation, focusing on practical service selection scenarios. Understanding which AWS AI service to use for specific tasks is crucial for both certification success and real-world cloud implementations. As companies increasingly rely on voice data from customer interactions, knowing how to properly convert and analyze this data using cloud services becomes essential for data-driven decision making.