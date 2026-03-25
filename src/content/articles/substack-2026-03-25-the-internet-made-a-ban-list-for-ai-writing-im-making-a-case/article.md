---
title: "The internet made a ban list for AI writing. I'm making a case for the defense"
subtitle: "8 prose patterns everyone calls AI slop are actually rhetorical tools with centuries of evidence behind them. Here's the diagnostic system that tells you which ones to keep."
author: "Robots Ate My Homework"
platform: "substack"
publicationName: "Robots Ate My Homework"
url: "https://robotsatemyhomework.substack.com/p/ai-writing-patterns"
publishedAt: "2026-03-25"
tags:
  - "ai-general"
  - "chatgpt"
  - "content-creation"
  - "education"
  - "llm"
  - "productivity"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-25T14:52:31.401Z"
---

# The internet made a ban list for AI writing. I'm making a case for the defense

**Welcome to today’s edition of ROBOTS ATE MY HOMEWORK. Today, I’m defending every single writing pattern the internet told you to delete.**

On the 29th of May, 1913, the Théâtre des Champs-Élysées in Paris hosted the premiere of Igor Stravinsky's *The Rite of Spring*.

The audience rioted. Fistfights in the aisles. Booing so loud the dancers couldn’t hear the orchestra.

Stravinsky played music it in a way that made people’s nervous systems revolt before their brains could catch up. What he did was replace the metronome with syncopation.

