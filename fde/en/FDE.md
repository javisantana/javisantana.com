# Prologue

A prologue is really just a list of excuses and explanations you make in advance to protect yourself from criticism, especially your own. So feel free to skip it.

## Excuse me?

Lately I keep hearing people talk about FDEs, or “[Forward Deployed Engineers](https://en.wikipedia.org/wiki/Forward_deployed_engineer),” and most of them have no idea what the hell they are talking about. Not because they are stupid—though some might be—but because they have never been close to the real thing. So I am going to give you an account—mine, obviously—of what a team like this means, why you build one, how you run it, when it makes sense, how you hire and train it, and, while we are at it, why most of the clichés are bullshit.

But if you only remember one thing, make it this: FDEs are useful, they make sense, and you should consider having a team in your product company, especially if you sell high-ticket contracts.

## Who this is for

This is really for founders or people building these teams: B2B companies selling to reasonably large companies—though not necessarily—with products that require some integration.

But if you want one of these roles, or already have one, I think it helps to understand how other people do it. That always helps, whatever the subject.

## But why?

I am the founder of a B2B startup—Tinybird, around 70 million in funding, tens of millions in ARR. We build a technical product, and we built both the company and the product starting with an FDE team. The term did not exist for us then, but never mind. It was a good way to have customers fund your product research while getting useful help in return. You know, business.

The team is still running eight years later. It not only helps customers with specific problems, but is also part of the support team. Rather than having me tell you whether they are any good, [let the people receiving the help do it for me](https://x.com/search?q=tinybird%20support&src=typed_query).

I do not think many people have real experience with this, and even fewer are writing about it. Hence this document.

# What the hell does an FDE team do?

## A short introduction for people who do not work in B2B

For those of you who just read [B2B](https://en.wikipedia.org/wiki/Business-to-business) and have no idea what comes next: when you build a product and sell it to reasonably large and/or sophisticated companies, they normally need help. Some because they are hopeless, some because internal politics prevents their teams from executing, and others—the interesting ones—because they need your particular capabilities. In B2C, or even low-ticket B2B, you launch the product and leave people to figure it out. In high-ticket B2B, you do not want to leave them alone.

And, for the love of God, let us not kid ourselves: it is very hard for your software to fit a company’s requirements perfectly. There are always corners and nuances that need adapting. There is no shame in having a team that helps. There are legendary exceptions—Datadog, for example—where customer teams will happily beat themselves up solving the problems on their own, but even they always have technical people helping.

## What is an FDE, and how is it different from a consultant in a cheap suit billing by the hour?

The best explanation—an indirect one, granted—is this excellent [article by a former Palantir employee](https://nabeelqu.co/reflections-on-palantir). Palantir are the friends who coined the term. To be clear, call it FDE or whatever you like; it is someone who 1) knows what they are doing, 2) gets a foot inside the customer’s organisation to understand and solve their problem, and 3) brings home knowledge you can apply to your own product.

Traditional consulting does 1 and 2. Well, some consultancies do very little of 1 and focus entirely on getting that foot in the door from 2. Ideally, an FDE should focus on 3. An FDE should be able to return from the customer and implement whatever the product needs. That is relatively easy when the team is small and very difficult inside a large company.

There is a better way to define the role, though. The difference between a traditional consultant and an FDE—or at least how I see it—is that the FDE has skin in the game. They stay until the end and take responsibility. At Tinybird I have watched people on my team take over the customer’s project management because they could see the customer would never make it to production otherwise.

## What is the team’s objective?

My definition is simple, but it has been extremely effective for me: your objective is to get the customer into production as quickly as possible.

I have repeated that sentence roughly a thousand times a week, but it matters. Never get distracted by things like “billing more” or “providing technical assistance.” Sometimes the right help is to propose a solution that means not using your product at all.

To do that, obviously, you need to understand their problem. To understand and solve it properly, you need their context. You get context by asking, understanding, and asking again. Propose a solution, test it, validate it, ask again—and repeat. Developers happen to be experts at doing exactly that. We will get to this in the next chapter.

So if you stop reading here, you already have the key: do not get tangled up in metrics and stupid secondary objectives. If your customer wins, you win—in revenue, retention, your relationship with the customer. All of those are second-order effects.

One detail should not go unnoticed: when you go into a customer to solve a problem, sometimes the problem is not properly defined and you have to define it yourself. There is no more effective way to learn something than facing the situation firsthand. It is the difference between watching someone solve a maths problem and solving it yourself. You know what I mean.

# What should the team look like?

Whatever you do, the team is the key. Ed Catmull explained it in one sentence far better than I could:

> There is an important principle here that may seem obvious, yet— in my experience— is not obvious at all. Getting the right people and the right chemistry is more important than getting the right idea.

The right people with the right chemistry. Remember that. What you do still needs to make at least some sense, obviously. Catmull took that for granted, but we are Spanish, so it is better not to risk it.

Our premise was: “people are working with data the way they did 15 years ago, but the technology and hardware are much better now; we can help them do it better.” Eight years later, I can say that premise was correct.

## Who?

It depends on the product, of course. Ed and I have already told you that. But for the love of God, hire people who know what they are doing. Do not fill the team with paper-pushers who can only send emails and keep people warm. They are useless here. You need capable people with initiative. Those people are normally expensive. Do not cheap out. They tend to be engineers—that is more or less where the definition of FDE comes from.

I will say it again: do not cheap out. Every euro invested in these people pays back. A lot of companies try to save money here, in support, and in other things without an obvious return. In my opinion, that is a mistake.

In my case, I hire backend engineers. Yes, our field was “data engineering,” but “data engineers” were mostly people who knew how to use four tools, so we chose people with software experience and strong fundamentals. They did not know shit about working with customers, but that did not matter. People learn.

## But do they need to know how to “navigate the customer”?

I feel ill whenever I hear that these profiles need business knowledge and must know how to navigate and play politics. My experience is that when someone knows how to do that, they use it and end up “solving” things through manipulation. I was going to use a softer word, but why bother. In the long run, someone who solves things with facts and has a bit of initiative is much better.

You can have people who “navigate,” but they are there to support the FDE. I will explain how later.

So forget that requirement. People can learn. At Tinybird I have hired people who spoke while staring at their shoes, and they ended up working with customers—and enjoying it.

## Does it have to be a team?

Could they just be individuals? At the end of the day, it is one person working with one customer. Probably. But having a team makes sense, or at least that is how I have done it.

First, as always, somebody needs to keep prodding. Have you ever gone into a government office to do some paperwork? Did you see anyone who was not serving a desk, but simply watching to make sure the work got done? Someone who, when the civil servant says, “this requires form 405 and you need to go to another office,” replies, “no, we are sorting this out here.” That is what you need: someone who makes sure things happen.

Second, the team needs to prepare onboarding and processes carefully, organise and feed information to product, know when to apply pressure to get something finished, provide people to validate proposals with, and so on.

## What they do and how they do it

They help customers with the parts they do not know. They are not a bucket of billable hours; they are the resource that knows. In our case, FDEs do FDE work and also help in pre-sales, post-sales, support, and so on. Here I am only going to cover the work *inside* the customer.

There are three clearly defined legs to the work: 1) with customers—obvious, as Gen Z would say; 2) internally—not so obvious; and 3) with product—50% obvious.

1) The customer cycle is “relatively” simple:

