# Landing page change log

This log connects landing-page iterations with the events in `events.duckdb`. Localhost and
`127.0.0.1` sessions are excluded from visitor baselines.

## 2026-07-26 — Shorter, article-first landing page

### Baseline

Data available through 2026-07-26 (the latest `/landing.html` event is from 2026-07-25).
The current Teenage Engineering design launched on 2026-07-13.

- 40 non-local sessions since launch.
- Acquisition: 20 Twitter/X, 12 direct, 8 internal.
- 45% reached the footer (18 of 40).
- Median maximum scroll was 65.5%.
- Median observed duration was 16 seconds.
- 25 sessions generated a click event, but most article clicks could not be attributed:
  the tracker only captured an `href` when the exact clicked element was the anchor. Clicking
  nested article titles produced generic `EM`, `DIV`, or `P` events.
- The page exposed 39 latest-article rows after the profile and two newsletters.

### Hypothesis

Visitors—half of whom arrive from Twitter/X—should understand who Javi is in the first
viewport and encounter a small, useful set of articles before newsletter promotion. Reducing
choice and page length should increase attributable article visits and section completion.

### Changes

- Rewrote the hero around a direct proposition: co-founder of Tinybird, data-product builder,
  and writer about engineering, product, and startups.
- Added three prominent “start here” articles selected from representative posts with strong
  traffic in the previous 90 days.
- Moved writing ahead of the about and newsletter sections.
- Reduced the dynamic latest list from 39 to 9 articles.
- Removed duplicated profile/spec content and replaced it with a shorter career narrative.
- Made newsletter language and subject matter explicit.
- Added a responsive landing-specific layout while preserving the existing visual system.
- Added a page meta description and normalized external links to HTTPS.
- Added named analytics sections and stable `data-analytics` labels.
- Fixed click attribution to record the nearest anchor, even when a nested element is clicked.
- Fixed `isNewMax`, which was always recorded as false because the maximum was updated before
  the comparison.

### Metrics to compare after deployment

Use only sessions after the deployment timestamp and exclude local referrers.

- Article click-through rate by `label`, especially `featured-*` and `latest-*`.
- Section entry rate for `start-here`, `latest-writing`, `about`, and `newsletter`.
- Newsletter click-through rate by language.
- Median duration, maximum scroll, and footer completion.
- Performance split by source and viewport width.

## 2026-07-27 — Reliable, versioned landing measurement

Deployment timestamp: pending. This iteration is not deployed yet.

### Baseline

Data window: 2026-07-26 08:50 CEST through 2026-07-27 09:18 CEST, beginning with the
first event after commit `5cba1e4`. Localhost and `127.0.0.1` referrers are excluded.

- 4 sessions, all direct: 3 desktop and 1 mobile. This is too small a sample for content or
  layout conclusions.
- Median observed duration was 84 seconds among the 3 sessions with an end event.
- Median maximum scroll was 50%; 2 of 4 sessions reached the end.
- Named section entry was recorded for 1 of 4 sessions for each of `start-here`,
  `latest-writing`, `about`, `newsletter`, and `footer`.
- There were no attributable article, newsletter, or social clicks. One internal “about” jump
  was attributable by destination, but its stable label was missing.
- The three featured articles remain the strongest relevant choices in the 90-day window from
  2026-04-28 through 2026-07-27: 63 sessions for the Google-front-page article, 35 for the
  four-years-of-data-engineering article, and 17 for “40 things I learned about data.”
- Measurement quality is not yet suitable for comparing click-through rates. The deployed HTML
  has stable labels, but a browser served the pre-fix tracker from cache: the recorded anchor
  click had an `href` but no `label`. Section visibility also required more than half of a
  section to be on screen, which undercounts sections taller than the viewport.

### Hypothesis

With the post-redesign sample too small for another visual change, preserving the current
article-first page and making its measurement reliable will produce a valid comparison sooner
than changing content again. Versioned tracker payloads, cache-busted delivery, and
viewport-relative section thresholds should make the next session cohort distinguishable and
its important interactions attributable.

