---
layout: data
published: true
name: Principles of data engineering
tags: en, api, data
---

We often think there is a right way to do things. Reality tells us time and again that the path is not as important as the experience you gain in doing things that way.

You can choose your own way, follow an existing one, or a mix; it doesn't matter. The interesting part isn't what following a philosophy gives you, it's what it doesn't take away, which is time spent thinking your choice isn't the right one. It might not be, but you'll never know unless you delve deeper. Yes, insisting on your own way of doing things helps, whether it ends up working or is a failure.

There are people who go about trying things superficially and end up doing things without really knowing why. It's not about never changing; it's about exploring far enough.

All this introduction is to say that my career in recent years has been focused on data work, always in what I like to call “high performance,” and I had never written down the principles I follow. It's worth spending a while explaining them to oneself, so here they are.

Data must serve a purpose.

When you generate data, it should have a purpose, and only the data that will be useful for that purpose should be generated.

I don't believe that storing data for the sake of storing it is useful (as you see, “just-in-case-ism” is not only harmful in programming). And if the ultimate purpose is to store them, they should do so perfectly, i.e., take up little space, not consume much, be secure, and above all, be able to be deleted when they are no longer useful.

That's why I don't really believe in the concept of “data warehouse.” The millions of euros spent on processing and storing data that are never used is astonishing. Remember, the first rule of any data engineer is “the best data is the one that is never written, or better yet, never generated.”

Whenever I start designing a data project, I start from the same place: what problem is to be solved, that is, start with the end in mind. All the projects I've seen where they start with “let's put such technology,” “let's think about the data model and then see,” “let's make a generic system,” “we'll save it in JSON and see later,” end badly and/or are very expensive.

Distilling, condensing, and explaining data is an art, although most of the time a BI tool is used.

Any analysis of the data must be quick.

Humans operate with hearing, sight, and other systems that are practically instantaneous, so should anything be in which a machine, much faster than a human, is involved.

I programmed video games and 3D for a while. In a game, you have to do all the calculations in 16ms, which is how long a frame of an animation should last for it to seem fluid. In fact, I started programming thanks to the source code of Quake (published in 1999), which, although it accessed a significant amount of information, maintained speed even on those machines (there are $20 microcontrollers more powerful than the best of that time). Allow me this digression, but Quake's code should be studied at university, and enough of so much “object-oriented programming.”

Feedback must be instantaneous.

It's not just about the data being fast; it shouldn't take long from when they are generated to when they are used.

An exam can be studied every day or the last day; guess which technique is the best for learning (which has nothing to do with passing an exam).

Data about data is as important as the data itself.

When things happen fast, you need to know what's happening, anticipate, detect when there's a problem, understand or simply stare at a graph moving for minutes out of sheer tribute to the number of orchestrated things that have to happen to see that number on the screen.

Yes, this is what we call metadata, and being meta, all the previous rules apply.

Surely someone who has been storing data for 25 years, processing it every month, can teach me a lesson in data work because they can process 1Gb for one cent. That's the interesting part.


(this post was translated by GPT4, I reviewed it and I feel like keeps the original spirit of the post and it did way better job that I'd have done)