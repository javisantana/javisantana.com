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

When the data model is the right one everything flows, it's easy to explain, when you make a change it just fits like a good Tetris play. Only time can tell if the data model was the right one. If after some years you still use the same data model (maybe not the same database or same code) you did it right. It's not that different to cars, buildings, companies...

Designing a good data model takes time, prototypes and a well understanding of the reality your are modelling (see point 1 for more info)

## 4. The second most important rule of working with data: the faster data is the one you don't read

As simple as it sounds, most people forget about using one of the most important database features: indices. Well, you also need to think about what's the actual data you need, a lot of apps are full of `select * from table`.

The problem is, as your system grows, so do the amount and complexity of queries. Know what data you need becomes harder. To avoid that you need... yes, data about how you query your data. 


## 5. When in doubt, use Postgres as your database.

It's quite typical when you start a project to decide what DBMS to use. Elastic, Mongo, some key/value like redis, funny things like Neo4J. If you have an use case that **clearly** fits with a database, fine, otherwise, use postgres or anything relational. Of course, there will be someone that says "but it does not scale". Anyone who has worked with a system at scale knows there is no storage system that scales well (except it's simple as hell and is eventually consistent, but not even that)

I love Postgres because of many things: solid, battle tested, support transactions (will write about them), feature complete, fast, it's not owned by a VC backed company, guided by the comunity, calm and steady progress, great tooling, cloud services providing infra, companies with expertise...

When you pick something funny, you end up developing half of the features a solid RDBMS system provide but just worse. 

I decided to use redis as the storage for [Tinybird](https://tinybird.co) and it's working great but as the project evolves you miss many of the builtin features postgres provides. Probably a mistake.

## 6. Behind every null value there is a story

When you join a company, just ask about it, you'll learn a lot



