---
layout: post2
title: Internal guide to report a bug
date: '2013-07-10T10:25:00+02:00'
tags:
tumblr_url: http://javisantana.tumblr.com/post/55086747076/internal-guide-to-report-a-bug
---
This is the mail I sent to the internal mailing list in vizzuality some weeks ago when we started to prepare the next big release of <a href="http://cartodb.com">CartoDB</a> (probably it will be live when you read this post) with some guidelines to report bugs while manual testing is performed. I think it might be useful for you:

Hey,
 
The following days we will report lot of bugs (I hope not &#8230;) and there are some things we can do to improve the time they take to be resolved:

- We assume we work on chrome/osx. If you are using other browser/OS report it, specially IE/windows. 

- Sometimes the bugs can't be reproduced easily, don't worry, just report it and write all the things you did, every detail is important and write you can't reproduce always. This is very important because if you don't say that we will mark it as invalid and we will spend some time discussing it

- Please, don't use "gets crazy", "crash", "does not work", they don't provide information and make developers feel bad, really.

- Spend time reproducing and reporting the bug, if a bug report is good the resolution is easier.

- Open developer tools (or similar) when you are testing, if you see a javascript error, report it in the ticket. In some cases resolution time is 100x faster.

- Do not assume things work in the way you think, please report the expected behavior

- Be smart reporting bugs. Maybe that wrong padding is important, but if there are 200 tickets with real important things that does not work report it and add to a different milestone. Tickets are like inventory, keeping inventory cost money: <a href="http://www.joelonsoftware.com/items/2012/07/09.html" target="_blank"><a href="http://www.joelonsoftware.com/items/2012/07/09.html">http://www.joelonsoftware.com/items/2012/07/09.html</a></a>

and the last one but not less important:

- We all feel bad when something does not work, especially when you are working so hard, so comments like "this is shit", "this shit does not work", complains and all "demotivational" stuff are not welcomed.

Thanks