### Changes

- Added analytics version `2026-07-27` to every tracker payload so this cohort can be queried
  independently.
- Cache-busted the tracker URL to ensure visitors receive nearest-anchor click attribution and
  stable `data-analytics` labels.
- Changed section entry to require a meaningful 25% overlap capped at 25% of the viewport,
  allowing tall sections to register without treating a one-pixel intersection as entry.
- Preserved selected and copied excerpts, capped at 100 characters, as an editorial signal
  alongside the full selection length.
- Added landing-scoped visible keyboard focus and disabled the landing-row transition when the
  visitor prefers reduced motion.
- Kept landing content, featured articles, and section order unchanged because the 4-session
  sample does not justify another redesign.

### Metrics to compare after deployment

Use sessions with `analyticsVersion = '2026-07-27'`, starting at the confirmed deployment
timestamp, and keep excluding local referrers.

- Coverage of `analyticsVersion`, `label`, `href`, and `sectionName`.
- Article click-through rate for `featured-*` and `latest-*`.
- Section entry rate for `start-here`, `latest-writing`, `about`, `newsletter`, and `footer`.
- Newsletter and social click-through rates.
- Median duration, maximum scroll, and reached-end rate, split by source and viewport.
- Review selected and copied excerpts only in aggregate to identify repeatedly useful passages.

## 2026-07-28 — Clean landing experiment boundary

Deployment timestamp: pending. This iteration is not deployed yet.

### Baseline

Data window: 2026-07-27 10:36 CEST through 2026-07-28 18:34 CEST, covering the
15 non-local-referrer sessions carrying `analyticsVersion = '2026-07-27'`. The window begins
with the first observed versioned event; it is not a confirmed deployment timestamp. Repeated
batched events were deduplicated by session and event payload.

- Acquisition: 7 direct, 4 internal, 3 Twitter/X, and 1 search session.
- 13 sessions were desktop and 2 were narrow/mobile, too few for a meaningful device comparison.
- Median observed duration was 18 seconds among the 11 sessions with an end event. Median maximum
  scroll was 18%, and 3 of 15 sessions reached the footer/end.
- Section entry was 14 of 15 for `start-here`, 8 of 15 for `latest-writing`, 5 of 15 for `about`,
  4 of 15 for `newsletter`, and 3 of 15 for `footer`.
- Five sessions opened an article: 3 from the featured set and 2 from latest writing. There were
  no newsletter or social clicks. Six of six link clicks carried both a stable label and a
  destination; one additional click event was a non-link interaction.
- In the 90-day window from 2026-04-29 through 2026-07-28, the current featured articles remained
  the strongest relevant choices: 38 sessions for the four-years-of-data-engineering article,
  23 for the Google-front-page article, and 20 for “40 things I learned about data.”
- The database contains clearly local filesystem paths. Direct local visits have no localhost
  referrer, so referrer filtering cannot remove all development traffic from the current cohort.

### Hypothesis

The current content is already producing article visits, and 15 sessions are not enough evidence
for another layout or copy change. Preventing local collection, recording only actionable link
clicks, and emitting one reliable end event will create a clean post-change cohort without
disrupting the article-first experience.

### Changes

- Kept the landing content, order, and responsive layout unchanged.
- Added analytics version `2026-07-28` and cache-busted the tracker URL.
- Stopped analytics on `file:`, localhost, IPv4 loopback, and IPv6 loopback pages.
- Limited click events to links, preserving nearest-anchor destination and stable label attribution.
- Clamped scroll progress to 0–100% and reports 100% for pages without a scrollable area.
- Moved session-end capture to `pagehide` and guarded it so one page view emits at most one end event.
- Stopped sending selected or copied text; only aggregate-safe character counts are retained.

### Metrics to compare after deployment

Use sessions with `analyticsVersion = '2026-07-28'`, beginning at the confirmed deployment
timestamp.

