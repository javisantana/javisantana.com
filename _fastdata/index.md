---
layout: base_data
---

<div class="container">
  <div class="entry">
  <h1>Fast data — <span>@javisantana</span></h1>
  <p>I'm the cofounder of Tinybird, a data product. I write about data here.</p>
  <div class="entry more">
      <ul>
      {% for post in site.fastdata %} {% if post.title != "Index" %}<li style="list-style-type: none;"><a href="{{site.url}}{{post.url}}">{{ post.title }}</a></li>{%endif %}{% endfor %}
      </ul>

</div>

