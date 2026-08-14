---
layout: te_landing
title: Javi Santana — data products, engineering, startups
description: Javi Santana, co-founder of Tinybird. I build data products and write about engineering, product, and startups.
permalink: /landing.html
---

<main class="te te-landing">

  <header class="te-header te-landing-hero">
    <div class="te-mark-static" aria-hidden="true"></div>
    <p class="te-kicker">Madrid · internet</p>
    <h1 class="te-name">Javi Santana</h1>
    <p class="te-lede">
      Co-founder of <a href="https://www.tinybird.co" data-analytics="hero-tinybird">Tinybird</a>.
      I build data products and write about engineering, product, and startups—usually turning large amounts of data into something useful, fast.
    </p>
    <nav class="te-hero-actions" aria-label="Primary actions">
      <a class="te-hero-primary" href="/2024/11/30/learnings-after-4-years-data-eng.html" data-analytics="hero-read-four-years">read: four years of data engineering →</a>
      <div class="te-survey te-hero-survey" id="feedback" data-analytics-section="feedback" hidden>
        <p class="te-survey-prompt">What brought you here?</p>
        <div class="te-survey-choices" role="group" aria-label="What brought you here?">
          <button type="button" class="te-chip" data-analytics="survey-data" data-choice="data-engineering">data engineering</button>
          <button type="button" class="te-chip" data-analytics="survey-startups" data-choice="startups">startups / building</button>
          <button type="button" class="te-chip" data-analytics="survey-product" data-choice="product">product</button>
          <button type="button" class="te-chip" data-analytics="survey-curious" data-choice="curious">just curious about Javi</button>
          <button type="button" class="te-chip te-chip-other" data-analytics="survey-other" data-choice="other">something else…</button>
        </div>
        <form class="te-survey-other-form" hidden>
          <label class="te-visually-hidden" for="te-survey-text">Tell me what you were looking for</label>
          <input id="te-survey-text" type="text" maxlength="140" autocomplete="off" placeholder="what were you looking for?">
          <button type="submit" class="te-chip" data-analytics="survey-submit">send</button>
        </form>
        <p class="te-survey-thanks" role="status" hidden>Thanks — noted.</p>
      </div>
      <span class="te-hero-secondary">
        <a href="#start-here" data-analytics="hero-more-writing">more writing</a>
        <a href="#about" data-analytics="hero-about">about me</a>
      </span>
    </nav>
  </header>

  <section class="te-section section" id="start-here" data-analytics-section="start-here">
    <div class="te-section-heading">
      <div>
        <div class="te-section-label">start here</div>
        <h2 class="te-section-title">Three good places to begin</h2>
      </div>
      <p>The pieces people still read—and that best show how I think.</p>
    </div>

    <div class="te-log te-featured-log">
      <a class="te-row te-article-row te-featured-row" href="/2024/11/30/learnings-after-4-years-data-eng.html" data-analytics="featured-four-years">
        <div class="te-thumb">01</div>
        <div class="te-row-body">
          <div class="te-code">Learnings after four years working with 50+ companies</div>
          <div class="te-article-meta">recommended · data engineering · en · read article →</div>
        </div>
      </a>

      <a class="te-row te-article-row" href="/fastdata/40-things-I-learned-about-data.html" data-analytics="featured-forty-things">
        <div class="te-thumb">02</div>
        <div class="te-row-body">
          <div class="te-code">40 things I learned about data</div>
          <div class="te-article-meta">data · en · read article →</div>
        </div>
      </a>

      <a class="te-row te-article-row" href="/2013/06/27/como-aguantamos-una-portada-de-google.html" data-analytics="featured-google-frontpage">
        <div class="te-thumb">03</div>
        <div class="te-row-body">
          <div class="te-code">Cómo aguantamos una portada de Google</div>
          <div class="te-article-meta">engineering · es · leer artículo →</div>
        </div>
      </a>
    </div>
  </section>

  <section class="te-section section" id="latest" data-analytics-section="latest-writing">
    <div class="te-section-heading">
      <div>
        <div class="te-section-label">latest writing</div>
        <h2 class="te-section-title">Recent notes</h2>
      </div>
      <p>Data, software, building companies, and occasional low-quality philosophy.</p>
    </div>

    <div class="te-log">
      {%- assign alldocs = site.posts | concat: site.inspiration | concat: site.fastdata | sort:"date" -%}
      {%- assign log_pos = 0 -%}
      {%- for post in alldocs reversed -%}
        {%- if post.title != "Index" and post.name != "Index" -%}
          {%- assign log_pos = log_pos | plus: 1 -%}
          {%- if log_pos < 6 %}
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