- Confirm that local and filesystem paths no longer appear in the versioned cohort.
- Coverage of `label` and `href` across all click events.
- Coverage and uniqueness of end events, plus median duration and maximum scroll.
- Article click-through rate for featured and latest writing.
- Section entry and footer completion rates.
- Newsletter and social click-through rates.

## 2026-07-31 — Direct article CTA and denser first viewport

Deployment timestamp: 2026-07-31 18:48 CEST (commit `b4576fe`).

### Baseline

Data window: versioned non-local sessions with `analyticsVersion` in
`('2026-07-27', '2026-07-28')` through 2026-07-31 14:32 UTC (latest event in
`events.duckdb`). Localhost and `127.0.0.1` referrers are excluded. Batched events
were expanded and deduplicated by session, event fields, and second.

- 26 sessions: 14 direct, 6 Twitter/X, 4 internal, 2 search. Only 2 mobile
  viewports (`viewportWidth < 700`); treat device splits as unreliable.
- Median observed duration 18s; median maximum scroll 18%. 6 of 26 reached the
  footer/end. 11 of 26 recorded 0% max scroll; 13 of 26 ended in ≤5s.
- Section entry (versioned): `start-here` 23/26 (88%), `latest-writing` 13/26
  (50%), `about` 7/26 (27%), `newsletter` 6/26 (23%), `footer` 5/26 (19%).
- 7 of 26 sessions had a click. Attributable article labels included
  `featured-four-years` (strongest), `latest-learn-to-cook`, `featured-forty-things`,
  and `featured-google-frontpage`. No newsletter or social clicks in this window.
- Measurement quality for `2026-07-28`: no `file:` paths; 18 of 19 click events
  carried both `label` and `href`. End events still include long backgrounded
  tabs (multi-hour `duration`); prefer medians.
- 90-day article traffic (from 2026-05-01, non-local, content paths): featured
  set remains appropriate—four-years (37 sessions), 40-things (20), Google
  frontpage (18). Popular non-featured pieces include inspiration notes
  (`experience-in-movies`, `learn-to-cook`) and `sql-agent`; kept out of “start
  here” to preserve a clear professional introduction.

### Hypothesis

Most visitors bounce before scrolling past the first block. The primary hero CTA
only jumped to `#start-here`, which is often already on screen, so it could not
create an article visit. Putting a direct link to the strongest featured article
in the first viewport, tightening hero density so writing stays visible, and
shortening the latest list from 9 to 5 should raise article CTR among short
sessions without changing who Javi is or what the page is for.

### Changes

- Primary hero CTA is now a direct link to the four-years data-engineering
  article (`hero-read-four-years`), styled as a solid button.
- Secondary hero links: in-page “more writing” and “about me” (no longer the
  primary action).
- Slightly shorter hero copy; reduced hero type size and vertical spacing so
  featured cards sit higher in the first viewport.
- Marked the top featured card as recommended (`te-featured-primary`) and
  shortened card blurbs; reduced featured min-height.
- Cut the dynamic latest list from 9 to 5 articles.
- Analytics version `2026-07-31` with cache-busted tracker URL for a clean
  post-change cohort.

### Metrics to compare after deployment

Use sessions with `analyticsVersion = '2026-07-31'`, beginning at the confirmed
deployment timestamp; exclude local referrers.

- Article CTR overall and for `hero-read-four-years` vs `featured-*` vs `latest-*`.
- Share of sessions with any article click among those with duration ≤15s.
- Section entry for `start-here` and `latest-writing`; footer completion.
- Median duration and maximum scroll (ignore extreme open-tab durations).
- Newsletter and social CTR (still secondary).

## 2026-08-03 — Name-first hero and active duration

Deployment timestamp: 2026-08-03 17:31 CEST (this commit).

### Baseline

Data window: non-local sessions with `analyticsVersion = '2026-07-31'` from
2026-07-31 18:51 CEST through 2026-08-03 14:53 CEST (latest event in
`events.duckdb` at analysis time). Localhost and `127.0.0.1` referrers
excluded. Batched events expanded and deduplicated by session, fields, and
second. Wall-clock durations above 1 hour treated as open-tab outliers for
medians.

