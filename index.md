---
layout: minimal
lang: en
---

<main class="home">
  <h1>Javi Santana</h1>
  <p class="tagline">Pixels are the humble bricks with which one can build cathedrals</p>
  <p>Builder at the intersection of tech and data. Co-founder of <a href="https://tinybird.co"><i>Tinybird</i></a>. I write about engineering, product and startups — mostly in Spanish.</p>

  <nav class="post-list">
    {% assign quotes = site.inspiration | where_exp: "q", "q.name != 'index.md'" %}
    {% assign feed = site.posts | concat: quotes | sort: "date" | reverse %}
    {% assign shown = 26 %}
    {% for item in feed limit: shown %}
      {% assign num = shown | minus: forloop.index | plus: 1 %}
      {% if item.collection == "inspiration" %}
        {% assign label = item.title | default: item.content | strip_html | strip_newlines | truncatewords: 12 %}
        <div class="row q">
          <span class="n">{{ num }}.</span>
          <a class="t" href="{{ item.url }}"><span class="qm">“</span><i>{{ label }}</i></a>
          <span class="y">{{ item.date | date: "%Y" }}</span>
        </div>
      {% else %}
        <div class="row">
          <span class="n">{{ num }}.</span>
          <a class="t" href="{{ item.url }}"><i>{{ item.title }}</i></a>
          <span class="y">{{ item.date | date: "%Y" }}</span>
        </div>
      {% endif %}
    {% endfor %}
  </nav>

  <p><a href="/blog/"><i>all posts →</i></a></p>

  <footer>
    <p><a href="https://x.com/javisantana"><i>x</i></a> · <a href="https://www.linkedin.com/in/javisantana"><i>linkedin</i></a> · <a href="https://javisantana.substack.com"><i>subscribe</i></a></p>
  </footer>
</main>
