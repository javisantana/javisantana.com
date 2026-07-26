---
layout: te_landing
title: Data products, engineering, and startups
description: Co-founder of Tinybird. I build data products and write about engineering, product, and startups.
permalink: /landing.html
---

<main class="te te-landing">

  <header class="te-header te-landing-hero">
    <div class="te-mark-static" aria-hidden="true"></div>
    <p class="te-kicker">Javi Santana · Madrid / internet</p>
    <h1 class="te-name">I build data products and write about what I learn.</h1>
    <p class="te-lede">
      I’m a co-founder of <a href="https://www.tinybird.co" data-analytics="hero-tinybird">Tinybird</a>.
      My work sits between engineering, product, and startups—usually where large amounts of data need to become useful, fast.
    </p>
    <nav class="te-hero-actions" aria-label="On this page">
      <a href="#start-here" data-analytics="hero-start-reading">start reading <span aria-hidden="true">↓</span></a>
      <a href="#about" data-analytics="hero-about">more about me</a>
    </nav>
  </header>

  <section class="te-section section" id="start-here" data-analytics-section="start-here">
    <div class="te-section-heading">
      <div>
        <div class="te-section-label">start here</div>
        <h2 class="te-section-title">Three good places to begin</h2>
      </div>
      <p>Popular, representative pieces from the archive.</p>
    </div>

    <div class="te-featured-grid">
      <a class="te-featured" href="/2024/11/30/learnings-after-4-years-data-eng.html" data-analytics="featured-four-years">
        <span class="te-featured-meta">01 · data engineering · en</span>
        <strong>Learnings after four years working with 50+ companies</strong>
        <span>Patterns from helping teams build real-time data systems.</span>
        <em>read article →</em>
      </a>

      <a class="te-featured" href="/fastdata/40-things-I-learned-about-data.html" data-analytics="featured-forty-things">
        <span class="te-featured-meta">02 · data · en</span>
        <strong>40 things I learned about data</strong>
        <span>Twenty years of data work condensed into practical observations.</span>
        <em>read article →</em>
      </a>

      <a class="te-featured" href="/2013/06/27/como-aguantamos-una-portada-de-google.html" data-analytics="featured-google-frontpage">
        <span class="te-featured-meta">03 · engineering · es</span>
        <strong>Cómo aguantamos una portada de Google</strong>
        <span>Una historia sobre escala, decisiones técnicas y sobrevivir al tráfico.</span>
        <em>leer artículo →</em>
      </a>
    </div>
  </section>

  <section class="te-section section" id="latest" data-analytics-section="latest-writing">
    <div class="te-section-heading">
      <div>
        <div class="te-section-label">latest writing</div>
        <h2 class="te-section-title">Notes from the workbench</h2>
      </div>
      <p>Data, software, building companies, and occasional low-quality philosophy.</p>
    </div>

    <div class="te-log">
      {%- assign alldocs = site.posts | concat: site.inspiration | concat: site.fastdata | sort:"date" -%}
      {%- assign log_pos = 0 -%}
      {%- for post in alldocs reversed -%}
        {%- if post.title != "Index" and post.name != "Index" -%}
          {%- assign log_pos = log_pos | plus: 1 -%}
          {%- if log_pos < 10 %}
            <a class="te-row te-article-row" href="{{ post.url }}" id="{{ post.slug }}" data-analytics="latest-{{ post.slug }}">
              <div class="te-thumb">{{ log_pos | prepend: '0' | slice: -2, 2 }}</div>
              <div class="te-row-body">
                <div class="te-code">{{ post.title | default: post.name }}</div>
                <div class="te-article-meta">
                  {% if post.date %}{{ post.date | date: "%b %Y" | downcase }} · {% endif %}read article →
                </div>
              </div>
            </a>
          {%- endif -%}
        {%- endif -%}
      {%- endfor %}
    </div>

    <p class="te-explore"><a href="/" data-analytics="latest-all-articles">browse the full archive →</a></p>
  </section>

  <section class="te-section section te-about" id="about" data-analytics-section="about">
    <div class="te-section-label">about</div>
    <div class="te-about-grid">
      <h2 class="te-section-title">Builder first, job title second.</h2>
      <div class="te-about-copy">
        <p>
          I started as a graphics and game programmer, then moved through data engineering,
          technical leadership, product, and company building. Today I’m a co-founder of Tinybird.
        </p>
        <p>
          I write to make sense of the things I’m working on: high-performance data systems,
          how products get made, what startups teach you, and the ideas that survive contact with reality.
        </p>
        <dl class="te-spec-table">
          <div class="te-spec-line"><dt>focus</dt><dd>data · product · startups</dd></div>
          <div class="te-spec-line"><dt>background</dt><dd>graphics · games · engineering</dd></div>
          <div class="te-spec-line"><dt>based</dt><dd>Madrid, Spain</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="te-section section" id="newsletter" data-analytics-section="newsletter">
    <div class="te-section-heading">
      <div>
        <div class="te-section-label">newsletters</div>
        <h2 class="te-section-title">New writing, by email</h2>
      </div>
      <p>Choose your language. Both are free.</p>
    </div>

    <div class="te-newsletter-grid">
      <a class="te-newsletter" href="https://failingwithdata.substack.com" data-analytics="newsletter-en">
        <span class="te-thumb">EN</span>
        <span><strong>Failing with Data</strong><small>Data engineering, product, and startups.</small></span>
        <em>subscribe →</em>
      </a>
      <a class="te-newsletter" href="https://javisantana.substack.com" data-analytics="newsletter-es">
        <span class="te-thumb">ES</span>
        <span><strong>Javi Santana</strong><small>Tecnología, producto, startups y alguna otra cosa.</small></span>
        <em>suscríbete →</em>
      </a>
    </div>
  </section>

  <footer class="te-footer section" data-analytics-section="footer">
    <span>Elsewhere</span>
    <a href="https://x.com/javisantana" data-analytics="footer-x">X / Twitter</a>
    <a href="https://www.linkedin.com/in/javisantana" data-analytics="footer-linkedin">LinkedIn</a>
    <a href="mailto:javi@tinybird.co" data-analytics="footer-email">Email</a>
  </footer>

</main>
