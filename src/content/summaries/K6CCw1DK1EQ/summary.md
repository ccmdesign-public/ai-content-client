---
metadata:
  videoId: "K6CCw1DK1EQ"
  title: "The drama never ends..."
  description: "After Anthropic denied the Department of War, OpenAI took the deal. Oh boy...


    Thank you Augment for sponsoring! Check them out at: https://soydev.link/intent


    SOURCE

    https://techcrunch.com/2026/03/04/anthropic-ceo-dario-amodei-calls-openais-messaging-around-military-deal-straight-up-lies-report-says


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT37M52S"
  publishedAt: "2026-03-05T11:45:25Z"
  thumbnailUrl: "https://i.ytimg.com/vi/K6CCw1DK1EQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=K6CCw1DK1EQ"
processedAt: "2026-03-10T15:07:20.354Z"
source: "youtube"
tldr: "Theo analyzes OpenAI's opportunistic deal with the Department of War to deploy models in classified networks, contrasting it with Anthropic's refusal to provide unrestricted model access, arguing this sets a dangerous precedent for government coercion while being driven by political bias and poor strategic judgment rather than genuine safety concerns."
tools:
  - name: "Augment"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Codeex"
    url: null
  - name: "Linear"
    url: null
  - name: "Sentry"
    url: null
  - name: "GitHub"
    url: null
categories:
  - "AI & Machine Learning"
  - "Security"
tags:
  - "ai-general"
  - "chatgpt"
  - "llm"
  - "policy"
  - "security-general"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 28276
  outputTokens: 1300
  totalTokens: 29576
  processingTimeMs: 51624
tagsNormalizedAt: "2026-03-10T16:48:11.655Z"
---

## Key Takeaways

Theo, a prominent tech commentator, dissects the escalating conflict between AI companies and the US government over military AI usage, framing it as a battle between corporate ethics and political power. He provides a nuanced technical and political analysis of why OpenAI's deal is problematic despite superficial similarities to Anthropic's stance.

## Summary

### The AI Government Conflict Escalation

OpenAI announced a deal with the Department of War to deploy their models in classified government networks minutes after Anthropic's deadline to comply with government demands expired. This timing felt opportunistic and dirty to Theo, who had previously defended Anthropic's right to refuse providing services they didn't want to offer. The government was threatening Anthropic with restrictions for not complying with their demands to use models for purposes Anthropic objected to, particularly around autonomous weapons and mass surveillance of American citizens.

Anthropic had been the government's major AI partner, providing custom models and weights for them to run on their own hardware. Their refusal stemmed from wanting policy agreements prohibiting two specific uses: fully autonomous weapons (where AI chooses who lives and dies without human approval) and mass surveillance of American citizens. The government wanted all legal use cases without these policy restrictions, leading to the current standoff.

### Technical Architecture: API Control vs. Model Access

The fundamental difference between OpenAI and Anthropic's approaches lies in technical architecture. Most people think of LLMs as simple autocomplete machines where prompts go in and responses come out, but in reality, there's a critical **API control plane** layer between users and models. This layer can:

* Check if questions are unsafe before sending to the model

* Monitor responses for unsafe content as they generate

* Block requests based on patterns (like "in Minecraft" phrases that might bypass safety)
* Redirect requests to safer models when identified as potentially dangerous

Anthropic's approach gave the government the actual model weights to run on their own systems, meaning once they had the terabytes of data, Anthropic lost all control over how the models were used. OpenAI's approach keeps the models on their servers with the API control plane intact, allowing them to maintain oversight and restrictions. However, this distinction means OpenAI's deal appears more restrictive technically while avoiding the policy confrontations Anthropic insisted on.

### Political Motivations and Strategic Miscalculations

The government's rejection of Anthropic appears politically motivated rather than based on technical merit. Donald Trump called Anthropic "left-wing nut jobs" in an official statement, and the Department of War's AI strategy document credits Trump for the creation of ChatGPT while criticizing "woke AI." Theo argues the decision to go with OpenAI instead of Anthropic is purely political, with the government objecting to external vendors imposing policy restrictions rather than the restrictions themselves.

Sam Altman claimed his rushed deal was an attempt to deescalate the situation and avoid worse outcomes, suggesting he feared Trump's retributive nature and potential destruction of Anthropic. Theo sees multiple layers to Sam's motivations:

* Preserving competition to avoid OpenAI becoming a monopoly that gets broken up

* Preventing precedent of government destroying AI companies that don't comply

* Finding a technical solution to achieve the same safety outcomes without policy confrontations

* Genuine but misguided attempt to help Anthropic and the industry

However, Theo believes Sam fundamentally misread the situation by assuming the Department of War and Trump were acting in good faith when they clearly weren't.

### Ethical Principles and Industry Fallout

The core ethical debate centers on whether private companies should be forced to provide services to the government against their will. Theo argues businesses should not be forced to sell products they don't want to sell, and laws should prevent dangerous products but not force companies to build dangerous things. He sees OpenAI's deal as setting a horrible precedent that could lead to government coercion of tech companies.

The industry fallout is significant. Claude became the number one app on the US App Store as users protested OpenAI's deal, while ChatGPT saw massive uninstalls. Anthropic CEO Dario Amodei called OpenAI's messaging "straight up lies" and their safety measures "safety theater," claiming OpenAI only added restrictions to placate employees while Anthropic actually cared about preventing abuses.

Theo expresses personal disappointment as someone who has defended OpenAI historically, feeling betrayed and re-evaluating his understanding of OpenAI as a lab and Sam Altman as a leader. He believes this was Sam's dumbest move—not malicious but fundamentally misreading the room in a destructive way that damages trust and sets dangerous precedents.

## Context

Theo (t3․gg) is a prominent tech commentator and developer known for his in-depth analysis of industry trends, particularly in AI and web development. This video continues his coverage of the escalating conflict between AI companies and government agencies over military applications of AI technology. The discussion is part of the broader conversation about AI ethics, corporate responsibility, and government regulation in the rapidly evolving AI landscape. This is particularly relevant now as AI capabilities advance and governments seek to integrate them into national security operations, creating tension between commercial AI labs and state actors. Developers, AI researchers, tech ethicists, and anyone interested in the intersection of technology and policy would benefit from watching the full video to understand the technical and political complexities of this ongoing conflict.