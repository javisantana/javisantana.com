---
layout: base_data
---

<div class="container">
  <div class="entry">
  <h1>Fast data — <span>@javisantana</span></h1>
  <p>I'm cofounder of <a href="https://tinybird.co">Tinybird</a>, a product to build realtime data products. I write about data here.</p>
  <div class="entry more">
      <ul>
      {% for post in site.fastdata %} {% if post.title != "Index" %}<li style="list-style-type: none;"><a href="{{site.url}}{{post.url}}">{{ post.title }}</a></li>{%endif %}{% endfor %}
      </ul>
  </div>

</div>

