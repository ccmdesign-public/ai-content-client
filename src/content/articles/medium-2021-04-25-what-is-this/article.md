---
title: "What is this ?"
author: "Voice of Code"
platform: "medium"
publicationName: "Voice of Code"
url: "https://medium.com/voice-of-code/what-is-this-6f24baa8dbe8?source=rss----aa394f020b61---4"
publishedAt: "2021-04-25"
tags:
  - "developer"
  - "programming"
---

# What is this ?

[Vivek Anand](/@slimcoder?source=post_page---byline--6f24baa8dbe8---------------------------------------)

3 min read·Jan 21, 2020

\--

![]()

## What is this ?

Today I’m writing this article on a concept which is easy to understand but hard to explain to someone .

Few days ago my lead asked a very easy questions he said “What is this ? in programming” i replied “This refers to instance of current class” he said you are right.

Then he wrote this in console of chrome and said “can you please tell me the output” yes i said it will return “window” and after that our conversation ends.

I know i was right but i thought i should dig into “this” keyword because it’s meaning is same but it return very different output because it depends on execution context and instance which we create in a class as you can see in picture above you can get clear idea of how “this” works but still you need someone to explain that , Chill! I’m here.

JavaScript a language very easy to learn but hard to understand , because of it’s weird behavior or maybe sometimes we are doing things in wrong way so before learning any language learn it’s internals , structure , behavior , core.

So in this article i will try to explain “this” keyword.

1.  If you “console.log(this)” and run that code it will return “window” because you are currently in global execution context.
2.  If you are in “strict mode” (in this mode we restrict JS to do shitty things which it most of the time do) and run “console.log(this)” it will return “undefined” because in this mode you can only call “this” when you create any instance/use dot notation/bind/call/apply “this”.
3.  If you are using “dot notation” i.e obj.method() then “this” refers to “obj” but if you are in “strict mode” then “this” will be “undefined” you need to call/bind/apply it.
4.  If you are passing “this” explicitly by using call/bind/apply then it refers to instance of that “this” which you have passed.
5.  If you create object with new keyword then “this” will refer to instance of that object.
6.  If you create “arrow function” (unlike normal function it doesn’t have his own “this”) then inside of it “this” will be instance of it surroundings . Sounds difficult here is an example suppose if you are in a class then inside arrow function “this will be instance of that class” if you wrote arrow function in global scope then “this” will be instance of global scope.
7.  If you create a normal “function” ( I’m taking about function method()) then inside of it “this” will be instance of that function that’s why we bind “this” to normal function to excess global in react.

I hope you can now picture behavior of “this” or use above picture for visualization.

Hope you will clap on this article because I wrote this article after being frustrated from “this” but as you all know “this” matters.

If you like this article please follow me or subscribe me on these plateforms.

-   [Medium](/@vvkofficial)
-   [Facebook](https://www.facebook.com/vvk.anand.official)
-   [YouTube](https://www.youtube.com/channel/UCRfB2PR9Vlf0C1l17qup-Wg)
-   [Github](https://github.com/viveksharmaui)
-   [LinkedIn](https://www.linkedin.com/in/vvkofficial)