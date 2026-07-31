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

Deployment timestamp: pending. This iteration is not deployed yet.

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
