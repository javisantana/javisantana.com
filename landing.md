---
layout: minimal
lang: en
title: Javi Santana — data products, engineering, startups
description: Javi Santana, co-founder of Tinybird. I build data products and write about engineering, product, and startups.
permalink: /landing.html
---

<main class="home">
  <h1>Javi Santana</h1>
  <p class="tagline">Pixels are the humble bricks with which one can build cathedrals</p>
  <p>Rather than telling you who I am, I'll show you what I've built.</p>
  <ul class="section" data-analytics-section="hero-identity">
    <li><a href="https://tinybird.com" data-analytics="hero-tinybird"><i>Tinybird</i></a> (2018–) — real-time data infrastructure. Co-founder. Built the product, managed the FDE team, then ran it as CEO.</li>
    <li><a href="https://carto.com" data-analytics="hero-carto"><i>CARTO</i></a> (2012–2018) — founding engineer to CTO. Geospatial data infrastructure. Zero to $8M ARR.</li>
    <li><a href="https://web.archive.org/web/20190828133838/http://agroguia.es/" data-analytics="hero-agroguia"><i>Agroguía</i></a> (2006–2017) — founder. GPS guidance software for tractors. Bootstrapped, profitable, run by one person. $200k+/year.</li>
  </ul>

  <p class="home-cta">Three good places to start reading:</p>
  <nav class="post-list section" data-analytics-section="start-here">
    <div class="row">
      <span class="n">1.</span>
      <a class="t" href="/2024/11/30/learnings-after-4-years-data-eng.html" data-analytics="featured-four-years"><i>Learnings after four years working with +50 companies on data engineering</i></a>
      <span class="y">2024</span>
    </div>
    <div class="row">
      <span class="n">2.</span>
      <a class="t" href="/fastdata/40-things-I-learned-about-data.html" data-analytics="featured-forty-things"><i>40 things I learned about data</i></a>
      <span class="y">2022</span>
    </div>
    <div class="row">
      <span class="n">3.</span>
      <a class="t" href="/2025/01/16/i-love-sql.html" data-analytics="featured-i-love-sql"><i>I love SQL</i></a>
      <span class="y">2025</span>
    </div>
  </nav>

  <p class="home-cta">Recent writing, newest first — <a href="/" data-analytics="latest-all-articles"><i>full archive →</i></a></p>
  <nav class="post-list section" data-analytics-section="latest-writing">
    {%- assign featured_urls = "/2024/11/30/learnings-after-4-years-data-eng.html,/fastdata/40-things-I-learned-about-data.html,/2025/01/16/i-love-sql.html" | split: "," -%}
    {%- assign alldocs = site.posts | concat: site.inspiration | concat: site.fastdata | sort:"date" -%}
    {%- assign log_pos = 0 -%}
    {%- for post in alldocs reversed -%}
      {%- if post.title != "Index" and post.name != "Index" and post.title != "" and post.title != nil and log_pos < 6 -%}
        {%- unless featured_urls contains post.url -%}
        {%- assign log_pos = log_pos | plus: 1 -%}
          <div class="row">
            <span class="n">{{ log_pos }}.</span>
            <a class="t" href="{{ post.url }}" data-analytics="latest-{{ post.slug }}"><i>{{ post.title | default: post.name }}</i></a>
            <span class="y">{{ post.date | date: "%Y" }}</span>
          </div>
        {%- endunless -%}
      {%- endif -%}
    {%- endfor %}
  </nav>

  <p class="home-cta">I also write about data infrastructure at scale on the <a href="https://www.tinybird.co/blog/authors/javisantana" data-analytics="tinybird-all-posts"><i>Tinybird blog</i></a>:</p>
  <nav class="post-list section" data-analytics-section="tinybird-blog">
    <div class="row">
      <span class="n">1.</span>
      <a class="t" href="https://www.tinybird.co/blog/what-i-learned-operating-clickhouse" data-analytics="tinybird-operating-clickhouse"><i>I've operated petabyte-scale ClickHouse® clusters for 5 years</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">2.</span>
      <a class="t" href="https://www.tinybird.co/blog/what-i-learned-operating-clickhouse-part-ii" data-analytics="tinybird-operating-clickhouse-ii"><i>Lessons learned from 5 years with ClickHouse® clusters: Part II</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">3.</span>
      <a class="t" href="https://www.tinybird.co/blog/1b-rows-per-second-clickhouse" data-analytics="tinybird-1b-rows"><i>How to ingest 1 billion rows per second in ClickHouse®</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">4.</span>
      <a class="t" href="https://www.tinybird.co/blog/why-we-maintain-a-clickhouse-fork-at-tinybird" data-analytics="tinybird-clickhouse-fork"><i>Why we maintain a ClickHouse® fork at Tinybird</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">5.</span>
      <a class="t" href="https://www.tinybird.co/blog/adding-join-support-for-parallel-replicas-on-clickhouse" data-analytics="tinybird-parallel-replicas"><i>Adding JOIN support for parallel replicas on ClickHouse®</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">6.</span>
      <a class="t" href="https://www.tinybird.co/blog/when-to-use-columnar-database" data-analytics="tinybird-columnar"><i>When to use columnar databases over Postgres, MySQL, or MongoDB</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">7.</span>
      <a class="t" href="https://www.tinybird.co/blog/ibm-confluent" data-analytics="tinybird-ibm-confluent"><i>Nobody Ever Got Fired for Buying Confluent</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">8.</span>
      <a class="t" href="https://www.tinybird.co/blog/flink-is-95-problem" data-analytics="tinybird-flink"><i>Flink's 95% problem</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">9.</span>
      <a class="t" href="https://www.tinybird.co/blog/data-engineering-for-developers" data-analytics="tinybird-data-eng-guide"><i>A Developer's Guide to Data Engineering</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">10.</span>
      <a class="t" href="https://www.tinybird.co/blog/introducing-explorations" data-analytics="tinybird-explorations"><i>Explorations: a chat UI for real-time analytics</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">11.</span>
      <a class="t" href="https://www.tinybird.co/blog/dbt-in-real-time" data-analytics="tinybird-dbt"><i>dbt in real-time</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">12.</span>
      <a class="t" href="https://www.tinybird.co/blog/tb-test" data-analytics="tinybird-tb-test"><i>Writing tests sucks. Use LLMs so it sucks less.</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">13.</span>
      <a class="t" href="https://www.tinybird.co/blog/tb-dev" data-analytics="tinybird-tb-dev"><i>Build fast software with big data requirements</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">14.</span>
      <a class="t" href="https://www.tinybird.co/blog/local-first-experience" data-analytics="tinybird-local-first"><i>Local first.</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">15.</span>
      <a class="t" href="https://www.tinybird.co/blog/tb-create" data-analytics="tinybird-tb-create"><i>Vibe data engineering</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">16.</span>
      <a class="t" href="https://www.tinybird.co/blog/the-perfect-data-ingestion-api-design" data-analytics="tinybird-ingestion-api"><i>The perfect data ingestion API design</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">17.</span>
      <a class="t" href="https://www.tinybird.co/blog/tinybird-forward" data-analytics="tinybird-forward"><i>Ship data as you ship code: deploy changes with one command</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">18.</span>
      <a class="t" href="https://www.tinybird.co/blog/tinybird-is-local-first" data-analytics="tinybird-is-local-first"><i>Ship data as you ship code: Tinybird becomes local-first</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">19.</span>
      <a class="t" href="https://www.tinybird.co/blog/tinybird-local-docker-container" data-analytics="tinybird-local-docker"><i>Tinybird Local: Build with data on your machine</i></a>
      <span class="y">↗</span>
    </div>
    <div class="row">
      <span class="n">20.</span>
      <a class="t" href="https://www.tinybird.co/blog/how-tinybird-scales" data-analytics="tinybird-how-scales"><i>How to scale a real-time data platform</i></a>
      <span class="y">↗</span>
    </div>
  </nav>

  <p class="home-cta">New writing by email — <a href="https://failingwithdata.substack.com" data-analytics="newsletter-en"><i>Failing with Data (EN)</i></a> · <a href="https://javisantana.substack.com" data-analytics="newsletter-es"><i>Javi Santana (ES)</i></a></p>

  <footer class="section" data-analytics-section="footer">
    <p><a href="https://x.com/javisantana" data-analytics="footer-x"><i>x</i></a> · <a href="https://www.linkedin.com/in/javisantana" data-analytics="footer-linkedin"><i>linkedin</i></a> · <a href="mailto:javi@tinybird.co" data-analytics="footer-email"><i>email</i></a></p>
  </footer>
</main>
