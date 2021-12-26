<div class="container">
  <div class="entry">
  <h1>Fast data — <span>@javisantana</span></h1>
  <p>I'm cofounder of <a href="https://tinybird.co">Tinybird</a>, a product to build realtime data products.
  These are the quotes that inspire me.</p>
  

   {% for post in site.inspiration %}
   {% if post.title != "Index" %}
        <div class="entry">
            {% if post.title and post.tags contains 'post' %}
            <h2>≗ {{post.title}}</h2>
            {% endif %}
            {{post.content}}
            <a href=".{{ post.url }}"><span class="date">{{ post.date | date: "%b %d, %Y" }}</span></a>
        </div>
    {%endif %}
  {% endfor %}

</div>