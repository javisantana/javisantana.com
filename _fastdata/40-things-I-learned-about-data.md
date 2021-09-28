---
layout: data
published: true
name: 40 things I learned about data
tags: en, API, data
---

Today there are 40 days left to my 40th birdthday. I've been working with data for 20+ years now and I feel like trying to summarize what I learned in a few points.

I'll share one thing every day until I turn 40.

## 1. It's hard to capture reality with data

Trying to recreate an accurate version of the reality, no matter what that is or how simple looks like, is hard. 

Other way to see it: modeling reality always get complex. There are always small nuances, special conditions, things that changed, edge cases and, of course, errors (which sometimes became features)

The only models I found easy to work with and understand are the ones that reflect computer things.

## 2. There is no "the best data format"

We format the data to move it around. It could be hundreds of kilometers or a few nanometers but we always need to encode information somehow.
I never found "El dorado" of data formats. 

Text formats are easy to read by an human but harder and slower to parse.

Binary formats are fast to parse but hard to debug.

XML is a good container but it's to verbose.

JSON is easy but does not have basic data types.

Serializable formats are not good to keep them in memory but specific formats for in memory operations are not binary compatible with other laguages.

The most important thing I learned is: you need find the right balance between speed, flexibility, compatibility and human-computer interface.


## 3. Good data models make good products

When the data model is not well designed, everything that goes after feels wrong. You feel like you are doing hacks and tweaks all the time. 

When the data model is the right one everything flows, it's easy to explain, when you make a change it just fits like a good Tetris play. Only time can tell if the data model was good, if it still supports your product/app, you did it right.

Designing a good data model takes time, prototypes and a well understanding of the reality your are simulating (see 1 for more into)


