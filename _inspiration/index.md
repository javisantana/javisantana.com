---
layout: base_data
---

<div class="container desierto">
  <div class="entry space">
  <h1>Inspiration — <span>@javisantana</span></h1>
  <p>I'm cofounder of <a href="https://tinybird.co">Tinybird</a>, a product to build realtime data products.
  These are the quotes that inspire me.</p>
  </div>

   {% for post in site.inspiration reversed %}
   {% if post.title != "Index" %}
        <div class="entry space" id={{post.slug}}>
            {% if post.title and post.tags contains 'post' %}
            <h2>≗ {{post.title}}</h2>
            {% endif %}
            {{post.content}}
          <a href="#{{ post.slug }}">#</a><a href="/{{ post.url }}"><span class="date">{{ post.date | date: "%b %d, %Y" }}</span></a>
        </div>
    {%endif %}
  {% endfor %}

