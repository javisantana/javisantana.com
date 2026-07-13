---
layout: te_landing
---

<div class="te">

  <header class="te-header">
    <div class="te-mark"></div>
    <h1 class="te-name">javi santana</h1>
    <p class="te-sub">builder · data · startups · low quality philosophy</p>
  </header>

  <section class="te-section">
    <div class="te-section-label">profile</div>

    <div class="te-row">
      <div class="te-thumb dark">JS</div>
      <div class="te-row-body">
        <div class="te-code">JS–101 <em>the 101.</em></div>
        <p class="te-desc">
          hello, you landed here from a social network. this is everything you need to know.
        </p>
        <ul class="te-specs">
          <li>tinybird co-founder</li>
          <li>tech person — data, databases — career started as graphics / game programmer</li>
          <li>writes about technical stuff, startups, and low quality philosophy (getting older, that's what you do)</li>
        </ul>
        <dl class="te-spec-table">
          <div class="te-spec-line"><dt>role</dt><dd>builder</dd></div>
          <div class="te-spec-line"><dt>focus</dt><dd>data engineering, product, startups</dd></div>
          <div class="te-spec-line"><dt>origin</dt><dd>graphics / game programming</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="te-section">
    <div class="te-section-label">newsletter series</div>

    <a class="te-row" href="https://failingwithdata.substack.com">
      <div class="te-thumb">EN</div>
      <div class="te-row-body">
        <div class="te-code">NL–EN <em>failing with data</em></div>
        <p class="te-desc">technical content about data engineering, product building, and startups</p>
        <span class="te-action">subscribe now</span>
      </div>
    </a>

    <a class="te-row" href="https://javisantana.substack.com">
      <div class="te-thumb">ES</div>
      <div class="te-row-body">
        <div class="te-code">NL–ES <em>javi santana</em></div>
        <p class="te-desc">contenido técnico sobre ingeniería de datos, construcción de productos y startups</p>
        <span class="te-action">subscribe now</span>
      </div>
    </a>
  </section>

  <section class="te-section">
    <div class="te-section-label">latest articles</div>

    <div class="te-log">
      {% assign alldocs = site.posts | concat: site.inspiration | concat: site.fastdata | sort:"date" %}
      {% assign log_pos = 0 %}
      {% for post in alldocs reversed %}
        {% if post.title != "Index" %}
          {% assign log_pos = log_pos | plus: 1 %}
          {% if log_pos < 40 %}
            <a class="te-row" href="{{ post.url }}" id="{{ post.slug }}">
              <div class="te-thumb">{{ log_pos | prepend: '0' | slice: -2, 2 }}</div>
              <div class="te-row-body">
                <div class="te-code">AR–{{ log_pos | prepend: '0' | slice: -2, 2 }} <em>{{ post.title | downcase }}</em></div>
                <span class="te-action">read more</span>
              </div>
            </a>
          {% endif %}
        {% endif %}
      {% endfor %}
    </div>

    <p class="te-explore"><a href="/">explore all articles</a></p>
  </section>

  <footer class="te-footer">
    find me on
    <a href="http://twitter.com/javisantana">twitter</a>
    <a href="http://www.linkedin.com/in/javisantana">linkedin</a>
    javi@tinybird.co
  </footer>

  <p class="te-quote">our product philosophy is "everything should be instant fun" — teenage engineering</p>

</div>