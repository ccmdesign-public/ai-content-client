---
title: "Chasing $5.6 Million with Machine Learning: My Approach to MLB’s Impossible Hitting Streak"
author: "Learning Data"
platform: "medium"
publicationName: "Learning Data"
url: "https://medium.com/learning-data/chasing-5-6-million-with-machine-learning-my-approach-to-mlbs-impossible-hitting-streak-7f888e1b9d00?source=rss----eec44e936bf1---4"
publishedAt: "2026-02-25"
tags:
  - "data-science"
  - "sports-analytics"
  - "machine-learning"
  - "sabermetrics"
  - "baseball"
  - "education"
---

# Chasing $5.6 Million with Machine Learning: My Approach to MLB’s Impossible Hitting Streak

# Chasing $5.6 Million with Machine Learning: My Approach to MLB’s Impossible Hitting Streak

[Kevin Garnett](/@kevingarnett?source=post_page---byline--7f888e1b9d00---------------------------------------)

12 min read·Feb 11, 2026

\--

![]()

MLB’s Beat the Streak is one of the longest-running unsolved challenges in sports. The rules are simple: pick one player each day who you think will get at least one hit. If they do, your streak continues. If they don’t, you reset to zero. String together 57 consecutive correct picks and you win $5.6 million.

No one has ever won. In over 20 years.

The problem has attracted researchers from Stanford, Northwestern, UCLA, and NOVA University Lisbon. The best published result comes from Alceo & Henriques (2020), an MLP trained on 155,521 batter-game samples that achieved 85% Precision@100, meaning their 100 most confident predictions across a full season were correct 85% of the time.

My model matches that benchmark at the top of the ranking and holds its precision far deeper. Their accuracy drops from 85% to 76% over 150 predictions beyond the initial 100. Mine drops 12 points over 900. When I replicated their experimental setup on the same data, my pipeline produced 87% on their test year.

I spent the last year building this. Here’s how it works, what I learned, and the part where I had to throw out my best result because I realized it was contaminated.

## The Problem Is Harder Than It Sounds

On the surface, predicting hits looks easy. Batters in the starting lineup record at least one hit about 61% of the time. Even the best contact hitters in baseball only push that number toward 70%. Just pick good hitters, right?

The problem is variance. A .300 hitter facing a Cy Young candidate in a pitcher’s park at night is a fundamentally different proposition than that same hitter facing a back-end starter in Colorado during a day game. Season-level batting average hides all of that context.

There’s also a subtlety that shaped every decision I made: this isn’t really a classification problem. I don’t need to predict the exact probability for every player. I need the players I rank highest to actually get hits at a rate well above the 61% baseline. It’s a ranking problem, and that distinction matters.

## What I’m Working With

The pipeline pulls from four public data sources:

**MLB Statcast** is the backbone: pitch-level data from 2021 through 2025, roughly 4.9 million pitch records. Every pitch has velocity, spin rate, movement, launch angle, exit velocity, and outcome. It’s the richest publicly available baseball dataset.

**FanGraphs** fills in broader player statistics and plate discipline metrics. **Park factors** from FanGraphs capture venue effects. A hit at Coors Field in Denver is not the same as a hit at Oracle Park in San Francisco. And **historical weather data** covers temperature, wind, and humidity for every game back to 2019.

Everything is stored in Parquet format, partitioned by season. Nothing exotic on the infrastructure side. This runs on a laptop.

## The Feature Engineering Is Where It Gets Interesting

Raw statistics are noisy. A batter’s season batting average tells you something, but it buries the signal in months of irrelevant data. The pipeline transforms raw pitch-level data through four stages, and this is where most of the predictive power actually comes from.

### From Pitches to Games

The first step collapses 4.9 million pitch records into about 282,000 batter-game records. One row per player per game, capturing per-game aggregates: at-bats, hits, strikeouts, contact rate, exit velocity distribution, chase rate, and dozens of Statcast-derived metrics. The target variable is binary: did this player get at least one hit (1) or not (0)?

### Rolling Windows

