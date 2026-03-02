---
title: "Burn It and Start Over"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/burn-it-and-start-over-e1cfe208e35b?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-02"
tags:
  - "cognitive-bias"
  - "startup"
  - "programming"
  - "project-management"
  - "time-management"
  - "coding"
  - "frameworks"
---

# Burn It and Start Over

# Burn It and Start Over

[Just alex](https://medium.com/@__alex__?source=post_page---byline--e1cfe208e35b---------------------------------------)

6 min read·Feb 20, 2026

\--

20

![]()

Happens all the time. You fill out an online quiz, and instead of showing the results it asks for your email. Or a scammer tells you to send money one last time (“it’s the final fee, I swear!”) before you can withdraw your earnings — which, of course, is never going to happen.

These are classic examples of a cognitive bias called the Concorde effect. You’ve already invested time or effort into something, and it feels painful to walk away. Even when quitting is the only logical move, that feeling pushes you to keep going just a little longer.

And honestly, that’s fine. All these little brain glitches are part of being human.

But sometimes those glitches work against us — quietly and automatically. I’ve noticed the same pattern in programming, so here are a few stories, starting small and getting bigger, where you can see it in action. Enjoy.

## 10 Minutes

During a time-limited screening test for a job, I got a simple task: write a regular expression for a (non-shortened) MAC address. For non-technical readers, here’s the translation: strings like *00:1A:2B:3C:4D:5E* or *00:1B:63:84:45:E6*, and I had to describe them with a rule.

My first attempt looked like this:

```
[0–9A-F]{2}:[0–9A-F]{2}:[0–9A-F]{2}:[0–9A-F]{2}:[0–9A-F]{2}:[0–9A-F]{2}
```

Just “two letters or digits, then a colon, then two letters or digits, then a colon, then two letters or digits, then a colon, then two letters or digits, then a colon, then two letters or digits, then a colon, then two letters or digits”.

Does it work? **Yes.** Is it painfully dumb? **Also yes.**

Then I started thinking: this is a senior developer position. I should probably demonstrate some elegance. Something clever.

The clever version would say: “two letters or digits followed by a colon, repeated 6 times — except the last time, when there’s no colon.” That “except the last time” part is where I got stuck. For humans it’s trivial. For computers — and especially regular expressions — exceptions are… exceptional. So I spent maybe 5–10 minutes googling and trying to come up with something short, beautiful, and suitably senior-looking.

Eventually I decided: screw it. Screw the research, screw the elegance. The answer is ugly, but it **is** an answer, and it works.

I passed the test.

Turns out elegance wasn’t the point. Instead of getting stuck polishing an almost-nice solution, I saved time for the rest of the tasks. I spent ten minutes and threw them in the trash — and that was actually the right decision.

But ten minutes is just ten minutes. Let’s scale this up a bit.

## 6 Hours

Once upon a time a client asked me to add a dozen new fields to his app. I’ll simplify the story a bit. It was a sports app with fields like `football`, `basketball`, `tennis`, and so on, and he wanted to expand the list.

![Photo by Vikram TKV on Unsplash]()

It wasn’t the first time the client had asked for something like this, and hardcoding all those `football`s and `basketball`s into the source code was starting to look pretty ugly — imagine fifteen of them scattered everywhere. It felt like the perfect moment to introduce EAV.

EAV is not the name of an ancient beast. It stands for *Entity–Attribute–Value*. Instead of an entity having a fixed set of fields like “football” and “basketball” and nothing else, it can have as many attributes as needed — created by the client, not by me. Instead of messaging “hey Alex, do some coding again,” he could just click a few buttons in the admin dashboard and instantly get whatever he wanted — even `alien MMA fights` or `cockroach races`. EAV is flexible and powerful, as long as you implement it properly. So I implemented it. Not a big deal.

Then another problem surfaced. The database had some internal machinery (a “database view”) that aggregated statistics, and it had `football`, `basketball`, and the rest hardcoded all over the place. Since those were going away, I had to refactor the view. Not a big deal.

Then I discovered that the JavaScript code powering the interactive parts of the site was broken because — you guessed it — it also had `football` and `basketball` everywhere. Fine. I fixed that too. Not a big deal.

Six hours later I was still fixing “not a big deal” problems. Each fix brought the system *almost* back to life, but something else always broke. Every time it felt like the final step, it wasn’t. There was always one more thing.

## Get Just alex’s stories in your inbox

 from this writer.

Remember me for faster sign in

So I burned it.

It hurt after six hours of work, but I ran `git checkout -- .`, wiped out all the changes, and started over. No EAV, no refactoring — just `alien MMA fights` and `cockroach races`, exactly as the client asked. The code got a little uglier, but the task was done.

How many more hours would it have taken if I hadn’t stopped? Nobody knows.

## 2 Months

We once built an app from scratch that started as a tiny automation script. At the time I told the client, “Let’s run it on AWS Lambda — it’ll cost basically $0.” Perfect.

Then the client realized he needed to store some data, so I said, “Let’s add DynamoDB. Still basically $0, and it’ll do the job.” Great.

Then he needed a user interface. So we added that too.

At some point I had to admit that if we kept piling features onto our poor little automation script, it would turn into an unmaintainable monster. It wasn’t a small script anymore, and we needed a different architecture — and different tools — to handle what the app had become.

The client was perfectly reasonable about it. We threw away the Lambda function, DynamoDB, and everything else we had accumulated over two months, and rewrote the whole thing.

It felt like a step backward. I had to rebuild functionality that was already working. But that step back let us move much faster afterward.

Sometimes you have to drop ballast to fly higher.

## 2 Years

American startup. We were working on advanced text processing and recognition. Today problems like that can be solved in seconds by modern LLMs, but back then it was closer to rocket science — unexplored territory.

Natural language processing. Machine learning. Scraping and normalization. Hyperparameter tuning. Custom algorithms. We tried everything we could think of to make it work.

It didn’t.

Some parts worked, technically speaking, but the overall quality was too low. It wasn’t enough to capture the market. And this went on for two long years.

One day I told my employer: this just doesn’t work. Unless you have some secret technology or a hidden genius waiting in the wings, we’re not going to make it. We’ve tried too much already.

For me, *“we’ve tried too much”* was a verdict. For him, it was an anchor. And I understand — it’s incredibly hard to abandon a project you’ve poured years of time and money into and start something completely different. He couldn’t do it.

![]()

So I left the company. Later I heard the project kept going. Did it succeed? I seriously doubt it. And I’m glad I got off that sinking ship.

Even if it somehow stayed afloat, it would have been wiped out anyway by the tsunami called LLMs.

See the pattern?

When you move through the labyrinth called life, sometimes you hit a dead end. And the moment you see it, be honest with yourself and admit what it means: dead ends lead nowhere, no matter how long the road was. Accept the loss.

Burn whatever you built before, and start over.

![]()

Want me to burn your project? Hire me.

Just kidding — I won’t burn it. I’ll make it shine. I turn startup ideas into reality fast. If you want to get in touch, check out [SlashHash.dev](https://slashhash.dev) or [my CV](https://flowcv.com/resume/eafjjcsudb).