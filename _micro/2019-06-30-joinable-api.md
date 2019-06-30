---
layout: micro_post
published: true
name: Joinable API
tags: en, api, data
---

## Joinable API

TLDR: nowadays any software service depends on others. The problem is your data ends up being
distributed and there is no easy way to join those different sources easily. I'm proposing a
"joinable API" to fix that problem.

### Data lock-in

We have been talking about the vendor lock-in for years, where once you start using a provider it's
nearly impossible to move to a different one. I think the software world is like that no matter the
software you use: once your software is running on production changing it is a really expensive and painful task.

Before the explosion of SaaS providers we had data exporting tools so you could more or less get your data in a standard format and import to
another system. Today that's not totally true: try to get all "your data" from your google analytics
account. Don't worry, those providers have tools that can access your data easily.

### Hundred of services

10 years ago was easy to see a monolithic services running on just one big machine
with everything needed in there (user management, accounting, the service itself) today you start a company and
the one week later your software is talking to several services through HTTP APIs.

That's good, you spend your time in the thing you provide more value instead of doing billing code.

### Give me some stats

Eventually, someone will ask a question like "hey, how many users do we have in our XXXX tier, have
signed up 3 times during the last month and also have ...."

So you either 1) use a platform that collects everything or 2) or a one that fetches data from all those services and put data in a place you can query. in any case, querying data from a third party services is a pain. Here is the point where a lot of scrapping and "CSV file transfer" horror stories start.

### Joinable API

Most of those operations are what we call [joins](https://en.wikipedia.org/wiki/Join_(SQL)). It's
easy to do when all the data is in the same place but hard to do in a distributed system.

So how do we keep those services and at the same time the possibility of using our data?
why don't we request to our service providers to have a Joinable API apart of full, easy to use and
documented data dumps and their regular service API (more on this in [this excellent talk](https://www.youtube.com/watch?v=NQ5_NnrBHjo))

### Tech solution

Let's imagine you have a regular OLTP database like Postgres, it'd be nice to be able to do:

```sql
SELECT * FROM MyTable 
JOIN Service('billing service', 'transactions')
ON ... 
WHERE date = yesterday() ...
```

fetching remote data is already supported by Postgres using FDW (and all databases have a way to fetch remote data)
but the problem is getting the data from the service.

The service would need to provide:

- An API endpoint that exposes resources. It does not need to be HTTP but it'd work.
- Each resource should be able to return a list of columns ordered by a column (so merge joins, the
  common ones in these operations are faster) with some filters (so databases can push down them)
- Most likely the data format should be columnar so it takes less time over the network. An example dataset with 1M rows, 12 columns takes about 10mb with the data well prepared (compressed binary columnar data format). 1M rows are enough to cover most of the common use cases.
- Ideally, some aggregations should be possible.
- It must be really fast. That's key but "batch" APIs traditionally have been slow.

This is what most of the distributed databases do, it's not rocket science, a common well-tested pattern that
every single service should expose so you don't have data lock-in.



