---
layout: post
published: true
---

When you start a SaaS company you think every single client will be happy to not have to manage
their data, they just forget about servers, backups, maintenance... all those things that you don't
want to deal with.

And that's actually the reality, you leave those tasks to some people that are experts on that
matter and know how to do things far better than you. You only have to pay some amount of money (that of
course is less than the one you'd pay if those services were managed within your company) and trust
the people behind the service (the hardest part)

At some point in your company you will realize those amazing ideas are not that good when talking
about data privacy and security among other things like enterprise authentication methods, custom
hardware, [redbooth private cloud](https://redbooth.com/private-cloud) landing sums up all the reasons quite well.

So yeah, you were using a dozen of amazon services that you can't use in a private cloud, you will
need to face the active directory reality, the high availability, the updates... outside your confy
amazon cloud setup, managed by people don't know anything about your service.

And the problem, there is a little information out there, so you will face a lot of problems, like:

- How to distribute: install script, RPM packages, virtual appliance...
- Managing updates: security updates vs major updates
- License systems
- High availability 
- Backups and disaster recovery
- Support
- 3rd party auth (active directory, kerberos...)
- Monitorization
- How open the service should be (black box vs open)
- Internal release process
- Other things like announcements, communication channels, marketing, technical information and
  documentation...

There are some well know companies that have different approaches to the problem:

- [Travis CI](https://enterprise.travis-ci.com/docs) has an installer (docker based).
- [Atlasian](https://confluence.atlassian.com/adminjiraserver070/installing-jira-applications-on-linux-749382634.html) has a installer and [pretty nice documentation on upgrades](https://confluence.atlassian.com/adminjiraserver070/upgrading-jira-applications-749382701.html) depending on the SLA you need. They actually moved from onpremise to have a SaaS according to.
- [Github](https://enterprise.github.com/home) has a virtual appliance. I follow this
  one really closely because of the release process, they manage it incredible well, take a look at this [update
  mail](http://github.cmail20.com/t/ViewEmail/i/E1FF4F9947CDE5EE/EEEF9C15731A5DA59A8E73400EDACAB4)
- There is a meta company that provides a service to create onpremise versions, [Replicated](http://www.replicated.com/). I don't think they can cover all the cases but it 
- Of couse CartoDB provides an enterprise version, [CartoDB enterprise](https://cartodb.com/enterprise), we have a mix of virtual appliance plus LXC and some other more customized installations based on installation script. One of our challenges here is we are an open source company with the good and the bad parts.

Do you know more companies doing onpremise/enterprise versions? I've created a [slack channel](https://saastoonpremise.slack.com/) so you can join and share them or talk about your experience with the enterprise world problems, feel free to join.
