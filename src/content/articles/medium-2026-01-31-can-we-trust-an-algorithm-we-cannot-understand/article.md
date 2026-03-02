---
title: "Can We Trust an Algorithm We Cannot Understand?"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/can-we-trust-algorithm-we-cannot-understand-7f9f3d5c91a7?source=rss----98111c9905da---4"
publishedAt: "2026-01-31"
tags:
  - "ai-general"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.660Z"
---

# Can We Trust an Algorithm We Cannot Understand?

# Can We Trust an Algorithm We Cannot Understand?

## Why Regulators are worried about the black box problem in financial and social decision making?

[Sudip Khadka](https://medium.com/@sudkc37?source=post_page---byline--7f9f3d5c91a7---------------------------------------)

7 min read·20 hours ago

\--

Isn’t an algorithm just a mathematical formulation built on set of assumptions? So why are some machine learning models so hard to explain? Is there some magic at work?

![]()

Before diving deeper, let’s understand what a “black box” actually means and why it has hindered the widespread adoption of machine learning models across industries. We will explore this through real world finance applications where the ability to explain decisions isn’t just nice to have but it’s very essential.

Imagine you have applied for credit card. You have a steady job, you pay your bills on time, never missed a payment, and your credit score sits at 720. Everything looks good on paper.

Then the rejection letter arrives mentioning “we regret to inform that your application has been denied.” Frustrated, you call the customer service line and ask “why was your credit card application rejected?”. The representative pulls up your file and reads from a script “our system determined that you don’t meet our lending criteria at this time.”

You asked “which criteria, and how can I improve?”. And the representative answers, “I am sorry, I don’t have that information. This decision was made by our AI system.

This is the black box in action. The computer analyzed hundreds of pieces of information about you including your income, credit score, open credit lines, spending patterns, even how you filled out the application form. It ran all these numbers through millions of calculations and produced a single answer; “reject”. The Bank can’t tell you why because the system itself can’t tell why. It just knows that people with your particular mix of information historically did not pay back as often.

### **Why This Matters And What’s The Cost of Not Knowing**

Without knowing why they were rejected, they don’t know what to fix. For example, should they pay down their debt? Or close an old credit line? Every piece of advice they find online contradicts the last one, so they apply to another card and get rejected again. This cause their credit score to drop. They are worse off than when they started, all because nobody could simply tell them, “your income compared to your rent in your neighborhood triggered our system.”

Regulators can’t do their jobs when they can’t see inside the box. Financial institutions must tell you why they denied your credit application, whether it’s your income level, debt you carry, or your payment history. This protects consumers and ensures lending institutions are not treating people unfairly based on race, age or gender. Banks cannot provide those explanation when the back box computer model makes the decisions. Due to which unfair treatment becomes invisible and impossible to trace or prove. The model might not directly look at race, but it might use neighborhoods, shopping habits, or online behavior that connect to race.

### **So Where Does This Mystery Comes From?**

Here’s where the things get interesting. Remember how we said an algorithm is just math built on assumptions? That’s true for simple rules, but machine learning like neural network works completely different.

Think of as teaching a child to recognize cats. You don’t give them a rulebook that says “if it has four legs, a tail, and meow then it’s a cat.” Instead, you show them hundreds of pictures and point out each animal and say “that’s a dog, that’s a cat, that’s a cow”, and eventually the child knows what cat looks like. At the end they learn, but they can’t explain exactly how they know to distinguish.

Training Process of a Simple Neural Network Architecture Showing the Forward Pass and Backpropagation

Machine learning works the same way. The system looks at millions of applications and starts to notice a patterns. But here’s the catch, these patterns get buried in millions of tiny number adjustments called “parameters” that happens during learning process. What started as a clear information like “income:$75,000” gets broken down and scrambled through so many calculations. By the end, nobody can point exactly what the model is looking at anymore.

The model just keeps adjusting itself until it gets really good at its task and some time better than human at deciding who should be approved or denied. But just like the child who can’t explain how they recognize a cat, the model can’t tell you why it made its decision.

## Get Sudip Khadka’s stories in your inbox

 from this writer.

The information did not disappear, but it just scattered across millions of tiny calculations in a way that’s impossible to trace back. The model learned something, but what it learned is hidden even from the people who built it.

### *Now Add Some Technicality And Think It As ML Engineer*

To understand where the back box comes from, let’s look at what a neural network is actually doing. A feedforward neural network with **L** layers computes a function of the form:

![]()

and each *sigma K* is a positive point-wise nonlinear activation function. The model is trained to minimize the following loss function:

![]()

which typically is the stochastic gradient descent:

![]()

So far, none of this is mysterious. The mathematics is explicit, differentiable and well understood. The black box does not arise from stochasticity or approximation, the real issue is something else entirely.

Consider a single input feature *x\_j*, say it’s an income. In the first layer *x\_j* contributes to every hidden unit:

![]()

Each component of hidden layer *(h1)\_i* depends on *x\_j* through the weight *(W\_1)\_ij* and the non-linear response of *sigma\_1*. Here, income is no longer a standalone quality because it mixed with all other features and passed through a nonlinearity.

In the second layer, every *(h1)\_i* which already encodes a nonlinear mixture of all inputs is multiplied by (*W2)\_ki* gets summed with other activations and transformed again.

![]()

At this point the influence of income is entangled with every other feature in a way that is no longer separable. This process repeats across layers and by the final layer, the effect of *x\_j* on the output is expressed through a deep chain of transformations. This influence is highly distributed and nonlinearly entangled with other features which makes it difficult to isolate, even though it remains fully deterministic.

*“Since backpropagation computes the partial derivatives, isn’t this sufficient to explain the contribution of each input feature to the model’s output? “*

The answer is no. Backpropagation applies the chain rule to compute partial derivatives with respect to earlier nodes which provides a measure of local sensitivity of the output to each feature at a specific input. However, these gradients only describe local behavior and do not represent the global or average impact of features across the data distribution.

### **Is This The Dead End?**

The inability to explain model decisions doesn’t mean we abandon deep learning, it means we need a different approach. This is where Explainable Artificial Intelligence (XAI) enters the picture.

Over past few year, XAI has made real progress and has pushed us beyond simply accepting the black box. Technique like SHAP (SHapley Addititive exPlanations), LIME(Local Interpretable Model-agnostic Explaination), and Counterfactual explanations offer ways to peek inside and understand what the model is doing. Despite these advances, the adoption of deep learning in high stake domains like finance and healthcare remains surprisingly limited.

Isn’t that XAI methods can’t provide transparency? The answer is “yes” they can but, the problem is they can’t provide certainty. Regulators bodies don’t just want explanations they want guarantees that the model is bias-free, fair, and legally defensible. A SHAP value might tell you that income was the most important feature for a particular decision, but it can’t prove that model isn’t discriminating based on protected characteristics in hidden ways.

Implementing XAI isn’t a one click solution, it comes with cost. It requires additional infrastructure, monitoring, expert interpretation, and documentation at every step. For many organizations the complexity and expense simply aren’t worth the marginal performance gains over simpler models. So we are stuck in an uncomfortable middle ground where deep learning offers superior predictive power, but interpretable traditional models offer something equally valuable i.e “*trust*.”

The gap between what AI can do and what we can explain is narrowing, but we are not there yet. As XAI methods mature and regulatory frameworks evolve, we are learning that accountability isn’t optional. It is the prerequisite for adoption. The technology that wins won’t be the smartest but the one we can trust will be.

*In future articles, we will explore who these regulatory authorities are and what specific components concern them the most. We will also examine what developments have been made to address these challenges and whether real change is taking place.*