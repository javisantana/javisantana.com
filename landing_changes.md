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
