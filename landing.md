---
layout: wipeout_landing
---

<div class="wo-wrap">

  <header class="wo-header">
    <div class="wo-badge">ANTI-GRAV LEAGUE</div>
    <h1 class="wo-title">JAVI SANTANA</h1>
    <div class="wo-status">pilot profile // incoming transmission</div>
  </header>

  <section class="wo-panel">
    <div class="wo-label">01 — pilot file</div>
    <p class="wo-text">
      Hello, I'm Javi Santana. You landed here from a social network — here's the 101:
    </p>
    <ul class="wo-stats">
      <li>Tinybird co-founder</li>
      <li>Tech person — data, databases — career started as graphics / game programmer</li>
      <li>Writes about technical stuff, startups, and low-quality philosophy (getting older, that's what you do)</li>
    </ul>
  </section>

  <section class="wo-panel">
    <div class="wo-label">02 — comm channels</div>
    <p class="wo-text"><strong>Subscribe to my newsletter</strong></p>
    <a class="wo-channel" href="https://failingwithdata.substack.com">
      <span class="lang">EN //</span>
      English mailing list — technical content about data engineering, product building, and startups
    </a>
    <a class="wo-channel" href="https://javisantana.substack.com">
      <span class="lang">ES //</span>
      Spanish mailing list — contenido técnico sobre ingeniería de datos, construcción de productos y startups
    </a>
  </section>

  <section class="wo-panel">
    <div class="wo-label">03 — data stream</div>
    <div class="wo-log">
      {% assign alldocs = site.posts | concat: site.inspiration | concat: site.fastdata | sort:"date" %}
      {% assign log_pos = 0 %}
      {% for post in alldocs reversed %}
        {% if post.title != "Index" %}
          {% assign log_pos = log_pos | plus: 1 %}
          {% if log_pos < 40 %}
            <div class="wo-log-row" id="{{ post.slug }}">
              <span class="wo-log-num">{{ log_pos | prepend: '0' | slice: -2, 2 }}</span>
              <a href="{{ post.url }}">{{ post.title }}</a>
            </div>
          {% endif %}
        {% endif %}
      {% endfor %}
    </div>
  </section>

  <footer class="wo-footer">
    Find me on
    <a href="http://twitter.com/javisantana">twitter</a> ·
    <a href="http://www.linkedin.com/in/javisantana">linkedin</a> ·
    javi@tinybird.co
  </footer>

</div>