<script>
  (function () {
    // Landing micro-survey: "What brought you here?".
    // Qualitative feedback capture; shown to a configurable slice of traffic.
    // Emits through the self-hosted analytics pipeline (window.jsAnalytics.track,
    // exposed by /assets/js/tracking.js) so responses land in events.duckdb.
    var EXPOSURE_PCT = 100;              // exposure dial, not a powered A/B split
    var DONE_KEY = 'landing-survey-done';
    var ID_KEY = 'landing-survey-id';

    try {
      var section = document.getElementById('feedback');
      if (!section) return;

      // Preview override: ?show_survey=true forces the survey regardless of
      // exposure bucket or prior dismissal (for local/manual checks).
      var forceShow = false;
      try {
        forceShow = new URLSearchParams(location.search).get('show_survey') === 'true';
      } catch (e) { /* URLSearchParams unavailable → no override */ }

      // Already answered/dismissed on a previous visit → never show again.
      if (!forceShow && localStorage.getItem(DONE_KEY)) return;

      // Stable id: prefer the tracker's session cookie, fall back to a local id.
      function sessionIdFromCookie() {
        var out = null;
        document.cookie.split(';').forEach(function (el) {
          var parts = el.split('=');
          if (parts[0].trim() === 'session-id') out = (parts[1] || '').trim();
        });
        return out;
      }
      function stableId() {
        var id = sessionIdFromCookie();
        if (id) return id;
        id = localStorage.getItem(ID_KEY);
        if (!id) {
          id = String(Date.now()) + '-' + Math.random().toString(16).slice(2);
          localStorage.setItem(ID_KEY, id);
        }
        return id;
      }

      // Hash id → 0..99 bucket.
      function bucketOf(id) {
        var h = 0;
        for (var i = 0; i < id.length; i++) {
          h = (h * 31 + id.charCodeAt(i)) >>> 0;
        }
        return h % 100;
      }

      var bucket = bucketOf(stableId());
      if (!forceShow && bucket >= EXPOSURE_PCT) return;  // not in the exposed slice

      var choices = section.querySelector('.te-survey-choices');
      var otherForm = section.querySelector('.te-survey-other-form');
      var thanks = section.querySelector('.te-survey-thanks');
      var textInput = section.querySelector('#te-survey-text');

      // Self-hosted pipeline; the batch envelope already carries referrer and
      // viewportWidth, so payloads stay minimal. Never let tracking break the page.
      // tracking.js (which defines window.jsAnalytics) loads *after* this inline
      // script, so a synchronous emit on reveal (survey_shown) would fire before the
      // hook exists and be lost. Buffer until the hook is ready, then flush.
      function emit(type, payload) {
        function send() { window.jsAnalytics.track(type, payload); }
        function ready() {
          return window.jsAnalytics && typeof window.jsAnalytics.track === 'function';
        }
        try {
          if (ready()) return send();
          var tries = 0;
          var iv = setInterval(function () {
            try {
              if (ready()) { clearInterval(iv); send(); }
              else if (++tries > 50) { clearInterval(iv); }  // give up after ~5s
            } catch (e) { clearInterval(iv); }
          }, 100);
        } catch (e) { /* swallow: analytics must never throw into the UI */ }
      }

      function record(choice, text) {
        var payload = { choice: choice, bucket: bucket };
        if (text) payload.text = text;
        emit('landing_feedback', payload);
        localStorage.setItem(DONE_KEY, '1');
      }

      function showThanks() {
        choices.hidden = true;
        if (otherForm) otherForm.hidden = true;
        if (thanks) thanks.hidden = false;
      }

      choices.addEventListener('click', function (ev) {
        var btn = ev.target.closest('.te-chip');
        if (!btn) return;
        var choice = btn.getAttribute('data-choice');
        if (choice === 'other') {
          choices.hidden = true;
          if (otherForm) {
            otherForm.hidden = false;
            if (textInput) textInput.focus();
          }
          return;
        }
        record(choice);
        showThanks();
      });

      if (otherForm) {
        otherForm.addEventListener('submit', function (ev) {
          ev.preventDefault();
          var text = (textInput && textInput.value ? textInput.value : '').trim();
          if (!text) return;               // never send empty free-text
          record('other', text.slice(0, 140));
          showThanks();
        });
      }

      // Eligible + not yet answered → reveal the survey in place of the hero CTA.
      var cta = document.querySelector('.te-hero-primary');
      if (cta) cta.hidden = true;
      section.hidden = false;
      emit('survey_shown', { bucket: bucket });  // denominator for response rate
    } catch (e) { /* fail closed: leave the survey hidden, keep the CTA */ }
  })();
</script>
