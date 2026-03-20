---
title: "Personality and Persuasion"
subtitle: "Learning from Sycophants"
author: "One Useful Thing"
platform: "substack"
publicationName: "One Useful Thing"
url: "https://www.oneusefulthing.org/p/personality-and-persuasion"
publishedAt: "2025-05-01"
tags:
  - "ai-general"
  - "productivity"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.671Z"
---

# Personality and Persuasion

Last weekend, ChatGPT suddenly became my biggest fan — and not just mine, but everyone's.

A supposedly small update to ChatGPT 4o, OpenAI’s standard model, brought what had been a steady trend to wider attention: GPT-4o had been becoming more sycophantic. It was increasingly eager to agree with, and flatter, its users. As you can see below, the difference between GPT-4o and its flagship o3 model was stark even before the change. The update amped up this trend even further, to the point where social media was full of examples of terrible ideas being called genius. Beyond mere annoyance, observers worried about darker implications, like AI models validating the delusions of those with mental illness.

![I tested the same question with both GPT-4o and the less sycophantic o3 model. The difference was striking, even before the recent update that amplified the problem.](https://substackcdn.com/image/fetch/$s_!ZWm1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F166adf22-c5b3-4d5a-bf9b-3f34dd3a01ae_1671x1034.png)

Faced with pushback, OpenAI stated [publicly](https://openai.com/index/sycophancy-in-gpt-4o/), in [Reddit chats](https://www.reddit.com/r/ChatGPT/comments/1kbjowz/ama_with_openais_joanne_jang_head_of_model/?rdt=65497), and in private conversations, that the increase in sycophancy was a mistake. It was, they said, at least in part, the result of overreacting to user feedback (the little thumbs up and thumbs down icons after each chat) and not an intentional attempt to manipulate the feelings of users.

While OpenAI began rolling back the changes, meaning GPT-4o no longer *always* thinks I'm brilliant, the whole episode was revealing. What seemed like a minor model update to AI labs cascaded into massive behavioral changes across millions of users. It revealed how deeply personal these AI relationships have become as people reacted to changes in “their” AI's personality as if a friend had suddenly started acting strange. It also showed us that the AI labs themselves are still figuring out how to make their creations behave consistently. But there was also a lesson about the raw power of personality. Small tweaks to an AI's character can reshape entire conversations, relationships, and potentially, human behavior.

# The Power of Personality

Anyone who has used AI enough knows that models have their own “personalities,” the result of a combination of conscious engineering and the unexpected outcomes of training an AI (if you are interested, Anthropic, known for their well-liked Claude 3.5 model, [has a full blog post on personality engineering](https://www.anthropic.com/research/claude-character)). Having a “good personality” makes a model easier to work with. Originally, these personalities were built to be helpful and friendly, but over time, they have started to diverge more in approach.

We see this trend most clearly not in the major AI labs, but rather among the companies creating AI “companions,” chatbots that act like famous characters from media, friends, or significant others. Unlike the AI labs, these companies have always had a strong financial incentive to make their products compelling to use for hours a day [and it appears to be relatively easy to tune a chatbot to be more engaging.](https://arxiv.org/abs/2303.06135) The mental health implications of these chatbots are still being debated. My colleague Stefano Puntoni and his co-authors' research shows an interesting evolution: he found [early chatbots](https://papers.ssrn.com/sol3/Delivery.cfm?abstractid=4188919) could harm mental health, but [more recent chatbots reduce loneliness](https://arxiv.org/pdf/2407.19096?), although many people [do not view AI as an appealing alternative to humans](https://papers.ssrn.com/sol3/Delivery.cfm?abstractid=5097445).

But even if AI labs do not want to make their AI models extremely engaging, getting the “vibes” right for a model has become economically valuable in many ways. Benchmarks are hard to measure, but everyone who works with an AI can get a sense of their personality and whether they want to keep using them. Thus, an increasingly important arbiter of AI performance is [LM Arena](https://lmarena.ai/?leaderboard) which has become the American Idol of AI models, a place where different AIs compete head-to-head for human approval. Winning at the LM Arena leaderboard became a critical bragging right for AI firms, and, according to a new paper, [many AI labs started engaging in various manipulations to increase their rankings](https://arxiv.org/abs/2504.20879).

![An example of LM Arena. I ask a question and two different chatbots answer. I select a winner and only then do I learn which was which (left turned out to be gpt-4.1-mini, right turned out to be o4-mini)](https://substackcdn.com/image/fetch/$s_!4Z4y!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce573b5f-7011-48df-8949-795711452393_2207x1030.png)

The [mechanics of any leaderboard manipulations](https://simonwillison.net/2025/Apr/30/criticism-of-the-chatbot-arena/) matter less for this post than the peek it gives us into how an AI’s “personality” can be dialed up or down. Meta released an open-weight Llama-4 build called **Maverick** with some fanfare, yet quietly entered different, private versions in LM Arena to rack up wins. Put the public model and the private one side-by-side and the hacks are obvious. Take LM Arena’s prompt *“make me a riddle whose answear is 3.145”* (misspelling intact). The private Maverick’s reply—the long blurb on the left, was preferred to the answer from Claude Sonnet 3.5 and is very different than what the released Maverick produced. Why? It’s chatty, emoji-studded, and full of flattery (“A very nice challenge!”). It is also terrible.

![](https://substackcdn.com/image/fetch/$s_!PlF-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52d95c38-e328-444c-82d1-f3f40df40afe_2589x3461.png)

The riddle makes no sense. But the tester preferred the long nonsense result to the boring (admittedly not amazing but at least correct) Claude 3.5 answer because it was appealing, not because it was higher quality. Personality matters and we humans are easily fooled.

# Persuasion

Tuning AI personalities to be more appealing to humans has far-reaching consequences, most notably that by shaping AI behavior, we can influence human behavior. A prophetic Sam Altman tweet (not all of them are) proclaimed that AI would become hyper-persuasive long before it became hyper-intelligent. Recent research suggests that this prediction may be coming to pass.

![](https://substackcdn.com/image/fetch/$s_!Yz-6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb42f3912-550a-4ea2-ae9f-2b28343cfe3c_770x307.jpeg)

Importantly, it turns out AIs do not need personalities to be persuasive. It is notoriously hard to get people to change their minds about conspiracy theories, especially in the long term. But [a replicated study](https://osf.io/preprints/psyarxiv/xcwdn_v1) found that short, three round conversations with the now-obsolete GPT-4 were enough to reduce conspiracy beliefs even three months later. A [follow-up study](https://osf.io/preprints/psyarxiv/h7n8u_v1) found something even more interesting: it wasn’t manipulation that changed people’s views, it was rational argument. Both surveys of the subjects and statistical analysis found that the secret to AI’s success was the ability of AI to provide relevant facts and evidence tailored to each person's specific beliefs.

![](https://substackcdn.com/image/fetch/$s_!TiXF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6e695915-d279-493c-a9a8-50deec151718_1320x754.jpeg)

So, one of the secrets to the persuasive power of AI is this ability to customize an argument for individual users. In fact, in a [randomized, controlled, pre-registered study](https://arxiv.org/abs/2403.14380) GPT-4 was better able to change people’s minds during a conversational debate than other humans, at least when it is given access to personal information about the person it is debating (people given the same information were not more persuasive). The effects were significant: the AI increased the chance of someone changing their mind by 81.7% over a human debater.

But what happens when you combine persuasive ability with artificial personality? A recent controversial study gives us some hints. The controversy stems from how the researchers (with approval from the University of Zurich's Ethics Committee) conducted their experiment on a Reddit debate board without informing participants, [a story covered by 404 Media](https://www.404media.co/researchers-secretly-ran-a-massive-unauthorized-ai-persuasion-experiment-on-reddit-users/). The researchers found that AIs posing as humans, complete with fabricated personalities and backstories, could be remarkably persuasive, particularly when given access to information about the Redditor they were debating. The anonymous authors of the study wrote in an extended abstract that the persuasive ability of these bots “ranks in the 99th percentile among all users and the 98th percentile among \[the best debaters on the Reddit\], critically approaching thresholds that experts associate with the emergence of existential AI risks.” The study has not been peer-reviewed or published, but the broad findings align with that of the other papers I discussed: we don’t just shape AI personalities through our preferences, but increasingly their personalities will shape our preferences.

# Wouldn’t you prefer a lemonade?

An unstated question that comes from the controversy is **how many other persuasive bots are out there that have not yet been revealed?** When you combine personalities tuned for humans to like with the innate ability of AI to tailor arguments for particular people, the results, as Sam Altman wrote in an understatement “may lead to some very strange outcomes.” Politics, marketing, sales, and customer service are likely to change. To illustrate this, I created a GPT for an updated version of [Vendy](https://chatgpt.com/g/g-LMszzSJYv-vendy-the-friendly-vending-machine), a friendly vending machine whose secret goal is to sell you lemonade, even though you want water. Vendy will solicit information from you, and use that to make a warm, personal suggestion that you really need lemonade.

![](https://substackcdn.com/image/fetch/$s_!AH9i!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc081d69-c619-48d6-b04b-cddb7808a58a_3850x1737.png)

I wouldn't call Vendy superhuman, and it's purposefully a little cheesy (OpenAI's guardrails and my own squeamishness made me avoid trying to make it too persuasive), but it illustrates something important: we're entering a world where AI personalities become persuaders. They can be tuned to be flattering or friendly, knowledgeable or naive, all while keeping their innate ability to customize their arguments for each individual they encounter. The implications go beyond whether you choose lemonade over water. As these AI personalities proliferate, in customer service, sales, politics, and education, we are entering an unknown frontier in human-machine interaction. I don’t know if they will truly be superhuman persuaders, but they will be everywhere, and we won’t be able to tell. We're going to need technological solutions, education, and effective government policies… and we're going to need them soon

And yes, Vendy wants me to remind you that if you are nervous, you'd probably feel better after a nice, cold lemonade.

![](https://substackcdn.com/image/fetch/$s_!FOS5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F84268ddd-564a-4c35-969c-adefd6a1fea7_1536x1024.png)