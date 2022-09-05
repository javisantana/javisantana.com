---
layout: data
published: true
name: Usage based billing on data products
tags: en, API, data
---

Every time I go to the <MY CLOUD PROVIDER> console to understand how much I'm spending in some particular thing I end up giving up. That's not a Google thing, almost all the service providers that bill you by usage provide interfaces that are hard to understand.

I don't blame them, it's actually hard to do it right because just tracking the usage is a non trivial task, not to mention when you need to mix usage plus the ad-hoc agreements when signing the contract: sales people usually give a better pricing, first X units are free or have different tiers based on the usage.

On the other hand, the big problem here is: there are really a few incentives to make it better, if you don't know where you are exactly spending your money you are not going to optimize it. Just that. I didn't look them up, but I'm 100% sure there are companies with products just focused on understand your Amazon bill.

The product we develop at the company I founded (*) charges by usage. The product allows you to run SQL queries (and generate API endpoints based on them) over the data you push to the product and we bill based on the amount of bytes you read/write. Easy to explain. Let me explain some decisions we made to make it 100% clear and easy to the user.

1) Costs are fine grained. It's not aggregated, you can see them raw. So each query you run you know exactly how much it costs. At the beggining when we designed the system we provided stats by day. That's nice but it does not allow to know what **exactly** is being cheap/expensive. Funny thing here: costs are stored in a table you can also query as another table. 

To be clear, this sounds the easier part, but just handling usage is hard, usually because the amount of information is huge and you need entire teams just to deal with this.

2) Costs are reported real time. You run a query that scans 1Tb and that peaks the costs per minute, you know it after 1-2 seconds. You don't need to wait for a report to be generated. Most of out clients have graphs/alerts in their monitoring systems using that data in real time.

3) We limit the "shoot yourself in the foot" opportunities as much as possible. For example, our product have an UI which is generally used to explore your data. It's so easy to run a query that runs a full scan when you don't know the data and incurr in unexpected costs that we just don't charge by those queries. We also show several hints to the user when they are running something "expensive". 

4) As the final resort, our Customer Success team (yes, real people) has dashboards that track usage and ping clients in case anything is unnusual. We help clients to optimize their queries as if we'd pay for them. This sounds totally counter intuitive, but it drives more product usage in the long term and it makes me sleep well at night (which is you can't pay with any money you can earn overcharging your clients). Looks like being fair always wins and trust me, this would no happen if the team had a "Reveneu target KPI". 

Hope it helps if you are implemented usage based billing. BTW, we use our own product to implement usage based billing.

(*) And no, I'm not going to try to sell anything here, I'm not even linking to it, I'm tired of people trying to sell me things.
