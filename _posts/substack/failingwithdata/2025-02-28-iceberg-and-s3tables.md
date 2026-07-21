---
title: "Iceberg and S3Tables"
date: 2025-02-28
layout: post
source_url: "https://failingwithdata.substack.com/p/iceberg-and-s3tables"
substack: "failingwithdata"
substack_id: 157752448
---

Iceberg is the latest trend in the data space, and for good reason (it allows different products to share data in a standard way) Everyone is thinking, *"I’ll store all my data in Iceberg to avoid vendor lock-in."*. But I’m not so sure that’s actually true.

In theory, Iceberg hasn’t won yet. There are other data lake format implementations out there. However, Databricks and Snowflake (the two largest cloud companies) put the format in the spotlight when they battled to acquire Tabular, the company behind the Iceberg spec. Databricks won, but in theory, everyone benefits from the increased adoption.

AWS recently announced an extension to S3 to manage Iceberg tables (S3 Tables). This move surprised me, S3 is AWS’s flagship product, so adding native support for Iceberg suggests they’re seeing something we aren’t (probably S3 usage stats).

Iceberg itself isn’t a complex format, understanding the spec is a matter of spending a few hours reading the spec and then a few questions to your favourite GPT. But managing it? That’s where things can quickly become a headache. That’s exactly what S3 Tables aim to solve: no need to worry about compaction, cleanup, or spinning up EMR clusters to let Spark handle it (since Spark is, afaik, the only battle-tested Iceberg implementation).

Moving data into S3 Tables is convenient, you get all the power and cost benefits of S3 without the management overhead. Of course, data compaction at scale is expensive, especially if you’re dealing with massive datasets. [I made the math](https://www.linkedin.com/posts/javisantana_a-quick-analysis-on-the-s3-tables-pricing-activity-7270077869572202496-b3dv?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAB5CrEBAM8MJvKmk4L86t3SIsJYVrGEF9k) and some of our customers would spend $60k a day (for a real time workload)

But here’s the catch: if you want to process that data, you’ll likely need to do it within AWS. Egress costs make running outside of AWS nearly impossible. So in the end, AWS wins.

So you’ll not have vendor lock-in in your database engine but you’ll have a different kind of vendor lock-in.