- A customer appears with some kind of “challenge” inside your field. Do not take consulting work that only makes money, even if you could do it.
- Someone on the team decides whether there is a real challenge. Two things can happen: perhaps they only need four tweaks and a course correction, or perhaps there is real meat on the bone. You want customers with meat on the bone, obviously. An experienced person normally does this, but a few basics—which I will cover under training—are enough.
- In the first meeting, if possible, ask the customer for “data” you can work with immediately. No “let us arrange another meeting.” Go straight to the point. This is VERY important because it tells you whether they are wasting your time or actually have a problem. Large companies will of course say “NDA, blah blah,” but when the need is real, NDAs fly.
- Establish a permanent, real-time communication channel. We use Slack. Anything works, but it has to be where the customer lives. You need to be inside.
- Create a document stating where you want to get to and use it in every customer meeting. I am assuming all of this is remote, of course. Putting people in offices? What are we, animals?
- Hold a weekly check-in to see where things stand. Staying on top of the customer is fundamental. You need to be persistent. No matter how many processes, tools, and trained people you have, somebody needs to push. This applies to FDEs and anything else you want to ship, whatever the process enthusiasts tell you.
- If the FDE thinks it is necessary, force a meeting. Yes, yes, I know: meetings, blah blah blah. But there are meetings and there are meetings. Some exist so that people who have no fucking clue can make an appearance. The ones I mean exist to force decisions. These people do not hold meetings unless needed; they are not bad salespeople.
- Once the customer is in production, or you have solved the relevant problem, keep going. Monitor that everything works and stay on top of it.

The last part of this document covers the less technical management around all this.

