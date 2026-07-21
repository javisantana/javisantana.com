---
title: "We need a new git"
date: 2025-03-26
layout: post
source_url: "https://failingwithdata.substack.com/p/we-need-a-new-git"
substack: "failingwithdata"
substack_id: 159931989
---

A few years ago continuous integration systems were not a thing. You were lucky if you worked for a company with automation, so imagine having something that runs for every commit. We were using CVS, subversion and other similar non-distributed version control systems.

Those systems were like git, you didn't have a local repo, you needed to push into a remote server, but that's what we are doing most of the time these days as collaboration happens remotely. Git fundamentally only moved things locally and allowed better merges and collaboration. That's great but we paid a high price: git is hard to use.

With git, continuous integration system started to be popular, it was not entirely "thanks to" git, but it happened at the same time. Modern guys were doing nodejs projects, started using React and testing was mandatory, so did CI.

It was like magic, each push an automatic system would run and give you feedback: OK/NOK.

I'm changing topics for a second. Big data was slow because 20 years ago, hardware was not as fast as today. People got used to slow batch job processes, and that's what they have been doing since then. A few years ago, someone realized that processing a lot of data didn't have to be that slow and created a different kind of databases.

15 years have passed and we are still changing things locally and still need to commit manually and wait for a long feedback loop to know if we are doing great. We got used to it, we didn't even know we gave up on speed, we assume CI cycles are slow, we have to wait minutes from the time we type the last character to the OK.

This is becoming super important as LLMs are starting to be "in the loop". And as humans, they make a lot of mistakes, but if you give them feedback, they usually manage to fix them.

Speed is a feature and I think there is room (and hardware resources) to have a system that gives us feedback every time we type a new character.