- 18 sessions: 13 Twitter/X (`t.co`), 2 direct, 2 internal, 1 empty referrer.
  Zero mobile viewports (`viewportWidth < 700`); device splits still unreliable.
- Relative to the pre-change versioned cohort (`2026-07-27` + `2026-07-28`,
  n=38): article session CTR 22.2% vs 13.2%; featured CTR 16.7% vs 7.9%;
  hero article CTA 11.1% (new); newsletter CTR 11.1% vs 0%; section entry much
  deeper (`latest-writing` 72% vs 37%, `about` 78% vs 18%, `footer` 61% vs 13%).
  Mix shifted toward Twitter, so treat lift as directional, not proven.
- Median duration among end events under 1h: 19s. Median max scroll 100%
  (end-event `maxProgress` or scroll progress). 13/18 reached footer/end.
- Short sessions (duration ≤15s): 3 of 5 had an article click (vs 1 of 21 pre).
- Top landing click labels by sessions: `hero-about` (3),
  `featured-forty-things` (3), `featured-four-years` (2),
  `featured-google-frontpage` (2), `hero-read-four-years` (2). First newsletter
  and social clicks appeared in this cohort.
- Measurement quality: labels and hrefs present on link clicks. Wall-clock
  `duration` still polluted by multi-hour backgrounded tabs (e.g. >20k seconds).
  Some `reached_end` / 100% scroll pairs with near-zero end `maxProgress` remain
  hard to interpret.
- 90-day content traffic (from 2026-05-05, non-local): featured set still
  appropriate for a professional intro—four-years (32 sessions), 40-things (21),
  Google frontpage (14). Strong non-featured pieces (`learn-to-cook`,
  `experience-in-movies`, `sql-agent`) stay out of “start here.”

### Hypothesis

The direct article CTA is working, especially on short Twitter sessions, but
the most-clicked control is still `hero-about`: visitors arrive needing a clear
name and role before they commit to a post. Putting the name in the H1 and a
compact who/what line in the first viewport—while keeping the article CTA and
making its label name the destination—should raise article CTR without another
layout rewrite. Recording visibility-aware `activeDuration` will make the next
cohort’s engagement medians trustworthy.

### Changes

- Hero H1 is now the name (“Javi Santana”); location stays in the kicker;
  lede states co-founder role plus what he builds and writes about.
- Primary CTA copy names the destination article
  (`read: four years of data engineering →`); label `hero-read-four-years`
  unchanged.
- Slightly tighter hero spacing and name type scale so the first viewport stays
  article-forward on desktop and mobile.
- On narrow viewports, stack the primary CTA above secondary links and allow the
  button label to wrap so it does not clip at 320px width.
- Page title/description lead with the name for share/tab context.
- Featured set, latest list length, section order, and visual system unchanged.
- Analytics version `2026-08-03` with cache-busted tracker URL.
- End events include `activeDuration` (seconds the document was visible);
  `reached_end` prefers `[data-analytics-section="footer"]`.

### Metrics to compare after deployment

Use sessions with `analyticsVersion = '2026-08-03'`, beginning at the confirmed
deployment timestamp; exclude local referrers. Prefer `activeDuration` for
engagement medians; keep wall-clock `duration` only for outlier checks.

- Article CTR overall and for `hero-read-four-years` vs `featured-*` vs `latest-*`.
- Rate of `hero-about` clicks (should fall if the hero answers identity).
- Share of sessions with any article click among those with `activeDuration` ≤15s.
- Section entry for `start-here`, `latest-writing`, `about`; footer completion.
- Newsletter and social CTR (secondary).
- Coverage of `activeDuration` on end events.

## 2026-08-06 — Compact "start here" rows

Not deployed at time of writing. Deployment timestamp: _pending_.

### Baseline