2) Internally—what the team does as a team:

- Every week, review the important customers, the less important ones with potential, and the maintenance accounts.
- Collect every product problem and feature that is getting in the way. Do not forward them to product immediately.
- Review everything new in the product and see whether any customer could use it in their use case. Sometimes you simply send them a test using their own data—as we do. Remember: you are someone inside their projects. You do not need to ask permission.

3) With product:

- If possible, the FDEs should also be the people building the product. It is unusual, but possible while the product is young. You may overfit the solution, but that is still better than building castles in the air.
- The team lead attends product meetings and check-ins. They are the test pilot. If an FDE needs to speak to product managers, or whatever the current role is called, they do it. If they need to grab the PM by the ear and drag them into the customer, they do it. The FDE is the product team’s sense of touch—especially when things are burning.
- Track the problems, and when they are fixed tell the customer, “your thing is sorted.” There is no better retention strategy than showing people that you care about them. Otherwise, what are you still doing at your mother’s house at 30?
- Stand up for the product. There is no “product says they cannot do it.” Nothing is more pathetic than using your colleagues as leverage in a negotiation. It is pathetic. Do not do it. Choose to sleep well.

## Rotation

An important point: people get tired. AI does not, but people do. It is a good idea for them to 1) work with more than one customer at once and 2) change customers from time to time.

Ideally, an FDE should spend time in product. But let us be honest: moving people around is not trivial, and once you arrive in product you settle into the warm protection of product managers, engineering managers, support—the land of make-believe where problems are Linear tickets instead of situations in which you have to show your face.

Another good way to rest is to work on a difficult challenge. Customers regularly ask for absurd things. That is fine; I do it myself all the time. Things that look impossible at first. In our case those challenges look like “run this kind of query over 10 trillion rows in under 100 ms,” and they require going very deep. That research is pure gold. It keeps the team awake, raises the bar, and consolidates the fundamentals. It is expensive, but a demotivated team is more expensive.

## One last thing, no less important—and yes, I am repeating myself

If you think the objective of this kind of team should be to maximise revenue per customer, close this page and go sit in the thinking corner. The people who “know” call this “customer success,” and it is the absolute plague of the industry. No. Your objective, always, is to solve problems as quickly and as well as possible. Everything else is bullshit or something that will follow from good work—for example, money.

# Hiring and onboarding

You might think you need people with customer experience, consultants, or unicorns who understand technology and can deal with humans, dress well, have charisma and presence, are tall and handsome, romantic but firm…

No. You probably need to hire whatever your customer needs. Here is an example: we deal with developers, and those people can detect bullshit from 200 kilometres away. They do not trust anyone who cannot prove they know what they are doing, and they usually have very particular communication habits. Put someone in a suit in front of them and they will tear that person apart in half a meeting, and you will have lost your chance.

## Yes, but do they need “people skills”?

You need a minimum of respect and manners, and you need to be clear about what you are trying to do. You do not need to be a con artist. You just need some basic rules, which I will cover in the section on working with customers.

At Tinybird almost nobody we hired into this profile had customer experience. They did know what they were doing, and that is what matters. Having said that, I led this team, have spoken to hundreds of customers, and my personality is not particularly friendly—as you can probably tell from this document. Politics is not my thing, and I cannot read the dynamics of a group of people.

## Hiring

I do not think this is very different from what you look for in a product, backend, or whatever engineer, but I put A LOT—an enormous amount—of weight on how someone discovers the unknown.

