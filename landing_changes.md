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
