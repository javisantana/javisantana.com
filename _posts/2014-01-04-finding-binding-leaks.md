---
layout: blog3
published: false
---

## Finding bindings leaks 

If you are developing a medium/big javascript frontend application you **do** want to have a isolation mechanism for views. This is the only way to keep your application working as expected as its size grows.

For the moment HTML does not provide a native way to do this so you have to rely on javascript side to do this. Ok, that's not totally true, ``iframes`` are a sandbox (spotify uses them to isolate views) and [shadow DOM](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/) is not still there.

There are a lot of libraries to do this, in CartoDB we use Backbone, it's simple, small enough to fully understand it, no magic, no extensions on top of HTML and provide a evented system to comunicate model and views.

The typical Backbone view looks like this:

```
var View = Backbone.View.extend({
  initialize: function() {
  	this.model.bind('change:attr', this.render, this);
  }
})
```

So every time `attr` changes the view is rendered. In current Backbone version you have ``listenTo`` method which tracks which objects are attached to a given one but when we started to use Backbone that method didn't exist so we use the 3rd argument to know what object a signal is attached to. Easy but you have to remember to pass the ``this`` always you link a signal.

When a view is removed all those links must be removed, if it's not done those views are going to last forever. That's "only" a memory use but imagine the view have some side effects like saving another model to the server...

During last chrismas I decided to do a big refactor in some part of CartoDB (wizards if you know it), and some views had binding leaks. Find them is really hard and sometimes it takes hours to find them even if you have tools. For example, we have a 