Static season stats miss streaks and slumps. A hitter on a 20-game tear is meaningfully different from the same hitter in a prolonged cold stretch, even if their season line looks identical.

To capture this, the pipeline computes rolling statistics across five lookback windows: 7, 14, 30, 60, and 120 games. This produces roughly 120 features covering contact rate, strikeout rate, hard-hit rate, barrel rate, chase rate, whiff rate, and more.

Each window answers a different question. The 7-game and 14-game windows capture whether a player is hot right now. The 30-game and 60-game windows help determine whether that recent performance is a blip or something sustained and reliable. The 120-game window establishes the player’s baseline, what you’d expect from them over a full half-season. The model compares across all five windows for a given metric, so it can distinguish between a player who is genuinely heating up versus one riding a lucky week against weak pitching.

The pipeline also tracks the gap between a player’s appearances. A hitter returning from a 30-day IL stint isn’t the same player he was before the injury, regardless of what his rolling averages say. The number of days since last game acts as a rust indicator, helping the model discount stale rolling stats for players who haven’t seen live pitching in weeks.

Here’s the single most important engineering decision in the entire project: every rolling feature uses a strict `shift(1)`, meaning each value comes only from games *before* the one being predicted. Without this, future data leaks into training and you get artificially inflated numbers that collapse the moment you go live. It's one line of code. It's also the easiest thing to get wrong.

### Pitcher Archetypes

A batter’s track record against a specific pitcher is useful, when it exists. But most batter-pitcher matchups have tiny sample sizes, making individual head-to-head stats unreliable.

Instead, I cluster pitchers into eight archetypes using K-Means on their pitch mix, velocity, and movement profiles. Power arms, soft-tossers, sinker-ballers, breaking-ball specialists, and several hybrid types. Now the model can learn that a batter struggles against the “high-velocity fastball-slider” archetype rather than one specific pitcher, which dramatically expands the usable matchup data.

### Putting It All Together

The final stage combines batter characteristics with opponent and environmental context: batter-vs-pitcher history (when enough data exists), batter performance against the opposing pitcher’s archetype, platoon advantage (handedness matchup), park factors, opposing pitcher quality, and opposing bullpen quality.

This produces about 270,000 records with 172 candidate features. Feature selection cuts that down to 50 for the final model, and that reduction actually *improved* results (more on that below).

## Finding Ernie Clement

Most people building a “pick the best hitter” model would start with the obvious names. Shohei Ohtani, Mookie Betts, Aaron Judge. The stars. But that’s not what this model was designed to do.

The design philosophy came from watching the 2025 Toronto Blue Jays. They went from worst to first in their division with a completely revamped offensive approach. Instead of chasing power, they emphasized hard contact and bat speed. They became one of the hardest teams to strike out in modern baseball history: the lowest strikeout rate in both the regular season and the postseason, tied for the seventh-lowest era-adjusted team strikeout rate ever.

And they did it with names most casual fans had never heard of. Ernie Clement is the poster child. He was designated for assignment by Cleveland, released by the A’s, and signed a minor league deal with Toronto. His whiff rate of 14.5% put him in the 94th percentile of all MLB hitters in 2025, with the seventh-lowest strikeout rate in baseball. In the postseason, he broke the MLB record with 30 hits, the most by any player in a single postseason in the history of baseball.

That’s the player profile the model is built to find. Not the superstar having an MVP season, but the guy who quietly puts the ball in play four times a game, rarely strikes out, and walks back to the dugout with a single 70% of the time. The features reflect this directly: contact rate, strikeout rate, whiff rate, chase contact rate, at-bats per game. The model is asking “who is most likely to make contact today?” rather than “who is the best hitter?”

There’s another dimension that makes this profile ideal for Beat the Streak: pitchers actually throw Clement strikes. A player like Aaron Judge has elite bat-to-ball ability, but his power means pitchers work around him: nibbling corners, pitching off the plate, issuing intentional walks. That reduces his effective at-bats. Clement doesn’t carry the power threat that makes pitchers avoid the zone, so he sees hittable pitches at a higher rate. For a game that only asks “did he get a hit?”, a contact hitter who gets pitched to is more valuable than a slugger who gets pitched around.

