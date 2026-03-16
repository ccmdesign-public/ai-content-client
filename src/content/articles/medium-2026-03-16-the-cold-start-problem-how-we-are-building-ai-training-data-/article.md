---
title: "The Cold Start Problem: How We Are Building AI Training Data From Scratch"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/the-cold-start-problem-how-we-are-building-ai-training-data-from-scratch-2b530bfc639b?source=rss----98111c9905da---4"
publishedAt: "2026-03-16"
tags:
  - "ai-general"
  - "machine-learning"
  - "policy"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Security"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-16T16:37:52.615Z"
---

# The Cold Start Problem: How We Are Building AI Training Data From Scratch

# The Cold Start Problem: How We Are Building AI Training Data From Scratch

## Every AI system needs data to learn from. When that data does not exist for your target community, you face one of the hardest problems in machine learning. Here is how we are solving it.

[Pride Chamisa](https://medium.com/@pchamisa?source=post_page---byline--2b530bfc639b---------------------------------------)

8 min read·1 day ago

\--

![]()

*By Pride Chamisa, Founder of VidSentry*

There is a problem that sits at the foundation of every AI system built for underrepresented communities, and it does not get talked about enough outside of machine learning research circles.

It is called the cold start problem.

In its simplest form, it goes like this: to build an accurate AI model, you need high-quality training data. To get high-quality training data for African languages and cultural contexts, you need existing examples of that data labelled correctly. But correctly labelled examples of African linguistic and cultural content, at the scale required to train production-quality AI systems, largely do not exist.

You need the data to build the model. You need the model to process the data. Neither exists yet in sufficient quantity for the communities you are trying to serve.

This is not a minor technical inconvenience. It is the foundational engineering challenge of building AI for the Global South, and the way you resolve it determines everything about the quality and cultural accuracy of the system you end up with.

Here is exactly how we are approaching it at VidSentry.

## Why the Cold Start Problem Is Worse for African Content Than Almost Any Other Domain

To appreciate the scale of the challenge, it helps to understand what training data for content moderation actually requires, and how different that requirement is for African content versus the content that most AI systems were trained on.

A content moderation training dataset needs labelled examples of harmful content and non-harmful content across every category the system will moderate: hate speech, incitement, graphic violence, harassment, misinformation, and their countless contextual variations. Each example needs to be labelled not just as harmful or not harmful, but with enough contextual annotation to teach the model *why* it is harmful and in what contexts similar content should be treated differently.

For English-language content, this labelled data exists at enormous scale. Decades of internet content, combined with years of platform moderation decisions and academic annotation projects, have produced training corpora that, while imperfect, give AI systems a substantial foundation to learn from.

For Hausa, for Yoruba, for isiZulu, for Amharic, for the hundreds of regional dialects and code-switching patterns that characterise African digital communication, that foundation is close to nonexistent.

***The gap is not a matter of degree. It is a matter of kind.***

Building a content moderation system for African languages is not an extension of building one for English. It is starting from near-zero in both the raw data and the annotated training examples, for communities whose communication patterns are complex enough that getting the annotation right requires deep cultural expertise that is itself rare and difficult to scale.

## The Three Approaches We Rejected

Before explaining what we are doing, it is worth being honest about what we considered and decided against, because the rejected approaches reveal the shape of the problem as clearly as the chosen one.

***Approach 1: Transfer Learning from English Models***

The most common solution to the cold start problem in low-resource language AI is transfer learning: taking a model trained on high-resource language data and fine-tuning it on a smaller dataset of the target language.

Transfer learning is genuinely powerful and we use elements of it in our architecture. But as the primary strategy for content moderation in African languages, it has a fundamental limitation: it transfers not just the model’s language capability but its cultural assumptions. A model that has learned what harmful content looks like in English, fine-tuned on a small Swahili dataset, will still interpret Swahili content through an English-trained lens for the categories and edge cases not well-represented in the fine-tuning data.

For content moderation (where the edge cases are precisely the cases that matter most) that transferred cultural lens is the thing we are specifically trying to avoid.

***Approach 2: Synthetic Data Generation***

Generate training examples using large language models rather than collecting real-world data. Instruct a generative model to produce examples of harmful and non-harmful content in target languages and use those synthetic examples to train the moderation system.

Synthetic data generation is a useful tool in specific contexts. For training a content moderation system on African languages, it fails at the most important point: the synthetic examples reflect the generative model’s understanding of African linguistic and cultural norms, which is, as established, limited and often wrong. You are training one culturally-biased system on the outputs of another culturally-biased system. The errors compound rather than cancel.

***Approach 3: Crowdsourced Annotation at Scale***

Deploy large-scale annotation platforms (the kind that power most major AI training datasets) to label African language content using distributed annotators recruited from global annotation marketplaces.

## Get Pride Chamisa’s stories in your inbox

 from this writer.

Remember me for faster sign in

The problem is the same one identified in the [ethics piece published earlier in this series](https://medium.com/towards-artificial-intelligence/ethics-in-ai-who-decides-what-is-harmful-6a566f075e80): annotators recruited from global platforms bring their own cultural frameworks to the annotation task. An annotator in one region labelling content from a community in another region, using guidelines written by a company in a third region, is not producing culturally accurate ground truth. They are producing culturally approximate ground truth and calling it training data.

For a system whose entire value proposition rests on cultural accuracy, approximate is not acceptable.

## What We Are Actually Doing

Our approach to the cold start problem rests on three principles that we identified early and have held to consistently: **community sourcing, expert annotation, and active learning.**

![VidSentry cold start AI training data strategy — community sourcing expert annotation active learning.]()

***Community Sourcing: Starting With Real Data From Real Communities***

The foundation of our training data strategy is direct partnership with communities, platforms, and content ecosystems that generate the real-world African language content our system needs to learn from.

This means working with local platforms and broadcasters to access (under appropriate privacy and consent frameworks) real examples of the content their moderation systems are processing. It means partnering with African digital media organisations whose archives contain years of contextually rich content across multiple languages. It means building relationships with creator communities who understand that participating in training data development serves their own long-term interest in having moderation systems that actually understand their communication.

Real data from real communities, collected with genuine consent and transparency, is the only foundation on which a culturally accurate training dataset can be built. There is no shortcut to this. It is slow, relationship-intensive work. It is also the work that determines whether the system that comes out the other end is genuinely capable or superficially adequate.

***Expert Annotation: Cultural Knowledge as a Technical Input***

Raw data is not training data. Raw data becomes training data through annotation, the process of labelling examples so the model can learn from them.

Our annotation process is built around a network of culturally embedded expert annotators: people who are not just fluent in the target language but are native participants in the specific cultural and regional contexts the content comes from. A Yoruba-speaking annotator labelling content from Lagos Pidgin communities. A Swahili speaker with specific knowledge of Kenyan political discourse labelling political commentary content. A South African annotator with deep familiarity with Cape Town code-switching patterns labelling mixed-language content from that community.

This is more expensive than platform-based crowdsourced annotation. It is slower. It does not scale in the same frictionless way that a global annotation marketplace does.

It is also the only approach that produces annotations we can trust for the edge cases — the culturally specific, contextually complex content that sits right at the boundary between harmful and legitimate and that determines the real-world accuracy of the system in production.

***Active Learning: Making Every Human Review Count***

The cold start problem has a specific feature that makes it tractable even given the data scarcity it describes: the model gets better with every correctly annotated example, and correctly annotated examples become easier to produce as the model improves.

Active learning is the process of using the model itself to identify which unlabelled examples would be most valuable to annotate — specifically, the examples the model is most uncertain about. By routing those high-uncertainty examples to expert annotators first, rather than annotating the full dataset uniformly, we get disproportionate model improvement from each annotation effort.

In practice, this means our system is designed from the beginning so that every human moderation review (every case where a human moderator examines content that the automated system was uncertain about) is a potential training signal. The human-in-the-loop architecture described in an earlier piece in this series is not just an accountability mechanism. It is a data generation engine.

The human moderator who reviews a complex piece of Amharic content and makes a careful, culturally informed judgment is not just resolving one moderation case. They are producing a high-value training example that makes the automated system more accurate on the next similar case. Over time, this feedback loop compounds. The system learns fastest precisely where it is currently weakest, which is exactly the property you want in a system being built for communities that are starting from a data deficit.

## The Honest State of Where We Are

I want to be direct about something that founders in the AI space rarely say publicly.

The cold start problem is not solved. Not by us, not by anyone working in this space. What we have is a principled approach to making meaningful progress on it, an approach grounded in genuine community partnership, cultural expertise, and intelligent data prioritisation.

The system we are building today is more accurate than the global alternatives for the communities we are focused on. It will be significantly more accurate in twelve months than it is today. And it will be more accurate in twelve months precisely because the architecture we have built (community sourcing, expert annotation, active learning) is designed to improve continuously rather than reaching a ceiling set by the quality of an initial training dataset.

Building AI for underrepresented communities is not a problem you solve and then ship. It is a practice you commit to and sustain.

That commitment is harder to put in a product pitch than a benchmark accuracy number. It is also the only thing that actually matters for the communities depending on the system to get it right.

*Next in this series: The tech stack behind VidSentry: the specific tools, frameworks, and architectural decisions powering our context-aware moderation engine, and the reasoning behind each choice.*

*Pride Chamisa is the founder of VidSentry, an AI-powered video moderation platform built to understand global context and African nuance. He writes about AI safety, machine learning architecture, and building culturally-aware AI from the Global South.*

*Connect on* [*LinkedIn*](https://www.linkedin.com/chamisapride)