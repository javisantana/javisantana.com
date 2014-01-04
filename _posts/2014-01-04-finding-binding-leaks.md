---
layout: blog3
published: true
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

During last chrismas I decided to do a big refactor in some part of CartoDB (wizards if you know it), and some views had binding leaks. Find them is really hard and sometimes it takes hours to find them even if you have tools. For example, we have a checker to detect leaks while the app is running, just execute [cdb.core.View.runChecker](https://github.com/CartoDB/cartodb.js/blob/develop/src/core/view.js#L152) int the console and it will show a list of "missing bindings". It works but only with the views that are currently created.

I though it would be better to find them in **testing stage** so I created a jasmine (*) helper:

```
  it("should not have leaks", function() {
    expect(view).toHaveNoLeaks();
  });
```

What basically does is:

- search for objects which inherit from Backbone.Event in the view itself and the children (we use a ``_subviews`` array to track them, but this is for another post)
- [clean](https://github.com/CartoDB/cartodb.js/blob/develop/src/core/view.js#L45) the view
- search for events already binded to some views

Really simple, easy to use in all the view tests. It saved me hours of in-app testing. The function itself is defined [here](https://github.com/CartoDB/cartodb/blob/feature/CDB-1265/lib/assets/test/spec/SpecHelper.js#L188) if you want to take a look. It can be improved with a more smarter logic but it's enough for the moment.

(this post is actually a mail I was going to send to frontend cartodb developers but I though it may result useful for someone else)

(*) we use jasmine but I totally hate it