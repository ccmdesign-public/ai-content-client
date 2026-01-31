---
title: "Curry And Composition Function in JavaScript"
author: "Voice of Code"
platform: "medium"
publicationName: "Voice of Code"
url: "https://medium.com/voice-of-code/curry-and-composition-function-in-javascript-2dfc691bb68f?source=rss----aa394f020b61---4"
publishedAt: "2021-04-29"
tags:
  - "developer"
  - "programming"
---

# Curry And Composition Function in JavaScript

![]()

# Curry And Composition Function in JavaScript

[Vivek Anand](/@slimcoder?source=post_page---byline--2dfc691bb68f---------------------------------------)

2 min read·Mar 5, 2020

\--

In this article i will discuss about:

1.  Higher Order Function
2.  Curry Function
3.  Composite Function

## 1) Higher Order Function

Higher-order functions are regular functions that do one or both of the following:

1.  Takes one or many functions as arguments

2\. Returns a function

Let’s look at simple example.

> const c = b => b ;
> 
> add(a,b) => a+b; // here b is a function
> 
> add(3,c(3)) ;

## 2) Function Curry

A curried function is a function which takes multiple parameters one at a time, by taking the first argument, and returning a series of functions which each take the next argument until all the parameters have been fixed, and the function application can complete, at which point, the resulting value is returned.

> const add = a => b => a + b;
> 
> const result = add(2)(3); // 5

## 3) Composite Function

Curried functions are particularly useful in the context of function composition.

In terms of algebra :

> g: a -> b
> f: b -> c

Suppose :

> h: a -> c
> h = f . g = f(g(x))
> 
> // Algebra definition, borrowing the \`.\` composition operator

In JavaScript :

> const g = n => n + 1;
> 
> const f = n => n \* 2;
> 
> const h = x => f(g(x));
> 
> h(2); // 6