---
title: "Geometric AI does not need attention"
author: "Generative AI"
platform: "medium"
publicationName: "Generative AI"
url: "https://generativeai.pub/geometric-ai-does-not-need-attention-2fdb8e08b7cd?source=rss----440100e76000---4"
publishedAt: "2026-03-01"
tags:
  - "ai-general"
  - "llm"
  - "machine-learning"
  - "model-training"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-04T16:12:01.453Z"
---

# Geometric AI does not need attention

# Geometric AI does not need attention

[Marco van Hurne](https://marcohkvanhurne.medium.com/?source=post_page---byline--2fdb8e08b7cd---------------------------------------)

26 min read·1 day ago

\--

![]()

I got the idea for this post when I had a virtual coffee with an engineer who builds AI models for one of the big airplane builders. And he hasn’t built a model that writes your emails or hallucinates your legal documents, but his model does something different. It looks at, say, a winglet — that’s the little upturned fin at the tip of every commercial aircraft wing — and with it he is able to predict the turbulence it will generate with 98% accuracy.

Let that sit for a moment.

I’ll wait, no worries. It took me some time as well to grasp the magnitude of this discovery.

You’ve got to understand that turbulence is not a tidy problem. It is a superposition of pressure waves that are collapsing into each other where they’re producing interference patterns that shift with all sorts of variables like temperature or altitude and of course the geometry of every surface the airflow touches. Meteorologists have spent decades failing to model it cleanly. And this engineer, using this thing called geometric AI, gets it right 98% of the time.

98%.

I walked away from that coffee thinking about wave interference. Because turbulence is, at its core, a wave problem. Pressure waves, superimposed, creating chaotic but geometrically structured patterns. And if a model can learn those patterns in aerodynamics, the obvious question is, where else do superimposed wave systems produce instability that we desperately need to control?

A few ideas came to mind. Ok, you’ve got to know I’m a nerd so I wasn’t immediately thinking of, like, windsurfing or concerts or anything resembling having fun (and a life), but instead it was a Tokamak fusion reactor.

Now why would you come up with such a strange example?

Well, you got to know that in a fusion reactor, the plasma inside a runs literally hotter than the core of the sun. The sun’s core sits at around 15 million degrees Celsius and a Tokamak runs at 150 million. We built a machine that is ten times hotter than the star we orbit, and the engineering problem is keeping that plasma from touching the walls.

The fuel of this reactor is hydrogen, but not the hydrogen you remember from that high school chemistry experiment where you collected a test tube of gas over water, held a lit splint to it, and got that satisfying squeaky pop. The temperature inside a Tokamak is so *extreme* that electrons are ripped clean off their atoms and what you are left with is a plasma, that’s a superheated soup of bare atomic nuclei and free electrons. And these nuclei are no longer behaving like a gas, heck, they are no longer behaving like *anything* polite. These stripped hydrogen nuclei are then slammed into each other at velocities high enough that they fuse, producing helium and releasing enormous amounts of energy in the process. Hydrogen goes in, helium comes out, and the energy difference between the two lights up a city. That’s the idea anyway.

The problem is containment. You cannot put plasma in a box. Any material it touches instantly vaporizes — poof! — which tends to ruin both the plasma and the box, so instead of a physical container, engineers use a magnetic field. A very strong one. A Tokamak magnetic field runs between 12 and 20 tesla, with experimental magnets pushing it to 26. To put that in household terms, the fridge magnet holding your kid’s drawing produces 0.001 tesla and the MRI machine that already makes you remove your belt buckle runs at 1.5 to 3 tesla.

The Tokamak is strong enough to lift an aircraft carrier two meters into the air. That’s how strong the magnetic field is.

And yet, it still is not enough to keep the plasma perfectly contained because somewhere in that field, geometric instabilities develop, the field lines diverge, and the plasma starts finding its way through. The magnetic field as a donut wrapped around the plasma, and in theory, every stitch is tight and there are no holes in the donut except in the middle where the gas is, but in practice, the donut is riddled with holes and imperfections. The plasma, being 150 million degrees of pure chaotic ambition, finds every single one of those holes in an instant. These holes have geometric structure. They appear where the field lines, which should run in smooth parallel curves around the donut, start to diverge and buckle, and in a Tokamak those discontinuities are where confinement fails.

And the thing is that these holes are geometric events and they are predictable in principle if you have a model that can read the three-dimensional structure of the field and you can recognize where the field is about to become weaker and when you are able to predict the hole before it opens, you can give the field a little nudge to compensate for that event, and so the containment stays tight and the reaction keeps running.

That is the problem geometric AI is being asked to solve that conventional deep learning cannot because it can see the geometry inside the chaos, and it does not need to be retrained every time you rotate the problem because it inherently understands the data.

This is not your regular AI. Let me explain why that matters.

![]()

## And now a word from my other hobby, don’t worry, back to the rants shortly.

*AI projects fail because nobody in the room understood what they agreed to.*

![]()

-   The [AI Expert Programma at Inholland Academy](https://www.inholland.nl/academy/opleidingen/ai-en-digitale-transformatie/ai-expert-programma-van-turing-tot-transformers/) that I’m teaching gives you the technical depth to lead AI projects. From Alan Turing via classical Machine Learning to Transformers, World Models, strategy, governance and adoption.
-   Basically you will learn how to lead AI projects when you’re done.
-   Open to all professionals. Not a technical background required, but a love for it makes things a lot easier.
-   Rated 9+ (out of 10, and no, that’s not the minimum age).

## In an LLM nothing matters

Before we can appreciate what geometric AI does, we need to understand what conventional AI does not do because in every good story there’s an antagonist. And to do that, we need to talk about how transformers — which is the architecture powering every large language model — and by some, it’s still being hailed as the dawn of artificial general intelligence.

> *Transformers see data as vectors in a* flat *space. And that is both their strength and their fundamental limitation.*

A vector is a list of numbers with a direction and a magnitude like an arrow in a very high-dimensional room. GPT-style models represent every token, every word or word-fragment, as a vector with 768 dimensions in smaller models and up to 4096 dimensions in larger ones. The word “psychology” is turned into a vector and the word “car” is a vector and even the concept of a human being, when it appears in text, is a vector.

And they all live in the same flat space, they all follow the same rules, and they are all treated as fundamentally the same kind of object.

What that means in practice is that the model has *no idea* that a human body has a spine that connects to a pelvis that connects to two femurs, each of which rotates in a specific socket, constrained by tendons and gravity and the geometry of bipedal locomotion. It knows that the word “human” appears near words like “walk” and “stand” and “fall” with certain statistical frequencies but the geometry of the human body, the actual three-dimensional relational structure that determines how it moves and fails and ages, is completely absent. What the model has instead is a very sophisticated map of which words tend to appear near which other words, compressed into a high-dimensional arrow.

And for language tasks, it is remarkably effective.

The statistical relationships between words carry an enormous amount of *implicit* information about the world. But the moment you step outside language into physical reality, into say, winglets and plasma or light interference, the flat vector space becomes a fundamental mismatch.

A winglet is a three-dimensional surface with specific curvatures, angles, and spatial relationships that determine how air flows around it and rotating that winglet 90 degrees does not change what it is. It’s still a winglet. But to a transformer operating in flat vector space, a rotated winglet looks like a different object entirely, because the numbers in the vector have changed.

Remember this difference, because it is key to understanding what Geometric AI does different. The transformer model has no concept of rotation as a symmetry. It has no concept either of the spatial relationships between points on a surface. It only has a list of numbers and a very large amount of matrix multiplication.

Now, Geometric AI starts from a completely different premise.

This model does not flatten everything into the same undifferentiated space, but instead it asks what kind of mathematical object it actually is. A point in 3D space is not the same kind of thing as a temperature reading or a word embedding. It transforms differently when you rotate the coordinate system. It has relationships to other points that are governed by geometry, by distance and angle and curvature, not simply by statistical co-occurrence. Geometric AI represents these objects with the mathematical structures they actually belong to, and builds networks that respect those structures natively.

The result is a model that knows, without being told, that a winglet rotated 45 degrees is still a winglet and that the pressure on a surface is a scalar that does not change when you rotate the coordinate system, while the direction of airflow is a vector that does. And it knows that the geometry of a magnetic field torus has specific symmetry properties that constrain how instabilities can develop.

> *And the cool thing is that none of this needs to be learned from data because it is built into the architecture, the way grammar is built into a native speaker rather than being a rule consciously applied.*

Flat vector space treats a human, a car, and the word “psychology” all as the same point in a ‘room’ but Geometric AI looks at each of them and determines their shape and what symmetries they obey, and what would it mean to rotate them, and in physics and engineering, it turns out to be the only question worth asking.

![]()

## How the machine learns to see shape

Now we have established that transformers treat everything as a flat list of numbers and that geometric AI respects the actual mathematical structure of physical objects.

I can almost hear you say “um, dude, we kinda got the idea when you introduced the term ‘geometric’ AI” with a level of smugness that I respect. Fair enough my smart friend, but knowing that geometry is involved and understanding how a machine actually processes geometry are two very different things, and the second one is worth your time because it is genuinely surprising.

Allow me to mansplain.

How does a machine see shape. Does it have eyes? A sense of touch? A philosophy degree?

No. It has *graphs*. And it turns out that is enough.

The core building block of geometric AI is something called a Graph Neural Network, or GNN. Forget the name immediately because it sounds like something a data scientist named after themselves when he was drunk. What it actually is, is embarrassingly intuitive.

The best way to understand it is to think about your high school days.

And yes, this is going to hurt.

In every high school there are groups. The nerds cluster behind their computers playing Warcraft or D&D. The jocks own the sports field. The headbangers congregate in the corner of the cafeteria with their black hoodies and their strong opinions about Metallica’s later albums. And the popular kids are everywhere simultaneously, which is their whole thing. The bullies orbit whoever looks most vulnerable that day. And then there are the kids who float between groups, carrying information from one tribe to another like they are biological routers.

Now here is the thing about a high school social network.

Nobody exists in isolation, even though you think you did when you were young. Technically, every kid is defined not simply by who they are but by who they are connected to and what type of connection it is.

> *Being friends with a jock means something different from being friends with the student council president and sitting next to someone in chemistry class is a different kind of edge than having grown up on the same street.*

All relationships have a type, a strength, a direction, and a history. And the combination of all those relationships, across all those kids, is what produces the actual social structure of the school.

And that is exactly what a graph is. The kids are nodes, and the relationships between them are edges, and crucially, the edges carry information about the nature of the relationship and in a geometric AI model representing a winglet, the nodes are points on the surface of the wing, and the edges between them carry information about distance, angle, and curvature or in a model representing a magnetic field, the nodes are points in space where the field has been sampled, and the edges carry information about how the field direction and strength change from one point to the next.

Voila.

You got it!

Geometry lives in the edges.

That is the key insight. You do not need to understand the whole wing to understand what is happening at one point on its surface. You just need to understand that point’s relationships with its immediate neighbors, the way a kid’s social position is largely determined by the handful of people they actually interact with every day rather than by some abstract knowledge of the entire school population.

I could stop here, and for the ones that are easily satisfied, this is the right time to quit reading, go make a coffee, and feel good about yourself. You now know more about geometric AI than approximately 80% of the people currently writing LinkedIn posts about it.

But if you are interested in learning how the network actually passes information between those nodes, how the gossip spreads through the school and why some gossip is geometrically smarter than other gossip, then stay with me. Because in the next part I’ll lay out how this thing can actually predict where a fusion reactor is about to spring a leak.

![]()

## Some gossip has direction

For the ones with high school traumas, I’m sorry, because I ain’t done with it yet.

You now understand that information travels through the graph like gossip through a high school. Every node talks to its neighbors, updates what it knows, passes it on, and after enough rounds the quiet kid in the corner knows about the fight that happened behind the gym even though he was not there and would never have been invited.

But here is the thing about gossip that most people forget when they are busy either spreading it or pretending they are above it.

Not all gossip is created equal.

Some gossip is a fact. Kevin got a 4.2 on his chemistry test. That is a number. It does not have a direction. It does not matter whether you heard it facing north or south, whether you were standing up or sitting down or if the school has been rotated 90 degrees on its foundations since this morning. Kevin’s grade is Kevin’s grade. You can whisper it, shout it, or write it on a bathroom wall and it remains exactly 4.2. This kind of information is what mathematicians call a *scalar*. It is just a number and the universe does not care which way you are pointing when you read it.

But some gossip *has* direction.

Sarah walked out of Mr. Henderson’s office and she went left, not right, which everyone knows means she is heading to the counselor and not back to class, and that means whatever happened in that office was serious. That piece of gossip is not a fact alone, but it has a direction attached to it and that direction is the whole point because when you rotate the school, if you rebuild it facing the other way, then Sarah is now going right instead of left and the gossip means something completely different even though the underlying event was identical.

This is the difference between a scalar and a vector and it is not simply abstract mathematics. It is basically the difference between knowing that something happened and knowing what it means in the context of the physical space it happened in.

And at this point, ‘regular’ AI falls flat on its face in the corridor while everyone watches.

A conventional neural network treats all gossip as scalars.

Everything becomes a number. Kevin’s grade, the direction Sarah walked, the angle of the fight behind the gym, the curvature of the hallway where the popular kids stand, all of it gets flattened into the same dimensionless soup of numbers with no memory of what kind of thing it originally was. Rotate the school and the network has no idea that anything changed. It just sees different numbers and dutifully produces a wrong answer with complete statistical confidence, which is a skill it has perfected through years of training on human-generated text.

Say you show an image creation model — a diffusion model or a GAN — a picture of a Weiner (dog). Let’s call him Slob, because that’s his actual name. Slob is facing left, ears flopped, looking mildly offended by the existence of Monday, as dachshunds do. The model has seen Slob from this angle approximately forty thousand times across its training data and it can reproduce him beautifully. Now you ask it to show you Slob from the side. Or from slightly above. Or from the back, where his little thick tail is doing that wiggly thing.

The model has no idea how to do this from first principles. It has no internal representation of Harvey as a three-dimensional object that exists in space and can be viewed from different angles. It has a very sophisticated statistical map of which pixels tend to appear near which other pixels in images that humans have labeled as dachshunds. So what it does instead is brute force the problem. It has been trained on millions of images of dogs from every conceivable angle, and it pattern-matches its way to something that looks plausible from the requested viewpoint. It is not rotating Slob, but remembering instead what dogs-from-the-side tend to look like and generating something in that neighborhood.

And yes, this works surprisingly well until it does not.

Ask for a slightly unusual angle, a breed the model has seen less frequently, a specific dog with distinctive markings that need to remain consistent across viewpoints, and the whole illusion collapses. You see the ears migrate or the tail move to the wrong side with the confidence of a network that has absolutely no idea it is wrong.

A geometric AI model given a three-dimensional representation of Slob does not have this problem. It knows Slob is a three-dimensional opinionated ‘object’. It knows what a rotation is and how to apply one. And when you’re asking it to show Harvey from a different angle is not a novel extrapolation requiring millions of training examples, but a transformation that the architecture already understands natively because it is built into it’s model. You rotate the input and the output rotates with it, correctly, every time, because equivariance† is a structural guarantee.

## Get Marco van Hurne’s stories in your inbox

 from this writer.

Remember me for faster sign in

The transformer compensates for not understanding geometry by memorizing an almost incomprehensible volume of examples and hoping the geometry is implied somewhere in the statistics. Which, to be fair, often works. But it is the AI equivalent of a student who cannot do long division but has memorized the answers to so many division problems that they can usually fake it. Impressive until the exam has a question they have not seen before. At which point Slob ends up with three ears and a tail where his nose should be.

![]()

## Geometric AI grew up in a better school district

In a geometric AI network, every piece of gossip remembers what kind of thing it is. Kevin’s grade travels through the network as a scalar, intact and directionless, because that is what it is. The direction Sarah walked travels as a vector, carrying its orientation with it through every single hop of the message passing, because orientation is the entire point of that piece of information. And when you rotate the school, the scalar gossip stays exactly the same while the vector gossip rotates accordingly, because that is what those types of information do in physical reality and the network was built to respect that.

The technical term for this is equivariance and it is the central promise of the entire field. A network is equivariant if, when you rotate the input, the output rotates in exactly the same way because it is guaranteed by the architecture rather than learned from data, which means it cannot be unlearned either, which is more than you can say for most of the things people learned in high school.

Think about what this means for a winglet.

The pressure at a point on the surface is a scalar. Rotate the wing and the pressure is still the same pressure. But the direction of the airflow at that point is a vector. Rotate the wing and the airflow direction rotates with it. A model that cannot distinguish between these two types of information will, when presented with a winglet at an unfamiliar angle, produce nonsense with the quiet confidence of a student who studied the wrong chapter. A geometric AI model will simply rotate its understanding of the airflow along with the wing and continue being 98% accurate, because it was never confused by orientation in the first place.

This is not a minor technical detail.

Because when you are modeling anything in physical reality, anything that exists in three-dimensional space and obeys the laws of physics, you are dealing with both types of information simultaneously. Temperatures and pressures alongside velocities and forces alongside stress tensors and field directions. All of them mixed together, all of them transforming differently under rotation, all of them needing to be tracked correctly through every layer of the network or the whole thing falls apart.

Regular AI ignores this distinction and compensates by training on enormous amounts of data, hoping that the network will somehow figure out the geometry through sheer statistical exposure. This works about as well as hoping a student will understand calculus by reading enough novels. Technically not impossible but wildly inefficient, and the moment you ask a question the novels did not cover, you find out very quickly how fragile that understanding actually was.

Geometric AI builds the distinction in from the start. Scalars stay scalars. Vectors stay vectors. And the result is a model that understands physical reality not because it has seen enough examples but because it was built to speak the same mathematical language that physical reality speaks.

Which is, frankly, the bar. The fact that we consider it remarkable says more about the last decade of AI development than it does about geometric AI itself.

![]()

† *If you rotate the input, the output rotates with it by exactly the same amount.*

## What makes robots stop walking into walls

There is a quiet revolution happening in AI that has nothing to do with making chatbots more polite or generating images of Slob from unusual angles. It is the revolution of machines that actually understand the physical world, and it is being built from three ideas that are currently developing in parallel and they are occasionally bumping into each other at conferences, and not yet being discussed together as loudly as they should be.

*Those three ideas are geometric AI, world models, and causal AI.*

And the reason they matter together is that each one solves a different piece of the same problem, which is building machines that can navigate, manipulate, and reason about physical reality without requiring a human to hold its hand through every new situation it encounters.

Let me explain each one properly before I explain why they belong together.

Geometric AI you already know. It is the architecture that understands the shape of things, that knows a winglet rotated 45 degrees is still a winglet, that tracks the difference between a scalar and a vector through every layer of computation, and that can predict turbulence and magnetic field instabilities because it speaks the same mathematical language as the physical world. It is the part of the stack that handles perception and representation. It looks at the world and produces an accurate structured description of what is there and how it is shaped.

### World Models‡ are something different

A world model is exactly what it sounds like, which is rare in AI where most things are named by people who consider opacity a feature. It is a learned internal simulation of how the world works. Not a description of what the world looks like right now, mind you, but a model of what will happen next if you do a particular thing.

Think of it this way. You are sitting in a room and there is a coffee cup on the table. You do not need to push the cup off the table to know what will happen if you do. You have an internal model of gravity, of fragile objects, of hard floors, built up from years of experience, and you can run a little simulation in your head that tells you the cup will fall, probably break, and that you will feel briefly guilty and then annoyed about having to clean it up.

> *Now that internal simulation is a world model. It takes a current state of the world, applies a learned understanding of how things evolve over time, and produces a predicted future state.*

It is the difference between a system that reacts to what it sees and a system that anticipates what is about to happen.

Current AI systems are mostly reactive. They process input and produce output but a robot with a world model can look at a situation, simulate several possible futures, evaluate which one it prefers, and choose the action most likely to produce that future. That is a qualitatively different kind of intelligence and it is why world models are considered one of the most important frontiers in AI right now. Yann LeCun at Meta has been arguing for years that world models are the missing ingredient between current AI and anything resembling genuine machine intelligence, and while LeCun is not always right about everything he is not wrong about this.

But here is the thing about world models.

They are only as good as the representations they are built on. If your world model represents a coffee cup as a flat vector with no understanding of its three-dimensional shape, its center of mass, the way it will tumble when it falls, the arc it will follow under gravity, then your simulation of what happens when you push it will be garbage. Geometric AI is what gives world models accurate, physically consistent representations of the objects they are simulating. Without geometric AI underneath, a world model is simulating a world made of statistical averages rather than actual physical objects. It will get the broad strokes right and fail completely on anything that requires understanding shape, orientation, or spatial relationships.

And here is where Causal AI enters the ‘room’ so to speak.

![]()

### Causal AI is the third layer

And it is the most philosophically ambitious of the three. Where geometric AI asks what shape is this and where world models ask what will happen next, causal AI asks why.

This sounds like a small upgrade but in fact, it is not, it is the difference between correlation and mechanism, and that difference is enormous.

A conventional AI system, even a very good one, learns statistical associations. It knows that dark clouds are associated with rain or that smoking is associated with lung cancer. and that pushing a cup near the edge of a table is associated with the cup falling. But it does not know why any of these things are true since it cannot distinguish between a cause and a coincidence and so it cannot answer the question of what would happen if you intervened, if you painted the clouds white, or found a way to smoke without inhaling, or caught the cup at the last moment.

It has no model of the mechanism, only the correlation.

Causal AI was developed most rigorously by a guy with one of the coolest names ever given to a child, Judea Pearl, whose work on this earned him a Turing Award in 2011. The guy builds models that represent ‘what causes what’ and he introduced the concept of intervention, what happens to Y if I deliberately change X, not simply observe that X and Y tend to move together, and he introduces counterfactuals, what would have happened if X had been different, even though it was not.

For a robot trying to navigate the physical world, this matters enormously. A robot that only knows correlations will be confused the moment it encounters a situation that looks statistically similar to something it has seen before but has a different underlying cause. A robot with a causal model understands the mechanism well enough to reason about novel situations it has never encountered, because it knows why things happen, not just that they tend to happen together.

![]()

## These three models belong in the same conversation

They are not competing approaches where you pick one and ignore the others, but they’re layers of a stack and each one is building on the one below it and each one is solving a different aspect of that same problem.

Geometric AI is the foundation of it all. It gives you accurate, physically consistent representations of the world, representations that understand shape and symmetry and three-dimensional structure. Without this layer, everything built on top of it is working with a distorted picture of reality.

World models sit in the middle. They take those accurate geometric representations and use them to simulate how the world evolves over time. They answer the question of what will happen next, and they can only do this well if the underlying representations are geometrically faithful. A world model built on geometric AI representations can simulate the trajectory of a falling cup with physical accuracy. A world model built on flat vectors is guessing.

Causal AI sits at the top. It takes the world model and asks not just what will happen but why, and what would happen if you intervened. It is the layer that allows a system to reason about novel situations, to transfer knowledge from one context to another, to distinguish between a cause and a coincidence. And it can only work if the world model it is reasoning about is accurate, which requires the geometric representations underneath to be faithful.

Stack these three layers and you have something that can look at a physical environment, build an accurate geometric representation of what is there, simulate what will happen under different actions, reason about why things happen the way they do, and choose actions based on genuine causal understanding of the consequences.

That is what a robot needs to stop walking into walls.

It does not need a bigger transformer or more training data, but a stack built on geometric understanding, dynamic simulation *and* causal reasoning, each layer doing its job so the next layer can do its job better.

We have the pieces, and companies are still figuring out how to assemble them, but the conversation is finally starting to happen in the right rooms, which is more than could be said three years ago.

![]()

‡ *If you want to know more about the developments in the World Models space, read:*

[*Controllable World Models are here and of course everyone is pretending they always wanted this | LinkedIn*](https://www.linkedin.com/pulse/controllable-world-models-here-course-everyone-always-marco-van-hurne-ute4f/)

[*World Models are the next evolution of AI | LinkedIn*](https://www.linkedin.com/pulse/world-models-next-evolution-ai-marco-van-hurne-gjhif/)

## So why has nobody heard of this

The results are real and the empirical evidence is solid. The engineer at the airplane company is getting 98% accuracy on one of the most chaotic physical phenomena in engineering and fusion researchers may already be using it to model magnetic field instabilities. And yet, if you walk into the average ML team at the average tech company and mention geometric AI, you are met with the polite blankness that is usually reserved for someone who just explained their cryptocurrency portfolio at a dinner with their parents.

So what is going on.

The honest answer is that geometric AI has accumulated a perfect storm of adoption barriers where each one is individually surmountable and collectively exhausting, and together they are forming such a huge moat around the field that keeps it concentrated in the hands of people with physics PhDs and very high tolerances for dense mathematical notation.

![]()

Let us go through them one at a time.

### The math humbles me

Geometric AI is built on graduate-level mathematics that most machine learning practitioners have never encountered and were never required to encounter. I am talking about concepts like Group Theory and Differential Geometry and the Representation Theory of Lie groups. And if you’ve never heard of them, you are not alone, trust me.

> *These are not the topics that appeared in the* [*fast.ai*](http://fast.ai/) *curriculum or the Stanford ML course or any bootcamp that promises to make you job-ready in twelve weeks.*

This level of math lives in physics and mathematics departments, and it is taught to students who chose those departments specifically because they enjoy spending time with objects that cannot be visualized in fewer than seven dimensions.

To build an equivariant network from scratch you need to understand what an irreducible representation of SO(3) is, why it matters, and how to implement tensor products between them without making mistakes that produce results that look plausible but are subtly wrong in ways that only become apparent only when the plasma escapes. This is knowledge that takes years to acquire and that the AI industry has not yet found a way to package into a three-hour online course with a certificate at the end.

The people who understand this mathematics are mostly already deployed. They are inside CERN and pharmaceutical companies and national laboratories where they are solving real problems with geometric AI and not particularly interested in writing beginner tutorials because they are busy and the problems they are solving are more interesting than explaining Lie groups to someone who just finished their first neural network.

### The tooling is a patchwork quilt

Even if you have understood the mathematics, oh man, the software ecosystem will test your commitment. PyTorch Geometric is a readily accessible tool that handles graph-based models well but it does not cover the full equivariant architecture space. The e3nn library provides the infrastructure for rotation-equivariant networks but it assumes you already understand irreducible representations before you open the documentation, which is a bold pedagogical choice. DGL scales efficiently to large graphs but alas, it has limited out-of-the-box support for the most sophisticated equivariant models and none of these libraries integrate seamlessly with each other and lack the polished developer experience that PyTorch itself has spent years building.

The result is that implementing a production geometric AI system requires stitching together multiple libraries with different APIs, different conventions, different dependency requirements, and different levels of maintenance activity, while also imposing the need to understand the mathematics well enough to know when the stitching has introduced a subtle error. This is why it takes a talented engineer several months and in the end, it produces a system that is so difficult to hand off to someone else because the knowledge required to maintain it lives mostly in the original engineer’s head.

### And yes, it costs more to run

Equivariant networks are computationally heavier than their conventional counterparts. The reason comes directly from what makes them powerful which is tracking the transformation behavior of vectors, tensors, and higher-order geometric objects through every layer of the network and that requires more complex operations than standard matrix multiplication. Tensor products between irreducible representations are expensive and the memory footprint is larger and training times are longer and to make things worse, the hardware optimization ecosystem that has made transformers cheap to run at scale, the specialized kernels, the quantization techniques, the inference optimizations, has been built almost entirely for transformer architectures and has barely touched equivariant networks.

This means that deploying a geometric AI model in production costs more than deploying a conventional model of comparable capability in its target domain. For an aerospace company predicting turbulence, that cost is trivially justified by the accuracy gains but for a startup trying to hit unit economics before the next funding round, it is a harder conversation.

And then there’s the fact that Geometric AI needs three-dimensional data, which most commercial datasets simply do not contain, and it solves problems like turbulence prediction and plasma confinement that require four minutes of context-setting before a non-specialist understands why they matter, which is approximately three minutes and fifty seconds longer than most investors will give you.

The researchers who build it publish in academic journals, present at conferences where the audience already knows what equivariance means, and generally do not spend their weekends writing LinkedIn posts about it like me, which means the field has extraordinary technical depth and almost no popular visibility.

The path from brilliant research tool to mainstream practice runs through better tooling, better documentation, and at least one well-funded company willing to do for geometric AI what Hugging Face did for transformers.

That company does not exist yet.

*Signing off,*

**Marco**

> *I build AI by day and warn about it by night. I call it job security. Big Tech keeps inflating its promises, and I just bring the pins and clean up the mess.*

*👉 Think a friend would enjoy this too? Share the newsletter and let them join the conversation.* LinkedIn, Google and the AI engines appreciates your likes by making my articles available to more readers.

![]()

This story is published on [Generative AI](https://generativeai.pub/). Connect with us on [LinkedIn](https://www.linkedin.com/company/generative-ai-publication) and follow [Zeniteq](https://www.zeniteq.com/) to stay in the loop with the latest AI stories.

Subscribe to our [newsletter](https://www.generativeaipub.com/) and [YouTube](https://www.youtube.com/@generativeaipub) channel to stay updated with the latest news and updates on generative AI. Let’s shape the future of AI together!

![]()