[Listen while reading](https://www.youtube.com/watch?v=EkwqPJZe8ms)

I learned what syncopation means both in film school and during the 10 years I played piano. A cut in the wrong place kills a scene because the rhythm told your eye (or your ears) to expect something and the editor gave you the average instead.

Writing has the same physics. And right now, you’re writing in 4/4 time without knowing it.

Every piece of advice about “AI writing” tells you to remove things. Don’t use em dashes. Don’t use “not X, but Y.” Don’t use the rule of three. Don’t start with “What.” Don’t end with a kicker.

**This piece is a defense of every single one of them.**

And a system for hearing when they’re working and when they’re running on autopilot, whether a machine wrote the sentence or you did.

In this edition, I will:

-   Show you the three measurements that separate writing that feels alive from writing that feels like cardboard
    
-   Walk you through 8 prose patterns everyone calls “AI slop,” defend every single one of them, and give you a before/after for each so you can hear the difference immediately
    
-   Hand you the full prompt that builds the Content Rhythm Analyst as an AI Project (Claude, GPT, or Gem)
    

* * *

**─── ⋆⋅☆⋅⋆ ───**

*Hi, I’m Mia. I write about building with AI the way it should be done: with a brain, a plan, and zero circus tricks.*

*New to ROBOTS ATE MY HOMEWORK? [Start here](https://robotsatemyhomework.com/new-to-ramh). Want the systems? [RobotsOS](https://robotsatemyhomework.com/robots). Want a personalized AI roadmap? [Take a 20-second quiz](https://robotsatemyhomework.com/learn).*

*Stravinsky broke the rules so hard Paris started throwing punches. I’ll show you how to do the same thing to your paragraphs.*

![](https://substackcdn.com/image/fetch/$s_!d1L4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fed03b648-3c71-4863-be54-05ad25cc87f2_1200x35.png)

## Why does some writing grab you and some slide right off? The three measurements behind content rhythm

![Stravinsky’s Rite of Spring](https://substackcdn.com/image/fetch/$s_!bxKP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbaf74752-fab2-452b-abe1-9795f00cac51_460x276.jpeg)

So, what separates writing with authentic voice from AI writing that sounds flat?

The answer lives in three measurements, and once you know them, you can’t unhear them:

#### **╰┈➤ Perplexity** is how surprising the word choices are.

It’s one of the core signals behind why AI writing sounds generic. High perplexity means the writer went somewhere your brain didn’t predict. Low perplexity means the sentence did exactly what probability said it would. When someone says writing feels “flat,” this is often what they’re sensing without knowing the word for it.

I grew up reading in three languages and now I speak and understand up to six (and I’m saying “up to” because I don’t know how to define the fact that two of them I understand perfectly but can only speak when the mood strikes, which is not a level Duolingo has a badge for)

When I started writing in English full-time, my drafts had this strange rhythm that didn't fit either language. It took me years to realize that was my voice, not a flaw. Perplexity, in my writing, partly comes from the fact that my brain is constructing sentences across multiple grammars at once.

I’m not the only one holding onto words the internet flagged as suspicious. [JHong](https://open.substack.com/users/68897416-jhong?utm_source=mentions), who memorized 1,400 words to take the SAT as a teenager, says that she loves “employing the perfect word.” Words like *delve* and *leverage* are NEVER filler in her writing.

[Lee Drozak](https://open.substack.com/users/43100012-lee-drozak?utm_source=mentions) claimed the same thing, but from a different angle: *“I’m keeping them too. Tapestry, delve, furthermore, resonate. Sometimes I communicate like I’m in another century.”* That’s a vocabulary operating at higher perplexity than the internet is currently comfortable with.

#### **╰┈➤ Burstiness** is the variation in sentence length and structure.

Read any paragraph by Joan Didion and you’ll feel it: a long winding sentence, then a short one that hits like a slap, then a medium one that lets you breathe. That’s high burstiness. AI AND bad writing cluster toward the average. Every sentence is medium. Every paragraph is 3-4 lines. The comfortable middle, forever. This is the most visible AI writing pattern. Scroll any AI-generated essay and you’ll see it: identical bricks, identical height, forever.

[Mariam Vossough](https://open.substack.com/users/198091066-mariam-vossough?utm_source=mentions) has been writing for over 25 years. Short sentences, repetition, and the rule of three were always her tools for emphasis. She still uses them, just more sparingly now, never twice in one post. Thing is, she had this rhythm before and now is just recalibrating frequency instead of plainly abandoning the use of these patterns.

[Tracy Friedlander](https://open.substack.com/users/4878855-tracy-friedlander?utm_source=mentions) flags the opposite problem: AI doesn’t lack burstiness. It fakes it. *“Over-the-top one and two word sentences that are punchy and just soooo AI.”* When every sentence tries to punch, nothing punches. The variation disappears and you’re back to 4/4 time, just louder.

#### **╰┈➤ Information entropy** is the density of new thinking per sentence.

How much of this paragraph is adding something versus restating what you already know in slightly different words? Low entropy is the feeling of “I’ve been reading for five minutes and nothing new has happened.”

Your [Voice DNA](https://robotsatemyhomework.com/learn/voice-profiles) won’t fix this on its own. You can give AI your vocabulary, your tone, your favorite metaphors, and still get 4/4 time. Because preserving your writing voice with AI requires more than a style guide.

**Your voice is the words you use AND the rhythm underneath them.**

[Cory Cachola](https://open.substack.com/users/144143149-cory-cachola?utm_source=mentions) has a degree in journalism and creative writing and worked as a journalist long before AI-assisted writing was a thing. His take is that writing, language, and culture always evolve. **Our darlings get killed all the time by way of technology.** AI is just the next phase.

Now that you have the three measurements, here’s where they show up in practice.

![](https://substackcdn.com/image/fetch/$s_!7lAD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0768953a-3454-4dd3-a723-d97809f2b3fb_1200x35.png)

## 8 AI writing patterns the internet told you to throw away

The internet is full of people telling you to never use these because they are “AI slop”.

Stop listening to them. Every pattern below is a legitimate tool. The difference is whether you’re choosing it or whether it’s choosing you.

### 1\. Inanimate agency

Linguist Peter Master [studied nearly 3,000 subject-verb pairs](https://www.sciencedirect.com/science/article/abs/pii/088949069190013M) in scientific prose and found that inanimate subjects with active verbs are more common than passive constructions. English grammatically permits this in ways that Japanese, Chinese, and Thai don't. The construction is native to the language. The problem is when four of them stack without a human anywhere in sight.

**On autopilot:** “The framework reveals key insights. The data demonstrates a clear pattern. The analysis confirms the hypothesis.”

**A writer choosing it:** “A thermometer measures temperature” (the verb IS what the thing does). “Rising interest rates slow borrowing” (compression without hiding who’s responsible).

*Four inanimate subjects in a row = a paragraph where no human exists. One inanimate subject doing the thing it was designed to do = efficient prose. The question: should a person be in this sentence?*

### 2\. Binary contrasts

German has two separate words for “but”: *aber* (general) and *sondern* (corrective, only used after negation). English [collapses both into one word](https://semprag.org/index.php/sp/article/download/sp.7.4/pdf_3/), which is part of why this construction gets overused. There’s no grammatical friction to slow you down.

**On autopilot:** “The problem isn’t speed. It’s direction.” (Both could be true. The structure forced a false choice.) “It’s not about working harder. It’s about working smarter.” (Delete every word and lose nothing.)

**A writer choosing it:** “The music wasn’t wrong. It was too right.” (The audience DID think it was wrong. The negation corrects a real belief.)

*The question: is X something the reader believes right now? If yes, the contrast is doing real work. If X is a strawman you built to knock down, you’re performing insight.*

[Brian Carter](https://open.substack.com/users/31753643-brian-carter?utm_source=mentions) told our community chat that: *“AI does a really cheap version of contrast. Formulaic.”* He uses contrast constantly in his own writing. But every instance goes through his article editor so he can rewrite them on his own terms.

[Dallas Payne](https://open.substack.com/users/324339337-dallas-payne?utm_source=mentions) also LOVES a good “if it’s not X, then Y” and she’s keeping it. She’s also actively working to only reach for it when it actually earns its place.

See? The pattern is fine. Autopilot is the problem.

### 3\. Wh- openers

These are called [wh-clefts or pseudo-clefts](https://en.wikipedia.org/wiki/Cleft_sentence). They’re a focus construction: the sentence splits so the writer can move emphasis to the end. The wh-clause is supposed to carry old information while the material after “is” carries the new. If both halves carry new information, the structure has lost its purpose.

**On autopilot:** “What makes this interesting is the constraint.” (You spent eight words delaying a two-word subject.)

**A writer choosing it:** After 400 words of building a case, “What changes everything is...” works as a structural reset. The reader needs the breath before the turn.

*The question: if you delete everything before “is,” does the sentence lose meaning or just lose runway?*

### 4\. The colon reveal

The colon is a cataphoric signal: it points forward, promising that what follows will explain or complete what came before. Research on [discourse markers and rhetorical structure](https://www.sfu.ca/~mtaboada/docs/Taboada_Mann_RST_Part1.pdf) shows that explicit signposting helps readers build coherent mental models. But “here’s the thing:” is a degenerate signpost. It signals without specifying.

**On autopilot:** “Here’s what nobody talks about: consistency matters.” (You promised surprise and delivered a truism.)

**A writer choosing it:** “The experiment had one fatal flaw: they forgot to test on mobile.” (Both halves carry weight. The colon compresses two sentences into a tighter rhythm.)

*The question: if you delete everything before the colon, does the sentence lose something? Or did the pre-colon phrase do zero work?*

### 5\. Negative listing

The rhetorical tradition calls this [apophasis](https://plato.stanford.edu/entries/negation/): defining something by what it isn't. The cognitive cost hits immediately: your brain has to construct each negated proposition and then suppress it. Three negations = three rounds of build-and-discard before you arrive at the point.

**On autopilot:** “Not a tutorial. Not a listicle. Not a roundup. Something else entirely.” (Nobody was going to mistake your piece for a roundup. The negation is wasted cognitive work.)

**A writer choosing it:** “I didn’t quit because I failed. I didn’t quit because I was tired. I quit because I got bored.” (Each negation corrects something the reader was thinking.)

*The question: were your readers assuming the thing you’re negating? If not, you’re making them construct and discard ideas for nothing.*

And look, not everyone is buying this defense. [Tracy Friedlander](https://open.substack.com/users/4878855-tracy-friedlander?utm_source=mentions) called negative listing “fingernails on a chalkboard” and basically dared me to write an argument that three sentences starting with “Not” followed by an “It’s...” pivot could ever land well.

Fair enough. That IS the autopilot version. But the diagnostic question still stands: was the reader actually assuming the thing you’re negating? If yes, the negation does real work. If nobody was thinking that in the first place, Tracy’s right. It’s nails on a board.

### 6\. Rule of three

The [tricolon](https://mannerofspeaking.org/2015/03/16/rhetorical-devices-tricolon/) goes back to Aristotle: *veni, vidi, vici*. Roy Peter Clark put it plainly: "Use one for power. Two for comparison. Three for completeness." The brain registers two as comparison and three as pattern. AI defaults to three because it's the statistical average in its training data.

**On autopilot:** “Speed, efficiency, and innovation.” (Innovation is filler. It’s completing a pattern, not adding information.)

**A writer choosing it:** “God created humanity. Humanity created AI. And this week, AI created religion.” (The third element breaks the pattern it set up. That “and this week” disrupts the parallelism.)

I catch myself doing this in conversation too. Three examples when one would land harder. It’s muscle memory from every essay I’ve ever read. The rule of three is so deeply embedded in Western rhetoric that it takes real effort to stop at two and trust the reader to feel the completeness without the third beat.

[Shannon Bindler](https://open.substack.com/users/201169102-shannon-bindler?utm_source=mentions) was an editor at a magazine and had a blog that went viral. She still reaches for the rule of three but, as she put it, “stitches it up now.” None of her old favorites got abandoned, they just got rationed. AI, she said, has trained her to learn some new tricks.

*The question: does the third item surprise or just complete? If you can delete it and lose nothing, it was statistical comfort, not rhetoric.*

### 7\. Uniform paragraph lengths

Readability research shows that visual variation in paragraph length correlates with sustained attention. Paragraph boundaries function as processing signals: "this unit of thought is complete, a new one is starting." Same-sized units kill the signal.

This is burstiness at the visual level and it’s the easiest AI writing pattern to see.

**On autopilot:** every paragraph is 3-4 sentences. Nothing is short enough to punch, nothing is long enough to immerse. Scroll any AI essay and you’ll see it: identical bricks.

**A writer choosing it:** almost never. Varied paragraph length is your syncopation. A one-sentence paragraph surrounded by longer ones creates emphasis without any formatting tricks.

Just white space and contrast.

*The question: scroll your draft. Does it look like a wall or a landscape?*

### 8\. Parallel kickers

Cognitive scientists call this [habituation](https://en.wikipedia.org/wiki/Habituation): the brain stops responding to repeated stimuli. The first kicker lands because the reader didn't see it coming. The second lands softer. By the third, they've already written your ending in their head.

**On autopilot:** Every section ends with a mic drop. “That’s the whole game.” “And that changes everything.” “This is what nobody measures.” The first one lands. By the fifth, your reader completes it before they get there.

**A writer choosing it:** ONE section ends with a punch. The next two end flat, or mid-thought, or trail off.

*The question: read your last five paragraph endings. Can you predict the shape of the next one? If yes, you’ve killed your own emphasis.*

Stravinsky didn’t accent every beat. He accented the one beat where your body wasn’t ready.

### But what about the em dashes?

I didn’t include the em dash in the 8 patterns above because it’s punctuation, not a rhetorical structure. But when I asked my community what they’re keeping, the em dash came up more than literally anything else.

[Michael Janzen](https://open.substack.com/users/365349590-michael-janzen?utm_source=mentions) was a successful blogger in the tiny house movement long before generative AI existed. He wrote over 1,000 posts from the heart. Em dashes everywhere. “I’m probably single-handedly to blame for this AI pattern,” he joked. Now he has to hold himself back.

[Raghav Mehra](https://open.substack.com/users/325219597-raghav-mehra?utm_source=mentions) also resents the assumption that everything with an em dash in it was generated, and I honestly feel the same.

And then [Dallas Payne](https://open.substack.com/users/324339337-dallas-payne?utm_source=mentions) told me how she was working through some Claude Project instructions when Claude itself flagged something interesting: **banning em dashes is fine, but just saying “no em dashes” isn’t the whole job. AI has a high chance of turning work flat wherever it wanted to insert one, because the ban removes the tool without always replacing it with something equally good.**

The em dash is a rhythm tool. Ban it everywhere without a replacement strategy and you’ll probably get content that lost a beat and you didn’t notice.

It’s not just punctuation either. [Elena | AI Product Leader](https://open.substack.com/users/31598723-elena-ai-product-leader?utm_source=mentions) gets the same side-eye for title case and bullet points. Those came from years of building presentations for stakeholders.

This specific habit predates AI by a decade. The internet just decided it’s suspicious now, so we must conform (or, do we?).

* * *

*If someone in your life has been treating AI writing advice like a list of things to ban, this might save them from the musical equivalent of removing all the drums and wondering why the song is boring.*

## I asked AI to edit my draft and this is what it did to my content rhythm

I decided to run one of my own articles through AI, simply asking it to “edit this piece so it sounds better”. Not using any of my voice guides, my guardrails, my Claude Skills, NOTHING.

This is the original piece:

[

#### Context engineering is the new AI literacy

](https://robotsatemyhomework.substack.com/p/context-engineering-guide)[Mia Kiraki 🎭](https://substack.com/profile/362428399-mia-kiraki)·Mar 18[Read full story](https://robotsatemyhomework.substack.com/p/context-engineering-guide)

Some of the heaviest edited pieces sounded like this:

—> *“**The system demonstrates** how context windows function. **The architecture reveals** the limitations. **The structure confirms** what most builders miss.”* Three sentences in a row. No human in sight. I was writing about a project I built with my own hands, and the edit made it sound like the system built itself.

—> *“**Here’s the thing:** your context window is stateless.”* The pre-colon phrase is doing nothing. “Your context window is stateless” is the whole sentence.

—> *“Not a workaround. Not a hack. **A structural decision.**“* AI was negating things nobody assumed. No reader would open that post thinking “ah, this will be about workarounds.”

Two sections ended with the same shape: short declarative sentence, punchy standalone, period. I could feel myself reaching for the kicker each time. The rhythm was comfortable and I didn’t notice until I looked.

Five AI writing patterns in an AI draft that took about 20 seconds to generate.

These patterns are invisible to a lot of people being accustomed to them, especially those of us who’ve either used AI a lot in the past and got used to the rhythm or those of us who use AI from scratch to write our content (which I never recommend, but I don’t judge either.)

You have to build something outside yourself to hear the metronome.

### What this AI writing pattern detection system won’t do

This diagnostic finds patterns.

It does not tell you what’s “good” or “bad.” It flags the places where your content is repeating a structure, and then you decide whether that repetition is a choice or an accident.

A few things it can’t do:

-   **It can’t tell you whether a pattern is AI slop or craft.** Only you know whether you chose that binary contrast because it corrects a real reader assumption, or because your fingers defaulted to “not X, but Y” while you were tired. The system shows you the evidence. The judgment is yours.
    
-   **It doesn’t distinguish between AI-generated and human-written patterns.** These 8 patterns show up in everything: AI drafts, your first drafts, published essays by writers you admire. Inanimate agency exists in the New York Times. Colon reveals exist in Joan Didion. The goal is not “catch AI slop” but to “hear the metronome in any prose, from any source, including your own hands.”
    
-   **It won’t make your writing more “human.”** There is no checkbox for human. The system makes your writing more intentional. Every pattern that survives the audit is one you chose to keep. Every one you cut is one that was running on autopilot.
    
-   **It can’t hear what’s missing.** The system checks for 8 specific patterns. It won’t tell you that your piece lacks a story, or that you buried the point in paragraph six, or that the ending trails off. Structure, pacing, argument, emotional arc: those are yours.
    

Basically, the system gives you ears for rhythm.

![](https://substackcdn.com/image/fetch/$s_!xa-1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5df9ec21-d226-4523-a4d4-66d8774e130f_1200x35.png)

## One prompt, 9 files, a permanent Content Rhythm Analyst

This single prompt builds your entire diagnostic system.

[Copy paste from here.](https://docs.google.com/document/d/1vzoW9ON9lqHlrg8pN2BbtQnxnTyPb0rYcmVw_WWfcXs/edit?usp=sharing)

You paste it into your AI and it generates 9 files: 8 pattern reference files (one for each pattern above, with plain-language definitions, autopilot examples, writer-choosing-it examples, and a diagnostic question) plus an INSTRUCTIONS.md that turns a Claude Project (or GPT project, or Gem) into a **content rhythm analyst, a permanent AI writing patterns detector you can run on any draft.**

Copy the prompt. Run it.

Once you get your files:

1.  create a new Claude Project
    
2.  add the INSTRUCTIONS.md file to Files, or add it as text under “instructions”
    
3.  drop the 8 .md files in as knowledge
    
4.  add your [Voice Profile](https://robotsatemyhomework.com/learn/voice-profiles) if you have one
    

![](https://substackcdn.com/image/fetch/$s_!WhxV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F797e47eb-f57a-4f06-aa24-7bccbd89b5ba_768x1024.png)

Every draft you paste into the project after that gets a full rhythm audit: which patterns are earning their place, which ones are on autopilot, and a Burstiness Score from 1-10 (1 is metronomic, 10 is Stravinsky).

This is how [detecting AI slop](https://robotsatemyhomework.com/learn/detecting-slop) becomes a permanent part of your editing workflow, instead of something you do once and forget.

#### ⭐ If you want to skip the setup:

The full Claude Project kit with all 8 reference files already built by me and the INSTRUCTIONS.md is [ready to download from inside RobotsOS](https://robotsatemyhomework.com/robotsos/playbooks/content-rhythm-analyst) for premium subscribers. Open the project, paste a draft in the project, hear the rhythm.

**Now I want to hear your riot story. What’s the writing pattern, structure, or weird habit that someone told you was wrong, and you kept doing it anyway?**

[Leave a comment](https://robotsatemyhomework.substack.com/p/ai-writing-patterns/comments)

* * *

#### ***You just heard the riot. Now conduct one.***

**Free:** Download the [Voice Profile Builder](https://robotsatemyhomework.com/robotsos/skills/voice-profile-builder) skill from RobotsOS and start preserving your writing voice with AI in under 30 minutes.

**Go deeper:** [PREMIUM ROBOTS](https://robotsatemyhomework.substack.com/p/premium-robots) is the full experiment library. It includes full access to the RobotsOS platform (pre-built skills, agents, workflows) and exclusive writing on the craft of thinking, building, and quality control with AI.

**Just getting started?** Take a [20-second quiz](https://robotsatemyhomework.com/learn) and get a personalized AI roadmap of what to read first.

*Paid subscribers get the full library of AI systems plus exclusive writing on the thinking and taste that makes AI actually good.*

* * *

To writing with all the wrong accents, in exactly the right places,

Chief 🤖 at ROBOTS ATE MY HOMEWORK