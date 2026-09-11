---
layout: minimal
lang: en
---

<main class="home">
  <h1>Javi Santana</h1>
  <p class="tagline">Pixels are the humble bricks with which one can build cathedrals</p>
 <p>Rather than telling you who I am, I'll show you what I've built.</p>
<ul>
  <li><a href="https://tinybird.com"><i>Tinybird</i></a> (2018–) — real-time data infrastructure. Co-founder. Built the product, managed the FDE team, then ran it as CEO.</li>
  <li><a href="https://carto.com"><i>CARTO</i></a> (2012–2018) — founding engineer to CTO. Geospatial data infrastructure. Zero to $8M ARR.</li>
  <li><a href="https://web.archive.org/web/20190828133838/http://agroguia.es/"><i>Agroguía</i></a> (2006–2017) — founder. GPS guidance software for tractors. Bootstrapped, profitable, run by one person. $200k+/year.</li>
</ul>

  <p style="margin-top:3em">Three good places to start reading:</p>
  <nav class="post-list">
    <div class="row">
      <span class="n">1.</span>
      <a class="t" href="/2024/11/30/learnings-after-4-years-data-eng.html"><i>Learnings after four years working with +50 companies on data engineering</i></a>
      <span class="y">2024</span>
    </div>
    <div class="row">
      <span class="n">2.</span>
      <a class="t" href="/fastdata/40-things-I-learned-about-data.html"><i>40 things I learned about data</i></a>
      <span class="y">2022</span>
    </div>
    <div class="row">
      <span class="n">3.</span>
      <a class="t" href="/2025/01/16/i-love-sql.html"><i>I love SQL</i></a>
      <span class="y">2025</span>
    </div>
  </nav>

  <p style="margin-top:3em">Here is what I wrote (all written by hand, no LLM traces)</p>

  <nav class="post-list">
    {% assign quotes = site.inspiration | where_exp: "q", "q.name != 'index.md'" %}
    {% assign feed = site.posts | concat: quotes | sort: "date" | reverse %}
    {% assign total = feed | size %}
    {% for item in feed %}
      {% assign num = total | minus: forloop.index | plus: 1 %}
      {% if item.collection == "inspiration" %}
        {% assign label = item.title | default: item.content | strip_html | strip_newlines | truncatewords: 12 %}
        <div class="row q">
          <span class="n">{{ num }}.</span>
          <a class="t" href="{{ item.url }}"><span class="qm">“</span><i>{{ label }}</i></a>
          <span class="y">{{ item.date | date: "%Y" }}</span>
        </div>
      {% else %}
        {% unless item.title == "Index" or item.title == "" or item.title == nil %}
        <div class="row">
          <span class="n">{{ num }}.</span>
          <a class="t" href="{{ item.url }}"><i>{{ item.title }}</i></a>
          <span class="y">{{ item.date | date: "%Y" }}</span>
        </div>
        {% endunless %}
      {% endif %}
    {% endfor %}
  </nav>

  <footer>
    <p><a href="https://x.com/javisantana"><i>x</i></a> · <a href="https://www.linkedin.com/in/javisantana"><i>linkedin</i></a> · <a href="https://javisantana.substack.com"><i>subscribe</i></a></p>
  </footer>
</main>