The process is this: I propose a VERY open-ended but extremely simple technical exercise. There is an example [here](https://javisantana.substack.com/p/puede-chatgpt-trabajar-en-tinybird)[^1]. Once I see their approach, I keep changing the rules in the follow-up questions to understand how they frame problems.

The selection criterion is simple: if they start solving without asking questions, bad sign. If they ask, form hypotheses, try to understand, clarify, and narrow the problem, that is your person. Bonus points if they are technically solid too, obviously.

One important detail about hiring: it never ends, and it is not something you do occasionally. You need to talk about what you do. You need to be attractive to people, so that when you publish a role you already have good people interested. This is as easy as publishing useful things regularly, which almost nobody does because they leave it to marketing people who usually have no fucking idea what they are writing about.

Finally, hiring is Tetris. You have to find the right piece at the right moment. Sometimes the long bar is useful; sometimes it is not. Balance is the key.

## Onboarding

Onboarding is much more important than hiring. Good onboarding can fix a bad hire—and ruin a good one. The fundamentals are:

- Teach the foundations. Do not get lost explaining details. Hammer the basics about 200 times. You do, of course, need to know what the foundations of your business are.
- Make sure they land well in the team. If they are a smart-ass or everyone dislikes them, you are already screwed. There are many ways to handle this, but familiarity breeds affection, and the manager—or whoever is in charge—needs to be there, introducing them into the team little by little. That person lubricates the machinery, smooths out rough edges, and performs the social job of introducing someone to the rituals. Keeping a team trusting and free of bad blood is vital. I use humour and jokes constantly, even when we screw up badly. You probably have another technique. Use whatever you like, but making sure someone lands on their feet is your responsibility.

At Tinybird I use ancient techniques nobody could possibly have invented before:

- I recorded a course covering the basics they *have* to watch. Fundamentals. Nothing about the company, the product, or Christ who founded it. Very, very basic things, repeated and iterated on a thousand times. We published the material, in fact, and it also works as marketing and as part of the continuous hiring I mentioned earlier.
- A series of real exercises where we iterate on those foundations using the product. Obviously, someone follows their progress, asks questions, explains mistakes, and assigns exercises that reinforce whatever they did not understand. I also used to give them difficult problems so they would not get too full of themselves[^2].
- Gradually bring them into a customer, always alongside another FDE. Usually a smaller customer whose context is easier to understand, so they can lose the fear of asking questions or screwing up.
- At the same time, they must write down what they learn every day. This creates a writing habit that helps document things and lets everybody else learn—including the LLMs, obviously. We underestimate the value of explaining things clearly in writing and of documenting what we do. A great deal of the knowledge that made the team better came from internal posts explaining how somebody solved a customer problem.
- Finally, the last trick is to “[throw them to the lions](https://javisantana.com/2021/01/23/echar-a-los-leones.html)”: drop them into a mess and make them find their own way out. Works like a charm.

## Firing

Nobody likes talking about firing people because, culturally, it hurts. That is normal. If your country is a place where most jobs are low-skilled and the ultimate life goal is a permanent job—with the civil service as the final boss—it makes sense. Fortunately, in our industry, if one company fires you, you are doing four interviews the next day. It still hurts, but it is drama, not bloodshed.

With that out of the way, you can fire someone because they are not up to the job, do not fit the team, or whatever. But the one thing you must NEVER allow is a customer being poorly served or somebody making “excuses.” This is a business built on trust. That is the foundation you cannot lose. Likewise, if you are an FDE and your boss asks you to lie, start backing up your email and opening LinkedIn.

# The non-technical work with the customer

Not everything is technical. There are other important things to do with customers, especially reaching agreements, providing visibility, setting limits, and managing the relationship with the people in charge.

This is where a business person usually comes in: an Account Executive, a founder, the CEO, a CUSTOMER SUCCESS MANAGER KEY ACCOUNT ENTERPRISE SENIOR, or whatever God has decided to call them. I affectionately call them the suits. The important part is that this person sets the pace of the relationship, establishes limits, talks about money, and plays bad cop.

The suit NEVER, under any circumstances, gets involved in technical arguments. Two reasons. First, they will screw it up and lose credibility with the technical teams. Second, it is better to keep a clear line between operational/technical work and customer management. Think of them as two tracks, each doing its own thing. Eventually the FDE and the business person should be able to exchange a glance—over Google Meet, obviously—and know when one needs to step aside for the other. If you are the founder, you can do whatever you like and blow up the deal. That is what you pay yourself for. It is a joke, but it is not untrue.

## Starting the project

As I said, work with a customer always begins by talking about the problem to solve, with all the urgency in the world. Ask for access, data, contacts, and anything else you need to discover things as quickly as possible. The nerd—the FDE—does this work, not the suit.

That said, expectations need to be clear: time, commitment, money, and limits. This costs this much; you will speak to these people; you will have access to this person with this response SLA; we need this and that; and it costs this much per month—which of course everybody will try to include in ARR so the AE earns more commission. As God intended.

On the commercial side, you need to understand how your customers allocate budget. There are several ways to charge for the work:

- Consulting. This works well for a large company because they normally have an approved budget and are used to buying it. Register with some dreadful vendor platform and you are done.
- Premium support. The problem is that Amazon, Google, and plenty of others sell extremely expensive premium support that is absolute rubbish. I say rubbish from experience.
- Directly as part of the product contract: a mandatory 10% for enterprise contracts above $X.

Whatever the model, limit the hours, dates, involvement, response SLAs, and so on, just as you would in any contract.

You can choose not to charge and assume there will be a return. Sometimes it works, particularly when you are swimming in millions after raising a wildly overpriced round and a few thousand a month makes no difference to you.

## It is not enough to do the work; it has to look like you did it: business meetings

As I said, the business track has another job: making the work visible. The impact of an FDE is not always obvious. So when your “business” person meets—and they need to do this regularly—with the “business” person on the other side, the very first thing they explain is, “look, this is what we have done.”

Obviously, you prepare this meeting beforehand. The FDE and the business person get together, review the reports written by the FDE—hence that wonderful culture of documenting everything—and prepare:

- What we did and why. An LLM summary is not enough. You need to have your finger on the customer’s pulse, which LLMs do not. You need to read between the lines and understand what is really hurting.
- Next steps, blockers, and all the usual project-meeting stuff. I am not going to teach you how to manage a project here.
- Money and other business matters. NEVER, EVER mix technical people into these conversations. The FDE is there to solve; the business person is there to close and discuss these things. Mix the two and you start thinking in terms of money. Some information is useful, but eventually you absorb the idea that money is the objective.
- Finally, the million-dollar question—the source of your glorious NDR, the American metric for how much you expand an account: “are there any other projects you are working on?” Companies normally work on more than one thing. If something resonates, you can proactively propose working on it. Often it happens naturally: they start a project and the FDE hears about it. As an FDE, you need to keep your ears wide open.

## When the project ends

Projects never end; they slow down. But it matters that you keep an eye on how things are going. You can do it semi-automatically, in check-ins, through metrics, or by asking the customer’s team.

And if you work at a product company—otherwise, why would you have FDEs?—you know perfectly well whether they are going to churn, fully or partially. So you can make those wonderful forecasts senior leadership loves so much. And if you are smart, instead of staring at the forecast, you will do something to save the customer. You can almost always save them.

## Miscellany

People inside customers come and go. You need to pay attention and earn the trust of the new people. If you did good work, it should speak for itself, but always remember that humans are the worst and somebody may simply dislike you. If they dislike you, well, that is life. Just make sure it is not because you did a shitty job.

The work should be billed directly, billed as premium-support hours, or have a blindingly obvious ROI through expansion. This seems obvious, but especially in a startup it is easy to drift into “well, we will discuss it later.” In my opinion, you should jump into the pool and take some risk, but the numbers need to work after a few months. Otherwise, you are working for nothing.

Customers get used to incredibly good treatment and then refuse to accept anything less. That is why you charge and make sure the work is valued.

# Closing time

Leaving aside the fact that working and solving problems obviously makes money and teaches you things, there is something we forget: solving problems is fun and satisfying.

Many developers who had never worked with customers miss it once they move into other roles—normally product, because who is better suited to build a product than someone who has fought with it? Not only that: they have developed the habit of working with customers, they know how to ask the right questions, and they have ease. *Soltura*. I love that word.

## Some bad things

It is not all sunshine and oregano. These are some of the problems we have run into:

- The product becomes too dependent on the FDE to retain the customer.
- The customer relies too heavily on your FDE and expects things they should not.
- You end up neglecting organic product growth. You forget that self-service can be a good channel.
- It is hard to maintain an FDE culture and a product-led-growth culture at the same time.
- The product team gets used to a person compensating for product problems.
- FDEs end up complaining that the product is broken without attacking the problem themselves.
- It does not “scale”: to grow, you need more people, and people are the worst.
- I think I have enough material for another 4,500-word post, so I am stopping here.

## Need help?

Sign up for this course for only… nooooo, I am kidding.

If you made it this far, you have a B2B product company, want to build a team, or already have one and have questions. I am happy to help—write to me and we can talk. For free. I do not do this for a living; it is my way of [doing my bit for the ecosystem](https://javisantana.com/2025/02/25/espana-y-startups.html).

[^1]: If you read the post, you will see that I banned ChatGPT. Later, I would make it mandatory.

[^2]: As a manager, there are two important things I tend to do:

    1. When my daughter brings me her three-digit addition exercises to check, I often say, “one of these sums is wrong,” without looking at a single one. This triggers two things: she learns to make sure the work is correct, and she learns that “the boss” is not always right—that sometimes the boss is wrong, and you need to know how to challenge them. “Critical thinking” will be the star skill of the coming decades, with AI playing the know-it-all. The same thing works with employees: they think you are wrong, but they do not usually tell you.
    2. You should always set people goals slightly beyond what is expected—by you and by them. If somebody has capacity but you never test it, you will never know. During onboarding, this also sets expectations higher while it is still a game.
