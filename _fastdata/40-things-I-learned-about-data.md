---
layout: data
published: true
name: 40 things I learned about data
tags: en, API, data
---

Today there are 40 days left until my 40th birthday. I’ve been working with data for 20+ years now and I feel like trying to summarize what I’ve learned in a few points.

I’ll share one thing every day until I turn 40.

## 1. It’s hard to capture reality with data

Trying to recreate an accurate version of reality, no matter what that is or how simple it looks, is hard.

Another way of seeing it: modelling reality always gets complex. There are always small nuances, special conditions, things that changed, edge cases and, of course, errors (which sometimes became features).

The only models I found easy to work with and understand are the ones that reflect computer things.

## 2. There is no “the best data format”

We format the data to move it around. It could be hundreds of kilometers or a few nanometers but we always need to encode information somehow. I’ve never found the “El Dorado” of data formats.

Text formats are easy to read by a human but harder and slower to parse.

Binary formats are fast to parse but hard to debug.

XML is a good container but it’s too verbose.

JSON is easy but does not have basic data types.

Serializable formats are not good to keep in memory but specific formats for in-memory operations are not binary compatible with other languages.

The most important thing I learned is: you need to find the right balance between speed, flexibility, compatibility and the human-computer interface.

## 3. Good data models make good products

When the data model is not well designed, everything that goes after feels wrong. You feel like you are doing hacks and tweaks all the time.

When the data model is the right one everything flows, it’s easy to explain, when you make a change it just fits like a good Tetris play. Only time will tell if the data model was the right one. If after some years you still use the same data model (maybe not the same database or same code) you did it right. It’s not that different to cars, buildings, companies…

Designing a good data model takes time, prototypes and a good understanding of the reality you are modelling (see point 1 for more info).

## 4. The second most important rule of working with data: the fastest data is the one you don’t read

As simple as it sounds, most people forget about using one of the most important database features: indexes. Well, you also need to think about what’s the data you actually need, a lot of apps are full of select * from table.

The problem is, as your system grows, so does the amount and complexity of queries. Knowing what data you need becomes harder. To avoid that you need… yes, data about how you query your data.

## 5. When in doubt, use Postgres as your database.

It’s quite typical when you start a project to decide what DBMS to use. Elastic, Mongo, some key/value store like Redis, funny things like Neo4J. If you have a use case that **clearly** fits with a database, fine, otherwise, use Postgres or anything relational. Of course, there will be someone that says “but it does not scale”. Anyone who has worked with a system at scale knows there is no storage system that scales well (except if it’s as simple as hell and is eventually consistent, but not even then).

I love Postgres because of many things: solid, battle-tested, supports transactions (I will write about them), feature-complete, fast, it’s not owned by a VC backed company, guided by the community, calm and steady progress, great tooling, cloud services providing infra, companies with expertise…

When you pick something funny, you end up developing half of the features a solid RDBMS system provides but just worse.