This matters for Beat the Streak because the challenge rewards consistency, not ceiling. A .270 hitter with a 10% strikeout rate who bats second and sees 4.5 at-bats per game is a safer pick than a .290 hitter with a 28% strikeout rate batting sixth. The first player has more opportunities and a higher floor on any given day. The model learned this quantitatively, but the intuition came from watching what Toronto built.

## Choosing the Right Metric

Here’s something that tripped me up early: the model’s AUC is around 0.62–0.64. In most ML contexts, that’s mediocre. But for this problem, AUC is measuring the wrong thing.

AUC evaluates how well the model discriminates hits from non-hits across the *entire* ranking, all 270,000 records. I don’t care about that. I care about whether the 5 or 10 players the model likes best each day actually get hits.

The right metric is **Precision@K** (P@K). Take the model’s K most confident predictions across an entire season and check how many were correct. P@100 means: of the 100 predictions the model was most sure about all year, what percentage actually resulted in a hit?

The baseline (picking starters at random from the lineup) gives you P@100 of about 61%. That’s the number to beat.

## The Models

I evaluated three architectures:

**XGBoost and LightGBM** are both gradient-boosted tree frameworks. Despite superficial similarity, they use different splitting algorithms and tend to find complementary patterns in the data. Both are proven workhorses on tabular data.

**A Multi-Layer Perceptron (MLP)**, a feed-forward neural network, was included to see if it could capture patterns the tree models miss.

## Fewer Features, Better Results

Starting from 172 candidates, I selected the top 50 by importance. The counterintuitive finding: 50 features outperformed 172. P@500 went from 74.2% to 77.2%, and P@1000 from 71.1% to 75.9%. More features meant more overfitting, not more signal.

The dominant feature, by a massive margin, is lineup position: which slot (1st through 9th) a player occupies in the batting order. It carries roughly 3.8 times the importance of the next feature. The logic is clean: managers bat their best hitters higher, and those hitters get more plate appearances per game, giving them more chances to record a hit. The data bears this out directly. Leadoff hitters record a hit in 67.4% of their starts while averaging 4.0 at-bats per game. By the 5-hole that drops to 62.1% on 3.7 at-bats. The 9-hole falls to 50.9% on just 3.0 at-bats. And pinch hitters, who typically get a single plate appearance, sit at 26.1%.

That’s a 17-point spread from the leadoff spot to the 9-hole, driven almost entirely by opportunity. The model didn’t find a weird artifact. It found the single strongest structural predictor in the data.

Beyond lineup position, the most predictive features are rolling hit-game rates, at-bats per game across multiple windows, opposing pitcher strikeout rate, park hit factors, and batter strikeout rate. The model converges on what domain experts would expect: frequent-playing, high-contact hitters facing moderate pitching in hitter-friendly parks are the safest daily selections. But it arrives there quantitatively, weighting and combining these factors in ways intuition alone can’t replicate.

## Blending

Individual models produce strong but slightly different error profiles. The final production model blends LightGBM (20%) and MLP (80%), a combination that emerged from cross-validated ensemble weight selection on the training data. The diversity between a tree-based model and a neural network reduces variance specifically at the top of the ranking, exactly where it matters.

## Results

All evaluation uses strict temporal splits: models train on earlier years and evaluate on later years. No shuffled cross-validation. No random splits that let future games inform past predictions. For context, a starter picked at random from the lineup gets a hit about 61% of the time. That’s the number to beat.

I tested the model three ways. Training on 2021–2023 and testing on 2025 (a year the model never saw) produced P@100 of 84%. Training on just 2021–2022 and testing on 2024 (a completely different era) still hit 81%, proving the approach generalizes and isn’t overfit to one season. The production model, trained on 2021–2024 with 2025 as validation, reaches 85%.