Data window: non-local sessions with `analyticsVersion = '2026-08-03'`, from
2026-08-03 15:33 UTC through 2026-08-06 14:01 UTC (latest event in
`events.duckdb` at analysis time). Localhost and `127.0.0.1` referrers
excluded. n=15 sessions — small; treat everything below as directional.

- Acquisition: 7 `t.co`, 7 empty referrer, 1 internal. Mix shifted away from
  Twitter versus the previous cohort (13/18 `t.co`), so cross-cohort rate
  comparisons are confounded.
- 2 sessions under 700px viewport — first mobile traffic in a versioned cohort,
  still too few to segment on.
- **Median `activeDuration` 6s** (9/15 sessions reported it; 6 sessions sent no
  `end` event). This is the first trustworthy engagement number: the previous
  cohort's 19s median was wall-clock and inflated by backgrounded tabs.
- Section entry: `start-here` 14/15, `latest-writing` 11/15, `about` 4/15,
  `newsletter` 3/15, `footer` 3/15.
- Median max scroll 10%. The previous cohort's 100% median is **not**
  comparable — the `2026-08-03` `reached_end` change (prefer the footer section
  over a generic sentinel) removed the artifact that inflated it. Depth metrics
  restart from this cohort.
- Landing clicks by session: `hero-read-four-years` 2, `latest-learn-to-cook` 2,
  `hero-tinybird` 1, `latest-experience-in-movies` 1. Article-click sessions
  4/15 (26.7%) vs 4/18 (22.2%) previously.
- `hero-about` fell to 0 clicks (was 3/18). The name-first hero appears to have
  answered the identity question in place, as hypothesised on 2026-08-03.
- The featured grid took **0 clicks** this cohort while the plainer 5-row latest
  list took 3.
- Pooled across all four versioned cohorts (n=71) the featured grid and the
  latest list have earned **6 click-sessions each**, despite the grid occupying
  roughly a full scroll and sitting higher on the page.
- 90-day content traffic (from 2026-05-06, non-local): four-years 44 sessions,
  learn-to-cook 31, experience-in-movies 27, 40-things 23, sql-agent 21.
  `como-aguantamos-una-portada-de-google` has dropped out of the top 12; it is
  now the weakest featured slot and worth revisiting if it stays flat.
- Measurement quality: click labels and hrefs resolve correctly to the nearest
  anchor. `activeDuration` coverage is 60% of sessions, limited by missing `end`
  events rather than by the field itself.

### Hypothesis

Attention, not persuasion, is the binding constraint: the median visitor gives
the page about six active seconds, and only a quarter of them ever reach the
`about` section. Within that budget the three-card featured grid is expensive —
it costs a full scroll of space and, pooled over 71 sessions, converts no better
than a compact list of titles. Rendering "start here" in the same lightweight
row form as the latest list should put both sets of articles inside the first
six seconds of scrolling, raise total article CTR, and lift entry into the
lower sections, without removing any link or changing the visual language.

### Changes

- The `te-featured-grid` three-card block became a `te-log` of three
  `te-article-row` rows, identical in form to the latest-writing list. Titles,
  URLs, and `featured-*` analytics labels are unchanged so the click comparison
  carries across the boundary.
- Card descriptions were dropped; each row keeps a single meta line
  (`recommended · data engineering · en · read article →`) carrying topic,
  language, and the affordance.
- Slot 01 keeps its emphasis via a tinted row (`te-featured-row`) and an orange
  index, replacing the larger `te-featured-primary` card treatment.
- Added `overflow-wrap: break-word` to `.te-code` so long titles cannot overflow
  a narrow row. The old `.te-featured*` rules are left in place but are now
  unused by the landing page.
- Featured set, latest list length, section order, hero, and about/newsletter
  content are all unchanged.
- Analytics version `2026-08-06` with cache-busted tracker URL.

### Validation notes