I decided to use Redis as the storage for [Tinybird](https://tinybird.co) and it’s working great but as the project evolves you miss many of the built-in features Postgres provides. Probably a mistake.

## 6. Behind every null value there is a story

When you join a company, just ask about it, you’ll learn a lot


## 7. When I try to understand data I always end up using a histogram

When visualizing data you have to pick the right visualization type but before that, you need to understand the data.

I start using an avg, then avg plus stddev, then min-max and finally I go with a histogram.

It captures min, max, avg and most importantly, the data distribution.


## 8. Analytics it’s a product, not a department

When you have people asking for metrics and people extracting them from data. For the same metric, you’ll have as many definitions for a metric as people you have in the company.

Reporting is something that requires the same thing a digital product needs: owners, maintenance, clear definitions, improvements and you know, gives people what they want in a way that is useful for everybody in the company.

Many companies don’t consider analytics as a first-class citizen and end up spending more to have less quality.

## 9. It’s better to master just one database than be bad at two

It’s tempting to start using another database when you run into a performance problem or the lack of a feature.

There are always ways to make it perform better or solve the problem with a workaround.

You’d be surprised how good your database can perform when you understand the internals. It’s not that bad to do that thing in two steps instead of one.

If you go after the shiny new thing just because you find a small roadblock, you’ll never understand the actual limits of your database and you may never know when there is a real reason to change.

## 10. Try to use the simplest possible data structure.

A few years ago, one of the websites I was working on went on the front page of Google (yes, that small blue link). The traffic it gets is pretty high.

I had to develop search functionality. The first thing you’d think is to use the database you are currently using or maybe use a special one, like elastic.

But in this case, I needed to use the database as little as possible to be able to cope with the load.

So I decided to go the simplest way: create an index with an in-memory array where all the words would be stored. I ran a linear search, yes, a simple for loop with the search logic.

Was it the best index structure? No, if you just think about performance, but it worked, it was simple, easy to maintain and change.

There is always time to make it more advanced. With time you end up loving simple and flat arrays.

BTW, you can read the full story [here](https://javisantana.com/2013/06/27/como-aguantamos-una-portada-de-google.html)

## 11. Learn SQL

You may not like SQL based databases but the probability of dealing with a SQL based system in your career is so high that learning it as soon as possible will compound.

I didn’t like SQL, I still don’t like it even though I work with it every single day but I have to recognize it’s a handy tool.

## 12. The third most important rule of working with data: the fastest data after the one you don’t read is the one you read (and process) once

In other words, caching is one of the most important features and you should trade processing time by memory (or any kind of storage).

Caching is also applied statistics, you usually use LRU (least recently used) or MRU (most recently used) in combination with some kind of TTL (time to live) but there are many models to improve caches.

Just gather info about how your data is accessed and run simulations on how well different cache models perform.

## 13. There is always a schema

You decide on it when you write the data or later when you read it, but at some point, you need to decide attributes and data types for your data.

When you store data without schema you usually need ["armies of engineers who effectively become the schema"](https://twitter.com/javisantana/status/1275779816982220800). It looks easier because a lot of decisions are postponed.

On the other hand, not choosing the schema accelerates the development quite a lot, that’s why databases like MongoDB became so popular a few years ago.

## 14. Almost everything was invented years ago

Document-based databases: IMS from IBM, 1966, used in the Apollo program

Analytics databases: Teradata, 1979

> Future users of large data banks must be protected from having to know how the data is organized in the machine (the internal representation). A prompting service which supplies such information is not 

> - E. F. CODD, IBM Research Laboratory, San Jose, California - 1970

Those are examples but there are many more. So it is worth spending some time researching old systems to better understand the new ones.

## 15. Data debugging is as important as code debugging

When the data is not the expected one (and you usually find it when in production) you find the root cause.

With code, you reproduce the steps and reproduce (if you are lucky) the problem. With data, those steps don’t usually exist (I’ll talk about this) so you need to guess what’s wrong.

There are many ways, I usually use a mix of data visualization, drill-down, diffs, extrapolate from particular examples, snapshots and so on. I sometimes use unix shell tools, sqlite3 and mostly python, but that’s not important, each person should find their own tools.

## 16. Learn how Log data structure works

Log is probably the simplest data structure. If you are a developer you have been using it forever, writing into files, appending stuff to a list…

Append only structures have many properties but one of them is they play well with hardware. In general, today’s hardware performs at its peak when you do a bunch of stuff at the same time and you do it in the same place (in the disk, memory, cache…). That’s why almost every database has a Write Ahead Log to make their writes faster and more reliable.

At a higher level, there are things like Redis, Kafka and others that implement log structures in a distributed way. You should use them when you reach a point, they are good. Please, [read this blog post from one of the Kafka authors](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying).
## 17. If you want to process data at speed, you need to design for speed

In the same way that a fast car is not a regular car with just more power, a fast processing pipeline is not a pipeline with more or faster cores/memory/disks/network.

If you see an F1 they have a powerful engine but there are also hundreds of small details that are needed at high speed. And of course, there are some comfort options you need to get rid of.

When talking about data you may need to design with parallelism in mind, working only in memory, forget about slow operations and so on.

Remember there is an important difference between latency and throughput. Both are systems that require speed but a different kind of design.

The main thing I learned during all these years is: data processing gets slower with time and you need to watch speed metrics to avoid degradation.

## 18. I don’t believe in “data-driven”

At least in the way they are selling it: you’d be able to drive your company/department/life based on data, IA will rule the world.

Data captures just part of reality so I see it being pretty hard to make decisions just relying on data only.

I like more the term "[Data informed decision making](https://www.speedwins.tech/posts/jane-yang-from-basecamp#question-6)"

Machines can be run 100% data-driven (and they still fail), I don’t think humans can follow just what data tells them, I still believe humans are better than that.

## 19. Reproducibility is an invaluable aid

When working with data, being able to reproduce the exact results given the same data saves time and headaches (and also creates good quality pipelines).

In the software world having reproducible builds is still a challenge and data has the same challenges, plus the data side.

Race conditions, third party library changes, underlying architecture (not all of them run IEEE754 operations in the same way,[read the story about how game developers use fixed point to avoid problems with precision on multiplatform](https://www.gamedeveloper.com/programming/cross-platform-rts-synchronization-and-floating-point-indeterminism)).

A good read about this is "[Why use make](https://bost.ocks.org/mike/make/)"

Tomorrow there will be a story about this :)

## 20. When using data from sensors, try to capture as much data as you can

Some time ago I started a company that developed a mobile app (on windows mobile, android later) for farmers that use GPS. It was a quite successful company, I owned it for 12 years and it’s still running.

Anyway, GPS information was the main input for the app. After some months with the application running in production, I realized it was nearly impossible to reproduce problems. Farmers had a problem, they called me and I had to guess what the problem was asking really weird questions for non-tech people.

So I started to serialize all the states of the app for every change (4 times a second) so I was able to run exactly the same thing the farmer saw. That file I was storing became the application format, it had much more information than needed but it was totally worth it.

One funny thing is: 16 years ago there was no mobile internet so I had to find a way to send those files to my server, and of course make it really easy so farmers, with very little tech knowledge, could do it. I decided to generate a KML file (the Google Earth file) on an SD card every time a farmer used the app so that they could open it with Google Earth and visualize their work. KML supports loading placemarkers from an external server, so I used those requests to send the serialized file as URL params.

Years later, I ported the app to android and it was possible to sync works from the phone using 3G and Wifi but years later the KML service was still getting requests.

## 21. Learning the basics of how modern hardware works is key

I think it was after reading Poul-Henning Kamp’s [famous article](https://queue.acm.org/detail.cfm?id=1814327) (it’s not about HW but about the OS system) I realized there was a huge difference in performance if you use the hardware you use in the right way.

Using caches, using sequential writes and reads, exploiting data locality and parallelization as much as possible. This looks obvious now but it takes quite a lot of time to realize how to program properly with that in mind.

## 22. When you think about creating a data warehouse, start with the use cases and not the tech

It’s pretty common when companies get to a reasonable data size to start thinking about a data warehouse that allows you to analyze your data.

It’s also common that the first thing you think about is about the tech: slowflake, bigquery, redshift or something more realtime (like Tinybird, of course)

The way to think about it is: how am I going to use it?

For example, are you going to use your data to automate stuff? Just see how your automation tool reads data and how it needs it and exposes it in that way. Do you need automation or just access to create reports using any fancy BI tool? Do you also need to access stats to send them to your users?

Those are the questions, not the tech you are using to store the data.

## 23. For speed benchmarks, the one publishing it always wins

We quite often use benchmarks to decide what technology to use but I’ve never seen a speed benchmark where the one publishing it loses. This makes sense, I’d not spend a single minute running benchmarks on which I’m going to look bad but for God’s sake, you can’t win on everything.

That’s why I don’t trust technology that doesn’t talk about the downsides or the weak points.

When picking a technology you should evaluate your use case and use benchmarks as a baseline, not as the truth.

## 24. Compression is not magic

The first time I saw winzip running (on windows 98, of course) it was like a miracle. Later I learned there was something called compression algorithms that made data smaller. Yes, I tried to compress a .zip file to save even more bytes :)

When I looked at compression algorithms more in detail I felt dumb, the code was full of bitwise operations, huffman tables, RLE, blocks.

After some time I realized there are different kinds of compression algorithms and each one has different properties and you don't need to know how the code works in detail. It makes sense to understand where to use each algo depending on the kind of data you use.

Also knowing how the compression works allows you to encode the information in a way the compressor can do its best work. I recommend you to take a look at how PNG format uses filters to make the compressor life easier.

## 25. The most important rule when working with data: the best data is the one you don't write

When you don't write data you avoid processing, storing, migrating and updating it. 

Sometimes we say data is new oil but it's actually more like nuclear waste. It's a good example of ["software inventory"](https://www.joelonsoftware.com/2012/07/09/software-inventory/)

So when you think about: let's save this "just in case", give it a second though.


## 26. These are the values I hate the most

`NaN` - I divided zero by zero or you are using javascript.

`+Inf` - I divided something by zero?

`1970-01-01 00:00:00` - missing date somewhere

`9223372036854776000` - or any large number with 3 zeros at the end. An Int64 parsed like a float.

`-1` - a function is not working great. I hate this one because of socket programming

`500` - that feeling when you see it

`0º 00' 00` - projection didn't work

`0xFFFFFFFF` - debugging 

`0x00000000` - core dumped 

## 27. You end up loving immutable data

I hated immutable data structures, I though it was a total waste of resources, why using more memory storing things you can override. I started to code when machines had 128mb RAM, I still remember one of my first questions in the #C channel on IRC: "does someone reserved more than 64kb of mem?". I was using a 16 bits compiler at that time :)

With time I started to value more a more immutable structures, when you look at them you see exactly what happened, you can reproduce behaviour and in general is faster to write new things that override old ones.

These days I mostly work with immutable data structures (not directly but using databases that use them).

They don't always work, of course, there is no silver bullet.

## 28. There is some hidden Moore's Law for data

Something in this direction: "Volume of data duplicates every XX months".

For me, what was big a few years ago, it's the new normal today. 800Mb files were monsters, you could even store a full movie in one of them, now your server generates 1Gb per hour of logs in a Saturday night.

Systems are more capable so we gather more data because we can process it.

Networks are way faster.

Companies that used to store data in their servers now move it to the cloud. And of couse the cloud makes it easy to store more and more.

We have more sensors: phones, cars, cameras, connected devices... even my TV shows "the cookies dialog".

We reached the limits of Moore's Law and the industry had to shift to be smarter rather than faster and faster. I hope we follow the same path.


## 29. You need to understand the bussiness to get most of your data

When you don't understand what you are modelling you are not getting everything you can from the data.

There are always rules you can exploit in order to make it faster or simpler. 

I spend 80% of my time thinking on how to optimize data access for large amounts of data in order to get low latency queries. There are a few generic rules that you can use to optimize (see #4, #12 and #25) but what makes the difference is when you use bussiness rules.

There are some of them you can usually extract with some statistics and usage patterns but others you need to understand the bussiness you are in.

Well, no matter what you do, you should try to understand what your work is about.

## 30. When you set bounds, think beyond the outliers 

As I mentioned in #20 I founded the company that developed a mobile app for farmers. It used GPS and it'd store all the positions in a highly optimized data structure based on a quadtree. When I created the app the window mobile tables had a few megabytes of RAM so every byte counted.

In that quadtree data structure I had to set up the width and heigh. I decided to set it to 256km, a tractor is able to travel al 50km/h at top so it was *really* unlikely that a farmer would travel during 5 hours at top speed working (the working speed is usually less than 10km/h, so 5 times more unlikely)

One day a client called me and explained me the problem. It was not the typical problem, it was different, so after 20 minutes of questions I asked: how much distance did you travel since you started. Yes, he answeres "about 300km, I started to work 6 days ago and never shutdown the app".

I raised to 1024km :)

## 31. Your app needs to know how to work with eventual consistency

Eventual consistency means you can't garantee all the machines in your cluster report the same data at the same time. So when you write something you could be reading "stale data". 

So if you are working with a strong consistency (which usually means less performance and/or less availability) you app in general will be safe (if you use transactions wisely, of course) but if your system is eventually consistent, you better prepare your app to know how to handle it

## 32. The articles I liked the most about data

These are not the best ones but the ones I enjoyed a lot. You know you usually enjoy things because of mix of reasons: the content quality, the things you are working on and even your mood:

- [Mesh compression](https://iquilezles.org/www/articles/meshcompression/meshcompression.htm) by Iñigo Quilez. I love it because it explains how to "exploit" data to compress it better
- [How figma multiplayer works](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/) It explains how to sync data structures in a real time way. Kind of what the future of the web is ([and what videogames have been for 25 years](https://github.com/id-Software/Quake/blob/master/WinQuake/net_main.c))
- [Local fist](https://www.inkandswitch.com/pushpin/) by Inkandswitch. They explain about CRDTs and how to use them to get rid of the data lock-in the cloud vendores and pushing us to.
- [I was wrong about CRDT](https://josephg.com/blog/crdts-are-the-future/). Another one about CRDT.
- [Fixed timestep loop](http://www.iguanademos.com/Jare/Articles.php?view=FixLoop) This is old and it's about videogames and looks like it's not related to data, but it is.
- [How DynamoDB works](https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html) oldie but good, the paper about how DyanmoDB works
- [The paper about Procella, the youtube analytics database](https://blog.acolyer.org/2019/09/11/procella/)
- [Bittorrent distributed hash table spec](http://www.bittorrent.org/beps/bep_0005.html) Bittorrent was way ahead of its time and I hope, with all the distributed hype we have these days, comes back.

I think there are many more and I will keep updating the post as I remember more.

## 33. Timezones are easy until you have to compare data from two years 

No, they are never easy.

But those days when exactly one year ago DST was of but today is on are a real PITA

Like today :)

## 34 Data visualization is lossy

When I worked making maps one of the reference books was "how to lie with maps", it explains how visualizing the same data in different ways gives different information to the user.

There is no way to not lose information when you visualize it, it's actually the point, remove some information to focus on the one you are interested to show.

Visualization is based on perception and every human is different therefore impossible to make it perfect. Learning the very basis of human percepcion and how we understand distances, areas, colors and shapes (the basic tools of data vis) is key to do good data visualization and not lie by mistake.

On the other hand data vis is key to understand the data and it's one of the best data debugging tools. So master the principles and the tools to quickly analyze the data in your system.

But always ask: "the data I'm getting rid of to create this visualization is important?" and "is this visualization showing what the data is telling us or what I want it to tell us"?

Understanding data is a billion dollars industry for a reason.


## 35 Things around data are as important as the data itself

Things like security, privacy, trazability (lineage), clasification, documentation, accessibility are parts of working with data that have nothing to do with the data processing itself and are as important as the data itself.

When you create an ETL or any data processing tool (or just a simple application) you don't usually start with a "I'm going to add here some trazability stuff for the future" or "let's think about user privacy" (except maybe you work for wikipedia).

There is no single medium-large company I talked with that does not want a nice way to find data in a company wide catalog where data is easy to access for everybody. Most of them think that adding documentation to columns and making them "public" in the company directory is everything they need.


## 36. Working with real time data is an order or magnitude harder than non real time

Working with real time data (as data you have to process as it comes in) is like changing a wheel while you are driving. You can't stop the system, it needs to keep working and you have to deal with problems as they appear.

That's why things like Kafka makes it easier, you have a buffer that saves you.

Also you can't rely on "getting all the data and generating some views", you need to calculate those views when the data arrives. 

Changing my mind to think in real time took 2 years (and I'm actually getting used to it).


## 37. Books about data

These are the books I use as a reference or like them. Most of them are classic and most reference books rather than regular reading books.

THE book is "designing data intensive applications". This book is a must if you work with data, it explains all the basic concepts of databases, distributed systems and so on. Every single person working with data should have this book as a reference. You should also watch the talks from Kartin Kleppmann, the author, about data.

"Naked statistics" helps you to understand basic stuff about statistics in an easy way. Easy to read and gives you an overview. Not a formal book.

The visual display of quantitative information: a pretty good intro to data visualization

"Computer Architecture: A Quantitative Approach", Hennesy & Patterson. A classic to learn about computer architecture, CPU internals and so on.

"The algortihm design manual": it's quite long, of course, I didn't read but it's good to check some data structures and learn some algorithms.

"Systems performance, enterprise and the cloud". Another classic and good to have it as a reference.

"Effective data base design", William H. Inmon (the father of th data warehouse). Quite old (from 1981) and outdated (you laught a lot reading some concepts) but it has pretty bold statements that are true today.

To be clear, most of what those books say is already on wikipedia and many other internet places, but it's always good to have high-quality content in one single place. They will get outdated soon but some fundamental concepts will be here for a while.