That’s 23 points above the baseline at P@100. But what’s more telling is how the precision holds as you go deeper into the ranking. The production model drops from 85% at P@100 to 73% at P@1000, only 12 points across 900 additional predictions. When precision degrades that slowly, the model is finding real signal, not just getting lucky at the top.

## Against the Academic Benchmark

As mentioned in the introduction, Alceo & Henriques (2020) is the strongest published benchmark for this problem. The key difference isn’t at the top of the ranking where both models hit 85%. It’s the rate of decay as you go deeper. Their precision drops 9 points over 150 predictions. My model drops 12 points over 900. That’s roughly a 4.5x slower rate of degradation, meaning the model’s signal runs much deeper into the ranking than theirs.

To make a fair comparison on the same data, I replicated their experimental setup (same training years, same test year) using my pipeline. On their test year (2019), my system produced P@100 of 87%.

## The Part About Being Honest With Yourself

I want to address something directly because it’s the most important lesson from this project.

During development, an earlier version of this model showed P@100 of 89%. I was thrilled. It was the best number I’d seen. But it was wrong.

Through iterative experimentation (adjusting models, tuning ensemble weights, evaluating different configurations) I had inadvertently used the 2025 test set to make decisions. Not in an obvious way. I wasn’t training on it. But every time I looked at the test results and then changed something, the test set was no longer a true holdout. The information leaked through my decision-making, not through the code.

When I recognized this, I designed a clean cross-era validation: training on 2021–2022 and testing on 2024, a year my optimization process had never seen. The result: 81%. Real, but not 89%.

I’m including this not as a caveat but as a genuine finding. Test set leakage through human decision-making is the most common and most invisible failure mode in applied ML. It doesn’t show up in code reviews. It doesn’t trigger warnings. The only safeguard is maintaining evaluation data that your model selection process has truly never touched, and having the discipline to trust those numbers over the flattering ones.

The 84% honest holdout result and the 81% cross-era result are the numbers I stand behind.

## What I’d Do Differently (And What’s Next)

**Starter innings prediction** is the biggest untapped signal. How long the starting pitcher stays in the game determines whether a batter faces the starter three or four times or gets exposed to the bullpen. A separate model predicting starter IP is in development and will feed into the hit prediction as an additional feature.

**Pre-2021 data** could expand the training set, but Statcast’s feature set has evolved over time, and mixing eras introduces noise. It’s not obvious this would help.

**Probability calibration** matters less for daily picks (ranking is what counts) but would improve the Monte Carlo simulation component that models season-long streak probabilities under different strategies.

## The Bottom Line

This project started as a curiosity and turned into a genuine exercise in applied machine learning, not because the algorithms are exotic (they’re not), but because the problem demands rigor in places that most tutorials skip: temporal integrity, metric selection that matches the use case, honest evaluation discipline, and the humility to throw out a flattering number when you realize it’s inflated.

The model will publish its top 10 most probable hitters daily during the 2026 MLB season at [xwobiwan.com](https://www.xwobiwan.com), where you can also replay the model’s 2025 predictions against actual outcomes. Whether it can actually sustain a 57-game streak is a different question. The math says even at 85% per-pick accuracy, a 57-game streak has roughly a 0.01% chance in any given season. I’d love to be the one to beat it, but I’d be just as happy if someone else uses this work as a starting point and gets there first. The model finds real edges, and in a game of small margins over long sequences, real edges are all you can ask for.

*Reference: Alceo, P., & Henriques, R. (2020). Beat the Streak: Prediction of MLB Base Hits Using Machine Learning. Springer CCIS vol. 1297.*

*The contents of external submissions are not necessarily reflective of the opinions or work of* [*Maven Analytics*](http://mavenanalytics.io) *or any of its team members.*

*We believe in fostering lifelong learning and our intent is to provide a platform for the data community to share their work and seek feedback from the Maven Analytics data fam.*

[*Submit your own writing here*](/learning-data/how-to-get-your-work-published-by-learning-data-with-maven-analytics-7df21e466a3e?sk=020dfac485597d602e218968d9ffb395) *if you’d like to become a contributor.*

*Happy learning!*

*\-Team Maven*