Verified with real device-metric emulation over CDP rather than
`chrome --headless --window-size`: that flag does **not** set the layout width
(it renders at 500px and crops), which means the `*-mobile-320.png` shots
archived in earlier iterations do not show true 320px layout. At genuine 320px
and 390px viewports `document.scrollWidth == clientWidth`, so the page has no
horizontal overflow, and all rows wrap correctly. Shots archived as
`2026-08-06-1900-compact-start-here-{desktop,mobile-320}.png`.

### Metrics to compare after deployment

Use sessions with `analyticsVersion = '2026-08-06'` from the confirmed
deployment timestamp; exclude local referrers. Compare against the
`2026-08-03` cohort, which shares the corrected depth instrumentation.

- Total article-click sessions, and the `featured-*` vs `latest-*` split — the
  core test of whether compact rows beat cards for the same content.
- Section entry for `latest-writing`, `about`, `newsletter`, `footer`; the
  shorter page should raise all four.
- Median `activeDuration`, plus its coverage (missing `end` events, 6/15 here).
- Median max scroll, now that the depth metric is trustworthy.
- Newsletter and social CTR (secondary).

## 2026-08-10 — "What brought you here?" intent micro-survey

Not deployed at time of writing. Deployment timestamp: _pending_.

### Baseline and rationale

Data window: `/landing.html` sessions grouped by `sessionId` over the 14 days
through 2026-08-09, localhost/`127.0.0.1` excluded. **~1–18 sessions/day, ~100
total.** That volume is far too small for a *measured* A/B split — two variants
would take months to separate — so this iteration does **not** attempt a powered
experiment.

Instead it captures **stated intent**, which the dataset has never had. All
prior iterations tuned layout from behavior (scroll, clicks) but we don't know
*why* people arrive. A one-tap qualitative survey needs no statistical power to
be useful: even a handful of answers tell us which audience the page actually
serves.

### Change

- New inline `#feedback` section between `#newsletter` and the footer of
  `landing.md`: heading "What brought you here?", five chips —
  `data-engineering`, `startups`, `product`, `curious`, `other` — with an
  optional 140-char free-text box behind the "something else…" chip.
- Emits a new event `action='landing_feedback'` via the existing
  `window.Tinybird.trackEvent` pipeline (`_includes/tracker.html`), payload
  `{ choice, text?, bucket, referrer, viewportWidth }`. No backend change.
- **Exposure dial, not an A/B test:** `EXPOSURE_PCT = 50`. Visitors are bucketed
  0–99 by hashing the tracker's `session-id` cookie (local fallback id
  otherwise); the section reveals only when `bucket < EXPOSURE_PCT`. The bucket
  is stamped on every feedback event so exposure can be tuned later and, if
  traffic grows, behavior compared honestly. Answer/dismissal is remembered in
  `localStorage['landing-survey-done']` so repeat visitors aren't nagged.
- Styling scoped under `.te-landing` (`.te-survey-*`, `.te-chip`,
  `.te-visually-hidden`) in `_includes/te_styles.html`; reuses the page palette,
  chips mirror `.te-landing a:focus-visible`. Accessible: semantic buttons,
  `role="group"`, visually-hidden label, `role="status"` thank-you.

### Validation

Built with `npm run build`; generated `a/landing.html` contains the section, all
five chips, the inline script, and the scoped CSS. Inline script passes
`node --check`. Bucketing verified deterministic and ~49.9% exposed over 20k
synthetic ids. `git diff --check` clean. Full-page screenshots not yet archived
(pending the deploy, per skill).

### Metrics to compare after deployment

Filter to `action = 'landing_feedback'`, group by `sessionId`, from the confirmed
deployment timestamp; exclude local referrers.

- **Response rate**: distinct feedback sessions ÷ exposed `/landing.html`
  sessions (`bucket < 50`). Low rate → raise `EXPOSURE_PCT` toward 100.
- **Choice distribution** across the five chips — which audience the page serves.
- **Free-text themes** from `choice='other'` submissions.
- Sanity: exposed vs unexposed sessions should show no difference in existing
  engagement metrics (`activeDuration`, max scroll, article CTR) — the survey
  sits below the fold and should not distort them.
